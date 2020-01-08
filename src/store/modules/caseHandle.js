import { getEnforceLawTypeApi,getCaseTypeApi,getIllegaActApi,getIndustryCategoryApi,saveOrUpdateCaseBasicInfoApi,findLawRegulationsByCauseIdApi,findJudgFreedomListApi,findLawOfficerListApi,queryCaseBasicInfoListPageApi,
    getCaseBasicInfoApi,addDocDataApi,getDocDataByCaseIdAndDocIdApi
    ,getFormDataByCaseIdAndFormIdApi,addFormDataApi,getDocListByCaseIdAndFormIdApi,saveOrUpdateLinkApi,
    submitPdfApi,approvalPdfApi,getNextLinkAPi,setFlowStatusAPi,delDocDataByDocIdApi,getApprovePeopleApi} from "@/api/caseHandle";


const caseHandle = {
    state:{
        caseId:'' ,  //案件id
    },
    mutations:{
        //设置caseId
        setCaseId(state,data){
            state.caseId = data;
        }
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
        findLawOfficerList(){
            return new Promise((resolve, reject) => {
                findLawOfficerListApi().then(
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

    }
}
export default caseHandle