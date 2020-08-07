import axios from "axios";
import qs from 'qs';
import { getToken, setToken, removeToken } from "@/common/js/auth";
import Vue from "vue";
//import { message } from "ant-design-vue";
import { showFullScreenLoading, tryHideFullScreenLoading } from "./loading";
import iLocalStroage from '@/common/js/localStroage'
// import { sync } from "cross-spawn";

var vue = new Vue();

const service = axios.create({
  // "Content-Type": "multipart/form-data;charset=UTF-8",
  "Content-Type": "application/x-www-form-urlencoded",
  // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
//   timeout: 15000, // request timeout

});

var BASEURL;
// service({
//     url: '/static/json/hostUrl/host.json',
//     method: "get",
//     params: {},
//     }).then(
//         res => {
//         console.log("获取baseUrl" + JSON.stringify(res.data));
//
//     },
//     error => {
//         console.log(error)
//     })
// request interceptor
service.interceptors.request.use(
    config => {
      if (!BASEURL) {
          BASEURL={
              CURRENT: 'TEMP'
          };
          BASEURL[BASEURL.CURRENT] = iLocalStroage.gets("CURRENT_BASE_URL");
          BASEURL.HOME_PAGE_ROUTER_NAME = localStorage.getItem("HOME_PAGE_ROUTER_NAME");
          BASEURL.SYS_TITLE = localStorage.getItem("SYS_TITLE");
      }
      if (config.baseUrlType) {
          let baseObj = BASEURL[BASEURL.CURRENT];
          config.baseURL = baseObj[config.baseUrlType];
      } else if (!config.isGetHost){
         config.baseURL = BASEURL[BASEURL.CURRENT].CAPTCHA_HOST; // 默认的base_url
      }

      if (config.responseType) {
        config["responseType"] = config.responseType
      }
      // config["Content-Type"] = config.contentType ? config.contentType : "application/x-www-form-urlencoded"
      config["Content-Type"] = config.contentType ? config.contentType : "application/x-www-form-urlencoded;charset=UTF-8"
      // config["Content-Type"] = config.contentType ? config.contentType : "multipart/form-data;charset=UTF-8"

      //token一天后过期
      if (config.showloading != false) {
        let loadingType = config.loadingType ? config.loadingType : '';
        showFullScreenLoading(loadingType);
      }
      if (getToken("TokenKey")) {
        if(config.baseUrlType === 'EXAM'){
          config.headers["Authorization_k"] = "Bearer " + getToken("TokenKey");
        }else{
          config.headers["Authorization"] = "Bearer " + getToken("TokenKey");
        }
      }
      config.url = config.url + '?time='+new Date().getTime();
      console.log('config', config)
      //  config.headers = {
      //   'Content-Type': config.contentType ? config.contentType : "application/x-www-form-urlencoded;charset=UTF-8" //  注意：设置很关键
      // debugger;
      return config;

    },
    error => {
      return Promise.reject(error);
    }
  );
  // respone interceptor
  service.interceptors.response.use(
    response => {
        if (response.config.isGetHost) {
            BASEURL = response.data;
            iLocalStroage.sets("CURRENT_BASE_URL", BASEURL[BASEURL.CURRENT]);
            sessionStorage.setItem("HOME_PAGE_ROUTER_NAME", BASEURL.HOME_PAGE_ROUTER_NAME);
            localStorage.setItem("SYS_TITLE", BASEURL.SYS_TITLE);
            return response.data;
        }
      if (response.status == 200) {
        if (response.data.code == 200) {
          tryHideFullScreenLoading();
          return response.data;
        } else if (
          response.data.code == 400 || response.data.code == 500) {
          tryHideFullScreenLoading();
          return Promise.reject(response.data);
        } else if (response.data.code == 401 || response.data.code == 403) {   //无权限
          tryHideFullScreenLoading();
          alertMessage('无权限进行此操作');
          return Promise.reject(response.data);
        }  else if (response.data.code == -1) {   //重新登录
          tryHideFullScreenLoading();
          alertMessage('登陆超时，请重新登录'); //账户在其他地方登录，您被迫下线
          removeToken()
          return Promise.reject(response.data);
        } else {
          // httpErrorStr(response.data.code);
          // 下载后台返回文件流
          console.log('response',response)
          if(response.config.responseType === "blob"){
            if(response.headers["content-disposition"]){
              const fileName = response.headers["content-disposition"].split(";")[1].split("=")[1];
              return Promise.resolve({ data: response.data, fileName: fileName });
            }else{
              tryHideFullScreenLoading();
              return Promise.resolve(response.data);
            }
            
          }else{
            tryHideFullScreenLoading();
            return Promise.resolve(response.data);   //获取验证码图片需要返回，先这样写，之后完善
          }
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
      try {
          console.log('error', error.response)
          if (error.toString().indexOf("Network Error") != -1) {//系统返回 无code 网络错误
          alertMessage("网络错误"); //networkError
          } else if (error.toString().indexOf("500") != -1) {
          alertMessage(error.response.data.msg || "系统错误"); //系统错误
          } else if (error.toString().indexOf("401") != -1 && error.response.data.code == 400000) {
          alertMessage('账户在其他地方登录，您被迫下线'); //账户在其他地方登录，您被迫下线
          // removeToken();
          } else if (error.message == "stopQuest") {
          return false;
          } else if (error.response.data&&error.response.data.error == 'unauthorized') {
          alertMessage('用户名或密码错误')
          } else if (error.response.status == 400) {
          alertMessage(error.response.data.error_description)
          } else {
          alertMessage("请求失败"); //请求失败
          }
      } catch (error) {
          // getHost();
      }

    tryHideFullScreenLoading();
  }
  //弹出提示语
  function alertMessage(msg) {
    vue.$messageOne.error({showClose: true, message: msg})
    // vue.$message({
    //   showClose: true,
    //   message: msg,
    //   type: 'error'
    // })

    //message.error(msg)
  }

  export default service;
