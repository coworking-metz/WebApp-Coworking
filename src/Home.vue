<template>
    <div class="box">
        <!-- Si data.demarrer est vrai, affiche le contenu de l'application de coworking -->
        <template v-if="data.demarrer">
            <h2 class="title">Coworking App</h2>
            <p class="subtitle is-7">Compte connecté: {{ auth.identifiant }}</p>

            <hr />
            <!-- Inclure le composant Portail -->
            <Portail></Portail>
            <hr />
            <!-- Inclure le composant Presence -->
            <Presence></Presence>
        </template>
        <!-- Si data.demarrer est faux, affiche le message de chargement -->
        <template v-else>
            <div align="center">
                <p>Chargement en cours</p>
                <button class="button is-loading" style="border: 0" type="button"></button>
            </div>
        </template>
    </div>
    <!-- Si data.demarrer est vrai, affiche le bouton de déconnexion -->
    <div v-if="data.demarrer">
        <button class="button is-text" type="button" @click="deconnecter">Se déconnecter</button>
    </div>
</template>

<script setup>
// Importation des packages et composants nécessaires
import { reactive, onMounted, inject } from 'vue';
import { useAuthStore } from '@/stores/auth';
import Portail from '@/components/Portail.vue';
import Presence from '@/components/Presence.vue';
import { useApi } from '@/mixins/api';

// Utiliser l'API
const api = useApi();

// Injecter le routeur
const router = inject('router');

// Créer un objet de données réactif avec une propriété demarrer initialisée à faux
const data = reactive({ demarrer: false });

// Utiliser le store d'authentification
const auth = useAuthStore();

// Lorsque le composant est monté
onMounted(async () => {
    // Initialiser data.demarrer à faux
    data.demarrer = false;

    // Si aucune session n'est disponible, redirige vers la page de connexion
    if (!auth.session) {
        router.push('/login');
    } else {
        // Si une session est disponible, obtenir les détails de la session à partir de l'API
        try {
            const response = await api.post('app-session');

            // Si les données de session ne sont pas disponibles, se déconnecter et rediriger vers la connexion
            if (!response.session) {
                auth.deconnecter();
                router.push('/login');

            } else {
                // Si les données de session sont disponibles, obtenir les paramètres et les droits
                await auth.getSettings();
                console.log('Paramètres chargés');
                await auth.getDroits();
                console.log('Droits chargés');

                // Ensuite, mettre data.demarrer à vrai
                data.demarrer = true;
                console.log('data.demarrer', data.demarrer);
            }
        } catch (error) {
            // Journaliser toutes les erreurs
            console.error(error);
        }
    }
});


</script>
