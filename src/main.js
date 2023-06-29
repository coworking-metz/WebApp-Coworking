import { createApp } from 'vue'
import App from './App.vue'
// import './index.css'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)


createApp(App)
    .use(router)
    .provide('router', router)
    .use(pinia)
    .mount('#app')