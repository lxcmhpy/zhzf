import Vue from "vue";
let vm = new Vue();

import request from "@/common/js/request";
import {
  setCancelSource
} from "@/common/js/cancelToken";

// 加载轮播图列表
export function findImages(data) {
  return request({
    url: "/notice/circulation/img/list",
    method: "get",
    showloading: true,
    baseUrlType: 'NOTICE_HOST',
    params: data,
    cancelToken: setCancelSource()
  })
}

// 新增、编辑轮播图
export function saveOrUpdate(data) {
  return request({
    url: "/notice/circulation/img/saveOrUpdate",
    method: "post",
    showloading: true,
    baseUrlType: 'NOTICE_HOST',
    params: data,
    cancelToken: setCancelSource()
  })
}

// 通过Id查询
export function deleteById(id) {
  return request({
    url: "/notice/circulation/img/deleteById/" + id,
    method: "get",
    showloading: true,
    baseUrlType: 'NOTICE_HOST',
    cancelToken: setCancelSource()
  })
}
