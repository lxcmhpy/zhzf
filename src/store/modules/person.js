import { getAllPersonApi,addPersonApi,updatePersonApi,deletePersonApi,deletePersonByIdApi,
         getAwardListApi,addAwardApi,updateAwardApi,deleteAwardApi,deleteAwardByIdApi,
         getEducationListApi,addEducationApi,updateEducationApi,deleteEducationApi,deleteEducationByIdApi,
         getDictInfoAllApi,getDictInfoByCodeApi,getApproveListApi,addApproveApi,updateApproveApi,deleteApproveApi,deleteApproveByIdApi,
         getAnnualreviewListApi,addAnnualreviewApi,updateAnnualreviewApi,deleteAnnualreviewApi,deleteAnnualreviewByIdApi,
         getTransferListApi,addTransferApi,updateTransferApi,deleteTransferApi,deleteTransferByIdApi,
         getPerCertListApi,addPerCertApi,updatePerCertApi,deletePerCertApi,deletePerCertByIdApi,
         getTrainListApi,addTrainApi,updateTrainApi,deleteTrainApi,deleteTrainByIdApi,
        } from "@/api/person";

const person = {
  state:{
      personInfo:{},//人员id
      pageStatus:'',//区分页面状态
  },
  mutations:{
      //设置人员id
      setPersonInfo(state,data,param){
        state.personInfo = data;
        state.pageStatus = param;
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
/////////////////////////////////////////////用户基本信息///////////////////////////////
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
    deleteAwardModudle({commit},data){
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
    getPerCertListMoudle({commit},data){
      return new Promise((resolve, reject) => {
        getPerCertListApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    addPerCertMoudle({commit},data){
      return new Promise((resolve, reject) => {
        addPerCertApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    updatePerCertMoudle({commit},data){
      return new Promise((resolve, reject) => {
        updatePerCertApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    deletePerCertMoudle({commit},data){
      return new Promise((resolve, reject) => {
        deletePerCertApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    deletePerCertByIdMoudle({commit},certId){
      return new Promise((resolve, reject) => {
        deletePerCertByIdApi(certId).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
//////////////////////////人员调岗信息begin//////////////////////////////////////
    getTransferListMoudle({commit},data){
      return new Promise((resolve, reject) => {
        getTransferListApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    addTransferMoudle({commit},data){
      return new Promise((resolve, reject) => {
        addTransferApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    updateTransferMoudle({commit},data){
      return new Promise((resolve, reject) => {
        updateTransferApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    deleteTransferMoudle({commit},data){
      return new Promise((resolve, reject) => {
        deleteTransferApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    deleteTransferByIdMoudle({commit},transferId){
      return new Promise((resolve, reject) => {
        deleteTransferByIdApi(transferId).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
//////////////////////////人员审批信息begin//////////////////////////////////////
    getApproveListMoudle({commit},data){
      return new Promise((resolve, reject) => {
        getApproveListApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    addApproveMoudle({commit},data){
      return new Promise((resolve, reject) => {
        addApproveApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    updateApproveMoudle({commit},data){
      return new Promise((resolve, reject) => {
        updateApproveApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    deleteApproveMoudle({commit},data){
      return new Promise((resolve, reject) => {
        deleteApproveApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    deleteApproveByIdMoudle({commit},approveId){
      return new Promise((resolve, reject) => {
        deleteApproveByIdApi(approveId).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
 //////////////////////////人员年审信息begin//////////////////////////////////////
    getAnnualreviewListMoudle({commit},data){
      return new Promise((resolve, reject) => {
        getAnnualreviewListApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    addAnnualreviewMoudle({commit},data){
      return new Promise((resolve, reject) => {
        addAnnualreviewApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    updateAnnualreviewMoudle({commit},data){
      return new Promise((resolve, reject) => {
        updateAnnualreviewApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    deleteAnnualreviewMoudle({commit},data){
      return new Promise((resolve, reject) => {
        deleteAnnualreviewApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    deleteAnnualreviewByIdMoudle({commit},reviewId){
      return new Promise((resolve, reject) => {
        deleteAnnualreviewByIdApi(reviewId).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
///////////////////////////////////////////////人员培训信息begin////////////////////////////////////
    getTrainListMoudle({commit},data){
      return new Promise((resolve, reject) => {
        getTrainListApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    addTrainMoudle({commit},data){
      return new Promise((resolve, reject) => {
        addTrainApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    updateTrainMoudle({commit},data){
      return new Promise((resolve, reject) => {
        updateTrainApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    deleteTrainMoudle({commit},data){
      return new Promise((resolve, reject) => {
        deleteTrainApi(data).then(
              res => {
                  resolve(res);
              },
              error => {
                  reject(error);
              })
      })
    },
    deleteTrainByIdMoudle({commit},trainId){
      return new Promise((resolve, reject) => {
        deleteTrainByIdApi(trainId).then(
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
