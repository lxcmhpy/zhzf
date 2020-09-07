import Vue from "vue";
let vm = new Vue();

import request from "@/common/js/request";
import {
  setCancelSource
} from "@/common/js/cancelToken";

// 加载列表
export function findCases(data) {
  return request({
    url: "/notice/notice/case/list",
    method: "get",
    showloading: true,
    baseUrlType: 'CAPTCHA_HOST',
    params: data,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  })
}

// 新增、编辑
export function saveOrUpdate(data) {
  return request({
    url: "/notice/notice/case/saveOrUpdate",
    method: "post",
    showloading: true,
    baseUrlType: 'CAPTCHA_HOST',
    params: data,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  })
}

// 新增、编辑批量操作
export function saveOrUpdateBatch(data) {
  debugger;
  return request({
    url: "/notice/notice/case/saveOrUpdateBatch",
    method: "post",
    showloading: true,
    baseUrlType: 'CAPTCHA_HOST',
    data: data,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  })
}

// 通过Id查询
export function findById(id) {
  return request({
    url: "/notice/notice/case/findById/" + id,
    method: "get",
    showloading: true,
    baseUrlType: 'CAPTCHA_HOST',
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  })
}

// 多选删除
export function deleteByIds(data) {
  return request({
    url: "/notice/notice/case/deleteById",
    method: "post",
    showloading: true,
    data: data,
    baseUrlType: 'CAPTCHA_HOST',
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  })
}

// 编辑操作
export function update(data) {
  return request({
    url: "/notice/notice/case/updateByid",
    method: "post",
    showloading: true,
    baseUrlType: 'CAPTCHA_HOST',
    params: data,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  })
}

// 批量编辑操作
export function updateBatch(data) {
  return request({
    url: "/notice/notice/case/updateByids",
    method: "post",
    showloading: true,
    baseUrlType: 'CAPTCHA_HOST',
    data: data,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  })
}
