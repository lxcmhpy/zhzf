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
    // var reg = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/;
    // if (!reg.test(value) && value) {
    //     callback(new Error('身份证格式错误'));
    // }
    // callback();

    if (value.length == 18 && 18 != value.length) callback(new Error('身份证格式错误'));;
    var number = value.toLowerCase();
    var d, sum = 0, v = '10x98765432', w = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], a = '11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91';
    var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/);
    if (re == null || a.indexOf(re[1]) < 0) callback(new Error('身份证格式错误'));
    if (re[2].length == 9) {
        number = number.substr(0, 6) + '19' + number.substr(6);
        d = ['19' + re[4], re[5], re[6]].join('-');
    } else d = [re[9], re[10], re[11]].join('-');
    if (!isDateTime.call(d, 'yyyy-MM-dd')) callback(new Error('身份证格式错误'));
    for (var i = 0; i < 17; i++) sum += number.charAt(i) * w[i];
	if(!(re[2].length == 9 || number.charAt(17) == v.charAt(sum % 11))) callback(new Error('身份证格式错误'));
    callback();
}

var isDateTime = function (format, reObj) {
    format = format || 'yyyy-MM-dd';
    var input = this, o = {}, d = new Date();
    var f1 = format.split(/[^a-z]+/gi), f2 = input.split(/\D+/g), f3 = format.split(/[a-z]+/gi), f4 = input.split(/\d+/g);
    var len = f1.length, len1 = f3.length;
    if (len != f2.length || len1 != f4.length) return false;
    for (var i = 0; i < len1; i++) if (f3[i] != f4[i]) return false;
    for (var i = 0; i < len; i++) o[f1[i]] = f2[i];
    o.yyyy = s(o.yyyy, o.yy, d.getFullYear(), 9999, 4);
    o.MM = s(o.MM, o.M, d.getMonth() + 1, 12);
    o.dd = s(o.dd, o.d, d.getDate(), 31);
    o.hh = s(o.hh, o.h, d.getHours(), 24);
    o.mm = s(o.mm, o.m, d.getMinutes());
    o.ss = s(o.ss, o.s, d.getSeconds());
    o.ms = s(o.ms, o.ms, d.getMilliseconds(), 999, 3);
    if (o.yyyy + o.MM + o.dd + o.hh + o.mm + o.ss + o.ms < 0) return false;
    if (o.yyyy < 100) o.yyyy += (o.yyyy > 30 ? 1900 : 2000);
    d = new Date(o.yyyy, o.MM - 1, o.dd, o.hh, o.mm, o.ss, o.ms);
    var reVal = d.getFullYear() == o.yyyy && d.getMonth() + 1 == o.MM && d.getDate() == o.dd && d.getHours() == o.hh && d.getMinutes() == o.mm && d.getSeconds() == o.ss && d.getMilliseconds() == o.ms;
    return reVal && reObj ? d : reVal;
    function s(s1, s2, s3, s4, s5) {
        s4 = s4 || 60, s5 = s5 || 2;
        var reVal = s3;
        if (s1 != undefined && s1 != '' || !isNaN(s1)) reVal = s1 * 1;
        if (s2 != undefined && s2 != '' && !isNaN(s2)) reVal = s2 * 1;
        return (reVal == s1 && s1.length != s5 || reVal > s4) ? -10000 : reVal;
    }
};

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






