<template>
  <div class="box">
    <el-form ref="archiveCoverForm" :rules="rules" :model="formData" label-width="105px" v-show="showCover=='cover'">
      <div class="content_box">
        <div class="content">
          <div class="content_title">全国道路运输执法案件</div>
          <div class="border_blue"></div>
          <div class="content_form">
            <el-form-item label="logo">
              <div class="logoBox">
                  <img src="../../../../static/images/img/main/logo.png" alt="">
              </div> 
            </el-form-item>
          </div>
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
                  <el-input v-model="formData.organName" class="w-120" size="small" disabled></el-input>
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
                    disabled
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
                    disabled
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
    <div v-show="showCover=='pdf'" style="margin:0 auto;width:690px">
        <object >
            <embed class="print_info" style="padding:0px;width: 690px;margin:0 auto;height:1150px !important" name="plugin" id="plugin"
            :src="docSrc" type="application/pdf" internalinstanceid="29">
        </object>
  
    </div>

    <el-form ref="beikaoForm" :rules="beikaoRules" :model="docData" label-width="105px" v-show="showCover == 'beikao'">
      <div class="content_box">
        <div class="content">
          <div class="content_title">备考表</div>
          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item label="卷内文件情况说明">
                  <el-input
                    type="textarea"
                    :rows="2"
                    class="w-120"
                    v-model="docData.beikaoDes"
                    size="small"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
          
          <div class="row">
              <div class="col">
                <el-form-item label="整理人" prop="collator">
                  <el-input class="w-120" v-model="docData.collator" size="small"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="检查人" prop="checkMan">
                  <el-input class="w-120" v-model="docData.checkMan" size="small"></el-input>
                </el-form-item>
              </div>
          </div>
          <div class="row">
              <div class="col">
                <el-form-item label="时间">
                  <el-date-picker
                    class="w-120"
                    v-model="docData.beikaoTime"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm"
                  ></el-date-picker>
                </el-form-item>
              </div>
          </div>
          </div>
        </div>
      </div>
    </el-form>
    <!-- 卷内目录 -->
    <div v-show="showCover == 'mulv'" class="mulvCon">
      <table border="1" bordercolor="black" width="100%" cellspacing="0" class="mulvtable">
            <tr>
                <td>序号</td>
                <td>材料名称</td>
                <td>页码</td>
            </tr>
            <tr v-for="(item,index) in mulvList" :key="index">
                <td>{{index+1}}</td>
                <td>{{item.name ? item.name :item.evName}}</td>
                <td>{{item.page}}</td>
            </tr>
        </table>
    </div>
    <!--快速入口 -->
    <caseSlideMenu ref="caseSlideMenuRef" :activeIndex="'archiveCatalogue'" @showArchiveCatalogue="showArchiveCatalogue"></caseSlideMenu>
    <!-- 卷宗目录 -->
    <!-- <archiveCatalogue ref="archiveCatalogueRef"  @alertPDF="alertPDF" @showCoverEmit="showCoverEvent"></archiveCatalogue> -->

    <casePageFloatBtns
        :pageDomId="'archiveCoverForm'"
        :formOrDocData="formOrDocData"
        @submitData="submitData"
        @saveData="submitData(0)"
        v-show="showCover=='cover'"
      ></casePageFloatBtns>
     <div style="position:fixed;bottom:150px;right: 60px;width:100px;"  v-show="archiveSuccess">
      <el-button @click="showNext('last')" :disabled="!nowShowPdfIndex ? true : false">上一张</el-button><br><br>
      <el-button @click="showNext('next')" :disabled="nowShowPdfIndex == caseList.length-1 ? true : false">下一张</el-button>
    </div>
    <div style="position:fixed;bottom:150px;right: 60px;width:100px;"  v-show="showCover=='beikao'">
      <el-button type="primary"  @click="submitBeikao()">保存</el-button><br><br>

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
import iLocalStroage from "@/common/js/localStroage";
export default {
  data() {
    return {
      pdfVisible: false,
      closeDialog: false,
      formData: {
        caseNumber: "",
        caseName: "",
        acceptTime: "",
        lyTime: new Date().format('yyyy-MM-dd HH:mm'),
        closeDate: "",
        party: "",
        period:"",
        organName:iLocalStroage.gets("userInfo").organName,
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
      showCover:'cover', //显示pdf还是封面form
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
      archiveSuccess:false, //归档成功
      docData:{
        beikaoDes:'',
        collator:'',
        checkMan:'',
        beikaoTime:''
      }, //备考表数据
      beikaoRules:{},
      caseDocDataForm: {   //备考表数据
        id: "", //修改的时候用
        caseBasicinfoId: '', //案件id--从流程进入删掉，先写死测试用
        caseDoctypeId: '2c9029ca5b711f61015b81392c9e2420',    //文书类型ID
        //表单数据
        docData: "",
        status: ""
      },
      mulvList:[],
    };
  },
  inject: ['reload'],
  components: {
    caseSlideMenu,
    archiveCatalogue,
    casePageFloatBtns
  },
  computed: { ...mapGetters(['caseId','clickArchiveCatalogue','archiveCatalogueList']) },
  mixins: [mixinGetCaseApiList],
  methods: {
    alertPDF(data) {
      console.log('item',data.item);
      console.log('mulvList',data.mulvList);

      if(data.item.name == "卷宗封面"){
        if(data.item.storageId){
          this.docSrc = this.host + data.item.storageId;
          this.showCover = 'pdf';
        }else{
          this.showCover = 'cover';
          this.setFormData();
        }
        return;
      }
      if(data.item.name == "卷内目录"){
        if(data.item.storageId){
          this.docSrc = this.host + data.item.storageId;
          this.showCover = 'pdf';
        }else{
          this.showCover = 'mulv';
          this.mulvList = data.mulvList;
        }
        return;
      }
      if(data.item.name=='备考表'){
        if(data.item.storageId){
          this.docSrc = this.host + data.item.storageId;
          this.showCover = 'pdf';
        }else{
          this.showCover = 'beikao'
        }
        return;
      }
      this.docSrc = this.host + data.item.storageId;
      this.showCover = 'pdf';
       
    },
    showCoverEvent(){
        this.showCover = 'cover';
    },
    submitArchive(handleType) {
        let _this = this
        this.$refs['archiveCoverForm'].validate((valid,noPass) => {
          if (valid) {
            this.canArchive(handleType);
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
      console.log('this.caseLinkDataForm',this.caseLinkDataForm)
       this.$store.dispatch("addFormData", this.caseLinkDataForm).then(
              res => {
                console.log("保存表单", res);
                this.$message({
                  type: "success",
                  message: "保存成功"
                });
                this.getByMlCaseId(this.caseId);
              
              },err=>{
                console.log(err)
              })
    },
    //判断是否可以归档
    canArchive(handleType){
      this.$store.dispatch("getByMlCaseIdNew", this.caseId).then(
         res=>{
           let canArchiveFlag = false;
           res.data.forEach(item=>{
             if(item.name=='备考表' && !item.storageId){
               canArchiveFlag = true;
               return
             }
           })
           if(canArchiveFlag){
             this.$confirm('此操作将完成归档、生成电子卷宗，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                  this.submitArchiveSure(handleType);
              }).catch(() => {

              });
           }else{
              this.$message({type: 'warning',message:'备考表未完成!'})
              // this.$refs.archiveCatalogueRef.showModal(true);
              this.$refs.caseSlideMenuRef.mouseenterShowEmit('archiveCatalogue')
           }
         })
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
           console.log('getByMlCaseId2',res.data)
          

             this.caseList = res.data;
              console.log('this.caseList[0].storageId',this.caseList[0].storageId)
              this.docSrc = this.host + this.caseList[0].storageId;
              this.nowShowPdfIndex = 0;
              this.archiveSuccess = true;
               this.showCover = 'pdf';
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
        // if(handleType == 2) {
        //     this.submitArchive(handleType)
        // } else {
        //     this.com_submitCaseForm(handleType, "archiveCoverForm", true);
        // }
        if(handleType == 1){
         this.submitArchive(handleType)
        }else{
          this.caseLinkDataForm.formData = JSON.stringify(this.formData);
          this.caseLinkDataForm.status = handleType;
          this.$store.dispatch("addFormData", this.caseLinkDataForm).then(
          res => {
            console.log("暂存表单", res);
            this.$message({
              type: "success",
              message: "暂存成功"
            });
            this.setFormData();
          },
          err => {
            console.log(err);
          })
          // this.com_submitCaseForm(handleType, "archiveCoverForm", true);
        }
    },
    //鼠标hover卷宗目录后 显示卷宗目录
    showArchiveCatalogue(){
      // this.$refs.archiveCatalogueRef.showModal(false);
    },
    //关闭卷宗目录
    hideArchiveCatalogue(){
      // this.$refs.archiveCatalogueRef.closeDialog();
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
    },
    //提交备考表
    submitBeikao(){
      this.caseDocDataForm.docData = JSON.stringify(this.docData);
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      this.caseDocDataForm.status = 1;
      console.log('caseDocDataForm', this.caseDocDataForm);
       this.$store.dispatch("addDocData", this.caseDocDataForm).then(
              res => {
                console.log("保存备考表", res);
                this.$message({
                  type: "success",
                  message: "提交成功"
                });
                this.showCover = 'cover';
                this.reload();
              },
              err=>{
                console.log(err);
              }
        )
    }
  },
  mounted() {
    // this.$refs.archiveCatalogueRef.showModal(true);
    this.host = iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST
    // this.getByMlCaseId(this.caseId)
    this.caseLinkDataForm.caseBasicinfoId = this.caseId;
    this.setFormData();
    this.$refs.caseSlideMenuRef.mouseenterShowEmit('archiveCatalogue')
    //在目录排序页面点击弹窗数据后返回的
    // if(this.$route.params && this.$route.params.clickData){
    //   console.log('this.$route.params',this.$route.params)
    //   let data ={
    //     item:JSON.parse(this.$route.params.clickData),
    //     mulvList:this.$route.params.mulvList
    //   } 
    //   this.alertPDF(data);
      
    // }else{
    //   this.setFormData();
    // }
  },
  watch:{
    'clickArchiveCatalogue':{
      handler(newVal,oldVal){
           console.log("newVal","oldVal")
            console.log(newVal,oldVal)
            if(newVal){
              let data = {
                item:this.clickArchiveCatalogue,
                mulvList:this.archiveCatalogueList
              }
              this.alertPDF(data);
            }
      },
      deep:true,
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/documentForm.scss";
.mulvCon{
  width:400px;margin: 20px auto;
  .mulvtable{
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
.logoBox{
  width:90px;
  border: 1px solid #ddd;
  padding: 8px 0;
  margin-top: 30px;
  justify-content: center;
  display: flex;
  img{
    width:85%
  }
}

</style>
