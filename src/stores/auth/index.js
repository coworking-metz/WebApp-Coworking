import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({ identifiant: false, id: false, droits: {} }),
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
    async getDroits() {
      try {
        const response = await fetch('https://www.coworking-metz.fr/api-json-wp/cowo/v1/app-droits', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': import.meta.env.VITE_APP_AUTH_TOKEN
          },
          body: JSON.stringify({ user_id: this.id }),
        });
        if (response.ok) {
          const data = await response.json();
          this.droits = data.droits;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  },
});