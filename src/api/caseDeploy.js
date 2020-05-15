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
      showloading:  false,
      cancelToken:  setCancelSource()
    });
  }
  // 获取环节列表
export function getBannerListApi(data) {
  console.log(data);
  return request({
    url: "/case/caseTemplate/linkType/queryLinkPage",
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  });
}
// 删除环节
export function deleteBannerApi(data) {
  console.log(data);
  return request({
    url: "/case/caseTemplate/linkType/delete/"+data,
    method: "get",
    showloading: false,
    cancelToken: setCancelSource()
  });
}
// 新增或修改环节
export function addOrEditBannerApi(data) {
  console.log(vm.$qs.stringify(data));
  return request({
    url: "/case/caseTemplate/linkType/saveOrUpdateLink",
    method:  "POST",
    data:vm.$qs.stringify(data),
    showloading: true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource()
  });
}
