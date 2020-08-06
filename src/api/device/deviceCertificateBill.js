import Vue from "vue";
let vm = new Vue();

import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";

//查询证件管理单
export function queryDeviceCertificateBill(data) {
    return request({
        url: "/device/certificate/bill/list",
        method: "get",
        params: data,
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'DEVICE_HOST',
        cancelToken: setCancelSource()
    });
}
//保存证件管理单
export function saveOrUpdateDeviceCertificateBill (data) {
    return request({
        url: "/device/certificate/bill/saveOrUpdate",
        method: "post",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'DEVICE_HOST',
        data:  vm.$qs.stringify(data),
        cancelToken: setCancelSource()
    })
}
//根据ID查询证件管理单
export function findDeviceCertificateBillById (id) {
    return request({
        url: "/device/certificate/bill/findById/" +id,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'DEVICE_HOST',
        cancelToken: setCancelSource()
    });
}
//删除证件管理单
export function deleteDeviceCertificateBillById(id) {
    return request({
        url: "/device/certificate/bill/deleteById/" +id,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:'DEVICE_HOST',
        cancelToken: setCancelSource()
    })
}