import Vue from "vue";
import Vuex from "vuex";
import Emergencies from "@/store/modules/emergencies";
import Login from "@/store/modules/login";
import Beverages from "@/store/modules/beverages";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Emergencies,
    Beverages,
    Login,
  },
});
