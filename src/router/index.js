import { createRouter, createWebHistory } from "vue-router";
import Home from "@/Home.vue"; // Importing Home component

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/login",
      component: () => import("@/Login.vue"),
    },
    {
      path: "/visite",
      component: () => import("@/vues/Visite.vue"),
    },
    {
      path: "/admin/log",
      component: () => import("@/vues/Admin/Log.vue"),
    },
  ],
});
