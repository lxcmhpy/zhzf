import Vue from "vue";
import VueRouter from "vue-router";
import {routers} from "./router";
import iLocalStroage from "@/common/js/localStroage";


Vue.use(VueRouter);

// 路由拦截
// 需要鉴权
const whiteList = ["/login", "/register", "/service", "/user", '/flowChart', '/modle', '/othermodle',]; //免登录白名单

// 路由配置
const RouterConfig = {
  mode: "hash",
  routes: routers
};
let getRouter;
export const router = new VueRouter(RouterConfig);
router.beforeEach((to, from, next) => {
  let tokenObj = iLocalStroage.getExpired('TokenKey');
  if (tokenObj) {
    //判断是否登录
    if (to.path === "/login") {
      next({name: "case_handle_home_index"});
    } else {
      next();
    }
  } else {
    //未登录  进入登录页面
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next({name: "login"});
    }
  }
});
router.afterEach(to => {
  window.scrollTo(0, 0);
});
