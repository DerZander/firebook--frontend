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
import { Alert } from "@/models";

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    { path: "/", name: "Home", component: Home },
    {
      path: "/emergencies",
      name: "EmergenciesIndex",
      component: EmergenciesIndex,
      meta: {
        unauthenticated: true,
        allowedRoles: [0, 1, 2, 3],
      },
    },
    {
      path: "/admin/emergencies/:id",
      name: "EmergenciesEdit",
      component: AdminEmergenciesEdit,
      meta: {
        unauthenticated: false,
        allowedRoles: [1, 2, 3],
      },
    },
    {
      path: "/admin/emergencies",
      name: "EmergenciesList",
      component: AdminEmergenciesList,
      meta: {
        unauthenticated: false,
        allowedRoles: [1, 2, 3],
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
        allowedRoles: [1],
      },
    },
    {
      path: "/vehicles",
      name: "Vehicles",
      component: Vehicles,
      meta: {
        unauthenticated: false,
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
  const userData = store.getters["Login/data"];

  if (!token && !to.matched.some((record) => record.meta.unauthenticated)) {
    console.log(to.path);
    next({ path: "/login", query: { q1: to.path } });
    return;
  }
  if (to.meta.allowedRoles) {
    if (
      !to.matched.some((record) =>
        record.meta.allowedRoles.includes(parseInt(userData.role))
      )
    ) {
      const alert = new Alert().setType(Alert.DANGER);
      if (window.app) {
        alert.setMessage(
          "Sie besitzen nicht genug Rechte um diese Seite aufzurufen."
        );
        alert.setHeader("Falsche Berechtigung");
      }
      store.dispatch("Alert/add", alert);

      next({ path: "/home" });

      return;
    }
  }

  next();
});

export default router;
