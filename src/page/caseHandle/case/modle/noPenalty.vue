<template>
  <div class="box" id="noPenaltyBox">
    <el-form ref="caseLinkDataForm">
      <el-input ref="id" type="hidden"></el-input>
    </el-form>
    <el-form ref="docForm" :disabled="formData.reason && originalData.reason ? true : false" :model="formData" label-width="105px" :rules="rules">
      <div class="content_box">
        <div class="content">
          <div class="content_title">
            不予处罚 
          </div>
          <div class="border_blue"></div>
          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item label="原因" prop="reason" class="reasonCon" :rules="fieldRules('reason',propertyFeatures['reason'])">
                  <el-radio-group v-model="formData.reason" @change="changeReason" :disabled="getControls()">
                    <p><el-radio :label="1">违法行为轻微</el-radio></p>
                    <p><el-radio :label="2">违法事实不能成立</el-radio></p>
                    <p>
                      <el-radio :label="3">其他原因
                        <el-form-item prop="otherReason" class="otherReasonCon">
                          <el-input  v-model="formData.otherReason" :disabled="disabledOne" :maxLength='maxLength' placeholder="/"></el-input>
                        </el-form-item>
                      </el-radio>
                    </p>
                  </el-radio-group>
                 
                </el-form-item>
              </div>
            </div>
            <el-row :gutter="20">
              <!-- <el-col :span="16"> -->
                <el-form-item label="附件">
                  <el-upload
                      action="https://jsonplaceholder.typicode.com/posts/" 
                      :http-request="uploadFile"
                      :show-file-list="false"
                      :on-change='fileChange'
                      :before-upload="uploadFileValidat"
                      v-if="!getControls()"
                      >
                      <el-button size="small" type="primary">选取文件</el-button> <span class="upLoadNumSpan">最多上传3个附件</span>

                  </el-upload>
                  <ul class="el-upload-list el-upload-list--text">
                    <li v-for="item in fileListArr" :key="item.id" class="el-upload-list__item is-ready" @click.stop="evidenceDetail(item)">
                      <i class="el-icon-document"></i>
                      <span>{{item.fileName}}</span><span @click.stop="deleteFile(item)" v-if="!getControls()">
                        <i class="el-icon-close" style="float:right"></i>
                        </span>
                      </li>
                      <el-progress v-if="percentageFlag" :percentage="percentage" class="progress"></el-progress>
                  </ul>
                </el-form-item>
            </el-row>
               
            <div class="row">
              <div class="col">
                <el-form-item prop="notes" label="备注" :rules="fieldRules('notes',propertyFeatures['notes'])">
                  <el-input type="textarea" ref="notes" clearable :rows="4" v-model="formData.notes" size="small" placeholder="请输入"
                  :disabled="fieldDisabled(propertyFeatures['notes']) || getControls()"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <!-- <div class="border_blue"></div> -->
        </div>
      </div>
    </el-form>
    <div class="content_box">
        <!-- 悬浮按钮 -->
        <div class="float-btns "> 
          <el-button :type="formData.reason && originalData.reason ? 'primary' : 'info'" :disabled="!canGoNextLink" @click="continueHandle" v-if="!this.$route.params.isComplete && !IsLawEnforcementSupervision">
           <svg t="1577515608465" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2285" width="24" height="24">
              <path d="M79.398558 436.464938c-25.231035 12.766337-56.032441 2.671394-68.800584-22.557835-12.775368-25.222004-2.682231-56.025216 22.548804-68.798778 244.424411-123.749296 539.711873-85.083624 744.047314 97.423694 33.059177-37.018403 66.118353-74.034999 99.179336-111.042564 26.072732-29.199292 74.302319-15.865804 81.689744 22.574091 20.740782 107.953934 41.486982 215.915094 62.229569 323.867222 5.884653 30.620785-18.981527 58.454577-50.071928 56.06134-109.610235-8.480185-219.211438-16.95134-328.812642-25.422494-39.021496-3.010963-57.692354-49.437946-31.610591-78.633625 33.060983-37.007565 66.116547-74.025968 99.175724-111.03534-172.88741-154.431492-422.746726-187.152906-629.574746-82.435711z" fill="#FFFFFF" p-id="2286"></path>
            </svg><br>
            下一<br>环节</el-button>
          <el-button :type="formData.reason && originalData.reason ? 'info' : 'primary'" :disabled="canGoNextLink" @click="submitCaseDoc(1)" v-if="!this.$route.params.isComplete && !IsLawEnforcementSupervision">
            <i class="iconfont law-save"></i><br>
            保存
          </el-button>
          <el-button type="primary" @click="backBtn" v-if="this.$route.params.isComplete || IsLawEnforcementSupervision">
            <i class="iconfont law-back"></i>
            <br />返回
          </el-button>
        </div>
      </div>
      <payDetail ref="payDetailRef"></payDetail>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import checkDocFinish from '../../components/checkDocFinish'
