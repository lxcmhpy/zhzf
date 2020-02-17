import { getAllPersonApi,addPersonApi,updatePersonApi,deletePersonApi,deletePersonByIdApi,
         getAwardListApi,addAwardApi,updateAwardApi,deleteAwardApi,deleteAwardByIdApi,
         getEducationListApi,addEducationApi,updateEducationApi,deleteEducationApi,deleteEducationByIdApi,
         getDictInfoAllApi,getDictInfoByCodeApi } from "@/api/person";

const person = {
  state:{

  },
  mutations:{

  },
  actions:{
    //查询数据字典begin
    getDictInfoByCode({commit},data){
      return new Promise((resolve,reject)=>{
        getDictInfoByCodeApi(data).then(
          res=>{resolve(res)},
          error=>{reject(error)}
        )
      })
    },
    getDictInfoAll({commit},data){
      return new Promise((resolve,reject)=>{
        getDictInfoAllApi(data).then(
          res=>{resolve(res)},
          error=>{reject(error)}
        )
      })
    },
    //查询数据字典end
    //查询所有的用户信息
    getAllPerson({commit},data){
      return new Promise((resolve, reject) => {
        getAllPersonApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    //添加用户信息
    addPersonInfo({commit},data){
      return new Promise((resolve, reject) => {
        addPersonApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    //修改执法人员信息
    updatePersonInfo({commit},data){
      return new Promise((resolve, reject) => {
        updatePersonApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    //删除执法人员信息
    deletePersonInfo({commit},data){
      return new Promise((resolve, reject) => {
        deletePersonApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    //根据id删除执法人员信息
    deletePersonInfoById({commit},personId){
      return new Promise((resolve, reject) => {
        deletePersonByIdApi(personId).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    //////////////////////////人员奖励begin//////////////////////////////////////
    //查询奖励所有的用户信息
    getAwardListMoudle({commit},data){
      return new Promise((resolve, reject) => {
        getAwardListApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    //添加用户信息
    addAwardMoudle({commit},data){
      return new Promise((resolve, reject) => {
        addAwardApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    //修改执法人员信息
    updateAwardMoudle({commit},data){
      return new Promise((resolve, reject) => {
        updateAwardApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    //删除执法人员信息
    deleteAwardByIdModudle({commit},data){
      return new Promise((resolve, reject) => {
        deleteAwardApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    //根据id删除执法人员信息
    deleteAwardByIdMoudle({commit},awardId){
      return new Promise((resolve, reject) => {
        deleteAwardByIdApi(awardId).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    //////////////////////////人员教育begin//////////////////////////////////////
    //查询所有的用户信息
    getEducationListMoudle({commit},data){
      return new Promise((resolve, reject) => {
        getEducationListApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    //添加用户信息
    addEducationMoudle({commit},data){
      return new Promise((resolve, reject) => {
        addEducationApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    //修改执法人员信息
    updateEducationMoudle({commit},data){
      return new Promise((resolve, reject) => {
        updateEducationApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    //删除执法人员信息
    deleteEducationMoudle({commit},data){
      return new Promise((resolve, reject) => {
        deleteEducationApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    //根据id删除执法人员信息
    deleteEducationByIdMoudle({commit},educationId){
      return new Promise((resolve, reject) => {
        deleteEducationByIdApi(educationId).then(
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
