import { createApp } from 'vue';
import App from './App.vue';
import router from './router/routes';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { useAuthStore } from './stores/auth';
import HTTP from './services/http';
import createHttpInterceptors from './services/interceptors';
import './style.css';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(router);
app.use(pinia);

createHttpInterceptors(HTTP);

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    const { refreshToken, accessToken, redirect, ...otherQueryParams } = to.query;

    (async () => {
        // retrieve tokens from query params
        if (accessToken) {
            authStore.setAccessToken(accessToken);
        }

        if (refreshToken) {
            authStore.setRefreshToken(refreshToken);
        }

        if (!to.meta.allowAnonymous) {
            // fetch an access token if it's not present
            if (!authStore.accessToken) {
                await authStore.fetchTokens();
            }
        }

        if (redirect && to.name !== 'login') {
            const targetRoute = router.resolve({ path: redirect });
            if (targetRoute) return next({ path: targetRoute.path, query: otherQueryParams });
        }

        next();
    })().catch((error) => {
        // When user has invalid session,
        // set redirectPath to allow loging page to redirect user on desired page afterwards
        next({
            name: 'login',
            query: { ...otherQueryParams, redirect: to.path },
        });
        return Promise.reject(error);
    });
});

app.mount('#app');
