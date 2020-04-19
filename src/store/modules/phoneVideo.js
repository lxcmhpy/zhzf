const phoneVideo = {
    state:{
        makePhoneStatus: false,
        doing: null
    },
    mutations:{
        //设置caseId
        setMakePhoneStatus(state,data){
            state.makePhoneStatus = data;
        },
        setDoing (state,data){
            state.doing = data;
        }
    }
}

export default phoneVideo
