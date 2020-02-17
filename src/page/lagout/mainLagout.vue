<template>
  <div class="fullscreen">
    <el-container id="fullscreenCon">
      <el-header id="mainHeader">
        <div class="main_logo"><img src='../../../src/assets/image/main/logo.png' alt=""><span>全国交通运输执法管理系统</span></div>
        <div class="headMenu"><headMenu @selectHeadMenu="getSelectHeadMenu"></headMenu></div>
        <div class="headerRight">
          <div>
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">个人设置</el-dropdown-item>
                  <el-dropdown-item command="b">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
          </div>
          <div ><i class="iconfont law-message"></i></div>
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
import Cookies from "@/js/cookies";
import iLocalStroage from "@/js/localStroage";
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
      userInfo:  iLocalStroage.gets('userInfo'),
      selectedHeadMenu:'xboot'   //接收headMenu传来的选中的一级菜单
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
    handleCommand(command){
      if(command == 'a'){
        this.goToUser();
      }else if(command == 'b'){
        this.loginOut();
      }
    },
    //退出
    loginOut() {
      Cookies.remove("TokenKey");
      iLocalStroage.removeAll();
      // this.$store.state.openTab = [];
      this.$router.push("/");
    },
    //个人设置  待完善
    goToUser() {
      Cookies.set("menu", "personInfor");
      this.reload(); //reload 可以去掉导航菜单选中状态的class
      this.$router.push({ name: "personInfor" });
    },

    getSelectHeadMenu(name){
      this.selectedHeadMenu = name;
    }

  },
  watch:{
    $router(a,b){
      console.log(a,b)
    }
  },
  mounted () {
    console.log(this.userInfo)
  }
};
</script>
<style lang="less">
@import "../../css/main.less";
</style>

