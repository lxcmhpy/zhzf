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
    cancelToken: setCancelSource(),
    baseUrlType:"XC"
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
      url: "/check/schedule/addCheSchedule",
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
      url: "/check/schedule/updateCheSchedule",
      method: "post",
      data: data,
      showloading: true,
      loadingType: 'loadPart',
      baseUrlType: 'DUTY_HOST',
      cancelToken: setCancelSource()
  });
}