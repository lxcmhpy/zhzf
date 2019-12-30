import { getEnforceLawTypeApi,getCaseTypeApi,getIllegaActApi,getCaseBasicInfoApi,addDocDataApi,getDocDataByCaseIdAndDocIdApi
    ,getFormDataByCaseIdAndFormIdApi,addFormDataApi} from "@/api/caseHandle";

const caseHandle = {
    state:{

    },
    mutations:{

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
    }
}
export default caseHandle