<template>
    <div class="box">
        <div style="margin:0 auto;width:690px">
            <!-- <object >
                <embed class="print_info" style="padding:0px;width: 690px;margin:0 auto;height:1150px !important" name="plugin" id="plugin"
                :src="docSrc" type="application/pdf" internalinstanceid="29">
            </object> -->
            <iframe :src="'/static/pdf/web/viewer.html?file='+encodeURIComponent(docSrc)" frameborder="0" style="width:790px;height:1119px">
            </iframe>
        </div>
        <div style="position:fixed;bottom:150px;right: 60px;width:100px;">
            <el-button @click="showNext('last')" :disabled="!nowShowPdfIndex ? true : false">上一张</el-button><br><br>
            <el-button @click="showNext('next')" :disabled="nowShowPdfIndex == caseList.length-1 ? true : false">下一张</el-button>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import iLocalStroage from "@/common/js/localStroage";
export default {
  data() {
    return {
        caseList:[],
        docSrc:"",
        nowShowPdfIndex:0,
    }
  },
  computed: { ...mapGetters(['caseId']) },
  methods:{
      getByMlCaseId() {
        let _that = this
         this.$store.dispatch("getByMlCaseIdNew", this.caseId).then(
         res=>{
           console.log('getByMlCaseId',res)
            res.data = res.data.sort(function(a,b){
              return a.num - b.num;
            });
           console.log('getByMlCaseId2',res.data)

             this.caseList = res.data;
            //   this.showCover = 'pdf';
              // this.docSrc = this.host + this.caseList[0].storageId;
              this.$util.com_getFileStream(this.caseList[0].storageId).then(res => {
                this.docSrc = res;
              });
              this.nowShowPdfIndex = 0;
            //   this.archiveSuccess = true;
         },
         err=>{
           console.log(err)
         }
       )
    },
    //上下翻页显示pdf
    showNext(flag){
      if(flag == 'last'){
        if(this.nowShowPdfIndex){
          this.nowShowPdfIndex--;
          // this.docSrc = this.host + this.caseList[this.nowShowPdfIndex].storageId;
          this.$util.com_getFileStream(this.caseList[this.nowShowPdfIndex].storageId).then(res => {
            this.docSrc = res
          });
        }
      }else{
        if(this.nowShowPdfIndex != this.caseList.length-1){
          this.nowShowPdfIndex++;
          // this.docSrc = this.host + this.caseList[this.nowShowPdfIndex].storageId;
          this.$util.com_getFileStream(this.caseList[this.nowShowPdfIndex].storageId).then(res => {
            this.docSrc = res
          });
        }
      }
    },
  },
  created(){
      this.getByMlCaseId();
  }
}
</script>