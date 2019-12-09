import mainLagout from "@/page/lagout/mainLagout";

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: "/login",
  name: "login",
  component: () => import("@/page/login/login.vue")
};
export const registRouter = {
  path: "/register",
  name: "register",
  meta: {
    title: "register - 注册"
  },
  component: () => import("@/page/login/register.vue")
};
export const redirectRouter = {
  path: "/",
  redirect: { name: "login" }
};

//主页的路由
export const lagoutOneRouter = [
  {
    path:'/main',
    name:'main',
    component: mainLagout,
    children: [
      {
        path:'/caseHandle',
        name:'caseHandle',
        component: () => import("@/page/caseHandle/index.vue"),
      }
    ]
  },
  {
    path: "*",
    component: () => import("@/page/error/error.vue")
  }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  loginRouter,
  registRouter,
  // ...lagoutOneRouter,
  redirectRouter
];
