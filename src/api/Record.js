// 行政检查api
import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";
import Vue from "vue";
import iLocalStroage from '@/common/js/localStroage'

let vm = new Vue();


//添加或修改模板
export function saveOrUpdateRecordModleApi(data) {
    data = vm.$qs.stringify(data);
    return request({
        url:"/xzjc/template/mySaveOrUpdate",
        method: "post",
        data: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}


//根据ID查找模板
export function findMoleByIdApi(data) {
    return request({
        url: "/xzjc/template/getById/" + data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}
//根据UUID删除模板
export function removeMoleByIdApi(data) {
    return request({
        url: "/xzjc/template/myRemoveById/" + data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}

//根据条件分页查询通用字段
export function findCommonFieldApi(data) {
    return request({
        url: "/xzjc/commonField/queryCommonFieldPage",
        method: "get",
        params: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}

//分组查找组内所有通用字段
export function findAllCommonFieldApi() {
    return request({
        url: "/xzjc/commonField/queryAllCommonField",
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}
//通过业务领域分组所有模板
export function findAllRecordModleApi() {
    return request({
        url: "/xzjc/template/queryByDomain",
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}
//通过模板名称查询模板
export function findRecordlModleByNameApi(data) {
    return request({
        url: "/xzjc/template/findByTemplateName/"+data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}
//通过模板UUid查询模板字段
export function findRecordlModleFieldByIdeApi(data) {
    return request({
        url: "/xzjc/templateField/findByTemplateUUID/"+data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}
//根据ID查找模板
export function findRecordModleByIdApi(data) {
    return request({
        url: "/xzjc/template/getById/"+data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}
//根据条件分页查询
export function findRecordListApi(data) {
    return request({
        url: "/xzjc/templateOrder/queryTemplateOrderPage",
        method: "get",
        params: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}