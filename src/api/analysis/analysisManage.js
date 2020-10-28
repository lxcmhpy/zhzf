import request from "@/common/js/request";
import {
  setCancelSource
} from "@/common/js/cancelToken";
import Vue from "vue";
//案发原因
export function caseReasonApi(data) {
  return request({
    url: "/sjfx/crimecaseanalysis/case/" + data.year + '/' + data.year2,
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}
//案发地点
export function caseAddressApi(data) {
  return request({
    url: "/sjfx/crimecaseanalysis/place/" + data.year + '/' + data.year2,
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}
//执法案件
export function lawCaseApi(data) {
  return request({
    url: "/sjfx/query/statistic/case/" + data.organId,
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}
//执法人员
export function personEquipApi(data) {
  return request({
    url: "/sjfx/query/statistic/person/" + data.organId,
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}
//人员关联分析
export function personApi(data) {
  return request({
    url: "/sjfx/correlation/analysis/person/" + data.organId,
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}

export function featureApi(data) {
  return request({
    url: "/sjfx/case/people/" + data.year + '/' + data.year2,
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}

//案件类型数据比重
export function amountProportionApi(data) {
  return request({
    url: "/sjfx/annual/analysis/quantity/" + data.year,
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}
//案件罚没款比重分析
export function proportionApi(data) {
  return request({
    url: "/sjfx/annual/analysis/money/" + data.year,
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}
//报表统计
export function reportStatisticApi(data) {
  return request({
    url: "/sjfx/report/case",
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}
//案发数量同比分析
export function numberYTYApi(data) {
  return request({
    url: "/sjfx/annual/analysis/quantityYOY/" + data.year,
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}
//案件罚没款同比统计
export function proportionYTYApi(data) {
  return request({
    url: "/sjfx/annual/analysis/moneyYOY/" + data.year,
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}
export function complaintApi(data) {
  return request({
    url: "/sjfx/judge/analysis/countByHour/" + data.startTime + '/' + data.endTime,
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}
//空间关联分析
export function spaceApi(data) {
  return request({
    url: "/sjfx/correlation/analysis/space/" + data.startTime + '/' + data.endTime,
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}
// 电子化办案分析
export function dzhbafx(data) {
  return request({
    url: "/sjfx/electronization/electronization",
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource(),
  });
}
//时间关联分析  年
export function sjglfx(data) {
  return request({
    url: "/sjfx/case/numYear",
    params: data,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource(),
  });
}
//时间关联分析  月
export function sjglfxmonth(data) {
  return request({
    url: "/sjfx/case/numMonth",
    params: data,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource(),
  });
}
//时间关联分析  日
export function sjglfxday(data) {
  return request({
    url: "/sjfx/case/numDay",
    params: data,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource(),
  });
}
//时间关联分析  时
export function sjglfxhours(data) {
  return request({
    url: "/sjfx/case/numHours",
    params: data,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource(),
  });
}
// 执法门类
export function zfml() {
  return request({
    url: "/sjfx/organdzfml/zfml",
    method: "get",
    showloading: false,
    // loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource(),
  });
}
// 案件当事人特征分析
export function casepPeople({
  year1,
  year2
}) {
  return request({
    url: `/sjfx/case/people/${year1}/${year2}`,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource(),
  });
}
// 法律法规分析研判
export function flfgfxyp({
  startTime,
  endTime
}) {
  return request({
    url: `/sjfx/judge/analysis/list/${startTime}/${endTime}`,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource(),
  });
}
// 监管治理分析研判
export function jgzlfxyp({
  startTime,
  endTime
}) {
  return request({
    url: `/sjfx/judge/analysis/JGZLlist/${startTime}/${endTime}`,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource(),
  });
}

//生成pdf
export function createPDF(id) {
    return request({
      url: "/sjfx/export/pdf/" + id,
      method: "GET",
      showloading: true,
      loadingType: 'loadPart',
      cancelToken: setCancelSource(),
    });
  }

//根据CaseId查询图片列表
export function findImageByCaseId(id) {
    return request({
      url: "/sjfx/sys/file/findImageByCaseId/" + id,
      method: "GET",
      showloading: true,
      loadingType: 'loadPart',
      cancelToken: setCancelSource(),
    });
  }

//获取文件流
export function getFileStreamByStorageId(storageId) {
    return request({
      url: "/sjfx/sys/file/getFileStreamByStorageId/"+storageId,
      method: "get",
      showloading: true,
      loadingType: 'loadPart',
      baseUrlType:  'CAPTCHA_HOST',
      responseType:'blob',
      cancelToken: setCancelSource()
    });
  }
