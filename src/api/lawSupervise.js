
import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";

export function getZfjgLawSupervise(data) {
  return request({
    url: "/zfjg/list",
    method: "get",
    params:data,
    showloading: false,
    baseUrlType:2,
    cancelToken: setCancelSource()
  });
}

export function getBySiteId(sitedId) {
    return request({
      url: "/zfjg/superviseVehicle/findBySiteId/" + sitedId,
      method: "get",
      showloading: false,
      baseUrlType:2,
      cancelToken: setCancelSource()
    });
}

export function getById(type,id) {
    return request({
      url: "/zfjg/findById/" + type+ '/'+id,
      method: "get",
      showloading: false,
      baseUrlType:2,
      cancelToken: setCancelSource()
    });
  }

  export function queryListPage(data) {
    return request({
      url: "/zfjg/superviseVehicle/queryListPage",
      method: "get",
      params: data,
      showloading: false,
      baseUrlType:2,
      cancelToken: setCancelSource()
    });
  }

