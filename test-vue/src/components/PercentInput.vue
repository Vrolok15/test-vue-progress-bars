<script setup lang="ts">
const props = defineProps<{
  modelValue: number,
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const updateValue = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = Math.min(100, Math.max(0, Number(input.value)))
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="percent-input">
    <input 
      type="number" 
      :value="modelValue"
      :disabled="disabled"
      min="0"
      max="100"
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