<!-------长软------->
<template>
  <div
    class="print_box printNumbers_box"
    id="removeAdminCoercive-print"
    style="width:790px; margin:0 auto;"
  >
    <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
      <div class="print_info">
        <div class="doc_topic">解除行政强制措施决定书</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <p class="p_begin">
          当事人（个人姓名或单位名称）
          <span>
            <el-form-item prop="party" :rules="fieldRules('party',propertyFeatures['party'])">
              <el-input :disabled="fieldDisabled(propertyFeatures['party'])" v-model="docData.party" :maxLength="maxLength"></el-input>
            </el-form-item>
          </span>:
        </p>
        <p>
          因你（单位）
          <span>
            <el-form-item prop="caseCauseName" :rules="fieldRules('caseCauseName',propertyFeatures['caseCauseName'])">
              <el-input
                :disabled="fieldDisabled(propertyFeatures['caseCauseName'])"
                v-model="docData.caseCauseName"
                type="textarea"
                v-bind:class="{ over_flow:docData.caseCauseName.length>14?true:false }"
                :autosize="{ minRows: 1, maxRows: 3}"
                :maxLength="maxLength"
              ></el-input>
            </el-form-item>
          </span>，本机关依法于
          <span>
            <el-form-item prop="dateTime" class="pdf_datapick" :rules="fieldRules('dateTime',propertyFeatures['dateTime'])">
              <el-date-picker
                :disabled="fieldDisabled(propertyFeatures['dateTime'])"
                v-model="docData.dateTime"
                type="date"
                format="yyyy年MM月dd日"
                placeholder="    年  月  日"
                 value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </span>对你（单位）采取了
          <span>
            <el-form-item prop="enforceMeasure" :rules="fieldRules('enforceMeasure',propertyFeatures['enforceMeasure'])">
              <el-input
                :disabled="fieldDisabled(propertyFeatures['enforceMeasure'])"
                v-model="docData.enforceMeasure"
                type="textarea"
                v-bind:class="{ over_flow:docData.enforceMeasure.length>14?true:false }"
                :autosize="{ minRows: 1, maxRows: 3}"
              ></el-input>
            </el-form-item>
          </span>的行政强制措施，行政强制措施决定书案号：
          <span>
            <el-form-item prop="caseNumberCopy" :rules="fieldRules('caseNumberCopy',propertyFeatures['caseNumberCopy'])">
              <el-input :disabled="fieldDisabled(propertyFeatures['caseNumberCopy'])" v-model="docData.caseNumberCopy" :maxLength="maxLength"></el-input>
            </el-form-item>
          </span>。
        </p>
        <p>
          依照《中华人民共和国行政强制法》第二十八条第一款第
          <span>
            <el-form-item prop="clause" style="width:140px" :rules="fieldRules('clause',propertyFeatures['clause'])">
              <el-select v-model="docData.clause" :maxLength="maxLength" placeholder="\" :disabled="fieldDisabled(propertyFeatures['clause'])">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </span>项的规定， 本机关决定自
          <span>
            <el-form-item prop="removeDate" class="pdf_datapick" :rules="fieldRules('removeDate',propertyFeatures['removeDate'])">
              <el-date-picker
                v-model="docData.removeDate"
                type="date"
                format="yyyy年MM月dd日"
                placeholder="    年  月  日"
                 value-format="yyyy-MM-dd"
                 :disabled="fieldDisabled(propertyFeatures['removeDate'])"
              ></el-date-picker>
            </el-form-item>
          </span>起解除该行政强制措施。
        </p>

        <div class="pdf_seal">
          <span @click="makeSeal">交通运输执法部门(印章)</span>
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
      <div class="print_info">
        <!-- <br><br><br><br><br> -->
        <p class="p_begin">
          退还财物清单如下：
          <br />
        </p>
        <div>
          <table class="evidencetable" border="1" bordercolor="black" width="100%" cellspacing="0">
            <tr>
              <td width="10%">序号</td>
              <td width="30%">查封、扣押场所、设施、财物名称</td>
              <td width="10%">规格</td>
              <td width="10%">数量</td>
              <td width="40%">备注</td>
            </tr>
            <tr v-for="(item,index) in tableData" :key="index">
              <td>{{item.resNo}}</td>
              <td>{{item.resName}}</td>
              <td>{{item.spec}}</td>
              <td>{{item.amount}}</td>
              <td>
                <div style>{{item.resNote}}</div>
              </td>
            </tr>
          </table>
          <!-- <el-table :data="docData.resList">
              <el-table-column prop="resNo" label="序号"></el-table-column>
              <el-table-column prop="resName" label="查封、扣押场所、设施、财物名称" ></el-table-column>
              <el-table-column prop="spec" label="规格"></el-table-column>
              <el-table-column prop="amount" label="数量"></el-table-column>
              <el-table-column prop="resNote" label="备注"></el-table-column>
          </el-table>-->
        </div>
        <br />
        <p>经当事人（代理人）查验，退还的财物与查封、扣押时一致，查封、扣押期间没有使用、丢失和损坏现象。</p>

        <br />
        <br />
        <br />
        <div class="notice clear">
          <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
        </div>
      </div>
    </el-form>

    <!-- 悬浮按钮 -->
    <casePageFloatBtns
      :pageDomId="'removeAdminCoercive-print'"
      :formOrDocData="formOrDocData"
      @submitData="submitData"
      @saveData="saveData"
      @backHuanjie="submitData"
    ></casePageFloatBtns>

    <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput>
  </div>
