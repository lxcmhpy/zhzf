<template>
  <div class="fullscreen">
    <el-container id="fullscreenCon">
      <el-header id="mainHeader">
        <div class="main_logo"><img :src="'./static/images/main/logo.png'" alt=""><span>全国交通运输执法管理系统</span></div>
        <div class="headMenu">
          <headMenu @selectHeadMenu="getSelectHeadMenu"></headMenu>
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
          </div> -->
          <div>
            <el-popover placement="top-start" width="335" trigger="hover" style="padding:0" popper-class='padding0'>
              <div class="info_top">
                <li><img src="../../../static/images/img/personInfo/head.svg" alt=""></li>
                <li>
                  <p class="name">{{userInfo.username}}</p>
                  <p class="number">{{userInfo.username}}</p>
                </li>

              </div>
              <div class="info_center">
                <el-form ref="form" label-width="72px">
                  <el-form-item label="手机号码：">
                    18300000000
                  </el-form-item>
                  <el-form-item label="执法机构：">
                    北京市交通执法总队 · 第一大队
                  </el-form-item>
                  <el-form-item label="所属部门：">
                    北京市交通运输局
                  </el-form-item>
                  <el-form-item label="上次登录：">
                    2019.04.17 07:06:45
                  </el-form-item>
                </el-form>
              </div>
              <div class="info_btm">
                <li>
                  <img src="../../../static/images/img/personInfo/set.png" alt="">信息链接
                </li>
                <li ><img src="../../../static/images/img/personInfo/edit.png" alt="">意见反馈</li>
                <li @click="handleCommand('b')" style="margin-right:0 !important"><img src="../../../static/images/img/personInfo/unlogin.png" alt="">退出登录</li>
              </div>
              <span slot="reference">
                <img src="../../../static/images/img/personInfo/head.svg" alt="">
                {{userInfo.username}}
                <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
              </span>

            </el-popover>
          </div>
          <div><i class="iconfont law-message"></i></div>
          <div><i class="iconfont law-home"></i></div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <subLeftMenu :selectedHeadMenu="selectedHeadMenu"></subLeftMenu>
        </el-aside>
        <el-container>
          <el-header id="tabsHeader" style="height:33px">
            <tabsMenu></tabsMenu>
          </el-header>
          <el-main>
            <mainContent></mainContent>
          </el-main>
        </el-container>

      </el-container>
    </el-container>

  </div>
</template>
<script>
import Cookies from "@/common/js/cookies";
import iLocalStroage from "@/common/js/localStroage";
import headMenu from "@/components/headMenu";
import subLeftMenu from "@/components/subLeftMenu";
import tabsMenu from "@/components/tabsMenu";
import mainContent from "@/components/mainContent";
export default {
  name: "mainLagout",
  data() {
    return {
      // newRoute: [Cookies.get("menu")],
      // openKeys: ["sub1"],
      // collapsed: false,
      // avatar: Cookies.get("avatar")
      userInfo: iLocalStroage.gets('userInfo'),
      selectedHeadMenu: 'case_handle_home_index'   //接收headMenu传来的选中的一级菜单
    };
  },
  components: {
    headMenu,
    subLeftMenu,
    tabsMenu,
    mainContent
  },
  computed: {
    // curreyRouterName() {
    //   return this.$route.name;
    // }
  },
  inject: ["reload"],
  methods: {
    //下拉框命令
    handleCommand(command) {
      if (command == 'a') {
        this.goToUser();
      } else if (command == 'b') {
        this.loginOut();
      }
    },
    //退出
    loginOut() {
      Cookies.remove("TokenKey");
      iLocalStroage.removeAll();
      // this.$store.state.openTab = [];
      this.$store.dispatch('deleteAllTabs');
      this.$router.push("/");
    },
    //个人设置  待完善
    goToUser() {
      Cookies.set("menu", "personInfor");
      this.reload(); //reload 可以去掉导航菜单选中状态的class
      this.$router.push({ name: "personInfor" });
    },

    getSelectHeadMenu(name) {
        debugger;
      this.selectedHeadMenu = name;
    }

  },
  watch: {
    $router(a, b) {
      console.log(a, b)
    }
  },
  mounted() {
    console.log(this.userInfo)
  }
};
</script>
<style lang="scss">
@import "@/assets/css/main.scss";
.info_top {
  background: url("../../../static/images/img/personInfo/bg.png") no-repeat;
}
</style>


