<template>
  <div>正在登陆</div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import {
  getDictListDetailByNameApi, hasUsernameLoginApi, updatePassWordApi, appDownloadApi,
} from "@/api/system";
import {
  getCurrentUserApi, getHost, resetPasswordApi
} from "@/api/login";
import { getToken, setToken } from "@/common/js/auth";


export default {
  methods: {
    //获取当前登录用户的信息
    getCurrentUser() {
      let _this = this;
      new Promise((resolve, reject) => {
        getCurrentUserApi().then(res => {
          console.log("当前用户信息", res);
          // debuggerdebugger

        //   if (res.data.passwordStatus == '0') {
        //     // 判断是否修改过密码
        //     this.$message({ message: '当前账号首次登录，请重新设置密码', type: 'warning' });
        //     this.editFlag = true
        //     this.editForm.username = this.loginForm.username
        //     this.editForm.password = this.loginForm.password
        //   } else {
            // 登录后默认跳转至host.json文件中配置的首页
            // this.$router.push({ name: sessionStorage.getItem('HOME_PAGE_ROUTER_NAME') })

            // res.data.encryptionUserName = encryption(this.loginForm.username)
            // res.data.encryptionPassword = encryption(this.loginForm.password)
            iLocalStroage.sets('userInfo', res.data);
            // _this.getMenu();
            this.$router.push({
                name: "case_handle_home_index",
                });
        //   }
        }, err => {
          console.log(err);
        })
      })
    },
    //获取系统标题
    async getSystemData() {
      // let _this = this;
      let res = await getDictListDetailByNameApi("系统标题");
    //   this.systemTitleLogin = res.data[0].name;
      this.$store.commit("set_systemTitle", res.data[0].name);
      window.document.title = res.data[0].name;
      //设置省份
      this.$store.commit(
        "setProvince",
        res.data[2] && res.data[2].name ? res.data[2].name : ""
      );
      //是否需要签章
      this.$store.commit(
        "setShowQZBtn",
        res.data[1] && res.data[1].name == "是" ? true : false
      );
      
      //是否显示‘综合执法平台’
    //   try {
    //     let dataRes = await getDictListDetailByNameApi("显示综合执法平台");
    //     this.$store.commit("setShowZHZFPT", dataRes.data[0].name);
    //   } catch (error) {
    //     throw new Error(error);
    //   }
    },
  },
  async mounted() {
    await getHost();
    // iLocalStroage.set("TokenKey_expired", this.$route.params.TokenKey_expired);
    // iLocalStroage.sets("CURRENT_BASE_URL", BASEURL[BASEURL.CURRENT]);
    let date = new Date(new Date().getTime() + Number(this.$route.params.TokenKey_expired));
    iLocalStroage.set("TokenKey_expired", date.getTime().toString());
    // iLocalStroage.set("TokenKey", this.$route.params.TokenKey);
    setToken("TokenKey", this.$route.params.TokenKey, date.getTime().toString());
    await this.getSystemData();
    await this.getCurrentUser()
    // this.$router.push({
    //   name: "case_handle_home_index",
    // });
  },
};
</script>
