/**
 定义状态
 */
const state = {
  // common部分状态
  loading: false,
  loadingTime:'',//加载load记录时间
  authToken: "", //token值    
  
  headActiveNav:'', //当前选中的header
  activeSlideMenu:"",  //当前选中的侧边栏菜单
  openTab:[],//tabs所有打开的路由
  activeIndex:'', //tab激活状态

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

