import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";
import Vue from "vue";
let vm = new Vue();

//获取执法门类
export function getEnforceLawTypeApi(organId) {
  return request({
    url: "/sys/lawCategory/findLawCateByOrganId/" + organId,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()
  });
}
//根据条件获取案件类型
export function getCaseTypeApi(data) {
  let params = {
    programType: data.programType,
    organId: "1",
    cateId: data.cateId
  }
  return request({
    url: "/sys/lawCategory/queryLawCateOrganType",
    method: "get",
    params: params,
    showloading: true,
    cancelToken: setCancelSource()
  });
}
//获取行业类别
export function getIndustryCategoryApi(data) {
    let params = {
      pid:data
    }
    return request({
      url: "/sys/lawCategory/getLawCategoryListVo",
      method: "get",
      showloading: true,
      params:params,
      cancelToken: setCancelSource()
    });
}
//根据执法门类行业类别 查询违法行为
export function getIllegaActApi(data) {
    console.log(data);
    return request({
      url: "/sys/bnslawCause/findCaseCauseByPage",
      method: "get",
      params:data,
      showloading: true,
      cancelToken: setCancelSource()
    });
}

//添加或修改案件基本信息
export function saveOrUpdateCaseBasicInfoApi(data) {
  console.log(data);

  let  data2  =  vm.$qs.stringify(data);
  console.log(data2);
  return request({
    url: "/doc/caseBasicInfo/saveOrUpdateCaseBasicInfo",
    method: "post",
    data:data2,
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//修改部分案件基本信息   把立案登记表的案由添加到案件信息里
export function updatePartCaseBasicInfoApi(data) {
  let  data2  =  vm.$qs.stringify(data);
  console.log(data2);
  return request({
    url: "/doc/caseBasicInfo/updatePartCaseBasicInfo",
    method: "post",
    data:data2,
    showloading: true,
    cancelToken: setCancelSource()
  });
}


//根据违法行为id查询绑定的法条
export function findLawRegulationsByCauseIdApi(causeId) {
  console.log(causeId);
  return request({
    url: "/sys/bnslawCause/findLawRegulationsByCauseId/"+causeId,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//查询自由裁量标准
export function findJudgFreedomListApi() {
  return request({
    url: "/sys/bnslawCause/findDiscretionListByForm",
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()
  });
}
//查询机构下的执法人员
export function findLawOfficerListApi(organId) {
  let params={
    organId:organId
  }
  return request({
    url: "/sys/lawOfficer/listLawOfficer",
    method: "get",
    params:params,
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//根据案件ID获取案件信息
export function getCaseBasicInfoApi(data) {
  return request({
    url: "/doc/caseBasicInfo/findById/"+data.id,
    method: "get",
    // params:params,
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//保存文书
export function addDocDataApi(data) {
  console.log(data);
  return request({
    url: "/doc/data/create",
    method: "post",
    data:vm.$qs.stringify(data),
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//根据文书模板ID删除文书信息
export function delDocDataByDocIdApi(data) {
  console.log(data);
  return request({
    url: "/doc/data/findByCaseIdAndDocId/"+data.id,
    method: "get",
    // params:data,
    showloading: true,
    cancelToken: setCancelSource()
  });
}
//根据案件ID和文书模板ID查找文书信息
export function getDocDataByCaseIdAndDocIdApi(data) {
  console.log(data);
  return request({
    url: "/doc/data/findByCaseIdAndDocId",
    method: "get",
    // data:vm.$qs.stringify(data),
    params:data,
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//根据案件ID和表单模板ID查找表单信息
export function getFormDataByCaseIdAndFormIdApi(data) {
  console.log(data);
  return request({
    url: "/doc/linkData/findByCaseIdAndLinkTypeId/"+data.casebasicInfoId+"/"+data.caseLinktypeId,
    // url: "/doc/linkData/findByCaseIdAndLinkTypeId",
    method: "get",
    // data:vm.$qs.stringify(data),
    // params:data,
    showloading: true,
    cancelToken: setCancelSource()
  });
}


//保存或修改表单
export function addFormDataApi(data) {
  console.log(data);
  return request({
    url: "/doc/linkData/saveOrUpdateLink",
    method: "post",
    data:vm.$qs.stringify(data),
    showloading: true,
    cancelToken: setCancelSource()
  });
}
//案件列表
export function queryCaseBasicInfoListPageApi(data) {
  return request({
    url: "/doc/caseBasicInfo/queryCaseBasicInfoListPage",
    method: "get",
    params:data,
    showloading: true,
    cancelToken: setCancelSource()
  });
}
//通过案件id和表单类型Id查询已绑定文书
export function getDocListByCaseIdAndFormIdApi(data){
  return request({
    url: "/doc/caseLinkDoc/findListByCaseIdAndLinkTypeId/"+data.casebasicInfoId+"/"+data.linkTypeId,
    method: "get",
    // params:data,
    showloading: true,
    cancelToken: setCancelSource()
  });
}
//pdf页的提交
export function submitPdfApi(data) {
  return request({
    url: "/doc/linkData/jumpNextLink",
    method: "post",
    data:vm.$qs.stringify(data),
    showloading: true,
    cancelToken: setCancelSource()
  });
}
//修改文书状态
export function saveOrUpdateLinkApi(data){
  return request({
    url: "/doc/caseRelevantMaterials/saveOrUpdateLink",
    method: "post",
    // params:data,
    data: vm.$qs.stringify(data),
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//pdf页的审批
export function approvalPdfApi(data) {
  console.log(data);
  return request({
    url: "/doc/linkData/handleApprove",
    method: "post",
    data:vm.$qs.stringify(data),
    showloading: true,
    cancelToken: setCancelSource()
  });
}
//获取下一环节
export function getNextLinkAPi(caseBasicInfoId) {
  return request({
    url: "doc/caseBasicInfo/findNextLinkUrlByCaseId/"+caseBasicInfoId,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//点击下一环节  更改流程图状态
export function setFlowStatusAPi(data) {
  return request({
    url: "doc/linkData/jumpNextStep",
    method: "post",
    data:data,
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//查询审批角色列表
export function getApprovePeopleApi(caseBasicInfoId) {
  return request({
    url: "/doc/linkData/findApproveRole/"+caseBasicInfoId,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//查询所有环节
export function getQueryLinkListApi() {
  return request({
    url: "/caseTemplate/linkType/queryLinkList",
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()
  });
}
//查询所有案件类型
export function getQueryCaseTypeListApi() {
  return request({
    url: "/sys/caseType/list",
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//通过表单（文书）类型Id查询表单（文书）绑定的案件基本信息属性
export function findCaseAllBindPropertyApi(data) {
  return request({
    url: "/doc/propertyBind/findAllBindProperty/"+data.typeId+"/"+data.caseBasicInfoId,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()
  });
}
// 获取归档目录
export function findByMlCaseId(caseId) {
    return request({
        url: "/sys/file/findByMlCaseId/"+caseId,
        method: "get",
        showloading: true,
        cancelToken: setCancelSource()
      });
}
export function findByCondition(data){
    return request({
        url: "/doc/evidence/findByCondition",
        method: "post",
        data:data,
        showloading: true,
        cancelToken: setCancelSource()
      });
}
