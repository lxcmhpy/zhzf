import  request  from  "@/js/request";
import  {setCancelSource}  from  "@/js/cancelToken";
// 文件上传
export  function  upload(data)  {
  return  request({
    url:  "/sys/file/upload",
    method:  "POST",
    data: data,
    contentType: 'multipart/form-data;',
    showloading:  true,
    cancelToken:  setCancelSource(),
    // responseType: 'blob'
  });
}
export function getFile(data) {
  return  request({
    url:  "/sys/file/findByCaseIdAndDocId",
    method:  "GET",
    params: data,
    // contentType: 'multipart/form-data;',
    showloading:  true,
    cancelToken:  setCancelSource(),
    // responseType: 'blob'
  });
}
