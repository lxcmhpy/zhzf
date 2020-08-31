import  request  from  "@/common/js/request";
import  {setCancelSource}  from  "@/common/js/cancelToken";
// 文件上传
export  function  upload(data)  {
  console.log('文件上传api',data);
  return  request({
    url:  "/case/sys/file/upload",
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
    url:  "/case/sys/file/findByCaseIdAndDocId",
    method:  "GET",
    params: data,
    // contentType: 'multipart/form-data;',
    showloading: true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource(),
    // responseType: 'blob'
  });
}

export function getFileByCaseId(data) {
  return  request({
    url:  "/case/sys/file/findByCaseId/"+ data.caseId,
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
    url:  "/case/sys/file/uploadEv",
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
    url:  "/case/sys/file/findById/"+id,
    method:  "GET",
    showloading: true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource(),
  });
}
// 上传2020-2-25 上传-
export function uploadEvdence(data) {
    console.log(data);
    return  request({
        url:  "/case/sys/file/uploadEvdence",
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
    url:  "/case/sys/file/delete/"+fileId,
    method:  "GET",
    showloading: true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource(),
  });
}
//文件上传公共接口-case
export function uploadCommon(data) {
  return  request({
    url:  "/case/sys/file/uploadCommon",
    method:  "POST",
    data: data,
    contentType: 'multipart/form-data;',
    showloading: false,
    cancelToken:  setCancelSource(),
  });
}
//文件下载接口
export function downLoadCommon(data) {
  return  request({
    url:  "/case/sys/file/download/"+data,
    method:  "GET",
    showloading: true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource(),
  });
}


export let uploadFuncO = {

  // 评议考核-上传文件
  uploadPykh(data) {
      return request({
              url: "/pykh/file/upload",
              method: "POST",
              data: data,
              contentType: 'multipart/form-data;',
              showloading: true,
              loadingType: 'loadProgress',
              cancelToken: setCancelSource(),
          }

      );
  }
  // upload(data)  {
  //   // 文件上传
  //   return  request({
  //     url:  "/case/sys/file/upload",
  //     method:  "POST",
  //     data: data,
  //     contentType: 'multipart/form-data;',
  //     showloading: true,
  //     loadingType:'loadPart',
  //     cancelToken:  setCancelSource(),
  //   });
  // },
  // uploadEvApi(data)  {
  //   // 上传证据
  //   console.log("789",data);
  //   return  request({
  //     url:  "/case/sys/file/uploadEv",
  //     method:  "POST",
  //     data: data,
  //     contentType: 'multipart/form-data;',
  //     showloading: true,
  //     loadingType:'loadPart',
  //     cancelToken:  setCancelSource(),
  //   });
  // },
  // uploadEvdence(data) {
  //   // 上传2020-2-25 上传-
  //   return  request({
  //       url:  "/case/sys/file/uploadEvdence",
  //       method:  "POST",
  //       data: data,
  //       contentType: 'multipart/form-data;',
  //       showloading: true,
  //       loadingType:'loadPart',
  //       cancelToken:  setCancelSource(),
  //     });
  // }
}


