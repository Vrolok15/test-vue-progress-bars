<script setup lang="ts">
import ColorPicker from './ColorPicker.vue'

interface Props {
  modelValue: string | number
  label: string
  placeholder?: string
  type?: 'text' | 'select' | 'percent'
  options?: { name: string, value: string }[]
  sectionColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  type: 'text',
  sectionColor: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const handlePercentInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  const value = input.value
  
  // Allow decimal point
  if (value.endsWith('.')) {
    emit('update:modelValue', value)
    return
  }

  // Try to add decimal point for values over 100
  if (+value > 100) {
    const digits = value.replace(/\D/g, '')
    if (digits.length > 2) {
      const withDecimal = digits.slice(0, -1) + '.' + digits.slice(-1)
      if (+withDecimal <= 100) {
        input.value = withDecimal
        emit('update:modelValue', +withDecimal)
        return
      }
    }
    // If can't make valid decimal, revert to previous value
    input.value = props.modelValue.toString()
    return
  }

  const numValue = +value
  if (numValue >= 0) {
    emit('update:modelValue', numValue)
  }
}

const handleBlur = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value

  // Handle empty or invalid input
  if (value === '' || isNaN(+value)) {
    input.value = '0'
    emit('update:modelValue', 0)
    return
  }

  // Round to one decimal place on blur
  const rounded = Math.round(+value * 10) / 10
  input.value = rounded.toString()
  emit('update:modelValue', rounded)
}
</script>

<template>
  <div class="dialog-input">
    <label>{{ label }}</label>
    <div class="input-container">
      <input 
        v-if="type === 'text'"
        :value="modelValue"
        :style="{ color: sectionColor }"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :placeholder="placeholder"
      />
      <ColorPicker
        v-else-if="type === 'select'"
        :modelValue="modelValue as string"
        @update:modelValue="$emit('update:modelValue', $event)"
      />
      <div v-else class="percent-input">
        <input
          type="number"
          :value="modelValue"
          @input="handlePercentInput"
          @blur="handleBlur"
          min="0"
          max="100"
          step="0.1"
        />
        <span class="percent-symbol">%</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog-input {
  border: 1px solid var(--color-shadow);
  border-radius: 4px;
  padding: 0.75rem;
  background-color: var(--color-background);
  transition: all 0.2s;
}

.dialog-input:focus-within {
  border: 1px solid var(--color-blue-shadow);
}

label {
  display: block;
  color: var(--color-gray);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.input-container {
  display: flex;
  min-height: 40px; /* Match color preview height */
  align-items: center;
}

input, select {
  flex: 1;
  border: none;
  background: transparent;
  padding: 0;
  font-size: 0.9rem;
  color: var(--color-gray);
  width: 100%;
}

input:focus, select:focus {
  outline: none;
}

select {
  cursor: pointer;
}

.percent-input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.percent-symbol {
  color: var(--color-gray);
  font-size: 0.9rem;
}

input[type="number"] {
  appearance: textfield;
  -moz-appearance: textfield;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}
</style> 