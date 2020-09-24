<template>
  <div class="print_box" id="askRecordBox">
    <el-form
      :rules="rules"
      ref="docForm"
      :inline-message="true"
      :inline="true"
      :model="docData"
      label-width="80px"
    >
      <div class="print_info indent_style" id="question_print">
        <div class="doc_topic">询问笔录</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <span class="datapick_style">
          <p>
            时间：
            <el-form-item
              prop="askdataStart"
              class="pdf_datapick"
              id="askModelDataTimeBox"
              :rules="fieldRules('askdataStart',propertyFeatures['askdataStart'])"
            >
              <el-date-picker
                v-model="docData.askdataStart"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm"
                placeholder=" 年 月 日 时 分"
                format="yyyy年MM月dd日HH时mm分"
                :disabled="fieldDisabled(propertyFeatures['askdataStart'])"
              ></el-date-picker>
              <el-input class="replaceTime" placeholder=" 年 月 日 时 分" v-model="docData.askdataStart"></el-input>
            </el-form-item>至
            <el-form-item
              prop="askdataEnd"
              class="pdf_datapick"
              style="width:100px"
              :rules="fieldRules('askdataEnd',propertyFeatures['askdataEnd'])"
            >
              <el-time-picker
                placeholder="时 分"
                v-model="docData.askdataEnd"
                format="HH时mm分"
                value-format="HH:mm"
                :disabled="fieldDisabled(propertyFeatures['askdataEnd'])"
              ></el-time-picker>
            </el-form-item>

            <span style="margin-left:50px">第</span>
            <el-form-item
              class="askRecordNumberBox"
              style="width:90px"
              prop="askRecordNumber"
              :rules="fieldRules('askRecordNumber',propertyFeatures['askRecordNumber'])"
            >
              <el-input
                v-model="docData.askRecordNumber"
                maxlength="2"
                placeholder="\"
                :disabled="fieldDisabled(propertyFeatures['askRecordNumber'])"
              ></el-input>
            </el-form-item>次询问
          </p>
          <p>
            地点：
            <el-form-item
              v-if="!lineStyleFlag"
              prop="inquiryAddress"
              class="inquiryAddressBox"
              style="width:570px"
              :rules="fieldRules('inquiryAddress',propertyFeatures['inquiryAddress'])"
            >
              <el-input
                v-model="docData.inquiryAddress"
                maxlength="40"
                placeholder="\"
                :disabled="fieldDisabled(propertyFeatures['inquiryAddress'])"
              ></el-input>
            </el-form-item>
            <u v-if="lineStyleFlag">{{docData.inquiryAddress}}</u>
          </p>
          <el-row>
            <el-col :span="12">
              <p>
                询问人：
                <el-form-item
                  v-if="!lineStyleFlag"
                  prop="inquiryStaff"
                  class="width212"
                  :rules="fieldRules('inquiryStaff',propertyFeatures['inquiryStaff'])"
                >
                  <!-- <el-input type='textarea' v-model="docData.inquiryStaff" v-bind:class="{ over_flow:docData.inquiryStaff.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input> -->
                  <!-- <el-input type='textarea' v-model="docData.inquiryStaff" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input> -->
                  <el-select
                    v-model="docData.inquiryStaff"
                    :maxLength="maxLength"
                    :disabled="fieldDisabled(propertyFeatures['inquiryStaff'])"
                  >
                    <el-option
                      v-for="(item,index) in staffList"
                      :key="index"
                      :value="item"
                      :label="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <u v-if="lineStyleFlag">{{docData.inquiryStaff}}</u>
              </p>
            </el-col>
            <el-col :span="12">
              <p>
                记录人：
                <el-form-item
                  v-if="!lineStyleFlag"
                  prop="recordStaff"
                  style="width:246px"
                  :rules="fieldRules('recordStaff',propertyFeatures['recordStaff'])"
                >
                  <!-- <el-input type='textarea' v-model="docData.recordStaff" v-bind:class="{ over_flow:docData.recordStaff.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input> -->
                  <!-- <el-input type='textarea' v-model="docData.recordStaff" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input> -->
                  <el-select
                    v-model="docData.recordStaff"
                    :maxLength="maxLength"
                    :disabled="fieldDisabled(propertyFeatures['recordStaff'])"
                  >
                    <el-option
                      v-for="(item,index) in staffList"
                      :key="index"
                      :value="item"
                      :label="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <u v-if="lineStyleFlag">{{docData.recordStaff}}</u>
              </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p>
                被询问人：
                <el-form-item
                  v-if="!lineStyleFlag"
                  prop="inquiried"
                  class="width188"
                  :rules="fieldRules('inquiried',propertyFeatures['inquiried'])"
                >
                  <!-- <el-input type='textarea' v-model="docData.inquiried" v-bind:class="{ over_flow:docData.inquiried.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input> -->
                  <el-input
                    type="textarea"
                    v-model="docData.inquiried"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    :maxLength="maxLength"
                    placeholder="\"
                    :disabled="fieldDisabled(propertyFeatures['inquiried'])"
                  ></el-input>
                </el-form-item>
                <u v-if="lineStyleFlag">{{docData.inquiried}}</u>
              </p>
            </el-col>
            <el-col :span="12">
              <p>
                与案件关系：
                <!-- <el-form-item v-if="!lineStyleFlag" prop="inquiriedRelation" class="width182">

                  <el-input type='textarea' v-model="docData.inquiriedRelation" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input>
                </el-form-item>-->
                <el-form-item
                  prop="inquiriedRelation"
                  style="width:209px"
                  :rules="fieldRules('inquiriedRelation',propertyFeatures['inquiriedRelation'])"
                >
                  <el-select
                    v-model="docData.inquiriedRelation"
                    @change="changeRelationWithCase"
                    :disabled="fieldDisabled(propertyFeatures['inquiriedRelation'])"
                  >
                    <!-- <el-option v-for="item in allRelationWithCase" :key="item.value" :label="item.label" :value="item.label"></el-option> -->
                    <el-option
                      v-for="item in allRelationWithCase"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <!-- <u v-if="lineStyleFlag">{{docData.inquiriedRelation}}</u> -->
              </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p>
                性别：
                <el-form-item
                  v-if="!lineStyleFlag"
                  prop="inquiriedSex"
                  class="width228"
                  :rules="fieldRules('inquiriedSex',propertyFeatures['inquiriedSex'])"
                >
                  <!-- <el-input type='textarea' v-model="docData.inquiriedSex" v-bind:class="{ over_flow:docData.inquiriedSex.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input> -->
                  <!-- <el-input type='textarea' v-model="docData.inquiriedSex" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input> -->
                  <el-select
                    v-model.number="docData.inquiriedSex"
                    :maxLength="maxLength"
                    placeholder="\"
                    :disabled="fieldDisabled(propertyFeatures['inquiriedSex'])"
                  >
                    <el-option :value="0" label="男"></el-option>
                    <el-option :value="1" label="女"></el-option>
                  </el-select>
                </el-form-item>
                <u v-if="lineStyleFlag">{{docData.inquiriedSex}}</u>
              </p>
            </el-col>
            <el-col :span="12">
              <p>
                年龄：
                <el-form-item
                  v-if="!lineStyleFlag"
                  prop="inquiriedAge"
                  style="width:262px"
                  :rules="fieldRules('inquiriedAge',propertyFeatures['inquiriedAge'])"
                >
                  <!-- <el-input type='textarea' v-model="docData.inquiriedAge" v-bind:class="{ over_flow:docData.inquiriedAge.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input> -->
                  <el-input
                    type="textarea"
                    v-model="docData.inquiriedAge"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    :maxLength="maxLength"
                    placeholder="\"
                    :disabled="fieldDisabled(propertyFeatures['inquiriedAge'])"
                  ></el-input>
                </el-form-item>
                <u v-if="lineStyleFlag">{{docData.inquiriedAge}}</u>
              </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p>
                身份证件号：
                <el-form-item
                  v-if="!lineStyleFlag"
                  prop="inquiriedIdNo"
                  class="width180"
                  :rules="fieldRules('inquiriedIdNo',propertyFeatures['inquiriedIdNo'],validateIDNumber)"
                >
                  <el-input
                    type="textarea"
                    v-model="docData.inquiriedIdNo"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    :maxLength="maxLength"
                    placeholder="\"
                    :disabled="fieldDisabled(propertyFeatures['inquiriedIdNo'])"
                  ></el-input>
                </el-form-item>
                <u v-if="lineStyleFlag">{{docData.inquiriedIdNo}}</u>
              </p>
            </el-col>
            <el-col :span="12">
              <p>
                联系电话：
                <el-form-item
                  v-if="!lineStyleFlag"
                  prop="inquiriedTel"
                  style="width:230px"
                  :rules="fieldRules('inquiriedTel',propertyFeatures['inquiriedTel'],validatePhone)"
                >
                  <el-input
                    type="textarea"
                    v-model="docData.inquiriedTel"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    :maxLength="maxLength"
                    placeholder="\"
                    :disabled="fieldDisabled(propertyFeatures['inquiriedTel'])"
                  ></el-input>
                </el-form-item>
                <u v-if="lineStyleFlag">{{docData.inquiriedTel}}</u>
              </p>
            </el-col>
          </el-row>
          <p>
            工作单位及职务：
            <el-form-item
              v-if="!lineStyleFlag"
              prop="inquiriedUnitPosition"
              class="inquiriedUnitPositionBox"
              :rules="fieldRules('inquiriedUnitPosition',propertyFeatures['inquiriedUnitPosition'])"
            >
              <el-input
                type="textarea"
                v-model="docData.inquiriedUnitPosition"
                :autosize="{ minRows: 1, maxRows: 3}"
                :maxLength="maxLength"
                placeholder="\"
                :disabled="fieldDisabled(propertyFeatures['inquiriedUnitPosition'])"
              ></el-input>
            </el-form-item>
            <u v-if="lineStyleFlag">{{docData.inquiriedUnitPosition}}</u>
          </p>
          <p>
            联系地址：
            <el-form-item
              v-if="!lineStyleFlag"
              prop="inquiriedAddress"
              class="inquiriedAddressBox"
              :rules="fieldRules('inquiriedAddress',propertyFeatures['inquiriedAddress'])"
            >
              <el-input
                type="textarea"
                v-model="docData.inquiriedAddress"
                :autosize="{ minRows: 1, maxRows: 3}"
                :maxLength="maxLength"
                placeholder="\"
                :disabled="fieldDisabled(propertyFeatures['inquiriedAddress'])"
              ></el-input>
            </el-form-item>
            <u v-if="lineStyleFlag">{{docData.inquiriedAddress}}</u>
          </p>
          <p>
            我们是
            <el-form-item
              v-if="!lineStyleFlag"
              prop="organName"
              :rules="fieldRules('organName',propertyFeatures['organName'])"
            >
              <el-input
                type="textarea"
                v-model="docData.organName"
                :autosize="{ minRows: 1, maxRows: 3}"
                :maxLength="maxLength"
                placeholder="\"
                :disabled="fieldDisabled(propertyFeatures['organName'])"
              ></el-input>
            </el-form-item>
            <u v-if="lineStyleFlag">{{docData.organName}}</u>
            的执法人员
            <el-form-item
              v-if="!lineStyleFlag"
              prop="staff1"
              style="width:100px"
              :rules="fieldRules('staff1',propertyFeatures['staff1'])"
            >
              <!-- <el-input
                type="textarea"
                v-model="docData.staff1"
                :autosize="{ minRows: 1, maxRows: 3}"
                :maxLength="maxLength"
                placeholder="\"
                :disabled="fieldDisabled(propertyFeatures['staff1'])"
              ></el-input> -->
               <el-select
                v-model="docData.staff1"
                :maxLength="maxLength"
                @change="changeStaff1"
                :disabled="fieldDisabled(propertyFeatures['staff1'])"
              >
                <el-option
                  v-for="(item,index) in staffList"
                  :key="index"
                  :value="item"
                  :label="item"
                  :disabled="docData.staff2==item"
                ></el-option>
              </el-select>
            </el-form-item>
            <u v-if="lineStyleFlag">{{docData.staff1}}</u>、
            <el-form-item
              v-if="!lineStyleFlag"
              prop="staff2"
              style="width:100px"
              :rules="fieldRules('staff2',propertyFeatures['staff2'])"
            >
              <!-- <el-input type='textarea' v-model="docData.staff2" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input> -->
              <el-select
                v-model="docData.staff2"
                :maxLength="maxLength"
                @change="changeStaff2"
                :disabled="fieldDisabled(propertyFeatures['staff2'])"
              >
                <el-option
                  v-for="(item,index) in staffList"
                  :key="index"
                  :value="item"
                  :label="item"
                  :disabled="docData.staff1==item"
                ></el-option>
              </el-select>
            </el-form-item>
            <u v-if="lineStyleFlag">{{docData.staff2}}</u>，
            这是我们的执法证件，执法证号分别是
            <el-form-item
              v-if="!lineStyleFlag"
              prop="certificateId1"
              :rules="fieldRules('certificateId1',propertyFeatures['certificateId1'])"
              style="width:170px"
            >
              <el-input
                type="textarea"
                v-model="docData.certificateId1"
                :autosize="{ minRows: 1, maxRows: 3}"
                :maxLength="maxLength"
                placeholder="\"
                :disabled="fieldDisabled(propertyFeatures['certificateId1'])"
              ></el-input>
            </el-form-item>
            <u v-if="lineStyleFlag">{{docData.certificateId1}}</u>、
            <el-form-item
              v-if="!lineStyleFlag"
              prop="certificateId2"
              :rules="fieldRules('certificateId2',propertyFeatures['certificateId2'])"
              style="width:170px"
            >
              <el-input
                type="textarea"
                v-model="docData.certificateId2"
                :autosize="{ minRows: 1, maxRows: 3}"
                :maxLength="maxLength"
                placeholder="\"
                :disabled="fieldDisabled(propertyFeatures['certificateId2'])"
              ></el-input>
            </el-form-item>
            <u v-if="lineStyleFlag">{{docData.certificateId2}}</u>，请你确认。现依法向你询问，请如实回答所问问题。执法人员与你有直接利害关系的，你可以申请回避。
          </p>
          <span v-for="(item, index) in docData.qaList" :key="item.id" @click="QAModleEdit">
            <p class="side_right_indent" @click="QAModleEdit">
              <span class="side_right" @click="overFlowEdit">
                <el-form-item prop="illegalFactsEvidence">
                  <span class="over_topic">问{{index+1}}：</span>
                  {{item.question}}
                </el-form-item>
              </span>
              <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
            </p>
            <p class="side_right_indent">
              <span class="side_right" @click="overFlowEdit">
                <el-form-item prop="illegalFactsEvidence">
                  <span class="over_topic">答{{index+1}}：</span>
                  {{item.answer}}
                </el-form-item>
              </span>
              <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
              <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
            </p>
          </span>

          <span class="span_bg">{{docData.QAModleInfo}}</span>
          <br />
          <el-row :gutter="20">
            <el-col :span="12">
              被询问人签名：
              <span class="write_line width250"></span>
            </el-col>
            <el-col :span="12">
              询问人签名：
              <span class="write_line width250"></span>
            </el-col>
          </el-row>
        </span>
      </div>
    </el-form>

    <casePageFloatBtns
      :pageDomId="'question_print'"
      :formOrDocData="formOrDocData"
      @submitData="submitData"
      @saveData="saveData"
      @backHuanjie="submitData"
    ></casePageFloatBtns>
    <QAModle ref="QAModleInfoRef" @QAModleInfo="getQAModleInfo"></QAModle>
  </div>
