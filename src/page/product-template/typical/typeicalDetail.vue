<template>
    <div class="box">
        <div style="margin:0 auto;width:690px">
            <object >
                <embed class="print_info" style="padding:0px;width: 690px;margin:0 auto;height:1150px !important" name="plugin" id="plugin"
                :src="docSrc" type="application/pdf" internalinstanceid="29">
            </object>
        </div>
        <div style="position:fixed;bottom:150px;right: 60px;width:100px;">
            <el-button @click="showNext('last')" :disabled="!nowShowPdfIndex ? true : false">上一张</el-button><br/><br>
            <el-button @click="showNext('next')" :disabled="nowShowPdfIndex == caseList.length-1 ? true : false">下一张</el-button><br/><br>
            <el-button @click="showModel">{{dialogTitle}}</el-button>
        </div>
        <el-container v-bind:id="id" v-if="dialogVisible">
          <el-header>
            <div @mousedown="mousedown">
            <h2>{{dialogTitle}}</h2>
              <div style="position: absolute;top: 0px; right: 20px;">
              <span>
                <svg class="icon" aria-hidden="false">
                  <use xlink:href='#el-icon-ext-close'></use>
                </svg>
              </span>
              </div>
            </div>
          </el-header>
          <el-main>
            <slot>
              <el-form :model="updateCaseTypeForm" :rules="rules" ref="updateCaseTypeForm" label-width="120px">
                <div class="item">
                  <el-form-item label="案件编号">
                    <el-input disabled v-model="updateCaseTypeForm.caseNumber"></el-input>
                  </el-form-item>
                  <el-form-item label="业务领域">
                    <el-input disabled v-model="updateCaseTypeForm.zfml"></el-input>
                  </el-form-item>
                  <el-form-item label="案件类型">
                    <el-input disabled v-model="updateCaseTypeForm.caseType"></el-input>
                  </el-form-item>
                  <el-form-item label="受案机构">
                    <el-input disabled v-model="updateCaseTypeForm.organName"></el-input>
                  </el-form-item>
                  <el-form-item label="案由">
                    <el-input disabled v-model="updateCaseTypeForm.caseName"></el-input>
                  </el-form-item>
                  <el-form-item label="案件点评" prop="reviews">
                    <el-input v-model="updateCaseTypeForm.reviews" class="text-area" type="textarea" maxlength="100" clearable rows="4"/>
                  </el-form-item>
                </div>
              </el-form>
            </slot>
          </el-main>
          <el-footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addOrUpdateCaseType('updateCaseTypeForm')">保 存</el-button>
            </span>
          </el-footer>
        </el-container>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import iLocalStroage from "@/common/js/localStroage";
import { saveOrUpdateTypicalCase } from "@/api/caseHandle";
export default {
  data() {
    return {
        caseList:[],
        docSrc:"",
        // host:iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST,
        nowShowPdfIndex:0,
        dialogTitle:"修改案件点评",
        selectElement: '',
        id:'typeName',
        updateCaseTypeForm: {
          caseNumber: "",
          reviews:"",
          caseType: "",
          organName:"",
          caseName:"",
          zfml:"",
          caseId:""
        },
        rules: {
          reviews: [{ required: true, message: "请输入案件点评", trigger: "blur" }],
        },
        dialogVisible:false,
        reviewsType:false,
    }
  },
  computed: { ...mapGetters(['caseId']) },
  created(){
      this.getByMlCaseId();
      if(!this.caseId.reviews){
        this.dialogTitle = "新增案件点评";
      }
  },
  methods:{
      getByMlCaseId() {
        let _that = this
         this.$store.dispatch("getByMlCaseIdNew", this.caseId.caseId).then(
         res=>{
            res.data = res.data.sort(function(a,b){
              return a.num - b.num;
            });
            this.caseList = res.data;
            // this.docSrc = this.host + this.caseList[0].storageId;
            this.$util.com_getFileStream(this.caseList[0].storageId).then(res => {
                this.docSrc = res;
              });
            this.nowShowPdfIndex = 0;
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
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.caseList=[];
      this.docSrc='';
      this.nowShowPdfIndex=0;
      this.dialogVisible = false;
    },
    closeDialog1(){
      this.dialogVisible = false;
    },
    showModel(){
      let data=this.caseId;
      this.updateCaseTypeForm.caseNumber = data.caseNumber;
      this.updateCaseTypeForm.reviews = data.reviews;
      this.updateCaseTypeForm.caseType = data.caseType;
      this.updateCaseTypeForm.organName = data.organName;
      this.updateCaseTypeForm.caseName = data.caseName;
      this.updateCaseTypeForm.zfml = data.zfml;
      this.updateCaseTypeForm.caseId = data.caseId;
      if(this.updateCaseTypeForm.reviews!=""){
        this.dialogTitle = "修改案件点评";
      }else{
        this.dialogTitle = "新增案件点评";
        this.reviewsType=true;
      }
      this.dialogVisible=true;
    },
    //修改案件
    addOrUpdateCaseType(formName) {
      let _this = this;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          saveOrUpdateTypicalCase(_this.updateCaseTypeForm).then(
            res=>{
              if(res.code==200){
                if(_this.reviewsType){
                  _this.$message({
                    type: "success",
                    message: "新增成功"
                  });
                }else{
                  _this.$message({
                    type: "success",
                    message: "修改成功"
                  });
                }
                _this.caseId.reviews=_this.updateCaseTypeForm.reviews
                _this.dialogTitle = "修改案件点评";
                _this.reviewsType=true;
                _this.dialogVisible=false;
              }else{
                _this.$message.error(res.msg);
              }
            }
          )
        }
      })
    },
    mousedown(event) {
      this.selectElement = document.getElementById(this.id)
      var div1 = this.selectElement
      this.selectElement.style.cursor = 'move'
      this.isDowm = true
      var distanceX = event.clientX - this.selectElement.offsetLeft
      var distanceY = event.clientY - this.selectElement.offsetTop
      document.onmousemove = function (ev) {
        var oevent = ev || event
        div1.style.left = oevent.clientX - distanceX + 'px'
        div1.style.top = oevent.clientY - distanceY + 'px'
      }
      document.onmouseup = function () {
        document.onmousemove = null
        document.onmouseup = null
        div1.style.cursor = 'default'
      }
    }
  },
}
</script>
<style scoped>
    .el-container {
      position: absolute;
      height: 470px;
      width: 560px;
      border: 1px;
      top: 10%;
      left: 30%;
      border-radius: 2px;
      background: #ffffff;
      border: 1px solid #e9edf6;
    }
    .fullscreen .el-form-item{
      margin-bottom: 5px;
    }
    .dialog-footer {
      text-align: right;
    }
    .el-main {
      background-color: white;
      padding-right: 20px;
    }
    .el-footer {
      background-color: #e9edf6;
      text-align: center;
      line-height: 60px;
    }
   .el-header {
     background-color: #e9edf6;
     color: #333;
     line-height: 60px;
   }
 
   .el-aside {
     color: #333;
   }
 </style>