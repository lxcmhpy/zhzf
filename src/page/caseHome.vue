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
            </span>
            <center>
              <div style="margin-top: 15px;width:60%">
                <el-input placeholder="请输入案件关键字" v-model="waitArchiveSearch" @keyup.enter.native="search(2,waitArchiveSearch)">
                  <el-button slot="append" icon="el-icon-search" @click="search(2,waitArchiveSearch)"></el-button>
                </el-input>
              </div>
            </center>
          </el-tab-pane>
          <el-tab-pane label="待审批" name="fourth">
            <span slot="label">
              <div class="case_number">0</div>
              <div class="case_discribe">
                <i class="iconfont law-save"></i> 待审批
              </div>
              <div class="hideen">112</div>
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

      <el-table :data="tableData" stripe class="padding22" style="width: 100%" height="calc(100% - 300px)" highlight-current-row @current-change="clickCase">
        <el-table-column prop="caseNumber" label="案号" align="center"></el-table-column>
        <el-table-column prop="name" label="当事人/单位" align="center"></el-table-column>
        <el-table-column prop="vehicleShipId" label="车/船号" align="center"></el-table-column>
        <el-table-column prop="caseCauseName" label="违法行为" align="center"></el-table-column>
        <el-table-column prop="acceptTime" label="受案时间" align="center"></el-table-column>
        <el-table-column prop="caseType" label="案件类型" align="center"></el-table-column>
        <el-table-column prop="currentLinkName" label="当前环节" align="center"></el-table-column>
        <el-table-column prop="caseStatus" label="案件状态" align="center"></el-table-column>
      </el-table>
      <center>
        <el-button size="small" @click="router()">查看更多</el-button>
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
              <img src="@/img/icon_lit_yyunc.png">营运车辆
            </li>
            <li class="imgbox" @click="infoCheck(industry)">
              <img src="@/img/icon_lit_jyyehu.png">经营业户
            </li>
            <li class="imgbox">
              <img src="@/img/icon_lit_kyxlu.png">客运线路<br />标志牌
            </li>
          </ul>
          <ul>
            <li class="imgbox">
              <img src="@/img/icon_lit_jyyh.png">道路运输<br />从业人员
            </li>
            <li class="imgbox">
              <img src="@/img/icon_lit_car.png">出租车
            </li>
            <li class="imgbox">
              <img src="@/img/icon_lit_cbyyzheng.png">船舶营运证
            </li>
          </ul>
          <ul>
            <li class="imgbox">
              <img src="@/img/icon_lit_cy.png">船员适应证
            </li>
            <li class="imgbox">
              <img src="@/img/icon_lit_slu.png">水路运输经<br />营许可证
            </li>
            <li class="imgbox">
              <img src="@/img/icon_lit_zge.png">经营资格证<br />（企业）
            </li>
          </ul>

        </div>
      </div>

      <div class="shadow case_home_bottom">
        <el-form ref="form" :model="caseForm" label-width="80px">
          <div class="casehome_topic">立案登记
            <div style="float:right;height:20px" class="programType">
              <el-radio-group v-model="caseForm.programType">
                <el-radio :label='1'>简易程序</el-radio>
                <el-radio :label='2'>一般程序</el-radio>
              </el-radio-group>
            </div>
          </div>
          <el-radio-group v-model="caseForm.wayType" size="medium" fill="#E6EAF2" text-color="#0074F5" class="btn_back">
            <el-radio-button label="公路路政"></el-radio-button>
            <el-radio-button label="道路运政"></el-radio-button>
            <el-radio-button label="水路运政"></el-radio-button>
            <el-radio-button label="更多"> <i class="el-icon-arrow-down"></i></el-radio-button>
          </el-radio-group>
          <div class="casehome_topic">常见违法行为
            <span class="casehome_topic_select">
              <el-select v-model="value" placeholder="请选择" size='small'>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </span>
          </div>
        </el-form>
        <ul v-for="item in caseList" :key="item.id">
          <li @click="caseRecord"><span class="bull">&bull;</span>{{item.value}}</li>
        </ul>
        <center>
          <el-button size="small" @click="router(unRecordCase)">查看更多</el-button>
        </center>

      </div>

    </div>
    <caseRegisterDiag ref="caseRegisterDiagRef"></caseRegisterDiag>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/js/mixins";
