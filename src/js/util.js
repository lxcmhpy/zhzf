import Cookies from "@/js/cookies";

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

/**
 * 转换时间格式
 * @param timeStamp 时间戳
 * @returns daytime  格式'dd/MM/yyyy'
 */
util.dayFormat = function(timeStamp) {
  // var date = new Date();
  // date.setTime(timeStamp * 1000);
  // return date.format("dd/MM/yyyy");
  let timeZone = parseInt(Cookies.get("timeZone"));
  let date = util.getLocalTime(timeStamp * 1000, timeZone);
  var date2 = new Date();
  date2.setTime(timeStamp * 1000);
  return date.format("dd/MM/yyyy");
};

/**
 * 转换时间格式
 * @param timeStamp 时间戳
 * @returns daytime  格式'hh:mm:ss'
 */
util.timeFormat = function(timeStamp) {
  // var date = new Date();
  // date.setTime(timeStamp * 1000);
  // return date.format("HH:mm:ss");
  let timeZone = parseInt(Cookies.get("timeZone"));
  let date = util.getLocalTime(timeStamp * 1000, timeZone);
  return date.format("HH:mm:ss");
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

/**
 * 得到标准时区的时间的函数
 * @param {*} time 时间戳 (*1000)/"2018-01-01 12:50:30"/"2018-01-01" 这三种方式都可以，第三种默认时间是00:00:00
 * @param {*} i 零时区：0 ，东八区：8，东七区：7
 * @returns
 */
util.getLocalTime = function(time, i) {
  //参数i为时区值数字，比如北京为东八区则输进8,西5输入-5
  if (typeof i !== "number") return;
  let d = new Date(time);
  //得到1970年一月一日到现在的秒数
  var len = d.getTime();
  //本地时间与GMT时间的时间偏移差
  var offset = d.getTimezoneOffset() * 60000;
  //得到现在的格林尼治时间
  var utcTime = len + offset;
  return new Date(utcTime + 3600000 * i);
};

/**
 * 用当前浏览器时间转换需要的当地时间,如中国时间 2018-01-02 00:00:00 的时间戳,转换后是 印尼2018-01-02 00:00:00的时间
 * @param {*} time 时间戳 (*1000)/"2018-01-01 12:50:30"/"2018-01-01" 这三种方式都可以，第三种默认时间是00:00:00
 * @param {*} i 零时区：0 ，东八区：8，东七区：7
 * @returns
 */
util.transferLocalTime = function(time, i) {
  //参数i为时区值数字，比如北京为东八区则输进8,西5输入-5
  if (typeof i !== "number") return;
  let d = new Date(time);
  //得到1970年一月一日到现在的秒数
  let len = d.getTime();
  //本地时间与GMT时间的时间偏移差
  let offset = d.getTimezoneOffset() * 60000;
  //得到现在的格林尼治时间
  let utcTime = len + offset;
  let i2 = -((d.getTimezoneOffset() / 60) * 2 + i);
  return new Date(utcTime + 3600000 * i2);
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

/***标签显示图片
 * @param imgId img标签的id
 * @param file 图片文件
 */

util.showFileImage = function(imgId, file) {
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e) {
      document.getElementById(imgId).src = e.target.result; //赋值给图片地址
    };
  } else {
    document.getElementById(imgId).src = ""; //赋值给图片地址
    // document.getElementById(fileId).value = "";
  }
};

/** div标签是否显示
 * @param divId id值
 * @param state false 隐藏 / true 显示
 */
util.showOrHideDiv = function(divId, state = false) {
  let _id = document.getElementById(divId);
  if (state == true) {
    _id.setAttribute("style", "display:block");
  } else {
    _id.setAttribute("style", "display:none");
  }
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


export default util;
