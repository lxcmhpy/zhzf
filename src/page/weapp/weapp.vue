<template>
    <div>weapp
        <el-button type="primary" @click="btnAddTab">添加tab</el-button>
    </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      btnAddTab(){

        let hasTab = false;
        this.$store.state.openTab.forEach(item=>{
          if(item.name=='xiangqing'){
            hasTab = true;
            return;
          }
        })
        if(!hasTab){
          this.$store.dispatch("addTabs", {route: '', name: 'xiangqing',title:'详情'});
        }
        // this.$store.dispatch("setActiveIndex", 'xiangqing');
          this.$store.commit('SET_ACTIVE_INDEX', 'xiangqing');
      }

    }
  }
</script>
