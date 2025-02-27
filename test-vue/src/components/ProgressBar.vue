<script setup lang="ts">
defineProps<{
  progress: number
}>()

const radius = 40
const circumference = 2 * Math.PI * radius
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
        stroke="#4CAF50"
        stroke-width="5"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="circumference - (progress / 100) * circumference"
        transform="rotate(-90 50 50)"
      />
      <!-- Percentage text -->
      <text
        x="50"
        y="50"
        text-anchor="middle"
        dominant-baseline="middle"
        font-size="16"
        fill="#666"
      >
        {{ Math.round(progress) }}%
      </text>
    </svg>
  </div>
</template>

<style scoped>
.progress-circle {
  display: flex;
  justify-content: center;
  align-items: center;
}

circle {
  transition: stroke-dashoffset 0.3s ease;
}
</style> 