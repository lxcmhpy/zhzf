import  request  from  "@/common/js/request";
import  {setCancelSource}  from  "@/common/js/cancelToken";
import  Vue  from  "vue";

let  vm  =  new  Vue();

export  function  getParamList(data)  {//参数列表查询
  return  request({
    url:  "/device/params/paramsPageList",
    method:  "get",
    params: data,
    showloading: false,
    baseUrlType:  'DEVICE_HOST',
    cancelToken:  setCancelSource()
  });
}
export  function  updateParam(data)  {//参数修改
  return  request({
    url:  "/device/params/updateParams",
    method:  "get",
    params: data,
    showloading: false,
    baseUrlType:  'DEVICE_HOST',
    cancelToken:  setCancelSource()
  });
}

// 获取所有机构树
export function getAllOrigin(){
    return  request({
      url:  "/system/sys/organ/getAllOrgan",
      method:  "get",
      showloading: false,
      cancelToken:  setCancelSource(),
    });
}