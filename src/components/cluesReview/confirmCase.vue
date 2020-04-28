<template >
  <el-dialog class='mini-dialog-title' :title="title" :visible.sync="visible" :show-close='false' :close-on-click-modal="false" width="420px">
    <div class="error-message">
      <div class="">
        <img src="@/../static/images/img/cluesReview/icon_wuxiao.png" alt="">
      </div>
      <p>{{message}}</p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="goSure">确认</el-button>
      <el-button @click="visible = false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";
export default {
  data() {
    return {
      visible: false,
      checkSearchForm: {
        number: '',
        color: ''
      },
      title:'确认执行',
      message:'确认当前线索，启动案件办理流程',
    };
  },
  inject: ["reload"],
  mixins: [mixinGetCaseApiList],
  methods: {
    showModal(data) {
      console.log(data);
      if(data){
        this.title=data.title
        this.message=data.message
      }
      this.visible = true;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    goSure() {
      //   this.$store.dispatch("deleteTabs", this.$route.name);
      let data={
        caseSource:'其他途径',
        caseCauseName:'车辆在公路上擅自超限行驶',
        programType:'非现场执法',
        partyType:2,
      }
      iLocalStroage.sets('overWeightCaseData', data);
      this.$router.push({ name: 'case_handle_inforCollect' })
    }
  },
  mounted() { }
};
</script>
<style lang="scss">
// @import "@/assets/css/dialogStyle.scss";
@import "@/assets/css/cluesReview.scss";
</style>
