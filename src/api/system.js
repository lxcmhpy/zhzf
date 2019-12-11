import request from "@/js/request";
import { setCancelSource } from "@/js/cancelToken";
import Vue from "vue";
let vm = new Vue();


//获取所有机构
export function getAllOrganApi() {
    return request({
      url: "/catsic/sys/organ/all",
      method: "get",
      showloading: true,
      cancelToken: setCancelSource()
    });
}