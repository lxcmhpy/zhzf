<template >
  <el-dialog class='mini-dialog-title' title="确认执行" :visible.sync="visible" :show-close='false' :close-on-click-modal="false" width="420px">
    <div class="error-message">
      <div class="">
        <img src="@/../static/images/img/cluesReview/icon_wuxiao.png" alt="">
      </div>
      <p>确认当前线索，启动案件办理流程</p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="goSure">确认</el-button>
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
    goSure() {
    //   this.$store.dispatch("deleteTabs", this.$route.name);
      this.$router.push({ name: 'inforCollect' })
    }
  },
  mounted() { }
};
</script>
<style lang="scss">
@import "@/assets/css/dialogStyle.scss";
</style>
