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
import {
   queryFlowBycaseIdApi
} from "@/api/caseHandle";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      visible: false,
    
    };
  },
  inject: ["reload"],
  mixins: [mixinGetCaseApiList],
  computed: {...mapGetters(['caseId'])},
  methods: {
    showModal(data) {
      console.log(data);
      this.visible = true;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    async gotoCoerciveMeasureDoc(){
        this.$store.dispatch("deleteTabs", this.$route.name);
        let currentFlow = '';
        try{
          currentFlow = await queryFlowBycaseIdApi(this.caseId);
          if(currentFlow.data.flowUrl == 'commonGraphData_JX'){
            this.$router.push({name:'case_handle_coerciveMeasureDoc_JX'})
          }else{
            this.$router.push({name:'case_handle_removeOrPrelong'})
          }
        }catch(err){
          this.$message('获取案件流程失败！')
        }
        
        
    }
  },
  mounted() {}
};
</script>
<style lang="scss">

</style>
