<!-- 申请调阅 -->
<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="48%"
  >
    <div class="apply-review-wrap">
      <!-- <p class="apply-info-title">案件信息</p> -->
      <el-form
        ref="applyReviewFormRef"
        :model="applyReviewForm"
        :rules="rules"
        class="apply-review-from"
      >
        <table class="apply-case-table" border="0" cellspacing="1" cellpadding="0">
          <tr>
            <td class="apply-case-label">案号</td>
            <td>{{ caseInfo.caseNumber }}</td>
            <td class="apply-case-label">案件类型</td>
            <td>{{ caseInfo.caseType }}</td>
          </tr>
          <tr>
            <td class="apply-case-label">当事人</td>
            <td>{{ caseInfo.party }}</td>
            <td class="apply-case-label">涉案车/船号</td>
            <td>{{ caseInfo.vehicleShipId }}</td>
          </tr>
          <tr>
            <td class="apply-case-label">违法事实</td>
            <td colspan="3">{{ caseInfo.caseCauseNameCopy }}</td>
          </tr>
          <tr>
            <td class="apply-case-label">案发时间</td>
            <td colspan="3">{{ caseInfo.afsj }}</td>
          </tr>
          <tr>
            <td class="apply-case-label">案发地点</td>
            <td colspan="3">{{ caseInfo.afdd }}</td>
          </tr>
          <tr>
            <td class="apply-case-label">结案时间</td>
            <td colspan="3">{{ caseInfo.closeDate }}</td>
          </tr>
          <tr>
            <td class="apply-case-label">案件处理结果</td>
            <td colspan="3">{{ caseInfo.closeResult }}</td>
          </tr>
          <tr v-if="modelType === 'apply'">
            <td class="apply-case-label">申请受理单位</td>
            <td colspan="3">{{ caseInfo.orginName }}</td>
          </tr>
          <tr v-if="modelType === 'apply'">
            <td class="apply-case-label">
              申请人
              <i class="required-icon" />
            </td>
            <td>
              <el-form-item prop="consultApplicantName">
                <el-input v-model="applyReviewForm.consultApplicantName"></el-input>
              </el-form-item>
            </td>
            <td class="apply-case-label">
              联系电话
              <i class="required-icon" />
            </td>
            <td>
              <el-form-item prop="consultApplicantTel">
                <el-input v-model="applyReviewForm.consultApplicantTel"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr v-if="modelType === 'apply'">
            <td class="apply-case-label">
              调阅起止时间
              <i class="required-icon" />
            </td>
            <td colspan="3">
              <el-form-item prop="applyTime">
                <el-date-picker
                  v-model="applyReviewForm.applyTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="起始日期"
                  end-placeholder="截至时间"
                  format="yyyy年MM月dd日"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr v-if="modelType === 'apply'">
            <td class="apply-case-label">
              申请调阅原因
              <i class="required-icon" />
            </td>
            <td colspan="3">
              <el-form-item prop="reason">
                <el-input
                  type="textarea"
                  v-model="applyReviewForm.reason"
                  :autosize="{ minRows: 4, maxRows: 6}"
                  :maxlength="1000"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr v-if="modelType === 'approval'">
            <td class="apply-case-label">申请调阅单位</td>
            <td colspan="3">{{ caseInfo.orginName }}</td>
          </tr>
          <tr v-if="modelType === 'approval'">
            <td class="apply-case-label">调阅申请人</td>
            <td>{{ caseInfo.consultApplicantName }}</td>
            <td class="apply-case-label">申请人电话</td>
            <td>{{ caseInfo.consultApplicantTel }}</td>
          </tr>
          <tr v-if="modelType === 'approval'">
            <td class="apply-case-label">调阅起止时间</td>
            <td colspan="3">{{ caseInfo.startTime }} 至 {{ caseInfo.endTime }}</td>
          </tr>
          <tr v-if="modelType === 'approval'">
            <td class="apply-case-label">申请调阅原因</td>
            <td colspan="3">{{ caseInfo.reason }}</td>
          </tr>
          <tr v-if="modelType === 'approval'">
            <td class="apply-case-label">
              审批意见
              <i class="required-icon" />
            </td>
            <td colspan="3">
              <el-form :model="approvalForm" :rules="rules" ref="approvalFormRef">
                <el-form-item prop="opinion">
                  <el-input
                    type="textarea"
                    v-model="approvalForm.opinion"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    :maxlength="300"
                    placeholder="请填写审批意见"
                  ></el-input>
                </el-form-item>
              </el-form>
            </td>
          </tr>
        </table>
      </el-form>
      <!-- <div v-if="modelType === 'apply'">
        <p class="apply-info-title">申请调阅</p>
        <el-form
          ref="applyReviewFormRef"
          :model="applyReviewForm"
          :rules="rules"
          label-width="160px"
          class="apply-review-from"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="申请人" prop="consultApplicantName">
                <el-input v-model="applyReviewForm.consultApplicantName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话" prop="consultApplicantTel">
                <el-input v-model="applyReviewForm.consultApplicantTel"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="调阅起止时间" prop="applyTime">
                <el-date-picker
                  v-model="applyReviewForm.applyTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="起始日期"
                  end-placeholder="截至时间"
                  format="yyyy年MM月dd日"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="申请调阅原因" prop="reason">
                <el-input
                  type="textarea"
                  v-model="applyReviewForm.reason"
                  :autosize="{ minRows: 4, maxRows: 6}"
                  :maxlength="1000"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>-->
    </div>
    <div v-if="modelType === 'apply'" slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确认申请</el-button>
    </div>
    <div v-if="modelType === 'approval'" slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit(3)">同意申请</el-button>
      <el-button type="primary" @click="submit(2)">申请未通过</el-button>
    </div>
  </el-dialog>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { validatePhone } from "@/common/js/validator";
