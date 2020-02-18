export default  [
    //人员详情页面
    {
        path: "/personDetailPage",
        name: "personDetailPage",
        meta: {
          title: "个人详情",
          oneTab:true,
        },
        component: () => import("@/page/person/person-manage/personDetailPage.vue")
      },
]