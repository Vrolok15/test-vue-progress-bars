<script setup lang="ts">
import ProgressBarWithControls from './components/ProgressBarWithControls.vue'
</script>

<template>
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
</template>

<style>
@import './assets/variables.css';

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100%;
  padding: 2rem;
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

/* Remove unused .progress-bar-container styles */
</style>
