import Vue from "vue";
let vm = new Vue();

import request from "@/common/js/request";
import {
  setCancelSource
} from "@/common/js/cancelToken";

// 新增、编辑
export function saveOrUpdate(data) {
  return request({
    url: "/notice/website/install/saveOrUpdate",
    method: "post",
    showloading: true,
    baseUrlType: 'NOTICE_HOST',
    params: data,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  })
}

// 通过Id查询
export function findWebsiteInfo() {
  return request({
    url: "/notice/website/install/findWebsiteInfo",
    method: "get",
    showloading: true,
    baseUrlType: 'NOTICE_HOST',
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  })
}
