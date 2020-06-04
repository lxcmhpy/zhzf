import  request  from  "@/common/js/request";
import  {setCancelSource}  from  "@/common/js/cancelToken";
import  Vue  from  "vue";

let  vm  =  new  Vue();


//获取用户下的所有机构
export  function  getAllOrganApi()  {
  return  request({
    url:  "/system/sys/organ/organTreeByCurrUser",
    method:  "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource()
  });
}

//获取选中机构下的机构
export  function  getSelectOrganApi(data)  {
  return  request({
    url:  "/system/sys/organ/queryOrganPage",
    method:  "get",
    params:  data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource()
  });
}

//新增机构
export  function  addOrganApi(data)  {
  let  addOrganForm  =  {
    id:  data.id,
    name:  data.name,
    pidName:  data.pidName,
    pid:  data.pid,
    code:  data.code,
    organType:  data.organType,
    accessToAuthority:  data.accessToAuthority,
    organNature:  data.organNature,
    isIndependentEnforce:  data.isIndependentEnforce,
    address:  data.address,
    zipCode:  data.zipCode,
    telephone:  data.telephone,
    contactor:  data.contactor,
    fundingSource:  data.fundingSource,
    legalBasis:  data.legalBasis,
    mainPowers:  data.mainPowers,
    bank:data.bank,
    account:data.account,
    reconsiderationOrgan1:data.reconsiderationOrgan1,
    reconsiderationOrgan2:data.reconsiderationOrgan2,
    enforcementOrgan1:data.enforcementOrgan1,
    enforcementOrgan2:data.enforcementOrgan2,
  };
  let  data2  =  vm.$qs.stringify(addOrganForm);
  return  request({
    url:  "/system/sys/organ/saveOrUpdateOrgan",
    method:  "post",
    data:  data2,
    showloading: true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource()
  });
}

//机构详情
export  function  getOrganDetailApi(data)  {
  return  request({
    url:  "/system/sys/organ/findById/"  +  data.id,
    method:  "get",
    //  params:data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource()
  });
}

//删除机构
export  function  deleteOrganApi(data)  {
  console.log("123",data);
  return  request({
    url:  "/system/sys/organ/delete/"  +  data,
    method:  "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource()
  });
}

//验证机构名称是否重复
export  function  hasOrganNameApi(name)  {
  return  request({
    url:  "/system/sys/organ/findByName/"  +  name,
    method:  "get",
    showloading:  true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource()
  });
}
//获取本机构及下级机构
export  function  getCurrentAndNextOrganApi(data)  {
  return  request({
    url:  "/system/sys/organ/findAllSubListByOrgId/"+data,
    method:  "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource()
  });
}






