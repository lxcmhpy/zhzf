<template>
  <el-dialog
    title="修改信息"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
    append-to-body
    class="fullscreen"
  >
    <el-form
      :model="entryForm"
      label-position="right"
      label-width="100px"
      ref="entryForm"
      :rules="rules"
    >
      <div class="departTable">
        <el-row>
          <el-form-item label="单位:" prop="company">
            <el-input v-model="entryForm.company"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="姓名:" prop="userName">
            <el-input v-model="entryForm.userName"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="身份证号" prop="idCode">
            <el-input v-model="entryForm.idCode" maxlength="18"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="联系方式" prop="telephone">
            <el-input v-model="entryForm.telephone" maxlength="11"></el-input>
          </el-form-item>
        </el-row>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { validateIDNumber, validatePhone } from '@/common/js/validator';

export default {
  data() {
    return {
      visible: false,
      entryForm: {
        company: "",
        userName: "",
        idCode: "",
        telephone: "",
        invigilatorId: this.$route.query.id
      },
      rules: {
        company: [{ required: true, message: "请输入单位", trigger: "blur" }],
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        idCode: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { validator: validateIDNumber, trigger: "blur" }
        ],
        telephone: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //提交
    submit() {
      this.$refs.entryForm.validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "正在提交",
            spinner: "car-loading",
            customClass: "loading-box",
            background: "rgba(234,237,244, 0.8)"
          });
          // 提交操作
          this.$store.dispatch("editInvigilatorInfo", this.entryForm).then(
            res => {
              loading.close();
              if(res.code === 200){
                const invigilatorInfo = JSON.parse(sessionStorage.getItem('ExamUserInfo'));
                for(const key in this.entryForm){
                  if(key !== 'invigilatorId'){
                    invigilatorInfo.invigilatorInfo[key] = this.entryForm[key];
                  }
                }
                sessionStorage.setItem('ExamUserInfo', JSON.stringify(invigilatorInfo));
                this.$message({ type: 'success', message: '修改成功' });
                this.visible = false;
              }
            },
            err => {
              loading.close();
              this.$message({ type: 'error', message: err.msg || '' });
            }
          );
        } else {
          return false;
        }
      });
    },
    showModal(row) {
      for(const key in this.entryForm){
        this.entryForm[key] = row[key];
      };
      this.visible = true;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
>>> .el-date-editor.el-input,
>>> .el-select {
  width: 100%;
}
</style>
