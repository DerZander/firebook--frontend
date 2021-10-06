import Vue from "vue";
import Vuex from "vuex";
import Emergencies from "@/store/modules/emergencies";
import Login from "@/store/modules/login";
import Beverages from "@/store/modules/beverages";
import Calculations from "@/store/modules/calculations";
import Vehicles from "@/store/modules/vehicles";
import EmergencyVehicles from "@/store/modules/emergency_vehicles";
import Members from "@/store/modules/members";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Calculations,
    Emergencies,
    EmergencyVehicles,
    Beverages,
    Vehicles,
    Members,
    Login,
  },
});
