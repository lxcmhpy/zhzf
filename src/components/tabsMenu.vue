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
      <el-tab-pane :key="item.name" v-for="item in openTab" :label="item.title" :name="item.name"></el-tab-pane>

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
        activeIndexStr: 'case_handle_home_index',
        openTabList: [],
        tabsNameList: {
            law_supervise_: '【监管】',
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
        this.activeIndexStr = route.name;
        console.log('this.activeIndexStr',this.activeIndexStr);
        this.$store.commit("SET_ACTIVE_INDEX_STO",  this.activeIndexStr);
        this.$store.commit("set_Head_Active_Nav", route.headActiveNav);
        this.$router.push(({ name: 'reloadPage',params: route}));


    },
    //移除tab标签
    tabRemove(targetName) {
      //首页不删
      if (targetName == "case_handle_home_index") {
        return;
      }
      this.$store.dispatch("deleteTabs", targetName);
      if (this.activeIndexSto === targetName) {
        // 设置当前激活的路由
        if (this.openTab && this.openTab.length >= 1) {
            this.$store.commit("SET_ACTIVE_INDEX_STO", this.openTab[this.openTab.length - 1].name);
            let route = this.openTab[this.openTab.length - 1];
            route.menuUrl = this.activeIndexSto.indexOf('-and-') > -1 ? this.activeIndexSto.split('-and-')[0] : this.activeIndexSto;
        //   this.$router.push({
        //       name: this.activeIndexSto.indexOf('-and-') > -1 ? this.activeIndexSto.split('-and-')[0] : this.activeIndexSto,
        //         params: this.openTab[this.openTab.length - 1].params
        //     });
            this.$router.push(({ name: 'reloadPage',params: route}));
        } else {
          this.$router.push({ name: "case_handle_home_index" });
        }
      }
    },
    getTabName (code) {
        let tabsCode = '';
        if (code.indexOf('case_handle_') > -1) {
            tabsCode = this.tabsNameList['case_handle_'];
        } else if (code.indexOf('law_supervise_') > -1) {
            tabsCode = this.tabsNameList['law_supervise_'];
        } else if (code.indexOf('law_center_') > -1) {
            tabsCode = this.tabsNameList['law_center_'];
        }
        return tabsCode;
    },
    init () {
        if (this.$route.path !== "/" && this.$route.name !== "case_handle_home_index") {
            this.activeIndexStr = this.activeIndexSto;
        } else {
            this.$store.commit("SET_ACTIVE_INDEX_STO", "case_handle_home_index");
            this.$store.commit("set_Head_Active_Nav", "caseHandle-menu-case_handle_home_index");
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
        // debugger;
      //判断路由是否已经打开
      //已经打开的 ，将其置为active
      //未打开的，将其放入队列里
        let flag = false;
        let _this = this;
        let tabsCode = this.getTabName(to.name);
        let _index = _.findIndex(this.openTab,(chr) => {
            if (chr.isCase) {
                return chr.title == tabsCode + _this.caseHandle.caseNumber;
            }
            return chr.name === to.name;
        });

        if (_index > -1) {
            if (to.params.tabTitle) {
                let currentOpenTab = this.openTab[_index];
                currentOpenTab.params = to.params;
                currentOpenTab.title = this.getTabName(to.name) + currentOpenTab.params.tabTitle;
                currentOpenTab.route = currentOpenTab.path;
                let data = {
                    index: _index,
                    num: 1,
                    data: currentOpenTab
                }
                this.$store.dispatch("replaceTabs", data);
            }
            this.$store.commit("set_Head_Active_Nav", this.openTab[_index].headActiveNav);
            this.$store.commit("SET_ACTIVE_INDEX_STO",this.openTab[_index].name);
            // this.$store.commit("changeOneTabName", this.openTab[_index].name);
        } else {
            let tabTitle = "";
            let isCase = false;
            let name = '';
            if (to.name.indexOf('case_handle_') > -1 && this.caseHandle.caseNumber &&this.caseHandle.caseNumber != "案件") {
                tabTitle = this.caseHandle.caseNumber;
                isCase = true;
                name = to.name + '-and-' + this.caseHandle.caseNumber;
            } else {
                if (this.$route.params.tabTitle) {
                    tabTitle = this.$route.params.tabTitle;
                } else {
                    tabTitle = this.$route.meta.title;
                }
                isCase = false;
            }
            name = name? name : to.name;

            this.$store.dispatch("addTabs", {
                route: to.path,
                name: name,
                title: tabsCode+tabTitle,
                isCase: isCase,
                params: to.params,
                headActiveNav: this.headActiveNav
            });
            this.$store.commit("SET_ACTIVE_INDEX_STO", name);
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
