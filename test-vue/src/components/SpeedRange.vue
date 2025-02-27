<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: number
  disabled?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const updateValue = (event: Event) => {
  const input = event.target as HTMLInputElement
  // Invert the range value to speed value
  const rangeValue = Number(input.value)
  const speedValue = 225 - rangeValue // 225 because 25 + 200 = 225, so 200 -> 25ms and 0 -> 200ms
  emit('update:modelValue', speedValue)
}

const rangeValue = computed(() => 225 - props.modelValue)

const speedLabel = computed(() => {
  if (props.modelValue <= 25) return 'Very Fast'
  if (props.modelValue <= 50) return 'Fast'
  if (props.modelValue <= 75) return 'Quick'
  if (props.modelValue <= 100) return 'Normal'
  if (props.modelValue <= 125) return 'Slow'
  return 'Very Slow'
})
</script>

<template>
  <div class="speed-range">
    <label>Speed: {{ speedLabel }} ({{ modelValue }}ms)</label>
    <input
      type="range"
      :value="rangeValue"
      min="75"
      max="200"
      step="25"
      @input="updateValue"
    >
  </div>
</template>

<style scoped>
.speed-range {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 200px;
}

label {
  font-size: 0.9rem;
  color: var(--color-gray);
}

input[type="range"] {
  width: 100%;
  cursor: pointer;
}

input[type="range"]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style> 