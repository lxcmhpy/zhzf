<template>
  <div>
    <div>
      <div style="margin-top:20px;margin-bottom:20px;">
        <font style="font-size:42px;">考试信息</font> &nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="primary"  round style="font-size:22px;">新增</el-button>
      </div>
      <!--<el-row>
        <el-button type="primary" icon="el-icon-plus"  size="mini" round>新增</el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" round>删除</el-button>
      </el-row>-->
      <el-table
        :data="tableData"
        resizable 
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="date" label="考试类型"></el-table-column>
        <el-table-column prop="name" label="考试时间"></el-table-column>
        <el-table-column prop="address" label="考试成绩"></el-table-column>
        <el-table-column prop="address" label="通过状态"></el-table-column>
        <el-table-column prop="address" label="备注"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
    export default {
      name: "exam",//考试信息
      data(){
        return {
          currentPage: 1, //当前页
          pageSize: 10,   //pagesize
          totalPage: 0,   //总页数
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
        },
        //更改每页显示的条数
          handleSizeChange(val) {
              this.pageSize = val;
              //this.getPersonList();
          },
          //更换页码
          handleCurrentChange(val) {
              this.currentPage = val;
              //this.getPersonList();
          },
      }
    }
</script>

<style lang="scss">
  @import "@/assets/css/personManage.scss";
</style>
