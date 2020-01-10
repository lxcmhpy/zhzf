import axios from "axios";
import { getToken, setToken,removeToken } from "@/js/auth";
import { router } from "@/router/index";
import Vue from "vue";
//import { message } from "ant-design-vue";
import { showFullScreenLoading, tryHideFullScreenLoading } from "./loading";
import store from "@/store";

var vue = new Vue();
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000, // request timeout

  "Content-Type": "application/x-www-form-urlencoded",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
  "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS"
});


// function configToken(config) {
//   console.log("config" + JSON.stringify(config));
//   if (config.tokenType && config.tokenType == 1) {
//     console.log("token1");
//     if (getToken("TokenKey")) {
//       config.headers["Authorization"] = "Bearer " + getToken("TokenKey");
//     }
//   } else if (config.tokenType && config.tokenType == 2) {
//     console.log("token2");
//     if (getToken("TokenKey_2")) {
//       config.headers["Authorization"] = "Bearer " + getToken("TokenKey_2");

//     }
//   }
// }
// request interceptor
service.interceptors.request.use(
  config => {
     if(config.baseUrlType ==1){
      config.baseURL = process.env.BASE_API // api的base_url
     } else if(config.baseUrlType ==2){
      config.baseURL = process.env.BASE_API2
     }else{
      config.baseURL = process.env.BASE_API // api的base_url
     }
    //token一天后过期
    if (config.showloading != false) {
      showFullScreenLoading();
    }
    config.headers["Content-Type"] = 'application/x-www-form-urlencoded';
    if (getToken("TokenKey")) {
      // config.headers["accessToken"] = "CATSIC_TOKEN_PRE:" + getToken("TokenKey");
      config.headers["accessToken"] = getToken("TokenKey");
    }

    // console.log(config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// respone interceptor
service.interceptors.response.use(
  response => {
    console.log("response", response);
    // if(response.code == 200){
    //   tryHideFullScreenLoading();
    //   return Promise.resolve(response.data);
    // }else{
    //   return Promise.reject(response);
    // }
    if (response.status == 200) {
      if (response.data.code == 200) {
        tryHideFullScreenLoading();
        return Promise.resolve(response.data);
      } else if (
        response.data.code == 400 || response.data.code == 500) {
        tryHideFullScreenLoading();
        return Promise.reject(response.data);
      }else if(response.data.code == -1){   //重新登录
        tryHideFullScreenLoading();
        alertMessage('账户在其他地方登录，您被迫下线'); //账户在其他地方登录，您被迫下线
        removeToken()
        return Promise.reject(response.data);
      }else{
        // httpErrorStr(response.data.code);
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
  if (error.toString().indexOf("Network Error") != -1) {//系统返回 无code 网络错误
    alertMessage("networkError"); //networkError
  } else if (error.toString().indexOf("500") != -1) {
    alertMessage("系统错误"); //系统错误
  } else if (error.toString().indexOf("401") != -1 && error.response.data.code == 400000) {
    alertMessage('账户在其他地方登录，您被迫下线'); //账户在其他地方登录，您被迫下线
    // removeToken();
  } else if (error.message == "stopQuest") {
    return false;
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
