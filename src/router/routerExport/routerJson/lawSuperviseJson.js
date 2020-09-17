import MainContent from '@/components/mainContent'//Layout 是架构组件，不在后台返回，在文件里单独引入
export default  [
  {
    //可视化监管
    path: '/lawSupervise',
    name: 'law_supervise_lawSupervise',
    meta: {
      title: "执法监管",
      oneTab:true,
    },
    component: MainContent,
    children: [
      {
        //执法监管
        path: '/lawSupervise',
        name: 'law_supervise_lawSupervise',
        meta: {
          title: "可视化监管",
          oneTab:true,
        },
        component: () => import("@/page/lawSupervise/supervisePage/kshjg/lawSupervise.vue"),
      },
      {
        //执法监管
        path: '/jiangXiMap',
        name: 'jiang_xi_map',
        meta: {
          title: "江西可视化地图",
          oneTab:true,
          keepAlive: true
        },
        component: () => import("@/page/lawSupervise/supervisePage/kshjg/jiangXiMap"),
      },
      {
        //高德地图
        path: '/aMap',
        name: 'aMap',
        meta: {
          title: "可视化地图",
          oneTab:true,
          keepAlive: true
        },
        component: () => import("@/page/lawSupervise/supervisePage/kshjg/amap"),
      },
      {
        //称重数据手工同步
        path: '/weightDataSync',
        name: 'weightDataSync',
        meta: {
          title: "称重数据手工同步",
          oneTab:true,
        },
        component: () => import("@/page/lawSupervise/supervisePage/weightDataSync/syncManage"),
      },
      // {
      //     path: "/offSiteDetectionOverload",
      //     name: "law_supervise_offSiteDetectionOverload",
      //     meta: {
      //     title: "非现场治超检测",
      //     oneTab:true,
      //     },
      //     component: () => import("@/page/lawSupervise/supervisePage/kshjg/offSiteDetectionOverload.vue")
      // }
      // {
      //     path: "/teamStrength",
      //     name: "teamStrength",
      //     meta: {
      //     title: "队伍力量",
      //     oneTab:true,
      //     },
      //     component: () => import("@/page/lawSupervise/supervisePage/kshjg/teamStrength.vue")
      // }
    ]
  }, {
      //线索中心
      path: '/clueManage',
      name: 'law_supervise_clueManage',
      component: MainContent,
      children: [{
              path: '/offSiteManage',
              name: 'law_supervise_offSiteManage',
              meta: {
                  title: '非现场治超列表',
                  oneTab:true,
              },
              component: () => import("@/page/lawSupervise/supervisePage/xszx/offSiteManage.vue"),
          }, {
              path: '/offSiteDetail/:offSiteManageId',
              name: 'law_supervise_offSiteDetail',
              meta: {
                  title: '线索详情'
              },
              component: () => import("@/page/lawSupervise/supervisePage/xszx/offSiteDetail.vue")
          }, {
              path: '/evidenceDetail/:offSiteManageId',
              name: 'law_supervise_evidenceDetail',
              meta: {
                  title: '证据详情'
              },
              component: () => import("@/page/lawSupervise/supervisePage/xszx/evidenceDetail.vue")
          }, {
          path: '/invalidCueDetail/:offSiteManageId',
          name: 'law_supervise_invalidCueDetail',
          meta: {
              title: '无效信息'
          },
          component: () => import("@/page/lawSupervise/supervisePage/xszx/invalidCueDetail.vue")
      },
      {
          path: '/examineDoingDetail/:status/:offSiteManageId',
          name: 'law_supervise_examineDoingDetail',
          meta: {
              title: '线索审核'
          },
          component: () => import("@/page/lawSupervise/supervisePage/xszx/examineDoingDetail.vue")
      },
      {
          path: '/transferDetail/:offSiteManageId',
          name: 'law_supervise_transferDetail',
          meta: {
              title: '已转办详情'
          },
          component: () => import("@/page/lawSupervise/supervisePage/xszx/transferDetail.vue")
      },
      {
          path: '/transferManage',
          name: 'law_supervise_transferManage',
          meta: {
              title: '转办列表'
          },
          component: () => import("@/page/lawSupervise/supervisePage/xszx/transferManage.vue")
      }]
  }, {
      //统计分析
      path: '/analysis',
      name: 'law_supervise_analysis',
      component: MainContent,
      children: [{
              path: '/checkAnalyse',
              name: 'law_supervise_checkAnalyse',
              meta: {
                  title: '治超检测统计分析',
                  oneTab:true,
              },
              component: () => import("@/page/lawSupervise/supervisePage/tjfx/checkAnalyse.vue")
          }]
  }, {
      path: "/keyVehicleDentails/:id",
      name: "law_supervise_keyVehicleDentails",
      meta: {
        title: "监管车辆详情",
      },
      component: () => import("@/page/lawSupervise/supervisePage/zdjg/keyVehicleDentails.vue")
  }, {
      path: "/keyVehicleManage",
      name: "law_supervise_keyVehicleManage",
      meta: {
        title: "监管车辆列表",
      },
      component: () => import("@/page/lawSupervise/supervisePage/zdjg/keyVehicleManage.vue")
  }, {
      path: "/deviceManage",
      name: "law_supervise_deviceManage",
      meta: {
        title: "设备资源管理",
      },
      component: () => import("@/page/lawSupervise/supervisePage/device/deviceManage.vue")
  }, {
      path: "/deviceTypeManage",
      name: "law_supervise_deviceTypeManage",
      meta: {
        title: "设备类型管理",
      },
      component: () => import("@/page/lawSupervise/supervisePage/devicetype/deviceTypeManage.vue")
  }, {
      path: "/eventManage",
      name: "law_supervise_eventManage",
      meta: {
        title: "事件管理",
      },
      component: () => import("@/page/lawSupervise/supervisePage/eventManage")
  },{
    path: "/emphasisVehicle",
    name: "law_supervise_emphasisVehicle",
    meta: {
    title: "重点车辆",
    },
    component: () => import("@/page/lawSupervise/supervisePage/emphasis/vehicleManage")
  },{
    path: "/emphasisEnterprise",
    name: "law_supervise_emphasisEnterprise",
    meta: {
    title: "重点企业",
    },
    component: () => import("@/page/lawSupervise/supervisePage/emphasis/enterpriseManage")
  },{
    path: "/emphasisPerson",
    name: "law_supervise_emphasisPerson",
    meta: {
    title: "重点人员",
    },
    component: () => import("@/page/lawSupervise/supervisePage/emphasis/personManage")
  }
]
