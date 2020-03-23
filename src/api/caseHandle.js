import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";
import Vue from "vue";
let vm = new Vue();

//获取执法门类
export function getEnforceLawTypeApi(organId) {
  return request({
    url: "/sys/lawCategory/findLawCateByOrganId/" + organId,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//根据条件获取案件类型
export function getCaseTypeApi(data) {
  let params = {
    programType: data.programType,
    organId: "1",
    cateId: data.cateId
  }
  return request({
    url: "/sys/lawCategory/queryLawCateOrganType",
    method: "get",
    params: params,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//获取行业类别
export function getIndustryCategoryApi(data) {
    let params = {
      pid:data
    }
    return request({
      url: "/sys/lawCategory/getLawCategoryListVo",
      method: "get",
      showloading: true,
      loadingType:'loadPart',
      params:params,
      cancelToken: setCancelSource()
    });
}
//根据执法门类行业类别 查询违法行为
export function getIllegaActApi(data) {
    console.log(data);
    return request({
      url: "/sys/bnslawCause/findCaseCauseByPage",
      method: "get",
      params:data,
      showloading: true,
      loadingType:'loadPart',
      cancelToken: setCancelSource()
    });
}

//添加或修改案件基本信息
export function saveOrUpdateCaseBasicInfoApi(data) {
  console.log(data);

  let  data2  =  vm.$qs.stringify(data);
  console.log(data2);
  return request({
    url: "/doc/caseBasicInfo/saveOrUpdateCaseBasicInfo",
    method: "post",
    data:data2,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//修改部分案件基本信息   把立案登记表的案由添加到案件信息里
export function updatePartCaseBasicInfoApi(data) {
  let  data2  =  vm.$qs.stringify(data);
  console.log(data2);
  return request({
    url: "/doc/caseBasicInfo/updatePartCaseBasicInfo",
    method: "post",
    data:data2,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}


//根据违法行为id查询绑定的法条
export function findLawRegulationsByCauseIdApi(causeId) {
  console.log(causeId);
  return request({
    url: "/sys/bnslawCause/findLawRegulationsByCauseId/"+causeId,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//查询自由裁量标准
export function findJudgFreedomListApi() {
  return request({
    url: "/sys/bnslawCause/findDiscretionListByForm",
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//查询机构下的执法人员
export function findLawOfficerListApi(organId) {
  let params={
    organId:organId
  }
  return request({
    url: "/sys/lawOfficer/listLawOfficer",
    method: "get",
    params:params,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//通过姓名或执法证号查询执法人员列表
export function findStaffListApi(inputValue) {
  return request({
    url: "/sys/lawOfficer/findLawOfficerList/"+inputValue,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//根据案件ID获取案件信息
export function getCaseBasicInfoApi(data) {
  return request({
    url: "/doc/caseBasicInfo/findById/"+data.id,
    method: "get",
    // params:params,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//保存文书
export function addDocDataApi(data) {
  console.log(data);
  return request({
    url: "/doc/data/create",
    method: "post",
    data:vm.$qs.stringify(data),
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//根据文书模板ID删除文书信息
export function delDocDataByDocIdApi(data) {
  console.log(data);
  return request({
    url: "/doc/data/findByCaseIdAndDocId/"+data.id,
    method: "get",
    // params:data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//根据案件ID和文书模板ID查找文书信息
export function getDocDataByCaseIdAndDocIdApi(data) {
  console.log(data);
  return request({
    url: "/doc/data/findByCaseIdAndDocId",
    method: "get",
    // data:vm.$qs.stringify(data),
    params:data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//根据案件ID和表单模板ID查找表单信息
export function getFormDataByCaseIdAndFormIdApi(data) {
  console.log(data);
  return request({
    url: "/doc/linkData/findByCaseIdAndLinkTypeId/"+data.casebasicInfoId+"/"+data.caseLinktypeId,
    // url: "/doc/linkData/findByCaseIdAndLinkTypeId",
    method: "get",
    // data:vm.$qs.stringify(data),
    // params:data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}


//保存或修改表单
export function addFormDataApi(data) {
  console.log(data);
  return request({
    url: "/doc/linkData/saveOrUpdateLink",
    method: "post",
    data:vm.$qs.stringify(data),
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//案件列表
export function queryCaseBasicInfoListPageApi(data) {
  return request({
    url: "/doc/caseBasicInfo/queryCaseBasicInfoListPage",
    method: "get",
    params:data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//通过案件id和表单类型Id查询已绑定文书
export function getDocListByCaseIdAndFormIdApi(data){
  return request({
    url: "/doc/caseLinkDoc/findListByCaseIdAndLinkTypeId/"+data.casebasicInfoId+"/"+data.linkTypeId,
    method: "get",
    // params:data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//pdf页的提交
export function submitPdfApi(data) {
  return request({
    url: "/doc/linkData/jumpNextLink",
    method: "post",
    data:vm.$qs.stringify(data),
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//选择审批人员后提交
export function submitPdfByPersonApi(data) {
  return request({
    url: "/doc/linkData/jumpNextLinkByPerson",
    method: "post",
    data:vm.$qs.stringify(data),
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//修改文书状态
export function saveOrUpdateLinkApi(data){
  return request({
    url: "/doc/caseRelevantMaterials/saveOrUpdateLink",
    method: "post",
    // params:data,
    data: vm.$qs.stringify(data),
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//pdf页的审批
export function approvalPdfApi(data) {
  console.log(data);
  return request({
    url: "/doc/linkData/handleApprove",
    method: "post",
    data:vm.$qs.stringify(data),
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//获取下一环节
export function getNextLinkAPi(caseBasicInfoId) {
  return request({
    url: "doc/caseBasicInfo/findNextLinkUrlByCaseId/"+caseBasicInfoId,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//点击下一环节  更改流程图状态
export function setFlowStatusAPi(data) {
  return request({
    url: "doc/linkData/jumpNextStep",
    method: "post",
    data:data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//查询审批角色列表
export function getApprovePeopleApi(caseBasicInfoId) {
  return request({
    url: "/doc/linkData/findApproveRole/"+caseBasicInfoId,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//查询所有环节
export function getQueryLinkListApi() {
  let data={tag:1}
  return request({
    url: "/caseTemplate/linkType/queryLinkList",
    method: "get",
    showloading: true,
    params:data,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//查询所有案件类型
export function getQueryCaseTypeListApi() {
  return request({
    url: "/sys/caseType/list",
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//通过表单（文书）类型Id查询表单（文书）绑定的案件基本信息属性
export function findCaseAllBindPropertyApi(data) {
  return request({
    url: "/doc/propertyBind/findAllBindProperty/"+data.typeId+"/"+data.caseBasicInfoId,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}


//根据案件ID查询  （使用场景：案件调查报告->证据材料->文书）
export function findByCaseBasicInfoIdApi(caseBasicInfoId) {
  return request({
    url: "/doc/data/findByCaseBasicInfoId/"+caseBasicInfoId,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//通过条件查询证据目录(不分页) （使用场景：案件调查报告->证据材料->照片材料）
export function findEvidencePicApi(data) {
  let data2 = vm.$qs.stringify(data)
  return request({
    url: "doc/evidence/findListByCondition",
    method: "post",
    data:data2,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

// // 获取归档目录
// export function findByMlCaseId(caseId) {
//     return request({
//         url: "/sys/file/findByMlCaseId/"+caseId,
//         method: "get",
//         showloading: false,
//         cancelToken: setCancelSource()
//     });
// }
// // 获取归档目录-new
// export function findByMlCaseIdNew(caseId) {
//     return request({
//         url: "/doc/list/findCatalogByCaseId/"+caseId,
//         method: "get",
//         showloading: false,
//         cancelToken: setCancelSource()
//     });
// }
export function findByMlCaseIdNew(caseId) {

    return request({
            url: "/doc/docCatalog/findCatalogByCaseId/"+caseId,
            method: "get",
            showloading: true,
            loadingType:'loadPart',
            cancelToken: setCancelSource()
        });
}
export function findByCondition(data){
  let data2 = vm.$qs.stringify(data);
  console.log('zhengju',data2);
    return request({
        url: "/doc/evidence/findByCondition",
        method: "post",
        data:data2,
        showloading: true,
        loadingType:'loadPart',
        cancelToken: setCancelSource()
      });
}

//添加/修改证据 （使用场景：当事人权利添加证据调用文件上传后拿到ID再调用该添加接口）
export function saveOrUpdateEvdencenApi2(data) {
  let data2 = vm.$qs.stringify(data);
  console.log(data2);
  return request({
    url: "doc/evidence/saveOrUpdateEvdencen",
    method: "post",
    data:data2,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//修改证据名称
export function updateEvdenceNameApi(data) {
  let data2 = vm.$qs.stringify(data);
  console.log(data2);
  return request({
    url: "doc/evidence/updateEvdenceName",
    method: "post",
    data:data2,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

// 根据id删除文书
export function deleteDocByIdApi(docId) {
  return request({
      url: "/doc/data/deleteById/"+docId,
      method: "get",
      showloading: true,
      loadingType:'loadPart',
      cancelToken: setCancelSource()
  });
}
//根据id获取文书信息 （使用场景:询问笔录查看详情）
export function getDocDetailByIdApi(id) {
  return request({
    url: "/doc/data/findById/"+id,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//通过案件id获取询问笔录被询问人及其与案件关系
export function findPersonAndRelationByCaseIdApi(params) {
  return request({
    url: "doc/data/findPersonAndRelationByCaseId/"+params.caseBasicInfoId,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//通过案件id和被询问人姓名查询询问次数
export function findAskNumApi(params) {
  let data = {
      caseId:params.caseId,
      name:params.name
  }
  return request({
    url: "doc/data/findByCaseIdAndName",
    method: "get",
    params:data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//解除（延长）强制措施的提交
export function submitRelieveApi(params) {
  let data = {
      caseId:params.caseId,
      caseLinktypeId:params.caseLinktypeId
  }
  let data2 = vm.$qs.stringify(data);
  console.log(data2);
  return request({
    url: "doc/linkData/submitRelieve",
    method: "post",
    data:data2,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//通过案件id获取上下环节
export function findIsOrderApi(params) {
  return request({
    url: "doc/linkData/findIsOrder/"+params.caseBasicInfoId,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//通过问答模板类型id查询问答模板
export function findModelListByModelTypeIdApi(modelTypeId) {
  let data = vm.$qs.stringify({modelTypeId:modelTypeId})
  return request({
    url: "doc/caseRequestModel/findModelListByModelTypeId/"+modelTypeId,
    method: "post",
    data:data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

export function findRequestListByModelIdApi(modelId) {
  let data = vm.$qs.stringify({modelId:modelId})
  return request({
    url: "doc/caseRequestModel/findRequestListByModelId/"+modelId,
    method: "post",
    data:data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//案件移送列表
export function TransferCaseApi(data) {
  return request({
    url: "/case/transfer/findByCondition",
    method: "get",
    params:data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//案件移送可选案件列表
export function selectTransferCaseApi(data) {
  return request({
    url: "/doc/caseBasicInfo/queryPageByTransferCaseNumber",
    method: "get",
    params:data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//添加修改移送
export function AddEditTransferCaseApi(modelId) {
  let data= modelId;
  // let data = vm.$qs.stringify({CaseTransferForm:modelId})
  console.log('添加',data)
  // data = vm.$qs.stringify({data})
  return request({
    url: "/case/transfer/saveOrUpdate",
    method: "post",
    data:vm.$qs.stringify(data),
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//根据案件id查询案件相关联的文书
export function getFinishDocByIdApi(data) {
  return request({
    url: "sys/file/findVoByDocCaseId/"+data,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//根据案件id查询案件相关联的附件
export function getFinishEvdenceByIdApi(data) {
  console.log('chaxun',data)
  return request({
    url: "sys/file/findVoByEvidenceCaseId/"+data,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}

//案件抄告列表
export function queryCaseCopyListPageApi(data) {
  return request({
    url: "/case/send/findByCondition",
    method: "get",
    params:data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//案件抄告可选案件列表
export function selectCopyCaseApi(data) {
  return request({
    url: "/doc/caseBasicInfo/queryCaseBasicInfoPageByCaseNumber",
    method: "get",
    params:data,
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//添加修改抄告
export function addEditCopyCaseApi(modelId) {
  let data= modelId;
  console.log('添加',data)
  return request({
    url: "/case/send/saveOrUpdate",
    method: "post",
    data:vm.$qs.stringify(data),
    showloading: true,
    loadingType:'loadPart',
    cancelToken: setCancelSource()
  });
}
//-------------长软lv start------------
//获取操作记录
export function getHandleRecordApi(data) {
    return request({
      url: "/doc/caseFormLogs/queryCaseFormLogsListPage",
      method: "GET",
      params: data,
      showloading: true,
      loadingType:'loadPart',
      cancelToken: setCancelSource()
    });
  }
  //获取证据目录
  export function getEvidenceApi(data) {
    return request({
      url: "/doc/evidence/findByCondition",
      method: "POST",
      params: data,
      showloading: true,
      loadingType:'loadPart',
      cancelToken: setCancelSource()
    });
  }
  // 查询已经绑定证据
  export function findBindingEvdinec(data) {
    return request({
        url: "/doc/docCatalog/findBindingEvdinec",
        method: "GET",
        params: data,
        showloading: true,
        loadingType:'loadPart',
        cancelToken: setCancelSource()
      });
  }
  //
  //插入证据目录
  export function saveOrUpdateEvidenceApi(data) {
    console.log("证据目录",data);
    return request({
      url:"/doc/evidence/saveOrUpdateEvdencen",
      method:"POST",
      params:data,
      showloading: true,
      loadingType:'loadPart',
      cancelToken:setCancelSource()
    });
  }
  // 归档目录，绑定关联证据列表
  export function saveOrUpdateDocCatalogList(data) {
    console.log('data',data)
    // let data2 = vm.$qs.stringify(data);
    
    return request({
        url:"/doc/docCatalog/saveOrUpdateDocCatalogList",
        method:"POST",
        data:data,
        showloading: true,
        loadingType:'loadPart',
        contentType:'application/json',
        cancelToken:setCancelSource()
      });
  }
  //获取文书列表
  export function getDocumentApi(data) {
    return request({
      url: "/doc/data/findByCondition",
      method: "GET",
      params: data,
      showloading: true,
      loadingType:'loadPart',
      cancelToken: setCancelSource()
    });
  }
  //获取送达回证
  export function getDeliverReceiptApi(data) {
    return request({
      url: "/doc/proof/findByCondition",
      method: "POST",
      params: data,
      showloading: true,
      loadingType:'loadPart',
      cancelToken: setCancelSource()
    });
  }
  //添加修改送达回证
  export function saveOrUpdateDeliverReceiptApi(data) {
    return request({
      url: "/doc/proof/saveOrUpdateProof",
      method: "POST",
      params: data,
      showloading: true,
      loadingType:'loadPart',
      cancelToken: setCancelSource()
    });
  }
  //代码集\数据字典接口
  export function getDictionaryApi(data) {
    return request({
      url: "/sys/drawer/findAllDrawerById/"+data,
      method: "GET",
      showloading: true,
      loadingType:'loadPart',
      cancelToken: setCancelSource(),
    });
  }

  //-----------------长软lv ends------------

