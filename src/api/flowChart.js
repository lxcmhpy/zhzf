import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";
import Vue from "vue";
let vm = new Vue();
// 案件id
export function getFlowStatusByCaseIdApi(id) {
  return request({
    url: "/doc/caseBasicInfo/findFlowStatusByCaseId/" + id,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()
  });
}
