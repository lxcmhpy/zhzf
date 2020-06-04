<!-------长软------->
<template>
  <div
    class="print_box printNumbers_box"
    id="compensationNotice-print"
    style="width:790px; margin:0 auto;"
  >
    <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
      <div class="print_info">
        <div class="doc_topic">公路赔（补）偿通知书</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <p class="p_begin">
          当事人：
          <span>
            <el-form-item prop="party" :rules="fieldRules('party',propertyFeatures['party'])">
              <el-input
                :disabled="fieldDisabled(propertyFeatures['party'])"
                v-model="docData.party"
                :maxLength="maxLength"
              ></el-input>
            </el-form-item>
          </span>
          当事人地址：
          <span>
            <el-form-item
              prop="partyAddress"
              :rules="fieldRules('partyAddress',propertyFeatures['partyAddress'])"
            >
              <el-input
                :disabled="fieldDisabled(propertyFeatures['partyAddress'])"
                v-model="docData.partyAddress"
                :maxLength="maxLength"
              ></el-input>
            </el-form-item>
          </span>
        </p>
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item
              prop="caseName"
              :rules="fieldRules('caseName',propertyFeatures['caseName'])"
            >
              <el-input
                class="overflow_lins_textarea"
                style="text-indent:5em"
                type="textarea"
                v-model="docData.caseName"
                rows="3"
                maxlength="90"
                :disabled="fieldDisabled(propertyFeatures['caseName'])"
              ></el-input>
              <span class="overflow_describe" style="text-indent:0 !important">&nbsp;&nbsp;当事人</span>
              <span class="span_bg span_bg_top">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
            </el-form-item>
          </div>
        </div>
        <p class="p_begin">
          <span class="overflow_describe" style="text-indent:0 !important">
            一案，经
            <el-form-item
              prop="organName"
              :rules="fieldRules('organName',propertyFeatures['organName'])"
            >
              <el-input
                :disabled="fieldDisabled(propertyFeatures['organName'])"
                v-model="docData.organName"
                :maxLength="maxLength"
              ></el-input>
            </el-form-item>依法调查核实；
          </span>
        </p>
        <p>
          当事人
          <span>
            <el-form-item prop="party" :rules="fieldRules('party',propertyFeatures['party'])">
              <el-input
                :disabled="fieldDisabled(propertyFeatures['party'])"
                v-model="docData.party"
                :maxLength="maxLength"
              ></el-input>
            </el-form-item>
          </span>于
          <span>
            <el-form-item
              prop="afsj"
              class="pdf_datapick"
              :rules="fieldRules('afsj',propertyFeatures['afsj'])"
            >
              <el-date-picker
                v-model="docData.afsj"
                type="date"
                format="yyyy年MM月dd日"
                placeholder="    年  月  日"
                value-format="yyyy-MM-dd"
                :disabled="fieldDisabled(propertyFeatures['afsj'])"
              ></el-date-picker>
            </el-form-item>
          </span>
        </p>
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item
              prop="factDescription"
              :rules="fieldRules('factDescription',propertyFeatures['factDescription'])"
            >
              <el-input
                class="overflow_lins_textarea"
                style="text-indent:5em"
                type="textarea"
                v-model="docData.factDescription"
                rows="3"
                maxlength="90"
                :disabled="fieldDisabled(propertyFeatures['factDescription'])"
              ></el-input>
              <span class="span_bg span_bg_top">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
            </el-form-item>
          </div>
        </div>
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item
              prop="evidenceMaterial"
              :rules="fieldRules('evidenceMaterial',propertyFeatures['evidenceMaterial'])"
            >
              <el-input
                class="overflow_lins_textarea_two"
                style="text-indent:5em"
                type="textarea"
                v-model="docData.evidenceMaterial"
                rows="3"
                maxlength="90"
                :disabled="fieldDisabled(propertyFeatures['evidenceMaterial'])"
              ></el-input>
              <span class="overflow_describe" style="text-indent:0 !important">&nbsp;&nbsp;上述事实，由</span>
              <span class="span_bg span_bg_top"></span>
            </el-form-item>
          </div>
        </div>
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item
              prop="illegalLaw"
              :rules="fieldRules('illegalLaw',propertyFeatures['illegalLaw'])"
            >
              <el-input
                class="overflow_lins_textarea_three"
                style="text-indent:5em"
                type="textarea"
                v-model="docData.illegalLaw"
                rows="3"
                maxlength="90"
                :disabled="fieldDisabled(propertyFeatures['illegalLaw'])"
              ></el-input>
              <span
                class="overflow_describe"
                style="text-indent:0 !important"
              >予以佐证。本单位认为，当事人违反了交通行政管理规定，依据</span>
              <span class="span_bg span_bg_top">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
            </el-form-item>
          </div>
        </div>
        <p class="p_begin">之规定。本单位依法做出如下公路赔（补）偿处理决定：</p>
        <p>
          当事人赔（补）偿
          <span>
            <el-form-item
              prop="payTotal"
              :rules="fieldRules('payTotal',propertyFeatures['payTotal'])"
            >
              <el-input
                :disabled="fieldDisabled(propertyFeatures['payTotal'])"
                v-model="docData.payTotal"
                type="textarea"
                v-bind:class="{ over_flow:docData.payTotal.length>14?true:false }"
                :autosize="{ minRows: 1, maxRows: 3}"
                :maxLength="maxLength"
              ></el-input>
            </el-form-item>
          </span>。
        </p>
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item
              prop="bank"
              :rules="fieldRules('bank',propertyFeatures['bank'])"
            >
              <el-input
                class="overflow_lins_textarea_three"
                style="text-indent:5em"
                type="textarea"
                v-model="docData.bank"
                rows="3"
                maxlength="90"
                :disabled="fieldDisabled(propertyFeatures['bank'])"
              ></el-input>
              <span
                class="overflow_describe"
                style="text-indent:0 !important"
              >&nbsp;&nbsp;当事人必须在收到本通知书之日起15日内持本通知书到</span>
              <span class="span_bg span_bg_top">&nbsp;</span>
            </el-form-item>缴纳路产赔（补）偿费。
          </div>
        </div>
        <div class="pdf_seal">
          <span>{{docData.organName}}</span>
          <br />
          <el-form-item prop="signatureDate" class="pdf_datapick">
            <el-date-picker
              v-model="docData.signatureDate"
              type="date"
              format="yyyy年MM月dd日"
              placeholder="    年  月  日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </div>
      </div>
    </el-form>

    <!-- 悬浮按钮 -->
    <casePageFloatBtns
      :pageDomId="'compensationNotice-print'"
      :formOrDocData="formOrDocData"
      @submitData="submitData"
      @saveData="saveData"
      @backHuanjie="submitData"
    ></casePageFloatBtns>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import iLocalStroage from "@/common/js/localStroage";

