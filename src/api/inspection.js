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
        url: "/xzjc/template/mySaveOrUpdate",
        method: "post",
        data: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
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
        baseUrlType: 'CAPTCHA_HOST',
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
        baseUrlType: 'CAPTCHA_HOST',
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
        baseUrlType: 'CAPTCHA_HOST',
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
        baseUrlType: 'CAPTCHA_HOST',
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
        baseUrlType: 'CAPTCHA_HOST',
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
        baseUrlType: 'CAPTCHA_HOST',
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
        baseUrlType: 'CAPTCHA_HOST',
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
//         baseUrlType:  'CAPTCHA_HOST',
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
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//查询登录人收藏的模板
export function findUserCollectTemplateApi(data) {
    return request({
        url: "/xzjc/template/findUserCollectTemplate/" + data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//通过模板名称查询模板
export function findRecordlModleByNameApi(data) {
    return request({
        url: "/xzjc/template/findByTemplateName/" + data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//分页查询模板
export function findRecordlModleByPageApi(data) {
    return request({
        url: "/xzjc/template/queryByOrganIdAndUserId",
        method: "get",
        params: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//通过模板UUid查询模板字段
export function findRecordlModleFieldByIdeApi(data) {
    return request({
        url: "/xzjc/templateField/findByTemplateUUID/" + data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//根据ID查找模板
export function findRecordModleByIdApi(data) {
    return request({
        url: "/xzjc/template/getById/" + data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//根据模板UUID查找模板修改时间
export function findRecordModleTimeByIdApi(data) {
    return request({
        url: "/xzjc/template/getTemplateUpdateTime/" + data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
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
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//查询所有模板名称
export function findAllModleNameApi(data) {
    return request({
        url: "/xzjc/template/queryAlltemplateName/" + data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
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
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}

//查询记录统计列表
export function findRecordLogListApi(data) {
    return request({
        url: "/xzjc/templateOrder/pcQueryOrderPage",
        method: "get",
        params: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}

//导出记录统计列表
export function excelExportRecordLogListApi(data) {
    return request({
        url: "/xzjc/templateOrder/excelExport",
        method: "post",
        data: data,
        showloading: true,
        loadingType: 'loadPart',
        responseType:'blob',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}

//添加或修改记录
export function saveOrUpdateRecordApi(data) {
    data = vm.$qs.stringify(data);
    return request({
        url: "/xzjc/templateOrder/mySaveOrUpdate",
        method: "post",
        data: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
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
        baseUrlType: 'CAPTCHA_HOST',
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
        baseUrlType: 'CAPTCHA_HOST',
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
        baseUrlType: 'CAPTCHA_HOST',
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
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//查找当前记录相关文书
export function getDocListById(data) {
    return request({
        url: "/xzjc/document/getDocListById/" + data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//添加或修改文书表
export function saveOrUpdateDocument(data) {
    data = vm.$qs.stringify(data);
    return request({
        url: "/xzjc/document/mySaveOrUpdate",
        method: "post",
        data: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//添加或修改文书表
export function getDocumentById(data) {
    return request({
        url: "/xzjc/document/getById/" + data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//根据文书名称模糊查询文书
export function getDocListByName(data) {
    return request({
        url: "/xzjc/document/getDocListByName",
        method: "get",
        params: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//查询当前模板相关文书
export function getTemplateDocList(data) {
    return request({
        url: "/xzjc/template/getTemplateDocList/" + data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//修改文书状态
export function changeFileStatus(data) {
    // data = vm.$qs.stringify(data);
    return request({
        url: "/xzjc/document/updateDocStatus/" + data,
        method: "post",
        // data: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//更新文书图片路径
export function updatePicPath(data) {
    data = vm.$qs.stringify(data);
    return request({
        url: "/xzjc/document/updatePicPath",
        method: "post",
        data: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
// 撤销文书操作
export function documentRevoke(data) {
    return request({
        url: "/xzjc/document/revoke/" + data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
// 根据UUID删除文书
export function delDocumentById(data) {
    return request({
        url: "/xzjc/document/myRemoveById/" + data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
// 修改记录的文书保存情况
export function delDocumentModifyOrderById(data) {
    // data = vm.$qs.stringify(data);
    return request({
        url: "/xzjc/templateOrder/modifyOrderById/" + data,
        method: "post",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
// 分页查询执法人员
export function getAllPersonApi(data) {
    return request({
        url: "/person/personExternalInterface/personInfoList",
        method: "get",
        params: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
// export  function  getAllPersonApi(data)  {
//     return  request({
//       url:  "/person/person/personPageList",
//       method:  "get",
//       params: data,
//       showloading: false,
//       baseUrlType:  'LAW_SUPERVISE_HOST',
//       cancelToken:  setCancelSource()
//     });
// }
// 分页查询公开执法人员
export function getAllPublicPersonApi(data) {
    return request({
        url: "/xzjc/randomPerson/queryRandomPerson",
        method: "get",
        params: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
// 根据机构查询所有公开执法人员
export function getAllPublicPersonByOrganNameApi(data) {
    return request({
        url: "/xzjc/randomPerson/queryAllPersonByOrganName/"+data.organName,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
// 根据UUID删除检查对象表数据
export function delPersonApi(data) {
    return request({
        url: "/xzjc/randomPerson/myRemoveById/" + data,
        method: "get",
        params: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
// 添加或修改检查人员表数据
export function addPublicPersonApi(data) {
    data = vm.$qs.stringify(data);
    return request({
        url: "/xzjc/randomPerson/mySaveOrUpdate",
        method: "post",
        data: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
// 一次性添加多个检查人员
export function addMorePublicPersonApi(data) {
    console.log(data)
    return request({
        url: "/xzjc/randomPerson/multipleSave",
        method: "post",
        data: data,
        showloading: true,
        async: false,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
// 分页查询检查专家表数据
export function getAllExpertApi(data) {
    return request({
        url: "/xzjc/randomExpert/queryRandomExpert",
        method: "get",
        params: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
// 添加或修改检查专家表数据
export function addExpertApi(data) {
    data = vm.$qs.stringify(data);
    return request({
        url: "/xzjc/randomExpert/mySaveOrUpdate",
        method: "post",
        data: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
// 根据UUID删除检查专家表数据
export function delExpertApi(data) {
    return request({
        url: "/xzjc/randomExpert/myRemoveById/" + data,
        method: "get",
        params: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
// 分页查询检查对象表数据
export function getAllRandomObjectApi(data) {
    return request({
        url: "/xzjc/randomObject/queryRandomObject",
        method: "get",
        params: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
// 根据UUID删除检查对象表数据
export function delRandomObjectApi(data) {
    return request({
        url: "/xzjc/randomObject/myRemoveById/" + data,
        method: "get",
        params: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
// 添加或修改检查对象表数据
export function addInspectionObjectApi(data) {
    data = vm.$qs.stringify(data);
    return request({
        url: "/xzjc/randomObject/mySaveOrUpdate",
        method: "post",
        data: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
// 分页查询事项清单表数据
export function getAllRandomItemApi(data) {
    return request({
        url: "/xzjc/randomItem/queryRandomItem",
        method: "get",
        params: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
// 根据抽查类别或者抽查事项查询当前事项是否有启用的
export function getIsRandomNameApi(data) {
    return request({
        url: "/xzjc/randomItem/queryByCheckDomainAndTaskName",
        method: "get",
        params: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
// 根据UUID删除事项清单表数据
export function delRandomItemApi(data) {
    return request({
        url: "/xzjc/randomItem/myRemoveById/" + data,
        method: "get",
        params: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
// 添加或修改事项清单表数据
export function addItemListApi(data) {
    data = vm.$qs.stringify(data);
    return request({
        url: "/xzjc/randomItem/mySaveOrUpdate",
        method: "post",
        data: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}

//获取字典详情  字典值
export function getDictListDetailByNameApi(name) {
    return request({
        url: "/system/sys/drawer/findAllDrawerByName/" + name,
        method: "get",
        showloading: false,
        loadingType: name == '系统标题' || name == 'loginBg' ? 'loadFull' : 'loadPart',
        cancelToken: setCancelSource()
    });
}

//获取检查对象
export function getAllCheckObject() {
    return request({
        url: "/xzjc/randomItem/getAllCheckObject",
        method: "get",
        showloading: false,
        loadingType: 'loadPart',
        cancelToken: setCancelSource()
    });
}

// 分页查询检查任务表数据
export function getAllTaskApi(data) {
    return request({
        url: "/xzjc/randomTask/queryRandomTask",
        method: "get",
        params: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
// 根据UUID删除检查任务表数据
export function delTaskApi(data) {
    return request({
        url: "/xzjc/randomTask/myRemoveById/" + data,
        method: "get",
        params: data,
        showloading: true,
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
// 添加或修改检查任务表数据
export function addTaskApi(data) {
    data = vm.$qs.stringify(data);
    return request({
        url: "/xzjc/randomTask/mySaveOrUpdate",
        method: "post",
        data: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
// 通过省级行政区划代码查询所有地市
export function findByAddressCode(data) {
    return request({
        url: "/xzjc/country/findByAddressCode/" + data,
        method: "get",
        params: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}

// 导入专家
export function importExpertExcelApi(data) {
    return request({
        url: "/xzjc/randomExpert/excelImport",
        method: "POST",
        data: data,
        contentType: 'multipart/form-data;',
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource(),
    });
}
// 导入对象
export function importObjectExcelApi(data) {
    return request({
        url: "/xzjc/randomObject/excelImport",
        method: "POST",
        data: data,
        contentType: 'multipart/form-data;',
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource(),
    });
}
// 导入事项清单
export function importItemExcelApi(data) {
    return request({
        url: "/xzjc/randomItem/excelImport",
        method: "POST",
        data: data,
        contentType: 'multipart/form-data;',
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource(),
    });
}
// 导入人员
export function importPersonExcelApi(data) {
    return request({
        url: "/xzjc/randomPerson/excelImport",
        method: "POST",
        data: data,
        contentType: 'multipart/form-data;',
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource(),
    });
}

// 添导出所有专家表数据
export function exportExpertApi() {
    return request({
        url: "/xzjc/randomExpert/excelExport",
        method: "post",
        // data: data,
        showloading: true,
        loadingType: 'loadPart',
        responseType:'blob',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
// 添导出所有对象表数据
export function exportObjectApi(data) {
    data = vm.$qs.stringify(data);
    return request({
        url: "/xzjc/randomObject/excelExport",
        method: "post",
        data: data,
        showloading: true,
        loadingType: 'loadPart',
        responseType:'blob',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
// 添导出所有事项清单表数据
export function exportItemApi() {
    return request({
        url: "/xzjc/randomItem/excelExport",
        method: "post",
        // data: data,
        showloading: true,
        loadingType: 'loadPart',
        responseType:'blob',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
// 添导出所有人员表数据（公开）
export function exportPersonApi(data) {
    data = vm.$qs.stringify(data);
    return request({
        url: "/xzjc/randomPerson/excelExport",
        method: "post",
        data: data,
        showloading: true,
        loadingType: 'loadPart',
        responseType:'blob',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
// 导出所有人员表数据
export function exportAllPersonApi(data) {
    data = vm.$qs.stringify(data);
    return request({
        url: "/person/person/excelExport",
        method: "post",
        data: data,
        showloading: true,
        loadingType: 'loadPart',
        responseType:'blob',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}

// 查询任务数据
export function searchTaskDataApi(data) {
    return request({
        url: "/xzjc/randomTask/queryByTaskName",
        method: "get",
        params: data,
        showloading: true,
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}

//查询检查对象的数量、本机构下执法人员的数量、检查专家的数量
export function getCountByOrganNameApi(data) {
    return request({
        url: "/xzjc/randomTask/getCountByOrganId/" + data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}

//获取所有启用状态的对象、本机构下的所有人员和所有启用状态的专家
export function getAllSourceDataByOrganNameApi(data) {
    return request({
        url: "/xzjc/randomTask/getAllSourceData/" + data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}

//分页查询抽取结果
export function getRandomResultByPageApi(data) {
    return request({
        url: "/xzjc/extractResult/queryByPage",
        method: "get",
        params: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//获取抽取结果
export function getExtractResultApi(data) {
    return request({
        url: "/xzjc/randomTask/getExtractResult",
        method: "get",
        params: data,
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}

// 添加或修改抽取结果表数据
export function addRandomResultApi(data) {
    data = vm.$qs.stringify(data);
    return request({
        url: "/xzjc/extractResult/mySaveOrUpdate",
        method: "post",
        data: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
// 一次性添加多条抽取结果
export function addRandomResultMoreApi(data) {
    return request({
        url: "/xzjc/extractResult/multipleSave",
        method: "post",
        data: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//根据任务ID删除抽取结果表数据
export function resetRandomByIdApi(data) {
    return request({
        url: "/xzjc/extractResult/deleteByTaskId/"+data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//根据任务ID查询抽取结果
export function getRandomByIdApi(data) {
    return request({
        url: "/xzjc/randomTask/getByTaskId/"+data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//根据UUID获取检查结果表数据
export function getCheckResultByIdApi(data) {
    return request({
        url: "/xzjc/checkResult/myGetById/"+data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}

// 添加或修改检查结果表
export function addCheckResultApi(data) {
    data = vm.$qs.stringify(data);
    return request({
        url: "/xzjc/checkResult/mySaveOrUpdate",
        method: "post",
        data: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}

//分页查询带抽取结果和检查结果
export function getCheckResultByPageApi(data) {
    return request({
        url: "/xzjc/randomTask/queryMyPage",
        method: "get",
        params: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//根据任务ID和抽取结果表ID查询检查结果
export function getCheckResultByTwoIdApi(data) {
    return request({
        url: "/xzjc/checkResult/getCheckResult",
        method: "get",
        params: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}


//根据任务ID和抽取结果表ID查询检查结果
export function getCheckResultByIdsApi(data) {
    return request({
        url: "/xzjc/checkResult/getCheckResult",
        method: "get",
        params: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}

// PC分页查询超限超载记录
export function getPcQueryCarInfoApi(data) {
    return request({
        url: "/xzjc/carInfo/pcQueryCarInfo",
        method: "get",
        params: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}

//添加或修改车辆信息表
export function saveOrUpdateCarInfoApi(data) {
    data = vm.$qs.stringify(data);
    return request({
        url: "/xzjc/carInfo/mySaveOrUpdate",
        method: "post",
        data: data,
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}

//根据UUID获取车辆信息表数据
export function findCarInfoByIdApi(data) {
    return request({
        url: "/xzjc/carInfo/myGetById/" + data,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//查找当前记录相关文书
export function findCarInfoFileByIdApi(data) {
    // 用初检记录id
    return request({
        url: "/xzjc/document/getDocListById/" + data,
        method: "get",
        baseUrlType: 'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}