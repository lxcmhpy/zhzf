import MainContent from '@/components/mainContent'//Layout 是架构组件，不在后台返回，在文件里单独引入
export default  [
    {
        path: "/deviceTypeManagment",
        name: "deviceTypeManagment",
        meta: {
          title: "装备类型管理"
        },
        component: () => import("@/page/device/device-type/deviceTypeManagment.vue")
    },
    {
        path: "/deviceInventoryManage",
        name: "deviceInventoryManage",
        meta: {
          title: "库存管理"
        },
        component: () => import("@/page/device/device-inventory/deviceInventoryManage.vue")
    },
    {
        path: "/deviceUserdBillManage",
        name: "deviceUserdBillManage",
        meta: {
          title: "配发(领用)管理"
        },
        component: () => import("@/page/device/device-bill/deviceUserdBillManage.vue")
    }
]
