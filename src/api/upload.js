import  request  from  "@/common/js/request";
import  {setCancelSource}  from  "@/common/js/cancelToken";
// 文件上传
export  function  upload(data)  {
  console.log('文件上传api',data);
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
// 上传2020-2-25 上传-
export function uploadEvdence(data) {
    return  request({
        url:  "/sys/file/uploadEvdence",
        method:  "POST",
        data: data,
        contentType: 'multipart/form-data;',
        showloading:  true,
        cancelToken:  setCancelSource(),
      });
}
