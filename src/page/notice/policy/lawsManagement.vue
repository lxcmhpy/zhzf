<template>
  <div class="com_searchAndpageBoxPadding images-management">
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
          <el-row style="margin-bottom:10px;">
            <el-button type="primary" size="medium" @click="dialogVisible = true">添加</el-button>
            <el-button type="primary" size="medium" @click="onDeleteBatch">删除</el-button>
            <el-button type="primary" size="medium" @click="onApproveBatch">批量审核</el-button>
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
          <el-table-column prop="strName" label="名称" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="strNumber" label="文号" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column
            prop="strOrgan"
            label="发布机关"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column prop="dtmDate" label="发布日期" align="center"></el-table-column>
          <el-table-column prop="shiDate" label="实施日期" align="center"></el-table-column>
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
              <el-button v-if="scope.row.state===2" type="text" @click="onApprove(scope.row)">审核</el-button>
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
      title="法规详情"
      :visible.sync="detailVisible"
      @close="detailVisible = false"
      :close-on-click-modal="false"
      width="40%"
      class="detail-dialog"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="法规标题">{{form.strName}}</el-form-item>
        <el-form-item label="发布文号">{{form.strNumber}}</el-form-item>
        <el-form-item label="发布机关">{{form.strOrgan}}</el-form-item>
        <el-form-item label="法规效力">{{form.drawerName}}</el-form-item>
        <el-form-item label="网站链接">{{form.webLink}}</el-form-item>
        <el-form-item label="行业类型">{{form.industryType}}</el-form-item>
        <el-form-item label="发布时间">{{form.dtmDate}}</el-form-item>
        <el-form-item label="实施时间">{{form.shiDate}}</el-form-item>
        <el-form-item label="时效性">{{form.status===0?"有效":"1无效"}}</el-form-item>
        <el-form-item label="题注">{{form.strNote}}</el-form-item>
      </el-form>
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
      :isPagination="false"
      height="350"
    />
    <approve ref="approveDialog" @handle-data="handleData"></approve>

    <approve ref="approveDialogBatch" @handle-data="handleDataBatch"></approve>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import {
  findBnslaws,
  saveOrUpdate,
  saveOrUpdateBatch,
  findById,
  deleteByIds,
  update,
  updateBatch,
} from "@/api/notice/bnslaw";
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
      multipleSelection: [],
      dialogVisible: false,
      url: "/notice/notice/bnslaw/show",
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
      form: {},
      detailVisible: false,
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
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 点击确定
     */
    handleSubmit(data) {
      data.forEach((item) => {
        item.strId = item.id;
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
      let res = update(data);
      this.$message({ type: "success", message: "操作成功!" });
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
    this.load();
  },
};
</script>
<style lang="scss" scoped>
.images-management {
  .detail-dialog .el-form-item {
    margin-bottom: 0px;
  }
}
</style>

