<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column prop="date" label="转出单位"></el-table-column>
    <el-table-column prop="name" label="转出时间"></el-table-column>
    <el-table-column prop="address" label="转出执法门类"></el-table-column>
    <el-table-column prop="address" label="执法证号"></el-table-column>
    <el-table-column prop="address" label="转入单位"></el-table-column>
    <el-table-column prop="address" label="转入时间"></el-table-column>
    <el-table-column prop="address" label="转入执法门类"></el-table-column>
    <el-table-column prop="address" label="调岗状态"></el-table-column>
    <el-table-column prop="address" label="操作人"></el-table-column>
    <el-table-column prop="address" label="操作时间"></el-table-column>
  </el-table>
</template>

<script>
    export default {
        name: "adjustingPosts",//调岗组件
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
