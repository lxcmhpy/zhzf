import Vue from "vue";
let vm = new Vue();

import request from "@/common/js/request";
import {
  setCancelSource
} from "@/common/js/cancelToken";

// 加载投诉列表
export function findComplaints(data) {
  return request({
    url: "/notice/notice/complaint/list",
    method: "get",
    showloading: true,
    baseUrlType: 'CAPTCHA_HOST',
    params: data,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  })
}

// 新增、编辑
// export function saveOrUpdate(data) {
//   return request({
//     url: "/notice/notice/complaint/saveOrUpdate",
//     method: "post",
//     showloading: true,
//     baseUrlType: 'CAPTCHA_HOST',
//     params: data,
//     loadingType: 'loadPart',
//     cancelToken: setCancelSource()
//   })
// }

// 编辑
export function update(data) {
  return request({
    url: "/notice/notice/complaint/update",
    method: "post",
    showloading: true,
    baseUrlType: 'CAPTCHA_HOST',
    params: data,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  })
}

// 通过Id查询
export function findById(id) {
  return request({
    url: "/notice/notice/complaint/findById/" + id,
    method: "get",
    showloading: true,
    baseUrlType: 'CAPTCHA_HOST',
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  })
}
