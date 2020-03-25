<template>
  <div class="box">
    <el-form ref="archiveCoverForm" :rules="rules" :model="formData" label-width="105px" v-show="showCover">
      <div class="content_box">
        <div class="content">
          <div class="content_title">全国道路运输执法案件</div>
          <div class="border_blue"></div>
          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item label="案号">
                  <el-input
                    class="w-120"
                    v-model="formData.caseNumber"
                    size="small"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="border_blue"></div>
          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item label="案由">
                  <el-input class="w-120" v-model="formData.caseName" size="small" :disabled="true"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="当事人" prop="party">
                  <el-input class="w-120" v-model="formData.party" size="small" :disabled="true"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="立卷人" prop="nickName">
                  <el-input class="w-120" v-model="formData.nickName" size="small"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="执法机关"  prop="organName">
                  <el-input v-model="formData.organName" class="w-120" size="small"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="border_blue"></div>
          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item label="立案时间" prop="acceptTime">
                  <!-- <el-input class="w-120" size="small" v-model="formData.acceptTime"></el-input> -->
                  <el-date-picker
                  class="w-120"
                    v-model="formData.acceptTime"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm"
                  ></el-date-picker>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="结案时间" prop="closeDate">
                  <el-date-picker
                    v-model="formData.closeDate"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="立卷时间" prop="lyTime">
                  <el-date-picker
                    v-model="formData.lyTime"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm"
                  ></el-date-picker>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="保管期限" prop="period">
                  <el-input v-model="formData.period" class="w-120" size="small"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </el-form>
    <div v-show="!showCover" style="margin:0 auto;width:690px">
        <object >
            <embed class="print_info" style="padding:0px;width: 690px;margin:0 auto;height:1150px !important" name="plugin" id="plugin"
            :src="docSrc" type="application/pdf" internalinstanceid="29">
        </object>
  
    </div>
    <!--快速入口 -->
    <caseSlideMenu :activeIndex="'archiveCatalogue'" @showArchiveCatalogue="showArchiveCatalogue"></caseSlideMenu>
    <!-- 卷宗目录 -->
    <archiveCatalogue ref="archiveCatalogueRef"  @alertPDF="alertPDF" @showCoverEmit="showCoverEvent"></archiveCatalogue>
    <!-- 引入buttn -->
    <!-- <div @click="getMl">pdf</div> -->
    <el-dialog
        :visible.sync="pdfVisible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="1000px"
         append-to-body>
        <div >
        <div style="height:auto;">
        <!-- <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image> -->
            <div v-if="mlList.length > 0" lazy>
                <object >
                    <embed class="print_info" style="padding:0px;width: 790px;margin:0 auto;height:1150px !important" name="plugin" id="plugin"
                    :src="mlList[indexPdf]" type="application/pdf" internalinstanceid="29">
                </object>
            </div>
            <div style="position:absolute;bottom:150px;right: 20px;width:100px;">
            <el-button @click="updatePDF1">上一张</el-button><br><br>
            <el-button @click="updatePDF2">下一张</el-button>
            </div>
        </div>
        </div>
    </el-dialog>

            <!--@saveData="saveData" -->
    <casePageFloatBtns
        :pageDomId="'archiveCoverForm'"
        :formOrDocData="formOrDocData"
        @submitData="submitData"
        @saveData="submitData(0)"
        v-show="showCover"
      ></casePageFloatBtns>
     <div style="position:fixed;bottom:150px;right: 60px;width:100px;"  v-show="!showCover">
      <el-button @click="showNext('last')" :disabled="!nowShowPdfIndex ? true : false">上一张</el-button><br><br>
      <el-button @click="showNext('next')" :disabled="nowShowPdfIndex == caseList.length-1 ? true : false">下一张</el-button>
    </div>
    <!-- <button style="z-index:2005;position:fixed;bottom:50px"   @mouseenter.stop.prevent="a($event,'hover')">
      <span @click="a($event,'click')">卷宗<br>目录</span></button> -->

  </div>
