<template>
    <section class="hero is-fullheight" style="background-color: #f2af10;">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                        <center class="mb-2">
                            <img src="./assets/logo.png" style="width:100%"><br>
                        </center>
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
                                <button class="button is-success" :class="{ 'is-loading': data.loading }">
                                    Se connecter
                                </button>
                            </div>
                            <a href="https://www.coworking-metz.fr/mon-compte/mot-de-passe-perdu/">Mot de passe perdu ?</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { reactive, inject } from 'vue';
import { useAuthStore } from '@/stores/auth'

const router = inject('router');

const auth = useAuthStore();
const data = reactive({
    loading: false,
    email: '',
    password: ''
});

const connexion = () => {
    data.loading = true;
    const payload = {
        email: data.email,
        password: data.password
    }; // Add your data object here
    console.log(import.meta.env.VITE_APP_AUTH_TOKEN);
    // Make API request to log in
    fetch('https://www.coworking-metz.fr/api-json-wp/cowo/v1/app-auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': import.meta.env.VITE_APP_AUTH_TOKEN
        },
        body: JSON.stringify(payload),
    })
        .then(response => response.json())
        .then(data => {
            if (data.user) {
                auth.identifiant = data.user.login;
                auth.id = data.user.id;
                router.push('/')
            } else {
                if (data?.code) {
                    return alert(data.message);
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        }).finally(() => {
            data.loading = false;
        });
}

</script>