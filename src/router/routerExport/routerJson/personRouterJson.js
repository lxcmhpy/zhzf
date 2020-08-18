import Layout from '@/page/lagout/mainLagout'
import MainContent from '@/components/mainContent'

export const personRouterJson = [
  {
    path: '/personManage',
    name: 'personManage',
    component: MainContent,
    children: [
      // 人员管理
      {
        name: "paragraphNumber",
        path: "/paragraphNumber",
        component: MainContent,
        meta: { title: "号段管理" },
        redirect: '/paragraph-management',
        children: [
          {
            name: "enforcementSection",
            path: "/paragraph-management",
            meta: { title: "执法号段", loading: false },
            component: () => import("@/page/person/paragraph-management/enforcementList")
          }
        ],
      },
      {
        name: "personBaseInfo",
        path: "/person_base_Info",
        component: MainContent,
        meta: { title: "基本信息" },
        redirect: '/person-manage',
        children: [
          {
            name: "person_info",
            path: "/person-manage",
            meta: { title: "人员信息", loading: false },
            component: () => import("@/page/person/person-manage/personInfo.vue")
          },
          {
            name: "personAudit",
            path: "/person-audit",
            meta: { title: "人员审批", loading: false },
            component: () => import("@/page/person/person-audit/personAudit.vue")
          },
          {
            name: "yearAudit",
            path: "/person-apply",
            meta: {title: "人员年审", loading: false },
            component: () => import("@/page/person/person-apply/personApply.vue")
          },
          {
            name: "apply-result",
            path: "/person-yearApplyResult",
            meta: { title: "年审成绩", loading: false },
            component: () => import("@/page/person/person-apply/person-yearApplyResult/personYearApplyResult.vue")
          },
          {
            name: "staff-in",
            path: "/staff-transfer-in",
            meta: { title: "人员调入", loading: false },
            component: () => import("@/page/person/staff-transfer-in/staffInList.vue")
          },
          {
            name: "staff-out",
            path: "/staff-transfer-out",
            meta: { title: "人员调出", loading: false },
            component: () => import("@/page/person/staff-transfer-out/staffOutList.vue")
          },
          {
            name: "person-appaly",
            path: "/person-yearApply",
            meta: { title: "人员复审", loading: false },
            component: () => import("@/page/person/person-apply/person-yearApply/personYearApply.vue")
          }
        ]
      },
      {
        name: "certificates",
        path: "/certificates",
        component: MainContent,
        meta: { title: "证件管理" },
        redirect: '/certificate-info',
        children: [
          {
            name: "certificateInfo",
            path: "/certificate-info",
            meta: { title: "证件信息", loading: false },
            component: () => import("@/page/person/certificate-info/certificateInfoList.vue")
          },
          {
            name: "certificateAward",
            path: "/certificate-award",
            meta: { title: "颁发证件", loading: false },
            component: () => import("@/page/person/certificate-award/certificateAwardList.vue")
          },
          {
            name: "certificateUpdate",
            path: "/certificate-update",
            meta: {title: "修改证件", loading: false },
            component: () => import("@/page/person/certificate-update/certificateUpdateList.vue")
          },
          {
            name: "certificateVerification",
            path: "/certificate-verification",
            meta: { title: "验证证件", loading: false },
            component: () => import("@/page/person/certificate-verification/certificateVerificationList.vue")
          },
          {
            name: "certificateData",
            path: "/certificate-data",
            meta: { title: "制证数据", loading: false },
            component: () => import("@/page/person/certificate-data/certificateDataList.vue")
          }
        ]
      },
      {
        name: "comprehensiveStatistics",
        path: "/person",
        meta: {
          title: "综合统计"
        },
      // component: () => import("@/page/person/certificate-data/certificateDataList.vue")
      },
      {
        name: "comprehensiveQuery",
        path: "/person",
        meta: {
          title: "综合查询"
        },
      // component: () => import("@/page/person/certificate-data/certificateDataList.vue")
      },
      {
        name: "batchImport",
        path: "/person",
        meta: {
          title: "批量导入"
        },
      // component: () => import("@/page/person/certificate-data/certificateDataList.vue")
      },
      {
        name: "informationService",
        path: "/person",
        meta: {
          title: "信息服务"
        },
      // component: () => import("@/page/person/certificate-data/certificateDataList.vue")
      },
      {
        name: "publicityOnInternet",
        path: "/person",
        meta: {
          title: "网上公示"
        },
      // component: () => import("@/page/person/certificate-data/certificateDataList.vue")
      },
      {
        name: "logManagement",
        path: "/person",
        meta: {
          title: "日志管理"
        }
      // component: () => import("@/page/person/certificate-data/certificateDataList.vue")
      },
      // 日常绩效管理
      {
        name: "dailyAttendanceManage",
        path: "/dailyAttendanceManage",
        component: MainContent,
        meta: { title: "日常绩效管理" },
        redirect: '/attendance-info',
        children: [
          {
            name: "attendanceInfo",
            path: "/attendance-info",
            meta: { title: "考勤信息管理", loading: false },
            component: () => import("@/page/person/attendance-manage/attendanceInfo")
          },
          {
            name: "personTrainInfo",
            path: "/person-train-info",
            meta: { title: "培训信息管理", loading: false },
            component: () => import("@/page/person/attendance-manage/trainInfo")
          },
          {
            name: "personExamInfo",
            path: "/person-exam-info",
            meta: { title: "考试信息管理", loading: false },
            component: () => import("@/page/person/attendance-manage/examInfo")
          },
          {
            name: "personComplaintsReport",
            path: "/person-complaints-report",
            meta: { title: "投诉举报记录管理", loading: false },
            component: () => import("@/page/person/attendance-manage/complaintsReport")
          },
          {
            name: "personComplaintsReportDetail",
            path: "/person-complaints-report-detail",
            meta: { title: "投诉举报记录", loading: false },
            component: () => import("@/page/person/attendance-manage/components/complaintsDetail")
          },
          {
            name: "personAttendanceDetail",
            path: "/person-attendance-detail",
            meta: { title: "考勤详情", loading: false },
            component: () => import("@/page/person/attendance-manage/components/attendanceDetail")
          }
        ]
      }
    ]
  },
  //人员详情页面
  {
    path: "/personDetailPage",
    name: "personDetailPage",
    meta: {
      title: "个人详情",
      oneTab:true,
    },
    component: () => import("@/page/person/person-manage/personDetailPage.vue")
  }
]

// 人员管理--个人详情动态添加路由
export const PersonRouter = [{
  path:"/personDetail",
  component: Layout,
  children: [
    {
      path: '/detail',
      component: MainContent,
      children: []
    }
  ]
}];
export function personDetailRouter(to, router){
  const addRoute = JSON.parse(to);
  localStorage.removeItem('NewRouter');
  const PersonRouter = [{
    path:"/personDetail",
    component: Layout,
    children: [
      { path: '/detail', component: MainContent, children: [] }
    ]
  }]
  const newRouter = {
    path: addRoute.path,
    name: addRoute.name,
    meta: addRoute.meta,
    component: resolve => require(["@/page/person/person-manage/personDetailPage.vue"], resolve )
  };
  PersonRouter[0].children[0].children.push(newRouter);
  router.addRoutes(PersonRouter);
  router.push({ path: addRoute.path });
}
