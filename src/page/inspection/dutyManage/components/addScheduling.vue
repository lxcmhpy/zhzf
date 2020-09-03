<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
    class="add-scheduling-dialog"
  >
    <el-form
      :model="addSchedulingForm"
      label-position="right"
      label-width="110px"
      ref="addSchedulingRef"
      :rules="rules"
    >
      <el-row>
        <el-form-item label="排班门类" prop="businessType" required>
          <el-select v-model="addSchedulingForm.businessType" placeholder="请选择" disabled>
            <el-option
              v-for="item in businessOptions"
              :key="item.cateId"
              :label="item.cateName"
              :value="item.cateName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label=" " prop="checkType">
          <el-radio v-model="addSchedulingForm.checkType" label="1">路巡</el-radio>
          <el-radio v-model="addSchedulingForm.checkType" label="2">网巡</el-radio>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="排班时间" prop="schedulingTime">
          <el-time-picker
            is-range
            v-model="addSchedulingForm.schedulingTime"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="HH:mm:ss"
            value-format="HH:mm:ss"
            @change="timeChange"
          ></el-time-picker>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="是否用车" prop="isUseCar" required>
          <el-select v-model="addSchedulingForm.isUseCar" @change="changeUseCar">
            <el-option key="1" label="是" value="1"></el-option>
            <el-option key="2" label="否" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row v-if="addSchedulingForm.isUseCar === '1'">
        <el-form-item label=" " prop="licensePlate">
          <el-input v-model="addSchedulingForm.licensePlate" placeholder="请输入巡查车辆车牌号"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="执法人员" prop="lawEnforcementPer">
          <el-select v-model="addSchedulingForm.lawEnforcementPer" multiple>
            <el-option
              v-for="item in lawPersonList"
              :key="item.id"
              :label="item.lawOfficerName"
              :value="item.lawOfficerName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="排班人员" prop="schedulingPer">
          <el-input v-model="addSchedulingForm.schedulingPer" disabled></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="巡查路线" prop="inspectionRoute">
          <el-input v-model="addSchedulingForm.inspectionRoute"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submit">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { vaildateCardNum } from "@/common/js/validator";

export default {
  props: {
    businessOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      visible: false,
      addSchedulingForm: {
        businessType: "",
        checkType: "1",
        schedulingTime: "",
        isUseCar: "1",
        licensePlate: "",
        lawEnforcementPer: "",
        schedulingPer: "",
        inspectionRoute: "",
      },
      lawPersonList: [],
      rules: {
        schedulingTime: [
          { required: true, message: "排班时间不能为空", trigger: "blur" },
        ],
        licensePlate: [
          { required: true, message: "巡查车牌号不能为空", trigger: "blur" },
          { validator: vaildateCardNum, trigger: "blur" },
        ],
        lawEnforcementPer: [
          { required: true, message: "执法人员不能为空", trigger: "change" },
        ],
        schedulingPer: [{ required: true, trigger: "blur" }],
        inspectionRoute: [
          { required: true, message: "巡查路线不能为空", trigger: "blur" },
        ],
      },
      dialogTitle: "新增排班", //弹出框title
      handelType: 0, //添加 0  修改2
      schedulingDay: "",
    };
  },
  computed: {
    UserInfo() {
      return iLocalStroage.gets("userInfo");
    },
  },
  created() {
    this.searchLawPerson();
  },
  methods: {
    // 是否用车
    changeUseCar() {
      this.addSchedulingForm.licensePlate = "";
    },
    // 排班时间变化
    timeChange() {
      console.log(this.addSchedulingForm.schedulingTime);
    },
    // 查询执法人员
    searchLawPerson() {
      this.$store.dispatch("findLawOfficerList", this.UserInfo.organId).then(
        (res) => {
          this.lawPersonList = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //提交
    submit() {
      this.$refs.addCourseRef.validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "正在保存",
            spinner: "car-loading",
            customClass: "loading-box",
            background: "rgba(234,237,244, 0.8)",
          });
          loading.close();
          this.closeDialog();
        } else {
          return false;
        }
      });
    },
    showModal(type, data) {
      if (type === "add") {
        this.addSchedulingForm.checkType = "1";
        this.addSchedulingForm.isUseCar = "1";
      }
      this.addSchedulingForm.businessType = data.businessType;
      this.addSchedulingForm.schedulingPer = this.UserInfo.nickName;
      this.schedulingDay = data.day;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs['addSchedulingRef'].resetFields();
      })
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addSchedulingRef"].resetFields();
      for (const key in this.addSchedulingForm) {
        this.addSchedulingForm[key] = "";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
>>> .el-select,
>>> .el-date-editor {
  display: block;
}
>>> .el-date-editor.el-input,
>>> .el-date-editor.el-input__inner {
  display: block;
  width: 100%;
}
>>> .el-range-editor.el-input__inner {
  display: inline-block;
  padding: 0 15px;
  height: 32px;
  line-height: 32px;
  .el-range-input {
    height: 28px;
  }
}
</style>
