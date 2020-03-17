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
  caseId:state => state.caseHandle.caseId,
  docId: state => state.caseHandle.docId
};
export default getters;
