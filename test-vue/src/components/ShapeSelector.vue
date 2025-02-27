<script setup lang="ts">
import { computed } from 'vue'

export type ProgressShape = 'circle' | 'dashboard' | 'bar'

interface Props {
  direction: 'prev' | 'next'
  disabled?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'click': []
}>()

const shapes: ProgressShape[] = ['circle', 'dashboard', 'bar']

const currentIndex = computed(() => shapes.indexOf(props.modelValue))

const switchShape = (direction: 'prev' | 'next') => {
  if (props.disabled) return
  
  const newIndex = direction === 'next' 
    ? (currentIndex.value + 1) % shapes.length
    : (currentIndex.value - 1 + shapes.length) % shapes.length
  
  emit('update:modelValue', shapes[newIndex])
}
</script>

<template>
  <button 
    class="arrow-button"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <span class="material-symbols-outlined">
      {{ direction === 'prev' ? 'chevron_left' : 'chevron_right' }}
    </span>
  </button>
</template>

<style scoped>
.arrow-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: var(--color-gray);
  border-radius: 4px;
}

.arrow-button:hover:not(:disabled) {
  background-color: rgba(0, 0, 0, 0.05);
}

.arrow-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style> 