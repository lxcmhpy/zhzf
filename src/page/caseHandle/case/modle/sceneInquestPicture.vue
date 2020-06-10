<template>
  <div class="print_box" id="sceneInquestPictureBox">
    <div class="print_info">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">现场勘验示意图</div>
        <div class="doc_number"></div>
        <div class="imgBox" ref="imgBoxRef">
            <img :src="chooseImgSrc" alt="" :width="imgWidth" :height="imgHeight">
        </div>
        <div class="imgBoxBtn"><el-button size="mini" @click="chooseImg">选择照片</el-button><el-button size="mini" @click="deleteImg">删除</el-button></div>
        <!-- 多行样式 -->
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item
              prop="sh"
              :rules="fieldRules('sh',propertyFeatures['sh'])"
            >
              <el-input
                class="overflow_lins_textarea"
                type="textarea"
                v-model="docData.sh"
                rows="10"
                maxlength="300"
                :disabled="fieldDisabled(propertyFeatures['sh'])"
              ></el-input>
              <span class="overflow_describe" style="text-indent:0 !important">示意图简述</span>
              <span class="span_bg span_bg_top">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
            </el-form-item>
          </div>
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            当事人或代理人签名：
            <span class="write_line" style="width:100px"></span>
          </el-col>
          <el-col :span="12">
            勘验（检查）人签名：
            <span class="write_line" style="width:100px"></span>
          </el-col>
        </el-row>
         <el-row :gutter="20">
            <el-col :span="12">
                被邀请人签名：
                 <span class="write_line" style="width:140px"></span>
            </el-col>
            <el-col :span="12">
                 记录人签名：
                 <span class="write_line" style="width:140px"></span>
            </el-col>
         </el-row>
        <p class="p_begin">
          备注：
          <!-- <span> -->
          <el-form-item
            prop="note"
            style="width:540px"
            :rules="fieldRules('note',propertyFeatures['note'])"
          >
            <el-input
              v-model="docData.note"
              :maxLength="23"
              :disabled="fieldDisabled(propertyFeatures['note'])"
            ></el-input>
          </el-form-item>
          <!-- </span> -->
        </p>
      </el-form>
    </div>

    <!-- 悬浮按钮 -->
    <casePageFloatBtns
      :pageDomId="'reportRecordDoc_print'"
      :formOrDocData="formOrDocData"
      @saveData="saveData"
      @backHuanjie="submitData"
    ></casePageFloatBtns>
   
    <chooseOrUploadEvidence ref="chooseOrUploadEvidenceRef" @choosePic="showChoosePic"></chooseOrUploadEvidence>
  </div>
</template>
<script>

import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import iLocalStroage from "@/common/js/localStroage";
import chooseOrUploadEvidence from "@/page/caseHandle/case/form/chooseOrUploadEvidence.vue";
import {
  queryImgBase64Api,
} from "@/api/caseHandle";
export default {
  components: {
    casePageFloatBtns,
    chooseOrUploadEvidence,
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  data() {
    return {
      docData: {
        picImgEvPath:'',
        // picBase64:'',
        picList: "",
        sh: "",
        note: ""
      },
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseDoctypeId: this.$route.params.docId, //文书类型ID
        //表单数据
        docData: "",
        status: "",
        linkTypeId: this.$route.params.caseLinkTypeId
      },
      rules: {
        sh: [
          { required: true, message: "请输入示意图简述", trigger: "blur" }
        ],
        note: [
          { required: true, message: "请输入备注", trigger: "blur" }
        ]
      },
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: "hearingRecordDoc_print"
      },
      propertyFeatures:'',
      chooseImgSrc:'',
      picData:'',
      imgBase64:'',
      needDealData:true,
      scaling:1, //图像缩放比
      imgWidth:0,
      imgHeight:0
    };
  },
  methods: {
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.caseDocDataForm.caseDoctypeId
      };
      this.com_getDocDataByCaseIdAndDocId(data);
    },

    //保存文书信息
    // addDocData(handleType) {

    //   this.com_addDocData(handleType, "docForm");
    // },
    //提交
    submitData(handleType) {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: this.$route.params.url
      });
    },
    //保存文书信息
    saveData(handleType) {
      if(!this.imgBase64 && handleType==1 ){
        this.$message('请选择照片');
        return;
      }
      console.log(this.imgBase64);
      let imgData ={
        'pictures-1':this.imgBase64
      };
      let imgDataArr = [];
      imgDataArr.push(imgData)
      this.docData.picList = JSON.stringify(imgDataArr);
      // this.docData.picImgEvPath = this.picData.evPath;
      console.log(this.docData.picList);
      console.log('this.docData',  this.docData);
      console.log('保存')
      this.com_addDocData(handleType, "docForm");
    },
    //是否是完成状态
    isOverStatus() {
      if (this.$route.params.docStatus == "1") {
        this.formOrDocData.showBtn = [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true
        ]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    },
    chooseImg(){
      let data ={
            pageType:'sceneInquestPicture',
            picSrc:this.docData.picImgEvPath,
            selectAllPicPath:[]
      }
        this.$refs.chooseOrUploadEvidenceRef.showModal(data);
    },
    deleteImg(){
        this.chooseImgSrc = '';
        this.imgBase64 = '';
        this.docData.picImgEvPath = '';
        this.docData.sh = '';
    },
    showChoosePic(selpicData){
        console.log('selpicData',selpicData);
        // this.picData = selpicData;
        this.getBase64(selpicData);
   },
    getBase64(selpicData){
        let storageId = selpicData.picData.evPath;
       this.docData.picImgEvPath =  storageId;
      queryImgBase64Api(storageId).then(res=>{
        console.log('获取base64',res);
        this.imgBase64 = res.data;
        this.docData.sh = selpicData.picData.note;
        this.changeImgWidHei(storageId);
      }).catch(err=>{console.log(err)})
    },
    //对图片进行处理
    changeImgWidHei(storageId){
       //设置临时图片
        let temImg = new Image();
        temImg.src =  iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST + storageId;
        let _this = this;
        temImg.onload = function(e) {
          //赋值给图片地址
          _this.getScaling(temImg.width,temImg.height);
          _this.imgWidth = temImg.width / _this.scaling;
          _this.imgHeight = temImg.height / _this.scaling;
          _this.chooseImgSrc = temImg.src;
        };
    },
    getDataAfter(){
      if(this.docData.picImgEvPath){
        queryImgBase64Api(this.docData.picImgEvPath).then(res=>{
            this.imgBase64 = res.data;
            this.changeImgWidHei(this.docData.picImgEvPath);
        })
      }   
    },
    //计算图像缩放比
    getScaling(imgWidth, imgHeight) {
     let maxWidth = this.$refs.imgBoxRef.offsetWidth - 2;
     let maxHeight = this.$refs.imgBoxRef.offsetHeight - 2;
      //宽高比
      let rate = (imgWidth / imgHeight).toFixed(2);
      if (rate >= 1) {
        this.scaling = (imgWidth / maxWidth).toFixed(1);
      } else {
        this.scaling = (imgHeight / maxHeight).toFixed(1);
      }
    },
  },
  mounted() {
    this.getDocDataByCaseIdAndDocId();
  },
  created() {
    this.isOverStatus();
  }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">
#sceneInquestPictureBox{
    .imgBox{
        height: 400px;
        border:1px solid #cccccc;
        text-align: center;
        img{
            height: 100%;
        }
    }
    .imgBoxBtn{
        text-align: right;
    }
    .overflow_lins_textarea {
      & > textarea {
        text-indent: 5em;
      }
    }
}
</style>
