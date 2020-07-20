<template>
  <div class="tbs">
    <el-tabs
      v-model="activeIndexStr"
      type="border-card"
      closable
      v-if="openTab.length"
      @tab-click="tabClick"
      @tab-remove="tabRemove"
    >
      <el-tab-pane :key="`${item.name+'#'+index}`" v-for="(item,index) in openTab" :label="item.title" :name="`${item.name+'#'+index}`"></el-tab-pane>

    </el-tabs>

  </div>
</template>
<script>
import { mapGetters } from "vuex";
import _ from "lodash";
export default {
  name: "",
  data() {
    return {
        activeIndexStr: '',
        openTabList: [],
        tabsNameList: {
            law_supervise_: '',
            // case_handle_: '【案件】',
            case_handle_: '',
            law_center_: '【超限】'
        }
    };
  },
  methods: {
  },
  computed: {
  },
  methods: {
    //tab标签点击时，切换相应的路由
    tabClick(tab) {
        let route = this.openTab[tab.index];
        console.log('route',route);
        let name = route.isCase ? route.name.split('-and-')[0] :route.name;
        // debugger;
        route.menuUrl = name;
        this.activeIndexStr = route.name +'#'+ tab.index;
        //cxx 点击系统管理菜单后再回到案件tab，需设置一下caseNumber
        if(!this.caseHandle.caseNumber){
          this.$store.commit("setCaseNumber",route.params && route.params.tabTitle || route.title);
        }

        this.$store.commit("SET_ACTIVE_INDEX_STO",  this.activeIndexStr);
        this.$store.commit("set_Head_Active_Nav", route.headActiveNav);
        //切换可视化监管不刷新
        /* if(this.$route.name.indexOf('law_supervise_lawSupervise') > -1){
          this.$route.meta.keepAlive = true;
        } */
        this.$router.push(({ name: 'reloadPage',params: route}));


    },
    //移除tab标签
    tabRemove(targetName) {
      //首页不删
      let routerName = sessionStorage.getItem('HOME_PAGE_ROUTER_NAME');
      if (targetName == routerName) {
        return;
      }
      //关闭可视化监管，重新打开需要刷新
      /* if(targetName.indexOf('law_supervise_lawSupervise') > -1 && this.$route.meta.keepAlive){
        this.$route.meta.keepAlive = false;
      } */
      this.$store.dispatch("deleteTabs", targetName);
      if (this.activeIndexSto === targetName) {
        // 设置当前激活的路由
        if (this.openTab && this.openTab.length >= 1) {
            let lastIndex = this.openTab.length - 1;
            this.$store.commit("SET_ACTIVE_INDEX_STO", this.openTab[lastIndex].name + '#' + lastIndex);
            let route = this.openTab[lastIndex];
            route.menuUrl = this.openTab[lastIndex].name;
            this.$router.push(({ name: 'reloadPage',params: route}));
        } else {

            this.$router.push({ name: routerName });
        }
      } else {
        debugger;
        let targetNameIndex = targetName.split('#')[1];
        let activeArray = this.activeIndexSto.split('#');
        this.$store.commit("SET_ACTIVE_INDEX_STO", targetNameIndex > activeArray[1] ? this.activeIndexSto : activeArray[0]+'#'+(parseInt(activeArray[1])-1));
      }
    },
    init () {
        let routerName = sessionStorage.getItem('HOME_PAGE_ROUTER_NAME');
        if (this.$route.path !== "/" && this.$route.name !== routerName) {
            this.activeIndexStr = this.activeIndexSto;
        } else {
            this.$store.commit("SET_ACTIVE_INDEX_STO", routerName);
            this.$store.commit("set_Head_Active_Nav", routerName);
        }
    }
  },
  mounted() {
    // 刷新时以当前路由做为tab加入tabs
    // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
    // 当当前路由是首页时，添加首页到store，并设置激活状态
    this.init();

  },
  watch: {
    $route(to, from) {
      //判断路由是否已经打开
      //已经打开的 ，将其置为active
      //未打开的，将其放入队列里
        let flag = false;
        let _this = this;
        let _index = _.findIndex(this.openTab,(chr) => {
            //信息查验不走if
            if (chr.isCase && !to.meta.isNotCase) {
              return chr.title == _this.caseHandle.caseNumber;
            }
            return chr.name === to.name;
        });

        if (_index > -1) {
            if (to.params.tabTitle) {
                let currentOpenTab = this.openTab[_index];
                currentOpenTab.params = to.params;
                // currentOpenTab.title = this.getTabName(to.name) + currentOpenTab.params.tabTitle;
                currentOpenTab.title = currentOpenTab.params.tabTitle;
                currentOpenTab.route = currentOpenTab.path;
                currentOpenTab.name = to.name;

                let data = {
                    index: _index,
                    num: 1,
                    data: currentOpenTab
                }

                this.$store.dispatch("replaceTabs", data);
            }else{
              if(to.meta.isNotCase){

                  // tabTitle = this.$route.meta.title;
                   let currentOpenTab = this.openTab[_index];
                    currentOpenTab.params = to.params;
                    currentOpenTab.title = this.$route.meta.title;
                    currentOpenTab.route = currentOpenTab.path;
                  let data = {
                    index: _index,
                    num: 1,
                    data: currentOpenTab
                  }

                  this.$store.dispatch("replaceTabs", data);
              }
            }
            this.$store.commit("set_Head_Active_Nav", this.openTab[_index].headActiveNav);
            this.$store.commit("SET_ACTIVE_INDEX_STO",this.openTab[_index].name + '#' + _index);
        } else {
            let tabTitle = "";
            let isCase = false;
            let name = '';
            // debugger;
            if (to.name.indexOf('case_handle_') > -1 && this.caseHandle.caseNumber &&this.caseHandle.caseNumber != "案件") {
                //信息查验需要直接显示title
                if(to.meta.isNotCase){
                    tabTitle = this.$route.meta.title;
                }else{
                  tabTitle = this.caseHandle.caseNumber;
                  isCase = true;
                }

            } else {
                if (this.$route.params.tabTitle) {
                    tabTitle = this.$route.params.tabTitle;
                } else {
                    tabTitle = this.$route.meta.title;
                }
                isCase = false;
            }
            name = name? name : to.name;
            this.$store.commit("SET_ACTIVE_INDEX_STO", name+'#'+this.openTab.length);

            this.$store.dispatch("addTabs", {
                route: to.path,
                name: name,
                title: tabTitle,
                isCase: isCase,
                params: to.params,
                headActiveNav: this.headActiveNav
            });

        }
    },
    activeIndexSto(val,oldVal) {
        this.activeIndexStr = val;
    },
    openTab (val, oldVal) {
        return val
    }
  },
  computed: {
        ...mapGetters(["caseHandle", "openTab", "activeIndexSto", "headActiveNav"])
  }
};
</script>
<style scoped>
.tbs /deep/ .el-tabs__nav-wrap{
padding: 0 290px 0 20px;
}
.tbs /deep/ .el-tabs__nav-next {
    right: 260px;
}
</style>
