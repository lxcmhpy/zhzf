
import {
  getCurrentUserApi,getMenuApi
} from "@/api/login";
import iLocalStroage from "@/common/js/localStroage";
import {menuList} from "@/common/data/menu";

//公用方法
let util = {};

util.alert = function(content) {
  window.alert(content);
};

util.isEmpty = function(a) {
  if (!a) {
    // "",null,undefined,NaN
    return true;
  }
  // Array
  if (!a.length) {
    // "",[]
    return true;
  }
  // Object {}
  //if (this.$.isEmptyObject(a)) {
  //  // 普通对象使用 for...in 判断，有 key 即为 false
  //  return true;
  //}
  return false;
};

//获取当前时间近几天时间
// getDay(0);//当天日期
// getDay(-7);//7天前日期
// getDay(-3);//3天前日期
util.getRecentDay = function(day) {
  let today = new Date();
  let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
  today.setTime(targetday_milliseconds); //注意，这行是关键代码
  let tYear = today.getFullYear();
  let tMonth = today.getMonth();
  let tDate = today.getDate();
  tMonth = util.doHandleMonth(tMonth + 1);
  tDate = util.doHandleMonth(tDate);
  return tYear + "-" + tMonth + "-" + tDate;
};
util.dayOver = function(day1, day2) {
  day1 = new Date(day1.replace(/-/g, "/"));
  day2 = new Date(day2.replace(/-/g, "/")); //当前日期：2017-04-24
  let days = day2.getTime() - day1.getTime();
  let time = parseInt(days / (1000 * 60 * 60 * 24));
  return time;
};

//mouth补足
util.doHandleMonth = function(month) {
  var m = month;
  if (month.toString().length == 1) {
    m = "0" + month;
  }
  return m;
};

