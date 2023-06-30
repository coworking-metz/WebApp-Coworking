<template>
    <div class="field">
        <p class="control">
            <button class="button is-link" :class="{ 'is-loading': data.loading, 'is-success': data.portail_ouvert }"
                @click="ouvrirPortail">{{ data.message_portail }}
            </button>
        </p>
        <p class="mt-4 is-7">Ce bouton déclenche le déverrouillage du <a @click="voirPhotoPortail">portail piéton de
                Bliiida</a>. Le portail reste déverrouillé pendant quelques secondes.</p>
    </div>
    <div id="photo-portail" v-if="data.afficher_porte_portail"><img @click="data.afficher_porte_portail = false"
            src="../assets/portail.png"><a @click="data.afficher_porte_portail = false">Fermer</a></div>
</template>

<script setup>
import { reactive } from 'vue';
import { Client, Databases, ID, Account } from "appwrite";
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore();
const data = reactive({ loading: false, portail_ouvert: false, message_portail: 'Ouvrir le portail', afficher_porte_portail: false });

const portailOuvert = (message) => {
    data.message_portail = message;
    data.portail_ouvert = true;
    setTimeout(() => {
        data.message_portail = 'Ouvrir le portail';
        data.portail_ouvert = false;
    }, 3000);

    logOuverture();
}
const ouvrirPortail = () => {

    if (!auth.droit('ouvrir_portail')) {
        return alert('Vous ne pouvez pas ouvrir le portail.');
    }
    const url = 'https://tickets.coworking-metz.fr/api/interphone';
    const token = import.meta.env.VITE_APP_PORTAIL_TOKEN;
    const message = 'Ouverture du portail demandée';

    if (import.meta.env.VITE_ENV == 'DEV') {
        return portailOuvert(message);

    }
    data.loading = true;
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


function logOuverture() {

    if (import.meta.env.VITE_ENV == 'DEV') return;

    try {
        const client = new Client();
        const account = new Account(client);
        const databases = new Databases(client);

        client
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject('649e7e3da8c96ebabae2');

        account.createEmailSession('contact@coworking-metz.fr', import.meta.env.VITE_APPWRITE_PASSWORD).then(() => {
            const promise = databases.createDocument('649e813690066fa29250', '649e8141b7c115fc1fd6', ID.unique(), {
                id: auth.id,
                identifiant: auth.identifiant,
                date: new Date().toISOString(),
            });

            promise.then(function (response) {
                console.log(response); // Success
            }, function (error) {
                console.log(error); // Failure
            });

        })
    } catch (e) {
        console.error(e);
    }


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