<template>
  <el-dialog
    title="选择审批人员"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="30%"
  >
    <div class="showApprovePeople">
      <div class="part" v-for="(item,index) in approvalPeopleList" :key="index">
          <div>{{item.returnValue[0]}}</div>
          <div>
            <el-tag
              :key="tag.userId"
              v-for="tag in item.approveUserVo"
              closable
              :disable-transitions="false"
              @close="deleteOne(tag)"
            >{{tag.userName}}</el-tag>
          </div>
      </div>
      <!-- <div class="part">
        <div>执法部门负责人</div>
        <div>
          <el-tag
            :key="tag.userId"
            v-for="tag in secondApprovePeople"
            closable
            :disable-transitions="false"
            @close="deleteOne(tag)"
          >{{tag.userName}}</el-tag>
        </div>
      </div> -->
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submitPdf">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      caseInfo: "",
      approvalPeopleList:[],
    };
  },
  inject: ["reload"],
  methods: {
    showModal(data) {
      this.visible = true;
      this.caseInfo = data;
      this.getApprovePeople();
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    //获取审核人员
    getApprovePeople() {
      console.log(this.caseInfo);
      let _this = this
      this.$store.dispatch("getApprovePeople", this.caseInfo.caseId).then(
        res => {
          console.log(res);
           let data = res.data;
          data.splice(0,1);
          // let swap = data[1];
          // data[1] = data[2];
          // data[2] = swap;
          _this.approvalPeopleList = data;
        },
        err => {
          console.log(err);
        }
      );
    },
    deleteOne(tag) {

      // this.firstApprovePeople.splice(this.firstApprovePeople.indexOf(tag), 1);
    },
    deleteTwo(tag) {
      // this.secondApprovePeople.splice(this.secondApprovePeople.indexOf(tag), 1);
    },
    submitPdf() {
      // let data={
      //   caseId:this.caseInfo.caseId,
      //   caseLinktypeId:this.caseInfo.caseLinktypeId,

      //   }
      let _this = this
      this.$store.dispatch("submitPdf", this.caseInfo).then(
        res => {
          console.log("pdf提交", res);
          _this.$message({
            type: "success",
            message: "提交成功"
          });
          _this.$store.dispatch("deleteTabs", _this.$route.name);
          _this.$store.commit("setCaseId", _this.caseInfo.caseId);
          _this.$router.push({
            name: "flowChart"
          });
        },
        err => {
          console.log(err);
        }
      );
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/caseHandle/index.scss";
</style>
