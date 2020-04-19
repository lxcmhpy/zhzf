<template>
  <el-dialog title="分期（延期）申请决定" :visible.sync="visible" @close="closeDialog" :close-on-click-modal="false" width="30%">
    <div>
      <el-form ref="approvalForm" :model="approvalForm" label-width="90px">
        <p>当前任务指派有误，请求回退</p>
        <el-form-item label="回退说明">
          <el-input type="textarea" :rows="3" v-model="approvalForm.approveOpinions"></el-input>
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
import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";

export default {
  data() {
    return {
      visible: false,
      //   myChooseNext: "", //选中的环节
      //   allNextLink: [], //所有环节
      //   caseId: "" //案件id
      approvalForm: {
        executeHandle: 1,
        executeType: 1,
        approveOpinions: "",
        approvalTime: ""
      },
      caseData: "",
      isSaveLink: '',
    };
  },
  inject: ["reload"],
  mixins: [mixinGetCaseApiList],
  methods: {
    showModal(data, isSaveLink) {
      console.log(data);
      this.visible = true;

    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    approvalSure() {
    
    }
  },
  mounted() { }
};
</script>
<style lang="scss">
// @import "@/assets/css/caseHandle/index.scss";
#approvalTimeBox .el-date-editor {
  width: 100%;
}
</style>
