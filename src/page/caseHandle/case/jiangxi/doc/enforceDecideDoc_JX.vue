<!--长软-->
<template>
  <div class="print_box">
    <div class="print_info" id="enforceDecideDoc-print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">行政强制执行决定书</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td rowspan="6">
              当
              <br />事
              <br />人
            </td>
            <td rowspan="2">个人</td>
            <td>姓名</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="party"
                :rules="fieldRules('party',propertyFeatures['party'],'',isParty)"
              >
                <!-- <el-input type="textarea" v-model="docData.party"  :maxlength="nameLength" placeholder="/"></el-input> -->
                <el-input
                  type="textarea"
                  v-model="docData.party"
                  v-bind:class="{ over_flow:docData.party.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['party'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
            <td>身份证件号</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="partyIdNo"
                :rules="fieldRules('partyIdNo',propertyFeatures['partyIdNo'],validateIDNumber,isParty)"
              >
                <!-- <el-input v-model="docData.partyIdNo" :maxLength='maxLength' placeholder="/"></el-input> -->

                <el-input
                  type="textarea"
                  v-model="docData.partyIdNo"
                  v-bind:class="{ over_flow:docData.partyIdNo.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 2}"
                  maxlength="18"
                  placeholder="/"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyIdNo'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>住址</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="partyAddress"
                :rules="fieldRules('partyAddress',propertyFeatures['partyAddress'],'',isParty)"
              >
                <!-- <el-input v-model="docData.partyAddress"  :maxlength="adressLength" placeholder="/"></el-input> -->

                <el-input
                  type="textarea"
                  v-model="docData.partyAddress"
                  v-bind:class="{ over_flow:docData.partyAddress.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="adressLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyAddress'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="partyTel"
                :rules="fieldRules('partyTel',propertyFeatures['partyTel'],validatePhone,isParty)"
              >
                <!-- <el-input v-model="docData.partyTel" :maxLength='maxLength' placeholder="/"></el-input> -->

                <el-input
                  v-model="docData.partyTel"
                  :maxLength="maxLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyTel'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="4">单位</td>
            <td>名称</td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item
                prop="partyName"
                :rules="fieldRules('partyName',propertyFeatures['partyName'],'',!isParty)"
              >
                <!-- <el-input v-model="docData.partyName" :maxLength='maxLength' placeholder="/"></el-input> -->

                <el-input
                  v-model="docData.partyName"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyName'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>地址</td>
            <td colspan="4" class="color_DBE4EF">
              <el-form-item
                prop="partyUnitAddress"
                :rules="fieldRules('partyUnitAddress',propertyFeatures['partyUnitAddress'],'',!isParty)"
              >
                <!-- <el-input v-model="docData.partyUnitAddress" :maxLength='maxLength' placeholder="/"></el-input> -->

                <el-input
                  v-model="docData.partyUnitAddress"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitAddress'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="partyUnitTel"
                :rules="fieldRules('partyUnitTel',propertyFeatures['partyUnitTel'],validatePhone,!isParty)"
              >
                <!-- <el-input v-model="docData.partyUnitTel" minlength="11" :maxLength='maxLength' placeholder="/"></el-input> -->

                <el-input
                  v-model="docData.partyUnitTel"
                  minlength="11"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitTel'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
            <td>法定代表人</td>
            <td class="color_DBE4EF">
              <el-form-item
                prop="partyManager"
                :rules="fieldRules('partyManager',propertyFeatures['partyManager'],'',!isParty)"
              >
                <!-- <el-input v-model="docData.partyManager" :maxLength='maxLength' placeholder="/"></el-input> -->

                <el-input
                  v-model="docData.partyManager"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyManager'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2">统一社会信用代码</td>
            <td colspan="3" class="color_DBE4EF">
              <el-form-item
                prop="socialCreditCode"
                :rules="fieldRules('socialCreditCode',propertyFeatures['socialCreditCode'],'',!isParty)"
              >
                <!-- <el-input v-model="docData.socialCreditCode" :maxLength='maxLength' placeholder="/"></el-input> -->

                <el-input
                  v-model="docData.socialCreditCode"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['socialCreditCode'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>

        <p>
          本机关于
          <span>
            <el-form-item
              prop="serviceTime"
              class="pdf_datapick"
              :rules="fieldRules('serviceTime',propertyFeatures['serviceTime'])"
            >
              <el-date-picker
                v-model="docData.serviceTime"
                type="date"
                format="yyyy年MM月dd日"
                placeholder="    年  月  日"
                value-format="yyyy-MM-dd"
                :disabled="fieldDisabled(propertyFeatures['serviceTime'])"
                @blur="starttime"
              ></el-date-picker>
            </el-form-item>
          </span>作出
          <span>
            <el-form-item
              prop="punishContent"
              class="width151"
              :rules="fieldRules('punishContent',propertyFeatures['punishContent'])"
            >
              <el-input
                v-model="docData.punishContent"
                :maxLength="maxLength"
                :disabled="fieldDisabled(propertyFeatures['punishContent'])"
              ></el-input>
            </el-form-item>
          </span>的决定，决定书编号为
          <span>
            <el-form-item
              prop="caseNumberCopy"
              :rules="fieldRules('caseNumberCopy',propertyFeatures['caseNumberCopy'])"
            >
              <el-input
                v-model="docData.caseNumberCopy"
                :maxLength="maxLength"
                :disabled="fieldDisabled(propertyFeatures['caseNumberCopy'])"
              ></el-input>
            </el-form-item>
          </span>。
        </p>
        <p>
          <el-checkbox v-model="docData.checkBox1" @change="handleCheckChangeOne"></el-checkbox>因你（单位）逾期且无正当理由未履行，依据
          <span>
            <el-form-item
              prop="punishmentBasis"
              class="width120"
              :rules="fieldRules('punishmentBasis',propertyFeatures['punishmentBasis'])"
            >
              <el-input
                type="textarea"
                v-model="docData.punishmentBasis"
                v-bind:class="{ over_flow:docData.punishmentBasis.length>14?true:false ,bgc_red:docData.checkBox1}"
                :autosize="{ minRows: 1, maxRows: 3}"
                :maxLength="maxLength"
                :disabled="!docData.checkBox1"
              ></el-input>
              <!-- :disabled="fieldDisabled(propertyFeatures['punishmentBasis']) -->
            </el-form-item>
          </span>的规定，本机关决定将于
          <span>
            <el-form-item
              prop="forceTime"
              class="pdf_datapick"
              :rules="fieldRules('forceTime',propertyFeatures['forceTime'])"
            >
              <el-date-picker
                v-model="docData.forceTime"
                type="date"
                format="yyyy年MM月dd日"
                placeholder="    年  月  日"
                value-format="yyyy-MM-dd"
                :disabled="!docData.checkBox1"
                v-bind:class="{ bgc_red:docData.checkBox1,bgc_gray:!docData.checkBox1 }"
                @blur="starttime"
              >
                <!-- :disabled="fieldDisabled(propertyFeatures['forceTime'])" -->
              </el-date-picker>
            </el-form-item>
          </span>强制执行：
          <span>
            <el-form-item
              prop="measureAction"
              class="width235"
              :rules="fieldRules('measureAction',propertyFeatures['measureAction'])"
            >
              <el-input
                type="textarea"
                v-model="docData.measureAction"
                :maxLength="maxLength"
                v-bind:class="{ over_flow:docData.measureAction.length>14?true:false,bgc_red:docData.checkBox1 }"
                :autosize="{ minRows: 1, maxRows: 3}"
                :disabled="!docData.checkBox1"
              ></el-input>
              <!-- :disabled="fieldDisabled(propertyFeatures['measureAction'])" -->
            </el-form-item>
          </span>
          （强制执行方式）。
        </p>
        <p>
          <el-checkbox v-model="docData.checkBox2" @change="handleCheckChangeTwo"></el-checkbox>经本机关催告后，你（单位）在催告期间有转移或隐匿财物迹象，依据
          <span>
            <el-form-item
              prop="punishmentBasis1"
              class="width120"
              :rules="fieldRules('punishmentBasis1',propertyFeatures['punishmentBasis1'])"
            >
              <el-input
                type="textarea"
                v-model="docData.punishmentBasis1"
                v-bind:class="{ over_flow:docData.punishmentBasis1.length>14?true:false ,bgc_red:docData.checkBox2}"
                :autosize="{ minRows: 1, maxRows: 3}"
                :maxLength="maxLength"
                :disabled="!docData.checkBox2"
              ></el-input>
              <!-- :disabled="fieldDisabled(propertyFeatures['punishmentBasis1'])" -->
            </el-form-item>
          </span>的规定，本机关将立即
          <!-- <span>
            <el-form-item prop="forceTime1" class="pdf_datapick" :rules="fieldRules('forceTime1',propertyFeatures['forceTime1'])">
              <el-date-picker v-model="docData.forceTime1" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd" :disabled="fieldDisabled(propertyFeatures['forceTime1'])">
              </el-date-picker>
            </el-form-item>
          </span>-->
          强制执行：
          <span>
            <el-form-item
              prop="measureAction1"
              class="width235"
              :rules="fieldRules('measureAction1',propertyFeatures['measureAction1'])"
            >
              <el-input
                type="textarea"
                v-model="docData.measureAction1"
                :maxLength="maxLength"
                v-bind:class="{ over_flow:docData.measureAction.length>14?true:false ,bgc_red:docData.checkBox2}"
                :autosize="{ minRows: 1, maxRows: 3}"
                :disabled="!docData.checkBox2"
              ></el-input>
              <!-- :disabled="fieldDisabled(propertyFeatures['measureAction1'])" -->
            </el-form-item>
          </span>
          （强制执行方式）。
        </p>
        <p>
          如不服本决定，可以在收到本决定书之日起六十日内向
          <span>
            <el-form-item
              prop="reconsiderationOrgan"
              :rules="fieldRules('reconsiderationOrgan',propertyFeatures['reconsiderationOrgan'])"
            >
              <el-select
                v-model="docData.reconsiderationOrgan"
                :maxLength="maxLength"
                :disabled="fieldDisabled(propertyFeatures['reconsiderationOrgan'])"
              >
                <el-option
                  v-for="item in reconsiderationOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
              <!-- <el-input v-model="docData.reconsiderationOrgan" :maxLength='maxLength' placeholder="/"></el-input> -->
            </el-form-item>
          </span>申请行政复议或者在六个月内依法向
          <span>
            <el-form-item
              prop="enforcementOrgan"
              :rules="fieldRules('enforcementOrgan',propertyFeatures['enforcementOrgan'])"
            >
              <el-select
                v-model="docData.enforcementOrgan"
                :maxLength="maxLength"
                :disabled="fieldDisabled(propertyFeatures['enforcementOrgan'])"
              >
                <el-option
                  v-for="item in enforcementOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
              <!-- <el-input v-model="docData.enforcementOrgan" :maxLength='maxLength' placeholder="/"></el-input> -->
            </el-form-item>
          </span>人民法院提起行政诉讼。
        </p>

        <div class="pdf_seal">
          <span>交通运输执法部门(印章)</span>
          <br />
          <el-form-item prop="makeDate" class="pdf_datapick">
            <el-date-picker
              v-model="docData.makeDate"
              type="date"
              format="yyyy年MM月dd日"
              placeholder="    年  月  日"
              value-format="yyyy-MM-dd"
              @blur="starttime"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="notice clear">
          <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
        </div>
      </el-form>
    </div>

    <!-- 悬浮按钮 -->
    <casePageFloatBtns
      :pageDomId="'enforceDecideDoc-print'"
      :formOrDocData="formOrDocData"
      @submitData="submitData"
      @saveData="saveData"
      @backHuanjie="submitData"
    ></casePageFloatBtns>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { getOrganDetailApi, getOrganIdApi } from "@/api/system";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import { validatePhone, validateIDNumber } from "@/common/js/validator";

export default {
  components: {
    casePageFloatBtns,
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  data() {
    return {
      validatePhone: validatePhone,
      validateIDNumber: validateIDNumber,
      docData: {
        caseNumber: "",
        party: "",
        partyIdNo: "",
        partyAddress: "",
        partyTel: "",
        partyName: "",
        partyUnitAddress: "",
        partyUnitTel: "",
        partyManager: "",
        socialCreditCode: "",
        serviceTime: "",
        punishContent: "",
        caseNumberCopy: "",
        punishmentBasis: "",
        punishmentBasis1: "",
        forceTime: "",
        measureAction: "",
        reconsiderationOrgan: "",
        enforcementOrgan: "",
        makeDate: "",
        checkBox1: false,
        checkBox2: false,
        forceTime1: "",
        measureAction1: "",
      },
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseDoctypeId: this.$route.params.docId, //文书类型ID
        //文书数据
        docData: "",
        status: "", //提交状态
        linkTypeId: this.$route.params.caseLinkTypeId,
      },
      name: "",
      inputInfo: "",
      inputInfos: "",
      illegalFactsEvidence: "",
      value1: "",
      rules: {
        party: [
          { required: true, message: "当事人姓名不能为空", trigger: "blur" },
        ],
        partyAddress: [
          { required: true, message: "当事人地址不能为空", trigger: "blur" },
        ],
        partyIdNo: [
          { required: true, message: "身份证号码不能为空", trigger: "blur" },
          { validator: validateIDNumber, trigger: "blur" },
        ],
        partyTel: [
          {
            required: true,
            message: "当事人联系电话不能为空",
            trigger: "blur",
          },
          { validator: validatePhone, trigger: "blur" },
        ],
        partyName: [
          { required: true, message: "单位名称不能为空", trigger: "blur" },
        ],
        partyUnitAddress: [
          { required: true, message: "单位地址不能为空", trigger: "blur" },
        ],
        partyUnitTel: [
          { required: true, message: "单位联系电话不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" },
        ],
        partyManager: [
          { required: true, message: "法人不能为空", trigger: "blur" },
        ],
        socialCreditCode: [
          { required: true, message: "社会信用代码不能为空", trigger: "blur" },
        ],
        serviceTime: [
          { required: true, message: "决定时间必须填写", trigger: "blur" },
        ],
        caseNumberCopy: [
          { required: true, message: "决定书案号不能为空", trigger: "blur" },
        ],
        punishmentBasis: [
          { required: true, message: "处罚依据必须输入", trigger: "blur" },
        ],
        punishmentBasis1: [
          { required: true, message: "处罚依据必须输入", trigger: "blur" },
        ],
        forceTime: [
          { required: true, message: "强制执行时间必须填写", trigger: "blur" },
        ],
        measureAction: [
          { required: true, message: "强制执行方式必须填写", trigger: "blur" },
        ],
        measureAction1: [
          { required: true, message: "强制执行方式必须填写", trigger: "blur" },
        ],
        reconsiderationOrgan: [
          { required: true, message: "行政复议机构必须填写", trigger: "blur" },
        ],
        enforcementOrgan: [
          { required: true, message: "行政诉讼机构必须填写", trigger: "blur" },
        ],
      },
      nameLength: 23,
      adressLength: 23,
      maxLength: 23,
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: "enforceDecideDoc-print",
      },
      isParty: true, //当事人类型为个人
      originalData: "",
      reconsiderationOptions: [],
      enforcementOptions: [],
      propertyFeatures: "",
    };
  },
  methods: {
    starttime(){
      console.log('案发时间=='+this.docData.lasj)
      if (Date.parse(this.docData.makeDate) < Date.parse(this.docData.lasj.substr(0,10))) {
        this.$message({
          message: '当前时间不得小于立案时间',
          type: 'warning'
        });
        this.docData.makeDate = '';
      }
      if (Date.parse(this.docData.serviceTime) < Date.parse(this.docData.lasj.substr(0,10))) {
        this.$message({
          message: '当前时间不得小于立案时间',
          type: 'warning'
        });
        this.docData.serviceTime = '';
      }
      if (Date.parse(this.docData.forceTime) < Date.parse(this.docData.lasj.substr(0,10))) {
        this.$message({
          message: '当前时间不得小于立案时间',
          type: 'warning'
        });
        this.docData.forceTime = '';
      }
    },
    handleCheckChangeOne(val) {
      console.log(" -> val", this.docData.checkBox1);
      if (val === false) {
        this.docData.punishmentBasis = "";
        this.docData.forceTime = "";
        this.docData.measureAction = "";
      }
    },
    handleCheckChangeTwo(val) {
      console.log(" -> val", val);
      if (val === false) {
        this.docData.punishmentBasis1 = "";
        this.docData.measureAction1 = "";
      }
    },
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId,
      };
      this.com_getDocDataByCaseIdAndDocId(data);
    },
    //保存文书信息
    // addDocData(handleType) {
    //
    //   this.com_addDocData(handleType, 'docForm');
    // },
    // 打印
    print() {
      console.log("打印!");
    },
    //提交
    submitData(handleType) {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: this.$route.params.url,
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
          true,
        ]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    },
    //根据用户的组织机构ID获取复议机构和诉讼机构
    getOrganDetailOptions() {
      let orgId = JSON.parse(window.localStorage.userInfo).id;
      console.log("orgId=" + orgId);
      let data = {
        id: orgId,
      };

      getOrganIdApi(data).then((res) => {
        let orgData = {
          id: res.data.organId,
        };
        let _this = this;
        getOrganDetailApi(orgData).then((orgRes) => {
          _this.reconsiderationOptions = [
            {
              value: "reconsiderationOrgan1",
              label: orgRes.data.reconsiderationOrgan1,
            },
            {
              value: "reconsiderationOrgan2",
              label: orgRes.data.reconsiderationOrgan2,
            },
          ];
          _this.enforcementOptions = [
            {
              value: "enforcementOrgan1",
              label: orgRes.data.enforcementOrgan1,
            },
            {
              value: "enforcementOrgan2",
              label: orgRes.data.enforcementOrgan2,
            },
          ];
        });
      });
    },
  },
  mounted() {
    this.getDocDataByCaseIdAndDocId();
    this.getOrganDetailOptions();
  },
  created() {
    this.isOverStatus();
  },
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss">
/* @import "@/assets/css/caseHandle/caseDocModle.scss"; */
</style>

