<template>
  <el-dialog
    title="执法人员意见"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="30%"
  >
    <div>
      <el-form ref="approvalForm" :model="approvalForm" label-width="90px">
        <el-form-item label="审批意见">
          <el-radio-group v-model="approvalForm.lawOfficeExecuteHandle" @change="changeOpion">
            <el-radio :label="1">同意</el-radio>
            <el-radio :label="0">不同意</el-radio>
          </el-radio-group>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="审批说明"
            v-model="approvalForm.lawOfficeOpinions"
          ></el-input>
        </el-form-item>
        <el-form-item label="签批时间" id="approvalTimeBox">
          <el-date-picker
            v-model="approvalForm.lawOfficeApprovalTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy年MM月dd日"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="getSure()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";

export default {
  data() {
    return {
      visible: false,
      approvalForm:{
          lawOfficeExecuteHandle:1,
          lawOfficeOpinions:"同意",
          lawOfficeApprovalTime:new Date().format('yyyy年MM月dd日'),
      }
    };
  },
  mixins: [mixinGetCaseApiList],
  methods: {
    showModal() {
      this.visible = true;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    changeOpion(val){
        console.log(val);
        if(val){
            this.approvalForm.lawOfficeOpinions = "同意"
        }else{
            this.approvalForm.lawOfficeOpinions = "不同意"
        }
    },
    getSure() {
        this.visible = false;
      this.$emit('sendLawOfficeOpionEmit',this.approvalForm);
      
    }
  },
  mounted() {}
};
</script>
<style lang="scss">

</style>
