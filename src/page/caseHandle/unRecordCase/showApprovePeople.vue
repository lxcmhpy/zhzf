<template>
  <el-dialog
    title="选择审批人员"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="30%"
  >
    <div class="showApprovePeople">
      <div class="part">
        <div>经办机构负责人</div>
        <div>
          <el-tag
            :key="tag.userId"
            v-for="tag in firstApprovePeople"
            closable
            :disable-transitions="false"
            @close="deleteOne(tag)"
          >{{tag.userName}}</el-tag>
        </div>
      </div>
      <div class="part">
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
      </div>
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
      firstApprovePeople:[],
      secondApprovePeople:[],
      caseInfo:"",
    };
  },
  inject: ["reload"],
  methods: {
    showModal(data) {
      this.visible = true;
      this.caseInfo = data;
      this.getApprovePeople()

    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    //获取审核人员
    getApprovePeople(){
      console.log(this.caseInfo)
      this.$store.dispatch("getApprovePeople",this.caseInfo.caseId).then(
        res => {
         console.log(res);
          this.firstApprovePeople = res.data[1].approveUserVo;
          this.secondApprovePeople = res.data[2].approveUserVo;
        },
        err => {
          console.log(err);
        }
      );
    },
    deleteOne(tag){
      this.firstApprovePeople.splice(this.firstApprovePeople.indexOf(tag), 1);
    },
    deleteTwo(tag){
      this.secondApprovePeople.splice(this.secondApprovePeople.indexOf(tag), 1);
    },
    submitPdf(){
      // let data={
      //   caseId:this.caseInfo.caseId,
      //   caseLinktypeId:this.caseInfo.caseLinktypeId,
        
      //   }
        this.$store.dispatch("submitPdf", this.caseInfo).then(
        res => {
         console.log('pdf提交',res);
            this.$message({
                type: "success",
                message: "提交成功"
            });
            this.$store.dispatch("deleteTabs", this.$route.name);
            this.$store.commit("setCaseId", this.caseInfo.caseId);
            this.$router.push({
              name: 'flowChart'
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
<style lang="less">
@import "../../../css/caseHandle/index.less";
</style>
