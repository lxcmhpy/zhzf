<!-------长软------->
<template>
   <div class="print_box">
    <div class="print_info" id="executAnnounceDoc_print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">案件移送告知书</div>
        <div class="doc_number">赣（{{docData.caseNumber.substring(3,7)}}）交移告〔{{docData.caseNumber.substring(8,13)}}〕号</div>
        <p class="side_right_indent">
            当事人（个人姓名或单位名称）：
            <el-form-item prop="party" :rules="fieldRules('party',propertyFeatures['party'])" style="width: 250px;">
            <el-input
              type="textarea"
              v-model="docData.party"
              v-bind:class="{ over_flow:docData.party && docData.party.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 2}"
              :maxLength="maxLength"
              style="width:250px;"
              :disabled="fieldDisabled(propertyFeatures['party'])"
            ></el-input>
            <!-- <el-input v-model="docData.illegalLaw" :maxLength='maxLength' :maxLength='maxLength'></el-input> -->
          </el-form-item>
        </p>
        <p>
          本单位已于
          <span>
            <el-form-item prop="serviceTime" class="pdf_datapick" :rules="fieldRules('serviceTime',propertyFeatures['serviceTime'])">
              <el-date-picker v-model="docData.serviceTime" :disabled="fieldDisabled(propertyFeatures['serviceTime'])" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </span>将
          <span>
            <el-form-item prop="caseName" :rules="fieldRules('caseName',propertyFeatures['caseName'])">
<!--              <el-input v-model="docData.caseName" :disabled="fieldDisabled(propertyFeatures['caseName'])" style="width:250px;" :maxLength='maxLength' placeholder="\"></el-input>-->
              <el-input
                type="textarea"
                v-model="docData.caseName"
                v-bind:class="{ over_flow:docData.caseName && docData.caseName.length>14?true:false }"
                :autosize="{ minRows: 1, maxRows: 2}"
                :maxLength="maxLengthOverLine"
                style="width:250px;"
                :disabled="fieldDisabled(propertyFeatures['caseName'])"
              ></el-input>
            </el-form-item>
          </span>案件依法移送
          <span>
            <el-form-item prop="transUnit" :rules="fieldRules('transUnit',propertyFeatures['transUnit'])">
              <el-input v-model="docData.transUnit" :disabled="fieldDisabled(propertyFeatures['transUnit'])" :maxLength='maxLength' placeholder="\"></el-input>
            </el-form-item>
          </span>处理（联系电话：<span>
            <el-form-item prop="transUnitTel" :rules="fieldRules('transUnitTel',propertyFeatures['transUnitTel'],validatePhone)">
              <el-input v-model="docData.transUnitTel" :disabled="fieldDisabled(propertyFeatures['transUnitTel'])" :maxLength='maxLength' placeholder="\"></el-input>
            </el-form-item>
          </span>）。请你（单位）及时前往接受调查处理。
        </p>
        <p>
          特此告知。
        </p>

        <div class="pdf_seal">
          <span>交通运输执法部门(印章)</span><br>
          <el-form-item prop="makeDate" class="pdf_datapick">
            <el-date-picker v-model="docData.makeDate" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="notice clear">
          <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
        </div>
      </el-form>
    </div>
    <!-- 悬浮按钮 -->
    <casePageFloatBtns :pageDomId="'executAnnounceDoc_print'" :formOrDocData="formOrDocData" @submitData="submitData" @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>

  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import { validatePhone, validateZIP } from "@/common/js/validator";
export default {
  components: {
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId']) },
  data() {
    return {
      validatePhone:validatePhone,
      docData: {
        caseNumber: '',
        caseName: '',
        serviceTime: '',
        transUnit: '',
        transUnitTel: '',
        party: '',
        makeDate: '',
      },
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "",   //修改的时候用
        caseBasicinfoId: '',   //案件ID
        caseDoctypeId: this.BASIC_DATA_JX.caseTransNoticeDoc_JX_caseDocTypeId,    //文书类型ID
        //文书数据
        docData: "",
        linkTypeId: this.$route.params.caseLinkTypeId, //所属环节的id
        status: "",   //提交状态
      },
      name: '',
      inputInfo: '',
      inputInfos: '',
      illegalFactsEvidence: '',
      value1: '',
      rules: {
        party: [
          { required: true, message: "当事人姓名必须填写", trigger: "blur" }
        ],
        serviceTime: [
          { required: true, message: '移送时间必须填写', trigger: 'blur' },
        ],
        caseName: [
          { required: true, message: '案件名称必须填写', trigger: 'blur' },
        ],
        transUnit: [
          { required: true, message: '移送单位必须填写', trigger: 'blur' },
        ],
        transUnitTel: [
          { required: true, message: '移送单位联系电话必须填写', trigger: 'blur' },
          { validator: validatePhone, trigger: "blur" }
        ],
      },
      nameLength: 23,
      adressLength: 23,
      maxLength: 23,
      maxLengthOverLine: 122,
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: 'executAnnounceDoc_print',
      },
      propertyFeatures:''
    }
  },
 methods: {
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId
      };
      this.com_getDocDataByCaseIdAndDocId(data)

    },
    //保存文书信息
    addDocData(handleType) {
      this.com_addDocData(handleType, 'docForm');
    },
     // 打印
    print() {
      console.log('打印!');
    },
    // 获取多行编辑内容
    getOverFloeEditInfo(edit) {
      this.docData.illegalFactsEvidence = edit;
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
      this.com_addDocData(handleType, "docForm");
    },
    //是否是完成状态
    isOverStatus() {
      if (this.$route.params.docStatus == '1') {
        this.formOrDocData.showBtn = [false, false, false, false, false, false, false, false, false, true]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    }
  },
  mounted() {
    this.getDocDataByCaseIdAndDocId();
  },
  created() {
    this.isOverStatus();
  }
}
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss">
/* @import "@/assets/css/caseHandle/caseDocModle.scss"; */
</style>
