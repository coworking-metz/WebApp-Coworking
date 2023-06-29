<template>
    <section class="hero is-fullheight" style="background-color: #f2af10;">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                        <center class="mb-2">
                            <img src="./assets/logo.png"><br>
                        </center>
                        <div class="box">
                            <h2 class="title">Coworking App</h2>
                            <p class="subtitle is-7">Compte connecté: {{ auth.identifiant }}</p>
                            <div class="field">
                                <p class="control">
                                    <button class="button is-link"
                                        :class="{ 'is-loading': data.loading, 'is-success': data.portail_ouvert }"
                                        @click="ouvrirPortail">{{ data.message_portail }}
                                    </button>
                                </p>
                                <p class="mt-4 is-7">Ce bouton déclenche le déverrouillage du <a
                                        @click="voirPhotoPortail">portail piéton de Bliiida</a>. Le portail reste déverrouillé pendant quelques secondes.</p>
                            </div>
                        </div>
                        <button class="button is-text" @click="deconnecter">Se déconnecter</button>
                        <div id="photo-portail" v-if="data.afficher_porte_portail"><img @click="data.afficher_porte_portail=false" src="./assets/portail.png"><a @click="data.afficher_porte_portail=false">Fermer</a></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { reactive, onMounted, inject } from 'vue';
import { useAuthStore } from '@/stores/auth'

const router = inject('router');

const data = reactive({ loading: false, portail_ouvert: false, message_portail: 'Ouvrir le portail', afficher_porte_portail: false });
const auth = useAuthStore();

onMounted(() => {
    console.log(auth.identifiant);
    if (!auth.identifiant) router.push('/login');
});
const deconnecter = () => {
    auth.identifiant = null;
    router.push('/login');
}
const portailOuvert = (message) => {
    data.message_portail = message;
    data.portail_ouvert = true;
    setTimeout(() => {
        data.message_portail = 'Ouvrir le portail';
        data.portail_ouvert = false;
    }, 3000);
}
const ouvrirPortail = () => {

    data.loading = true;

    const url = 'https://tickets.coworking-metz.fr/api/interphone';
    const token = import.meta.env.VITE_APP_PORTAIL_TOKEN;
    const message = 'Ouverture du portail demandée';

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    })
        .then(response => response.json())
        .then(data => {
            portailOuvert(data.message)
        })
        .catch(error => {
            console.error(error);
        }).finally(() => {
            data.loading = false;
        });


}

const voirPhotoPortail = () => {
    data.afficher_porte_portail = true;
    console.log(data.afficher_porte_portail);
}
</script>
<style>
#photo-portail {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    flex-direction: column;
}
</style>