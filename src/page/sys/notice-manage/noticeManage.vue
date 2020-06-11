<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" id="NoticeBox">
      <div class="handlePart">
        <div class="search">
          <el-form :inline="true" :model="dicSearchForm" class>
            <el-form-item label="标题">
              <el-input v-model="dicSearchForm.title" placeholder="输入标题"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="getNotices">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-plus" @click="addNotice">添加公告</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" height="100%">
          <el-table-column prop="title" label="标题" align="center"></el-table-column>
          <el-table-column prop="noticeType" label="公告类型" align="center"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="viewNotice(scope.row)" type="text">查看</el-button>
              <el-button @click="editNotice(scope.row)" type="text">编辑</el-button>
              <el-button type="text" @click="deleteNotice(scope.row.id)">删除</el-button>
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
      <addNotice ref="addNoticeRef"></addNotice>
    </div>
  </div>
</template>
<script>
import addNotice from "./addNotice";
export default {
  data() {
    return {
      tableData: [], //表格数据
      dicSearchForm: {
        title: ""
      },
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0 //总页数
    };
  },
  components: {
    addNotice
  },
  inject: ["reload"],
  methods: {
    //查看公告信息
    viewNotice(row) {
      let routerData = {
        hasApprovalBtn: false,
        docId: "2c9029ae654210eb0165421564970001",
        approvalOver: false,
        hasBack: true,
        docDataId:"442acb8e82dbcb70223165dedb175b03"
      };
      this.$store.dispatch("deleteTabs", this.$route.name);
      this.$router.push({ name: "case_handle_myPDF", params: routerData });
    },
    //编辑公告信息
    editNotice(row) {
      this.$refs.addNoticeRef.showModal(2, row);
    },
    //删除公告信息
    deleteNotice(id) {
      this.$confirm("确定删除吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
              this.$store.dispatch("deleteNotice", id).then(
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
      this.getNotices();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getNotices();
    },
    //获取公告信息
    getNotices() {
      let data = {
        current: this.currentPage,
        size: this.pageSize,
        title: this.dicSearchForm.title
      };
      let _this = this;
      this.$store.dispatch("getNoticeList", data).then(
        res => {
          console.log("公告信息列表", res);
          _this.tableData = res.data.records;
          _this.totalPage = res.data.total;
        },
        err => {
          console.log(err);
        }
      );
    },
    //添加公告信息
    addNotice() {
      this.$refs.addNoticeRef.showModal(0, "");
    }
  },
  created() {
    this.getNotices();
  }
};
</script>

<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
</style>
