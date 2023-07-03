import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../Home.vue'),
        },
        {
            path: '/login',
            component: () => import('../Login.vue'),
            meta: {
                isPublic: true,
            },
        },
        {
            path: '/admin/portail',
            component: () => import('../vues/Admin/Portail.vue'),
        },
    ],
});

router.beforeEach((to, _from, next) => {
    if (!to.matched.some((route) => route.meta.isPublic)) {
        return next();
    }

    // TODO: should check with API if user is logged in and/or access rights
    // return http
    //     .fetchAccessToken()
    //     .then(() => next())
    //     .catch(() => {
    //         // should redirect to login page
    //         // and show an error message
    //         next({
    //             name: '/login',
    //             query: { ...to.query, redirect: to.path },
    //         });
    //     });
});

export default router;
