<template>
  <section class="login">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="leftC">
          <img :src="loginImgSrc" alt="" @load='loadImg'>
          <div class="leftC_title">
            <img :src="'./static/images/img/login/logo1.png'" alt=""> {{systemTitleLogin}}
          </div>
        </div>
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
                  <!-- <vue-simple-verify ref="verify" :width='420' tips='向右滑动完成验证' @success="pass()" /> -->
                  <div class="drag" ref="dragDiv">
                    <div class="drag_bg"></div>
                    <div ref="textDiv" class="drag_text" style="margin-top: -32px;">{{confirmWords}}</div>
                    <div ref="moveDiv" @mousedown="mousedownFn($event)" :class="{'handler_ok_bg':success}" class="handler handler_bg" style="position: absolute;top: 0px;left: 0px;"></div>
                  </div>
                </el-form-item>
                <div class="forgetPass">
                  <div v-show="errorMessage" class="error-pwd">{{errorMessage}}</div>
                </div>

                <div>
                  <el-button type="primary" @click="submitLogin('loginForm')">登录</el-button>
                </div>
                <div class="login_btm">
                  <el-link type="primary" :underline="false" class="left_float" :href="appDownHref" download="执法app">APP下载</el-link>
                  <div class="left_float margin24 wechat_box">
                    <span @mouseenter="enter" @mouseleave="leave" class="wechat-text">微信公众号</span>
                    <div class="wechat" v-show="weChatFlag">
                      <img src="../../../static/images/img/login/weChat.png" alt="">
                    </div>
                  </div>
                  <el-link type="primary" :underline="false" class="right_float" @click="resetChange(true)">忘记密码</el-link>

                </div>

              </el-form>
            </div>
            <div class="formC1" v-if="!check">
              <div>请使用<span class="blue-text">执法APP</span>扫码登录</div>
              <div class="code_box">
                <img src="../../../static/images/img/login/loginCode.png" alt="">
              </div>
              <div class="gray">执法App - 首页右上角加号 - 左下角扫一扫</div>
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
import { encryption, encrypt ,decrypt,decryption} from "@/common/js/cryptoAes";
export default {
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
        // repetPassword: [
        //   { required: true, message: '请重复输入新密码', trigger: 'blur' },
        //   { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: '密码至少八个字符，至少一个字母和一个数字', trigger: 'blur' }
        // ],
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
      // 滑动验证
      beginClientX: 0,           /*距离屏幕左端距离*/
      mouseMoveStata: false,     /*触发拖动状态  判断*/
      maxwidth: '',               /*拖动最大宽度，依据滑块宽度算出来的*/
      confirmWords: '拖动滑块验证',   /*滑块文字*/
      success: false           /*验证成功判断*/
    };
  },
  computed: { ...mapGetters(['systemTitle']) },
  inject: ['reload'],
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
          if (!_this.isShow) {
            _this.success = true;
          }
          // 验证码
          if (_this.success) {
            let values = {
              username: _this.loginForm.username,
              password: encrypt(_this.loginForm.password),
              code: ''
            }
            values.captchaId = _this.captchaId;

            _this.$store.dispatch("loginIn", values).then(
              res => {
                // 登录成功
                // 清除定时器
                
                // 重置验证
                _this.success = false;
                this.beginClientX = 0
                // this.maxwidth = this.$refs.dragDiv.clientWidth - this.$refs.moveDiv.clientWidth;
                //   重置样式
                // this.$refs.moveDiv.style = 'position: absolute;top: 0px;left: 0px;'
                // if (type == 1) {
                // this.$refs.textDiv.removeAttribute("class")
                // this.$refs.textDiv.setAttribute("className", "drag_text")
                // document.getElementsByClassName('drag_bg')[0].style.width = 0
                // this.confirmWords = '拖动滑块验证';
                // }

                // document.getElementsByTagName('html')[0].addEventListener('mousemove', this.mouseMoveFn);
                // document.getElementsByTagName('html')[0].addEventListener('mouseup', this.moseUpFn)
                _this.getCurrentUser();
              }
            );
          } else {
            _this.errorMessage = '验证错误,请重试，3秒后自动消失'
            setTimeout(() => {
              _this.errorMessage = ""
            }, 3000)
          }
        } else {
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
      // new Promise((resolve, reject) => {
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
          }
        }, err => {
          console.log(err);
        })
      // })
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
    enter() {
      this.weChatFlag = true
    },
    leave() {
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
                    this.editFlag = false;
                    this.reload();
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
      let a = "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";
      // console.log('加密',a);
      let b = decrypt(a);
      console.log('解密',b);
      
      let bb = encrypt(JSON.stringify({'haha':'ni','name':null}));
      let cc = decrypt(bb);
      console.log('解密',cc)
      let res = await getDictListDetailByNameApi('系统标题');
      console.log('系统标题',res)
      console.log('系统标题2',decrypt(res.data))
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
        console.log('loginBg',imgRes)
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

      //是否显示滑动验证
      let dataRes = await getDictListDetailByNameApi('登录滑动验证');
      console.log('是否显示滑动验证',dataRes);
      
     
      // let dataRes2 =JSON.parse(decrypt(dataRes.data));
      // console.log('dataRes2',dataRes2)
      if(dataRes.data.length>0){
          // console.log(Number(dataRes2.data[0].name))
        this.isShow = Number(dataRes.data[0].name) ? true : false;
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
    mousedownFn: function (e) {
      if (!this.success) {
        e.preventDefault && e.preventDefault();   //阻止文字选中等 浏览器默认事件
        this.mouseMoveStata = true;
        this.beginClientX = e.clientX;
      }
    },        //mousedoen 事件
    successFunction() {
      this.success = true
      this.confirmWords = '验证通过';
      if (window.addEventListener) {
        document.getElementsByTagName('html')[0].removeEventListener('mousemove', this.mouseMoveFn);
        document.getElementsByTagName('html')[0].removeEventListener('mouseup', this.moseUpFn);
      } else {
        document.getElementsByTagName('html')[0].removeEventListener('mouseup', () => { });
      }
      document.getElementsByClassName('drag_text')[0].style.color = '#fff'
      document.getElementsByClassName('handler')[0].style.left = this.maxwidth + 'px';
      document.getElementsByClassName('drag_bg')[0].style.width = this.maxwidth + 'px';
    },                //验证成功函数
    mouseMoveFn(e) {
      if (this.mouseMoveStata) {
        let width = e.clientX - this.beginClientX;
        if (width > 0 && width <= this.maxwidth) {
          document.getElementsByClassName('handler')[0].style.left = width + 'px';
          document.getElementsByClassName('drag_bg')[0].style.width = width + 'px';
        } else if (width > this.maxwidth) {
          this.successFunction();
        }
      }
    },                   //mousemove事件
    moseUpFn(e) {
      this.mouseMoveStata = false;
      var width = e.clientX - this.beginClientX;
      if (width < this.maxwidth) {
        document.getElementsByClassName('handler')[0].style.left = 0 + 'px';
        document.getElementsByClassName('drag_bg')[0].style.width = 0 + 'px';
      }
    },                    //mouseup事件
    close(type) {
      this.mouseMoveStata = false
      this.success = false
      this.beginClientX = 0
      this.maxwidth = this.$refs.dragDiv.clientWidth - this.$refs.moveDiv.clientWidth;
      //   重置样式
      this.$refs.moveDiv.style = 'position: absolute;top: 0px;left: 0px;'
      if (type == 1) {
        this.$refs.textDiv.removeAttribute("class")
        this.$refs.textDiv.setAttribute("className", "drag_text")
        document.getElementsByClassName('drag_bg')[0].style.width = 0
        this.confirmWords = '拖动滑块验证';
      }
      document.removeEventListener('click', el.__vueClickOutside__);
      document.getElementsByTagName('html')[0].addEventListener('mousemove', this.mouseMoveFn);
      document.getElementsByTagName('html')[0].addEventListener('mouseup', this.moseUpFn)
    },
    removeClass(el, className) {
      // 删除样式
      if (!this.hasClass(el, className)) return
      let newClassName = el.className.split(' ')
      let index = newClassName.findIndex(item => {
        return item == className
      })
      newClassName.splice(index, 1)
      el.className = newClassName.join(' ')
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
    this.maxwidth = 390;
    document.getElementsByTagName('html')[0].addEventListener('mousemove', this.mouseMoveFn);
    document.getElementsByTagName('html')[0].addEventListener('mouseup', this.moseUpFn)
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
<style scoped>
.drag {
  position: relative;
  background-color: #e8e8e8;
  width: 420px;
  height: 34px;
  line-height: 34px;
  text-align: center;
}
.handler {
  width: 40px;
  height: 32px;
  border: 1px solid #ccc;
  cursor: move;
}
.handler_bg {
  background: #fff
    url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==")
    no-repeat center;
}
.handler_ok_bg {
  background: #fff
    url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==")
    no-repeat center;
}
.drag_bg {
  background-color: #7ac23c;
  height: 34px;
  width: 0px;
}
.drag_text {
  position: absolute;
  margin-top: -32px;
  width: 100%;
  text-align: center;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -o-user-select: none;
  -ms-user-select: none;
}
</style>



