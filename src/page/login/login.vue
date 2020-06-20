<template>
  <section class="login">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <!-- <div class="login_logo"><img src="../../../src/assets/image/main/logo.png" alt=""><span>治超联网监管系统</span></div>-->
        <div class="leftC">
          <img :src="'./static/images/img/login/zf_bg.jpg'" alt="">
          <div class="leftC_title">
              <img :src="'./static/images/img/login/logo1.png'" alt=""> {{systemTitle}}
          </div>
        </div>
        <div class="rightC" v-if="!resetFlag">
          <div class="form_box">
            <span class="title" :class="check  ? 'checkText' : '' " @click="changeType(1)">账号密码</span>
            <span class="title" :class="!check  ? 'checkText' : '' " @click="changeType(2)">二维码</span>
            <div class="formC1" v-if="check">

              <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
                <el-form-item prop="username">
                  <el-input placeholder="请输入用户名" v-model="loginForm.username">
                    <!-- <template slot="prepend">账号</template> -->
                    <i slot="prefix">
                      <svg t="1582619936338" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1150" width="16" height="16">
                        <path d="M652.3 562.7C741.6 513.3 802 418.2 802 309c0-160.2-129.8-290-290-290-160.2 0-290 129.8-290 290 0 109.2 60.4 204.3 149.7 253.7C184 622.2 48 797.7 48 1005l58 0c0-224.2 181.8-406 406-406 224.2 0 406 181.8 406 406l58 0C976 797.7 840 622.2 652.3 562.7zM280 309c0-128.1 103.9-232 232-232 128.1 0 232 103.9 232 232 0 128.1-103.9 232-232 232C383.9 541 280 437.1 280 309z" p-id="1151" fill="#9FA3AF"></path>
                      </svg>
                    </i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input placeholder="请输入密码" v-model="loginForm.password" type="password">
                    <!-- <template slot="prepend">密码</template> -->
                    <i slot="prefix">
                      <svg t="1582620094865" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2310" width="16" height="16">
                        <path d="M788.081778 435.2c41.585778 0 75.292444 34.389333 75.292444 76.8v358.4c0 42.410667-33.706667 76.8-75.292444 76.8H235.918222c-41.585778 0-75.292444-34.389333-75.292444-76.8V512c0-42.410667 33.706667-76.8 75.292444-76.8h552.163556z m0-76.8H235.918222C152.746667 358.4 85.333333 427.178667 85.333333 512v358.4C85.333333 955.221333 152.746667 1024 235.918222 1024h552.163556C871.253333 1024 938.666667 955.221333 938.666667 870.4V512c0-84.821333-67.413333-153.6-150.584889-153.6zM512 76.8c97.024 0 175.672889 80.213333 175.672889 179.2v102.4H336.327111V256c0-98.986667 78.648889-179.2 175.672889-179.2zM512 0c-138.609778 0-250.993778 114.631111-250.993778 256v179.2h501.987556V256c0-141.368889-112.355556-256-250.993778-256z m0 806.4c-20.792889 0-37.660444-17.180444-37.660444-38.4v-153.6c0-21.219556 16.867556-38.4 37.660444-38.4 20.792889 0 37.660444 17.180444 37.660444 38.4V768c0 21.219556-16.867556 38.4-37.660444 38.4z" fill="#9FA3AF" p-id="2311"></path>
                      </svg>
                    </i>
                  </el-input>
                </el-form-item>
                <div class="forgetPass">
                  <el-collapse-transition>
                    <div v-show="errorPwd" class="error">{{errorPwd}}</div>
                  </el-collapse-transition>
                </div>
                <el-form-item class="codeInputBox">
                  <vue-simple-verify ref="verify" :width='420' tips='向右滑动完成验证' @success="pass()" />
                </el-form-item>
                <div class="forgetPass">
                    <div v-show="errorMessage" class="error">{{errorMessage}}</div>
                </div>

                <div>
                  <el-button type="primary" @click="submitLogin('loginForm')">登录</el-button>
                </div>
                <div class="login_btm">
                  <el-link type="primary" :underline="false" class="left_float">APP下载</el-link>
                  <el-link type="primary" :underline="false" class="left_float margin24 wechat_box">
                    <span @click="weChat">微信公众号</span>
                    <div class="wechat" v-if="weChatFlag">
                      <img src="../../../static/images/img/login/weChat.png" alt="">
                    </div>
                  </el-link>
                  <el-link type="primary" :underline="false" class="right_float" @click="resetChange(true)">忘记密码</el-link>

                </div>

              </el-form>
            </div>
            <div class="formC1" v-if="!check">
              <div>请使用<span class="blue">执法APP</span>扫码登录</div>
              <div class="code_box">
                <img src="../../../static/images/img/login/loginCode.png" alt="">
              </div>
              <div class="gray">执法App - 首页右上角加号 - 左下角扫一扫</div>
            </div>
          </div>
          <div class="footer">
            <center>
              <span class="blue">使用教程</span>
              |
              <span class="blue">帮助中心</span>
            </center>
          </div>
        </div>
        <div class="rightC" v-if="resetFlag">
          <div class="form_box">
            <span class="back">
              <el-button icon="el-icon-arrow-left" size="mini" @click="resetChange(false)"></el-button>
            </span>
            <span class="title">密码重置申请</span>
            <div class="formC1" v-if="check">

              <el-form :model="resetForm" :rules="resetRules" ref="resetForm" class="demo-ruleForm">
                <el-form-item prop="username">
                  <el-input placeholder="账号名" v-model="resetForm.username">
                  </el-input>
                </el-form-item>
                <el-form-item prop="nickName">
                  <el-input placeholder="执法人员名称" v-model="resetForm.nickName">
                  </el-input>
                </el-form-item>
                <el-form-item prop="enforceNo">
                  <el-input placeholder="执法证件号" v-model="resetForm.enforceNo">
                  </el-input>
                </el-form-item>

                <div>
                  <el-button type="primary" @click="resetPwd('resetForm')">申请重置密码</el-button>
                </div>

              </el-form>

            </div>

          </div>
          <div class="footer">
            <center>
              <span class="blue">使用教程</span>
              |
              <span class="blue">帮助中心</span>
            </center>
          </div>
        </div>
      </section>
    </transition>
  </section>
