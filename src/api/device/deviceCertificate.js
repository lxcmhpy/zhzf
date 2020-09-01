import Vue from "vue";
let vm = new Vue();

import request from "@/common/js/request";
import {
  setCancelSource
} from "@/common/js/cancelToken";

//查询证件列表
export function queryCertificateList(data) {
  return request({
    url: "/device/device/use/per/list",
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}
//保存证件信息
export function saveOrUpdateCertificate(data) {
  return request({
    url: "/device/device/use/per/saveOrUpdate",
    method: "post",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    data: vm.$qs.stringify(data),
    cancelToken: setCancelSource()
  })
}
//根据ID查询证件信息
export function findCertificateById(id) {
  return request({
    url: "/device/device/use/per/findById/" + id,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}

//根据ID查询证件信息及历史信息
export function findInfoAndHistory(id) {
  return request({
    url: "/device/device/use/per/findInfoAndHistory/" + id,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}
//打印
export function print(id) {
    return request({
      url: "/device/device/use/per/print/" + id,
      method: "get",
      showloading: true,
      loadingType: 'loadPart',
      baseUrlType: 'CAPTCHA_HOST',
      cancelToken: setCancelSource()
    });
  }