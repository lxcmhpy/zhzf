<template>
  <div class="com_searchAndpageBoxPadding" id="caseSupervision">
    <div :class="hideSomeSearch ? 'searchAndpageBox' : 'searchAndpageBox searchAndpageBox2'">
      <!-- <caseListSearch @showSomeSearch="showSomeSearch" @caseRecord="caseRecord" @searchCase="getUnRecordCase" :caseState="'unRecordCase'"></caseListSearch> -->
      <div class="handlePart caseHandleSearchPart">
        <!-- <div> -->
        <el-form
          :model="caseSearchForm"
          ref="caseSearchForm"
          class="caseSearchForm"
          label-width="100px"
        >
          <div>
            <div class="item">
              <el-form-item label="案件编号" prop="caseNumber">
                <el-input v-model="caseSearchForm.caseNumber"></el-input>
              </el-form-item>
            </div>
            <div class="item">
              <el-form-item label="案发地点" prop="afdd">
                <el-input v-model="caseSearchForm.afdd"></el-input>
              </el-form-item>
            </div>
            <div class="item">
              <el-form-item label="业务领域" prop="zfmlId">
                <el-select v-model="caseSearchForm.zfmlId" placeholder="请选择">
                  <el-option value label="全部"></el-option>
                  <el-option
                    v-for="item in lawCateList"
                    :key="item.cateId"
                    :label="item.cateName"
                    :value="item.cateId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="item">
              <el-form-item label="立案机构">
                <!-- <el-input v-model="caseSearchForm.organId"></el-input> -->
                <elSelectTree
                  ref="elSelectTreeObj"
                  :options="organTreeData"
                  :accordion="true"
                  :props="myprops"
                  :value="selectOrganId"
                  @getValue="handleOrgan"
                ></elSelectTree>
              </el-form-item>
            </div>

            <div class="item buttonItem">
              &nbsp;
              <el-button type="primary" size="medium" @click="searchCase(1)">查询</el-button>
              <el-button type="primary" size="medium" @click="resetSearchForm">重置</el-button>
              <el-button type="primary" size="medium" @click="showCaseCheck">案件抽查</el-button>
              <el-button
                type
                size="medium"
                :icon="hideSomeSearch ? 'el-icon-arrow-down':'el-icon-arrow-up'"
                @click="showSomeSearchEmit"
              ></el-button>
            </div>
          </div>
          <div :class="{hideSomeSearchClass:hideSomeSearch}">
            <!-- <div class="item">
              <el-form-item label="下级立案机构">
                <el-input v-model="caseSearchForm.caseNumber2"></el-input>
              </el-form-item>
            </div> -->
            <div class="item">
              <el-form-item label="当事人" prop="party">
                <el-input v-model="caseSearchForm.party"></el-input>
              </el-form-item>
            </div>
            <div class="item">
              <el-form-item label="案由" prop="caseName">
                <el-input v-model="caseSearchForm.caseName"></el-input>
              </el-form-item>
            </div>
            <div class="item">
              <el-form-item label="违法条款" prop="illegalLaw">
                <el-input v-model="caseSearchForm.illegalLaw"></el-input>
              </el-form-item>
            </div>
            <div class="item">
              <el-form-item label="处罚依据" prop="punishLaw">
                <el-input v-model="caseSearchForm.punishLaw"></el-input>
              </el-form-item>
            </div>
            <div class="item">
              <el-form-item label="执法人员" prop="staffId">
                <el-select v-model="caseSearchForm.staffId" placeholder="请选择">
                  <el-option
                    v-for="item in allStaff"
                    :key="item.id"
                    :label="item.lawOfficerName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div :class="{hideSomeSearchClass:hideSomeSearch}">
            
            <div class="item">
              <el-form-item label="违法行为" prop="caseCauseName">
                <el-input v-model="caseSearchForm.caseCauseName"></el-input>
              </el-form-item>
            </div>
            <div class="item">
              <el-form-item label="受案时间" style="display:inline-block">
                <el-date-picker
                  v-model="acceptTimeArray"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd"
                  :default-time="['00:00:00', '23:59:59']"
                ></el-date-picker> 
                <!-- <el-date-picker
                  v-model="caseSearchForm.acceptStartTime"
                  type="date"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker> -->
              </el-form-item>
              <!-- <el-form-item label="至" style="display:inline-block">
                <el-date-picker
                  v-model="caseSearchForm.acceptEndTime"
                  type="date"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item> -->
            </div>
            <div class="item">
              <el-form-item label="案件状态">
                <el-select v-model="caseSearchForm.caseStatus" placeholder="请选择">
                  <el-option value="全部" label="全部"></el-option>
                  <el-option
                    v-for="(item,index) in allCaseStatus"
                    :key="index"
                    :label="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <!-- </div> -->
      </div>

      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" highlight-current-row height="100%">
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <el-table-column prop="caseNumber" label="编号" align="center" min-width="200">
            <template slot-scope="scope">
              <span @click="showCaseInfo(scope.row)">{{scope.row.caseNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="zfml" label="业务领域" align="center" min-width="100"></el-table-column>
          <el-table-column prop="acceptTime" label="立案时间" align="center" min-width="150"></el-table-column>
          <el-table-column prop="name" label="当事人" align="center" min-width="100"></el-table-column>
          <el-table-column prop="vehicleShipId" label="车船号牌" align="center" min-width="100"></el-table-column>
          <el-table-column prop="caseName" label="案由" align="center" min-width="100">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" placement="top-start">
                <div slot="content" style="max-width:200px">{{scope.row.caseName}}</div>
                <span>{{scope.row.caseName}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="organName" label="立案机构" align="center" min-width="100"></el-table-column>
          <el-table-column prop="staff" label="执法人员" align="center" min-width="100"></el-table-column>
          <el-table-column prop="currentLinkName" label="当前环节" align="center" min-width="100"></el-table-column>
          <el-table-column label="标签" align="center" width="50">
            <template slot-scope="scope">
              <el-tooltip  v-if="scope.row.warContent" placement="top-start" effect="light">
                <div slot="content" class="warn-li">
                  <li v-for="(item,index) in JSON.parse(scope.row.warContent)" :key="index">
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
          <el-table-column prop="subNumber" label="督办次数" align="center" min-width="50"></el-table-column>
          <el-table-column  label="操作" min-width="50">
            <template slot-scope="scope">
              <el-button @click="handleCase(scope.row)" type="text">查看</el-button>
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
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <caseCheckDialog ref="caseCheckDialogRef" @setNewSearchCondition="setNewSearchCondition"></caseCheckDialog>
    <caseInfoDia ref="caseInfoDiaRef"></caseInfoDia>
  </div>
</template>
<script>
import { findSupervisionListApi } from "@/api/lawEnforcementSupervision";
import { getAllOrganApi } from "@/api/system";
import { findLawOfficerListApi } from "@/api/caseHandle";
import { queryLawCateByOrganIdApi } from "@/api/caseDeploy";
import iLocalStroage from "@/common/js/localStroage";
import caseCheckDialog from "./dialog/caseCheckDialog";
// import elSelectTree from "../../../components/elSelectTree/elSelectTree";
import caseInfoDia from "@/page/lawEnforcementSupervision/components/caseInfoDia";
import { caseSupervisionCommonMixins } from "@/common/js/caseHandle/caseSupervisionCommonMixins";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      caseSearchForm: {
        caseNumber: "",
        party: "",
        caseName: "",
        punishLaw: "",
        staffId: "",
        caseCauseName: "",
        // acceptTime: "",
        caseStatus: "",
        zfmlId: "",
        organId: iLocalStroage.gets("userInfo").organId,
        illegalLaw: "",
        partyType:'',
        sjNum:'',
        caseNumber2:'',
        acceptStartTime:'',
        acceptEndTime:''
      },
      hideSomeSearch: true,
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总页数
      lawCateList: [],
      allCaseStatus: [{ value: "已结案" }, { value: "未结案" }],
      organTreeData: [],
      myprops: {
        label: "label",
        value: "id",
      },
      selectOrganId: "", //默认选中机构的id
      acceptTimeArray: [],
      allStaff: [],
    };
  },
  computed: {
        ...mapGetters(["openTab"])
  },
  components: {
    caseCheckDialog,
    caseInfoDia,
  },
  mixins: [caseSupervisionCommonMixins],
  methods: {
    //查询列表
    searchCase(currentPage='') {
      if(currentPage) this.currentPage = 1;
      this.caseSearchForm.acceptStartTime = this.acceptTimeArray[0];
      this.caseSearchForm.acceptEndTime = this.acceptTimeArray[1];
      // this.caseSearchForm.organId = this.selectOrganId;
      let sentData = {
        ...this.caseSearchForm,
        current: this.currentPage,
        size: this.pageSize,
        flag: 5,
        isThisOrgan: 1,
      };
      findSupervisionListApi(sentData)
        .then((res) => {
          console.log(res);
          this.total = res.data.total;
          this.tableData = res.data.records || [];
          this.tableData.forEach(item => {
            item.name = item.party ? item.party : item.partyName;
          })
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
    //查看案件，跳转流程图
    handleCase(row) {
      this.$store.commit("setCaseId", row.id);
      this.$store.commit("setCaseNumber", row.caseNumber);
      this.$store.commit("setIsLawEnforcementSupervision", true);
      this.$store.commit("setLawEnforcementSupervisionType", "caseSupervision");
       //防止出现多个案件tab
      let newOpenTab = this.openTab.filter(item => {return item.isCase == false })
      this.$store.commit("reset_ALLTABS", newOpenTab);
      this.$router.push({
        name: "case_handle_flowChart",
      });
    },
    //显示案件抽查
    showCaseCheck() {
      this.$refs.caseCheckDialogRef.showModel();
    },
    
    //案件抽查
    setNewSearchCondition(condition){
      console.log('condition',condition)
       this.$refs["caseSearchForm"].resetFields();
      this.acceptTimeArray = condition.acceptTime;
      this.selectOrganId = condition.organId;
      for(let key in this.caseSearchForm){
        this.caseSearchForm[key] = condition[key]
      }
      this.searchCase();
    }
  },
  created() {
    // this.searchCase();
  },
};
</script>
<style lang="scss" >
#caseSupervision {
  .caseSearchForm > div {
    display: flex;
    .buttonItem {
      display: flex;
      height: 35px;
    }
  }
  div.hideSomeSearchClass {
    display: none;
  }
}
</style>