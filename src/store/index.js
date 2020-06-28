import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import state from './state';
import mutations from './mutations'
import getters from './getters';
// import actions from './actions';
import * as types from "./mutation-types";

import system from './modules/system';
import caseHandle from './modules/caseHandle';
import flowChart from './modules/flowChart';
import uploadFile from './modules/uploadFile'

//yyq:添加执法人员系统接口到store
import person from './modules/person';
// 信息查验
import checkInfo from './modules/checkInfo';
// 监管
import supervise from './modules/supervise';
import phoneVideo from './modules/phoneVideo';
// 考试管理
import exam from './modules/exam';

Vue.use(Vuex);

const store = new Vuex.Store({
    mutations,
    // actions,
    state,
    getters,
    actions:{
        //默认加载最短时间1秒
        setLoadingState({ commit, state }, status) {
            let clearTime;
            let time = new Date().getTime();
            if (status.flag) {
                commit(types.COM_LOADINGTIME, time);
                commit(types.COM_LOADING_STATUS, status.flag);
                commit(types.COM_LOADING_TYPE, status.type);
                clearTimeout(clearTime);
            } else {
                var b = time - state.loadingTime;
                if (b < 1000) {
                    // debugger;
                    clearTime = setInterval(function () {
                        commit(types.COM_LOADING_STATUS, status.flag);
                        commit(types.COM_LOADINGTIME, 0);
                        commit(types.COM_LOADING_TYPE, status.type);
                        clearTimeout(clearTime);
                    }, 1000 - b);
                } else {
                    commit(types.COM_LOADING_STATUS, status.flag);
                    commit(types.COM_LOADINGTIME, 0);
                    clearTimeout(clearTime);
                }
            }
        },
        LOGOUT (state) {
            window.sessionStorage.clear();
        }
    },
    modules: {
        system,
        caseHandle,
        flowChart,
        uploadFile,
        person,
        checkInfo,
        supervise,
        phoneVideo,
        exam
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage,
        reducer (val) {
            return {
                supervise: val.supervise,
                caseHandle: val.caseHandle,
                openTab: val.openTab,
                phoneVideo: val.phoneVideo,
                system: val.system,
            }
        }
    })]
});

export default store;
