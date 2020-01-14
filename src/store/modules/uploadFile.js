import { upload } from "@/api/upload";
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
    }
  }
}
export default uploadFile
