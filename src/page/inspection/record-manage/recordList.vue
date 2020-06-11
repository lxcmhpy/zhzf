<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" id="roleBox">
      <div class="handlePart">
        <div class="search">
          <el-form :inline="true" :model="searchForm" class>
            <el-form-item label="记录时间">
              <el-date-picker v-model="timeList" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="业务领域">
              <el-input v-model="searchForm.domain" placeholder="输入业务领域"></el-input>
            </el-form-item>
            <el-form-item label="检查类型">
              <el-input v-model="searchForm.name"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="searchForm.status" placeholder="请选择">
                <el-option label="全部" value="全部"></el-option>
                <el-option label="暂存" value="暂存"></el-option>
                <el-option label="完成" value="完成"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="记录人">
              <el-input v-model="searchForm.createUser"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="searchTableData">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="searchTableData">生成日志</el-button>
            </el-form-item>
            <el-form-item>
              <el-radio v-model="searchForm.name" label="1">只显示我的</el-radio>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" height="100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="createTime" label="记录时间" align="center"></el-table-column>
          <el-table-column prop="domain" label="业务领域" align="center"></el-table-column>
          <el-table-column prop="title" label="记录类型" align="center"></el-table-column><!-- 显示模板标题 -->
          <!-- <el-table-column prop="" label="执法机构" align="center"></el-table-column> -->
          <!-- <el-table-column prop="" label="执法人员" align="center"></el-table-column> -->
          <el-table-column prop="createUser" label="记录人" align="center"></el-table-column>
          <!-- <el-table-column prop="" label="交接班" align="center"></el-table-column> -->
          <el-table-column prop="status" label="状态" align="center"></el-table-column>
          <!-- <el-table-column prop="title" label="标题" align="center"></el-table-column> -->
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="viewRecord(scope.row)" type="text">查看</el-button>
              <el-button @click="editRecord(scope.row)" type="text">编辑</el-button>
              <el-button type="text" @click="deleteRecord(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
      </div>

    </div>
  </div>
</template>
<script>
import { findRecordListApi, removeRecordByIdApi, findRecordModleByIdApi, findRecordModleTimeByIdApi } from "@/api/Record";
export default {
  data() {
    return {
      tableData: [], //表格数据
      timeList: [],
      multipleSelection: [],
      searchForm: {
        domain: "",
        name: ''
      },
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数


    }
  },
  methods: {
    getTableData() {
      let data = {
        domain: this.searchForm.domain,
        current: this.currentPage,
        size: this.pageSize,
        // name: this.dicSearchForm.name
      };
      findRecordListApi(data).then(
        res => {
          console.log(res)
          this.tableData = res.data.records
          this.totalPage = res.data.total
        },
        error => {
          // reject(error);
        })

    },
    // 查询
    searchTableData() {
      this.currentPage = 1;
      this.getTableData()
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getTableData();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData();
    },
    // 查看
    viewRecord(row) {
      this.$router.push({
        name: 'inspection_writeRecordInfo',
        params: row
      });
    },
    // 修改
    editRecord(row) {
      let _this = this
      let list = []
      console.log('编辑', row)
      findRecordModleTimeByIdApi(row.templateId).then(
        res => {
          if (res.code == 200) {
            console.log('row.createTime <= res.data', row.createTime, res.data)
            if (row.createTime >= res.data) {
              // 写记录
              row.addOrEiditFlag = 'edit'
              this.$router.push({
                name: 'inspection_writeRecordInfo',
                params: row
              });
            } else {
              this.$message.error('当前模板已修改，该记录不可修改');
            }
          } else {
            this.$message.error(res.msg);
          }
        },
        error => {

        })

    },
    // 删除
    deleteRecord(id) {
      console.log('选中的模板', id)
      this.$confirm('确认删除？', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        console.log('删除', id)
        removeRecordByIdApi(id).then(
          res => {
            console.log(res)
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg
              });
              this.getTableData()
            }
          },
          error => {
            // reject(error);
          })

      })
    },
    // 选择数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log('multipleSelection', this.multipleSelection)
    }
  },
  mounted() {
    this.getTableData()
  }
}
</script>