<template>
  <!-- 左菜单 -->
  <div>
    <el-menu :default-active="$route.name" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" @select="changeMenu">
      <el-submenu :index="item.name" v-for="item in currentSlideMenu" :key="item.id">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{item.title}}</span>
        </template>
        <el-menu-item :index="subItem.name" v-for="subItem in item.children" :key="subItem.id" @click="clicSubmenu">{{subItem.title}}</el-menu-item>
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
    };
  },
  props: {
    selectedHeadMenu: String
  },
  computed: {
  },
  methods: {
    //切换菜单
    changeMenu(key, keyPath) {
      this.$router.push({ name: key });
    },
    //展开菜单
    handleOpen(key, keyPath) {
    },
    //收起菜单
    handleClose(key, keyPath) {
    },
    clicSubmenu(){
      this.$store.commit("setCaseNumber", '');
    },
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
    }
  },
  mounted() {
    // console.log('selectedHeadMenu', this.selectedHeadMenu);
  },
  created() {
    this.getSlideMenu(this.selectedHeadMenu); //默认加载案件办理的二级菜单
  },
  watch: {
    selectedHeadMenu: function (val, oldVal) {
      this.getSlideMenu(val);
    }
  }
};
</script>
<style lang="less">
@import "../css/main.less";
</style>
