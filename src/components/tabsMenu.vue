<template>
  <div>
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
export default {
  name: "",
  data() {
    return {
        activeIndexStr: ''
    };
  },
  methods: {
  },
  computed: {
  },
  methods: {
    //tab标签点击时，切换相应的路由
    tabClick(tab) {
        this.activeIndexStr = tab.name;
        this.$store.commit("SET_ACTIVE_INDEX_STO", tab.name);
        this.$router.push({ name: tab.name});
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
          this.$router.push({ name: this.activeIndexSto });
        } else {
          this.$router.push({ path: "/" });
        }
      }
    }
  },
  mounted() {
    // 刷新时以当前路由做为tab加入tabs
    // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
    // 当当前路由是首页时，添加首页到store，并设置激活状态
    // this.activeIndexStr = this.activeIndexSto;
    if (this.$route.path !== "/" && this.$route.name !== "case_handle_home_index") {
        this.activeIndexStr = this.$route.name;
        this.$store.commit("SET_ACTIVE_INDEX_STO", this.$route.name);
    } else {
        this.$store.commit("SET_ACTIVE_INDEX_STO", "case_handle_home_index");
    }
  },
  watch: {
    $route(to, from) {
      //判断路由是否已经打开
      //已经打开的 ，将其置为active
      //未打开的，将其放入队列里
      let flag = false;
      for (let i = 0; i < this.openTab.length; i++) {
        //下一个路由已经在tab中，是案件的话替换tab title
        if ( (to.name == this.openTab[i].name) || (to.meta.oneTab && this.openTab[i].isCase)) {
        //   this.$store.dispatch("setActiveIndex", this.openTab[i].name); //设置active tab
        this.$store.commit("SET_ACTIVE_INDEX_STO",this.openTab[i].name);
          if (this.openTab[i].isCase) {
            let changeTabData = {
              tabIndex: i,
              title: this.caseHandle.caseNumber
            };
            this.$store.commit("changeOneTabName", changeTabData);
          }
          flag = true;
          break;
        }
        //下一个路由不在tab中，但是它们使用同一个tab
        // if (to.meta.oneTab && this.openTab[i].isCase) {
        //   console.log("同一个案件tab");
        //   this.$store.dispatch("setActiveIndex", this.openTab[i].name); //设置active tab
        //   let changeTabData = {
        //     tabIndex: i,
        //     title: this.$store.state.caseNumber
        //   };
        //   this.$store.commit("changeOneTabName", changeTabData);
        //   flag = true;
        //   break;
        // }
      }

      // for (let item of this.openTab) {
      //   if (item.name === to.name) {
      //     this.$store.dispatch("setActiveIndex", to.name);   //设置active tab

      //     flag = true;
      //     break;
      //   }
      // }
      if (!flag) {
        let tabTitle = "";
        let isCase = false;
        if (
          this.caseHandle.caseNumber &&
          this.caseHandle.caseNumber != "案件"
        ) {
          tabTitle = this.caseHandle.caseNumber;
          isCase = true;
        } else {
          tabTitle = this.$route.meta.title;
          isCase = false;
        }
        this.$store.dispatch("addTabs", {
          route: to.path,
          name: to.name,
          title: tabTitle,
          isCase: isCase
        });
        // this.$store.dispatch("setActiveIndex", to.name);
        this.$store.commit("SET_ACTIVE_INDEX_STO",to.name);
      }
    },
    activeIndexSto(val,oldVal) {
        this.activeIndexStr = val;
    }
  },
  computed: {
        ...mapGetters(["caseHandle", "openTab", "activeIndexSto"])
  }
};
</script>
