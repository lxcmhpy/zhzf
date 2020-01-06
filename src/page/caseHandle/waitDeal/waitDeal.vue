<template>
  <div class="searchAndpageBox" id="waitDealBox">
    <div class="handlePart">
      <!-- <el-button type="primary" size="medium" icon="el-icon-plus" @click="goFlowChart('2c902ae66ae2acc4016ae376f6f1007f')">流程图</el-button> -->
        <!-- <el-button type="primary" size="medium" icon="el-icon-plus" @click="caseRecord">立案登记</el-button> -->
    </div>
    <div class="tablePart">
      <el-table :data="tableData" stripe style="width: 100%" height="100%" highlight-current-row @current-change="clickCase">
        <el-table-column prop="caseNumber" label="案号" align="center"></el-table-column>
        <el-table-column prop="name" label="当事人/单位" align="center"></el-table-column>
        <el-table-column prop="caseCauseName" label="违法行为" align="center"></el-table-column>
        <el-table-column prop="acceptTime" label="受案时间" align="center"></el-table-column>
        <el-table-column prop="currentLinkName" label="当前环节" align="center"></el-table-column>
        <el-table-column prop="caseStatus" label="案件状态" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import iLocalStroage from "@/js/localStroage";
import { mixinGetCaseApiList } from "@/js/mixins";

export default {
  data() {
    return {
      tableData:[],
    };
  },
  mixins:[mixinGetCaseApiList],

  methods: {
      caseRecord(){

      },
      goFlowChart(id) {
        this.$router.push({
          name: "flowChart",
          params: {
            id: id
          }
        })
      },
    //获取机构下数据
    getCaseList2() {
      let data = {
        flag: 0,
        userId: iLocalStroage.gets("userInfo").id,
        current: this.currentPage,
        size: this.pageSize,
      };
      this.getCaseList(data);
    },
    clickCase(row){
      console.log(row)
      this.$router.replace({
        name: 'caseInfo',
        params: {
          caseInfo: row
        }
      });
      // let data={
      //   caseBasicInfoId:row.id
      // }
      // this.$store.dispatch("getNextLink", data).then(
      //   res => {
      //     console.log(res);
    
      //   },
      //   err => {
      //     console.log(err);
      //   }
      // );
    }
  },
  created() {
    this.getCaseList2();
  }
};
</script>
