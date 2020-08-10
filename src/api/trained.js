import  request  from  "@/common/js/request";
import  {setCancelSource}  from  "@/common/js/cancelToken";
import  Vue  from  "vue";

let  vm  =  new  Vue();

// 培训管理批次列表
export function getTrainedBatchList(data){
  return request({
    url: "/train/manage/trainManagePageList",
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 新增|修改培训批次
export function addTrainedBatchList(data, type){
  let requestUrl = "/train/manage/addTrainManage";
  // 修改培训批次
  if(type && type === 'edit'){
    requestUrl = "/train/manage/updateTrainManage";
  }
  return request({
    url: requestUrl,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 删除培训批次
export function deleteTrainedBatch(trainId){
  return request({
    url: `/train/manage/deleteTrainManageById/${trainId}`,
    method: "get",
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 批次管理--配置完成
export function disposeOverBatch(data){
  return request({
    url: '/train/manage/disposeOver',
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}

/************************** 培训机构 ***************************/
//分页查询培训机构
export function getTrainedOrganList(data){
  return request({
    url: `/train/org/trainOrgPageList`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}

// 新增|修改培训机构
export function addTrainedOrgan(data, type){
  let requestUrl = "/train/org/addTrainOrg";
  // 修改培训批次
  if(type && type === 'edit'){
    requestUrl = "/train/org/updateTrainOrg";
  }
  return request({
    url: requestUrl,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 删除培训机构
export function deleteTrainedOrgan(organId){
  return request({
    url: `/train/org/deleteTrainOrgById/${organId}`,
    method: "get",
    showloading: false,
    cancelToken: setCancelSource()
  })
}

/**************************** 课程管理 ****************************/
// 分页查询课程
export function getCourseList(data){
  return request({
    url: `/train/lessonManage/lessonManagePageList`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}

// 新增|修改课程
export function addCourseInfo(data, type){
  let requestUrl = "/train/lessonManage/addLessonManage";
  // 修改课程
  if(type && type === 'edit'){
    requestUrl = "/train/lessonManage/updateLessonManage";
  }
  return request({
    url: requestUrl,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 删除课程
export function deleteCourse(courseId){
  return request({
    url: `/train/lessonManage/deleteLessonManageById/${courseId}`,
    method: "get",
    showloading: false,
    cancelToken: setCancelSource()
  })
}

// 上传课程文件
export function uploadCourseFile(data){
  return  request({
    url:  "/train/lessonManage/fileUpload",
    method:  "POST",
    data: data,
    contentType: 'multipart/form-data;',
    showloading: false,
    cancelToken:  setCancelSource(),
  });
}
// 发布课程
export function disposeOverLesson(data){
  return request({
    url: `/train/lessonManage/lessonPblish`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}

/*********************** 课件管理 ***********************/
// 查询课程下的课件
export function getCoursewareList(data){
  return request({
    url: `/train/coursewareManage/coursewareManagePageList`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 新增|修改课件
export function editCoursewareInfo(data, type){
  let requestUrl = "/train/coursewareManage/addCoursewareManage";
  // 修改课件
  if(type && type === 'edit'){
    requestUrl = "/train/coursewareManage/updateCoursewareManage";
  }
  return request({
    url: requestUrl,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 删除课件
export function deleteCourseware(wareId){
  return request({
    url: `/train/coursewareManage/deleteCoursewareManageById/${wareId}`,
    method: "get",
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 上传课件文件
export function uploadCoursewareFile(data){
  return  request({
    url:  "/train/fileController/uploadFile",
    method:  "POST",
    data: data,
    contentType: 'multipart/form-data;',
    showloading: false,
    cancelToken:  setCancelSource(),
  });
}

/*********************** 模拟考试 ***********************/
// 查询模拟考试列表
export function getMockExamList(data){
  return request({
    url: `/train/exam/trainExamPageList`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 新增|修改模拟考试
export function editMockExamInfo(data, type){
  let requestUrl = "/train/exam/addTrainExam";
  // 修改课件
  if(type && type === 'edit'){
    requestUrl = "/train/exam/updateTrainExam";
  }
  return request({
    url: requestUrl,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 删除课件
export function deleteMockExam(examId){
  return request({
    url: `/train/exam/deleteTrainExamById/${examId}`,
    method: "get",
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 选择试卷--获取模拟考试试卷
export function getMockExamPage(data){
  return request({
    url: `/train/exam/getTrainPageList`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 选择试卷
export function selectMockExamPage(data){
  return request({
    url: `/train/exam/selectTrainPage`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 配置完成
export function disposeOverExam(data){
  return request({
    url: `/train/exam/configOver`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}

/************************** 模拟考试--参考人员 **************************/
// 分页查询参考人员
export function getTePersonList(data){
  return request({
    url: `/train/person/tePersonPageList`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 分页查询所有未参加培训参考人员
export function getAllTePersonList(data){
  return request({
    url: `/train/person/getUnselectTePerson`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 添加参考人员
export function addMockExamPerson(data){
  return request({
    url: '/train/person/addTePerson',
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 移除参考人员
export function deleteExamPerson(teperId){
  return request({
    url: `/train/person/deleteTePersonById/${teperId}`,
    method: "get",
    showloading: false,
    cancelToken: setCancelSource()
  })
}

/************************** 批次管理--参考人员 **************************/
// 分页查询参考人员
export function getBatchPersonList(data){
  return request({
    url: `/train/manage/getSelectedPerson`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 分页查询所有未参加培训参考人员
export function getAllBatchPersonList(data){
  return request({
    url: `/train/manage/getUnSelectedPerson`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 添加参考人员
export function addBatchPerson(data){
  return request({
    url: '/train/manage/addExamPerson',
    method: "post",
    data: vm.$qs.stringify(data),
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 移除参考人员
export function deleteTrainPerson(teperId){
  return request({
    url: `/train/manage/deleteTrainPersonById/${teperId}`,
    method: "get",
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 获取已选择的课程
export function getSelectedLessonList(data){
  return request({
    url: `/train/manage/getSelectedLesson`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 课程选择
export function getAllLessonList(data){
  return request({
    url: `/train/manage/getUnSelectedLesson`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 添加课程
export function addLessonToTrain(data){
  return request({
    url: `/train/manage/addLessonToTrain`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 移除课程
export function deleteSelectedCourse(tlId){
  return request({
    url: `/train/manage/removeLessonFromTrain/${tlId}`,
    method: "get",
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 选择机构
export function selectedTrainOrgan(data){
  return request({
    url: `/train/manage/selectOrg`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 培训课件进度
export function getTrainDetail(data){
  return request({
    url: `/train/manage/trainDetial`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}

/*********************************** 我的培训 ***********************************/
// 根据pesonId查询该人员的模拟考试列表
export function getPersonMockExam(data){
  return request({
    url: `/train/trainPersonExamController/getTrainExam`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 点击进入某一个模拟考试  teperId   teId  pesonId
export function enterMockExam(data){
  return request({
    url: `/train/trainPersonExamController/beginTrainExam`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 上一题下一题
export function getQuestionNext(data){
  return request({
    url: `/train/trainPersonExamController/getQuestionNextOrUp`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 保存进度
export function saveQuestionProgress(data){
  return request({
    url: `/train/trainPersonExamController/saveProgress`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 我要交卷
export function submitMockExam(data){
  return request({
    url: `/train/trainPersonExamController/saveSubmit`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}

/***************************** 日常课程 *****************************/
// 获取所有日常课程
export function getAllDailyLessonPage(data){
  return request({
    url: `/train/trainFirstPageController/getMoreDayStudy`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 日常课程列表
export function getDayStudyPage(data){
  return request({
    url: `/train/myDayCourseController/getDayStudyPage`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 日常课程课程详情
export function getDayCourseDetail(data){
  return request({
    url: `/train/myDayCourseController/getDayStudyLessonDetail`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 课程与人员建立关联关系
export function setPersonCourseRelation(data){
  return request({
    url: `/train/myDayCourseController/getDayCourseBeginStudy`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}

// 获取我的培训列表
export function getAllTrainPage(data){
  return request({
    url: `/train/myTrainCourseController/getMyTrainCoursePage`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 进入培训获取课程详情
export function getTrainCourseDetail(data){
  return request({
    url: `/train/myTrainCourseController/getMyTrainCourseDetail`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}

// 获取我的学习历史
export function getStudyHistory(data){
  return request({
    url: `/train/myStudyHistoryController/getStudyHistoryInfo`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 获取我的学分
export function getMyCredits(data){
  return request({
    url: `/train/myScoreController/getMyScoreDetail`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}
// 更新学分
export function updateMyCredits(data){
  return request({
    url: `/train/trainFirstPageController/updateCoursewareScore`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}

// 课程预览
export function viewLesson(data){
  return request({
    url: `/train/lessonManage/viewLesson`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}

// 排名学分统计
export function getCreditsRanking(data){
  return request({
    url: `/train/trainFirstPageController/getFirstPageInfo`,
    method: "get",
    params: data,
    showloading: false,
    cancelToken: setCancelSource()
  })
}

//导出参培人员
export function exportTrainPerson(data){
  return request({
      responseType:'blob',
      url: "/train/manage/exportTrainPerson",
      method: "get",
      params: data,
      showloading: false,
      cancelToken: setCancelSource()
  })
}
//导出参培人员
export function exportExamPerson(data){
  return request({
      responseType:'blob',
      url: "/train/exam/exportExamPerson",
      method: "get",
      params: data,
      showloading: false,
      cancelToken: setCancelSource()
  })
}

//导出参培人员
export function exportTrainDetial(data){
  return request({
      responseType:'blob',
      url: "/train/manage/exportTrainDetial",
      method: "get",
      params: data,
      showloading: false,
      cancelToken: setCancelSource()
  })
}

//报送成绩
export function setTrainResult(data){
  return request({
      url: "/train/manage/submitResult",
      method: "get",
      params: data,
      showloading: false,
      cancelToken: setCancelSource()
  })
}
