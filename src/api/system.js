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
    mainPowers:  data.mainPowers
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
export function getUserresetApi(id) {
  console.log(id)
  return request({
    url: "/system/sys/user/reset/" + id,
    method: "GET",
    data: vm.$qs.stringify(id),
    showloading: true,
    loadingType:'loadPart',
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
  return request({
    url: "/system/sys/role/bindMenu",
    method: "get",
    params: params,
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
  return request({
    url: "/system/sys/role/bindOrgan",
    method: "post",
    data: params,
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

//获取字典详情  字典值
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