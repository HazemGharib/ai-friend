import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    alias: "/home",
    name: "Home",
    meta: { title: "Home - AI Friend" },
    component: () => import("../views/Home.vue")
  },
  {
    path: "/about",
    name: "About",
    meta: { title: "About - AI Friend" },
    component: () => import("../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

const DEFAULT_TITLE = "AI Friend";

router.afterEach(to => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});

export default router;
