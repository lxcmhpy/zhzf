<template>
  <div>
    <el-tabs
      v-model="activeIndex"
      type="border-card"
      closable
      v-if="openTab.length"
      @tab-click="tabClick"
      @tab-remove="tabRemove"
    >
      <el-tab-pane
        :key="item.name"
        v-for="item in openTab"
        :label="item.title"
        :name="item.name"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {};
  },
  computed: {
    openTab () {
      console.log('openTab',this.$store.state.openTab)
      return this.$store.state.openTab;
    },
    activeIndex:{
      get () {
        return this.$store.state.activeIndex;
      },
      set (val) {
        this.$store.dispatch("setActiveIndex", val);
      }
    }
  },
  methods: {
    //tab标签点击时，切换相应的路由
    tabClick(tab) {
      console.log("tab", tab);
      console.log("active", this.activeIndex);
      //this.$router.push({ path: this.activeIndex });
      this.$router.push({ name: this.activeIndex });
    },
    //移除tab标签
    tabRemove(targetName) {
      console.log("tabRemove", targetName);
      //首页不删
      if(targetName == 'caseHandle'){
        return
      }
      this.$store.dispatch('deleteTabs', targetName);
      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        if (this.openTab && this.openTab.length >= 1) {
          console.log('=============',this.openTab[this.openTab.length-1].name)
          //this.$store.commit('set_active_index', this.openTab[this.openTab.length-1].route);
         // console.log(this.activeIndex)
          this.$store.dispatch('setActiveIndex', this.openTab[this.openTab.length-1].name);
          this.$router.push({name: this.activeIndex});
          console.log(this.activeIndex)
        } else {
          this.$router.push({path: '/'});
        }
      }
    }
  },
  mounted () {
    // 刷新时以当前路由做为tab加入tabs
    // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
    // 当当前路由是首页时，添加首页到store，并设置激活状态
    if (this.$route.path !== '/' && this.$route.name !== 'caseHandle') {
      console.log('添加其他tab')
       this.$store.dispatch('addTabs', {route: '/caseHandle', name: 'caseHandle',title:'案件办理首页'});
       this.$store.dispatch('addTabs', {route: this.$route.path , name: this.$route.name,title:this.$route.meta.title });
      this.$store.dispatch('setActiveIndex', this.$route.name);
    } else {
      console.log('添加caseHandle tab')
      this.$store.dispatch('addTabs', {route: '/caseHandle', name: 'caseHandle',title:'案件办理首页'});
      this.$store.dispatch('setActiveIndex', 'caseHandle');
      //this.$router.push('/');
    }

  },
  watch:{
    '$route'(to,from){
        //判断路由是否已经打开
        //已经打开的 ，将其置为active
        //未打开的，将其放入队列里
        console.log(to);
        let flag = false;
        for(let item of this.openTab){
          if(item.name === to.name){
            //this.$store.dispatch("setActiveIndex", to.path);
            this.$store.dispatch("setActiveIndex", to.name);

            flag = true;
            break;
          }
        }

        if(!flag){
          console.log('to.path',to.path);
           this.$store.dispatch("addTabs", {route: to.path, name: to.name,title:this.$route.meta.title});
           //this.$store.dispatch("setActiveIndex", to.path);
          this.$store.dispatch("setActiveIndex", to.name);
        }

    }
  }
}
</script>  