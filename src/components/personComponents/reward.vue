<template>
  <div>
    <el-row>
      <el-button type="primary" icon="el-icon-plus"  size="mini" round>新增</el-button>
      <el-button type="danger" icon="el-icon-delete" size="mini" round>删除</el-button>
    </el-row>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="name" label="奖励类型"></el-table-column>
      <el-table-column prop="date" label="奖励日期"></el-table-column>
      <el-table-column prop="address" label="奖励机构"></el-table-column>
      <el-table-column prop="address" label="奖励原因"></el-table-column>
      <el-table-column prop="address" label="操作项"></el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "reward",//奖励组件
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
          }],
          multipleSelection: []
        }
      },
      methods:{
        handleSelectionChange(val) {
          this.multipleSelection = val;
        }
      }
    }
</script>

<style scoped>
  @import "@/assets/css/personManage.scss";
</style>
