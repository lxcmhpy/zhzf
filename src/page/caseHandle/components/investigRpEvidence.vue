<template>
  <el-dialog
    title="证据材料"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="45%"
  >
    <div>
      <p class="handelBtn">
          <el-button type="primary" size="small"  @click="showEvidenceList">选择已上传证据</el-button>
          <!-- <el-button type="primary" @click="chooseLocalEvidence">本地上传</el-button> -->
          <el-upload
            class="localUpload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :http-request="chooseLocalEvidence" :show-file-list="false" >
            <el-button size="small" type="primary">本地上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        
        </el-upload>
      </p>  
      <el-table :data="tableData" style="width: 100%" height="250">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="name" label="证据名称" align="center"></el-table-column>
        <el-table-column prop="des" label="规格" width="50" align="center"></el-table-column>
        <el-table-column prop="num" label="数量" width="50" align="center"></el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="sendToReport">确 定</el-button>
    </span>
    <caseAndEvidenceListDia ref="caseAndEvidenceListDiaRef" @sendEvidenceEmit="receiverEviden"></caseAndEvidenceListDia>
  </el-dialog>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";
import { mapGetters } from "vuex";
import caseAndEvidenceListDia from "./caseAndEvidenceListDia";
import {
 uploadEvApi,
 findFileByIdApi,
} from "@/api/upload";
export default {
  data() {
    return {
      visible: false,
      tableData:[],
    };
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  components: {
   caseAndEvidenceListDia,
  },
  methods: {
    showModal(data) {
      this.visible = true;
      console.log(data);
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    //选择已上传证据
    showEvidenceList(){
        this.$refs.caseAndEvidenceListDiaRef.showModal(this.tableData);
    },
    //证据列表传来的数据
    receiverEviden(list){
        // this.tableData.length = list.length;
        this.tableData = [];
        list.forEach((element,index) => {
            console.log('element',element);
            let evi={'name':element,'des':'份','num':1}
        
            this.tableData.push(evi);
        });
    },
    //本地上传
    chooseLocalEvidence(param){
        var fd = new FormData()
      fd.append("file", param.file);
      fd.append('caseId',this.caseId)
      fd.append('docId','2c9029ee6cac9281016caca7f38e0002');
      uploadEvApi(fd).then(
        res => {
          console.log(res);
          this.findFile(res.data);
        },
        error => {
          console.log(error)
        }
      );
    },
    findFile(id){
      findFileByIdApi(id).then(
        res => {
          console.log(res);
          this.tableData.push({'name':res.data.fileName,'num':1,'des':'份'});
        //   this.alreadyLoadPayEvidence.push(res.data);
        //   if(isAdd){
        //     if(this.formData.payEvidence){
        //       let payEvidenceArr = this.formData.payEvidence.split(',');
        //       payEvidenceArr.push(id);
        //       this.formData.payEvidence = payEvidenceArr.join(',');
        //     }else{
        //       this.formData.payEvidence = id;
        //     }
        //   }

        },
        error => {
          console.log(error)
        }
      );
    },
    //传到调查报告
    sendToReport(){
        this.visible = false;
        if(this.tableData.length > 4){
             this.$message('证据材料不得多于4个!');
             return;
        }
        let a=4-this.tableData.length;
        let sendData = JSON.parse(JSON.stringify(this.tableData));
        if(this.tableData.length < 4){
           for(let i=0;i<a;i++){
              sendData.push({'name':'','num':'','des':''})
           }
        }
        this.$emit('sendToReportEmit',sendData);
    }

  }
};
</script>
<style lang="scss" scope>
.handelBtn{
    margin-bottom: 15px;
    .localUpload{
        display: inline-block;
    }
}
</style>
