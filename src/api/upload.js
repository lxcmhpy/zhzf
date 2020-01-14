// 文件上传
export  function  getSelectOrganApi(data)  {
  return  request({
    url:  "/catsic/sys/file/upload",
    method:  "POST",
    params:  data,
    showloading:  true,
    cancelToken:  setCancelSource()
  });
}
