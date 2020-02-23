<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column prop="date" label="年审年份"></el-table-column>
    <el-table-column prop="name" label="年审日期"></el-table-column>
    <el-table-column prop="address" label="年审成绩"></el-table-column>
    <el-table-column prop="address" label="备注"></el-table-column>
  </el-table>
</template>

<script>
    export default {
        name: "annualReview",//年审记录
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
  @import "@/assets/css/personManage.scss";
</style>
