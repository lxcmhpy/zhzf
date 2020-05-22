<template>
  <!-- LawCognizanceBasis   认定依据 -->
  <el-dialog title="认定依据" :visible.sync="visible" :close-on-click-modal="false" width="50%">
    <el-form :model="addPageForm" label-width="100px" ref="addPageFormRef" :rules="rules">
      <el-form-item label="法规名称" prop="bnslawNameCog">
        <el-input v-model="addPageForm.bnslawNameCog" placeholder="法规名称"></el-input>
      </el-form-item>
      <el-form-item label="条" prop="itemCog">
        <el-input v-model="addPageForm.itemCog" placeholder="条"></el-input>
      </el-form-item>
      <el-form-item label="款" prop="clauseCog">
        <el-input v-model="addPageForm.clauseCog" placeholder="款"></el-input>
      </el-form-item>
      <el-form-item label="项" prop="iitemCog">
        <el-input v-model="addPageForm.iitemCog" placeholder="项"></el-input>
      </el-form-item>
      <el-form-item label="法规原文" prop="bnsLawNoteCog">
        <el-input v-model="addPageForm.bnsLawNoteCog" placeholder="法规原文" type="textarea" :rows="2"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="addSure">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {
  addeLawCognizanceApi
} from "@/api/system";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["btnlawId"])
  },
  data() {
    return {
      addPageForm: {
        bnslawNameCog: '',
        itemCog: '',
        iitemCog: '',
        bnsLawNoteCog: '',
        clauseCog: '',
        bnslawIdCog: ''
      },
      visible: false,
      rules: {}
    }
  },
  methods: {
    //提交
    submit() {

    },
    showModal(type, row) {
      this.visible = true;

    },

    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addTempleteFormRef"].resetFields();
    },
    addSure() {
      this.addPageForm.bnslawIdCog = this.btnlawId;
      console.log('addPageForm', this.addPageForm)

      addeLawCognizanceApi(this.addPageForm).then(
        res => {
          console.log("添加法规", res);
          if (res.code == '200') {
            this.$message({ message: '添加成功', type: 'success' });
            this.visible = false;
          } else {
            this.$message.error('添加失败');
            return
          }
        },
        error => {
          console.log(error)
        }
      );

    }
  },
  created() {
  }
}
</script>
<style lang="scss" scoped>
.el-input__inner {
  width: 320px;
}
</style>
