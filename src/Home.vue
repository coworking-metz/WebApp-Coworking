<template>
    <div>
        <!-- Si data.demarrer est vrai, affiche le contenu de l'application de coworking -->
        <template v-if="data.demarrer">
            <div class="card mb-5">
                <div class="card-content">
                    <div class="media">
                        <Polaroid v-if="!reglages.externe && !reglages.guest && data.loaded" />
                        <div class="media-content">
                            <p class="title is-4">{{ auth.name }}</p>
                            <p class="subtitle is-6">{{ reglages.guest ? 'Visiteur' : auth.identifiant
                            }}</p>
                        </div>
                    </div>

                </div>
                <footer class="card-footer" v-if="!reglages.guest && !reglages.externe">
                    <a href="https://www.coworking-metz.fr/mon-compte/" class="card-footer-item">Mon
                        compte</a>
                    <a href="https://www.coworking-metz.fr/mon-compte/polaroid/"
                        class="card-footer-item">Mon polaroïd</a>
                </footer>
            </div>
            <div class="box" v-if="reglages.guest">
                <template v-if="reglages.visite.isToday">
                    Votre visite à lieu <strong>aujourd'hui à {{ heureVisite }}.</strong>
                </template>
                <template v-else>
                    <p>Visite prévue le <strong>{{ reglages.visite.dateFr }}</strong>.</p>
                    <p>Utilisez cette application le jour de votre visite pour avoir accès au
                        <strong>coworking</strong>
                        et au <strong>parking voitures</strong>.
                    </p>
                </template>
            </div>
            <template v-if="afficherActions">
                <div class="box">
                    <Portail />
                </div>
                <div class="box">
                    <Parking />
                </div>
                <div class="box" v-if="!reglages.guest && !reglages.externe">
                    <Presence />
                </div>
                <div class="box" v-if="!reglages.guest && !reglages.externe">
                    <Signal />
                </div>
            </template>
            <Plan v-if="!reglages.externe" />
            <div class="box">
                <button @click="deconnecter" class="button is-danger" type="button">
                    <span class="icon is-small">
                        <i class="fas fa-power-off"></i>
                    </span><span>Se
                        déconnecter</span></button>

            </div>
        </template>
        <!-- Si data.demarrer est faux, affiche le message de chargement -->
        <template v-else>
            <div class="box">
                <div align="center">
                    <p>Chargement en cours</p>
                    <button class="button is-loading" style="border: 0" type="button"></button>
                </div>
            </div>
        </template>
        <!-- Si data.demarrer est vrai, affiche le bouton de déconnexion 
    <div v-if="data.demarrer">
        <button class="button is-text" type="button" @click="deconnecter">Se déconnecter</button>
    </div>-->
    </div>
</template>

<script setup>
// Importation des packages et composants nécessaires
import { reactive, onMounted, inject, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useReglagesStore } from '@/stores/reglages';
import Portail from '@/components/Portail.vue';
import Plan from '@/components/Plan.vue';
import Parking from '@/components/Parking.vue';
import Presence from '@/components/Presence.vue';
import Signal from '@/components/Signal.vue';
import Polaroid from '@/components/Polaroid.vue';
import { useApi } from '@/mixins/api';

// Utiliser l'API
const api = useApi();

// Injecter le routeur
const router = inject('router');

// Créer un objet de données réactif avec une propriété demarrer initialisée à faux
const data = reactive({ demarrer: false, loaded: false });

// Utiliser le store d'authentification
const auth = useAuthStore();

// Utiliser le store des settings
const reglages = useReglagesStore();

const afficherActions = computed(() => {
    if (!reglages.guest) return true;
    if (reglages.visite?.isToday) return true;
})

const heureVisite = computed(() => {
    const date = new Date(reglages.visite.date);
    return date.toTimeString().split(' ')[0].slice(0, 5);
})
// Lorsque le composant est monté
onMounted(async () => {
    // Initialiser data.demarrer à faux
    data.demarrer = false;
    data.loaded = false;

    // Si aucune session n'est disponible, redirige vers la page de connexion
    if (!auth.session) {
        router.push('/login');
    } else {
        if (auth.fresh) {
            auth.fresh = false;
            data.loaded = true;
        } else {
            // Si une session est disponible, obtenir les détails de la session à partir de l'API
            api.get('app-session').then(response => {

                if (response.session) {
                    // auth.identifiant = response.user.login;
                    // auth.name = response.user.name;
                    auth.set(response.user)

                    // reglages.reset();
                    // reglages.droits = response.reglages.droits;
                    // reglages.settings = response.reglages.settings;
                    // reglages.admin = response.reglages.admin;
                    reglages.set(response.reglages);
                    data.loaded = true;
                } else {
                    // Si les données de session ne sont pas disponibles, se déconnecter et rediriger vers la connexion
                    console.log('Session invalide');
                    auth.deconnecter();
                    router.push('/login');

                }
            });
        }
        data.demarrer = true;
    }
});
const deconnecter = async () => {
    router.push('/login');
    await auth.deconnecter();
}
</script>

<style>
.box:empty {
    display: none;
}
</style>
