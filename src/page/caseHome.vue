<template>
  <div class="case_home">
    <!-- 案件办理首页121 -->
    <div class="float_left width816 shadow">
      <div class="colorD8DBE0">
        <div class="casehome_topic padding22 ">案件中心</div>
        <el-tabs class="casehome_tag " v-model="activeName" @tab-click="handleClick">
          <!-- <div class="el-tab-pane" name="first">12121</div> -->
          <el-tab-pane name="first">
            <span slot="label">
              <div class="case_number">0</div>
              <div class="case_discribe">
                <i class="iconfont law-approval"></i> 待办理
              </div>
              <div class="hideen">112</div>
              <span class="borderLine"></span>
            </span>
            <center>
              <div style="margin-top: 15px;width:60%;">
                <el-input placeholder="请输入案件关键字" v-model="waitDealSearch" @keyup.enter.native="search(0,waitDealSearch)">
                  <el-button slot="append" icon="el-icon-search" @click="search(0,waitDealSearch)"></el-button>
                </el-input>
              </div>
            </center>
          </el-tab-pane>
          <el-tab-pane label="未立案" name="second">
            <span slot="label">
              <div class="case_number">0</div>
              <div class="case_discribe"><i class="iconfont law-submit-o"></i> 未立案</div>
              <div class="hideen">112</div>
              <span class="borderLine"></span>
            </span>
            <center>
              <div style="margin-top: 15px;width:60%">
                <el-input placeholder="请输入案件关键字" v-model="unRecordCaseSearch" @keyup.enter.native="search(1,unRecordCaseSearch)">
                  <el-button slot="append" icon="el-icon-search" @click="search(1,unRecordCaseSearch)"></el-button>
                </el-input>
              </div>
            </center>
          </el-tab-pane>
          <el-tab-pane label="待归档" name="third">
            <span slot="label">
              <div class="case_number">
                999+
              </div>
              <div class="case_discribe"><i class="iconfont law-save"></i> 待归档</div>
              <div class=" hideen">112</div>
              <span class="borderLine"></span>
            </span>
            <center>
              <div style="margin-top: 15px;width:60%">
                <el-input placeholder="请输入案件关键字" v-model="waitArchiveSearch" @keyup.enter.native="search(2,waitArchiveSearch)">
                  <el-button slot="append" icon="el-icon-search" @click="search(2,waitArchiveSearch)"></el-button>
                </el-input>
              </div>
            </center>
          </el-tab-pane>
          <el-tab-pane label="待审批" name="fourth" class='no_border'>
            <span slot="label">
              <div class="case_number">0</div>
              <div class="case_discribe">
                <i class="iconfont law-save"></i> 待审批
              </div>
              <div class="hideen">112</div>
              <!-- <span class="borderLine"></span> -->
            </span>

            <center>
              <div style="margin-top: 15px;width:60%">

                <el-input placeholder="请输入案件关键字" v-model="approveIngSearch" @keyup.enter.native="search(3,approveIngSearch)">
                  <el-button slot="append" icon="el-icon-search" @click="search(3,approveIngSearch)"></el-button>
                </el-input>

              </div>
            </center>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="padding22 tablebox">
        <el-table :data="tableData" stripe height="100%" highlight-current-row @current-change="clickCase">
          <el-table-column prop="caseNumber" label="案号" align="center"></el-table-column>
          <el-table-column prop="name" label="当事人/单位" align="center"></el-table-column>
          <el-table-column prop="vehicleShipId" label="车/船号" align="center"></el-table-column>
          <el-table-column prop="caseCauseName" label="违法行为" align="center"></el-table-column>
          <el-table-column prop="acceptTime" label="受案时间" align="center"></el-table-column>
          <el-table-column prop="caseType" label="案件类型" align="center"></el-table-column>
          <el-table-column prop="currentLinkName" label="当前环节" align="center"></el-table-column>
          <el-table-column prop="caseStatus" label="案件状态" align="center"></el-table-column>
        </el-table>
      </div>

      <center>
        <el-button size="small" @click="router(moreFlag)">查看更多</el-button>
      </center>
    </div>
    <div class="float_left width356">
      <div class="shadow case_home_top">
        <div class="casehome_topic">信息查验
          <span>查看更多</span>
        </div>
        <div class="icon_content">
          <ul>
            <li class="imgbox">
              <img :src="'./static/images/img/icon_lit_yyunc.png'">
              <span>营运车辆</span>
            </li>
            <li class="imgbox" @click="infoCheck('industry')">
              <img :src="'./static/images/img/icon_lit_jyyehu.png'">
              <span>经营业户</span>
            </li>
            <li class="imgbox">
              <img :src="'./static/images/img/icon_lit_kyxlu.png'">
              <span>客运线路<br />标志牌</span>
            </li>
          </ul>
          <ul>
            <li class="imgbox">
              <img :src="'./static/images/img/icon_lit_jyyh.png'">
              <span>道路运输<br />从业人员</span>
            </li>
            <li class="imgbox">
              <img :src="'./static/images/img/icon_lit_car.png'">
              <span>出租车</span>
            </li>
            <li class="imgbox">
              <img :src="'./static/images/img/icon_lit_cbyyzheng.png'">
              <span>船舶营运证</span>
            </li>
          </ul>
          <ul>
            <li class="imgbox">
              <img :src="'./static/images/img/icon_lit_cy.png'">
              <span>船员适应证</span>
            </li>
            <li class="imgbox">
              <img :src="'./static/images/img/icon_lit_slu.png'">
              <span>水路运输经<br />营许可证</span>
            </li>
            <li class="imgbox">
              <img :src="'./static/images/img/icon_lit_zge.png'">
              <span>经营资格证<br />（企业）</span>
            </li>
          </ul>

        </div>
      </div>

      <div class="shadow case_home_bottom">
        <el-form ref="form" :model="caseForm" label-width="80px">
          <div class="casehome_topic">立案登记
            <div style="float:right;height:20px" class="programType">
              <el-radio-group v-model="caseForm.programType" @change="getIllegaAct">
                <el-radio :label='1'>简易程序</el-radio>
                <el-radio :label='0'>一般程序</el-radio>
              </el-radio-group>
            </div>
          </div>
          <el-radio-group v-model="caseForm.wayType" size="medium" fill="#E6EAF2" text-color="#0074F5" class="btn_back" @change="getIllegaAct">
            <el-radio-button label="水路运政"></el-radio-button>
            <el-radio-button label="公路路政"></el-radio-button>
            <el-radio-button label="道路运政"></el-radio-button>
            <el-radio-button label="更多"> <i class="el-icon-arrow-down"></i></el-radio-button>
          </el-radio-group>
          <div class="magin_btm">常见违法行为
            <span class="casehome_topic_select">
              <!-- <el-select v-model="caseForm.value" placeholder="请选择" size='small'>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select> -->
              <el-cascader v-model="caseForm.commenCase" size="mini" aria-placeholder="不限类别" :options="options" :props="{ expandTrigger: 'hover' }" @change="getIllegaAct"></el-cascader>
            </span>
          </div>
        </el-form>
        <ul class="wfxwList" >
          <li v-for="item in caseList" :key="item.id" @click="caseRecord(item)"><span class="bull">&bull;</span>{{item.strContent}}</li>
        </ul>

        <center>
          <el-button size="small" @click="caseRecord()">查看更多</el-button>
        </center>

      </div>

    </div>
    <caseRegisterDiag ref="caseRegisterDiagRef"></caseRegisterDiag>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";
