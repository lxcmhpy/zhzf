<template>
  <div class="handlePart caseHandleSearchPart">
    <div v-if="caseState == 'transfer'">
      <el-button type="primary" size="medium" icon="el-icon-plus" @click="newAdd">新增移送</el-button>
    </div>
    <div>
      <el-form :model="caseSearchForm" ref="caseSearchForm" class="caseSearchForm" label-width="100px">
        <div :class="lineSearchSty">
          <div class="item" v-if="caseState == 'transfer'">
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
            <el-form-item label="目标机构" prop="organMb">
              <el-input v-model="caseSearchForm.organMb"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="处理状态" prop="state">
              <!-- <el-input v-model="caseSearchForm.caseStatus"></el-input> -->
              <el-select v-model="caseSearchForm.state" placeholder="全部">
                <el-option v-for="item in caseStateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item">&nbsp;
            <el-button type="primary" size="medium" icon="el-icon-search" @click="searchCaseEmit"></el-button>
            <el-button type="primary" size="medium" icon="el-icon-refresh-right" @click="reset"></el-button>
            <el-button type size="medium" :icon="hideSomeSearch ? 'el-icon-arrow-down':'el-icon-arrow-up'" @click="showSomeSearchEmit"></el-button>
          </div>
        </div>
        <div :class="{hideSomeSearchClass:hideSomeSearch,lineTwoStyle:caseState == 'waitArchive'}">
          <div class="item">
            <el-form-item label="违法行为" prop="wfxw">
              <el-input v-model="caseSearchForm.wfxw"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="申请人" prop="person">
              <el-input v-model="caseSearchForm.person"></el-input>
            </el-form-item>
          </div>

          <div class="item">
            <el-form-item label="发起时间" prop="acceptTimeArray">
              <el-date-picker v-model="caseSearchForm.acceptTimeArray" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd" :default-time="['00:00:00', '23:59:59']">
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
        person: '',
        time: '',
        party: "",
        organMb: "",
        wfxw: "",
        acceptTimeArray:[],
      },
      hideSomeSearch: true,
      linkList: [], //环节
      caseTypeList: [],//类型
      caseStateList: [
        // '已发送','已接收','已退回','已完成','已关闭'
       {
          value: '1',
          label: '已发送'
        },
        {
          value: '2',
          label: '已完成'
        },
        {
          value: '3',
          label: '已接收'
        },
        {
          value: '4',
          label: '已退回'
        },
        {
          value: '5',
          label: '已关闭'
        },
        ],//状态
      dictId: this.caseState == "waitDeal" ? "ef38274ddea12be26e9a8c1bf23cd401" : "324701f1633dd65ca79a28fbc79c1628",
    };
  },
  computed: {
    lineSearchSty() {
      if (this.caseState == "transfer") {
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
    caseRecord() { },
    //展开
    showSomeSearchEmit() {
      this.$emit("showSomeSearch");
      this.hideSomeSearch = !this.hideSomeSearch;
    },
    newAdd() {
      //   this.$emit("caseRecord");
      this.$router.push({
        name: 'case_handle_addSelect',
        params: {
          fromSlide: true
        }
      })
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
    // //查询所有案件类型
    // getQueryCaseTypeList() {
    //   getQueryCaseTypeListApi().then(
    //     res => {
    //       console.log('类型', res);
    //       this.caseTypeList = res.data.records;
    //     },
    //     error => {
    //       console.log(error)
    //     }
    //   );
    // },
    //搜索
    searchCaseEmit() {
      console.log('点击')
     console.log("shuju",this.caseSearchForm.acceptTimeArray)
      if(this.caseSearchForm.acceptTimeArray){
        this.caseSearchForm.beginTime = this.caseSearchForm.acceptTimeArray[0];
        this.caseSearchForm.endTime = this.caseSearchForm.acceptTimeArray[1];
      }else{
        this.caseSearchForm.beginTime = '';
        this.caseSearchForm.endTime = '';
      }
      
      this.caseSearchForm.current = 1
      this.caseSearchForm.records = JSON.stringify(this.caseSearchForm.records)
      this.$emit('searchCase', this.caseSearchForm);
    },
    //重置
    reset() {
      this.$refs["caseSearchForm"].resetFields();
      this.searchCaseEmit();
    },
    //查询案件状态
    // getQueryCaseStateList() {
    //   getDictListDetailApi(this.dictId).then(
    //     res => {
    //       console.log("状态", res);
    //       // this.options = res.data;
    //       this.caseStateList = res.data;
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
    // }
  },
  created() {
    this.getAllLinkList();
    // this.getQueryCaseTypeList();
    // this.getQueryCaseStateList();
  }
};
</script>
