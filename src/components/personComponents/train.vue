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
      <el-table-column prop="name" label="培训类型"></el-table-column>
      <el-table-column prop="date" label="开始时间"></el-table-column>
      <el-table-column prop="address" label="结束时间"></el-table-column>
      <el-table-column prop="address" label="培训结果"></el-table-column>
      <el-table-column prop="address" label="培训名称"></el-table-column>
      <el-table-column prop="address" label="培训机构"></el-table-column>
      <el-table-column prop="address" label="证书名称"></el-table-column>
      <el-table-column prop="address" label="证书编号"></el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "train.vue",//培训组件
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
