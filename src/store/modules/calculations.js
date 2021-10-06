import { ModelManager } from "../manager";
import { Calculations } from "@/models";

const manager = new ModelManager(Calculations);

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
