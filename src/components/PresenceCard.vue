<template>
    <article class="media">
        <figure class="media-left">
            <p class="image is-64x64">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <circle
                        cx="100"
                        cy="100"
                        fill="none"
                        r="80"
                        stroke="#cccccc"
                        stroke-width="20" />
                    <circle
                        cx="100"
                        cy="100"
                        fill="none"
                        r="80"
                        stroke="#f2af10"
                        :stroke-dasharray="dasharray"
                        :stroke-dashoffset="dashoffset"
                        stroke-width="20"
                        transform="rotate(-90 100 100)" />
                    <text
                        font-family="sans-serif"
                        font-size="40"
                        text-anchor="middle"
                        x="100"
                        y="112">
                        {{ data.loading ? '…' : `${attendeesPercentage} %` }}
                    </text>
                </svg>
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <p class="is-7">
                    <template v-if="data.loading">Récupération des données…</template>
                    <template v-else-if="!data.members.length">Le coworking est vide !</template>
                    <template v-else>
                        <template v-if="data.members.length === 1">
                            1 poste occupé sur les {{ MAX_CURRENT_MEMBERS }}
                            disponibles
                        </template>
                        <template v-else>
                            {{ data.members.length }} postes occupés sur les
                            {{ MAX_CURRENT_MEMBERS }} disponibles
                        </template>
                    </template>
                </p>
                <div
                    class="is-flex is-flex-direction-row is-flex-wrap-wrap is-align-items-center"
                    style="gap: 1rem">
                    <button
                        :class="['button is-link', data.loading && 'is-loading']"
                        @click="refreshPresence">
                        Rafraichir
                    </button>
                    <template v-if="authStore.user.roles.includes('admin')">
                        <p>
                            <a href="https://storied-speculoos-d61724.netlify.app/" target="_blank">
                                Voir le détail des présences
                            </a>
                        </p>
                    </template>
                </div>
            </div>
        </div>
    </article>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue';
import { getCurrentMembers } from '@/services/tickets/members';
import { useAuthStore } from '@/stores/auth';

const MAX_CURRENT_MEMBERS = 28;

const authStore = useAuthStore();
const data = reactive({
    loading: false,
    members: [],
});

const dasharray = 2 * Math.PI * 80;
const dashoffset = computed(() => {
    const rate = data.members.length / MAX_CURRENT_MEMBERS;
    const dashOffset = dasharray - rate * dasharray;
    return dashOffset;
});

const attendeesPercentage = computed(() => {
    return ((data.members.length / MAX_CURRENT_MEMBERS) * 100).toFixed(0);
});

function refreshPresence() {
    data.loading = true;
    getCurrentMembers()
        .then((members) => (data.members = members))
        .finally(() => {
            data.loading = false;
        });
}

onMounted(() => {
    refreshPresence();
});
</script>
