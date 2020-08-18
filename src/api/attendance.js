import  request  from  "@/common/js/request";
import  {setCancelSource}  from  "@/common/js/cancelToken";
import  Vue  from  "vue";

let  vm  =  new  Vue();

// 人员管理--日常考勤

/********************** 考勤信息管理 ***********************/
// 考勤信息列表
export function getAttendanceList(data){
  return request({
    url: "/attendance/statisticalList",
    method: "get",
    baseUrlType: 'ATTENDANCE',
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
