<template>
  <div class="print_box printNumbers_box" id="caseInvest-print" style="width:790px; margin:0 auto;">
    <el-form
      :rules="rules"
      ref="caseInvestiForm"
      :inline-message="true"
      :inline="true"
      :model="formData"
      :disabled="disableWhenApproval"
    >
      <div class="print_info" style="height: 1200px">
        <div class="doc_topic">{{formData.title}}</div>
        <div class="doc_number">案号：{{formData.caseNumber}}</div>
        <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td rowspan="2">案由</td>
            <td colspan="5" rowspan="2" class="color_DBE4EF">
              <el-form-item
                prop="caseName"
                :rules="fieldRules('caseName',propertyFeatures['caseName'])"
              >
                <el-input
                  type="textarea"
                  v-model="formData.caseName"
                  v-bind:class="{ over_flow:formData.caseName.length>14?true:false }"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  :disabled="fieldDisabled(propertyFeatures['caseName'])"
                ></el-input>
              </el-form-item>
            </td>
            <td rowspan="2" width="100">案件调查人员</td>
            <td colspan="2" rowspan="2" class="color_DBE4EF" style="min-width:80px">
              <el-form-item prop="staff" :rules="fieldRules('staff',propertyFeatures['staff'])">
                <el-input
                  type="textarea"
                  v-model="formData.staff"
                  v-bind:class="{ over_flow:formData.staff && formData.staff.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 4}"
                  maxlength="32"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['staff'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td rowspan="6">
              <p class="center_similar">当</p>
              <p class="center_similar">事</p>
              <p class="center_similar">人</p>
            </td>
            <td rowspan="2">个人</td>
            <td>姓名</td>
            <td class="color_DBE4EF">
              <el-form-item
                prop="party"
                :rules="fieldRules('party',propertyFeatures['party'],'',isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.party"
                  v-bind:class="{ over_flow:formData.party.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  placeholder="/"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['party'])"
                ></el-input>
              </el-form-item>
            </td>
            <td>性别</td>
            <td class="color_DBE4EF">
              <el-form-item
                prop="partySex"
                v-if="isParty"
                :rules="fieldRules('partySex',propertyFeatures['partySex'],'',isParty)"
              >
                <!-- <el-input
                        v-model="formData.partySex"
                        maxlength="2"
                        placeholder="/"
                        :disabled="isParty ? false : true"
                ></el-input>-->
                <el-select
                  v-model="formData.partySex"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partySex'])"
                  placeholder="/"
                >
                  <el-option value="0" label="男"></el-option>
                  <el-option value="1" label="女"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-else>{{formData.partySex}}</el-form-item>
            </td>
            <td>年龄</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="partyAge"
                :rules="fieldRules('partyAge',propertyFeatures['partyAge'],'',isParty)"
              >
                <el-input
                  v-model="formData.partyAge"
                  maxlength="3"
                  placeholder="/"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyAge'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>住址</td>
            <td colspan="3" class="color_DBE4EF">
              <el-form-item
                prop="partyAddress"
                :rules="fieldRules('partyAddress',propertyFeatures['partyAddress'],'',isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.partyAddress"
                  v-bind:class="{ over_flow:formData.partyAddress && formData.partyAddress.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="adressLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyAddress'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
            <td>职业</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="occupation"
                :rules="fieldRules('occupation',propertyFeatures['occupation'],'',isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.occupation"
                  v-bind:class="{ over_flow:formData.occupation && formData.occupation.length>4?true:false }"
                  :autosize="{ minRows: 1, maxRows: 2}"
                  maxlength="20"
                  placeholder="/"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['occupation'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="4">单位</td>
            <td>名称</td>
            <td colspan="6" class="color_DBE4EF">
              <el-form-item
                prop="partyName"
                :rules="fieldRules('partyName',propertyFeatures['partyName'],'',!isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.partyName"
                  v-bind:class="{ over_flow:formData.partyName.length>25?true:false }"
                  :autosize="{ minRows: 1, maxRows: 2}"
                  maxlength="30"
                  placeholder="/"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyName'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>法定代表人</td>
            <td colspan="6" class="color_DBE4EF">
              <el-form-item
                prop="partyManager"
                :rules="fieldRules('partyManager',propertyFeatures['partyManager'],'',!isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.partyManager"
                  v-bind:class="{ over_flow:formData.partyManager && formData.partyManager.length>25?true:false }"
                  :autosize="{ minRows: 1, maxRows: 2}"
                  maxlength="30"
                  placeholder="/"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyManager'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>地址</td>
            <td colspan="6" class="color_DBE4EF">
              <el-form-item
                prop="partyUnitAddress"
                :rules="fieldRules('partyUnitAddress',propertyFeatures['partyUnitAddress'],'',!isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.partyUnitAddress"
                  v-bind:class="{ over_flow:formData.partyUnitAddress && formData.partyUnitAddress.length>25?true:false }"
                  :autosize="{ minRows: 1, maxRows: 2}"
                  maxlength="30"
                  placeholder="/"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitAddress'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>联系电话</td>
            <td colspan="6" class="color_DBE4EF">
              <el-form-item
                prop="partyUnitTel"
                :rules="fieldRules('partyUnitTel',propertyFeatures['partyUnitTel'],validatePhone,!isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.partyUnitTel"
                  v-bind:class="{ over_flow:formData.partyUnitTel && formData.partyUnitTel.length>25?true:false }"
                  :autosize="{ minRows: 1, maxRows: 2}"
                  maxlength="11"
                  placeholder="/"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitTel'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr style="height:190px">
            <td>
              <p>案件</p>
              <p>调查</p>
              <p>经过</p>
              <p>及违</p>
              <p>法事</p>
              <p>实</p>
            </td>
            <td colspan="8" class="color_DBE4EF">
              <el-form-item
                prop="illegalFact"
                :rules="fieldRules('illegalFact',propertyFeatures['illegalFact'])"
              >
                <el-input
                  type="textarea"
                  v-model="formData.illegalFact"
                  v-bind:class="{ over_flow:formData.illegalFact && formData.illegalFact.length>30?true:false }"
                  :autosize="{ minRows: 1, maxRows: 10}"
                  maxlength="300"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['illegalFact'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>

          <tr>
            <td rowspan="7">
              <p>证据</p>
              <p>材料</p>
            </td>
            <td>序号</td>
            <td colspan="2">证据名称</td>
            <td colspan="2">规格</td>
            <td colspan="1">数量</td>
            <td colspan="2">备注</td>
          </tr>
          <tr @click="handleAdd" v-for="(item,index) in formData.evidenceList" :key="index">
            <td>{{item.resNo}}</td>
            <td colspan="2">{{item.name}}</td>
            <td colspan="2">{{item.des}}</td>
            <td colspan="1">{{item.num}}</td>
            <td colspan="2">{{item.note}}</td>
          </tr>
          <tr style="height:180px">
            <td rowspan="6" width="49">
              <p>调查</p>
              <p>结论</p>
              <p>和处</p>
              <p>理意</p>
              <p>见</p>
            </td>
            <td rowspan="6" colspan="7" class="aprotd">
              <!-- <p class="approveDiv">{{formData.lawOfficeOpinions}}</p> -->
              <el-form-item prop="closeResult">
                <el-input
                  type="textarea"
                  v-model="formData.lawOfficeOpinions"
                  v-bind:class="{ over_flow:formData.lawOfficeOpinions.length>33?true:false }"
                  :rows="5"
                ></el-input>
              </el-form-item>
              <div class="pdf_seal" style="white-space:nowrap; width:auto;">
                <p>
                  执法人员签名：
                  <span class="apro">{{formData.lawOfficeName||' '}}</span>、
                  <span class="apro">{{formData.lawOfficeName1||' '}}</span>
                </p>
                <p style="text-align: right;">
                  <el-form-item prop="makeDate" class="pdf_datapick">
                    <el-date-picker
                      v-model="formData.lawOfficeApprovalTime"
                      format="yyyy年MM月dd日"
                      placeholder="    年  月  日"
                      clear-icon="el-icon-circle-close"
                      value-format="yyyy-MM-dd"
                      @blur="starttime"
                    ></el-date-picker>
                  </el-form-item>
                </p>
              </div>
            </td>
          </tr>
        </table>
      </div>

      <div class="print_info">
        <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr style="height:310px">
            <td>
              <p>经办</p>
              <p>机构</p>
              <p>负责</p>
              <p>人意</p>
              <p>见</p>
            </td>
            <td colspan="8" class="aprotd">
              <p class="approveDiv">{{formData.approveOpinions}}</p>
              <div class="pdf_seal" style="white-space:nowrap; width:auto;margin-top:140px;">
                <!-- <p>签名：<span class="apro">{{formData.approvePeo||' '}}</span></p> -->
                <p>签名：</p>
                <p>{{formData.approveTime||' 年 月 日 '}}</p>
              </div>
            </td>
          </tr>
          <tr style="height:310px">
            <td>
              <p>重大</p>
              <p>案件</p>
              <p>法制</p>
              <p>工作</p>
              <p>机构</p>
              <p>审核</p>
              <p>意见</p>
            </td>
            <td colspan="8" class="aprotd">
              <p class="approveDiv">{{formData.secondApproveOpinions}}</p>
              <div class="pdf_seal" style="white-space:nowrap; width:auto;margin-top:140px;">
                <!-- <p>签名：<span class="apro">{{formData.secondApprovePeo||' '}}</span></p> -->
                <p>签名：</p>
                <p>{{formData.secondApproveTime||' 年 月 日 '}}</p>
              </div>
            </td>
          </tr>
          <tr style="height:310px">
            <td width="49">
              <p>交通</p>
              <p>运输</p>
              <p>执法</p>
              <p>部门</p>
              <p>负责</p>
              <p>人审</p>
              <p>批意</p>
              <p>见</p>
            </td>
            <td colspan="7" class="aprotd">
              <p class="approveDiv">{{formData.thirdApproveOpinions}}</p>
              <div class="pdf_seal" style="white-space:nowrap; width:auto;margin-top:140px;">
                <!-- <p>签名：<span class="apro">{{formData.thirdApprovePeo||' '}}</span></p> -->
                <p>签名：</p>
                <p>{{formData.thirdApproveTime||' 年 月 日 '}}</p>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </el-form>
    <!-- 添加弹出框 -->
    <el-dialog
      title="证据材料名称清单"
      append-to-body
      :visible.sync="addVisible"
      width="60%"
      v-loading="addLoading"
    >
      <div>
        <div class="fullscreen">
          <el-form ref="addResFormRef">
            <el-table :data="tableDatas" stripe border style="width: 100%">
              <el-table-column prop="resNo" label="序号" align="center">
                <template slot-scope="scope">
                  <span>{{++scope.$index}}</span>
                </template>
              </el-table-column>
              <el-table-column label="证据材料名称" align="center">
                <template slot-scope="scope">
                  <el-input maxlength="15" v-model="scope.row.name"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="des" label="规格" align="center">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.des" placeholder>
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="num" label="数量" align="center">
                <template slot-scope="scope">
                  <el-input-number size="mini" v-model="scope.row.num" :min="1" label="描述文字"></el-input-number>
                </template>
              </el-table-column>

              <el-table-column label="备注" align="center">
                <template slot-scope="scope">
                  <el-input maxlength="10" v-model="scope.row.note"></el-input>
                </template>
              </el-table-column>
              <el-table-column width="52%">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    icon="el-icon-circle-close"
                    circle
                    @click="deleteRes(scope.row)"
                    class="evdence-form"
                    style="border-radius:50px"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button
              icon="el-icon-circle-plus-outline"
              circle
              type="info"
              @click="addTableData"
              style="margin-left: 50%;margin-top: 10px;"
            ></el-button>
          </el-form>
        </div>
        <div style="margin-left: 45%;margin-top: 10px">
          <el-button size="medium" type="primary" @click="addResSure('addResFormRef')">确 定</el-button>
          <el-button size="medium" @click="addVisible=false">取 消</el-button>
        </div>
      </div>
    </el-dialog>
    <casePageFloatBtns
      :pageDomId="'caseInvest-print'"
      :formOrDocData="formOrDocData"
      @saveData="saveData"
      @showApproval="showApproval"
    ></casePageFloatBtns>
    <!--  显示证据材料 -->
    <investigRpEvidence ref="investigRpEvidenceRef" @sendToReportEmit="receiverEviden"></investigRpEvidence>
    <!-- 提交审批 -->
    <showApprovePeople ref="showApprovePeopleRef"></showApprovePeople>
    <!-- 审批 -->
    <approvalDialog ref="approvalDialogRef" @getNewData="goToPfd"></approvalDialog>
    <caseSlideMenu :activeIndex="''"></caseSlideMenu>
    <!-- 执法人员意见弹窗 -->
    <showLawOfficerOpion ref="showLawOfficerOpionRef" @sendLawOfficeOpionEmit="getLawOfficeOpion"></showLawOfficerOpion>
  </div>
</template>
<script>
import showApprovePeople from "@/page/caseHandle/components/showApprovePeople";
import approvalDialog from "@/page/caseHandle/components/approvalDialog";
import showLawOfficerOpion from "@/page/caseHandle/components/showLawOfficerOpion";
import investigRpEvidence from "@/page/caseHandle/components/investigRpEvidence";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import caseSlideMenu from "@/page/caseHandle/components/caseSlideMenu";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import { validatePhone, validateIDNumber } from "@/common/js/validator";
import iLocalStroage from "@/common/js/localStroage";

export default {
  data() {
    return {
      validatePhone: validatePhone,
      validateIDNumber: validateIDNumber,
      formData: {
        caseNumber: "",
        caseName: "",
        staff: "",
        party: "",
        partySex: "",
        partyAge: "",
        partyAddress: "",
        occupation: "",
        partyName: "",
        partyManager: "",
        partyUnitAddress: "",
        partyUnitTel: "",
        illegalFact: "",
        makeDate: "",
        approveOpinions: "",
        approvePeo: "",
        approveTime: "",
        secondApproveOpinions: "",
        secondApprovePeo: "",
        secondApproveTime: "",
        thirdApproveOpinions: "",
        thirdApprovePeo: "",
        thirdApproveTime: "",
        evidenceList: [], //证据材料
        lawOfficeOpinions: "",
        lawOfficeName: "",
        lawOfficeName1: "",
        lawOfficeApprovalTime: "",
        // investigProcess: "",
        // caseCauseDescrib: "",
        // isMajorCase: "1",
        // punishType: ["警告"],
        // investigResult: "",
        // dealOpinions: "1212121"
      },
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseLinktypeId: this.BASIC_DATA_SYS.caseInvestig_caseLinktypeId,
        //文书数据
        formData: "",
        status: "",
      },
      options: [
        { value: "1", label: " " },
        { value: "2", label: "份" },
        { value: "3", label: "套" },
        { value: "4", label: "个" },
        { value: "5", label: "件" },
        { value: "6", label: "张" },
      ],
      addVisible: false,
      addLoading: false,
      tableDatas: [],
      handleType: 0,
      rules: {
        caseName: [
          { required: true, message: "案由不能为空", trigger: "blur" },
        ],
        staff: [
          { required: true, message: "案件调查人员不能为空", trigger: "blur" },
        ],
        party: [
          { required: true, message: "当事人姓名不能为空", trigger: "blur" },
        ],
        partySex: [
          { required: true, message: "当事人性别不能为空", trigger: "blur" },
        ],
        partyAge: [
          { required: true, message: "当事人年龄不能为空", trigger: "blur" },
        ],
        partyAddress: [
          { required: true, message: "当事人住址不能为空", trigger: "blur" },
        ],
        occupation: [
          { required: true, message: "当事人职业不能为空", trigger: "blur" },
        ],
        partyName: [
          { required: true, message: "企业名称不能为空", trigger: "blur" },
        ],
        partyManager: [
          { required: true, message: "法定代表人不能为空", trigger: "blur" },
        ],
        partyUnitAddress: [
          { required: true, message: "单位地址不能为空", trigger: "blur" },
        ],
        partyUnitTel: [
          { required: true, message: "单位联系方式不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" },
        ],
        illegalFact: [
          { required: true, message: "请输入案件调查经过", trigger: "blur" },
        ],
      },
      // 大写
      punishMoneyCapital: "",
      confiscateThingCapital: "",
      approval: this.$route.params.isApproval ? true : false, //   是否是审批人员进入
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
        pageDomId: "caseInvest-print",
      },
      huanjieAndDocId: this.BASIC_DATA_SYS.caseInvestig_huanjieAndDocId, //案件调查报告的文书id
      approvalOver: false, //审核完成
      nameLength: 10,
      sexLength: 2,
      adressLength: 23,
      isParty: true,
      originalData: "",
      needDealData: true,
      disableWhenApproval: false,
      propertyFeatures: "", //字段属性配置
    };
  },
  computed: { ...mapGetters(["caseId"]) },
  mixins: [mixinGetCaseApiList],
  components: {
    showApprovePeople,
    approvalDialog,
    casePageFloatBtns,
    investigRpEvidence,
    caseSlideMenu,
    showLawOfficerOpion,
  },
  methods: {
    starttime(){
      console.log('案发时间=='+this.formData.lasj)
      if (Date.parse(this.formData.lawOfficeApprovalTime) < Date.parse(this.formData.lasj.substr(0,10))) {
        this.$message({
          message: '当前时间不得小于立案时间',
          type: 'warning'
        });
        this.formData.lawOfficeApprovalTime = '';
      }
    },
    //加载表单信息
    setFormData() {
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(
        this.caseLinkDataForm.caseBasicinfoId,
        this.caseLinkDataForm.caseLinktypeId,
        false
      );
    },
    //保存表单数据
    saveData(handleType) {
      //参数  提交类型 、formRef
      this.com_submitCaseForm(handleType, "caseInvestiForm", true);
    },
    //审批弹窗
    showApproval() {
      //判断是一级审批还是二级审批还是三级(经办机构负责人审批、法制审查、部门负责人审批)
      console.log(this.formData);
      let approvePeo = this.formData.approvePeo ? this.formData.approvePeo : "";
      let secondApprovePeo = this.formData.secondApprovePeo
        ? this.formData.secondApprovePeo
        : "";

      let caseData = {
        caseId: this.caseId,
        caseLinktypeId: this.BASIC_DATA_SYS.caseInvestig_caseLinktypeId,
        firstApproval: approvePeo,
        secondApproval: secondApprovePeo,
        approvalNumber: 3, //3次审批
      };
      this.$refs.approvalDialogRef.showModal(caseData);
    },
    // 暂存
    save() {},
    // 添加
    addDoc() {},
    // 大写
    capital() {
      this.punishMoneyCapital = "";
      this.punishMoneyCapital = this.changeMoneyToChinese(
        this.docData.punishMoney
      );
    },
    // 大写
    capitalbtm() {
      this.confiscateThingCapital == "";
      this.confiscateThingCapital = this.changeMoneyToChinese(
        this.docData.confiscateThing
      );
    },
    changeMoneyToChinese(money) {
      var cnNums = new Array(
        "零",
        "壹",
        "贰",
        "叁",
        "肆",
        "伍",
        "陆",
        "柒",
        "捌",
        "玖"
      ); //汉字的数字
      var cnIntRadice = new Array("", "拾", "佰", "仟"); //基本单位
      var cnIntUnits = new Array("", "万", "亿", "兆"); //对应整数部分扩展单位
      var cnDecUnits = new Array("角", "分", "毫", "厘"); //对应小数部分单位
      //var cnInteger = "整"; //整数金额时后面跟的字符
      var cnIntLast = "元"; //整型完以后的单位
      var maxNum = 999999999999999.9999; //最大处理的数字

      var IntegerNum; //金额整数部分
      var DecimalNum; //金额小数部分
      var ChineseStr = ""; //输出的中文金额字符串
      var parts; //分离金额后用的数组，预定义
      if (money == "") {
        return "";
      }
      money = parseFloat(money);
      if (money >= maxNum) {
        $.alert("超出最大处理数字");
        return "";
      }
      if (money == 0) {
        //ChineseStr = cnNums[0]+cnIntLast+cnInteger;
        ChineseStr = cnNums[0] + cnIntLast;
        //document.getElementById("show").value=ChineseStr;
        return ChineseStr;
      }
      money = money.toString(); //转换为字符串
      if (money.indexOf(".") == -1) {
        IntegerNum = money;
        DecimalNum = "";
      } else {
        parts = money.split(".");
        IntegerNum = parts[0];
        DecimalNum = parts[1].substr(0, 4);
      }
      if (parseInt(IntegerNum, 10) > 0) {
        //获取整型部分转换
        let zeroCount = 0;
        let IntLen = IntegerNum.length;
        for (let i = 0; i < IntLen; i++) {
          let n = IntegerNum.substr(i, 1);
          let p = IntLen - i - 1;
          let q = p / 4;
          let m = p % 4;
          if (n == "0") {
            zeroCount++;
          } else {
            if (zeroCount > 0) {
              ChineseStr += cnNums[0];
            }
            zeroCount = 0; //归零
            ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
          }
          if (m == 0 && zeroCount < 4) {
            ChineseStr += cnIntUnits[q];
          }
        }
        ChineseStr += cnIntLast;
        //整型部分处理完毕
      }
      if (DecimalNum != "") {
        //小数部分
        let decLen = DecimalNum.length;
        for (let i = 0; i < decLen; i++) {
          let n = DecimalNum.substr(i, 1);
          if (n != "0") {
            ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
          }
        }
      }
      if (ChineseStr == "") {
        //ChineseStr += cnNums[0]+cnIntLast+cnInteger;
        ChineseStr += cnNums[0] + cnIntLast;
      } /* else if( DecimalNum == '' ){
                ChineseStr += cnInteger;
                ChineseStr += cnInteger;
            } */
      return ChineseStr;
    },
    // 生成意见
    generateOpinions() {
      this.docData.dealOpinions = `经过调查核实：当事人this.formData.party+违法行为，违反了+违法条例+有证据材料（列举：上面证据材料内容）
证明该案中违法事实清楚，依据+处罚条款+拟给予当事人+当事人姓名+拟处罚类型1（名称+后续说明）+
拟处罚类型2+……+拟处罚类型N+的行政处罚
                                          当否，请批示。 `;
      console.log("dealOpinions", this.formData.dealOpinions);
    },
    goToPfd() {
      //提交pdf 显示pdf页
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.approvalOver = true;
      this.com_getFormDataByCaseIdAndFormId(
        this.caseLinkDataForm.caseBasicinfoId,
        this.caseLinkDataForm.caseLinktypeId,
        true
      );
    },
    isApproval() {
      //只有审核按钮
      if (this.$route.params.isApproval) {
        this.formOrDocData.showBtn = [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          false,
          false,
        ]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        this.disableWhenApproval = true;
      }
    },
    showEvidence() {
      if (!this.disableWhenApproval)
        this.$refs.investigRpEvidenceRef.showModal(this.formData.evidenceList);
    },
    //执法人员审核意见带入
    showLawOfficeOpion() {
      if (!this.disableWhenApproval)
        this.$refs.showLawOfficerOpionRef.showModal();
    },
    getLawOfficeOpion(lawOfficeOpionData) {
      console.log(lawOfficeOpionData);
      this.formData.lawOfficeOpinions = lawOfficeOpionData.lawOfficeOpinions;
      this.formData.lawOfficeName = iLocalStroage.gets("userInfo").username;
      this.formData.lawOfficeApprovalTime =
        lawOfficeOpionData.lawOfficeApprovalTime;
    },
    //证据列表弹窗传来的证据
    receiverEviden(data) {
      console.log("data", data);
      // data.forEach((item,index)=>{
      //   this.formData.evidenceList[index] = item;
      // })
      this.formData.evidenceList = data;
      // console.log(this.formData.evidenceList);
    },
    handleAdd(resNo, row) {
      let tableArr = [];
      this.formData.evidenceList.forEach((item) => {
        if (item.resNo != "") {
          tableArr.push(item);
        }
      });
     this.tableDatas = JSON.parse(JSON.stringify(tableArr));
      this.addVisible = true;
      if (this.tableDatas.length == 0) {
        this.tableDatas.push({ resNo: 1, num: 1 });
      }
    },
    //删除一行证据
    deleteRes(row) {
      for (let i = 0; i < this.tableDatas.length; i++) {
        if (this.tableDatas[i].resNo > row.resNo) {
          this.tableDatas[i].resNo = this.tableDatas[i].resNo - 1;
        }
      }
      this.tableDatas.splice(row.resNo - 1, 1);
      this.formData.evidenceList.splice(row.resNo - 1, 1);
      this.formData.evidenceList.push({
        resNo: "",
        name: "",
        num: "",
        des: "",
        note: "",
      });
    },
    //确定添加
    addResSure(formName) {
      let canAdd = true;
      if (this.tableDatas.length > 0) {
        for (let i = 0; i < this.tableDatas.length; i++) {
          if (!this.tableDatas[i].name || !this.tableDatas[i].des) {
            this.$message({
              message: "证据名称或规格不能为空！",
              type: "warning",
            });
            canAdd = false;
            break;
          }
        }
        if (canAdd) {
          console.log("证据列表111111", this.tableDatas);
          this.tableDatas.forEach((item, index, arr) => {
            item.resNo = index + 1;
            this.formData.evidenceList[index] = this.tableDatas[index];
          });
          console.log("证据列表111111", this.formData.evidenceList);
          this.addVisible = false;
        }
      }
    },
    //添加一行数据
    addTableData() {
      let length = this.tableDatas.length;
      if (length == 6) {
        this.$message({
          message: "最多输入六行！",
          type: "warning",
        });
        return;
      }
      if (length == 0) {
        this.tableDatas.push({ resNo: 1, amount: 1 });
      } else {
        this.tableDatas.push({
          resNo: Number(this.tableDatas[length - 1].resNo) + 1,
          num: 1,
          note: "",
        });
      }
    },
    //对原始数据做一下处理
    getDataAfter() {
      console.log(this.formData);
      if (!this.formData.evidenceList.length) {
        this.formData.evidenceList = [
          { resNo: "", name: "", num: "", des: "", note: "" },
          { resNo: "", name: "", num: "", des: "", note: "" },
          { resNo: "", name: "", num: "", des: "", note: "" },
          { resNo: "", name: "", num: "", des: "", note: "" },
          { resNo: "", name: "", num: "", des: "", note: "" },
          { resNo: "", name: "", num: "", des: "", note: "" },
        ];
      }
    },
  },
  created() {
    this.setFormData();
    this.isApproval();
  },
};
</script>

<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss">
// @import "@/assets/css/documentForm.scss";
/* @import "@/assets/css/caseHandle/caseDocModle.scss"; */
</style>
<style scoped>
.apro {
  display: inline-block;
  border-bottom: 1px solid;
  min-width: 60px;
  width: auto;
  height: 29px;
  vertical-align: middle;
}
.aprotd {
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal !important;
}
</style>
