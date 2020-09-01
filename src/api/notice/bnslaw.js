import Vue from "vue";
let vm = new Vue();

import request from "@/common/js/request";
import {
  setCancelSource
} from "@/common/js/cancelToken";

// 加载列表
export function findBnslaws(data) {
  return request({
    url: "/notice/bnslaw/list",
    method: "get",
    showloading: true,
    baseUrlType: 'NOTICE_HOST',
    params: data,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  })
}

// 新增、编辑轮播图
export function saveOrUpdate(data) {
  return request({
    url: "/notice/bnslaw/saveOrUpdate",
    method: "post",
    showloading: true,
    baseUrlType: 'NOTICE_HOST',
    params: data,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  })
}

// 新增、编辑批量操作
export function saveOrUpdateBatch(data) {
  return request({
    url: "/notice/bnslaw/saveOrUpdateBatch",
    method: "post",
    showloading: true,
    baseUrlType: 'NOTICE_HOST',
    data: data,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  })
}

// 通过Id查询
export function findById(id) {
  return request({
    url: "/notice/bnslaw/findById/" + id,
    method: "get",
    showloading: true,
    baseUrlType: 'NOTICE_HOST',
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  })
}

// 多选删除公示政策
export function deleteByIds(data) {
  return request({
    url: "/notice/bnslaw/deleteById",
    method: "post",
    showloading: true,
    data: data,
    baseUrlType: 'NOTICE_HOST',
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  })
}

// 编辑操作
export function update(data) {
  return request({
    url: "/notice/bnslaw/updateByid",
    method: "post",
    showloading: true,
    baseUrlType: 'NOTICE_HOST',
    params: data,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  })
}

// 批量编辑操作
export function updateBatch(data) {
  return request({
    url: "/notice/bnslaw/updateByids",
    method: "post",
    showloading: true,
    baseUrlType: 'NOTICE_HOST',
    data: data,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  })
}
