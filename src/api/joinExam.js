import  request  from  "@/common/js/request";
import  {setCancelSource}  from  "@/common/js/cancelToken";
import  Vue  from  "vue";

//执法人员管理系统接口映射
let  vm  =  new  Vue();

/** 
 *  人员考试子系统接口
 */
// 登录
export function loginExam(data){
  let url = '/examLogin/examPersonLogin';
  let loginInfo = data;
  if(data.type === '1'){
    url = '/examLogin/invigilatorLogin';
  }
  if(data.type === '2'){
    url = '/examLogin/teacherLogin';
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
    baseUrlType: 'EXAM',
    showloading: false,
    cancelToken:  setCancelSource()
  })
}

// 监考人员提交个人信息
export function invigilatorSubmitInfo(data){
  return request({
    url: `examLogin/addInvigilator`,
    method: 'get',
    params: data,
    baseUrlType: 'EXAM',
    showloading: false,
    cancelToken:  setCancelSource()
  })
}

// 监考老师修改个人信息
export function editInvigilatorInfo(data){
  return request({
    url: `invigilator/updateInvigilator`,
    method: 'get',
    params: data,
    baseUrlType: 'EXAM',
    showloading: false,
    cancelToken:  setCancelSource()
  })
}

// 获取考试人员信息
export function getJoinExamPerson(loginName){
  return request({
    url: `personExamInfo/personExamInfoList/${loginName}`,
    method: 'get',
    baseUrlType: 'EXAM',
    showloading: false,
    cancelToken:  setCancelSource()
  })
}

// 考试人员退出系统
export function signOutSystem(loginName){
  return request({
    url: `examLogin/removeToken?loginName=${loginName}`,
    method: 'get',
    baseUrlType: 'EXAM',
    showloading: false,
    cancelToken:  setCancelSource()
  })
}

// 考生开始答题
export function startQuestion(data){
  return request({
    url: `personExamInfo/personExamQuestion`,
    method: 'get',
    baseUrlType: 'EXAM',
    params: data,
    showloading: false,
    cancelToken:  setCancelSource()
  })
}

/** 点击下一道题 */
export function getpersonExamQuestionNextApi (data){
  return request({
    url: "personExamInfo/personExamQuestionNext",
    method: "post",
    baseUrlType: 'EXAM',
    data: vm.$qs.stringify(data),
    showloading: false,
    cancelToken: setCancelSource()
  })
}

/** 点击我要交卷 */
export function getexamResultSubmitApi (data){
  return request({
    url: "examResult/examResultSubmit",
    method: "get",
    baseUrlType: 'EXAM',
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
//查询考试信息,
export function examPersonsByInvigilatorIdApi (data){
  return request({
    url: "invigilator/examPersonsByInvigilatorId",
    method: "get",
    baseUrlType: 'EXAM',
    params:data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
//查询考生信息
export function getExamInfoByInvigilatorInfoApi (data){
  return request({
    url: "invigilator/getExamInfoByInvigilatorInfo",
    method: "get",
    baseUrlType: 'EXAM',
    params:data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
//强制收卷
export function addExamRollingApi(data){
  return request({
    url: "examRolling/addExamRolling",
    method: "get",
    baseUrlType: 'EXAM',
    params:data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
//考试记录查询
export function examRecordQueryApi(data){
  return request({
    url: "examRolling/examRecordQuery",
    method: "get",
    baseUrlType: 'EXAM',
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
//添加考场记录
export function addExamRecordApi(data){
  return request({
    url: "examRolling/addExamRecord",
    method: "get",
    baseUrlType: 'EXAM',
    params:data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 删除考场记录
export function deleteExamRecordApi(rollingId){
  return request({
    url: 'examRolling/deleteExamRecord/'+rollingId,
    method: 'get',
    baseUrlType: 'EXAM',
    showloading: false,
    cancelToken:  setCancelSource()
  })
}
//添加考场记录
export function updateExamRecordApi(data){
  return request({
    url: "examRolling/updateExamRecord",
    method: "get",
    baseUrlType: 'EXAM',
    params:data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
//数据字典 
export function drawInfoApi(drawName){
  return request({
    url: 'examLogin/drawInfo/'+drawName,
    method: 'get',
    baseUrlType: 'EXAM',
    showloading: false,
    cancelToken:  setCancelSource()
  })
}
//批量延时
export function setBatchExamDelayedApi(data){
  return request({
    url: 'invigilateOperation/setBatchExamDelayed',
    method: "get",
    baseUrlType: 'EXAM',
    params:data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}

// 查询考生对应考试的考试状态
export function getPersonExamStatus(data){
  return request({
    url: 'personExamInfo/getExamStatue',
    method: "get",
    baseUrlType: 'EXAM',
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}

// 获取服务器时间
export function getSystemDate(){
  return request({
    url: 'examLogin/getSystemDate',
    method: "get",
    baseUrlType: 'EXAM',
    showloading: false,
    cancelToken: setCancelSource()
  });
}

// 考生开始答题修改考生状态
export function checkEntryExam(data){
  return request({
    url: 'personExamInfo/beginExamInfo',
    method: "get",
    baseUrlType: 'EXAM',
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  });
}

/*************************** 阅卷Start ***************************/
// 获取评分考试
export function getWaitScoringExam(scorerId){
  return request({
    url: 'scorer/getWaitScoringExam',
    method: "get",
    baseUrlType: 'EXAM',
    params: { scorerId },
    showloading: false,
    cancelToken: setCancelSource()
  });
}
// 获取需要评分的考生 examId，personName 分页
export function getPersonScoreList(data){
  return request({
    url: 'scorer/getPersonScoreList',
    method: "get",
    baseUrlType: 'EXAM',
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  });
}
// 获取评分试题   examperId参考人ID，scorerId评分人ID
export function getWaitScoreQuestion(data){
  return request({
    url: 'scorer/getWaitScoreQuestion',
    method: "get",
    baseUrlType: 'EXAM',
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  });
}
// 保存评分结果  examperId 人ID，result 评分结果  格式// resultId@@actualScore##resultId@@actualScore，scorerId 评分人ID
export function saveScoreResult(data){
  return request({
    url: 'scorer/saveScoreResult',
    method: "get",
    baseUrlType: 'EXAM',
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  });
}

/*************************** 阅卷End ***************************/

// 下载后台返回二进制流文件
export function downLoadFile(data, fileName) {
  if (!data) { return }
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
