<template>
  <div class="main">
    <div class="print_box">
      <div id="hearingReportDoc-print" class="print_info">
        <el-form
          :rules="rules"
          ref="docForm"
          :inline-message="true"
          :inline="true"
          :model="docData"
        >
          <div class="doc_topic">听证报告书</div>
          <div
            class="doc_number"
          >案号：{{docData.caseNumber}}</div>
          <!-- <el-button @click="onSubmit('docForm')">formName</el-button> -->
          <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
            <tr>
              <td>案由</td>
              <td colspan="7" class="color_DBE4EF">
                <el-form-item prop="caseName" :rules="fieldRules('caseName',propertyFeatures['caseName'])">
                  <el-input
                    type="textarea"
                    v-model="docData.caseName"
                    v-bind:class="{ over_flow:docData.caseName.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    :maxlength="nameLength"
                    error
                    placeholder="\"
                    :disabled="fieldDisabled(propertyFeatures['caseName'])"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>主持人</td>
              <td colspan="2" class="color_DBE4EF">
                <el-form-item
                  prop=" president"
                  :rules="fieldRules(' president',propertyFeatures['president'])"
                >
                  <el-input
                    v-bind:class="{ over_flow:docData.president.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    :maxlength="adressLength"
                    v-model="docData.president"
                    placeholder="请输入"
                    :disabled="fieldDisabled(propertyFeatures['president'])"
                  ></el-input>
                </el-form-item>
              </td>
              <td>听证员</td>
              <td colspan="2" class="color_DBE4EF">
                <el-form-item
                  prop="hearOfficer"
                  :rules="fieldRules('hearOfficer',propertyFeatures['hearOfficer'])"
                >
                  <el-input
                    v-model="docData.hearOfficer"
                    v-bind:class="{ over_flow:docData.hearOfficer.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    :maxlength="adressLength"
                    placeholder="请输入"
                    :disabled="fieldDisabled(propertyFeatures['hearOfficer'])"
                  ></el-input>
                </el-form-item>
              </td>
              <td>书记员</td>
              <td class="color_DBE4EF">
                <el-form-item
                  prop="clerk"
                  :rules="fieldRules('clerk',propertyFeatures['clerk'])"
                >
                  <el-input
                    v-model="docData.clerk"
                    v-bind:class="{ over_flow:docData.clerk.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    :maxlength="adressLength"
                    placeholder="请输入"
                    :disabled="fieldDisabled(propertyFeatures['clerk'])"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>当事人</td>
              <td colspan="7" class="color_DBE4EF">
                <el-form-item prop="party" :rules="fieldRules('party',propertyFeatures['party'])">
                  <el-input
                    v-model="docData.party"
                    v-bind:class="{ over_flow:docData.party.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    :maxlength="nameLength"
                    error
                    placeholder="\"
                    :disabled="fieldDisabled(propertyFeatures['party'])"
                  ></el-input>
                  <!-- <el-input v-model="docData.party"  @input="widthCheck($event.target, 23,$event)" maxlength="47" v-bind:class="{over_flow: isOverflow}" placeholder="\"></el-input> -->
                </el-form-item>
              </td>
            </tr>
            <tr rowspan="5">
              <td colspan="8">
                <div class="overflow_lins_style" id="hearingSummary_noteDesCon">
                  <div class="overflow_lins">
                    <el-form-item
                      prop="hearingSummary"
                      :rules="fieldRules('hearingSummary',propertyFeatures['hearingSummary'])"
                    >
                      <el-input
                        class="text_indent25 overflow_lins_textarea"
                        type="textarea"
                        v-model="docData.hearingSummary"
                        rows="4"
                        maxlength="400"
                        placeholder="\"
                        :disabled="fieldDisabled(propertyFeatures['hearingSummary'])"
                      ></el-input>
                      <span
                        class="overflow_describe_JX"
                        style="padding-bottom:-6px;"
                      >听证会基本情况摘要：（详见听证笔录，笔录附后）</span>
                      <!-- <span class="span_bg span_bg_top">&nbsp;</span> -->
                      <p class="span_bg span_bg_tops">&nbsp;</p>
                      <p class="span_bg">&nbsp;</p>
                      <p class="span_bg">&nbsp;</p>
                      <p class="span_bg">&nbsp;</p>
                      <p class="span_bg">&nbsp;</p>
                      <p class="span_bg">&nbsp;</p>
                      <p class="span_bg">&nbsp;</p>
                      <p class="span_bg">&nbsp;</p>
                      <p class="span_bg">&nbsp;</p>
                      <p class="span_bg">&nbsp;</p>
                      <p class="span_bg">&nbsp;</p>
                    </el-form-item>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <p>听证</p>
                <p>结论</p>
                <p>及处</p>
                <p>理意</p>
                <p>见</p>
              </td>
              <td
                colspan="8"
                class="color_DBE4EF table_seal"
                style="white-space: pre-wrap;word-break:break-all"
              >
                <el-form-item prop="hearingResult" :rules="fieldRules('hearingResult',propertyFeatures['hearingResult'])">
                  <el-input
                    type="textarea" 
                    v-model="docData.hearingResult"
                    v-bind:class="{ over_flow:docData.hearingResult.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    :maxlength="100"
                    placeholder="\"
                    :disabled="fieldDisabled(propertyFeatures['hearingResult'])"
                  ></el-input>
                </el-form-item>
                <div class="pdf_seal">
                  <p>听证主持人签名：{{docData.presidentSign}}</p>
                  <p>
                    <span v-if="docData.presidentTime">{{docData.presidentTime}}</span>
                    <span v-else>年 月 日</span>
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <p>行政</p>
                <p>机关</p>
                <p>负责</p>
                <p>人意</p>
                <p>见</p>
              </td>
              <td
                colspan="8"
                class="color_DBE4EF table_seal"
                style="white-space: pre-wrap;word-break:break-all"
              >
                {{docData.approveOpinions}}
                <div class="pdf_seal">
                  <p>负责人签名：{{docData.approvePeo}}</p>
                  <p>
                    <span v-if="docData.approveTime">{{docData.approveTime}}</span>
                    <span v-else>年 月 日</span>
                  </p>
                </div>
              </td>
            </tr>
            <tr>
            <td>
              <p>备注</p>
            </td>
            <td colspan="8" class="color_DBE4EF">
              <el-form-item prop="note">
                <el-input type="textarea" v-model="docData.note" :autosize="{ minRows: 1, maxRows: 2}" maxlength="30" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          </table>
        </el-form>
      </div>
      <casePageFloatBtns
        :formOrDocData="formOrDocData"
        @submitData="submitData"
        @saveData="saveData"
        @backHuanjie="submitData"
      ></casePageFloatBtns>
    </div>
  </div>
