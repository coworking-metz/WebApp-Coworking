<template>
  <div>
    <h3 class="title is-5">Occupation de l'espace</h3>
    <p class="is-7">
      <template v-if="!auth.settings.occupation.presents">Le coworking est vide !</template>
      <template v-else>
        <template v-if="auth.settings.occupation.presents == 1">
          1 poste occupé sur les {{ auth.settings.occupation.total }} disponibles
        </template>
        <template v-else>
          {{ auth.settings.occupation.presents }} postes occuppés sur les
          {{ auth.settings.occupation.total }} disponibles.
        </template>
      </template>
    </p>

    <p class="mt-3">
      <a href="https://www.coworking-metz.fr/d92m56-c3wf4-fx2ypx-55qas-nv2au-e8ep/">
        Voir le détail des présences
      </a>
    </p>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
const auth = useAuthStore();
</script>
