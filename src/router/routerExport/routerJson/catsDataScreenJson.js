export default  [
    {
        //可视化监管
        path: '/catsDataScreen',
        name: 'catsDataScreen',
        meta: {
            title: "数据大屏"
        },
        component: () => import("@/page/catsDataScreen/catsDataScreen.vue")
    }]

