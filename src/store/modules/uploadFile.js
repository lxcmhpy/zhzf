import { upload,getFile,uploadEvdence } from "@/api/upload";
const uploadFile = {
  state:{

  },
  mutations:{

  },
  actions:{
    //
    uploadFile({commit},data){
      return new Promise((resolve, reject) => {
        upload(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    getFile({commit},data){
      return new Promise((resolve, reject) => {
        getFile(data).then(
              res => {
                  resolve(res.data);
              },
              error => {
                  reject(error);
              })
      })
    },
    // uploadEvdence({commit},data){
    //     return new Promise((resolve, reject) => {
    //         uploadEvdence(data).then(
    //             res => {
    //                 resolve(res);
    //             },
    //             error => {
    //                 reject(error);
    //             })
    //     })
    // }
  }
}
export default uploadFile
