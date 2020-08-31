import Vue from "vue";
let vm = new Vue();

import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";

//查询证件管理单
export function queryDeviceCertificateBill(data) {
    return request({
        url: "/device/device/certificate/bill/list",
        method: "get",
        params: data,
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//查询证件管理审批单
export function queryApproveBill(data) {
    return request({
        url: "/device/device/certificate/bill/listApprove",
        method: "get",
        params: data,
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//保存证件管理单
export function saveOrUpdateDeviceCertificateBill (data) {
    return request({
        url: "/device/device/certificate/bill/saveOrUpdate",
        method: "post",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'CAPTCHA_HOST',
        data:  vm.$qs.stringify(data),
        cancelToken: setCancelSource()
    })
}
//根据ID查询证件管理单
export function findDeviceCertificateBillById (id) {
    return request({
        url: "/device/device/certificate/bill/findById/" +id,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//删除证件管理单
export function deleteDeviceCertificateBillById(id) {
    return request({
        url: "/device/device/certificate/bill/deleteById/" +id,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    })
}
//获取证件号
export function getNo(oid) {
    return request({
        url: "/device/device/certificate/getNo/" +oid,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    })
}
//检查证件号
export function checkNo(no,oid,billId) {
    let url =  "/device/device/certificate/checkNo/" +no+"/"+oid;
    if(billId){
        url += "/"+billId;
    }
    return request({
        url: url,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    })
}
//提交证件管理单
export function commitBill (id) {
    return request({
        url: "/device/device/certificate/bill/commit/" +id,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//查询审批列表
export function listApproveInfo (id) {
    return request({
        url: "/device/device/certificate/bill/listApproveInfo/" +id,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//审批证件管理单
export function approveBill (data) {
    return request({
        url: "/device/device/certificate/bill/audit",
        method: "post",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'CAPTCHA_HOST',
        data:  vm.$qs.stringify(data),
        cancelToken: setCancelSource()
    });
}

//获取文件流
export function getFileStreamByStorageIdApi(storageId) {
    return request({
      url: "/device/sys/file/getFileStreamByStorageId/"+storageId,
      method: "get",
      showloading: true,
      loadingType: 'loadPart',
      baseUrlType:  'CAPTCHA_HOST',
      responseType:'blob',
      cancelToken: setCancelSource()
    });
  }