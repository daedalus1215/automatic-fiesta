import { createRouter, createWebHistory } from 'vue-router'
import TaskDetailPage from './pages/task-detail-page/TaskDetailPage.vue'

const routes = [
    {
      path: '/',
      name: 'Home',
    },
  {
    path: '/task/:id',
    name: 'Task',
    component: TaskDetailPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
