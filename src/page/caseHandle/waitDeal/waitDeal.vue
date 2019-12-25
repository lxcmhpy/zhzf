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
export default {
  data() {
    return {
      tableData:[],
    };
  },
  methods: {
      caseRecord(){
          
      }
  }
};
</script>