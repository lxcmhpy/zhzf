import request from "@/common/js/request";
import {setCancelSource} from "@/common/js/cancelToken";
import Vue from "vue";

let vm = new Vue();

//获取执法门类
export function getEnforceLawTypeApi(organId) {
  return request({
    url: "/case/caseTemplate/lawCategory/findLawCateByOrganId/" + organId,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//根据条件获取案件类型
export function getCaseTypeApi(data) {
  let params = {
    programType: data.programType,
    organId: data.organId,
    cateId: data.cateId
  }
  return request({
    url: "/case/caseTemplate/lawCategory/queryLawCateOrganType",
    method: "get",
    params: params,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//获取行业类别
export function getIndustryCategoryApi(data) {
  let params = {
    pid: data
  }
  return request({
    url: "/case/caseTemplate/lawCategory/getLawCategoryListVo",
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    params: params,
    cancelToken: setCancelSource()
  });
}

//根据执法门类行业类别 查询违法行为
export function getIllegaActApi(data) {
  console.log(data);
  return request({
    url: "/bnslaw/sys/bnslawCause/findCaseCauseByPage",
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//添加或修改案件基本信息
export function saveOrUpdateCaseBasicInfoApi(data) {
  console.log(data);

  let data2 = vm.$qs.stringify(data);
  console.log(data2);
  return request({
    url: "/case/doc/caseBasicInfo/saveOrUpdateCaseBasicInfo",
    method: "post",
    data: data2,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//修改部分案件基本信息   把立案登记表的案由添加到案件信息里
export function updatePartCaseBasicInfoApi(data) {
  let data2 = vm.$qs.stringify(data);
  console.log(data2);
  return request({
    url: "/case/doc/caseBasicInfo/updatePartCaseBasicInfo",
    method: "post",
    data: data2,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}


//根据违法行为id查询绑定的法条
export function findLawRegulationsByCauseIdApi(causeId) {
  console.log(causeId);
  return request({
    url: "/bnslaw/sys/bnslawCause/findLawRegulationsByCauseId/" + causeId,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//查询自由裁量标准
export function findJudgFreedomListApi(data) {
  return request({
    url: "/bnslaw/sys/bnslawCause/findDiscretionListByForm",
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//查询机构下的执法人员
export function findLawOfficerListApi(organId) {
  let params = {
    organId: organId
  }
  return request({
    url: "/case/caseTemplate/lawOfficer/listLawOfficer",
    method: "get",
    params: params,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//通过姓名或执法证号查询执法人员列表
export function findStaffListApi(data) {
  let data2 = {
    organId: data.organId,
    inputValue: data.inputValue
  }
  return request({
    url: "/case/caseTemplate/lawOfficer/listLawOfficer",
    method: "get",
    showloading: true,
    params: data2,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//根据案件ID获取案件信息
export function getCaseBasicInfoApi(data) {
  return request({
    url: "/case/doc/caseBasicInfo/findById/" + data.id,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//保存文书
export function addDocDataApi(data) {
  console.log(data);
  return request({
    url: "/case/doc/data/create",
    method: "post",
    data: vm.$qs.stringify(data),
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//根据文书模板ID删除文书信息
export function delDocDataByDocIdApi(data) {
  console.log(data);
  return request({
    url: "/case/doc/data/findByCaseIdAndDocId/" + data.id,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//根据案件ID和文书模板ID查找文书信息
export function getDocDataByCaseIdAndDocIdApi(data) {
  console.log(data);
  return request({
    url: "/case/doc/data/findByCaseIdAndDocId",
    method: "get",
    // data:vm.$qs.stringify(data),
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//根据案件ID和表单模板ID查找表单信息
export function getFormDataByCaseIdAndFormIdApi(data) {
  console.log("表单", data);
  return request({
    url: "/case/doc/linkData/findByCaseIdAndLinkTypeId/" + data.casebasicInfoId + "/" + data.caseLinktypeId,
    // url: "/case/doc/linkData/findByCaseIdAndLinkTypeId",
    method: "get",
    // data:vm.$qs.stringify(data),
    // params:data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}


//保存或修改表单
export function addFormDataApi(data) {
  console.log(data);
  return request({
    url: "/case/doc/linkData/saveOrUpdateLink",
    method: "post",
    data: vm.$qs.stringify(data),
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//案件列表
export function queryCaseBasicInfoListPageApi(data) {
  return request({
    url: "/case/doc/caseBasicInfo/queryCaseBasicInfoListPage",
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//通过案件id和表单类型Id查询已绑定文书
export function getDocListByCaseIdAndFormIdApi(data) {
  return request({
    url: "/case/doc/caseLinkDoc/findListByCaseIdAndLinkTypeId/" + data.casebasicInfoId + "/" + data.linkTypeId,
    method: "get",
    // params:data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//通过表单类型Id查询已绑定文书
export function getLinkDocListByLinkTypeIdApi(data) {
  return request({
    url: "/case/doc/caseLinkDoc/findListByLinkTypeId",
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//添加或修改表单文书关联
export function saveOrUpdateCaseLinkDocApi(data) {
  return request({
    url: "/case/doc/caseLinkDoc/saveOrUpdateCaseLinkDoc",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/json"
    },
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//添加或修改表单文书关联
export function updateIsRequiredByIdApi(data) {
  return request({
    url: "/case/doc/caseLinkDoc/updateIsRequiredById",
    method: "post",
    data: vm.$qs.stringify(data),
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//根据ID删除表单文书关联
export function delLinkDocByIdApi(id) {
  return request({
    url: "/case/doc/caseLinkDoc/deleteById/" + id,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//pdf页的提交
export function submitPdfApi(data) {
  return request({
    url: "/case/doc/linkData/jumpNextLink",
    method: "post",
    data: vm.$qs.stringify(data),
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}


//pdf页的提交
export function handleTJApproveDocApi(data) {
  return request({
    url: "/case/doc/data/handleTJApproveDoc",
    method: "post",
    data: vm.$qs.stringify(data),
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}
//修改文书状态
export function saveOrUpdateLinkApi(data) {
  return request({
    url: "/doc/caseRelevantMaterials/saveOrUpdateLink",
    method: "post",
    // params:data,
    data: vm.$qs.stringify(data),
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//pdf页的审批
export function approvalPdfApi(data) {
  console.log(data);
  return request({
    url: "/case/doc/data/handleApproveDoc",
    method: "post",
    data: vm.$qs.stringify(data),
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//审批签章
export function approvalPdfQzApi(data) {
  return request({
    url: "/case/sys/file/dzqzSh",
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//获取下一环节
export function getNextLinkAPi(caseBasicInfoId) {
  return request({
    url: "doc/caseBasicInfo/findNextLinkUrlByCaseId/" + caseBasicInfoId,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//点击下一环节  更改流程图状态
export function setFlowStatusAPi(data) {
  return request({
    url: "doc/linkData/jumpNextStep",
    method: "post",
    data: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//查询审批角色列表
export function getApprovePeopleApi(caseBasicInfoId) {
  return request({
    url: "/case/doc/linkData/findApproveRole/" + caseBasicInfoId,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//查询所有环节
export function getQueryLinkListApi() {
  return request({
    url: "/case/caseTemplate/linkType/queryLinkList",
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//查询所有案件类型
export function getQueryCaseTypeListApi() {
  return request({
    url: "/case/caseTemplate/caseType/list",
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//通过表单（文书）类型Id查询表单（文书）绑定的案件基本信息属性
export function findCaseAllBindPropertyApi(data) {
  return request({
    url: "/case/doc/propertyBind/findAllBindProperty/" + data.typeId + "/" + data.caseBasicInfoId,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}


//根据案件ID查询  （使用场景：案件调查报告->证据材料->文书）
export function findByCaseBasicInfoIdApi(caseBasicInfoId) {
  return request({
    url: "/case/doc/data/findByCaseBasicInfoId/" + caseBasicInfoId,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//通过条件查询证据目录(不分页) （使用场景：案件调查报告->证据材料->照片材料）
export function findEvidencePicApi(data) {
  let data2 = vm.$qs.stringify(data)
  return request({
    url: "/case/doc/evidence/findListByCondition",
    method: "post",
    data: data2,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

export function findByMlCaseIdNew(caseId) {

  return request({
    url: "/case/doc/docCatalog/findCatalogByCaseId/" + caseId,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

export function findByCondition(data) {
  let data2 = vm.$qs.stringify(data);
  console.log('zhengju', data2);
  return request({
    url: "/case/doc/evidence/findByCondition",
    method: "post",
    data: data2,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//添加/修改证据 （使用场景：当事人权利添加证据调用文件上传后拿到ID再调用该添加接口）
export function saveOrUpdateEvdencenApi2(data) {
  let data2 = vm.$qs.stringify(data);
  console.log(data2);
  return request({
    url: "doc/evidence/saveOrUpdateEvdencen",
    method: "post",
    data: data2,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//修改证据名称
export function updateEvdenceNameApi(data) {
  let data2 = vm.$qs.stringify(data);
  console.log(data2);
  return request({
    url: "doc/evidence/updateEvdenceName",
    method: "post",
    data: data2,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

// 根据id删除文书
export function deleteDocByIdApi(docId) {
  return request({
    url: "/case/doc/data/deleteById/" + docId,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//根据id获取文书信息 （使用场景:询问笔录查看详情）
export function getDocDetailByIdApi(id) {
  return request({
    url: "/case/doc/data/findById/" + id,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//通过案件id获取询问笔录被询问人及其与案件关系
export function findPersonAndRelationByCaseIdApi(params) {
  return request({
    url: "/case/doc/data/findPersonAndRelationByCaseId/" + params.caseBasicInfoId,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//通过案件id和被询问人姓名查询询问次数
export function findAskNumApi(params) {
  let data = {
    caseId: params.caseId,
    name: params.name
  }
  return request({
    url: "/case/doc/data/findByCaseIdAndName",
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//通过条件查询文书列表
export function getAllPdfListApi(data) {
  return request({
    url: "/case/doc/type/findByCondition",
    method: "POST",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//根据环节ID查询可关联文书列表)
export function getDocListByLinkTypeIdApi(data) {
  console.log("dataaa",data)
  return request({
    url: "/case/doc/type/findLinkDocByCondition",
    method: "GET",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//通过条件查询文书列表(不分页)
export function getDocListApi(data) {
  return request({
    url: "/case/doc/type/findDocTypeList",
    method: "POST",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//查询案件类型列表(不分页)
export function getCaseTypeListApi(status) {
  let data = {
    status:status
  }
  return request({
    url: "/case/caseTemplate/caseType/findCaseTypeByStatus",
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//新增或修改文书类型列表
export function saveOrUpdateDocTypeApi(data) {
  return request({
    url: "/case/doc/type/create",
    method: "POST",
    params: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//根据ID删除文书类型
export function deleteDocTypeApi(id) {
  return request({
    url: "/case/doc/type/deleteById/"+id,
    method: "GET",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//根据模版ID查询问题
export function getRequestListByModelIdApi(id) {
  return request({
    url: "/case/doc/caseRequestModel/findRequestListByModelId/"+id,
    method: "post",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//新增或修改问题
export function saveOrUpdateRequestApi(data) {
  return request({
    url: "case/doc/caseRequestModel/createRequest",
    method: "POST",
    params: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//根据ID删除问题
export function deleteRequestApi(id) {
  return request({
    url: "/case/doc/caseRequestModel/deleteRequestById/"+id,
    method: "GET",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//通过条件查询问答模板列表
export function getRequestModelListApi(data) {
  return request({
    url: "/case/doc/caseRequestModel/findByCondition",
    method: "POST",
    params: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//新增或修改问答模板
export function saveOrUpdateRequestModelApi(data) {
  return request({
    url: "case/doc/caseRequestModel/create",
    method: "POST",
    params: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//根据ID删除问答模板
export function deleteRequestModelApi(id) {
  return request({
    url: "/case/doc/caseRequestModel/deleteById/"+id,
    method: "GET",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

// 通过条件查询绑定列表(分页)
export function findSetListApi(params) {
  let data = {
    bindName: params.bindName,
    bindType: params.bindType,
    resourceName: params.resourceName,
    resourceType: params.resourceType,
    typeId: params.typeId,
    size: params.pageSize,
    current: params.currentPage
  }
  return request({
    url: "/case/doc/propertyBind/findByCondition",
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

// 通过条件查询绑定列表(所有)
export function findAllSetListApi(params) {
  return request({
    url: "/case/doc/propertyBind/queryByCondition",
    method: "get",
    params: params,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//通过条件查询文书列表
export function saveOrUpdatePropertyApi(data) {
  return request({
    url: "/case/doc/propertyBind/saveOrUpdatePropertyBindTemplate",
    method: "POST",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//通过id删除绑定属性
export function delBindApi(data) {

  return request({
    url: "/case/doc/propertyBind/deleteById/" + data.id,
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}


//-------------长软lv start------------
//获取操作记录
export function getHandleRecordApi(data) {
  return request({
    url: "/case/doc/caseFormLogs/queryCaseFormLogsListPage",
    method: "GET",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//获取证据目录
export function getEvidenceApi(data) {
  return request({
    url: "/case/doc/evidence/findByCondition",
    method: "POST",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

// 查询已经绑定证据
export function findBindingEvdinec(data) {
  return request({
    url: "/case/doc/docCatalog/findBindingEvdinec",
    method: "GET",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//
//插入证据目录
export function saveOrUpdateEvidenceApi(data) {
  return request({
    url: "/case/doc/evidence/saveOrUpdateEvdencen",
    method: "POST",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

// 归档目录，绑定关联证据列表
export function saveOrUpdateDocCatalogList(data) {
  console.log('data', data)
  return request({
    url: "/case/doc/docCatalog/saveOrUpdateDocCatalogList",
    method: "POST",
    data: data,
    showloading: true,
    loadingType: 'loadPart',
    contentType: 'application/json',
    cancelToken: setCancelSource()
  });
}

//获取文书列表
export function getDocumentApi(data) {
  console.log("caseId", data);
  return request({
    url: "/case/doc/data/findByCondition",
    method: "GET",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//获取送达回证
export function getDeliverReceiptApi(data) {
  return request({
    url: "/case/doc/proof/findByCondition",
    method: "POST",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//添加修改送达回证
export function saveOrUpdateDeliverReceiptApi(data) {
  return request({
    url: "/case/doc/proof/saveOrUpdateProof",
    method: "POST",
    // params: data,
    data: data,
    showloading: true,
    loadingType: 'loadPart',
    contentType: 'application/json',
    cancelToken: setCancelSource()
  });
}

//代码集\数据字典接口
export function getDictionaryApi(data) {
  return request({
    url: "/system/sys/drawer/findAllDrawerById/" + data,
    method: "GET",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource(),
  });
}

//-----------------长软lv ends------------


//通过案件ID和文书Id查询案件附件
export function findByCaseIdAndDocIdApi(data) {
  let params = {
    caseId: data.caseId,
    docId: data.docId
  }
  return request({
    url: "/case/sys/file/findByCaseIdAndDocId",
    method: "get",
    params: params,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//通过案件ID和文书Id查询案件附件---送达回证
export function findByCaseIdAndDocIdSongdaApi(data) {
  return request({
    url: "/case/sys/file/findVoByDocDataId/" + data.docId,
    method: "get",
    // params: params,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//案件抄告列表
export function queryCaseCopyListPageApi(data) {
  return request({
    url: "/case/case/send/findByCondition",
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//案件抄告可选案件列表
export function selectCopyCaseApi(data) {
  return request({
    url: "/case/doc/caseBasicInfo/queryCaseBasicInfoPageByCaseNumber",
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//通过案件id获取上下环节
export function findIsOrderApi(params) {
  return request({
    url: "/case/doc/linkData/findIsOrder/" + params.caseBasicInfoId,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

export function findRequestListByModelIdApi(modelId) {
  let data = vm.$qs.stringify({modelId: modelId})
  return request({
    url: "/case/doc/caseRequestModel/findRequestListByModelId/" + modelId,
    method: "post",
    data: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//根据案件id查询案件相关联的附件
export function getFinishEvdenceByIdApi(data) {
  console.log('chaxun', data)
  return request({
    url: "/case/sys/file/findVoByEvidenceCaseId/" + data,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//根据案件id查询案件相关联的文书
export function getFinishDocByIdApi(data) {
  return request({
    url: "/case/sys/file/findVoByDocCaseId/" + data,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//解除（延长）强制措施的提交
export function submitRelieveApi(params) {
  let data = {
    caseId: params.caseId,
    caseLinktypeId: params.caseLinktypeId
  }
  let data2 = vm.$qs.stringify(data);
  console.log(data2);
  return request({
    url: "/case/doc/linkData/submitRelieve",
    method: "post",
    data: data2,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//查询操作记录查询条件
export function querySearchConditionApi(data) {
  return request({
    url: "/case/doc/caseFormLogs/querySearchCondition/" + data,
    method: "GET",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource(),
  });
}

//添加修改移送
export function AddEditTransferCaseApi(modelId) {
  let data = modelId;
  // let data = vm.$qs.stringify({CaseTransferForm:modelId})
  console.log('添加', data)
  // data = vm.$qs.stringify({data})
  return request({
    url: "/case/case/transfer/saveOrUpdate",
    method: "post",
    data: vm.$qs.stringify(data),
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//通过问答模板类型id查询问答模板
export function findModelListByModelTypeIdApi(modelTypeId) {
  let data = vm.$qs.stringify({modelTypeId: modelTypeId})
  return request({
    url: "/case/doc/caseRequestModel/findRequestListByModelId/" + modelTypeId,
    method: "post",
    data: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//添加修改抄告
export function addEditCopyCaseApi(modelId) {
  let data = modelId;
  console.log('添加', data)
  return request({
    url: "/case/case/send/saveOrUpdate",
    method: "post",
    data: vm.$qs.stringify(data),
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//获取送达回证
export function getDeliverReceiptByCaseIdApi(data) {
  return request({
    url: "/case/doc/proof/findByCaseId/" + data.caseId,
    method: "GET",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//查询文书列表
export function findVoByDocCaseIdApi(data) {
  return request({
    url: "/case/sys/file/findVoByDocCaseId/" + data,
    method: "GET",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource(),
  });
}

//案件移送可选案件列表
export function selectTransferCaseApi(data) {
  return request({
    url: "/case/doc/caseBasicInfo/queryPageByTransferCaseNumber",
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  })
}

//案件移送列表
export function TransferCaseApi(data) {
  return request({
    url: "/case/case/transfer/findByCondition",
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//删除目录列表(解除证据关联)
export function deleteDocCatalogEvidenApi(id) {
  return request({
    url: "/case/doc/docCatalog/deleteDocCatalog/" + id,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//根据案件id和环节id删除附件
export function deleteFileByCaseAndHuanjieApi(data) {
  return request({
    url: "/case/sys/file/deleteByCaseIdAndDocId",
    method: "GET",
    showloading: false,
    params: data,
    cancelToken: setCancelSource(),
  });
}

//通过表单（文书）类型Id查询表单（文书）绑定的案件基本信息属性
export function findBindPropertyRuleApi(data) {
  return request({
    url: "/case/doc/propertyBind/findBindPropertyRule/" + data.typeId + "/" + data.caseBasicInfoId,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

export function updateDocStatusApi(id) {
  return request({
    url: "/case/doc/data/updateDocStatus/" + id,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}
//获取当前环节是几级审批
export function getCurrentApproveApi(id) {
  return request({
    url: "/case/doc/data/getCurrentApproveAndApproveAmount/" + id,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}



//根据案件类型获取案件流程 （包括哪个信息采集页面）
export function queryFlowBycaseTypeApi(id) {
  return request({
    url: "/case/caseTemplate/flow/queryFlowBycaseType/" + id,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//根据案件id获取案件流程 
export function queryFlowBycaseIdApi(id) {
  return request({
    url: "/case/caseTemplate/flow/queryFlowBycaseId/" + id,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}


//通过条件卷宗目录模板
export function getCatalogListApi(data) {
  return request({
    url: "/case/doc/catalog/findByCondition",
    method: "post",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  }); 
}

//添加或修改卷宗目录
export function addOrEditCatalogApi(data) {
  return request({
    url: "/case/doc/catalog/create",
    method: "post",
    data: vm.$qs.stringify(data),
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//删除卷宗目录
export function deleteCatalogApi(id) {
  return request({
    url: "/case/doc/catalog/deleteById/"+id,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//根据模板ID查询可关联文书列表)
export function getDocListByTemplateIdApi(data) {
  console.log("dataaa",data)
  return request({
    url: "/case/doc/catalog/findLinkDocByCondition",
    method: "GET",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//通过模板Id查询已绑定文书
export function getLinkDocListByTemplateIdApi(data) {
  return request({
    url: "/case/doc/catalogDetails/findListByTemplateId",
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//添加或修改表单文书关联
export function saveOrUpdateCataLogLinkDocApi(data) {
  return request({
    url: "/case/doc/catalogDetails/saveOrUpdateCatalogDetails",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/json"
    },
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//根据ID删除表单文书关联
export function deleteCatalogLinkDocByIdApi(id) {
  return request({
    url: "/case/doc/catalogDetails/deleteById/" + id,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//查询公路路产配置
export function queryRoadLcDeployApi(data) {
  return request({
    url: "/case/road/roadLcDeploy/list",
    method: "get",
    params:data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//通过条件查询附属属性
export function getAttachedPropertyByConditionApi(data) {
  console.log("附属属性查询参数",data);
  return request({
    url: "/case/caseTemplate/attachedProperty/queryPropertyCondition",
    method: "get",
    params: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//添加或修改附属属性的值
export function addAttachedPropertyValueApi(data) {
  console.log("data",data);
  return request({
    url: "/case/caseTemplate/attachedProperty/saveOrUpdatePropertyValue",
    method: "post",
    data: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//添加或修改附属属性的值
export function getAttachedPropertyAnsValueApi(data) {
  console.log("1233",data);
  return request({
    url: "/case/caseTemplate/attachedProperty/queryPropertyAndValue/"+data,
    method: "get",
    // data: data,
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//通过storageId获取文件base64码
export function queryImgBase64Api(storageId) {
  return request({
    url: "/case/sys/file/getBase64ByStorageId/"+storageId,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//查询该文书是否需要审批
export function findDocDataByIdApi(id) {
  return request({
    url: "/case/doc/type/findById/"+id,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//获取文件流
export function getFileStreamByStorageIdApi(storageId) {
  return request({
    url: "/case/sys/file/getFileStreamByStorageId/"+storageId,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    responseType:'blob',
    cancelToken: setCancelSource()
  });
}

//点击流程图(已解锁状态的)时 更改流程图各环节状态
export function updateLinkInfoByCaseIdAndLinkTypeIdApi(data) {
  return request({
    url: "/case/doc/caseBasicInfo/updateLinkInfoByCaseIdAndLinkTypeId/"+data.caseId+'/'+data.linkTypeId,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}
