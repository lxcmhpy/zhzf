<template>
  <el-dialog :title="title" width="420px" :visible.sync="visible" :close-on-click-modal="false">
    <p><i class="el-icon-warning " style="color:#E6A23C"></i>请保存表单内容后再试!</p>
    <br><br>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="closeDoc">确认</el-button>
    </span>
  </el-dialog>

</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import { deleteDocByIdApi } from "@/api/caseHandle";
export default {
  data() {
    return {
      visible: false,
      title: '',
      sureDisab:false,
      id:""
    };
  },
  mixins: [mixinGetCaseApiList],
  computed:{...mapGetters(['caseId'])},
  mounted() { },
  inject: ['reload'],
  methods: {
    //新增
    showModal(data) {
      //显示弹框
      console.log("成功")
      this.visible = true;
      if(data){
        this.title = "无法编辑";
      }else{
        this.title = "无法提交";
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    closeDoc(){
      this.visible = false;
    }
  }
};
</script>
<style scoped>
.el-row {
  margin-bottom: 20px;
  font-weight: 500;
}
.info {
  font-size: 13px;
  margin-bottom: 10px;
  color: black;
  line-height: 20px;
}
.title {
  font-size: 16px;
  line-height: 18px;
}
p {
  height: 16px;
  font-size: 16px;
  font-family: PingFang SC;

  color: rgba(32, 35, 43, 1);
  line-height: 48px;
  text-indent: 1em;
}
</style>