</template>
<script>
import caseSlideMenu from "@/page/caseHandle/components/caseSlideMenu";
import archiveCatalogue from "./archiveCatalogue";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import {BASIC_DATA_SYS} from '@/common/js/BASIC_DATA.js';
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      pdfVisible: false,
      closeDialog: false,
      formData: {
        caseNumber: "",
        caseName: "",
        acceptTime: "",
        lyTime: "",
        closeDate: "",
        party: "",
        period:"",
        organName:"",
        nickName:"",
      },
    caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: '', //案件ID
        caseLinktypeId: BASIC_DATA_SYS.archiveId, //表单类型ID
        //表单数据
        formData: "",
        status: ""
      },
      formOrDocData: {
        showBtn: [
          false,
          false,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true
        ], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回,归档
      },
      rules: {},
      mlList: [],
      indexPdf: 0,
      host:'',
      urlList: [],
      caseList: [],
      showCover:true, //显示pdf还是封面form
      docSrc:'', //文书的pdf地址
      rules: {
        caseName: [
          { required: true, message: "案由不能为空", trigger: "blur" }
        ],
        acceptTime: [
          { required: true, message: "立案时间不能为空", trigger: "blur" }
        ],
        lyTime: [
          { required: true, message: "立卷时间不能为空", trigger: "blur" }
        ],
        closeDate: [
          { required: true, message: "结案时间不能为空", trigger: "blur" }
        ],
        party: [
          { required: true, message: "当事人不能为空", trigger: "blur" }
        ],
        period: [
          { required: true, message: "保管期限不能为空", trigger: "blur" }
        ],
        nickName: [
          { required: true, message: "立卷人不能为空", trigger: "blur" }
        ],
        organName: [
          { required: true, message: "执法机关不能为空", trigger: "blur" }
        ]
      },
      nowShowPdfIndex:0, //归档后当前显示的pdf的index
      disAbledLastBtn:false, //上一页按钮禁用
      disAbledNextBtn:false, //下一页按钮禁用

    };
  },
  components: {
    caseSlideMenu,
    archiveCatalogue,
    casePageFloatBtns
  },
  computed: { ...mapGetters(['caseId']) },
  mixins: [mixinGetCaseApiList],
  methods: {
    updatePDF1 () {
        if (this.indexPdf < this.mlList.length -1) {
            this.indexPdf++
        } else {
            this.$message({
                type: "success",
                message: "没有数据！"
            });
        }
    },
    alertPDF(item) {
        console.log('item',item);
        this.docSrc = this.host + item.storageId;
        this.showCover = false;
    },
    showCoverEvent(){
        this.showCover = true;
    },
    updatePDF2 () {
        if (this.indexPdf > 0) {
            this.indexPdf--
        } else {
            this.$message({
                type: "success",
                message: "没有数据！"
            });
        }
    },
    submitArchive(handleType) {
        let _this = this
        this.$refs['archiveCoverForm'].validate((valid,noPass) => {
          if (valid) {
            this.$confirm('此操作将完成归档、生成电子卷宗，是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                // _this.com_submitCaseForm(handleType, "archiveCoverForm", true);
                // _this.$router.push({ name: 'firstPdfPage' ,params: {
                //     caseId: _this.caseId,
                //     docId: _this.docId
                // }});
                // this.submitArchiveSure(handleType);
                this.getByMlCaseId(this.caseId);
                // this.showCover = false;
                //  this.docSrc = this.host + this.caseList[0].storageId;
                //  this.nowShowPdfIndex = 0;
                // this.getMl()
            }).catch(() => {

            });
          }else{
            let a = Object.values(noPass)[0];
            console.log(a);
            this.$message({
              showClose: true,
              message: a[0].message,
              type: 'error',
              offset:100,
              customClass:'validateErrorTip'
            });
            return false;
          }
        })



        
    },
    submitArchiveSure(handleType){
       console.log(this.formData);
      this.caseLinkDataForm.formData = JSON.stringify(this.formData);
      // this.caseLinkDataForm.caseBasicinfoId = caseId;
      //0暂存 1提交
      this.caseLinkDataForm.status = handleType;
       this.$store.dispatch("addFormData", this.caseLinkDataForm).then(
              res => {
                console.log("保存表单", res);
                this.$message({
                  type: "success",
                  message: "保存成功"
                });
                _this.$router.push({ name: 'firstPdfPage' ,params: {
                    caseId: _this.caseId,
                    docId: _this.docId
                }});
              },err=>{
                console.log(err)
              })
    },
    getMl() {
        this.pdfVisible = true
        this.getByMlCaseId(this.caseId)
    },
    //点击归档后调用
    getByMlCaseId(caseId) {
        let _that = this
         this.$store.dispatch("getByMlCaseIdNew", caseId).then(
         res=>{
           console.log('getByMlCaseId',res)
            res.data = res.data.sort(function(a,b){
              return a.num - b.num;
            });
             this.caseList = res.data;
              this.showCover = false;
              this.docSrc = this.host + this.caseList[0].storageId;
              this.nowShowPdfIndex = 0;
         },
         err=>{
           console.log(err)
         }
       )
    },
    showArchivePDF () {

    },
    //保存文书信息
    submitData(handleType) {
        if(handleType == 2) {
            this.submitArchive(handleType)
        } else {
            this.com_submitCaseForm(handleType, "archiveCoverForm", true);
        }
    },
    //鼠标hover卷宗目录后 显示卷宗目录
    showArchiveCatalogue(){
      this.$refs.archiveCatalogueRef.showModal();
    },
    //关闭卷宗目录
    hideArchiveCatalogue(){
      this.$refs.archiveCatalogueRef.closeDialog();
    },
    //加载表单信息
    setFormData() {
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(
        this.caseLinkDataForm.caseBasicinfoId,
        this.caseLinkDataForm.caseLinktypeId,
        false
      );
    },
    //上下翻页显示pdf
    showNext(flag){
      if(flag == 'last'){
        if(this.nowShowPdfIndex){
          this.nowShowPdfIndex--;
          this.docSrc = this.host + this.caseList[this.nowShowPdfIndex].storageId;
        }
      }else{
        if(this.nowShowPdfIndex != this.caseList.length-1){
          this.nowShowPdfIndex++;
          this.docSrc = this.host + this.caseList[this.nowShowPdfIndex].storageId;
        }
      }
    }
  },
  mounted() {
    console.log()
    this.$refs.archiveCatalogueRef.showModal();
    this.host = JSON.parse(sessionStorage.getItem("CURRENT_BASE_URL")).PDF_HOST
    // this.getByMlCaseId(this.caseId)
    this.caseLinkDataForm.caseBasicinfoId = this.caseId
  
    //在目录排序页面点击弹窗数据后返回的
    if(this.$route.params && this.$route.params.clickIsDoc){
      console.log('this.$route.params',this.$route.params)
      let data = JSON.parse(this.$route.params.clickIsDoc);
      if(data.name == 'cover'){
        this.showCover = true;
      }else{
        this.docSrc = this.host + data.storageId;
        this.showCover = false;
      }
      
    }else{
      this.setFormData();
    }
    
    

  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/documentForm.scss";
</style>
