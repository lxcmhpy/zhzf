import Vue from "vue";
import VueRouter from "vue-router";
import {routers} from "./router";
import iLocalStroage from "@/common/js/localStroage";
import { personDetailRouter } from './routerExport/routerJson/personRouterJson';
import store from '@/store/index.js';
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/common/js/loading";
const vm = new Vue();

Vue.use(VueRouter);

// 路由拦截
// 需要鉴权
const whiteList = ["/login", "/register", "/service", "/user", '/flowChart', '/case_handle_modle', '/case_handle_othermodle', "/examLogin"]; //免登录白名单
const regularList = {
    loginByToken: /\/loginByToken\/[a-zA-Z0-9\_\-\.]+\/\d{13}$/g
}
// 路由配置
const RouterConfig = {
  mode: "hash",
  routes: routers
};
export const router = new VueRouter(RouterConfig);
router.beforeEach((to, from, next) => {
    let loadingType =  to.params.loadingType ? to.params.loadingType : 'loadPart';
    showFullScreenLoading(loadingType);
  let tokenObj = iLocalStroage.getExpired('TokenKey');
  if (tokenObj) {
    //判断是否登录
    if (to.path === "/login") {
        store.commit('CLEAR_ALL_CACHE');
        next({name: "login"});
        // next({name: "case_handle_home_index"});
    } else if (to.path.indexOf('personDetailPage') > -1 && localStorage.getItem('NewRouter') && from.path === '/') {
      // 人员管理--个人详情动态生成路由刷新
      personDetailRouter(localStorage.getItem('NewRouter'), router);
    } else {
      next();
    }
  } else {
    //未登录  进入登录页面
    // debugger;
    if (whiteList.indexOf(to.path) !== -1) {
        store.commit('CLEAR_ALL_CACHE');
        next();
    } else {

        let arrayPath = to.path.split('/');
        if(arrayPath.length > 1 && regularList[arrayPath[1]]&&regularList[arrayPath[1]].test(to.path)) {
            store.commit('CLEAR_ALL_CACHE');
            next();
        } else {
            if(sessionStorage.getItem('LoginSystem')){
                    // 考试人员子系统
                // store.commit('CLEAR_ALL_CACHE');
                next({name: 'examLogin'});
            }else{
                store.commit('CLEAR_ALL_CACHE');
                next({name: "login"});
            }
        }
    }
  }
});
router.afterEach(to => {
  tryHideFullScreenLoading();
  window.scrollTo(0, 0);
});

