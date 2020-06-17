<template>
  <div>
    <div>
      <el-dialog
        class="exam-page-dialog"
        :title="dialogtitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="68%"
      >
        <el-form
          class="search-form"
          :model="examPersonForm"
          ref="examPersonFormRef"
          label-position="right"
          label-width="80px"
          :inline="true"
        >
           <div class="item">
            <el-form-item label="姓名:" prop="personName" class-form="form-class">
              <el-input v-model="examPersonForm.personName" placeholder="考生姓名"></el-input>
            </el-form-item>
            <el-form-item label="身份证号:" prop="idNo" class-form="form-class">
              <el-input v-model="examPersonForm.idNo" placeholder="身份证号码"></el-input>
            </el-form-item>
            <el-form-item label="所属机构:" prop="oname" class-form="form-class">
              <el-input v-model="examPersonForm.oname" placeholder="所属机构"></el-input>
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
            <el-form-item label="考场名称:" prop="roomId" class-form="form-class">
              <el-input v-model="examPersonForm.roomId" placeholder="考场"></el-input>
            </el-form-item>
            <el-form-item label="执法领域:" prop="branchId">
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
          </div>
          <el-row>
            <el-form-item>
              <el-button type="primary" size="medium" @click="batchExportPrint()">批量打印准考证</el-button>
              <el-button type="primary" size="medium" @click="exportExcel('1')">导出考场核对表</el-button>
              <el-button type="primary" size="medium" @click="exportExcel('2')">导出成绩</el-button>
            </el-form-item>
          </el-row>
        </el-form>
        <div>
          <el-table
            :data="tableData"
            v-loading="tableLoading"
            element-loading-spinner="car-loading"
            element-loading-text="加载中..."
            :max-height="340"
          >
            <el-table-column prop="personName" label="姓名" align="left" fixed="left"></el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              width="60px"
              align="center"
              :formatter="sexFormat"
            ></el-table-column>
            <el-table-column prop="idNo" label="身份证号" width="170px" align="center"></el-table-column>
            <el-table-column prop="oname" label="所属机构" min-width="180px" align="center"></el-table-column>
            <el-table-column prop="postName" label="职务" min-width="80px" align="center"></el-table-column>
            <el-table-column prop="stationName" label="岗位" min-width="100px" align="center"></el-table-column>
            <el-table-column prop="ministerialNo" label="执法证号" min-width="120px" align="center"></el-table-column>
            <el-table-column prop="branchName" label="执法领域" min-width="120px" align="center"></el-table-column>
            <el-table-column prop="roomName" label="考场" min-width="100px" align="center"></el-table-column>
            <el-table-column prop="sumScores" label="成绩" min-width="80px" align="center"></el-table-column>
            <el-table-column label="操作" align="center" width="250px" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" @click="invigilateCard(scope.row)">准考证</el-button>
                <el-button type="text" @click="roomNotes(scope.row)">考场记录</el-button>
                <el-button type="text" @click="answerDetail(scope.row)">答卷详情</el-button>
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
      </el-dialog>
    </div>
    <div>
      <addExamPerson ref="addExamPersonCompRef" @getExamPersonInfo="getPageAllInfo"></addExamPerson>
      <invigilateCard ref="invigilateCardCompRef" @getExamPersonInfo="getPageAllInfo"></invigilateCard>
      <roomNotes ref="roomNotesCompRef" @getExamPersonInfo="getPageAllInfo"></roomNotes>
      <answerReport ref="answerReport" />
    </div>
  </div>
</template>
<script>
import { mixinPerson } from "@/common/js/personComm";
import addExamPerson from "./addExamPerson";
import invigilateCard from "./invigilateCard";
import roomNotes from "./roomNotes";
import { downLoadFile } from '@/api/joinExam';
import answerReport from './answerReport';

export default {
  mixins: [mixinPerson],
  data() {
    return {
      branchIdsInfo: [{ id: "", name: "全部" }], //执法领域列表
      examPersonForm: {
        roomId: "",
        examName:"",
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
      examMsg:{
        examVenues:"",//考试地点
        examName:"",//考试名称
        examBegin:"",//考试开始时间
        examEnd:"",//考试结束时间
      },
       isShow: false,
      visible: false,
      dialogtitle: "",
      errorName: "",
      tableData: []
    };
  },
  components: {
    addExamPerson,
    invigilateCard,
    roomNotes,
    answerReport
  },
  methods: {
    showModal(type, data) {
      let _this = this;
      _this.visible = true;
      _this.dialogtitle = "考试详情";
      _this.examPersonForm.examId = data.examId;
      _this.examMsg.examVenues = data.examVenues;
      _this.examMsg.examName = data.examName;
      _this.examMsg.examBegin = data.examBegin;
      _this.examMsg.examEnd =data.examEnd;
      this.getPageAllInfo();
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
    invigilateCard(row) {
      //准考证
      this.$refs.invigilateCardCompRef.showModal("1",row,this.examMsg);
    },
    roomNotes(row) {
      //考场记录
      this.$refs.roomNotesCompRef.showModal("1",row);
    },
    // 批量打印准考证
    batchExportPrint() {
      console.log('批量打印准考证');
    },
    // 导出文件
    exportExcel(type) {
      let data = { examId: this.examPersonForm.examId };
      let dispatch = 'exportExamPersonInfo';
      if(type == '1'){
        dispatch = 'exportExamPersonInfo'; // 导出考场核对表
      }else if(type == '2'){
        dispatch = 'exporExamtDetailInfo'; // 导出成绩
      }
      const loading = this.$loading({
        lock: true,
        text: '正在导出',
        spinner: 'car-loading',
        customClass: 'loading-box',
        background: 'rgba(234,237,244, 0.8)'
      });
      this.$store.dispatch(dispatch, data).then(res => {
        loading.close()
        downLoadFile(res.data, res.fileName);
      }, err => {
        loading.close();
        this.$message({ type: 'error', message: err.msg || '' });
      });
    },
    getPageAllInfo() {
      //查询参考考生列表
      let _this = this;
      let data = {
        examId: _this.examPersonForm.examId,
        roomId: _this.examPersonForm.roomId,
        branchId:_this.examPersonForm.branchId,
        personName: _this.examPersonForm.personName,
        idNo: _this.examPersonForm.idNo,
        oName: _this.examPersonForm.oname,
        current: _this.currentPage,
        size: _this.pageSize
      };
      _this.getPageList("examDetial", data);
    },
    // 查看考试详情
    answerDetail(row){
      this.$refs.answerReport.showModal({ examId: row.examId, pId: row.examperId, name: row.personName });
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
      _this.$refs["examPersonFormRef"].resetFields();
    },
    closeDialog() {
      let _this = this;
      _this.visible = false;
      _this.$refs["examPersonFormRef"].resetFields();
      _this.errorName = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.exam-page-dialog {
  >>> .el-dialog {
    min-width: 976px;
    // max-width: 1064px;
  }
  >>> .el-dialog__body {
    padding-bottom: 20px;
  }
  >>>.el-table__body-wrapper{
    padding-bottom: 0;
  }
  >>>.el-table--scrollable-x .el-table__body-wrapper{
    &::-webkit-scrollbar{
      height: 12px;
    }
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