<template>
  <div>
    <div>
      <el-dialog
        title="参考人员"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="62%"
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
                    @click="currentPage = 1; getJoinMockExamPerson();"
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
                  v-if="isConfig !== '1'"
                  type="primary"
                  icon="el-icon-plus"
                  size="medium"
                  @click="getAddPersonInfo('','1')"
                >添加人员</el-button>
                <el-button
                  v-if="isConfig !== '1'"
                  type="info"
                  icon="el-icon-delete-solid"
                  size="medium"
                  @click="deleteAddPerson"
                >移除人员</el-button>
                <el-button type="primary" icon="el-icon-download" size="medium"  @click="exportTrainPersonList">导出</el-button>
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
            <el-table-column
              prop="sexName"
              label="性别"
              align="center"
              width="58px"
              :formatter="sexFormat"
            ></el-table-column>
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
      <addMockExamPerson ref="addMockExamPersonCompRef" @getExamPerson="getJoinMockExamPerson" />
    </div>
  </div>
</template>
<script>
import addMockExamPerson from "./addMockExamPerson";
import { getTePersonList, deleteExamPerson,exportExamPerson } from '@/api/trained';
import { downLoadFile } from '@/api/joinExam';
export default {
  data() {
    return {
      branchIdsInfo: [{ id: "", name: "全部" }], //执法领域列表
      oidsInfo: [{ id: "", name: "全部" }], //所属机构列表
      stationInfo: [{ id: "", name: "全部" }], //岗位列表
      examPersonForm: {
        teId: "",
        personName: "",
        idNo: "",
        oname: "",
        branchName: "",
        branchId: "",
        stationName: "",
        stationId: "",
        ministerialNo: ""
      },
      isShow: false,
      visible: false,
      errorName: "",
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总数
      tableData: [],
      selectUserIdList: [],
      tableLoading: false,
      isConfig: ''
    };
  },
  components: { addMockExamPerson },
  created(){
    this.getStationInfo();
  },
  methods: {
    showModal(data, type) {
      this.visible = true;
      this.examPersonForm.teId = data.teId;
      this.isConfig = data.isConfig;
      this.tableData.splice(this.tableData.length);
      this.getJoinMockExamPerson();
    },
    // 获取岗位下拉选项
    getStationInfo(){
      if(this.stationInfo.length > 1){ return }
      this.$store.dispatch("findStation","").then(
      res=>{
        if(res.code===200){
          this.stationInfo = res.data;
          this.stationInfo.unshift({ id: "", name: "全部" });
        }
      },err => {
          console.log(err);
        }
      ).catch(()=>{});
    },
    // 新增人员
    getAddPersonInfo() {
      this.$refs.addMockExamPersonCompRef.showModal(this.examPersonForm.teId);
    },
    // 移除人员
    deleteAddPerson() {
      if (
        this.selectUserIdList == undefined ||
        this.selectUserIdList.length == 0
      ) {
        this.$message({ type: "warning", message: "请选择一条考生信息" });
      } else if (this.selectUserIdList.length > 1) {
        this.$message({ type: "warning", message: "只能选择一条考生信息" });
      } else {
        this.$confirm("确认移除吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          iconClass: "custom-question",
          customClass: "custom-confirm"
        })
          .then(() => {
            deleteExamPerson(this.selectUserIdList[0]).then(
              res => {
                if (res.code === 200) {
                  this.$message({ type: "success", message: "移除成功!" });
                  //重新加载页面数据
                  this.getJoinMockExamPerson();
                }
              },
              err => {
                this.$message({ type: "error", message: err.msg || "" });
              }
            );
          })
          .catch(() => {});
      }
    },
    // 点击下拉框的时候获取下拉框数据
    getDepatements(name, codeName) {
      if(this[codeName].length > 1){ return }
      this.$store.dispatch("findAllDrawerByName", name).then(
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
    // 查询参考考生列表
    getJoinMockExamPerson() {
      let data = {
        teId: this.examPersonForm.teId,
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
      this.tableLoading = true;
      getTePersonList(data).then(res => {
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
    resetLog() {
      this.$refs["examPersonFormRef"].resetFields();
      this.currentPage = 1;
      this.getJoinMockExamPerson();
    },
    closeDialog() {
      this.visible = false;
      this.tableData.splice(0, this.tableData.length);
      this.$refs["examPersonFormRef"].resetFields();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getJoinMockExamPerson();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getJoinMockExamPerson();
    },
    // 获取选中的user
    selectUser(val) {
      this.selectUserIdList = val.map(item => item.teperId);
    },
    // 页面列表，性别翻译
    sexFormat(row) {
      if (row.sex === '0') {
        return '男'
      } else if (row.sex === '1') {
        return '女'
      } 
    },
     //导出参考人员
    exportTrainPersonList(){
       let data = { teId: this.examPersonForm.teId};
      const loading = this.$loading({
        lock: true,
        text: '正在导出',
        spinner: 'car-loading',
        customClass: 'loading-box',
        background: 'rgba(234,237,244, 0.8)'
      });
       exportExamPerson(data).then(res => {
        loading.close()
        downLoadFile(res.data, res.fileName);
      }, err => {
        loading.close();
        this.$message({ type: 'error', message: err.msg || '' });
      });
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
      height: 32px;
      line-height: 32px;
    }
    >>> .el-select {
      margin-right: 0;
    }
  }
  .person-table {
    >>> .el-table__body-wrapper {
      padding-bottom: 0;
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