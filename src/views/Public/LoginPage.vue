<template>


    <div class="box">
        <h3 class="title is-5">App native pour votre smartphone</h3>
        <p>
            Téléchargez l'application Coworking Metz Le Poulailler pour gérer votre compte et vos
            accès
            à l'espace depuis votre smartphone
        </p>

        <div class="liens-app">
            <a target="_blank"
                href='https://play.google.com/store/apps/details?id=fr.coworking_metz.mobile&hl=fr&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img
                    alt='Disponible sur Google Play' style="aspect-ratio: 27/9;"
                    src='https://play.google.com/intl/en_us/badges/static/images/badges/fr_badge_web_generic.png' /></a>

            <a target="_blank" href="https://apple.co/3KPm25g"><img
                    style="aspect-ratio: 30/9;object-fit: contain;"
                    src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-example-preferred_2x.png"></a>
        </div>
    </div>
    <form class="box" @submit.prevent="connexion">
        <h2 class="title">Version Web</h2>
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
            <a :class="['button is-success', state.isLoggingIn && 'is-loading']"
                :href="HTTP.getUri({ url: '/auth/login', params: $route.query })" target="_self"
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
<style>
.liens-app {
    display: flex;
    gap: 1em;
    margin-block: 1em;
    flex-wrap: wrap;
}

.liens-app a {
    flex: 1;
    min-width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;

}

.liens-app img {
    width: 100%;
    object-fit: cover;
}
</style>
