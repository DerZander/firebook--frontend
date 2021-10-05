import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Emergencies from "@/views/emergencies/index";
import Beverages from "@/views/beverages/index";
import Login from "@/views/users/login";

import store from "@/store";

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    { path: "/", name: "Home", component: Home },
    {
      path: "/emergencies",
      name: "Emergencies",
      component: Emergencies,
      meta: { unauthenticated: true },
    },
    {
      path: "/beverages",
      name: "Beverages",
      component: Beverages,
      meta: { unauthenticated: false },
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: { unauthenticated: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = store.getters["Login/isLoggedIn"];
  // const userData = store.getters["Login/data"];

  if (!token && !to.matched.some((record) => record.meta.unauthenticated)) {
    next({ path: "/login", query: { q1: to.path } });
    return;
  }

  // if (to.meta.allowedRoles) {
  //   if (!to.matched.some(recrod => recrod.meta.allowedRoles.includes(parseInt(userData.role)))) {
  //     // ALERT
  //
  //     return;
  //   }
  // }

  next();
});
//
// const router = new VueRouter({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes,
// });

export default router;
