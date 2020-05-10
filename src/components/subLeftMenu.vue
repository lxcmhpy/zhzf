<template>
  <!-- 左菜单 -->
  <div>
    <el-menu :default-active="$route.name" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
             :collapse="isCollapse" @select="changeMenu">
      <template v-for="item in currentSlideMenu">
        <el-submenu :index="item.name" :key="item.id" v-if="item.children.length!=0">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <el-menu-item :index="subItem.name" v-for="subItem in item.children" :key="subItem.id" @click="clicSubmenu">
            {{subItem.title}}
          </el-menu-item>
        </el-submenu>
        <el-menu-item :index="item.name" :key="item.id" v-if="item.children.length==0" >
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
import { mapGetters } from "vuex";
  export default {
    name: "backSubmenu",
    data() {
      return {
        allMenuList: null,
        currentSlideMenu: [],
        isCollapse: false,
      };
    },
    props: {
      selectedHeadMenu: String
    },
    methods: {
      //切换菜单
      changeMenu(key, keyPath) {
        //   debugger;
        this.$store.commit('SET_ACTIVE_INDEX_STO', key);
        this.$router.push({name: key});
      },
      //展开菜单
      handleOpen(key, keyPath) {
      },
      //收起菜单
      handleClose(key, keyPath) {
      },
      clicSubmenu() {
        this.$store.commit("setCaseNumber", '');
      },
      //获取侧边栏菜单
      getSlideMenu(val) {
//      console.log(val);
// debugger;
        this.currentSlideMenu = [];
        let _this = this
        for(let i =0;i<this.allMenuList.length;i++) {
            let item = this.allMenuList[i];
            let key = val.split(/(-menu-)/gi);
            if (item.name == key[0]) {
                if (item.children && item.children.length) {
                    item.children.forEach(item2 => {
                    _this.currentSlideMenu.push(item2);
                })
                }
            }
        }
//      console.log('currentSlideMenu',this.currentSlideMenu)
      }
    },
    mounted() {
        this.allMenuList=this.menu;
        this.getSlideMenu(this.headActiveNav); //默认加载案件办理的二级菜单
    },
    created() {
    },
    computed: {
        ...mapGetters(['menu', 'activeIndexSto', 'headActiveNav'])
    },
    watch: {
      selectedHeadMenu: function (val, oldVal) {
        this.getSlideMenu(val);
      },
      //监听menu
      menu(val){
        this.allMenuList=this.menu;
        this.getSlideMenu(this.headActiveNav); //默认加载案件办理的二级菜单
      }
    }
  };
</script>
<style lang="scss">
  @import "@/assets/css/main.scss";
</style>
