import { yehuCheckApi, crewCheckApiIdcard, crewCheckApiCertificates, dlyscyryCheckApi, yyclCheckApi,vehicleCheckApi } from "@/api/checkInfo";
import {getDictListDetailApi} from "@/api/system.js";

const person = {
    state: {
        //  personInfo:{},//人员id
    },
    mutations: {
        //设置人员id
        //  setPersonInfo(state,data){
        //    state.personInfo = data;
        // }
    },
    actions: {
        //业户查验
        yehuCheck({ commit }, data) {
            return new Promise((resolve, reject) => {
                yehuCheckApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //船员适任证查验
        crewCheck({ commit }, data) {
            console.log('查验', data)
            return new Promise((resolve, reject) => {
                crewCheckApiCertificates(data).then(
                    res => {
                        if (res.data.length != 0) {
                            resolve(res.data);
                        }
                        else {
                            crewCheckApiIdcard(data).then(
                                res => {
                                    resolve(res.data);
                                },
                                error => {
                                    reject(error);
                                })
                        }
                    },
                    error => {
                        reject(error);
                    })
            })
        },
         //道路运输从业人员查验
         dlyscyryCheck({ commit }, data) {
            return new Promise((resolve, reject) => {
                dlyscyryCheckApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
         //营运车辆查验
         yyclCheck({ commit }, data) {
            return new Promise((resolve, reject) => {
                yyclCheckApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
      //营运车辆查验
      vehicleCheck({ commit }, data) {
        return new Promise((resolve, reject) => {
          vehicleCheckApi(data).then(
            res => {
              resolve(res);
            },
            error => {
              reject(error);
            })
        })
      },

    }
}
export default person
