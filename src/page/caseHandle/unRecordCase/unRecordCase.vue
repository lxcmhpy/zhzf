<template>
  <div class="searchAndpageBox" id="waitDealBox">
    <div class="handlePart">
        <el-button type="primary" size="medium" icon="el-icon-plus" @click="caseRecord">立案登记</el-button>
    </div>
    <div class="tablePart">
      <el-table :data="tableData" stripe style="width: 100%" height="100%">
        <el-table-column prop="name" label="案号" align="center"></el-table-column>
        <el-table-column prop="notes" label="当事人/单位" align="center"></el-table-column>
        <el-table-column prop="notes2" label="违法行为" align="center"></el-table-column>
        <el-table-column prop="notes3" label="受案时间" align="center"></el-table-column>
        <el-table-column prop="notes4" label="当前环节" align="center"></el-table-column>
        <el-table-column prop="note5" label="案件状态" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import MainContent from "@/components/mainContent";
import Layout from "@/page/lagout/mainLagout"; //Layout 是架构组件，不在后台返回，在文件里单独引入
export default {
  data() {
    return {
      tableData:[],
    };
  },
  methods: {
      caseRecord(){
        this.makeRoute('/inforCollect','/inforCollect2','/inforCollect3','inforCollect','inforCollect2','inforCollect3','信息采集','caseHandle/unRecordCase/inforCollection.vue');  
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