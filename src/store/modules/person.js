import { getAllPersonApi,addPersonApi,updatePersonApi,deletePersonApi,deletePersonByIdApi,getAwardListApi,addAwardApi,updateAwardApi,deleteAwardApi,deleteAwardByIdApi,getEducationListApi,
    addEducationApi,updateEducationApi,deleteEducationApi,deleteEducationByIdApi,getDictInfoAllApi,getDictInfoByCodeApi,getApproveListApi,addApproveApi,updateApproveApi,deleteApproveApi,
    deleteApproveByIdApi,getAnnualreviewListApi,addAnnualreviewApi,updateAnnualreviewApi,deleteAnnualreviewApi,deleteAnnualreviewByIdApi,getTransferListApi,addTransferApi,updateTransferApi,
    deleteTransferApi,deleteTransferByIdApi,getPerCertListApi,addPerCertApi,updatePerCertApi,deletePerCertApi,deletePerCertByIdApi,getTrainListApi,addTrainApi,updateTrainApi,deleteTrainApi,
    deleteTrainByIdApi,findAllDrawerByNameApi,findOrganTreeByCurrUserApi,findStationApi,getDetailInfoApi,applyApproveApi,applyDdApi,applyDlApi,applyTxApi,getStaffInListApi,
    acceptTransferApi,refuseTransferApi,cancelTransferApi,getEnfDeleteAllApi,getEnfListApi,getEnfAddApi,getEnfUpdateApi,stationAddApi,stationListApi,stationUpdateApi,stationDeleteByIdApi,
    lossDocApi,withholdApi,unWithholdApi,logoffApi,revokeApi,getYearApi,approveArApi,reApproveArApi,queryRArDataApi,paramListApi,paramUpdateApi,getStaffOutListApi,getLastApproveRecordApi,getCertHistoryPageListApi,
    queryPersonCertApi,getApproveApi,getQueryArDataByPersonIdApi,unLossDocApi,queryByOidApi,queryApproveProcessPageApi,updateApApi,getCertNoApi,changeCertByEndDateApi,examInfoPageListApi,addExamInfoApi
    ,getProvinceCode,deleteExamInfoByIdApi,updateExamInfoApi,deleteTrainInfoByIdApi,updateTrainInfoApi,addTrainInfoApi,trainInfoPageListApi, initAllApprove, personEdabled,uploadMaterial,
    savePersonMaterial, getAllOrigin, savePersonPhoto,getScheduleJobPageApi,addScheduleJobApi,updateScheduleJobApi,cacheQuestionRedisApi,resumeScheduleJobInfoApi,deleteScheduleJobApi,repauseAllJobApi,pauseAllJobApi,
    resumejobApi,pausejobApi,getJxExamListApi,getJxExamMesageApi,getJxTrainListApi,getJxTrainMessageApi,statisticByAgeApi,statisticByChannelApi,statisticByYearAddApi,statisticByEducationLevelApi,statisticByBranchApi,statisticByMajorApi,
    deleteVersionApi,addVersionApi,updateVersionApi,getVersionApi,savePersonCardApi,exportPersonPdfApi
  } from "@/api/person";

