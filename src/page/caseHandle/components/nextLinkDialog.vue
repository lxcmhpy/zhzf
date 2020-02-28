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
import { mixinGetCaseApiList } from "@/common/js/mixins";
export default {
  data() {
    return {
      visible: false,
      myChooseNext: "", //选中的环节
      allNextLink: [], //所有环节
      caseId: "" //案件id
    };
  },
  inject: ["reload"],
  mixins: [mixinGetCaseApiList],
  methods: {
    showModal(data) {
      console.log(data);
      this.visible = true;
      this.caseId = data.caseId;
      this.allNextLink = data.nextLink;
      this.myChooseNext = data.nextLink[0].targetLink;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },

    //进入下一环节
    nextLink() {
      this.visible = false;
      let data = this.com_getCaseRouteName(this.myChooseNext);
      //更改流程图中的状态
      let setData = {
        caseId: this.caseId,
        nextFlowChart: data.nextLink
      };
      // this.$store.dispatch("setFlowStatus", setData).then(
      //   res => {
      //     console.log("更改流程图中的状态", res);
      //     this.$store.dispatch("deleteTabs", this.$route.name);
      //     this.$router.push({
      //       name: nextLink,
      //       params: { id: this.caseId }
      //     });
      //   },
      //   err => {
      //     console.log(err);
      //   }
      // );
      this.$store.dispatch("deleteTabs", this.$route.name);
      this.$router.push({
        name: nextLink,
        params: { id: this.caseId }
      });
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
// @import "@/assets/css/caseHandle/index.scss";
</style>
