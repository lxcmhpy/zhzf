import Vue from "vue";
let vm = new Vue();

import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";

//查询装备库存管理单
export function queryDeviceBill(data) {
    return request({
        url: "/device/bill/list",
        method: "get",
        params: data,
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'DEVICE_HOST',
        cancelToken: setCancelSource()
    });
}
//保存装备库存管理单
export function saveOrUpdateDeviceBill (data) {
    return request({
        url: "/device/bill/saveOrUpdate",
        method: "post",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'DEVICE_HOST',
        data:  vm.$qs.stringify(data),
        cancelToken: setCancelSource()
    })
}
//根据ID查询装备库存管理单
export function findDeviceBillById (id) {
    return request({
        url: "/device/bill/findById/" +id,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'DEVICE_HOST',
        cancelToken: setCancelSource()
    });
}
//删除装备库存管理单
export function deleteDeviceBillById(id) {
    return request({
        url: "/device/bill/deleteById/" +id,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:'DEVICE_HOST',
        cancelToken: setCancelSource()
    })
}