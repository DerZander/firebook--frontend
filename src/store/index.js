import Vue from "vue";
import Vuex from "vuex";
import Alert from "@/store/modules/alert";
import Emergencies from "@/store/modules/emergencies";
import Login from "@/store/modules/login";
import Beverages from "@/store/modules/beverages";
import Calculations from "@/store/modules/calculations";
import CalculationMembers from "@/store/modules/calculations_members";
import Vehicles from "@/store/modules/vehicles";
import EmergencyVehicles from "@/store/modules/emergency_vehicles";
import Members from "@/store/modules/members";
import Users from "@/store/modules/users";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Alert,
    Calculations,
    CalculationMembers,
    Emergencies,
    EmergencyVehicles,
    Beverages,
    Vehicles,
    Members,
    Users,
    Login,
  },
});
