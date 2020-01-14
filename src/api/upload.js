import  request  from  "@/js/request";
import  {setCancelSource}  from  "@/js/cancelToken";
// 文件上传
export  function  upload(data)  {
  return  request({
    url:  "/sys/file/upload",
    method:  "POST",
    params:  data,
    showloading:  true,
    cancelToken:  setCancelSource()
  });
}
