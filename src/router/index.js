import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/Home.vue')
  },
  {
    path: '/',
    name: 'AddCars',
    component: () => import('../components/AddCars.vue')
  },
  {
    path: '/',
    name: 'TaskManager',
    component: () => import('../components/SetTasks.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router