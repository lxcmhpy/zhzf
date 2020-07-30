<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
  >
    <el-form
      :model="addMockExamForm"
      label-position="right"
      label-width="100px"
      ref="addMockExamFormRef"
      :rules="rules"
    >
      <el-row>
        <el-form-item label="考试名称" prop="teName" class="form-class">
          <el-input v-model="addMockExamForm.teName"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="考试类型" prop="teType">
          <el-select
            v-model="addMockExamForm.teType"
            placeholder="考试类型"
            remote
            @focus="getDictInfo('考试管理-考试类型','teTypeInfo')"
            disabled
          >
            <el-option
              v-for="value in teTypeInfo"
              :key="value.id"
              :label="value.name"
              :value="value.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="试题排序" prop="orderType">
          <el-select
            v-model="addMockExamForm.orderType" disabled="">
            <el-option label="固定顺序" value="0"></el-option>
            <el-option label="随机顺序" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="考试人数" prop="teNum" class="form-class">
          <el-input v-model="addMockExamForm.teNum" @input="trim()"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="备注" prop="remark" class="form-class">
          <el-input v-model="addMockExamForm.remark"></el-input>
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
import { editMockExamInfo } from '@/api/trained'

export default {
  data() {
    return {
      teTypeInfo: [],
      visible: false,
      addMockExamForm: {
        examId: "", //考试ID
        oid: "",
        teName: "", //考试名称
        teType: "", //考试类型
        orderType: "0", //试题顺序
        teNum: "", //考试人数
        remark: "" //备注
      },
      rules: {
        teName: [
          { required: true, message: "考试名称不能为空", trigger: "blur" }
        ],
        teType: [
          { required: true, message: "考试类型不能为空", trigger: "change" }
        ],
        orderType: [
          { required: true, message: "试题排序不能为空", trigger: "blur" }
        ],
        teNum: [
          { required: true, message: "考试人数不能为空", trigger: "blur" }
        ]
      },
      dialogTitle: "", //弹出框title
      handelType: 0 //添加 0  修改2  查看3
    };
  },
  created(){
    this.getDictInfo("考试管理-考试类型", "teTypeInfo");
  },
  methods: {
     trim(){
      this.addMockExamForm.teNum=this.addMockExamForm.teNum.replace(/[^\d]/g,'');
    },
    //提交
    submit() {
      this.$refs.addMockExamFormRef.validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "正在保存",
            spinner: "car-loading",
            customClass: "loading-box",
            background: "rgba(234,237,244, 0.8)"
          });
          let successMsg = this.handelType === '2' ? '修改成功!' : '添加成功!';
          let editType = this.handelType === '2' ? 'edit' : '';
          editMockExamInfo(this.addMockExamForm, editType)
            .then(
              res => {
                this.$emit("getMockExam");
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
      if(this[codeName].length) return;
      this.$store.dispatch("findAllDrawerByName", name).then(
        res => {
          if (res.code === 200) {
            if (codeName === "teTypeInfo") {
              this.teTypeInfo = res.data
              const trainteType = res.data.find(item => item.name === '模拟考试');
              this.addMockExamForm.teType = trainteType.id;
            }
          } else {
            console.info("没有查询到数据");
          }
        }
      );
    },
    showModal(type, row) {
      this.visible = true;
      this.handelType = type;
      if (type == 1) {
        //新增
        this.dialogTitle = "新增考试";
        this.addMockExamForm.orderType = "0";
      } else if (type == 2) {
        //修改,查看
        this.dialogTitle = "修改考试";
        this.addMockExamForm.teId = row.teId;
        this.addMockExamForm.teName = row.teName;
        this.addMockExamForm.teType = row.teType;
        this.addMockExamForm.teNum = row.teNum;
        this.addMockExamForm.remark = row.remark;
        this.addMockExamForm.orderType = row.orderType.trim();
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addMockExamFormRef"].resetFields();
      for (const key in this.addMockExamForm) {
        if(key !== 'teType'){
          this.addMockExamForm[key] = "";
        }
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
