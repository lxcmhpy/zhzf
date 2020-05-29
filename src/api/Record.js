// 行政检查api
import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";
import Vue from "vue";
import iLocalStroage from '@/common/js/localStroage'

let vm = new Vue();


// let XZJC_HOST = iLocalStroage.gets('CURRENT_BASE_URL').XZJC_HOST
let XZJC_HOST = 'http://172.16.169.37:8099/xzjc/'


//添加或修改模板
export function saveOrUpdateRecordModleApi(data) {
    data = vm.$qs.stringify(data);
    return request({
        url: XZJC_HOST + "template/mySaveOrUpdate",
        method: "post",
        data: data,
        showloading: true,
        loadingType: 'loadPart',
        cancelToken: setCancelSource()
    });
}


//根据ID查找模板
export function findMoleByIdApi(data) {
    return request({
        url: XZJC_HOST + "template/getById/" + data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        cancelToken: setCancelSource()
    });
}
//根据ID查找模板
export function removeMoleByIdApi(data) {
    return request({
        url: XZJC_HOST + "template/removeById/" + data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        cancelToken: setCancelSource()
    });
}

//根据条件分页查询通用字段
export function findCommonFieldApi(data) {
    return request({
        url: XZJC_HOST + "commonField/queryCommonFieldPage",
        method: "get",
        params: data,
        showloading: true,
        loadingType: 'loadPart',
        cancelToken: setCancelSource()
    });
}

//分组查找组内所有通用字段
export function findAllCommonFieldApi() {
    return request({
        url: XZJC_HOST + "commonField/queryAllCommonField",
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        cancelToken: setCancelSource()
    });
}
