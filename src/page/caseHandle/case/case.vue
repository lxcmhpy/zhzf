<template>
  <div class="case">
    
    <ul>
        <li @click="goDiao">调查文书</li>
        <li @click="goWen">询问文书</li>

    </ul>
  </div>
</template>
<script>
import MainContent from "@/components/mainContent";
import Layout from "@/page/lagout/mainLagout"; //Layout 是架构组件，不在后台返回，在文件里单独引入
export default {
  data() {
    return {};
  },
  methods: {
    goDiao() {
      this.makeRoute('/diao','/diao2','/diao3','diao','diao2','diao3','调查类文书','caseHandle/case/diao.vue');
    },
    goWen(){
      this.makeRoute('/la','/la2','/la3','la','la2','la3','问询','caseHandle/case/wen.vue');
    },
    makeRoute(path1,path2,path3,name1,name2,name3,title,componentName){  //path不可以重复  name也不可以重复
        this.$router.addRoutes([
        {
          path: path1,
          name: name1,
          component: Layout,
          children: [
            {
              path: path2,
              name: name2,
              component: MainContent,
              children: [
                {
                  path: path3,
                  name: name3,
                  meta: {
                    title: title
                  },
                  component: () => import("@/page/"+componentName)
                }
              ]
            }
          ]
        }
      ]);
      this.$router.push({name:name3});
    }
  }
};
</script>
<style lang="less">
.case li{
    cursor: pointer;
    line-height: 30px
}
</style>
