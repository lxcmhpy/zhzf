<template>
  <el-dialog
    class="exam-page-dialog"
    :title="dialogtitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
  >
    <div class="item">
      <el-form
        :model="addPageForm"
        ref="addPageFormRef"
        label-position="right"
        label-width="100px;"
        :inline="true"
      >
        <el-row>
          <el-form-item label="试卷名称" prop="pageName" class-form="form-class">
            <el-input v-model="addPageForm.pageName" placeholder="请输入试卷名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              title="搜素"
              class="commonBtn searchBtn"
              size="medium"
              icon="iconfont law-sousuo"
              @click="currentPage = 1;getPageAllInfo();"
            ></el-button>
            <el-button
              title="重置"
              class="commonBtn searchBtn"
              size="medium"
              icon="iconfont law-zhongzhi"
              @click="resetLog"
            ></el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <div>
        <el-table
          :data="tableData"
          resizable
          stripe
          style="width:100%"
          v-loading="tableLoading"
          element-loading-spinner="car-loading"
          element-loading-text="加载中..."
          :max-height="380"
        >
          <el-table-column prop="pageName" label="试卷名称" min-width="180px" align="left"></el-table-column>
          <el-table-column prop="pageTypeName" label="试卷类型" width="120px" align="center"></el-table-column>
          <el-table-column prop="score" label="试卷总分" width="100px" align="center"></el-table-column>
          <el-table-column prop="createName" label="出题人" width="150px" align="center"></el-table-column>
          <el-table-column prop="oname" label="出题机构" width="150px" align="center"></el-table-column>
          <!-- <el-table-column prop="verifyStatus" label="审核状态" align="center"></el-table-column> -->
          <el-table-column prop="opt" label="操作" align="center" width="220px">
            <template slot-scope="scope">
              <el-button type="text" @click="viewPage(scope.row)">预览</el-button>
              <el-button
                v-if="scope.row.isSelected == '1'"
                type="text"
                @click="selectPage(scope.row)"
              >选择试卷</el-button>
              <el-button v-if="scope.row.isSelected == '0'" type="text" :disabled="true">当前选择试卷</el-button>
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
          :page-sizes="[10, 20, 30, 40, 50]"
          layout="prev, pager, next,sizes,jumper"
          :total="totalPage"
        ></el-pagination>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { mixinPerson } from "@/common/js/personComm";
export default {
  mixins: [mixinPerson],
  data() {
    return {
      addPageForm: {
        pageName: "",
        examId: ""
      },
      visible: false,
      dialogtitle: "",
      errorName: "",
      tableDate: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0 //总数
    };
  },
  methods: {
    getExamBatchList() {},
    showModal(type, row) {
      let _this = this;
      _this.visible = true;
      _this.dialogtitle = "试卷选择";
      _this.addPageForm.examId = row.examId;
      this.getPageAllInfo();
    },
    viewPage(row) {
      //预览
      let _this = this;
      _this.$store.commit("setPersonInfo", "", "");
      _this.$router.replace({
        name: "viewApplayDetail",
        params: {
          pageId: row.pageId,
          name: row.pageName,
          type: "view"
        }
      });
    },
    selectPage(row) {
      //选择试卷
      let _this = this;
      let data = {
        examId: _this.addPageForm.examId,
        examNo: row.pageId
      };
      _this.$store.dispatch("disPapers", data).then(res => {
        if (res.code == "200") {
          this.$message({ type: "success", message: "选择成功！" });
          this.getPageAllInfo();
        } else {
          this.$message({ type: "error", message: "选择失败！" });
        }
        err => {
          console.log(err);
        };
      });
    },
    getPageAllInfo() {
      //查询试卷列表
      let _this = this;
      let data = {
        pageName: _this.addPageForm.pageName,
        examId: _this.addPageForm.examId,
        current: _this.currentPage,
        size: _this.pageSize
      };
      _this.getPageList("getPageList", data);
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPageAllInfo();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPageAllInfo();
    },
    resetLog() {
      let _this = this;
      _this.$refs["addPageFormRef"].resetFields();
    },
    closeDialog() {
      let _this = this;
      _this.visible = false;
      _this.$refs["addPageFormRef"].resetFields();
      _this.errorName = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.exam-page-dialog {
  >>> .el-dialog {
    min-width: 976px;
    max-width: 1064px;
  }
  >>> .el-dialog__body {
    padding-bottom: 20px;
  }
  .paginationBox {
    margin-top: 10px;
    text-align: center;
    >>> .el-input__inner {
      height: 28px;
      line-height: 28px;
    }
  }
}
</style>