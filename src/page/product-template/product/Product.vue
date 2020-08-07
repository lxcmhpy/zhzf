<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" id="roleBox">
      <div class="handlePart">
        <div class="search">
          <el-form :inline="true" :model="dicSearchForm" class>
            <el-form-item label="案件类型名称">
              <el-input v-model="dicSearchForm.typeName" placeholder="输入案件类型名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="getCaseTypes">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-plus" @click="addOrUpdateCaseType">添加</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" height="100%">
          <el-table-column prop="typeName" label="案件类型名称" align="center"></el-table-column>
          <el-table-column prop="bindProcessName" label="所属流程名称" align="center"></el-table-column>
          <el-table-column prop="programType" label="程序类型" align="center">
            <span slot-scope="scope">
              <span>{{scope.row.programType == 0 ? '一般程序': '简易程序'}}</span>
            </span>
          </el-table-column>
          <el-table-column prop="status" label="状态" align="center">
            <span slot-scope="scope">
              <span>{{scope.row.status == 0 ? '启用': '禁用'}}</span>
            </span>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="editCaseType(scope.row)" type="text">编辑</el-button>
              <el-button type="text" @click="deleteCaseType(scope.row.id)">删除</el-button>
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
      <addOrUpdateCaseType ref="addOrUpdateCaseTypeRef"></addOrUpdateCaseType>
    </div>
  </div>
</template>
<script>
import addOrUpdateCaseType from "./addOrUpdateCaseType";
export default {
  data() {
    return {
      tableData: [], //表格数据
      dicSearchForm: {
        typeName: ""
      },
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      
    };
  },
  components: {
    addOrUpdateCaseType
  },
  inject: ["reload"],
  methods: {
    //编辑案件类型
    editCaseType(row) {
      this.$refs.addOrUpdateCaseTypeRef.showModal(2, row);
    },
    //删除案件类型
    deleteCaseType(id) {
      this.$confirm("确认删除该案件类型?", "提示",{
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
              this.$store.dispatch("deleteCaseType", id).then(
                res => {
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                  this.reload();
                },
                err => {
                  console.log(err);
                }
              );
            })
            .catch(() => {});
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getCaseTypes();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCaseTypes();
    },
    //获取角色
    getCaseTypes() {
      let data = {
        current: this.currentPage,
        size: this.pageSize,
        typeName: this.dicSearchForm.typeName
      };
      let _this = this;
      this.$store.dispatch("getCaseTypes", data).then(
        res => {
          console.log("案件类型列表", res);
          _this.tableData = res.data.records;
          _this.totalPage = res.data.total;
        },
        err => {
          console.log(err);
        }
      );
    },
    //添加或修改案件类型
    addOrUpdateCaseType() {
      this.$refs.addOrUpdateCaseTypeRef.showModal(0, "");
    },
  },
  created() {
    this.getCaseTypes();
  }
};
</script>

// <style lang="scss">
// @import "@/assets/css/systemManage.scss";
// </style>
