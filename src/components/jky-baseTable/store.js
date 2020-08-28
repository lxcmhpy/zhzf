import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";

/**
 * 查询和获取数据
 */
export function findData(data, baseUrlType, url) {
  return request({
    url: url,
    method: "GET",
    showloading: true,
    params: data,
    baseUrlType: baseUrlType,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  });
}
