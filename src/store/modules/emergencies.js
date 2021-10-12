import { ModelManager } from "../manager";
import { Emergency } from "@/models";
import api from "@/services/api";

const manager = new ModelManager(Emergency);

const state = {
  manager,
  ...manager.state,
};

const getters = {
  ...manager.getters,
};

const actions = {
  ...manager.actions,
  delete() {
    return new Promise((resolve, reject) => {
      api
        .delete(this.endpoint)
        .then((resp) => {
          resolve(resp);
        })
        .catch((e) => {
          reject(e);
        });
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
