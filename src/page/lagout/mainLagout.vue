<template>
  <div class="fullscreen">
    <el-container id="fullscreenCon">
      <el-header id="mainHeader">
        <div class="main_logo">
          <!-- <img :src="'./static/images/main/logo.png'" alt=""> -->
          <span>{{systemTitle}}</span>
        </div>
        <div class="headMenu" v-show="!showMoreMenusFlag">
          <headMenu @selectHeadMenu="getSelectHeadMenu"></headMenu>
          <div
            class="moreMenu"
            v-if="moreMenuIcon"
            @click="showMoreMenus"
            @mouseenter="showMoreMenus"
          >
            <i class="el-icon-more"></i>
          </div>
        </div>
        <div class="headerRight">
          <!-- <div>
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">个人设置</el-dropdown-item>
                  <el-dropdown-item command="b">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
          </div>-->
          <div v-if="userInfo">
            <el-popover
              placement="top-start"
              width="335"
              trigger="hover"
              style="padding:0"
              popper-class="padding0"
              @hide="hideMoreMenusIfHave"
            >
              <div class="info_top">
                <li>
                  <img src="../../../static/images/img/personInfo/head.svg" alt />
                </li>
                <li>
                  <p class="name">{{userInfo.nickName}}</p>
                  <p class="number">{{userInfo.username}}</p>
                </li>
              </div>
              <div class="info_center">
                <el-form ref="form" label-width="72px">
                  <el-form-item label="手机号码：">{{userInfo.mobile}}</el-form-item>
                  <el-form-item label="执法机构：">{{userInfo.organName}}</el-form-item>
                  <el-form-item label="所属部门：">{{userInfo.departName}}</el-form-item>
                  <el-form-item label="上次登录：">{{userInfo.loginTime}}</el-form-item>
                </el-form>
              </div>
              <div class="info_btm">
                <li>
                  <img src="../../../static/images/img/personInfo/set.png" alt />信息链接
                </li>
                <li>
                  <img src="../../../static/images/img/personInfo/edit.png" alt />意见反馈
                </li>
                <li @click="handleCommand('b')" style="margin-right:0 !important">
                  <img src="../../../static/images/img/personInfo/unlogin.png" alt />退出登录
                </li>
              </div>
              <span slot="reference">
                <img src="../../../static/images/img/personInfo/head.svg" alt />
                {{userInfo.nickName}}
                <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
              </span>
            </el-popover>
          </div>
          <div>
            <i class="iconfont law-message"></i>
          </div>
          <div>
            <i class="iconfont law-home"></i>
          </div>
        </div>
      </el-header>
      <transition name="fade">
        <div class="thisMoreMenusBox" v-show="showMoreMenusFlag" @mouseleave="hideMoreMenus">
          <div class="thisMoreMenus">
            <headMenuAll @selectHeadMenu="getSelectHeadMenu"></headMenuAll>
          </div>
        </div>
      </transition>
      <el-container>
        <el-aside width="200px">
          <!-- :selectedHeadMenu="selectedHeadMenu" -->
          <subLeftMenu :selectedHeadMenu="selectedHeadMenu"></subLeftMenu>
        </el-aside>
        <div class="table-title-old" v-if="showZHZFPT=='1'">
          <i class="iconfont law-jinru"></i>
          <!-- <a href='../../../static/js/loginOldSystem.html?user=admin&pwd=12345qwert'>综合执法平台</a> -->

          <a :href="oldSystemHref" id="n" οnclick="enterOld()" target="_blank">综合执法平台</a>
          <!-- 综合执法平台 -->
        </div>
        <el-container>
          <el-header id="tabsHeader" style="height:33px">
            <tabsMenu @router="router"></tabsMenu>
          </el-header>
          <el-main>
            <!-- <mainContent></mainContent> -->
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
// import Cookies from "@/common/js/cookies";
import iLocalStroage from "@/common/js/localStroage";
import headMenu from "@/components/headMenu";
import subLeftMenu from "@/components/subLeftMenu";
import tabsMenu from "@/components/tabsMenu";
import mainContent from "@/components/mainContent";
import { mapGetters } from "vuex";
import { menuList } from "@/common/data/menu";
import headMenuAll from "@/components/headMenuAll";

