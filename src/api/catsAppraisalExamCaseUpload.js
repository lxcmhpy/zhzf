import Vue from "vue";

let vm = new Vue();


import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";

export function findPykhCaseByPage (data) {
  return request({
    url: "/pykh/case/findPykhCaseByPage",
    method: "get",
    showloading: false,
    baseUrlType:'CAPTCHA_HOST',
    params: data,
    cancelToken: setCancelSource()
  })
}


export  function  importCase(data)  {
  return  request({
    url:  "/pykh/excel/importFiles",
    method:  "POST",
    data: data,
    contentType: 'multipart/form-data;',
    showloading: true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource(),
  });
}

export function saveOrUpdateCaseInfo (data) {
  return request({
    url: "/pykh/case/saveOrUpdateCaseInfo",
    method: "POST",
    showloading: false,
    baseUrlType:'CAPTCHA_HOST',
    data: vm.$qs.stringify(data),
    cancelToken: setCancelSource()
  })
}

