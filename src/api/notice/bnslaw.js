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
