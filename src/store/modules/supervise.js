import iLocalStroage from "@/common/js/localStroage";
const supervise = {
    state:{
        offSiteManageId:'' ,
    },
    mutations:{
        //设置caseId
        setOffSiteManageId(state,data){
            iLocalStroage.set('offSiteManageId',data);
            state.offSiteManageId = data;
        }
    }
}
export default supervise
