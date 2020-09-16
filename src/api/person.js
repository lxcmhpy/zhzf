import  request  from  "@/common/js/request";
import  {setCancelSource}  from  "@/common/js/cancelToken";
import  Vue  from  "vue";

//执法人员管理系统接口映射
let  vm  =  new  Vue();

//后台查询缓存中的数据字典的值begin
export function findAllDrawerByNameApi(name){
  return request({
    url: "/system/sys/drawer/findAllDrawerByName/"+name,
    method: "get",
    params: vm.$qs.stringify(name),
    showloading: false,
    cancelToken: setCancelSource()
  })
}
export function findOrganTreeByCurrUserApi(){
  return request({
    url: "/system/sys/organ/organTreeByCurrUser/",
    method: "get",
    showloading: false,
    cancelToken: setCancelSource()
  })
}
export function findStationApi(){
  return request({
    url: "/person/station/allPerStation/",
    method: "get",
    showloading: false,
    cancelToken: setCancelSource()
  })
}
export function getDictInfoByCodeApi(pid){
  return request({
    url: "/person/cache/dictInfoById/"+pid,
    method: "get",
    params: vm.$qs.stringify(pid),
    showloading: false,
    cancelToken: setCancelSource()
  })
}
export function getDictInfoAllApi(data){
  return request({
    url: "/person/cache/dictInfoAll",
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
//后台查询缓存中的数据字典的值end

//获取用户所有的用户信息
export  function  getDetailInfoApi(personId)  {
  return  request({
    url:  "/person/person/getPersoninfoDetail/"+personId,
    method:  "get",
    params: vm.$qs.stringify(personId),
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  getAllPersonApi(data)  {
    return  request({
      url:  "/person/person/personPageList",
      method:  "get",
      params: data,
      showloading: false,
      baseUrlType:  'CAPTCHA_HOST',
      cancelToken:  setCancelSource()
    });
}
//添加用户信息
export  function  addPersonApi(data)  {
  return  request({
    url:  "/person/person/addPerson",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}

//修改用户用户信息
export  function  updatePersonApi(data)  {
  return  request({
    url:  "/person/person/updatePerson",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}

//删除所选的所有用户信息
export  function  deletePersonApi(ids)  {
  return  request({
    url:  "/person/person/deletePerson/"+ids,
    method:  "get",
    data: vm.$qs.stringify(ids),
    showloading: false,
    cancelToken:  setCancelSource()
  });
}

//根据id删除用户用户信息
export  function  deletePersonByIdApi(personId)  {
  return  request({
    url:  "/person/person/deletePersonById/"+personId,
    method:  "get",
    data: vm.$qs.stringify(personId),
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
/////////////////////////////人员奖励begin///////////////////////////////
//条件查询
export  function  getAwardListApi(data)  {
  return  request({
    url:  "/person/award/awardPageList",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
//添加
export  function  addAwardApi(data)  {
return  request({
  url:  "/person/award/addAward",
  method:  "get",
  params: data,
  showloading: false,
  cancelToken:  setCancelSource()
});
}

//修改用户用户信息
export  function  updateAwardApi(data)  {
return  request({
  url:  "/person/award/updateAward",
  method:  "get",
  params: data,
  showloading: false,
  cancelToken:  setCancelSource()
});
}

//删除所选的所有用户信息
export  function  deleteAwardApi(ids)  {
return  request({
  url:  "/person/award/deleteAward/"+ids,
  method:  "get",
  data: vm.$qs.stringify(ids),
  showloading: false,
  cancelToken:  setCancelSource()
});
}

//根据id删除用户用户信息
export  function  deleteAwardByIdApi(awardId)  {
return  request({
  url:  "/person/award/deleteAwardById/"+awardId,
  method:  "get",
  data: vm.$qs.stringify(awardId),
  showloading: false,
  cancelToken:  setCancelSource()
});
}
/////////////////////////////人员教育begin///////////////////////////////
export  function  getEducationListApi(data)  {
  return  request({
    url:  "/person/education/educationPageList",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  addEducationApi(data)  {
return  request({
  url:  "/person/education/addEducation",
  method:  "get",
  params: data,
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  updateEducationApi(data)  {
return  request({
  url:  "/person/education/updateEducation",
  method:  "get",
  params: data,
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  deleteEducationApi(ids)  {
return  request({
  url:  "/person/education/deleteEducation/"+ids,
  method:  "get",
  data: vm.$qs.stringify(ids),
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  deleteEducationByIdApi(educationId)  {
return  request({
  url:  "/person/education/deleteEducationById/"+educationId,
  method:  "get",
  data: vm.$qs.stringify(educationId),
  showloading: false,
  cancelToken:  setCancelSource()
});
}
/////////////////////////////////////////////人员证件信息/////////////////////////////////////
export  function  queryPersonCertApi(data)  {
  return  request({
    url:  "/person/perCert/queryPersonCert/",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  getCertHistoryPageListApi(certId)  {
  return  request({
    url:  "/person/certHistory/certHistoryPageList/"+certId,
    method:  "get",
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  getPerCertListApi(data)  {
    return  request({
      url:  "/person/perCert/canIssueDocData",
      method:  "get",
      params: data,
      showloading: false,
      cancelToken:  setCancelSource()
    });
}
export  function  addPerCertApi(data)  {
  return  request({
    url:  "/person/perCert/issueDoc",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  updatePerCertApi(data)  {
  return  request({
    url:  "/person/perCert/perCertPageList",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
//证件挂失
export  function  lossDocApi(data)  {
  return  request({
    url:  "/person/perCert/lossDoc",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
//解除挂失
export  function  unLossDocApi(data)  {
  return  request({
    url:  "/person/perCert/unLossDoc",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
//证件暂扣
export  function  withholdApi(data)  {
  return  request({
    url:  "/person/perCert/withhold",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}

//解除暂扣
export  function  unWithholdApi(data)  {
  return  request({
    url:  "/person/perCert/unWithhold",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
//证件注销
export  function  logoffApi(data)  {
  return  request({
    url:  "/person/perCert/logoff",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
//证件吊销
export  function  revokeApi(data)  {
  return  request({
    url:  "/person/perCert/revoke",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
//获取证号getCertNoApi
export  function  getCertNoApi(data)  {
  return  request({
    url:  "/person/perCert/getCertNo",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
//获取省号
export  function  getProvinceCode()  {
  return  request({
    url:  "/person/enfSection/getProviceCode",
    method:  "get",
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
//到期换证 changeCertByEndDateMoudle
export  function  changeCertByEndDateApi(data)  {
  return  request({
    url:  "/person/perCert/changeCertByEndDate",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  deletePerCertApi(ids)  {
  return  request({
    url:  "/person/perCert/deletePerCert/"+ids,
    method:  "get",
    data: vm.$qs.stringify(ids),
    showloading: false,
    cancelToken:  setCancelSource()
  });
}

export  function  deletePerCertByIdApi(certId)  {
  return  request({
    url:  "/person/perCert/deletePerCertById/"+certId,
    method:  "get",
    data: vm.$qs.stringify(certId),
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
///////////////////////////////////////////查询人员调岗信息//////////////////////////////////////
export  function  getTransferListApi(data)  {
  return  request({
    //url:  "/person/transfer/transferPageList",
    url:  "/person/transfer/getPersonTranList",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  addTransferApi(data)  {
return  request({
  url:  "/person/transfer/addTransfer",
  method:  "get",
  params: data,
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  updateTransferApi(data)  {
return  request({
  url:  "/person/transfer/updateTransfer",
  method:  "get",
  params: data,
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  deleteTransferApi(ids)  {
return  request({
  url:  "/person/transfer/deleteTransfer/"+ids,
  method:  "get",
  data: vm.$qs.stringify(ids),
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  deleteTransferByIdApi(transferId)  {
return  request({
  url:  "/person/transfer/deleteTransferById/"+transferId,
  method:  "get",
  data: vm.$qs.stringify(transferId),
  showloading: false,
  cancelToken:  setCancelSource()
});
}
///////////////////////////////////////////////////人员审批信息//////////////////////////////// 
export  function  applyTxApi(personIds)  {//申请退休
  return  request({
    url:  "/person/person/retire/"+personIds,
    method:  "get",
    params: vm.$qs.stringify(personIds),
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
//审批列表查询
export  function  getApproveApi(data)  {
  return  request({
    url:  "/person/approve/approvePageList",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  getLastApproveRecordApi(data)  {//人员审批列表
  return  request({
    url:  "/person/approve/detailApprovePageList",
    method:  "get",
    params: {personId: data},
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  applyApproveApi(personIds)  {//申请审批
  return  request({
    url:  "/person/approve/applyApprove/"+personIds,
    method:  "get",
    params: vm.$qs.stringify(personIds),
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  applyDdApi(data)  {//申请调动 
  return  request({
    url:  "/person/person/approveTransfer/",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  applyDlApi(personId)  {//申请调离
  return  request({
    url:  "/person/person/removeOrg/"+personId,
    method:  "get",
    params: vm.$qs.stringify(personId),
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
//分页查询审批列表
export  function  getApproveListApi(data)  {
  return  request({
    url:  "/person/approve/approveHistoryByPersonId",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
//执行审批
export  function  addApproveApi(data)  {
return  request({
  url:  "/person/approve/approve",
  method:  "get",
  params: data,
  showloading: false,
  cancelToken:  setCancelSource()
});
}
//证件颁发
export  function  updateApproveApi(data)  {
return  request({
  url:  "/person/approve/issueDoc",
  method:  "get",
  params: data,
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  deleteApproveApi(ids)  {
return  request({
  url:  "/person/approve/deleteApprove/"+ids,
  method:  "get",
  data: vm.$qs.stringify(ids),
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  deleteApproveByIdApi(approveId)  {
return  request({
  url:  "/person/approve/deleteApproveById/"+approveId,
  method:  "get",
  data: vm.$qs.stringify(approveId),
  showloading: false,
  cancelToken:  setCancelSource()
});
}

////////////////////////////////////////////////人员年审信息////////////////////////////////////
export  function  getQueryArDataByPersonIdApi(data)  {
  return  request({
    url:  "/person/annualreview/queryArDataByPersonId",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
//人员年审列表
export  function  getAnnualreviewListApi(data)  {
  return  request({
    url:  "/person/annualreview/queryArData",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
//获取年份
export  function  getYearApi(data)  {
  return  request({
    url:  "/person/annualreview/arYear",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  addAnnualreviewApi(data)  {
return  request({
  url:  "/person/annualreview/addAnnualreview",
  method:  "get",
  params: data,
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  updateAnnualreviewApi(data)  {
return  request({
  url:  "/person/annualreview/updateAnnualreview",
  method:  "get",
  params: data,
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  deleteAnnualreviewApi(ids)  {
return  request({
  url:  "/person/annualreview/deleteAnnualreview/"+ids,
  method:  "get",
  data: vm.$qs.stringify(ids),
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  deleteAnnualreviewByIdApi(reviewId)  {
return  request({
  url:  "/person/annualreview/deleteAnnualreviewById/"+reviewId,
  method:  "get",
  data: vm.$qs.stringify(reviewId),
  showloading: false,
  cancelToken:  setCancelSource()
});
}
//执行年审
  export  function  approveArApi(data)  {
    return  request({
      url:  "/person/annualreview/approveAr",
      method:  "get",
      params: data,
      showloading: false,
      cancelToken:  setCancelSource()
    });
    }
  //执行复审
  export  function  reApproveArApi(data)  {
    return  request({
      url:  "/person/annualreview/reApproveAr",
      method:  "get",
      params: data,
      showloading: false,
      cancelToken:  setCancelSource()
    });
    }  

    //复审查询
  export  function  queryRArDataApi(data)  {
    return  request({
      url:  "/person/annualreview/queryRArData",
      method:  "get",
      params: data,
      showloading: false,
      cancelToken:  setCancelSource()
    });
    }
//////////////////////////////////////////////人员培训/////////////////////////////////////
export  function  trainInfoPageListApi(data)  {//培训列表查询
  return  request({
    url:  "/person/trainInfo/trainInfoPageList",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  addTrainInfoApi(data)  {//新增培训
  return  request({
    url:  "/person/trainInfo/addTrainInfo",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  deleteTrainInfoByIdApi(educationId)  { //删除考试
  return  request({
  url:  "/person/trainInfo/deleteTrainInfoById/"+educationId,
  method:  "get",
  data: vm.$qs.stringify(educationId),
  showloading: false,
  cancelToken:  setCancelSource()
  });
}
export  function  updateTrainInfoApi(data)  {//修改
  return  request({
    url:  "/person/trainInfo/updateTrainInfo",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  getTrainListApi(data)  {
  return  request({
    url:  "/person/train/trainPageList",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  addTrainApi(data)  {
return  request({
  url:  "/person/train/addTrain",
  method:  "get",
  params: data,
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  updateTrainApi(data)  {
return  request({
  url:  "/person/train/updateTrain",
  method:  "get",
  params: data,
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  deleteTrainApi(ids)  {
return  request({
  url:  "/person/train/deleteTrain/"+ids,
  method:  "get",
  data: vm.$qs.stringify(ids),
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  deleteTrainByIdApi(trainId)  {
    return  request({
    url:  "/person/train/deleteTrainById/"+trainId,
    method:  "get",
    data: vm.$qs.stringify(trainId),
    showloading: false,
    cancelToken:  setCancelSource()
    });
}
//////////////////////////////////////////////人员考试/////////////////////////////////////
export  function  examInfoPageListApi(data)  {//考试列表查询
  return  request({
    url:  "/person/examInfo/examInfoPageList",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  addExamInfoApi(data)  {//新增考试
  return  request({
    url:  "/person/examInfo/addExamInfo",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  deleteExamInfoByIdApi(examId)  { //删除考试
  return  request({
  url:  "/person/examInfo/deleteExamInfoById/"+examId,
  method:  "get",
  data: vm.$qs.stringify(examId),
  showloading: false,
  cancelToken:  setCancelSource()
  });
}
export  function  updateExamInfoApi(data)  {//修改
  return  request({
    url:  "/person/examInfo/updateExamInfo",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
//////////////////////////////////////////////调入调出/////////////////////////////////////
export  function  getStaffInListApi(data)  {//调入查询列表
  return  request({
    url:  "/person/transfer/getTranInList",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  acceptTransferApi(data)  {//接受调动
  return  request({
    url:  "/person/transfer/receiveTransfer",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}

export  function  refuseTransferApi(data)  {//拒绝调动
  return  request({
    url:  "/person/transfer/refuseTransfer/",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  cancelTransferApi(data)  {//取消调动
  return  request({
    url:  "/person/transfer/recallTransfer",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  getStaffOutListApi(data)  {//调出
  return  request({
    url:  "/person/transfer/getTranOutList",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
//////////////////////////////////////////////执法号段/////////////////////////////////////
export  function  getEnfListApi(data)  {//执法号段查询
  return  request({
    url:  "/person/enfSection/enfSectionPageList",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  getEnfAddApi(data)  {//添加
  return  request({
    url:  "/person/enfSection/addEnfSection",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}

export  function  getEnfUpdateApi(data)  {//修改
  return  request({
    url:  "/person/enfSection/updateEnfSection",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  getEnfDeleteAllApi(id)  {//删除
  return  request({
    url:  "/person/enfSection/deleteEnfSectionById/"+id,
    method:  "get",
    params: vm.$qs.stringify(id),
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
//////////////////////////////////////////////人员系统管理/////////////////////////////////////
export  function  paramListApi(data)  {//参数列表查询
  return  request({
    url:  "/person/params/paramsPageList",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  paramUpdateApi(data)  {//参数修改
  return  request({
    url:  "/person/params/updateParams",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}

export  function  stationListApi(data)  {//岗位列表
  return  request({
    url:  "/person/station/perStationPageList",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  stationAddApi(data)  {//岗位添加
  return  request({
    url:  "/person/station/addPerStation",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  stationUpdateApi(data)  {//岗位修改
  return  request({
    url:  "/person/station/updatePerStation",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  stationDeleteByIdApi(id)  {//岗位修改
  return  request({
    url:  "/person/station/deletePerStationById/"+id,
    method:  "get",
    params: id,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
 //流程审批
export  function  queryByOidApi(data)  {//岗位修改
  return  request({
    url:  "/person/approveProcess/queryByOid",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}

//查询审批列表queryApproveProcessPageApi
export  function  queryApproveProcessPageApi(data)  {//岗位修改
  return  request({
    url:  "/person/approveProcess/queryApproveProcessPage",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
//修改流程审批
export  function  updateApApi(data)  {
  return  request({
    url:  "/person/approveProcess/updateAP",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}

// 全部初始化流程
export function initAllApprove(){
  return  request({
    url:  "/person/approveProcess/genDefaultProcess",
    method:  "get",
    showloading: false,
    cancelToken:  setCancelSource()
  });
}

// 判断是否可以编辑
export function personEdabled(data){
  return  request({
    url:  "/person/person/isCanUpdate",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}

// 上传证明材料文件
export function uploadMaterial(data){
  return  request({
    url:  "/system/sys/file/uploadCommon",
    method:  "POST",
    data: data,
    contentType: 'multipart/form-data;',
    showloading: false,
    cancelToken:  setCancelSource(),
  });
}

// 保存上传文件到person
export function savePersonMaterial(data){
  return  request({
    url:  "/person/person/updateFile",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource(),
  });
}

// 保存人员照片
export function savePersonPhoto(data){
  return  request({
    url:  "/person/person/uploadPic",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource(),
  });
}

// 获取所有机构树
export function getAllOrigin(){
  return  request({
    url:  "/system/sys/organ/getAllOrgan",
    method:  "get",
    showloading: false,
    cancelToken:  setCancelSource(),
  });
}

//任务配置查询配置
export function getScheduleJobPageApi(data){
  return  request({
    url:  "/exam/appQuartz/queryAppQuartzPage",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource(),
  });
}
//新增任务
export function addScheduleJobApi(data){
  return  request({
    url:  "/exam/appQuartz/addAppQuartz",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource(),
  });
}
//修改考试配置
export function updateScheduleJobApi(data){
  return  request({
    url:  "/exam/appQuartz/updateAppQuartz",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource(),
  });
}
//删除考试配置
export function deleteScheduleJobApi(data){
  return  request({
    url:  "/exam/appQuartz/deleteAppQuartzById",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource(),
  });
}
//暂停
export function pausejobApi(data){
  return  request({
    url:  "/exam/appQuartz/pausejob",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource(),
  });
}
//恢复
export function  resumejobApi(data){
  return  request({
    url:  "/exam/appQuartz/resumejob",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource(),
  });
}
//全部暂停
export function pauseAllJobApi(){
  return  request({
    url:  "/exam/appQuartz/pauseAllJob",
    method:  "get",
    showloading: false,
    cancelToken:  setCancelSource(),
  });
}
//全部恢复
export function repauseAllJobApi(){
  return  request({
    url:  "/exam/appQuartz/repauseAllJob",
    method:  "get",
    showloading: false,
    cancelToken:  setCancelSource(),
  });
}
//////////////////////////江西个性化//////////////////

//考试列表查询
export function getJxExamListApi(data){
  return  request({
    url:  "/person/jxStatistics/getExamList",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
//考试信息查询
export function getJxExamMesageApi(data){
  return  request({
    url:  "/person/jxStatistics/examMesage",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}


//培训列表查询
export function getJxTrainListApi(data){
  return  request({
    url:  "/person/jxStatistics/getTrainList",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}


//培训信息查询
export function getJxTrainMessageApi(data){
  return  request({
    url:  "/person/jxStatistics/trainMessage",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
///////////////人员统计/////////////////////
//按年龄段统计
export function statisticByAgeApi(data){
  return  request({
    url:  "/person/statistics/byAge",
    method:  "get",
    showloading: false,
    params: data,
    cancelToken:  setCancelSource()
  });
}
//按分配渠道统计
export function statisticByChannelApi(data){
  return  request({
    url:  "/person/statistics/byChannel",
    method:  "get",
    showloading: false,
    params: data,
    cancelToken:  setCancelSource()
  });
}
//按年度新增
export function statisticByYearAddApi(data){
  return  request({
    url:  "/person/statistics/byYearAdd",
    method:  "get",
    showloading: false,
    params: data,
    cancelToken:  setCancelSource()
  });
}

//按文化程度
export function statisticByEducationLevelApi(data){
  return  request({
    url:  "/person/statistics/byEducationLevel",
    method:  "get",
    showloading: false,
    params: data,
    cancelToken:  setCancelSource()
  });
}

//按执法门类
export function statisticByBranchApi(data){
  return  request({
    url:  "/person/statistics/byBranch",
    method:  "get",
    showloading: false,
    params: data,
    cancelToken:  setCancelSource()
  });
}

//按专业
export function statisticByMajorApi(data){
  return  request({
    url:  "/person/statistics/byMajor",
    method:  "get",
    showloading: false,
    params: data,
    cancelToken:  setCancelSource()
  });
}
/////版本更新
//新增版本信息
export function addVersionApi(data){
  return  request({
    url:  "/system/sys/editionUpdate/addEditionMsg",
    method:  "get",
    showloading: false,
    params: data,
    cancelToken:  setCancelSource()
  });
}

//修改版本信息
export function updateVersionApi(data){
  return  request({
    url:  "/system/sys/editionUpdate/updateEditionMsg",
    method:  "get",
    showloading: false,
    params: data,
    cancelToken:  setCancelSource()
  });
}

//删除版本信息
export function deleteVersionApi(data){
  return  request({
    url:  "/system/sys/editionUpdate/delEditionMsg",
    method:  "get",
    showloading: false,
    params: data,
    cancelToken:  setCancelSource()
  });
}

//查询列表
export function getVersionApi(data){
  return  request({
    url:  "/system/sys/editionUpdate/selEditionMsgPage",
    method:  "get",
    showloading: false,
    params: data,
    cancelToken:  setCancelSource()
    
  });
}
