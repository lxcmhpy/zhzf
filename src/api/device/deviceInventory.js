import Vue from "vue";
let vm = new Vue();

import request from "@/common/js/request";
import {
  setCancelSource
} from "@/common/js/cancelToken";

//查询库存管理
export function queryDeviceInventory(data) {
  return request({
    url: "/device/device/inventory/list",
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}
//保存库存管理
export function saveOrUpdateDeviceInventory(data) {
  return request({
    url: "/device/device/inventory/saveOrUpdate",
    method: "post",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    data: vm.$qs.stringify(data),
    cancelToken: setCancelSource()
  })
}
//根据ID查询库存管理
export function findDeviceInventoryById(id) {
  return request({
    url: "/device/device/inventory/findById/" + id,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}
//根据ID查询库存管理
export function findByIdAndLog(id) {
  return request({
    url: "/device/device/inventory/findByIdAndLog/" + id,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}
//删除库存管理
export function deleteDeviceInventoryById(id) {
  return request({
    url: "/device/device/inventory/deleteById/" + id,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  })
}
//复制库存管理
export function copyData(data) {
  return request({
    url: "/device/device/inventory/copyData",
    method: "post",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    data: data,
    cancelToken: setCancelSource()
  })
}
//根据条件查询装备列表
export function listDevice(data) {
  return request({
    url: "/device/device/inventory/listDevice",
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}
