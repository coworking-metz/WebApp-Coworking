<template>
    <!-- Titre de la section -->
    <h3 class="title is-5">Accès</h3>
    <article class="media mt-5">
        <figure class="media-left">
            <p class="image is-64x64">

                <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 32 40"
                    xml:space="preserve" fill="#f2af10">
                    <path fill="none" d="M0 0H32V32H0z" />
                    <path d="M19 27 9 27 9 22 11 22 11 25 17 25 17 7 11 7 11 11 9 11 9 5 19 5z" />
                    <path d="M17 1.6 17 30.4 27 26.7 27 5.3z" />
                    <path d="M5 16H15V23H5z" />
                    <path d="M13 18H7v-5a3 3 0 0 1 6 0v5zm-4-2h2v-3a1 1 0 0 0-2 0v3z" />
                </svg>

            </p>
        </figure>
        <div class="media-content">
            <div class="content">

                <p class="mb-4 is-7">
                    <!-- Description du bouton d'ouverture du portail -->
                    Ce bouton déclenche le déverrouillage du
                    <a @click="voirPhotoPortail">portail piéton de Bliiida</a>
                    . Le portail reste déverrouillé pendant quelques secondes.
                </p>
                <div class="buttons">
                    <!-- Bouton d'ouverture du portail -->
                    <button class="button is-link"
                        :class="{ 'is-loading': data.loading, 'is-success': data.portail_ouvert }"
                        @click="ouvrirPortail">
                        {{ data.message_portail }}
                    </button>
                    <template v-if="reglages.admin">
                        <router-link to="/admin/portail" class="button is-text is-small">Historique des
                            accès</router-link>
                    </template>
                </div>
            </div>
        </div>
    </article>

    <!-- Affichage de la photo du portail -->
    <div v-if="data.afficher_porte_portail" id="photo-portail">
        <img src="../assets/portail.png" @click="data.afficher_porte_portail = false" />
        <a @click="data.afficher_porte_portail = false">Fermer</a>
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
    loading: false, // Indicateur de chargement
    portail_ouvert: false, // Indicateur de déverrouillage du portail
    message_portail: 'Ouvrir le portail', // Message du bouton d'ouverture du portail
    afficher_porte_portail: false, // Indicateur d'affichage de la photo du portail
});

// Fonction pour gérer l'ouverture du portail
const portailOuvert = (message) => {
    data.message_portail = message;
    data.portail_ouvert = true;

    // Réinitialisation de l'état après quelques secondes
    setTimeout(() => {
        data.message_portail = 'Ouvrir le portail';
        data.portail_ouvert = false;
    }, 3000);

    logOuverture(); // Enregistrement de l'ouverture du portail
};

// Fonction pour ouvrir le portail
const ouvrirPortail = () => {
    // Vérification des droits de l'utilisateur
    if (!reglages.droit('ouvrir_portail')) {
        return alert('Vous ne pouvez pas ouvrir le portail.');
    }

    const url = 'https://tickets.coworking-metz.fr/api/interphone';
    const token = import.meta.env.VITE_APP_PORTAIL_TOKEN;
    const message = 'Ouverture du portail demandée';

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
            portailOuvert(responseBody.message);
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

        client.setEndpoint('https://cloud.appwrite.io/v1').setProject('649e7e3da8c96ebabae2');

        account
            .createEmailSession('contact@coworking-metz.fr', import.meta.env.VITE_APPWRITE_PASSWORD)
            .then(() => {
                const promise = databases.createDocument(
                    '649e813690066fa29250',
                    '649e8141b7c115fc1fd6',
                    ID.unique(),
                    {
                        id: auth.id,
                        identifiant: auth.identifiant,
                        date: new Date().toISOString(),
                    },
                );

                promise.then(
                    function (response) {
                        console.log(response); // Succès
                    },
                    function (error) {
                        console.log(error); // Échec
                    },
                );
            });
    } catch (e) {
        console.error(e);
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
