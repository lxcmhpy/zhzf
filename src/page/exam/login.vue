<template>
  <section class="login exam-login">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" style="margin-bottom:0;" v-show="showLogin">
        <div class="leftC">
          <img :src="'./static/images/img/login/zf_bg.jpg'" alt />
          <div class="leftC_title">
            <img :src="'./static/images/img/login/logo1.png'" alt />
            {{systemTitle}}
          </div>
        </div>
        <div class="rightC" v-if="!resetFlag">
          <div class="form_box">
            <div style="display: inline-block;">
              <span class="sys-title">人员考试系统</span>
              <!-- <span v-if="check === '0'" class="title checkText">参考考生</span>
              <span v-if="check === '1'" class="title checkText">监考老师</span>
              <span v-if="check === '2'" class="title checkText">评卷人</span>-->
              <div class="formC1">
                <el-form :model="loginForm" :rules="rules" ref="loginForm">
                  <el-form-item prop="loginName">
                    <el-input placeholder="请输入账号" v-model="loginForm.loginName" maxlength="18">
                      <i slot="prefix">
                        <svg
                          t="1582619936338"
                          class="icon"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="1150"
                          width="16"
                          height="16"
                        >
                          <path
                            d="M652.3 562.7C741.6 513.3 802 418.2 802 309c0-160.2-129.8-290-290-290-160.2 0-290 129.8-290 290 0 109.2 60.4 204.3 149.7 253.7C184 622.2 48 797.7 48 1005l58 0c0-224.2 181.8-406 406-406 224.2 0 406 181.8 406 406l58 0C976 797.7 840 622.2 652.3 562.7zM280 309c0-128.1 103.9-232 232-232 128.1 0 232 103.9 232 232 0 128.1-103.9 232-232 232C383.9 541 280 437.1 280 309z"
                            p-id="1151"
                            fill="#9FA3AF"
                          />
                        </svg>
                      </i>
                    </el-input>
                  </el-form-item>
                  <el-form-item
                    v-if="check !== '0'"
                    prop="password"
                    :rules="{required: true, message: '请输入密码', trigger: 'blur' }"
                  >
                    <el-input placeholder="请输入密码" v-model="loginForm.password" type="password">
                      <i slot="prefix">
                        <svg
                          t="1582620094865"
                          class="icon"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="2310"
                          width="16"
                          height="16"
                        >
                          <path
                            d="M788.081778 435.2c41.585778 0 75.292444 34.389333 75.292444 76.8v358.4c0 42.410667-33.706667 76.8-75.292444 76.8H235.918222c-41.585778 0-75.292444-34.389333-75.292444-76.8V512c0-42.410667 33.706667-76.8 75.292444-76.8h552.163556z m0-76.8H235.918222C152.746667 358.4 85.333333 427.178667 85.333333 512v358.4C85.333333 955.221333 152.746667 1024 235.918222 1024h552.163556C871.253333 1024 938.666667 955.221333 938.666667 870.4V512c0-84.821333-67.413333-153.6-150.584889-153.6zM512 76.8c97.024 0 175.672889 80.213333 175.672889 179.2v102.4H336.327111V256c0-98.986667 78.648889-179.2 175.672889-179.2zM512 0c-138.609778 0-250.993778 114.631111-250.993778 256v179.2h501.987556V256c0-141.368889-112.355556-256-250.993778-256z m0 806.4c-20.792889 0-37.660444-17.180444-37.660444-38.4v-153.6c0-21.219556 16.867556-38.4 37.660444-38.4 20.792889 0 37.660444 17.180444 37.660444 38.4V768c0 21.219556-16.867556 38.4-37.660444 38.4z"
                            fill="#9FA3AF"
                            p-id="2311"
                          />
                        </svg>
                      </i>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="kaptcha">
                    <el-input
                      placeholder="请输入验证码"
                      v-model="loginForm.kaptcha"
                      maxlength="6"
                      class="captcha-input"
                    >
                      <template slot="append">
                        <img :src="captchaImg" @click="getCaptchaImg" />
                      </template>
                    </el-input>
                  </el-form-item>
                  <!-- <el-form-item class="codeInputBox">
                    <vue-simple-verify ref="verify" :width="460" tips="向右滑动完成验证" @success="pass()" />
                    <div class="forgetPass" style="margin: 0; position:absolute;">
                      <el-collapse-transition>
                        <div v-show="errorMessage" class="error">{{errorMessage}}</div>
                      </el-collapse-transition>
                    </div>
                  </el-form-item>-->
                  <div>
                    <el-button type="primary" @click="submitLogin('loginForm')">登录</el-button>
                  </div>
                </el-form>
              </div>
            </div>
          </div>
          <div class="footer">
            <center>
              <span
                class="entry-type"
                :class="check === '0'  ? 'active' : '' "
                @click="changeType('0')"
              >考生入口</span>
              <i class="split">|</i>
              <span
                class="entry-type"
                :class="check === '1'  ? 'active' : '' "
                @click="changeType('1')"
              >监考入口</span>
              <!-- <i class="split">|</i>
              <span
                class="entry-type"
                :class="check === '2'  ? 'active' : '' "
                @click="changeType('2')"
              >评卷入口</span>-->
            </center>
          </div>
        </div>
      </section>
    </transition>
  </section>
</template>

