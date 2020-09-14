<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox searchAndpageBox2">
      <div class="handlePart caseHandleSearchPart">
        <el-form
          :model="searchForm"
          ref="searchForm"
          style="width:100%"
          label-width="50px"
          size="small"
        >
          <el-row>
            <el-col :span="7">
              <el-form-item label="标题" prop="title">
                <el-input v-model="searchForm.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态" prop="state">
                <el-select v-model="searchForm.state" placeholder="请选择" clearable>
                  <el-option v-for="(item,key) in allStatus" :key="key" :label="item" :value="key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label-width="10px">
                <el-button type="primary" size="medium" icon="el-icon-search" @click="searchEmit"></el-button>
                <el-button type="primary" size="medium" icon="el-icon-refresh-left" @click="reset"></el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin-bottom:10px;">
            <el-button type="primary" size="medium" icon="el-icon-plus" @click="onAdd">添加</el-button>
            <el-button type="primary" size="medium" icon="el-icon-delete" @click="onDelete">删除</el-button>
          </el-row>
        </el-form>
      </div>
      <div class="tablePart">
        <!-- @row-click="handleCurrentChange" -->
        <el-table
          ref="singleTable"
          :data="tableData"
          style="width: 100%"
          height="100%"
          highlight-current-row
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" class="selection"></el-table-column>
          <el-table-column prop="title" label="标题" align="center"></el-table-column>
          <el-table-column prop="source" label="来源" align="center"></el-table-column>
          <el-table-column prop="publishTime" label="发布日期" align="center"></el-table-column>
          <el-table-column prop="state" label="状态" align="center">
            <template slot-scope="scope">{{allStatus[scope.row.state]}}</template>
          </el-table-column>
          <el-table-column
            prop="auditComment"
            label="审核意见"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column prop="op" label="操作" align="center">
            <template slot-scope="scope">
              <router-link
                target="_blank"
                :to="{path:'/details',query:{content: scope.row.content,
          files: JSON.stringify(scope.row.fileUploadVos),
          title: scope.row.title,
          source: scope.row.source,
          time: scope.row.publishTime}}"
              >
                <el-button type="text">预览</el-button>
              </router-link>
              <el-button
                v-if="scope.row.state===1 || scope.row.state===4"
                type="text"
                @click="onEdit(scope.row)"
              >修改</el-button>
              <el-button
                v-if="scope.row.state===1 || scope.row.state===4"
                type="text"
                @click="onSubmit(scope.row)"
              >提交</el-button>
              <el-button
                v-if="scope.row.state===2 && canApprove"
                type="text"
                @click="onApprove(scope.row)"
              >审核</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox" v-if="tableData.length > 0">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handlePageSizeChange"
          :current-page="currentPage"
          background
          :page-sizes="[10, 20, 30, 40]"
          layout="prev, pager, next,sizes,jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <addAndEditNotice ref="noticeDialog" @success="load()"></addAndEditNotice>
    <approve ref="approveDialog" @handle-data="handleData"></approve>
  </div>
</template>
<script>
// import { noticeCommonMixins } from "@/common/js/notice/noticeCommonMixins";

import iLocalStroage from "@/common/js/localStroage";
import addAndEditNotice from "@/page/notice/components/addAndEditNotice";
import approve from "@/page/notice/components/approve";
import Vue from "vue";

let vm = new Vue();
import {
  findNoticeByPage,
  deleteNoticeById,
  saveOrUpdateNotice,
} from "@/api/notice/notice";

export default {
  //   mixins: { noticeCommonMixins },
  props: ["type"],
  data() {
    return {
      searchForm: {
        title: "",
        state: "",
        type: "",
      },
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总页数
      allStatus: { 1: "草稿", 2: "待审核", 3: "已通过", 4: "已退回" },
      multipleSelection: [],
      canApprove: false,
    };
  },
  components: {
    addAndEditNotice,
    approve,
  },
  methods: {
    //获取已归档的数据
    getDataList(searchData) {
      let data = searchData;
      data.current = this.currentPage;
      data.size = this.pageSize;
      let _this = this;
      findNoticeByPage(data).then(
        (res) => {
          _this.total = res.data.total;
          _this.tableData = res.data.records;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getDataList(this.searchForm);
    },
    //更换页码
    handlePageSizeChange(val) {
      this.currentPage = val;
      this.getDataList(this.searchForm);
    },
    searchEmit() {
      this.getDataList(this.searchForm);
    },
    reset() {
      this.$refs["searchForm"].resetFields();
      this.load();
    },
    openPreview(item) {
      let oldRouter = {
        name: this.$route.name,
        // path: this.$route.path
      };
      let route = this.$router.resolve({
        path: "/details",
        query: {
          content: item.content,
          files: JSON.stringify(item.fileUploadVos),
          title: item.title,
          source: item.source,
          time: item.publishTime,
          oldRouter: JSON.stringify(oldRouter),
        },
      });
      window.open(route.href, "_blank");
    },
    onAdd() {
      let data = {
        type: this.searchForm.type,
      };
      this.$refs.noticeDialog.showModal(1, data);
    },
    onEdit(row) {
      this.$refs.noticeDialog.showModal(2, row);
    },
    async onSubmit(row) {
      let _this = this;
      this.$confirm("确定要提交吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: "el-icon-question",
        customClass: "custom-confirm",
      })
        .then(() => {
          let data = row;
          data.state = 2;
          saveOrUpdateNotice(data).then(
            (res) => {
              _this.$message({ type: "success", message: "操作成功!" });
              //   _this.load();
            },
            (error) => {
              console.log(error);
            }
          );
        })
        .catch(() => {});
    },
    onApprove(row) {
      this.$refs.approveDialog.showModal(row);
    },
    async handleData(data) {
      let res = await saveOrUpdateNotice(data);
      this.$message({ type: "success", message: "操作成功!" });
      this.load();
    },
    /* handleCurrentChange(row) {
      if (this.multipleSelection.length > 0) {
        if (this.multipleSelection[0].id == row.id) {
          this.$refs.singleTable.setCurrentRow();
          this.multipleSelection = [];
        } else {
          this.$refs.singleTable.setCurrentRow(row);
          this.multipleSelection = [row];
        }
      } else {
        this.$refs.singleTable.setCurrentRow(row);
        this.multipleSelection = [row];
      }
    }, */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async onDelete() {
      let ids = [];
      if (this.multipleSelection.length < 1) {
        this.$message({ type: "warning", message: "请选择需要删除的记录" });
        return;
      }
      let flag = false; //标记是否有不满足提交的记录，如不满足，则返回，不允许操作
      for (let i = 0; i < this.multipleSelection.length; i++) {
        let item = this.multipleSelection[i];
        if (item.state !== 1 && item.state !== 4) {
          flag = true;
          break;
        }
        ids.push(item.id);
      }
      if (flag) {
        this.$message({
          type: "error",
          message: "只允许删除草稿状态或者退回状态的记录!",
        });
        return;
      }

      let res = await deleteNoticeById(ids);
      this.$message({ type: "success", message: "删除成功!" });
      this.load();
    },
    // checkboxInit(row, index) {
    //   //不可勾选
    //   if (row.state != 1 && row.state != 4) return 0;
    //   else return 1; //可勾选
    // },
    load() {
      this.getDataList({ type: this.type });
    },
  },
  created() {},
  mounted() {
    let user = iLocalStroage.gets("userInfo");
    let _this = this;
    user.roles.forEach((item) => {
      if (item.name === "信息公示审核") _this.canApprove = true;
    });
    debugger;
    this.searchForm.type = this.type;
    this.load();
  },
};
</script>

