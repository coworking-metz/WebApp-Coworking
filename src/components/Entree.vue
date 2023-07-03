<template>
    <article class="media">
        <div class="content">
            <p>
                <strong>{{ entree.identifiant }}</strong><br>
                <a :href="'https://www.coworking-metz.fr/wp-admin/user-edit.php?user_id=' + entree.id">#{{
                    entree.id }}</a> <small>{{ dateFr }}</small>
            </p>
        </div>
    </article>
</template>
<script setup>
import { defineProps, computed, ref, reactive } from 'vue';

const props = defineProps({
    entree: {
        type: Object,
        required: true,
    },
});
const entree = reactive(props.entree);

const dateFr = computed(() => {
    if (!entree.date) return;

    const date = new Date(entree.date);
    const now = new Date();

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);

    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' };
    const time = date.toLocaleString('fr-FR', options);

    let ret;
    if (date >= today) {
        ret = `aujourd'hui à ${time}`;
    } else if (date >= yesterday && date < today) {
        ret = `hier à ${time}`;
    } else {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' };
        ret = 'Le ' + date.toLocaleString('fr-FR', options);
    }

    return ret;
});


</script>
    