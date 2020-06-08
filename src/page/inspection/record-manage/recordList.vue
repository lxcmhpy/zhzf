<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" id="roleBox">
      <div class="handlePart">
        <div class="search">
          <el-form :inline="true" :model="searchForm" class>
            <el-form-item label="角色名称">
              <el-input v-model="searchForm.name" placeholder="输入角色名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="getTableData">查询</el-button>
            </el-form-item>
            <el-form-item>
              <!-- <el-button type="primary" size="medium" icon="el-icon-plus" @click="addRole">添加角色</el-button> -->
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" height="100%">
          <el-table-column prop="title" label="标题" align="center"></el-table-column>
          <el-table-column prop="createUser" label="创建人" align="center"></el-table-column>
          <el-table-column prop="domain" label="业务领域" align="center"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <!-- <el-button type="text" @click="bindMenu(scope.row.id)">菜单权限</el-button>
              <el-button type="text" @click="bindOrgan(scope.row.id)">绑定机构</el-button>
              <el-button @click="editRole(scope.row)" type="text">编辑</el-button>
              <el-button type="text" @click="deleteRole(scope.row.id)">删除</el-button> -->
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
import { findRecordListApi ,removeRecordByIdApi} from "@/api/Record";
export default {
  data() {
    return {
      tableData: [], //表格数据
      searchForm: {
        name: ""
      },
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数


    }
  },
  methods: {
    getTableData() {
      let data = {
        current: this.currentPage,
        size: this.pageSize,
        // name: this.dicSearchForm.name
      };
      findRecordListApi(data).then(
        res => {
          console.log(res)
          if (res.data) {
            this.tableData = res.data.records

          }
        },
        error => {
          // reject(error);
        })

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
  },
  mounted() {
    this.getTableData()
  }
}
</script>