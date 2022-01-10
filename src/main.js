import Vue from "vue";
import App from "./App.vue";
import moment from "moment";
import router from "./router";
import store from "./store";
import { VTooltip, VClosePopover, VPopover } from "v-tooltip";

Vue.config.productionTip = false;

Vue.directive("close-popover", VClosePopover);
Vue.component("v-popover", VPopover);
Vue.use(VTooltip);

Vue.filter("date", (value) => {
  if (value) {
    return moment(value).format("DD.MM.YYYY");
  }
  return "";
});

Vue.filter("datetime", (value) => {
  if (value) {
    return new Date(value).toLocaleString("de-DE");
  }
  return "";
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
