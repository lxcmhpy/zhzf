// 日期相关变量
var CalendarData = new Array(100);
var madd = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
var tgString = "甲乙丙丁戊己庚辛壬癸";
var dzString = "子丑寅卯辰巳午未申酉戌亥";
var numString = "一二三四五六七八九十";
var monString = "正二三四五六七八九十冬腊";
var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
var solarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至");
var sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758);
// 公历假日
const SolarFestival = {
    "0101": "元旦",
    "0308": "妇女节",
    "0312": "植树节",
    "0401": "愚人节",
    "0501": "劳动节",
    "0504": "青年节",
    "0601": "儿童节",
    "0701": "建党节",
    "0801": "建军节",
    "0910": "教师节",
    "1001": "国庆节",
    "1224": "平安夜",
    "1225": "圣诞节"
};
// 农历节日
const lunarFestival = {
    "0101": "春节",
    "0115": "元宵节",
    "0505": "端午节",
    "0707": "七夕情人节",
    "0715": "中元节",
    "0815": "中秋节",
    "0909": "重阳节",
    "1208": "腊八节",
    "1224": "小年"
};

// 根据当前年月，获取当月日历
export function getCalendar(year, month, monthDay){
    let arr = [[], [], [], [], [], []];
    let startDay = `${year}-${month}-01`;
    // 获取当月1号是星期几
    let dateTime = new Date(startDay);
    let date = dateTime.getDay();
    // 获取二十四节气
    let term1 = getSolarTerms(year, month * 2) - 1;
    let term2 = getSolarTerms(year, month * 2 + 1) - 1;

    for(let i = 0; i < date; i++){
        arr[0].push('');
    }
    for (let i = date; i < 7; i++) {
        let dayIndex = i - date + 1;
        let day = setDayDate(year, month, dayIndex, term1, term2);
        arr[0].push(day);
    }
    arr.forEach((item, index) => {
        if (index > 0) {
            for (let i = 0; i < 7; i++) {
                let dayIndex = (index * 7) - date + i + 1;
                if (dayIndex > monthDay) {
                    item.push('');
                } else {
                    let day = setDayDate(year, month, dayIndex, term1, term2);
                    item.push(day);
                }
            }
        }
    });
    return arr;
}

// 拼接日历每天数据
function setDayDate(y, m, d, t1, t2){
    let lunar = getLunarDay(y, m, d);
    let mm = m - 1;
    if(d === t1){
        lunar['lunarF'] = solarTerm[mm * 2];
    }
    if(d === t2){
        lunar['lunarF'] = solarTerm[mm * 2 + 1];
    }
    lunar['id'] = `${y}/${m >= 10 ? m : '0' + m}/${d >= 10 ? d : '0' + d}`;
    return Object.assign(lunar, { day: d });
}

// 判断闰年
function leapYear(year){
    return year % 400 === 0 || (year % 4 == 0 && year % 100 != 0);
}

// 农历中文编码转换
function GetBit(m, n) {
    return (m >> n) & 1;
}

// 获取每月的天数
export function getMonthDay(year, month){
    let monthDay = 0;
    let yyyy = parseInt(year);
    let mm = parseInt(month);
    switch (mm) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            monthDay = 31;
            break;
        case 2:
            if (leapYear(yyyy)) {
                monthday = 28;
            } else {
                monthday = 29;
            }
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            monthDay = 30;
            break;
    }
    return monthDay;
}

// 农历转换
function getLunarDay(solarYear, solarMonth, solarDay){
    let month = solarMonth;
    if (!(solarYear < 1921 || solarYear > 2999)) {
        solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
        const timeArr = [solarYear, solarMonth, solarDay];
        let TheDate = (timeArr.length !== 3) ? new Date() : new Date(timeArr[0], timeArr[1], timeArr[2]);
        let total, m, n, k;
        let isEnd = false;
        let theDateYear = TheDate.getFullYear();
        total = (theDateYear - 1921) * 365 + Math.floor((theDateYear - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;
        if (theDateYear % 4 === 0 && TheDate.getMonth() > 1) {
            total++;
        }
        for (m = 0;; m++) {
            k = (CalendarData[m] < 0xfff) ? 11 : 12;
            for (n = k; n >= 0; n--) {
                if (total <= 29 + GetBit(CalendarData[m], n)) {
                    isEnd = true;
                    break;
                }
                total = total - 29 - GetBit(CalendarData[m], n);
            }
            if (isEnd) break;
        }
        let cMonth, cDay;
        cMonth = k - n + 1;
        cDay = total;
        if (k === 12) {
            if (cMonth === Math.floor(CalendarData[m] / 0x10000) + 1) {
                cMonth = 1 - cMonth;
            }
            if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
                cMonth--;
            }
        }
        let cDayStr = numString.charAt(cDay - 1);
        if (cDay % 10 !== 0 || cDay === 10) {
            cDayStr = numString.charAt((cDay - 1) % 10)
        }
        let tmp = "";
        if (cMonth < 1) {
            tmp += '(闰)';
            tmp += monString.charAt(-cMonth - 1);
        } else {
            tmp += monString.charAt(cMonth - 1);
        }
        tmp += "月";
        tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
        if (cDay % 10 != 0 || cDay == 10) {
            tmp += numString.charAt((cDay - 1) % 10);
        }

        // 公历节日
        let solarM = month > 10 ? `${month}` : `0${month}`;
        let solarD = solarDay > 10 ? `${solarDay}` : `0${solarDay}`;

        let solarF = SolarFestival[`${solarM}${solarD}`];

        return { lunarText: tmp, solarF: solarF };
    }
}

// 节气
function getSolarTerms(year, n){
    var offDate = new Date((31556925974.7 * (year - 1900) + sTermInfo[n] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
    return (offDate.getUTCDate())
}