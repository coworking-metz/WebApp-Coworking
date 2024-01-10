<template>
    <article class="container">
        <section v-if="state.isLoading" class="hero is-fullheight">
            <div class="hero-body">
                <progress class="progress is-small is-primary" max="100">
                    Chargement en cours
                </progress>
            </div>
        </section>
        <template v-else>
            <section class="section">
                <div class="columns is-centered">
                    <div class="column is-5-widescreen">
                        <div align="center" class="mb-4">
                            <template v-if="authStore.user?.roles.includes('external')">
                                <a href="https://bliiida.fr">
                                    <img
                                        id="blida-logo"
                                        alt="Bliiida logo"
                                        src="./assets/bliiida.png"
                                        style="max-width: 80%; width: 200px" />
                                </a>
                            </template>
                            <template v-else>
                                <a href="https://coworking-metz.fr">
                                    <img
                                        alt="Coworking logo"
                                        src="./assets/logo.png"
                                        style="max-width: 80%; width: 200px" />
                                </a>
                            </template>
                        </div>
                        <router-view />
                    </div>
                </div>
            </section>
            <section class="section is-flex">
                <small class="mx-auto">Version {{ version }}</small>
            </section>
        </template>
    </article>
</template>

<script setup>
import { useAuthStore } from './stores/auth';
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const state = reactive({
    isLoading: true, // TODO: render a loader until the router is done loading the page
});

const version = computed(() => {
    return __GIT_HASH__;
});

router.isReady().finally(() => {
    state.isLoading = false;
});
</script>
