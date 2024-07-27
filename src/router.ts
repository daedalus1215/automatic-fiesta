import { createRouter, createWebHistory } from 'vue-router'
import TaskDetailPage from './pages/task-detail-page/TaskDetailPage.vue'
import HomePage from './pages/home/HomePage.vue'

const routes = [
    {
      path: '/',
      name: 'Home',
      component: HomePage
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
