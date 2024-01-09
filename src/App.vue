<template>
  <div class="container">
    <section class="section">
      <div class="columns is-centered">
        <div class="column  is-5-widescreen">
          <div align="center" class="mb-4">
            <template v-if="reglages.externe">
              <a href="https://bliiida.fr">
                <img alt="Bliiida logo" id="blida-logo" src="./assets/bliiida.png"
                  style="max-width:80%;width: 200px" />
              </a>

            </template>
            <template v-else>
              <a href="https://coworking-metz.fr">
                <img alt="Coworking logo" src="./assets/logo.png"
                  style="max-width:80%;width: 200px" />
              </a>
            </template>
          </div>
          <router-view />
        </div>
      </div>
    </section>
    <center><small>Version {{ version }}</small></center>
    <br>
  </div>
</template>
<style scoped>
</style>

<script setup>
import { useReglagesStore } from '@/stores/reglages';
const reglages = useReglagesStore();
import { computed } from 'vue';

const version = computed(() => {
  return __GIT_HASH__;
})
console.log(__APP_VERSION__)
</script>
