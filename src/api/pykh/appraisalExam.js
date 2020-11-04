 import Vue from "vue";;

 let vm = new Vue();
//let vm = Vue;

import request from "@/common/js/request";
import {
    setCancelSource
} from "@/common/js/cancelToken";

// 加载评议考核配置列表
export function findPykhConfigByPage(data) {
    return request({
        url: "/pykh/pykhToConfigure/findPykhConfigureByPage",
        method: "get",
        showloading: false,
        baseUrlType: "CAPTCHA_HOST",
        params: data,
        cancelToken: setCancelSource()
    });
}

// 添加考核配置
export function addOrUpdatePykhConfig(data) {
    return request({
        url: "/pykh/pykhToConfigure/addOrUpdatePykhConfigure",
        method: "post",
        showloading: false,
        baseUrlType: "CAPTCHA_HOST",
        data: vm.$qs.stringify(data),
        cancelToken: setCancelSource()
    });
}
// 删除考核配置
export function deletePykhConfigById(data) {
    return request({
        url: "/pykh/pykhToConfigure/deletePykhConfigureById/" + data,
        method: "get",
        showloading: false,
        baseUrlType: "CAPTCHA_HOST",
        cancelToken: setCancelSource()
    });
}
// 查询考核指标项列表
export function findPykhMetricsByPage(data) {
    return request({
        url: "/pykh/pykhToConfigure/findPykhMetricsByPage",
        method: "get",
        showloading: false,
        params: data,
        baseUrlType: "CAPTCHA_HOST",
        cancelToken: setCancelSource()
    });
}
// 查询考核细则
export function findPykhZpByPage(data) {
    return request({
        url: "/pykh/pykhToConfigure/findPykhZpByPage",
        method: "get",
        showloading: false,
        params: data,
        baseUrlType: "CAPTCHA_HOST",
        cancelToken: setCancelSource()
    });
}
// 保存考核细则
export function addorUpdateDetailZp(data) {
    return request({
        url: "/pykh/pykhToConfigure/addorUpdateDetailZp",
        method: "post",
        showloading: false,
        data: vm.$qs.stringify(data),
        baseUrlType: "CAPTCHA_HOST",
        cancelToken: setCancelSource()
    });
}
//删除考核细则
export function deleteDetailZpById(data) {
    return request({
        url: "/pykh/pykhToConfigure/deleteDetailZpById/" + data,
        method: "get",
        showloading: false,
        baseUrlType: "CAPTCHA_HOST",
        cancelToken: setCancelSource()
    });
}
export function findListVoByPykhZp(data) {
    return request({
        url: "/pykh/pykhToConfigure/findListVoByPykhZp",
        method: "get",
        showloading: false,
        params: data,
        baseUrlType: "CAPTCHA_HOST",
        cancelToken: setCancelSource()
    });
}
// 添加修改考核指标
export function addOrUpdatePykhMetrics(data) {
    return request({
        url: "/pykh/pykhToConfigure/addOrUpdatePykhMetrics",
        method: "post",
        showloading: false,
        data: vm.$qs.stringify(data),
        baseUrlType: "CAPTCHA_HOST",
        cancelToken: setCancelSource()
    });
}
// 删除考核指标
export function deletePykhMetricsById(data) {
    return request({
        url: "/pykh/pykhToConfigure/deletePykhMetricsById/" + data,
        method: "get",
        showloading: false,
        baseUrlType: "CAPTCHA_HOST",
        cancelToken: setCancelSource()
    });
}

//分页查找公告信息
export function getNoticeListApi(data) {
    return request({
        url: "/pykh/notice/findNoticeByPage",
        method: "get",
        params: data,
        showloading: true,
        loadingType: "loadPart",
        cancelToken: setCancelSource()
    });
}

//添加、修改公告信息
export function addOrUpdateNoticeApi(data) {
    data = vm.$qs.stringify(data);
    return request({
        url: "/pykh/notice/addOrUpdateNotice",
        method: "post",
        data: data,
        showloading: true,
        loadingType: "loadPart",
        cancelToken: setCancelSource()
    });
}

//删除公告信息
export function deleteNoticeApi(id) {
    return request({
        url: "/pykh/notice/deleteNotice/" + id,
        method: "get",
        showloading: true,
        loadingType: "loadPart",
        cancelToken: setCancelSource()
    });
}

//获取公告内容
export function getContentApi(id) {
    return request({
        url: "/pykh/notice/getContent/" + id,
        method: "get",
        showloading: true,
        // loadingType:'loadPart',
        cancelToken: setCancelSource()
    });
}

