<template>
<div class="com_searchAndpageBoxPadding">
  <div class="searchAndpageBox" id="dictBox">
    <div class="handlePart">
      <div class="search">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="业务领域名称">
            <el-input v-model="searchForm.name" placeholder="请输入业务领域名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="medium"
              icon="el-icon-search"
              @click="getLawCategoryList"
            >查询</el-button>
            <el-button
              type="primary"
              size="medium"
              icon="el-icon-plus"
              @click="addLawCategory"
            >新增业务领域</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tablePart">
      <el-table :data="tableData" stripe style="width: 100%" height="100%">
        <el-table-column prop="name" label="业务领域名称" align="center"></el-table-column>
        <el-table-column prop="sort" label="排序" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="editLawCategory(scope.row)">修改</el-button>
            <el-button type="text" @click="hyleDetail(scope.row.id)">行业类别</el-button>
            <el-button type="text" @click="deleteCategoryById(scope.row.id)">删除</el-button>
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

    <addLawCategory ref="addLawCategoryRef"></addLawCategory>
    <hylbDialog ref="hylbDialogRef"></hylbDialog>
  </div>
</div>
</template>
<script>
import addLawCategory from "./addLawCategory";
import hylbDialog from "./hylbDialog";
import {
  getLawCategoryPageApi,
  deleteCategoryByIdApi,
  queryOrganByCateApi
} from "@/api/caseDeploy";

export default {
  data() {
    return {
      tableData: [], //表格数据
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      searchName: "", //查询名称
      searchForm: {
        name: ""
      },
      organIdList: ""
    };
  },
  components: {
    addLawCategory,
    hylbDialog
  },
  inject: ["reload"],
  methods: {
    //获取列表
    getLawCategoryList() {
      let data = {
        current: this.currentPage,
        size: this.pageSize,
        name: this.searchForm.name,
        pid: ""
      };
      let _this = this;
      getLawCategoryPageApi(data).then(
        res => {
          console.log("执法门类列表", res);
          _this.tableData = res.data.records;
          _this.totalPage = res.data.total;
        },
        err => {
          console.log(err);
        }
      );
    },
    //添加
    addLawCategory() {
      let data = {
        leng: this.tableData.length
      };
      this.$refs.addLawCategoryRef.showModal(0, data);
    },
    //修改
    editLawCategory(data) {
      let newRow = JSON.parse(JSON.stringify(data));
      this.$refs.addLawCategoryRef.showModal(2, newRow);
    },
    //删除
    deleteCategoryById(id) {
      queryOrganByCateApi(id).then(
        res => {
          console.log("绑定的机构", res);
          this.organIdList = res.data;
          console.log("11", this.organIdList);
          if (this.organIdList.length != 0) {
            this.$message({
              // type: "success",
              message: "已有机构绑定该业务领域，禁止删除!"
            });
          } else {
            this.$confirm("确认删除该业务领域?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                deleteCategoryByIdApi(id).then(
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
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //根据id获取行业类别
    hyleDetail(id) {
      this.$refs.hylbDialogRef.showModal(id);
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getLawCategoryList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getLawCategoryList();
    }
  },
  created() {
    this.getLawCategoryList();
  }
};
</script>npm r
<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
</style>