import { applyReviewCase, approverReviewCase } from "@/api/caseHandle";
import deleteEvidenceVue from "../case/modle/deleteEvidence.vue";

export default {
  data() {
    const validateApplyTime = (rule, value, callback) => {
      if (value.length) {
        const startTime = new Date(value[0]).getTime();
        const endTime = new Date(value[1]).getTime();
        if (endTime - startTime <= 0) {
          callback(new Error("截至时间不能小于等于起始时间"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      visible: false,
      dialogTitle: "申请调阅",
      caseInfo: {},
      applyReviewForm: {
        consultApplicantName: "",
        consultApplicantTel: "",
        applyTime: "",
        reason: "",
      },
      rules: {
        consultApplicantName: [
          { required: true, message: "申请人必须填写", trigger: "blur" },
        ],
        consultApplicantTel: [
          {
            required: true,
            message: "联系电话必须填写",
            trigger: "blur",
          },
          { validator: validatePhone, trigger: "blur" },
        ],
        applyTime: [
          { required: true, message: "调阅时间必须填写", trigger: "blur" },
          { validator: validateApplyTime, trigger: "blur" },
        ],
        reason: [
          { required: true, message: "申请原因必须填写", trigger: "blur" },
        ],
        opinion: [
          { required: true, message: "请填写审批意见", trigger: "blur" },
        ],
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        },
      },
      approvalForm: {
        opinion: "",
      },
      modelType: "apply",
    };
  },
  computed: {
    UserInfo() {
      return iLocalStroage.gets("userInfo");
    },
  },
  created() {},
  methods: {
    // 打开弹窗
    showModal(caseItem, type) {
      this.caseInfo = caseItem;
      this.applyReviewForm.consultApplicantName = this.UserInfo.nickName;
      this.applyReviewForm.consultApplicantTel = this.UserInfo.mobile;
      this.modelType = type;
      this.visible = true;
    },
    //提交
    submit(status) {
      if (this.modelType === "apply") {
        this.$refs.applyReviewFormRef.validate((valid) => {
          if (valid) {
            this.submitApplyReview();
          } else {
            return false;
          }
        });
      }
      if (this.modelType === "approval") {
        this.$refs.approvalFormRef.validate((valid) => {
          if (valid) {
            this.submitApprovalApply(status);
          } else {
            return false;
          }
        });
      }
    },
    // 确认申请调阅
    submitApplyReview() {
      const applyData = JSON.parse(JSON.stringify(this.applyReviewForm));
      applyData.startTime = applyData.applyTime[0];
      applyData.endTime = applyData.applyTime[1];
      applyData.caseBasicinfoId = this.caseInfo.caseBasicinfoId;
      applyData.consultApplicant = this.UserInfo.id;
      applyData.acceptOid = this.caseInfo.organId;
      delete applyData.applyTime;
      applyReviewCase(applyData).then((res) => {
        if (res.code === 200) {
          this.$message({ type: "success", message: "申请提交成功" });
          this.$emit('reloadTable');
          this.closeDialog();
        }
      });
    },
    // 审批调阅
    submitApprovalApply(status) {
      const approvalData = JSON.parse(JSON.stringify(this.caseInfo));
      approvalData.approverOpinion = this.approvalForm.opinion;
      approvalData.consultStatus = status;
      approverReviewCase(approvalData).then((res) => {
        if (res.code === 200) {
          this.$message({ type: "success", message: "申请提交成功" });
          this.$emit('reloadTable');
          this.closeDialog();
        }
      });
    },
    saveAddForm() {
      const loading = this.$loading({
        lock: true,
        text: "正在保存",
        spinner: "car-loading",
        customClass: "loading-box",
        background: "rgba(234,237,244, 0.8)",
      });
      loading.close();
    },
    // 关闭弹窗的时候清除数据
    closeDialog() {
      this.$refs["applyReviewFormRef"].resetFields();
      this.$refs["approvalFormRef"] && this.$refs["approvalFormRef"].resetFields();
      this.visible = false;
      for (const key in this.applyReviewForm) {
        this.applyReviewForm[key] = "";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.apply-review-wrap {
  >>> .el-select,
  >>> .el-date-editor {
    display: block;
  }
  >>> .el-date-editor {
    display: inline-flex;
    .el-range-separator,
    .el-range__icon {
      line-height: 25px;
    }
  }
  >>> .el-date-editor.el-input,
  >>> .el-date-editor.el-input__inner {
    width: 100%;
  }
  .apply-case-table {
    width: 100%;
    margin-bottom: 20px;
    border-top: 1px solid #e3e3ec;
    border-bottom: 1px solid #e3e3ec;
    border-right: 1px solid #e3e3ec;
    td {
      border-left: 1px solid #e3e3ec;
      border-top: 1px solid #e3e3ec;
      height: 32px;
      padding: 5px 14px;
      font-size: 16px;
      vertical-align: middle;
      text-align: center;
      width: 280px;
      &.apply-case-label {
        font-weight: bold;
        background-color: #f5f7fa;
        width: 180px;
      }
    }
    .required-icon {
      content: "*";
      color: #f56c6c;
      margin-right: 4px;
      font-style: inherit;
      &::before {
        content: "*";
        color: #f56c6c;
        margin-right: 4px;
        font-style: inherit;
      }
    }
    // >>> .el-textarea__inner {
    //   border: none;
    // }
    >>> .el-form-item {
      margin-bottom: 15px;
    }
    >>> .el-form-item__content {
      line-height: 32px;
    }
  }
}
.apply-info-title {
  padding-left: 8px;
  border-left: 4px solid #4573d0;
  font-size: 20px;
  color: #20232b;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
