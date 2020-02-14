<template>
  <div class="print_box">
    <div class="print_info indent_style" id="illegalAction_print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="formData">
        <div class="doc_topic">违法行为通知书</div>
        <div class="doc_number">案号：{{formData.caseNumber}}</div>
        <p class="side_right_indent">
          当事人（个人姓名或单位名称）：
          <el-form-item prop="party">
            <el-input
              type="textarea"
              v-model="formData.party"
              v-bind:class="{ over_flow:formData.party.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 2}"
              :maxLength="maxLength"
              disabled
            ></el-input>
            <!-- <el-input v-model="docData.illegalLaw" :maxLength='maxLength' :maxLength='maxLength'></el-input> -->
          </el-form-item>
        </p>
        <p>
          &nbsp;&nbsp;经调查，本机关认为你（单位）
          <span>
            <el-form-item prop="caseCauseNameCopy">
              <el-input
                type="textarea"
                v-model="formData.caseCauseNameCopy"
                v-bind:class="{ over_flow:formData.party && formData.caseCauseNameCopy.length>14?true:false }"
                :autosize="{ minRows: 1, maxRows: 2}"
                :maxLength="maxLength"
              ></el-input>
            </el-form-item>
          </span>行为，违反了
          <span>
            <el-form-item prop="illegalBasis">
              <el-input
                type="textarea"
                v-model="formData.illegalBasis"
                v-bind:class="{ over_flow:formData.illegalBasis && formData.illegalBasis.length>14?true:false }"
                :autosize="{ minRows: 1, maxRows: 2}"
                :maxLength="maxLength"
              ></el-input>
            </el-form-item>
          </span>的规定，依据
          <span>
            <el-form-item prop="punishLaw">
              <el-input type="textarea" v-model="formData.punishLaw" v-bind:class="{ over_flow:formData.punishLaw && formData.punishLaw.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 2}" :maxLength="maxLength"></el-input>
            </el-form-item>
          </span>的规定，本机关拟作出
          <span>
            <el-form-item prop="punishDecision">
              <el-input type="textarea" v-model="formData.punishDecision" v-bind:class="{ over_flow:formData.punishDecision && formData.punishDecision.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 2}" :maxLength="maxLength"></el-input>
            </el-form-item>
          </span>的处罚决定。
        </p>
        <p>
          &nbsp;&nbsp;
          <el-checkbox></el-checkbox>根据《中华人民共和国行政处罚法》第三十一条、第三十二条的规定，你（单位）如对该处罚意见有异议，可向本机关提出陈述申辩，本机关将依法予以核实。
        </p>
        <p>
          &nbsp;&nbsp;
          <el-checkbox></el-checkbox>根据《中华人民共和国行政处罚法》第四十二条的规定，你（单位）有权在收到本通知书之日起三日内向本机关要求举行听证；逾期不要求举行听证的，视为你（单位）放弃听证的权利。
        </p>
        <p>（注：在序号前□内打“√”的为当事人享有该权利。）</p>
        <br />
        <el-row>
          <el-col :span="12">
            <p>
              联系地址：
              <el-form-item v-if="!lineStyleFlag" prop="partyAddress" style="width:180px">
                <el-input
                  type="textarea"
                  v-model="formData.partyAddress"
                  v-bind:class="{ over_flow:formData.partyAddress.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxLength="maxLength"
                  placeholder="\"
                ></el-input>
              </el-form-item>
              <u v-if="lineStyleFlag">{{formData.partyAddress}}</u>
            </p>
          </el-col>
          <el-col :span="12">
            <p>
              邮编：
              <el-form-item v-if="!lineStyleFlag" prop="partyZipCode" style="width:210px">
                <el-input
                  type="textarea"
                  v-model="formData.partyZipCode "
                  v-bind:class="{ over_flow:formData.partyZipCode .length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxLength="maxLength"
                  placeholder="\"
                ></el-input>
              </el-form-item>
              <u v-if="lineStyleFlag">{{formData.partyZipCode }}</u>
            </p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <p>
              联系人：
              <el-form-item v-if="!lineStyleFlag" prop="party" style="width:200px">
                <el-input
                  type="textarea"
                  v-model="formData.party"
                  v-bind:class="{ over_flow:formData.party.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxLength="maxLength"
                  placeholder="\"
                  disabled
                ></el-input>
              </el-form-item>
              <u v-if="lineStyleFlag">{{formData.party}}</u>
            </p>
          </el-col>
          <el-col :span="12">
            <p>
              联系电话：
              <el-form-item v-if="!lineStyleFlag" prop="partyTel" style="width:180px">
                <el-input
                  type="textarea"
                  v-model="formData.partyTel"
                  v-bind:class="{ over_flow:formData.partyTel.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxLength="maxLength"
                  placeholder="\"
                ></el-input>
              </el-form-item>
              <u v-if="lineStyleFlag">{{formData.partyTel}}</u>
            </p>
          </el-col>
        </el-row>
        <div class="pdf_seal">
          <span>交通运输执法部门(印章)</span>
          <br />
          <el-form-item prop="makeDate" class="pdf_datapick">
            <el-date-picker
              v-model="formData.makeDate"
              type="date"
              format="yyyy年MM月dd日"
              placeholder="    年  月  日"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="notice clear">
          <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
        </div>
      </el-form>
    </div>

    <casePageFloatBtns
      :pageDomId="'illegalAction_print'"
      :formOrDocData="formOrDocData"
      @saveData="saveData"
    ></casePageFloatBtns>
    <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput>
  </div>
