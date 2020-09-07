import Vue from "vue";
let vm = new Vue();

import request from "@/common/js/request";
import {
  setCancelSource
} from "@/common/js/cancelToken";

// 加载轮播图列表
export function findImages(data) {
  return request({
    url: "/notice/notice/circulation/img/list",
    method: "get",
    showloading: true,
    baseUrlType: 'CAPTCHA_HOST',
    params: data,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  })
}

// 新增、编辑轮播图
export function saveOrUpdate(data) {
  return request({
    url: "/notice/notice/circulation/img/saveOrUpdate",
    method: "post",
    showloading: true,
    baseUrlType: 'CAPTCHA_HOST',
    params: data,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  })
}

// 通过Id删除
export function deleteById(id) {
  return request({
    url: "/notice/notice/circulation/img/deleteById/" + id,
    method: "get",
    showloading: true,
    baseUrlType: 'CAPTCHA_HOST',
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  })
}

// 批量删除
export function deleteByIds(data) {
  return request({
    url: "/notice/notice/circulation/img/deleteByIds",
    method: "post",
    showloading: true,
    data: data,
    baseUrlType: 'CAPTCHA_HOST',
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  })
}
