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
                            <h2 class="title">Coworking App</h2>
                            <p class="subtitle is-7">Compte connecté: {{ auth.identifiant }}</p>

                            <portail />

                        </div>
                        <button class="button is-text" @click="deconnecter">Se déconnecter</button>
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
const router = inject('router');

const auth = useAuthStore();

onMounted(() => {
    if (!auth.id) router.push('/login');
    auth.getDroits();
});
const deconnecter = () => {
    auth.identifiant = null;
    router.push('/login');
}
</script>
