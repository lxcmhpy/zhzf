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
    showloading: true,
    loadingType: 'loadPart',
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
    showloading: true,
    loadingType: 'loadPart',
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
    showloading: true,
    loadingType: 'loadPart',
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
    showloading: true,
    loadingType: 'loadPart',
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
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'FXYP_HOST',
    cancelToken: setCancelSource()
  });
}

export function featureApi(data) {
  return request({
    url: "/case/people/" + data.year + '/' + data.year2,
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
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
    showloading: true,
    loadingType: 'loadPart',
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
    showloading: true,
    loadingType: 'loadPart',
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
//案发数量同比分析
export function numberYTYApi(data) {
  return  request({
    url:  "/annual/analysis/quantityYOY/"+data.year,
    method:  "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType:  'FXYP_HOST',
    cancelToken:  setCancelSource()
  });
}
//案件罚没款同比统计
export function proportionYTYApi(data) {
  return  request({
    url:  "/annual/analysis/moneyYOY/"+data.year,
    method:  "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType:  'FXYP_HOST',
    cancelToken:  setCancelSource()
  });
}
export function complaintApi(data) {
  return  request({
    url:  "/judge/analysis/countByHour/"+data.startTime+'/'+data.endTime,
    method:  "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType:  'FXYP_HOST',
    cancelToken:  setCancelSource()
  });
}
//空间关联分析
export function spaceApi(data) {
  return  request({
    url:  "/correlation/analysis/space/"+data.startTime+'/'+data.endTime,
    method:  "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType:  'FXYP_HOST',
    cancelToken:  setCancelSource()
  });
}
// 电子化办案分析
export function dzhbafx(data) {
  return  request({
    url: "/electronization/electronization",
    method:  "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType:  'FXYP_HOST',
    cancelToken:  setCancelSource(),
  });
}
//时间关联分析  年
export function sjglfx(data) {
  return  request({
    url: "/case/numDay",
    params: data,
    method:  "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType:  'FXYP_HOST',
    cancelToken:  setCancelSource(),
  });
}
//时间关联分析  月
export function sjglfxmonth(data) {
  return  request({
    url: "/case/numDay",
    params: data,
    method:  "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType:  'FXYP_HOST',
    cancelToken:  setCancelSource(),
  });
}
//时间关联分析  日
export function sjglfxday(data) {
  return  request({
    url: "/case/numDay",
    params: data,
    method:  "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType:  'FXYP_HOST',
    cancelToken:  setCancelSource(),
  });
}
//时间关联分析  时
export function sjglfxhours(data) {
  return  request({
    url: "/case/numDay",
    params: data,
    method:  "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType:  'FXYP_HOST',
    cancelToken:  setCancelSource(),
  });
}
// 执法门类
export function zfml() {
  return  request({
    url: "/organdzfml/zfml",
    method:  "get",
    showloading: false,
    // loadingType: 'loadPart',
    baseUrlType:  'FXYP_HOST',
    cancelToken:  setCancelSource(),
  });
}
// 案件当事人特征分析
export function casepPeople({year1, year2}) {
  return  request({
    url: `/case/people/${year1}/${year2}`,
    method:  "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType:  'FXYP_HOST',
    cancelToken:  setCancelSource(),
  });
}
// 法律法规分析研判
export function flfgfxyp({ startTime, endTime }) {
  return  request({
    url: `/judge/analysis/list/${startTime}/${endTime}`,
    method:  "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType:  'FXYP_HOST',
    cancelToken:  setCancelSource(),
  });
}
// 监管治理分析研判
export function jgzlfxyp({ startTime, endTime }) {
  return  request({
    url: `/judge/analysis/JGZLlist/${startTime}/${endTime}`,
    method:  "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType:  'FXYP_HOST',
    cancelToken:  setCancelSource(),
  });
}
