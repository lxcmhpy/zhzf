import Vue from "vue";

let vm = new Vue();


import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";

 // 加载评议考核配置列表
 export function findPykhConfigByPage (data) {
    return request({
        url: "/pykh/pykhToConfigure/findPykhConfigureByPage",
        method: "get",
        showloading: false,
        baseUrlType:'CAPTCHA_HOST',
        params: data,
        cancelToken: setCancelSource()
      })
  }

// 添加考核配置
  export function addOrUpdatePykhConfig (data) {
    return request({
        url: "/pykh/pykhToConfigure/addOrUpdatePykhConfigure",
        method: "post",
        showloading: false,
        baseUrlType:'CAPTCHA_HOST',
        data: vm.$qs.stringify(data),
        cancelToken: setCancelSource()
      })
  }
// 删除考核配置
export function deletePykhConfigById (data) {
    return request({
        url: "/pykh/pykhToConfigure/deletePykhConfigureById/" +data,
        method: "get",
        showloading: false,
        baseUrlType:'CAPTCHA_HOST',
        cancelToken: setCancelSource()
      })
  }
// 查询考核指标项列表
export function findPykhMetricsByPage (data) {
    return request({
        url: "/pykh/pykhToConfigure/findPykhMetricsByPage",
        method: "get",
        showloading: false,
        params: data,
        baseUrlType:'CAPTCHA_HOST',
        cancelToken: setCancelSource()
      })
}
// 查询考核细则
export function findPykhZpByPage (data) {
    return request({
        url: "/pykh/pykhToConfigure/findPykhZpByPage",
        method: "get",
        showloading: false,
        params: data,
        baseUrlType:'CAPTCHA_HOST',
        cancelToken: setCancelSource()
      })
}
// 保存考核细则
export function addorUpdateDetailZp(data) {
    return request({
        url: "/pykh/pykhToConfigure/addorUpdateDetailZp",
        method: "post",
        showloading: false,
        data: vm.$qs.stringify(data),
        baseUrlType:'CAPTCHA_HOST',
        cancelToken: setCancelSource()
      })
}
//删除考核细则
export function deleteDetailZpById(data) {
    return request({
        url: "/pykh/pykhToConfigure/deleteDetailZpById",
        method: "get",
        showloading: false,
        params: data,
        baseUrlType:'CAPTCHA_HOST',
        cancelToken: setCancelSource()
      })
}
export function findListVoByPykhZp(data) {
    return request({
        url: "/pykh/pykhToConfigure/findListVoByPykhZp",
        method: "get",
        showloading: false,
        params: data,
        baseUrlType:'CAPTCHA_HOST',
        cancelToken: setCancelSource()
      })
}
// 添加修改考核指标
export function addOrUpdatePykhMetrics (data) {
    return request({
        url: "/pykh/pykhToConfigure/addOrUpdatePykhMetrics",
        method: "post",
        showloading: false,
        data: vm.$qs.stringify(data),
        baseUrlType:'CAPTCHA_HOST',
        cancelToken: setCancelSource()
      })
}
// 删除考核指标
export function deletePykhMetricsById (data) {
    return request({
        url: "/pykh/pykhToConfigure/deletePykhMetricsById/" +data,
        method: "get",
        showloading: false,
        baseUrlType:'CAPTCHA_HOST',
        cancelToken: setCancelSource()
      })
  }

export  function  uploadNoticeFile(data)  {
  console.log('文件上传api',data);
  return  request({
    url:  "/pykh/file/upload",
    method:  "POST",
    data: data,
    contentType: 'multipart/form-data;',
    showloading: true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource(),
  });
}

//分页查找公告信息
export function getNoticeListApi(data) {
  return request({
    url: "/pykh/notice/findNoticeByPage",
    method: "get",
    params: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//添加、修改公告信息
export function addOrUpdateNoticeApi(data) {
  data = vm.$qs.stringify(data);
  return request({
    url: "/pykh/notice/addOrUpdateNotice",
    method: "post",
    data: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//删除公告信息
export function deleteNoticeApi(id) {
  debugger
  return request({
    url: "/pykh/notice/deleteNotice/"+id,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//获取公告内容
export function getContentApi(id) {
  debugger
  return request({
    url: "/pykh/notice/getContent/"+id,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

export function getNoticeByPageAndUserId(data){
  return request({
    url: "/pykh/notice/findNoticeByPageAndUserId",
    method: "get",
    params: data,
    showloading: true,
    loadingType:'loadFull',
    cancelToken: setCancelSource()
  });
}

export function getAppraisalMenuList(){
  return request({
    url: "/pykh/home/getMenuList",
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

export function getPykhOrgInfo(data){
  return request({
    url: "/pykh/pykhOrgInfo/getPykhOrgInfo",
    method: "get",
    showloading: true,
    params:data,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

export function updateScore(data) {
  return request({
    url: "/pykh/pykhScore/updateScore",
    method: "post",
    data: data,
    showloading: false,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

export function updateScoreState(data) {
  return request({
    url: "/pykh/pykhScore/updateScoreState",
    method: "post",
    data: data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

export function getOrgInfoById(id){
  return request({
    url: "/pykh/pykhOrgInfo/getOrgInfoById/"+id,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

export function getOrgInfoByOrgId(data){
  return request({
    url: "/pykh/pykhOrgInfo/getOrgInfoByOrgId",
    method: "get",
    showloading: true,
    params: data,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

export function getAppraisalResult(){
  return request({
    url: "/pykh/appraisalResult/getResult",
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