//获取当前时间，格式YYYY-MM-DD
util.getFormatDate = function(date) {
  // var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
};
//获取当前时间，格式YYYY-MM-DD 00:00:00
util.getFormatDate1 = function(time) {
  //	 return new Date(parseInt(date) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
  var date = new Date(time * 1000);
  var seperator1 = "/";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  function add0(num) {
    return num >= 10 ? num : "0" + num;
  }

  var h = date.getHours();
  var mm = date.getMinutes();
  var s = date.getSeconds();
  var currentdate =
    year +
    seperator1 +
    add0(month) +
    seperator1 +
    add0(strDate) +
    " " +
    add0(h) +
    ":" +
    add0(mm) +
    ":" +
    add0(s);
  return currentdate;
};
// 处理数据格式  加K、B、M、 保留一位小树
util.transformValue = function(val) {
  let endVal = 0;
  let unit = "";
  if (val < 1000) {
    endVal = val;
  } else if (val >= 1000 && val < 1000000) {
    endVal = (val / 1000).toFixed(1);
    unit = "K";
  } else if (val >= 1000000 && val < 10000000000) {
    endVal = (val / 1000000).toFixed(1);
    unit = "M";
  } else {
    endVal = (val / 1000000000).toFixed(1);
    unit = "B";
  }
  return endVal + unit;
};
//每三位加分隔号
util.thousand = function(value) {
  if (util.isEmpty(value)) {
    value = "-";
  } else {
    value = value.toLocaleString();
  }
  return value;
};
// 用千位分割符处理数据  s数字 type代表需要保留的小树位数，0没有小树位  1 1位小树
util.thousandBitSeparator = function(s, type) {
  if (/[^0-9\.]/.test(s)) return "0.00";
  if (s == null || s == "null" || s == "") return "0.00";
  s = s.toString().replace(/^(\d*)$/, "$1.");
  s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
  s = s.replace(".", ",");
  var re = /(\d)(\d{3},)/;
  while (re.test(s)) s = s.replace(re, "$1,$2");
  s = s.replace(/,(\d\d)$/, ".$1");
  if (type == 0) {
    var a = s.split(".");
    if (a[1] == "00") {
      s = a[0];
    }
  }
  return s;
};
//名字随机命名 len为位数 例如10
util.randomString = function(len) {
  len = len || 32;
  var chars = "0123456789abcdefhijkmnprstwxyz";
  var maxPos = chars.length;
  var uuid = "";
  for (let i = 0; i < len; i++) {
    uuid += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return uuid;
};

/**
 * 返回时间间隔天数
 * @param startTime 格式'2018-01-01 00:00:00'
 * @param endTime 格式'2018-01-01 00:00:00'
 * @returns day 返回Number
 */
util.dayInterval = function(startTime, endTime) {
  let stime = Date.parse(new Date(startTime));
  let etime = endTime ? Date.parse(new Date(endTime)) : new Date();
  let usedTime = etime - stime; //两个时间戳相差的毫秒数
  let days = Math.floor(usedTime / (24 * 3600 * 1000));
  return days;
};

/**
 * 空数据代替符合返回'-'
 * @param {*} val
 */
util.emptySymbol = function(val) {
  val = util.isEmpty(val) ? "-" : val;
  return val;
};

/**
 * 日期转换时间戳
 * @param val 格式'2018-01-01 00:00:00' / '2018-01-01'
 * @returns daytime 时间戳
 */
util.dayToTimestamp = function(val) {
  let timestamp = Date.parse(new Date(val));
  timestamp = timestamp / 1000;
  return timestamp;
};

/**
 * 时间戳转换日期
 * @param val 时间戳
 * @returns daytime 格式'2018-01-01 00:00:00'
 */
util.timestampToDay = function(val) {
  // let newDate = new Date(val);
  // return newDate.format("yyyy-MM-dd hh:mm:ss");
  let newDate =new Date(parseInt(val) * 1000);
  return newDate.format("yyyy-MM-dd hh:mm:ss");
};
util.timestampToDay2 = function(val) {
  // let newDate = new Date(val);
  // return newDate.format("yyyy-MM-dd hh:mm:ss");
  let newDate =new Date(parseInt(val) * 1000);
  return newDate.format("yyyy-MM-dd hh:mm");
};




// 首字母大写  处理字符串    用法：$util.uppercase(name)
util.uppercase = function(str) {
  var reg = new RegExp(
    "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
  );
  if (reg.test(str)) {
    return str;
  } else {
    str = str.substring(0, 1).toUpperCase() + str.substring(1);
    return str;
  }
};
// 首字母大写  处理字符串数组
util.alluppercase = function(arr) {
  arr = arr.map(util.uppercase);
  return arr;
};

// 全部字母大写
util.allStrUpperCase = function(str) {
  str = str.toUpperCase();
  return str;
};

// 去除前后[]
util.removeParenthesis = function(str) {
  str = str.substr(1, str.length);
  str = str.substr(0, str.length - 1);
  //  str =str.substr(1,str.length-2);
  return str;
};





//产生随机数，_idx为位数
util.addNumber = function(_idx) {
  var str = "";
  for (var i = 0; i < _idx; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
};

//产生随机id
util.getRandomId = function() {
  let time = new Date().valueOf(); //时间戳
  let num = util.addNumber(6).toString();
  return time + num;
};



//产生随机数(字母数字)
util.getRandomString=function(len){
  len = len || 32;
  var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var maxPos = $chars.length;
  var randomString = '';
  for (let i = 0; i < len; i++) {
      //0~32的整数
      randomString += $chars.charAt(Math.floor(Math.random() * (maxPos + 1)));
  }
  return randomString;
}

//将1 2 数字转换为 一级 二级等
util.transformNumberToJi =function(num){
  var numStr = '';
   switch (num){
      case 1:
        numStr = "一级";
        break;
      case 2:
        numStr = "二级";
        break;
      case 3:
        numStr = "三级";
        break;
      case 4:
        numStr = "四级";
        break;
      case 5:
        numStr = "五级";
        break;
      case 6:
        numStr = "六级";
        break;
      case 7:
        numStr = "七级";
        break;
      case 8:
        numStr = "八级";
        break;
      default:
          numStr = "二十级";
    }
  return numStr
}


util.openURL = function(pdfPath){
  console.log('openURL')
  var test = window.location.href;
  var string =test.split("/");
  // path = string[0]+"//"+string[2]+"/"+string[3];
  // var ActivexURL=path + "/jsp/zfba/aztDzqz/iWebEditor.html?pdfPath="+pdfPath;
  var ActivexURL = './index.vue';

  //功能说明：创建AZTBrowser浏览器并打开URL地址
  //参数1：URL地址
  //参数2：是否置顶 1表示置顶，0表示不置顶
  //参数3：回调函数
  // MultBrowser.openBrowserURL(ActivexURL, "1", callBackBrowserURL);
}

util.initMenu = function(vm){
    let _this = vm;
    console.log('util获取菜单')
    getMenuApi().then(
        res => {
            // ,
            let menuListNew = [...res.data, ...menuList];
            _this.$store.commit("SET_MENU", menuListNew);
        //   _this.$store.commit("SET_ACTIVE_INDEX_STO", "law_supervise_lawSupervise");
        //   _this.$store.commit('set_Head_Active_Nav',"lawSupervise-menu-law_supervise_lawSupervise");
            let routerName = sessionStorage.getItem('HOME_PAGE_ROUTER_NAME');
            _this.$store.commit("SET_ACTIVE_INDEX_STO", routerName);
            _this.$store.commit('set_Head_Active_Nav',routerName);
        //   _this.$router.push({ name: "law_supervise_lawSupervise" });
            _this.$router.push({ name: routerName});
          // callback();
        },
        err => {
          console.log(err);
        }
      )
}

util.initUser = function(vm){
  if(!iLocalStroage.gets('userInfo') ||  !vm.$store.state.system.menu){
    console.log('获取信息')
    getCurrentUserApi().then(res=>{
      console.log("当前用户信息",res);
      iLocalStroage.sets('userInfo', res.data);
      util.initMenu(vm);
    },err=>{
      console.log(err);
    })
  }else{

  }

}

util.getFileType = function(fileName) {
  // 后缀获取
  let suffix = '';
  // 获取类型结果
  let result = '';
  try {
    const flieArr = fileName.split('.');
    suffix = flieArr[flieArr.length - 1];
  } catch (err) {
    suffix = '';
  }
  // fileName无后缀返回 false
  if (!suffix) { return false; }
  suffix = suffix.toLocaleLowerCase();
  // 图片格式
  const imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
  // 进行图片匹配
  result = imglist.find(item => item === suffix);
  if (result) {
    return 'image';
  }
  // 匹配txt
  const txtlist = ['txt'];
  result = txtlist.find(item => item === suffix);
  if (result) {
    return 'txt';
  }
  // 匹配 excel
  const excelist = ['xls', 'xlsx'];
  result = excelist.find(item => item === suffix);
  if (result) {
    return 'excel';
  }
  // 匹配 word
  const wordlist = ['doc', 'docx'];
  result = wordlist.find(item => item === suffix);
  if (result) {
    return 'word';
  }
  // 匹配 pdf
  const pdflist = ['pdf'];
  result = pdflist.find(item => item === suffix);
  if (result) {
    return 'pdf';
  }
  // 匹配 ppt
  const pptlist = ['ppt', 'pptx'];
  result = pptlist.find(item => item === suffix);
  if (result) {
    return 'ppt';
  }
  // 匹配 视频
  const videolist = ['mp4', 'm2v', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'mov', 'm4v'];
  result = videolist.find(item => item === suffix);
  if (result) {
    return 'video';
  }
  // 匹配 音频
  const radiolist = ['mp3', 'wav', 'wmv'];
  result = radiolist.find(item => item === suffix);
  if (result) {
    return 'radio';
  }
  // 其他 文件类型
  return 'other';
}










export default util;
