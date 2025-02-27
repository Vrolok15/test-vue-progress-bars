<script setup lang="ts">
import Button from './components/Button.vue'
import ProgressBar from './components/ProgressBar.vue'
import PercentInput from './components/PercentInput.vue'
import { ref, computed } from 'vue'

const percentage = ref<number | null>(0)
const interval = ref<ReturnType<typeof setInterval> | null>(null)
const currentState = ref<'progress' | 'complete' | 'warning' | 'error'>('progress')
const stateMessage = ref<string>('')

const progressState = computed(() => {
  if (interval.value) return 'progress'
  return currentState.value
})

const handleStateChange = (state: 'progress' | 'complete' | 'warning' | 'error', message?: string) => {
  currentState.value = state
  stateMessage.value = message || ''
}

const startProgress = () => {
  if (!percentage.value || percentage.value >= 100) {
    percentage.value = 0
  }
  currentState.value = 'progress'
  stateMessage.value = ''
  interval.value = setInterval(() => {
    if (percentage.value !== null) {
      percentage.value++
      if (percentage.value >= 100) {
        clearInterval(interval.value!)
        interval.value = null
        currentState.value = 'complete'
      }
    }
  }, 100)
}

const stopOrClear = () => {
  if (interval.value) {
    clearInterval(interval.value)
    interval.value = null
  } else {
    percentage.value = 0
    currentState.value = 'progress'
    stateMessage.value = ''
  }
}

const setWarning = () => {
  if (interval.value) {
    clearInterval(interval.value)
    interval.value = null
  }
  currentState.value = 'warning'
  stateMessage.value = 'Warning state activated'
}

const setError = () => {
  if (interval.value) {
    clearInterval(interval.value)
    interval.value = null
  }
  currentState.value = 'error'
  stateMessage.value = 'Error state activated'
}
</script>

<template>
  <main>
    <div class="progress-container">
      <ProgressBar :progress="percentage ?? 0" :state="progressState" />
      <PercentInput 
        v-model="percentage" 
        :disabled="!!interval"
        @state-change="handleStateChange"
      />
      <p v-if="stateMessage" class="state-message" :class="currentState">
        {{ stateMessage }}
      </p>
    </div>
    <div class="button-container">
      <Button 
        v-if="!interval"
        label="Start!" 
        :onClick="startProgress" 
      />
      <Button 
        :label="interval ? 'Stop' : 'Clear'" 
        :onClick="stopOrClear" 
        :variant="interval ? 'default' : 'clear'"
      />
      <Button label="Warning" :onClick="setWarning" variant="warning" />
      <Button label="Error" :onClick="setError" variant="error" />
    </div>
  </main>
</template>

<style>
@import './assets/variables.css';
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

.state-message {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.state-message.warning {
  color: var(--color-orange);
}

.state-message.error {
  color: var(--color-red);
}

.state-message.complete {
  color: var(--color-green);
}

.state-message.progress {
  color: var(--color-blue);
}
</style>
