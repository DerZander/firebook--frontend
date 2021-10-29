import Vue from "vue";
import Router from "vue-router";

import Home from "../views/Home.vue";
import Login from "@/views/users/login";
import Register from "@/views/users/register";
import AdminTesting from "@/views/admin/Testing";

import store from "@/store";
import { Alert } from "@/models";

import UserRouter from "./modules/users";
import EmergencyRouter from "./modules/emergencies";
import CalculationRouter from "./modules/calculations";
import BeverageRouter from "./modules/beverages";
import VehicleRouter from "./modules/vehicles";

Vue.use(Router);

const base_routes = [
  { path: "/", name: "Home", component: Home },

  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { unauthenticated: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { unauthenticated: true },
  },
  {
    path: "/admin/testing",
    name: "AdminTesting",
    component: AdminTesting,
    meta: { unauthenticated: true, allowedRoles: [3] },
  },
];

function setRouter() {
  return base_routes.concat(
    UserRouter,
    EmergencyRouter,
    CalculationRouter,
    BeverageRouter,
    VehicleRouter
  );
}

const router = new Router({
  base: process.env.BASE_URL,
  routes: setRouter(),
});

router.beforeEach((to, from, next) => {
  const token = store.getters["Login/isLoggedIn"];
  const userData = store.getters["Login/data"];

  if (!token && !to.matched.some((record) => record.meta.unauthenticated)) {
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
