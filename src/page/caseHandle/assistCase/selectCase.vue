<template>
  <!-- 选择案件 -->
  <div class="com_searchAndpageBoxPadding">
    <div :class="hideSomeSearch ? 'searchAndpageBox' : 'searchAndpageBox searchAndpageBox2'">
      <div>
        <el-form :model="searchCaseForm" @submit.native.prevent>
          <el-row>
            <el-col :span="9">
              <el-form-item style="width:520px">
                <el-input
                  v-model="searchCaseForm.caseNumber"
                  @keyup.enter.native="searchWaitHandleCase"
                  placeholder="请输入协查案件的案号"
                >
                  <el-button slot="append" icon="el-icon-search" @click="searchWaitHandleCase"></el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="6" v-bind:class="{ disabled_btn:nextStepFlag?false:true }">
              <el-button
                type="primary"
                class="next_btn"
                size="small"
                :disabled="!nextStepFlag"
                @click="nextStep"
              >下一步</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="tablePart_select">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          highlight-current-row
          @current-change="chexkCase"
          height="100%"
        >
          <el-table-column prop="caseNumber" label="案号" align="center" width="200"></el-table-column>
          <el-table-column label="当事人/单位" align="center" width="150">
            <template slot-scope="scope">{{ scope.row.party || scope.row.partyName }}</template>
          </el-table-column>
          <el-table-column prop="vehicleShipId" label="车/船号" align="center" width="100"></el-table-column>
          <el-table-column prop="caseCauseName" label="违法行为" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" placement="top-start">
                <div slot="content" style="max-width:200px">{{scope.row.caseCauseName}}</div>
                <span>{{scope.row.caseCauseName}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="acceptTime" label="受案时间" align="center" width="150"></el-table-column>
          <el-table-column prop="caseType" label="案件类型" align="center" width="160"></el-table-column>
          <el-table-column prop="currentLinkName" label="当前环节" align="center" width="160">
            <template slot-scope="scope">{{scope.row.currentLinkName}}</template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox" v-if="tableData.length > 0">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          background
          :page-sizes="[10, 20, 30, 40]"
          layout="prev, pager, next,sizes,jumper"
          :total="total"
        ></el-pagination>
      </div>
      <caseRegisterDiag ref="caseRegisterDiagRef"></caseRegisterDiag>
    </div>
  </div>
</template>
<script>
import caseListSearch from "@/components/caseListSearch/caseListSearch";
import caseRegisterDiag from "../../caseHandle/unRecordCase/caseRegisterDiag";
import iLocalStroage from "@/common/js/localStroage";
import { getSelectCaseList } from "@/api/caseHandle";

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总页数
      hideSomeSearch: true,
      searchCaseForm: {
        caseNumber: "",
      },
      nextStepFlag: false,
      caseData: {},
    };
  },
  components: {
    caseListSearch,
    caseRegisterDiag,
  },
  created(){
    this.getWaitHandleCase();
  },
  methods: {
    //获取本机构全部的【待办理】（已立案、未结案的）的案件
    getWaitHandleCase() {
      const queryData = Object.assign(this.searchCaseForm, {
        current: this.currentPage,
        size: this.pageSize,
      });
      getSelectCaseList(queryData).then(res => {
        if(res.code === 200){
          this.tableData = res.data.records;
          this.total = res.data.total;
        }
      }, err => {
        console.log(err);
      })
    },
    // 精确查询案件
    searchWaitHandleCase() {
      this.currentPage = 1;
      this.getWaitHandleCase();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getWaitHandleCase({});
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getWaitHandleCase({});
    },
    // 下一步
    nextStep() {
      this.$emit('selectedCase', this.caseData);
      this.$emit('nextStep', 1);
    },
    chexkCase(caseData) {
      this.caseData = caseData;
      this.nextStepFlag = true;
    },
  }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/index.scss"></style>
