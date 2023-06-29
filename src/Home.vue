<template>
    <section class="hero is-fullheight" style="background-color: #f2af10;">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                        <center class="mb-2">
                            <img src="src/assets/logo.png"><br>
                        </center>
                        <div class="box">
                            <h2 class="title">Coworking App</h2>
                            <p class="subtitle is-6">Identification avec le compte {{ auth.identifiant }}</p>
                            <div class="field">
                                <p class="control">
                                    <button class="button is-link"
                                        :class="{ 'is-loading': data.loading, 'is-success': data.portail_ouvert }"
                                        @click="ouvrirPortail">
                                        <template v-if="data.portail_ouvert">
                                            Le portail est ouvert !
                                        </template>
                                        <template v-else>
                                            Ouvrir le portail
                                        </template>
                                    </button>
                                </p>
                            </div>
                        </div>
                        <button class="button is-text" @click="deconnecter">Se déconnecter</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { reactive, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth'
import { inject } from 'vue';

const router = inject('router');

const data = reactive({ loading: false, portail_ouvert: false });
const auth = useAuthStore();

onMounted(() => {
    console.log(auth.identifiant);
    if (!auth.identifiant) router.push('/login');
});
const deconnecter = () => {
    auth.identifiant = null;
    router.push('/login');
}
const ouvrirPortail = () => {
    data.loading = true;
    fetch('http://192.168.20.62/button/template_button/press', {
        method: 'POST',
    })
        .then(response => {
            if (response.ok) {
                data.portail_ouvert = true;
                setTimeout(() => {
                    data.portail_ouvert = false;
                }, 3000);
                console.log('POST request successful');
            } else {
                console.error('POST request failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        }).finally(() => {
            data.loading = false;
        });

}
</script>