<!-- 考勤修改 -->
<template>
  <el-dialog
    class="fullscreen"
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="38%"
    append-to-body
  >
    <el-form
      ref="attendanceFormRef"
      :model="attendanceForm"
      :rules="rules"
      label-width="120px"
      label-position="right"
      class="attendance-form"
    >
    
      <el-form-item label="姓名:" prop="personName">
        <el-input v-model="attendanceForm.personName" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="执法证号:" prop="personNo">
        <el-input v-model="attendanceForm.personNo" placeholder="请输入执法证号"></el-input>
      </el-form-item>
      <el-form-item label="应出勤天数:" prop="attendanceDays">
        <el-input-number v-model="attendanceForm.attendanceDays" :min="0" :max="100"></el-input-number>
      </el-form-item>
      <el-form-item label="实际出勤天数:" prop="actualAttendanceDays">
        <el-input-number v-model="attendanceForm.actualAttendanceDays" :min="0" :max="100"></el-input-number>
      </el-form-item>
      <el-form-item label="出差:" prop="businessTripNum">
        <el-input-number v-model="attendanceForm.businessTripNum" :min="0" :max="100"></el-input-number>
      </el-form-item>
      <el-form-item label="迟到:" prop="lateNum">
        <el-input-number v-model="attendanceForm.lateNum" :min="0" :max="100"></el-input-number>
      </el-form-item>
      <el-form-item label="旷工:" prop="absenteeismNum">
        <el-input-number v-model="attendanceForm.absenteeismNum" :min="0" :max="100"></el-input-number>
      </el-form-item>
      <el-form-item label="平时加班:" prop="workOverTime">
        <el-input-number v-model="attendanceForm.workOverTime" :min="0" :max="100"></el-input-number>
      </el-form-item>
      <el-form-item label="周末加班:" prop="weekWorkOverTime">
        <el-input-number v-model="attendanceForm.weekWorkOverTime" :min="0" :max="100"></el-input-number>
      </el-form-item>
      <el-form-item label="节假日加班:" prop="holidaySeason">
        <el-input-number v-model="attendanceForm.holidaySeason" :min="0" :max="100"></el-input-number>
      </el-form-item>
      <el-form-item label="事假:" prop="leaveNum">
        <el-input-number v-model="attendanceForm.leaveNum" :min="0" :max="100"></el-input-number>
      </el-form-item>
      <el-form-item label="病假:" prop="sickLeaveNum">
        <el-input-number v-model="attendanceForm.sickLeaveNum" :min="0" :max="100"></el-input-number>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submit">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>

import { editAttendance } from "@/api/attendance";

export default {
  data() {
    return {
      visible: false,
      dialogTitle: "详情修改",
      attendanceForm: {
        personName: '',
        personNo: ''
      },
      rules: {
        personName: [
          { required: true, message: "姓名必须填写", trigger: "blur" },
        ],
        personNo: [
          { required: true, message: "执法证号必须填写", trigger: "blur" },
        ]
      },
    };
  },
  created() {},
  methods: {
    // 打开弹窗
    showModal(attendance) {
      this.visible = true;
      this.attendanceForm = attendance;
    },
    //提交
    submit() {
      console.log(this.attendanceForm);
      this.$refs["attendanceFormRef"].validate((valid) => {
        if (valid) {
          this.saveEditForm();
        } else {
          return false;
        }
      });
    },
    saveEditForm() {
      const loading = this.$loading({
        lock: true,
        text: "正在保存",
        spinner: "car-loading",
        customClass: "loading-box",
        background: "rgba(234,237,244, 0.8)",
      });
      const data = JSON.parse(JSON.stringify(this.attendanceForm));
      editAttendance(data).then(
        (res) => {
          if (res.code === 200) {
            this.$message({ type: 'success', message: '修改成功' });
            this.closeDialog();
          }
        },
        (err) => {
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
      loading.close();
    },
    // 关闭弹窗的时候清除数据
    closeDialog() {
      this.$refs["attendanceFormRef"].resetFields();
      this.visible = false;
      for (const key in this.attendanceForm) {
        this.attendanceForm[key] = "";
      }
      this.$parent.getAttendanceList();
    }
  }
};
</script>
<style lang="scss" scoped>
.attendance-form {
    >>>.el-input-number__decrease,
    >>>.el-input-number__increase{
        width: 32px;
        height: 30px;
        line-height: 30px;
        top: 4px;
    }
}
</style>
