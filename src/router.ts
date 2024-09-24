import { createRouter, createWebHistory } from 'vue-router';
import TaskDetailPage from './pages/task-detail-page/TaskDetailPage.vue';
import HomePage from './pages/home/HomePage.vue';
import TagHomePage from './pages/tags/TagHomePage.vue';
import TagDetailPage from './pages/tags/tag-detail-page/TagDetailPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/task/:id',
    name: 'Task',
    component: TaskDetailPage,
  },
  {
    path: '/tag',
    name: 'TagHome',
    component: TagHomePage,
  },
  {
    path: '/tag/:id',
    name: 'TagDetail',
    component: TagDetailPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
