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

