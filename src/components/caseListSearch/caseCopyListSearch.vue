<template>
  <div class="handlePart caseHandleSearchPart">
    <div v-if="caseState == 'copy'">
      <el-button type="primary" size="medium" icon="el-icon-plus" @click="newAdd">新增抄告</el-button>
    </div>
    <div :class="caseState != 'copy' ? 'fullWid' : '' ">
      <el-form :model="caseSearchForm" ref="caseSearchForm" class="caseSearchForm" label-width="100px">
        <div>
          <div class="item" v-if="caseState == 'copy'">
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
            <el-form-item label="目标机构">
              <el-input v-model="caseSearchForm.organMb"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="处理状态">
              <!-- <el-input v-model="caseSearchForm.caseStatus"></el-input> -->
              <el-select v-model="caseSearchForm.state" placeholder="全部">
                <el-option v-for="item in caseStateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item">&nbsp;
            <el-button type="primary" size="medium" icon="el-icon-search" @click="searchCaseEmit"></el-button>
            <el-button type size="medium" :icon="hideSomeSearch ? 'el-icon-arrow-down':'el-icon-arrow-up'" @click="showSomeSearchEmit"></el-button>
          </div>
        </div>
        <div :class="{hideSomeSearchClass:hideSomeSearch,lineTwoStyle:caseState == 'waitArchive'}">
          <div class="item">
            <el-form-item label="违法行为">
              <el-input v-model="caseSearchForm.wfss"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="申请人">
              <el-input v-model="caseSearchForm.person"></el-input>
            </el-form-item>
          </div>

          <div class="item">
            <el-form-item label="发起时间">
              <el-date-picker v-model="acceptTimeArray" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd" :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
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
import {
  getDictListDetailApi
} from "@/api/system";
export default {
  data() {
    return {
      caseSearchForm: {
        caseNumber: "",
        party: "",
        vehicleShipId: "",
        caseType: "",
        wfss:"",
        state: "",
        person: "",
        endTime: "",
        beginTime: "",
      },
      acceptTimeArray:[],
      hideSomeSearch: true,
      caseStateList: [
        {
          value: '1',
          label: '已完成'
        },
        {
          value: '2',
          label: '已发送'
        },
      ]
    };
  },
  computed: {},
  props: ["caseState"],
  methods: {
    caseRecord() { },
    //展开
    showSomeSearchEmit() {
      this.$emit("showSomeSearch");
      this.hideSomeSearch = !this.hideSomeSearch;
    },
    newAdd() {
       this.$router.push({
          name: 'addCopyOne',
          params:{
            fromSlide: true
          }
      })
    },
    //搜索
    searchCaseEmit() {
      console.log("状态",this.caseSearchForm.state);
      this.caseSearchForm.beginTime = this.acceptTimeArray[0]
      this.caseSearchForm.endTime = this.acceptTimeArray[1]
      console.log("查询条件",this.caseSearchForm)
      this.$emit('searchCase', this.caseSearchForm);
    },
  },
  created() {
  }
};
</script>
