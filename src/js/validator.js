//公用验证方法
import Vue from "vue";
const vm = new Vue();

/* 是否是特殊字符*/
export function isSpecialChar(rule, value, callback) {
    const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
    if (value.length > 0 && !reg.test(value)) {
        return callback(new Error("不可输入特殊字符"));
    } else {
        callback();
    }
}

/** 验证是否整数 请输入整数 */
export function numType(rule, value, callback) {
    var re = /^[1-9]([0-9])*$/;
    if (!re.test(value)) {
        callback(new Error('请输入整数'));
    } else {
        callback();
    }
}

/* 是否是邮箱*/
export function validateEmail(rule, value, callback) {
    var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!reg.test(value)) {
        callback(new Error('邮箱'));
    }
    callback();
}

/**验证密码至少6位 */
export function validatePassLenght(rule, value, callback) {
    if (value.length < 6) {
        callback(new Error('changdu'));
    } else if (value.length > 16) {
        callback(new Error('changdu'));
    }
    callback();
}

/* 是否是邮箱*/
export function validateUrl(rule, value, callback) {
  var reg = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/;
  if (!reg.test(value)) {
      callback(new Error('url格式错误'));
  }
  callback();
}


