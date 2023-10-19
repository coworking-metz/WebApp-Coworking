<template>
    <div class="box">
        <div align="center">
            <p>Chargement en cours</p>
            <button class="button is-loading" style="border: 0" type="button"></button>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { sha1 } from '@/mixins/utils';
import { useApi } from '@/mixins/api';
import { useAuthStore } from '@/stores/auth';
import { useReglagesStore } from '@/stores/reglages';

const auth = useAuthStore();
const reglages = useReglagesStore();
const api = useApi();

const route = useRoute()
const router = useRouter()

onMounted(() => {
    if (route.query.visite) {

        auth.deconnecter().then(() => {
            const user_id = route.query.visite;
            sha1(user_id + import.meta.env.VITE_APP_AUTH_TOKEN).then(hash => {
                if (hash == route.query.check) {
                    const payload = {
                        user_id: user_id,
                        check: hash,
                    };

                    api.post('app-auth', payload).then((response) => {

                        if (response.user) {
                            auth.set(response.user)
                            reglages.set(response.reglages)

                            router.push('/'); // Redirection vers la page d'accueil
                        } else if (response?.code) {
                            // Gestion des erreurs d'authentification
                            alert(response.message);
                            // router.push('/');
                        }
                    });
                } else {
                    document.location.href = 'https://coworking-metz.fr';
                }
            })
        })
    }
})
</script>
  