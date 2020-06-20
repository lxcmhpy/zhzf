<template>
  <div>
    <div>
      <el-dialog
        class="exam-page-dialog"
        width="61%"
        :title="dialogtitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
      >
        <el-form
          class="search-form"
          :model="invigilateForm"
          ref="invigilateFormRef"
          label-position="right"
          label-width="80px"
          :inline="true"
        >
          <div>
            <el-row>
              <el-form-item label="姓名" prop="userName" class-form="form-class">
                <el-input v-model="invigilateForm.userName" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="身份证号" prop="idCode" class-form="form-class">
                <el-input v-model="invigilateForm.idCode" placeholder="请输入身份证号"></el-input>
              </el-form-item>
              <el-form-item label="所属机构" prop="company" class-form="form-class">
                <el-input v-model="invigilateForm.company" placeholder="请输入所属机构"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  title="搜素"
                  class="commonBtn searchBtn"
                  size="medium"
                  icon="iconfont law-sousuo"
                  @click="currentPage = 1 ;getInvigilateAllInfo();"
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
            <el-row>
              <el-form-item>
                <el-button type="primary" icon="el-icon-plus" size="medium" @click="exportInfo()">导出</el-button>
              </el-form-item>
            </el-row>
          </div>
        </el-form>
        <div>
          <el-table
            :data="tableData"
            resizable
            stripe
            style="width:98%"
            v-loading="tableLoading"
            element-loading-spinner="car-loading"
            element-loading-text="加载中..."
            :max-height="320"
          >
            <el-table-column prop="roomName" label="考场" align="left" width="100px"></el-table-column>
            <el-table-column prop="loginName" label="监考账号" min-width="120px" align="center"></el-table-column>
            <el-table-column prop="password" label="监考密码" width="100px" align="center"></el-table-column>
            <el-table-column prop="userName" label="姓名" width="120px" align="center"></el-table-column>
            <el-table-column prop="idCode" label="身份证号" min-width="170px" align="center"></el-table-column>
            <el-table-column prop="company" label="所属单位" align="center"></el-table-column>
            <el-table-column prop="telephone" label="联系方式" width="120px" align="center"></el-table-column>
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
      </el-dialog>
    </div>
    <div>
      <addExamPerson ref="addExamPersonCompRef" @getExamPersonInfo="getInvigilateAllInfo"></addExamPerson>
    </div>
  </div>
</template>
<script>
import { mixinPerson } from "@/common/js/personComm";
import addExamPerson from "./addExamPerson";
import { downLoadFile } from '@/api/joinExam';

export default {
  mixins: [mixinPerson],
  data() {
    return {
      invigilateForm: {
        examId: "",
        loginName: "",
        idCode: "",
        company: "",
        userName: "",
        oid: ""
      },
      visible: false,
      dialogtitle: "",
      errorName: "",
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0 //总数
    };
  },
  components: { addExamPerson },
  methods: {
    showModal(row, type) {
      let _this = this;
      _this.visible = true;
      _this.dialogtitle = "监考管理";
      _this.invigilateForm.examId = row.examId;
      this.getInvigilateAllInfo();
    },
    // 导出人员
    exportInfo() {
      let data = {
        examId: this.invigilateForm.examId
      };
      const loading = this.$loading({
        lock: true,
        text: '正在导出',
        spinner: 'car-loading',
        customClass: 'loading-box',
        background: 'rgba(234,237,244, 0.8)'
      });
      this.$store.dispatch('exportInvigilatorInfo', data).then(res => {
        loading.close()
        downLoadFile(res.data, res.fileName);
      }, err => {
        loading.close();
        this.$message({ type: 'error', message: err.msg || '' });
      });
    },
    getInvigilateAllInfo() {
      //查询监考列表
      let _this = this;
      let data = {
        examId: _this.invigilateForm.examId,
        userName: _this.invigilateForm.userName,
        company: _this.invigilateForm.company,
        idCode: _this.invigilateForm.idCode,
        current: _this.currentPage,
        size: _this.pageSize
      };
      _this.getPageList("getInvigilatorPageList", data);
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getInvigilateAllInfo();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getInvigilateAllInfo();
    },
    resetLog() {
      this.$refs["invigilateFormRef"].resetFields();
      this.currentPage = 1 ;
      this.getInvigilateAllInfo();
    },
    closeDialog() {
      let _this = this;
      _this.visible = false;
      _this.$refs["invigilateFormRef"].resetFields();
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
      height: 32px;
      line-height: 32px;
    }
  }
}
.search-form {
  >>> .el-form-item {
    margin-bottom: 10px;
  }
  >>> .el-input__inner {
    width: 176px;
  }
}
</style>