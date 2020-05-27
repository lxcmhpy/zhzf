import { getEnforceLawTypeApi,getCaseTypeApi,getIllegaActApi,getIndustryCategoryApi,saveOrUpdateCaseBasicInfoApi,findLawRegulationsByCauseIdApi,findJudgFreedomListApi,findLawOfficerListApi,queryCaseBasicInfoListPageApi,
    getCaseBasicInfoApi,addDocDataApi,getDocDataByCaseIdAndDocIdApi
    ,getFormDataByCaseIdAndFormIdApi,addFormDataApi,getDocListByCaseIdAndFormIdApi,saveOrUpdateLinkApi,
    submitPdfApi,approvalPdfApi,approvalPdfQzApi,getNextLinkAPi,setFlowStatusAPi,delDocDataByDocIdApi,getApprovePeopleApi,
    findByCondition,findByMlCaseIdNew,saveOrUpdateDocCatalogList,getCaseTypeListApi,getCatalogListApi,addOrEditCatalogApi,
    deleteCatalogApi,
    //-----------------长软start-----------
    getHandleRecordApi,getEvidenceApi,saveOrUpdateEvidenceApi,getDocumentApi,getDeliverReceiptApi,saveOrUpdateDeliverReceiptApi,getDictionaryApi
    //-----------------长软end------------
    } from "@/api/caseHandle";
import iLocalStroage from "@/common/js/localStroage";

