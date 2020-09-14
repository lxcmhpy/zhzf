<template>
  <div class="com_searchAndpageBoxPadding case-management">
    <div class="searchAndpageBox searchAndpageBox2">
      <div class="handlePart caseHandleSearchPart">
        <el-form :model="searchForm" ref="searchForm" style="width:100%" size="small">
          <el-row>
            <el-col :span="8">
              <el-form-item label="处罚决定书文号（案号）" prop="caseNumber" label-width="170px">
                <el-input v-model="searchForm.caseNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="行政相对人名称" prop="party" label-width="140px">
                <el-input v-model="searchForm.party"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="状态" prop="state" label-width="50px">
                <el-select v-model="searchForm.state" placeholder="请选择" clearable>
                  <el-option v-for="(item,key) in allStatus" :key="key" :label="item" :value="key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label-width="10px">
                <el-button type="primary" size="medium" icon="el-icon-search" @click="searchEmit"></el-button>
                <el-button type="primary" size="medium" icon="el-icon-refresh-left" @click="reset"></el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin-bottom:10px;">
            <el-button type="primary" size="medium" @click="dialogVisible = true">添加</el-button>
            <el-button type="primary" size="medium" @click="onDeleteBatch">删除</el-button>
            <el-button v-if="canApprove" type="primary" size="medium" @click="onApproveBatch">批量审核</el-button>
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
          @selection-change="handleSelectionChange"
        >
          >
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column prop="caseNumber" label="行政处罚决定书文号（案号）" width="150" align="center"></el-table-column>
          <el-table-column
            prop="caseCauseName"
            label="处罚名称（违法行为）"
            width="110"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column prop="party" label="行政相对人名称（当事人）" width="130" align="center"></el-table-column>
          <el-table-column prop="organName" label="受案单位" align="center"></el-table-column>
          <el-table-column prop="subjectName" label="处罚单位" align="center"></el-table-column>
          <el-table-column prop="punishDate" label="处罚时间" align="center"></el-table-column>
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
              <el-button type="text" @click="onDetail(scope.row)">详情</el-button>
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

    <el-dialog
      title="详情"
      :visible.sync="detailVisible"
      @close="detailVisible = false"
      :close-on-click-modal="false"
      width="50%"
      class="detail-dialog"
    >
      <div style="height:400px;overflow: auto;">
        <table class="table" width="100%" cellspacing="0">
          <tr>
            <td width="15%" class="title">行政处罚决定书文号</td>
            <td width="35%">{{form.caseNumber}}</td>
          </tr>
          <tr>
            <td class="title">处罚名称</td>
            <td>{{form.caseCauseName}}</td>
          </tr>
          <tr>
            <td class="title">处罚类型</td>
            <td>{{form.punishType}}</td>
          </tr>
          <tr>
            <td class="title">处罚事由</td>
            <td>{{form.caseInfo}}</td>
          </tr>
          <tr>
            <td class="title">处罚依据</td>
            <td>{{form.punishLaw}}</td>
          </tr>
          <tr>
            <td class="title">行政相对人名称</td>
            <td>{{form.party}}</td>
          </tr>
          <tr>
            <td class="title">统一社会信用代码</td>
            <td>{{form.socialCreditCode}}</td>
          </tr>
          <tr>
            <td class="title">身份证号</td>
            <td>{{form.partyIdNo}}</td>
          </tr>
          <tr>
            <td class="title">处罚结果</td>
            <td>{{form.punishDecision}}</td>
          </tr>
          <tr>
            <td class="title">处罚决定日期</td>
            <td>{{form.punishDate}}</td>
          </tr>
          <tr>
            <td class="title">处罚单位</td>
            <td>{{form.subjectName}}</td>
          </tr>
        </table>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="detailVisible = false">关闭</el-button>
      </span>
    </el-dialog>

    <JkyDialogTable
      @handleSubmit="handleSubmit"
      @handleClose="dialogVisible = false"
      :inputList="inputList"
      :columns="columns"
      :url="url"
      :isSelection="true"
      :dialogVisible="dialogVisible"
      title="新增"
      :isPagination="true"
      height="330"
    />
    <approve ref="approveDialog" @handle-data="handleData"></approve>

    <approve ref="approveDialogBatch" @handle-data="handleDataBatch"></approve>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import {
  findCases,
  saveOrUpdate,
  saveOrUpdateBatch,
  findById,
  deleteByIds,
  update,
  updateBatch,
} from "@/api/notice/case";
import approve from "@/page/notice/components/approve";
import JkyDialogTable from "@/components/jky-dialogTable";

