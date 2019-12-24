import  request  from  "@/js/request";
import  {setCancelSource}  from  "@/js/cancelToken";
import  Vue  from  "vue";

let  vm  =  new  Vue();

//获取用户下的所有机构
export  function  getLawCategoryListApi(data)  {
    return  request({
      url:  "",
      method:  "get",
      params: data,
      showloading:  true,
      cancelToken:  setCancelSource()
    });
  }