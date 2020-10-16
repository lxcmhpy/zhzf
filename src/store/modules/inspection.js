// 行政检查
import {
    delRandomObjectApi, delExpertApi, delRandomItemApi, delPersonApi, delTaskApi, getAllTaskApi, getAllExpertApi, getAllRandomObjectApi, getAllRandomItemApi,
    getAllPublicPersonApi, exportExpertApi, exportPersonApi, exportItemApi, exportObjectApi, getRandomResultByPageApi,getCheckResultByPageApi
} from "@/api/inspection";

const inspection = {
    state: {
        inspectionOrderId: '', //当前记录id
        inspectionFileId: '', //当前文书id
        inspectionTempleteId: '', //行政检查模板id
        inspectionFileEdit: '', //行政检查模板id
        inspectionOverWeightId: '', //行政检查超限记录id
        inspectionOverWeightFresh: '',//行政检查超限记录是否保留缓存
    },
    mutations: {
        set_inspection_orderId(state, data) {
            state.inspectionOrderId = data;
        },
        set_inspection_fileId(state, data) {
            state.inspectionFileId = data;
        },
        set_inspection_templeteId(state, data) {
            state.inspectionTempleteId = data;
        },
        set_inspection_fileEdit(state, data) {
            state.inspectionFileEdit = data;
        },
        set_inspection_OverWeightId(state, data) {
            state.inspectionOverWeightId = data;
        },
        set_inspection_OverWeightFresh(state, data) {
            state.inspectionOverWeightFresh = data;
        },

    },
    actions: {
        //分页查询对象列表
        getAllRandomObject({ commit }, data) {
            return new Promise((resolve, reject) => {
                getAllRandomObjectApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //分页查询专家列表
        getAllExpert({ commit }, data) {
            return new Promise((resolve, reject) => {
                getAllExpertApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //分页查询事项清单列表
        getAllRandomItem({ commit }, data) {
            return new Promise((resolve, reject) => {
                getAllRandomItemApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //分页查询人员列表
        getAllPublicPerson({ commit }, data) {
            return new Promise((resolve, reject) => {
                getAllPublicPersonApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //分页查询检查任务列表
        getAllTask({ commit }, data) {
            return new Promise((resolve, reject) => {
                getAllTaskApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //删除检查对象
        delRandomObject({ commit }, data) {
            return new Promise((resolve, reject) => {
                delRandomObjectApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //删除检查专家
        delExpert({ commit }, data) {
            return new Promise((resolve, reject) => {
                delExpertApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //删除事项清单
        delRandomItem({ commit }, data) {
            return new Promise((resolve, reject) => {
                delRandomItemApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //删除检查人员
        delPerson({ commit }, data) {
            return new Promise((resolve, reject) => {
                delPersonApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //删除检查任务
        delTask({ commit }, data) {
            return new Promise((resolve, reject) => {
                delTaskApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //导出专家
        exportExpert({ commit }, data) {
            return new Promise((resolve, reject) => {
                exportExpertApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //导出人员
        exportPerson({ commit }, data) {
            return new Promise((resolve, reject) => {
                exportPersonApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //导出对象
        exportObject({ commit }, data) {
            return new Promise((resolve, reject) => {
                exportObjectApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //导出事项清单
        exportItem({ commit }, data) {
            return new Promise((resolve, reject) => {
                exportItemApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //分页查询检查结果清单列表
        getRandomResultByPage({ commit }, data) {
            return new Promise((resolve, reject) => {
                getRandomResultByPageApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //分页查询带抽取结果和检查结果
        getCheckResultByPage({ commit }, data) {
            return new Promise((resolve, reject) => {
                getCheckResultByPageApi(data).then(
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

export default inspection