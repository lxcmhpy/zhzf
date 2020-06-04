<template>
  <div class="print_box" id="evidencePastePageBox">
    <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
     <div style="position:relation" v-for="(item,index) in docData.evidenceData" :key="index">   
   
    <div class="print_info">
        <el-button class="deletePageBtn" type="primary" v-show="index!=0" @click="deletePage(index)">删除本页</el-button>
        <div class="doc_topic">证据粘贴页</div>
        <div class="doc_number"></div>
        <el-row :gutter="20">
             <el-col :span="18">粘贴照片栏</el-col><el-col :span="6">文字说明栏</el-col>
        </el-row>
        <el-row :gutter="20" class="nianBox">
            <el-col :span="18">
                <div class="imgBox">
                    <img :src="item.pic1" alt="">
                    <div class="imgBoxBtn"><el-button size="mini" @click="chooseImg(index,1,item.picSrc1)">选择照片</el-button><el-button size="mini" @click="deleteImg(index,1)" >删除</el-button></div>
                </div>
                
            </el-col>
            <el-col :span="6" class="noteBox">
                <el-form-item :prop="item.note1" :rules="[{ required: true, message: '请输入文字说明', trigger: 'blur' }]">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入"
                        v-model="item.note1">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="nianBox">
            <el-col :span="18">
                <div class="imgBox">
                    <img :src="item.pic2" alt="">
                    <div class="imgBoxBtn"><el-button size="mini" @click="chooseImg(index,2,item.picSrc2)">选择照片</el-button><el-button size="mini" @click="deleteImg(index,2)">删除</el-button></div>
                </div>
                
            </el-col>
            <el-col :span="6" class="noteBox">
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入"
                    v-model="item.note2">
                    </el-input>
            </el-col>
        </el-row>
        
        <p class="p_begin">
            拍摄时间：
          <span>
            <el-form-item prop="pTime" :rules="fieldRules('pTime',propertyFeatures['pTime'])">
              <el-input v-model="item.pTime"  :disabled="fieldDisabled(propertyFeatures['pTime'])"></el-input>
            </el-form-item>
          </span>
          拍摄地点
          <span>
            <el-form-item prop="pPla" :rules="fieldRules('pPla',propertyFeatures['pPla'])">
              <el-input v-model="item.pPla" :disabled="fieldDisabled(propertyFeatures['pPla'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
            拍摄人：
          <span>
            <el-form-item prop="pPeo" :rules="fieldRules('pPeo',propertyFeatures['pPeo'])">
              <el-input v-model="item.pPeo"  :disabled="fieldDisabled(propertyFeatures['pPeo'])"></el-input>
            </el-form-item>
          </span>
          执法人员签名：
          <span class="write_line" style="width:100px"></span>
        </p>
        <el-row :gutter="20">
          <el-col :span="12">
            当事人或代理人签名：
            <span class="write_line" style="width:200px"></span>
          </el-col>
        </el-row>   
    </div>    
    </div>
       <div style="text-align:center"><el-button type="primary" @click="addPage">添加一页</el-button></div> 
    </el-form>

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
        pTime: "",
        pPla: "",
        pPeo: "",
        note1:"",
        note2:"",
        evidenceData:[{ pic1:'', pic2:'', picSrc1:'', picSrc2:'', pTime:'',pPla:'', pPeo:'',note1:'', note2:'',}],
      },
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseDoctypeId: this.$route.params.docId, //文书类型ID
        //表单数据
        docData: "",
        status: ""
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
    
    //提交
    submitData(handleType) {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: this.$route.params.url
      });
    },
    //保存文书信息
    saveData(handleType) {

    //   if(!this.imgBase64){
    //     this.$message('请选择照片');
    //     return;
    //   }
    //   console.log(this.imgBase64);
    //   let imgData ={
    //     'pictures-1':this.imgBase64
    //   };
    //   let imgDataArr = [];
    //   imgDataArr.push(imgData)
    //   this.docData.picList = JSON.stringify(imgDataArr);
    //   this.docData.picImgEvPath = this.picData.evPath;
    //   console.log(this.docData.picList);
    //   console.log('this.docData',  this.docData)
    //   this.com_addDocData(handleType, "docForm");
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
    
    chooseImg(index,picIndex,picSrc){
        let selectAllPicPath = [];
        this.docData.evidenceData.forEach(item=>{
            selectAllPicPath.push(item.picSrc1);
            selectAllPicPath.push(item.picSrc2);
        })
        let data ={
            pageType:'evidencePastePage',
            pastePage:index,
            picIndex:picIndex,
            picSrc:picSrc,
            selectAllPicPath:selectAllPicPath
        }
        this.$refs.chooseOrUploadEvidenceRef.showModal(data);
    },
    deleteImg(pageIndex,picIndex){
        // this.chooseImgSrc = '';
        // this.imgBase64 = '';
       let picKey = 'pic'+picIndex;
        this.docData.evidenceData[pageIndex][picKey] = '';

    },
    showChoosePic(selpicData){
        console.log('selpicData',selpicData);

        // this.picData = selpicData;
        this.getBase64(selpicData);

        // this.getBase64(selpicData.evPath);
   },
    getBase64(selpicData){
        let storageId = selpicData.picData.evPath;
      queryImgBase64Api(storageId).then(res=>{
        console.log('获取base64',res);
        this.imgBase64 = res.data;
         let picKey = 'pic'+selpicData.picIndex;
        this.docData.evidenceData[selpicData.pastePage][picKey] = iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST + storageId;
        let picSrcKey = 'picSrc'+selpicData.picIndex;
        this.docData.evidenceData[selpicData.pastePage][picSrcKey] = storageId;

        // this.chooseImgSrc = iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST + storageId;
      }).catch(err=>{console.log(err)})
    },
    getDataAfter(){
    },
    //添加一页
    addPage(){
        let data = {
            pTime:'',
            pPla:'',
            pPeo:'',
            note1:'',
            note2:'',
        }
        this.docData.evidenceData.push(data);
    },
    deletePage(index){
        this.docData.evidenceData.splice(index,1);
    }
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

#evidencePastePageBox{
    .print_info{
        position: relative;
        margin-bottom: 20px;
        .deletePageBtn{
            position: absolute;
            right: 10px;
            top: 10px;
        }
    }
    .nianBox{
        margin-bottom: 20px;
    }
    .imgBox{
        height: 350px;
        border:1px solid #cccccc;
        text-align: center;
        overflow-y: auto;
        img{
            width: 100%;
        }
        position: relative;
        .imgBoxBtn{
            position: absolute;
            right: 10px;
            bottom: 10px;
        }
    }
    
    .overflow_lins_textarea {
      & > textarea {
        text-indent: 5em;
      }
    }
    .noteBox{
        height:350px ;
        border:1px solid #cccccc;
    }
}
</style>
