<template>
    <div>
        <!--<h3 class="title is-5">Occupation de l'espace</h3>-->

        <article class="media">
            <figure class="media-left">
                <p class="image is-64x64">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="80" fill="none" stroke="#cccccc"
                            stroke-width="20" />
                        <circle cx="100" cy="100" r="80" fill="none" stroke="#f2af10" stroke-width="20"
                            :stroke-dasharray="dasharray" :stroke-dashoffset="dashoffset"
                            transform="rotate(-90 100 100)" />
                        <text x="100" y="110" text-anchor="middle" font-family="sans-serif"
                            font-size="32">{{ taux }}%</text>
                    </svg>
                </p>
            </figure>
            <div class="media-content">
                <div class="content">




                    <p class="is-7">
                        <template
                            v-if="!reglages.settings.occupation || !reglages.settings.occupation.presents">Le
                            coworking est vide !</template>
                        <template v-else>
                            <template v-if="presents == 1">
                                1 poste occupé sur les {{ reglages.settings.occupation.total }}
                                disponibles
                            </template>
                            <template v-else>
                                {{ presents }} postes occupés sur les
                                {{ reglages.settings.occupation.total }} disponibles
                            </template>
                            <template v-if="reglages.settings.occupation.visites">
                                (dont {{ reglages.settings.occupation.visites }} journée{{
                                    reglages.settings.occupation.visites > 1 ? 's' : '' }}
                                d'essai)</template>
                        </template>
                    </p>
                    <button class="button is-small is-link" :class="{ 'is-loading': data.loading }"
                        @click="refreshPresence">Rafraichir</button>
                    <template v-if="reglages.admin">
                        <p class="mt-3">
                            <a href="https://storied-speculoos-d61724.netlify.app/">
                                Voir le détail des présences
                            </a>
                        </p>
                    </template>
                </div>
            </div>
        </article>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue';
import { useReglagesStore } from '@/stores/reglages';
import { useApi } from '@/mixins/api';
const api = useApi();
const reglages = useReglagesStore();

const data = reactive({
    loading: false
})
const taux = computed(() => {
    return Math.round(reglages.settings.occupation.presents / reglages.settings.occupation.total * 100);
});
const presents = computed(() => {
    return reglages.settings.occupation.presents + reglages.settings.occupation.visites;
})
const dasharray = computed(() => {
    const circumference = 2 * Math.PI * 80;
    return circumference;
});

const dashoffset = computed(() => {
    const circumference = 2 * Math.PI * 80;
    const tauxDecimal = taux.value / 100;
    const dashOffset = circumference - tauxDecimal * circumference;
    return dashOffset;
});

function refreshPresence() {
    data.loading = true;
    api.post('app-droits').then((response) => {
        reglages.set(response)
        data.loading = false;
    })
}
onMounted(() => {
    setTimeout(refreshPresence, 2000);
})
</script>
