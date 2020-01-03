<template>
  <el-dialog
    title="下一环节"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="30%"
  >
    <div>
      <el-radio-group v-model="myChooseNext">
        <div v-for="(item,index) in allNextLink" :key="index">
          <el-radio :label="item.targetLink">{{item.targetLinkName}}</el-radio>
        </div>
      </el-radio-group>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="nextLink()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      myChooseNext: "", //选中的环节
      allNextLink: [] //所有环节
    };
  },
  inject: ["reload"],
  methods: {
    showModal(data) {
      this.visible = true;
      this.allNextLink = data;
      this.myChooseNext = data[0].targetLink;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },

    //进入下一环节
    nextLink() {
        this.$emit('myChooseNext',this.myChooseNext);
         this.visible = false;
    }
  },
  mounted() {}
};
</script>
<style lang="less">
// @import "../../../css/caseHandle/index.less";
</style>
