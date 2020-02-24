import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";
import Vue from "vue";

let vm = new Vue();
//   url: "/yuz/yh?1/2/" + data,
// url: "http://124.192.215.11:8086/cy/yuz/yh?licenseCode=&provinceCode=&provinceCode=",
//获取用户绑定的角色
export function yehuCheckApi(data) {
    console.log(data);
    return request({
        url: "http://124.192.215.11:8086/cy/yuz/yh?licenseCode=" + data.licenseCode + "&ownerName=" + data.ownerName + "&provinceCode=" + data.provinceCode,
        method: "GET",
        showloading: true,
        cancelToken: setCancelSource()
    });
}

