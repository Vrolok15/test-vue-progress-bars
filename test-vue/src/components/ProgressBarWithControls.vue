<script setup lang="ts">
import Button from './Button.vue'
import ProgressBar from './ProgressBar.vue'
import PercentInput from './PercentInput.vue'
import Toggle from './Toggle.vue'
import SpeedRange from './SpeedRange.vue'
import ShapeSelector from './ShapeSelector.vue'
import type { ProgressShape } from './ShapeSelector.vue'
import { ref, computed, watch } from 'vue'

interface Props {
  defaultSpeed?: number
  defaultShape?: ProgressShape
}

const props = withDefaults(defineProps<Props>(), {
  defaultSpeed: 100,
  defaultShape: 'circle'
})

const percentage = ref<number | null>(0)
const interval = ref<ReturnType<typeof setInterval> | null>(null)
const autoRestart = ref(false)
const restartTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
const countdownInterval = ref<ReturnType<typeof setInterval> | null>(null)
const countdown = ref(3)
const currentState = ref<'progress' | 'complete' | 'warning' | 'error'>('progress')
const stateMessage = ref<string>('')
const speed = ref(props.defaultSpeed)
const shape = ref<ProgressShape>(props.defaultShape)

const progressState = computed(() => {
  if (interval.value) return 'progress'
  return currentState.value
})

const boxShadowColor = computed(() => {
  if (interval.value) return 'var(--color-blue-shadow)'
  switch (currentState.value) {
    case 'complete':
      return 'var(--color-green-shadow)'
    case 'warning':
      return 'var(--color-orange-shadow)'
    case 'error':
      return 'var(--color-red-shadow)'
    default:
      return 'var(--color-shadow)'
  }
})

// ... copy all the functions from App.vue ...
const handleStateChange = (state: 'progress' | 'complete' | 'warning' | 'error', message?: string) => {
  currentState.value = state
  stateMessage.value = message || ''
}

const clearTimeouts = () => {
  if (interval.value) {
    clearInterval(interval.value)
    interval.value = null
  }
  if (restartTimeout.value) {
    clearTimeout(restartTimeout.value)
    restartTimeout.value = null
  }
  if (countdownInterval.value) {
    clearInterval(countdownInterval.value)
    countdownInterval.value = null
  }
}

const triggerRestart = () => {
  countdown.value = 3
  stateMessage.value = `Restarting in ${countdown.value} seconds...`
  countdownInterval.value = setInterval(() => {
    countdown.value--
    if (countdown.value <= 1) {
      stateMessage.value = `Restarting in ${countdown.value} second...`
    } else {
      stateMessage.value = `Restarting in ${countdown.value} seconds...`
    }
  }, 1000)

  restartTimeout.value = setTimeout(() => {
    clearInterval(countdownInterval.value!)
    startProgress()
  }, 3000)
}

const handleAutoRestartChange = (newValue: boolean) => {
  autoRestart.value = newValue
  if (!newValue) {
    // Clear any pending restart when auto-restart is turned off
    clearTimeouts()
    stateMessage.value = ''
  } else if (percentage.value === 100 && !interval.value) {
    // Only start restart if at 100% and not currently running
    currentState.value = 'complete'
    triggerRestart()
  }
}

const updateInterval = () => {
  if (interval.value) {
    clearInterval(interval.value)
    interval.value = setInterval(() => {
      if (percentage.value !== null) {
        percentage.value++
        if (percentage.value >= 100) {
          clearInterval(interval.value!)
          interval.value = null
          if (autoRestart.value) {
            currentState.value = 'complete'
            triggerRestart()
          } else {
            currentState.value = 'complete'
          }
        }
      }
    }, speed.value)
  }
}

watch(speed, () => {
  updateInterval()
})

const startProgress = () => {
  clearTimeouts()
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
        if (autoRestart.value) {
          currentState.value = 'complete'
          triggerRestart()
        } else {
          currentState.value = 'complete'
        }
      }
    }
  }, speed.value)
}

const stopOrClear = () => {
  if (interval.value) {
    clearTimeouts()
  } else {
    percentage.value = 0
    currentState.value = 'progress'
    stateMessage.value = ''
  }
}

const setWarning = () => {
  clearTimeouts()
  currentState.value = 'warning'
  stateMessage.value = 'Warning state activated'
}

const setError = () => {
  clearTimeouts()
  currentState.value = 'error'
  stateMessage.value = 'Error state activated'
}
</script>

<template>
  <div 
    class="progress-with-controls"
    :style="{ boxShadow: `0 4px 12px ${boxShadowColor}` }"
  >
    <div class="progress-container">
      <SpeedRange
        v-model="speed"
      />
      <ProgressBar 
        :progress="percentage ?? 0" 
        :state="progressState"
        :speed="speed"
        :shape="shape"
        @update:shape="shape = $event"
      />
      <PercentInput 
        v-model="percentage" 
        :disabled="!!interval"
        @state-change="handleStateChange"
      />
      <Toggle
        :model-value="autoRestart"
        label="Restart automatically"
        @update:model-value="handleAutoRestartChange"
      />
      <div class="message-container">
        <p v-if="stateMessage" class="state-message" :class="currentState">
          {{ stateMessage }}
        </p>
        <p v-else class="state-message-placeholder">&nbsp;</p>
      </div>
    </div>
    <div class="button-container">
      <Button 
        v-if="!interval"
        label="Start!" 
        :onClick="startProgress" 
      />
      <Button 
        v-if="interval || percentage"
        :label="interval ? 'Stop' : 'Clear'" 
        :onClick="stopOrClear" 
        :variant="interval ? 'default' : 'clear'"
      />
      <Button label="Warning" :onClick="setWarning" variant="warning" />
      <Button label="Error" :onClick="setError" variant="error" />
    </div>
  </div>
</template>

<style scoped>
.progress-with-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 100%;
  max-width: 450px;
  min-width: 400px;
  max-height: 600px;
  flex: 1;
  padding: 1.5rem;
  border-radius: 8px;
  transition: box-shadow 0.3s ease;
}

.button-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  min-width: 360px;
}

.progress-container {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.message-container {
  min-height: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.state-message {
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0;
  text-align: center;
}

.state-message-placeholder {
  font-size: 0.9rem;
  margin: 0;
  visibility: hidden;
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

.progress-with-shape-selector {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  justify-content: center;
}
</style> 