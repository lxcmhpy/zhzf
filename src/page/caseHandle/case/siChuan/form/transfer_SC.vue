<template>
  <div class="box">
    <el-form ref="caseDocForm" :model="formData" :rules="rules" label-width="133px">
        案号：
    </el-form>
    <checkDocFinish ref="checkDocFinishRef"></checkDocFinish>
    <resetDocDia ref="resetDocDiaRef" @getDocListByCaseIdAndFormIdEmit="getDocListByCaseIdAndFormId"></resetDocDia>
    <caseSlideMenu :activeIndex="''"></caseSlideMenu>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import checkDocFinish from "@/page/caseHandle/components/checkDocFinish.vue";
import resetDocDia from '@/page/caseHandle/components/resetDocDia';
import iLocalStroage from "@/common/js/localStroage";
import caseSlideMenu from '@/page/caseHandle/components/caseSlideMenu'
import {BASIC_DATA_JX} from '@/common/js/BASIC_DATA_JX.js';
import {
  validateIDNumber,
  validatePhone,
  validateZIP
} from "@/common/js/validator";
export default {
  components: {
    checkDocFinish,
    resetDocDia,
    caseSlideMenu
  },
  data() {
    return {
      validatePhone:validatePhone,
      validateIDNumber:validateIDNumber,
      formData: {
        caseNumber: "",
        caseCauseName: "",
        companyName: "",
        companyTel: "",
        party: "",
        partySex: "",
        partyIdNo: "",
        partyAge: "",
        partyTel: "",
        partyUnitPosition:"",
        partyAddress: "",
        partyZipCode: "",
        partyName: "",
        partyUnitAddress: "",
        partyManager: "",
        partyUnitTel: "",
        socialCreditCode: "",
      },
      isSaveLink: '',
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseLinktypeId: this.BASIC_DATA_JX.transfei_JX_caseLinktypeId, ////表单类型ID
        formData: "", //表单数据
        status: ""
      },
      handleType: 0,
      docTableDatas: [],
      rules: {
        caseNumber: [
          { required: true, message: "案号不能为空", trigger: "blur" }
        ],
        caseName: [
          { required: true, message: "案由不能为空", trigger: "blur" }
        ],
        companyName: [
          { required: true, message: "被移送单位名称不能为空", trigger: "change" }
        ],
        companyTel: [
          { required: true, message: "移送单位联系电话不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        party: [
          { required: true, message: "姓名不能为空", trigger: "blur" }
        ],
        partySex: [
          { required: true, message: "性别不能为空", trigger: "change" }
        ],
        partyIdNo: [
          { required: true, message: "身份证号不能为空", trigger: "blur" },
          { validator: validateIDNumber, trigger: "blur" }
        ],
        partyTel: [
          { required: true, message: "联系电话不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        partyAddress: [
          { required: true, message: "联系地址不能为空", trigger: "blur" }
        ],
        partyName: [
          { required: true, message: "单位不能为空", trigger: "blur" }
        ],
        partyUnitAddress: [
          { required: true, message: "地址不能为空", trigger: "blur" }
        ],
        partyManager: [
          { required: true, message: "法定代表人不能为空", trigger: "blur" }
        ],
        partyUnitTel: [
          { required: true, message: "联系电话不能为空", trigger: "blur" }
        ],
        socialCreditCode: [
          { required: true, message: "统一社会信用代码不能为空", trigger: "blur" }
        ],

      },
      // nextBtnDisab: true
      isParty: true, //当事人类型为个人
      originalData: "",
      needDealData:false,
      propertyFeatures:'', //字段属性配置

    };
  },
  computed: {
    ...mapGetters(["caseId",'IsLawEnforcementSupervision'])
  },
  mixins: [mixinGetCaseApiList],
  inject: ["reload"],
  methods: {
    //加载表单信息
    setFormData() {
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(this.caseLinkDataForm.caseBasicinfoId, this.caseLinkDataForm.caseLinktypeId, false);
    },
    //保存表单数据
    submitCaseDoc(handleType) {
      this.com_submitCaseForm(handleType, 'caseDocForm', false);
    },
    //下一环节
    continueHandle() {
      console.log(this.docTableDatas)
      let caseData = {
        caseBasicinfoId: this.caseLinkDataForm.caseBasicinfoId,
        caseLinktypeId: this.caseLinkDataForm.caseLinktypeId
      };
      let canGotoNext = true; //是否进入下一环节  isRequired(0必填 1非必填)
      let approvalPass = true;  //文书审批都通过了
      for (let i = 0; i < this.docTableDatas.length; i++) {
        if (
          this.docTableDatas[i].isRequired === 0 && (Number(this.docTableDatas[i].status) == 0)
        ) {
          canGotoNext = false;
          break;
        }else if(this.docTableDatas[i].docProcessStatus == '审批中'){
            //有审批中的环节
            approvalPass = false;
            break;
        }
      }
      if (canGotoNext && approvalPass) {
        this.com_goToNextLinkTu(
          this.caseId,
          this.caseLinkDataForm.caseLinktypeId
        );
      } else if(!canGotoNext){
        this.$refs.checkDocFinishRef.showModal(this.docTableDatas, caseData);
      }else if(!approvalPass){
        this.$message('有文书正在审批中！')
      }
    },
    // 进入文书
    enterDoc(row) {
      this.$store.dispatch("deleteTabs", this.$route.name);//关闭当前页签
      console.log('row', row)
      this.$router.push({
        name: row.path,
        params: {
          id: row.id,
          //案件ID
          caseBasicinfoId: this.caseBasicinfoId,
          docId: row.docId,
          url: this.$route.name,
        }
      });
    },
    //查看文书
    viewDoc(row) {
      this.com_viewDoc(row,this.caseLinkDataForm.caseLinktypeId);
    },
    //预览pdf
    viewDocPdf(row) {
      let routerData = {
        hasApprovalBtn: false,
        docId: row.docId,
        approvalOver: false,
        hasBack: true,
        status:row.status,  //status状态 0 暂存 1保存未提交  2 保存并提交
        docDataId:row.docDataId
      }
      this.$store.dispatch("deleteTabs", this.$route.name);
      this.$router.push({ name: 'case_handle_myPDF', params: routerData })
    },
    //清空文书
    delDocDataByDocId(data){
      this.$refs.resetDocDiaRef.showModal(data);
    },
    //通过案件id和表单类型Id查询已绑定文书
    getDocListByCaseIdAndFormId() {
      let data = {
        linkTypeId: this.caseLinkDataForm.caseLinktypeId    //环节ID
      };
      this.com_getDocListByCaseIdAndFormId(data);
    },
    //返回到流程图
    backBtn() {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.go(-1);
    },
  },
  created() {
    this.setFormData();
    this.getDocListByCaseIdAndFormId();
  }
};
</script>

<style lang="scss" src="@/assets/css/documentForm.scss" scoped>
</style>
