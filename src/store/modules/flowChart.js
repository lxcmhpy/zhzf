import { getFlowStatusByCaseIdApi } from "@/api/flowChart";
const flowChart = {
  state:{

  },
  mutations:{

  },
  actions:{
    //
    getFlowStatusByCaseId({commit},data){
      return new Promise((resolve, reject) => {
        getFlowStatusByCaseIdApi(data).then(
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
export default flowChart
