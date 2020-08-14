import  request  from  "@/common/js/request";
import  {setCancelSource}  from  "@/common/js/cancelToken";
import  Vue  from  "vue";

let  vm  =  new  Vue();

export function findOrganTreeByCurrUser(){
    return request({
      url: "/system/sys/organ/organTreeByCurrUser/",
      method: "get",
      showloading: false,
      cancelToken: setCancelSource()
    })
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

 //流程审批
 export  function  queryByOid(data)  {
    return  request({
      url:  "/device/device/approveProcess/queryByOid",
      method:  "get",
      params: data,
      showloading: false,
      baseUrlType:  'CAPTCHA_HOST',
      cancelToken:  setCancelSource()
    });
  }

//查询审批列表queryApproveProcessPageApi
export  function  queryApproveProcessPage(data)  {//岗位修改
    return  request({
      url:  "/device/device/approveProcess/queryApproveProcessPage",
      method:  "get",
      params: data,
      showloading: false,
      baseUrlType:  'CAPTCHA_HOST',
      cancelToken:  setCancelSource()
    });
  }
  //修改流程审批
  export  function  updateAp(data)  {
    return  request({
      url:  "/device/device/approveProcess/updateAP",
      method:  "get",
      params: data,
      showloading: false,
      baseUrlType:  'CAPTCHA_HOST',
      cancelToken:  setCancelSource()
    });
  }
  
  // 全部初始化流程
  export function initAllApprove(){
    return  request({
      url:  "/device/device/approveProcess/genDefaultProcess",
      method:  "get",
      showloading: false,
      baseUrlType:  'CAPTCHA_HOST',
      cancelToken:  setCancelSource()
    });
  }
//初始化选中机构
  export function initOrg(id){
    return  request({
      url:  "/device/device/approveProcess/genDefaultProcess/"+id,
      method:  "get",
      showloading: false,
      baseUrlType:  'CAPTCHA_HOST',
      cancelToken:  setCancelSource()
    });
  }
  