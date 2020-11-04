import request from "@/common/js/request";
import {
    setCancelSource
} from "@/common/js/cancelToken";
 import Vue from "vue";;

//执法人员管理系统接口映射
let vm = new Vue();
//let vm = Vue;

/**
 *  人员考试子系统接口
 */
// 登录
export function loginExam(data) {
    let url = '/exam/examLogin/examPersonLogin';
    let loginInfo = data;
    if (data.type === '1') {
        url = '/exam/examLogin/invigilatorLogin';
    }
    if (data.type === '2') {
        url = '/exam/examLogin/teacherLogin';
        loginInfo = {
            scorerIdno: data.loginName,
            password: data.password
        }
    }
    delete data.type;
    return request({
        url: url,
        method: 'get',
        params: loginInfo,
        tokenType: 'EXAM',
        showloading: false,
        cancelToken: setCancelSource()
    })
}

// 获取考生登录验证码
export function getKaptcha(){
    return request({
        url: `/exam/examLogin/captcha`,
        method: 'get',
        tokenType: 'EXAM',
        showloading: false,
        cancelToken: setCancelSource()
    })
}
// 获取学生登录验证图片
export function getCaptchaImg(data){
    return request({
        url: `/exam/examLogin/captchaImg`,
        method: 'get',
        params: data,
        tokenType: 'EXAM',
        showloading: false,
        cancelToken: setCancelSource()
    })
}

// 监考人员提交个人信息
export function invigilatorSubmitInfo(data) {
    return request({
        url: `/exam/examLogin/addInvigilator`,
        method: 'get',
        params: data,
        tokenType: 'EXAM',
        showloading: false,
        cancelToken: setCancelSource()
    })
}

// 监考老师修改个人信息
export function editInvigilatorInfo(data) {
    return request({
        url: `/exam/invigilator/updateInvigilator`,
        method: 'get',
        params: data,
        tokenType: 'EXAM',
        showloading: false,
        cancelToken: setCancelSource()
    })
}

// 获取考试人员信息
export function getJoinExamPerson(loginName) {
    return request({
        url: `/exam/personExamInfo/personExamInfoList/${loginName}`,
        method: 'get',
        tokenType: 'EXAM',
        showloading: false,
        cancelToken: setCancelSource()
    })
}

// 考试人员退出系统
export function signOutSystem(loginName) {
    return request({
        url: `/exam/examLogin/removeToken?loginName=${loginName}`,
        method: 'get',
        tokenType: 'EXAM',
        showloading: false,
        cancelToken: setCancelSource()
    })
}

