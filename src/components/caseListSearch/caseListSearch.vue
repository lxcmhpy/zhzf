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
        label-width="90px"
      >
        <div :class="lineSearchSty">
          <div class="item" v-if="caseState != 'unRecordCase'">
            <el-form-item label="案号">
              <el-input v-model="caseSearchForm.caseNumber"></el-input>
            </el-form-item>
          </div>

          <div class="item">
            <el-form-item label="当事人/单位">
              <el-input v-model="caseSearchForm.party"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="车船号">
              <el-input v-model="caseSearchForm.vehicleShipId"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="案件类型">
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
            <el-form-item label="案件状态">
              <el-input v-model="caseSearchForm.caseStatus"></el-input>
            </el-form-item>
          </div>

          <div class="item" v-if="caseState == 'waitDeal' || caseState == 'approveIng'">
            <el-form-item label="当前环节">
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
          </div>
          <div class="item" v-if="caseState == 'myApproval'">
            <el-form-item label="申请人">
              <el-input v-model="caseSearchForm.caseStatus"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-button type="primary" size="medium" icon="el-icon-search" @click="searchCaseEmit"></el-button>
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
            <el-form-item label="违法行为">
              <el-input v-model="caseSearchForm.caseCauseName"></el-input>
            </el-form-item>
          </div>
          <div class="item" v-if="caseState != 'myApproval'">
            <el-form-item label="受案时间">
              <el-date-picker
                v-model="caseSearchForm.value1"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </div>

          <div class="item" v-if="caseState == 'waitArchive'">
            <el-form-item label="结案时间">
              <el-date-picker
                v-model="caseSearchForm.value1"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </div>

          <div class="item" v-if="caseState == 'myApproval'" >
            <el-form-item label="申请时间">
              <el-date-picker
                v-model="caseSearchForm.value1"
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
  </div>
</template>
<script>
import {
 getQueryLinkListApi,
 getQueryCaseTypeListApi,
} from "@/api/caseHandle";
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
      },
      hideSomeSearch: true,
      linkList:[], //环节
      caseTypeList:[],//类型
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
    //查询所以环节
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
      getQueryCaseTypeListApi().then(
        res => {
          console.log('类型',res);
          this.caseTypeList = res.data.records;
        },
        error => {
          console.log(error)
        }
      );
    },
    //搜索
    searchCaseEmit(){
        console.log('点击')
        this.$emit('searchCase',this.caseSearchForm);
    }
  },
  created(){
      this.getAllLinkList();
      this.getQueryCaseTypeList();
  }
};
</script>