<script>
// 滑动验证
import VueSimpleVerify from "vue-simple-verify";
import * as types from "@/store/mutation-types";
import { getDictListDetailByNameApi } from "@/api/system";
import iLocalStroage from "@/common/js/localStroage";
import { removeToken } from "@/common/js/auth";
import { getHost } from "@/api/login";
export default {
  components: { VueSimpleVerify },
  data() {
    return {
      captchaId: "", //验证码id
      loginForm: {
        loginName: "",
        password: "",
        kaptcha: "",
        code: "",
        uuid: "",
      },
      rules: {
        loginName: [{ required: true, message: "请输入账号", trigger: "blur" }],
        kaptcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        code: [{ required: true, message: "请完成验证", trigger: "blur" }],
      },
      showLogin: false,
      errorMessage: "",
      errorPwd: "",
      check: "0",
      success: false,
      weChatFlag: false,
      resetFlag: false,
      timeOutFlag: "",
      systemTitle: null,
      captchaImg: "",
      kaptchaInfo: { kaptcha: "", uuid: "" },
    };
  },
  computed: {
    ajaxUrl() {
      const BASEURL = iLocalStroage.gets("CURRENT_BASE_URL");
      return BASEURL["CAPTCHA_HOST"];
    },
  },
  methods: {
    // 切换登录方式
    changeType(type) {
      this.check = type;
      this.loginForm.loginName = "";
      this.loginForm.password = "";
    },

    // 获取验证码
    getCaptchaImg() {
      this.$store.dispatch("getCaptchaImg").then(
        (res) => {
          if (res.code === 200) {
            this.kaptchaInfo.kaptcha = res.data.kaptcha;
            this.kaptchaInfo.uuid = res.data.uuid;
            this.loginForm.uuid = res.data.uuid;
            this.captchaImg = `${this.ajaxUrl}/exam/examLogin/captchaImg?kaptcha=${res.data.kaptcha}&uuid=${res.data.uuid}`;
          }
        },
        (err) => {
          this.catsMessage({
            type: "error",
            message: error.msg || "",
          });
        }
      );
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
            kaptcha: _this.loginForm.kaptcha,
            uuid: _this.loginForm.uuid,
            type: _this.check,
          };
          _this.$store.dispatch("personLoginExam", submitData).then(
            (res) => {
              sessionStorage.setItem("ExamName", _this.loginForm.loginName);
              // 监考老师 登录成功
              if (_this.check === "1") {
                sessionStorage.setItem(
                  "ExamUserInfo",
                  JSON.stringify(res.data)
                );
                const fromPath = res.data.invigilatorInfo.token
                  ? "/invigilator"
                  : "/entrySystem";
                _this.$router.push({
                  path: fromPath,
                  query: {
                    name: _this.loginForm.loginName,
                    id: res.data.invigilatorInfo.invigilatorId,
                  },
                });
              } else if (_this.check === "0") {
                _this.$router.push({
                  path: "/examineeEntry",
                  query: {
                    name: _this.loginForm.loginName,
                  },
                });
              } else if (_this.check === "2") {
                _this.$router.push({
                  path: "/markPaper",
                  query: {
                    name: _this.loginForm.loginName,
                  },
                });
              }
              // 清除定时器
              clearTimeout(_this.timeOutFlag);
              _this.success = false;
            },
            (error) => {
              this.$message({
                type: "error",
                message: error.msg || "",
              });
            }
          );
        } else {
          return false;
        }
      });
    },

    pass() {
      this.success = true;
      this.errorMessage = "";
      let _this = this;
      this.timeOutFlag = setTimeout(() => {
        // debugger;
        _this.success = false;
        _this.$refs.verify.reset();
        _this.errorMessage = "验证失效,请重新验证";
      }, 30000);
    },
    //获取系统标题
    async getSystemData() {
      if (this.systemTitle) {
        return;
      }
      let res = await getDictListDetailByNameApi("系统标题");
      this.systemTitle = res.data[0].name;
      window.document.title = this.systemTitle;
      this.systemTitle = res.data[0].name;
      localStorage.setItem("SYS_TITLE", this.systemTitle);
      //设置省份
      this.$store.commit(
        "setProvince",
        res.data[2] && res.data[2].name ? res.data[2].name : ""
      );
    },
  },
  async created() {
    window.sessionStorage.clear();
    removeToken("TokenKey");
    sessionStorage.setItem("LoginSystem", "examLogin");
    // this.systemTitle = localStorage.getItem("SYS_TITLE");
    await getHost();
    await this.getSystemData();
    this.getCaptchaImg();
  },
  mounted() {
    this.showLogin = true;
  },
};
</script>

<style lang="scss">
@import "@/assets/css/login.scss";
@import "@/assets/css/verify.scss";
</style>
<style lang="scss" scoped>
.login.exam-login {
  position: relative;
  overflow-y: scroll;
  .form_contianer .rightC .form_box {
    width: 546px;
    height: 100%;
    margin-top: 120px;
  }
  .rightC {
    position: relative;
    height: 100%;
    box-sizing: border-box;
    .footer {
      position: absolute;
      bottom: 60px;
      color: #b5b8bd;
      .entry-type {
        font-size: 18px;
        cursor: pointer;
        &.active,
        &:hover {
          color: #4574d0;
          font-weight: bold;
        }
      }
      .split {
        font-style: inherit;
        font-size: 18px;
        margin: 0 10px;
      }
    }
  }
  .formC1 {
    width: 460px;
    margin-top: 30px;
    .captcha-input {
      font-size: 16px;
      >>> .el-input__inner {
        height: 50px;
      }
      >>> .el-input-group__append {
        padding: 0;
        > img {
          display: block;
          width: 100px;
          height: 50px;
          cursor: pointer;
        }
      }
    }
  }
}
.sys-title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(181, 184, 189, 1);
  line-height: 48px;
  display: inline-block;
  text-align: left;
  width: 100%;
  margin-bottom: 48px;
}
</style>