export function getNoticeByPageAndUserId(data) {
    return request({
        url: "/pykh/notice/findNoticeByPageAndUserId",
        method: "get",
        params: data,
        showloading: true,
        // loadingType:'loadFull',
        cancelToken: setCancelSource()
    });
}

export function getAppraisalMenuList() {
    return request({
        url: "/pykh/home/getMenuList",
        method: "get",
        showloading: true,
        loadingType: "loadPart",
        cancelToken: setCancelSource()
    });
}

export function getPykhOrgInfo(data) {
    return request({
        url: "/pykh/pykhOrgInfo/getPykhOrgInfo",
        method: "get",
        showloading: true,
        params: data,
        loadingType: "loadPart",
        cancelToken: setCancelSource()
    });
}

export function updateScore(data) {
    return request({
        url: "/pykh/pykhScore/updateScore",
        method: "post",
        data: data,
        showloading: false,
        loadingType: "loadPart",
        cancelToken: setCancelSource()
    });
}

export function updateScoreState(data) {
    return request({
        url: "/pykh/pykhScore/updateScoreState",
        method: "post",
        data: data,
        showloading: true,
        loadingType: "loadPart",
        cancelToken: setCancelSource()
    });
}

export function getOrgInfoById(id) {
    return request({
        url: "/pykh/pykhOrgInfo/getOrgInfoById/" + id,
        method: "get",
        showloading: true,
        loadingType: "loadPart",
        cancelToken: setCancelSource()
    });
}

export function getOrgInfoByOrgId(data) {
    return request({
        url: "/pykh/pykhOrgInfo/getOrgInfoByOrgId",
        method: "get",
        showloading: true,
        params: data,
        loadingType: "loadPart",
        cancelToken: setCancelSource()
    });
}

export function getAppraisalResult() {
    return request({
        url: "/pykh/appraisalResult/getResult",
        method: "get",
        showloading: true,
        loadingType: "loadPart",
        cancelToken: setCancelSource()
    });
}
export function publicResult() {
    return request({
        url: "/pykh/appraisalResult/publicResult",
        method: "get",
        showloading: true,
        loadingType: "loadPart",
        cancelToken: setCancelSource()
    });
}
export function clickNotice(id) {
    return request({
        url: "/pykh/notice/clickNotice/" + id,
        method: "get",
        showloading: false,
        loadingType: "loadPart",
        cancelToken: setCancelSource()
    });
}

// 查看已读人员
export function findReadUserByPage(id) {
    return request({
        url: "/pykh/notice/findReadOrgan/" + id,
        // url: "/pykh/notice/findReadUserByPage/" + id,
        method: "get",
        showloading: false,
        loadingType: "loadPart",
        cancelToken: setCancelSource()
    });
}
// 查看未读人员
export function findUnReadUserByPage(id) {
    return request({
        url: "/pykh/notice/findUnReadOrgan/" + id,
        // url: "/pykh/notice/findUnReadUserByPage/" + id,
        method: "get",
        showloading: false,
        loadingType: "loadPart",
        cancelToken: setCancelSource()
    });
}

export function getCaseInfoByOrgId(data) {
    return request({
        url: "/pykh/case/getCaseInfoByOrgId",
        method: "get",
        showloading: true,
        params: data,
        loadingType: "loadPart",
        cancelToken: setCancelSource()
    });
}

export function getCaseInfoDetailByPid(id) {
    return request({
        url: "/pykh/case/getCaseInfoDetailByPid/" + id,
        method: "get",
        showloading: false,
        loadingType: "loadPart",
        cancelToken: setCancelSource()
    });
}

// 自查自评初始附件列表
export function findStaffOrCaseFile() {
    return request({
        url: "/pykh/file/findStaffOrCaseFile",
        method: "get",
        showloading: false,
        loadingType: "loadPart",
        cancelToken: setCancelSource()
    });
}

//获取专家信息
export function getExpertByOid(oid) {
    return request({
        url: "/pykh/experts/findByOrganId",
        method: "get",
        showloading: true,
        loadingType: "loadPart",
        cancelToken: setCancelSource()
    });
}

//保存及更新专家信息
export function addOrUpdateExperts(data) {
    return request({
        url: "/pykh/experts/addOrUpdate",
        method: "post",
        showloading: false,
        baseUrlType: "CAPTCHA_HOST",
        data: vm.$qs.stringify(data),
        cancelToken: setCancelSource()
    });
}

