import { ModelManager } from "../manager";
import { Emergencies } from "@/models";

const manager = new ModelManager(Emergencies);

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
