<template>
  <el-dialog
    title="环节回退"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="400px"
  >
    <div>
      <p><span style="color:#4573d0;font-size:20px;vertical-align: middle;"><i class="el-icon-warning"></i></span> 当前环节将变为初始状态，是否继续？</p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="linkBackSure()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";
import { mapGetters } from "vuex";
import {
 linkBackApi,getCaseBasicInfoApi,
} from "@/api/caseHandle";
export default {
  data() {
    return {
      visible: false,
     
    };
  },
  inject: ["reload"],
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId", "docId", "showQZBtn", "docDataId"]) },
  methods: {
    showModal() {
      this.visible = true;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    //回退
    async linkBackSure(){
        try{
            let  caseRes= await getCaseBasicInfoApi({id: this.caseId})
            if (caseRes.data.caseStatus == "待审批" || caseRes.data.caseStatus == "审批中") {
                this.$message('当前环节审批中，不允许回退！')
            }else{
              await linkBackApi(this.caseId); 
              this.$emit('backSuccess');
            } 
        }catch(err){
            this.$message('回退失败！')
        }
    }
  },

  mounted() {},
};
</script>
<style lang="scss">

</style>
