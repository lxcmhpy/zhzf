<template>
  <el-dialog :title="title" width="420px" :visible.sync="visible" :close-on-click-modal="false" append-to-body>
    <!-- <el-row class="title" :gutter="20">
      <el-col>清空</el-col>
    </el-row> -->
    <p>上传了一个证据，请前往证据目录查看</p>
    <br><br>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="checkEvidence">确定</el-button>
      <!-- <el-button type="primary" @click="visible = false" >确定</el-button> -->
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
    //   checkList: [],
      title: '上传证据',
      sureDisab:false,
    //   caseLinkDataForm:{ //为了在公共方法中使用，所以这样组装
    //     caseBasicinfoId:'',
    //     caseLinktypeId:''
    //   },
      //通过文书ID删除文书
      id:""
    };
  },
  mixins: [mixinGetCaseApiList],
  computed:{...mapGetters(['caseId'])},
  mounted() { },
  inject: ['reload'],
  methods: {
    //新增
    showModal() {
      //显示弹框
    //   console.log(data);
    //   this.id = data.docDataId;
      this.visible = true;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    //   this.checkList = [];
    },
    // 弹框关闭按钮
    resetForm() {
      this.visible = false;
    },
    checkEvidence(){
        console.log("145623");
        this.visible = false;
        this.$emit("getEvidenceEmit");
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




