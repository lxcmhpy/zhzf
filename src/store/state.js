/**
 定义状态
 */
const state = {
        // common部分状态
        loading: false,
        loadingTime:'',//加载load记录时间
        loadingType:'', //loading 类型
        authToken: "", //token值
        activeSlideMenu:"",  //当前选中的侧边栏菜单
        // openTab:[{name:'law_supervise_lawSupervise',title:'可视化监管',route:'/index',headActiveNav:"lawSupervise-menu-law_supervise_lawSupervise"}],//tabs所有打开的路由
        openTab:[{name:'case_handle_home_index',title:'案件办理首页',route:'/index',headActiveNav:"caseHandle-menu-case_handle_home_index"}],//tabs所有打开的路由
        activeIndex:'', //tab激活状态
        caseNumber:'', //设置 tab name为案号
        //app部分状态
        isFullScreen: false,
        username: "",
        imgSrc:'',
        whiteList:[],  //白名单
        imgIp:'',  //图片的地址
        listPage:'',   //当前page
        // btnlawId:''  //当前法规id

};

export default state;

