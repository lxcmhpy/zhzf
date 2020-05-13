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

export function addExamOutlineApi(data){
    return request({
        url: "/exam/examOutline/addExamOutline/",
        method: "get",
        params: data,
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
// ————————————————————————————————————————————————————————————考试批次管理BEGIN————————————————————————————————————————————————————————————————   
//考试批次列表
export function getExamBathListInfoApi(data){
    return request({
        url: "/exam/examBatch/examBatchPageList",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//新增/修改批次
export function addExamBatchApi(data){
    return request({
        url: "/exam/examBatch/updateExamBatch",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}
//删除批次
export function deleteExamBantchApi(data){
    return request({
        url: "/exam/examBatch/deleteExamBatchById",
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
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}

//修改
export function updatePageTempleteApi (data){
    return request({
        url: "/exam/pageTemplete/updatePageTemplete",
        method: "get",
        params: data,
        showloading: false,
        cancelToken: setCancelSource()
    })
}

//删除模板
export function deletePageTempleteByIdApi(templeteId){
    return request({
        url: "/exam/pageManage/deletePageTempleteById/"+templeteId,
        method: "get",
        params: pageId,
        showloading: false,
        cancelToken: setCancelSource()
    })
}


// ————————————————————————————————————————————————————————————模板管理end———————————————————————————————————————————————————————————————— 

