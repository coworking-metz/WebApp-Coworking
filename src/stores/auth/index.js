import { defineStore } from 'pinia';
import { useApi } from '@/mixins/api.js';

const api = useApi();
export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({
    identifiant: false,
    id: false,
    session: false,
    admin: false,
    droits: {},
    settings: {}
  }),
  getters: {
    // doubleCount: (state) => state.count * 2,
  },
  actions: {
    // Fonction deconnecter pour déconnecter l'utilisateur
    deconnecter() {
      // Mettre l'identifiant à null et rediriger vers la page de connexion
      this.identifiant = null;
      this.id = null;
      this.session = null;
      this.admin = null;
    },
    droit(droit) {
      if (this.droits) {
        const ret = this.droits[droit] || false;
        return ret ? true : false;
      }
      return false;
    },
    getDroits() {
      return api.post('app-droits', { user_id: this.id }).then((data) => {
        this.droits = data.droits;
        this.admin = data.admin;
      });
    },
    getSettings() {
      return api.post('app-settings').then((data) => {
        this.settings = data.settings;
      });
    },
  },
});
