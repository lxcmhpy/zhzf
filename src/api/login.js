
import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";
import Vue from "vue";
let vm = new Vue();
/**
 * 管理员登录
 * method: 'post','get'
 * @param {*} params.account  必填 账号
 * @param {*} params.password  必填  密码
 */

export function loginInApi(params) {
  var data = new FormData();
  data.append("username", params.username);
  data.append("password", params.password);
  data.append("grant_type", "password");
  return request({
    url: "/auth/oauth/token",
    method: "POST",
    data:data,
    headers: {
      "Authorization": "Basic Y2F0c2ljOmNhdHNpYw==",
      "Content-Type": "multipart/form-data"
    },
    auth:{
      username: 'catsic',
      password: 'catsic'
    },
    mimeType: "multipart/form-data",
    processData: false,
    showloading: true,
    loadingType:'loadFull',
    contentType: false,
    // baseUrlType:  'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}


//修改密码
export function resetPasswordApi(params) {

  let data = vm.$qs.stringify({
    username: params.username,
    nickName: params.nickName,
    enforceNo: params.enforceNo,
  })
  console.log(data)
  return request({
    url: "/system/sys/user/resetPassWord",
    method: "POST",
    contentType: 'multipart/form-data',
    data:data,
    showloading: false,
    baseUrlType:  'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}

//获取验证吗
export function getCaptchaApi() {
  return request({
    url: "/common/captcha/getcaptcha",
    method: "get",
    showloading: false,
    baseUrlType:  'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}

// 验证码渲染图片接口
// export const drawCodeImage = "/catsic/common/captcha/draw/"
export function getCapImgSrcApi(captchaId) {
  console.log('captchaId',captchaId)
  return request({
    url: "/common/captcha/draw/"+captchaId,
    method: "get",
    showloading: false,
    baseUrlType:  'CAPTCHA_HOST',
    responseType: 'arraybuffer',
    cancelToken: setCancelSource()
  });
}

//获取菜单
export function getMenuApi() {
  return request({
    url: "/system/sys/permission/getMenuList",
    method: "get",
    baseUrlType:  'CAPTCHA_HOST',
    showloading: true,
    loadingType:'loadFull',
    cancelToken: setCancelSource()

  });
}

//获取当前登录用户的信息
export function getCurrentUserApi() {
  return request({
    url: "/system/sys/user/findCurrentUser",
    method: "get",
    showloading: false,
    loadingType:'loadFull',
    cancelToken: setCancelSource()

  });
}
// 退出
export function loginOutApi() {
  return request({
    url: "/loginOut",
    method: "post",
    showloading: false,
    cancelToken: setCancelSource()
  });
}
export function getHost () {
    return request({
        url: '/static/json/hostUrl/host.json',
        method: "get",
        isGetHost: true,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
