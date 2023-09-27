<template>
    <article class="media" v-if="reglages.droit('ouvrir_parking')">
        <figure class="media-left">
            <p class="image is-64x64">

                <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 100 125">
                    <path fill="#f2af10"
                        d="M5.967 15.5v69h7v-38h16.32l-1.68 6.999h-3.641c-1.65 0-3 1.35-3 3s1.35 3 3 3h2.037c-2.441 1.828-4.037 4.733-4.037 8v9h4v8h9v-7h30v7h9v-8h4v-9c0-3.267-1.594-6.172-4.037-8h2.037c1.65 0 3-1.35 3-3s-1.35-3-3-3h-4.639l-1.68-6.999h17.385v38h7v-69H5.967zm81.066 7v9h-6.066V30a1.5 1.5 0 0 0-3 0v1.5h-56V30a1.5 1.5 0 0 0-3 0v1.5h-6v-9h74.066zM30.967 72.499a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm42-4a4 4 0 1 1-8 0 4 4 0 0 1 8 0zm-8.36-13H34.326l2.16-8.999h25.963l2.158 8.999zM80.967 43.5V42a1.5 1.5 0 0 0-3 0v1.5h-56V42a1.5 1.5 0 0 0-3 0v1.5h-6v-9h74.066v9h-6.066z" />
                </svg>


            </p>
        </figure>
        <div class="media-content">
            <div class="content">

                <p class="mb-4 is-7">
                    <!-- Description du bouton d'ouverture du parking -->
                    Déverrouillage du
                    <a @click="voirPhotoParking"><u>parking voitures de Bliiida</u></a> pendant
                    quelques
                    secondes.
                </p>
                <div class="buttons">
                    <!-- Bouton d'ouverture du parking -->
                    <button class="button is-link"
                        :class="{ 'is-loading': data.loading, 'is-success': data.parking_ouvert }"
                        @click="ouvrirParking">
                        <span class="icon is-small">
                            <i class="fas" :class="'fa-' + data.icone"></i>
                        </span>
                        <span>
                            {{ data.message_parking }}
                        </span>
                        <i class="progression"
                            :style="{ width: data.progression + '%', 'transition': data.duration ? 'width ' + data.duration + 's ease' : '' }"></i>
                    </button>
                    <template v-if="reglages.admin">
                        <router-link to="/admin/log?type=parking">Historique des
                            accès</router-link>
                    </template>
                </div>
                <b>Cet outil est en phase de beta test, des perturbations peuvent survenir</b>

            </div>
        </div>
    </article>

    <div v-if="data.afficher_porte_parking" id="photo-parking"
        @click="data.afficher_porte_parking = false">
        <img src="../assets/parking.jpg" />
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
    progression: 0,
    duration: 0,
    durees: {
        ouverture: 45,
        ouvert: 45,
        fermeture: 45
    },
    icone: 'key',
    loading: false, // Indicateur de chargement
    parking_ouvert: false, // Indicateur de déverrouillage du parking
    message_parking: 'Ouvrir le parking', // Message du bouton d'ouverture du parking
    afficher_porte_parking: false, // Indicateur d'affichage de la photo du parking
});

const demarrerProgression = (duration) => {
    data.duration = 0;
    data.progression = 100;
    setTimeout(() => {
        data.duration = duration - 1;
        setTimeout(() => {
            data.progression = 0;
        }, 500);
    }, 500);
}

// Fonction pour gérer l'ouverture du parking
const parkingOuvert = (message) => {
    data.message_parking = 'Ouverture du parking en cours';
    data.parking_ouvert = true;
    data.icone = 'door-open';

    demarrerProgression(data.durees.ouverture);
    setTimeout(() => {
        data.message_parking = 'Le parking est ouvert';
        data.icone = 'check';
        demarrerProgression(data.durees.ouvert);

        setTimeout(() => {
            data.message_parking = 'Fermeture du parking en cours';
            data.icone = 'door-closed';
            demarrerProgression(data.durees.fermeture);

            setTimeout(() => {
                data.message_parking = 'Ouvrir le parking';
                data.parking_ouvert = false;
                data.icone = 'key';
            }, data.durees.fermeture * 1000);

        }, data.durees.ouvert * 1000);

    }, data.durees.ouverture * 1000);

    // // Réinitialisation de l'état après quelques secondes
    // setTimeout(() => {
    //     data.message_parking = 'Ouvrir le parking';
    //     data.parking_ouvert = false;
    //     data.icone = 'key';
    // }, 3000);

    logOuverture(); // Enregistrement de l'ouverture du parking
};

// Fonction pour ouvrir le parking
const ouvrirParking = () => {
    // Vérification des droits de l'utilisateur
    if (!reglages.droit('ouvrir_parking')) {
        return alert('Vous ne pouvez pas ouvrir le parking.');
    }
    const url = 'https://tickets.coworking-metz.fr/api/parking';
    const token = import.meta.env.VITE_APP_PORTAIL_TOKEN;

    // if (import.meta.env.VITE_ENV == 'DEV') {
    //     return parkingOuvert(message);
    // }

    data.loading = true;

    // Appel à l'API pour ouvrir le parking
    fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
        }
    })
        .then((response) => response.json())
        .then((responseBody) => {
            parkingOuvert();
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            data.loading = false;
        });
};

// Fonction pour enregistrer l'ouverture du parking dans la base de données
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
                        typeLog: 2,
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

// Fonction pour afficher la photo du parking
const voirPhotoParking = () => {
    data.afficher_porte_parking = true;
    console.log(data.afficher_porte_parking);
};
</script>

<style>
#photo-parking img {
    max-width: 60%;
    max-height: 60%;
    object-fit: contain;
}

#photo-parking {
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

.button:has(.progression) span {
    position: relative;
    z-index: 1;
}

.button .progression {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
    z-index: 0;
}
</style>
