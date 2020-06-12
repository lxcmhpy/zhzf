<template>
  <el-dialog
    :title="dialogtitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="61%"
    class="exam-person-dialog fullscreen"
    append-to-body
  >
    <el-form
      class="search-form"
      :model="addExamPersonForm"
      ref="addExamPersonFormRef"
      label-position="right"
      label-width="80px"
      :inline="true"
    >
      <div>
        <el-row>
          <el-form-item label="姓名" prop="scorerName" class-form="form-class">
            <el-input v-model="addExamPersonForm.scorerName"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="scorerIdno" class-form="form-class">
            <el-input v-model="addExamPersonForm.scorerIdno"></el-input>
          </el-form-item>
            <el-button
              title="搜素"
              class="commonBtn searchBtn"
              size="medium"
              icon="iconfont law-sousuo"
              @click="currentPage = 1;selectPersonList();"
            ></el-button>
            <el-button
              title="重置"
              class="commonBtn searchBtn"
              size="medium"
              icon="iconfont law-zhongzhi"
              @click="resetLog"
            ></el-button>
        </el-row>
      </div>
    </el-form>
    <div>
      <el-table
        :data="tableData"
        resizable
        stripe
        style="width:100%"
        @selection-change="selectUser"
        v-loading="tableLoading"
        element-loading-spinner="car-loading"
        element-loading-text="加载中..."
        :max-height="280"
      >
        <el-table-column type="selection" width="40" align="center"></el-table-column>
        <el-table-column prop="scorerName" label="姓名" align="left" min-width="100px"></el-table-column>
        <el-table-column prop="scorerIdno" label="身份证号" align="center" width="174px"></el-table-column>
        <el-table-column prop="password" label="登录密码" align="center"></el-table-column>
        <el-table-column prop="scorerOrg" label="所属单位" align="center" min-width="80px"></el-table-column>
        <el-table-column prop="scorerPro" label="省份" align="center" min-width="80px"></el-table-column>
        <el-table-column prop="scorerPhone" label="联系电话" min-width="100px" align="center"></el-table-column>
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
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mixinPerson } from "@/common/js/personComm";
export default {
  mixins: [mixinPerson],
  data() {
    return {
      addExamPersonForm: {
        roomId: "",
        examId: "",
        scorerName: "",
        scorerIdno: "",
        oname: "",
        oid: "",
        branchName: "",
        stationName: "",
        ministerialNo: ""
      },
      handleType: "",
      visible: false,
      dialogtitle: "",
      errorName: "",
      selectUserIdList: '',
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总数
      tableData: []
    };
  },
  methods: {
    submit() {
      let _this = this;
        let data = {
          examId: _this.addExamPersonForm.examId,
          socrerIds: _this.selectUserIdList
        };
        console.info("aa"+JSON.stringify(data))
        _this.$store.dispatch("addExamDisScorer", data).then(res => {
          if (res.code == "200") {
            this.$emit("getExamPersonInfo");
            _this.closeDialog();
          }
          err => {
            console.log(err);
          };
        });
  
    },
    //获取选中的user
    selectUser(val) {
      let _this = this;
      let list = "";
      _this.selectUserIdList = '';
        val.forEach((item, index) => {
          if(list == ''){
              list = item.scorerId;
          }else{
             list =  list+","+item.scorerId;
          }
        });
        _this.selectUserIdList = list;
    },
    showModal(type, data) {
      let _this = this;
      _this.visible = true;
      _this.handleType = type;
      _this.addExamPersonForm.examId = data.examId;
      _this.addExamPersonForm.roomId = data.roomId;
        _this.dialogtitle = "新增评分人";
        _this.getPersonNoRooom();
   

      //_this.addExamPersonForm = data;
    },
    //搜索
    selectPersonList(){
      let _this = this;
         _this.getPersonNoRooom();
    },
    //查询未分配考生
    getPersonAllInfo() {
      let _this = this;
      let data = {
        examId: _this.addExamPersonForm.examId,
        personName: _this.addExamPersonForm.personName,
        idNo: _this.addExamPersonForm.idNo,
        oname: _this.addExamPersonForm.oname,
        branchName: _this.addExamPersonForm.branchName,
        oid: _this.addExamPersonForm.oid,
        stationName: _this.addExamPersonForm.stationName,
        ministerialNo: _this.addExamPersonForm.ministerialNo,
        current: _this.currentPage,
        size: _this.pageSize
      };
      _this.getPageList("getUnSelectedPerson", data);
    },
    //查询未分配的评分人
    getPersonNoRooom() {
      let _this = this;
      let data = {
        examId: _this.addExamPersonForm.examId,
        current: _this.currentPage,
        size: _this.pageSize
      };
      _this.getPageList("getUnDisScorerList", data);
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPersonNoRooom();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPersonNoRooom();
    },
    resetLog() {
      this.$refs["addExamPersonFormRef"].resetFields();
    },
    closeDialog() {
      let _this = this;
      _this.visible = false;
      _this.$refs["addExamPersonFormRef"].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.exam-person-dialog {
  >>> .el-dialog {
    min-width: 976px;
    max-width: 1016px;
  }
  >>> .el-dialog__body {
    padding-bottom: 10px;
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
.search-form {
  >>> .el-form-item {
    margin-bottom: 10px;
  }
  >>> .el-input__inner {
    width: 176px;
  }
}
</style>