<template>
<div class="com_searchAndpageBoxPadding">
  <div class="searchAndpageBox" id="dictBox">
    <div class="handlePart">
      <div class="search">
        <el-form :inline="true">
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-plus" @click="addCaseNumber">添加机构案件号</el-button>
            </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tablePart">
      <el-table :data="tableData" stripe style="width: 100%" height="100%">
        <el-table-column prop="organName" label="机构名称" align="center"></el-table-column>
        <el-table-column prop="caseWord" label="案件字" align="center"></el-table-column>
        <el-table-column prop="digit" label="案件顺序位数" align="center"></el-table-column>
        <el-table-column prop="onlineNumberStart" label="案件顺序号起始号" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="editCaseNumber(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteCaseNumber(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paginationBox">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          background
          :page-sizes="[10, 20, 30, 40]"
          layout="prev, pager, next,sizes,jumper"
          :total="totalPage"
        ></el-pagination>
    </div>
    <addCaseNumber ref="addCaseNumber"></addCaseNumber>
  </div>
</div>
</template>
<script>
import addCaseNumber from "./addCaseNumber";
import {getCaseNumberApi,deleteCaseNumberApi} from "@/api/system";
export default {
  data() {
    return {
      tableData: [], //表格数据
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
    };
  },
  components: {
    addCaseNumber,
  },
  inject:['reload'],
  methods: {
    //获取案件号列表
    getCaseNumberList() {
      let data = {
        current: this.currentPage,
        size: this.pageSize,
      };
      let _this = this
      getCaseNumberApi(data).then(
        res => {
          _this.tableData = res.data.records;
          _this.totalPage = res.data.total;
        },
        err => {
          console.log(err);
        }
      );
    },
    //添加案件编号配置
    addCaseNumber(){
      let data={
            id:'',
            leng:this.tableData.length
      }
      this.$refs.addCaseNumber.showModal(0, data,'list');
    },
    //编辑案件编号配置
    editCaseNumber(row){
      let data = {
            row:row
      }
      this.$refs.addCaseNumber.showModal(2, data,'list');
    },
    //删除案件编号配置
    deleteCaseNumber(id){
      let _this = this
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
      deleteCaseNumberApi(id).then(
          res => {
            _this.reload();
            _this.$message({
            type: "success",
            message: "删除成功!"
          },
          err => {
            console.log(err);
            }
          );
        });
      })
      .catch(() => {});
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getCaseNumberList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCaseNumberList();
    },
  },
  created() {
    this.getCaseNumberList();
  }
};
</script>

<style lang="scss">
@import "@/assets/css/systemManage.scss";
</style>
