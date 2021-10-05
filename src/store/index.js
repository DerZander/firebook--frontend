import Vue from "vue";
import Vuex from "vuex";
import Emergencies from "@/store/modules/emergencies";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Emergencies,
  },
});
