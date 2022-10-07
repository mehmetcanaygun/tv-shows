import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: {
        title: "Home",
      },
    },
    {
      path: "/show/:id",
      name: "show",
      component: () => import("../views/ShowView.vue"),
      meta: {
        title: "Show",
      },
    },
  ],
});

export default router;
