 import Vue from "vue";;
let vm = new Vue();
//let vm = Vue;

import request from "@/common/js/request";
import {
    setCancelSource
} from "@/common/js/cancelToken";

//查询评议发起设置
export function findPykhBatchConfigByOrganId(organId) {
    return request({
        url: "/pykh/batch/config/findByOrganId/" + organId,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//保存评议发起设置
export function saveOrUpdatePykhBatchConfig(data) {
    return request({
        url: "/pykh/batch/config/saveOrUpdate",
        method: "post",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        data: vm.$qs.stringify(data),
        cancelToken: setCancelSource()
    })
}
//根据ID查询评议发起设置
export function findPykhBatchConfigById(id) {
    return request({
        url: "/pykh/batch/config/findById/" + id,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
