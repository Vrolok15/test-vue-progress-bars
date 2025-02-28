<script setup lang="ts">
import { ref } from 'vue'
import PercentInput from './PercentInput.vue'

interface Props {
  name: string
  color: string
  percentage: number
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  color: 'var(--color-blue)',
  percentage: 0
})

const emit = defineEmits<{
  'update:name': [value: string]
  'update:color': [value: string]
  'update:percentage': [value: number]
}>()

const localName = ref(props.name)

const colors = [
  { name: 'Blue', value: 'var(--color-blue)' },
  { name: 'Green', value: 'var(--color-green)' },
  { name: 'Red', value: 'var(--color-red)' },
  { name: 'Orange', value: 'var(--color-orange)' }
]

const handlePercentChange = (value: number | null) => {
  emit('update:percentage', value ?? 0)
}
</script>

<template>
  <div class="section">
    <div class="input-group">
      <label>Name:</label>
      <input 
        type="text"
        v-model="localName"
        @input="$emit('update:name', localName)"
        placeholder="Section name"
      >
    </div>
    <div class="input-group">
      <label>Color:</label>
      <select 
        :value="color"
        @change="$emit('update:color', ($event.target as HTMLSelectElement).value)"
      >
        <option 
          v-for="color in colors" 
          :key="color.value"
          :value="color.value"
        >
          {{ color.name }}
        </option>
      </select>
    </div>
    <div class="input-group">
      <label>Percentage:</label>
      <PercentInput
        :model-value="percentage"
        @update:model-value="handlePercentChange"
      />
    </div>
  </div>
</template>

<style scoped>
.section {
  padding: 1rem;
  border: 1px solid var(--color-shadow);
  border-radius: 4px;
  margin-bottom: 1rem;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.input-group:last-child {
  margin-bottom: 0;
}

label {
  min-width: 80px;
  color: var(--color-gray);
}

input, select {
  flex: 1;
  padding: 0.3rem 0.5rem;
  border: 1px solid var(--color-shadow);
  border-radius: 4px;
  font-size: 0.9rem;
}

select {
  cursor: pointer;
}
</style> 