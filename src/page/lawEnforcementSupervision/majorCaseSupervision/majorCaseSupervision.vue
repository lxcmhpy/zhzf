<template>
  <div class="com_searchAndpageBoxPadding" id="majorCaseSupervision">
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
              <el-form-item label="立案地点" prop="afdd">
                <el-input v-model="caseSearchForm.afdd"></el-input>
              </el-form-item>
            </div>
            <div class="item">
              <el-form-item label="执法领域" prop="zfmlId">
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
                <!-- <el-input v-model="caseSearchForm.caseNumber"></el-input> -->
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
              <el-button type="primary" size="medium" @click="searchCase">查询</el-button>
              <el-button type="primary" size="medium" @click="resetSearchForm">重置</el-button>
              <el-button
                type
                size="medium"
                :icon="hideSomeSearch ? 'el-icon-arrow-down':'el-icon-arrow-up'"
                @click="showSomeSearchEmit"
              ></el-button>
            </div>
          </div>
          <div :class="{hideSomeSearchClass:hideSomeSearch}">
            <div class="item">
              <el-form-item label="下级立案机构">
                <el-input v-model="caseSearchForm.caseNumber2"></el-input>
              </el-form-item>
            </div>
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
              <el-form-item label="认定依据" prop="illegalLaw">
                <el-input v-model="caseSearchForm.illegalLaw"></el-input>
              </el-form-item>
            </div>
            <div class="item">
              <el-form-item label="处罚依据" prop="punishLaw">
                <el-input v-model="caseSearchForm.punishLaw"></el-input>
              </el-form-item>
            </div>
          </div>
          <div :class="{hideSomeSearchClass:hideSomeSearch}">
            <div class="item">
              <el-form-item label="执法人员" prop="staffId">
                <!-- <el-input v-model="caseSearchForm.staff"></el-input> -->
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
            <div class="item">
              <el-form-item label="违法行为代码" prop="caseCauseName">
                <el-input v-model="caseSearchForm.caseCauseName"></el-input>
              </el-form-item>
            </div>
            <div class="item">
              <el-form-item label="立案时间">
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
              </el-form-item>
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
        <div class="otherHandelBtns">
          <el-button type="primary" size="medium" @click="showsetMajorCaseMoney">重大案件金额设置标准</el-button>
          <el-button size="medium" @click="showCaseFile">要求上报备案材料</el-button>
        </div>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          highlight-current-row
          height="100%"
          @row-click="getCurrentRow"
        >
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <el-table-column prop="caseNumber" label="编号" align="center" width="200">
            <template slot-scope="scope">
              <span @click="showCaseInfo(scope.row)">{{scope.row.caseNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="zfml" label="执法领域" align="center" min-width="100"></el-table-column>
          <el-table-column prop="party" label="当事人" align="center" min-width="150"></el-table-column>
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
          <el-table-column prop="punishAmount" label="处罚金额" align="center" min-width="100"></el-table-column>
          <el-table-column prop="isUploadImp" label="要求上传备案材料" align="center" min-width="100"></el-table-column>
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
    <setMajorCaseMoney ref="setMajorCaseMoneyRef" @getNewData="getMajorCaseMoney"></setMajorCaseMoney>
    <caseInfoDia ref="caseInfoDiaRef"></caseInfoDia>
  </div>
</template>
<script>
import {
  findImportantSupervisionListApi,
  addEditcaseImportantApi,
} from "@/api/lawEnforcementSupervision";
import { queryLawCateByOrganIdApi } from "@/api/caseDeploy";
import iLocalStroage from "@/common/js/localStroage";
import setMajorCaseMoney from "./dialog/setMajorCaseMoney";
import { getDictListDetailByNameApi } from "@/api/system";
import { caseSupervisionCommonMixins } from "@/common/js/caseHandle/caseSupervisionCommonMixins";

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
        acceptTime: "",
        caseStatus: "",
        zfmlId: "",
        organId: "",
        illegalLaw: "",
        caseNumber2:'',
      },
      majorCaseMoney: "",
      currentRowData: "",
    };
  },
  components: {
    setMajorCaseMoney,
  },
  mixins: [caseSupervisionCommonMixins],
  methods: {
    getCurrentRow(row) {
      console.log("row", row);
      this.currentRowData = row;
    },
    //查询列表
    searchCase() {
      this.caseSearchForm.acceptStartTime = this.acceptTimeArray[0];
      this.caseSearchForm.acceptEndTime = this.acceptTimeArray[1];
      let sentData = {
        ...this.caseSearchForm,
        current: this.currentPage,
        size: this.pageSize,
        flag: 5,
        isThisOrgan: 1,
        punishAmount: Number(this.majorCaseMoney),
      };
      console.log("sentData", sentData);
      findImportantSupervisionListApi(sentData)
        .then((res) => {
          console.log(res);
          this.total = res.data.total;
          this.tableData = res.data.records;
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
      this.$store.commit(
        "setLawEnforcementSupervisionType",
        "majorCaseSupervision"
      );

      this.$router.push({
        name: "case_handle_flowChart",
      });
    },

    //显示上报材料
    showCaseFile() {
      if (!this.currentRowData) {
        this.$message("请选择案件");
        return;
      }
      this.$store.commit("setCaseId", this.currentRowData.id);
      this.$store.commit("setCaseNumber", this.currentRowData.caseNumber);
      this.$store.commit("setIsLawEnforcementSupervision", true);
      this.$store.commit(
        "setLawEnforcementSupervisionType",
        "majorCaseSupervision"
      );
      if (this.currentRowData.isUploadImp == "是") {
        this.$router.push({ name: "lawEnforcementSupervision_caseFileList" });
        return;
      }
      let sentData = {
        caseBasicinfoId: this.currentRowData.id,
        isUpload: "是",
      };
      addEditcaseImportantApi(sentData)
        .then((res) => {
          console.log(res);
          this.$message({
            type: "success",
            message: "要求上传备案材料成功",
          });
          this.$router.push({ name: "lawEnforcementSupervision_caseFileList" });
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
    //显示重大案件金额设定标准
    showsetMajorCaseMoney() {
      console.log(11111);
      this.$refs.setMajorCaseMoneyRef.showModel();
    },
    //获取重大案件金额设置标准
    getMajorCaseMoney() {
      getDictListDetailByNameApi("重大案件金额标准")
        .then((res) => {
          console.log(res);
          this.majorCaseMoney =
            res.data[0].name > res.data[1].name
              ? res.data[0].name
              : res.data[1].name;
          this.searchCase();
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
  },
  created() {
    this.getMajorCaseMoney();
  },
};
</script>
<style lang="scss" >
#majorCaseSupervision {
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
  .otherHandelBtns {
    text-align: right;
    margin-bottom: 10px;
    button:last-child {
      background: #4aafa7;
      color: #fff;
      border-color: #4aafa7;
    }
  }
}
</style>