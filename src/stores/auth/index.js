import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({ identifiant: false }),
  getters: {
    // doubleCount: (state) => state.count * 2,
  },
  actions: {
  },
});