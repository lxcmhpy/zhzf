import {
  setCancelSource
} from "@/common/js/cancelToken";
import request from "@/common/js/request";
import Vue from "vue";
let vm = new Vue();

// 文件上传
export function upload(data) {
  debugger;
  return request({
    url: "/notice/sys/file/uploadCommon",
    method: "POST",
    data: data,
    contentType: 'multipart/form-data;',
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource(),
  });
}
//根据主键ID删除附件
export function deleteFileByIdApi(fileId) {
  return request({
    url: "/notice/sys/file/delete/" + fileId,
    method: "GET",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource(),
  });
}
