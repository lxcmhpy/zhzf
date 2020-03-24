<template v-if="caseInfo">
<div>
  <el-dialog
    custom-class="leftDialog leftDialog2 evidenceCatalogueBox"
    :visible.sync="visible"
    @close="closeDialog"
    top="60px"
    width="405px"
    :modal="false"
    :show-close="false"
  >
    <template slot="title">
        <div class="catalogueTitle">
            证据目录
        </div>
    </template>
    <div >
        <el-table bordercolor="black" width="100%" cellspacing="0" :data="eviList">
            <el-table-column prop="evPath" align="center">
              <template slot-scope="scope">
          　　　　<img :src="host+scope.row.evPath" width="70" height="50" @click="evidenceDetail(scope.row)"/>
          　　</template>
            </el-table-column>
        </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-upload
        class="upload-demo"
        :http-request="saveFile"
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
        >
        <el-button size="small" type="primary" @click="hidden">上传证据</el-button>
    </el-upload>
    </span>
  </el-dialog>
  <evidenceDetail ref="evidenceDetailRef"></evidenceDetail>

  <evidenceUploadSuccess ref="evidenceUploadSuccessRef" @getEvidenceEmit="getEviList"></evidenceUploadSuccess>
</div>
</template>
<script>
import { mapGetters } from "vuex";
import evidenceDetail from "./evidenceDetail";
import evidenceUploadSuccess from "./evidenceUploadSuccess";
import iLocalStroage from "@/common/js/localStroage.js";
import {
 uploadEvApi,
 findFileByIdApi,
 uploadEvdence
} from "@/api/upload";
export default {
  data() {
    return {
      host:"",
      visible: false,
      eviList:[],
      evfile:"",
      form: {
        id: "",
        caseId: "",
        evName: "",
        evType: "",
        status: 0,//默认为有效证据
        fileId: "",
        remark: "",
        file: null,
        docId: "",
        category: "",
        userId: ""
      },
    };
  },
  inject: ["reload"],
  // props: ["caseInfo"],
  computed: { ...mapGetters(["caseId"]) },
  components: {
        evidenceDetail, 
        evidenceUploadSuccess       
    },
  methods: {
    hidden(){
      this.visible = false;
    },
    showModal() {
      console.log('show');

      this.visible = true;
      console.log(this.visible);

    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    //查询证据列表
    getEviList() {
        let data = {
            caseId:this.caseId,
            // evName:this.evidenceForm.evName,
            // evType:this.evidenceForm.evType,
            status:'0',  //查询有效的证据
            // current: this.currentPage,
            // size: this.pageSize
        };
        console.log("证据目录参数",data);
        let _this = this
        this.$store.dispatch("getEvidence", data).then(res => {
            _this.eviList = res.data.records;
            console.log("111",_this.eviList);
        });

    },
    //显示证据详情
    evidenceDetail(data){
        console.log("证据详情",data)        
        this.$refs.evidenceDetailRef.showModal(data); 
    },
    saveFile(param) {
      console.log(param);
      (this.form.file = param.file),
      (this.form.caseId = this.caseId),
      (this.form.docId = "000"),
      (this.form.category = "证据"),
      (this.form.userId = iLocalStroage.gets("userInfo").id),
      (this.form.evName = param.file.name);
      this.insertEvi();      
    },
    //插入证据
    insertEvi(id){
      var fd = new FormData();
      fd.append("file", this.form.file);
      fd.append("caseId", this.form.caseId);
      fd.append("docId", this.form.docId);
      fd.append("category", this.form.category);
      fd.append("userId", this.form.userId);
      fd.append("evName", this.form.evName);
      fd.append("evType", this.form.evType);
      fd.append("status", this.form.status);
      fd.append("remark", this.form.remark);
      fd.append("fileId", this.form.fileId);
      // fd.append("id", this.form.id);
      let _this = this
      uploadEvdence(fd).then(res => {
        console.log("1111111",res);
        if (res.code == 200){
          this.$refs.evidenceUploadSuccessRef.showModal();
          _this.addVisible = false;
          // _this.currentPage = 1;
          _this.getEviList();
        }else{
          _this.$message.error('出现异常，添加失败！');
        }
      });
    },
  },
  mounted () {
      this.host = JSON.parse(sessionStorage.getItem("CURRENT_BASE_URL")).PDF_HOST;
      console.log(this.host);
      this.getEviList();
      var class1 =  document.getElementsByClassName("evidenceCatalogueBox");
      console.log('class',class1)
      var class2 = class1[0].parentNode;
      console.log('class',class2)
      class2.style.right = '60px';
  }
};
</script>
<style lang="scss">
// @import "@/assets/css/caseHandle/index.scss";
.evidenceCatalogueBox{
    background: #EAEDF4;
    .el-dialog__header {
        height: 64px;
        background: #FFFFFF;
        color: #20232B;
        padding: 0 0 0 20px;
        line-height: 64px;
        .catalogueTitle {
            font-size: 20px;
            cursor: pointer;
        }
    }
    table{
        text-align: center;
        background: #fdffff;
        td{
            padding: 10px 0;
            min-height: 38px;
            border: 1px solid #7F8185;
        }
        tr{
            td:nth-child(1),td:nth-child(3){
                width: 40px;
            }
        }
    }
}
</style>