</template>

<script>

import { mapGetters } from "vuex";
import iLocalStroage from "@/common/js/localStroage";
import { drawCodeImage } from "@/api/login";
import * as types from "@/store/mutation-types";
import {menuList} from "@/common/data/menu";
// 滑动验证
import VueSimpleVerify from 'vue-simple-verify';
// Vue.component('vue-simple-verify', VueSimpleVerify)
import {
  getCurrentUserApi
} from "@/api/login";
import {
  getDictListDetailByNameApi,
} from "@/api/system";
export default {
  data() {
    return {
      formLayout: "vertical",
      captchaId: '',   //验证码id
      captchaImg: '',   //验证码图片src
      loginForm: {
        username: "test",
        password: "123456",
        code: ''
      },
      resetForm: {
        username: "",
        nickName: "",
        enforceNo: ''
      },
      rules: {
        username: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        password: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请完成验证', trigger: 'blur' }
        ]
      },
      resetRules: {
        username: [
          { required: true, message: '请输入账号名', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请输入执法人员名称', trigger: 'blur' }
        ],
        enforceNo: [
          { required: true, message: '请输入执法证件号', trigger: 'blur' }
        ]
      },
      hasUserError: false,
      haspasswordError: false,
      showLogin: false,
      errorMessage: '',
      errorPwd: '',
      check: true,
      success: false,
      weChatFlag: false,
      resetFlag: false,
      timeOutFlag: "",
      menuList: null,
      systemTitleLogin: null
    };
  },
  computed: {...mapGetters(['systemTitle'])},
  methods: {

    //获取验证码
    getCaptcha() {
      let _this = this
      this.$store.dispatch("getCaptcha").then(
        res => {
          let captcha = res.data;
          _this.captchaId = captcha.split('::')[0];

          //  _this.captchaImg = drawCodeImage + _this.captchaId;
          _this.getCaptchaImgsrc()
        },
        err => {
          console.log(err)
        }
      )
    },
    // 切换登录方式
    changeType(type) {
      console.log(type)
      if (type == 1) {
        this.check = true;
      }
      if (type == 2) {
        this.check = false;
      }

    },

    getCaptchaImgsrc() {
      console.log('this.captchaId', this.captchaId)
      let _this = this
      this.$store.dispatch("getCapImgSrc", this.captchaId).then(
        res => {
          console.log(res);
          let a = 'data:image/png;base64,' + btoa(
            new Uint8Array(res)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
          console.log(a);
          _this.captchaImg = a;

        },
        err => {
          console.log(err)
        }
      )
    },
    //登录
    submitLogin(formName) {
        debugger;
      let _this = this
      // this.$store.commit(types.SET_AUTHTOKEN, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsaWNlbnNlIjoiTWFkZSBCeSBDQVRTSUMiLCJ1c2VyX25hbWUiOiJ7XCJhdmF0YXJcIjpcImh0dHBzOi8vaS5sb2xpLm5ldC8yMDE5LzA0LzI4LzVjYzVhNzFhNmUzYjYucG5nXCIsXCJkZXBhcnRtZW50SWRcIjpcIjJcIixcImlkXCI6XCI2ODIyNjU2MzM4ODYyMDhcIixcIm1vYmlsZVwiOlwiMTg3ODIwNTkwMzhcIixcIm5pY2tOYW1lXCI6XCJnZmhkZ2huZmdqXCIsXCJvcmdhbklkXCI6XCIxXCIsXCJwYXNzd29yZFwiOlwiJDJhJDEwJHNzR0YuT0dQMTJDcldGMlJUVWNOZGUwZzUxSGgwckc2eTlHZTVGejZDd25rRWhreHV6Um95XCIsXCJwYXNzd29yZFN0YXR1c1wiOjAsXCJzZXhcIjpcIueUt1wiLFwic3RhdHVzXCI6MCxcInR5cGVcIjoxLFwidXNlcm5hbWVcIjpcImFkbWluXCJ9Iiwic2NvcGUiOlsic2VydmVyIl0sImV4cCI6MTU4MzkzMzIyMCwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdLCJqdGkiOiIwNjQzOWRkOC0yZWQ3LTQzNzUtODgzZC04ZTI3ODJhNjBmNWIiLCJjbGllbnRfaWQiOiJjYXRzaWMifQ.Btlg5kx2xQY7xCbHuODly-hNICluoD-SbrA0S7lHBEE'); //token
      // _this.getMenu();
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证码
          if (_this.success) {
            let values = _this.loginForm;
            values.captchaId = _this.captchaId;

            _this.$store.dispatch("loginIn", values).then(
              res => {
                // 登录成功
                  // 清除定时器

                  // _this.getCurrentUser();
                  _this.$router.push({
                      name: 'home'
                  })
                //   _this.$util.initUser(_this);
                  _this.success = false;
                //   this.$store.commit('setShowQZBtn', true)

                  //设置默认openTab
                //   this.$store.dispatch("addTabs", {name:'case_handle_home_index',title:'案件办理首页',route:'/index',headActiveNav:"caseHandle-menu-case_handle_home_index"});
                  //设置是否签章

                  // this.$store.dispatch("addTabs", {name:'case_handle_home_index',title:'案件办理首页',route:'/index',headActiveNav:"caseHandle-menu-case_handle_home_index"});

              },
              // error => {
              //   console.log('error',error);
              //    this.$message({
              //     type: "error",
              //     message: error.message
              //   });
              // }
            );
          }
          else {
            _this.errorMessage = '验证错误,请重试，3秒后自动消失'
            setTimeout(() => {
              _this.errorMessage = ""
            }, 3000)
          }
        }
        else {
          this.errorPwd = '用户名或密码错误，请重新输入，3秒后自动消失'
          setTimeout(() => {
            _this.errorPwd = ""
          }, 3000)
        }
      });
    },

    //获取菜单
    getMenu() {

      let _this = this
      this.$store.dispatch("getMenu").then(
        res => {
            // ...res.data,
          _this.menuList = [...menuList];
          _this.$store.commit("SET_MENU", _this.menuList);
          _this.$store.commit("SET_ACTIVE_INDEX_STO", "law_supervise_lawSupervise");
          _this.$store.commit('set_Head_Active_Nav',"lawSupervise-menu-law_supervise_lawSupervise");
          _this.$router.push({ name: "law_supervise_lawSupervise" });
        },
        err => {
          console.log(err);
        }
      )
    },
    //获取当前登录用户的信息
    getCurrentUser(){
        let _this =this;
        new Promise((resolve, reject) => {
            getCurrentUserApi().then(res=>{
                console.log("当前用户信息",res);
                iLocalStroage.sets('userInfo', res.data);
                _this.getMenu();
            },err=>{
                console.log(err);
            })
       })
    },
    blueUsername() {
      this.hasUserError = false;
    },
    bluePassword() {
      this.haspasswordError = false;
    },
    // gotoRegister(){
    //   console.log(1111);
    //   this.$router.push('/register');
    // }
    pass() {
      this.success = true;
      this.errorMessage = ''
      let _this = this
      this.timeOutFlag = setTimeout(() => {
        // debugger;
        _this.success = false;
        _this.$refs.verify.reset();
        _this.errorMessage = '验证失效,请重新验证'
      }, 30000);
    },
    // 微信公众号
    weChat() {
      console.log('we')
      this.weChatFlag = !this.weChatFlag;
    },
    // 忘记密码
    resetChange(flag) {
      this.resetFlag = flag;
    },
    //修改密码
    resetPwd(resetForm) {
      let _this = this
      this.$refs[resetForm].validate((valid) => {
        if (valid) {
          console.log(_this.resetForm)
          // 修改密码
          _this.$store.dispatch("resetPassword", _this.resetForm).then(
            res => {
              _this.$message({
                type: "success",
                message: "修改成功，请返回登录"

              });
              console.log(res);

            },
            error => {
              console.log(error);
            }
          );
        }
      });
    },

    //获取系统标题
    async getSystemData() {
        // let _this = this;
        let res = await getDictListDetailByNameApi('系统标题');
        this.systemTitleLogin = res.data[0].name;
        this.$store.commit('set_systemTitle',res.data[0].name);
        window.document.title = res.data[0].name;
        //设置省份
        this.$store.commit('setProvince',res.data[2]&&res.data[2].name?res.data[2].name:'');
        //是否需要签章
        this.$store.commit('setShowQZBtn', res.data[1]&&res.data[1].name == '是'? true : false)
    //     new Promise((resolve, reject) => {
    //         getDictListDetailByNameApi('系统标题').then(res => {
    //             console.log('系统标题', res);
    //             //系统标题

    //             //设置系统首页
    //             // this.$store.commit('setHomePage', res.data[3].name)
    //         }, err => {
    //             console.log(err);
    //         })
    //   })
    },
  },
  mounted() {
    this.showLogin = true;
    // this.test()
  },
  async created () {
    await this.getSystemData();
  },
  components: {
      VueSimpleVerify
  },
  destroyed(){
       clearTimeout(this.timeOutFlag);
  }
  // created: function () {
  //   this.getCaptcha();
  // }
};
</script>

<style lang="scss" src="@/assets/css/login.scss">
</style>
<style lang="scss" src="@/assets/css/verify.scss">
</style>


