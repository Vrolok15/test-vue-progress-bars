<script setup lang="ts">
import { ref } from 'vue'
import ColorPicker from '@radial-color-picker/vue-color-picker'
import '@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css'

interface Props {
  modelValue: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)
const hue = ref(0)
const saturation = ref(100)
const luminosity = ref(50)

const hslToHex = (h: number, s: number, l: number): string => {
  l /= 100
  const a = s * Math.min(l, 1 - l) / 100
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

const handleInput = (hue: number) => {
  const hexColor = hslToHex(hue, saturation.value, luminosity.value)
  emit('update:modelValue', hexColor)
}

const handleSelect = () => {
  const hexColor = hslToHex(hue.value, saturation.value, luminosity.value)
  emit('update:modelValue', hexColor)
  isOpen.value = false
}
</script>

<template>
  <div class="color-picker-container">
    <button 
      class="color-preview" 
      :style="{ backgroundColor: modelValue }"
      @click="isOpen = !isOpen"
    />
    <div v-if="isOpen" class="picker-content">
      <ColorPicker
        v-model:hue="hue"
        :saturation="saturation"
        :luminosity="luminosity"
        @select="handleSelect"
        @input="handleInput"
      />
    </div>
  </div>
</template>

<style scoped>
.color-picker-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
}

.color-preview {
  width: 40px;
  height: 40px;
  border: 2px solid var(--color-shadow);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.color-preview:hover {
  transform: scale(1.1);
}

.picker-content {
  padding: 1rem;
  background: var(--color-background);
  border-radius: 8px;
  box-shadow: 0 4px 12px var(--color-shadow);
}
</style> 