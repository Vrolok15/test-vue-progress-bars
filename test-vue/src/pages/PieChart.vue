<script setup lang="ts">
import PieChartComponent from '../components/PieChartComponent.vue'
import PieChartSection from '../components/PieChartSection.vue'
import Button from '../components/Button.vue'
import { ref, computed } from 'vue'

const MAX_SECTIONS = 8

const sections = ref([
  {
    id: 1,
    name: 'Apple',
    color: 'var(--color-green)',
    percentage: 50,
    enabled: true
  },
  {
    id: 2,
    name: 'Cherry',
    color: 'var(--color-red)',
    percentage: 50,
    enabled: true
  },
  {
    id: 3,
    name: 'Blueberry',
    color: 'var(--color-blue)',
    percentage: 33.3,
    enabled: false
  },
  {
    id: 4,
    name: 'Raspberry',
    color: 'var(--color-pink)',
    percentage: 25,
    enabled: false
  },
  {
    id: 5,
    name: 'Cheese',
    color: 'var(--color-orange)',
    percentage: 20,
    enabled: false
  },
  {
    id: 6,
    name: 'Lemon',
    color: 'var(--color-yellow)',
    percentage: 16.7,
    enabled: false
  },
  {
    id: 7,
    name: 'Eggplant',
    color: 'var(--color-purple)',
    percentage: 14.3,
    enabled: false
  },
  {
    id: 8,
    name: 'Chocolate',
    color: 'var(--color-brown)',
    percentage: 12.5,
    enabled: false
  }
])

// Filter only enabled sections for the pie chart
const enabledSections = computed(() => 
  sections.value.filter(section => section.enabled)
)

// Find first disabled section
const firstDisabledSection = computed(() => 
  sections.value.find(section => !section.enabled)
)

// Show Add Section button only if there are disabled sections
const canAddSection = computed(() => firstDisabledSection.value !== undefined)

// Handle percentage changes and balance total
const handlePercentageChange = (sectionId: number, newPercentage: number) => {
  const section = sections.value.find(s => s.id === sectionId)
  if (!section || !section.enabled) return

  section.percentage = newPercentage
  balancePercentages(sectionId)
}

// Balance percentages to ensure total is 100%
const balancePercentages = (excludeId: number) => {
  const enabledSecs = sections.value.filter(s => s.enabled && s.id !== excludeId)
  const changedSection = sections.value.find(s => s.id === excludeId)
  
  if (!changedSection || !enabledSecs.length) return

  const totalOthers = enabledSecs.reduce((sum, s) => sum + s.percentage, 0)
  const total = totalOthers + changedSection.percentage

  if (total > 100) {
    const excess = total - 100
    const reduction = excess / enabledSecs.length
    
    enabledSecs.forEach(section => {
      section.percentage = Math.round(Math.max(0, section.percentage - reduction) * 10) / 10
    })
  }
}

// Enable next disabled section
const enableNextSection = () => {
  const section = firstDisabledSection.value
  if (section) {
    section.enabled = true
    balancePercentages(section.id)
  }
}

const handleDelete = (sectionId: number) => {
  const section = sections.value.find(s => s.id === sectionId)
  if (section) {
    section.enabled = false
    section.percentage = section.percentage // Keep original percentage for when re-enabled
  }
}
</script>

<template>
  <div class="page">
    <h1>Pie Chart</h1>
    <div class="pie-chart-container">
      <div class="pie-chart-sections">
        <h2>Sections</h2>
        <ul>
          <li v-for="section in sections" :key="section.id">
            <PieChartSection
              v-if="section.enabled"
              v-model:name="section.name"
              v-model:color="section.color"
              :percentage="section.percentage"
              @update:percentage="(value) => handlePercentageChange(section.id, value)"
              @delete="handleDelete(section.id)"
            />
          </li>
        </ul>
        <Button 
          v-if="canAddSection"
          label="Add Section"
          @click="enableNextSection"
        />
      </div>
      <div class="pie-chart">
        <PieChartComponent :sections="enabledSections" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
}

.pie-chart-container {
  display: flex;
  gap: 2rem;
  align-items: stretch;
  max-width: 90vw;
  padding: 0 1rem;
  min-height: 400px;
}

@media (max-width: 768px) {
  .pie-chart-container {
    flex-direction: column-reverse;
  }
}

.pie-chart-sections {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0 4px 12px var(--color-shadow);
  padding: 0 1.5rem;
  min-width: 500px;
  max-height: 800px;
  overflow-y: auto;
}

button {
  margin-bottom: 1rem;
}

h2 {
  margin: 0 0 1.5rem 0;
  border-bottom: 2px solid var(--color-shadow);
  color: var(--color-gray);
  font-size: 1.2rem;
}

ul {
  flex: 1;
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}

.pie-chart {
  display: flex;
  justify-content: center;
  align-items: stretch;
}
</style>