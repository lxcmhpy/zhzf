<template>
  <!-- 左菜单 -->
  <div>
    <el-menu default-active="userManage" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" @select="changeMenu">
      <el-submenu :index="item.name" v-for="(item,index) in currentSlideMenu" :key="index">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{item.title}}</span>
        </template>
        <el-menu-item :index="subItem.name" v-for="(subItem,subIndex) in item.children" :key="subIndex">{{subItem.title}}</el-menu-item>
      </el-submenu>
    </el-menu>

  </div>
</template>
<script>
import Cookies from "@/js/cookies";
import iLocalStroage from "@/js/localStroage";
export default {
  name: "backSubmenu",
  data() {
    return {
      allMenuList: iLocalStroage.gets('menu'),
      currentSlideMenu: [],
      isCollapse: false,


      newRoute: [Cookies.get("menu")],
      collapsedNow: false,
      rootSubmenuKeys: ["identityCheck", "faceRes", "documentExtraction"],
      openKeys: [Cookies.get("openMenu")], //点击打开的父亲菜单
      defaultOpenKeys: [Cookies.get("openMenu")] //父菜单的key  刷新和收缩时使用 来保存之前打开的父菜单
    };
  },
  props: {
    //collapsed: Boolean,
    selectedHeadMenu: String
  },
  computed: {
    activeSlideMenu() {
      console.log('activeSlide', this.$store.state.activeSlideMenu)
      return this.$store.state.activeSlideMenu;
    }
  },
  methods: {
    //切换菜单
    changeMenu(key, keyPath) {
      console.log(key, keyPath)
      this.$router.push({ name: key });

      // Cookies.set("menu", item.key);
      // console.log(this.openKeys);
      // if (this.openKeys[0]) {
      //   //没有子菜单的 没有openKey
      //   Cookies.set("openMenu", this.openKeys[0]); //刷新 自动打开当前submenu
      //   this.defaultOpenKeys = this.openKeys;
      // }
    },
    //展开菜单
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    //收起菜单
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // toggleCollapsed() {
    //   console.log(this.collapsedNow);
    //   this.collapsedNow = !this.collapsedNow;
    //   if (this.collapsedNow) {
    //     //收缩时关闭打开的submenu
    //     this.openKeys = [];
    //   } else {
    //     //打开时 打开当前的submenu
    //     this.openKeys[0] = this.defaultOpenKeys[0];
    //   }
    // },
    // onOpenChange(openKeys) {
    //   const latestOpenKey = openKeys.find(
    //     key => this.openKeys.indexOf(key) === -1
    //   );
    //   if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    //     this.openKeys = openKeys;
    //   } else {
    //     this.openKeys = latestOpenKey ? [latestOpenKey] : [];
    //   }
    // },

    //获取侧边栏菜单
    getSlideMenu(val) {
      console.log(val);
      this.currentSlideMenu = [];
      this.allMenuList.forEach(item => {
        if (item.name == val) {
          if (item.children && item.children.length) {
            item.children.forEach(item2 => {
              this.currentSlideMenu.push(item2);
            })
          }
        }
      });
      console.log('this.currentSlideMenu', this.currentSlideMenu);
      //默认打开侧边栏第一个子菜单
      // if(this.currentSlideMenu[0].children && this.currentSlideMenu[0].children.length){
      //   let newRoute = this.currentSlideMenu[0].children[0].name;
      //   this.$router.push({ name: newRoute });
      // }
    }
  },
  mounted() {
    // this.collapsedNow = this.collapsed;
    console.log('selectedHeadMenu', this.selectedHeadMenu);
    console.log('global.antRouter', global.antRouter);
    console.log('当前route', this.$route.name);
  },
  created() {
    console.log(this.newRoute);
    this.getSlideMenu(this.selectedHeadMenu); //默认加载案件办理的二级菜单
  },
  watch: {
    selectedHeadMenu: function (val, oldVal) {
      console.log(val, oldVal);
      this.getSlideMenu(val);
    },
    // '$route'(to,from){
    //   this.$store.dispatch("setActiveSlide", to.name);
    // }
  }
};
</script>
<style lang="less">
@import "../css/main.less";
</style>
