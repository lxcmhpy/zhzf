import  request  from  "@/common/js/request";
import  {setCancelSource}  from  "@/common/js/cancelToken";
import  Vue  from  "vue";

let  vm  =  new  Vue();

//查询所有业务领域、分页
export  function  getLawCategoryPageApi(data)  {
    return  request({
      url:  "/case/caseTemplate/lawCategory/getLawCategoryPageVo",
      method:  "get",
      params: data,
      showloading:  false,
      cancelToken:  setCancelSource()
    });
}
//查询所有业务领域、不分页
export  function  getLawCategoryNotPageApi(data)  {
  return  request({
    url:  "/case/caseTemplate/lawCategory/getLawCategoryListVo",
    method:  "get",
    params: data,
    showloading:  false,
    cancelToken:  setCancelSource()
  });
}
//查询行业类别、不分页
export  function  getLawCategoryListApi(data)  {
  return  request({
    url:  "/case/caseTemplate/lawCategory/getLawCategoryListVo",
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

//查询机构已经绑定的执法门类
export function queryLawCateByOrganIdApi(data) {
  console.log("机构Id",data);
  return request({
    url: "/case/caseTemplate/LawCateConfiguration/findLawCateByOrganId/"+data.organId,
    method: "get",
    showloading: false,
    cancelToken: setCancelSource()
  });
}

//查询机构未绑定的执法门类
export function queryNotBindLawCateByOrganIdApi(data) {
  console.log("机构Id",data);
  return request({
    url: "/case/caseTemplate/LawCateConfiguration/findNotBindLawCateByOrganId/"+data.organId,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  });
}

//机构绑定业务领域
export function organBindLawCateApi(data) {
  console.log("机构绑定业务领域",data)
  let params = vm.$qs.stringify(data);
  return request({
    url: "/case/caseTemplate/LawCateConfiguration/organBindLawCate",
    method: "post",
    data: params,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//查询案件类型
export function queryCaseTypeApi(data) {
  console.log("案件类型参数",data);
  return request({
    url: "/case/caseTemplate/caseType/listNotPage",
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  });
}

//机构业务领域绑定案件类型
export function organLawCateBindCaseTypeApi(data) {
  console.log("机构业务领域案件类型",data)
  let params = vm.$qs.stringify(data);
  return request({
    url: "/case/caseTemplate/LawCateConfiguration/organCateBindCaseType",
    method: "post",
    data: params,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//查询机构业务领域已经绑定的案件类型
export function findBindTypeByOrganCateIdApi(data) {
  console.log("机构业务领域Id",data);
  return request({
    url: "/case/caseTemplate/LawCateConfiguration/findBindTypeByOrganCateId/"+data.organCateId,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  });
}

//删除机构绑定业务领域
export function deleteOrganCategoryByIdApi(data) {
  console.log("参数",data);
  return request({
    url: "/case/caseTemplate/LawCateConfiguration/deleteLawCateOrganById/"+data,
    method: "get",
    showloading: false,
    cancelToken: setCancelSource()
  });
}

//查询执法门类绑定的机构
export function queryOrganByCateApi(data) {
  console.log("cateId",data);
  return request({
    url: "/case/caseTemplate/LawCateConfiguration/findOrganByCateId/"+data,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  });
}
