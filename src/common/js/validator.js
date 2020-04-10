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

/* 是否是手机号 有值时验证*/
export function validatePhone(rule, value, callback) {
    // var reg = /^1(3|4|5|6|7|8)\d{9}$/;
    var reg = /(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\d3)|(\d{3}\-))?(1[358]\d{9})$)/;
    if (!reg.test(value) && value) {
        // this.$message('手机号不正确')
        callback(new Error('联系电话格式错误'));
        // callback(alert('12'))
    }
    callback();
}

/* 是否是身份证号码   有值时验证*/
export function validateIDNumber(rule, value, callback) {
    var reg = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/;
    if (!reg.test(value) && value) {
        callback(new Error('身份证格式错误'));
    }
    callback();
}

/* 验证6位邮编   有值时验证*/
export function validateZIP(rule, value, callback) {
    var reg = /^\d{6}$/;
    if (!reg.test(value) && value) {
        callback(new Error('请输入正确的6位邮编'));
    }
    callback();
}

/* 必填 */
export function validateRequire(rule, value, callback) {
    if (value == undefined) {
        return callback(new Error("必填"));
    } else if (value == '') {
        return callback(new Error("必填"));
    } else {
        callback();
    }
}

/* 年龄 */
export function validateAge(rule, value, callback) {
    if (value) {
        if (value < 0) {
            callback(new Error('年龄不能为负'));
        }

    }
    callback();
}