import { MessageBox } from 'element-ui';
  
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
  //根据名称查询数据字典
  findAllDrawerByName({commit},data){
  return new Promise((resolve,reject)=>{
    findAllDrawerByNameApi(data).then(
      res=>{resolve(res)},
      error=>{reject(error)}
    )
  })
  },
  findOrganTreeByCurrUser({commit},data){
  return new Promise((resolve,reject)=>{
    findOrganTreeByCurrUserApi(data).then(
      res=>{resolve(res)},
      error=>{reject(error)}
    )
  })
  },
  findStation({commit},data){
  return new Promise((resolve,reject)=>{
    findStationApi(data).then(
      res=>{resolve(res)},
      error=>{reject(error)}
    )
  })
  },
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
  getPersonDetailInfo({commit},data){
  return new Promise((resolve, reject) => {
    getDetailInfoApi(data).then(
          res => {
              resolve(res);
          },
          error => {
              reject(error);
          })
  })
  },
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
  
  savePersonCard({commit},data){
    return new Promise((resolve, reject) => {
        savePersonCardApi(data).then(
            res => {
                resolve(res);
            },
            error => {
                reject(error);
            })
    })
    },
   
    exportPersonPdf({commit},data){
        return new Promise((resolve, reject) => {
            exportPersonPdfApi(data).then(
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
  queryPersonCert({commit},data){
  return new Promise((resolve, reject) => {
    queryPersonCertApi(data).then(
          res => {
              resolve(res);
          },
          error => {
              reject(error);
          })
  })
  },
  getCertHistoryPageList({commit},certId){
  return new Promise((resolve, reject) => {
    getCertHistoryPageListApi(certId).then(
          res => {
              resolve(res);
          },
          error => {
              reject(error);
          })
  })
  },
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
  //证件挂失
  lossDocMoudle({commit},data){
  return new Promise((resolve, reject) => {
    lossDocApi(data).then(
          res => {
              resolve(res);
          },
          error => {
              reject(error);
          })
  })
  },
  //解除挂失
  unLossDocMoudle({commit},data){
  return new Promise((resolve, reject) => {
    unLossDocApi(data).then(
          res => {
              resolve(res);
          },
          error => {
              reject(error);
          })
  })
  },
  //证件暂扣
  withholdMoudle({commit},data){
  return new Promise((resolve, reject) => {
    withholdApi(data).then(
          res => {
              resolve(res);
          },
          error => {
              reject(error);
          })
  })
  },
  //证件解除暂扣
  unWithholdMoudle({commit},data){
  return new Promise((resolve, reject) => {
    unWithholdApi(data).then(
          res => {
              resolve(res);
          },
          error => {
              reject(error);
          })
  })
  },
  //证件注销
  logoffMoudle({commit},data){
  return new Promise((resolve, reject) => {
    logoffApi(data).then(
          res => {
              resolve(res);
          },
          error => {
              reject(error);
          })
  })
  },
  //证件吊销
  revokeMoudle({commit},data){
  return new Promise((resolve, reject) => {
    revokeApi(data).then(
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
  getLastApproveRecord({commit},personId){//申请退休
  return new Promise((resolve, reject) => {
    getLastApproveRecordApi(personId).then(
      res => {
          resolve(res);
      },
      error => {
          reject(error);
      })
  })
  },
  applyTx({commit},data){//申请退休
  return new Promise((resolve, reject) => {
    applyTxApi(data).then(
      res => {
          resolve(res);
      },
      error => {
          reject(error);
      })
  })
  },
  applyDl({commit},data){//申请调离
  return new Promise((resolve, reject) => {
    applyDlApi(data).then(
      res => {
          resolve(res);
      },
      error => {
          reject(error);
      })
  })
  },
  applyDd({commit},data){//申请调动
  return new Promise((resolve, reject) => {
    applyDdApi(data).then(
      res => {
          resolve(res);
      },
      error => {
          reject(error);
      })
  })
  },
  //分页查询审批列表
  getApproveMoudle({commit},data){
  return new Promise((resolve, reject) => {
    getApproveApi(data).then(
          res => {
              resolve(res);
          },
          error => {
              reject(error);
          })
  })
  },
  applyApprove({commit},data){//申请审批
  return new Promise((resolve, reject) => {
    applyApproveApi(data).then(
      res => {
          resolve(res);
      },
      error => {
          reject(error);
      })
  })
  },
  //分页查询审批列表
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
  getQueryArDataByPersonId({commit},data){
  return new Promise((resolve, reject) => {
  getQueryArDataByPersonIdApi(data).then(
        res => {
            resolve(res);
        },
        error => {
            reject(error);
        })
  })
  },
  
  //年审审批
  approveAr({commit},data){
  return new Promise((resolve, reject) => {
  approveArApi(data).then(
      res => {
          resolve(res);
      },
      error => {
          reject(error);
      })
  })
  },
    //复审审批
    reApproveAr({commit},data){
        return new Promise((resolve, reject) => {
          reApproveArApi(data).then(
            res => {
                resolve(res);
            },
            error => {
                reject(error);
            })
        })
        },
  
  //复审查询
  queryRArDataMoudle({commit},data){
  return new Promise((resolve, reject) => {
  queryRArDataApi(data).then(
      res => {
          resolve(res);
      },
      error => {
          reject(error);
      })
  })
  },
  //人员年审列表
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
  //获取年份信息
  getYearMoudle({commit},data){
  return new Promise((resolve, reject) => {
    getYearApi(data).then(
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
  trainInfoPageListMoudle({commit},data){
  return new Promise((resolve, reject) => {
    trainInfoPageListApi(data).then(
          res => {
              resolve(res);
          },
          error => {
              reject(error);
          })
  })
  },
  addTrainInfoMoudle({commit},data){
  return new Promise((resolve, reject) => {
    addTrainInfoApi(data).then(
          res => {
              resolve(res);
          },
          error => {
              reject(error);
          })
  })
  },
  updateTrainInfoMoudle({commit},data){
  return new Promise((resolve, reject) => {
    updateTrainInfoApi(data).then(
          res => {
              resolve(res);
          },
          error => {
              reject(error);
          })
  })  
  },
  deleteTrainInfoByIdMoudle({commit},data){
  return new Promise((resolve, reject) => {
    deleteTrainInfoByIdApi(data).then(
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
    ///////////////////////////////////////////////人员考试begin////////////////////////////////////
    examInfoPageListMoudle({commit},data){  //查询考试列表
        return new Promise((resolve, reject) => {
            examInfoPageListApi(data).then(
                res => {
                    resolve(res);
                },
                error => {
                    reject(error);
                })
        })
        },
        addExamInfoMoudle({commit},data){  //新增考试
        return new Promise((resolve, reject) => {
            addExamInfoApi(data).then(
                res => {
                    resolve(res);
                },
                error => {
                    reject(error);
                })
        })
        },
        deleteExamInfoByIdMoudle({commit},data){  //删除考试
        return new Promise((resolve, reject) => {
            deleteExamInfoByIdApi(data).then(
                res => {
                    resolve(res);
                },
                error => {
                    reject(error);
                })
        })
        },
        updateExamInfoMoudle({commit},data){  //修改
        return new Promise((resolve, reject) => {
            updateExamInfoApi(data).then(
                res => {
                    resolve(res);
                },
                error => {
                    reject(error);
                })
        })
        },      
  //////////////////////////////调入调出/////////////////////////////////////
  getStaffInList({commit},trainId){//调入
  return new Promise((resolve, reject) => {
    getStaffInListApi(trainId).then(
          res => {
              resolve(res);
          },
          error => {
              reject(error);
          })
  })
  },
  getStaffOutList({commit},data){//调出
  return new Promise((resolve, reject) => {
    getStaffOutListApi(data).then(
          res => {
              resolve(res);
          },
          error => {
              reject(error);
          })
  })
  },
  acceptTransfer({commit},transferId){//接受
  return new Promise((resolve, reject) => {
    acceptTransferApi(transferId).then(
          res => {
              resolve(res);
          },
          error => {
              reject(error);
          })
  })
  },
  refuseTransfer({commit},data){//拒绝
  return new Promise((resolve, reject) => {
    refuseTransferApi(data).then(
          res => {
              resolve(res);
          },
          error => {
              reject(error);
          })
  })
  },
  cancelTransfer({commit},transferId){//撤销
  return new Promise((resolve, reject) => {
    cancelTransferApi(transferId).then(
          res => {
              resolve(res);
          },
          error => {
              reject(error);
          })
  })
  },
  //////////////////////////////执法号段/////////////////////////////////////
  getEnfList({commit},data){//
  return new Promise((resolve, reject) => {
    getEnfListApi(data).then(
          res => {
              resolve(res);
          },
          error => {
              reject(error);
          })
  })
  },
  getProvinceCode({commit}){//获取省号
    return new Promise((resolve, reject) => {
      getProvinceCode().then(
          res => {
            resolve(res);
          },
          error => {
            reject(error);
          })
    })
  },
  getEnfAdd({commit},data){//
  return new Promise((resolve, reject) => {
    getEnfAddApi(data).then(
          res => {
              resolve(res);
          },
          error => {
              reject(error);
          })
  })
  },
  getEnfUpdate({commit},data){//
  return new Promise((resolve, reject) => {
    getEnfUpdateApi(data).then(
          res => {
              resolve(res);
          },
          error => {
              reject(error);
          })
  })
  },
  getEnfDeleteAll({commit},data){//
  return new Promise((resolve, reject) => {
    getEnfDeleteAllApi(data).then(
          res => {
              resolve(res);
          },
          error => {
              reject(error);
          })
  })
  },
  /////////////////////////人员系统管理///////////////////////////////
  getParamList({commit},data){//
  return new Promise((resolve, reject) => {
    paramListApi(data).then(
      res => {
          resolve(res);
      },
      error => {
          reject(error);
      })
  })
  },
  getParamUpdate({commit},data){//
  return new Promise((resolve, reject) => {
    paramUpdateApi(data).then(
      res => {
          resolve(res);
      },
      error => {
          reject(error);
      })
  })
  },
  getStationList({commit},data){//
  return new Promise((resolve, reject) => {
    stationListApi(data).then(
      res => {
          resolve(res);
      },
      error => {
          reject(error);
      })
  })
  },
  getStationAdd({commit},data){//
  return new Promise((resolve, reject) => {
    stationAddApi(data).then(
      res => {
          resolve(res);
      },
      error => {
          reject(error);
      })
  })
  },
  getStationUpdate({commit},data){//
  return new Promise((resolve, reject) => {
    stationUpdateApi(data).then(
      res => {
          resolve(res);
      },
      error => {
          reject(error);
      })
  })
  },
  getStationDeleteById({commit},data){//
  return new Promise((resolve, reject) => {
    stationDeleteByIdApi(data).then(
      res => {
          resolve(res);
      },
      error => {
          reject(error);
      })
  })
  },
  //流程审批配置查询
  queryByOidModul({commit},data){
  return new Promise((resolve, reject) => {
    queryByOidApi(data).then(
      res => {
          resolve(res);
      },
      error => {
          reject(error);
      })
  })
  },
  //流程审批配置查询
  queryApproveProcessPageModul({commit},data){
    return new Promise((resolve, reject) => {
      queryApproveProcessPageApi(data).then(
        res => {
            resolve(res);
        },
        error => {
            reject(error);
        })
    })
  },
   //修改审批流配置
   updateApModul({commit},data){
    return new Promise((resolve, reject) => {
      updateApApi(data).then(
        res => {
            resolve(res);
        },
        error => {
            reject(error);
        })
    })
  },
  //获取证号
  getCertNoModul({commit},data){
    return new Promise((resolve, reject) => {
      getCertNoApi(data).then(
            res => {
                resolve(res);
            },
            error => {
                reject(error);
            })
    })
  },
  //到期换证 
  changeCertByEndDateMoudle({commit},data){
    return new Promise((resolve, reject) => {
      changeCertByEndDateApi(data).then(
            res => {
                resolve(res);
            },
            error => {
                reject(error);
            })
    })
  },
  // 全部初始化流程
  initAllApprove(){
    return new Promise((resolve, reject) => {
      initAllApprove().then(res => {
        resolve(res);
      }, error => {reject(error)})
    })
  },
  // 判断是否可以修改
  personEdabled({commit},data) {
    return new Promise((resolve, reject) => {
      personEdabled(data).then(res => {
        resolve(res);
      }, error => {reject(error)})
    })
  },
  // 上传证明材料
  uploadMaterial({commit},data){
    return new Promise((resolve, reject) => {
      uploadMaterial(data).then(res => {
        resolve(res);
      }, error => {reject(error)})
    }) 
  },
  // 保存上传图片到人员信息
  personUploadMaterial({commit},data){
    return new Promise((resolve, reject) => {
      savePersonMaterial(data).then(res => {
        resolve(res);
      }, error => {reject(error)})
    })
  },
  // 保存人员照片
  savePersonPhoto({commit},data){
    return new Promise((resolve, reject) => {
      savePersonPhoto(data).then(res => {
        resolve(res);
      }, error => {reject(error)})
    })
  },
  // 获取所有机构无权限限制
  getOriginNoLimit({commit}, all){
    return new Promise((resolve, reject) => {
      getAllOrigin().then(res => {
        if(!all){
          res.data.forEach((item, index) => {
            if(item.pid === '0'){
              res.data.splice(index, 1);
              if(item.children && item.children.length){
                res.data = res.data.concat(item.children);
              }
            }
          })
        }
        resolve(res);
      }, error => {reject(error)})
    })
  },
    //任务查询
    getScheduleJobPageModul({commit},data){
        return new Promise((resolve, reject) => {
            getScheduleJobPageApi(data).then(
            res => {
                resolve(res);
            },
            error => {
                reject(error);
            })
        })
        },
         //考配置新增
         addScheduleJobModul({commit},data){
        return new Promise((resolve, reject) => {
            addScheduleJobApi(data).then(
            res => {
                resolve(res);
            },
            error => {
                reject(error);
            })
        })
        },
         //考配置修改
         updateScheduleJobModul({commit},data){
        return new Promise((resolve, reject) => {
            updateScheduleJobApi(data).then(
            res => {
                resolve(res);
            },
            error => {
                reject(error);
            })
        })
        },
        
               //考配置删除
               deleteScheduleJobModul({commit},data){
                return new Promise((resolve, reject) => {
                    deleteScheduleJobApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
                })
                },
        //暂停
        pausejob({commit},data){
            return new Promise((resolve, reject) => {
                pausejobApi(data).then(
                res => {
                    resolve(res);
                },
                error => {
                    reject(error);
                })
            })
            },
             //恢复
             resumejob({commit},data){
            return new Promise((resolve, reject) => {
                resumejobApi(data).then(
                res => {
                    resolve(res);
                },
                error => {
                    reject(error);
                })
            })
            },
            //全部暂停
            pauseAllJob({commit}){
            return new Promise((resolve, reject) => {
                pauseAllJobApi().then(
                res => {
                    resolve(res);
                },
                error => {
                    reject(error);
                })
            })
            },
         //全部恢复
         repauseAllJob({commit}){
            return new Promise((resolve, reject) => {
                repauseAllJobApi().then(
                res => {
                    resolve(res);
                },
                error => {
                    reject(error);
                })
            })
            },   
/////////////////////////江西个性化/////////////////////
         //考试列表查询
         getJxExamList({commit},data){
            return new Promise((resolve, reject) => {
                getJxExamListApi(data).then(
                res => {
                    resolve(res);
                },
                error => {
                    reject(error);
                })
            })
            }, 
         //考试信息查询
         getJxExamMessage({commit},data){
            return new Promise((resolve, reject) => {
                getJxExamMesageApi(data).then(
                res => {
                    resolve(res);
                },
                error => {
                    reject(error);
                })
            })
            },     
          //培训信息查询
          getJxTrainMessage({commit},data){
            return new Promise((resolve, reject) => {
                getJxTrainMessageApi(data).then(
                res => {
                    resolve(res);
                },
                error => {
                    reject(error);
                })
            })
            }, 
          //考试列表查询
          getJxTrainList({commit},data){
            return new Promise((resolve, reject) => {
                getJxTrainListApi(data).then(
                res => {
                    resolve(res);
                },
                error => {
                    reject(error);
                })
            })
            }, 
        ///////////////////////人员统计/////////////////////////
        //按年龄段统计
        statisticByAge({commit},data){
            return new Promise((resolve, reject) => {
                statisticByAgeApi(data).then(
                res => {
                    resolve(res);
                },
                error => {
                    reject(error);
                })
            })
            },
            //按渠道统计
            statisticByChannel({commit},data){
                return new Promise((resolve, reject) => {
                    statisticByChannelApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
                })
                },
         //按年度新增
         statisticByYearAdd({commit},data){
            return new Promise((resolve, reject) => {
                statisticByYearAddApi(data).then(
                res => {
                    resolve(res);
                },
                error => {
                    reject(error);
                })
            })
            },        
        //按文化程度
        statisticByEducationLevel({commit},data){
            return new Promise((resolve, reject) => {
                statisticByEducationLevelApi(data).then(
                res => {
                    resolve(res);
                },
                error => {
                    reject(error);
                })
            })
            },  

         //按执法门类
         statisticByBranchApi({commit},data){
            return new Promise((resolve, reject) => {
                statisticByBranchApi(data).then(
                res => {
                    resolve(res);
                },
                error => {
                    reject(error);
                })
            })
            },  
        //按专业
        statisticByMajor({commit},data){
            return new Promise((resolve, reject) => {
                statisticByMajorApi(data).then(
                res => {
                    resolve(res);
                },
                error => {
                    reject(error);
                })
            })
            },
      //////版本更新
      //新增版本信息
      addVersionModel({commit},data){
        return new Promise((resolve, reject) => {
            addVersionApi(data).then(
            res => {
                resolve(res);
            },
            error => {
                reject(error);
            })
        })
        },
    //修改版本信息
    updateVersionModel({commit},data){
        return new Promise((resolve, reject) => {
            updateVersionApi(data).then(
            res => {
                resolve(res);
            },
            error => {
                reject(error);
            })
        })
        },
    //删除版本信息
    deleteVersionModel({commit},data){
        return new Promise((resolve, reject) => {
            deleteVersionApi(data).then(
            res => {
                resolve(res);
            },
            error => {
                reject(error);
            })
        })
        },  
        //删除版本信息
    getVersionModel({commit},data){
        return new Promise((resolve, reject) => {
            getVersionApi(data).then(
            res => {
                resolve(res);
            },
            error => {
                reject(error);
            })
        })
        },
    // 修改人员信息时切换tabsMenu提示
    leaveEditPersonInfo({commit}, confirmMsg){
        return new Promise((resolve, reject) => {
            let leave = sessionStorage.getItem('LeavePersonInfoPage');
            if(leave && leave === '1'){
                MessageBox.confirm(confirmMsg, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    iconClass: 'el-icon-question',
                    customClass: 'custom-confirm'
                  })
                    .then(() => {
                      resolve(true);
                    })
                    .catch(() => {
                      resolve(false);
                    })
            } else {
                resolve(true);
            }
        })
    }

    }
  }
  export default person
  