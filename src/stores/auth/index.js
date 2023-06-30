import { defineStore } from 'pinia';
import { useApi } from '@/mixins/api.js';

const api = useApi();
export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({ identifiant: false, id: false, droits: {}, settings: {} }),
  getters: {
    // doubleCount: (state) => state.count * 2,
  },
  actions: {
    droit(droit) {
      if (this.droits) {
        const ret = this.droits[droit] || false;
        return !!ret;
      }
      return false;
    },
    getDroits() {
      return api.post('app-droits', { user_id: this.id }).then((data) => {
        this.droits = data.droits;
      });
    },
    getSettings() {
      return api.post('app-settings').then((data) => {
        this.settings = data.settings;
      });
    },
  },
});
