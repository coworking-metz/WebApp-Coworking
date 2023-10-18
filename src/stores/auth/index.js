import { defineStore } from "pinia";
import { useApi } from "@/mixins/api";
const api = useApi();

export const useAuthStore = defineStore("auth", {
  persist: true,
  state: () => ({
    identifiant: false,
    name: false,
    id: false,
    session: false,
    fresh: false,
  }),
  actions: {
    set(user) {
      this.identifiant = user.login;
      this.id = user.id;
      this.name = user.name;
      this.session = user.session_id;
      this.fresh = true;
    },

    // Fonction deconnecter pour déconnecter l'utilisateur
    async deconnecter() {
      const payload = {
        user_id: this.id,
        session: this.session,
      };
      console.log(payload);
      const response = await api.del("app-session", payload);
      this.identifiant = false;
      this.name = false;
      this.id = false;
      this.session = false;
      this.fresh = false;
    },
  },
});
