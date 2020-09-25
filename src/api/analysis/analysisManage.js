import request from "@/common/js/request";
import {
  setCancelSource
} from "@/common/js/cancelToken";
import Vue from "vue";
//案发原因
export function caseReasonApi(data) {
  return request({
    url: "/crimecaseanalysis/case/" + data.year + '/' + data.year2,
    method: "get",
    params: data,
    showloading: false,
    baseUrlType: 'FXYP_HOST',
    cancelToken: setCancelSource()
  });
}
//案发地点
export function caseAddressApi(data) {
  return request({
    url: "/crimecaseanalysis/place/" + data.year + '/' + data.year2,
    method: "get",
    params: data,
    showloading: false,
    baseUrlType: 'FXYP_HOST',
    cancelToken: setCancelSource()
  });
}
//执法案件
export function lawCaseApi(data) {
  return request({
    url: "/query/statistic/case/" + data.organId,
    method: "get",
    params: data,
    showloading: false,
    baseUrlType: 'FXYP_HOST',
    cancelToken: setCancelSource()
  });
}
//执法人员
export function personEquipApi(data) {
  return request({
    url: "/query/statistic/person/" + data.organId,
    method: "get",
    params: data,
    showloading: false,
    baseUrlType: 'FXYP_HOST',
    cancelToken: setCancelSource()
  });
}
//人员关联分析
export function personApi(data) {
  return request({
    url: "/correlation/analysis/person/" + data.organId,
    method: "get",
    params: data,
    showloading: false,
    baseUrlType: 'FXYP_HOST',
    cancelToken: setCancelSource()
  });
}

export function featureApi(data) {
  return request({
    url: "/case/people/" + data.year + '/' + data.year2,
    method: "get",
    params: data,
    showloading: false,
    baseUrlType: 'FXYP_HOST',
    cancelToken: setCancelSource()
  });
}

//案件类型数据比重
export function amountProportionApi(data) {
  return request({
    url: "/annual/analysis/quantity/" + data.year,
    method: "get",
    params: data,
    showloading: false,
    baseUrlType: 'FXYP_HOST',
    cancelToken: setCancelSource()
  });
}
//案件罚没款比重分析
export function proportionApi(data) {
  return request({
    url: "/annual/analysis/money/" + data.year,
    method: "get",
    params: data,
    showloading: false,
    baseUrlType: 'FXYP_HOST',
    cancelToken: setCancelSource()
  });
}
//报表统计 
export function reportStatisticApi(data) {
  return request({
    url: "/report/case",
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'FXYP_HOST',
    cancelToken: setCancelSource()
  });
}
