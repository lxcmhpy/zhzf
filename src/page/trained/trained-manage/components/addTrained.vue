<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
  >
    <el-form
      :model="addTrainedBatchForm"
      label-position="right"
      label-width="100px"
      ref="addTraniedBatchFormRef"
      :rules="rules"
    >
      <el-row>
        <el-form-item label="培训名称" prop="trainName" class="form-class">
          <el-input v-model="addTrainedBatchForm.trainName"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="培训类型" prop="trainType">
          <el-select
            v-model="addTrainedBatchForm.trainType"
            remote
            @focus="getDictInfo('人员信息-培训类型','trainedTypeInfo')"
          >
            <el-option
              v-for="value in trainedTypeInfo"
              :key="value.id"
              :label="value.name"
              :value="value.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="合格学分" prop="qualifiedCredits" class="form-class">
          <el-input v-model="addTrainedBatchForm.qualifiedCredits" @input="trim()"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="开始时间" prop="beginTime">
          <el-date-picker
            type="date"
            v-model="addTrainedBatchForm.beginTime"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="请选择开始时间"
            clearable
          ></el-date-picker>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            type="date"
            v-model="addTrainedBatchForm.endTime"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="请选择结束时间"
            clearable
          ></el-date-picker>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="备注" prop="remark" class="form-class">
          <el-input type="textarea" :rows="2" v-model="addTrainedBatchForm.remark"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <div v-if="handelType!=3">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="submit">保 存</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { addTrainedBatchList } from "@/api/trained";

export default {
  data() {
    const validateBeginTime = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入培训开始时间"));
      } else {
        const nowDate = new Date().getDate();
        const beginTime = new Date(value).getDate();
        if (beginTime - nowDate < 0) {
          callback(new Error("培训开始时间不能小于当前时间"));
          return;
        }
        if (this.addTrainedBatchForm.endTime !== "") {
          const endTime = new Date(this.addTrainedBatchForm.endTime).getTime();
          if (beginTime - endTime > 0) {
            callback(new Error("培训时间不能大于结束时间"));
          } else {
            this.$refs.addTraniedBatchFormRef.clearValidate("endTime");
          }
          callback();
        }
      }
    };
    const validateEndTime = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入培训结束时间"));
      } else {
        const beginTime = new Date(
          this.addTrainedBatchForm.beginTime
        ).getTime();
        const endTime = new Date(value).getTime();
        if (this.addTrainedBatchForm.beginTime !== "") {
          if (beginTime - endTime > 0) {
            callback(new Error("结束时间不能小于开始时间"));
          } else {
            this.$refs.addTraniedBatchFormRef.clearValidate("beginTime");
          }
          callback();
        }
      }
    };
    return {
      trainedTypeInfo: [],
      visible: false,
      addTrainedBatchForm: {
        trainId: "",
        trainName: "", // 培训名称
        trainType: "", // 培训类型
        qualifiedCredits: "", //培训人数
        beginTime: "", //培训开始时间
        endTime: "", //培训结束时间
        remark: "" //备注
      },
      rules: {
        trainName: [
          { required: true, message: "培训名称不能为空", trigger: "blur" }
        ],
        trainType: [
          { required: true, message: "培训类型不能为空", trigger: "change" }
        ],
        qualifiedCredits: [
          { required: true, message: "培训人数不能为空", trigger: "blur" }
        ],
        beginTime: [
          { required: true, validator: validateBeginTime, trigger: "blur" }
        ],
        endTime: [
          { required: true, validator: validateEndTime, trigger: "blur" }
        ]
      },
      dialogTitle: "", //弹出框title
      handelType: 0 //添加 0  修改2  查看3
    };
  },
  created() {
    this.getDictInfo("人员信息-培训类型");
  },
  methods: {
    trim() {
      this.addTrainedBatchForm.qualifiedCredits = this.addTrainedBatchForm.qualifiedCredits.replace(
        /[^\d]/g,
        ""
      );
    },
    //提交
    submit() {
      this.$refs.addTraniedBatchFormRef.validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "正在保存",
            spinner: "car-loading",
            customClass: "loading-box",
            background: "rgba(234,237,244, 0.8)"
          });
          let addType = this.handelType == "2" ? "edit" : "add";
          addTrainedBatchList(this.addTrainedBatchForm, addType).then(
            res => {
              this.$emit("getTrainBatchList");
              let successMsg =
                this.handelType == "2" ? "修改成功!" : "添加成功!";
              this.$message({ type: "success", message: successMsg });
              this.closeDialog();
              loading.close();
            },
            err => {
              loading.close();
              this.$message({ type: "error", message: err.msg || "" });
            }
          );
        } else {
          return false;
        }
      });
    },
    //点击下拉框的时查询试卷类型
    getDictInfo(name) {
      if (this.trainedTypeInfo.length === 0) {
        this.$store.dispatch("findAllDrawerByName", name).then(res => {
          if (res.code === 200) {
            this.trainedTypeInfo = res.data;
          } else {
            console.info("没有查询到数据");
          }
        });
      }
    },
    showModal(type, row) {
      this.visible = true;
      this.handelType = type;
      if (type == "1") {
        //新增
        this.dialogTitle = "新增培训";
      } else if (type == "2") {
        //修改,查看
        this.dialogTitle = "修改培训";
        for (const key in this.addTrainedBatchForm) {
          this.addTrainedBatchForm[key] = row[key];
        }
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addTraniedBatchFormRef"].resetFields();
      for (const key in this.addTrainedBatchForm) {
        this.addTrainedBatchForm[key] = "";
      }
    }
  }
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
</style>
