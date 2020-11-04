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
const whiteList = ["/login", "/register", "/service", "/user",  "/examLogin",'/loginByToken']; //免登录白名单
const regularList = {
    loginByToken: /\/loginByToken\/[a-zA-Z0-9\_\-\.]+\/\d+$/g
}
// 路由配置
const RouterConfig = {
  mode: "hash",
  routes: routers
};
export const router = new VueRouter(RouterConfig);
router.beforeEach((to, from, next) => {
    // let loadingType =  to.params.loadingType ? to.params.loadingType : 'loadFull';
    // 考试系统不需要全局loading效果
    to.meta.loading !== false&& to.params.loadingType && showFullScreenLoading(loadingType);
    let tokenObj = iLocalStroage.getExpired('TokenKey');
    if (tokenObj) {
        //判断是否登录
        if (to.path === "/login") {
            // store.commit('CLEAR_ALL_CACHE');
            // {name: "login"}
            next();
        } else if (to.path.indexOf('personDetailPage') > -1 && localStorage.getItem('NewRouter') && from.path === '/') {
        // 人员管理--个人详情动态生成路由刷新
        personDetailRouter(localStorage.getItem('NewRouter'), router);
        } else {
        next();
        }
    } else {
        //未登录  进入登录页面
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
         
            let arrayPath = to.path.split('/');
            if(arrayPath.length > 1 && regularList['loginByToken'].test(to.path)) {
                // store.commit('CLEAR_ALL_CACHE');
                next();
            } else {
                if(sessionStorage.getItem('LoginSystem')){
                        // 考试人员子系统
                    // store.commit('CLEAR_ALL_CACHE');
                    next({name: 'examLogin'});
                }else{
                    // store.commit('CLEAR_ALL_CACHE');
                    // alert(to.path)
                    console.log("to.path", to.path)
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

