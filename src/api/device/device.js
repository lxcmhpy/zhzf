import { setCancelSource } from "@/common/js/cancelToken";
import request from "@/common/js/request";
import Vue from "vue";
let vm = new Vue();

/**
 * 组织全量树
 */
export function allOrgTree() {
    return request({
        url: "/device/pub/getAllOrgTree",
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'DEVICE_HOST',
        cancelToken: setCancelSource()
    });
}
/**
 * 动态获取树
 * @param {*} pid 
 * @param {*} treeType 
 */
export function tree(pid,treeType) {
    return request({
        url: "/device/pub/tree/"+pid+"/"+treeType,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'DEVICE_HOST',
        cancelToken: setCancelSource()
    });
}
/**
 * 动态获取列表
 * @param {*} pid 
 * @param {*} dataType 
 */
export function getDataList (pid,dataType) {
    return request({
        url: "/device/pub/getDataList/"+pid+"/"+dataType,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'DEVICE_HOST',
        cancelToken: setCancelSource()
    })
}
/**
 * 批量获取抽屉表数据
 * @param {*} data 
 */
export function getDrawerList(data) {
    return request({
        url: "/device/pub/getDrawerList/",
        method: "post",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'DEVICE_HOST',
        data: data,
        cancelToken: setCancelSource()
    })
}

// 文件上传
export  function  upload(data)  {
    return  request({
      url:  "/sys/file/uploadCommon",
      method:  "POST",
      data: data,
      contentType: 'multipart/form-data;',
      showloading: true,
      loadingType:'loadPart',
      baseUrlType:  'DEVICE_HOST',
      cancelToken:  setCancelSource(),
    });
  }
  //根据主键ID删除附件
  export function deleteFileById(fileId) {
    return  request({
      url:  "/sys/file/delete/"+fileId,
      method:  "GET",
      showloading: true,
      loadingType:'loadPart',
      baseUrlType:  'DEVICE_HOST',
      cancelToken:  setCancelSource(),
    });
  }