</template>
<script>
import QAModle from "./QAModle";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import iLocalStroage from "@/common/js/localStroage";
import { validateIDNumber, validatePhone } from "@/common/js/validator";

import { findCaseAllBindPropertyApi } from "@/api/caseHandle";
export default {
  components: {
    QAModle,
    casePageFloatBtns,
  },
  data() {
    //验证开始时间
    var validateStartTime = (rule, value, callback) => {
      let parseInquestStartTime = this.docData.askdataStart
        .replace("年", "-")
        .replace("月", "-")
        .replace("日", " ")
        .replace("时", ":")
        .replace("分", "");
      let a = parseInquestStartTime.split(" ");
      let parseinquestEndTime = a[0] + " " + this.docData.askdataEnd;

      if (
        Date.parse(parseInquestStartTime) > Date.parse(parseinquestEndTime) &&
        this.docData.askdataEnd
      ) {
        this.$message({
          showClose: true,
          message: "开始时间不得大于结束时间",
          type: "error",
          offset: 100,
          customClass: "validateErrorTip",
        });
        return callback(new Error("开始时间不得大于结束时间"));
      }
      if (Date.parse(parseInquestStartTime) > Date.parse(new Date())) {
        this.docData.askdataStart = "";
        this.$message({
          showClose: true,
          message: "开始时间不得大于当前时间",
          type: "error",
          offset: 100,
          customClass: "validateErrorTip",
        });
        return callback(new Error("开始时间不得大于当前时间"));
      }
      if (Date.parse(parseinquestEndTime) > Date.parse(new Date())) {
        this.$message({
          showClose: true,
          message: "结束时间不得大于当前时间",
          type: "error",
          offset: 100,
          customClass: "validateErrorTip",
        });
        this.docData.askdataEnd = "";
        return callback(new Error("结束时间不得大于当前时间"));
      }
      callback();
    };
    return {
      validatePhone: validatePhone,
      validateIDNumber: validateIDNumber,
      value2: "",
      isOverflow: false,
      isOverLine: false,
      maxLength: "14",
      docData: {
        caseNumber: "",
        askRecordNumber: "",
        party: "",
        partyIdNo: "",
        partyAddress: "",
        partyTel: "",
        partyName: "",
        partyUnitAddress: "",
        partyUnitTel: "",
        partyManager: "",
        punishLaw: "",
        socialCreditCode: "",
        illegalFactsEvidence: "",
        reconsiderationOrgan: "",
        test: "",
        QAModleInfo: "",
        inquiryIndex: "",
        inquiryAddress: "",
        inquiriedSex: "",
        inquiried: "",
        inquiryStaff: "",
        recordStaff: "",
        inquiriedRelation: "",
        inquiriedAge: "",
        inquiriedTel: "",
        inquiriedIdNo: "",
        inquiriedUnitPosition: "",
        organName: "",
        inquiriedAddress: "",
        staff1: "",
        staff2: "",
        certificateId1: "",
        certificateId2: "",
        askTime: 1,
        qaList: [], //弹出框问答数组，如请求时未返回即数组未定义，可能回显失败，刷新即可查看效果
        askdataStart: "",
        askdataEnd: "",
        staffId: "", //执法人员id
      },
      qaList: [
        { question: "", answer: "" },
        { question: "", answer: "" },
      ],
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseDoctypeId: this.$route.params.docId, //文书类型ID
        //文书数据
        docData: "",
        status: "", //提交状态
        note: "", //文书名字
        docDataId: "", //多份文书的id
        linkTypeId: this.$route.params.caseLinkTypeId, //所属环节的id
      },
      num4: 1,
      lineStyleFlag: false,
      name: "",
      inputInfo: "",
      inputInfos: "",
      illegalFactsEvidence: "",
      value1: "",
      rules: {
        askdataStart: [
          { required: true, message: "开始时间不能为空", trigger: "blur" },
          { validator: validateStartTime, trigger: "blur" },
        ],
        askdataEnd: [
          { required: true, message: "结束时间不能为空", trigger: "blur" },
          { validator: validateStartTime, trigger: "blur" },
        ],
        askRecordNumber: [
          { required: true, message: "询问次数不能为空", trigger: "blur" },
        ],
        inquiryAddress: [
          { required: true, message: "地点不能为空", trigger: "blur" },
        ],
        inquiryStaff: [
          { required: true, message: "询问人不能为空", trigger: "blur" },
        ],
        recordStaff: [
          { required: true, message: "记录人不能为空", trigger: "change" },
        ],
        inquiried: [
          { required: true, message: "被询问人不能为空", trigger: "blur" },
        ],
        inquiriedRelation: [
          { required: true, message: "与案件关系不能为空", trigger: "blur" },
        ],
        inquiriedSex: [
          { required: true, message: "性别不能为空", trigger: "change" },
        ],
        inquiriedAge: [
          { required: true, message: "年龄不能为空", trigger: "blur" },
        ],
        inquiriedIdNo: [
          { required: true, message: "身份证件号不能为空", trigger: "blur" },
          { validator: validateIDNumber, trigger: "blur" },
        ],
        inquiriedTel: [
          { required: true, message: "联系电话不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" },
        ],
        inquiriedUnitPosition: [
          {
            required: true,
            message: "工作单位及职务不能为空",
            trigger: "blur",
          },
        ],
        inquiriedAddress: [
          { required: true, message: "联系地址不能为空", trigger: "blur" },
        ],
        organName: [
          { required: true, message: "执法机构不能为空", trigger: "blur" },
        ],

        staff1: [
          { required: true, message: "执法人员不能为空", trigger: "blur" },
        ],
        staff2: [
          { required: true, message: "执法人员不能为空", trigger: "blur" },
        ],
        certificateId1: [
          { required: true, message: "执法证号不能为空", trigger: "blur" },
        ],
        certificateId2: [
          { required: true, message: "执法证号不能为空", trigger: "blur" },
        ],
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
          false,
        ], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        pageDomId: "question_print",
      },
      allRelationWithCase: [
        //与案件关系下拉框
        // { value: "0", label: "当事人" },
        // { value: "1", label: "驾驶人" },
        // { value: "2", label: "实际所有者" },
        // { value: "3", label: "证人" },
        // { value: "4", label: "承运人" },
        // { value: "5", label: "代理人" }
      ],
      staffList: [],
      needDealData: true,
      propertyFeatures: "", //字段属性配置
    };
  },
  inject: ["reload"],
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId", "currentFileData"]) },
  methods: {
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId,
      };
      console.log("询问笔录数据", data);
      //有多份询问笔录时，如果点击添加获取案件信息，如果点击的时查看，则根据id获取文书详情
      let addMoreData = JSON.parse(this.$route.params.addMoreData);
      console.log("询问笔录", addMoreData.askData);

      if (
        addMoreData.handelType == "isAddMore" &&
        !iLocalStroage.get("currentDocDataId")
      ) {
        //设置询问笔录名称
        console.log("添加");
        let myPeopleType =
          addMoreData.askData.peopleAndRelationType == "以上均不是"
            ? addMoreData.askData.otherPeopleRelation
            : addMoreData.askData.peopleType;
        this.caseDocDataForm.note =
          "询问笔录（" +
          myPeopleType +
          ")(第" +
          addMoreData.askData.askNum +
          "次)";
        this.com_getCaseBasicInfo(data.caseId, data.docId);
      } else {
        let currentDocDataId = iLocalStroage.get("currentDocDataId")||this.currentFileData.docDataId;
        if (currentDocDataId) {
          this.getDocDetailById(currentDocDataId);
        } else {
          this.getDocDetailById(this.$route.params.docDataId);
        }
      }
      if(addMoreData.askData){
            this.docData.inquiriedRelation = addMoreData.askData.otherPeopleRelation;
      }
      // this.getDocDetailById(this.$route.params.docDataId)

      this.docData.qaList.push({
        question: "",
        answer: "",
        key: "",
      });
    },
    addDocData(handleType) {
      this.com_addDocData(handleType);
      // this.$store.dispatch("deleteTabs", this.$route.name);//关闭当前页签
      // this.$router.push({
      //   name: this.$route.params.url,
      // });
    },

    // 问答编辑
    QAModleEdit() {
      this.$refs.QAModleInfoRef.showModal(this.qaList);
    },
    // 获取问答内容决定执行
    getQAModleInfo(edit) {
      console.log("回显", edit);
      this.docData.qaList = JSON.parse(edit);

      if (this.docData.qaList.length < 2) {
        this.docData.qaList.push({ question: "", answer: "" });
      }

      // this.docData.QAModleInfo = edit;
    },
    overFlowEdit() {},

    //保存文书信息
    saveData(handleType) {
      this.com_addDocData(handleType, "docForm");
    },
    submitData(handleType) {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: this.$route.params.url,
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
          true,
        ]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    },
    //更改与案件关系
    changeRelationWithCase(val) {
      if (val == "0" || val == "当事人") {
        //为当事人
        this.docData.inquiried = this.docData.party;
        this.docData.inquiriedSex = Number(this.docData.partySex);
        this.docData.inquiriedAge = this.docData.partyAge;
        this.docData.inquiriedIdNo = this.docData.partyIdNo;
        this.docData.inquiriedTel = this.docData.partyTel;
        this.docData.inquiriedAddress = this.docData.partyAddress;
        this.docData.inquiriedUnitPosition = this.docData.partyUnitPosition;
      } else {
        this.docData.inquiried = "";
        this.docData.inquiriedSex = "";
        this.docData.inquiriedAge = "";
        this.docData.inquiriedIdNo = "";
        this.docData.inquiriedTel = "";
        this.docData.inquiriedUnitPosition = "";
        this.docData.inquiriedAddress = "";
      }
    },
    //更改执法人员1
    changeStaff1(val) {
      let staffIndex = this.staffList.indexOf(val);
      this.docData.certificateId1 = this.docData.certificateId.split(",")[
        staffIndex
      ];
      console.log(staffIndex);
    },
    //更改执法人员2
    changeStaff2(val) {
      console.log(this.staffList.indexOf(val))
      let staffIndex = this.staffList.indexOf(val);
      this.docData.certificateId2 = this.docData.certificateId.split(",")[
        staffIndex
      ];
      console.log(staffIndex);
    },
    getDataAfter() {
      this.staffList = this.docData.staff.split(",");
      this.docData.staff1 = this.staffList[0];
      this.docData.staff2 = this.staffList[1];
      this.docData.certificateId1 = this.docData.certificateId.split(",")[0];
      this.docData.certificateId2 = this.docData.certificateId.split(",")[1];
      //询问人默认填写文书的人
      this.docData.inquiryStaff = iLocalStroage.gets("userInfo").nickName;
      this.docData.organName = iLocalStroage.gets("userInfo").organName;
      //与案件关系默认为当事人
      // this.docData.inquiriedRelation = "0";
      // this.docData.inquiried = this.docData.party;
      // this.docData.inquiriedSex = Number(this.docData.partySex);
      // this.docData.inquiriedAge = this.docData.partyAge;
      // this.docData.inquiriedIdNo = this.docData.partyIdNo;
      // this.docData.inquiriedTel = this.docData.partyTel;
      // this.docData.inquiriedUnitPosition = this.docData.partyUnitPosition;
      // let addMoreData = JSON.parse(this.$route.params.addMoreData);
      // console.log('addMoreData',addMoreData);
      this.setDataForPelple();
      //默认第一次询问
      this.docData.askRecordNumber = JSON.parse(this.$route.params.addMoreData)
        .askData.askNum
        ? JSON.parse(this.$route.params.addMoreData).askData.askNum
        : 1;
      console.log(
        "与案件关系-当事人",
        JSON.parse(this.$route.params.addMoreData).askData.otherPeopleRelation
      );
      this.docData.inquiriedRelation = JSON.parse(
        this.$route.params.addMoreData
      ).askData.otherPeopleRelation;
    },
    //根据类型
    setDataForPelple() {
      let selectPeo = JSON.parse(this.$route.params.addMoreData).askData
        .peopleAndRelationType;
      //  console.log('addMoreData',selectPeo);

      let selectPeo2 = selectPeo.split("-"); //[name,relation]
      console.log("selectPeo2", selectPeo2);
      let dailiDataList = JSON.parse(this.docData.agentPartyEcertId);
      let dailiData = "";
      dailiDataList.forEach((item) => {
        console.log("其他人", item);
        if (
          item.relationWithCase == selectPeo2[1] &&
          item.name == selectPeo2[0]
        ) {
          console.log("不是当事人");
          dailiData = item;
          console.log("dailiData22222", dailiData);
          this.docData.inquiriedRelation = item.relationWithCase;

          return;
        }
        // this.setDataForPelpleDetail(dailiData);
      });
      //当事人
      if (!dailiData) {
        console.log("是当事人");
        dailiData = {
          name: this.docData.party,
          sex: this.docData.partySex,
          zhengjianNumber: this.docData.partyIdNo,
          age: this.docData.partyAge,
          company: this.docData.partyUnitPosition,
          position: this.docData.occupation,
          tel: this.docData.partyTel,
          adress: this.docData.partyAddress,
        };

        // this.docData.inquiriedRelation = "当事人";
      }
      //与案件关系选择以上都不是时
      if (selectPeo2[0] == "以上均不是") {
        console.log("以上均不是");
        dailiData = {
          name: "",
          sex: "",
          zhengjianNumber: "",
          age: "",
          company: "",
          position: "",
          tel: "",
          adress: "",
        };
        // this.docData.inquiriedRelation = "";
      }
      this.setDataForPelpleDetail(dailiData);
    },
    setDataForPelpleDetail(dailiData) {
      console.log("dailiData", dailiData);
      this.docData.inquiried = dailiData.name;
      this.docData.inquiriedSex = Number(dailiData.sex);
      this.docData.inquiriedIdNo = dailiData.zhengjianNumber;
      (this.docData.inquiriedAge = dailiData.age),
        (this.docData.inquiriedUnitPosition =
          dailiData.company + " " + dailiData.position);
      this.docData.inquiriedAddress = dailiData.adress;
      this.docData.inquiriedTel = dailiData.tel;
      console.log(" this.docData.inquiriedSex", this.docData.inquiriedSex);
    },
    // switchRelate(relation){
    //   let realRelation = '';
    //   switch (relation) {
    //     case "0":
    //       realRelation = '当事人'
    //       break;
    //     case "1":
    //       realRelation = '驾驶人'
    //       break;
    //     case "2":
    //       realRelation = '实际所有者'
    //       break;
    //     case "3":
    //       realRelation = '证人'
    //       break;
    //     case "4":
    //       realRelation = '承运人'
    //       break;
    //     case "5":
    //       realRelation = '代理人'
    //       break;
    //     default:
    //       break;
    //   }
    //   return realRelation;
    // },
    //获取执法人员
    getLawOfficer() {
      let data = {
        caseBasicInfoId: this.caseId,
        typeId: this.$route.params.docId,
      };
      findCaseAllBindPropertyApi(data).then(
        (res) => {
          console.log(res);
          let data2 = JSON.parse(res.data.propertyData);
          this.staffList = data2.staff.split(",");
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
  mounted() {
    this.initBaseDrawData(["allRelationWithCase"]);
    this.getDocDataByCaseIdAndDocId();
    this.isOverStatus();
    this.getLawOfficer();
  },
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">
/* @import "@/assets/css/caseHandle/caseDocModle.scss"; */
#askRecordBox {
  .askRecordNumberBox {
    width: 100px;
  }
  .inquiriedUnitPositionBox {
    width: calc(100% - 130px);
  }
  .inquiriedAddressBox {
    width: calc(100% - 80px);
  }
  .print_info p .span_bg {
    height: 23px;
  }
  .datapick_style .el-form-item__content .el-input__suffix {
    display: none;
  }
  #askModelDataTimeBox {
    width: 220px;
    position: relative;
    .el-form-item__content .el-date-editor--datetime {
      width: 220px;
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
}
</style>

