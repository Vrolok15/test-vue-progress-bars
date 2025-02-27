<script setup lang="ts">
import ProgressBarWithControls from '../components/ProgressBarWithControls.vue'
</script>

<template>
  <div class="page">
    <h1>Progress Bars</h1>
    <div class="progress-bars">
      <ProgressBarWithControls 
        defaultShape="circle"
        :defaultSpeed="125"
      />
      <ProgressBarWithControls 
        defaultShape="dashboard"
        :defaultSpeed="100"
      />
      <ProgressBarWithControls 
        defaultShape="bar"
        :defaultSpeed="75"
      />
    </div>
  </div>
</template>

<style scoped>
.page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
}

.progress-bars {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  width: 100%;
  max-width: 1400px;
  padding: 0 1rem;
}

@media (min-width: 1400px) {
  .progress-bars {
    padding: 0;
  }
}
</style> 