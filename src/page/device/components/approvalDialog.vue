<template>
  <el-dialog
    title="审批意见"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    append-to-body
    width="30%"
  >
    <div>
      <el-form ref="approvalForm" :model="approvalForm" label-width="90px">
        <el-form-item label="审批意见">
          <el-radio-group v-model="approvalForm.executeHandle" @change="changeOpion">
            <el-radio :label="1">同意</el-radio>
            <el-radio :label="0">不同意</el-radio>
          </el-radio-group>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="审批说明"
            v-model="approvalForm.note"
          ></el-input>
        </el-form-item>
        <el-form-item label="签批时间" id="approvalTimeBox">
          <el-date-picker
            v-model="approvalForm.checkDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy年MM月dd日"
          ></el-date-picker>
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
import iLocalStroage from "@/common/js/localStroage";
import {
  approveBill
} from "@/api/device/deviceCertificateBill.js";
export default {
  data() {
    return {
      visible: false,
      approvalForm: {
        executeHandle: 1,
        note: "同意",
        checkDate: new Date().format("yyyy年MM月dd日"),
      },
      approveData: {},
      approvalPeopleName: iLocalStroage.gets("userInfo").nickName
        ? iLocalStroage.gets("userInfo").nickName
        : iLocalStroage.gets("userInfo").username,
    };
  },
  inject: ["reload"],
  methods: {
    showModal(data) {
      this.visible = true;
      this.approveData = data;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    changeOpion(val) {
      if (val) {
        this.approvalForm.note = "同意";
      } else {
        this.approvalForm.note = "不同意";
      }
    },
    //审批
    async approvalSure() {
        let data = {
            docOpinion:this.approvalForm.executeHandle == 1 ? "同意" : "不同意",
            billId: this.approveData.billId,
            storageId: this.approveData.storageId,
            note: this.approvalForm.note,
            checkDate: this.approvalForm.checkDate,
            step: this.approveData.step,
            organId:this.approveData.organId
        };
        try{
            let res = await approveBill(data);
            this.$message({
                type: "success",
                message: "审批通过",
            });
            this.$emit("getNewData");
        } catch (err) {
          throw new Error(err);
        }
    },
  },

  mounted() {},
};
</script>
<style lang="scss">
// @import "@/assets/css/caseHandle/index.scss";
#approvalTimeBox .el-date-editor {
  width: 100%;
  padding: 0;
}
</style>
