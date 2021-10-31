import api from "@/services/api";
import { Order } from "@/models";
import { ModelManager } from "@/storage/manager";

const manager = new ModelManager(Order);

const state = {
  manager,
  ...manager.state,
};

const getters = {
  ...manager.getters,
  byRequester: (state) => (id) =>
    state.all.filter((order) => order.requester_id === parseInt(id, 10)),
  byDecisionMaker: (state) => (id) =>
    state.all.filter((order) => order.decision_maker_id === parseInt(id, 10)),
  byTimePeriod: (state) => (startDate, endDate) =>
    state.all.filter(
      (order) =>
        new Date(startDate._d) <= new Date(order.created_at) &&
        new Date(order.created_at) <= new Date(endDate._d)
    ),
  byDecisionMakerTimePeriod: (state) => (id, startDate, endDate) =>
    state.all.filter(
      (order) =>
        new Date(startDate._d) <= new Date(order.created_at) &&
        new Date(order.created_at) <= new Date(endDate._d) &&
        order.decision_maker_id === parseInt(id, 10)
    ),
};

const actions = {
  ...manager.actions,
  addOrder({ commit }, order) {
    commit("addItem", order);
  },
  updateOrderStatus({ commit }, { order, status }) {
    api.put(`${order.endpoint}status/`, { status }).then((resp) => {
      order.status[0].status_id = status.status_id;
      commit("updateItem", resp.data);
      commit("updateItem", resp.data);
    });
  },
  addComment({ commit }, { order, comment, status }) {
    api
      .post(`${order.endpoint}status/comment/`, { comment, status })
      .then((resp) => {
        commit("updateItem", resp.data);
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
