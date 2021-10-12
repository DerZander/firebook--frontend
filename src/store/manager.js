import Vue from "vue";
import { Model } from "@/models/model";
import api from "@/services/api";

export class ModelManager {
  constructor(Clazz) {
    if (!(Clazz.prototype instanceof Model)) {
      throw Error("Class needs to inherit from Model");
    }

    this.Clazz = Clazz;
    this.namespace = Clazz.NAME;

    this.all = [];
  }

  get Namespace() {
    return this.namespace;
  }

  static getPayload(args) {
    if (!args[args.length - 1]) {
      return args[1];
    }
    return args[0];
  }

  byId(id) {
    const res = this.getters.byId()(id);
    if (!res.id) {
      this.actions.byId(id);
    }
    return res;
  }

  state = {
    all: [],
    loading: [],
    failed: [],
    nullResponse: false,
  };

  getters = {
    all: () => this.state.all,
    byId: () => (id) => {
      const res = this.state.all.find((item) => item.id === parseInt(id, 10));
      if (!res) {
        return new this.Clazz();
      }
      return res;
    },
    loading: () => this.state.loading,
    failed: () => this.state.failed,
    manager: () => this,
    isLoading: () => (id) => this.state.loading.includes(parseInt(id, 10)),
  };

  actions = {
    all: () => {
      if (
        !this.state.loading.find((item) => item === "all") &&
        !this.state.nullResponse
      ) {
        this.mutations.setLoading("all");
        api
          .get(this.Clazz.ENDPOINT_PATH)
          .then((resp) => {
            let newItem = false;
            resp.data.results.forEach((newInstance) => {
              if (
                !this.state.all.find(
                  (oldInstance) => oldInstance.id === newInstance.id
                )
              ) {
                this.mutations.addItem(newInstance);
                newItem = true;
              }
            });
            if (!newItem) {
              this.state.nullResponse = true;
            }
          })
          .catch((err) => {
            if (err.response && err.response.status === 204) {
              this.state.nullResponse = true;
            }
          })
          .finally(() => {
            this.mutations.removeLoading("all");
          });
      }
    },
    byId: (...args) => {
      const id = parseInt(ModelManager.getPayload(args), 10);
      if (
        !this.state.loading.find((item) => item === id) &&
        !this.state.failed.find((item) => item === id) &&
        !isNaN(id)
      ) {
        this.mutations.setLoading(id);
        api
          .get(`${this.Clazz.ENDPOINT_PATH + id}/`)
          .then((resp) => {
            if (
              !this.state.all.find(
                (oldInstance) => oldInstance.id === resp.data.id
              )
            ) {
              this.mutations.addItem(resp.data);
            }
          })
          .catch(() => {
            this.mutations.setFailed(id);
          })
          .finally(() => {
            this.mutations.removeLoading(id);
          });
      }
    },
  };

  mutations = {
    setLoading: (...item) => {
      this.state.loading.push(item[item.length - 1]);
    },
    removeLoading: (...item) => {
      this.state.loading.splice(
        this.state.loading.indexOf(item[item.length - 1]),
        1
      );
    },
    setFailed: (...item) => {
      this.state.failed.push(item[item.length - 1]);
    },
    addItem: (...item) => {
      this.state.all.push(new this.Clazz(item[item.length - 1]));
      this.state.nullResponse = false;
    },
    updateItem: (...item) => {
      const index = this.state.all.findIndex(
        (_item) => _item.id === item[item.length - 1].id
      );
      Vue.set(this.state.all, index, item[item.length - 1]);
    },
  };
}
