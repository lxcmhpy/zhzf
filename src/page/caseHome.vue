<template>
  <div class="case_home">
    <!-- 案件办理首页121 -->
    <div class="float_left width816 shadow">
      <div class="colorD8DBE0">
        <div class="casehome_topic padding22">案件中心</div>
        <el-tabs class="casehome_tag" v-model="activeName" @tab-click="handleClick">
          <!-- <div class="el-tab-pane" name="first">12121</div> -->
          <el-tab-pane name="first">
            <span slot="label">
              <div class="case_number">{{waitDeal}}</div>
              <div class="case_discribe">
                <i class="iconfont law-method-draw-image"></i> 待办理
              </div>
              <div class="hideen">112</div>
              <span class="borderLine"></span>
            </span>
            <center>
              <div style="margin-top: 15px;width:60%;" class="searchCaseBox">
                <el-input
                  placeholder="请输入案号关键字"
                  v-model="waitDealSearch"
                  @keyup.enter.native="search(0,waitDealSearch)"
                >
                  <el-button slot="append" icon="el-icon-search" @click="search(0,waitDealSearch)"></el-button>
                </el-input>
              </div>
            </center>
          </el-tab-pane>
          <el-tab-pane label="未立案" name="second">
            <span slot="label">
              <div class="case_number">{{unRecord}}</div>
              <div class="case_discribe">
                <i class="iconfont law-fasongzhifeiji"></i> 未立案
              </div>
              <div class="hideen">112</div>
              <span class="borderLine"></span>
            </span>
            <center>
              <div style="margin-top: 15px;width:60%" class="searchCaseBox">
                <el-input
                  placeholder="请输入案号关键字"
                  v-model="unRecordCaseSearch"
                  @keyup.enter.native="search(1,unRecordCaseSearch)"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="search(1,unRecordCaseSearch)"
                  ></el-button>
                </el-input>
              </div>
            </center>
          </el-tab-pane>
          <el-tab-pane label="待归档" name="third">
            <span slot="label">
              <div class="case_number">{{waitArchive}}</div>
              <div class="case_discribe">
                <i class="iconfont law-icon_daiguidang1"></i> 待归档
              </div>
              <div class="hideen">112</div>
              <span class="borderLine"></span>
            </span>
            <center>
              <div style="margin-top: 15px;width:60%" class="searchCaseBox">
                <el-input
                  placeholder="请输入案号关键字"
                  v-model="waitArchiveSearch"
                  @keyup.enter.native="search(2,waitArchiveSearch)"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="search(2,waitArchiveSearch)"
                  ></el-button>
                </el-input>
              </div>
            </center>
          </el-tab-pane>
          <el-tab-pane label="待审批" name="fourth" class="no_border">
            <span slot="label">
              <div class="case_number">{{approveIng}}</div>
              <div class="case_discribe">
                <i class="iconfont law-shijian"></i> 待审批
              </div>
              <div class="hideen">112</div>
              <!-- <span class="borderLine"></span> -->
            </span>

            <center>
              <div style="margin-top: 15px;width:60%" class="searchCaseBox">
                <el-input
                  placeholder="请输入案号关键字"
                  v-model="approveIngSearch"
                  @keyup.enter.native="search(3,approveIngSearch)"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="search(3,approveIngSearch)"
                  ></el-button>
                </el-input>
              </div>
            </center>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="padding22 tablebox">
        <el-table
          :data="tableData"
          stripe
          height="100%"
          highlight-current-row
          @current-change="clickCase"
        >
          <!-- <el-table-column
            :prop="moreFlag != 'unRecordCase'&&moreFlag !='approveIng' ? 'caseNumber'  :'tempNo' "
            label="案号"
            align="center"
          ></el-table-column> -->
          <el-table-column label="案号" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.caseNumber || scope.row.tempNo}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="当事人" align="center"></el-table-column>
          <!-- <el-table-column prop="vehicleShipId" label="车/船号" align="center"></el-table-column> -->
          <el-table-column prop="caseCauseName" label="违法行为" align="center"></el-table-column>
          <!-- <el-table-column prop="acceptTime" label="受案时间" align="center"></el-table-column> -->
          <!-- <el-table-column prop="caseType" label="案件类型" align="center"></el-table-column> -->
          <el-table-column label="总处理时长" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.caseDealTime || "-"}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="currentLinkName" label="当前环节" align="center"></el-table-column>
          <el-table-column prop="caseStatus" label="当前状态" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.caseStatus=='办理中'" style="color:#2B313E">{{scope.row.caseStatus}}</div>
              <div v-if="scope.row.caseStatus=='待归档'" style="color:#2B313E">{{scope.row.caseStatus}}</div>
              <div v-if="scope.row.caseStatus=='待审批'" style="color:#00B4A1">{{scope.row.caseStatus}}</div>
              <div v-if="scope.row.caseStatus=='待审核'" style="color:#00B4A1">{{scope.row.caseStatus}}</div>
              <div v-if="scope.row.caseStatus=='审核中'" style="color:#00B4A1">{{scope.row.caseStatus}}</div>
              <div v-if="scope.row.caseStatus=='未立案'" style="color:#E84241">{{scope.row.caseStatus}}</div>
              <div v-if="scope.row.caseStatus=='审批中'" style="color:#0074F5">{{scope.row.caseStatus}}</div>
            </template>
          </el-table-column>
          <el-table-column label="标签" align="center" width="50">
            <template slot-scope="scope">
              <el-tooltip  v-if="scope.row.warContent" placement="top-start" effect="light">
                <div slot="content" class="warn-li">
                  <li v-for="(item,index) in scope.row.warContent" :key="index">
                    <span v-if="item.warType=='1'"  style="color:#FF0000"><i class="iconfont law-yuan"></i>{{item.warContent}}</span>
                    <span v-if="item.warType=='2'"  style="color:#FF6600"><i class="iconfont law-yuan"></i>{{item.warContent}}</span>
                    <span v-if="item.warType=='3'"  style="color:#0084FF"><i class="iconfont law-yuan"></i>{{item.warContent}}</span>
                    </li>
                </div>
                <div class="warn-box" v-if="scope.row.warType=='1'" style="background:#FF0000">警</div>
                <div class="warn-box" v-if="scope.row.warType=='2'" style="background:#FF6600">警</div>
                <div class="warn-box" v-if="scope.row.warType=='3'" style="background:#0084FF">警</div>
              </el-tooltip>
              <div v-if="!scope.row.warType" style="color:#2B313E">-</div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <center>
        <el-button size="small" @click="router(moreFlag)">查看更多</el-button>
      </center>
    </div>
    <div class="float_left width356">
      <div class="shadow case_home_top">
        <div class="casehome_topic">
          信息查验
          <span @click="infoCheck('case_handle_checkHome')">更多</span>
        </div>
        <div class="icon_content">
          <ul>
            <li class="imgbox" @click="infoCheck('case_handle_commercialVehicle')">
              <img :src="'./static/images/img/icon_lit_yyunc.png'" />
              <span>营运车辆</span>
            </li>
            <li class="imgbox" @click="infoCheck('case_handle_industry')">
              <img :src="'./static/images/img/icon_lit_jyyehu.png'" />
              <span>经营业户</span>
            </li>
            <li class="imgbox" @click="infoCheck('case_handle_vehicleLine')">
              <img :src="'./static/images/img/icon_lit_kyxlu.png'" />
              <span>
                客运线路
                <br />标志牌
              </span>
            </li>
          </ul>
          <ul>
            <li class="imgbox" @click="infoCheck('case_handle_transportWorker')">
              <img :src="'./static/images/img/icon_lit_jyyh.png'" />
              <span>
                道路运输
                <br />从业人员
              </span>
            </li>
            <el-tooltip class="item" effect="dark" content="正在开发中" placement="top">
              <li class="imgbox">
                <img :src="'./static/images/img/icon_lit_car.png'" />
                <span>出租车</span>
              </li>
            </el-tooltip>
            <li class="imgbox" @click="infoCheck('case_handle_shipCertificates')">
              <img :src="'./static/images/img/icon_lit_cbyyzheng.png'" />
              <span>船舶营运证</span>
            </li>
          </ul>
          <ul>
            <li class="imgbox" @click="infoCheck('case_handle_crewCertificates')">
              <img :src="'./static/images/img/icon_lit_cy.png'" />
              <span>船员适任证</span>
            </li>
            <el-tooltip class="item" effect="dark" content="正在开发中" placement="top">
              <li class="imgbox">
                <img :src="'./static/images/img/icon_lit_slu.png'" />
                <span>
                  水路运输经
                  <br />营许可证
                </span>
              </li>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="正在开发中" placement="top">
              <li class="imgbox">
                <img :src="'./static/images/img/icon_lit_zge.png'" />
                <span>
                  经营资格证
                  <br />（企业）
                </span>
              </li>
            </el-tooltip>
          </ul>
        </div>
      </div>

      <div class="shadow case_home_bottom" style="overflow:hidden">
        <el-form ref="form" :model="caseForm" label-width="80px">
          <div class="casehome_topic">
            立案登记
            <div style="float:right;height:20px" class="programType">
              <el-radio-group v-model="caseForm.programType" @change="getIllegaAct">
                <el-radio :label="0" style="margin-right:7px">一般程序</el-radio>
                <el-radio :label="1">简易程序</el-radio>
              </el-radio-group>
            </div>
          </div>

          <el-radio-group
            v-model="caseForm.wayType"
            size="medium"
            fill="#E6EAF2"
            text-color="#0074F5"
            class="btn_back"
            @change="changeCommonOptions"
            style="width:calc(100% - 50px);"
          >
            <!-- <el-radio-button label="水路运政" style="border-left: 1px solid #DCDFE6;"></el-radio-button>
            <el-radio-button label="公路路政"></el-radio-button>
            <el-radio-button label="道路运政"></el-radio-button> -->
            <el-radio-button v-for="item in lawCateList.slice(0,3)" :key="item.id" :label="item.cateName"></el-radio-button>
           <span v-if="moreBtn">
              <!-- <el-radio-button label="航道行政"></el-radio-button>
              <el-radio-button label="海事行政"></el-radio-button>
              <el-radio-button label="工程质量监督" class="width136px"></el-radio-button>
              <el-radio-button label="港口行政" style="border-left: 1px solid #DCDFE6;"></el-radio-button>
              <el-radio-button label="其他" class="width136px"></el-radio-button> -->

              <el-radio-button v-for="item in lawCateList.slice(3,lawCateList.length)" :key="item.id" :label="item.cateName"></el-radio-button>
            </span>
          </el-radio-group>
            <span
              class="el-radio-button__inner"
              style="float: right;margin-right: 3px;width:46px;"
              @click="moreBtn=!moreBtn"
            >
              <i v-bind:class="moreBtn?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
            </span>
          <div class="magin_btm">
            常见违法行为
            <span class="casehome_topic_select">
              <el-select
                v-model="caseForm.commenCase"
                placeholder="不限类别"
                size="small"
                @change="getIllegaAct"
              >
                <el-option
                  v-for="item in commonOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <!-- <el-cascader v-model="caseForm.commenCase" size="mini" placeholder="不限类别" :options="options" :props="{ expandTrigger: 'hover' }" @change="getIllegaAct"></el-cascader> -->
            </span>
          </div>
        </el-form>
        <ul class="wfxwList">
          <li v-for="item in caseList" :key="item.id" @click="caseRecord(item)">
            <span class="bull">&bull;</span>
            <el-tooltip class="item" effect="light" placement="top-start">
              <div slot="content" style="max-width:250px">{{item.strContent}}</div>
              <span>{{item.strContent}}</span>
            </el-tooltip>
          </li>
        </ul>

        <center>
          <el-button size="small" @click="caseRecordMore()">查看更多</el-button>
        </center>
        <!-- <el-button type="text" @click="caseRecordMore()">打开嵌套表格的 Drawer</el-button> -->
      </div>
    </div>

    <caseRegisterDiag ref="caseRegisterDiagRef"></caseRegisterDiag>
    <chooseillegalAct ref="chooseillegalActRef" @toCaseRegister="toCaseRegister"></chooseillegalAct>
    <tansferAtentionDialog ref="tansferAtentionDialogRef"></tansferAtentionDialog>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";
