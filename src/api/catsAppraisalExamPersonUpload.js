import Vue from "vue";

let vm = new Vue();


import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";

// 根据条件分页查询人员列表
export function findPykhStaffByPage (data) {
  return request({
    url: "/pykh/staff/findPykhStaffByPage",
    method: "get",
    showloading: false,
    baseUrlType:'CAPTCHA_HOST',
    params: data,
    cancelToken: setCancelSource()
  })
}

export  function  importPerson(data)  {
  console.log("789",data);
  return  request({
    url:  "/pykh/excel/importPerson",
    method:  "POST",
    data: data,
    contentType: 'multipart/form-data;',
    showloading: true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource(),
  });
}


export function addOrUpdatePykhStaff (data) {
  return request({
    url: "/pykh/staff/addOrUpdatePykhStaff",
    method: "get",
    showloading: false,
    baseUrlType:'CAPTCHA_HOST',
    data: data,
    cancelToken: setCancelSource()
  })
}
