<template>
  <div>
    <div>
      <div style="margin-top:35px;margin-bottom:20px;margin-left:25px;">
        <font style="font-size:25px;"><span class="titleflag"></span>考试信息</font> 
        <el-button type="primary"  round style="margin-right:25px;float:right;" icon="el-icon-plus" size="medium">新增考试</el-button>
      </div>
      <!--<el-row>
        <el-button type="primary" icon="el-icon-plus"  size="mini" round>新增</el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" round>删除</el-button>
      </el-row>-->
      <el-table
        style="margin-left:25px;width:97%;margin-bottom:35px;"
        :data="tableData"
        resizable 
        stripe
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
  .titleflag {
                width      : 4px;
                height     : 22px;
                margin-right: 8px;
                display    : inline-block;
                background : #4573D0;
            }
</style>
