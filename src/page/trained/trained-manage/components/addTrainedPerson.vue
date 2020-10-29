<template>
  <el-dialog
    title="添加人员"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="60%"
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
        <div class="item">
          <el-form-item label="姓名" prop="personName" class-form="form-class">
            <el-input v-model="addExamPersonForm.personName" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="idNo" class-form="form-class">
            <el-input v-model="addExamPersonForm.idNo" placeholder="身份证号"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              title="搜素"
              class="commonBtn searchBtn"
              size="medium"
              icon="iconfont law-sousuo"
              @click="currentPage = 1;getPersonAllInfo();"
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
            <el-input v-model="addExamPersonForm.oname" placeholder="所属机构"></el-input>
          </el-form-item>
          <el-form-item label="执法领域" prop="branchId">
            <el-select
              v-model="addExamPersonForm.branchId"
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
              v-model="addExamPersonForm.stationId"
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
            <el-input v-model="addExamPersonForm.ministerialNo" placeholder="执法证号"></el-input>
          </el-form-item>
        </div>
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
      >
        <el-table-column type="selection" width="40" align="center"></el-table-column>
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
        <el-table-column prop="branchName" label="执法领域" min-width="120px" align="left"></el-table-column>
      </el-table>
    </div>
    <div class="paginationBox">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        background
        :page-sizes="[10, 20, 50, 100]"
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
import { getAllBatchPersonList, addBatchPerson } from '@/api/trained';
export default {
  data() {
    return {
      branchIdsInfo: [{ id: "", name: "全部" }], //执法领域列表
      oidsInfo: [{ id: "", name: "全部" }], //所属机构列表
      stationInfo: [{ id: "", name: "全部" }], //岗位列表
      addExamPersonForm: {
        trainId: "",
        personName: "",
        idNo: "",
        oname: "",
        oid: "",
        branchId: "",
        stationName: "",
        stationId: "",
        ministerialNo: ""
      },
      isShow: false,
      handleType: "",
      visible: false,
      errorName: "",
      selectUserIdList: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总数
      tableData: [],
      tableLoading: false
    };
  },
  methods: {
    //点击下拉框的时候后头获取下拉框数据
    getDepatements(name, codeName) {
      if(this[codeName].length > 1) { return }
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
    submit() {
      const loading = this.$loading({
        lock: true,
        text: "正在保存",
        spinner: "car-loading",
        customClass: "loading-box",
        background: "rgba(234,237,244, 0.8)"
      });
        //添加参考人员
        let data = {
          trainId: this.addExamPersonForm.trainId,
          selectedPersonIds: this.selectUserIdList.join(',')
        };
        let data1 = {
          examPerson: JSON.stringify(data)
        };
        addBatchPerson(data1).then(
          res => {
            loading.close();
            if (res.code == 200) {
              this.$emit("getExamPersonInfo");
              this.closeDialog();
            }
          },
          err => {
            loading.close();
            // this.$message({ type: "error", message: err.msg || "" });
          }
        );
    },
    //获取选中的user
    selectUser(val) {
      this.selectUserIdList = val.map(item => item.personId);
    },
    showModal(trainId) {
      this.visible = true;
      this.currentPage = 1;
      this.addExamPersonForm.trainId = trainId;
      this.getPersonAllInfo();
    },
    // 查询未分配考生
    getPersonAllInfo() {
      let data = {
        trainId: this.addExamPersonForm.trainId,
        personName: this.addExamPersonForm.personName,
        idNo: this.addExamPersonForm.idNo,
        oName: this.addExamPersonForm.oname,
        branchId: this.addExamPersonForm.branchId,
        oid: this.addExamPersonForm.oid,
        stationName: this.addExamPersonForm.stationName,
        ministerialNo: this.addExamPersonForm.ministerialNo,
        current: this.currentPage,
        size: this.pageSize
      };
      this.tableLoading = true;
      getAllBatchPersonList(data).then(res => {
        this.tableLoading = false;
        if(res.code === 200){
          this.tableData = res.data.records;
          this.totalPage = res.data.total;
        }
      }, err => {
        this.tableLoading = false;
        // this.$message({ type: 'error', message: err.msg || '' });
      });
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPersonAllInfo();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPersonAllInfo();
    },
    resetLog() {
      this.$refs["addExamPersonFormRef"].resetFields();
      this.currentPage = 1;
      this.getPersonAllInfo();
    },
    closeDialog() {
      this.visible = false;
      this.$refs["addExamPersonFormRef"].resetFields();
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
  .person-table {
    >>> .el-table__body-wrapper {
      padding-bottom: 0;
    }
    >>>.el-checkbox{
      display: block;
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