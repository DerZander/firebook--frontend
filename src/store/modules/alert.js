import { Alert, ApiErrorAlert } from "@/models";

const state = {
  all: [],
};

const getters = {
  all: (state) => state.all,
  visible: (state) => state.all.filter((alert) => alert.visible),
};

const actions = {
  add({ commit }, alert) {
    if (alert.constructor !== Alert && alert.constructor !== ApiErrorAlert) {
      throw new TypeError("Argument must be of type Alert");
    }
    commit("add", alert);
  },
  clear({ commit }) {
    commit("clear");
  },
};

const mutations = {
  add(state, alert) {
    state.all.push(alert);
  },
  clear(state) {
    state.all = [];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
