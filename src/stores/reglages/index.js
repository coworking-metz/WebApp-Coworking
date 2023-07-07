import { defineStore } from 'pinia';
import { useApi } from '@/mixins/api.js';
import { useAuthStore } from '@/stores/auth';
import { afterOneHour } from '@/mixins/utils.js';
import { addMonths } from 'date-fns'; // Import the addMonths function

const api = useApi();

export const useReglagesStore = defineStore('reglages', {
  persist: true,
  state: () => ({
    droits: {},
    settings: {},
    admin: false,
    expires_at: null,
  }),
  actions: {
    reset() {
      // reset state
      this.droits = {};
      this.settings = {};
      this.admin = false;
      this.setExpiry();
    },
    checkExpiry() {
      const now = Date.now();
      if (this.expires_at && now > new Date(this.expires_at).getTime()) {
        this.reset();
      }

      return this.droits ? true : false;
    },
    droit(droit) {
      if (this.droits) {
        const ret = this.droits[droit] || false;
        return ret ? true : false;
      }
      return false;
    },
    setExpiry() {
      // set expiry time to be one month from now
      this.expires_at = addMonths(new Date(), 1);
    },
    getDroits() {
      if (this.checkExpiry()) return Promise.resolve();


      return api.post('app-droits', { user_id: this.id }).then((data) => {
        console.log('Droits chargés');
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
