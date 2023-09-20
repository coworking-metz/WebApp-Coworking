<template>
    <div class="box">
        <router-link to="/">&laquo; Retour</router-link>
    </div>
    <div class="box">
        <h2 class="title">Historique des accès</h2>
        <p class="subtitle">Affichage des 100 derniers accès au {{ data.type }}</p>
        <entree class="media" v-for="entree in data.entrees" :entree="entree"></entree>
    </div>
</template>
<script setup>
import Entree from '@/components/Entree.vue';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { Client, Databases, Query } from "appwrite";
const route = useRoute();

const data = reactive({
    entrees: [],
    type: null
});



onMounted(() => {
    data.type = route.query.type;

    const client = new Client();

    const databases = new Databases(client);

    client.setEndpoint('https://cloud.appwrite.io/v1').setProject('649e7e3da8c96ebabae2');

    const promise = databases.listDocuments(
        '649e813690066fa29250',
        '649e8141b7c115fc1fd6',
        [
            Query.orderDesc('date'),
            Query.limit(100),
            Query.equal('typeLog', data.type)
        ]
    );

    promise.then(function (response) {
        data.entrees = response.documents;
    });
});
</script>
    