const caseHandle = {
    state:{
        caseId:'' ,  //案件id
        docId: '',
        caseApproval:'', //案件是否为审批状态
        clickArchiveCatalogue:'', //当前点击的归档卷宗目录
        archiveCatalogueList:[], //归档卷宗目录
        approvalState:'', //审批状态（审批中approvaling 审批完成approvalOver ）
    },
    mutations:{
        //设置caseId
        setCaseId(state,data){
            state.caseId = data;
        },
        setDocId(state,data) {
            state.docId = data
        },
        setCaseApproval(state,data){
            iLocalStroage.set('caseApproval',data)
            state.caseApproval = data;
        },
        setClickArchiveCatalogue(state,data) {
            state.clickArchiveCatalogue = data
        },
        setArchiveCatalogueList(state,data) {
            state.archiveCatalogueList = data
        },
        setApprovalState(state,data) {
            state.approvalState = data
        },
    },
    actions:{
        //获取执法门类
        getEnforceLawType({ commit }, data) {
            return new Promise((resolve, reject) => {
                getEnforceLawTypeApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //获取案件类型
        getCaseType({ commit }, data) {
            return new Promise((resolve, reject) => {
                getCaseTypeApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //获取行业类别
        getIndustryCategory({ commit }, data) {
            return new Promise((resolve, reject) => {
                getIndustryCategoryApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //根据执法门类行业类别 查询违法行为
        getIllegaAct({ commit }, data) {
            return new Promise((resolve, reject) => {
                getIllegaActApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //添加或修改案件基本信息
        saveOrUpdateCaseBasicInfo({commit},data){
            return new Promise((resolve, reject) => {
                saveOrUpdateCaseBasicInfoApi(data).then(
                    res => {
                        if(res.otherInfo){
                            res.otherInfo= JSON.parse(res.otherInfo)
                        console.log('res暂存',res)

                        }
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //根据违法行为id查询绑定的法条
        findLawRegulationsByCauseId({commit},data){
            return new Promise((resolve, reject) => {
                findLawRegulationsByCauseIdApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //查询自由裁量标准
        findJudgFreedomList(){
            return new Promise((resolve, reject) => {
                findJudgFreedomListApi().then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //查询机构下的执法人员
        findLawOfficerList({ commit },organId){
            return new Promise((resolve, reject) => {
                findLawOfficerListApi(organId).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //获取案件详细信息
        getCaseBasicInfo({ commit }, data) {
            return new Promise((resolve, reject) => {
                getCaseBasicInfoApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        // 保存或修改文书信息
        addDocData({ commit }, data) {
            return new Promise((resolve, reject) => {
                addDocDataApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //根据文书模板ID删除文书信息
        delDocDataByDocId({ commit }, data) {
            return new Promise((resolve, reject) => {
                delDocDataByDocIdApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //根据案件ID和文书模板ID查找文书信息
        getDocDataByCaseIdAndDocId({ commit }, data) {
            return new Promise((resolve, reject) => {
                getDocDataByCaseIdAndDocIdApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //根据案件ID和表单模板ID查找表单信息
        getFormDataByCaseIdAndFormId({ commit }, data) {
            return new Promise((resolve, reject) => {
                getFormDataByCaseIdAndFormIdApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //保存或修改表单
        addFormData({ commit }, data) {
            return new Promise((resolve, reject) => {
                addFormDataApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },

        //未立案列表
        queryCaseBasicInfoListPage({ commit }, data) {
            return new Promise((resolve, reject) => {
                queryCaseBasicInfoListPageApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },

        //通过案件id和表单类型Id查询已绑定文书
        getDocListByCaseIdAndFormId({ commit }, data) {
            return new Promise((resolve, reject) => {
                getDocListByCaseIdAndFormIdApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //pdf页的提交
        submitPdf({ commit }, data) {
            return new Promise((resolve, reject) => {
                submitPdfApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //修改文书状态
        saveOrUpdateLink({ commit }, data) {
            return new Promise((resolve, reject) => {
                saveOrUpdateLinkApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },

        //pdf页的审批
        approvalPdf({ commit }, data) {
            return new Promise((resolve, reject) => {
                approvalPdfApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },

        //审批签章
        approvalPdfQz({ commit }, data) {
            return new Promise((resolve, reject) => {
              approvalPdfQzApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //获取下一环节
        getNextLink({ commit }, caseId) {
            return new Promise((resolve, reject) => {
                getNextLinkAPi(caseId).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //点击下一环节  更改流程图状态
        setFlowStatus({ commit }, data) {
            return new Promise((resolve, reject) => {
                setFlowStatusAPi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },

        //查询审批角色列表
        getApprovePeople({ commit }, data) {
            return new Promise((resolve, reject) => {
                getApprovePeopleApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //
        // 获取归档目录
        // getByMlCaseId ({ commit }, data) {
            // return new Promise((resolve, reject) => {
            //     findByMlCaseId(data).then(
            //         res => {
            //             resolve(res);
            //         },
            //         error => {
            //             reject(error);
            //         })
            // })
        // },
        // 通过案件id查询归档目录列表
        getByMlCaseIdNew ({ commit }, data) {
            return new Promise((resolve, reject) => {
                findByMlCaseIdNew(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        // 通过条件查询证据目录
        getByCondition ({ commit }, data) {
            return new Promise((resolve, reject) => {
                findByCondition(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //--------------------长软start--------------
        //操作记录
        getHandleRecord({ commit }, data) {
            return new Promise((resolve, reject) => {
            getHandleRecordApi(data).then(
                res => {
                resolve(res);
                },
                error => {
                reject(error);
                })
            })
        },
        //证据目录
        getEvidence({ commit }, data) {
            return new Promise((resolve, reject) => {
            getEvidenceApi(data).then(
                res => {
                resolve(res);
                },
                error => {
                reject(error);
                })
            })
        },
        // 关联绑定证据列表
        saveOrUpdateDocCatalogList({ commit }, data) {
            return new Promise((resolve, reject) => {
                saveOrUpdateDocCatalogList(data).then(
                    res => {
                    resolve(res);
                    },
                    error => {
                    reject(error);
                    })
                })
        },
        //插入修改证据目录
        saveOrUpdateEvidence({ commit }, data){
          return new Promise((resolve, reject) => {
            saveOrUpdateEvidenceApi(data).then(
              res => {
                resolve(res);
              },
              error => {
                reject(error);
              })
          })
        },
        //文书列表
        getDocument({ commit }, data) {
            return new Promise((resolve, reject) => {
            getDocumentApi(data).then(
                res => {
                resolve(res);
                },
                error => {
                reject(error);
                })
            })
        },
        //送达回证
        getDeliverReceipt({ commit }, data) {
            return new Promise((resolve, reject) => {
            getDeliverReceiptApi(data).then(
                res => {
                resolve(res);
                },
                error => {
                reject(error);
                })
            })
        },
        //添加修改送达回证
        saveOrUpdateDeliverReceipt({ commit }, data) {
          return new Promise((resolve, reject) => {
            saveOrUpdateDeliverReceiptApi(data).then(
              res => {
                resolve(res);
              },
              error => {
                reject(error);
              })
          })
        },
        //代码集
        getDictionary({ commit }, data) {
          return new Promise((resolve, reject) => {
            getDictionaryApi(data).then(
              res => {
                resolve(res);
              },
              error => {
                reject(error);
              })
          })
        },
        //获取执法门类
        getCaseTypeList({ commit }, data) {
            return new Promise((resolve, reject) => {
                getCaseTypeListApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //获取卷宗目录模板
        getCatalogList({ commit }, data) {
            return new Promise((resolve, reject) => {
                getCatalogListApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //添加或修改卷宗目录模板
        getCatalogList({ commit }, data) {
            return new Promise((resolve, reject) => {
                getCatalogListApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //添加或修改卷宗目录模板
        addOrEditCatalog({ commit }, data) {
            return new Promise((resolve, reject) => {
                addOrEditCatalogApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //删除卷宗目录模板
        deleteCatalog({ commit }, data) {
            return new Promise((resolve, reject) => {
                deleteCatalogApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //------------------长软end---------------------
    }
}
export default caseHandle
