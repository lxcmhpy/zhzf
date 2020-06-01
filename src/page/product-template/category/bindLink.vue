<template>
  <div class="searchAndpageBox" id="roleBox">
    <div class="handlePart">
      <div class="search">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="mini">
          <!-- <el-form-item label="环节名称">
            <el-input v-model="searchForm.linkName" placeholder="请输入环节名称"></el-input>
          </el-form-item>-->
          <el-form-item> 
            <el-button type="primary" size="medium" icon="el-icon-back" @click="goBack">返回</el-button>
            <el-button type="primary" size="medium" icon="el-icon-plus" @click="binkLink">新增环节</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tablePart">
      <div>已绑定环节列表</div>
      <el-table :data="tableData" stripe style="width: 100%" height="100%">
        <el-table-column type="index" width="60" align="center">
          <template slot="header">序号</template>
        </el-table-column>
        <el-table-column prop="linkName" label="环节名称" align="center"></el-table-column>
        <!-- <el-table-column prop="linkId" label="上一环节" align="center"></el-table-column>
        <el-table-column prop="flowId" label="下一环节" align="center"></el-table-column> -->
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteLink(scope.row)">删除</el-button>
            <el-button type="text" @click="binkLinkSort('1',scope.row)">绑定上一环节</el-button>
            <el-button type="text" @click="binkLinkSort('0',scope.row)">绑定下一环节</el-button>
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
    <bindLinkDiag ref="bindLinkDiagRef"></bindLinkDiag>
    <bindLinkSort ref="bindLinkSortRef"></bindLinkSort>
  </div>
</template>
<script>
import { getLinkListByFlowIdApi ,deleteLinkApi} from "@/api/caseDeploy";
import bindLinkDiag from "./bindLinkDiag";
import bindLinkSort from "./bindLinkSort";
export default {
  data() {
    return {
      tableData: [], //表格数据
      searchForm: {
        linkName: ""
      },
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0 //总页数
    };
  },
  components: {
    bindLinkDiag,
    bindLinkSort
  },
  inject: ["reload"],
  methods: {
    goBack(){
      this.$store.dispatch("deleteTabs", "case_handle_flowBindLink");
      this.$router.push({
        name: "category",
        // params: { flowId: data.id }
      });
    },
    //查询已绑定环节列表
    getLinkListByFlowId() {
      let data = {
        current: this.currentPage,
        size: this.pageSize,
        flowId: this.$route.params.flowId
      };
      let _this = this;
      console.log("参数", data);
      getLinkListByFlowIdApi(data).then(
        res => {
          console.log("已绑定环节列表", res);
          _this.tableData = res.data.records;
          _this.totalPage = res.data.total;
        },
        err => {
          console.log(err);
        }
      );
    },
    //新增环节
    binkLink() {
      let data = {
        flowId: this.$route.params.flowId
      };
      this.$refs.bindLinkDiagRef.showModal(data);
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getLinkListByFlowId();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getLinkListByFlowId();
    },
    //删除已绑定环节
    deleteLink(row) {
      console.log(row);
      this.$confirm("确认删除该环节?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteLinkApi(row).then(
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
    //绑定上一环、绑定下一环节
    binkLinkSort(type,data){
      this.$refs.bindLinkSortRef.showModal(type,data);
    }
  },
  created() {
    this.getLinkListByFlowId();
  }
};
</script>

<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
</style>