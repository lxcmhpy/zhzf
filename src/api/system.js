import request from "@/js/request";
import { setCancelSource } from "@/js/cancelToken";
import Vue from "vue";
let vm = new Vue();


//获取用户下的所有机构
export function getAllOrganApi() {
    return request({
      url: "/catsic/sys/organ/organTreeByCurrUser",
      method: "get",
      showloading: true,
      cancelToken: setCancelSource()
    });
}

//获取选中机构下的机构
export function getSelectOrganApi(data) {
  console.log('organId',data);
  return request({
    url: "/catsic/sys/organ/queryOrganPage",
    method: "get",
    params:data,
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//新增机构
export function addOrganApi(data) {
  
  let addOrganForm={
    id:data.id,
    name:data.name,
    pidName: data.pidName,
    pid:data.pid,
    code: data.code,
    organType: data.organType,
    accessToAuthority: data.accessToAuthority,
    organNature: data.organNature,
    isIndependentEnforce: data.isIndependentEnforce,
    address: data.address,
    zipCode: data.zipCode,
    telephone: data.telephone,
    contactor: data.contactor,
    fundingSource: data.fundingSource,
    legalBasis: data.legalBasis,
    mainPowers: data.mainPowers
  };
  console.log('新增修改的数据',addOrganForm);
  let data2 = vm.$qs.stringify(addOrganForm);
  return request({
    url: "/catsic/sys/organ/saveOrUpdateOrgan",
    method: "post",
    data:data2,
    showloading: true,
    cancelToken: setCancelSource()
  });
}
//机构详情
export function getOrganDetailApi(data) {
  return request({
    url: "/catsic/sys/organ/findById/"+data.id,
    method: "get",
    // params:data,
    showloading: true,
    cancelToken: setCancelSource()
  });
}
//删除机构
export function deleteOrganApi(data) {
  return request({
    url: "/catsic/sys/organ/delete/"+data,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//验证机构名称是否重复
export function hasOrganNameApi(name) {
  return request({
    url: "/catsic/sys/organ/findByName/"+name,
    method: "get",
    showloading: false,
    cancelToken: setCancelSource()
  });
}