import { ModelManager } from "../manager";
import { CalculationsMembers } from "@/models/index";
import api from "@/services/api";

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
  createCalculations({ commit }, { month, year, member_id }) {
    api
      .post(`calculation_member/create-all/`, { month, year, member_id })
      .then((resp) => {
        commit("addItem", resp.data);
      });
  },
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
