import Vue from "vue";

let vm = new Vue();


import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";

 // 加载评议考核配置列表
 export function findPykhConfigByPage (data) {
    return request({
        url: "/pykh/pykhToConfigure/findPykhConfigByPage",
        method: "get",
        showloading: false,
        baseUrlType:'CAPTCHA_HOST',
        params: data,
        cancelToken: setCancelSource()
      })
  }

// 添加考核配置
  export function addOrUpdatePykhConfig (data) {
    return request({
        url: "/pykh/pykhToConfigure/addOrUpdatePykhConfig",
        method: "post",
        showloading: false,
        baseUrlType:'CAPTCHA_HOST',
        data: vm.$qs.stringify(data),
        cancelToken: setCancelSource()
      })
  }
// 删除考核配置
export function deletePykhConfigById (data) {
    return request({
        url: "/pykh/pykhToConfigure/deletePykhConfigById/" +data,
        method: "get",
        showloading: false,
        baseUrlType:'CAPTCHA_HOST',
        cancelToken: setCancelSource()
      })
  }
// 查询考核指标项列表
export function findPykhMetricsByPage (data) {
    return request({
        url: "/pykh/pykhToConfigure/findPykhMetricsByPage",
        method: "get",
        showloading: false,
        params: data,
        baseUrlType:'CAPTCHA_HOST',
        cancelToken: setCancelSource()
      })
}
// 查询考核细则
export function findPykhZpByPage (data) {
    return request({
        url: "/pykh/pykhToConfigure/findPykhZpByPage",
        method: "get",
        showloading: false,
        params: data,
        baseUrlType:'CAPTCHA_HOST',
        cancelToken: setCancelSource()
      })
}
// 添加修改考核指标
export function addOrUpdatePykhMetrics (data) {
    return request({
        url: "/pykh/pykhToConfigure/addOrUpdatePykhMetrics",
        method: "post",
        showloading: false,
        data: vm.$qs.stringify(data),
        baseUrlType:'CAPTCHA_HOST',
        cancelToken: setCancelSource()
      })
}
// 删除考核指标
export function deletePykhMetricsById (data) {
    return request({
        url: "/pykh/pykhToConfigure/deletePykhMetricsById/" +data,
        method: "get",
        showloading: false,
        baseUrlType:'CAPTCHA_HOST',
        cancelToken: setCancelSource()
      })
  }

