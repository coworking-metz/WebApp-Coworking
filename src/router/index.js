import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../Home.vue')
        },
        {
            path: '/login',
            component: () => import('../Login.vue')
        }
    ]
})