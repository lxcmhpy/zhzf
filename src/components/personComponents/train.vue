<template>
  <div>
    <div>
        <el-row>
          <el-button type="primary" icon="el-icon-plus"  size="mini" round>新增</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" round>删除</el-button>
        </el-row>
        <el-table
          :data="tableData"
          border
          style="width: 100%;height:582px"
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
    <div class="paginationBox">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          background
          :page-sizes="[10, 20, 30, 40, 50]"
          layout="prev, pager, next,sizes,jumper"
          :total="totalPage"
        >
      </el-pagination> 
    </div>
  </div>
</template>

<script>
    export default {
        name: "train.vue",//培训组件
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

<style scoped>
  @import "./../../css/personManage.less";
</style>
