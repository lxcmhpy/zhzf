<template>
  <el-table
    :data="tableData"
    align="center"
    style="width: 100%;">
    <el-table-column prop="name" label="审批单位" width="180"></el-table-column>
    <el-table-column prop="address" label="审批状态" width="180"></el-table-column>
    <el-table-column prop="address" label="审批人"></el-table-column>
    <el-table-column prop="address" label="审批信息"></el-table-column>
    <el-table-column prop="date" label="操作审批时间"></el-table-column>
  </el-table>
</template>

<script>
    export default {
      name: "approvalRecord",//审批记录
      data(){
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }]
        }
      }
    }
</script>

<style scoped>
  @import "./../../css/personManage.less";
</style>
