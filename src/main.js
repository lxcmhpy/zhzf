// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import { router } from "./router/index";
import store from "./store";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import "@/common/js/dateFormat";
import util from "@/common/js/util";
import qs from 'qs';
import hasPermission from "@/common/js/hasPermission"
// import mySignture from "@/common/js/mySignture";
// 滑动验证
import VueSimpleVerify from 'vue-simple-verify'
import '../node_modules/vue-simple-verify/dist/vue-simple-verify.css'


Vue.component('vue-simple-verify', VueSimpleVerify)

Vue.use(ElementUI);
Vue.use(hasPermission);


Vue.config.productionTip = false;

Vue.prototype.$util = util;
Vue.prototype.$qs = qs;
// Vue.prototype.$mySignture = mySignture;

/* eslint-disable no-new */
const v = new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
export default v
