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
    showloading: true,
    loadingType:'loadPart',
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
    showloading: true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource(),
    // responseType: 'blob'
  });
}

// 上传证据
export  function  uploadEvApi(data)  {
  console.log("789",data);
  return  request({
    url:  "/sys/file/uploadEv",
    method:  "POST",
    data: data,
    contentType: 'multipart/form-data;',
    showloading: true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource(),
  });
}
//根据主键ID查询文件
export function findFileByIdApi(id) {
  return  request({
    url:  "/sys/file/findById/"+id,
    method:  "GET",
    showloading: true,
    loadingType:'loadPart',
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
        showloading: true,
        loadingType:'loadPart',
        // responseType: 'blob',
        cancelToken:  setCancelSource(),
      });
}

//根据主键ID删除附件
export function deleteFileByIdApi(fileId) {
  return  request({
    url:  "/sys/file/delete/"+fileId,
    method:  "GET",
    showloading: true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource(),
  });
}
