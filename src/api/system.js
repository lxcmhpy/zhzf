import request from "@/js/request";
import { setCancelSource } from "@/js/cancelToken";
import Vue from "vue";
let vm = new Vue();


//获取用户下的所有机构
export function getAllOrganApi() {
    return request({
      url: "/catsic/sys/organ/organTreeByCurrUser",
      method: "get",
      showloading: true,
      cancelToken: setCancelSource()
    });
}

//获取选中机构下的机构
export function getSelectOrganApi(data) {
  console.log('organId',data);
  return request({
    url: "/catsic/sys/organ/queryOrganPage",
    method: "get",
    params:data,
    showloading: true,
    cancelToken: setCancelSource()
  });
}