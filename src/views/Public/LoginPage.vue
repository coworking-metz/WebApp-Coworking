<template>
    <form class="box" @submit.prevent="connexion">
        <h2 class="title">Application Compagnon Coworking</h2>
        <p class="subtitle">
            Connectez-vous avec votre identifiant Coworking.
            <br />
            <small>
                Pour en savoir plus sur ce service, veuillez consulter la
                <a href="https://www.coworking-metz.fr/application-compagnon-coworking/">
                    <u>page de présentation de cette application</u>
                </a>
                <span>.</span>
            </small>
        </p>

        <div class="field">
            <a
                :class="['button is-success', state.isLoggingIn && 'is-loading']"
                :href="HTTP.getUri({ url: '/auth/login', params: $route.query })"
                target="_self"
                @click="state.isLoggingIn = true">
                Se connecter
            </a>
        </div>
    </form>
</template>

<script setup>
import { reactive } from 'vue';
import HTTP from '@/services/http';

const state = reactive({
    isLoggingIn: false,
});
</script>
