import  request  from  "@/common/js/request";
import  {setCancelSource}  from  "@/common/js/cancelToken";
import  Vue  from  "vue";

let  vm  =  new  Vue();

//查询所有业务领域
export  function  getLawCategoryListApi(data)  {
    return  request({
      url:  "/case/caseTemplate/lawCategory/getLawCategoryPageVo",
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

 // 获取流程列表
 export function getFlowListApi(data) {
  console.log(data);
  return request({
    url: "/case/caseTemplate/flow/queryFlowCondition",
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  });
}

//新增或修改流程
export function addOrEditFlowApi(data) {
  console.log(vm.$qs.stringify(data));
  return request({
    url: "/case/caseTemplate/flow/saveOrUpdateFlow",
    method:  "POST",
    data:vm.$qs.stringify(data),
    showloading: true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource()
  });
}

//删除流程
export function deleteFlowApi(data) {
  console.log(data);
  return request({
    url: "/case/caseTemplate/flow/delete/"+data,
    method: "get",
    showloading: false,
    cancelToken: setCancelSource()
  });
}

//根据流程Id查询已绑定环节
export function getLinkListByFlowIdApi(data) {
  console.log(data);
  return request({
    url: "/case/caseTemplate/flowBindLink/queryLinkByFlowId",
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  });
}

//根据流程Id查询已绑定环节、不分页
export function getLinkListByFlowIdNotPageApi(data) {
  console.log(data);
  return request({
    url: "/case/caseTemplate/flowBindLink/queryLinkByFlowIdNotPage",
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  });
}

//根据流程Id查询未绑定环节
export function getLinkNotInFlowApi(data) {
  console.log("参数",data);
  return request({
    url: "/case/caseTemplate/flowBindLink/queryLinkNotInFlow/"+data.flowId,
    method: "get",
    showloading: false,
    cancelToken: setCancelSource()
  });
}

//流程绑定环节
export function flowBindLinkApi(data) {
  console.log("123",data);
  return request({
    url: "/case/caseTemplate/flowBindLink/flowBindLink",
    contentType: 'application/json',
    method:  "POST",
    data:JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    showloading: true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource()
  });
}

//删除流程
export function deleteLinkApi(data) {
  console.log("要删除的数据",data);
  return request({
    url: "/case/caseTemplate/flowBindLink/delete/",
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  });
}

//绑定上一环节、绑定下一环节
export function linkBindSortApi(data) {
  console.log("绑定环节",data)
  let params = vm.$qs.stringify(data);
  return request({
    url: "/case/caseTemplate/flowBindLink/linkBindSort",
    method: "post",
    data: params,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//查询上一环节、下一环节
export function findTargetLinkApi(data) {
  console.log("查询目标环节",data);
  return request({
    url: "/case/caseTemplate/flowBindLink/querytargetLinkByFlowIdAndLinkIdAndFlag/"+data.flowId+"/"+data.linkId+"/"+data.directionFlag,
    method: "get",
    showloading: false,
    cancelToken: setCancelSource()
  });
}

//删除业务领域
//根据流程Id查询未绑定环节
export function deleteCategoryByIdApi(data) {
  console.log("参数",data);
  return request({
    url: "/case/caseTemplate/lawCategory/deleteCategoryById/"+data,
    method: "get",
    showloading: false,
    cancelToken: setCancelSource()
  });
}

//新增或修改业务领域
export function addOrEditLawCategoryApi(data) {
  console.log("111",data);
  console.log(vm.$qs.stringify(data));
  return request({
    url: "/case/caseTemplate/lawCategory/addOrUpdate",
    method:  "POST",
    data:vm.$qs.stringify(data),
    showloading: true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource()
  });
}