import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('@/views/Public/PublicLayout.vue'),
            meta: {
                allowAnonymous: true,
            },
            children: [
                { path: '', redirect: { name: 'login' } },
                {
                    path: 'login',
                    name: 'login',
                    component: () => import('@/views/Public/LoginPage.vue'),
                },
            ],
        },
        {
            path: '',
            component: () => import('@/views/Private/PrivateLayout.vue'),
            children: [
                { path: '', redirect: { name: 'home' } },
                {
                    path: 'home',
                    name: 'home',
                    component: () => import('@/views/Private/HomePage.vue'),
                },
            ],
        },
        { path: '/:catchAll(.*)', redirect: '/' },
    ],
});
