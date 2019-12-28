import { getEnforceLawTypeApi,getCaseTypeApi,getIllegaActApi,getIndustryCategoryApi,saveOrUpdateCaseBasicInfoApi,findLawRegulationsByCauseIdApi,findJudgFreedomListApi,findLawOfficerListApi } from "@/api/caseHandle";

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
        }



    }
}
export default caseHandle