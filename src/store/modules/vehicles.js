import { ModelManager } from "../manager";
import { Vehicles } from "@/models";

const manager = new ModelManager(Vehicles);

const state = {
  manager,
  ...manager.state,
};

const getters = {
  ...manager.getters,
};

const actions = {
  ...manager.actions,
};

const mutations = {
  ...manager.mutations,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