//用户管理      获取用户列表
export  function  getUserListApi(data)  {
  console.log('用户',  data);
  return  request({
    url:  "/system/sys/user/list",
    method:  "get",
    params:  data,
    showloading: true,
    loadingType:'loadMain',
    cancelToken:  setCancelSource()
  });
}
//用户管理      新增用户
export  function  addUserApi(data)  {
  console.log('用户',  vm.$qs.stringify(data));
  console.log(data)
  return  request({
    url:  "/system/sys/user/addUser",
    method:  "POST",
    data:vm.$qs.stringify(data),
    showloading: true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource()
  });
}
//用户管理   修改用户
export function updateUserApi(data) {
  debugger
  console.log('用户', vm.$qs.stringify(data));
  console.log(data);

  return request({
    url: "/system/sys/user/updateUser",
    method: "POST",
    data: vm.$qs.stringify(data),
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}




//用户管理   id删除数据
export function getUserdeleteApi(id) {
  console.log(id)
  return request({
    url: "/system/sys/user/delete/" + id,
    method: "GET",
    data: vm.$qs.stringify(id),
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//用户管理   批量删除数据
export function getUserdeletesApi(id) {
  console.log(id)
  return request({
    url: "/system/sys/user/deletes",
    method: "GET",
    data: vm.$qs.stringify(id),
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}


//用户管理   密码初始化
export function getUserresetApi(params) {
  // console.log(id)
  // return request({
  //   url: "/system/sys/user/reset/" + id,
  //   method: "GET",
  //   data: vm.$qs.stringify(id),
  //   showloading: true,
  //   loadingType:'loadPart',
  //   cancelToken: setCancelSource()
  // });

  let data = vm.$qs.stringify({
    username: params.username,
    nickName: params.nickName,
    enforceNo: params.enforceNo,
  })
  console.log(data)
  return request({
    url: "/system/sys/user/resetPassWord",
    method: "POST",
    contentType: 'multipart/form-data',
    data:data,
    showloading: false,
    baseUrlType:  'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}
//验证用户名是否重复
export  function  hasUsernameApi(name)  {
  return request({
    url: "/system/sys/user/findExistByUserName/" + name,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}


//用户绑定角色
export function userBindRoleApi(data) {
  console.log(data);
  return request({
    url: "/system/sys/user/bindRoles",
    method: "GET",
    params: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//日志管理
export function getloglistApi(data) {
  console.log("log",data);
  return request({
    url: "/system/sys/log/list",
    method: "GET",
    params: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}


//获取用户绑定的角色
export function queryUserBindRoleApi(data) {
  console.log(data);
  return request({
    url: "/system/sys/user/findBindRolesByUserId/" + data,
    method: "GET",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}


//获取角色列表
export function getRolesApi(data) {
  console.log(data);
  return request({
    url: "/system/sys/role/all",
    method: "get",
    params:data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//新增角色
export function addRoleApi(data) {
  let data2 = vm.$qs.stringify(data);
  return request({
    url: "/system/sys/role/add",
    method: "post",
    data: data2,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//删除角色
export function deleteRoleApi(data) {
  return request({
    url: "/system/sys/role/delete/"+data,
    method: "get",
    // params: {id: data},
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//修改角色
export function editRoleApi(data) {
  let params = {
    id: data.id,
    name: data.name,
    roleGroup:data.roleGroup,
    description: data.description
  }
  let data2 = vm.$qs.stringify(params);
  return request({
    url: "/system/sys/role/update",
    method: "post",
    data: data2,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//获取角色下已经绑定的菜单
export function getRoleBindMenuApi(data) {
  console.log(data);
  return request({
    url: "/system/sys/role/queryRoleMenu/" + data,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//获取角色下已经绑定的机构
export function getRoleBindOrganApi(data) {
  return request({
    url: "/system/sys/role/queryRoleOrgan/"+data,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//角色绑定菜单
export function roleBindMenuApi(data) {
  let params = {
    roleId: data.roleId,
    permissionIds: data.permissionIds.join(',')
  }
  console.log("角色绑定菜单params",params)
  let params2 = vm.$qs.stringify(params);
  return request({
    url: "/system/sys/role/bindMenu",
    method: "post",
    data: params2,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//角色绑定机构
export function roleBindOrganApi(data) {
  let params = {
    roleId: data.roleId,
    organIds: data.organIds.join(',')
  }
  console.log(params);
  let params2 = vm.$qs.stringify(params);
  return request({
    url: "/system/sys/role/bindOrgan",
    method: "post",
    data: params2,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}


//获取机构下绑定的角色
export function getOrganBindRoleApi(data) {
  return request({
    url: "/system/sys/role/queryRoleByOrganId/" + data,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//获取选中机构下的部门
export function getDepartmentsApi(data) {
  console.log('部门', data);
  return request({
    url: "/system/sys/department/list",
    method: "get",
    params: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}


//获取选中机构下的所有部门   没有分页
export function getDepartmentsNoPageApi(data) {
  console.log('部门', data);
  return request({
    url: "/system/sys/department/all",
    method: "get",
    params: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//新增 修改 部门
export function addDepartmentApi(data) {
  let departmentForm = {
    id: data.id,
    name: data.name,
    oid: data.oid,
    pidName: data.pidName,
    sortOrder: data.sortOrder,
    status: data.status == true ? 0 : 1
  };
  console.log(departmentForm)
  let data2 = vm.$qs.stringify(departmentForm);
  return request({
    url: "/system/sys/department/saveOrUpdateDepartment",
    method: "post",
    data: data2,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//验证部门名称是否重复
export function hasDepartmentNameApi(data) {
  let params = {
    oid: data.oid,
    name: data.name
  }
  console.log(params);
  return request({
    url: "/system/sys/department/findDepartmentByName/" + data.oid + "/" + data.name,
    method: "get",
    // params:params,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//删除部门
export function deleteDepartmentApi(data) {
  console.log('删除部门', data);
  return request({
    url: "/system/sys/department/delete/" + data,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//获取菜单列表
export function getAllMenuListApi() {
  return request({
    url: "/system/sys/permission/getAllList",
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()

  });
}


//获取权限树
export function getTreePermissionApi() {
  return request({
    url: "/system/sys/permission/getTreePermission",
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()

  });
}

//获取数据字典列表
export function getDictListApi(data) {
  console.log(data);
  return request({
    url: "/system/sys/drawer/findAllByPage",
    method: "get",
    params: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//新增 修改 字典 和字典值
export function addDictApi(data) {
  let dictForm = {
    id: data.id,
    pid: data.pid,
    name: data.name,
    notes: data.notes,
    sort: data.sort,
    status: data.status == true ? 0 : 1
  };
  console.log('添加字典', dictForm)
  let data2 = vm.$qs.stringify(dictForm);
  return request({
    url: "/system/sys/drawer/addOrUpdate",
    method: "post",
    data: data2,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//删除部门
export function deleteDictApi(data) {
  console.log('删除部门', data);
  return request({
    url: "/system/sys/drawer/delete/" + data,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//获取字典详情所有字典值
export function getAllDictListDetailApi(id) {
  return request({
    url: "/system/sys/drawer/findAllByPid/" + id,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//获取字典详情有效字典值
export function getDictListDetailApi(id) {
  return request({
    url: "/system/sys/drawer/findAllDrawerById/" + id,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//获取字典详情  字典值
export function getDictListDetailByNameApi(name) {
  return request({
    url: "/system/sys/drawer/findAllDrawerByName/" + name,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}


//新增、修改菜单
export function addPermissionApi(data) {
  let _data = vm.$qs.stringify(data);
  return request({
    url: "/system/sys/permission/add",
    method: "post",
    data: _data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//删除菜单
export function deletePermissionApi(data) {
  return request({
    url: "/system/sys/permission/deleteById/"+data,
    method: "get",
    // params: {
    //   id: data
    // },
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//获取本机构下的所有用户（不分页）
export  function  queryUserListByOrganIdApi(organId)  {
  return  request({
      url:  "/system/sys/user/queryUserListByOrganId/"+organId,
      method:  "get",
      showloading: true,
      loadingType:'loadPart',
      cancelToken:  setCancelSource()
  });
}

/**------------长软start---------- */
//根据用户id获取用户的机构id
export  function  getOrganIdApi(data)  {
    return  request({
        url:  "/system/sys/user/findById/"  +  data.id,
        method:  "get",
        //  params:data,
        showloading: true,
        loadingType:'loadPart',
        cancelToken:  setCancelSource()
    });
}
/**------------长软end---------- */

//根据用户id和标记查询历史输入记录
export  function  findHistoryBySignApi(userId,sign)  {
  return  request({
    url:  "/case/doc/inputHistroy/findById/"  +  userId+"/"+sign,
    method:  "get",
    //  params:data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource()
  });
}
//通过机构ID查找路线名称
export function findRouteManageByOrganIdApi(data) {
  return  request({
    url:  "/case/doc/routeManagement/findRouteManageByOrganId/"+data.organId,
    method:  "post",
    showloading: false,
    params:data,
    cancelToken:  setCancelSource(),
  });
}

//获取案件编号配置数据
export function getCaseNumberApi(data) {
  console.log(data);
  return request({
    url: "/case/doc/caseNumber/findAllByPage",
    method: "get",
    params: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//查询未配置案件字的机构
export function getOrganNotInCaseNumberApi() {
  return request({
    url: "/system/sys/organ/getOrganNotInCaseNumber",
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//新增 修改 案件编号配置
export function addCaseNumberApi(data) {
  let caseNumberForm = {
    id: data.id,
    organId: data.organId,
    organName: data.organName,
    caseWord: data.caseWord,
    digit: data.digit,
    onlineNumberStart: data.onlineNumberStart
  };
  console.log('添加字典', caseNumberForm)
  let data2 = vm.$qs.stringify(caseNumberForm);
  return request({
    url: "/case/doc/caseNumber/create",
    method: "post",
    data: data2,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//删除案件字的机构配置
export function deleteCaseNumberApi(id) {
  return request({
    url: "/case/doc/caseNumber/deleteById/"+id,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//分页获取违法行为列表
export function getCaseCauseListApi(data) {
  console.log(data);
  return request({
    url: "/bnslaw/sys/bnslawCause/findCaseCauseByPage",
    method: "get",
    params: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//获取案件类型列表
export function getCaseTypesApi(data) {
  console.log(data);
  return request({
    url: "/case/caseTemplate/caseType/list",
    method: "get",
    params:data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//根据条件分页查询法规
export function getBnsLawListApi(data) {
  console.log(data);
  return request({
    url: "/bnslaw/sys/bnslawCause/findBnsLawByPage",
    method: "get",
    params: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//添加或修改案件类型
export function addOrUpdateCaseTypeApi(data) {
  console.log(data);
  return request({
    url: "/case/caseTemplate/caseType/saveOrUpdateCaseType",
    method: "get",
    params:data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//获取执法门类
export function getLawCategoryApi(data) {
  console.log(data);
  return request({
    url: "/case/caseTemplate/lawCategory/getLawCategoryListVo",
    method: "get",
    params: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//删除案件类型
export function deleteCaseTypeApi(data) {
  return request({
    url: "/case/caseTemplate/caseType/delete/"+data,
    method: "get",
    // params: {id: data},
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//添加/修改法规
export function addBnsLawApi(data) {
  data = vm.$qs.stringify(data);
  return request({
    url: "/bnslaw/sys/bnslawCause/addOrUpdateBnsLaw",
    method: "post",
    data: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//删除法规
export function deleteBnslawApi(data) {
  return request({
    url: "/bnslaw/sys/bnslawCause/deleteBnsLawById/"+data,
    method: "get",
    params: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//新增 修改 违法行为
export function addCaseCauseApi(data) {
  let _data = vm.$qs.stringify(data);
  return request({
    url: "/bnslaw/sys/bnslawCause/addOrUpdateCaseCause",
    method: "post",
    data: _data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//添加/修改法条
export function addLawRegulationsApi(data) {
  data = vm.$qs.stringify(data);
  return request({
    url: "/bnslaw/sys/bnslawCause/addOrUpdateLawRegulations",
    method: "post",
    data: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//添加/修改处罚依据
export function addLawPunishmentApi(data) {
  data = vm.$qs.stringify(data);
  return request({
    url: "/bnslaw/sys/bnslawCause/addOrUpdateLawPunishment",
    method: "post",
    data: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//添加/修改认定依据
export function addeLawCognizanceApi(data) {
  data = vm.$qs.stringify(data);
  return request({
    url: "/bnslaw/sys/bnslawCause/addOrUpdateLawCognizance",
    method: "post",
    data: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//违法行为绑定法条
export function bindCauseLawRegulationsApi(data) {
  data = vm.$qs.stringify(data);
  return request({
    url: "/bnslaw/sys/bnslawCause/bindCauseLawRegulations",
    method: "post",
    data: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//删除法条
export function deleteLawRegulationsApi(data) {
  return request({
    url: "/bnslaw/sys/bnslawCause/deleteLawRegulationsById/"+data,
    method: "get",
    params: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//根据条件分页查询认定依据
export function findLawCognizanceByPageApi(data) {
  return request({
    url: "/bnslaw/sys/bnslawCause/findLawCognizanceByPage",
    method: "get",
    params: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//根据条件分页查询处罚依据
export function findLawPunishmentByPageApi(data) {
  return request({
    url: "/bnslaw/sys/bnslawCause/findLawPunishmentByPage",
    method: "get",
    params: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//根据违法行为id查询绑定的法条
export function getlawRegulationsListByActionidApi(data) {
  return request({
    url: "/bnslaw/sys/bnslawCause/findLawRegulationsByCauseId/"+data,
    method: "get",
    params: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//根据条件分页查询法条
export function getlawRegulationsListApi(data) {
  console.log("data",data);
  return request({
    url: "/bnslaw/sys/bnslawCause/findLawRegulationsByPage",
    method: "get",
    params: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//解除绑定法条
export function unbindCauseLawRegulationsApi(data) {
  data = vm.$qs.stringify(data);
  return request({
    url: "/bnslaw/sys/bnslawCause/unbindCauseLawRegulations",
    method: "post",
    data: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//删除违法行为及中间表
export function deleteCaseCauseByIdApi(data) {
  console.log("data",data);
  return request({
    url: "/bnslaw/sys/bnslawCause/deleteCaseCauseById/"+data,
    method: "get",
    // params: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//根据法规id查询法规信息
export function getBnsLawByIdApi(data) {
  return request({
    url: "/bnslaw/sys/bnslawCause/findBnsLawById/"+data.id,
    method: "get",
    // params: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//获取所有流程
export function getAllFlowApi(data) {
  console.log(data);
  return request({
    url: "/case/caseTemplate/flow/queryFlowCondition",
    method: "get",
    params:data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//根据条件查询法规信息
export function getBnsLawByFormApi(data) {
  return request({
    url: "/bnslaw/sys/bnslawCause/queryListVoByBnslaw",
    method: "get",
    params: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//删除认定依据
export function deleteLawCognizanceByIdApi(id) {
  return request({
    url: "/bnslaw/sys/bnslawCause/deleteLawCognizanceById/"+id,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//获取案件类型列表
export function getRoadLcDeployApi(data) {
  console.log(data);
  return request({
    url: "/case/road/roadLcDeploy/list",
    method: "get",
    params:data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//删除处罚依据
export function deleteLawPunishmentByIdApi(id) {
  return request({
    url: "/bnslaw/sys/bnslawCause/deleteLawPunishmentById/"+id,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}


//通过id查询认定依据
export function getLawCognizanceByIdApi(id) {
  return request({
    url: "/bnslaw/sys/bnslawCause/findLawCognizanceById/"+id,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//通过id查询处罚依据
export function getLawPunishmentByIdApi(id) {
  return request({
    url: "/bnslaw/sys/bnslawCause/findLawPunishmentById/"+id,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//添加或修改路产配置
export function addOrUpdateRoadLcDeployApi(data) {
  console.log(data);
  return request({
    url: "/case/road/roadLcDeploy/saveOrUpdateRoadLcDeploy",
    method: "get",
    params:data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//用户转执法人员
export function saveLawOfficelApi(data) {
  console.log(data);
  return request({
    url: "/case/caseTemplate/lawOfficer/userConvertLawOfficer",
    method: "post",
    params:data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//获取路线列表
export function getRouteListApi(data) {
  console.log(data);
  return request({
    url: "/case/doc/routeManagement/list",
    method: "get",
    params:data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//添加或修改路线信息
export function addOrUpdateRouteApi(data) {
  console.log(data);
  return request({
    url: "/case/doc/routeManagement/saveOrUpdateRoute",
    method: "get",
    params:data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//删除路线
export function deleteRouteApi(id) {
  return request({
    url: "/case/doc/routeManagement/delete/"+id,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//获取路线列表
export function getSectionListApi(data) {
  console.log(data);
  return request({
    url: "/case/doc/sectionManagement/list",
    method: "get",
    params:data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//添加或修改路段信息
export function addOrUpdateSectionApi(data) {
  console.log(data);
  return request({
    url: "/case/doc/sectionManagement/saveOrUpdateSection",
    method: "get",
    params:data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//删除路段
export function deleteSectionApi(id) {
  return request({
    url: "/case/doc/sectionManagement/delete/"+id,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//删除自由裁量权
export function deleteDiscretionByIdApi(id) {
  return request({
    url: "/bnslaw/sys/bnslawCause/deleteDiscretionById/"+id,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//分页查找自由裁量权
export function getDiscretionListApi(data) {
  console.log("data",data);
  return request({
    url: "/bnslaw/sys/bnslawCause/findDiscretionPageByForm",
    method: "get",
    params: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//添加、修改自由裁量权
export function addDiscretionApi(data) {
  data = vm.$qs.stringify(data);
  return request({
    url: "/bnslaw/sys/bnslawCause/addOrUpdateDiscretion",
    method: "post",
    data: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//获取违法行为列表
export function getCaseCauseListVoApi(data) {
  console.log(data);
  return request({
    url: "/bnslaw/sys/bnslawCause/findCaseCauseByList",
    method: "get",
    params: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
