import  request  from  "@/common/js/request";
import  {setCancelSource}  from  "@/common/js/cancelToken";
import  Vue  from  "vue";

//执法人员管理系统接口映射 
let  vm  =  new  Vue();

//后台查询缓存中的数据字典的值begin
export function examOutlineTreeAllApi(data){
    return request({
        url: "/exam/examOutlineTree/examOutlineTreeAll/",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
export function examOutlineTreeByParentIdApi(outlineId){
    return request({
        url: "/exam/examOutlineTree/examOutlineTreeByParentId/"+outlineId,
        method: "get",
        params: vm.$qs.stringify(outlineId),
        showloading: false,
        cancelToken: setCancelSource()
    })
}
export function getSystemParamApi(data){
    return request({
        url: "/exam/examOutlineTree/getSystemParam/",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}

//新增大纲
export function addExamOutlineApi(data){
    return request({
        url: "/exam/examOutline/addExamOutline/",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//新增考题
export function addExamQuestionInfoApi(data){
    return request({
        url: "/exam/bankQuestion/addQuestionBankQuestion/",
        method: "post",
        data: vm.$qs.stringify(data),
        
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//删除考题
export function deleteExamQuestionInfoApi(questionId){
    return request({
        url: "/exam/bankQuestion/deleteQuestionBankQuestionById/"+questionId,
        method: "get",
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//修改考题
export function updateExamQuestionInfoApi(data){
    return request({
        url: "/exam/bankQuestion/updateQuestionBankQuestion/",
        method: "post",
        data: vm.$qs.stringify(data),
        
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//查询所修改的数据
export function selectExamQuestionInfoApi(questionId){
    return request({
        url: "/exam/bankQuestion/questionBankQuestion/"+questionId,
        method: "get",
        showloading: false,
        cancelToken: setCancelSource()
    })
}
export function updateExamOutlineApi(data){
    return request({
        url: "/exam/examOutline/updateExamOutline/",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}

export function deleteExamOutlineByIdApi(outlineId){
    return request({
        url: "/exam/examOutline/deleteExamOutlineById/"+outlineId,
        method: "get",
        params: outlineId,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
export function getOutlineQuestionListApi(data){
    return request({
        url: "/exam/bankQuestion/getQuestionByOutlineList",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}

// ————————————————————————————————————————————————————————————考试批次管理BEGIN————————————————————————————————————————————————————————————————   
//考试批次列表
export function getExamBathListInfoApi(data){
    return request({
        url: "/exam/examManage/ExamManagePageList",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//新增
export function addExamBatchApi(data){
    return request({
        url: "/exam/examManage/addExamManage",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//修改考试
export function updateExamBatchApi(data){
    return request({
        url: "/exam/examManage/updateExamManage",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//删除批次
export function deleteExamBantchApi(data){
    return request({
        url: "/exam/examManage/deleteExamManageById",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//配置完成
export function disposeInfoApi(data){
    return request({
        url: "/exam/examManage/configOver",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//报送成绩
export function setExamResultApi(data){
    return request({
        url: "/exam/examManage/submitResult",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//查询未分配参考人员
export function getUnSelectedPersonApi(data){
    return request({
        url: "/exam/examPerson/getUnSelectedPerson",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//添加参考人员
export function addExamPersonApi(data){
    return request({
        url: "/exam/examPerson/addExamPerson",
        method: "post",
        data: vm.$qs.stringify(data),
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//移除参考人员
export function removeExamPersonApi(examperId){
    return request({
        url: "/exam/examPerson/deleteExamPersonById/"+examperId,
        method: "get",
        data: vm.$qs.stringify(examperId),
        showloading: false,
        cancelToken: setCancelSource()
    })
}

//查询参考人员
export function selectExamPersonApi(data){
    return request({
        url: "/exam/examPerson/getSelectedPerson",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//批次管理查询可选择试卷列表
export function getPageListApi(data){
    return request({
        url: "/exam/examManage/getPageList",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//选择试卷
export function disPapersApi(data){
    return request({
        url: "/exam/examManage/disPapers",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//考试详情
export function examDetialApi(data){
    return request({
        url: "/exam/examManage/examDetial",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//预览
export function previewPageApi(data){
    return request({
        url: "/exam/pageManage/previewPage",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}

//导出监考老师
export function exportInvigilatorApi(data){
    return request({
        responseType:'blob',
        url: "/exam/examManage/exportInvigilator",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//导出考场核对表
export function exportExamPersonApi(data){
    return request({
        responseType:'blob',
        url: "/exam/examManage/exportExamPerson",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//导出考试详情

export function exporExamtDetailApi(data){
    return request({
        responseType:'blob',
        url: "/exam/examManage/exportExamtDetail",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
// 批量导出准考证 { examId }
export function exportExamCard(data){
    return request({
        responseType:'blob',
        url: "/exam/examManage/printExamCard",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
// 导出个人准考证
export function exportPersonCard(data){
    return request({
        responseType:'blob',
        url: "/exam/examManage/printExamPersonCard",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}

//查询考试批次下拉框列表
export function getExamManageScheduleApi(){ 
    return request({
        url: "/exam/examManage/getExamManageSchedule",
        method: "get",
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//添加评分人
export function addExamScorerApi(data){
    return request({
        url: "/exam/scorer/addExamScorer",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//查询评分人列表
export function getExamScorerListApi(data){
    return request({
        url: "/exam/scorer/examScorerPageList",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}

//修改评分人列表
export function updateExamScorerApi(data){
    return request({
        url: "/exam/scorer/updateExamScorer",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//删除评分人列表
export function deleteExamScorerByIdApi(scorerId){
    return request({
        url: "/exam/scorer/deleteExamScorerById/"+scorerId,
        method: "get",
        params: scorerId,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//查询已分配评分人员
export function getDisScorerListApi(data){
    return request({
        url: "/exam/scorer/getDisScorerList",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//获取未分配的评分人
export function getUnDisScorerListApi(data){
    return request({
        url: "/exam/scorer/getUnDisScorerList",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//添加评分人员
export function addExamDisScorerApi(data){
    return request({
        url: "/exam/scorer/addExamDisScorer",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//添加评分人员
export function deleteExamDisScorerByIdsApi(data){
    return request({
        url: "/exam/scorer/deleteExamDisScorerByIds",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
// ————————————————————————————————————————————————————————————考试批次管理END———————————————————————————————————————————————————————————————— 


// ————————————————————————————————————————————————————————————试卷管理BEGIN———————————————————————————————————————————————————————————————— 
//试卷列表
export function getPageManageListApi(data){
    return request({
        url: "/exam/pageManage/pageManagePageList",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}

//新增试卷
export function addPageManageApi(data){
    return request({
        url: "/exam/pageManage/addPageManage",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}

//删除试卷
export function deletePageManageApi(pageId){
    return request({
        url: "/exam/pageManage/deletePageManageById/"+pageId,
        method: "get",
        params: pageId,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//申请审核
export function applyPageVerifyApi(data){
    return request({
        url: "/exam/pageVerify/applyPageVerify",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource(),
    })
}

export function awaitPageVerifyListApi(data){
    return request({
        url: "/exam/pageVerify/awaitPageVerifyList",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//审核记录列表
export function pageVerifyListByPageIdApi(data){
    return request({
        url: "/exam/pageVerify/pageVerifyListByPageId",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//题目分布
export function questionDistributionApi(data){
    return request({
        url: "/exam/pageManage/questionDistribution",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}

//审核试卷
export function verifyApi(data){
    return request({
        url: "/exam/pageVerify/verify",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}



// ————————————————————————————————————————————————————————————试卷管理END———————————————————————————————————————————————————————————————— 

// ————————————————————————————————————————————————————————————监考管理BEGIN———————————————————————————————————————————————————————————————— 
//监考老师列表
export function getInvigilatorPageListApi(data){
    return request({
        url: "/exam/invigilator/invigilatorPageList",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//根据考试查询考试列表
export function getExamParsonListByExamApi(data){
    return request({
        url: "/exam/examPerson/examPersonByInvigilatorId",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//根据考生信息查询考生列表
export function getExamParsonListByPersonApi(data){
    return request({
        url: "/exam/examPerson/examPersonByIdNoOrName",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}

/** 提交监考老师详情 */
export function getAddInvigilatorApi(data){
    return request({
        url: "/exam/invigilator/addInvigilator",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}

/** 查询监考老师对应的考试信息以及考场信息 */
export function getExamInfoByInvigilatorInfoApi(data){
    return request({
        url: "/exam/invigilator/getExamInfoByInvigilatorInfo",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}

/** 监考老师搜索该考场的考生信息 */
export function getExamPersonsSearchInfoApi(data){
    return request({
        url: "/exam/invigilator/getExamPersonsSearch",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}

/** 监考考试批量延迟考生考试信息 */
export function setBatchExamDelayedInfoApi(data){
    return request({
        url: "/exam/invigilateOperation/setBatchExamDelayed",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}

// ————————————————————————————————————————————————————————————监考管理END———————————————————————————————————————————————————————————————— 


// ————————————————————————————————————————————————————————————模板管理BEGIN———————————————————————————————————————————————————————————————— 

//查询模板列表
export function pageTempletePageListApi (data){
    return request({
        url: "/exam/pageTemplete/pageTempletePageList",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}

//添加模板
export function addPageTempleteApi (data){
    return request({
        url: "/exam/pageTemplete/addPageTemplete",
        method: "post",
        data: vm.$qs.stringify(data),
        showloading: false,
        cancelToken: setCancelSource()
    })
}

//修改
export function updatePageTempleteApi (data){
    return request({
        url: "/exam/pageTemplete/updatePageTemplete",
        method: "post",
        data: vm.$qs.stringify(data),
        showloading: false,
        cancelToken: setCancelSource()
    })
}

//删除模板
export function deletePageTempleteByIdApi(templeteId){
    return request({
        url: "/exam/pageTemplete/deletePageTempleteById/"+templeteId,
        method: "get",
        params: templeteId,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//判断是否可以修改
export function isCanUpdateTempleteApi(templeteId){
    return request({
        url: "/exam/pageTemplete/isCanUpdateTemplete",
        method: "get",
        params: templeteId,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//查询模板节段信息
export function pageTempleteApi(data){
    return request({
        url: "/exam/pageTemplete/pageTemplete",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//修改启用状态
export function updateStatusApi (data){
    return request({
        url: "/exam/pageTemplete/updateStatus",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//获取所有模板
export function getAllTempleteForSelectedApi (data){
    return request({
        url: "/exam/pageTemplete/getAllTempleteForSelected",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}

// ————————————————————————————————————————————————————————————模板管理end———————————————————————————————————————————————————————————————— 



// ———————————————————————————————————————————————————————————考场管理BEGIN———————————————————————————————————————————————————————————————— 

//新增考场
export function addRoomManageApi (data){
    return request({
        url: "/exam/roomManage/addRoomManage",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}

//查询考场list
export function roomManageListApi (data){
    return request({
        url: "/exam/roomManage/roomManageList",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}

//删除考场
export function deleteRoomManageByIdApi(roomId){
    return request({
        url: "/exam/roomManage/deleteRoomManageById/"+roomId,
        method: "get",
        params: roomId,
        showloading: false,
        cancelToken: setCancelSource()
    })
}

//查询未分配考场的考生z总数
export function getUnDispatchCountApi (data){
    return request({
        url: "/exam/examDispatch/getUnDispatchCount",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//查询未分配考场的考生
export function getUnDispatchPersonByRoomIdApi (data){
    return request({
        url: "/exam/examDispatch/getUnDispatchPerson",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//查询已分配考场的考生
export function getDispatchPersonByRoomIdApi (data){
    return request({
        url: "/exam/examDispatch/getDispatchPersonByRoomId",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//执行考场分配
export function addExamDispatchApi (data){
    return request({
        url: "/exam/examDispatch/addExamDispatch",
        method: "post",
        data: vm.$qs.stringify(data),
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//移除考场
export function removeDispatchApi (data){
    return request({
        url: "/exam/examDispatch/removeDispatch",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//自动分配考场
export function autoDispatchApi (data){
    return request({
        url: "/exam/examDispatch/autoDispatch",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
// 查询答题结果
export function getExamAnswerReport(data){
    return request({
        url: "/examResult/getExamReportInfo",
        method: "get",
        baseUrlType: 'EXAM',
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
// 批量启用试题 || 停用试题
export function changeQuestionIsUse(data){
    return request({
        url: "/exam/bankQuestion/getBatchQuestionIsUse",
        method: "post",
        data: vm.$qs.stringify(data),
        showloading: false,
        cancelToken: setCancelSource()
    })
}
/******************* 修改试卷Start *******************/
// 锁定
export function changeQuestionLock(data){
    let url = '/exam/pageManage/lockQuestion';
    if(data.unLock){
        url = '/exam/pageManage/unLockQuestion'
    }
    return request({
        url: url,
        method: "get",
        params: {pqId: data.pqId},
        showloading: false,
        cancelToken: setCancelSource()
    })
}
// 随机试题
export function randomQuestion(data){
    return request({
        url: '/exam/pageManage/randomQuestion',
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
// 随机节段
export function randomParagraphQuestion(data){
    return request({
        url: '/exam/pageManage/randomParagraphQuestion',
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
// 保存修改后试题
export function saveReplaceQuestion(data){
    return request({
        url: '/exam/pageManage/saveRandomParagraphQuestion',
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
// 保存修改后试题
export function getSystemParams(){
    return request({
        url: `/exam/paramInfo/getSystemParams`,
        method: "get",
        showloading: false,
        cancelToken: setCancelSource()
    })
}
// 删除选型图片
export function deleteQuestionImage(data){
    return request({
        url: `/exam/bankQuestion/deleteQuestionOrOptionPictureFileInfo`,
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
// 下载试题模板
export function downLoadQuestionTemp(){
    return request({
        url: '/exam/excelImport/downQuestion',
        method:  "get",
        showloading: false,
        responseType:'blob',
        cancelToken:  setCancelSource()
    })
}
// 批量导入试题
export function batchImportQuestion(data){
    return request({
        url: '/exam/excelImport/importQuestion',
        method:  "POST",
        data: data,
        contentType: 'multipart/form-data;',
        showloading: false,
        cancelToken:  setCancelSource()
    })
}
/******************* 修改试卷End *******************/

// ———————————————————————————————————————————————————————————考场管理END———————————————————————————————————————————————————————————————— 


// ————————————————————————————————————————————————————————————参考人员考试begin———————————————————————————————————————————————————————————————— 
/** 查询当前考试人员的考试信息 */
export function getpersonExamInfoListApi (loginName){
    return request({
        url: "/exam/personExamInfo/personExamInfoList/"+loginName,
        method: "get",
        showloading: false,
        cancelToken: setCancelSource()
    })
}

/** 点击进入某一个考试 */
export function getpersonExamQuestionApi (data){
    return request({
        url: "/exam/personExamInfo/personExamQuestion",
        method: "get",
        params:vm.$qs.stringify(data),
        showloading: false,
        cancelToken: setCancelSource()
    })
}

/** 点击下一道题 */
export function getpersonExamQuestionNextApi (data){
    return request({
        url: "/exam/personExamInfo/personExamQuestionNext",
        method: "get",
        params:vm.$qs.stringify(data),
        showloading: false,
        cancelToken: setCancelSource()
    })
}

/** 点击我要交卷 */
export function getexamResultSubmitApi (data){
    return request({
        url: "/exam/examResult/examResultSubmit",
        method: "get",
        params:vm.$qs.stringify(data),
        showloading: false,
        cancelToken: setCancelSource()
    })
}

// ————————————————————————————————————————————————————————————参考人员考试end———————————————————————————————————————————————————————————————— 
