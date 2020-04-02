import Vue from "vue";
import VueRouter from "vue-router";
import { routers } from "./router";
import iLocalStroage from "@/common/js/localStroage";

import Layout from '@/page/lagout/mainLagout' //Layout 是架构组件，不在后台返回，在文件里单独引入
import MainContent from '@/components/mainContent'


Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
  //   mode: 'history',
  mode: "hash",
  routes: routers
};

export const router = new VueRouter(RouterConfig);

// 路由拦截
// 需要鉴权
const whiteList = ["/login", "/register", "/service", "/user",'/flowChart','/modle','/othermodle',]; //免登录白名单

let getRouter ;
router.beforeEach((to, from, next) => {
  // console.log(Cookies.get("TokenKey"));
  // console.log('localStroage menu',iLocalStroage.gets('menu'))
  let tokenObj= iLocalStroage.getExpired('TokenKey');
  if (tokenObj) {
    //判断是否登录
    if (to.path == "/login") {
      next({ name: "home_index" });
    } else {
      if(!getRouter){
        if(iLocalStroage.get('menu')){
          routerGo(to, next)//执行路由跳转方法
        }
        
      }else{
        next();
      }
      //next();
    }
  } else {
    //未登录  进入登录页面
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next({ name: "login" });
    }
  }
});
router.afterEach(to => {
  window.scrollTo(0, 0);
});


function routerGo(to, next) {
  getRouter = iLocalStroage.gets('menu')//后台拿到路W由
  getRouter = filterAsyncRouter(getRouter) //过滤路由
  router.addRoutes(getRouter) //动态添加路由
  //global.antRouter = getRouter //将路由数据传递给全局变量，做侧边栏菜单渲染工作
  next({ ...to, replace: true })
}

function filterAsyncRouter(asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
   // if (route.component) {
      // debugger
      if(route.type == 1 || route.path == '' && route.type!= -1){
        return;
      }
      if (!route.component) {//Layout组件特殊处理
        route.component = Layout
      }else if(route.component == 'Main'){
        route.component = MainContent;
      }else {
        console.log('route.component',route.component);
        route.meta ={ title:route.title ,permTypes:route.permTypes ? route.permTypes : ''};
        route.component = loadView(route.component);
      }
    //}
    if(route.type== -1){
      route.path = '/main';
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children);
    }

    return true
  })
  console.log('accessedRouters',accessedRouters);
  return accessedRouters
}

function loadView(view)
{
   return () => import(`@/page/${view}.vue`);
}
