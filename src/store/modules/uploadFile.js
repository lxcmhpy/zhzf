import { upload,getFile } from "@/api/upload";
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
    }
  }
}
export default uploadFile
