<template>
  <div class="handlePart caseHandleSearchPart">
    <div v-if="caseState == 'unRecordCase'">
      <el-button type="primary" size="medium" icon="el-icon-plus" @click="caseRecordEmit">立案登记</el-button>
    </div>
    <div :class="caseState != 'unRecordCase' ? 'fullWid' : '' ">
      <el-form
        :model="caseSearchForm"
        ref="caseSearchForm"
        class="caseSearchForm"
        label-width="100px"
      >
        <div :class="lineSearchSty">
          <div class="item" v-if="caseState != 'unRecordCase'">
            <el-form-item label="案号" prop="caseNumber">
              <el-input v-model="caseSearchForm.caseNumber"></el-input>
            </el-form-item>
          </div>

          <div class="item">
            <el-form-item label="当事人/单位" prop="party">
              <el-input v-model="caseSearchForm.party"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="车船号" prop="vehicleShipId">
              <el-input v-model="caseSearchForm.vehicleShipId"></el-input>
            </el-form-item>
          </div>
            <div class="item">&nbsp;
                <el-button type="primary" size="medium" icon="el-icon-search" @click="searchCaseEmit"></el-button>
                 <el-button type="primary" size="medium" icon="el-icon-refresh-right" @click="reset"></el-button>
                <el-button
                type
                size="medium"
                :icon="hideSomeSearch ? 'el-icon-arrow-down':'el-icon-arrow-up'"
                @click="showSomeSearchEmit"
                ></el-button>
            </div>
        </div>

        <!-- <div v-if="caseState == 'waitDeal'">
          <div class="item item2">
            <el-form-item label="当事人/单位">
              <el-input v-model="caseSearchForm.caseId"></el-input>
            </el-form-item>
          </div>
        </div>-->
        <div :class="{hideSomeSearchClass:hideSomeSearch,lineTwoStyle:caseState == 'waitArchive'}">
            <div class="item">
                <el-form-item label="案件类型" prop="caseType">
                    <el-select
                        v-model="caseSearchForm.caseType"
                        placeholder="请选择"
                    >
                        <el-option
                        v-for="item in caseTypeList"
                        :key="item.id"
                        :label="item.typeName"
                        :value="item.typeName"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="item" v-if="caseState == 'unRecordCase' || caseState == 'waitDeal'">
                <el-form-item label="案件状态" prop="caseStatus">
                    <!-- <el-input v-model="caseSearchForm.caseStatus"></el-input> -->
                    <el-select
                        v-model="caseSearchForm.caseStatus"
                        placeholder="请选择"
                    >
                        <el-option
                        v-for="item in caseStateList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </div>

          <div class="item" v-if="caseState == 'waitDeal' || caseState == 'approveIng'">
            <el-form-item label="当前环节" v-if="caseState == 'waitDeal'" prop="currentLinkName">
                <el-select
                v-model="caseSearchForm.currentLinkName"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in linkList"
                  :key="item.id"
                  :label="item.linkName"
                  :value="item.linkName"
                ></el-option>
              </el-select>

            </el-form-item>
            <el-form-item label="当前环节" v-if="caseState == 'approveIng'" prop="currentLinkName">
                <el-select
                v-model="caseSearchForm.currentLinkName"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item,index) in approvalInglinkList"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>

            </el-form-item>
          </div>
         
          <div class="item" v-if="caseState == 'myApproval'">
            <el-form-item label="申请人" prop="applicant">
              <el-input v-model="caseSearchForm.applicant"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="违法行为" prop="caseCauseName">
              <el-input v-model="caseSearchForm.caseCauseName"></el-input>
            </el-form-item>
          </div>
          <div class="item" v-if="caseState != 'myApproval'">
            <el-form-item label="受案时间" prop="acceptTimeArray">
              <el-date-picker
                v-model="acceptTimeArray"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd"
                :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="item" v-if="caseState == 'waitArchive'">
            <el-form-item label="结案时间" prop="endCaseTimeArray">
              <el-date-picker
                v-model="endCaseTimeArray"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd"
                :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="item" v-if="caseState == 'myApproval'" >
            <el-form-item label="申请时间" prop="applyTimeArray">
              <el-date-picker
                v-model="applyTimeArray"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd"
                :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import {
 getQueryLinkListApi,
 getQueryCaseTypeByOrganIdApi,
} from "@/api/caseHandle";
import { getDictListDetailApi } from "@/api/system";
export default {
  data() {
    return {
      caseSearchForm: {
        caseNumber:"",
        party:"",
        vehicleShipId:"",
        caseType:"",
        caseCauseName:"",
        caseStatus:"",
        currentLinkName:"",
        acceptStartTime:"",
        acceptEndTime:"",
        applicant: "",
        applyStartTime: "",
        applyEndTime: "",
        endCaseStartTime: "",
        endCaseEndTime: "",
      },
      endCaseTimeArray: [],
      applyTimeArray: [],
      acceptTimeArray: [],
      hideSomeSearch: true,
      linkList:[], //环节
      caseTypeList:[],//类型
      caseStateList:[],//状态
      dictId: this.caseState=="waitDeal" ?  "ef38274ddea12be26e9a8c1bf23cd401" : "324701f1633dd65ca79a28fbc79c1628",
      approvalInglinkList:['立案登记','案件调查报告','结案报告'],
    };
  },
  computed: {
    lineSearchSty() {
      if (this.caseState == "unRecordCase") {
        return "unRecordCaseStyle";
      } else if (this.caseState == "waitDeal") {
        return "waitDealStyle";
      } else if (this.caseState == "approveIng") {
        return "approveIngStyle";
      }
    }
  },
  props: ["caseState"],
  methods: {
    caseRecord() {},
    //展开
    showSomeSearchEmit() {
      this.$emit("showSomeSearch");
      this.hideSomeSearch = !this.hideSomeSearch;
    },
    caseRecordEmit() {
      this.$emit("caseRecord");
    },
    //查询所有环节
    getAllLinkList() {
      getQueryLinkListApi().then(
        res => {
          this.linkList = res.data;
        },
        error => {
          console.log(error)
        }
      );
    },
    //查询所有案件类型
    getQueryCaseTypeList() {
      let organId = iLocalStroage.gets("userInfo").organId;
      getQueryCaseTypeByOrganIdApi(organId).then(
        res => {
          console.log('类型',res);
          this.caseTypeList = res.data;
        },
        error => {
          console.log(error)
        }
      );
    },
    //搜索
    searchCaseEmit(){
        this.caseSearchForm.applyStartTime = this.applyTimeArray[0]
        this.caseSearchForm.applyEndTime = this.applyTimeArray[1]
        this.caseSearchForm.acceptStartTime = this.acceptTimeArray[0]
        this.caseSearchForm.acceptEndTime = this.acceptTimeArray[1]
        this.caseSearchForm.endCaseStartTime = this.endCaseTimeArray[0]
        this.caseSearchForm.endCaseEndTime = this.endCaseTimeArray[1]
        this.caseSearchForm.resetCurrent = 1;
        this.$emit('searchCase',this.caseSearchForm);
    },
    //重置
    reset() {
      this.endCaseTimeArray = [];
      this.applyTimeArray = [];
      this.acceptTimeArray =[];
      this.$refs["caseSearchForm"].resetFields();
      this.searchCaseEmit();
    },
    //查询案件状态
    getQueryCaseStateList(){
      getDictListDetailApi(this.dictId).then(
        res => {
          console.log("状态", res);
          // this.options = res.data;
          this.caseStateList = res.data;
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  created(){
      this.getAllLinkList();
      this.getQueryCaseTypeList();
      this.getQueryCaseStateList();
  }
};
</script>
