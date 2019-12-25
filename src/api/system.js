import  request  from  "@/js/request";
import  {setCancelSource}  from  "@/js/cancelToken";
import  Vue  from  "vue";

let  vm  =  new  Vue();


//获取用户下的所有机构
export  function  getAllOrganApi()  {
  return  request({
    url:  "/sys/organ/organTreeByCurrUser",
    method:  "get",
    showloading:  true,
    cancelToken:  setCancelSource()
  });
}

//获取选中机构下的机构
export  function  getSelectOrganApi(data)  {
  return  request({
    url:  "/sys/organ/queryOrganPage",
    method:  "get",
    params:  data,
    showloading:  true,
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
    url:  "/sys/organ/saveOrUpdateOrgan",
    method:  "post",
    data:  data2,
    showloading:  true,
    cancelToken:  setCancelSource()
  });
}

//机构详情
export  function  getOrganDetailApi(data)  {
  return  request({
    url:  "/sys/organ/findById/"  +  data.id,
    method:  "get",
    //  params:data,
    showloading:  true,
    cancelToken:  setCancelSource()
  });
}

//删除机构
export  function  deleteOrganApi(data)  {
  return  request({
    url:  "/sys/organ/delete/"  +  data,
    method:  "get",
    showloading:  true,
    cancelToken:  setCancelSource()
  });
}

//验证机构名称是否重复
export  function  hasOrganNameApi(name)  {
  return  request({
    url:  "/sys/organ/findByName/"  +  name,
    method:  "get",
    showloading:  false,
    cancelToken:  setCancelSource()
  });
}
//获取本机构及下级机构
export  function  getCurrentAndNextOrganApi(data)  {
  return  request({
    url:  "/sys/organ/findAllSubListByOrgId/"+data,
    method:  "get",
    showloading:  true,
    cancelToken:  setCancelSource()
  });
}






//用户管理      获取用户列表
export  function  getUserListApi(data)  {
  console.log('用户',  data);
  return  request({
    url:  "/sys/user/list",
    method:  "get",
    params:  data,
    showloading:  true,
    cancelToken:  setCancelSource()
  });
}
//用户管理      新增用户
export  function  addUserApi(data)  {
  console.log('用户',  vm.$qs.stringify(data));
  console.log(data)
  return  request({
    url:  "/sys/user/addUser",
    method:  "POST",
    data:vm.$qs.stringify(data),
    showloading:  true,
    cancelToken:  setCancelSource()
  });
}
//用户管理   修改用户
export function updateUserApi(data) {
  console.log('用户', vm.$qs.stringify(data));
  console.log(data);

  return request({
    url: "/sys/user/updateUser",
    method: "POST",
    data: vm.$qs.stringify(data),
    showloading: true,
    cancelToken: setCancelSource()
  });
}




