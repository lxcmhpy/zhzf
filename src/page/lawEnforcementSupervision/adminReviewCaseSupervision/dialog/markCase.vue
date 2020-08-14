<template>
  <el-dialog
    title="案件列表"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="800px"
    custom-class="markCaseBox"
  >
    <el-form
      :model="markCaseSearchForm"
      ref="checkSearchForm"
      class="checkSearchForm"
      label-width="80px"
    >
      <div class="flexBox">
        <el-form-item label="案件编号">
          <el-input v-model="markCaseSearchForm.caseNumber"></el-input>
        </el-form-item>
        <el-form-item label="执法领域">
          <el-select v-model="markCaseSearchForm.zfmlId" placeholder="请选择">
              <el-option value label="全部"></el-option>
              <el-option
                v-for="item in lawCateList"
                :key="item.cateId"
                :label="item.cateName"
                :value="item.cateId"
              ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="当事人">
          <el-input v-model="markCaseSearchForm.party"></el-input>
        </el-form-item>
      </div>
      <div class="flexBox">
        <el-form-item label="立案时间" style="width:435px"> 
          <el-date-picker
            v-model="acceptTimeArrayMark"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd"
            :default-time="['00:00:00', '23:59:59']"
          ></el-date-picker>
        </el-form-item>
        <div class="item buttonItem">
          <el-button type="primary" size="medium" @click="searchMarkCase">查询</el-button>
          <el-button type="primary" size="medium" @click="resetSearchForm">重置</el-button>
        </div>
      </div>
    </el-form>
    <div class="item buttonItem">
      <el-button type="primary" size="medium" @click="markTo('2')">标记为行政复议案件</el-button>
      <el-button type="primary" size="medium" @click="markTo('3')">标记为行政诉讼案件</el-button>
    </div>
    <el-table
      :data="markCasetableData"
      stripe
      style="width: 100%"
      highlight-current-row
      height="300px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="caseNumber" label="编号" align="center"></el-table-column>
      <el-table-column prop="zfml" label="执法领域" align="center"></el-table-column>
      <el-table-column prop="party" label="当事人" align="center"></el-table-column>
      <el-table-column prop="vehicleShipId" label="车船号牌" align="center"></el-table-column>
      <el-table-column prop="caseName" label="案由" align="center"></el-table-column>
      <el-table-column prop="organName" label="立案机构" align="center"></el-table-column>
      <el-table-column prop="isR" label="是否行政复议" align="center"></el-table-column>
      <el-table-column prop="isLi" label="是否行政诉讼" align="center"></el-table-column>
    </el-table>
    <div class="paginationBox">
      <el-pagination
        @size-change="handleSizeChangeMarkCase"
        @current-change="handleCurrentChangeMarkCase"
        :current-page="currentPageMarkCase"
        background
        :page-sizes="[10, 20, 30, 40]"
        layout="prev, pager, next,sizes,jumper"
        :total="totalMarkCase"
      ></el-pagination>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <!-- <el-button type="primary" @click="startCheck()">确定</el-button> -->
    </span>
  </el-dialog>
</template>
<script>
import { queryLawCateByOrganIdApi } from "@/api/caseDeploy";
import iLocalStroage from "@/common/js/localStroage";
import {
  queryCaseByReconListApi,
  addReconsiderationApi,
} from "@/api/lawEnforcementSupervision";
import { caseSupervisionCommonMixins } from "@/common/js/caseHandle/caseSupervisionCommonMixins";

export default {
  data() {
    return {
      visible: false,
      markCaseSearchForm: {
        caseNumber: "",
        zfmlId:"",
        party:"",
        acceptStartTime:'',
        acceptEndTime:''
      },
      markCasetableData: [],
      currentPageMarkCase: 1, //当前页
      pageSizeMarkCase: 10, //pagesize
      totalMarkCase: 0, //总页数
      multipleSelection: [],
      acceptTimeArrayMark:['','']
    };
  },
  mixins: [caseSupervisionCommonMixins],
  methods: {
    showModel() {
      this.visible = true;
      this.searchMarkCase();
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$emit('getNewData');
    },
    //更改每页显示的条数
    handleSizeChangeMarkCase(val) {
      this.pageSizeMarkCase = val;
      this.currentPageMarkCase = 1;
      this.searchMarkCase();
    },
    //更换页码
    handleCurrentChangeMarkCase(val) {
      this.currentPageMarkCase = val;
      this.searchMarkCase();
    },
    searchMarkCase() {
      this.markCaseSearchForm.acceptStartTime = this.acceptTimeArrayMark && this.acceptTimeArrayMark[0] ? this.acceptTimeArrayMark[0] : '';
      this.markCaseSearchForm.acceptEndTime = this.acceptTimeArrayMark && this.acceptTimeArrayMark[1] ? this.acceptTimeArrayMark[1] : '';
      let sentData = {
        ...this.markCaseSearchForm,
        current: this.currentPageMarkCase,
        size: this.pageSizeMarkCase,
        flag: 5,
        isThisOrgan: 1,
        reconType: "",
      };
      queryCaseByReconListApi(sentData)
        .then((res) => {
          console.log(res);
          this.totalMarkCase = res.data.total;
          this.markCasetableData = res.data.records;
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
    //标记
    markTo(flag) {
      let sentData = [];
      if(this.multipleSelection.length ==0){
        this.$message('请选择案件')
        return;
      }
      this.multipleSelection.forEach((item) => {
        let data = {
          id: item.reconId,
          caseBasicinfoId: item.id,
          isR: flag == "2" ? "是" : item.isR,
          isLi: flag == "3" ? "是" : item.isLi,
        };
        sentData.push(data);
      });
      addReconsiderationApi(sentData)
        .then((res) => {
          console.log(res);
          this.$message({
            type: "success",
            message: "标记成功",
          });
          this.searchMarkCase();
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>
<style lang="scss" >
.markCaseBox{
  .flexBox {
    display: flex; 
  }
  .buttonItem{
   margin: 5px 0 5px 5px;
 }
}

</style>