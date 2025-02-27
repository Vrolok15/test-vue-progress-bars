<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  progress: number
  state?: 'progress' | 'complete' | 'warning' | 'error'
  speed?: number
}

const props = withDefaults(defineProps<Props>(), {
  state: 'progress',
  speed: 100
})

const radius = 40
const circumference = 2 * Math.PI * radius

const stateColors = {
  progress: 'var(--color-blue)',
  complete: 'var(--color-green)',
  warning: 'var(--color-orange)',
  error: 'var(--color-red)'
}

const strokeColor = computed(() => stateColors[props.state])
const showIcon = computed(() => props.state === 'warning' || props.state === 'error' || props.state === 'complete')
const iconName = computed(() => props.state === 'complete' ? 'check_circle' : props.state)

// Make reverse transition speed proportional to current speed (half the interval time)
const transitionDuration = computed(() => Math.max(props.speed * 0.5, 50) + 'ms')
</script>

<template>
  <div class="progress-circle">
    <svg width="150" height="150" viewBox="0 0 100 100">
      <!-- Background circle -->
      <circle
        cx="50"
        cy="50"
        :r="radius"
        fill="none"
        stroke="#eee"
        stroke-width="5"
      />
      <!-- Progress circle -->
      <circle
        cx="50"
        cy="50"
        :r="radius"
        fill="none"
        :stroke="strokeColor"
        stroke-width="5"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="circumference - (progress / 100) * circumference"
        transform="rotate(-90 50 50)"
        :style="{ transition: `stroke-dashoffset ${transitionDuration}` }"
      />
      <!-- Percentage text or icon -->
      <text
        v-if="!showIcon"
        x="50"
        y="50"
        text-anchor="middle"
        dominant-baseline="middle"
        font-size="16"
        :fill="strokeColor"
      >
        {{ Math.round(progress) }}%
      </text>
      <foreignObject
        v-else
        x="30"
        y="30"
        width="40"
        height="40"
      >
        <span
          class="material-symbols-outlined"
          :style="{ color: strokeColor }"
        >
          {{ iconName }}
        </span>
      </foreignObject>
    </svg>
  </div>
</template>

<style>
@import '../assets/variables.css';
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');
</style>

<style scoped>
.progress-circle {
  display: flex;
  justify-content: center;
  align-items: center;
}

circle {
  transition: stroke 0.3s ease;
}

.material-symbols-outlined {
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}
</style> 