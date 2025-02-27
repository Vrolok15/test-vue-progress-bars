import { createRouter, createWebHistory } from 'vue-router'
import ProgressBars from './pages/ProgressBars.vue'
import PieChart from './pages/PieChart.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/progress'
    },
    {
      path: '/progress',
      component: ProgressBars
    },
    {
      path: '/pie',
      component: PieChart
    }
  ]
})

export default router 