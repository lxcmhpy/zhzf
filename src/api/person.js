import  request  from  "@/js/request";
import  {setCancelSource}  from  "@/js/cancelToken";
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
      showloading:  true,
      cancelToken:  setCancelSource()
    });
}
//添加用户信息
export  function  addPersonApi(data)  {
  return  request({
    url:  "/person/addPerson",
    method:  "get",
    params: data,
    showloading:  true,
    cancelToken:  setCancelSource()
  });
}

//修改用户用户信息
export  function  updatePersonApi(data)  {
  return  request({
    url:  "/person/updatePerson",
    method:  "get",
    params: data,
    showloading:  true,
    cancelToken:  setCancelSource()
  });
}

//删除所选的所有用户信息
export  function  deletePersonApi(ids)  {
  return  request({
    url:  "/person/deletePerson/"+ids,
    method:  "get",
    data: vm.$qs.stringify(ids),
    showloading:  true,
    cancelToken:  setCancelSource()
  });
}

//根据id删除用户用户信息
export  function  deletePersonByIdApi(personId)  {
  return  request({
    url:  "/person/deletePersonById/"+personId,
    method:  "get",
    data: vm.$qs.stringify(personId),
    showloading:  true,
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
    showloading:  true,
    cancelToken:  setCancelSource()
  });
}
//添加
export  function  addAwardApi(data)  {
return  request({
  url:  "/award/addAward",
  method:  "get",
  params: data,
  showloading:  true,
  cancelToken:  setCancelSource()
});
}

//修改用户用户信息
export  function  updateAwardApi(data)  {
return  request({
  url:  "/award/updateAward",
  method:  "get",
  params: data,
  showloading:  true,
  cancelToken:  setCancelSource()
});
}

//删除所选的所有用户信息
export  function  deleteAwardApi(ids)  {
return  request({
  url:  "/award/deleteAward/"+ids,
  method:  "get",
  data: vm.$qs.stringify(ids),
  showloading:  true,
  cancelToken:  setCancelSource()
});
}

//根据id删除用户用户信息
export  function  deleteAwardByIdApi(awardId)  {
return  request({
  url:  "/award/deleteAwardById/"+awardId,
  method:  "get",
  data: vm.$qs.stringify(awardId),
  showloading:  true,
  cancelToken:  setCancelSource()
});
}
/////////////////////////////人员奖励end///////////////////////////////
/////////////////////////////人员教育begin///////////////////////////////
//条件查询
export  function  getEducationListApi(data)  {
  return  request({
    url:  "/education/educationPageList",
    method:  "get",
    params: data,
    showloading:  true,
    cancelToken:  setCancelSource()
  });
}
//添加
export  function  addEducationApi(data)  {
return  request({
  url:  "/education/addEducation",
  method:  "get",
  params: data,
  showloading:  true,
  cancelToken:  setCancelSource()
});
}

//修改用户用户信息
export  function  updateEducationApi(data)  {
return  request({
  url:  "/education/updateEducation",
  method:  "get",
  params: data,
  showloading:  true,
  cancelToken:  setCancelSource()
});
}

//删除所选的所有用户信息
export  function  deleteEducationApi(ids)  {
return  request({
  url:  "/education/deleteEducation/"+ids,
  method:  "get",
  data: vm.$qs.stringify(ids),
  showloading:  true,
  cancelToken:  setCancelSource()
});
}

//根据id删除用户用户信息
export  function  deleteEducationByIdApi(educationId)  {
return  request({
  url:  "/education/deleteEducationById/"+educationId,
  method:  "get",
  data: vm.$qs.stringify(educationId),
  showloading:  true,
  cancelToken:  setCancelSource()
});
}
//查询人员证件信息
export  function  getCertInfoListMoudledApi(data)  {
  return  request({
    url:  "/perCert/perCertPageList",
    method:  "get",
    data: data,
    showloading:  true,
    cancelToken:  setCancelSource()
  });
}
//查询人员调岗信息
export  function  getAdjustingPostsMoudledApi(data)  {
  return  request({
    url:  "/transfer/transferPageList",
    method:  "get",
    data: data,
    showloading:  true,
    cancelToken:  setCancelSource()
  });
}
//查询人员审批信息
export  function  getApproveMoudledApi(data)  {
  return  request({
    url:  "/approve/detailApprovePageList",
    method:  "get",
    data: data,
    showloading:  true,
    cancelToken:  setCancelSource()
  });
}

//查询人员年审信息
export  function  getAnnualReviewMoudledApi(data)  {
  return  request({
    url:  "/annualreview/annualreviewPageList",
    method:  "get",
    data: data,
    showloading:  true,
    cancelToken:  setCancelSource()
  });
}