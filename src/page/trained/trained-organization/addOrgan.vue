<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
  >
    <el-form
      :model="addOrganForm"
      label-position="right"
      label-width="100px"
      ref="addOrganFormRef"
      :rules="rules"
    >
      <el-row>
        <el-form-item label="机构名称" prop="toName" class="form-class">
          <el-input v-model="addOrganForm.toName" maxlength="25"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="联系人" prop="contact" class="form-class">
          <el-input v-model="addOrganForm.contact" maxlength="25"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="联系电话" prop="contactNo" class="form-class">
          <el-input v-model="addOrganForm.contactNo" maxlength="11"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="机构简介" prop="toComment" class="form-class">
          <el-input type="textarea" :rows="2" v-model="addOrganForm.toComment"></el-input>
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
import { validatePhone, isSpecialChar } from '@/common/js/validator';
import { addTrainedOrgan } from '@/api/trained';

export default {
  data() {
    return {
      examTypeInfo: [],
      visible: false,
      addOrganForm: {
        toId: "", // 机构ID
        toName: "", // 机构名称
        contact: "", // 联系人
        contactNo: "", // 联系电话
        toComment: "" // 机构描述
      },
      rules: {
        toName: [
          { required: true, message: "机构名称不能为空", trigger: "blur" },
          { validator: isSpecialChar, trigger: 'blur' }
        ],
        contact: [
          { required: true, message: "联系人不能为空", trigger: "blur" },
          { validator: isSpecialChar, trigger: 'blur' }
        ],
        contactNo: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ]
      },
      dialogTitle: "", //弹出框title
      handelType: 0 //添加 0  修改2
    };
  },
  methods: {
    //提交
    submit() {
      this.$refs.addOrganFormRef.validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "正在保存",
            spinner: "car-loading",
            customClass: "loading-box",
            background: "rgba(234,237,244, 0.8)"
          });
          let successMsg = '添加成功!';
          let saveType = this.handelType === '2' ? 'edit' : '';
          if(this.handelType === '2'){
            successMsg = '修改成功!';
          }
          addTrainedOrgan(this.addOrganForm, saveType).then(
            res => {
              this.$emit("getOrganList");
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
    showModal(type, row) {
      this.visible = true;
      this.handelType = type;
      this.addOrganForm.toId = '';
      if (type == '1') {
        //新增
        this.dialogTitle = "新增机构";
      } else if (type == '2') {
        //修改
        this.dialogTitle = "修改机构";
        for (const key in this.addOrganForm) {
          this.addOrganForm[key] = row[key];
        }
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addOrganFormRef"].resetFields();
      for (const key in this.addOrganForm) {
        this.addOrganForm[key] = '';
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
