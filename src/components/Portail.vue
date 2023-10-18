<template>
    <article class="media" v-if="reglages.droit('ouvrir_portail')">
        <figure class="media-left">
            <p class="image is-64x64">
                <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 75.7 94.625"
                    fill="#f2af10">
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
                    <a @click="voirPhotoPortail"><u>portail piéton de Bliiida</u></a> pendant quelques
                    secondes.
                </p>
                <div class="buttons">
                    <!-- Bouton d'ouverture du portail -->
                    <button class="button is-link"
                        :class="{ 'is-loading': data.loading, 'is-success': data.portail_ouvert }"
                        @click="ouvrirPortail">
                        <span class="icon is-small">
                            <i class="fas" :class="'fa-' + data.icone"></i>
                        </span>
                        <span>
                            {{ data.message_portail }}
                        </span>
                    </button>
                    <template v-if="reglages.admin">
                        <router-link to="/admin/log?type=portail">Historique des
                            accès</router-link>
                    </template>
                </div>
            </div>
        </div>
    </article>

    <div v-if="data.afficher_porte_portail" id="photo-portail"
        @click="data.afficher_porte_portail = false">
        <img src="../assets/portail.png" />
        <a>Fermer</a>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { Client, Databases, ID, Account } from 'appwrite';
import { useAuthStore } from '@/stores/auth';
import { useReglagesStore } from '@/stores/reglages';

const auth = useAuthStore();
const reglages = useReglagesStore();

// État réactif du composant
const data = reactive({
    icone: 'key',
    loading: false, // Indicateur de chargement
    portail_ouvert: false, // Indicateur de déverrouillage du portail
    message_portail: 'Ouvrir le portail', // Message du bouton d'ouverture du portail
    afficher_porte_portail: false, // Indicateur d'affichage de la photo du portail
});

// Fonction pour gérer l'ouverture du portail
const portailOuvert = (message) => {
    data.message_portail = message;
    data.portail_ouvert = true;
    data.icone = 'door-open';

    // Réinitialisation de l'état après quelques secondes
    setTimeout(() => {
        data.message_portail = 'Ouvrir le portail';
        data.portail_ouvert = false;
        data.icone = 'key';
    }, 3000);

    logOuverture(); // Enregistrement de l'ouverture du portail
};

// Fonction pour ouvrir le portail
const ouvrirPortail = () => {
    // Vérification des droits de l'utilisateur
    if (!reglages.droit('ouvrir_portail')) {
        return alert('Vous ne pouvez pas ouvrir le portail.');
    }

    const url = import.meta.env.VITE_API_TICKETS + '/interphone';
    const token = import.meta.env.VITE_APP_PORTAIL_TOKEN;
    const message = 'Portail ouvert';

    // if (import.meta.env.VITE_ENV == 'DEV') {
    //     return portailOuvert(message);
    // }

    data.loading = true;

    // Appel à l'API pour ouvrir le portail
    fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    })
        .then((response) => response.json())
        .then((responseBody) => {
            portailOuvert(message);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            data.loading = false;
        });
};

// Fonction pour enregistrer l'ouverture du portail dans la base de données
function logOuverture() {
    // if (import.meta.env.VITE_ENV == 'DEV') return;

    try {
        const client = new Client();
        const account = new Account(client);
        const databases = new Databases(client);

        client.setEndpoint('https://cloud.appwrite.io/v1').setProject(import.meta.env.VITE_APPWRITE_PROJECT);

        account
            .createEmailSession('contact@coworking-metz.fr', import.meta.env.VITE_APPWRITE_PASSWORD)
            .then(() => {
                const promise = databases.createDocument(
                    import.meta.env.VITE_APPWRITE_DATABASE,
                    import.meta.env.VITE_APPWRITE_COLLECTION,
                    ID.unique(),
                    {
                        id: auth.id,
                        typeLog: 1,
                        identifiant: auth.identifiant,
                        date: new Date().toISOString(),
                    },
                );

                promise.then(
                    function (response) {
                        // console.log(response); // Succès
                    },
                    function (error) {
                        // console.log(error); // Échec
                    },
                );
            });
    } catch (e) {
        // console.error(e);
    }
}

// Fonction pour afficher la photo du portail
const voirPhotoPortail = () => {
    data.afficher_porte_portail = true;
    console.log(data.afficher_porte_portail);
};
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
