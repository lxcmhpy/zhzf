//执法监督相关api  cxx
import request from "@/common/js/request";
import {setCancelSource} from "@/common/js/cancelToken";
import Vue from "vue";

let vm = new Vue();
//查看列表
// export function findSupervisionListApi(data) {
//     console.log(data);
//     return request({
//       url: "/case/doc/caseBasicInfo/queryCaseBasicInfoPageByOrgan",
//       method: "get",
//       showloading: true,
//       params:data,
//       loadingType: 'loadPart',
//       cancelToken: setCancelSource()
//     });
//   }

//查看列表
export function findSupervisionListApi(data) {
  console.log(data);
  return request({
    url: "/case/doc/caseBasicInfo/queryCaseBySupervisePage",
    method: "get",
    showloading: true,
    params:data,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//填写督办意见
export function caseSuperviseSaveOrUpdateApi(data) {
  return request({
    url: "/case/caseSupervise/saveOrUpdate",
    method: "post",
    showloading: true,
    data: vm.$qs.stringify(data),
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//查看督办记录
export function findSupervisionRecoredApi(data) {
  // console.log(data);
  return request({
    url: "/case/caseSupervise/pageList",
    method: "get",
    showloading: true,
    params:data,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//通过id查看督办记录
export function findSupervisionRecoredByIdApi(id) {
  // console.log(data);
  return request({
    url: "/case/caseSupervise/findById/"+id,
    method: "get",
    showloading: true,
    // params:data,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//查看列表 重大案件督办
export function findImportantSupervisionListApi(data) {
  console.log(data);
  return request({
    url: "/case/doc/caseBasicInfo/queryCaseByImportantPage",
    method: "get",
    showloading: true,
    params:data,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//查看列表 行政复议案件监督
export function queryCaseByReconListApi(data) {
  console.log(data);
  return request({
    url: "/case/doc/caseBasicInfo/queryCaseByReconPage",
    method: "get",
    showloading: true,
    params:data,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//添加修改行政复议案件
export function addReconsiderationApi(data) {
  return request({
    url: "/case/case/reconsideration/saveOrUpdate",
    method: "post",
    showloading: true,
    headers: {
      "Content-Type": "application/json"
    },
    data: data,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//添加修改重大案件监督
export function addEditcaseImportantApi(data) {
  return request({
    url: "/case/caseImportant/saveOrUpdate",
    method: "post",
    showloading: true,
    data: vm.$qs.stringify(data),
    cancelToken: setCancelSource()
  });
}

//查询案卷评估管理
export function queryCaseEvaluationManageApi() {
  return request({
    url: "/case/caseEvaluation/list",
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//添加修改案卷评估管理
export function addCaseEvaluationApi(data) {
  console.log('加修改案卷评估管理',data)
  return request({
    url: "/case/caseEvaluation/saveOrUpdate",
    method: "post",
    showloading: true,
    headers: {
      "Content-Type": "application/json"
    },
    data: data,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//删除案卷评估管理
export function deleteCaseEvaluationManageApi(id) {
  return request({
    url: "/case/caseEvaluation/deleteById/"+id,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//填写 案卷评查表单
export function addCaseEvaluationSortApi(data) {
  return request({
    url: "/case/caseEvaluationSort/saveOrUpdate",
    method: "post",
    showloading: true,
    headers: {
      "Content-Type": "application/json"
    },
    data: data,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//通过案件id查询案卷评查
export function caseEvaluationSortByCaseIdApi(id) {
  return request({
    url: "/case/caseEvaluationSort/findByCaseBasicinfoId/"+id,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}

//查看列表 案卷评查
export function queryCaseByEvaluationListApi(data) {
  console.log(data);
  return request({
    url: "/case/doc/caseBasicInfo/queryCaseByEvaluationPage",
    method: "get",
    showloading: true,
    params:data,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}


//上传备案材料
export function uploadLawSupervisionFile(data) {
  console.log(data);
  return  request({
      url:  "/case/sys/file/uploadSupervision",
      method:  "POST",
      data: data,
      contentType: 'multipart/form-data;',
      showloading: true,
      loadingType:'loadPart',
      cancelToken:  setCancelSource(),
    });
}