import Vue from "vue";
let vm = new Vue();

import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";

//查询装备类型管理树
export function queryDeviceTypeTree() {
    return request({
        url: "/device/device/type/allTree",
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//查询装备类型管理
export function queryDeviceType(data) {
    return request({
        url: "/device/device/type/list",
        method: "get",
        params: data,
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//保存装备类型管理
export function saveOrUpdateDeviceType (data) {
    return request({
        url: "/device/device/type/saveOrUpdate",
        method: "post",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'CAPTCHA_HOST',
        data:  vm.$qs.stringify(data),
        cancelToken: setCancelSource()
    })
}
//根据ID查询装备类型管理
export function findDeviceTypeById (id) {
    return request({
        url: "/device/device/type/findById/" +id,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//删除装备类型管理
export function deleteDeviceTypeById(id) {
    return request({
        url: "/device/device/type/deleteById/" +id,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    })
}