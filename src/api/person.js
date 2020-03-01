import  request  from  "@/common/js/request";
import  {setCancelSource}  from  "@/common/js/cancelToken";
import  Vue  from  "vue";

//执法人员管理系统接口映射
let  vm  =  new  Vue();

//后台查询缓存中的数据字典的值begin
export function getDictInfoByCodeApi(pid){
  return request({
    url: "/cache/dictInfoById/"+pid,
    method: "get",
    params: vm.$qs.stringify(pid),
    showloading: false,
    cancelToken: setCancelSource()
  })
}
export function getDictInfoAllApi(data){
  return request({
    url: "/cache/dictInfoAll",
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
//后台查询缓存中的数据字典的值end

//获取用户所有的用户信息
export  function  getAllPersonApi(data)  {
    return  request({
      url:  "/person/personPageList",
      method:  "get",
      params: data,
      showloading: false,
      cancelToken:  setCancelSource()
    });
}
//添加用户信息
export  function  addPersonApi(data)  {
  return  request({
    url:  "/person/addPerson",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}

//修改用户用户信息
export  function  updatePersonApi(data)  {
  return  request({
    url:  "/person/updatePerson",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}

//删除所选的所有用户信息
export  function  deletePersonApi(ids)  {
  return  request({
    url:  "/person/deletePerson/"+ids,
    method:  "get",
    data: vm.$qs.stringify(ids),
    showloading: false,
    cancelToken:  setCancelSource()
  });
}

//根据id删除用户用户信息
export  function  deletePersonByIdApi(personId)  {
  return  request({
    url:  "/person/deletePersonById/"+personId,
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
    url:  "/award/awardPageList",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
//添加
export  function  addAwardApi(data)  {
return  request({
  url:  "/award/addAward",
  method:  "get",
  params: data,
  showloading: false,
  cancelToken:  setCancelSource()
});
}

//修改用户用户信息
export  function  updateAwardApi(data)  {
return  request({
  url:  "/award/updateAward",
  method:  "get",
  params: data,
  showloading: false,
  cancelToken:  setCancelSource()
});
}

//删除所选的所有用户信息
export  function  deleteAwardApi(ids)  {
return  request({
  url:  "/award/deleteAward/"+ids,
  method:  "get",
  data: vm.$qs.stringify(ids),
  showloading: false,
  cancelToken:  setCancelSource()
});
}

//根据id删除用户用户信息
export  function  deleteAwardByIdApi(awardId)  {
return  request({
  url:  "/award/deleteAwardById/"+awardId,
  method:  "get",
  data: vm.$qs.stringify(awardId),
  showloading: false,
  cancelToken:  setCancelSource()
});
}
/////////////////////////////人员教育begin///////////////////////////////
export  function  getEducationListApi(data)  {
  return  request({
    url:  "/education/educationPageList",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  addEducationApi(data)  {
return  request({
  url:  "/education/addEducation",
  method:  "get",
  params: data,
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  updateEducationApi(data)  {
return  request({
  url:  "/education/updateEducation",
  method:  "get",
  params: data,
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  deleteEducationApi(ids)  {
return  request({
  url:  "/education/deleteEducation/"+ids,
  method:  "get",
  data: vm.$qs.stringify(ids),
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  deleteEducationByIdApi(educationId)  {
return  request({
  url:  "/education/deleteEducationById/"+educationId,
  method:  "get",
  data: vm.$qs.stringify(educationId),
  showloading: false,
  cancelToken:  setCancelSource()
});
}
/////////////////////////////////////////////人员证件信息/////////////////////////////////////
export  function  getPerCertListApi(data)  {
    return  request({
      url:  "/perCert/perCertPageList",
      method:  "get",
      params: data,
      showloading: false,
      cancelToken:  setCancelSource()
    });
}
export  function  addPerCertApi(data)  {
  return  request({
    url:  "/perCert/addPerCert",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  updatePerCertApi(data)  {
  return  request({
    url:  "/perCert/updatePerCert",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  deletePerCertApi(ids)  {
  return  request({
    url:  "/perCert/deletePerCert/"+ids,
    method:  "get",
    data: vm.$qs.stringify(ids),
    showloading: false,
    cancelToken:  setCancelSource()
  });
}

export  function  deletePerCertByIdApi(certId)  {
  return  request({
    url:  "/perCert/deletePerCertById/"+certId,
    method:  "get",
    data: vm.$qs.stringify(certId),
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
///////////////////////////////////////////查询人员调岗信息//////////////////////////////////////
export  function  getTransferListApi(data)  {
  return  request({
    url:  "/transfer/transferPageList",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  addTransferApi(data)  {
return  request({
  url:  "/transfer/addTransfer",
  method:  "get",
  params: data,
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  updateTransferApi(data)  {
return  request({
  url:  "/transfer/updateTransfer",
  method:  "get",
  params: data,
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  deleteTransferApi(ids)  {
return  request({
  url:  "/transfer/deleteTransfer/"+ids,
  method:  "get",
  data: vm.$qs.stringify(ids),
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  deleteTransferByIdApi(transferId)  {
return  request({
  url:  "/transfer/deleteTransferById/"+transferId,
  method:  "get",
  data: vm.$qs.stringify(transferId),
  showloading: false,
  cancelToken:  setCancelSource()
});
}
///////////////////////////////////////////////////人员审批信息////////////////////////////////
export  function  getApproveListApi(data)  {
  return  request({
    url:  "/approve/approvePageList",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  addApproveApi(data)  {
return  request({
  url:  "/approve/addApprove",
  method:  "get",
  params: data,
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  updateApproveApi(data)  {
return  request({
  url:  "/approve/updateApprove",
  method:  "get",
  params: data,
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  deleteApproveApi(ids)  {
return  request({
  url:  "/approve/deleteApprove/"+ids,
  method:  "get",
  data: vm.$qs.stringify(ids),
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  deleteApproveByIdApi(approveId)  {
return  request({
  url:  "/approve/deleteApproveById/"+approveId,
  method:  "get",
  data: vm.$qs.stringify(approveId),
  showloading: false,
  cancelToken:  setCancelSource()
});
}

////////////////////////////////////////////////人员年审信息////////////////////////////////////
export  function  getAnnualreviewListApi(data)  {
  return  request({
    url:  "/annualreview/annualreviewPageList",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  addAnnualreviewApi(data)  {
return  request({
  url:  "/annualreview/addAnnualreview",
  method:  "get",
  params: data,
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  updateAnnualreviewApi(data)  {
return  request({
  url:  "/annualreview/updateAnnualreview",
  method:  "get",
  params: data,
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  deleteAnnualreviewApi(ids)  {
return  request({
  url:  "/annualreview/deleteAnnualreview/"+ids,
  method:  "get",
  data: vm.$qs.stringify(ids),
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  deleteAnnualreviewByIdApi(reviewId)  {
return  request({
  url:  "/annualreview/deleteAnnualreviewById/"+reviewId,
  method:  "get",
  data: vm.$qs.stringify(reviewId),
  showloading: false,
  cancelToken:  setCancelSource()
});
}
//////////////////////////////////////////////人员培训/////////////////////////////////////
export  function  getTrainListApi(data)  {
  return  request({
    url:  "/train/trainPageList",
    method:  "get",
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  });
}
export  function  addTrainApi(data)  {
return  request({
  url:  "/train/addTrain",
  method:  "get",
  params: data,
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  updateTrainApi(data)  {
return  request({
  url:  "/train/updateTrain",
  method:  "get",
  params: data,
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  deleteTrainApi(ids)  {
return  request({
  url:  "/train/deleteTrain/"+ids,
  method:  "get",
  data: vm.$qs.stringify(ids),
  showloading: false,
  cancelToken:  setCancelSource()
});
}
export  function  deleteTrainByIdApi(trainId)  {
    return  request({
    url:  "/train/deleteTrainById/"+trainId,
    method:  "get",
    data: vm.$qs.stringify(trainId),
    showloading: false,
    cancelToken:  setCancelSource()
    });
}
