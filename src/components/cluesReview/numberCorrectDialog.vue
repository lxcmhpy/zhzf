<template>
  <el-dialog class='mini-dialog-title' title="号牌更正" :visible.sync="visible" :show-close='false' :close-on-click-modal="false" width="420px">
    <el-form :model="checkSearchForm" ref="checkSearchForm" class="checkSearchForm" label-width="92px">
      <div>
        <div class="item">
          <el-form-item label="图像识别车牌">
            <el-input v-model="checkSearchForm.number"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="车牌颜色">
            <el-input v-model="checkSearchForm.color"></el-input>
          </el-form-item>
        </div>

      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="gotoCoerciveMeasureDoc">保存</el-button>
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
