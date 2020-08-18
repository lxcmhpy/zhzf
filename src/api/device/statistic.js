import Vue from "vue";
let vm = new Vue();

import request from "@/common/js/request";
import {
  setCancelSource
} from "@/common/js/cancelToken";

//根据机构ID查询装备使用概况
export function countDevice(organId) {
  return request({
    url: "/device/device/statistic/countDevice/" + organId,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}

//根据机构ID查询装备分类统计
export function countDeviceType(organId) {
  return request({
    url: "/device/device/statistic/countDeviceType/" + organId,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}

//根据机构ID查询使用证状态
export function countUsePer(organId) {
  return request({
    url: "/device/device/statistic/countUsePer/" + organId,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}

//根据机构ID查询车辆使用概况
export function countVehicle(organId) {
  return request({
    url: "/device/device/statistic/countVehicle/" + organId,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}
