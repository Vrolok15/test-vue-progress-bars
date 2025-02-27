<script setup lang="ts">
import { computed } from 'vue'
import type { ProgressShape } from './ShapeSelector.vue'
import ShapeSelector from './ShapeSelector.vue'

interface Props {
  progress: number
  state?: 'progress' | 'complete' | 'warning' | 'error'
  speed?: number
  shape?: ProgressShape
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  state: 'progress',
  speed: 100,
  shape: 'circle',
  disabled: false
})

const emit = defineEmits<{
  'update:shape': [value: ProgressShape]
}>()

const radius = 40
const circumference = 2 * Math.PI * radius

const stateColors = {
  progress: 'var(--color-blue)',
  complete: 'var(--color-green)',
  warning: 'var(--color-orange)',
  error: 'var(--color-red)'
}

const strokeColor = computed(() => stateColors[props.state])
const showIcon = computed(() => props.state === 'warning' || props.state === 'error' || props.state === 'complete')
const iconName = computed(() => props.state === 'complete' ? 'check_circle' : props.state)

// Make reverse transition speed proportional to current speed (half the interval time)
const transitionDuration = computed(() => Math.max(props.speed * 0.5, 50) + 'ms')

const renderShape = computed(() => {
  const baseShape = {
    startAngle: 0,
    endAngle: 360,
    radius: 40,
    shape: props.shape,
    isBar: false,
    isVertical: false
  }

  switch (props.shape) {
    case 'dashboard':
      return {
        ...baseShape,
        viewBox: '0 0 100 60',
        startAngle: -90,
        endAngle: 90
      }
    case 'bar':
      return {
        ...baseShape,
        viewBox: '0 0 100 10',
        isBar: true
      }
    default: // circle
      return {
        ...baseShape,
        viewBox: '0 0 100 100'
      }
  }
})

// Helper functions
const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  }
}

const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
  // For a complete circle, we need to handle it specially
  if (endAngle - startAngle === 360) {
    return [
      "M", x - radius, y, // Start from the leftmost point
      "A", radius, radius, 0, 1, 0, x + radius, y, // Draw top half
      "A", radius, radius, 0, 1, 0, x - radius, y  // Draw bottom half
    ].join(" ")
  }

  // For partial arcs, use the existing logic
  const start = polarToCartesian(x, y, radius, endAngle)
  const end = polarToCartesian(x, y, radius, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ")
}

const shapes: ProgressShape[] = ['circle', 'dashboard', 'bar']
const currentIndex = computed(() => shapes.indexOf(props.shape))

const switchShape = (direction: 'prev' | 'next') => {
  const newIndex = direction === 'next' 
    ? (currentIndex.value + 1) % shapes.length
    : (currentIndex.value - 1 + shapes.length) % shapes.length
  
  emit('update:shape', shapes[newIndex])
}
</script>

<template>
  <div class="progress-container">
    <div class="shape-name">{{ shape }}</div>
    <div class="progress-with-shape">
      <ShapeSelector
        direction="prev"
        @click="switchShape('prev')"
      />
      <div class="progress-display">
        <div class="progress-circle">
          <svg v-if="!renderShape.isBar && !renderShape.isVertical" 
            width="150" 
            height="150" 
            :viewBox="renderShape.viewBox"
          >
            <!-- Background arc -->
            <path
              :d="describeArc(50, renderShape.shape === 'dashboard' ? 50 : 50, renderShape.radius, renderShape.startAngle, renderShape.endAngle)"
              fill="none"
              stroke="var(--color-shape-background)"
              stroke-width="5"
            />
            <!-- Progress arc -->
            <path
              :d="describeArc(50, renderShape.shape === 'dashboard' ? 50 : 50, renderShape.radius, renderShape.startAngle, renderShape.startAngle + (renderShape.endAngle - renderShape.startAngle) * progress / 100)"
              fill="none"
              :stroke="strokeColor"
              stroke-width="5"
              stroke-linecap="round"
              :style="{ transition: `d ${transitionDuration}` }"
            />
            <!-- Percentage text or icon -->
            <text
              v-if="!showIcon"
              x="50"
              y="50"
              text-anchor="middle"
              dominant-baseline="middle"
              font-size="16"
              :fill="strokeColor"
            >
              {{ Math.round(progress) }}%
            </text>
            <foreignObject
              v-else
              x="30"
              y="30"
              width="40"
              height="40"
            >
              <span
                class="material-symbols-outlined"
                :style="{ color: strokeColor }"
              >
                {{ iconName }}
              </span>
            </foreignObject>
          </svg>

          <svg v-else-if="renderShape.isBar"
            width="150"
            height="100"
            viewBox="0 0 100 40"
          >
            <!-- Text/Icon container -->
            <text
              v-if="!showIcon"
              x="50"
              y="5"
              text-anchor="middle"
              dominant-baseline="middle"
              font-size="16"
              :fill="strokeColor"
            >
              {{ Math.round(progress) }}%
            </text>
            <foreignObject
              v-else
              x="30"
              y="-20"
              width="40"
              height="40"
            >
              <span
                class="material-symbols-outlined"
                :style="{ color: strokeColor }"
              >
                {{ iconName }}
              </span>
            </foreignObject>

            <!-- Progress bar -->
            <rect
              x="0"
              y="20"
              width="100"
              height="6"
              fill="white"
              stroke="var(--color-shape-background)"
              stroke-width="1"
              rx="3"
            />
            <rect
              x="1"
              y="20"
              :width="progress"
              height="6"
              :fill="strokeColor"
              rx="3"
              :style="{ transition: `width ${transitionDuration}` }"
            />
          </svg>

          <svg v-else
            width="8"
            height="150"
            viewBox="0 0 10 100"
          >
            <rect
              x="2"
              y="0"
              width="6"
              height="100"
              fill="white"
              stroke="var(--color-shape-background)"
              stroke-width="1"
              rx="3"
            />
            <rect
              x="2"
              y="0"
              width="6"
              :height="100 - progress"
              :fill="strokeColor"
              rx="3"
              transform="scale(1,-1) translate(0,-100)"
              :style="{ transition: `height ${transitionDuration}` }"
            />
          </svg>
        </div>
      </div>
      <ShapeSelector
        direction="next"
        @click="switchShape('next')"
      />
    </div>
  </div>
</template>

<style>
@import '../assets/variables.css';
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');
</style>

<style scoped>
.progress-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.progress-with-shape {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  justify-content: center;
}

.shape-name {
  color: var(--color-gray);
  text-transform: capitalize;
  font-size: 0.9rem;
}

.progress-display {
  width: 150px;
  height: 150px;
}

.progress-circle {
  position: relative; /* Add for absolute positioning context */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

/* Center horizontal bar */
svg[viewBox="0 0 100 10"] {
  margin: auto 0;
}

/* Center vertical bar */
svg[viewBox="0 0 10 100"] {
  margin: 0 auto;
}

circle {
  transition: stroke 0.3s ease;
}

.material-symbols-outlined {
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}

.material-symbols-outlined.small {
  font-size: 16px;
}
</style> 