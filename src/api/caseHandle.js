import request from "@/js/request";
import { setCancelSource } from "@/js/cancelToken";
import Vue from "vue";
let vm = new Vue();

//获取执法门类
export function getEnforceLawTypeApi(organId) {
  return request({
    url: "/sys/lawCategory/findLawCateByOrganId/" + organId,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()
  });
}
//获取案件类型
export function getCaseTypeApi(data) {
  let params = {
    programType: data.programType,
    organId: "1",
    cateId: data.cateId
  }
  return request({
    url: "/sys/lawCategory/queryLawCateOrganType",
    method: "get",
    params: params,
    showloading: true,
    cancelToken: setCancelSource()
  });
}
//获取行业类别
export function getIndustryCategoryApi(organId) {
  return request({
    url: "/sys/lawCategory/findLawCateByOrganId/" + organId,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()
  });
}
//根据执法门类行业类别 查询违法行为
export function getIllegaActApi(organId) {
  let params = {
    strNumber: 1,
    strContent: 1,
    category: 1,
    hyType: 1,
  };
  return request({
    url: "/sys/lawCategory/findLawCateByOrganId",
    method: "get",
    params: params,
    showloading: true,
    cancelToken: setCancelSource()
  });
}


//根据案件ID获取案件信息
export function getCaseBasicInfoApi(data) { 
  return request({
    url: "/doc/caseBasicInfo/findById/"+data.id,
    method: "get",
    // params:params,
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//保存文书
export function addDocDataApi(data) { 
  console.log(data);
  return request({
    url: "/doc/data/create",
    method: "post",
    data:vm.$qs.stringify(data),
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//根据案件ID和文书模板ID查找文书信息
export function getDocDataByCaseIdAndDocIdApi(data) { 
  console.log(data);
  return request({
    url: "/doc/data/findByCaseIdAndDocId",
    method: "get",
    // data:vm.$qs.stringify(data),
    params:data,
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//根据案件ID和表单模板ID查找表单信息
export function getFormDataByCaseIdAndFormIdApi(data) { 
  console.log(data);
  return request({
    url: "/doc/linkData/findByCaseIdAndLinkTypeId/"+data.casebasicInfoId+"/"+data.caseLinktypeId,
    // url: "/doc/linkData/findByCaseIdAndLinkTypeId",
    method: "get",
    // data:vm.$qs.stringify(data),
    // params:data,
    showloading: true,
    cancelToken: setCancelSource()
  });
}


//保存或修改表单
export function addFormDataApi(data) { 
  console.log(data);
  return request({
    url: "/doc/linkData/saveOrUpdateLink",
    method: "post",
    data:vm.$qs.stringify(data),
    showloading: true,
    cancelToken: setCancelSource()
  });
}