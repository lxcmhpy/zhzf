<template >
  <el-dialog class='mini-dialog-title' title="任务回退" :visible.sync="visible" :show-close='false' :close-on-click-modal="false" width="420px">
    <div class="error-message">
      <div class="">
        <img src="@/../static/images/img/cluesReview/icon_wuxiao.png" alt="">
      </div>
      <p>当前任务指派有误，请求回退</p>
    </div>
    <el-form :model="checkSearchForm" ref="checkSearchForm" class="checkSearchForm" label-width="0">
      <div class="invalidinfo">
        <p>回退说明:</p>
        <el-input v-model="checkSearchForm.color" type="textarea"></el-input>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="goBackSure">确认</el-button>
      <el-button @click="visible = false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
export default {
  data() {
    return {
      visible: false,
      checkSearchForm: {
        number: '',
        color: ''
      }
    };
  },
  inject: ["reload"],
  mixins: [mixinGetCaseApiList],
  methods: {
    showModal(data) {
      console.log(data);
      this.visible = true;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    goBackSure() {
      this.$store.dispatch("deleteTabs", this.$route.name);
      this.$message({
        type: "success",
        message: "回退成功"
      });
      this.$router.push({ name: 'case_handle_caseCenter-overWeightCase' })
    }
  },
  mounted() { }
};
</script>
<style lang="scss">
@import "@/assets/css/dialogStyle.scss";
</style>
