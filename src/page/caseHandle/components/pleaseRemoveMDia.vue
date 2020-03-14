<template>
  <el-dialog
    title="提示"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="30%"
  >
    <div>
      <p>行政强制措施即将到期，请前往解除行政强制措施</p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="gotoCoerciveMeasureDoc">前往解除</el-button>
      <el-button @click="visible = false" >取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
export default {
  data() {
    return {
      visible: false,
    
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
    gotoCoerciveMeasureDoc(){
        this.$store.dispatch("deleteTabs", this.$route.name);
        this.$router.push({name:'removeOrPrelong'})
    }
  },
  mounted() {}
};
</script>
<style lang="scss">

</style>
