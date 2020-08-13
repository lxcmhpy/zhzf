import  request  from  "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";

/**
 * 查询
 */
export function findData (params) {
  return request({
    url: "http://192.168.1.8:8090/event/manage/list",
    method: "get",
    showloading: true,
    params: params,
    cancelToken: setCancelSource()
  })
}

/**
 * 指派
 */
export function assigned (data) {
  return request({
    url: "http://192.168.1.8:8090/event/manage/zhipai",
    method: "post",
    showloading: false,
    data: data,
    cancelToken: setCancelSource()
  })
}
