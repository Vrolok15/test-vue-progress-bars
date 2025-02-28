<script setup lang="ts">
interface Props {
  icon: string
  variant?: 'primary' | 'error' | 'clear'
}

defineProps<Props>()
</script>

<template>
  <button :class="['icon-button', variant]">
    <span class="material-symbols-outlined">{{ icon }}</span>
  </button>
</template>

<style scoped>
.icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: transparent;
  transition: all 0.2s;
}

.primary {
  color: var(--color-blue);
}

.error {
  color: var(--color-red);
}

.clear {
  color: var(--color-gray);
}

.icon-button:hover {
  background-color: var(--color-shadow);
}

.material-symbols-outlined {
  font-size: 20px;
}
</style> 