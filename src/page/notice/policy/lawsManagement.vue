<template>
  <div class="com_searchAndpageBoxPadding images-management">
    <div class="searchAndpageBox searchAndpageBox2">
      <div class="handlePart caseHandleSearchPart">
        <el-form
          :model="searchForm"
          ref="searchForm"
          class="caseSearchForm"
          label-width="80px"
          size="small"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="名称" prop="strName">
                <el-input v-model="searchForm.strName"></el-input>
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
          <el-row>
            <el-button type="primary" size="medium" @click="dialogVisible = true">添加</el-button>
            <el-button type="primary" size="medium" @click="onDelete">删除</el-button>
            <el-button type="primary" size="medium" @click="onApprove">批量审核</el-button>
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
          <el-table-column prop="strName" label="名称" align="center"></el-table-column>
          <el-table-column prop="strNumber" label="文号" align="center"></el-table-column>
          <el-table-column prop="strOrgan" label="发布机关" align="center"></el-table-column>
          <el-table-column prop="dtmDate" label="发布日期" align="center"></el-table-column>
          <el-table-column prop="shiDate" label="实施日期" align="center"></el-table-column>
          <el-table-column prop="state" label="状态" align="center">
            <template slot-scope="scope">{{allStatus[scope.row.state]}}</template>
          </el-table-column>
          <el-table-column prop="auditComment" label="审核意见" align="center"></el-table-column>
          <el-table-column prop="op" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="onDetail(scope.row)">详情</el-button>
              <el-button
                v-if="scope.row.state===1 || scope.row.state===4"
                type="text"
                @click="onSubmit(scope.row)"
              >提交</el-button>
              <el-button type="text" @click="onApprove(scope.row)">审核</el-button>
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

    <JkyDialogTable
      @handleChange="handleCheckChange"
      @handleSubmit="handleSubmit"
      @handleClose="dialogVisible = false"
      :inputList="inputList"
      :columns="columns"
      :url="url"
      :baseUrlType="baseUrlType"
      :isSelection="true"
      :dialogVisible="dialogVisible"
      title="新增"
      :isPagination="false"
    />
    <approve ref="approveDialog" @handle-data="handleData"></approve>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { findBnslaws, saveOrUpdate, findById } from "@/api/notice/bnslaw";
import approve from "@/page/notice/components/approve";
import JkyDialogTable from "@/components/jky-dialogTable";

export default {
  components: { approve, JkyDialogTable },
  data() {
    return {
      searchForm: {
        strName: "",
        state: "",
      },
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总页数
      allStatus: { 1: "草稿", 2: "待审核", 3: "已通过", 4: "已退回" },
      mutipleSelection: [],
      dialogVisible: false,
      url: "/notice/bnslaw/show",
      baseUrlType: "NOTICE_HOST",
      inputList: [
        {
          label: "名称",
          prop: "strName",
          placeholder: "请输入名称",
          disabled: false,
        },
      ],
      columns: [
        {
          label: "名称",
          align: "center",
          prop: "strName",
        },
        {
          label: "文号",
          align: "center",
          prop: "strNumber",
        },
        {
          label: "发布机关",
          align: "center",
          prop: "strOrgan",
        },
        {
          label: "发布日期",
          align: "center",
          prop: "dtmDate",
        },
        {
          label: "实施日期",
          align: "center",
          prop: "shiDate",
        },
      ],
    };
  },
  methods: {
    //获取已归档的数据
    getDataList(searchData) {
      let data = searchData;
      data.current = this.currentPage;
      data.size = this.pageSize;
      let _this = this;
      findBnslaws(data).then(
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
    // onAdd() {
    //   this.dialogVisible = true;
    // },
    handleCheckChange(data) {
      this.mutipleSelection = data;
    },
    /**
     * 点击确定
     */
    handleSubmit() {
      this.dialogVisible = false;
    },

    onDetail(row) {
      this.$refs.complaintDialog.showModal(1, row);
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
          saveOrUpdate(data).then(
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
    onDelete() {
      //   this.$refs.approveDialog.showModal(row);
    },
    onApprove(row) {
      this.$refs.approveDialog.showModal(row);
    },
    async handleData(data) {
      let res = saveOrUpdateNotice(data);
      _this.$message({ type: "success", message: "操作成功!" });
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

