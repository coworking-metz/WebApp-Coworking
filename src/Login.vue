<template>
    <form @submit.prevent="connexion" class="box">
        <h2 class="title">Coworking App</h2>
        <p class="subtitle">Connectez-vous avec votre identifiant Coworking</p>

        <div class="field">
            <label for="" class="label">Email</label>
            <div class="control has-icons-left">
                <input type="email" class="input" v-model="data.email" required>
                <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                </span>
            </div>
        </div>
        <div class="field">
            <label for="" class="label">Mot de passe</label>
            <div class="control has-icons-left">
                <input type="password" class="input" v-model="data.password" required>
                <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                </span>
            </div>
        </div>

        <div class="field">
            <button class="button is-success" :class="{ 'is-loading': api.isLoading.value }">
                Se connecter
            </button>
        </div>
        <a href="https://www.coworking-metz.fr/mon-compte/mot-de-passe-perdu/">Mot de passe perdu ?</a>
    </form>
</template>
<script setup>
import { reactive, inject } from 'vue';
import { useAuthStore } from '@/stores/auth'
import { useApi } from '@/mixins/api.js';

const api = useApi();

// Injection de la dépendance du router
const router = inject('router');

// Utilisation du store d'authentification
const auth = useAuthStore();

// État réactif pour les données du formulaire
const data = reactive({
    email: import.meta.env.VITE_TEST_EMAIL, // Champ de saisie de l'email
    password: import.meta.env.VITE_TEST_PASSWORD // Champ de saisie du mot de passe
});

// Fonction pour gérer la soumission du formulaire de connexion
const connexion = () => {
    // Données à envoyer pour la connexion (ajouter vos données ici)
    const payload = {
        email: data.email,
        password: data.password
    };

    api.post('app-auth', payload).then(data => {
        if (data.user) {
            // Authentification réussie
            auth.identifiant = data.user.login;
            auth.id = data.user.id;
            router.push('/'); // Redirection vers la page d'accueil
        } else {
            // Gestion des erreurs d'authentification
            if (data?.code) {
                return alert(data.message);
            }
        }
    });


}

</script>