export default {
  components: { approve, JkyDialogTable },
  data() {
    return {
      searchForm: {
        caseNumber: "",
        party: "",
        state: "",
      },
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总页数
      allStatus: { 1: "草稿", 2: "待审核", 3: "已通过", 4: "已退回" },
      multipleSelection: [],
      dialogVisible: false,
      url: "/notice/notice/case/show",
      inputList: [
        {
          label: "处罚决定书文号（案号）",
          prop: "caseNumber",
          placeholder: "请输入",
          disabled: false,
        },
        {
          label: "行政相对人名称",
          prop: "party",
          disabled: false,
        },
      ],
      columns: [
        {
          label: "行政处罚决定书文号（案号）",
          align: "center",
          prop: "caseNumber",
        },
        {
          label: "处罚名称（违法行为）",
          align: "center",
          prop: "caseCauseName",
        },
        {
          label: "行政相对人名称（当事人）",
          align: "center",
          prop: "party",
        },
        {
          label: "受案单位",
          align: "center",
          prop: "organName",
        },
        {
          label: "处罚单位",
          align: "center",
          prop: "subjectName",
        },
        {
          label: "处罚时间",
          align: "center",
          prop: "punishDate",
        },
      ],
      form: {},
      detailVisible: false,
      canApprove: false,
    };
  },
  methods: {
    //获取已归档的数据
    getDataList(searchData) {
      let data = searchData;
      data.current = this.currentPage;
      data.size = this.pageSize;
      let _this = this;
      findCases(data).then(
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 点击确定
     */
    handleSubmit(data) {
      debugger;
      data.forEach((item) => {
        item.caseID = item.id;
        if (item.docData) item.caseInfo = JSON.parse(item.docData).illegalFact;
      });
      let _this = this;
      saveOrUpdateBatch(data).then(
        (res) => {
          _this.dialogVisible = false;
          _this.$message({ type: "success", message: "操作成功!" });
          _this.load();
        },
        (error) => {
          console.log(error);
        }
      );
    },

    onDetail(row) {
      this.form = row;
      this.detailVisible = true;
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
          update(data).then(
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
    async onDeleteBatch() {
      let ids = [];
      if (this.multipleSelection.length < 1) {
        this.$message({ type: "warning", message: "请选择记录!" });
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
      let res = await deleteByIds(ids);
      this.$message({ type: "success", message: "操作成功!" });
      this.load();
    },
    onApprove(row) {
      this.$refs.approveDialog.showModal(row);
    },
    async handleData(data) {
      let res = await update(data);
      this.$message({ type: "success", message: "操作成功!" });
      this.load();
    },
    onApproveBatch() {
      if (this.multipleSelection.length < 1) {
        this.$message({ type: "warning", message: "请选择记录!" });
        return;
      }
      let flag = false; //标记是否有不满足提交的记录，如不满足，则返回，不允许操作
      for (let i = 0; i < this.multipleSelection.length; i++) {
        let item = this.multipleSelection[i];
        if (item.state !== 2) {
          flag = true;
          break;
        }
      }
      if (flag) {
        this.$message({
          type: "error",
          message: "只允许操作待审核的记录!",
        });
        return;
      }
      this.$refs.approveDialogBatch.showModal({});
    },
    async handleDataBatch(data) {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        let item = this.multipleSelection[i];
        item.state = data.state;
        item.auditComment = data.auditComment;
      }
      let res = await updateBatch(this.multipleSelection);
      this.$message({ type: "success", message: "操作成功!" });
      this.load();
    },
    load() {
      this.getDataList({});
    },
  },
  created() {},
  mounted() {
    let user = iLocalStroage.gets("userInfo");
    let _this = this;
    user.roles.forEach((item) => {
      if (item.name === "信息公示审核") _this.canApprove = true;
    });
    this.load();
  },
};
</script>
<style lang="scss" scoped>
.case-management {
  .detail-dialog {
    .table {
      border: 1px solid #ecebeb;
      min-height: 30px;
      line-height: 30px;
      text-align: left;
      border-collapse: collapse;
      padding: 2px;
    }
    .table tr th,
    .table tr td {
      border: 1px solid #ecebeb;
      padding: 10px;
    }
    .table .title {
      font-weight: bold;
      background: #f8f6f6;
    }
  }
}
</style>