import partyRightsEvidence from '@/page/caseHandle/components/partyRightsEvidence'
import editEvidenceName from '@/page/caseHandle/components/editEvidenceName'
import payDetail from "@/page/caseHandle/case/form/payDetail";
import { findByCondition,deleteDocByIdApi,deleteFileByCaseAndHuanjieApi,queryFlowBycaseIdApi,} from "@/api/caseHandle";
import {
  uploadEvApi,
  findFileByIdApi,
  getFile,
  deleteFileByIdApi,
  uploadEvdence
} from "@/api/upload";
export default {
  components: {
    payDetail
  },
  data() {
    return {
      formData: {
        reason:"",
        otherReason:"",
        notes:"",
      },  
      originalData:"",
      fileListArr:[],
      isSave: false,
      disabledOne: true,   
      //提交方式
      handleType: 0, //0  暂存     1 提交
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: '', //案件id
        caseLinktypeId: '', //不予处罚的表单ID
        //表单数据
        formData: "",
        status: ""
      },
      lineStyleFlag:false,
      maxLength:23,
      rules: {
        reason: [
          { required: true, message: '原因必须填写', trigger: 'change' }
        ],
        notes: [
          { required: true, message: '备注必须填写', trigger: 'change' }
        ],
      },
      propertyFeatures:'',
      percentage:'',
      percentageFlag:''
    }
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId','IsLawEnforcementSupervision']) },
  inject: ['reload'],
  methods: {
      getControls(){
          return (this.$route.params.isComplete ||  this.IsLawEnforcementSupervision);
      },
    fileChange(file){
      console.log('状态状态状态状态状态状态',file.status)
      this.percentage=0
      this.percentageFlag=true
    },
    //加载表单信息
    setFormData() {
      this.isSave= false;
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(this.caseLinkDataForm.caseBasicinfoId, this.caseLinkDataForm.caseLinktypeId, false);
    },
    submitCaseDoc(handleType) {
      //参数  提交类型 、formRef、有无下一环节按
      this.com_submitCaseForm(handleType, 'docForm', false);
      this.isSave = true;
      console.log("状态",this.isSave)
    },
    //下一环节
    continueHandle() {
      let caseData={
        caseBasicinfoId:this.caseLinkDataForm.caseBasicinfoId,
        caseLinktypeId:this.caseLinkDataForm.caseLinktypeId,
      }

      let canGotoNext = true; //是否进入下一环节
      // for(let i=0;i<this.docTableDatas.length;i++){
      //   if(this.docTableDatas[i].isRequired===0 && (this.docTableDatas[i].status != 1 || this.docTableDatas[i].status != "1")){
      //     canGotoNext = false
      //     break;
      //   }
      // }
      if(canGotoNext){
        this.com_goToNextLinkTu(this.caseId,this.caseLinkDataForm.caseLinktypeId);
      }else{
        this.$refs.checkDocFinishRef.showModal(this.docTableDatas,caseData);
      }
    },
    uploadFileValidat(file){
       let isLt2M = file.size / 1024 / 1024 < 10    //这里做文件大小限制
      if(this.fileListArr.length >=3){
        this.$message.warning('最多选择3个文件！');
        this.percentageFlag=false
        return false;
      }
      if(!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 10MB!',
          type: 'warning'
        });
        this.percentageFlag=false
        return false;
      }
      for(let i=0; i<this.fileListArr.length; i++){
        if(file.name == this.fileListArr[i].fileName){
          this.$message.warning('不能上传同一个文件');
          this.percentageFlag=false
          return false;
        }
      }
      return true;
    },
    //上传附件
    uploadFile(param) {
      var fd = new FormData()
      fd.append("file", param.file);
      fd.append('caseId', this.caseId)
      fd.append('objectId', this.caseLinkDataForm.caseLinktypeId);
      fd.append("evName", param.file.name);
      fd.append("evType", param.file.type);
      uploadEvdence(fd).then(
        res => {
          console.log(res);
          this.findFileList();
          if(res.msg=='操作成功'){
          this.percentage=100
          setTimeout(() => {
            this.percentageFlag=false
          }, 2000);
          }
        },
        error => {
          console.log(error)
            this.percentageFlag=false
        }
      );
    },
    //通过文件ID查询文件
    // findFileById(id, isAdd) {
    //   findFileByIdApi(id).then(
    //     res => {
    //       console.log(res);
    //       this.alreadyLoadPayEvidence.push(res.data);
    //       if (isAdd) {
    //         if (this.formData.payEvidence) {
    //           let payEvidenceArr = this.formData.payEvidence.split(',');
    //           payEvidenceArr.push(id);
    //           this.formData.payEvidence = payEvidenceArr.join(',');
    //         } else {
    //           this.formData.payEvidence = id;
    //         }
    //       }

    //       console.log('this.formData.payEvidence', this.formData.payEvidence);

    //     },
    //     error => {
    //       console.log(error)
    //     }
    //   );
    // },
    //通过案件ID和文书ID查询附件
    findFileList(){
      let data =  {
        caseId: this.caseId,
        docId : this.caseLinkDataForm.caseLinktypeId
      }
      console.log(data);
      getFile(data).then(
        res => {
          console.log("附件列表",res);
          this.fileListArr = res.data;

        },
        error => {
          console.log(error);
        }
      )
    },
    //返回到流程图
    backBtn(){
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.go(-1);
    },
    //更改原因
    changeReason(val){
      console.log(val);
      if(val == 3){
        this.disabledOne = false;
      }else{
        this.disabledOne = true;
        this.formData.otherReason = '';
      }
    },
    //删除附件
    deleteFile(data){
      console.log('删除',data);
      deleteFileByIdApi(data.storageId).then(res=>{
        console.log(res);
        this.findFileList();
      },err=>{
         console.log(err)
      })
    },
    //删除全部附件
    deleteAllFile(){
      console.log('删除全部');
      let data = {
        caseId:this.caseId,
        docId:this.caseLinkDataForm.caseLinktypeId
      }
      deleteFileByCaseAndHuanjieApi(data).then(res=>{
        console.log('删除全部',res);
      },err=>{
         console.log(err)
      })
    },
    //显示已上传的缴纳凭证
    evidenceDetail(file){
      console.log("123",file);
      this.$refs.payDetailRef.showModal(file);
    },
    async initData(){
      //查询是哪个流程
      let currentFlow = await queryFlowBycaseIdApi(this.caseId);
      console.log('currentFlow',currentFlow);
      if(currentFlow.data.flowUrl == 'commonGraphData_JX'){
        this.caseLinkDataForm.caseLinktypeId = this.BASIC_DATA_JX.noPenalty_JX_caseLinktypeId
      }else{
        this.caseLinkDataForm.caseLinktypeId = this.BASIC_DATA_SYS.noPenalty_caseLinktypeId
      }
      //获取表单数据
      this.setFormData();
      this.findFileList();
    }
  },
  
  mounted() {
  },
  created() {
    this.initData();
  },
  beforeRouteLeave(to, from, next) {
    // if(!this.isSave){
    if(this.caseLinkDataForm.status == ''){
      this.deleteAllFile();
    }
    next(vm => {
        console.log(vm)
      })
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/documentForm.scss";
#noPenaltyBox{
  .reasonCon{
    p{
      margin: 14px 0;
    }
    .otherReasonCon{
      display: inline-block;
      width: 550px;
    }
  }
  .upLoadNumSpan{
    color: #A5A5A5;
    font-size: 12px;
    vertical-align: sub;
  }
  .fileLiCon{
    &>span:nth-child(1){
      min-width: 150px;
      overflow-x: auto;
      margin-right: 10px;
      display: inline-block;
      height: 20px;
      line-height: 20px;
    }
    &>span:nth-child(2){
      cursor: pointer;
    }
  }


}

</style>
<style lang="scss">
  .progress{
.el-progress-bar__outer{
  height: 2px !important;
}
  }
</style>
