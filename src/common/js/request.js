import axios from "axios";
import { getToken, setToken,removeToken } from "@/common/js/auth";
import Vue from "vue";
//import { message } from "ant-design-vue";
import { showFullScreenLoading, tryHideFullScreenLoading } from "./loading";
import iLocalStroage from '@/common/js/localStroage'
// import { sync } from "cross-spawn";

var vue = new Vue();

const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
    timeout: 15000, // request timeout
  "Content-Type": "multipart/form-data;charset=UTF-8",
});

var BASEURL
 service({
    url: '/static/json/hostUrl/host.json',
    method: "get",
    params: {},
  }).then(
    res => {
      BASEURL = res.data;
      sessionStorage.setItem('CURRENT_BASE_URL', JSON.stringify(BASEURL[BASEURL.CURRENT]))
      iLocalStroage.sets("CURRENT_BASE_URL", BASEURL[BASEURL.CURRENT])
    },
    error => {
      console.log(error)
  })




// request interceptor
service.interceptors.request.use(
    config => {
    if (BASEURL) {
        iLocalStroage.sets("CURRENT_BASE_URL", BASEURL[BASEURL.CURRENT]);
    }
    if(config.baseUrlType == 1){
      config.baseURL = BASEURL[BASEURL.CURRENT].CAPTCHA_HOST
    } else if(config.baseUrlType == 2){
      config.baseURL = BASEURL[BASEURL.CURRENT].LAW_SUPERVISE_HOST
    }else {
     config.baseURL = BASEURL[BASEURL.CURRENT].HOST // api的base_url
    }
    if (config.responseType) {
      config["responseType"] = config.responseType
    }

    config["Content-Type"] = config.contentType ? config.contentType : "application/x-www-form-urlencoded"

   //token一天后过期
   if (config.showloading != false) {
      let loadingType = config.loadingType ? config.loadingType : '';
     showFullScreenLoading(loadingType);
   }
   if (getToken("TokenKey")) {
      config.headers["Authorization"] = "Bearer " + getToken("TokenKey");
   }
   console.log('config',config)
   return config;

  },
  error => {
    return Promise.reject(error);
  }
);
// respone interceptor
service.interceptors.response.use(
   response => {
    if (response.status == 200) {
      if (response.data.code == 200) {
        tryHideFullScreenLoading();
        return response.data;
      } else if (
        response.data.code == 400 || response.data.code == 500) {
        tryHideFullScreenLoading();
        return Promise.reject(response.data);
      }else if(response.data.code == -1){   //重新登录
        tryHideFullScreenLoading();
        alertMessage('登陆超时，请重新登录'); //账户在其他地方登录，您被迫下线
        removeToken()
        return Promise.reject(response.data);
      }else{
        // httpErrorStr(response.data.code);
        tryHideFullScreenLoading();
        return Promise.resolve(response.data);   //获取验证码图片需要返回，先这样写，之后完善
      }
    } else {

      return Promise.reject(response);
    }
  },
  error => {
    console.log(error)
    httpErrorStr(error);
    return Promise.reject(error);
  }
);

function httpErrorStr(error) {
  tryHideFullScreenLoading();
  console.log('error',error.response)
  if (error.toString().indexOf("Network Error") != -1) {//系统返回 无code 网络错误
    alertMessage("networkError"); //networkError
  } else if (error.toString().indexOf("500") != -1) {
    alertMessage("系统错误"); //系统错误
  } else if (error.toString().indexOf("401") != -1 && error.response.data.code == 400000) {
    alertMessage('账户在其他地方登录，您被迫下线'); //账户在其他地方登录，您被迫下线
    // removeToken();
  } else if (error.message == "stopQuest") {
    return false;
  } else if (error.response.data.error == 'unauthorized') {
    alertMessage('用户名或密码错误')
  }else if (error.response.status == 400) {
    alertMessage(error.response.data.error_description)
  } else {
    alertMessage("请求失败"); //请求失败
  }
}
//弹出提示语
function alertMessage(msg) {
  // message.config({
  //   top: `40px`,
  //   duration: 3,
  //   maxCount: 1,
  // });
  vue.$message({
    showClose: true,
    message: msg,
    type: 'error'
  })
  //message.error(msg)
}

export default service;
