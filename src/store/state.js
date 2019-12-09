/**
 定义状态
 */
const state = {
  // common部分状态
  loading: false,
  loadingTime:'',//加载load记录时间
  authToken: "", //token值    
  
  openTab:[],//所有打开的路由
  activeIndex:'', //激活状态

  //app部分状态
  isFullScreen: false,

  username: "",

  imgSrc:'',

  whiteList:[],  //白名单

  apiHistoryList:{},//查询历史记录的api
  imgIp:'http://kotadata.oss-ap-southeast-5.aliyuncs.com',  //图片的地址
  listPage:''   //当前page
};

export default state;

