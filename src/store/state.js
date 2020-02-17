/**
 定义状态
 */
const state = {
  // common部分状态
  loading: false,
  loadingTime:'',//加载load记录时间
  authToken: "", //token值    
  
  headActiveNav:'xboot', //当前选中的header
  activeSlideMenu:"",  //当前选中的侧边栏菜单
  openTab:[{name:'home_index',title:'首页',route:'/index'}],//tabs所有打开的路由
  activeIndex:'', //tab激活状态

  //app部分状态
  isFullScreen: false,

  username: "",

  imgSrc:'',

  whiteList:[],  //白名单


  imgIp:'',  //图片的地址
  listPage:''   //当前page
};

export default state;

