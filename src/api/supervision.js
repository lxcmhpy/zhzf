import  request  from  "@/common/js/request";
import  {setCancelSource}  from  "@/common/js/cancelToken";
import  Vue  from  "vue";

let  vm  =  new  Vue();

// 日志管理列表
export function getCheChecklogPageList(data){
  return request({
    url: "/checklog/cheChecklogPageList",
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}

//获取排班管理接口
export function getScheduleListApi(data){
  return request({
      url: "/schedule/cheSchedulePageList",
      method: "get",
      params: data,
      showloading: true,
      loadingType: 'loadPart',
      baseUrlType: 'DUTY_HOST',
      cancelToken: setCancelSource()
  });
}

//删除排班管理
export function deleteCheScheduleApi(scheduleId){
  return request({
    url: "/check/schedule/deleteCheScheduleById/" + scheduleId,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'DUTY_HOST',
    cancelToken: setCancelSource()
  });
}

//保存排班管理
export function addCheScheduleApi(data){
  return request({
      url: "/schedule/addCheSchedule",
      method: "post",
      data: data,
      showloading: true,
      loadingType: 'loadPart',
      baseUrlType: 'DUTY_HOST',
      cancelToken: setCancelSource()
  });
}

//修改排班管理
export function updateCheScheduleApi(data){
  return request({
      url: "/schedule/updateCheSchedule",
      method: "post",
      data: data,
      showloading: true,
      loadingType: 'loadPart',
      baseUrlType: 'DUTY_HOST',
      cancelToken: setCancelSource()
  });
}

//记录管理分页列表
export function getCheRecordPageListApi(data){
  return request({
    // url: "/check/record/cheRecordPageList",
    url: "/record/cheRecordPageList",
    method: "get",
    params: data,
    showloading: true,
    cancelToken: setCancelSource(),
    baseUrlType:"DUTY_HOST"
  })
}

//删除记录
export function deleteCheRecordByIdsApi(data){
  return request({
    // url: "/check/record/deleteCheRecordByIds",
    url: "/record/deleteCheRecordByIds",
    method: "post",
    data: data,
    showloading: true,
    cancelToken: setCancelSource(),
    baseUrlType:"DUTY_HOST"
  })
}

//查询记录模板
export function getCheRecordTempPageListApi(data){
  return request({
    // url: "/check/template/cheRecordTemplatePageList",
    url: "/template/cheRecordTemplatePageList",
    method: "get",
    params: data,
    showloading: true,
    cancelToken: setCancelSource(),
    baseUrlType:"DUTY_HOST"
  })
}

//保存记录
export function addCheRecordApi(data){
  return request({
    // url: "/check/record/addCheRecord",
    url: "/record/addCheRecord",
    method: "post",
    data: data,
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'DUTY_HOST',
    cancelToken: setCancelSource()
  });
}

//查询记录详情
export function getCheRecordDetailApi(data) {
  return request({
    // url: "/check/record/updateCheRecord",
    url: "/record/updateCheRecord",
    method: "get",
    params: data,
    showloading: true,
    cancelToken: setCancelSource(),
    baseUrlType:"DUTY_HOST"
  })
}

//查询处理等级
export function getCheProcessTypeTreeApi() {
  return request({
    // url: "/check/cheProcessType/tree",
    url: "/cheProcessType/tree",
    method: "get",
    showloading: true,
    cancelToken: setCancelSource(),
    baseUrlType:"DUTY_HOST"
  })
}

//根据处理等级获取处理情况
export function getProcessTypeApi(processTypeId) {
  return request({
    // url: "/check/cheProcessType/tree",
    url: "/cheProcess/list/" + processTypeId,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource(),
    baseUrlType:"DUTY_HOST"
  })
}

//获取处理下级
export function getProcessApi(processId) {
  return request({
    // url: "/check/cheProcessType/tree",
    url: "/cheProcess/child/" + processId,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource(),
    baseUrlType:"DUTY_HOST"
  })
}

//根据处理等级获取处理情况
export function getProcessTypeTreeApi(processTypeId) {
  return request({
    // url: "/check/cheProcessType/tree",
    url: "/cheProcess/tree/" + processTypeId,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource(),
    baseUrlType:"DUTY_HOST"
  })
}