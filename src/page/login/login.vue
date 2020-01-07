<template>
  <div class="login">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="login_logo"><img src="../../../src/assets/image/main/logo.png" alt=""><span>全国交通运输执法管理系统</span></div>
        <div class="leftC">
          <img src="../../../src/assets/image/login/pic1.png" alt="">
        </div>
        <div class="rightC">
          <div class="formC1">
            <p>账号密码登录</p>
            <el-form :model="loginForm" :rules="rules" status-icon ref="loginForm"  class="demo-ruleForm">
              <el-form-item prop="username">
                <el-input placeholder="请输入用户名" v-model="loginForm.username">
                  <template slot="prepend">账号</template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input placeholder="请输入密码" v-model="loginForm.password" type="password">
                  <template slot="prepend">密码</template>
                </el-input>
              </el-form-item>
              <el-form-item prop="code" class="codeInputBox">
                <el-input placeholder="请输入验证码" class="codeInput" v-model="loginForm.code">
                </el-input>
                <div class="captchaBox" style="position:absolut;right:0">
                      <!-- <Spin v-if="loadingCaptcha" fix></Spin> -->
                      <img
                        :src="captchaImg"
                        @click="getCaptcha"
                        style="width:100px;cursor:pointer;display:block"
                      />
                </div>   
              </el-form-item>
              <div class="forgetPass"><el-link type="primary" :underline="false">忘记密码</el-link></div>
              <div >
                  <el-button type="primary" @click="submitLogin('loginForm')">登录</el-button>
              </div>
              
            </el-form>
          </div>
        </div>
      </section>
    </transition>
  </div>
</template>

<script>

// import { mapGetters } from "vuex";
import Cookies from "@/js/cookies";
import iLocalStroage from "@/js/localStroage";
import { drawCodeImage } from "@/api/login";
export default {
  data() {
    return {
      formLayout: "vertical",
      captchaId:'',   //验证码id
      captchaImg:'',   //验证码图片src
      loginForm: {
        username: "test",
        password: "123456",
        code:''       //验证码
      },
      rules:{
        username: [
            {  required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
            {  required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code:[
            {  required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      hasUserError: false,
      haspasswordError: false,
      showLogin: false
    };
  },
  methods: {
   
    //获取验证码
    getCaptcha(){
       this.$store.dispatch("getCaptcha").then(
         res=>{
           let captcha = res.data;
           this.captchaId = captcha.split('::')[0];
          
          //  this.captchaImg = drawCodeImage + this.captchaId;
          this.getCaptchaImgsrc()
         },
         err=>{
           console.log(err)
         }
       )
    },
    
    getCaptchaImgsrc(){
      console.log('this.captchaId',this.captchaId)
       this.$store.dispatch("getCapImgSrc",this.captchaId).then(
         res=>{
           console.log(res);
           let a = 'data:image/png;base64,' + btoa(
              new Uint8Array(res)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            console.log(a);
           this.captchaImg = a;

         },
         err=>{
           console.log(err)
         }
       )
    },
    //登录
    submitLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let values = this.loginForm;
          values.captchaId = this.captchaId;
      
          this.$store.dispatch("loginIn",values).then(
            res => {
              console.log(res);
              iLocalStroage.sets('userInfo',res.userInfo);

              // Cookies.set("menu", "companyInfo");
              // Cookies.set("openMenu","identityCheck");
              //this.$router.push({ name: "index" });
              this.getMenu();
            },
            error => {
              console.log(error);
              if(error.code == 500){  //验证码错误
                this.$message({
                    showClose: true,
                    message: '验证码错误',
                    type: 'error'
                })
                this.getCaptcha()
              }
            }
          );
          //this.$router.push({ name: "index" });
        }
      });
    },

    //获取菜单
    getMenu(){
      this.$store.dispatch("getMenu").then(
         res=>{
           console.log('获取菜单',res);
           iLocalStroage.sets('menu',res.data);
           this.$router.push({ name: "home_index" });
         },
         err=>{
           console.log(err);
         }
      )
    },


    blueUsername() {
      this.hasUserError = false;
    },
    bluePassword() {
      this.haspasswordError = false;
    }
    // gotoRegister(){
    //   console.log(1111);
    //   this.$router.push('/register');
    // }
  },
  mounted() {
    this.showLogin = true;
  },
  created:function(){
    this.getCaptcha();
  }
};
</script>

<style lang="less">
@import "../../css/login.less";
</style>


