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

// 上传证据
export  function  uploadEvApi(data)  {
  return  request({
    url:  "/sys/file/uploadEv",
    method:  "POST",
    data: data,
    contentType: 'multipart/form-data;',
    showloading:  true,
    cancelToken:  setCancelSource(),
  });
}
//根据主键ID查询文件
export function findFileByIdApi(id) {
  return  request({
    url:  "/sys/file/findById/"+id,
    method:  "GET",
    showloading:  true,
    cancelToken:  setCancelSource(),
  });
}
