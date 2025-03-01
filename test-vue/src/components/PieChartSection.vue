<script setup lang="ts">
import { ref } from 'vue'
import IconButton from './IconButton.vue'
import type { Section } from '../pages/PieChart.vue'

interface Props {
  name: string
  color: string
  percentage: number
  isEditing?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isEditing: false
})

const emit = defineEmits<{
  'edit': []
  'delete': []
}>()

const handleEdit = () => {
  emit('edit')
}

const handleDelete = () => {
  emit('delete')
}
</script>

<template>
  <div class="section" :class="{ editing: isEditing }">
    <div class="info-group" style="min-width: 100px;">
      <span class="label">Name:</span>
      <span class="value" :style="{ color: color, textShadow: '0 0 4px var(--color-shadow)' }">{{ name }}</span>
    </div>
    <div class="info-group">
      <span class="label">Color:</span>
      <span class="color-preview" :style="{ backgroundColor: color, boxShadow: '0 0 4px var(--color-shadow)' }"></span>
    </div>
    <div class="info-group">
      <span class="label">Percentage:</span>
      <span class="value">{{ percentage }}%</span>
    </div>
    <div class="actions">
      <IconButton @click="handleEdit" icon="edit" variant="clear" />
      <IconButton @click="handleDelete" icon="delete" variant="error" />
    </div>
  </div>
</template>

<style scoped>
.section {
  padding: 1rem;
  border: 1px solid var(--color-shadow);
  border-radius: 4px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  box-sizing: border-box;
}

@media (max-width: 1024px) {
  .section {
    flex-direction: column;
  }

  .actions {
    margin-right: auto;
    margin-top: 1rem;
  }
}

.info-group {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.label {
  color: var(--color-gray);
  font-size: 0.9rem;
}

.value {
  font-weight: 500;
}

.color-preview {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid var(--color-shadow);
}

.actions {
  margin-left: auto;
  align-items: flex-end;
  display: flex;
  gap: 0.25rem;
}

.section.editing {
  box-shadow: 0 0 4px var(--color-blue-shadow);
}
</style> 