<script setup lang="ts">
interface Props {
  modelValue: number | null
  disabled?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
  'stateChange': [state: 'progress' | 'complete' | 'warning' | 'error', message?: string]
}>()

const updateValue = (event: Event) => {
  const input = event.target as HTMLInputElement
  const value = input.value

  if (value === '') {
    emit('update:modelValue', null)
    emit('stateChange', 'warning', 'No value')
    return
  }

  const numValue = Number(value)
  if (isNaN(numValue)) {
    emit('stateChange', 'error', 'Input is not a number')
    return
  }

  const boundedValue = Math.min(100, Math.max(0, numValue))
  emit('update:modelValue', boundedValue)
  
  if (boundedValue === 100) {
    emit('stateChange', 'complete')
  } else {
    emit('stateChange', 'progress')
  }
}
</script>

<template>
  <div class="percent-input">
    <input 
      :value="modelValue ?? ''"
      :disabled="disabled"
      @input="updateValue"
    >
    <span>%</span>
  </div>
</template>

<style scoped>
.percent-input {
  display: flex;
  align-items: center;
  gap: 4px;
}

input {
  width: 80px;
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input:focus {
  outline: none;
  border-color: #4CAF50;
}

input:disabled {
  background-color: #f5f5f5;
  color: #666;
  cursor: not-allowed;
  opacity: 0.8;
}
</style> 