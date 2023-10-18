<template>
    <form class="box" @submit.prevent="connexion">
        <h2 class="title">Compagnon Coworking</h2>

        <div class="field has-text-centered">
            <a :href="authUrl" class="button is-success">
                Se connecter
            </a>
        </div>
    </form>
</template>

<script setup>
import { reactive, inject, computed } from 'vue';


const authUrl = computed(() => {
    let url = document.location.href.split('#');
    return import.meta.env.VITE_API_TICKETS + '/auth/web/login?follow=' + encodeURI(url);
})


</script>