import { getCurrentUserApi, getMenuApi, loginOldSystemApi } from "@/api/login";
import { getDictListDetailByNameApi } from "@/api/system";
import { decryption, encryption } from "@/common/js/cryptoAes";
export default {
  name: "mainLagout",
  data() {
    return {
      // newRoute: [Cookies.get("menu")],
      // openKeys: ["sub1"],
      // collapsed: false,
      // avatar: Cookies.get("avatar")
      userInfo: null,
      selectedHeadMenu: null, //接收headMenu传来的选中的一级菜单
      userName: iLocalStroage.gets("userInfo").username,
      password: iLocalStroage.gets("userInfo").password,
      oldSystemHref: "",
      showMoreMenusFlag: false,
      moreMenuIcon: false,
    };
  },
  components: {
    headMenu,
    subLeftMenu,
    tabsMenu,
    mainContent,
    headMenuAll,
  },
  computed: {
    ...mapGetters(["systemTitle", "headActiveNav", "menu",'showZHZFPT']),
  },
  inject: ["reload"],
  methods: {
    //下拉框命令
    handleCommand(command) {
      if (command == "a") {
        this.goToUser();
      } else if (command == "b") {
        this.loginOut();
      }
    },
    //退出
    loginOut() {
      //   Cookies.remove("TokenKey");
      // this.$store.state.openTab = [];
      this.$store.commit("CLEAR_ALL_CACHE");
      this.$store.dispatch("deleteAllTabs");
      this.$router.push({ name: "login" });
    },
    //个人设置  待完善
    goToUser() {
      //   Cookies.set("menu", "personInfor");
      this.reload(); //reload 可以去掉导航菜单选中状态的class
      this.$router.push({ name: "personInfor" });
    },

    getSelectHeadMenu(name) {
      this.selectedHeadMenu = name;
      this.showMoreMenusFlag = false;
    },
    router(name, route) {
      // debugger;
      // this.$router.push({ name: name,params: route.params});
    },
    //获取系统标题
    getSystemData() {
      // debugger;
      if (this.systemTitle) {
        window.document.title = this.systemTitle;
        return;
      }
      getDictListDetailByNameApi("系统标题").then(
        (res) => {
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
        },
        (err) => {
          console.log(err);
        }
      );
    },
    initUser() {
      if (!iLocalStroage.gets("userInfo") || !this.$store.state.system.menu) {
        console.log("获取信息");
        let _this = this;
        new Promise((resolve, reject) => {
          getCurrentUserApi().then(
            (res) => {
              // res.data.encryptionUserName=encryption(this.loginForm.username)
              // res.data.encryptionPassword=encryption(this.loginForm.password)
              // iLocalStroage.sets('userInfo', res.data);
              _this.userInfo = res.data;
              _this.initMenu();
            },
            (err) => {
              console.log(err);
            }
          );
        });
      } else {
      }
    },
    initMenu() {
      let _this = this;
      console.log("util获取菜单");
      new Promise((resolve, reject) => {
        getMenuApi().then(
          (res) => {
            // ,
            // let menuListNew = [...res.data, ...menuList];
            // _this.menuList = [...menuList];
            _this.menuList = res.data;
            _this.$store.commit("SET_MENU", _this.menuList);
            //   _this.$store.commit("SET_ACTIVE_INDEX_STO", "law_supervise_lawSupervise");
            //   _this.$store.commit('set_Head_Active_Nav',"lawSupervise-menu-law_supervise_lawSupervise");
            let routerName = sessionStorage.getItem("HOME_PAGE_ROUTER_NAME");
            _this.$store.commit("SET_ACTIVE_INDEX_STO", `${routerName}#0`);
            _this.$store.commit("set_Head_Active_Nav", routerName);
            _this.getSystemData();
            // _this.$router.push({ name: routerName});

            this.$store.dispatch("deleteAllTabs");

            let to = _this.$route;
            _this.$store.dispatch("addTabs", {
              route: to.path,
              name: to.name,
              // title: tabsCode+tabTitle,
              title: to.meta.title,
              isCase: false,
              params: to.params,
              headActiveNav: _this.headActiveNav,
            });

            if (this.menu.length > 7) {
              this.moreMenuIcon = true;
            }
          },
          (err) => {
            console.log(err);
          }
        );
      });
    },
    loginOldSystem() {
      let values = {
        username: iLocalStroage.gets("userInfo").username,
        // password: iLocalStroage.gets('userInfo').password,
        password: "12345qwert",
        captcha: "tadfd",
      };
      loginOldSystemApi(values)
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
    //显示更多菜单
    showMoreMenus() {
      this.showMoreMenusFlag = true;
    },
    //隐藏更多菜单
    hideMoreMenus() {
      this.showMoreMenusFlag = false;
    },
    enterOld() {
      var name = iLocalStroage.gets("userInfo").encryptionUserName; //可以是一个可变的值
      var pwd = iLocalStroage.gets("userInfo").encryptionPassword; //可以是一个可变的值
      this.oldSystemHref =
        "../../../static/js/loginOldSystem.html?user=" + name + "&pwd=" + pwd;
    },
    //个人信息弹框隐藏时触发
    hideMoreMenusIfHave(){
      this.showMoreMenusFlag = false;
    }
  },
  watch: {
    $route(to, from) {
      // this.init()
    },
  },
  mounted() {
    this.selectedHeadMenu = this.headActiveNav;
    this.userInfo = iLocalStroage.gets("userInfo");
    this.enterOld();
  },
  created() {
    //判断有没有menu
    this.initUser();
    // this.getSystemData()
    if (this.menu.length > 7) {
      this.moreMenuIcon = true;
    }
  },
};
</script>
<style lang="scss" src="@/assets/css/main.scss"></style>
<style lang="scss">
/* @import "@/assets/css/main.scss"; */

.info_top {
  background: url("../../../static/images/img/personInfo/bg.png") no-repeat;
}

.table-title-old {
  width: 200px;
  height: 68px;
  line-height: 68px;
  cursor: pointer;
  position: fixed;
  bottom: 0;
  left: 0;
  float: left;
  background: #2b313e;
  border-top: 1px solid #212630;
  text-align: center;
  font-size: 16px;
  font-weight: bolder;
  color: #96a3af;
  a {
    color: #96a3af;
  }
}
</style>


