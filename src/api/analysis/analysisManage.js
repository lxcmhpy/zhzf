import  request  from  "@/common/js/request";
import  {setCancelSource}  from  "@/common/js/cancelToken";
import  Vue  from  "vue";
//分析研判
export function caseReasonApi(data) {
  return  request({
    url:  "/crimecaseanalysis/case/"+data.year+'/'+data.year2,
    method:  "get",
    params: data,
    showloading: false,
    baseUrlType:  'FXYP_HOST',
    cancelToken:  setCancelSource()
  });
}
//执法案件

export function lawCaseApi(data) {
  return  request({
    url:  "/query/statistic/case/"+data.organId,
    method:  "get",
    params: data,
    showloading: false,
    baseUrlType:  'FXYP_HOST',
    cancelToken:  setCancelSource()
  });
}
export function featureApi(data) {
  return  request({
    url:  "/case/people/"+data.year+'/'+data.year2,
    method:  "get",
    params: data,
    showloading: false,
    baseUrlType:  'FXYP_HOST',
    cancelToken:  setCancelSource()
  });
}
