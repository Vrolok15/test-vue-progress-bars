<script setup lang="ts">
defineProps<{
  label: string,
  onClick: () => void
}>()
</script>

<template>
  <button class="custom-button" @click="onClick">
    {{ label }}
  </button>
</template>

<style scoped>
.custom-button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.custom-button:hover {
  background-color: #45a049;
}
</style> 