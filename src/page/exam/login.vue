<template>
  <section class="login exam-login">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="leftC">
          <img src="../../../static/images/img/login/zf_bg.png" alt="">
          <div class="leftC_title">
              <img src="../../../static/images/img/login/logo1.png" alt=""> {{systemTitle}}
          </div>
        </div>
        <div class="rightC" v-if="!resetFlag">
          <div class="form_box">
            <span class="sys-title">人员考试子系统</span>
            <span class="title" :class="check === '0'  ? 'checkText' : '' " @click="changeType('0')">参考考生</span>
            <span class="title" :class="check === '1'  ? 'checkText' : '' " @click="changeType('1')">监考老师</span>
            <span class="title" :class="check === '2'  ? 'checkText' : '' " @click="changeType('2')">评卷人</span>
            <div class="formC1">
              <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
                <el-form-item prop="loginName">
                  <el-input placeholder="请输入账号" v-model="loginForm.loginName" maxlength="18">
                    <i slot="prefix">
                      <svg t="1582619936338" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1150" width="16" height="16">
                        <path d="M652.3 562.7C741.6 513.3 802 418.2 802 309c0-160.2-129.8-290-290-290-160.2 0-290 129.8-290 290 0 109.2 60.4 204.3 149.7 253.7C184 622.2 48 797.7 48 1005l58 0c0-224.2 181.8-406 406-406 224.2 0 406 181.8 406 406l58 0C976 797.7 840 622.2 652.3 562.7zM280 309c0-128.1 103.9-232 232-232 128.1 0 232 103.9 232 232 0 128.1-103.9 232-232 232C383.9 541 280 437.1 280 309z" p-id="1151" fill="#9FA3AF"></path>
                      </svg>
                    </i>
                  </el-input>
                </el-form-item>
                <el-form-item
                  v-if="check !== '0'"
                  prop="password"
                  :rules="{required: !check, message: '请输入密码', trigger: 'blur' }"
                >
                  <el-input placeholder="请输入密码" v-model="loginForm.password" type="password">
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
                  <vue-simple-verify ref="verify" :width='460' tips='向右滑动完成验证' @success="pass()" />
                </el-form-item>
                <div class="forgetPass">
                  <el-collapse-transition>
                    <div v-show="errorMessage" class="error">{{errorMessage}}</div>
                  </el-collapse-transition>
                </div>
                <div>
                  <el-button type="primary" @click="submitLogin('loginForm')">登录</el-button>
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
// 滑动验证
import VueSimpleVerify from 'vue-simple-verify';
import { mapGetters } from "vuex";
import iLocalStroage from "@/common/js/localStroage";
import * as types from "@/store/mutation-types";
import { getDictListDetailByNameApi } from "@/api/system";

export default {
  components: { VueSimpleVerify },
  data() {
    return {
      captchaId: '',   //验证码id
      loginForm: {
        loginName: "",
        password: "",
        code: ''
      },
      rules: {
        loginName: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请完成验证', trigger: 'blur' }
        ]
      },
      showLogin: false,
      errorMessage: '',
      errorPwd: '',
      check: '0',
      success: false,
      weChatFlag: false,
      resetFlag: false,
      timeOutFlag: ""
    };
  },
  computed: {...mapGetters(['systemTitle'])},
  methods: {
    // 切换登录方式
    changeType(type) {
      this.check = type;
      this.loginForm.loginName = '';
      this.loginForm.password = '';
    },

    //登录
    submitLogin(formName) {
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证码
          const submitData = {
            loginName: _this.loginForm.loginName,
            password: _this.loginForm.password,
            type: _this.check
          };
          if (_this.success) {
            _this.$store.dispatch("personLoginExam", submitData).then(
              res => {
                sessionStorage.setItem('ExamName', _this.loginForm.loginName);
                // 监考老师 登录成功
                if(_this.check === '1'){
                  sessionStorage.setItem('ExamUserInfo', JSON.stringify(res.data));
                  const fromPath = res.data.invigilatorInfo.token ? '/invigilator' : '/entrySystem';
                  _this.$router.push({
                    path: fromPath,
                    query: {
                      name: _this.loginForm.loginName,
                      id: res.data.invigilatorInfo.invigilatorId
                    }
                  });
                }else if(_this.check === '0'){
                  _this.$router.push({
                    path: '/examineeEntry',
                    query: {
                      name: _this.loginForm.loginName
                    }
                  });
                }else if(_this.check === '2'){
                  _this.$router.push({
                    path: '/markPaper',
                    query: {
                      name: _this.loginForm.loginName
                    }
                  });
                }
                // 清除定时器
                clearTimeout(_this.timeOutFlag)
                _this.success = false
              },
              error => {
                 this.$message({
                  type: "error",
                  message: error.msg || ''
                });
              }
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
    //获取系统标题
    getSystemData() {
      getDictListDetailByNameApi('系统标题').then(res => {
        this.$store.commit('set_systemTitle',res.data[0].name);
        window.document.title = res.data[0].name
      }, err => {
        console.log(err);
      })
    }
  },
  created () {
    window.sessionStorage.clear();
    this.getSystemData();
  },
  mounted() {
    this.showLogin = true;
    sessionStorage.setItem('LoginSystem', 'examLogin');
  }
};
</script>

<style lang="scss">
@import "@/assets/css/login.scss";
@import "@/assets/css/verify.scss";
</style>
<style lang="scss" scoped>
.login.exam-login{
  .form_contianer .rightC .form_box{
    width: 546px;
  }
  .formC1{
    width: 460px;
  }
}
.sys-title{
  font-size:36px;
  font-weight:500;
  color:rgba(181,184,189,1);
  line-height:48px;
  display: inline-block;
  text-align: left;
  width: 100%;
  margin-bottom: 48px;
}
</style>



