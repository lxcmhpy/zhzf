<!-------长软------->
<template>
   <div class="print_box">
    <div class="print_info" id="executAnnounceDoc_print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">案件移送函</div>
        <div class="doc_number">赣（{{docData.caseNumber.substring(3,7)}}）交移函〔{{docData.caseNumber.substring(8,13)}}〕号</div>
        <p class="side_right_indent">

            <el-form-item prop="transUnit" :rules="fieldRules('transUnit',propertyFeatures['transUnit'])" style="width: 250px;">
            <el-input
              type="textarea"
              v-model="docData.transUnit"
              v-bind:class="{ over_flow:docData.transUnit && docData.transUnit.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 2}"
              :maxLength="maxLength"
              style="width:250px;"
              :disabled="fieldDisabled(propertyFeatures['transUnit'])"
            ></el-input>
            <!-- <el-input v-model="docData.illegalLaw" :maxLength='maxLength' :maxLength='maxLength'></el-input> -->
          </el-form-item>
          （被移送机关）：
        </p>
        <p>
          本单位已于
          <span>
            <el-form-item prop="serviceTime" class="pdf_datapick" :rules="fieldRules('serviceTime',propertyFeatures['serviceTime'])">
              <el-date-picker v-model="docData.serviceTime" :disabled="fieldDisabled(propertyFeatures['serviceTime'])" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </span>对
          <span>
            <el-form-item prop="caseName" :rules="fieldRules('caseName',propertyFeatures['caseName'])">
              <el-input v-model="docData.caseName" :disabled="fieldDisabled(propertyFeatures['caseName'])" style="width:250px;" :maxLength='maxLength' placeholder="\"></el-input>
            </el-form-item>
          </span>一案进行调查，在调查中发现
          <el-form-item prop="illegalFacts" :rules="fieldRules('illegalFacts',propertyFeatures['illegalFacts'])">
<!--              <el-input v-model="docData.illegalFacts" :disabled="fieldDisabled(propertyFeatures['illegalFacts'])" style="width:250px;" :maxLength='maxLength' placeholder="\"></el-input>-->
            <el-input
              type="textarea"
              v-model="docData.illegalFacts"
              v-bind:class="{ over_flow:docData.illegalFacts && docData.illegalFacts.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 2}"
              :maxLength="maxLengthOverLine"
              style="width:250px;"
              :disabled="fieldDisabled(propertyFeatures['illegalFacts'])"
            ></el-input>
            </el-form-item>,此案超出本单位管辖范围。现依据
          <span>
            <el-form-item prop="punishLaw" :rules="fieldRules('punishLaw',propertyFeatures['punishLaw'])">