</template>
<script>
// import overflowInput from "../pdf/overflowInput";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import { findCaseAllBindPropertyApi } from "@/api/caseHandle";

// 验证规则
import { validatePhone, validateIDNumber } from "@/common/js/validator";

export default {
  components: {
    // overflowInput
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  components: {
    casePageFloatBtns
  },
  data() {
    return {
      validatePhone: validatePhone,
      validateIDNumber: validateIDNumber,
      isOverflow: false,
      isOverLine: false,
      docData: {
        caseNumber: "",
        caseName:'',
        president:'',
        hearOfficer:'',
        clerk:'',
        party:'',
        hearingSummary:'',
        hearingResult:'',
        presidentSign:'',
        presidentTime:'',
        approveOpinions:'',
        approvePeo:'',
        approveTime:'',
        note: '',
      },
      rules: {
        caseName: [
          { required: true, message: "案由不能为空", trigger: "blur" }
        ],
        president: [
          { required: true, message: "主持人不能为空", trigger: "change" }
        ],
        clerk: [
          { required: true, message: "书记员不能为空", trigger: "blur" }
        ],
        hearOfficer: [
          { required: true, message: "听证员不能为空", trigger: "change" }
        ],
        party: [
          { required: true, message: "当事人不能为空", trigger: "blur" }
        ],
        hearingSummary: [
          { required: true, message: "听证摘要只要内容不能为空", trigger: "blur" }
        ],
        hearingResult: [
          { required: true, message: "听证结论及处理意见不能为空", trigger: "blur" }
        ]
      },
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseDoctypeId: this.$route.params.docId, //文书类型ID
        //文书数据
        docData: "",
        status: "", //提交状态
        linkTypeId: this.$route.params.caseLinkTypeId //所属环节的id
      },
      handleType: "", // 0 暂存  1  提交
      dictId: "2dc1e0a3a8ce225c292259da39294847",
      options: [],
      nameLength: 23,
      adressLength: 23,
      maxLength: 23,
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
        pageDomId: "hearingReportDoc-print"
      },
      needDealData: true,
      propertyFeatures: "" //字段属性配置
    };
  },
  computed: {
    ...mapGetters(["caseId"]),
  },
  mixins: [mixinGetCaseApiList],
  inject: ["reload"],
  components: {
    // overflowInput,
    casePageFloatBtns
  },
  methods: {
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId
      };
      console.log(data);
      this.com_getDocDataByCaseIdAndDocId(data);
    },
    //保存文书信息
    saveData(handleType) {
      this.com_addDocData(handleType, "docForm");
    },
    submitData(handleType) {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: this.$route.params.url
      });
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
  },
  mounted() {
    this.getDocDataByCaseIdAndDocId();
    this.isOverStatus();
  }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">

.espacle {
  textarea {
    min-height: 114px !important;
    line-height: 25px !important;
    // margin-top:-4px !important;
    text-indent: 0px !important;
  }
}
#hearingReportDoc-print {
  .overflow_lins_style .span_bg {
    display: block;
  }
  .overflow_lins_textarea
  .overflow_lins_style .overflow_lins .overflow_lins_textarea {
    width: calc(100% - 10px);
    top: 0;
  }
  .illegalFactsTip {
    text-align-last: auto;
  }
  #scenetimeBox .is-required .el-input__inner::-webkit-input-placeholder {
    color: #000;
  }
  .overflow_lins_style .overflow_lins span.overflow_lins_textarea {
    white-space: normal;
    line-height: 23px;
    text-indent: 0;
  }
  .dataTimeReplaceBox {
    position: relative;
    height: 35px;
    .el-form-item__content .el-date-editor--datetime {
      opacity: 0;
      position: absolute;
      z-index: 2;
    }
    .replaceTime {
      position: absolute;
      top: 0;
      left: 10px;
    }
  }
  #hearingSummary_noteDesCon {
    .overflow_lins_textarea {
      padding-top: 1px;
      textarea {
        text-indent: 29em;
        line-height: 25px !important;
        padding-right: 9px;
        padding-left: 5px;
      }
    }
    span.overflow_lins_textarea {
      line-height: 25px;
    }
    .span_bg {
      box-sizing: border-box;
      margin: 3px 0;
      height: 22px;
    }
  }
}
</style>