import iLocalStroage from "@/js/localStroage";
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
      }, {
        value: '2',
        label: '双皮奶'
      }, {
        value: '3',
        label: '蚵仔煎'
      }, {
        value: '4',
        label: '龙须面'
      }],
      value: '选项1',
      caseList: [{
        value: '选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1',
      }, {
        value: '选项2',
      }, {
        value: '选项3',
      }, {
        value: '选项4',
      }, {
        value: '选项5',
      }],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总数
      caseSearchForm: {
        caseNumber: "",
        caseCauseName: "",
      },
      caseForm: {
        programType: 1,
        wayType: '公路路政',
      },
    };
  },
  methods: {
    handleClick(tab) {
      console.log(tab.index);
      let searchData = {
        flag: tab.index
      }
      this.getCaseList2(searchData)
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
      this.$router.push({ name: 'industry' });
    },
    // 查看更多
    router(path) {
      this.$router.push({ name: path });
    },
    // 立案登记
    caseRecord() {
      this.$refs.caseRegisterDiagRef.showModal();
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
    }

  },
  mounted() {
    // let data = {};
    let searchData = {
      flag: 0
    }
    this.getCaseList2(searchData);
  }
};
</script>
<style scoped>
.case_home {
  width: 100%;
  height: 100%;
  padding: 22px;
  box-sizing: border-box;
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
  margin-right: 22px;
  box-sizing: border-box;

  /* background: pink; */
}
.width356 {
  width: 356px;
  box-sizing: border-box;
}
.padding22 {
  padding: 22px;
}
.colorD8DBE0 {
  background: rgba(246, 248, 253, 1);
}
.case_home_bottom {
  height: calc(100% - 354px);
  padding: 0 20px;
}
.case_home_top {
  height: 332px;
  margin-bottom: 22px;
  padding: 0 20px;
}
.casehome_topic {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 550;
  color: rgba(43, 49, 62, 1);
}
.casehome_topic /deep/ span {
  float: right;
  font-size: 14px;
  line-height: 50px;
  font-weight: 400;
}
.case_number {
  font-size: 38px;
}
.case_discribe {
  font-size: 16px;
  line-height: 50px;
}
ul {
  height: calc(15% - 20px);
}
li {
  width: 100%;
  height: 100%;
  line-height: 40px;
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
.icon_content /deep/ ul {
  margin-top: 10px;
  clear: both;
  height: 80px;
}

.icon_content /deep/ li {
  cursor: pointer;
}

img {
  display: block;
  margin: 0 auto;
}
</style>
<style   scoped>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.casehome_tag /deep/ .el-tabs__active-bar {
  width: 25%;
}
.casehome_tag /deep/ .el-tabs__item {
  width: 25%;
  text-align: center;
  border-right: 1px solid #d8dbe0;
  color: #9fa3af;
}
.casehome_tag /deep/ .is-active {
  color: #409eff;
}
.casehome_tag /deep/ .is-active /deep/ .case_number {
  font-size: 40px;
  font-weight: 540;
}
.casehome_tag /deep/ .is-active /deep/ .case_discribe {
  font-size: 18px;
  font-weight: 540;
}
.casehome_tag /deep/ .el-tabs__nav {
  width: 100%;
}
.casehome_tag /deep/ .el-tabs__header {
  margin: 0;
}
.case_home /deep/ .el-tabs__content {
  background: #fff;
}
.casehome_tag /deep/ .el-radio-group {
  float: right;
}
.case_home /deep/ .el-tabs--border-card > .el-tabs__content {
  padding: 0;
}
.case_home
  /deep/
  .el-tabs--border-card
  > .el-tabs__header
  .el-tabs__item.is-active {
  background-color: rgba(230, 234, 242, 1);
}
.icon_content /deep/ .el-row {
  height: 60px;
  line-height: 50px;
  text-align: center;
}
.icon_content /deep/ .el-col {
  border: 1px solid red;
}
.programType /deep/ .el-radio__input {
  display: none;
}
.casehome_topic_select {
  display: inline-block;
  width: 110px;
}
.casehome_topic_select /deep/.el-input__inner {
  border: 0;
}

.case_home /deep/ .el-radio-button__inner {
  padding: 10px 16px;
  background: #f6f8fd;
}
</style>