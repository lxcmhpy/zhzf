import { stat } from "fs";

const getters = {
  // common
  loading: state => state.loading,
  loadingTime: state => state.loadingTime,
  loadingType: state => state.loadingType,
  token: state => state.authToken,
  message: state => state.message,
  imgSrc: state => state.imgSrc,
  whiteList: state => state.whiteList,
  imgIp: state => state.imgIp,
  listPage: state => state.listPage,
  //案件办理
  caseId:state => state.caseHandle.caseId,
  docId: state => state.caseHandle.docId,
  docDataId: state => state.caseHandle.docDataId,
  caseLinktypeId: state => state.caseHandle.caseLinktypeId,
  caseApproval: state => state.caseHandle.caseApproval,
  clickArchiveCatalogue:state => state.caseHandle.clickArchiveCatalogue,
  archiveCatalogueList:state => state.caseHandle.archiveCatalogueList,
  openTab: state => state.openTab,
  approvalState:state => state.caseHandle.approvalState,
  showQZBtn:state => state.caseHandle.showQZBtn,
  province: state => state.caseHandle.province,
  docPdfStorageId:state => state.caseHandle.docPdfStorageId,
  IsLawEnforcementSupervision:state => state.caseHandle.IsLawEnforcementSupervision,
  lawEnforcementSupervisionType:state => state.caseHandle.lawEnforcementSupervisionType,
  currentFileData:state => state.caseHandle.currentFileData,
  noOperation: state => state.caseHandle.noOperation,
  
  //监管
  offSiteManageId: state => state.supervise.offSiteManageId,
  // 语音视频
  makePhoneStatus: state => state.phoneVideo.makePhoneStatus,
  doing: state => state.phoneVideo.doing,
  caseHandle: state =>state.caseHandle,
  headActiveNav: state=> state.system.headActiveNav,
  menu: state=> state.system.menu,
  activeIndexSto: state=> state.system.activeIndexSto,

  // 系统管理
  btnlawId:state => state.system.btnlawId, //当前法规id
  systemTitle:state => state.system.systemTitle, //系统标题

  
  // 行政检查
  inspectionOrderId:state => state.inspection.inspectionOrderId, //行政检查记录id
  inspectionFileId:state => state.inspection.inspectionFileId, //行政检查文书id
  inspectionTempleteId:state => state.inspection.inspectionTempleteId, //行政检查模板id
  inspectionFileEdit:state => state.inspection.inspectionFileEdit, //行政检查模板id

};
export default getters;
