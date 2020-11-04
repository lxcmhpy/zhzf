<template>
  <div class="com_searchAndpageBoxPadding">
    <div :class="hideSomeSearch ? 'searchAndpageBox' : 'searchAndpageBox searchAndpageBox2'">
      <caseListSearch @showSomeSearch="showSomeSearch" @caseRecord="caseRecord" @searchCase="getUnRecordCase" :caseState="'unRecordCase'"></caseListSearch>
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
import {
  queryFlowBycaseIdApi,
} from "@/api/caseHandle";
import { mapGetters } from "vuex";

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
      infoPage: "" //信息采集页路由
    };
  },
  mixins: [mixinGetCaseApiList],
  components: {
    caseListSearch,
    caseRegisterDiag,
    tansferAtentionDialog

  },
  computed: {
        ...mapGetters(["openTab"])
  },
  methods: {
    caseRecord() {
      this.$store.commit("setCaseId", '');
      this.$refs.caseRegisterDiagRef.showModal();
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
    async handleCase(row) {
      console.log(row);
      iLocalStroage.removeItem("someCaseInfo")
      let setCaseNumber = row.caseNumber!='' ? row.caseNumber : row.tempNo;
      this.$store.commit("setCaseNumber", setCaseNumber);
      this.$store.commit("setIsLawEnforcementSupervision", false);
      this.$store.commit("setLawEnforcementSupervisionType", '');
      //防止出现多个案件tab
      let newOpenTab = this.openTab.filter(item => {return item.isCase == false })
      this.$store.commit("reset_ALLTABS", newOpenTab);

      //暂存案件跳转信息采集
      if(row.state == 0){
        this.$store.commit("setCaseId", row.id);
        iLocalStroage.set("stageCaseId",row.id);
        await this.queryFlowBycaseId();
        this.$router.replace({
          name: this.caseFlowData.basicInfoPage,
        });
        return;
      }
     

      if (row.caseStatus == '已移送') {
        let message = '该案件正在移送中，移送完成后才可与继续办理'
        this.$refs.tansferAtentionDialogRef.showModal(message, '移送中');
      }else {
         this.$store.commit("setCaseId", row.id);
         //立案登记表已保存未提交审批时 跳转pdf页面
         let docTypeId,linkId,currentFlow = '';
         try{
            currentFlow = await queryFlowBycaseIdApi(this.caseId);
          }catch(err){
            this.$message('获取案件流程失败！')
          }
      
          if(['commonGraphData','compensationGraphData','compensationGraphData_QH','commonGraphData_QH','commonGraphData_SC'].indexOf(currentFlow.data.flowUrl)!=-1){
            docTypeId = this.BASIC_DATA_SYS.establish_huanjieAndDocId;
            linkId = this.BASIC_DATA_SYS.establish_caseLinktypeId;
          }else if(currentFlow.data.flowUrl == 'commonGraphData_JX'){
            docTypeId = this.BASIC_DATA_JX.establish_JX_huanjieAndDocId;
            linkId = this.BASIC_DATA_JX.establish_JX_caseLinktypeId;
          }
          this.$store.dispatch("getFile", {
            docId: docTypeId,
            caseId: row.id,
          }).then(res=>{
            console.log('查询环节是否生成了pdf1',res);
            if(res && res.length >0){
              if(row.caseStatus == '已驳回'){ 
                this.$store.commit('setApprovalState', 'approvalEstabishNoPass');
                //设置环节id，提交审批时需要用到
                this.$store.commit("setCaseLinktypeId",linkId );
                this.$store.commit("setCaseLinkName", '');
                this.$router.push({ name: 'case_handle_myPDF', params: { docId: docTypeId, } })
                return;
              }
              this.$store.commit('setApprovalState', 'approvalBefore');
              //设置环节id，提交审批时需要用到
              this.$store.commit("setCaseLinktypeId",linkId );
              this.$router.push({ name: 'case_handle_myPDF', params: { docId: docTypeId, } })
            }else{
                //设置案件状态不为审批中
                this.$store.commit("setCaseApproval", false);
                this.$store.commit('setApprovalState', '');
                this.getCaseNextRoute('立案登记').then(res=>{
                  this.$router.push({
                    name: res
                  });
                })
                
    
            }
          })
          .catch(err=>{console.log(err)}) 



       
      }
    },
    //展开
    showSomeSearch() {
      this.hideSomeSearch = !this.hideSomeSearch;
    },
    //根据案件类型判断进入哪个信息采集页
    findInforCollectPageName(){
      queryFlowBycaseIdApi(this.caseId).then(res=>{
          console.log('res111222',res);
          this.infoPage = res.data.basicInfoPage;
          console.log('this.infoPage', this.infoPage);
      }).catch(err=>{console.log(err)})
    },
  },
  created() {
    this.getUnRecordCase({});
    // this.findInforCollectPageName();
  }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/index.scss">
/* @import "@/assets/css/caseHandle/index.scss"; */
</style>
