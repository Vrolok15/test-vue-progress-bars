<script setup lang="ts">
import Button from './components/Button.vue'
import { ref } from 'vue'

const message = ref('')

const showMessage = () => {
  message.value = 'Hello, world!'
}
</script>

<template>
  <header>
  </header>

  <main>
    <Button label="Click me!" :onClick="showMessage" />
    <p v-if="message">{{ message }}</p>
  </main>
</template>

<style scoped>
p {
  margin-top: 1rem;
  font-size: 1.2rem;
}
</style>
