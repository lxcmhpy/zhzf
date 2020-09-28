import {
  getFileStreamByStorageIdApi,
} from "@/api/notice/upload"; 
//公用方法
let util = {};

util.com_getFileStream = async function (storageId) {
  let fileStreamRes;
  try {
    fileStreamRes = await getFileStreamByStorageIdApi(storageId);
  } catch (err) {
    throw new Error(err);
  }
  let url = null;
  if (window.createObjectURL != undefined) { // basic
    url = window.createObjectURL(fileStreamRes);
  } else if (window.webkitURL != undefined) { // webkit or chrome
    try {
      url = window.webkitURL.createObjectURL(fileStreamRes);
    } catch (error) {}
  } else if (window.URL != undefined) { // mozilla(firefox)
    try {
      url = window.URL.createObjectURL(fileStreamRes);
    } catch (error) {}
  }
  return url;
}









export default util;
