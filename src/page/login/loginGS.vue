<template>
  <section class="login">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin" id="loginBgGS">
        <div class="rightC" v-if="!resetFlag&&!editFlag">
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
                    <div v-show="errorPwd" class="error-pwd">{{errorPwd}}</div>
                  </el-collapse-transition>
                </div>
                <el-form-item class="codeInputBox" v-if="isShow">
                  <vue-simple-verify ref="verify" :width='386' tips='向右滑动完成验证' @success="pass()" />
                </el-form-item>
                <div class="forgetPass">
                  <div v-show="errorMessage" class="error-pwd">{{errorMessage}}</div>
                </div>

                <div>
                  <el-button type="primary" @click="submitLogin('loginForm')">登录</el-button>
                </div>
                <div class="login_btm">
                  <!-- <el-link type="primary" :underline="false" class="left_float" :href="appDownHref" download="执法app">APP下载</el-link>  -->
                  <el-link type="primary" :underline="false" class="left_float"  download="执法app">APP下载</el-link> 
                  <!-- <div class="left_float margin24 wechat_box">
                    <span @mouseenter="enter" @mouseleave="leave" class="wechat-text">微信公众号</span>
                    <div class="wechat" v-show="weChatFlag">
                      <img src="../../../static/images/img/login/weChat.png" alt="">
                    </div>
                  </div> -->
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
            <div class="myline"></div>
            <center>
              <span class="blue-text">使用教程</span>
              |
              <span class="blue-text">帮助中心</span>
            </center>
          </div>
        </div>
        <!-- 重置密码 -->
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
              <span class="blue-text">使用教程</span>
              |
              <span class="blue-text">帮助中心</span>
            </center>
          </div>
        </div>
        <!-- 修改密码 -->
        <div class="rightC" v-if="editFlag">
          <div class="form_box">
            <span class="back">
              <el-button icon="el-icon-arrow-left" size="mini" @click="editChange(false)"></el-button>
            </span>
            <span class="title">修改密码</span>
            <div class="formC1" v-if="check">
              <el-form :model="editForm" label-width="80px" :rules="eidtRules" ref="eidtForm" class="demo-ruleForm">
                <el-form-item prop="username" label="账号名">
                  <el-input v-model="editForm.username">
                  </el-input>
                </el-form-item>
                <el-form-item prop="password" label="原密码">
                  <el-input type="password" v-model="editForm.password">
                  </el-input>
                </el-form-item>
                <el-form-item prop="repetPassword" label="重复密码" style="display: none;">
                  <el-input type="password" v-model="editForm.repetPassword">
                  </el-input>
                </el-form-item>
                <!--<el-form-item prop="repetPassword" label="新密码">
                  <el-input type="password" v-model="editForm.repetPassword">
                  </el-input>
                </el-form-item> -->
                <el-form-item prop="newPassword" label="新密码">
                  <el-input type="password" v-model="editForm.newPassword">
                  </el-input>
                </el-form-item>
                <div>
                  <el-button type="primary" @click="editPwd('eidtForm')">修改密码</el-button>
                </div>
              </el-form>
            </div>
          </div>
          <div class="footer">
            <center>
              <span class="blue-text">使用教程</span>
              |
              <span class="blue-text">帮助中心</span>
            </center>
          </div>
        </div>
      </section>
    </transition>
  </section>
</template>

