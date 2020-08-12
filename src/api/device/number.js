import Vue from "vue";
let vm = new Vue();

import request from "@/common/js/request";
import {
  setCancelSource
} from "@/common/js/cancelToken";

//查询号段记录
export function queryNumberList(data) {
  return request({
    url: "/device/per/number/list",
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'DEVICE_HOST',
    cancelToken: setCancelSource()
  });
}
//保存号段记录
export function saveOrUpdateNumber(data) {
  return request({
    url: "/device/per/number/saveOrUpdate",
    method: "post",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'DEVICE_HOST',
    data: data,
    cancelToken: setCancelSource()
  })
}
//根据ID查询号段记录
export function findNumberById(id) {
  return request({
    url: "/device/per/number/findById/" + id,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'DEVICE_HOST',
    cancelToken: setCancelSource()
  });
}
//删除号段记录
export function deleteNumberById(id) {
  return request({
    url: "/device/per/number/deleteById/" + id,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'DEVICE_HOST',
    cancelToken: setCancelSource()
  })
}

//删除号段记录
export function deleteNumberByIds(data) {
  return request({
    url: "/device/per/number/deletebyids",
    method: "post",
    showloading: true,
    loadingType: 'loadPart',
    data: data,
    baseUrlType: 'DEVICE_HOST',
    cancelToken: setCancelSource()
  })
}
