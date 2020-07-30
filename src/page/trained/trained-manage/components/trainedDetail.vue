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
              <el-button type="primary" size="medium" @click="exportExcel('2')">导出</el-button>
            </el-form-item>
          </el-row>
        </el-form>
        <div>
          <el-table
            :data="tableData"
            v-loading="tableLoading"
            element-loading-spinner="car-loading"
            element-loading-text="加载中..."
            :max-height="380"
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
            <el-table-column prop="totalCredit" label="总学分" min-width="100px" align="center"></el-table-column>
            <el-table-column prop="finalResults" label="成绩" min-width="80px" align="center" :formatter="result"></el-table-column>
            <el-table-column label="操作" align="center" width="140px" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" @click="answerDetail(scope.row)">查看详情</el-button>
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
      <trainedReport ref="trainedReport" />
    </div>
  </div>
</template>
<script>
import { getBatchPersonList,exportTrainDetial } from '@/api/trained';
import trainedReport from './trainedReport';
import { downLoadFile } from '@/api/joinExam';
export default {
  data() {
    return {
      branchIdsInfo: [{ id: "", name: "全部" }], //执法领域列表
      examPersonForm: {
        trainId: "",
        examName:"",
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
      tableData: [],
      tableLoading: false,
      totalPage: 0,
      currentPage: 1
    };
  },
  components: { trainedReport },
  methods: {
    //成绩翻译
    result(row, column){
      if(row.finalResults=='0'){
        return "合格"
      }else if(row.finalResults=="1"){
        return "不合格";
      }
    },
    showModal(data) {
      this.visible = true;
      this.examPersonForm.trainId = data.trainId;
      this.dialogtitle = "培训详情";
      this.getPageAllInfo();
    },
      //点击下拉框的时候后头获取下拉框数据
    getDepatements(name, codeName) {
      this.$store.dispatch("findAllDrawerByName", name).then(
        //查询执法领域
        res => {
          if (res.code === 200) {
            this[codeName] = res.data;
            this[codeName].unshift({ id: "", name: "全部" });
          } else {
            console.info("没有查询到数据");
          }
        }
      );
    },
    // 导出文件
    exportExcel(type) {
     let data = { trainId: this.examPersonForm.trainId };
      const loading = this.$loading({
        lock: true,
        text: '正在导出',
        spinner: 'car-loading',
        customClass: 'loading-box',
        background: 'rgba(234,237,244, 0.8)'
      });
       exportTrainDetial  (data).then(res => {
        loading.close()
        downLoadFile(res.data, res.fileName);
      }, err => {
        loading.close();
        this.$message({ type: 'error', message: err.msg || '' });
      });
    },
    // 查询参加培训人员列表
    getPageAllInfo() {
      let data = {
        trainId: this.examPersonForm.trainId,
        personName: this.examPersonForm.personName,
        idNo: this.examPersonForm.idNo,
        oName: this.examPersonForm.oname,
        branchId:this.examPersonForm.branchId,
        current: this.currentPage,
        size: this.pageSize
      };
      this.tableLoading = true;
      getBatchPersonList(data).then(res => {
        this.tableLoading = false;
        if(res.code === 200){
          this.tableData = res.data.records;
          this.totalPage = res.data.total;
        }
      }, err => {
        this.tableLoading = false;
        this.$message({ type: 'error', message: err.msg || '' });
      });
    },
    // 查看培训详情
    answerDetail(row){
      this.$refs.trainedReport.showModal({ trainId: row.trainId, personId: row.personId});
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
      this.$refs["examPersonFormRef"].resetFields();
      this.currentPage = 1;
      this.getPageAllInfo();
    },
    closeDialog() {
      this.visible = false;
      this.$refs["examPersonFormRef"].resetFields();
    },
    // 页面列表，性别翻译
    sexFormat(row) {
      if (row.sex === '0') {
        return '男'
      } else if (row.sex === '1') {
        return '女'
      } 
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
    &::-webkit-scrollbar-track{
      height: 12px;
    }
  }
  >>>.el-table__fixed-body-wrapper{
    bottom: 8px;
  }
  >>>.el-table__fixed-right::before, >>>.el-table__fixed::before{
    display: none;
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