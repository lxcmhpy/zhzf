import Vue from 'vue';
import Vuex from 'vuex';
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

Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    mutations,
    // actions,
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
    },
    modules: {
        system,
        caseHandle,
        flowChart,
        uploadFile,
        person,
        checkInfo,
        supervise
    }
});

export default store;
