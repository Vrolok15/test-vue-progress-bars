<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, computed } from 'vue'

const router = useRouter()
const route = useRoute()
const isTransitioning = ref(false)

// Compute transition name based on current route
const transitionName = computed(() => 
  route.path === '/progress' ? 'slide-right' : 'slide-left'
)

// Debug transition events
const onBeforeEnter = (el: Element) => {
  console.log(`🟢 Before Enter: ${route.path}, transition: ${transitionName.value}`)
}

const onEnter = (el: Element) => {
  console.log(`✅ Enter: ${route.path}, transition: ${transitionName.value}`)
}

const onBeforeLeave = (el: Element) => {
  console.log(`🔴 Before Leave: ${route.path}, transition: ${transitionName.value}`)
  isTransitioning.value = true
}

const onLeave = (el: Element) => {
  console.log(`❌ Leave: ${route.path}, transition: ${transitionName.value}`)
}

const onAfterLeave = () => {
  console.log(`⚫ After Leave: ${route.path}, transition: ${transitionName.value}`)
  isTransitioning.value = false
}

const pages = [
  { path: '/progress', name: 'Progress Bars' },
  { path: '/pie', name: 'Pie Chart' }
]
</script>

<template>
  <header>
    <nav class="nav-menu">
      <button
        v-for="page in pages"
        :key="page.path"
        class="nav-button"
        :class="{ active: route.path === page.path }"
        @click="router.push(page.path)"
      >
        {{ page.name }}
      </button>
    </nav>
  </header>
  <div id="app">
    <main class="main-content">
      <router-view v-slot="{ Component, route }">
        <transition
          :name="transitionName"
          mode="out-in"
          @before-enter="onBeforeEnter"
          @enter="onEnter"
          @before-leave="onBeforeLeave"
          @leave="onLeave"
          @after-leave="onAfterLeave"
        >
          <component 
            :is="Component" 
            :key="route.path"
          />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
@import './assets/variables.css';


h1 {
  border-bottom: 2px solid var(--color-shadow);
  text-align: center;
  margin-bottom: 2rem;
  letter-spacing: 1rem;
  font-size: 3rem;
  width: 100vw;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-width: 100%;
  padding: 1rem 0;
}

.nav-menu {
  position: absolute;
  width: 100vw;
  top: 0;
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  box-shadow: 0 2px 10px var(--color-shadow);
  z-index: 10;
}

.main-content {
  flex: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.nav-button {
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--color-gray);
  font-size: 1rem;
  border-radius: 4px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.nav-button.active {
  color: var(--color-blue);
  background-color: rgba(33, 150, 243, 0.1);
}

/* Slide Transitions */
.slide-left-enter-active,
.slide-right-enter-active,
.slide-left-leave-active,
.slide-right-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  width: 100%;
}

/* Exit animations */
.slide-left-leave-to {
  transform: translateX(-100%); /* Progress Bars exits to the left */
  opacity: 0;
}

.slide-right-leave-to {
  transform: translateX(100%); /* Pie Chart exits to the right */
  opacity: 0;
}

/* Enter animations */
.slide-left-enter-from {
  transform: translateX(100%); /* Pie Chart enters from the right */
  opacity: 0;
}

.slide-right-enter-from {
  transform: translateX(-100%); /* Progress Bars enters from the left */
  opacity: 0;
}

/* Active states */
.slide-left-enter-to,
.slide-right-enter-to,
.slide-left-leave-from,
.slide-right-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
