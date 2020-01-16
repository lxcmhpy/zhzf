<template>
  <el-dialog
    title="审批意见"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="30%"
  >
    <div>
      <el-form ref="approvalForm" :model="approvalForm" label-width="90px">
        <el-form-item label="审批意见">
          <el-radio-group v-model="approvalForm.executeHandle">
            <el-radio :label="1">同意</el-radio>
            <el-radio :label="0">不同意</el-radio>
          </el-radio-group>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="审批说明"
            v-model="approvalForm.approveOpinions"
          ></el-input>
        </el-form-item>
        <el-form-item label="签批时间" id="approvalTimeBox">
          <el-date-picker
            v-model="approvalForm.approvalTime"
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
import { mixinGetCaseApiList } from "@/js/mixins";
import iLocalStroage from "@/js/localStroage";

export default {
  data() {
    return {
      visible: false,
      //   myChooseNext: "", //选中的环节
      //   allNextLink: [], //所有环节
      //   caseId: "" //案件id
      approvalForm: {
        executeHandle: 1,
        approveOpinions: "",
        approvalTime: ""
      },
      caseData: ""
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
    approvalSure() {
      // console.log(this.data);
      let params = {
        caseId: this.caseData.caseId,
        executeHandle: this.approvalForm.executeHandle == 1 ? "同意" : "不同意",
        caseLinktypeId: this.caseData.caseLinktypeId,
        approveOpinions: this.approvalForm.approveOpinions,
        jsonApproveData: ""
      };

      //有三级审批时
      if (this.caseData.approvalNumber == 3) {
        if (this.caseData.firstApproval) {
          //一级审批过
          if (this.caseData.secondApproval) {
            //二级审批过  此时为三级审批
            console.log('此时为三级审批')
            params.jsonApproveData = JSON.stringify({
              thirdApproveOpinions:
                this.approvalForm.executeHandle == 1 ? "同意" : "不同意",
              thirdApprovePeo: iLocalStroage.gets("userInfo").username,
              thirdApproveTime: this.approvalForm.approvalTime
            });
          } else {
            // 此时为二级审批
            console.log('此时为2级审批')

            params.jsonApproveData = JSON.stringify({
              secondApproveOpinions:
                this.approvalForm.executeHandle == 1 ? "同意" : "不同意",
              secondApprovePeo: iLocalStroage.gets("userInfo").username,
              secondApproveTime: this.approvalForm.approvalTime
            });
          }
        } else {
          //此时为一级审批
            console.log('此时为一级审批')

          params.jsonApproveData = JSON.stringify({
            approveOpinions:
              this.approvalForm.executeHandle == 1 ? "同意" : "不同意",
            approvePeo: iLocalStroage.gets("userInfo").username,
            approveTime: this.approvalForm.approvalTime
          });
        }
      } else if (this.caseData.approvalNumber == 2) {
        //有两级审批时
        if (this.caseData.firstApproval) {
          // 此时为二级审批
          params.jsonApproveData = JSON.stringify({
            secondApproveOpinions:
              this.approvalForm.executeHandle == 1 ? "同意" : "不同意",
            secondApprovePeo: iLocalStroage.gets("userInfo").username,
            secondApproveTime: this.approvalForm.approvalTime
          });
        } else {
          //此时为一级审批
          params.jsonApproveData = JSON.stringify({
            approveOpinions:
              this.approvalForm.executeHandle == 1 ? "同意" : "不同意",
            approvePeo: iLocalStroage.gets("userInfo").username,
            approveTime: this.approvalForm.approvalTime
          });
        }
      }

    
      console.log(params);
      this.$store.dispatch("approvalPdf", params).then(
        res => {
          console.log(res);
          this.$message({
            type: "success",
            message: "审批通过"
          });
          
          this.$emit("getNewData");
          
          this.visible = false;
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  mounted() {}
};
</script>
<style lang="less">
// @import "../../../css/caseHandle/index.less";
#approvalTimeBox .el-date-editor {
  width: 100%;
}
</style>
