<template v-if="caseInfo">
<div>
  <el-dialog
    custom-class="leftDialog leftDialog2 archiveCatalogueBox"
    :visible.sync="visible"
    @close="closeDialog"
    top="60px"
    width="305px"
    :modal="false"
    :show-close="false"
  >
    <template slot="title">
        <div class="catalogueTitle">
            文书列表
        </div>
    </template>
    <div class="userList">
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedDocId">
              <el-checkbox
              v-for="(item,index) in caseList"
              :label="item.storageId"
              :key="item.storageId">
                <span class="name">{{index+1}}</span>
                <span class="name">{{item.docName}}</span>
              </el-checkbox>
          </el-checkbox-group>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          ></el-checkbox>
      <el-button @click="routerArchiveCatalogueDetail" type="primary">打印</el-button>
    </span>
  </el-dialog>
  <el-dialog
        :visible.sync="pdfVisible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="1000px"
         append-to-body>
        <div >
        <div style="height:auto;">
        <!-- <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image> -->
            <!-- <div v-if="mlList.length > 0" lazy>
                <object >
                    <embed class="print_info" style="padding:0px;width: 790px;margin:0 auto;height:1150px !important" name="plugin" id="plugin"
                    :src="mlList[indexPdf]" type="application/pdf" internalinstanceid="29">
                </object>
            </div> -->
            <div v-show="showCover=='pdf'">
                <object >
                    <embed class="print_info" style="padding:0px;width: 790px;margin:0 auto;height:1150px !important" name="plugin" id="plugin"
                    :src="docSrc" type="application/pdf" internalinstanceid="29">
                </object>
            </div>
            <div style="position:absolute;bottom:150px;right: 20px;width:100px;">
              <!-- <el-button @click="updatePDF1">上一张</el-button><br><br>
              <el-button @click="updatePDF2">下一张</el-button> -->
              <el-button @click="showNext('last')" :disabled="!nowShowPdfIndex ? true : false">上一张</el-button><br><br>
              <el-button @click="showNext('next')" :disabled="nowShowPdfIndex == this.checkedDocId.length-1 ? true : false">下一张</el-button>
            </div>
        </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { findByCaseBasicInfoIdApi,findByCaseIdAndDocIdApi,findVoByDocCaseIdApi } from "@/api/caseHandle";
export default {
  data() {
    return {
      visible: false,
      caseList:[],
      mlList: [],
      pdfVisible: false,
      host:"",
      checkedDocId:[],
      indexPdf: 0,
      nowShowPdfIndex:0,
       docSrc:'', //文书的pdf地址
       isIndeterminate: true,
       checkAll: false,
    };
  },
  inject: ["reload"],
  // props: ["caseInfo"],
  computed: { ...mapGetters(["caseId"]) },
  methods: {
    showModal() {
//      console.log('show');

      this.visible = true;
//      console.log(this.visible);

    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    //获取已完成文书列表
     getByMlCaseId() {
      let _this = this
      findVoByDocCaseIdApi(this.caseId).then(
        res => {
            debugger
          console.log(res);
          _this.caseList = res.data;
        },
        error => {
          console.log(error);
        }
      );
    },
    // getByMlCaseId() {
    //   let _this = this
    //   findByCaseBasicInfoIdApi(this.caseId).then(
    //     res => {
    //         debugger
    //       console.log(res);
    //       _this.caseList = res.data;
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   );
    // },
     routerArchiveCatalogueDetail () {
        debugger
        let _thats = this
        this.docSrc = this.host + this.checkedDocId[0];
        this.nowShowPdfIndex = 0;
        this.indexPdf = 0;
        this.pdfVisible = true
        this.archiveSuccess = true;
        this.showCover = 'pdf';
    },
    // routerArchiveCatalogueDetail () {
    //     debugger
    //     let _thats = this
    //     this.checkedDocId.forEach((v)=>{
    //        debugger
    //        _thats.mlList.push(this.host + v)
    //     });
    //     this.indexPdf = 0;
    //     this.pdfVisible = true
    //     console.log('选中的id',this.checkedDocId)
    // },
    alertPDF (item) {
        debugger
        let data = {
            caseId:item.caseBasicinfoId,
            docId: item.caseDoctypeId,
        };
        let _that = this
        findByCaseIdAndDocIdApi(data).then(res=>{
            debugger
            _that.mlList = _that.host + res.data[0].storageId;

        },err=>{
            console.log(err);
        })
        this.indexPdf = 0;
        this.pdfVisible = true
    },
    //显示封面
    showCover(){
      if(this.$route.name!='archiveCover'){
        let item={name:'cover'}
        this.$router.push({name:'archiveCover',params:{clickIsDoc:JSON.stringify(item)}});
        return;
      }
      this.$emit('showCoverEmit')
    },
     //上下翻页显示pdf
    showNext(flag){
      debugger
      if(flag == 'last'){
        debugger
        if(this.nowShowPdfIndex){
          debugger
          this.nowShowPdfIndex--;
          this.docSrc = this.host + this.checkedDocId[this.nowShowPdfIndex];
        }
      }else{
        debugger
        if(this.nowShowPdfIndex != this.checkedDocId.length-1){
          this.nowShowPdfIndex++;
          debugger
          this.docSrc = this.host + this.checkedDocId[this.nowShowPdfIndex];
        }
      }
    },
     //全选
    handleCheckAllChange(val) {
//      debugger
//      console.log(val);
      if (val) {
        debugger
        this.caseList.forEach(item => {
          debugger
          //复选框存入id
          this.checkedDocId.push(item.storageId);
        });
      } else {
        this.checkedDocId = [];
      }
      this.isIndeterminate = false;
    },
  },
  mounted () {
    this.getByMlCaseId();
    this.host = JSON.parse(sessionStorage.getItem("CURRENT_BASE_URL")).PDF_HOST
     var class1 =  document.getElementsByClassName("archiveCatalogueBox");
//     console.log('class',class1)
     var class2 = class1[0].parentNode;
//     console.log('class',class2)
     class2.style.right = '60px';
     this.host = JSON.parse(sessionStorage.getItem("CURRENT_BASE_URL")).PDF_HOST
  }
};
</script>
<style lang="scss">
// @import "@/assets/css/caseHandle/index.scss";
.fullscreen .archiveCatalogueBox{
    background: #EAEDF4;
    margin-right: 0;
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
