import { createRouter, createWebHistory } from 'vue-router'
import TasksPage from './pages/TasksPage.vue'
import TaskDetailPage from './pages/task-detail-page/TaskDetailPage.vue'

const routes = [
  {
    path: '/',
    name: 'Tasks',
    component: TasksPage,
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
