<template>
  <div class="com_searchAndpageBoxPadding">
    <div :class="hideSomeSearch ? 'searchAndpageBox' : 'searchAndpageBox searchAndpageBox2'">
      <caseListSearch @showSomeSearch="showSomeSearch" @caseRecord="caseRecord" @searchCase="getUnRecordCase" :caseState="'unRecordCase'"></caseListSearch>
      <!-- <div class="handlePart caseHandlepart">
        <div>
          <el-button type="primary" size="medium" icon="el-icon-plus" @click="caseRecord">立案登记</el-button>
        </div>
        <div>
          <el-form
            :model="caseSearchForm"
            ref="caseSearchForm"
            class="caseSearchForm"
            label-width="90px"
          >
            <div>
              <div class="item">
                <el-form-item label="当事人/单位">
                  <el-input v-model="caseSearchForm.caseId"></el-input>
                </el-form-item>
              </div>
              <div class="item">
                <el-form-item label="车船号">
                  <el-input v-model="caseSearchForm.caseId2"></el-input>
                </el-form-item>
              </div>
              <div class="item">
                <el-form-item label="案件类型">
                  <el-input v-model="caseSearchForm.caseId3"></el-input>
                </el-form-item>
              </div>
              <div class="item">
                <el-form-item label="案件状态">
                  <el-input v-model="caseSearchForm.caseId4"></el-input>
                </el-form-item>
              </div>
              <div class="item">
                <el-button type="primary" size="medium" icon="el-icon-search"></el-button>
                <el-button
                  type
                  size="medium"
                  :icon="hideSomeSearch ? 'el-icon-arrow-down':'el-icon-arrow-up'"
                  @click="showSomeSearch"
                ></el-button>
              </div>
            </div>
            <div :class="hideSomeSearch ? 'hideSomeSearchClass' : ''">
              <div class="item">
                <el-form-item label="违法行为">
                  <el-input v-model="caseSearchForm.caseId5"></el-input>
                </el-form-item>
              </div>
              <div class="item">
                <el-form-item label="受案时间">
                  <el-date-picker
                    v-model="value1"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </div>-->
      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" highlight-current-row @current-change="handleCase" height="100%">
          <el-table-column prop="tempNo" label="编号" align="center" width="200"></el-table-column>
          <el-table-column prop="vehicleShipId" label="车/船号" align="center" width="100"></el-table-column>
          <el-table-column prop="name" label="当事人/单位" align="center" width="150"></el-table-column>
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
          <el-table-column prop="caseStatus" label="案件状态" align="center" width="100">
            <template slot-scope="scope">
              <div :style="{'color':scope.row.caseStatus=='已移送'?'#22C058':''}">{{scope.row.caseStatus}}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="total"></el-pagination>
      </div>
      <caseRegisterDiag ref="caseRegisterDiagRef"></caseRegisterDiag>
    <tansferAtentionDialog ref="tansferAtentionDialogRef"></tansferAtentionDialog>

    </div>
  </div>
</template>
<script>
import caseListSearch from "@/components/caseListSearch/caseListSearch";
import caseRegisterDiag from "./caseRegisterDiag";
import iLocalStroage from "@/common/js/localStroage";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import tansferAtentionDialog from "@/page/caseHandle/components/tansferAtentionDialog.vue";

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
      hideSomeSearch: true
    };
  },
  mixins: [mixinGetCaseApiList],
  components: {
    caseListSearch,
    caseRegisterDiag,
    tansferAtentionDialog

  },
  methods: {
    caseRecord() {
      this.$store.commit("setCaseId", '');
      this.$refs.caseRegisterDiagRef.showModal();
      // this.makeRoute('/inforCollect','/inforCollect2','/inforCollect3','inforCollect','inforCollect2','inforCollect3','信息采集','caseHandle/unRecordCase/inforCollection.vue');
    },
    //获取机构下的未立案数据
    getUnRecordCase(searchData) {
      let data = searchData;
      data.flag = 1;
      data.userId = iLocalStroage.gets("userInfo").id;
      data.current = this.currentPage;
      data.size = this.pageSize;
      console.log(data);
      this.getCaseList(data);
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
    //跳转立案登记
    handleCase(row) {
      console.log(row);
      let setCaseNumber = row.caseNumber!='' ? row.caseNumber : row.tempNo;
      this.$store.commit("setCaseNumber", setCaseNumber);
      //暂存案件跳转信息采集
      if(row.state == 0){
        this.$store.commit("setCaseId", row.id);
        iLocalStroage.set("stageCaseId",row.id);
        this.$router.replace({
          name: "case_handle_inforCollect"
        });
        return;
      }
     

      if (row.caseStatus == '已移送') {
        let message = '该案件正在移送中，移送完成后才可与继续办理'
        this.$refs.tansferAtentionDialogRef.showModal(message, '移送中');
      } else {
         //立案登记表已保存未提交审批时 跳转pdf页面
         
          this.$store.dispatch("getFile", {
            docId: '2c9029ae654210eb0165421564970001',
            caseId: row.id,
          }).then(res=>{
            console.log('查询环节是否生成了pdf',res);
            if(res && res.length >0){
              this.$router.push({ name: 'case_handle_myPDF', params: { docId: '2c9029ae654210eb0165421564970001', caseLinktypeId: '2c90293b6c178b55016c17c255a4000d' } })
            }else{
               this.$store.commit("setCaseId", row.id);
                //设置案件状态不为审批中
                this.$store.commit("setCaseApproval", false);
                this.$router.replace({
                  name: "case_handle_establish"
                });
                // let setCaseNumber = row.caseNumber != '' ? row.caseNumber : '案件'
                // this.$store.commit("setCaseNumber", setCaseNumber);
            }
          })
          .catch(err=>{console.log(err)}) 



       
      }
    },
    //展开
    showSomeSearch() {
      this.hideSomeSearch = !this.hideSomeSearch;
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
