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
            <div class="item">
              <el-form-item label="姓名" prop="personName" class-form="form-class">
                <el-input v-model="examPersonForm.personName" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="身份证号" prop="idNo" class-form="form-class">
                <el-input v-model="examPersonForm.idNo" placeholder="请输入身份证号"></el-input>
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
                <el-button
                  size="medium"
                  class="commonBtn toogleBtn"
                  :title="isShow? '点击收缩':'点击展开'"
                  :icon="isShow? 'iconfont law-top': 'iconfont law-down'"
                  @click="isShow = !isShow"
                ></el-button>
              </el-form-item>
              </div>
               <div class="item" v-show="isShow">
              <el-form-item label="所属机构" prop="oname" class-form="form-class">
                <el-input v-model="examPersonForm.oname" placeholder="请输入所属机构"></el-input>
              </el-form-item>
               <el-form-item label="执法领域" prop="branchId">
                <el-select
                  v-model="examPersonForm.branchId"
                  placeholder="执法领域"
                  remote
                  @focus="getDepatements('执法门类','branchIdsInfo')"
                >
                  <el-option
                    v-for="value in branchIdsInfo"
                    :key="value.id"
                    :label="value.name"
                    :value="value.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="岗位" prop="stationId">
                <el-select
                  v-model="examPersonForm.stationId"
                  placeholder="选择岗位"
                  remote
                  @focus="getStationInfo('人员信息-岗位','stationInfo')"
                >
                  <el-option
                    v-for="value in stationInfo"
                    :key="value.id"
                    :label="value.name"
                    :value="value.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="执法证号" prop="ministerialNo" class-form="form-class">
                <el-input v-model="examPersonForm.ministerialNo" placeholder="请输入执法证号"></el-input>
              </el-form-item>
               </div>
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
        <div class="person-table">
          <el-table
            :data="tableData"
            resizable
            stripe
            style="width:100%"
            @selection-change="selectUser"
            v-loading="tableLoading"
            element-loading-spinner="car-loading"
            element-loading-text="加载中..."
            max-height="320px"
            >
            <el-table-column type="selection" label align="center" width="40px"></el-table-column>
            <el-table-column prop="personName" label="姓名" align="left" min-width="100px"></el-table-column>
            <el-table-column prop="sexName" label="性别" align="center" width="58px" :formatter="sexFormat"></el-table-column>
            <el-table-column prop="idNo" label="身份证号" align="center" width="174px"></el-table-column>
            <el-table-column prop="oname" label="所属机构" align="center"></el-table-column>
            <el-table-column prop="postName" label="职务" align="center" min-width="80px"></el-table-column>
            <el-table-column prop="stationName" label="岗位" align="center" min-width="80px"></el-table-column>
            <el-table-column prop="ministerialNo" label="执法证号" min-width="100px" align="center"></el-table-column>
            <el-table-column prop="branchName" label="执法领域" min-width="120px" align="center"></el-table-column>
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
      <addExamPerson ref="addExamPersonCompRef" @getExamPersonInfo="getPageAllInfo"></addExamPerson>
    </div>
  </div>
</template>
<script>
import { mixinPerson } from "@/common/js/personComm";
import addExamPerson from "./addExamPerson";
export default {
  mixins: [mixinPerson],
  data() {
    return {
      branchIdsInfo: [{ id: "", name: "全部" }], //执法领域列表
      oidsInfo: [{ id: "", name: "全部" }], //所属机构列表
      stationInfo: [{ id: "", name: "全部" }], //岗位列表
      examPersonForm: {
        examId: "",
        personName: "",
        idNo: "",
        oname: "",
        branchName: "",
        branchId: "",
        stationName: "",
        stationId: "",
        ministerialNo: "",
      },
      isShow: false,
      visible: false,
      dialogtitle: "",
      errorName: "",
     currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总数
      tableData: [],
      selectUserIdList:[],
    };
  },
  components: {
    addExamPerson
  },
  methods: {
    showModal(data, type) {
      let _this = this;
      _this.visible = true;
      _this.dialogtitle = "参考人员";
      // _this.examPersonForm = data;
      _this.examPersonForm.examId = data.examId;
      _this.tableData.splice(_this.tableData.length);
      this.getPageAllInfo();
    },
    getAddPersonInfo() {
      //新增人员
      this.$refs.addExamPersonCompRef.showModal("1", this.examPersonForm);
    },
      //移除人员
    deleteAddPerson() {
      let _this = this;
      if (
        _this.selectUserIdList == undefined ||
        _this.selectUserIdList.length == 0
      ) {
        _this.$message({
          type: "warning",
          message: "请选择一条考生信息"
        });
      } else if (_this.selectUserIdList.length > 1) {
        _this.$message({
          type: "warning",
          message: "只能选择一条考生信息"
        });
      } else {
         let examperId = _this.selectUserIdList[0];
        let data = {
          examperId: examperId
        };
        _this
          .$confirm("确认移除吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            iconClass: "el-icon-question",
            customClass: "custom-confirm"
          })
          .then(() => {
            _this.$store.dispatch("removeExamPerson", examperId).then(
              res => {
                if (res.code === 200) {
                  _this.$message({ type: "success", message: "移除成功!" });
                  //重新加载页面数据
                  _this.getPageAllInfo();
                }
              },
              err => {
                _this.$message({ type: "error", message: err.msg || "" });
              }
            );
          })
          .catch(() => {});

      }
    
    },
        //点击下拉框的时候后头获取下拉框数据
    getDepatements(name, codeName) {
      this.$store.dispatch("findAllDrawerByName", name).then(
        //查询执法领域
        res => {
          if (res.code === 200) {
            if (codeName === "branchIdsInfo") {
              this.branchIdsInfo = res.data;
              this.branchIdsInfo.unshift({ id: "", name: "全部" });
            }
            if (codeName === "stationIdsInfo") {
              this.stationIdsInfo = res.data;
              this.stationIdsInfo.unshift({ id: "", name: "全部" });
            }
            if (codeName === "oidsInfo") {
              this.oidsInfo = res.data;
              this.oidsInfo.unshift({ id: "", name: "全部" });
            }
            if (codeName === "stationStatusInfo") {
              this.stationStatusInfo = res.data;
              this.stationStatusInfo.unshift({ id: "", name: "全部" });
            }
          } else {
            console.info("没有查询到数据");
          }
        }
      );
    },
    getPageAllInfo() {
      //查询参考考生列表
      let data = {
        examId: this.examPersonForm.examId,
        personName: this.examPersonForm.personName,
        idNo: this.examPersonForm.idNo,
        oName: this.examPersonForm.oname,
        branchName: this.examPersonForm.branchName,
        branchId: this.examPersonForm.branchId,
        stationName: this.examPersonForm.stationName,
        ministerialNo: this.examPersonForm.ministerialNo,
        stationId: this.examPersonForm.stationId,
        current: this.currentPage,
        size: this.pageSize
      };
      this.getPageList("selectExamPerson", data);
    },
    resetLog() {
      let _this = this;
      _this.$refs["examPersonFormRef"].resetFields();
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
      _this.selectUserIdList = [];
      val.forEach((item, index) => {
        _this.selectUserIdList.push(item.examperId);
      });
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
      height: 32px;
      line-height: 32px;
    }
    >>>.el-select{
      margin-right: 0;;
    }
  }
  .person-table{
    >>>.el-table__body-wrapper{
      padding-bottom: 0;
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