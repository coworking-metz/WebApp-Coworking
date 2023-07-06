import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({
    identifiant: false,
    id: false,
    session: false,
  }),
  actions: {
    // Fonction deconnecter pour déconnecter l'utilisateur
    deconnecter() {
      // Mettre l'identifiant à null et rediriger vers la page de connexion
      this.identifiant = null;
      this.id = null;
      this.session = null;
    },
  },
});
