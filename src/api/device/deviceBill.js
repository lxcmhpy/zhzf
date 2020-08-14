import Vue from "vue";
let vm = new Vue();

import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";

//查询装备库存管理单
export function queryDeviceBill(data) {
    return request({
        url: "/device/device/bill/list",
        method: "get",
        params: data,
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//保存装备库存管理单
export function saveOrUpdateDeviceBill (data) {
    return request({
        url: "/device/device/bill/saveOrUpdate",
        method: "post",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'CAPTCHA_HOST',
        data:  data,
        cancelToken: setCancelSource()
    })
}
//根据ID查询装备库存管理单
export function findDeviceBillById (id) {
    return request({
        url: "/device/device/bill/findById/" +id,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//删除装备库存管理单
export function deleteDeviceBillById(id) {
    return request({
        url: "/device/device/bill/deleteById/" +id,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    })
}
//更新单据状态
export function updateStatus(id,status) {
    return request({
        url: "/device/device/bill/updateStatus/" +id+"/"+status,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    })
}
//根据条件获取装备列表
export function listDevice(data) {
    return request({
        url: "/device/device/bill/listDevice",
        method: "get",
        params: data,
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    })
}