// 立案登记
import caseListSearch from "@/components/caseListSearch/caseListSearch";
import caseRegisterDiag from "@/page/caseHandle/unRecordCase/caseRegisterDiag.vue";
import chooseillegalAct from "./chooseIllegegaDialog.vue";
import tansferAtentionDialog from "@/page/caseHandle/components/tansferAtentionDialog.vue";
import { mapGetters } from "vuex";
import { BASIC_DATA_SYS } from "@/common/js/BASIC_DATA.js";
import { getLawCategoryListApi ,queryLawCateByOrganIdApi} from "@/api/caseDeploy";
import {
  queryFlowBycaseIdApi,
} from "@/api/caseHandle";
export default {
  mixins: [mixinGetCaseApiList],
  components: {
    caseListSearch,
    caseRegisterDiag,
    chooseillegalAct,
    tansferAtentionDialog
  },
  computed: {
    ...mapGetters(["caseId"])
  },
  data() {
    return {
      table: false,
      activeName: "first",
      waitDealSearch: "",
      unRecordCaseSearch: "",
      waitArchiveSearch: "",
      approveIngSearch: "",
      radio: 1,
      tableData: [],
      caseList: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总数
      moreFlag: "waitDeal",
      caseSearchForm: {
        caseNumber: "",
        caseCauseName: ""
      },
      caseForm: {
        programType: 0,
        wayType: iLocalStroage.get("caseHome_wayType") || "公路路政",
        value: "不限类别",
        commenCase: ""
      },
      commonOptions: [],
      options: [
        {
          value: "0",
          label: "道路运政",
          cateId: "1002000200000000"
        },
        {
          value: "1",
          label: "公路路政",
          cateId: "1002000100000000"
        },
        {
          value: "2",
          label: "水路运政",
          cateId: "1002000300000000",
          children: []
        },
        {
          value: "3",
          label: "港口行政",
          cateId: "1002000500000000"
        },
        {
          value: "4",
          label: "航道行政",
          cateId: "1002000400000000",
          children: []
        },
        {
          value: "5",
          label: "海事行政",
          cateId: "1002000700000000",
          children: []
        },
        {
          value: "6",
          label: "工程质量监督",
          cateId: "1002000600000000",
          children: []
        },
        {
          value: "7",
          label: "港口行政",
          cateId: "1002000500000000",
          children: []
        },
        {
          value: "8",
          label: "其他",
          cateId: "1002000800000000",
          children: []
        }
      ],
      waitDeal: "0",
      unRecord: "0",
      waitArchive: "0",
      approveIng: "0",
      lawCateList: [],
      moreBtn: false
    };
  },
  methods: {
    handleClick(tab) {
      let searchData = {
        flag: tab.index == 3 ? 4 : tab.index
      };
      this.getCaseList2(searchData);
      if (tab.index == 0) {
        this.moreFlag = "waitDeal";
      }
      if (tab.index == 1) {
        this.moreFlag = "unRecordCase";
      }
      if (tab.index == 2) {
        this.moreFlag = "waitArchive";
      }
      if (tab.index == 3) {
        this.moreFlag = "approveIng";
      }
    },
    async clickCase(row) {
      this.$store.commit("setCaseId", row.id);
      iLocalStroage.set("stageCaseId",row.id);
      this.$store.commit("setIsLawEnforcementSupervision", false);
      this.$store.commit("setLawEnforcementSupervisionType", '');
      if (this.moreFlag === "unRecordCase") {
        let setCaseNumber = row.caseNumber != "" ? row.caseNumber : row.tempNo;
        this.$store.commit("setCaseNumber", setCaseNumber);
        //暂存案件跳转信息采集
        if(row.state == 0){
          await this.queryFlowBycaseId();
          this.$router.replace({
            name: this.caseFlowData.basicInfoPage,
          });
          return;
        }
        if (row.caseStatus === "已移送") {
          let message = "该案件正在移送中，移送完成后才可与继续办理";
          this.$refs.tansferAtentionDialogRef.showModal(message, "移送中");
        } else {
          console.log("1111111",this.caseId)
          //立案登记表已保存未提交审批时 跳转pdf页面
         let docTypeId,linkId,currentFlow = '';
         try{
            currentFlow = await queryFlowBycaseIdApi(this.caseId);
          }catch(err){
            this.$message('获取案件流程失败！')
          }
          // if(currentFlow.data.flowName == '处罚流程' || currentFlow.data.flowName == '赔补偿流程' || currentFlow.data.flowName == '青海赔补偿流程' || currentFlow.data.flowName == '青海处罚流程'){
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
            console.log('查询环节是否生成了pdf',res);
            this.$store.commit("setCaseId", row.id);
            if(res && res.length >0){
              this.$store.commit('setApprovalState', 'approvalBefore');
              //设置环节id，提交审批时需要用到
              this.$store.commit("setCaseLinktypeId",linkId );
              this.$router.push({ name: 'case_handle_myPDF', params: { docId: docTypeId, } })
            }else{
                //设置案件状态不为审批中
                this.$store.commit("setCaseApproval", false);
                this.getCaseNextRoute('立案登记').then(res=>{
                  this.$router.push({
                    name: res
                  });
                })


            }
          })
          .catch(err=>{console.log(err)})
        }
      } else if (this.moreFlag === "waitDeal") {
        if (row.caseStatus === "已移送") {
          let message = "该案件正在移送中，移送完成后才可与继续办理";
          this.$refs.tansferAtentionDialogRef.showModal(message, "移送中");
        } else {
          this.$store.commit("setCaseId", row.id);
          //设置案件状态不为审批中
          this.$store.commit("setCaseApproval", false);
          this.$router.push({
            name: "case_handle_caseInfo",
            params: {
              caseInfo: row
            }
          });
          let setCaseNumber = row.caseNumber !== "" ? row.caseNumber : "案件";
          this.$store.commit("setCaseNumber", setCaseNumber);
        }
      } else if (this.moreFlag === "waitArchive") {
        this.$store.commit("setCaseId", row.id);
        //设置案件状态不为审批中
        this.$store.commit("setCaseApproval", false);
        this.$router.push({
          name: "case_handle_archiveCover"
        });
      } else {
        console.log("点击的是待审批", row);
        if (row.caseStatus === "已移送") {
          let message = "该案件正在移送中，移送完成后才可与继续办理";
          this.$refs.tansferAtentionDialogRef.showModal(message, "移送中");
        } else {
          console.log('列表数据row',row)
          this.$store.commit("setCaseId", row.id);
          //设置案件状态为审批中
          this.$store.commit("setCaseApproval", true);
          let setCaseNumber = row.caseNumber!='' ?  row.caseNumber : row.tempNo;
          this.$store.commit("setCaseNumber", setCaseNumber);
          this.$store.commit('setApprovalState', 'approvaling')
          //设置文书数据的id
          this.$store.commit('setDocDataId', row.docId);
          this.$router.push({ name: 'case_handle_myPDF', params: { docId: row.docTypeId } })

        }
      }
    },
    //获取机构下数据
    getCaseList2(searchData) {
      let data = searchData;
      data.flag = searchData.flag;
      data.userId = iLocalStroage.gets("userInfo").id;
      data.current = this.currentPage;
      data.size = this.pageSize;
      this.getCaseList(data);
      this.tableData.forEach(element => {
        let nd = 1000 * 24 * 60 * 60;
        let endTime = element.closeDate || new Date();
        element.caseDealTime = endTime - new Date(element.acceptTime);
        let day = element.caseDealTime / nd;
        day = Math.floor(day);

        // element.warContent=JSON.parse(element.warContent)
      });
    },
    // 信息查验
    infoCheck(path) {
      this.$store.dispatch("deleteTabsByTitle", "信息查验");
      this.$router.push({ name: path });
    },
    // 查看更多
    router(path) {
      if (path === "approveIng") {
        this.$router.push({ path: "/approvalCenter/myApproval" });
      } else {
        this.$router.push({ path: "/myCase/" + path });
      }
    },
    // 立案登记
    caseRecord(data) {
      this.$refs.caseRegisterDiagRef.showModal(data, this.caseForm);
      // this.makeRoute('/inforCollect','/inforCollect2','/inforCollect3','inforCollect','inforCollect2','inforCollect3','信息采集','caseHandle/unRecordCase/inforCollection.vue');
    },
    // 查看更多违法行为
    caseRecordMore() {
      let cate = "";
      this.options.forEach(element => {
        if (this.caseForm.wayType == element.label) {
          cate = element.cateId;
        }
      });
      let lawCate = {
        cateId: cate,
        cateName: this.caseForm.wayType,
        hyTypeId: this.caseForm.commenCase,
        resourse: "caseHome"
      };
      this.$refs.chooseillegalActRef.showModal(lawCate);
    },
    // 查找
    search(index, name) {
      //搜索
      this.caseSearchForm = {
        flag: index,
        caseNumber: name
      };
      this.getCaseList2(this.caseSearchForm);
    },
    //查询违法行为
    getIllegaAct() {
      var data = {
        size: 5,
        current: 1,
        hyTypeId: this.caseForm.commenCase
        // strNumber: this.caseForm.wayType,
      };
      this.options.forEach(element => {
        if (this.caseForm.wayType == element.label) {
          data.categoryId = element.cateId;
        }
      });
      this.$store.dispatch("getIllegaAct", data).then(
        res => {
          this.caseList = res.data.records;
        },
        err => {
          console.log(err);
        }
      );
    },
    //
    changeCommonOptions(val) {
      iLocalStroage.set("caseHome_wayType", this.caseForm.wayType);
      this.caseForm.commenCase = "";
      console.log(this.caseForm.wayType);
      //根据业务领域Id查询行业类别
      this.options.forEach(element => {
        // console.log(element);
        if (this.caseForm.wayType == element.label) {
          let data1 = {
            pid: element.cateId
          };
          getLawCategoryListApi(data1).then(
            res => {
              console.log("行业类别列表", res);
              this.commonOptions = res.data;
            },
            err => {
              console.log(err);
            }
          );
          // this.commonOptions = element.children;
          // console.log("this.commonOptions", this.commonOptions);
        }
      });
      this.getIllegaAct();
    },
    //设置违法行为
    toCaseRegister(val) {
      this.caseRecord(val, this.caseForm);
    },
    // 获取带办理条数
    getTotal(flag) {
      let data = {
        flag: flag
      };
      this.$store.dispatch("queryCaseBasicInfoListPage", data).then(
        res => {
          let total = res.data.total;
          if (total > 999) {
            total = "999+";
          }
          if (flag == 0) {
            this.waitDeal = total;
          }
          if (flag == 1) {
            this.unRecord = total;
          }
          if (flag == 2) {
            this.waitArchive = total;
          }
          if (flag == 4) {
            this.approveIng = total ? total : 0;
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //获取业务领域
    // getEnforceLawType() {
    //   let _this = this;
    //   this.$store.dispatch("getEnforceLawType", "1").then(
    //     res => {
    //       _this.lawCateList = res.data;
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
    // },
    //获取业务领域
    getLawCategoryList() {
      let data = {
        // current: this.currentPage,
        // size: this.pageSize,
        // name: this.searchForm.name,
        // pid: "",
        organId:iLocalStroage.gets('userInfo').organId,
      };
      let _this = this;
      queryLawCateByOrganIdApi(data).then(
        res => {
          console.log("执法门类列表", res);
          _this.lawCateList = res.data;
          // _this.totalPage = res.data.total;
        },
        err => {
          console.log(err);
        }
      );
    },
  },
  mounted() {
    // let data = {};
    let role = iLocalStroage.gets("userInfo").roles;
    let isApprovalPeople = false;
    console.log('role',role)
    //判断是不是审批人员
    role.forEach(item => {
      isApprovalPeople = ["法制审查", "部门负责人", "经办机构负责人"].includes(
        item.name
      );
      if (isApprovalPeople) return;
    });
    if (isApprovalPeople) {
      this.activeName = "fourth";
      let searchData = {
        flag: 4
      };
      this.moreFlag = "approveIng";
      this.getCaseList2(searchData);
    } else {
      let searchData = {
        flag: 0
      };
      this.getCaseList2(searchData);
    }
    this.getIllegaAct();
    // 获取带办理条数
    this.getTotal("0");
    this.getTotal("1");
    this.getTotal("2");
    this.getTotal("4");

    this.changeCommonOptions();
    //获取业务领域
    // this.getEnforceLawType();
    this.getLawCategoryList();
  }
};
</script>
<style lang="scss" scoped>
.case_home {
  width: 100%;
  height: 100%;
  padding: 22px;
  position: absolute;
  box-sizing: border-box;
  overflow: auto;
  .searchCaseBox {
    .el-input-group__append {
      border-radius: 0;
    }
  }
}

.float_left {
  float: left;
  height: 100%;
}

.shadow {
  /* border: 1px solid red; */
  box-shadow: 0 6px 4px 0 rgba(94, 137, 181, 0.1);
  background: #fff;
}

.width816 {
  /* width: 816px;/*  */
  width: calc(100% - 378px);
  height: 764px;
  margin-right: 22px;
  box-sizing: border-box;

  /* background: pink; */
}

.width356 {
  width: 356px;
  box-sizing: border-box;
}


.colorD8DBE0 {
  background: rgba(246, 248, 253, 1);
}

.case_home_bottom {
  height: 409px;
  padding: 0 20px;
  /* min-height: 400px; */
  overflow: auto;
}

.case_home_top {
  height: 332px;
  margin-bottom: 22px;
  padding: 0px;
}

.casehome_topic {
  /* height: 50px; */
  /* line-height: 50px; */
  font-size: 18px;
  padding: 17px 20px 27px 20px;
  font-family: PingFang SC;
  font-weight: 550;
  color: rgba(43, 49, 62, 1);
  position: relative;
  span {
    cursor: pointer;
  }
}

.casehome_topic span {
  position: absolute;
  right: 20px;
  font-size: 14px;
  /* line-height: 50px; */
  font-weight: 400;
}

.case_home_bottom .casehome_topic {
  padding-left: 0px;
  padding-right: 0px;
}

.case_number {
  font-size: 29px;
  height: 29px;
  line-height: 29px;
  text-align: center;
  color: #495164;
}


.bull {
  margin: 0 5px;
}

.hideen {
  height: 1px;
  line-height: 1px;
  visibility: hidden;
}

.imgbox {
  float: left;
  width: 33%;
  line-height: 14px;
  text-align: center;
  font-size: 14px;
}

.imgbox img {
  height: 30px;
}

.imgbox span {
  display: block;
  margin: 4px auto;
  line-height: 16px;
}

.icon_content ul {
  margin-top: 10px;
  clear: both;
  height: 80px;
}

.icon_content li {
  cursor: pointer;
}

img {
  display: block;
  margin: 0 auto;
}

.magin_btm {
  font-size: 16px;
  margin-top: 27px;
  line-height: 16px;
  height: 16px;
  /* margin-bottom: 20px; */
}

.tablebox {
  overflow: auto;
  height: 470px;
  padding: 0px 20px 15px 20px;
}
</style>
<style lang="scss" src="@/assets/css/caseHandle/caseHome.scss">
/* @import "@/assets/css/caseHandle/caseHome.scss"; */
</style>

