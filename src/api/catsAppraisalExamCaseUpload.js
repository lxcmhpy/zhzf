import Vue from "vue";

let vm = new Vue();


import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";

export function findPykhCaseByPage (data) {
  return request({
    url: "/pykh/case/findPykhCaseByPage",
    method: "get",
    showloading: true,
    loadingType:'loadPart',
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

export function submitCase (data) {
  return request({
    url: "/pykh/randomSampling/submitCase",
    method: "post",
    showloading: true,
    loadingType:'loadPart',
    data: data,
    cancelToken: setCancelSource()
  })
}

// 随机抽取
export function randomSamplingCaseByPage (oId,batchId) {
  return request({
    url: "/pykh/randomSampling/randomSamplingCaseByPage/"+oId+"/"+batchId,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  })
}
// 报送
export function confirmSubmissionCase (oId) {
  return request({
    url: "/pykh/case/confirmSubmissionCase/"+oId,
    method: "post",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  })
}

export function deleteCaseInfo(id){
  return request({
    url: "/pykh/case/deleteCaseInfo/"+id,
    method: "get",
    showloading: false,
    baseUrlType:'CAPTCHA_HOST',
    params: null,
    cancelToken: setCancelSource()
  })
}

export  function  StaffAndCaseFile(data)  {
  return  request({
    url:  "/pykh/file/StaffAndCaseFile",
    method:  "POST",
    data: data,
    contentType: 'multipart/form-data;',
    showloading: true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource(),
  });
}