<script>
import axios from "axios"
import { mapGetters } from "vuex";
import iLocalStroage from "@/common/js/localStroage";
import { drawCodeImage } from "@/api/login";
import * as types from "@/store/mutation-types";
import { menuList } from "@/common/data/menu";
// 滑动验证
import VueSimpleVerify from 'vue-simple-verify';
// Vue.component('vue-simple-verify', VueSimpleVerify)
import {
  getCurrentUserApi, getHost, resetPasswordApi
} from "@/api/login";
import {
  getDictListDetailByNameApi, hasUsernameLoginApi, updatePassWordApi, appDownloadApi,
} from "@/api/system";
import { encryption ,encrypt} from "@/common/js/cryptoAes";
export default {
  name:'logings',
  data() {
    return {
      formLayout: "vertical",
      captchaId: '',   //验证码id
      captchaImg: '',   //验证码图片src
      loginForm: {
        username: "",
        password: "",
        code: ''
      },
      resetForm: {
        username: "",
        nickName: "",
        enforceNo: ''
      },
      editForm: {
        username: "",
        password: "",
        newPassword: '',
        repetPassword: '',
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
        ],

      },
      resetRules: {
        username: [
          { required: true, message: '请输入账号名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请输入执法人员名称', trigger: 'blur' }
        ],
        enforceNo: [
          { required: true, message: '请输入执法证件号', trigger: 'blur' }
        ],
      },
      eidtRules: {
        username: [
          { required: true, message: '请输入账号名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: '密码至少八个字符，至少一个字母和一个数字', trigger: 'blur' }
        ],
        repetPassword: [
          { required: true, message: '请重复输入新密码', trigger: 'blur' },
          { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: '密码至少八个字符，至少一个字母和一个数字', trigger: 'blur' }
        ],
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
      editFlag: false,
      timeOutFlag: "",
      menuList: null,
      systemTitleLogin: null,
      loginImgSrc: '',
      appDownHref: '',
      isShow: true,//是否有登录滑动验证
    };
  },
  computed: { ...mapGetters(['systemTitle']) },
  methods: {
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
    //登录
    submitLogin(formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(!_this.isShow){
            _this.success=true;
          }
          // 验证码
          if (_this.success) {
            // let values = _this.loginForm;
            let values={
              username: _this.loginForm.username,
              password: encrypt(_this.loginForm.password), 
              code: ''
            }
            values.captchaId = _this.captchaId;

            _this.$store.dispatch("loginIn", values).then(
              res => {
                // 登录成功
                // 清除定时器

                _this.getCurrentUser();
                // 判断是否第一次登录
                // _this.$router.push({
                //   name: 'home'
                // })
                //   _this.$util.initUser(_this);
                _this.success = false;
                //   this.$store.commit('setShowQZBtn', true)
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

    //获取菜单
    getMenu() {

      let _this = this
      this.$store.dispatch("getMenu").then(
        res => {
          _this.menuList = res.data;
          _this.$store.commit("SET_MENU", _this.menuList);
          _this.$store.commit("SET_ACTIVE_INDEX_STO", "law_supervise_lawSupervise");
          _this.$store.commit('set_Head_Active_Nav', "lawSupervise-menu-law_supervise_lawSupervise");
          _this.$router.push({ name: "law_supervise_lawSupervise" });
        },
        err => {
          console.log(err);
        }
      )
    },
    //获取当前登录用户的信息
    getCurrentUser() {
      let _this = this;
      new Promise((resolve, reject) => {
        getCurrentUserApi().then(res => {
          if (res.data.passwordStatus == '0') {
            // 判断是否修改过密码
            this.$message({ message: '当前账号首次登录，请重新设置密码', type: 'warning' });
            this.editFlag = true
            this.editForm.username = this.loginForm.username
            this.editForm.password = this.loginForm.password
          } else {
            // 登录后默认跳转至host.json文件中配置的首页
            this.$router.push({ name: sessionStorage.getItem('HOME_PAGE_ROUTER_NAME') })

            res.data.encryptionUserName = encryption(this.loginForm.username)
            res.data.encryptionPassword = encryption(this.loginForm.password)
            iLocalStroage.sets('userInfo', res.data);
            // _this.getMenu();
          }
        }, err => {
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
    enter(){
      this.weChatFlag = true
    },
    leave(){
      this.weChatFlag = false
    },
    // 忘记密码
    resetChange(flag) {
      this.resetFlag = flag;
    },
    //重置密码
    resetPwd(resetForm) {

      let _this = this
      this.$refs[resetForm].validate((valid) => {
        if (valid) {
          // 重置密码
          resetPasswordApi(_this.resetForm).then(
            res => {
              if (res.code == 200) {
                _this.$message({
                  type: "success",
                  message: "修改成功，请返回登录"

                });
                console.log(res);
              } else {
                this.$message({ type: 'error', message: res.message });
              }
            },
            error => {
              this.$message({ type: 'error', message: '执法人员姓名输入错误' });
            }
          ).catch(err => {
            console.log(err)
          })
        }
      });
    },
    // 忘记密码
    editChange(flag) {
      this.editFlag = flag;
    },
    // 修改密码
    editPwd(editForm) {
      this.$refs[editForm].validate((valid) => {
        if (valid) {
          // if (this.editForm.newPassword == this.editForm.repetPassword) {
          hasUsernameLoginApi(this.editForm.username).then(
            res => {
              let data = {
                id: res.id,
                newPassword: this.editForm.newPassword,
                oldPassword: this.editForm.password
              }
              updatePassWordApi(data).then(
                res => {
                  if (res.code == 200) {
                    this.$message({
                      type: "success",
                      message: res.msg
                    });
                    this.editFlag = false
                  } else {
                    this.$message.error(res.msg);
                  }
                },
                error => {
                  this.$message.error(res.msg);
                })
            },
            error => {

            })
          // } else {
          //   this.$message.error('两次输入密码不一致');
          // }
        }
      })

    },
    //获取系统标题
    async getSystemData() {
      // let _this = this;
      let res = await getDictListDetailByNameApi('系统标题');
      this.systemTitleLogin = res.data[0].name;
      this.$store.commit('set_systemTitle', this.systemTitleLogin);
      window.document.title = res.data[0].name;
      //设置省份
      this.$store.commit('setProvince', res.data[2] && res.data[2].name ? res.data[2].name : '');
      //是否需要签章
      this.$store.commit('setShowQZBtn', res.data[1] && res.data[1].name == '是' ? true : false)
      //获取登录背景图片
      let imgRes = '';
      try {
        imgRes = await getDictListDetailByNameApi('loginBg');
        // this.$store.dispatch("setLoadingState", { flag: true, type: 'loadFull' });
        this.loginImgSrc = './static/images/img/login/' + imgRes.data[0].name + '.jpg';

      } catch (error) {
        this.loginImgSrc = './static/images/img/login/zf_bg.jpg'
        throw new Error(error);
      }
      //是否显示‘综合执法平台’
      try {
        let dataRes = await getDictListDetailByNameApi('显示综合执法平台');
        this.$store.commit('setShowZHZFPT', dataRes.data[0].name)
      } catch (error) {
        throw new Error(error);
      }
    },
    loadImg() {
      this.$store.dispatch("setLoadingState", { flag: false });
    },
    //获取app下载地址
    getAppDownHref() {
      appDownloadApi().then(res => {
        console.log(res);
        // let host = window.location.host;
        this.appDownHref = res.data;
        console.log(this.appDownHref)
      }).catch(err => {
        throw new Error(err)
      })
    },
  },
  async created() {
    this.$store.dispatch("setLoadingState", { flag: true, type: 'loadFull' });
    await getHost();
    await this.getSystemData();
    this.getAppDownHref();
  },
  mounted() {
    this.showLogin = true;
    this.isShow = true;
  },
  components: {
    VueSimpleVerify
  },
  destroyed() {
    clearTimeout(this.timeOutFlag);
  }
};
</script>

<style lang="scss" src="@/assets/css/login.scss">
</style>
<style lang="scss" src="@/assets/css/verify.scss">
</style>
<style lang="scss">
 #loginBgGS{
   background-image: url('../../../static/images/img/login/login_gs.jpg');
   background-repeat: no-repeat;
    background-size: cover;
    display: block;
    .rightC{
      margin-top: 12.5%;
      background: #fff;
      margin-right: 5%;
      width: 480px;
      height: 500px;
      box-shadow: 0 6px 27px 0px rgba(30,46,77,0.3);
      border-radius: 8px;
      .form_box{
        min-height: auto;
        width: 386px;
        .back{
          display: none;
        }
      }
      input:-webkit-autofill{
        -webkit-box-shadow:0 0 0 1000px white inset !important;
      }
      .title{
        margin-bottom: 20px;
        margin-top: 45px;
        font-size: 20px;
        color:#828795;
      }
      .checkText{
        font-size: 26px;
        color: #242729;
      }
      .formC1 {
        .el-input .el-input__prefix{
          top: 3px;
          left: 8px;
        }
        .el-input__inner{
          border-top: 1px solid #DAE0E8;
          border-bottom: 1px solid #DAE0E8;
          border-left: 1px solid #DAE0E8;
          border-right: 1px solid #DAE0E8;
        }
        button{
          margin-top: 0;
        }
        .login_btm{
          height: 70px;
        }
        .wechat_box{
          height: 70px;
          .wechat{
            width:80px;
            height: 80px;
            img{
              width: 100%;
            }
          }
        }
      }
      
    }
    .footer{
      margin-top: 0;
      .myline{
        height: 1px;
        background: #4B4F5A;
        opacity: 0.1;
        width: 386px;
        margin: auto;
        margin-bottom: 25px;
      }
      .blue-text{
        color: #999999;
      }
    }
 }
</style>



