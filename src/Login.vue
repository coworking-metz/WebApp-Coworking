<template>
    <form class="box" @submit.prevent="connexion">
        <h2 class="title">Application Compagnon Coworking</h2>
        <p class="subtitle">Connectez-vous avec votre identifiant Coworking.<br><small>Pour en savoir
                plus sur ce
                service, veuillez consulter la <a
                    href="https://www.coworking-metz.fr/application-compagnon-coworking/"><u>page de
                        présentation de
                        cette application</u></a>.</small></p>

        <div class="field">
            <label class="label" for="email">Email</label>
            <div class="control has-icons-left">
                <input v-model="data.email" class="input" name="email" required type="email" />
                <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                </span>
            </div>
        </div>
        <div class="field">
            <label class="label" for="password">Mot de passe</label>
            <div class="control has-icons-left">
                <input v-model="data.password" class="input" name="password" required type="password" />
                <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                </span>
            </div>
        </div>

        <div class="field">
            <button class="button is-success" :class="{ 'is-loading': api.isLoading.value }"
                type="submit">
                Se connecter
            </button>
        </div>
        <a href="https://www.coworking-metz.fr/mon-compte/mot-de-passe-perdu/">Mot de passe perdu ?</a>
    </form>
</template>

<script setup>
import { reactive, inject } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useReglagesStore } from '@/stores/reglages';
import { useApi } from '@/mixins/api';
import { isSafari } from '@/mixins/utils';
const api = useApi();

// Injection de la dépendance du router
const router = inject('router');

// Utilisation du store d'authentification
const auth = useAuthStore();

// Utiliser le store des settings
const reglages = useReglagesStore();

// État réactif pour les données du formulaire
const data = reactive({
    email: import.meta.env.VITE_TEST_EMAIL, // Champ de saisie de l'email
    password: import.meta.env.VITE_TEST_PASSWORD, // Champ de saisie du mot de passe
});

// Fonction pour gérer la soumission du formulaire de connexion
const connexion = () => {
    // Données à envoyer pour la connexion (ajouter vos données ici)
    const payload = {
        email: data.email,
        password: data.password,
    };
    let login;

    if (isSafari()) {
        login = api.get('app-auth', payload)
    } else {
        login = api.post('app-auth', payload)

    }
    login.then((response) => {
        if (response.user) {
            auth.set(response.user)
            reglages.set(response.reglages)

            router.push('/'); // Redirection vers la page d'accueil
        } else if (response?.code) {
            // Gestion des erreurs d'authentification
            return alert(response.message);
        } else {
            window.location.reload(true);
        }
    }).catch(error => {
        window.location.reload(true);
    })
};


</script>
