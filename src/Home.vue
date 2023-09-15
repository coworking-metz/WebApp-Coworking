<template>
    <div class="box">
        <!-- Si data.demarrer est vrai, affiche le contenu de l'application de coworking -->
        <template v-if="data.demarrer">
            <h2 class="title">Coworking App</h2>
            <p class="is-7">{{ auth.identifiant }}
                &middot; <a href="https://www.coworking-metz.fr/mon-compte/">Mon compte</a> &middot; <a
                    @click="deconnecter">Se déconnecter</a>

            </p>

            <hr />
            <Portail></Portail>
            <hr />
            <Presence></Presence>
            <hr />
            <Signal></Signal>
        </template>
        <!-- Si data.demarrer est faux, affiche le message de chargement -->
        <template v-else>
            <div align="center">
                <p>Chargement en cours</p>
                <button class="button is-loading" style="border: 0" type="button"></button>
            </div>
        </template>
    </div>
    <!-- Si data.demarrer est vrai, affiche le bouton de déconnexion 
    <div v-if="data.demarrer">
        <button class="button is-text" type="button" @click="deconnecter">Se déconnecter</button>
    </div>-->
</template>

<script setup>
// Importation des packages et composants nécessaires
import { reactive, onMounted, inject } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useReglagesStore } from '@/stores/reglages';
import Portail from '@/components/Portail.vue';
import Presence from '@/components/Presence.vue';
import Signal from '@/components/Signal.vue';
import { useApi } from '@/mixins/api';

// Utiliser l'API
const api = useApi();

// Injecter le routeur
const router = inject('router');

// Créer un objet de données réactif avec une propriété demarrer initialisée à faux
const data = reactive({ demarrer: false });

// Utiliser le store d'authentification
const auth = useAuthStore();

// Utiliser le store des settings
const reglages = useReglagesStore();

// Lorsque le composant est monté
onMounted(async () => {
    // Initialiser data.demarrer à faux
    data.demarrer = false;

    // Si aucune session n'est disponible, redirige vers la page de connexion
    if (!auth.token) {
        router.push('/login');
    } else {
        // 
        if (auth.premierAffichageApresLogin) {
            auth.premierAffichageApresLogin = false;
        } else {
            // Si une session est disponible, obtenir les détails de la session à partir de l'API
            api.post('session').then(response => {
                // Si les données de session ne sont pas disponibles, se déconnecter et rediriger vers la connexion
                if (!response.session) {
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
    // Déconnecter l'utilisateur
    await auth.deconnecter();

    // Rediriger vers la page de connexion
    router.push('/login');
}
</script>
