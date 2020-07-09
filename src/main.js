// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from "vue";
import store from "./store";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import "@/common/js/dateFormat";
import util from "@/common/js/util";
import qs from 'qs';
import hasPermission from "@/common/js/hasPermission"
import App from "./App";
import { router } from "./router/index";
//引入全局变量
import {BASIC_DATA_SYS} from '@/common/js/BASIC_DATA.js';
import {BASIC_DATA_JX} from '@/common/js/BASIC_DATA_JX.js';

// import { message } from '@/common/js/resetMessage';

Vue.use(ElementUI);
Vue.use(hasPermission);
// Vue.prototype.$message = message;

Vue.config.productionTip = false;

Vue.prototype.$util = util;
Vue.prototype.$qs = qs;
//注册全局变量
Vue.prototype.BASIC_DATA_SYS = BASIC_DATA_SYS;
Vue.prototype.BASIC_DATA_JX = BASIC_DATA_JX;



/* eslint-disable no-new */
const v = new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>",
});
export default v
