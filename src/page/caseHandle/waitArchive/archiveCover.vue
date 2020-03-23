<template>
  <div class="box">
    <el-form ref="archiveCoverForm" :model="formData" label-width="105px" v-show="showCover">
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
                <el-form-item label="当事人">
                  <el-input class="w-120" v-model="formData.party" size="small" :disabled="true"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="立卷人">
                  <el-input class="w-120" v-model="formData.nickName" size="small"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="执法机关">
                  <el-input v-model="formData.organName" class="w-120" size="small"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="border_blue"></div>
          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item label="立案时间">
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
                <el-form-item label="结案时间">
                  <el-date-picker
                    v-model="formData.finishTime"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="立卷时间">
                  <el-date-picker
                    v-model="formData.lyTime"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm"
                  ></el-date-picker>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="保管期限">
                  <el-input v-model="formData.period" class="w-120" size="small"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </el-form>
    <div v-show="!showCover" style="margin:0 auto;width:790px">
        <object >
            <embed class="print_info" style="padding:0px;width: 790px;margin:0 auto;height:1150px !important" name="plugin" id="plugin"
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
      ></casePageFloatBtns>
    
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
        finishTime: "",
        party: "",
        party2: "",
        period:""
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
        this.$confirm('此操作将完成归档、生成电子卷宗，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            _this.com_submitCaseForm(handleType, "archiveCoverForm", true);
            _this.$router.push({ name: 'firstPdfPage' ,params: {
                caseId: _this.caseId,
                docId: _this.docId
            }});
            // this.getMl()
        }).catch(() => {

        });
    },
    getMl() {
        this.pdfVisible = true
        this.getByMlCaseId(this.caseId)
    },
    getByMlCaseId(caseId) {
        let _that = this
         this.$store.dispatch("getByMlCaseIdNew", caseId).then(
         res=>{
           console.log('getByMlCaseId',res)
             res.data.forEach((v)=>{
                _that.mlList.push(_that.host + v.storageId)
             })

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
    }
  },
  mounted() {
    console.log()
    this.$refs.archiveCatalogueRef.showModal();
    this.host = JSON.parse(sessionStorage.getItem("CURRENT_BASE_URL")).PDF_HOST
    this.getByMlCaseId(this.caseId)
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
