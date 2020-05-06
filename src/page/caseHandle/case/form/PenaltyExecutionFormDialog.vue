<template>
  <el-dialog title="分期（延期）申请决定" :visible.sync="visible" @close="closeDialog" :close-on-click-modal="false" width="30%">
    <div>
      <el-form ref="approvalForm" :model="approvalForm" label-width="90px">
        <el-form-item label="申请决定">
          <el-select v-model="approvalForm.executeHandle">
            <el-option :value='1' label="同意"></el-option>
            <el-option :value='0' label='不同意'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="执行方式" v-if="approvalForm.executeHandle==1">
          <el-select v-model="approvalForm.executeType">
            <el-option :value='1' label="分期（第N期）"></el-option>
            <el-option :value='0' label='延期'></el-option>
          </el-select>
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
      this.caseData = data;
      this.isSaveLink = isSaveLink;


    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;

    },
    approvalSure() {
      console.log('文书信息', this.caseData)
      // 进入文书
      console.log('代入信息', this.approvalForm)
      //   this.com_viewDoc(this.caseData, this.approvalForm);
      console.log(row);
      let row = this.caseData
      if (this.isSaveLink) {
        this.$store.dispatch("deleteTabs", this.$route.name);//关闭当前页签
        console.log('row:', row)
        this.$router.push({
          name: row.path,
          params: {
            id: row.id,
            docId: row.docId,
            url: this.$route.name,
            handelType: 'isAddMore',
            approvalForm: this.approvalForm
          }
        });
      } else {
        this.$message('请先保存该环节表单');
      }

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