// 立案登记
import caseListSearch from "@/components/caseListSearch/caseListSearch";
import caseRegisterDiag from "@/page/caseHandle/unRecordCase/caseRegisterDiag.vue";

export default {
  mixins: [mixinGetCaseApiList],
  components: {
    caseListSearch,
    caseRegisterDiag
  },
  data() {
    return {
      activeName: 'first',
      waitDealSearch: '',
      unRecordCaseSearch: '',
      waitArchiveSearch: '',
      approveIngSearch: '',
      radio: 1,
      radio3: '',
      tableData: [],
      options: [{
        value: '1',
        label: '不限类别'
      }],
      caseList: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总数
      moreFlag: 'waitDeal',
      caseSearchForm: {
        caseNumber: "",
        caseCauseName: "",
      },
      caseForm: {
        programType: 1,
        wayType: '公路路政',
        value: '不限类别',
        commenCase:'',
      },
      options: [
        {
          value: '0',
          label: '道路运政',
          children: [
            {
              value: '01',
              label: '道路旅客运输'
            },
            {
              value: '02',
              label: '道路普通货物运输'
            },
            {
              value: '03',
              label: '道路危险货物运输'
            },
            {
              value: '04',
              label: '国际道路运输'
            },
            {
              value: '05',
              label: '道路运输站（场）'
            },
            {
              value: '06',
              label: '机动车维修'
            },
            {
              value: '07',
              label: '驾驶员培训'
            },
            {
              value: '08',
              label: '道路运输从业人员'
            },
            {
              value: '09',
              label: '城市公交'
            },
            {
              value: '010',
              label: '城市轨道交通'
            },
            {
              value: '011',
              label: '出租汽车'
            },
            {
              value: '012',
              label: '汽车租赁'
            },
          ]
        },
        {
          value: '1',
          label: '公路路政',
          children: [
            {
              value: '11',
              label: '公路管理'
            },
            {
              value: '12',
              label: '超载超限'
            },
            {
              value: '13',
              label: '收费公路'
            },
          ]
        },
        {
          value: '2',
          label: '水路运政',
        },
        {
          value: '3',
          label: '港口行政',
          children: [
            {
              value: '31',
              label: '港口行政'
            },
            {
              value: '32',
              label: '港口建设'
            },
            {
              value: '33',
              label: '港口经营'
            },
          ]
        },
        {
          value: '4',
          label: '航道行政',
        },
        {
          value: '5',
          label: '海事行政',
        },
        {
          value: '6',
          label: '工程质量监督',
        },
      ]
    };
  },
  methods: {
    handleClick(tab) {
      console.log(tab.index);
      let searchData = {
        flag: tab.index
      }
      this.getCaseList2(searchData)
      if (tab.index == 0) {
        this.moreFlag = 'waitDeal'
      }
      if (tab.index == 1) {
        this.moreFlag = 'unRecordCase'
      }
      if (tab.index == 2) {
        this.moreFlag = 'waitArchive'
      }
      if (tab.index == 3) {
        this.moreFlag = 'approveIng'
      }

    },
    clickCase() {

    },
    //获取机构下数据
    getCaseList2(searchData) {
      console.log('searchData', searchData)
      let data = searchData;
      data.flag = searchData.flag;
      data.userId = iLocalStroage.gets("userInfo").id;
      data.current = this.currentPage;
      data.size = this.pageSize;
      this.getCaseList(data);
    },
    // 信息查验
    infoCheck(path) {
      this.$router.push({ name: path });
    },
    // 查看更多
    router(path) {
      this.$router.push({ path: '/myCase/' + path });
    },
    // 立案登记
    caseRecord(data) {
      console.log(data)
      this.$refs.caseRegisterDiagRef.showModal(data, this.caseForm);
      // this.makeRoute('/inforCollect','/inforCollect2','/inforCollect3','inforCollect','inforCollect2','inforCollect3','信息采集','caseHandle/unRecordCase/inforCollection.vue');
    },
    // 查找
    search(index, name) {
      //搜索
      this.caseSearchForm = {
        flag: index,
        caseNumber: name
      };
      console.log('点击')
      this.getCaseList2(this.caseSearchForm)
    },
    //查询违法行为
    getIllegaAct() {
      var data = {
        size: 5,
        current: 1,
        // categoryId: this.caseForm.programType,
        // strNumber: this.caseForm.wayType,
      }
      this.$store.dispatch("getIllegaAct", data).then(
        res => {
          console.log('getIllegaAct', res)
          this.caseList = res.data.records
          console.log('caseList', this.caseList)
        },
        err => {
          console.log(err);
        }
      );
    },

  },
  mounted() {
    // let data = {};
    let searchData = {
      flag: 0
    }
    this.getCaseList2(searchData);
    this.getIllegaAct();

  }
};
</script>
<style lang="scss"  scoped>
.case_home {
  width: 100%;
  height: 100%;
  padding: 22px;
  position: absolute;
  box-sizing: border-box;
  overflow: auto;
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
.padding22 {
  /* padding: 0 22px; */
  /* box-sizing: border-box; */
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
}
.casehome_topic span {
    position: absolute;
    right:20px;
    font-size: 14px;
  /* line-height: 50px; */
    font-weight: 400;
}
.case_home_bottom .casehome_topic {
    padding-left:0px;
}
.case_number {
  font-size: 29px;
  height: 29px;
  line-height: 29px;
  text-align: center;
  color:#495164;
}
.case_discribe {
  font-size: 16px;
  height: 16px;
  line-height: 16px;
  padding: 17px 20px 15px 20px;
  text-align: center;
}
ul {
  height: calc(15% - 20px);
}
li {
  width: 100%;
  height: 100%;
  line-height: 14px;
  color: #606060;
  font-size: 14px;
  font-weight: 400;
  overflow: hidden; /*溢出隐藏*/
  white-space: nowrap; /*规定文本不进行换行*/
  text-overflow: ellipsis; /*当对象内文本溢出时显示省略标记（...）*/
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
    margin:8px auto;
    line-height: 15px;
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
.magin_btm{
    font-size: 16px;
    margin-top: 27px;
    line-height: 16px;
    height: 16px;
  /* margin-bottom: 20px; */
}
.tablebox{
  overflow: auto;
  height: 470px;
  padding: 0px 20px 15px 20px;
}
.wfxwList {
    height: auto;
    margin-bottom:20px;
}
.wfxwList li {
    line-height: 33px;
    height: 33px;
}
</style>
<style lang="scss">
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.casehome_tag .el-tabs__active-bar {
  width: 25% !important;
}
.casehome_tag .el-tabs__item {
  width: 25% !important;
  text-align: center;
  /* border-right: 1px solid #d8dbe0; */
  color: #9fa3af;
  height: auto;
  padding: 0px !important;
}
.casehome_tag .borderLine {
    border-right: 1px solid #d8dbe0;
    position: absolute;
    top:10px;
    right: 0px;
    width: 0px;
    height: 46px;
}
.casehome_tag .is-active {
  color: #409eff;
}
.casehome_tag .is-active .case_number {
  /* font-size: 40px; */
  color: #0074F5;
  font-weight: 540;
}
.casehome_tag .el-tab-pane {
    padding: 0 20px 20px 20px;
}
.casehome_tag .is-active .case_discribe {
  /* font-size: 18px; */
  line-height: 18px;
  font-weight: 540;
}
.casehome_tag .el-tabs__nav {
  width: 100%;
}
.casehome_tag .el-tabs__header {
  margin: 0;
}
.case_home .el-tabs__content {
  background: #fff;
}
.casehome_tag .el-radio-group {
  float: right;
}
.case_home .el-tabs--border-card > .el-tabs__content {
  padding: 0;
}
.case_home

  .el-tabs--border-card
  > .el-tabs__header
  .el-tabs__item.is-active {
  background-color: rgba(230, 234, 242, 1);
}
.icon_content .el-row {
  height: 60px;
  line-height: 50px;
  text-align: center;
}
.icon_content .el-col {
  border: 1px solid red;
}
.programType .el-radio__input {
  display: none;
}
.casehome_topic_select {
  float:right;
  width: 110px;
  margin-top: -5px;
  /* height: 16px; */
}
.casehome_topic_select .el-input__inner {
    border: 0px solid white;
    /* height: 16px; */
}
.casehome_topic_select.el-input__inner {
  border: 0;
}
.tablebox .el-table__header {
  background: #e9edf6;
}
#tab-fourth .el-tabs__item {
  border: 0 !important;
}
.case_home_bottom .el-radio-button {
    width: 88px !important;
}
.case_home_bottom .el-radio-button:last-child {
    /* width: */
    width: 47px !important;
}
.case_home .el-radio-button__inner {
  padding: 9px 16px;
  background: #f6f8fd;
}
</style>
