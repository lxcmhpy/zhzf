import {
  setCancelSource
} from "@/common/js/cancelToken";
import request from "@/common/js/request";
import Vue from "vue";
let vm = new Vue();

/**
 * 组织全量树
 */
export function allOrgTree() {
  return request({
    url: "/device/device/pub/getAllOrgTree",
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}
/**
 * 动态获取树
 * @param {*} pid 
 * @param {*} treeType 
 */
export function tree(pid, treeType) {
  return request({
    url: "/device/device/pub/tree/" + pid + "/" + treeType,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}
/**
 * 动态获取列表
 * @param {*} pid 
 * @param {*} dataType 
 */
export function getDataList(pid, dataType) {
  return request({
    url: "/device/device/pub/getDataList/" + pid + "/" + dataType,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  })
}
/**
 * 批量获取抽屉表数据
 * @param {*} data 
 */
export function getDrawerList(data) {
  return request({
    url: "/device/device/pub/getDrawerList/",
    method: "post",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    data: data,
    cancelToken: setCancelSource()
  })
}

// 文件上传
export function upload(data) {
  return request({
    url: "/device/sys/file/uploadCommon",
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
export function deleteFileById(fileId) {
  return request({
    url: "/device/sys/file/delete/" + fileId,
    method: "GET",
    showloading: true,
    loadingType: 'loadPart',
    baseUrlType: 'CAPTCHA_HOST',
    cancelToken: setCancelSource(),
  });
}
//根据CaseId查询图片列表
export function findImageByCaseId(id) {
  return request({
    url: "/device/sys/file/findImageByCaseId/" + id,
    method: "GET",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource(),
  });
}
