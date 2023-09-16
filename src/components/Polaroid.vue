<template>
    <a v-if="polaroid_url" href="https://www.coworking-metz.fr/mon-compte/polaroid/" class="media-left">
        <figure class="image is-64x64">
            <img :src="polaroid_url">
        </figure>
    </a>

    <div v-if="notif_ouverte" class="notification is-info">
        <button class="delete" @click="fermer"></button>
        <b>Nouveau polaroïd disponible !</b>
        <p>Votre profil est incomplet. <a href="/mon-compte/polaroid/?modifier">Ajoutez une photo dans
                votre compte pour
                profiter du nouveau format de
                polaroïd</a>.</p>
    </div>
</template>
<script setup>
import { computed } from 'vue';

import { useReglagesStore } from '@/stores/reglages';
const reglages = useReglagesStore();

const polaroid_url = computed(() => {
    if (reglages.droits.polaroid) return reglages.droits.polaroid;
    if (reglages.settings.polaroid_default) return reglages.settings.polaroid_default;
})
const notif_ouverte = computed(() => {
    if (reglages.divers.notif_polaroid_fermee) return false;
    if (reglages.droits.polaroid) return false;

    return true;
});
function fermer() {
    reglages.divers.notif_polaroid_fermee = true
}
</script>
<style scoped>
.notification {
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 1vw;
    z-index: 999;
}
</style>