<!--              <el-input v-model="docData.punishLaw" :disabled="fieldDisabled(propertyFeatures['punishLaw'])" :maxLength='maxLength' placeholder="\"></el-input>-->
              <el-input
                type="textarea"
                v-model="docData.punishLaw"
                v-bind:class="{ over_flow:docData.punishLaw && docData.punishLaw.length>14?true:false }"
                :autosize="{ minRows: 1, maxRows: 2}"
                :maxLength="maxLengthOverLine"
                style="width:250px;"
                :disabled="fieldDisabled(propertyFeatures['punishLaw'])"
              ></el-input>
            </el-form-item>
          </span>的规定，将该案移送你单位处理。
        </p>
        <p>
        <el-row>
          <el-col :span="12">
              本单位联系人：
              <el-form-item prop="organContactor" :rules="fieldRules('organContactor',propertyFeatures['organContactor'])" style="width: 160px;">
                <el-input
                  type="textarea"
                  v-model="docData.organContactor"
                  v-bind:class="{ over_flow:docData.organContactor && docData.organContactor.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 2}"
                  :maxLength="maxLength"
                  :disabled="fieldDisabled(propertyFeatures['organContactor'])"
                ></el-input>
              </el-form-item>
              <u v-if="lineStyleFlag">{{docData.organContactor}}</u>
          </el-col>
          <el-col :span="12">
              联系电话：
              <el-form-item prop="organTel" :rules="fieldRules('organTel',propertyFeatures['organTel'])" style="width: 180px;">
                <el-input
                  type="textarea"
                  v-model="docData.organTel"
                  v-bind:class="{ over_flow:docData.organTel && docData.organTel.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 2}"
                  :maxLength="maxLength"
                  :disabled="fieldDisabled(propertyFeatures['organTel'])"
                ></el-input>
              </el-form-item>
              <u v-if="lineStyleFlag">{{docData.organContactor}}</u>
          </el-col>
        </el-row>
        </p>
        <p>
          附：
        </p>
        <p class="side_right_indent">
            1、附件有关材料<el-form-item prop="amount" :rules="fieldRules('amount',propertyFeatures['amount'])" style="width: 50px;">
            <el-input
              type="textarea"
              v-model="docData.amount"
              v-bind:class="{ over_flow:docData.amount && docData.amount.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 2}"
              :maxLength="maxLength"
              style="width:50px;"
              :disabled="fieldDisabled(propertyFeatures['amount'])"
            ></el-input>
            <!-- <el-input v-model="docData.illegalLaw" :maxLength='maxLength' :maxLength='maxLength'></el-input> -->
          </el-form-item>份：
        </p>
        <p>
            （1）<el-form-item prop="appendEvi1" :rules="fieldRules('appendEvi1',propertyFeatures['appendEvi1'])" style="width: 500px;">
            <el-input
              type="textarea"
              v-model="docData.appendEvi1"
              v-bind:class="{ over_flow:docData.appendEvi1 && docData.appendEvi1.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 2}"
              :maxLength="maxLengthOverLine"
              :disabled="fieldDisabled(propertyFeatures['appendEvi1'])"
            ></el-input>
            <!-- <el-input v-model="docData.illegalLaw" :maxLength='maxLength' :maxLength='maxLength'></el-input> -->
          </el-form-item>
        </p>
        <p>
          （2）<el-form-item prop="appendEvi2" :rules="fieldRules('appendEvi2',propertyFeatures['appendEvi2'])" style="width: 500px;">
            <el-input
              type="textarea"
              v-model="docData.appendEvi2"
              v-bind:class="{ over_flow:docData.appendEvi2 && docData.appendEvi2.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 2}"
              :maxLength="maxLengthOverLine"
              :disabled="fieldDisabled(propertyFeatures['appendEvi2'])"
            ></el-input>
            <!-- <el-input v-model="docData.illegalLaw" :maxLength='maxLength' :maxLength='maxLength'></el-input> -->
          </el-form-item>
        </p>
        <p class="side_right_indent">
            2、移送案件涉案物品清单：
        </p>
        <p>
            （1）<el-form-item prop="involvedGoods1" :rules="fieldRules('involvedGoods1',propertyFeatures['involvedGoods1'])" style="width: 500px;">
            <el-input
              type="textarea"
              v-model="docData.involvedGoods1"
              v-bind:class="{ over_flow:docData.involvedGoods1 && docData.involvedGoods1.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 2}"
              :maxLength="maxLengthOverLine"
              :disabled="fieldDisabled(propertyFeatures['involvedGoods1'])"
            ></el-input>
            <!-- <el-input v-model="docData.illegalLaw" :maxLength='maxLength' :maxLength='maxLength'></el-input> -->
          </el-form-item>
        </p>
        <p>
          （2）<el-form-item prop="involvedGoods2" :rules="fieldRules('involvedGoods2',propertyFeatures['involvedGoods2'])" style="width: 500px;">
            <el-input
              type="textarea"
              v-model="docData.involvedGoods2"
              v-bind:class="{ over_flow:docData.involvedGoods2 && docData.involvedGoods2.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 2}"
              :maxLength="maxLengthOverLine"
              :disabled="fieldDisabled(propertyFeatures['involvedGoods2'])"
            ></el-input>
            <!-- <el-input v-model="docData.illegalLaw" :maxLength='maxLength' :maxLength='maxLength'></el-input> -->
          </el-form-item>
        </p>
        <div class="notice clear">
          <span>(以下无正文)</span>
        </div>
        <div class="pdf_seal">
          <span>交通运输执法部门(印章)</span><br>
          <el-form-item prop="makeDate" class="pdf_datapick">
            <el-date-picker v-model="docData.makeDate" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="notice clear">
          <span>(本文书一式两份：一份存根，一份交被移送机关。)</span>
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
        transUnit: '',
        illegalFacts:'',
        punishLaw:'',
        serviceTime: '',
        organContactor:'',
        organTel:'',
        transUnitTel: '',
        amount:'',
        appendEvi1:'',
        appendEvi2:'',
        involvedGoods1:'',
        involvedGoods2:'',
        makeDate: '',
      },
      lineStyleFlag: false,
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "",   //修改的时候用
        caseBasicinfoId: '',   //案件ID
        caseDoctypeId: this.BASIC_DATA_JX.caseTransLetter_JX_caseDocTypeId,    //文书类型ID
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
        serviceTime: [
          { required: true, message: '移送时间必须填写', trigger: 'blur' },
        ],
        caseName: [
          { required: true, message: '案件名称必须填写', trigger: 'blur' },
        ],
        transUnit: [
          { required: true, message: '移送单位必须填写', trigger: 'blur' },
        ],
        illegalFacts: [
          { required: true, message: '调查内容必须填写', trigger: 'blur' },
        ],
        punishLaw: [
          { required: true, message: '相关规定必须填写', trigger: 'blur' },
        ],
        organContactor: [
          { required: true, message: '移送机构联系人必须填写', trigger: 'blur' },
        ],

        // transUnitTel: [
        //   { required: true, message: '移送单位联系电话必须填写', trigger: 'blur' },
        //   { validator: validatePhone, trigger: "blur" }
        // ],
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
