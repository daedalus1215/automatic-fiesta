import { createRouter, createWebHistory } from 'vue-router'
import TasksPage from './pages/TasksPage.vue'
import TaskDetailPage from './pages/TaskDetailPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TasksPage,
  },
  {
    path: '/task/:id',
    name: 'TaskDetail',
    component: TaskDetailPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
