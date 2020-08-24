<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox searchAndpageBox2">
      <div class="handlePart caseHandleSearchPart">
        <el-form
          :model="searchForm"
          ref="searchForm"
          class="caseSearchForm"
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
                  <el-option
                    v-for="(item,index) in allStatus"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
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
          <el-row>
            <el-button type="primary" size="medium" icon="el-icon-plus" @click="onAdd">添加</el-button>
            <el-button type="primary" size="medium" icon="el-icon-delete" @click="onDelete">删除</el-button>
          </el-row>
        </el-form>
      </div>
      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" height="100%" highlight-current-row>
          <el-table-column prop="title" label="标题" align="center"></el-table-column>
          <el-table-column prop="source" label="来源" align="center"></el-table-column>
          <el-table-column prop="lssueTime" label="发布日期" align="center"></el-table-column>
          <el-table-column prop="state" label="状态" align="center"></el-table-column>
          <el-table-column prop="remark" label="审核意见" align="center"></el-table-column>
          <el-table-column prop="op" label="操作" align="center">
            <template slot-scope="scope">
              <!-- v-if="scope.row.state=='待颁发' || scope.row.state=='挂失' || scope.row.state=='已年审'" -->
              <el-button type="text" size="mini" @click="openIssueDialog(scope.row)">颁发</el-button>
              <el-button type="text" size="mini" @click="openViewDialog(scope.row)">查看</el-button>
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
    <addAndEditNotice ref="noticeDialog"></addAndEditNotice>
    <approve ref="approveDialog"></approve>
  </div>
</template>
<script>
// import { noticeCommonMixins } from "@/common/js/notice/noticeCommonMixins";

import iLocalStroage from "@/common/js/localStroage";
import addAndEditNotice from "@/page/notice/components/addAndEditNotice";
import approve from "@/page/notice/components/approve";
import { findNoticeByPage } from "@/api/notice/notice";

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
      allStatus: ["草稿", "待审核", "已通过", "已退回"],
      //   organTreeData: [],
      //   myprops: {
      //     label: "label",
      //     value: "id",
      //   },
      //   selectOrganId: "", //默认选中机构的id
      //   acceptTimeArray: [],
      //   allStaff: [],
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
      debugger;
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
    onDelete() {},
  },
  created() {},
  mounted() {
    this.searchForm.type = this.type;
    this.getDataList({ type: this.type });
  },
};
</script>