export default {
  components: {
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  data() {
    return {
      docData: {
        caseNumber: "",
        partyAddress: "",
        party: "",
        evidenceMaterial: "",
        illegalLaw: "",
        organName: "",
        factDescription: "",
        afsj: "",
        payTotal: "",
        bank: ""
      },
      tableData: [],
      needDealData: true,
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件id--从流程进入删掉，先写死测试用
        caseDoctypeId: "0c18fe2ebe22e931eec3b0e256362e04",
        //表单数据
        docData: "",
        status: ""
      },
      rules: {
        party: [{ required: true, message: "当事人不能为空", trigger: "blur" }],
        partyAddress: [
          { required: true, message: "地址不能为空", trigger: "blur" }
        ],
        afsj: [
          { required: true, message: "案发时间不能为空", trigger: "blur" }
        ],
        organName: [
          { required: true, message: "立案机构不能为空", trigger: "blur" }
        ],
        evidenceMaterial: [
          { required: true, message: "证据材料不能为空", trigger: "blur" }
        ],
        factDescription: [
          { required: true, message: "事实描述不能为空", trigger: "blur" }
        ],
        payTotal: [
          { required: true, message: "总金额不能为空", trigger: "blur" }
        ],
        illegalLaw: [
          { required: true, message: "违法条款不能为空", trigger: "blur" }
        ],
        payTotal: [
          { required: true, message: "总金额不能为空", trigger: "blur" }
        ],
        caseName: [
          { required: true, message: "案由不能为空", trigger: "blur" }
        ],
        bank: [{ required: true, message: "银行不能为空", trigger: "blur" }]
      },
      nameLength: 23,
      adressLength: 23,
      maxLength: 23,
      maxLengthOverLine: 122,
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: "compensationNotice-print"
      },
      addVisible: false,
      addLoading: false,
      tableDatas: [],
      propertyFeatures: "" //字段属性配置
    };
  },

  methods: {
    //对原始数据做一下处理
    getDataAfter() {
      //this.docData.organName = iLocalStroage.gets("userInfo").organName;
      let params = { id: iLocalStroage.gets("userInfo").organId };
      let _this = this;
      this.$store.dispatch("getOrganDetail", params).then(
        res => {
          let organData = res.data;
          _this.docData.organName = organData.name || "";
          console.log("bank", organData.bank);
          _this.docData.bank =
            organData.bank == null ? "测试银行" : organData.bank;
          console.log("bank", _this.docData.bank);
        },
        err => {
          console.log(err);
        }
      );
      if (this.docData.payTotal) this.combined(this.docData.payTotal);
    },
    //将金额转换为大写(小写)
    combined(val) {
      let buffer = val;
      if (buffer === 0 || buffer == null) {
        this.docData.payTotal = "零" + "（" + val + "）";
      } else {
        let unit = "仟佰拾亿仟佰拾万仟佰拾圆角分";
        let str = "";
        buffer += "00";
        const p = buffer.indexOf(".");
        if (p >= 0) {
          buffer = buffer.substring(0, p) + buffer.substr(p + 1, 2);
        }
        unit = unit.substr(unit.length - buffer.length);
        for (let i = 0; i < buffer.length; i++) {
          str +=
            "零壹贰叁肆伍陆柒捌玖".charAt(buffer.charAt(i)) + unit.charAt(i);
        }
        this.docData.payTotal =
          str
            .replace(/零(仟|佰|拾|角)/g, "零")
            .replace(/(零)+/g, "零")
            .replace(/零(万|亿|圆)/g, "$1")
            .replace(/(亿)万|壹(拾)/g, "$1$2")
            .replace(/^圆零?|零分/g, "")
            .replace(/圆$/g, "圆") +
          "（" +
          val +
          "）";
      }
      console.log("金额", this.docData.payTotal);
    },

    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      let data = {
        caseId: "408efab9b0975f9815c71947d45e60f0", //流程里的案件id
        // caseId: '', //先写死
        docId: "0c18fe2ebe22e931eec3b0e256362e04"
      };
      this.com_getDocDataByCaseIdAndDocId(data);
    },
    // 多行编辑
    overFlowEdit() {
      this.$refs.overflowInputRef.showModal(0, "", this.maxLengthOverLine);
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

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },
  mounted() {},
  created() {
    this.isOverStatus();
    this.getDocDataByCaseIdAndDocId();
  }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">
#compensationNotice-print {
  .overflow_lins_style .overflow_lins span.overflow_lins_textarea {
    text-indent: 0;
  }
  .overflow_lins_textarea {
    & > textarea {
      text-indent: 5em;
    }
  }

  .overflow_lins_style .overflow_lins span.overflow_lins_textarea_two {
    text-indent: 0;
  }
  .overflow_lins_textarea_two {
    & > textarea {
      text-indent: 8em;
    }
  }

  .overflow_lins_style .overflow_lins span.overflow_lins_textarea_three {
    text-indent: 0;
  }
  .overflow_lins_textarea_three {
    & > textarea {
      text-indent: 28em;
    }
  }
}
</style>
