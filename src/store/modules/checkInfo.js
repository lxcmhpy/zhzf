import { yehuCheckApi } from "@/api/checkInfo";

const person = {
    state: {
        //  personInfo:{},//人员id
    },
    mutations: {
        //设置人员id
        //  setPersonInfo(state,data){
        //    state.personInfo = data;
        // }
    },
    actions: {
        //查询用户绑定角色
        yehuCheck({ commit }, data) {
            return new Promise((resolve, reject) => {
                yehuCheckApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },

    }
}
export default person
