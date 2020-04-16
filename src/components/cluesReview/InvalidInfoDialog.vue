<template >
  <el-dialog class='mini-dialog-title' title="无效信息" :visible.sync="visible" :show-close='false' :close-on-click-modal="false" width="420px">
    <div class="error-message">
      <div class="">
        <img src="@/../static/images/img/cluesReview/icon_wuxiao.png" alt="">
      </div>
      <p>当前线索为无效信息</p>
    </div>
    <el-form :model="checkSearchForm" ref="checkSearchForm" class="checkSearchForm" label-width="0">
      <div class="invalidinfo">
        <el-select v-model="checkSearchForm.number" placeholder="选择无效线索类型">
          <el-option :value='0' label="无效线索类型1"></el-option>
          <el-option :value='1' label='无效线索类型2'></el-option>
        </el-select>
        <p>备注说明</p>
        <el-input v-model="checkSearchForm.color" type="textarea" ></el-input>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="gotoCoerciveMeasureDoc">确认</el-button>
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
    gotoCoerciveMeasureDoc() {
      this.$store.dispatch("deleteTabs", this.$route.name);
      this.$router.push({ name: 'removeOrPrelong' })
    }
  },
  mounted() { }
};
</script>
<style lang="scss">
@import "@/assets/css/dialogStyle.scss";
</style>