//省级查看检查结果
export function getCheckResult() {
    return request({
        url: "/pykh/appraisalResult/getCheckResult",
        method: "get",
        showloading: false,
        baseUrlType: "CAPTCHA_HOST",
        cancelToken: setCancelSource()
    });
}
//省级查看检查结果
export function getCaseDetailsResult(data) {
    return request({
        url: "/pykh/appraisalResult/getCaseDetailsResult",
        method: "get",
        showloading: false,
        baseUrlType: "CAPTCHA_HOST",
        params: data,
        cancelToken: setCancelSource()
    });
}
export function deleteFile(id) {
    return request({
        url: "/pykh/file/deleteFile/" + id,
        method: "get",
        showloading: false,
        baseUrlType: "CAPTCHA_HOST",
        cancelToken: setCancelSource()
    });
}
export function confirmUpload(id) {
    return request({
        url: "/pykh/file/confirmUpload",
        method: "post",
        showloading: false,
        data: id,
        baseUrlType: "CAPTCHA_HOST",
        cancelToken: setCancelSource()
    });
}
// /staff/importPerson 人员的批量导入
// export function getCaseDetailsResult(data){
//   return request({
//     url: "/pykh/appraisalResult/getCaseDetailsResult",
//     method: "get",
//     showloading: false,
//     baseUrlType:'CAPTCHA_HOST',
//     params: data,
//     cancelToken: setCancelSource()
//   });
// }
// /staff/findPykhStaffCountInfo 人员统计
// /staff/confirmSubmissionStaff/{oId} 人员确认报送

//检查工作进度列表
export function getWorkProgress() {
    return request({
        url: "/pykh/workProgress/list",
        method: "get",
        showloading: true,
        loadingType: "loadPart",
        cancelToken: setCancelSource()
    });
}

//获取专家信息
export function findCaseByExpert(expertId, batchId) {
    return request({
        url: "/pykh/caseAssign/list/" + expertId + "/" + batchId,
        method: "get",
        showloading: true,
        loadingType: "loadPart",
        cancelToken: setCancelSource()
    });
}

export function submitAssign(id) {
    return request({
        url: "/pykh/caseAssign/submit/" + id,
        method: "get",
        showloading: true,
        loadingType: "loadPart",
        cancelToken: setCancelSource()
    });
}

export function randomAssign(batchId) {
    return request({
        url: "/pykh/caseAssign/randomAssign/" + batchId,
        method: "get",
        showloading: true,
        loadingType: "loadPart",
        cancelToken: setCancelSource()
    });
}

export function downLoadZipFile(batchId, organId) {
    return request({
        url: "/pykh/file/downLoadZip/" + batchId + "/" + organId,
        method: "get",
        showloading: false,
        baseUrlType: "CAPTCHA_HOST",
        cancelToken: setCancelSource()
    });
}

//根据批次ID获取专家信息
export function getExpertList() {
    return request({
        url: "/pykh/experts/findByBatchId/",
        method: "get",
        showloading: true,
        loadingType: "loadPart",
        cancelToken: setCancelSource()
    });
}

export function saveAssign(data) {
    return request({
        url: "/pykh/caseAssign/saveOrUpdate",
        method: "post",
        showloading: true,
        loadingType: "loadPart",
        data: data,
        cancelToken: setCancelSource()
    });
}

export function updateScoreBatch(data) {
    return request({
        url: "/pykh/pykhScore/updateScoreBatch",
        method: "post",
        data: data,
        showloading: false,
        loadingType: "loadPart",
        cancelToken: setCancelSource()
    });
}

export function getCaseInfoByExpertId(data) {
    return request({
        url: "/pykh/case/getCaseInfoByExpertId",
        method: "get",
        showloading: true,
        params: data,
        loadingType: "loadPart",
        cancelToken: setCancelSource()
    });
}

export function getOrgInfoAndDetails(data) {
    return request({
        url: "/pykh/pykhOrgInfo/getOrgInfoAndDetails",
        method: "get",
        showloading: true,
        params: data,
        loadingType: "loadFullOpacity",
        cancelToken: setCancelSource()
    });
}

export function judgmentOrganId() {
    return request({
        url: "/pykh/notice/judgmentOrganId",
        method: "get",
        showloading: true,
        loadingType: "loadPart",
        cancelToken: setCancelSource()
    });
}

export function exportStaff(url) {
    return request({
        url: "/pykh/"+url,
        method: "get",
        showloading: false,
        loadingType: "loadPart",
        responseType:"blob",
        cancelToken: setCancelSource()
    });
}
