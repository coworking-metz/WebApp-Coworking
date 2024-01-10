<template>
    <article class="media">
        <figure class="media-left">
            <p class="image is-64x64">
                <svg
                    fill="#f2af10"
                    viewBox="0 0 75.7 94.625"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M40.3 17.1c0-2.3.1-7.9.1-10C47.3 4.9 54.3 2.6 61.2.4c.1 22.3 0 52.8.1 75H45.6c.5-.9.8-1.9.8-3v-5.9c0-2.5-.4-5-1.1-7.4l-1.7-5.8-.3-5.9c0-.7-.1-1.4-.1-2.1 1.7 1 3.5 1.9 5.3 2.6.7.3 1.4.4 2.1.4 1.2 0 2.3-.3 3.2-1 1-.7 1.7-1.6 2.2-2.7 1.2-3-.3-6.3-3.3-7.5-2-.8-4-1.9-5.8-3.1-1.6-1.2-3.1-2.6-4.4-4.1-.6-.7-1.4-1.3-2.3-1.7v-.3c1.2-1.5 1.9-3.4 1.9-5.4s-.5-3.9-1.8-5.4z" />
                    <path
                        d="M40.5 39.8c-.1 2.5-.1 5.1 0 7.6l.3 6.3 1.8 6.2c.6 2.1 1 4.3 1 6.6v5.9c0 1.6-1.3 2.9-2.9 2.9h-.3V31.4l.2.2c1.4 1.7 3.1 3.2 4.9 4.5 2 1.4 4.1 2.6 6.4 3.5 1.5.6 2.3 2.3 1.7 3.8-.4 1.2-1.6 1.9-2.7 1.9-.4 0-.7-.1-1.1-.2-2.8-1.1-5.4-2.5-7.7-4.2-.6-.3-1.1-.7-1.6-1.1z" />
                    <path
                        d="M51.8 39.7c-2.3-.9-4.4-2.1-6.4-3.5-1.8-1.3-3.4-2.8-4.9-4.5-.6-.7-1.4-1-2.3-1h-7.5c-.8-.1-1.5-.1-2.3 0-5.1.6-8.1 5-9.7 7.3-1.7 2.4-2.9 5.1-3.6 8-.4 1.6.6 3.2 2.1 3.6.2.1.5.1.7.1 1.3 0 2.5-.9 2.8-2.2.6-2.2 1.5-4.3 2.7-6.1.8-1.2 2-2.9 3.4-3.9.3 4.9.3 9.8-.1 14.6l-.1 1.7-1 4c-.7 2.6-2.1 5-4.1 6.7l-3.2 2.8c-1.2 1.1-1.3 2.9-.3 4.1 1.1 1.2 2.9 1.3 4.1.3l3.2-2.8c2.9-2.6 5-5.9 6-9.7l.5-2h3.9l1.3 4.4c.5 1.6.7 3.2.7 4.9v5.9c0 1.6 1.3 2.9 2.9 2.9 1.6 0 2.9-1.3 2.9-2.9v-5.9c0-2.2-.3-4.4-1-6.6l-1.8-6.2-.3-6.2c-.1-2.5-.1-5.1 0-7.7.5.4.9.7 1.4 1.1 2.4 1.7 5 3.2 7.7 4.2.3.1.7.2 1.1.2 1.2 0 2.3-.7 2.7-1.9.8-1.4 0-3.1-1.5-3.7z" />
                    <circle cx="33.5" cy="22.5" r="5.9" />
                </svg>
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <p class="mb-4 is-7">
                    <!-- Description du bouton d'ouverture du portail -->
                    Ce bouton déclenche le déverrouillage du
                    <a :href="getImageUrl('portail.png')" target="_blank">
                        <u>portail piéton de Bliiida</u>
                    </a>
                    pendant quelques secondes.
                </p>
                <div class="buttons">
                    <!-- Bouton d'ouverture du portail -->
                    <button
                        class="button is-link"
                        :class="{ 'is-loading': data.loading, 'is-success': data.portail_ouvert }"
                        @click="ouvrirPortail">
                        <span class="icon is-small">
                            <i class="fas" :class="'fa-' + data.icone"></i>
                        </span>
                        <span>
                            {{ data.message_portail }}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </article>
</template>

<script setup>
import { unlockSteelGate } from '@/services/tickets/controls';
import { reactive } from 'vue';

const getImageUrl = (name) => {
    return new URL(`../assets/${name}`, import.meta.url).href;
};

// État réactif du composant
const data = reactive({
    icone: 'key',
    loading: false, // Indicateur de chargement
    portail_ouvert: false, // Indicateur de déverrouillage du portail
    message_portail: 'Déverrouiller le portail', // Message du bouton d'ouverture du portail
    afficher_porte_portail: false, // Indicateur d'affichage de la photo du portail
});

// Fonction pour gérer l'ouverture du portail
const portailOuvert = () => {
    data.message_portail = 'Portail ouvert';
    data.portail_ouvert = true;
    data.icone = 'door-open';

    // Réinitialisation de l'état après quelques secondes
    setTimeout(() => {
        data.message_portail = 'Déverrouiller le portail';
        data.portail_ouvert = false;
        data.icone = 'key';
    }, 3000);
};

// Fonction pour ouvrir le portail
const ouvrirPortail = () => {
    data.loading = true;
    unlockSteelGate()
        .then(() => {
            portailOuvert();
        })
        .finally(() => {
            data.loading = false;
        });
};
</script>
