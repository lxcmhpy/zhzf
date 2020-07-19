<template>
  <div class="searchAndpageBox" id="roleBox">
    <div class="handlePart">
      <div class="search">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="流程名称">
            <el-input v-model="searchForm.flowName" placeholder="请输入流程名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" icon="el-icon-search" @click="getFlowList">查询</el-button>
            <el-button type="primary" size="medium" icon="el-icon-plus" @click="addFlow">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tablePart">
      <el-table :data="tableData" stripe style="width: 100%" height="100%">
        <el-table-column type="index" width="60" align="center">
          <template slot="header">序号</template>
        </el-table-column>
        <el-table-column prop="flowName" label="流程名称" align="center"></el-table-column>
        <el-table-column prop="flowUrl" label="流程类型" align="center"></el-table-column>
        <el-table-column prop="basicInfoPage" label="基本信息页面" align="center"></el-table-column>
        <el-table-column prop="flowStatus" label="流程状态" align="center">
          <span slot-scope="scope">
            <span>{{scope.row.flowStatus == 0 ? '启用': '禁用'}}</span>
          </span>
        </el-table-column>
        <el-table-column prop="remark" label="流程备注" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="editFlow(scope.row)">修改</el-button>
            <el-button type="text" @click="deleteFlow(scope.row.id)">删除</el-button>
            <el-button type="text" @click="continueHandle(scope.row)">绑定环节</el-button>
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
    <addEditFlow ref="addEditFlowRef"></addEditFlow>
  </div>
</template>
<script>
import { getFlowListApi, deleteFlowApi } from "@/api/caseDeploy";
import addEditFlow from "./addEditFlow";
export default {
  data() {
    return {
      tableData: [], //表格数据
      searchForm: {
        flowName: ""
      },
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0 //总页数
    };
  },
  components: {
    addEditFlow
  },
  inject: ["reload"],
  methods: {
    //查询流程图列表
    getFlowList() {
      let data = {
        current: this.currentPage,
        size: this.pageSize,
        flowName: this.searchForm.flowName
      };
      let _this = this;
      getFlowListApi(data).then(
        res => {
          console.log("流程列表", res);
          _this.tableData = res.data.records;
          _this.totalPage = res.data.total;
        },
        err => {
          console.log(err);
        }
      );
    },
    //新增流程
    addFlow() {
      this.$refs.addEditFlowRef.showModal(0, "");
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getFlowList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getFlowList();
    },
    //修改流程
    editFlow(row) {
      this.$refs.addEditFlowRef.showModal(2, row);
    },
    deleteFlow(id) {
      this.$confirm("确认删除该流程?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteFlowApi(id).then(
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
    //绑定环节  跳转页面
    continueHandle(data) {
      this.$store.dispatch("deleteTabs", this.$route.name);
      this.$router.push({
        name: "case_handle_flowBindLink",
        params: { flowId: data.id }
      });
    }
  },
  created() {
    this.getFlowList();
  }
};
</script>

<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
</style>