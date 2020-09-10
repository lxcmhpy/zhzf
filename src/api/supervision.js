import  request  from  "@/common/js/request";
import  {setCancelSource}  from  "@/common/js/cancelToken";
import  Vue  from  "vue";

let  vm  =  new  Vue();
// 日志管理列表
export function getCheChecklogPageList(data){
  return request({
    url: "/check/checklog/cheChecklogPageList",
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource(),
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
    url: "/template/getCheRecordLog",
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}

//解除关联
export function delCheRecordTemplateApi(data){
  return request({
    url: "/template/delCheRecordTemplate",
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
// 现场记录
export function getRecordListApi(data){
  return request({
    url: "/check/record/cheRecordPageList",
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource(),
  })
}