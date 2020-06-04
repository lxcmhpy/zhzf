import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";

 // 加载评议考核配置列表
 export function findPykhConfigByPage (data) {
    return request({
        url: "/pykh/pykhToConfigure/findPykhConfigByPage",
        method: "get",
        showloading: false,
        baseUrlType:'CAPTCHA_HOST',
        params: data,
        cancelToken: setCancelSource()
      })
  }
