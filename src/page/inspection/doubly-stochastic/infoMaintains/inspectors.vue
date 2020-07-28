<template>
  <div class="height100">
    <div style="width:calc(50% - 20px);" class="height100 inspector-left">
      <div class="handlePart">
        <div class="search toggleBox search-mini">
          <div class="handlePart caseHandleSearchPart" :class="isShow?'autoHeight':'aaa'">
            <el-form :inline="true" :model="searchForm" class ref="searchForm">
              <el-form-item>
                执法人员库
              </el-form-item>
              <el-form-item label="姓名：" prop='otherUser'>
                <el-input v-model="searchForm.otherUser"></el-input>
              </el-form-item>
              <el-form-item label="在岗情况：" prop='otherUser'>
                <el-select v-model="searchForm.otherUser" placeholder="请选择">
                  <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button size="medium" title="搜索" icon="iconfont law-sousuo" @click="searchTableData()"></el-button>
                <el-button size="medium" type="primary" @click="resetSearchData('searchForm')">导出所有人员</el-button>
              </el-form-item>
            </el-form>
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
          <el-table-column prop="" label="编制" align="center"></el-table-column>
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
      <publicInspectors></publicInspectors>
    </div>

  </div>
</template>
<script>
import { findRecordListApi, getAllPersonApi } from "@/api/inspection";
// import { getAllPersonApi, } from "@/api/person";
import iLocalStroage from "@/common/js/localStroage";
import publicInspectors from './publicInspectors.vue';
import { mixinPerson } from "@/common/js/personComm";
import { getDictListDetailByNameApi, } from "@/api/system";
export default {
  mixins: [mixinPerson],
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
      options:[]
    }
  },
  methods: {
    // 查询列表时
    getTableData() {
      let data = {
        oName: iLocalStroage.gets("userInfo").organName,
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
    // 查询
    searchTableData() {
      this.currentPage = 1;
      this.getTableData()
    },

    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getTableData();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData();
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
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       
    //     } else {
    //       console.log('error submit!!');
    //       return false;
    //     }
    //   });
    // }, 
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    addMethod() {
      this.dialogFormVisible = true
    },
    editMethod() { },
    delMethod() {
      this.$confirm('确认删除？', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {

      })
    },
    exportMethod() { },
    importModle() { },
    downloadModle() { },
    getDrawerList(data) {
      let _this=this
      getDictListDetailByNameApi(data).then(
        res => {
          _this.options = res.data
        },
        error => {
          // reject(error);
        })
    },
    copyMethod(){
      console.log(this.multipleSelection)
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