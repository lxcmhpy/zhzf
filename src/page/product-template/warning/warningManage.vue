<template>
  <div class="searchAndpageBox" id="roleBox">
    <div class="handlePart">
      <div class="search">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="mini">
          <el-form-item label="预警名称">
            <el-input v-model="searchForm.warName" clearable placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="预警类型">
            <el-select v-model="searchForm.warType" placeholder="请选择">
              <el-option v-for="item in warnTypeList" :key="item.value" :label="item.lable" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务类型">
            <el-select v-model="searchForm.taskType" placeholder="请选择">
              <el-option v-for="item in taskTypeList" :key="item.value" :label="item.lable" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" icon="el-icon-search" @click="getCatalogSearch">查询</el-button>
            <el-button type="primary" size="medium" icon="el-icon-refresh-left" @click="resetSearch">重置</el-button>
            <el-button type="primary" size="medium" icon="el-icon-plus" @click="addCatalog">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tablePart">
      <el-table :data="tableData" stripe style="width: 100%" height="100%">
        <el-table-column prop="warName" label="预警提醒名称" align="center"></el-table-column>
        <el-table-column prop="warType" label="提醒类型" align="center" :formatter="warTypeFormat"></el-table-column>
        <el-table-column prop="taskType" label="任务类型" align="center" :formatter="taskTypeFormat"></el-table-column>
        <!-- <el-table-column prop="routeGrade" label="条件内容" align="center"></el-table-column> -->
        <!-- <el-table-column prop="startingPoint" label="发送对象" align="center"></el-table-column> -->
        <!-- <el-table-column prop="enddingPoint" label="提醒内容" align="center"></el-table-column> -->
        <el-table-column prop="status" label="状态" align="center" :formatter="statusFormat"></el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <div style="width:160px">
              <el-button type="text" @click.stop @click="editCatalog(scope.row)">修改</el-button>
              <el-button type="text" @click.stop @click="deleteCatalog(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paginationBox">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
    </div>
    <addEditCatalog ref="addEditCatalogRef"></addEditCatalog>
    <catalogLinkDocList ref="catalogLinkDocListRef"></catalogLinkDocList>
  </div>
</template>
<script>
import addEditCatalog from "./addOrUpdateWarnings";
import catalogLinkDocList from "./addOrUpdateWarnings";
import { getWarInfoLlistApi, delWarInfoLlistApi } from "@/api/caseHandle";
export default {
  data() {
    return {
      tableData: [], //表格数据
      caseTypeList: [],
      searchForm: {
        name: "",
        remark: ""
      },
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      formInline: {
        user: "",
        region: ""
      },
      taskTypeList: [{lable:'定时任务',value:1}],
      warnTypeList: [{lable:'报警',value:1},{lable:'预警',value:2},{lable:'提醒',value:3}],
    };
  },
  components: {
    addEditCatalog,
    catalogLinkDocList
  },
  inject: ["reload"],
  methods: {
    //编辑预警
    editCatalog(row) {
      this.$refs.addEditCatalogRef.showModal(2, row);
    },
    //删除预警
    deleteCatalog(row) {
      this.$confirm('确认删除吗？', '提示', {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: 'el-icon-question',
        customClass: 'custom-confirm'
      }).then(() => {
        delWarInfoLlistApi(row.id).then(
          res => {
            if (res.code == 200) {
              this.$message({ type: "success", message: "删除成功!" });
              this.currentPage = 1;
              this.getCatalog();
            } else {
              this.$message({ type: "error", message: "删除失败!" });
            }
          },
          err => {
            console.log(err);
          }
        );
      }).catch(() => { });
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getCatalog();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCatalog();
    },
    // 查询
    getCatalogSearch() {
      this.currentPage = 1;
      this.getCatalog();
    },
    //重置
    resetSearch() {
      this.searchForm = {};
      this.getCatalog();
    },
    //获取预警
    getCatalog() {
      let data = {
        current: this.currentPage,
        size: this.pageSize,
        warName: this.searchForm.warName,
        warType: this.searchForm.warType,
        taskType: this.searchForm.taskType,
      };
      let _this = this;
      getWarInfoLlistApi(data).then(
        res => {
          _this.tableData = res.data.records;
          _this.totalPage = res.data.total;
        },
        err => {
          console.log(err);
        }
      );
    },
    //添加预警
    addCatalog() {
      let sort = this.totalPage;
      this.$refs.addEditCatalogRef.showModal(0, sort);
    },

    showIndex(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1;
    },
    taskTypeFormat(row) {
      if (row.taskType === '1') {
        return '定时任务'
      }
    },
    warTypeFormat(row) {
      if (row.warType === '3') {
        return '提醒'
      } else if (row.warType === '2') {
        return '预警'
      } else if (row.warType === '1') {
        return '报警'
      }
    },
    statusFormat(row) {
      if (row.status == '1') {
        return '启用'
      } else if (row.status == '0') {
        return '关闭'
      }
    },

  },
  created() {
    this.getCatalog();
  }
};
</script>

<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
</style>