</template>


<script>
import { mixinGetCaseApiList } from "@/js/mixins";
import { mapGetters } from "vuex";
import overflowInput from "../modle/overflowInput";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import { validatePhone, validateZIP } from "@/js/validator";

export default {
  data() {
    return {
      formData: {
        caseNumber: "",
        party: "",
        caseCauseNameCopy: "",
        illegalBasis: "",
        punishLaw: "",
        punishDecision: "",
        partyAddress: "",
        partyZipCode: "",
        partyTel: "",
        checkBoxList: "",
        makeDate: ""
      },
      rules: {
        party: [
          { required: true, message: "当事人姓名必须填写", trigger: "blur" }
        ],
        caseCauseNameCopy: [
          { required: true, message: "必须填写", trigger: "blur" }
        ],
        illegalBasis: [
          { required: true, message: "必须填写", trigger: "blur" }
        ],
        punishLaw: [
          { required: true, message: "必须填写", trigger: "blur" }
        ],
        punishDecision: [
          { required: true, message: "必须填写", trigger: "blur" }
        ],
        partyTel:[
          { validator: validatePhone, trigger: "blur" }
        ],
        partyZipCode:[
          { validator: validateZIP, trigger: "blur" }
        ],
      },
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件id
        caseLinktypeId: "2c9029ee6cac9281016caca8ea500003", //表单类型ID
        //表单数据
        formData: "",
        status: ""
      },
      maxLength: 23,
      lineStyleFlag: false,
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
        pageDomId: "illegalAction_print",
        isHuanjie: true
      },
      huanjieAndDocId: "2c9029ca5b71686d015b719fe0900026" //违法行为通知书的文书id
    };
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  components: {
    overflowInput,
    casePageFloatBtns
  },
  methods: {
    // 多行编辑
    overFlowEdit() {
      let maxlength = 122;
      this.$refs.overflowInputRef.showModal(0, "", maxlength);
    },
    // 获取多行编辑内容
    getOverFloeEditInfo(edit) {
      this.formData.illegalFact = edit;
    },
    setData() {
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(
        this.caseLinkDataForm.caseBasicinfoId,
        this.caseLinkDataForm.caseLinktypeId,
        false
      );
    },
    // 提交表单
    submitDataIllegal(handleType) {},
    saveData(handleType) {
      //参数  提交类型 、
      this.com_submitCaseForm(handleType, "docForm", true);
    },
    // 盖章
    makeSeal() {
      signature.openURL("oeder");
    },
    // 打印
    print() {
      console.log("打印!");
    }
  },
  created() {
    this.setData();
  }
};
</script>
<style lang="less">
@import "../../../../css/caseHandle/caseDocModle.less";
</style>
