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
  caseApproval: state => state.caseHandle.caseApproval,
  clickArchiveCatalogue:state => state.caseHandle.clickArchiveCatalogue,
  archiveCatalogueList:state => state.caseHandle.archiveCatalogueList,
  openTab: state => state.openTab,
  approvalState:state => state.caseHandle.approvalState,

  //监管
  offSiteManageId: state => state.supervise.offSiteManageId,
  // 语音视频
  makePhoneStatus: state => state.phoneVideo.makePhoneStatus,
  doing: state => state.phoneVideo.doing,
  caseHandle: state =>state.caseHandle,
  headActiveNav: state=> state.system.headActiveNav,
  menu: state=> state.system.menu,
  activeIndexSto: state=> state.system.activeIndexSto
};
export default getters;
