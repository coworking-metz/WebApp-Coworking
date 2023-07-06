import { defineStore } from 'pinia';
import { useApi } from '@/mixins/api.js';
import { useAuthStore } from '@/stores/auth';
import { afterOneHour } from '@/mixins/utils.js';

const api = useApi();
export const useReglagesStore = defineStore('reglages', {
  state: () => ({
    droits: {},
    settings: {},
    admin: false
  }),
  actions: {
    droit(droit) {
      if (this.droits) {
        const ret = this.droits[droit] || false;
        return ret ? true : false;
      }
      return false;
    },
    getDroits() {
      // if (this.droits) return Promise.resolve();

      return api.post('app-droits', { user_id: this.id }).then((data) => {
        // afterOneHour(() => this.droits = null);
        this.droits = data.droits;
        this.settings = data.settings;

        this.admin = data.admin;
      });
    },
    // getSettings() {
    //   // if (this.settings) return Promise.resolve();

    //   afterOneHour(() => this.droits = null);
    //   return api.post('app-settings').then((data) => {
    //     this.settings = data.settings;
    //   });
    // },
  },
});
