import MainContent from '@/components/mainContent'//Layout 是架构组件，不在后台返回，在文件里单独引入
export default  [
    {
        path: "/deviceTypeManagment",
        name: "deviceTypeManagment",
        meta: {
          title: "装备类型管理"
        },
        component: () => import("@/page/device/device-type/deviceTypeManagment.vue")
    }
]
