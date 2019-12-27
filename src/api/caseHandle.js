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



// 临时接口-获取id用
export function getTemporaryApi(organId) {
  let params = {
    current: 1,
    size: 100,
  };
  return request({
    url: "/doc/data/findByCondition",
    method: "get",
    params: params,
    showloading: true,
    cancelToken: setCancelSource()
  });
}

