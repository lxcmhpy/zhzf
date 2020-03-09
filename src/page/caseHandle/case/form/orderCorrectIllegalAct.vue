<template>
  <div class="print_box">
    <div class="print_info">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="formData">
        <div class="doc_topic">责令改正违法行为通知书</div>
        <div class="doc_number">案号：{{formData.caseNumber}}</div>
        <p class="side_right_indent">
          当事人（个人姓名或单位名称）：
          <el-form-item prop="party">
              <el-input type='textarea' v-model="formData.party"  v-bind:class="{ over_flow:formData.party.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength'></el-input>
              <!-- <el-input v-model="formData.illegalLaw" :maxLength='maxLength' :maxLength='maxLength'></el-input> -->
          </el-form-item>
        </p>
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item prop="illegalFacts">
              <el-input class='text_indent10 overflow_lins_textarea' type='textarea' v-model="formData.illegalFacts" rows="3" maxLength='90' placeholder="\"></el-input>
              <span class="overflow_describe">经调查，你（单位）存在下列违法事实：</span>
              <span  class="span_bg span_bg_top" @click="overFlowEdit">&nbsp;</span>
              <span v-for="item in overFlowEditList" :key="item.id" class="span_bg" @click="overFlowEdit">&nbsp;</span>
            </el-form-item>
          </div>

        </div>
        <p>根据<span>
            <el-form-item prop="punishLaw">
              <el-input type='textarea' v-model="formData.punishLaw"  v-bind:class="{ over_flow:formData.party.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength'></el-input>
            </el-form-item>
          </span>的规定，现责令你（单位）
          <p>
            <el-checkbox v-model="formData.correctWat1"></el-checkbox>立即予以改正。
          </p>
          <p>
            <el-checkbox v-model="formData.correctWat12"></el-checkbox>在<el-form-item prop="makeDate" class="pdf_datapick">
              <el-date-picker v-model="formData.makeDate" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日">
              </el-date-picker>
            </el-form-item>前改正或者整改完毕。
          </p>
          <p>
            如果不服本处罚决定，可以在六十日内依法向<span>
              <el-form-item prop="reconsiderationOrgan">
                <el-input v-model="formData.reconsiderationOrgan" :maxLength='maxLength'></el-input>
              </el-form-item>
            </span>申请行政复议，或者在六个月内依法向<span>
              <el-form-item prop="litigationOrgan">
                <el-input v-model="formData.litigationOrgan" :maxLength='maxLength'></el-input>
              </el-form-item>
            </span>人民法院提起行政诉讼。
          </p>
          <br>
          <el-row :gutter="20">
            <el-col :span="12">
              当事人或其代理人签名：
              <span class="write_line width250"></span>
            </el-col>
            <el-col :span="12">
              执法人员签名：
              <span class="write_line width250"></span>
            </el-col>
          </el-row>
          <div class="pdf_seal">
            <span>交通运输执法部门(印章)</span><br>
            <el-form-item prop="makeDate" class="pdf_datapick">
              <el-date-picker v-model="formData.correctTime" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="notice clear">
            <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
          </div>
      </el-form>
    </div>
    <!-- 悬浮按钮 -->
    <casePageFloatBtns
      :pageDomId="'orderIllegalAction_print'"
      :formOrDocData="formOrDocData"
      @saveData="saveData"
    ></casePageFloatBtns>
    <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput>
  </div>
</template>

<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import overflowInput from "../modle/overflowInput";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
export default {
  data() {
    return {
      overFlowEditList:[{},{}],
      maxLength:"22",
      formData: {
        caseNumber:'',
        party: '',
        illegalFact:'',
        punishLaw: "",
        correctTime: "",
        reconsiderationOrgan: "",
        litigationOrgan: "",
        partySign:'',
        staffSign:'',
        makeDate: "",
        checkBox:''
      },
      rules: {
        party: [
          { required: true, message: "当事人姓名必须填写", trigger: blur }
        ]
      },
      formOrDocData: {
        showBtn: [
          false,
          true,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        ], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        pageDomId: "orderIllegalAction_print",
        isHuanjie: true
      },
      //提交方式
      handleType: 0, //0  暂存     1 提交
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId:'', //案件id
        caseLinktypeId: '', //表单类型ID
        //表单数据
        formData: "",
        status: ""
      },
    };
  },
  mixins:[mixinGetCaseApiList],
  computed:{...mapGetters(['caseId'])},
  components: {
    overflowInput,
  },
  methods: {
    // 多行编辑
    overFlowEdit() {
      this.$refs.overflowInputRef.showModal(0, '', this.maxLengthOverLine);
    },
    // 获取多行编辑内容
    getOverFloeEditInfo(edit) {
      this.formData.illegalFact = edit;
    },
    addFormData(handleType) {
      //参数  提交类型 、formRef  、 跳转的pdf路由name
      // this.com_submitCaseForm(handleType,'illegalActionForm','illegalActionPdf');
      this.com_submitCaseForm(handleType, 'illegalActionForm', false);
    },
    setData() {
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(
        this.caseLinkDataForm.caseBasicinfoId,
        this.caseLinkDataForm.caseLinktypeId,
        false
      );
    },
  },
  created() {
    this.setData();
  }
};
</script>
<style lang="scss">
@import "@/assets/css/caseHandle/caseDocModle.scss";
</style>
