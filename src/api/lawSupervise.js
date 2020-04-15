
import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";

export function getZfjgLawSupervise(data) {
  return request({
    url: "/zfjg/list",
    method: "get",
    params:data,
    showloading: true,
    loadingType:'loadPart',
    baseUrlType:2,
    cancelToken: setCancelSource()
  });
}

export function getBySiteId(sitedId) {
    return request({
      url: "/zfjg/superviseVehicle/findBySiteId/" + sitedId,
      method: "get",
      showloading: true,
      loadingType:'loadPart',
      baseUrlType:2,
      cancelToken: setCancelSource()
    });
}

export function getById(type,id) {
    return request({
      url: "/zfjg/findById/" + type+ '/'+id,
      method: "get",
      showloading: true,
      loadingType:'loadPart',
      baseUrlType:2,
      cancelToken: setCancelSource()
    });
  }
  export function getDetailById(id) {
    return request({
      url: "/zfjg/superviseVehicle/findById/",
      method: "get",
      showloading: false,
      data: id,
    //   loadingType:'loadPart',
      baseUrlType:2,
      cancelToken: setCancelSource()
    });
  }
//   /zfjg/superviseVehicle/findWeighingRecord/{name}
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
  export function findAllDrawerById (data) {
    return request({
      url: "/system/sys/drawer/findAllDrawerById/" +data,
      method: "get",
      showloading: false,
      baseUrlType:1,
      cancelToken: setCancelSource()
    });
  }
