import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({
    identifiant: false,
    id: false,
    session: false,
    fresh: false
  }),
  actions: {
    // Fonction deconnecter pour déconnecter l'utilisateur
    deconnecter() {
      this.identifiant = false;
      this.id = false;
      this.session = false;
      this.fresh = false;
    },
  },
});
