<template>
  <!-- lawPunishmentBasis   处罚依据 -->
  <el-dialog title="处罚依据" :visible.sync="visible" :close-on-click-modal="false" width="50%">
    <el-form :model="addPageForm" label-width="100px" ref="addPageFormRef" :rules="rules">
      <el-form-item label="法规名称" prop="bnslawNamePun">
        <el-input v-model="addPageForm.bnslawNamePun" placeholder="法规名称"></el-input>
      </el-form-item>
      <el-form-item label="条" prop="itemPun">
        <el-input v-model="addPageForm.itemPun" placeholder="条"></el-input>
      </el-form-item>
      <el-form-item label="款" prop="clausePun">
        <el-input v-model="addPageForm.clausePun" placeholder="款"></el-input>
      </el-form-item>
      <el-form-item label="项" prop="iitemPun">
        <el-input v-model="addPageForm.iitemPun" placeholder="项"></el-input>
      </el-form-item>
      <el-form-item label="罚款下限" prop="lawerLimit">
        <el-input v-model="addPageForm.lawerLimit" placeholder="项"></el-input>
      </el-form-item>
      <el-form-item label="罚款上限" prop="upperLimit">
        <el-input v-model="addPageForm.upperLimit" placeholder="项"></el-input>
      </el-form-item>
      <el-form-item label="最高罚款" prop="highLimit">
        <el-input v-model="addPageForm.highLimit" placeholder="项"></el-input>
      </el-form-item>
      <el-form-item label="处罚标准" prop="cfbz">
        <el-input v-model="addPageForm.cfbz" placeholder="项"></el-input>
      </el-form-item>
      <el-form-item label="法规原文" prop="bnsLawNotePun">
        <el-input v-model="addPageForm.bnsLawNotePun" placeholder="法规原文" type="textarea" :rows="2"></el-input>
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
  addLawPunishmentApi
} from "@/api/system";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["btnlawId"])
  },
  data() {
    return {
      addPageForm: {
        bnslawNamePun: '',
        itemPun: '',
        iitemPun: '',
        bnsLawNotePun: '',
        clausePun: '',
        lawerLimit: '',
        upperLimit: '',
        cfbz: '',
        highLimit: '',
        bnslawIdPun: '',
        bnslawLawName:'test',//先写死
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
      this.addPageForm.bnslawIdPun = this.btnlawId;
      console.log('addPageForm', this.addPageForm)

      addLawPunishmentApi(this.addPageForm).then(
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
