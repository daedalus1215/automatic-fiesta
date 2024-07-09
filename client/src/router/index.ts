// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import TaskPage from '../pages/home/TaskPage.vue';

const routes = [
    {
        path: '/',
        name: 'TaskPage',
        component: TaskPage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
