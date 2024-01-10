<template>
    <router-view v-if="authStore.user" />
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>
