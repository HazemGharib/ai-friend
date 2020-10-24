import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import io from "socket.io-client";
import VueSocketIOExt from "vue-socket.io-extended";

Vue.config.productionTip = false;

Vue.use(VueSocketIOExt, io(process.env.VUE_APP_SOCKET_URL));

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
