<template>
    <div class="box">
        <router-link to="/">&laquo; Retour</router-link>
    </div>
    <div class="box">
        <h2 class="title">Historique des accès</h2>
        <p class="subtitle">Affichage des 100 derniers accès au {{ route.query.type }}</p>
        <entree class="media" v-for="entree in data.entrees" :entree="entree"></entree>
    </div>
</template>
<script setup>
import Entree from '@/components/Entree.vue';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { Client, Databases, Query, ID } from "appwrite";
const route = useRoute();

const data = reactive({
    entrees: [],
    type: null
});



onMounted(() => {

    if (route.query.type == 'parking')
        data.type = 2;
    else
        if (route.query.type == 'portail')
            data.type = 1;

    if (!data.type) return;

    const client = new Client();

    const databases = new Databases(client);

    client.setEndpoint('https://cloud.appwrite.io/v1').setProject(import.meta.env.VITE_APPWRITE_PROJECT);

    const promise = databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_COLLECTION,
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
    