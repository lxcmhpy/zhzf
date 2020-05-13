import {examOutlineTreeAllApi,examOutlineTreeByParentIdApi,getSystemParamApi,addExamOutlineApi,updateExamOutlineApi,deleteExamOutlineByIdApi,getExamBathListInfoApi,
  addExamBatchApi,deleteExamBantchApi,getPageManageListApi,addPageManageApi,deletePageManageApi,getInvigilatorPageListApi,getExamParsonListByExamApi,getExamParsonListByPersonApi,pageTempletePageListApi,
  addPageTempleteApi,deletePageTempleteByIdApi,updatePageTempleteApi
} from "@/api/exam";

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
      examOutlineTreeAllInfo({commit},data){
          return new Promise((resolve, reject) => {
              examOutlineTreeAllApi(data).then(
                  res => {  resolve(res);   },
                  error => { reject(error); })
          })
      },
      examOutlineTreeByParentIdInfo({commit},data){
          return new Promise((resolve, reject) => {
              examOutlineTreeByParentIdApi(data).then(
                  res => {  resolve(res);   },
                  error => { reject(error); })
          })
      },
      getSystemParamInfo({commit},data){
          return new Promise((resolve, reject) => {
              getSystemParamApi(data).then(
                  res => {  resolve(res);   },
                  error => { reject(error); })
          })
      },
      addExamOutlineInfo({commit},data){
          return new Promise((resolve, reject) => {
              addExamOutlineApi(data).then(
                  res => {  resolve(res);   },
                  error => { reject(error); })
          })
      },
      updateExamOutlineInfo({commit},data){
          return new Promise((resolve, reject) => {
              updateExamOutlineApi(data).then(
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
// ————————————————————————————————————————————————————————————考试批次管理BEGIN————————————————————————————————————————————————————————————————    
      //考试批次列表
      getExamBathListInfo({commit},data){
          return new Promise((resolve, reject) => {
              getExamBathListInfoApi(data).then(
                  res => {  resolve(res);   },
                  error => { reject(error); })
          })
      },
      //新增/修改批次
      addExamBatch({commit},data){
          return new Promise((resolve, reject) => {
              addExamBatchApi(data).then(
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
      
// ————————————————————————————————————————————————————————————模板管理END————————————————————————————————————————————————————————————————        
  }
}
export default exam