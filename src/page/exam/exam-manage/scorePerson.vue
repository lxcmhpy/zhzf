<template>
  <div>
    <div>
      <el-dialog
        :title="dialogtitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="61%"
        class="exam-person-dialog"
      >
        <el-form
          class="search-form"
          :model="examPersonForm"
          ref="examPersonFormRef"
          label-position="right"
          label-width="80px"
          :inline="true"
        >
          <div>
            <el-row>
              <el-form-item label="姓名" prop="scorerName" class-form="form-class">
                <el-input v-model="examPersonForm.scorerName"></el-input>
              </el-form-item>
              <el-form-item label="身份证号" prop="scorerIdno" class-form="form-class">
                <el-input v-model="examPersonForm.scorerIdno"></el-input>
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
            <el-row>
              <el-form-item>
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  size="medium"
                  @click="getAddPersonInfo('','1')"
                >新增人员</el-button>
                <el-button
                  style="background-color:#4aafa7;color:white"
                  icon="el-icon-delete-solid"
                  size="medium"
                  @click="deleteAddPerson"
                >移除人员</el-button>
              </el-form-item>
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
            <el-table-column type="selection" label align="center" width="40px"></el-table-column>
            <el-table-column prop="scorerName" label="姓名" align="left" min-width="100px"></el-table-column>
            <el-table-column prop="scorerIdno" label="身份证号" align="center" width="174px"></el-table-column>
            <!-- <el-table-column prop="password" label="登录密码" align="center"></el-table-column> -->
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
      </el-dialog>
    </div>
    <div>
      <addScorePerson ref="addScorePersonCompRef" @getExamPersonInfo="getPageAllInfo"></addScorePerson>
    </div>
  </div>
</template>
<script>
import { mixinPerson } from "@/common/js/personComm";
import addScorePerson from "./addScorePerson";
export default {
  mixins: [mixinPerson],
  data() {
    return {
      examPersonForm: {
        examId: "",
        scorerIdno: "",
        scorerName: "",
      },
      visible: false,
      dialogtitle: "",
      errorName: "",
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总数
      tableData: [],
      selectUserIdList:'',
    };
  },
  components: {
    addScorePerson
  },
  methods: {
    showModal(data, type) {
      let _this = this;
      _this.visible = true;
      _this.dialogtitle = "评分人员";
      console.info(JSON.stringify(data));
      _this.examPersonForm.examId = data.examId;
      this.getPageAllInfo();
    },
    getAddPersonInfo(type,data) {
      //新增人员
      this.$refs.addScorePersonCompRef.showModal("1", this.examPersonForm);
    },
      //移除人员
    deleteAddPerson() {
      let _this = this;
      if ( _this.selectUserIdList == '') {
        _this.$message({
          type: "warning",
          message: "请选择一条考生信息"
        });
      } else {
         let edsIds = _this.selectUserIdList;
        let data = {
          edsIds: edsIds
        };
        _this
          .$confirm("确认移除吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            iconClass: "el-icon-question",
            customClass: "custom-confirm"
          })
          .then(() => {
            _this.$store.dispatch("deleteExamDisScorerByIds", data).then(
              res => {
                if (res.code === 200) {
                  _this.$message({ type: "success", message: "移除成功!" });
                  //重新加载页面数据
                  _this.getPageAllInfo();
                }
              },
              err => {
                // _this.$message({ type: "error", message: err.msg || "" });
              }
            );
          })
          .catch(() => {});

      }
    
    },
    getPageAllInfo() {
      //查询参考考生列表
      let _this = this;
      let data = {
        examId: _this.examPersonForm.examId,
        scorerName: _this.examPersonForm.scorerName,
        scorerIdno: _this.examPersonForm.scorescorerIdnorName,
        current: _this.currentPage,
        size: _this.pageSize
      };
      _this.getPageList("getDisScorerList", data);
    },
    resetLog() {
      this.$refs["examPersonFormRef"].resetFields();
      this.currentPage = 1;
      this.getPageAllInfo();
    },
    closeDialog() {
      let _this = this;
      _this.visible = false;
      _this.$refs["examPersonFormRef"].resetFields();
      _this.errorName = false;
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
      //获取选中的user
      selectUser(val) {
      let _this = this;
      let list = "";
      _this.selectUserIdList = '';
        val.forEach((item, index) => {
          if(list == ''){
              list = item.edsId;
          }else{
             list =  list+","+item.edsId;
          }
        });
        _this.selectUserIdList = list;
    },
  }
};
</script>
<style lang="scss" scoped>
.exam-person-dialog{
  >>>.el-dialog{
    min-width: 976px;
    max-width: 1016px;
  }
  >>>.el-dialog__body{
    padding-bottom: 10px;
  }
  .paginationBox{
    margin-top: 10px;
    text-align: center;
    >>>.el-input__inner{
      height: 28px;
      line-height: 28px;
    }
  }
}
.search-form{
  >>>.el-form-item{
    margin-bottom: 10px;
  }
  >>>.el-input__inner{
    width: 176px;
  }
}
</style>