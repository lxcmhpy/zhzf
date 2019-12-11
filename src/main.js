// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import { router } from "./router/index";
import store from "./store";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import "@/js/dateFormat";
import util from "@/js/util";
import qs from 'qs';

Vue.use(ElementUI);


Vue.config.productionTip = false;

Vue.prototype.$util = util;
Vue.prototype.$qs = qs;
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