// 考生开始答题
export function startQuestion(data) {
    return request({
        url: `/exam/personExamInfo/personExamQuestion`,
        method: 'get',
        tokenType: 'EXAM',
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}

/** 点击下一道题 */
export function getpersonExamQuestionNextApi(data) {
    return request({
        url: "/exam/personExamInfo/personExamQuestionNext",
        method: "post",
        tokenType: 'EXAM',
        data: vm.$qs.stringify(data),
        showloading: false,
        cancelToken: setCancelSource()
    })
}

/** 点击我要交卷 */
export function getexamResultSubmitApi(data) {
    return request({
        url: "/exam/examResult/examResultSubmit",
        method: "get",
        tokenType: 'EXAM',
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//查询考试信息,
export function examPersonsByInvigilatorIdApi(data) {
    return request({
        url: "/exam/invigilator/examPersonsByInvigilatorId",
        method: "get",
        tokenType: 'EXAM',
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//查询考生信息
export function getExamInfoByInvigilatorInfoApi(data) {
    return request({
        url: "/exam/invigilator/getExamInfoByInvigilatorInfo",
        method: "get",
        tokenType: 'EXAM',
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//强制收卷
export function addExamRollingApi(data) {
    return request({
        url: "/exam/examRolling/addExamRolling",
        method: "get",
        tokenType: 'EXAM',
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//考试记录查询
export function examRecordQueryApi(data) {
    return request({
        url: "/exam/examRolling/examRecordQuery",
        method: "get",
        tokenType: 'EXAM',
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//考场记录查询后台
export function examRecordQueryForManangeApi(data) {
    return request({
        url: "/exam/examRolling/examRecordQueryForManange",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//添加考场记录
export function addExamRecordApi(data) {
    return request({
        url: "/exam/examRolling/addExamRecord",
        method: "get",
        tokenType: 'EXAM',
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
// 删除考场记录
export function deleteExamRecordApi(rollingId) {
    return request({
        url: '/exam/examRolling/deleteExamRecord/' + rollingId,
        method: 'get',
        tokenType: 'EXAM',
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//添加考场记录
export function updateExamRecordApi(data) {
    return request({
        url: "/exam/examRolling/updateExamRecord",
        method: "get",
        tokenType: 'EXAM',
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//数据字典
export function drawInfoApi(drawName) {
    return request({
        url: '/exam/examLogin/drawInfo/' + drawName,
        method: 'get',
        tokenType: 'EXAM',
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//批量延时
export function setBatchExamDelayedApi(data) {
    return request({
        url: '/exam/invigilateOperation/setBatchExamDelayed',
        method: "get",
        tokenType: 'EXAM',
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}

// 查询考生对应考试的考试状态
export function getPersonExamStatus(data) {
    return request({
        url: '/exam/personExamInfo/getExamStatue',
        method: "get",
        tokenType: 'EXAM',
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}

// 获取服务器时间
export function getSystemDate() {
    return request({
        url: '/exam/examLogin/getSystemDate',
        method: "get",
        tokenType: 'EXAM',
        showloading: false,
        cancelToken: setCancelSource()
    });
}

// 考生开始答题修改考生状态
export function checkEntryExam(data) {
    return request({
        url: '/exam/personExamInfo/beginExamInfo',
        method: "get",
        tokenType: 'EXAM',
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    });
}

/*************************** 阅卷Start ***************************/
// 获取评分考试
export function getWaitScoringExam(scorerId) {
    return request({
        url: '/exam/scorer/getWaitScoringExam',
        method: "get",
        tokenType: 'EXAM',
        params: {
            scorerId
        },
        showloading: false,
        cancelToken: setCancelSource()
    });
}
// 获取需要评分的考生 examId，personName 分页
export function getPersonScoreList(data) {
    return request({
        url: '/exam/scorer/getPersonScoreList',
        method: "get",
        tokenType: 'EXAM',
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    });
}
// 获取评分试题   examperId参考人ID，scorerId评分人ID
export function getWaitScoreQuestion(data) {
    return request({
        url: '/exam/scorer/getWaitScoreQuestion',
        method: "get",
        tokenType: 'EXAM',
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    });
}
// 保存评分结果  examperId 人ID，result 评分结果  格式// resultId@@actualScore##resultId@@actualScore，scorerId 评分人ID
export function saveScoreResult(data) {
    return request({
        url: '/exam/scorer/saveScoreResult',
        method: "get",
        tokenType: 'EXAM',
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    });
}

/*************************** 阅卷End ***************************/

// 下载后台返回二进制流文件
export function downLoadFile(data, fileName) {
    if (!data) {
        return
    }
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        window.navigator.msSaveBlob(data, fileName)
    } else {
        const URL = window.URL || window.webkitURL
        const objectUrl = URL.createObjectURL(data)
        if (fileName) {
            const link = document.createElement('a')
            if (typeof link.download === 'undefined') {
                window.open(objectUrl)
            } else {
                link.style.display = 'none'
                link.href = objectUrl
                link.setAttribute('download', `${fileName}`)
                link.setAttribute('target', '_blank')
                document.body.appendChild(link)
                link.click()
                link.remove()
            }
        } else {
            window.open(objectUrl)
        }
        URL.revokeObjectURL(objectUrl)
    }
}

// 考试获取文件流
function getFileByStream(storageId){
    return request({
        url: "/exam/fileStream/getfileStream/"+storageId,
        method: "get",
        showloading: true,
        loadingType: 'loadPart',
        responseType:'blob',
        tokenType: 'Stream',
        cancelToken: setCancelSource()
    });
}

export async function getFileStreamByStorageIdApi(storageId) {
    let fileStreamRes;
    try{
      fileStreamRes = await getFileByStream(storageId);
    }catch(err){throw new Error(err);}
    let url = null;
    if (window.createObjectURL != undefined) { // basic
      url = window.createObjectURL(fileStreamRes);
    } else if (window.webkitURL != undefined) { // webkit or chrome
      try {
        url = window.webkitURL.createObjectURL(fileStreamRes);
      } catch (error) {}
    } else if (window.URL != undefined) { // mozilla(firefox)
      try {
        url = window.URL.createObjectURL(fileStreamRes);
      } catch (error) {}
    }
    return url;
}
