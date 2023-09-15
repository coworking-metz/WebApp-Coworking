import { defineStore } from 'pinia';
import { useApi } from '@/mixins/api';
const api = useApi();

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({
    identifiant: false,
    id: false,
    token: false,
    premierAffichageApresLogin: false
  }),
  actions: {
    // Fonction deconnecter pour déconnecter l'utilisateur
    async deconnecter() {

      const response = await api.del('session');
      this.identifiant = false;
      this.id = false;
      this.token = false;
      this.premierAffichageApresLogin = false;
    },
  },
});
