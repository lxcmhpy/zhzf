<template>
  <div class="height100">
    <div style="width:calc(50% - 20px);" class="height100 inspector-left">
      <div class="handlePart">
        <div class="search toggleBox search-mini">
          <div class="handlePart caseHandleSearchPart" :class="isShow?'autoHeight':'aaa'" style="margin:0;height:calc(100% - 125px)">
            <el-form :inline="true" :model="searchForm" class ref="searchForm">
              <el-form-item>
                执法人员库
              </el-form-item>
              <el-form-item label="姓名" prop='personName'>
                <el-input v-model="searchForm.personName"></el-input>
              </el-form-item>
              <el-form-item label="在岗情况" prop='stationStatusName'>
                <el-select v-model="searchForm.stationStatusName" placeholder="请选择">
                  <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
              </el-form-item>
            </el-form>
            <div class="search-btns">
              <el-button size="medium" title="搜索" icon="iconfont law-sousuo" @click="searchTableData()"></el-button>
              <el-button size="medium" :title="isShow? '点击收缩':'点击展开'" :icon="isShow? 'iconfont law-top': 'iconfont law-down'" @click="isShow = !isShow">
              </el-button>
              <el-button size="medium" type="primary" @click="resetSearchData('searchForm')">导出所有人员</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" height="100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="personName" label="姓名" align="center"></el-table-column>
          <el-table-column prop="sex" label="性别" align="center" :formatter="sexFormat"></el-table-column>
          <el-table-column prop="stationName" label="岗位" align="center"></el-table-column>
          <el-table-column prop="stationStatusName" label="状态" align="center"></el-table-column>
          <el-table-column prop="staffingName" label="编制" align="center"></el-table-column>
          <el-table-column prop="postName" label="职务" align="center"></el-table-column>
          <el-table-column prop="oname" label="单位" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="paginationBox">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
      </div>
    </div>
    <div class="height100 inspector-left inspector-center">
      <div class="inspection-center-btn" @click="copyMethod">
        <i class="el-icon-d-arrow-right"></i><br>
        复制
      </div>
    </div>
    <div style="width:calc(50% - 20px);" class="height100 inspector-left">
      <publicInspectors @freshFlag='freshFlag'></publicInspectors>
    </div>

  </div>
</template>
<script>
import { findRecordListApi, getAllPersonApi, getDictListDetailByNameApi, addMorePublicPersonApi } from "@/api/inspection";
// import { getAllPersonApi, } from "@/api/person";
import iLocalStroage from "@/common/js/localStroage";
import publicInspectors from './publicInspectors.vue';
import { mixinPerson } from "@/common/js/personComm";
import { mixinInspection } from "@/common/js/inspectionComm";
export default {
  mixins: [mixinPerson, mixinInspection],
  components: {
    publicInspectors,
  },
  data() {
    return {
      tableData: [], //表格数据
      multipleSelection: [],
      searchForm: {
        domain: "",
        status: '',
        createUser: iLocalStroage.gets("userInfo").nickName,
        otherUser: '',
        title: '',
        defaultDisplay: true,
        name: ''
      },
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      isShow: false,
      dialogFormVisible: false,
      addForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '100px',
      rules: {
        pass: [
          { required: true, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, trigger: 'blur' }
        ],
        age: [
          { required: true, trigger: 'blur' }
        ]
      },
      zzmmList: [],
      zcList: [],
      workStatusList: [],
      options: [],
      freshFlag: true,
    }
  },
  methods: {
    // 查询列表时
    getTableData() {
      let data = {
        // oName: iLocalStroage.gets("userInfo").organName,
        personName: this.searchForm.personName,
        // personName: '11',
        stationStatusName: this.searchForm.stationStatusName,
        // stationStatusName: '在岗',
        // oName: '固原综合执法支队',
        current: this.currentPage,
        size: this.pageSize,
      };
      getAllPersonApi(data).then(
        res => {
          console.log(res)
          this.tableData = res.data.records
          this.totalPage = res.data.total
        },
        error => {
          // reject(error);
        })

    },
    // 选择数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log('multipleSelection', this.multipleSelection)
    },

    resetSearchData(formName) {
      this.$refs[formName].resetFields();
      this.searchForm.defaultDisplay = true
      // debugger
      this.getTableData()
    },
    exportMethod() { },
    importModle() { },
    downloadModle() { },
    getDrawerList(data) {
      let _this = this
      getDictListDetailByNameApi(data).then(
        res => {
          _this.options = res.data
        },
        error => {
          // reject(error);
        })
    },
    copyMethod() {
      // 走公开人员的添加接口
      console.log(this.multipleSelection)
      this.$emit("freshFlag", !this.freshFlag);
      addMorePublicPersonApi(this.multipleSelection).then(
        res => {
          if (res.code == 200) {
            this.$message({ type: "success", message: res.msg });
          }
        },
        error => {
          // reject(error);
        })
    }
  },
  mounted() {
    this.getTableData()
    // 获取抽屉
    this.getDrawerList('在岗情况')
  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>
<style lang="scss" src="@/assets/css/searchPage.scss"></style>
<style lang="scss">
.inspector-left {
  float: left;
  border-right: 1px solid #e4e7ed;
  box-sizing: border-box;
}
.inspector-center {
  width: 40px;
  text-align: center;
}
.inspection-center-btn {
  position: relative;
  top: 47%;
  cursor: pointer;
}
</style>