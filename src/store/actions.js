import * as types from "./mutation-types";
import Vue from "vue";
const vm = new Vue(); //vm等同于this

import { getCaptchaApi,loginInApi,getMenuApi, loginOutApi } from "@/api/login";
import { getAllOrganApi, getSelectOrganApi} from "@/api/system";

import Cookies from "@/js/cookies";
const actions = {
  //默认加载最短时间1秒
  setLoadingState({ commit, state }, status) {
    let clearTime;
    let time = new Date().getTime();
    if (status) {
      commit(types.COM_LOADINGTIME, time);
      commit(types.COM_LOADING_STATUS, status);
      clearTimeout(clearTime);
    } else {
      var b = time - state.loadingTime;
      if (b < 1000) {
        clearTime = setInterval(function() {
          commit(types.COM_LOADING_STATUS, status);
          commit(types.COM_LOADINGTIME, 0);
          clearTimeout(clearTime);
        }, 1000 - b);
      } else {
        commit(types.COM_LOADING_STATUS, status);
        commit(types.COM_LOADINGTIME, 0);
        clearTimeout(clearTime);
      }
    }
  },
  //获取验证码
  getCaptcha(){
    return new Promise((resolve,reject)=>{
      getCaptchaApi().then(
        res=>{
          console.log('验证码',res);
          resolve(res);
        },
        error=>{
          reject(error);
        })
    })
  },

  // 用户名登录
  loginIn({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      loginInApi(userInfo)
        .then(
          response => {
            console.log("loginIn response", response);
            commit(types.SET_AUTHTOKEN, response.date); //token
            // Cookies.set("menu", "customerService");
            resolve(response);
          },
          error => {
            reject(error);
          }
        )
        .catch(error => {
          reject(error);
        });
    });
  },

  //获取菜单
  getMenu(){
    return new Promise((resolve,reject)=>{
      getMenuApi().then(
        res=>{
          resolve(res);
        },
        error=>{
          reject(error);
        })
    })
  },
  //设置选中的侧边栏slide
  setActiveSlide({ commit }, data) {
    commit(types.SET_SLIDEMENU, data);
  },
  //添加tab
  addTabs({ commit }, data) {
    commit(types.ADD_TABS, data);
  },
  //删除tab
  deleteTabs({ commit }, data) { 
    commit(types.DELETE_TABS, data);
  },
  //删除所有的tab
  deleteAllTabs({ commit }) { 
    commit(types.DELETE_ALLTABS);
  },
  //设置选中的tab
  setActiveIndex({ commit }, data) {
    commit(types.SET_ACTIVE_INDEX, data);
  },
  

  
  
  addWhiteList({ commit }, val) {
    commit(types.SET_WHITELIST, val);
  },
  reduceWhiteList({ commit }, val) {
    commit(types.EDIT_WHITELIST, val);
  },
  resetWhiteList({commit}){
    commit(types.RESET_WHITELIST);
  },

  

  changePage({ commit }, page) {
    commit(types.SET_LISTPAGE, page);
  },

  //获取所有机构
  getAllOrgan(){
    return new Promise((resolve,reject)=>{
      getAllOrganApi().then(
        res=>{
          resolve(res);
        },
        error=>{
          reject(error);
        })
    })
  },
  //获取选中所有机构
  getSelectOrgan({ commit },data){
    return new Promise((resolve,reject)=>{
      getSelectOrganApi(data).then(
        res=>{
          resolve(res);
        },
        error=>{
          reject(error);
        })
    })
  },
  
};

export default actions;
