<template>
  <el-dialog title="预览" :visible.sync="visible" :close-on-click-modal="false" width="50%">
   <div>
     <preview :psMsg='psMsg'></preview>
   </div>
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
import preview from "./writeRecord"
export default {
  computed: {
    ...mapGetters(["btnlawId"])
  },
  components:{
    preview
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
      rules: {},
      psMsg:''
    }
  },
  methods: {
    //提交
    submit() {

    },
    showModal(compData) {
      this.visible = true;
      console.log('预览dialog',compData)
      this.psMsg=compData
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
