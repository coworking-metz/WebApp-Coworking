<template>
    <a class="media-left" href="https://www.coworking-metz.fr/mon-compte/polaroid/">
        <figure class="image is-64x64">
            <img :src="picture || DEFAULT_PICTURE" />
        </figure>
    </a>
</template>

<script setup>
const DEFAULT_PICTURE = 'https://wpapi.coworking-metz.fr/images/pola-poule-vide.jpg';

defineProps({
    picture: {
        type: String,
        required: true,
    },
});
</script>
