<script setup lang="ts">
import { onMounted, ref, computed, watch, onBeforeUnmount } from 'vue'
import { 
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  PieController,
  CategoryScale
} from 'chart.js'
import type { ChartData } from 'chart.js'

// Register required Chart.js components
Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  PieController,
  CategoryScale
)

// Get colors from CSS variables
const getColor = (varName: string): string => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim()
}

const colors = computed(() => ({
  green: getColor('--color-green'),
  red: getColor('--color-red'),
  greenShadow: getColor('--color-green-shadow'),
  redShadow: getColor('--color-red-shadow'),
  gray: getColor('--color-gray'),
  shadow: getColor('--color-shadow')
}))

interface Section {
  id: number
  name: string
  color: string
  percentage: number
}

interface Props {
  sections: Section[]
}

const props = defineProps<Props>()

const chartData = computed<ChartData>(() => {
  const activeData = props.sections.map(section => section.percentage)
  const totalPercentage = activeData.reduce((sum, value) => sum + value, 0)
  
  // Add empty section if total is less than 100%
  const data = totalPercentage < 100 
    ? [...activeData, 100 - totalPercentage]
    : activeData

  const labels = [...props.sections.map(section => section.name || 'Unnamed Section')]

  const colors = props.sections.map(section => 
    getColor(section.color.replace('var(', '').replace(')', ''))
  )
  if (totalPercentage < 100) {
    colors.push('#f5f5f5') // Light gray for unused space
  }

  return {
    labels,
    datasets: [{
      data,
      backgroundColor: colors,
      borderColor: Array(data.length).fill('lightgray'),
      borderWidth: 2,
      hoverBorderColor: Array(data.length).fill('white'),
      hoverBorderWidth: 4
    }]
  }
})

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        font: {
          size: 14,
          family: 'system-ui, -apple-system, sans-serif'
        },
        padding: 20,
        color: colors.value.gray
      }
    },
    tooltip: {
      backgroundColor: 'white',
      titleColor: colors.value.gray,
      titleFont: {
        size: 14,
        weight: 'normal' as const
      },
      bodyColor: colors.value.gray,
      bodyFont: {
        size: 14
      },
      borderColor: colors.value.shadow,
      borderWidth: 1,
      padding: 10,
      displayColors: true,
      boxWidth: 10,
      boxHeight: 10,
      boxPadding: 3
    }
  }
}))

const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null

// Watch for changes in sections and update chart
watch(
  () => props.sections,
  () => {
    if (chart) {
      chart.data = chartData.value
      chart.update()
    }
  },
  { deep: true }
)

onMounted(() => {
  if (chartCanvas.value) {
    chart = new Chart(chartCanvas.value, {
      type: 'pie',
      data: chartData.value,
      options: chartOptions.value
    })
  }
})

onBeforeUnmount(() => {
  if (chart) {
    chart.destroy()
  }
})
</script>

<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<style scoped>
.chart-container {
  min-width: 400px;
  min-height: 400px;
  height: 100%;
  aspect-ratio: 1;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px var(--color-shadow);
}
</style> 