</template>
<script>
import overflowInput from "./overflowInput";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
// import signture from "../../../../js/signture";
import mySignture from "@/common/js/mySignture";

export default {
  components: {
    overflowInput,
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  data() {
    return {
      docData: {
        caseNumber: "",
        party: "",
        caseCauseName: "",
        dateTime: "",
        enforceMeasure: "",
        caseNumberCopy: "",
        clause: "",
        removeDate: "",
        signatureDate: "",
        resList: ""
      },
      tableData: [],
      needDealData: true,
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件id--从流程进入删掉，先写死测试用
        caseDoctypeId: "2c902908697f546701698001e0b8000b", //表单类型IDer
        //表单数据
        docData: "",
        status: ""
      },
      returnItemOptions: [
        {
          value: "1",
          label: "份"
        },
        {
          value: "2",
          label: "套"
        },
        {
          value: "3",
          label: "个"
        },
        {
          value: "4",
          label: "件"
        }
      ],
      options: [
        {
          value: "1",
          label: "一"
        },
        {
          value: "2",
          label: "二"
        },
        {
          value: "3",
          label: "三"
        },
        {
          value: "4",
          label: "四"
        },
        {
          value: "5",
          label: "五"
        }
      ],
      rules: {
        party: [
          { required: true, message: "当事人不能为空", trigger: "blur" }
        ],
        caseCauseName: [
          { required: true, message: "案由不能为空", trigger: "blur" }
        ],
        dateTime: [
          { required: true, message: "强制时间不能为空", trigger: "blur" }
        ],
        caseNumberCopy: [
          { required: true, message: "案号不能为空", trigger: "blur" }
        ],
        enforceMeasure: [
          { required: true, message: "强制措施不能为空", trigger: "blur" }
        ],
        clause: [
          { required: true, message: "请解除依据不能为空", trigger: "blur" }
        ],
        removeDate: [
          { required: true, message: "解除日期不能为空", trigger: "blur" }
        ]
      },
      nameLength: 23,
      adressLength: 23,
      maxLength: 23,
      maxLengthOverLine: 122,
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: "removeAdminCoercive-print"
      },
      addVisible: false,
      addLoading: false,
      tableDatas: [],
      propertyFeatures:'', //字段属性配置
    };
  },

  methods: {
    //对原始数据做一下处理
    getDataAfter() {
      console.log("处理数据", this.docData);
      console.log("有没有数据", this.docData.resList);
      if (!this.docData.resList) {
        this.docData.resList = [
          { resNo: "", resName: "", spec: "", amount: "", resNote: "" }
        ];
      }
      this.tableData = JSON.parse(this.docData.resList);
    },
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId, //流程里的案件id
        // caseId: '', //先写死
        docId: "2c902908697f546701698001e0b8000b"
      };
      this.com_getDocDataByCaseIdAndDocId(data);
    },
    //保存文书信息
    // addDocData(handleType) {
    //   this.printContent();
    //   this.com_addDocData(handleType, "docForm");
    // },
    // 盖章
    makeSeal() {
      console.log("盖章!");
    },
    // 打印
    print() {
      console.log("打印!");
      mySignture.openURL("oeder");
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
<style lang="scss">
@import "@/assets/css/caseHandle/caseDocModle.scss";
.print_box .print_info .evidencetable tr td {
  white-space: inherit;
  text-align-last: center;
}
</style>
