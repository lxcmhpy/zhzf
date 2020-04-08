<template>
  <!-- 左菜单 -->
  <div>
    <el-menu :default-active="$route.name" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" @select="changeMenu">
      <template v-for="item in currentSlideMenu">
        <el-submenu :index="item.name" :key="item.id" v-if="item.children.length!=0">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <el-menu-item :index="subItem.name" v-for="subItem in item.children" :key="subItem.id" @click="clicSubmenu">{{subItem.title}}</el-menu-item>
        </el-submenu>
        <el-menu-item :index="item.name" :key="item.id" v-if="item.children.length==0">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.title}}</span>
          </template>
        </el-menu-item>

      </template>
    </el-menu>

  </div>
</template>
<script>
import Cookies from "@/common/js/cookies";
import iLocalStroage from "@/common/js/localStroage";
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
        debugger;
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
//      console.log(val);
      this.currentSlideMenu = [];
      let _this = this
      this.allMenuList.forEach(item => {
        if (item.name == val) {
          if (item.children && item.children.length) {
            item.children.forEach(item2 => {
              _this.currentSlideMenu.push(item2);
            })
          }
        }
      });
//      console.log('currentSlideMenu',this.currentSlideMenu)
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
<style lang="scss">
@import "@/assets/css/main.scss";
</style>
