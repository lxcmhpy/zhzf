<template>
  <el-dialog
    title="抽查条件"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="45%"
  >
    <el-form
      :model="checkSearchForm"
      ref="checkSearchForm"
      class="checkSearchForm"
      label-width="100px"
    >
      <div>
        <div class="item">
          <el-form-item label="立案机构">
            <elSelectTree
                ref="elSelectTreeObj"
                :options="organTreeData"
                :accordion="true"
                :props="myprops"
                :value="selectOrganId"
                @getValue="handleOrgan2"
              ></elSelectTree>
          </el-form-item>
        </div>
        <!-- <div class="item">
          <el-form-item label="下级立案机构">
            <el-input v-model="checkSearchForm.caseNumber"></el-input>
          </el-form-item>
        </div> -->
         <div class="item">
          <el-form-item label="执法领域">
            <el-select v-model="checkSearchForm.zfmlId" placeholder="请选择">
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
      </div>
      <div>
        <!-- <div class="item"> -->
        <el-form-item label="受案时间">
          <el-date-picker
            v-model="checkSearchForm.acceptTime" 
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd"
            :default-time="['00:00:00', '23:59:59']"
          ></el-date-picker>
        </el-form-item>
        <!-- </div> -->
      </div>
      <div>
       
        <div class="item">
          <el-form-item label="当事人类型">
            <el-select v-model="checkSearchForm.partyType" placeholder="请选择">
              <el-option
                v-for="(item,index) in allPartyType"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="抽取数量">
            <el-select v-model="checkSearchForm.sjNum" placeholder="请选择">
              <el-option
                v-for="(item,index) in allCheckNumber"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div>
        
        <div class="item">
          <el-form-item label="案件状态">
            <el-select v-model="checkSearchForm.caseStatus" placeholder="请选择">
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
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="startCheck()">开始抽取</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { queryLawCateByOrganIdApi } from "@/api/caseDeploy";
import iLocalStroage from "@/common/js/localStroage";
import { caseSupervisionCommonMixins } from "@/common/js/caseHandle/caseSupervisionCommonMixins";

export default {
  data() {
    return {
      visible: false,
      checkSearchForm: {
        caseNumber: "",
        acceptTime: "",
        zfmlId: "",
        partyType: "",
        sjNum: "",
        caseStatus: "",
        organId:'',
        // acceptStartTime:'',
        // acceptEndTime:''
        acceptTime:''
      },
      allCheckNumber: [{ value: "10" ,label:'10条'}, { value: "20" ,label:'20条'}, { value: "50", label:'50条'}],
      allPartyType: [{ value: 1, label:'个人'}, { value: 2,label:'法人' }],
      acceptTimeArray:[]
    };
  },
  mixins: [caseSupervisionCommonMixins],
  methods: {
    showModel() {
      this.visible = true;
      this.getEnforceLawType();
      this.getAllOrigins();
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    handleOrgan2(val){
      console.log('handleOrgan2',val)
      this.$refs.elSelectTreeObj.$children[0].handleClose();
      this.checkSearchForm.organId = val;
    },
    //抽查
    startCheck() {
      this.visible = false;
      // this.caseSearchForm.acceptStartTime = this.acceptTimeArray[0];
      // this.caseSearchForm.acceptEndTime = this.acceptTimeArray[1];
      this.$emit('setNewSearchCondition',this.checkSearchForm);
    },
  },
};
</script>
<style lang="scss" >
.checkSearchForm {
  padding-right: 25px;
  & > div {
    display: flex;
    justify-content: space-between;
  }
  & > div:nth-child(2) {
    flex: 1;
    .el-form-item {
      width: 100%;
      .el-date-editor {
        width: 100%;
      }
    }
  }
}
</style>