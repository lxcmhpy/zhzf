<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
  >
    <el-form
      :model="addExamBatchForm"
      label-position="right"
      label-width="100px"
      ref="addExamBatchFormRef"
      :rules="rules"
    >
      <el-row>
        <el-form-item label="考试名称" prop="examName" class="form-class">
          <el-input v-model="addExamBatchForm.examName"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="考试类型" prop="examType">
          <el-select
            v-model="addExamBatchForm.examType"
            placeholder="考试类型"
            remote
            @focus="getDictInfo('考试管理-考试类型','examTypeInfo')"
            @change="changeType($event)"
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
        <el-form-item label="试题排序" prop="examSort">
          <el-radio v-model="addExamBatchForm.examSort" label="0">固定顺序</el-radio>
          <el-radio v-model="addExamBatchForm.examSort" label="1">随机顺序</el-radio>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="考试人数" prop="examSum" class="form-class">
          <el-input v-model="addExamBatchForm.examSum"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="开始时间" prop="examBegin">
          <el-date-picker
            type="datetime"
            v-model="addExamBatchForm.examBegin"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择开始时间"
            clearable
          ></el-date-picker>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="结束时间" prop="examEnd">
          <el-date-picker
            type="datetime"
            v-model="addExamBatchForm.examEnd"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择结束时间"
            clearable
          ></el-date-picker>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="考试地点" prop="examVenues" class="form-class">
          <el-input v-model="addExamBatchForm.examVenues"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="备注" prop="remark" class="form-class">
          <el-input v-model="addExamBatchForm.remark"></el-input>
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
export default {
  data() {
    const validateExamBegin = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入考试开始时间'));
      } else {
        const timeHours = new Date(value).getHours();
        if(timeHours === 0){
          callback(new Error('考试开始时间格式错误，开始时间不能为00:00:00'));
        }else{
          if (this.addExamBatchForm.examEnd !== '') {
            const beginTime = new Date(value).getTime();
            const endTime = new Date(this.addExamBatchForm.examEnd).getTime();
            if(beginTime - endTime > 0){
              callback(new Error('开始时间不能大于结束时间'));
            }else{
              this.$refs.addExamBatchFormRef.clearValidate('examEnd');
            }
          }
          callback();
        }
      }
    };
    const validateExamEnd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入考试结束时间'));
      } else {
        const timeHours = new Date(value).getHours();
        if(timeHours === 0){
          callback(new Error('考试结束时间格式错误，结束时间不能为00:00:00'));
        }else{
          if (this.addExamBatchForm.examBegin !== '') {
            const beginTime = new Date(this.addExamBatchForm.examBegin).getTime();
            const endTime = new Date(value).getTime();
            if(beginTime - endTime > 0){
              callback(new Error('结束时间不能小于开始时间'));
            }else{
              this.$refs.addExamBatchFormRef.clearValidate('examBegin');
            }
          }
          callback();
        }
      }
    };
    return {
      examTypeInfo: [],
      examBatchSortInfo: [],
      isDisabled: true,
      visible: false,
      addExamBatchForm: {
        examId: "", //考试ID
        oid: "",
        examName: "", //考试名称
        examType: "", //考试类型
        examTypeName: "", //考试类型名称
        examSort: "", //试题顺序
        examSum: "", //考试人数
        examBegin: "", //考试开始时间
        examEnd: "", //考试结束时间
        examVenues: "", //考试地点
        remark: "" //备注
      },
      rules: {
        examName: [
          { required: true, message: "考试名称不能为空", trigger: "blur" }
        ],
        examType: [
          { required: true, message: "考试类型不能为空", trigger: "change" }
        ],
        examSort: [
          { required: true, message: "试题排序不能为空", trigger: "blur" }
        ],
        examSum: [
          { required: true, message: "考试人数不能为空", trigger: "blur" }
        ],
        examBegin: [
          { required: true, validator: validateExamBegin, trigger: "blur" }
        ],
        examEnd: [
          { required: true, validator: validateExamEnd, trigger: "blur" }
        ],
        examVenues: [
          { required: true, message: "考试地点不能为空", trigger: "blur" }
        ]
      },
      dialogTitle: "", //弹出框title
      errorName: false, //添加name时的验证
      handelType: 0 //添加 0  修改2  查看3
    };
  },
  methods: {
    changeType(event) {
      this.addExamBatchForm.examType = event;
    },
    //提交
    submit() {
      let _this = this;
      _this.$refs.addExamBatchFormRef.validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "正在保存",
            spinner: "car-loading",
            customClass: "loading-box",
            background: "rgba(234,237,244, 0.8)"
          });
          if (_this.handelType == 1) {
            _this.$store.dispatch("addExamBatch", _this.addExamBatchForm).then(
              res => {
                _this.$emit("getExamBatchListComp");
                _this.$message({ type: "success", message: "添加成功!" });
                _this.closeDialog();
                loading.close();
              },
              err => {
                loading.close();
                _this.$message({ type: "error", message: err.msg || "" });
              }
            );
          } else if (_this.handelType == 2) {
            _this.$store
              .dispatch("updateExamBatch", _this.addExamBatchForm)
              .then(
                res => {
                  _this.$emit("getExamBatchListComp");
                  _this.$message({ type: "success", message: "修改成功!" });
                  _this.closeDialog();
                  loading.close();
                },
                err => {
                  loading.close();
                  _this.$message({ type: "error", message: err.msg || "" });
                }
              );
          }
        } else {
          return false;
        }
      });
    },
    //点击下拉框的时查询试卷类型
    getDictInfo(name, codeName) {
      this.$store.dispatch("findAllDrawerByName", name).then(
        //考试类型
        res => {
          if (res.code === 200) {
            if (codeName === "examTypeInfo") {
              this.examTypeInfo = res.data;
            }
          } else {
            console.info("没有查询到数据");
          }
        }
      );
    },
    showModal(row, type) {
      let _this = this;
      _this.visible = true;
      _this.handelType = type;
      if (type == 1) {
        //新增
        _this.dialogTitle = "新增考试";
        _this.addExamBatchForm.examSort = "0";
        _this.isDisabled = false;
      } else if (type == 2) {
        //修改,查看
        this.getDictInfo("考试管理-考试类型", "examTypeInfo");
        _this.dialogTitle = "修改考试";
        _this.isDisabled = false;
        _this.addExamBatchForm.examId = row.examId;
        _this.addExamBatchForm.examName = row.examName;
        _this.addExamBatchForm.examType = row.examType;
        _this.addExamBatchForm.examTypeName = row.examTypeName;
        _this.addExamBatchForm.examBegin = row.examBegin;
        _this.addExamBatchForm.examEnd = row.examEnd;
        _this.addExamBatchForm.examSum = row.examSum;
        _this.addExamBatchForm.remark = row.remark;
        _this.addExamBatchForm.examSort = row.examSort.trim();
        _this.addExamBatchForm.examVenues = row.examVenues;
        _this.addExamBatchForm.oid = row.oid;
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addExamBatchFormRef"].resetFields();
      for (const key in this.addExamBatchForm) {
        this.addExamBatchForm[key] = "";
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
