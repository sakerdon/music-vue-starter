import Vue from 'vue'
import App from './App.vue'

import store from "./store";
import router from "./router";

import "normalize.css/normalize.css"; // a modern alternative to CSS resets
import "@/styles/index.scss"; // global css


Vue.config.productionTip = false

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
