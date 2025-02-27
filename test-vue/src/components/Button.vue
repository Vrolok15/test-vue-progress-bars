<script setup lang="ts">
interface Props {
  label: string
  onClick: () => void
  variant?: 'default' | 'clear' | 'warning' | 'error'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
})
</script>

<template>
  <button 
    class="custom-button" 
    :class="variant"
    @click="onClick"
  >
    {{ label }}
  </button>
</template>

<style>
@import '../assets/variables.css';
</style>

<style scoped>
.custom-button {
  padding: 8px 16px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  background-color: var(--color-green);
}

.custom-button.clear {
  background-color: var(--color-blue);
}

.custom-button.warning {
  background-color: var(--color-orange);
}

.custom-button.error {
  background-color: var(--color-red);
}

.custom-button:hover {
  opacity: 0.9;
}
</style> 