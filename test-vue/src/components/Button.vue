<script setup lang="ts">
interface Props {
  label?: string
  variant?: 'primary' | 'error' | 'clear' | 'warning' | 'default'
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  variant: 'primary',
  icon: ''
})
</script>

<template>
  <button :class="['button', variant]">
    <span v-if="icon" class="material-symbols-outlined">{{ icon }}</span>
    <span v-else>{{ label }}</span>
  </button>
</template>

<style>
@import '../assets/variables.css';
</style>

<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  min-width: 32px;
  min-height: 32px;
  transition: all 0.2s;
}

.primary {
  background-color: var(--color-blue);
  color: white;
}

.error {
  background-color: var(--color-red);
  color: white;
}

.clear {
  background-color: transparent;
  color: var(--color-gray);
}

.clear:hover {
  background-color: var(--color-shadow);
}

.material-symbols-outlined {
  font-size: 20px;
}

.warning {
  background-color: var(--color-orange);
  color: white;
}

.default {
  background-color: var(--color-green);
  color: white;
}
</style> 