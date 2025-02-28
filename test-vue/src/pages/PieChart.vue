<script setup lang="ts">
import PieChartComponent from '../components/PieChartComponent.vue'
import PieChartSection from '../components/PieChartSection.vue'
import Button from '../components/Button.vue'
import { ref, computed } from 'vue'

const MAX_SECTIONS = 10

const sections = ref([
  {
    id: 1,
    name: 'Apple',
    color: 'var(--color-green)',
    percentage: 50
  },
  {
    id: 2,
    name: 'Cherry',
    color: 'var(--color-red)',
    percentage: 50
  }
])

const canAddSection = computed(() => sections.value.length < MAX_SECTIONS)
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
              v-model:name="section.name"
              v-model:color="section.color"
              v-model:percentage="section.percentage"
            />
          </li>
        </ul>
        <Button 
          v-if="canAddSection"
          label="Add Section"
          @click="sections.push({
            id: Date.now(),
            name: '',
            color: 'var(--color-blue)',
            percentage: 0
          })"
        />
      </div>
      <div class="pie-chart">
        <PieChartComponent :sections="sections" />
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
  max-width: 1600px;
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
  padding: 1.5rem;
  min-width: 500px;
  max-height: 800px;
  overflow-y: auto;
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