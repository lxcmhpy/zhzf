import  request  from  "@/common/js/request";
import  {setCancelSource}  from  "@/common/js/cancelToken";
import  Vue  from  "vue";
import { data } from "autoprefixer";

let  vm  =  new  Vue();
// 日志管理列表
export function getCheChecklogPageList(data){
  return request({
    url: "/check/checklog/cheChecklogPageList",
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}

// 新增日志管理
export function saveRecordApi(data){
  return request({
    url: "/check/checklog/addCheChecklog",
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 修改日志管理
export function updateRecordApi(data){
  return request({
    url: "/check/checklog/updateCheChecklog",
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}

// 获取记录列表
export function getRecordListApi(data){
  return request({
    url: "/check/record/cheRecordPageList",
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource(),
  })
}

// 删除日志管理
export function deleteRecordApi(checklogId){
  return request({
    url: "/check/checklog/deleteCheChecklogById/"+checklogId,
    method: "get",
    showloading: false,
    cancelToken: setCancelSource()
  })
}
//获取关联记录列表
export function getCheRecordLogApi(data){
  return request({
    url: "/check/record/getCheRecordLog",
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}

//解除关联
export function delCheRecordTemplateApi(data){
  return request({
    url: "/check/record/delCheRecordTemplate",
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}

//交接班
export function addCheShiftchangeApi(data){
  return request({
    url: "/check/shiftchange/addCheShiftchange",
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}

//获取排班管理接口
export function getScheduleListApi(data){
  return request({
      url: "/check/schedule/cheSchedulePageList",
      method: "get",
      params: data,
      showloading: true,
      loadingType: 'loadPart',
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
    cancelToken: setCancelSource()
  });
}

//保存排班管理
export function addCheScheduleApi(data){
  return request({
      url: "/check/schedule/addCheSchedule",
      method: "post",
      data: data,
      showloading: true,
      loadingType: 'loadPart',
      cancelToken: setCancelSource()
  });
}

//修改排班管理
export function updateCheScheduleApi(data){
  return request({
      url: "/check/schedule/updateCheSchedule",
      method: "post",
      data: data,
      showloading: true,
      loadingType: 'loadPart',
      cancelToken: setCancelSource()
  });
}

//记录管理分页列表
export function getCheRecordPageListApi(data){
  return request({
     url: "/check/record/cheRecordPageList",
  //  url: "/record/cheRecordPageList",
    method: "get",
    params: data,
    showloading: true,
    cancelToken: setCancelSource(),
    //baseUrlType:"DUTY_HOST"
  })
}

//删除记录
export function deleteCheRecordByIdsApi(data){
  return request({
     url: "/check/record/deleteCheRecordByIds",
    //url: "/record/deleteCheRecordByIds",
    method: "post",
    data: data,
    showloading: true,
    cancelToken: setCancelSource(),
  })
}

//查询记录模板
export function getCheRecordTempPageListApi(data){
  return request({
     url: "/check/template/cheRecordTemplatePageList",
    // url: "/template/cheRecordTemplatePageList",
    method: "get",
    params: data,
    showloading: true,
    cancelToken: setCancelSource(),
    //baseUrlType:"DUTY_HOST"
  })
}

//保存记录
export function addCheRecordApi(data){
  return request({
     url: "/check/record/addCheRecord",
  //  url: "/record/addCheRecord",
    method: "post",
    data: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource(),
    //baseUrlType:"DUTY_HOST"
  });
}

//查询记录详情
export function getCheRecordDetailApi(data) {
  return request({
     url: "/check/record/cheRecordDetail",
    // url: "/record/cheRecordDetail",
    method: "get",
    params: data,
    showloading: true,
    cancelToken: setCancelSource(),
    //baseUrlType:"DUTY_HOST"
  })
}

//查询处理等级
export function getCheProcessTypeTreeApi() {
  return request({
    url: "/check/cheProcessType/tree",
    // url: "/cheProcessType/tree",
    method: "get",
    showloading: true,
    cancelToken: setCancelSource(),
    //baseUrlType:"DUTY_HOST"
  })
}

//根据处理等级获取处理情况
export function getProcessTypeApi(processTypeId) {
  return request({
    url: "/check/cheProcess/list/" + processTypeId,
    // url: "/cheProcess/list/" + processTypeId,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource(),
    //baseUrlType:"DUTY_HOST"
  })
}

//获取处理下级
export function getProcessApi(processId) {
  return request({
    url: "/check/cheProcess/child/" + processId,
    // url: "/cheProcess/child/" + processId,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource(),
    //baseUrlType:"DUTY_HOST"
  })
}

//根据处理等级获取处理情况
export function getProcessTypeTreeApi(processTypeId) {
  return request({
    url: "/check/cheProcess/tree/" + processTypeId,
    // url: "/cheProcess/tree/" + processTypeId,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource(),
    //baseUrlType:"DUTY_HOST"
  })
}

//获取记录模板树
export function getCheRecordTemplateTreeApi() {
  return request({
    url: "/check/template/getCheRecordTemplateTree",
    // url: "/template/getCheRecordTemplateTree",
    method: "get",
    showloading: true,
    cancelToken: setCancelSource(),
    //baseUrlType:"DUTY_HOST"
  })
}

//添加记录模板
export function saveCheRecordTemplateApi(data) {
  return request({
    url: "/check/template/saveCheRecordTemplate",
    // url: "/template/saveCheRecordTemplate",
    method: "post",
    data: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource(),
    //baseUrlType:"DUTY_HOST"
  });
}

//删除记录模板
export function deleteCheRecordTemplateByIdApi(templateById) {
  return request({
    url: "/check/template/deleteCheRecordTemplateById/" + templateById,
    // url: "/template/deleteCheRecordTemplateById/" + templateById,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource(),
    //baseUrlType:"DUTY_HOST"
  })
}

//添加处理情况分类
export function saveCheProcessTypeApi(data) {
  return request({
     url: "/check/cheProcessType/saveCheProcessType",
    // url: "/cheProcessType/saveCheProcessType",
    method: "post",
    data: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource(),
    //baseUrlType:"DUTY_HOST"
  });
}

//删除处理情况分类
export function deleteCheProcessTypeByIdApi(processTypeId) {
  return request({
    url: "/check/cheProcessType/deleteCheProcessTypeById/" + processTypeId,
    // url: "/cheProcessType/deleteCheProcessTypeById/" + processTypeId,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource(),
    //baseUrlType:"DUTY_HOST"
  })
}

//保存处理情况
export function saveProessApi(data){
  return request({
     url: "/check/cheProcess/saveProess",
    // url: "/cheProcess/saveProess",
    method: "post",
    data: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource(),
    //baseUrlType:"DUTY_HOST"
  });
}

//删除处理情况
export function deleteProcessApi(data){
  return request({
    url: "/check/cheProcess/deleteProcess",
    // url: "/cheProcess/deleteProcess",
    method: "post",
    data: data,
    showloading: true,
    cancelToken: setCancelSource(),
    //baseUrlType:"DUTY_HOST"
  })
}

//根据分类等级查询处理分类
export function getProcessTypeByLevelsApi(levels) {
  return request({
    url: "/check/cheProcessType/levels/" + levels,
    // url: "/cheProcessType/levels/" + levels,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource(),
    //baseUrlType:"DUTY_HOST"
  })
}

//查询机构信息
export function getOrganInfoApi(){
  return request({
    url: "/check/cheParameter/getOrganInfo",
  method: "get",
  showloading: true,
  cancelToken: setCancelSource(),
})
}

///流水号
//添加流水号
export function getCheParameterInfoApi(data) {
  return request({
    url: "/check/cheParameter/getCheParameterInfo",
    method: "get",
    params: data,
    showloading: true,
    cancelToken: setCancelSource(),
  })
}

//删除流水号
export function deleteCheParameterInfoApi(id) {
  return request({
     url: "/check/cheParameter/deleteCheParameterInfo/"+id,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource(),
  })
}

//分页查询流水号
export function getCheParameterInfoPageListApi(data) {
  return request({
     url: "/check/cheParameter/getCheParameterInfoPageList",
    method: "get",
    params: data,
    showloading: true,
    cancelToken: setCancelSource(),
  })
}

//修改流水号
export function updateCheParameterInfoApi(data) {
  return request({
     url: "/check/cheParameter/updateCheParameterInfo",
    method: "get",
    params: data,
    showloading: true,
    cancelToken: setCancelSource(),
  })
}

//导出excel
export function exportCheRecordApi(ids){
  return request({
    url: "/check/record/exportCheRecord",
    // url: "/record/exportCheRecord",
    method: "post",
    data: {ids},
    responseType:'blob',
    showloading: true,
    cancelToken: setCancelSource(),
    // baseUrlType:"DUTY_HOST"
  })
}

//根据记录id查询案件
export function getRecordCaseByRecordIdApi(recordId) {
  return request({
    url: "/check/record/getRecordCaseByRecordId/" + recordId,
    // url: "/record/getRecordCaseByRecordId/" + recordId,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource(),
    // baseUrlType:"DUTY_HOST"
  })
}

//生成pdf
export function createRecordDocPdfApi(doc) {
  return request({
    url: "/check/record/createRecordDocPdf",
    // url: "/record/createRecordDocPdf",
    method: "post",
    data: doc,
    showloading: true,
    cancelToken: setCancelSource(),
    // baseUrlType:"DUTY_HOST"
  })
}

//巡查执行统计
export function getChecklogStatisticsApi(data) {
  return request({
    url: "/check/checklog/statistics",
    // url: "/checklog/statistics",
    method: "post",
    data: data,
    showloading: true,
    cancelToken: setCancelSource(),
    // baseUrlType:"DUTY_HOST"
  })
}