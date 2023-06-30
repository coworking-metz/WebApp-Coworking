import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({ identifiant: false, id: false, droits: {}, settings: {} }),
  getters: {
    // doubleCount: (state) => state.count * 2,
  },
  actions: {
    droit(droit) {
      if (this.droits) {
        let ret = this.droits[droit] || false;
        return ret ? true : false;
      }
    },
    getDroits() {
      return fetch('https://www.coworking-metz.fr/api-json-wp/cowo/v1/app-droits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': import.meta.env.VITE_APP_AUTH_TOKEN
        },
        body: JSON.stringify({ user_id: this.id }),
      }).then(response => {
        const data = response.json();
        this.droits = data.droits;
      })
    },
    getSettings() {
      return fetch('https://www.coworking-metz.fr/api-json-wp/cowo/v1/app-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': import.meta.env.VITE_APP_AUTH_TOKEN
        }
      }).then(response => response.json()).then(data => {
        this.settings = data.settings;
      })
    }
  },
});