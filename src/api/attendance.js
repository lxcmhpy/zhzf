import  request  from  "@/common/js/request";
import  {setCancelSource}  from  "@/common/js/cancelToken";
import  Vue  from  "vue";

let  vm  =  new  Vue();

// 人员管理--日常考勤

/********************** 考勤信息管理 ***********************/
// 考勤统计列表
export function getStatisticalList(data){
  return request({
    url: "/person/attendance/statisticalList",
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
};
// 考勤统计列表
export function getAttendanceList(data){
  return request({
    url: "/person/attendance/list",
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
};
// 考勤信息修改
export function editAttendance(data){
  return request({
    url: "/person/attendance/edit",
    method: "POST",
    data: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
};
// 下载考勤模板
export function downLoadAttendanceMode(){
  return request({
      url: '/person/attendance/exportMode',
      method:  "get",
      showloading: false,
      responseType:'blob',
      cancelToken:  setCancelSource()
  })
};
// 批量导入考勤
export function batchImportAttendance(data){
  return request({
      url: '/person/attendance/import',
      method:  "POST",
      data: data,
      contentType: 'multipart/form-data;',
      showloading: false,
      cancelToken:  setCancelSource()
  })
};
// 扣分管理查询
export function getDeductMarks(data){
  return request({
    url: "/person/attendance/deductMarks",
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
};
// 扣分管理修改
export function editDeductMarks(data){
  return request({
    url: "/person/attendance/deductMarksEdit",
    method: "POST",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
};