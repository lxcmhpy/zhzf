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
export function getCaseBasicInfoApi(id) { 
  return request({
    url: "/doc/caseBasicInfo/findById/"+"2c902ae66ae2acc4016ae376f6f1007f",
    method: "get",
    // params:params,
    showloading: true,
    cancelToken: setCancelSource()
  });
}

