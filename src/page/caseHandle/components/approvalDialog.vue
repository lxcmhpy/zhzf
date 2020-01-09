<template>
  <el-dialog
    title="审批意见"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="30%"
  >
    <div>
      <el-form ref="approvalForm" :model="approvalForm" label-width="135px">
        <el-form-item label="审批意见">
          <el-radio-group v-model="approvalForm.executeHandle">
            <el-radio :label="1">同意</el-radio>
            <el-radio :label="0">不同意</el-radio>
          </el-radio-group>
          <el-input type="textarea" :rows="2" placeholder="审批说明" v-model="approvalForm.approveOpinions"></el-input>
        </el-form-item>
        <el-form-item label="签批时间">
          <el-date-picker v-model="approvalForm.approvalTime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="approvalSure()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mixinGetCaseApiList } from "@/js/mixins";
export default {
  data() {
    return {
      visible: false,
      //   myChooseNext: "", //选中的环节
      //   allNextLink: [], //所有环节
      //   caseId: "" //案件id
      approvalForm: {
        executeHandle: "1",
        approveOpinions: "",
        approvalTime:''
      },
      caseData:'',
    };
  },
  inject: ["reload"],
  mixins: [mixinGetCaseApiList],
  methods: {
    showModal(data) {
      console.log(data);
      this.visible = true;
      this.caseData = data;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    //审批
    approvalSure(){
      console.log(this.data);
      let params={
        caseId:this.caseData.caseId,
        executeHandle:this.approvalForm.executeHandle,
        caseLinktypeId:this.caseData.caseLinktypeId,
        jsonApproveData:JSON.stringify({'a':1})
      }
      console.log(params)
    //   this.$store.dispatch("approvalPdf", params).then(
    //     res => {
    //       console.log(res);
    //       this.$message({
    //         type: "success",
    //         message: "审批通过"
    //       });
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
    }
  },
  mounted() {}
};
</script>
<style lang="less">
// @import "../../../css/caseHandle/index.less";
</style>
