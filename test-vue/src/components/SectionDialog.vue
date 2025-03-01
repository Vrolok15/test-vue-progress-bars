<script setup lang="ts">
import { ref, watch } from 'vue'
import PercentInput from './PercentInput.vue'
import Button from './Button.vue'
import DialogInput from './DialogInput.vue'

interface Props {
  modelValue: boolean
  name: string
  color: string
  percentage: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'update:name': [value: string]
  'update:color': [value: string]
  'update:percentage': [value: number]
  'save': [updates: { name: string, color: string, percentage: number }]
  'close': []
}>()

const localName = ref(props.name)
const localColor = ref(props.color)
const localPercentage = ref(props.percentage)

const colors = [
  { name: 'Blue', value: 'var(--color-blue)' },
  { name: 'Green', value: 'var(--color-green)' },
  { name: 'Red', value: 'var(--color-red)' },
  { name: 'Orange', value: 'var(--color-orange)' },
  { name: 'Brown', value: 'var(--color-brown)' },
  { name: 'Yellow', value: 'var(--color-yellow)' },
  { name: 'Purple', value: 'var(--color-purple)' },
  { name: 'Pink', value: 'var(--color-pink)' }
]

watch(() => props.name, (newName) => {
  localName.value = newName
})

watch(() => props.color, (newColor) => {
  localColor.value = newColor
})

watch(() => props.percentage, (newPercentage) => {
  localPercentage.value = newPercentage
})

const handleSave = () => {
  emit('save', {
    name: localName.value,
    color: localColor.value,
    percentage: localPercentage.value
  })
  emit('update:modelValue', false)
}

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}
</script>

<template>
  <dialog :open="modelValue" class="section-dialog">
    <div class="dialog-content">
      <h3>Edit Section</h3>
      <div class="input-group">
        <DialogInput
          v-model="localName"
          label="Name"
          :sectionColor="localColor"
          :maxLength="15"
        />
      </div>
      <div class="input-group">
        <DialogInput
          v-model="localColor"
          label="Color"
          type="select"
          :options="colors"
        />
      </div>
      <div class="input-group">
        <DialogInput
          v-model="localPercentage"
          label="Percentage"
          type="percent"
        />
      </div>
      <div class="dialog-buttons">
        <Button @click="handleClose" label="Cancel" variant="clear" />
        <Button @click="handleSave" label="Save" />
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.section-dialog {
  background-color: var(--color-background);
  border: none;
  border-radius: 8px;
  padding: 0;
  box-shadow: 0 4px 12px var(--color-shadow);
}

.dialog-content {
  padding: 1.5rem;
  min-width: 300px;
}

h3 {
  margin: 0 0 1.5rem 0;
  border-bottom: 1px solid var(--color-shadow);
  color: var(--color-gray);
  font-size: 1.2rem;
}

.input-group {
  margin-bottom: 1rem;
}

.input-group:last-of-type {
  margin-bottom: 1.5rem;
}

label {
  color: var(--color-gray);
}

input, select {
  padding: 0.5rem;
  border: 1px solid var(--color-shadow);
  border-radius: 4px;
  font-size: 0.9rem;
  width: 100%;
}

select {
  cursor: pointer;
}

.dialog-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
</style> 