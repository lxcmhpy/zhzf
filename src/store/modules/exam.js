import {examOutlineTreeAllApi,examOutlineTreeByParentIdApi,getSystemParamApi,addExamOutlineApi,updateExamOutlineApi,deleteExamOutlineByIdApi,getExamBathListInfoApi,
    addExamBatchApi,deleteExamBantchApi,getPageManageListApi,addPageManageApi,deletePageManageApi,getInvigilatorPageListApi,getExamParsonListByExamApi,getExamParsonListByPersonApi,pageTempletePageListApi,
    addPageTempleteApi,deletePageTempleteByIdApi,updatePageTempleteApi,getOutlineQuestionListApi,addExamQuestionInfoApi,deleteExamQuestionInfoApi,updateExamQuestionInfoApi,selectExamQuestionInfoApi,disposeInfoApi,
    updateExamBatchApi,getUnSelectedPersonApi,addExamPersonApi,selectExamPersonApi,removeExamPersonApi,isCanUpdateTempleteApi,pageTempleteApi,updateTempleteApi,getAddInvigilatorApi,
    getExamPersonsSearchInfoApi,setBatchExamDelayedInfoApi,getpersonExamInfoListApi,getpersonExamQuestionApi,updateStatusApi
    ,getAllTempleteForSelectedApi,addRoomManageApi,roomManageListApi,deleteRoomManageByIdApi,getUnDispatchCountApi,addExamDispatchApi,getUnDispatchPersonByRoomIdApi,
    getDispatchPersonByRoomIdApi,removeDispatchApi,autoDispatchApi,getPageListApi,disPapersApi,examDetialApi,previewPageApi,exportInvigilatorApi,exportExamPersonApi,exporExamtDetailApi
    ,getExamAnswerReport,changeQuestionIsUse,applyPageVerifyApi,pageVerifyListByPageIdApi,verifyApi,awaitPageVerifyListApi,getExamManageScheduleApi,addExamScorerApi,getExamScorerListApi,
    changeQuestionLock,randomQuestion,randomParagraphQuestion
    ,saveReplaceQuestion,getSystemParams,updateExamScorerApi,deleteExamScorerByIdApi,getDisScorerListApi,getUnDisScorerListApi,addExamDisScorerApi,deleteExamDisScorerByIdsApi,questionDistributionApi} from "@/api/exam";
    
    import { loginExam, invigilatorSubmitInfo, getJoinExamPerson, signOutSystem, startQuestion, getpersonExamQuestionNextApi, getexamResultSubmitApi,examPersonsByInvigilatorIdApi,getExamInfoByInvigilatorInfoApi,
    addExamRollingApi,examRecordQueryApi,addExamRecordApi,deleteExamRecordApi,updateExamRecordApi,drawInfoApi,setBatchExamDelayedApi,getPersonExamStatus,getWaitScoringExam,getPersonScoreList,
    getWaitScoreQuestion,saveScoreResult, getSystemDate, checkEntryExam,examRecordQueryForManangeApi} from '@/api/joinExam';
    import * as types from "../mutation-types";
    
    const exam = {
      state:{
          examInfo:{}//试卷信息
      },
      mutations:{
          setExamInfo(state,data){
              state.examInfo=data;
          }
      },
      actions:{
         
         
          getSystemParamInfo({commit},data){
              return new Promise((resolve, reject) => {
                  getSystemParamApi(data).then(
                      res => {  resolve(res);   },
                      error => { reject(error); })
              })
          },
         
         
          deleteExamOutlineByIdInfo({commit},data){
              return new Promise((resolve, reject) => {
                  deleteExamOutlineByIdApi(data).then(
                      res => {  resolve(res);   },
                      error => { reject(error); })
              })
          },
    // ————————————————————————————————————————————————————————————题库管理BEGIN————————————————————————————————————————————————————————————————   
      //获取大纲树结构
    examOutlineTreeAllInfo({commit},data){
        return new Promise((resolve, reject) => {
            examOutlineTreeAllApi(data).then(
                res => {  resolve(res);   },
                error => { reject(error); })
        })
    },
    //获取大纲下子机构列表
    examOutlineTreeByParentIdInfo({commit},data){
        return new Promise((resolve, reject) => {
            examOutlineTreeByParentIdApi(data).then(
                res => {  resolve(res);   },
                error => { reject(error); })
        })
    },
    //新增大纲
    addExamOutlineInfo({commit},data){
        return new Promise((resolve, reject) => {
            addExamOutlineApi(data).then(
                res => {  resolve(res);   },
                error => { reject(error); })
        })
    },
    //修改大纲
    updateExamOutlineInfo({commit},data){
        return new Promise((resolve, reject) => {
            updateExamOutlineApi(data).then(
                res => {  resolve(res);   },
                error => { reject(error); })
        })
    },
    //获取大纲下的试题
    getOutlineQuestionList({commit},data){
        return new Promise((resolve, reject) => {
            getOutlineQuestionListApi(data).then(
                res => {  resolve(res);   },
                error => { reject(error); })
        })
    },
    //新增试题
    addExamQuestionInfo({commit},data){
        return new Promise((resolve, reject) => {
            addExamQuestionInfoApi(data).then(
                res => {  resolve(res);   },
                error => { reject(error); })
        })
    },
    //删除试题
    deleteExamQuestionInfo({commit},questionId){
        return new Promise((resolve, reject) => {
            deleteExamQuestionInfoApi(questionId).then(
                res => {  resolve(res);   },
                error => { reject(error); })
        })
    },
    //修改试题
    updateExamQuestionInfo({commit},data){
        return new Promise((resolve, reject) => {
            updateExamQuestionInfoApi(data).then(
                res => {  resolve(res);   },
                error => { reject(error); })
        })
    },
    //查询修改试题数据
    selectExamQuestionInfo({commit},questionId){
        return new Promise((resolve, reject) => {
            selectExamQuestionInfoApi(questionId).then(
                res => {  resolve(res);   },
                error => { reject(error); })
        })
    },
    // ————————————————————————————————————————————————————————————题库管理END————————————————————————————————————————————————————————————————   
    
    
    // ————————————————————————————————————————————————————————————考试批次管理BEGIN————————————————————————————————————————————————————————————————    
          //考试批次列表
          getExamBathListInfo({commit},data){
              return new Promise((resolve, reject) => {
                  getExamBathListInfoApi(data).then(
                      res => {  resolve(res);   },
                      error => { reject(error); })
              })
          },
          //新增
          addExamBatch({commit},data){
              return new Promise((resolve, reject) => {
                  addExamBatchApi(data).then(
                      res => {  resolve(res);   },
                      error => { reject(error); })
              })
          },
          //修改
          updateExamBatch({commit},data){
            return new Promise((resolve, reject) => {
                updateExamBatchApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
           //删除批次
          deleteExamBantch({commit},data){
              return new Promise((resolve, reject) => {
                  deleteExamBantchApi(data).then(
                      res => {  resolve(res);   },
                      error => { reject(error); })
              })
          },
          //配置完成
          disposeInfo({commit},data){
            return new Promise((resolve, reject) => {
                disposeInfoApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        //查询未分配参考人员
        getUnSelectedPerson({commit},data){
            return new Promise((resolve, reject) => {
                getUnSelectedPersonApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        //添加参考人员
        addExamPerson({commit},data){
            return new Promise((resolve, reject) => {
                addExamPersonApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        //移除参考人员
        removeExamPerson({commit},data){
            return new Promise((resolve, reject) => {
                removeExamPersonApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        //查询参考人员
        selectExamPerson({commit},data){
            return new Promise((resolve, reject) => {
                selectExamPersonApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        //批次管理查询可选择试卷列表
        getPageList({commit},data){
            return new Promise((resolve, reject) => {
                getPageListApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
           //选择试卷
           disPapers({commit},data){
            return new Promise((resolve, reject) => {
                disPapersApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        //考试详情
        examDetial({commit},data){
            return new Promise((resolve, reject) => {
                examDetialApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        //预览
        previewPage({commit},data){
            return new Promise((resolve, reject) => {
                previewPageApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
         //导出监考老师
         exportInvigilatorInfo({commit},data){
            return new Promise((resolve, reject) => {
                exportInvigilatorApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        
        //导出考场核对表
        exportExamPersonInfo({commit},data){
            return new Promise((resolve, reject) => {
                exportExamPersonApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
          //导出考试成绩
          exporExamtDetailInfo({commit},data){
            return new Promise((resolve, reject) => {
                exporExamtDetailApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        //查询考试批次下拉框列表
        getExamManageSchedule({commit},data){
            return new Promise((resolve, reject) => {
                getExamManageScheduleApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        //新增评分人
        addExamScorer({commit},data){
            return new Promise((resolve, reject) => {
                addExamScorerApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        //查询评分人列表
        getExamScorerList({commit},data){
            return new Promise((resolve, reject) => {
                getExamScorerListApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        //修改评分人
        updateExamScorer({commit},data){
            return new Promise((resolve, reject) => {
                updateExamScorerApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
         //删除评分人
         deleteExamScorerById({commit},data){
            return new Promise((resolve, reject) => {
                deleteExamScorerByIdApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        //获取已分配评分人
        getDisScorerList({commit},data){
            return new Promise((resolve, reject) => {
                getDisScorerListApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        //获取未分配的评分人
        getUnDisScorerList({commit},data){
            return new Promise((resolve, reject) => {
                getUnDisScorerListApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        //添加评分人
        addExamDisScorer({commit},data){
            return new Promise((resolve, reject) => {
                addExamDisScorerApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        //移除评分人
        deleteExamDisScorerByIds({commit},data){
            return new Promise((resolve, reject) => {
                deleteExamDisScorerByIdsApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
    // ————————————————————————————————————————————————————————————考试批次管理END———————————————————————————————————————————————————————————————— 
    
    // ————————————————————————————————————————————————————————————试卷管理BEGIN———————————————————————————————————————————————————————————————— 
          //试卷列表
          getPageManageList({commit},data){
              return new Promise((resolve, reject) => {
                  getPageManageListApi(data).then(
                      res => {  resolve(res);   },
                      error => { reject(error); })
              })
          },
            //新增试卷
            addPageManage({commit},data){
              return new Promise((resolve, reject) => {
                  addPageManageApi(data).then(
                      res => {  resolve(res);   },
                      error => { reject(error); })
              })
          },
            //删除试卷
            deletePageManage({commit},data){
              return new Promise((resolve, reject) => {
                  deletePageManageApi(data).then(
                      res => {  resolve(res);   },
                      error => { reject(error); })
              })
          },  
            //申请审核试卷
            applyPageVerify({commit},data){
                return new Promise((resolve, reject) => {
                    applyPageVerifyApi(data).then(
                        res => {  resolve(res);   },
                        error => { reject(error); })
                })
            },  
              //审核记录列表
            pageVerifyListByPageId({commit},data){
                return new Promise((resolve, reject) => {
                    pageVerifyListByPageIdApi(data).then(
                        res => {  resolve(res);   },
                        error => { reject(error); })
                })
        },
            //题目分布
            questionDistribution({commit},data){
                return new Promise((resolve, reject) => {
                    questionDistributionApi(data).then(
                        res => {  resolve(res);   },
                        error => { reject(error); })
                })
        },
        
        //审核列表
        awaitPageVerifyList({commit},data){
            return new Promise((resolve, reject) => {
                awaitPageVerifyListApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
    },
            //审核试卷
            verifyInfo({commit},data){
                return new Promise((resolve, reject) => {
                    verifyApi(data).then(
                        res => {  resolve(res);   },
                        error => { reject(error); })
                })
        },
        // 修改试卷锁定试卷
        changeQuestionLock({commit}, data){
            return new Promise((resolve, reject) => {
                changeQuestionLock(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        // 修改试卷随机试题
        randomQuestion({commit}, data){
            return new Promise((resolve, reject) => {
                randomQuestion(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        // 随机节段试题
        randomParagraphQuestion({commit}, data){
            return new Promise((resolve, reject) => {
                randomParagraphQuestion(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        // 保存替换后的试题
        saveReplaceQuestion({commit}, data){
            return new Promise((resolve, reject) => {
                saveReplaceQuestion(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
    // ————————————————————————————————————————————————————————————试卷管理END———————————————————————————————————————————————————————————————— 
    
    
    // ————————————————————————————————————————————————————————————监考管理BEGIN———————————————————————————————————————————————————————————————— 
           //试卷列表
           getInvigilatorPageList({commit},data){
              return new Promise((resolve, reject) => {
                  getInvigilatorPageListApi(data).then(
                      res => {  resolve(res);   },
                      error => { reject(error); })
              })
          },
          //根据考试查询考生列表
          getExamParsonListByExam({commit},data){
              return new Promise((resolve, reject) => {
                  getExamParsonListByExamApi(data).then(
                      res => {  resolve(res);   },
                      error => { reject(error); })
              })
          },
           //根据考试查询考生列表
           getExamParsonListByPerson({commit},data){
              return new Promise((resolve, reject) => {
                  getExamParsonListByPersonApi(data).then(
                      res => {  resolve(res);   },
                      error => { reject(error); })
              })
          },
    
    /** 添加监考老师信息 */
    getAddInvigilator({commit},data){
        return new Promise((resolve, reject) => {
            getAddInvigilatorApi(data).then(
                res => {  resolve(res);   },
                error => { reject(error); })
        })
    },
    /** 查询监考老师考试信息以及考场信息 */
    getExamInfoByInvigilatorInfo({commit},data){
        return new Promise((resolve, reject) => {
            getExamInfoByInvigilatorInfoApi(data).then(
                res => {  resolve(res);   },
                error => { reject(error); })
        })
    },
    /** 查询监考老师考试信息以及考场信息 */
    getExamPersonsSearchInfo({commit},data){
        return new Promise((resolve, reject) => {
            getExamPersonsSearchInfoApi(data).then(
                res => {  resolve(res);   },
                error => { reject(error); })
        })
    },
    /** 查询监考老师考试信息以及考场信息 */
    setBatchExamDelayedInfo({commit},data){
        return new Promise((resolve, reject) => {
            setBatchExamDelayedInfoApi(data).then(
                res => {  resolve(res);   },
                error => { reject(error); })
        })
    },
    // ————————————————————————————————————————————————————————————监考管理END———————————————————————————————————————————————————————————————— 
    
    
    // ————————————————————————————————————————————————————————————模板管理BEGIN———————————————————————————————————————————————————————————————— 
    //根据考试查询考生列表
          pageTempletePageList({commit},data){
              return new Promise((resolve, reject) => {
                  pageTempletePageListApi(data).then(
                      res => {  resolve(res);   },
                      error => { reject(error); })
              })
          },
          
          //添加模板
          addPageTemplete({commit},data){
              return new Promise((resolve, reject) => {
                  addPageTempleteApi(data).then(
                      res => {  resolve(res);   },
                      error => { reject(error); })
              })
          },
          
           //修改模板
           updatePageTemplete({commit},data){
              return new Promise((resolve, reject) => {
                  updatePageTempleteApi(data).then(
                      res => {  resolve(res);   },
                      error => { reject(error); })
              })
          },
          //删除模板
          deletePageTempleteById({commit},data){
              return new Promise((resolve, reject) => {
                  deletePageTempleteByIdApi(data).then(
                      res => {  resolve(res);   },
                      error => { reject(error); })
              })
          },
          //校验是否可以修改
          isCanUpdateTemplete({commit},data){
            return new Promise((resolve, reject) => {
                isCanUpdateTempleteApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        //查询模板节段信息
        pageTemplete({commit},data){
            return new Promise((resolve, reject) => {
                pageTempleteApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        //修改启动状态
        updateStatus({commit},data){
            return new Promise((resolve, reject) => {
                updateStatusApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        //获取所有模板
        getAllTempleteForSelected({commit},data){
            return new Promise((resolve, reject) => {
                getAllTempleteForSelectedApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        
    // ————————————————————————————————————————————————————————————模板管理END————————————————————————————————————————————————————————————————  
    
    
    // ————————————————————————————————————————————————————————————考场管理BEGIN————————————————————————————————————————————————————————————————   
        //新增考场
        addRoomManage({commit},data){
            return new Promise((resolve, reject) => {
                addRoomManageApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
       
    
        
         //查询未分配考场的考生
         getUnDispatchPersonByRoomId({commit},data){
            return new Promise((resolve, reject) => {
                getUnDispatchPersonByRoomIdApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
         //查询已分配考场的考生
         getDispatchPersonByRoomId({commit},data){
            return new Promise((resolve, reject) => {
                getDispatchPersonByRoomIdApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        //分配考场
        addExamDispatch({commit},data){
            return new Promise((resolve, reject) => {
                addExamDispatchApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
          //移除考场
          removeDispatch({commit},data){
            return new Promise((resolve, reject) => {
                removeDispatchApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
         //自动分配考场
        autoDispatch({commit},data){
            return new Promise((resolve, reject) => {
                autoDispatchApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        //查询未分配考场人数
        getUnDispatchCount({commit},data){
            return new Promise((resolve, reject) => {
                getUnDispatchCountApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        // 获取答题报告
        getExamAnswerReport({commit},data){
            return new Promise((resolve, reject) => {
                getExamAnswerReport(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
    // ————————————————————————————————————————————————————————————考场管理END———————————————————————————————————————————————————————————————— 
    
    // ————————————————————————————————————————————————————————————参考人员begin————————————————————————————————————————————————————————————————  
        /** 获取参考人员考试信息 */
        getpersonExamInfoList({commit},data){
            return new Promise((resolve, reject) => {
                getpersonExamInfoListApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        /** 获取考生对应考试的考试装填 */
        getPersonExamStatus({commit},data){
            return new Promise((resolve, reject) => {
                getPersonExamStatus(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        /** 考生点击进入某一考试 */
        getpersonExamQuestion({commit},data){
            return new Promise((resolve, reject) => {
                getpersonExamQuestionApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        //获取考场list
        roomManageList({commit},data){
            return new Promise((resolve, reject) => {
                roomManageListApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        //删除考场
        deleteRoomManageById({commit},data){
            return new Promise((resolve, reject) => {
                deleteRoomManageByIdApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        // 启用试题
        changeQuestionIsUse({commit},data){
            return new Promise((resolve, reject) => {
                changeQuestionIsUse(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        // 获取登录用户所属部级
        getSystemParams({commit}){
            return new Promise((resolve, reject) => {
                getSystemParams().then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        // 获取系统时间发
        getSystemDate({commit}){
            return new Promise((resolve, reject) => {
                getSystemDate().then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        // 考生点击开始答题修改考生装填
        checkEntryExam({commit}, data){
            return new Promise((resolve, reject) => {
                checkEntryExam(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        
        // ————————————————————————————————————————————————————————————参考人员END————————————————————————————————————————————————————————————————  
        
        
        /***************************** 人员考试子系统 **********************************/
        // 登录
        personLoginExam({ commit }, data){
            const loginType = data.type;
            return new Promise((resolve, reject) => {
                loginExam(data).then(
                    res => {
                        if(loginType !== '1'){
                            if(loginType === '0'){
                                commit(types.SET_AUTHTOKEN, res.data);
                            }else if(loginType === '2'){
                                sessionStorage.setItem('ScorerUserInfo', JSON.stringify(res.data.scorerInfo));
                                commit(types.SET_AUTHTOKEN, res.data.token);
                            }
                        }else{
                            // 监考老师已提交个人信息
                            commit(types.SET_AUTHTOKEN, res.data.invigilatorInfo.token || 'invigilator');
                        }
                        resolve(res);
                    },
                    error => { reject(error); }
                )
            })
        },
        // 监考人员提交个人信息
        invigilatorSubmitInfo({ commit }, data){
            return new Promise((resolve, reject) => {
                invigilatorSubmitInfo(data).then(
                    res => {
                        resolve(res);
                    },
                    error => { reject(error); }
                )
            })
        },
        // 获取考试人员个人信息
        getJoinExamPerson({ commit }, data){
            return new Promise((resolve, reject) => {
                getJoinExamPerson(data).then(
                    res => {
                        resolve(res);
                    },
                    err => { reject(err); }
                )
            });
        },
        // 开始答题
        startQuestion({ commit }, data){
            return new Promise((resolve, reject) => {
                startQuestion(data).then(
                    res => { resolve(res); },
                    err => { reject(err); }
                )
            });
        },
        /** 点击下一道题 */
        getpersonExamQuestionNext({commit},data){
            return new Promise((resolve, reject) => {
                getpersonExamQuestionNextApi(data).then(
                    res => {  resolve(res);   },
                    error => { reject(error); })
            })
        },
        /** 我要交卷 */
       getexamResultSubmit({commit},data){
           return new Promise((resolve, reject) => {
               getexamResultSubmitApi(data).then(
                   res => {  resolve(res);   },
                   error => { reject(error); })
           })
       },
        // 退出人员考试系统
        signOutSystem({commit}, data){
            return new Promise((resolve, reject) => {
                signOutSystem(data).then(
                    res => { resolve(res); },
                    err => { reject(err); }
                )
            });
        },
        //查询考生信息
        examPersonsByInvigilatorId({commit}, data){
            return new Promise((resolve, reject) => {
                examPersonsByInvigilatorIdApi(data).then(
                    res => { resolve(res); },
                    err => { reject(err); }
                )
            });
        },
         //查询考试信息
         getExamInfoByInvigilatorInfo({commit}, data){
            return new Promise((resolve, reject) => {
                getExamInfoByInvigilatorInfoApi(data).then(
                    res => { resolve(res); },
                    err => { reject(err); }
                )
            });
        },
           //强制收卷
        addExamRollingInfo({commit}, data){
            return new Promise((resolve, reject) => {
                addExamRollingApi(data).then(
                    res => { resolve(res); },
                    err => { reject(err); }
                )
            });
        },
           //考试记录查询
           examRecordQueryInfo({commit}, data){
            return new Promise((resolve, reject) => {
                examRecordQueryApi(data).then(
                    res => { resolve(res); },
                    err => { reject(err); }
                )
            });
        },
         //考试记录查询(后台)
         examRecordQueryForManange({commit}, data){
            return new Promise((resolve, reject) => {
                examRecordQueryForManangeApi(data).then(
                    res => { resolve(res); },
                    err => { reject(err); }
                )
            });
        },
           //添加考场记录
           addExamRecordInfo({commit}, data){
            return new Promise((resolve, reject) => {
                addExamRecordApi(data).then(
                    res => { resolve(res); },
                    err => { reject(err); }
                )
            });
        },
         //删除考场记录
         deleteExamRecordInfo({commit}, data){
            return new Promise((resolve, reject) => {
                deleteExamRecordApi(data).then(
                    res => { resolve(res); },
                    err => { reject(err); }
                )
            });
        },
        //修改考场记录
        updateExamRecordInfo({commit}, examRollingId){
            return new Promise((resolve, reject) => {
                updateExamRecordApi(examRollingId).then(
                    res => { resolve(res); },
                    err => { reject(err); }
                )
            });
        },
        //数据字典
        drawInfo({commit}, examRollingId){
            return new Promise((resolve, reject) => {
                drawInfoApi(examRollingId).then(
                    res => { resolve(res); },
                    err => { reject(err); }
                )
            });
        },
        //延时
        setBatchExamDelayed({commit}, examRollingId){
            return new Promise((resolve, reject) => {
                setBatchExamDelayedApi(examRollingId).then(
                    res => { resolve(res); },
                    err => { reject(err); }
                )
            });
        },
        // 获取评分考试
        getWaitScoringExam({commit}, scorerId){
            return new Promise((resolve, reject) => {
                getWaitScoringExam(scorerId).then(
                    res => { resolve(res); },
                    err => { reject(err); }
                )
            });
        },
        // 获取需要评分的考生
        getPersonScoreList({commit}, data){
            return new Promise((resolve, reject) => {
                getPersonScoreList(data).then(
                    res => { resolve(res); },
                    err => { reject(err); }
                )
            });
        },
        // 获取评分试题
        getWaitScoreQuestion({commit}, data){
            return new Promise((resolve, reject) => {
                getWaitScoreQuestion(data).then(
                    res => { resolve(res); },
                    err => { reject(err); }
                )
            });
        },
        // 保存评分结果
        saveScoreResult({commit}, data){
            return new Promise((resolve, reject) => {
                saveScoreResult(data).then(
                    res => { resolve(res); },
                    err => { reject(err); }
                )
            });
        }
    
        }
    }
    export default exam