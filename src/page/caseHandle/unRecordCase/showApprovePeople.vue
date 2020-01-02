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
            :key="tag"
            v-for="tag in people1"
            closable
            :disable-transitions="false"
            @close="deleteOne(tag)"
          >{{tag}}</el-tag>
        </div>
      </div>
      <div class="part">
        <div>执法部门负责人</div>
        <div>
          <el-tag
            :key="tag"
            v-for="tag in people2"
            closable
            :disable-transitions="false"
            @close="deleteOne(tag)"
          >{{tag}}</el-tag>
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
      people1:['张三','李四'],
      people2:['王吧'],
      caseInfo:"",
    };
  },
  inject: ["reload"],
  methods: {
    showModal(data) {
      this.visible = true;
      this.caseInfo = data;
      //   this.alreadyChooseLawPerson = alreadyChooseLawPerson
      //   this.searchLawPerson()
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    deleteOne(tag){
        this.people1.splice(this.people1.indexOf(tag), 1);
    },
    deleteTwo(tag){
        this.people2.splice(this.people2.indexOf(tag), 1);
    },
    submitPdf(){
        this.$store.dispatch("submitPdf", this.caseInfo).then(
        res => {
         console.log('pdf提交',res);
            this.$message({
                type: "success",
                message: "提交成功"
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
