<template>
    <section class="hero is-fullheight" style="background-color: #f2af10;">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                        <center class="mb-2">
                            <img src="./assets/logo.png" style="width:100%"><br>
                        </center>
                        <div class="box">
                            <template v-if="data.ready">
                                <h2 class="title">Coworking App</h2>
                                <p class="subtitle is-7">Compte connecté: {{ auth.identifiant }}</p>

                                <hr>
                                <portail />
                                <hr>
                                <presence />
                            </template>
                            <template v-else>
                                <center>
                                    <p>Chargement en cours</p><button class="button is-loading" style="border: 0;"></button>
                                </center>
                            </template>
                        </div>
                        <div v-if="data.ready">
                            <button class="button is-text" @click="deconnecter">Se déconnecter</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { reactive, onMounted, inject } from 'vue';
import { useAuthStore } from '@/stores/auth'
import Portail from '@/components/Portail.vue';
import Presence from '@/components/Presence.vue';
const router = inject('router');

const data = reactive({ ready: false });
const auth = useAuthStore();

onMounted(() => {
    if (!auth.id) router.push('/login');
    auth.getSettings().then(() => {
        console.log('settings loaded');
        auth.getDroits().then(() => {
            console.log('droits loaded');
            data.ready = true;
        });
    });
});
const deconnecter = () => {
    auth.identifiant = null;
    router.push('/login');
}
</script>
