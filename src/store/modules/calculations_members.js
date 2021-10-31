import { ModelManager } from "../manager";
import { CalculationsMembers } from "@/models/index";

const manager = new ModelManager(CalculationsMembers);

const state = {
  manager,
  ...manager.state,
};

const getters = {
  ...manager.getters,
  byUserId: (state) => (id) =>
    state.all.filter((calcs) => calcs.member_id === parseInt(id, 10)),
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
