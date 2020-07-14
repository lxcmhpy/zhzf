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
        url: "/xzjc/template/myRemoveById",
        method: "get",
        params: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}
//根据userId和templateId删除收藏关系表数据
export function removeMoleCollectByIdApi(data) {
    return request({
        url: "/xzjc/collect/unbind",
        method: "get",
        params: data,
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
//分组查找组内所有通用字段组
export function findAllCommonGroupFieldApi() {
    return request({
        url: "/xzjc/commonField/queryAllCommonField",
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}
//查询所有候选字段
export function findAllCandidateFieldApi() {
    return request({
        url: "/xzjc/candidateField/queryAllCandidateField",
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}
//通过业务领域分组所有模板
// export function findAllRecordModleApi() {
//     return request({
//         url: "/xzjc/template/queryByDomain",
//         method: "get",
//         showloading: true,
//         loadingType: 'loadPart',
//         baseUrlType:  'XZJC_HOST',
//         cancelToken: setCancelSource()
//     });
// }
//通过机构ID(必填),人员ID(选填),业务领域(选填)查询模板
export function findRecordModleByPersonApi(data) {
    return request({
        url: "/xzjc/template/pcQueryByOrganIdAndUserId",
        method: "get",
        params: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}
//查询登录人收藏的模板
export function findUserCollectTemplateApi(data) {
    return request({
        url: "/xzjc/template/findUserCollectTemplate/"+data,
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
//根据模板UUID查找模板修改时间
export function findRecordModleTimeByIdApi(data) {
    return request({
        url: "/xzjc/template/getTemplateUpdateTime/"+data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}
//通过模板名称查询模板
export function findRecordModleByNameIdApi(data) {
    return request({
        url: "/xzjc/template/findByTemplateName",
        method: "get",
        params: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}
//查询所有模板名称
export function findAllModleNameApi(data) {
    return request({
        url: "/xzjc/template/queryAlltemplateName/"+data,
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
        url: "/xzjc/templateOrder/pcQueryTemplateOrderPage",
        method: "get",
        params: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}

//添加或修改记录
export function saveOrUpdateRecordApi(data) {
    data = vm.$qs.stringify(data);
    return request({
        url:"/xzjc/templateOrder/mySaveOrUpdate",
        method: "post",
        data: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}
//根据UUID删除记录
export function removeRecordByIdApi(data) {
    return request({
        url: "/xzjc/templateOrder/myRemoveById/" + data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}
//根据UUID查找订单记录-之前
export function findRecordByIdApi(data) {
    return request({
        url: "/xzjc/templateOrder/getById/" + data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}
//根据UUID查找订单记录
export function findMyRecordByIdApi(data) {
    return request({
        url: "/xzjc/templateOrder/myGetById/" + data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}
//获取文书名称列表
export function getDocumentNameList() {
    return request({
        url: "/xzjc/documentName/getDocumentNameList",
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}
//查找当前记录相关文书
export function getDocListById(data) {
    return request({
        url: "/xzjc/document/getDocListById/"+data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}
//添加或修改文书表
export function saveOrUpdateDocument(data) {
    data = vm.$qs.stringify(data);
    return request({
        url:"/xzjc/document/mySaveOrUpdate",
        method: "post",
        data: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}
//添加或修改文书表
export function getDocumentById(data) {
    return request({
        url:"/xzjc/document/getById/"+data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}
//根据文书名称模糊查询文书
export function getDocListByName(data) {
    return request({
        url:"/xzjc/document/getDocListByName",
        method: "get",
        params: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}
//查询当前模板相关文书
export function getTemplateDocList(data) {
    return request({
        url:"/xzjc/template/getTemplateDocList/"+data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}
//修改文书状态
export function changeFileStatus(data) {
    // data = vm.$qs.stringify(data);
    return request({
        url:"/xzjc/document/updateDocStatus/"+data,
        method: "post",
        // data: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}
//更新文书图片路径
export function updatePicPath(data) {
    data = vm.$qs.stringify(data);
    return request({
        url:"/xzjc/document/updatePicPath",
        method: "post",
        data: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}
// 撤销文书操作
export function documentRevoke(data) {
    return request({
        url:"/xzjc/document/revoke?id="+data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}
// 根据UUID删除文书
export function delDocumentById(data) {
    return request({
        url:"/xzjc/document/myRemoveById/"+data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType:  'XZJC_HOST',
        cancelToken: setCancelSource()
    });
}