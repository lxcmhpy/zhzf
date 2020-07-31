import request from "@/common/js/request";
import {setCancelSource} from "@/common/js/cancelToken";
import Vue from "vue";

let vm = new Vue();

//获取涉案财物列表
export function queryProperty(data) {
  return request({
      url: "/case/property/involved/list",
      method: "get",
      params: data,
      showloading: true,
      loadingType:'loadPart',
      cancelToken: setCancelSource()
  });
}

//涉案财物登记
export function savePropertyInvolved(data) {
  console.log("提交的data:" + vm.$qs.stringify(data));
  return request({
    url: "/case/property/involved/savePropertyInvolved",
    method: "post",
    showloading: true,
    loadingType:'loadPart',
    data:  data,
    cancelToken: setCancelSource()
  });
}

//根据ID查询涉案财物
export function findPropertyById (id) {
  return request({
      url: "/case/property/involved/findById/" +id,
      method: "get",
      showloading: true,
      loadingType:'loadPart',
      cancelToken: setCancelSource()
  });
}

//根据ID删除涉案财物
export function deletePropertyById (id) {
  return request({
      url: "/case/property/involved/deleteById/" +id,
      method: "get",
      showloading: true,
      loadingType:'loadPart',
      cancelToken: setCancelSource()
  });
}
