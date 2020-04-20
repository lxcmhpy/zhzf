import MainContent from '@/components/mainContent'
import Layout from '@/page/lagout/mainLagout' //Layout 是架构组件，不在后台返回，在文件里单独引入
export default [
  {
    name: "sys_xboot",
    path: "/main",
    component: Layout,
    children: [
      {
        name: "sys",
        path: "/sys",
        component: MainContent,
        children: [
          {
            name: "user-manage",
            path: "/user-manage",
            meta: {
              title: "用户管理"
            },
            component: () => import("@/page/sys/user-manage/userManage.vue")
          },
          {

            name: "department-manage",
            path: "/department-manage",
            meta: {
              title: "部门管理"
            },
            component: () => import("@/page/sys/department-manage/departmentManage.vue")
          },
          {
            name: "log-manage",
            path: "/log-manage",
            meta: {
              title: "日志管理"
            },
            component: () => import("@/page/sys/log-manage/logManage.vue")
          },
          {
            name: "role-manage",
            path: "/role-manage",
            meta: {
              title: "角色管理"
            },
            component: () => import("@/page/sys/role-manage/roleManage.vue")
          },
          {
            name: "menu-manage",
            path: "/menu-manage",
            meta: {
              title: "菜单权限管理"
            },
            component: () => import("@/page/sys/menu-manage/menuManage.vue")
          },
          {
            name: "dict",
            path: "/dict",
            meta: {
              title: "数据字典"
            },
            component: () => import("@/page/sys/dict-manage/dictManage.vue")
          },
          {
            name: "organ-manage",
            path: "/organ-manage",
            meta: {
              title: "机构管理"
            },
            component: () => import("@/page/sys/organ-manage/organManage.vue")
          },
          {
            name: "违法行为法律法规管理",
            path: "/casecause",
            meta: {
              title: "违法行为法律法规管理"
            },
            // component: () => import("@/page/sys/dict-manage/dictManage.vue")
          }
        ]
      },
      {
        name: "product-template",
        path: "/product-template",
        component: MainContent,
        children: [
          {
            name: "banner",
            path: "banner",
            meta: {
              title: "环节管理"
            },
            component: () => import("@/page/product-template/banner/Banner.vue")
          },
          {
            name: "product",
            path: "product",
            meta: {
              title: "案件类型管理"
            },
            component: () => import("@/page/product-template/product/Product.vue")
          },
          {
            name: "category",
            path: "category",
            meta: {
              title: "案件流程管理"
            },
            component: () => import("@/page/product-template/category/Category.vue")
          },
          {
            name: "lawCategory",
            path: "lawCategory",
            meta: {
              title: "执法门类管理"
            },
            component: () => import("@/page/product-template/lawCategory/LawCategory.vue")
          },
          {
            name: "docType",
            path: "docType",
            icon: null,
            meta: {
              title: "文书管理"
            },
            component: () => import("@/page/product-template/docType/docType.vue")
          },
          {
            name: "案件编号管理",
            path: "caseNumber",
            meta: {
              title: "案件编号管理"
            },
            component: () => import("@/page/product-template/banner/Banner.vue")
          },
          {
            name: "送达回证管理",
            path: "repit",
            meta: {
              title: "送达回证管理"
            },
            component: () => import("@/page/product-template/banner/Banner.vue")
          },
          {
            name: "绑定属性管理",
            path: "bind",
            meta: {
              title: "绑定属性管理"
            },
            component: () => import("@/page/product-template/banner/Banner.vue")
          }
        ]
      },
      {
        name: "test",
        path: "test2",
        children: [
          {
            name: "md-jgbc",
            path: "user-orgSupplee",
            meta: {
              title: "机构补充"
            },
            // component: () => import("@/page/sys/user-orgSupplee/jgbc.vue")
          }
        ],
        meta: {
          title: "测试"
        }
      },
      {
        name: "personSysManage",
        path: "/person",
        component: MainContent,
        children: [
          {
            name: "paramManage",
            path: "person-param",
            meta: {
              title: "人员参数管理"
            },
            // component: () => import("@/page/person/person-param/param-manage.vue")
          },
          {
            name: "md-cart1",
            path: "person-station",
            meta: {
              title: "人员岗位管理"
            },
            // component: () => import("@/page/person/person-station/station-manage.vue")
          }
        ]
      }
    ]
  },
  {
    name: "doc",
    path: "/main",
    component: Layout,
  },
  {
    name: "caseHandle",
    path: "/main",
    component: Layout,
    meta: {
      title: "案件办理"
    },
    children: [
      {
        name: "myCase",
        path: "/myCase",
        component: MainContent,
        meta: {
          title: "我的案件"
        },
        children: [
          {
            name: "waiDeal",
            path: "waitDeal",
            meta: {
              title: "待办理"
            },
            component: () => import("@/page/caseHandle/waitDeal/waitDeal.vue")
          },
          {
            name: "unRecordCase",
            path: "unRecordCase",
            meta: {
              title: "未立案"
            },
            component: () => import("@/page/caseHandle/unRecordCase/unRecordCase.vue")
          },
          {
            name: "guidang",
            path: "waitArchive",
            meta: {
              title: "待归档"
            },
            component: () => import("@/page/caseHandle/waitArchive/waitArchive.vue")
          },
          {
            name: "approveIng",
            path: "approveIng",
            meta: {
              title: "审批中"
            },
            component: () => import("@/page/caseHandle/approveIng/approveIng.vue")
          },
          {
            name: "case",
            path: "caseHandle",
            meta: {
              title: "文书"
            },
            component: () => import("@/page/caseHandle/case/case.vue")
          }
        ],
      },
      {
        name: "approvalCenter",
        path: "/approvalCenter",
        component: MainContent,
        meta: {
          title: "审批中心"
        },
        children: [
          {
            name: "myApproval",
            path: "myApproval",
            meta: {
              title: "待我审批"
            },
            component: () => import("@/page/caseHandle/approvalCenter/myApproval.vue")
          }
        ]
      },
      {
        name: "cooperateCases",
        path: "/cooperateCases",
        component: MainContent,
        meta: {
          title: "协同办案"
        },
        children: [
          {
            name: "copyCase",
            path: "copyCase",
            meta: {
              title: "案件抄告"
            },
            component: () => import("@/page/caseHandle/cooperateCases/copyCase.vue")
          },
          {
            name: "caseTransfer",
            path: "caseTransfer",
            meta: {
              title: "移交移送"
            },
            component: () => import("@/page/caseHandle/cooperateCases/caseTransfer.vue")
          }
        ]
      },
      {
        name: "electronicCaseFile",
        path: "/electronicCaseFile",
        meta: {
          title: "电子案卷"
        },
        component: () => import("@/page/caseHandle/electronicCaseFile/electronicCaseFileList.vue")
      }
    ]
  }
]
