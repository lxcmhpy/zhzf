<template>
  <el-dialog title="预览" :visible.sync="visible" :close-on-click-modal="false" width="50%">
   <div>
     <preview :psMsg='psMsg'></preview>
   </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="visible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
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
      psMsg:{}
    }
  },
  methods: {
    //提交
    submit() {

    },
    showModal(compData) {
      this.visible = true;
      console.log('预览dialog',compData)
      this.psMsg=JSON.parse(JSON.stringify(compData))
    },

    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addTempleteFormRef"].resetFields();
    },
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
