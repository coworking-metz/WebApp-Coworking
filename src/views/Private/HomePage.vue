<template>
    <main>
        <section class="card mb-5">
            <div class="card-content">
                <div class="media">
                    <PolaroidPicture
                        v-if="authStore.user.picture"
                        :picture="authStore.user.picture" />
                    <div class="media-content">
                        <p class="title is-4">{{ authStore.user.name }}</p>
                        <p class="subtitle is-6">
                            {{ authStore.user.email }}
                        </p>
                    </div>
                </div>
            </div>
            <footer class="card-footer">
                <a class="card-footer-item" href="https://www.coworking-metz.fr/mon-compte/">
                    Mon compte
                </a>
                <a
                    v-if="authStore.user.roles.includes('coworker')"
                    class="card-footer-item"
                    href="https://www.coworking-metz.fr/mon-compte/polaroid/">
                    Mon polaroïd
                </a>
            </footer>
        </section>

        <div
            v-if="authStore.user.roles.includes('coworker') && !authStore.user.picture"
            class="notification is-info">
            <b>Nouveau polaroïd disponible !</b>
            <p>
                Votre profil est incomplet.
                <a class="is-inline-block" href="/mon-compte/polaroid/?modifier" target="_blank">
                    Ajoutez une photo dans votre compte
                </a>
                pour profiter du nouveau format de polaroïd.
            </p>
        </div>

        <section v-if="authStore.user.onboarding" class="box">
            <OnboardingParagraph
                :date="authStore.user.onboarding.date"
                :with-parking-access="authStore.user.capabilities.includes('PARKING_ACCESS')" />
        </section>
        <section v-if="authStore.user.capabilities.includes('UNLOCK_GATE')" class="box">
            <PortailCard />
        </section>
        <section v-if="authStore.user.capabilities.includes('PARKING_ACCESS')" class="box">
            <ParkingCard />
        </section>
        <section class="box">
            <PresenceCard />
        </section>
        <section class="box">
            <SignalCard />
        </section>

        <PlanCard v-if="!authStore.user.roles.includes('external')" />

        <section class="box">
            <button class="button is-danger" type="button" @click="onLogout">
                <span class="icon is-small">
                    <i class="fas fa-power-off"></i>
                </span>
                <span>Se déconnecter</span>
            </button>
        </section>
    </main>
</template>

<script setup>
import OnboardingParagraph from '@/components/OnboardingParagraph.vue';
import ParkingCard from '@/components/ParkingCard.vue';
import PlanCard from '@/components/PlanCard.vue';
import PolaroidPicture from '@/components/PolaroidPicture.vue';
import PortailCard from '@/components/PortailCard.vue';
import PresenceCard from '@/components/PresenceCard.vue';
import SignalCard from '@/components/SignalCard.vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

const onLogout = () => {
    authStore.logout();
    router.replace({ name: 'login' });
};
</script>
