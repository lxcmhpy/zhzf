import { getAllPersonApi,addPersonApi,updatePersonApi,deletePersonApi,deletePersonByIdApi,
         getAwardListApi,addAwardApi,updateAwardApi,deleteAwardApi,deleteAwardByIdApi,
         getEducationListApi,addEducationApi,updateEducationApi,deleteEducationApi,deleteEducationByIdApi,
         getDictInfoAllApi,getDictInfoByCodeApi ,getCertInfoListMoudledApi,getAdjustingPostsMoudledApi,
         getApproveMoudledApi,getAnnualReviewMoudledApi} from "@/api/person";

const person = {
  state:{
      personInfo:{},//人员id
  },
  mutations:{
      //设置人员id
      setPersonInfo(state,data){
        state.personInfo = data;
    }
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
//////////////////////////人员证件begin//////////////////////////////////////
    //根据personId查询人员证件信息
    getCertInfoListMoudle({commit},data){
      return new Promise((resolve, reject) => {
        getCertInfoListMoudledApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    
    //////////////////////////人员调岗信息begin//////////////////////////////////////
    //根据personId查询人员调岗信息
    geAdjustingPostsMoudle({commit},data){
      return new Promise((resolve, reject) => {
        getAdjustingPostsMoudledApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    //////////////////////////人员审批信息begin//////////////////////////////////////
    //根据personId查询人员审批信息
    getApproveMoudled({commit},data){
      return new Promise((resolve, reject) => {
        getApproveMoudledApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    //////////////////////////人员年审信息begin//////////////////////////////////////
    //根据personId查询人员审批信息
    getAnnualReviewMoudled({commit},data){
      return new Promise((resolve, reject) => {
        getAnnualReviewMoudledApi(data).then(
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
