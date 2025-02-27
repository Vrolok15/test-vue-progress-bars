<script setup lang="ts">
export type ProgressShape = 'circle' | 'dashboard' | 'bar'

interface Props {
  direction: 'prev' | 'next'
  disabled?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'click': []
}>()
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