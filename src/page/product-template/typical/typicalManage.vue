<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" id="roleBox">
      <div class="handlePart">
        <div class="search">
          <el-form :inline="true" :model="searchForm" ref="searchForm">
            <el-form-item
              label="业务领域"
              prop="zfml">
              <el-select
                v-model="searchForm.zfml"
                placeholder="请选择"
                :loading="selectLoading"
                clearable>
                <el-option
                    v-for="value in branchInfo" :key="value" :label="value" :value="value">
                </el-option>        
              </el-select>
            </el-form-item>
            <el-form-item label="案件类型" prop="caseType">
              <el-select
                  v-model="searchForm.caseType"
                  placeholder="请选择">
                  <el-option
                  v-for="item in caseTypeList"
                  :key="item.id"
                  :label="item.typeName"
                  :value="item.typeName"
                  ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="受案机构" prop="organName">
              <el-select
                  v-model="searchForm.organName"
                  placeholder="请选择">
                  <el-option
                  v-for="item in organList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.label"
                  ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="案由" prop="caseName">
              <el-input
                ref="caseName"
                clearable
                class="w-120"
                v-model="searchForm.caseName"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="getCaseTypes">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-refresh-right" @click="reset">重置</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-plus" @click="addTypical">标记典型案件</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" height="100%">
          <el-table-column prop="caseNumber" label="案件编号" align="center"></el-table-column>
          <el-table-column prop="caseName" label="案由" align="center"></el-table-column>
          <el-table-column prop="zfml" label="业务领域" align="center"></el-table-column>
          <el-table-column prop="caseType" label="案件类型" align="center"></el-table-column>
          <el-table-column prop="party" label="当事人" align="center"></el-table-column>
          <el-table-column prop="punishAmount" label="处罚金额" align="center"></el-table-column>
          <el-table-column prop="closeDate" label="结案时间" align="center"></el-table-column>
          <el-table-column prop="reviews" label="案件点评" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button v-if="scope.row.reviews != ''?false:true" @click="editCaseType(scope.row)" type="text">编辑</el-button>
              <el-button type="text" @click="deleteCaseType(scope.row)">删除</el-button>
              <el-button @click="lookCaseType(scope.row)" type="text">查看</el-button>
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
          :page-sizes="[10, 20, 30, 40]"
          layout="prev, pager, next,sizes,jumper"
          :total="totalPage"
        ></el-pagination>
      </div>
      <updateCaseType ref="updateCaseTypeRef"></updateCaseType>
      <addTypical ref="addTypicalRef"></addTypical>
    </div>
  </div>
</template>
<script>
import {getQueryCaseTypeListApi,findTypicalCaseList,deleteByCaseId} from "@/api/caseHandle";
import iLocalStroage from "@/common/js/localStroage";
import updateCaseType from "./updateCaseType";
import addTypical from "./addTypical";
export default {
  data() {
    return {
      tableData: [], //表格数据
      searchForm: {
        typeName: ""
      },
      organList:[],//受案机构
      selectLoading: false,
      caseTypeList:[],//案件类型
      branchInfo:['公路路政','道路运政','水路运政','航道运政','港口行政','航道行政','海事行政','工程质量安全监督','其他'],//业务领域
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      
    };
  },
  components: {
    updateCaseType,
    addTypical
  },
  inject: ["reload"],
  methods: {
    //查看
    lookCaseType(row) {
      this.$store.commit('setCaseId',row);
      this.$router.push({
        name: "case_handle_typeicalDetail"
      });
      let setCaseNumber = row.caseNumber != '' ? row.caseNumber : '案件'
      this.$store.commit("setCaseNumber", setCaseNumber);
    },
    //编辑
    editCaseType(row) {
      this.$refs.updateCaseTypeRef.showModal(row);
    },
    //新增
    addTypical() {
      this.$refs.addTypicalRef.showModal();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getCaseTypes();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCaseTypes();
    },
    //获取角色
    getCaseTypes() {
      let data = {
        current: this.currentPage,
        size: this.pageSize,
        zfml: this.searchForm.zfml,
        caseType: this.searchForm.caseType,
        organName: this.searchForm.organName,
        caseName: this.searchForm.caseName,
      };
      let _this = this;
      findTypicalCaseList(data).then(
        res => {
          _this.tableData = res.data.records;
          _this.totalPage = res.data.total;
        },
        error => {
          console.log(error)
        }
      )
    },
    //查询所有案件类型
    getQueryCaseTypeList() {
      getQueryCaseTypeListApi().then(
        res => {
          this.caseTypeList = res.data.records;
        },
        error => {
          console.log(error)
        }
      );
    },
    //获取机构
    getAllOrgan() {
      let _this = this
      this.$store.dispatch("getAllOrgan").then(
        res => {
          _this.organList = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    deleteCaseType(row) {
      this.$confirm("是否删除选中案件【案件编号："+row.caseNumber+"】【案由："+row.caseName+"】", "提示",{
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
            deleteByCaseId(row.caseId).then(
              res => {
                this.$message({ type: "success", message: "删除成功!"});
                this.getCaseTypes();
              },
              error => {
                console.log(error)
              }
            );
          })
        .catch(() => {});
    },
    //重置
    reset() {
      this.$refs["searchForm"].resetFields();
      this.getCaseTypes();
    },
  },
  created() {
    this.getCaseTypes();
    this.getQueryCaseTypeList();
    this.getAllOrgan();
  }
};
</script>
