import MainContent from '@/components/mainContent' //Layout 是架构组件，不在后台返回，在文件里单独引入
export default [{
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
    path: "/userdBillManage",
    name: "userdBillManage",
    meta: {
      title: "配发(领用)管理"
    },
    component: () => import("@/page/device/device-bill/userdBillManage.vue")
  },
  {
    path: "/maintainBillManage",
    name: "maintainBillManage",
    meta: {
      title: "维修管理"
    },
    component: () => import("@/page/device/device-bill/maintainBillManage.vue")
  },
  {
    path: "/transferBillManage",
    name: "transferBillManage",
    meta: {
      title: "调拨管理"
    },
    component: () => import("@/page/device/device-bill/transferBillManage.vue")
  },
  {
    path: "/invalidBillManage",
    name: "invalidBillManage",
    meta: {
      title: "报废管理"
    },
    component: () => import("@/page/device/device-bill/invalidBillManage.vue")
  },
  {
    path: "/recoveryBillManage",
    name: "recoveryBillManage",
    meta: {
      title: "回收管理"
    },
    component: () => import("@/page/device/device-bill/recoveryBillManage.vue")
  },
  // 装备弹窗组件(zhjt)
  {
    name: "deviceComponts",
    path: "/device-componts",
    meta: {
      title: "装备组件"
    },
    component: () => import("@/page/device/components/index.vue")
  },
  // 车辆基本信息(zhjt)
  {
    name: "equipmentDetail",
    path: "/equipment-detail",
    meta: {
      title: "装备信息"
    },
    component: () => import("@/page/device/components/equipmentDetail/equipmentDetail.vue")
  },
  // 发证申请(zhjt)
  {
    name: "applyCertificate",
    path: "/apply-certificate",
    meta: {
      title: "发证申请"
    },
    component: () => import("@/page/device/components/applyManage/applyManage.vue")
  },
  {
    path: "/deviceVehicleManage",
    name: "deviceVehicleManage",
    meta: {
      title: "执法车辆管理"
    },
    component: () => import("@/page/device/device-vehicle/deviceVehicleManage.vue")
  },
  {
    path: "/deviceVehicle",
    name: "deviceVehicle",
    meta: {
      title: "执法车辆"
    },
    component: () => import("@/page/device/device-vehicle/deviceVehicle.vue")
  },
  {
    path: "/deviceParamManage",
    name: "deviceParamManage",
    meta: {
      title: "系统参数"
    },
    component: () => import("@/page/device/param/paramManage.vue")
    },
    {
        path: "/deviceApproveFlow",
        name: "deviceApproveFlow",
        meta: {
        title: "使用证流程配置"
        },
        component: () => import("@/page/device/approve-flow/approveFlow.vue")
    },
    {
        path: "/certificateBillManage",
        name: "certificateBillManage",
        meta: {
          title: "申请管理"
        },
        component: () => import("@/page/device/certificate-bill/certificateBillManage.vue")
    }
]
