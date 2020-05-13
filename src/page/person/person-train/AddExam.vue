<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
  >
    <el-form
      :model="addExamForm"
      label-position="right"
      label-width="100px"
      ref="addExamFormRef"
      :rules="rules"
    >
      <el-row>
        <el-form-item label="执法人员id 引用" prop="personId" v-show="false">
          <el-input v-model="addExamForm.personId"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="考试类型:" prop="examTypeName">
          <el-select
            v-model="addExamForm.examTypeName"
            placeholder="考试类型"
            @change="selectVal($event)"
            @focus="getDictInfo('人员信息-考试类型')"
          >
            <el-option
              v-for="value in examTypeInfo"
              :key="value.id"
              :label="value.name"
              :value="value.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="考试时间:" prop="examTime">
          <el-date-picker
            v-model="addExamForm.examTime"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="请选择考试时间"
            clearable
          ></el-date-picker>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="考试名称:" prop="examName">
          <el-input v-model="addExamForm.examName"  placeholder="请输入考试名称"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="考试成绩:" prop="examScore">
          <el-input v-model="addExamForm.examScore" placeholder="请输入考试成绩" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="通过状态:" prop="passStatus">
          <el-select v-model="addExamForm.passStatus" placeholder="请选择通过状态">
            <el-option value="通过">通过</el-option>
            <el-option value="不通过">不通过</el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="备注:" prop="note">
          <el-input type="textarea" v-model="addExamForm.note" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submit('addExamForm')">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    params: {
      type: Object,
      default: () => {
        return { type: "add", id: "" };
      },
      required: true
    }
  },
  data() {
    return {
      visible: false,
      examTypeInfo: [], //考试类型下拉列表
      addExamForm: {
        personId: this.params.id,
        examType: "",
        examTime: "",
        examScore: "",
        examName: "",
        passStatus: "",
        note: ""
      },
      rules: {
        examTypeName: [
          { required: true, message: "考试类型必须填写", trigger: "change" }
        ],
        examTime: [
          { required: true, message: "考试时间必须填写", trigger: "blur" }
        ],
        examName: [
          { required: true, message: "考试名称必须填写", trigger: "blur" }
        ],
        examScore: [
          { required: true, message: "考试结果必须填写", trigger: "blur" }
        ],
        passStatus: [
          { required: true, message: "通过状态必须填写", trigger: "blur" }
        ]
      },
      dialogTitle: "", //弹出框title
      errorName: false, //添加name时的验证
      handelType: 0 //添加 0  修改2
    };
  },
  methods: {
    selectVal(event) {
      this.addExamForm.examType = event;
    },
    getDictInfo(name) {
      //根据数据字典查询
      let _this = this;
      _this.$store
        .dispatch("findAllDrawerByName", name)
        .then(
          res => {
            if (res.code === 200) {
              _this.examTypeInfo = res.data;
            }
          },
          err => {
            this.$message.error(err.msg || err.message);
          }
        )
        .catch(() => {});
    },
    //提交先校验表单项
    submit() {
      let _this = this;
      _this.$refs.addExamFormRef.validate(valid => {
        if (valid) {
          this.saveFormData();
        } else {
          return false;
        }
      });
    },
    // 保存表单数据
    saveFormData() {
      let _this = this;
      if (_this.addExamForm.passStatus == "通过") {
        _this.addExamForm.passStatus = "0";
      } else if (_this.addExamForm.passStatus == "不通过") {
        _this.addExamForm.passStatus = "1";
      }
      if (_this.handelType == 1) {
        _this.$store.dispatch("addExamInfoMoudle", _this.addExamForm).then(
          res => {
            _this.$emit("getExamList");
            _this.$message({
              type: "success",
              message: "添加成功!"
            });
            _this.closeDialog();
            _this.visible = false;
          },
          err => this.$message.error(err.msg)
        );
      } else if (_this.handelType == 2) {
        _this.$store.dispatch("updateExamInfoMoudle", _this.addExamForm).then(
          res => {
            _this.$emit("getExamList");
            _this.$message({
              type: "success",
              message: "修改成功!"
            });
            _this.visible = false;
            _this.closeDialog();
          },
          err => {
            this.$message.error(err.msg || err.message);
          }
        );
      }
    },
    showModal(type, row) {
      let _this = this;
      _this.visible = true;
      _this.handelType = type;
      if (type == 1) {
        //新增
        this.dialogTitle = "新增";
      } else if (type == 2) {
        //修改
        _this.dialogTitle = "修改";
        _this.addExamForm.examId = row.examId;
        _this.addExamForm.personId = row.personId;
        _this.addExamForm.examType = row.examype;
        _this.addExamForm.examTime = row.examTime;
        _this.addExamForm.examScore = row.examScore;
        _this.addExamForm.examName = row.examName;
        _this.addExamForm.examTypeName = row.examTypeName;
        _this.addExamForm.passStatus = row.passStatus;
        if (_this.addExamForm.passStatus == "0") {
          _this.addExamForm.passStatus = "通过";
        } else if (_this.addExamForm.passStatus == "1") {
          _this.addExamForm.passStatus = "不通过";
        }
        _this.addExamForm.note = row.note;
      }
    },
    //聚焦清除错误信息
    focusName() {
      let _this = this;
      _this.errorName = false;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      let _this = this;
      _this.visible = false;
      _this.$refs["addExamFormRef"].resetFields();
       for (const key in this.addExamForm) {
          this.addExamForm[key] = "";
        }
        _this.addExamForm.personId = this.params.id;
      _this.errorName = false;
    }
  }
};
</script>

<style  lang="scss" scoped>
>>> .el-date-editor.el-input,
>>> .el-select {
  width: 100%;
}
>>> .el-icon-date {
  line-height: 32px;
}
</style>
