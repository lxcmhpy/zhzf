// 线下案卷api
import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";
import Vue from "vue";
let vm = new Vue();



//添加线下案卷
export  function  addofflinefile(data)  {
    return  request({
      url:  "/case/doc/offline/create",
      method:  "post",
      params:  data,
      contentType: "application/json",
      showloading: true,
      loadingType:'loadPart',
      cancelToken:  setCancelSource()
    });
  }
  
  //查询列表（分页）
  export  function  getSelectoffline(data)  {
    return  request({
      url:  "/case/doc/offline/findByCondition",
      method:  "get",
      params:  data,
      showloading: true,
      loadingType:'loadPart',
      cancelToken:  setCancelSource()
    });
  }

   //按id删除
   export  function  deleteofflinebyid(data)  {
    return  request({
      url:  "/case/doc/offline/deleteById/"+data,
      method:  "post",
      contentType: "application/json",
      showloading: true,
      loadingType:'loadPart',
      cancelToken:  setCancelSource()
    });
  }
  //条件查询 不分页
  export  function  getofflinebycondition(data)  {
    return  request({
      url:  "/case/doc/offline/findOffLineList",
      method:  "get",
      params:  data,
      showloading: true,
      loadingType:'loadPart',
      cancelToken:  setCancelSource()
    });
  }

  

