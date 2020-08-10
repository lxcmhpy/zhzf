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
export function findDeviceVehicleById(id) {
  return request({
    url: "/device/info/findbyid/" + id,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'DEVICE_HOST',
    cancelToken: setCancelSource()
  });
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

//根据车辆ID查找所有年检信息
export function findAnnualByVehicleId(id) {
  return request({
    url: "/device/info/findAnnual/" + id,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'DEVICE_HOST',
    cancelToken: setCancelSource()
  });
}

//根据年检ID删除年检信息
export function deleteAnnualById(id) {
  return request({
    url: "/device/info/deleteplate/" + id,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'DEVICE_HOST',
    cancelToken: setCancelSource()
  });
}

//根据年检ID查找年检信息
export function findAnnualById(id) {
  return request({
    url: "/device/info/findinspection/" + id,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'DEVICE_HOST',
    cancelToken: setCancelSource()
  });
}

//车牌号是否存在
export function findplate(plateNumber) {
  return request({
    url: "/device/info/findplate/" + plateNumber,
    method: "get",
    showloading: false,
    loadingType: 'loadPart',
    baseUrlType: 'DEVICE_HOST',
    cancelToken: setCancelSource()
  });
}

//批量删除车辆信息
export function deleteVehicles(data) {
  return request({
    url: "/device/info/deletebyid",
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    data: data,
    baseUrlType: 'DEVICE_HOST',
    cancelToken: setCancelSource()
  });
}
