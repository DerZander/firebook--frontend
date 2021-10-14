import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import EmergenciesIndex from "@/views/emergencies/index";
import AdminEmergenciesEdit from "@/views/emergencies/edit";
import AdminEmergenciesList from "@/views/emergencies/list";
import Beverages from "@/views/beverages/index";
import Login from "@/views/users/login";
import AdminCalculationsIndex from "@/views/admin/calculations";
import Vehicles from "@/views/vehicles/index";

import store from "@/store";

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    { path: "/", name: "Home", component: Home },
    {
      path: "/emergencies",
      name: "EmergenciesIndex",
      component: EmergenciesIndex,
      meta: { unauthenticated: true },
    },
    {
      path: "/emergencies/:id",
      name: "EmergenciesEdit",
      component: AdminEmergenciesEdit,
      meta: {
        unauthenticated: false,
        isBeverageAdmin: true,
        isUnitAdmin: true,
        isAdmin: true,
      },
    },
    {
      path: "/emergencies-list",
      name: "EmergenciesList",
      component: AdminEmergenciesList,
      meta: {
        unauthenticated: false,
        isBeverageAdmin: true,
        isUnitAdmin: true,
        isAdmin: true,
      },
    },
    {
      path: "/beverages",
      name: "Beverages",
      component: Beverages,
      meta: { unauthenticated: false },
    },
    {
      path: "/admin/calculations",
      name: "Calculations",
      component: AdminCalculationsIndex,
      meta: {
        unauthenticated: false,
        isBeverageAdmin: true,
        isUnitAdmin: true,
        isAdmin: true,
      },
    },
    {
      path: "/vehicles",
      name: "Vehicles",
      component: Vehicles,
      meta: {
        unauthenticated: false,
        isBeverageAdmin: false,
        isUnitAdmin: true,
        isAdmin: true,
      },
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
    console.log(to.path);
    next({ path: "/login", query: { q1: to.path } });
    return;
  }
  if (!token && !to.matched.some((record) => record.meta.isBeverageAdmin)) {
    console.log(to.path);
    next({ path: "/home", query: { q1: to.path } });
    return;
  }
  if (!token && !to.matched.some((record) => record.meta.isUnitAdmin)) {
    console.log(to.path);
    next({ path: "/home", query: { q1: to.path } });
    return;
  }
  if (!token && !to.matched.some((record) => record.meta.isAdmin)) {
    console.log(to.path);
    next({ path: "/home", query: { q1: to.path } });
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

export default router;
