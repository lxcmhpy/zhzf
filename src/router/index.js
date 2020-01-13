import Vue from "vue";
import VueRouter from "vue-router";
import { routers } from "./router";
import Cookies from "@/js/cookies";
import iLocalStroage from "@/js/localStroage";

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
const whiteList = ["/login", "/register", "/service", "/user",'/flowChart','/modle','/othermodle']; //免登录白名单

let getRouter ;
router.beforeEach((to, from, next) => {
  console.log(Cookies.get("TokenKey"));
  console.log('localStroage menu',iLocalStroage.gets('menu'))
  if (Cookies.get("TokenKey")) {
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
  getRouter = iLocalStroage.gets('menu')//后台拿到路由

  getRouter = filterAsyncRouter(getRouter) //过滤路由
  router.addRoutes(getRouter) //动态添加路由
  //global.antRouter = getRouter //将路由数据传递给全局变量，做侧边栏菜单渲染工作
  next({ ...to, replace: true })
}

function filterAsyncRouter(asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
   // if (route.component) {

      if (route.component == '' ) {//Layout组件特殊处理
        route.component = Layout
      }else if(route.component == 'Main'){
        route.component = MainContent;
      }
       else {
        route.meta ={ title:route.title ,permTypes:route.permTypes ? route.permTypes : ''};
        route.component = loadView(route.component)
      }
    //}
    if(route.type== -1){
      route.path = '/main';
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children);
    }

    //  if(route.id == "127996320085446656"){   //给案件办理添加首页
    //   console.log('给案件办理添加首页')
    //   route.children.unshift({name:'index',component:loadView('caseHandle/index'),path:'/caseHandleIndex'})
    // }


    // if(route.id == "125909152017944576"){
    //   route.children.unshift({ path:'', redirect:'/sys/user-manage'})
    // }



    return true
  })
  // console.log('accessedRouters',accessedRouters);
  return accessedRouters
}

function loadView(view)
{
  //  console.log(`@/page/${view}.vue`);
  //  if(view){
  //   // 路由懒加载
  //   return () => import(`@/page/${view}.vue`);
  //  }
   return () => import(`@/page/${view}.vue`);
}
