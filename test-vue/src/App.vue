<script setup lang="ts">
import ProgressBarWithControls from './components/ProgressBarWithControls.vue'
</script>

<template>
  <div class="progress-bar-container">
    <ProgressBarWithControls :default-speed="125" />
    <ProgressBarWithControls :default-speed="100" />
    <ProgressBarWithControls :default-speed="75" />
  </div>
</template>

<style>
@import './assets/variables.css';

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
}

.progress-bar-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 1600px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

@media (min-width: 1000px) {
  .progress-bar-container {
    flex-direction: row;
    gap: 1.5rem;
  }
}
</style>
