import { stat } from "fs";

const getters = {
  // common
  loading: state => state.loading,
  loadingTime: state => state.loadingTime,
  token: state => state.authToken,
  message: state => state.message,
  imgSrc: state => state.imgSrc,
  whiteList: state => state.whiteList,
  imgIp: state => state.imgIp,
  listPage: state => state.listPage,
  caseId:state => state.caseHandle.caseId,
};
export default getters;
