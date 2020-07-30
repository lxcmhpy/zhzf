<template>
  <el-dialog
    class="exam-page-dialog"
    title="培训机构选择"
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
          <el-form-item label="机构名称" prop="toName" class-form="form-class">
            <el-input v-model="addPageForm.toName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              title="搜素"
              class="commonBtn searchBtn"
              size="medium"
              icon="iconfont law-sousuo"
              @click="currentPage = 1; getOrganization();"
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
          <el-table-column prop="toName" label="机构名称" min-width="180px" align="left"></el-table-column>
          <el-table-column prop="toComment" label="机构简介" min-width="160px" align="left"></el-table-column>
          <el-table-column prop="contact" label="联系人" width="120px" align="center"></el-table-column>
          <el-table-column prop="contactNo" label="联系电话" width="150px" align="center"></el-table-column>
          <el-table-column prop="opt" label="操作" align="center" width="140px">
            <template slot-scope="scope">
              <el-button v-if="scope.row.isSelected == '0'" type="text" :disabled="true">当前选择机构</el-button>
              <el-button
                v-else
                type="text"
                @click="selectedOrganization(scope.row)"
              >选择机构</el-button>
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
import { getTrainedOrganList, selectedTrainOrgan } from '@/api/trained';

export default {
  data() {
    return {
      addPageForm: { toName: ""},
      visible: false,
      trainId: '',
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总数
      tableLoading: false,
      reloadParent: false
    };
  },
  methods: {
    showModal(row) {
      this.visible = true;
      this.trainId = row.trainId;
      this.dialogtitle = "机构选择";
      this.getOrganization();
    },
    // 选择机构
    selectedOrganization(row) {
      let data = {
        toId: row.toId,
        trainId: this.trainId
      };
      selectedTrainOrgan(data).then(res => {
        if (res.code == "200") {
          this.$message({ type: "success", message: "选择成功！" });
          this.getOrganization();
          this.reloadParent = true;
        } else {
          this.$message({ type: "error", message: "选择失败！" });
        }
      }, err => {
        this.$message({ type: 'warning', message: err.msg || '' });
      });
    },
    // 查询机构列表
    getOrganization() {
      let data = {
        toName: this.addPageForm.toName,
        trainId: this.trainId,
        current: this.currentPage,
        size: this.pageSize
      };
      this.tableLoading = true;
      getTrainedOrganList(data).then(res => {
        this.tableLoading = false;
        if(res.code === 200){
          this.tableData = res.data.records;
          this.totalPage = res.data.total;
        }
      }, err => {
        this.tableLoading = false;
        this.$message({ type: 'error', message: err.msg || '' });
      })
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getOrganization();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getOrganization();
    },
    resetLog() {
      this.$refs["addPageFormRef"].resetFields();
      this.currentPage = 1;
      this.getOrganization();
    },
    closeDialog() {
      this.visible = false;
      this.reloadParent && this.$emit('getbatchManage');
      this.$refs["addPageFormRef"].resetFields();
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
      height: 32px;
      line-height: 32px;
    }
  }
}
</style>