//用户管理   id删除数据
export function getUserdeleteApi(id) {
  console.log(id)
  return request({
    url: "/sys/user/delete/" + id,
    method: "GET",
    data: vm.$qs.stringify(id),
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//用户管理   批量删除数据
export function getUserdeletesApi(id) {
  console.log(id)
  return request({
    url: "/sys/user/deletes",
    method: "GET",
    data: vm.$qs.stringify(id),
    showloading: true,
    cancelToken: setCancelSource()
  });
}


//用户管理   密码初始化
export function getUserresetApi(id) {
  console.log(id)
  return request({
    url: "/sys/user/reset/" + id,
    method: "GET",
    data: vm.$qs.stringify(id),
    showloading: true,
    cancelToken: setCancelSource()
  });
}
//验证用户名是否重复
export  function  hasUsernameApi(name)  {
  return request({
    url: "/sys/user/findExistByUserName/" + name,
    method: "get",
    showloading: false,
    cancelToken: setCancelSource()
  });
}


//用户绑定角色
export function userBindRoleApi(data) {
  console.log(data);
  return request({
    url: "/sys/user/bindRoles",
    method: "GET",
    params: data,
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//日志管理
export function getloglistApi(data) {
  console.log(vm.$qs.stringify(data));
  return request({
    url: "/sys/log/list",
    method: "GET",
    data: vm.$qs.stringify(data),
    showloading: true,
    cancelToken: setCancelSource()
  });
}


//获取用户绑定的角色
export function queryUserBindRoleApi(data) {
  console.log(data);
  return request({
    url: "/sys/user/findBindRolesByUserId/" + data,
    method: "GET",
    showloading: true,
    cancelToken: setCancelSource()
  });
}


//获取角色列表
export function getRolesApi(data) {
  console.log(data);
  return request({
    url: "/sys/role/all",
    method: "get",
    params:data,
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//新增角色
export function addRoleApi(data) {
  let data2 = vm.$qs.stringify(data);
  return request({
    url: "/sys/role/add",
    method: "post",
    data: data2,
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//删除角色
export function deleteRoleApi(data) {
  return request({
    url: "/sys/role/delete",
    method: "get",
    params: {id: data},
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//修改角色
export function editRoleApi(data) {
  let params = {
    id: data.id,
    name: data.name,
    description: data.description
  }
  let data2 = vm.$qs.stringify(params);
  return request({
    url: "/sys/role/update",
    method: "post",
    data: data2,
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//获取角色下已经绑定的菜单
export function getRoleBindMenuApi(data) {
  console.log(data);
  return request({
    url: "/sys/role/queryRoleMenu/" + data,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//获取角色下已经绑定的机构
export function getRoleBindOrganApi(data) {
  return request({
    url: "/sys/role/queryRoleOrgan/"+data,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//角色绑定菜单
export function roleBindMenuApi(data) {
  let params = {
    roleId: data.roleId,
    permissionIds: data.permissionIds.join(',')
  }
  return request({
    url: "/sys/role/bindMenu",
    method: "get",
    params: params,
    showloading: true,
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
    url: "/sys/role/bindOrgan",
    method: "get",
    params: params,
    showloading: true,
    cancelToken: setCancelSource()
  });
}


//获取机构下绑定的角色
export function getOrganBindRoleApi(data) {
  return request({
    url: "/sys/role/queryRoleByOrganId/" + data,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//获取选中机构下的部门
export function getDepartmentsApi(data) {
  console.log('部门', data);
  return request({
    url: "/sys/department/list",
    method: "get",
    params: data,
    showloading: true,
    cancelToken: setCancelSource()
  });
}


//获取选中机构下的所有部门   没有分页
export function getDepartmentsNoPageApi(data) {
  console.log('部门', data);
  return request({
    url: "/sys/department/all",
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  });
}

//新增 修改 部门
export function addDepartmentApi(data) {
  let departmentForm = {
    id: data.id,
    name: data.name,
    oid: data.oid,
    sortOrder: data.sortOrder,
    status: data.status == true ? 0 : 1
  };
  console.log(departmentForm)
  let data2 = vm.$qs.stringify(departmentForm);
  return request({
    url: "/sys/department/saveOrUpdateDepartment",
    method: "post",
    data: data2,
    showloading: true,
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
    url: "/sys/department/findDepartmentByName/" + data.oid + "/" + data.name,
    method: "get",
    // params:params,
    showloading: false,
    cancelToken: setCancelSource()
  });
}

//删除部门
export function deleteDepartmentApi(data) {
  console.log('删除部门', data);
  return request({
    url: "/sys/department/delete/" + data,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//获取菜单列表
export function getAllMenuListApi() {
  return request({
    url: "/sys/permission/getAllList",
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()

  });
}


//获取权限树
export function getTreePermissionApi() {
  return request({
    url: "/sys/permission/getTreePermission",
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()

  });
}

//获取数据字典列表
export function getDictListApi(data) {
  console.log(data);
  return request({
    url: "/sys/drawer/findAllByPage",
    method: "get",
    params: data,
    showloading: true,
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
    url: "/sys/drawer/addOrUpdate",
    method: "post",
    data: data2,
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//删除部门
export function deleteDictApi(data) {
  console.log('删除部门', data);
  return request({
    url: "/sys/drawer/delete/" + data,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//获取字典详情  字典值
export function getDictListDetailApi(id) {
  return request({
    url: "/sys/drawer/findAllDrawerById/" + id,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()
  });
}


//新增、修改菜单
export function addPermissionApi(data) {
  let _data = vm.$qs.stringify(data);
  return request({
    url: "/sys/permission/add",
    method: "post",
    data: _data,
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//删除菜单
export function deletePermissionApi(data) {
  return request({
    url: "/sys/permission/deleteByIds",
    method: "get",
    params: {
      ids: data
    },
    showloading: true,
    cancelToken: setCancelSource()
  });
}
