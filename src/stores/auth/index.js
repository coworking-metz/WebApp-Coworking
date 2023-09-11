import { defineStore } from 'pinia';
import { useApi } from '@/mixins/api';
const api = useApi();

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
    async deconnecter() {

      const payload = {
        user_id: this.id,
        session: this.session,
      };
      console.log(payload);
      const response = await api.del('app-session', payload);
      this.identifiant = false;
      this.id = false;
      this.session = false;
      this.fresh = false;
    },
  },
});
