<script setup lang="ts">
import Button from './components/Button.vue'
import ProgressBar from './components/ProgressBar.vue'
import PercentInput from './components/PercentInput.vue'
import { ref } from 'vue'

const percentage = ref(0)
const interval = ref<ReturnType<typeof setInterval> | null>(null)

const startProgress = () => {
  if (!percentage.value || percentage.value >= 100) {
    percentage.value = 0
  }
  interval.value = setInterval(() => {
    percentage.value++
    if (percentage.value >= 100) {
      clearInterval(interval.value!)
      interval.value = null
    }
  }, 100)
}

const stopProgress = () => {
  if (interval.value) {
    clearInterval(interval.value)
    interval.value = null
  }
}
</script>

<template>
  <main>
    <div class="progress-container">
      <ProgressBar :progress="percentage" />
      <PercentInput v-model="percentage" :disabled="!!interval" />
    </div>
    <div class="button-container">
      <Button label="Start!" :onClick="startProgress" />
      <Button label="Stop!" :onClick="stopProgress" />
    </div>
  </main>
</template>

<style>
/* Global styles without scoped */
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>

<style scoped>
p {
  margin-top: 1rem;
  font-size: 1.2rem;
}

main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  max-width: 800px;
  width: 100%;
  padding: 2rem;
  margin: 0 auto;
}

.button-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.progress-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
