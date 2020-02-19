<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column prop="date"  label="姓名"></el-table-column>
    <el-table-column prop="name"  label="证件状态"></el-table-column>
    <el-table-column prop="address" label="操作用户"></el-table-column>
    <el-table-column prop="address" label="操作日期"></el-table-column>
    <el-table-column prop="address" label="变化原因"></el-table-column>
  </el-table>
</template>

<script>
    export default {
        name: "certificates",//人员证件信息组件
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
