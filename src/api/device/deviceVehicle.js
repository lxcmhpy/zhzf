import Vue from "vue";
let vm = new Vue();

import request from "@/common/js/request";
import {
  setCancelSource
} from "@/common/js/cancelToken";

//查询执法车辆信息列表
export function queryDeviceVehicle(data) {
  return request({
    url: "/device/info/list",
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'DEVICE_HOST',
    cancelToken: setCancelSource()
  });
}

//保存车辆信息
export function saveOrUpdateDeviceVehicle(data) {
  debugger
  let a = vm.$qs.stringify(data);
  return request({
    url: "/device/info/save",
    method: "post",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'DEVICE_HOST',
    data: data,
    cancelToken: setCancelSource()
  })
}
//根据ID查询装备类型管理
export function findDeviceVehicleById(data) {
  return request({
    url: "/device/info/findbyid",
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'DEVICE_HOST',
    data: vm.$qs.stringify(data),
    cancelToken: setCancelSource()
  });
}

//删除装备类型管理
export function findplate(data) {
  return request({
    url: "/device/info/findplate",
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'DEVICE_HOST',
    data: data,
    cancelToken: setCancelSource()
  })
}

//保存年检信息
export function saveAnnual(data) {
  return request({
    url: "/device/info/saveAnnual",
    method: "post",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'DEVICE_HOST',
    data: data,
    cancelToken: setCancelSource()
  })
}

//根据ID查找年检信息
export function findAnnualById(data) {
  return request({
    url: "/device/info/findAnnual",
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'DEVICE_HOST',
    data: data,
    cancelToken: setCancelSource()
  });
}
