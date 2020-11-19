<!--长软-->
<template>
  <div
    class="print_box printNumbers_box"
    id="adminCoerciveMeasure-print"
    style="width: 790px; margin: 0 auto"
  >
    <el-form
      :rules="rules"
      ref="docForm"
      :inline-message="true"
      :inline="true"
      :model="docData"
    >
      <!-- <div class="printNumbers_box">
      <div id="adminCoerciveMeasure-print" style="height:auto;padding:0px;"> -->
      <div class="print_info">
        <div class="doc_topic">行政强制措施决定书</div>
        <div class="doc_number">案号：{{ docData.caseNumber }}</div>
        <table
          class="print_table"
          border="1"
          bordercolor="black"
          width="100%"
          cellspacing="0"
        >
          <tr>
            <td rowspan="6">
              当
              <br />事 <br />人
            </td>
            <td rowspan="2">个人</td>
            <td>姓名</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="party"
                :rules="
                  fieldRules('party', propertyFeatures['party'], '', isParty)
                "
              >
                <el-input
                  type="textarea"
                  v-model="docData.party"
                  v-bind:class="{
                    over_flow: docData.party.length > 14 ? true : false,
                  }"
                  :autosize="{ minRows: 1, maxRows: 3 }"
                  :maxlength="nameLength"
                  :disabled="
                    !isParty || fieldDisabled(propertyFeatures['party'])
                  "
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
            <td>身份证件号</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="partyIdNo"
                :rules="
                  fieldRules(
                    'partyIdNo',
                    propertyFeatures['partyIdNo'],
                    validateIDNumber,
                    isParty
                  )
                "
              >
                <el-input
                  type="textarea"
                  v-model="docData.partyIdNo"
                  v-bind:class="{
                    over_flow: docData.partyIdNo.length > 14 ? true : false,
                  }"
                  :autosize="{ minRows: 1, maxRows: 2 }"
                  maxlength="18"
                  placeholder="/"
                  :disabled="
                    !isParty || fieldDisabled(propertyFeatures['partyIdNo'])
                  "
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>住址</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="partyAddress"
                :rules="
                  fieldRules(
                    'partyAddress',
                    propertyFeatures['partyAddress'],
                    '',
                    isParty
                  )
                "
              >
                <el-input
                  type="textarea"
                  v-model="docData.partyAddress"
                  v-bind:class="{
                    over_flow: docData.partyAddress.length > 14 ? true : false,
                  }"
                  :autosize="{ minRows: 1, maxRows: 3 }"
                  :maxlength="adressLength"
                  :disabled="
                    !isParty || fieldDisabled(propertyFeatures['partyAddress'])
                  "
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="partyTel"
                :rules="
                  fieldRules(
                    'partyTel',
                    propertyFeatures['partyTel'],
                    validatePhone,
                    isParty
                  )
                "
              >
                <el-input
                  v-model="docData.partyTel"
                  :maxLength="maxLength"
                  :disabled="
                    !isParty || fieldDisabled(propertyFeatures['partyTel'])
                  "
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
                :rules="
                  fieldRules(
                    'partyName',
                    propertyFeatures['partyName'],
                    '',
                    !isParty
                  )
                "
              >
                <el-input
                  v-model="docData.partyName"
                  :maxLength="maxLength"
                  :disabled="
                    isParty || fieldDisabled(propertyFeatures['partyName'])
                  "
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
                :rules="
                  fieldRules(
                    'partyUnitAddress',
                    propertyFeatures['partyUnitAddress'],
                    '',
                    !isParty
                  )
                "
              >
                <el-input
                  v-model="docData.partyUnitAddress"
                  :maxLength="maxLength"
                  :disabled="
                    isParty ||
                    fieldDisabled(propertyFeatures['partyUnitAddress'])
                  "
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
                :rules="
                  fieldRules(
                    'partyUnitTel',
                    propertyFeatures['partyUnitTel'],
                    validatePhone,
                    !isParty
                  )
                "
              >
                <el-input
                  v-model="docData.partyUnitTel"
                  minlength="11"
                  :maxLength="maxLength"
                  :disabled="
                    isParty || fieldDisabled(propertyFeatures['partyUnitTel'])
                  "
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
            <td>法定代表人</td>
            <td class="color_DBE4EF">
              <el-form-item
                prop="partyManager"
                :rules="
                  fieldRules(
                    'partyManager',
                    propertyFeatures['partyManager'],
                    '',
                    !isParty
                  )
                "
              >
                <el-input
                  v-model="docData.partyManager"
                  :maxLength="maxLength"
                  :disabled="
                    isParty || fieldDisabled(propertyFeatures['partyManager'])
                  "
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
                :rules="
                  fieldRules(
                    'socialCreditCode',
                    propertyFeatures['socialCreditCode'],
                    '',
                    !isParty
                  )
                "
              >
                <el-input
                  v-model="docData.socialCreditCode"
                  :maxLength="maxLength"
                  :disabled="
                    isParty ||
                    fieldDisabled(propertyFeatures['socialCreditCode'])
                  "
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <p>
          <el-form-item
            prop="afsj"
            :rules="fieldRules('afsj', propertyFeatures['afsj'])"
            class="pdf_datapick"
            style="width: 150px"
          >
            <el-date-picker
              @blur="startTime2"
              :disabled="fieldDisabled(propertyFeatures['afsj'])"
              v-model="docData.afsj"
              type="date"
              format="yyyy年MM月dd日"
              placeholder="  年  月  日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          ，你（单位）
          <el-form-item
            rows="2"
            prop="caseCauseName"
            :rules="
              fieldRules('caseCauseName', propertyFeatures['caseCauseName'])
            "
            style="width: 300px"
          >
            <el-input
              :disabled="fieldDisabled(propertyFeatures['caseCauseName'])"
              v-model="docData.caseCauseName"
              type="textarea"
              v-bind:class="{
                over_flow: docData.caseCauseName.length > 14 ? true : false,
              }"
              :autosize="{ minRows: 1, maxRows: 3 }"
              :maxLength="90"
            ></el-input>
          </el-form-item>
          。依据
          <span>
            <el-form-item
              prop="punishLaw"
              :rules="fieldRules('punishLaw', propertyFeatures['punishLaw'])"
              style="width: 320px"
            >
              <el-select
                v-model="docData.punishLaw"
                :maxLength="maxLength"
                style="width: 320px"
                :disabled="fieldDisabled(propertyFeatures['punishLaw'])"
              >
                <el-option
                  v-for="item in laWOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </el-form-item> </span
          >的规定，本机关决定对你（单位）的
          <span>
            <el-form-item
              prop="detainGoods"
              :rules="
                fieldRules('detainGoods', propertyFeatures['detainGoods'])
              "
              style="width: 330px"
            >
              <el-input
                type="textarea"
                v-model="docData.detainGoods"
                v-bind:class="{
                  over_flow: docData.caseCauseName.length > 14 ? true : false,
                }"
                :autosize="{ minRows: 1, maxRows: 3 }"
                :maxLength="50"
                :disabled="fieldDisabled(propertyFeatures['detainGoods'])"
              ></el-input>
            </el-form-item> </span
          >（财物、设施或场所的名称及数量）实施
          <span>
            <el-form-item
              prop="enforceMeasure"
              :rules="
                fieldRules('enforceMeasure', propertyFeatures['enforceMeasure'])
              "
              style="width: 280px"
            >
              <el-select
                v-model="docData.enforceMeasure"
                style="width: 280px"
                :maxLength="maxLength"
                :disabled="fieldDisabled(propertyFeatures['enforceMeasure'])"
              >
                <el-option
                  v-for="item in measurOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item> </span
          >的行政强制措施，期限为
          <span>
            <el-form-item
              prop="measureStartDate"
              :rules="
                fieldRules(
                  'measureStartDate',
                  propertyFeatures['measureStartDate']
                )
              "
              style="width: 150px"
              class="pdf_datapick"
            >
              <el-date-picker
                v-model="docData.measureStartDate"
                style="width: 220px"
                @change="startTime"
                type="date"
                format="yyyy年MM月dd日"
                value-format="yyyy-MM-dd"
                placeholder="  年  月  日"
                :disabled="fieldDisabled(propertyFeatures['measureStartDate'])"
              >
              </el-date-picker>
            </el-form-item> </span
          >至
          <span>
            <el-form-item
              prop="measureEndDate"
              :rules="
                fieldRules('measureEndDate', propertyFeatures['measureEndDate'])
              "
              style="width: 150px"
              class="pdf_datapick"
            >
              <el-date-picker
                v-model="docData.measureEndDate"
                type="date"
                @blur="startTime1"
                format="yyyy年MM月dd日"
                value-format="yyyy-MM-dd"
                placeholder="  年  月  日"
                :disabled="fieldDisabled(propertyFeatures['measureEndDate'])"
              >
              </el-date-picker>
            </el-form-item> </span
          >。
        </p>

        <p>
          如果不服本决定，可以依法在六十日内向
          <span>
            <el-form-item
              prop="reconsiderationOrgan"
              :rules="
                fieldRules(
                  'reconsiderationOrgan',
                  propertyFeatures['reconsiderationOrgan']
                )
              "
              style="width: 230px"
            >
              <el-select
                v-model="docData.reconsiderationOrgan"
                style="width: 230px"
                :maxLength="maxLength"
                :disabled="
                  fieldDisabled(propertyFeatures['reconsiderationOrgan'])
                "
              >
                <el-option
                  v-for="item in reconsiderationOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </el-form-item> </span
          >申请行政复议，或者在六个月内依法向
          <span>
            <el-form-item
              prop="lawsuitOrgan"
              :rules="
                fieldRules('lawsuitOrgan', propertyFeatures['lawsuitOrgan'])
              "
              style="width: 230px"
            >
              <el-select
                v-model="docData.lawsuitOrgan"
                style="width: 230px"
                :maxLength="maxLength"
                :disabled="fieldDisabled(propertyFeatures['lawsuitOrgan'])"
              >
                <el-option
                  v-for="item in enforcementOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </el-form-item> </span
          >人民法院提起行政诉讼，但本决定不停止执行，法律另有规定的除外。
        </p>

        <div class="pdf_seal">
          <span>交通运输执法部门(印章)</span><br />
          <el-form-item prop="makeDate" class="pdf_datapick">
            <el-date-picker
              @blur="startTime2"
              v-model="docData.makeDate"
              type="date"
              format="yyyy年MM月dd日"
              placeholder="  年  月  日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </div>
      </div>

      <div class="print_info">
        <span>查封、扣押场所、设施、财物清单如下: </span><br /><br />
        <table
          class="evidencetable"
          border="1"
          bordercolor="black"
          width="100%"
          cellspacing="0"
        >
          <tr>
            <td width="10%">序号</td>
            <td width="30%">查封、扣押场所、设施、财物名称</td>
            <td width="15%">规格</td>
            <td width="15%">数量</td>
            <td width="30%">备注</td>
          </tr>
          <tr v-if="docData.resList.length == 0" @click="handleAdd">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr
            v-for="(item, index) in docData.resList"
            :key="index"
            @click="handleAdd"
          >
            <td>{{ ++index }}</td>
            <td>{{ item.resName }}</td>
            <td>{{ item.spec }}</td>
            <td>{{ item.amount }}</td>
            <td>
              <div style="">{{ item.resNote }}</div>
            </td>
          </tr>
        </table>
        <el-form-item prop="resLength" style="visibility: hidden">
          <el-input v-model="docData.resLength"></el-input>
        </el-form-item>
        <br />
        <p>
          其他说明：
          <span>
            <el-form-item prop="caseName" rows="2">
              <el-input
                type="textarea"
                v-model="docData.caseName"
                v-bind:class="{
                  over_flow: docData.party.length > 14 ? true : false,
                }"
                :autosize="{ minRows: 1, maxRows: 3 }"
                :maxLength="maxLength"
              ></el-input>
            </el-form-item>
          </span>
        </p>
        <br /><br /><br />
        <div class="notice clear">
          <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
        </div>
      </div>
    </el-form>

    <!-- 添加弹出框 -->
    <el-dialog
      title="查封、扣押场所、设施、财物清单"
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
                  <span>{{ ++scope.$index }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="查封、扣押场所、设施、财物名称"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.resName"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="spec" label="规格" align="center">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.spec" placeholder="">
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="数量" align="center">
                <template slot-scope="scope">
                  <el-input-number
                    size="mini"
                    v-model="scope.row.amount"
                    :min="1"
                    label="描述文字"
                  ></el-input-number>
                </template>
              </el-table-column>

              <el-table-column label="备注" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.resNote"></el-input>
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
                    style="border-radius: 50px"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button
              icon="el-icon-circle-plus-outline"
              circle
              type="info"
              @click="addTableData"
              style="margin-left: 50%; margin-top: 10px"
            ></el-button>
          </el-form>
        </div>
        <div style="margin-left: 45%; margin-top: 10px">
          <el-button
            size="medium"
            type="primary"
            @click="addResSure('addResFormRef')"
            >确 定</el-button
          >
          <el-button size="medium" @click="addVisible = false">取 消</el-button>
        </div>
      </div>
    </el-dialog>
    <casePageFloatBtns
      :formOrDocData="formOrDocData"
      @saveData="saveData"
    ></casePageFloatBtns>
  </div>
</template>
<script>
import overflowInput from "@/page/caseHandle/case/modle/overflowInput.vue";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { getOrganDetailApi, getOrganIdApi } from "@/api/system";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import {
  validateIDNumber,
  validatePhone,
  validateZIP,
} from "@/common/js/validator";
import { testApi } from "@/api/caseHandle";
import { getDictListDetailByNameApi } from "@/api/system";
export default {
  components: {
    casePageFloatBtns,
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  data() {
    //当事人类型为公司时验证
    var validateIfCom = (rule, value, callback) => {
      if (!this.isParty && !value) {
        return callback(new Error("法人、地址、联系电话、信用代码不能为空"));
      }
      callback();
    };
    var validateEvidencLength = (rule, value, callback) => {
      if (this.docData.resList.length == 0) {
        return callback(new Error("至少填写一个物品"));
      }
      callback();
    };
    //起止期限日期验证
    var validateIfDate = (rule, value, callback) => {
      var diff =
        new Date(value).getTime() -
        new Date(this.docData.measureStartDate).getTime();
      var days = diff / 24 / 60 / 60 / 1000;
      console.log("差几天", days);
      if (days > 29) {
        return callback("措施起止期限不得超过30日");
      }
      if (days <= 0) {
        return callback("措施起止期限不得为同一天");
      }
      callback();
    };
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
        afsj: "",
        caseCauseName: "",
        punishLaw: "",
        detainGoods: "",
        enforceMeasure: "",
        measureStartDate: "",
        measureEndDate: "",
        reconsiderationOrgan: "",
        lawsuitOrgan: "",
        makeDate: "",
        resList: [],
        resLength: 0,
        caseName: "",
      },
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件id
        caseDoctypeId: this.$route.params.docId,
        //表单数据
        docData: "",
        status: "",
        linkTypeId: this.$route.params.caseLinkTypeId, //所属环节的id
      },
      isPdf: "",
      originalData: "",
      isParty: true,
      rules: {
        party: [
          { required: true, message: "当事人姓名不能为空", trigger: "blur" },
        ],
        partyIdNo: [
          { required: true, message: "身份证号不能为空", trigger: "blur" },
          { validator: validateIDNumber, trigger: "blur" },
        ],
        partyTel: [
          { required: true, message: "联系电话不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" },
        ],
        partyAddress: [
          { required: true, message: "住址不能为空", trigger: "blur" },
        ],
        partyName: [
          { required: true, message: "单位名称不能为空", trigger: "blur" },
        ],
        partyManager: [
          { required: true, message: "法人不能为空", trigger: "blur" },
        ],
        partyUnitAddress: [
          { required: true, message: "单位地址不能为空", trigger: "blur" },
        ],
        partyUnitTel: [
          { required: true, message: "单位联系电话不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" },
        ],
        socialCreditCode: [
          { required: true, message: "社会信用代码不能为空", trigger: "blur" },
        ],
        afsj: [
          { required: true, message: "案发时间不能为空", trigger: "blur" },
        ],
        caseCauseName: [
          { required: true, message: "违法事实不能为空", trigger: "blur" },
        ],
        punishLaw: [
          { required: true, message: "法律条款不能为空", trigger: "blur" },
        ],
        detainGoods: [
          { required: true, message: "财务名称不能为空", trigger: "blur" },
        ],
        enforceMeasure: [
          {
            required: true,
            message: "采用的强制措施不能为空",
            trigger: "blur",
          },
        ],
        measureStartDate: [
          {
            required: true,
            message: "强制措施开始时间不能为空",
            trigger: "blur",
          },
        ],
        measureEndDate: [
          {
            required: true,
            message: "强制措施结束时间不能为空",
            trigger: "blur",
          },
          { validator: validateIfDate, trigger: "blur" },
        ],
        reconsiderationOrgan: [
          { required: true, message: "复议机构不能为空", trigger: "blur" },
        ],
        lawsuitOrgan: [
          { required: true, message: "诉讼机构不能为空", trigger: "blur" },
        ],
        resLength: [{ validator: validateEvidencLength, trigger: "blur" }],
      },
      nameLength: 23,
      adressLength: 23,
      maxLength: 23,
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: "adminCoerciveMeasure-print",
      },
      addVisible: false,
      addLoading: false,
      tableDatas: [],
      laWOptions: [
        {
          value: "1",
          label: "《中华人民共和国强制法》第二十四条",
        },
      ],
      options: [],
      measurOptions: [
        {
          value: "查封",
          label: "查封",
        },
        {
          value: "扣押",
          label: "扣押",
        },
      ],
      reconsiderationOptions: [],
      enforcementOptions: [],
      needDealData: true,
      propertyFeatures: "", //字段属性配置
    };
  },

  methods: {
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId,
      };
      console.log(data);
      this.com_getDocDataByCaseIdAndDocId(data);
    },
    //保存文书信息
    saveData(handleType) {
      // this.printContent()
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
    handleAdd(resNo, row) {
      this.tableDatas = JSON.parse(JSON.stringify(this.docData.resList));
      let length = this.tableDatas.length;
      this.addVisible = true;
      if (length == 0) {
        this.tableDatas.push({ resNo: 1, amount: 1 });
      }
    },
    //添加一行数据
    addTableData() {
      console.log(this.tableDatas);
      let length = this.tableDatas.length;
      if (length == 5) {
        this.$message({
          message: "最多输入五行！",
          type: "warning",
        });
        return;
      }
      if (length == 0) {
        this.tableDatas.push({ resNo: 1, amount: 1 });
      } else {
        this.tableDatas.push({
          resNo: Number(this.tableDatas[length - 1].resNo) + 1,
          amount: 1,
          resNote: this.tableDatas[0].resNote,
        });
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
      console.log("newLing", this.tableDatas);
    },
    //确定添加
    addResSure(formName) {
      let canAdd = true;
      console.log("添加数据", this.tableDatas.length);
      if (this.tableDatas.length == 0) {
        this.$message({
          message: "数据至少有一行不为空！",
          type: "warning",
        });
        canAdd = false;
      } else {
        for (let i = 0; i < this.tableDatas.length; i++) {
          if (!this.tableDatas[i].resName || !this.tableDatas[i].spec) {
            this.$message({
              message: "财务名称或规格不能为空！",
              type: "warning",
            });
            canAdd = false;
            break;
          }
        }
      }
      if (canAdd) {
        this.docData.resList = this.tableDatas;
        this.addVisible = false;
      }
    },
    startTime() {
      if (this.docData.measureStartDate) {
        if (
          Date.parse(this.docData.measureStartDate) <
          Date.parse(this.docData.lasj)
        ) {
          this.$message({
            message: "开始时间不得小于立案时间",
            type: "warning",
          });
          this.docData.measureStartDate = "";
          return;
        }
        this.$set(
          this.docData,
          "measureEndDate",
          new Date(
            new Date(this.docData.measureStartDate).getTime() +
              29 * 24 * 3600 * 1000
          ).format("yyyy-MM-dd")
        );
      }
    },
    startTime1() {
      if (
        Date.parse(this.docData.measureEndDate) <
        Date.parse(this.docData.measureStartDate)
      ) {
        this.$message({
          message: "结束时间不得小于开始时间",
          type: "warning",
        });
        this.docData.measureEndDate = "";
        this.docData.measureStartDate = "";
      }
    },
    starttime2() {
      console.log("案发时间==" + this.docData.lasj);
      if (
        Date.parse(this.docData.makeDate) <
        Date.parse(this.docData.lasj.substr(0, 10))
      ) {
        this.$message({
          message: "当前时间不得小于立案时间",
          type: "warning",
        });
        this.docData.makeDate = "";
      }
      if (
        Date.parse(this.docData.afsj) <
        Date.parse(this.docData.lasj.substr(0, 10))
      ) {
        this.$message({
          message: "当前时间不得小于立案时间",
          type: "warning",
        });
        this.docData.afsj = "";
      }
    },
    //根据用户的组织机构ID获取复议机构和诉讼机构
    getOrganDetailOptions() {
      let orgId = JSON.parse(window.localStorage.userInfo).id;
      console.log("orgId=" + orgId);
      let data = {
        id: orgId,
      };
      let _this = this;
      getOrganIdApi(data).then((res) => {
        let orgData = {
          id: res.data.organId,
        };
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
          select: "reconsiderationOrgan1";
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
    getDataAfter() {
      if (!this.docData.measureStartDate || !this.docData.measureEndDate) {
        this.docData.measureStartDate = new Date().format("yyyy-MM-dd");
        this.startTime();
      }
    },
    //获取规格单位
    getUnit() {
      getDictListDetailByNameApi("扣押物品规格")
        .then((res) => {
          console.log("规格", res);
          this.options = res.data;
          //添加一个空的数据
          this.options.unshift({ name: " ", note: " ", id: "123" });
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
  },
  mounted() {
    this.getOrganDetailOptions();
  },
  created() {
    // this.isOverStatus();
    this.getDocDataByCaseIdAndDocId();
    this.getUnit();
  },
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">
/* @import "@/assets/css/caseHandle/caseDocModle.scss"; */

.print_box .print_info .evidencetable tr td {
  white-space: inherit;
  text-align-last: center;
}
.evdence-form {
  .el-icon-circle-close {
    color: #7b7b7b !important;
  }
}
</style>
