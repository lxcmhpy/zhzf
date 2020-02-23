import  request  from  "@/common/js/request";
import  {setCancelSource}  from  "@/common/js/cancelToken";
import  Vue  from  "vue";

let  vm  =  new  Vue();

//获取用户下的所有机构
export  function  getLawCategoryListApi(data)  {
    return  request({
      url:  "",
      method:  "get",
      params: data,
      showloading:  true,
      cancelToken:  setCancelSource()
    });
  }

  // 获取环节列表
export function getBannerListApi(data) {
  console.log(data);
  return request({
    url: "/sys/link/queryLinkPage",
    method: "get",
    params: data,
    showloading: true,
    cancelToken: setCancelSource()
  });
}
