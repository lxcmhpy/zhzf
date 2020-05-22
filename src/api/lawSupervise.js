
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
      url: "/zfjg/superviseVehicle/findById/" + id,
      method: "get",
      showloading: false,
    //   loadingType:'loadPart',
      baseUrlType:2,
      cancelToken: setCancelSource()
    });
  }
  export function getUserById(id) {
      return request({
        url: "/zfjg/user/findByOrganId/" + id,
        method: "get",
        showloading: false,
        //   loadingType:'loadPart',
        baseUrlType:2,
        cancelToken: setCancelSource()
      })
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
  //   /zfjg/superviseVehicle/findWeighingRecord/{name}
  export function overWeightCaseList(data) {
    return request({
      url: "/zfjg/overrunCase/queryOverrunCasePage",
      method: "get",
      params: data,
      showloading: false,
      baseUrlType:2,
      cancelToken: setCancelSource()
    });
  }

  // 监管获取机构
  export function getOrganTree (id) {
    return request({
        url: "/zfjg/organ/organTree/"+id,
        method: "get",
        showloading: false,
        baseUrlType:2,
        cancelToken: setCancelSource()
    });
  }

  // 获取监管机构详情
  export function getOrganDetail (id) {
      return request({
        url: "/zfjg/organ/findById/"+id,
        method: "get",
        showloading: false,
        baseUrlType:2,
        cancelToken: setCancelSource()
      })
  }

  // 重点监管-车辆列表
  export function getVehicleList (data) {
    return request({
        url: "/zfjg/keyVehicle/queryKeyVehiclePage",
        method: "get",
        showloading: false,
        baseUrlType:2,
        params: data,
        cancelToken: setCancelSource()
      })
  }
