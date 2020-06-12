import Vue from "vue";

let vm = new Vue();


import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";

// 根据条件分页查询考核发起信息
export function findPykhBatchByPage (data) {
  return request({
    url: "/pykh/pykhBatch/findPykhBatchByPage",
    method: "get",
    showloading: false,
    baseUrlType:'CAPTCHA_HOST',
    params: data,
    cancelToken: setCancelSource()
  })
}

//根据条件查询考核配置实体
export function findListVoByConfig (data) {
  return request({
    url: "/pykh/pykhToConfigure/findListVoByConfig",
    method: "get",
    showloading: false,
    baseUrlType:'CAPTCHA_HOST',
    params: data,
    cancelToken: setCancelSource()
  })
}

//添加/修改考核发起信息
export function addOrUpdatePykhBatch (data) {
  return request({
    url: "/pykh/pykhBatch/addOrUpdatePykhBatch",
    method: "post",
    showloading: false,
    baseUrlType: 'CAPTCHA_HOST',
    data: vm.$qs.stringify(data),
    cancelToken: setCancelSource()
  })
}
export function deletePykhBatchById (data) {
  return request({
    url: "/pykh/pykhBatch/deletePykhBatchById/"+data,
    method: "get",
    showloading: false,
    baseUrlType: 'CAPTCHA_HOST',
    params: null,
    cancelToken: setCancelSource()
  })
}
