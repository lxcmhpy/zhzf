
import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";
// import Vue from "vue";
// let vm = new Vue();
// 案件id
export function getZfjgLawSupervise(data) {
  return request({
    url: "/zfjg/list",
    method: "get",
    params:data,
    showloading: false,
    baseUrlType:2,
    cancelToken: setCancelSource()
  });
}
