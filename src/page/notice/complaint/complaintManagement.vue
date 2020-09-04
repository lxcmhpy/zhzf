<template>
  <div class="com_searchAndpageBoxPadding images-management">
    <div class="searchAndpageBox searchAndpageBox2">
      <div class="handlePart caseHandleSearchPart">
        <el-form
          :model="searchForm"
          ref="searchForm"
          style="width:100%"
          label-width="80px"
          size="small"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="信件编号" prop="letterNo">
                <el-input v-model="searchForm.letterNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="信件标题" prop="letterTitle">
                <el-input v-model="searchForm.letterTitle"></el-input>
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
        </el-form>
      </div>
      <div class="tablePart">
        <el-table
          ref="singleTable"
          :data="tableData"
          style="width: 100%"
          height="100%"
          highlight-current-row
        >
          <el-table-column prop="letterNo" label="信件编号" align="center" width="160"></el-table-column>
          <el-table-column prop="letterTitle" label="信件标题" align="center"></el-table-column>
          <el-table-column prop="sendName" label="来信人" align="center"></el-table-column>
          <el-table-column prop="sendTime" label="来信时间" align="center"></el-table-column>
          <el-table-column prop="isOpen" label="是否公开" align="center">
            <template slot-scope="scope">{{scope.row.isOpen==1?"是":"否"}}</template>
          </el-table-column>
          <el-table-column prop="state" label="状态" align="center">
            <template slot-scope="scope">{{allStatus[scope.row.state]}}</template>
          </el-table-column>
          <el-table-column prop="op" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="onDetail(scope.row)">详情</el-button>
              <el-button v-if="scope.row.state === 1" type="text" @click="onAccept(scope.row)">接件</el-button>
              <el-button v-if="scope.row.state === 2" type="text" @click="onReply(scope.row)">回复</el-button>
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
    <complaintDialog ref="complaintDialog" @handle-data="onSubmit"></complaintDialog>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { findComplaints, saveOrUpdate, findById } from "@/api/notice/complaint";
import complaintDialog from "@/page/notice/complaint/complaintDialog";

export default {
  components: { complaintDialog },
  data() {
    return {
      searchForm: {
        letterNo: "",
        letterTitle: "",
        state: "",
      },
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总页数
      allStatus: { 1: "待受理", 2: "已受理", 3: "已回复" },
    };
  },
  methods: {
    //获取已归档的数据
    getDataList(searchData) {
      let data = searchData;
      data.current = this.currentPage;
      data.size = this.pageSize;
      let _this = this;
      findComplaints(data).then(
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
      debugger;
    },
    onDetail(row) {
      this.$refs.complaintDialog.showModal(1, row);
    },
    onAccept(row) {
      this.$refs.complaintDialog.showModal(2, row);
    },
    async onReply(row) {
      this.$refs.complaintDialog.showModal(3, row);
    },
    async onSubmit(data) {
      debugger;
      let res = saveOrUpdate(data);
      this.$message({ type: "success", message: "操作成功!" });
      this.load();
    },

    load() {
      this.getDataList({});
    },
  },
  created() {},
  mounted() {
    this.load();
  },
};
</script>

