<template>
  <div class="com_searchAndpageBoxPadding">
    <div :class="hideSomeSearch ? 'searchAndpageBox' : 'searchAndpageBox searchAndpageBox2'">
      <div class="step_content">
        <el-steps :active="0" finish-status="success" class="steps">
          <el-step title="选择案件"></el-step>
          <el-step title="移送详情"></el-step>
        </el-steps>
      </div>
      <div class="">
        <el-form :model="formLabelAlign">
          <el-row>
            <el-col :span="9">
              <el-form-item style="width:520px">
                <el-input v-model="formLabelAlign.caseNumber" @keyup.enter.native="getUnRecordCase"
                          placeholder="请输入移送案件的案号">
                  <el-button slot="append" icon="el-icon-search" @click="getUnRecordCase"></el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="6" v-bind:class="{ disabled_btn:nextStepFlag?false:true }">
              <el-button type="primary" class="next_btn" size="small" @click="nextStep" :disabled='!nextStepFlag'>下一步
              </el-button>
            </el-col>
          </el-row>
        </el-form>

      </div>
      <div class="tablePart_select">
        <el-table :data="tableData" stripe style="width: 100%" highlight-current-row @current-change="chexkCase"
                  height="100%">
          <el-table-column prop="caseNumber" label="案号" align="center" width="200">
            <template slot-scope="scope">
              {{scope.row.caseNumber||scope.row.tempNo}}
            </template>
          </el-table-column>
          <el-table-column prop="party" label="当事人" align="center" width="150"></el-table-column>
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
          <el-table-column prop="caseType" label="案件类型" align="center" width="100"></el-table-column>
          <el-table-column prop="caseStatus" label="当前环节" align="center" width="100">
            <template slot-scope="scope">
              {{scope.row.caseStatus === '未立案'?'信息采集':scope.row.caseStatus}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                       background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper"
                       :total="total"></el-pagination>
      </div>
      <caseRegisterDiag ref="caseRegisterDiagRef"></caseRegisterDiag>
    </div>
  </div>
</template>
<script>
  import caseListSearch from "@/components/caseListSearch/caseListSearch";
  import caseRegisterDiag from "../../caseHandle/unRecordCase/caseRegisterDiag";
  import iLocalStroage from "@/common/js/localStroage";
  import {mixinGetCaseApiList} from "@/common/js/mixins";
  import {selectTransferCaseApi} from "@/api/caseHandle";

  export default {
    data() {
      return {
        // caseSearchForm: {
        //   caseId: "",
        //   caseId2: "",
        //   caseId3: "",
        //   caseId4: "",
        //   caseId5: "",
        //   caseId6: ""
        // },
        tableData: [],
        currentPage: 1, //当前页
        pageSize: 10, //pagesize
        total: 0, //总页数
        hideSomeSearch: true,
        formLabelAlign: {
          caseNumber: ''
        },
        nextStepFlag: false,
        caseData: {},
      };
    },
    mixins: [mixinGetCaseApiList],
    components: {
      caseListSearch,
      caseRegisterDiag
    },
    methods: {
      caseRecord() {
        this.$refs.caseRegisterDiagRef.showModal();
        // this.makeRoute('/inforCollect','/inforCollect2','/inforCollect3','inforCollect','inforCollect2','inforCollect3','信息采集','caseHandle/unRecordCase/inforCollection.vue');
      },
      //获取机构下的未立案数据
      getUnRecordCase(searchData) {
        let data = searchData;
        data.caseNumber = this.formLabelAlign.caseNumber
        data.current = this.currentPage;
        data.size = this.pageSize;
        console.log(data);
        selectTransferCaseApi(data).then(
          res => {
            console.log('可移送列表', res)
            this.tableData = res.data.records
            this.total = res.data.total
          });
      },
      //更改每页显示的条数
      handleSizeChange(val) {
        this.pageSize = val;
        this.currentPage = 1;
        this.getUnRecordCase({});
      },
      //更换页码
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getUnRecordCase({});
      },
      //展开
      showSomeSearch() {
        this.hideSomeSearch = !this.hideSomeSearch;
      },
      // 下一步
      nextStep() {
        this.$store.dispatch("deleteTabs", this.$route.name);
        this.$router.replace({
          name: "addTransfer",
          params: {
            caseData: this.caseData
          }

        });
      },
      chexkCase(caseData) {
        console.log(caseData)
        this.caseData = caseData;
        this.nextStepFlag = true;
      }
    },
    created() {
      this.getUnRecordCase({});
    }
  };
</script>
<style lang="scss">
  @import "@/assets/css/caseHandle/index.scss";
</style>
<style scoped>
  .step_content {
    height: 103px;
    padding: 10px 0 30px;
    box-sizing: border-box;
  }

  .steps {
    width: 670px;
    margin: 0 auto;
  }

  .steps /deep/ .el-step__icon {
    font-size: 18px;
    width: 42px !important;
    height: 42px;
  }

  .steps /deep/ .is-process /deep/ .el-step__icon {
    background: #4573d0;
    color: #ffffff;
    border-color: #4573d0;
  }

  .steps /deep/ .el-step__icon /deep/ .el-step__icon-inner {
    font-weight: 400;
  }

  .steps /deep/ .el-step__main {
    white-space: normal;
    text-align: left;
    margin-top: -42px;
    margin-left: 42px;
    padding-left: 11px;
    width: 66px;
    z-index: 1;
    position: relative;
  }

  .steps /deep/ .el-step.is-horizontal .el-step__line {
    height: 2px;
    top: 21px;
    left: 128px;
    right: 26px;
  }
</style>
