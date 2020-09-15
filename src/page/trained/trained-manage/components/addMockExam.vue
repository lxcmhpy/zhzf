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
          <el-input v-model="addExamBatchForm.examName" maxlength="25"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="考试类型" prop="examType">
          <el-select
            v-model="addExamBatchForm.examType"
            placeholder="考试类型"
            remote
            disabled
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
        <el-form-item label="试题排序">
          <el-select
            v-model="addExamBatchForm.examSort"
            placeholder="考试类型"
            disabled
          >
            <el-option label="固定排序" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="考试人数" prop="examSum" class="form-class">
          <el-input v-model="addExamBatchForm.examSum" @input="trim()" maxlength="6"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="备注" prop="remark" class="form-class">
          <el-input type="textarea" :rows="2" v-model="addExamBatchForm.remark"></el-input>
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
import { numType, isSpecialChar } from '@/common/js/validator';

export default {
  data() {
    return {
      examTypeInfo: [],
      visible: false,
      addExamBatchForm: {
        examId: "", //考试ID
        examName: "", //考试名称
        examType: "", //考试类型
        examTypeName: "", //考试类型名称
        examSort: "", //试题顺序
        examSum: "", //考试人数
        remark: "" //备注
      },
      rules: {
        examName: [
          { required: true, message: "考试名称不能为空", trigger: "blur" },
          { validator: isSpecialChar, trigger: 'blur' }
        ],
        examSum: [
          { required: true, message: "考试人数不能为空", trigger: "blur" },
          { validator: numType, trigger: 'blur' }
        ]
      },
      dialogTitle: "", //弹出框title
      handelType: 0 //添加 0  修改2  查看3
    };
  },
  methods: {
    changeType(event) {
      this.addExamBatchForm.examType = event;
    },
    trim(){
      this.addExamBatchForm.examSum = this.addExamBatchForm.examSum.replace(/[^\d]/g,'');
    },
    //提交
    submit() {
      this.$refs.addExamBatchFormRef.validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "正在保存",
            spinner: "car-loading",
            customClass: "loading-box",
            background: "rgba(234,237,244, 0.8)"
          });
          let dispatch = 'addExamBatch';
          let successMsg = '添加成功!';
          if(this.handelType === '2'){
            dispatch = 'updateExamBatch';
            successMsg = '修改成功!';
          }
          this.$store.dispatch(dispatch, this.addExamBatchForm).then(
            res => {
              this.$emit("getExamBatchListComp");
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
      this.visible = true;
      this.handelType = type;
      if (type == 1) {
        //新增
        this.dialogTitle = "新增考试";
        this.addExamBatchForm.examSort = "0";
      } else if (type == 2) {
        //修改,查看
        this.getDictInfo("考试管理-考试类型", "examTypeInfo");
        this.dialogTitle = "修改考试";
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
