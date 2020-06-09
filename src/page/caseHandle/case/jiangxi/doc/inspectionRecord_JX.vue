
<template>
  <div class="print_box">
    <div class="print_info" id="hearingRecordDoc_print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">检查记录</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <p class="p_begin">
          检查时间：
          <span class="listen_data">
            <el-form-item
              prop="inspectStartTime"
              class="pdf_datapick"
              :rules="fieldRules('inspectStartTime',propertyFeatures['inspectStartTime'])"
            >
              <el-date-picker
                v-model="docData.inspectStartTime"
                type="datetime"
                format="yyyy年MM月dd日HH时mm分"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="    年  月  日  时  分"
                :disabled="fieldDisabled(propertyFeatures['inspectStartTime'])"
              ></el-date-picker>
            </el-form-item>
          </span>至
          <span class="listen_data">
            <el-form-item
              prop="inspectEndTime"
              class="pdf_datapick"
              :rules="fieldRules('inspectEndTime',propertyFeatures['inspectEndTime'])"
            >
              <el-date-picker
                v-model="docData.inspectEndTime"
                type="datetime"
                format="yyyy年MM月dd日HH时mm分"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="    年  月  日  时  分"
                :disabled="fieldDisabled(propertyFeatures['inspectEndTime'])"
              ></el-date-picker>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          检查地点：
          <span>
            <el-form-item
              prop="inspectPlace"
              class="width537"
              :rules="fieldRules('inspectPlace',propertyFeatures['inspectPlace'])"
            >
              <el-input
                v-model="docData.inspectPlace"
                :maxLength="maxLength"
                :disabled="fieldDisabled(propertyFeatures['inspectPlace'])"
              ></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          检查内容：
          <span>
            <el-form-item
              prop="inspectContent"
              class="width505"
              :rules="fieldRules('inspectContent',propertyFeatures['inspectContent'])"
            >
              <el-input
                v-model="docData.inspectContent"
                :maxLength="maxLength"
                :disabled="fieldDisabled(propertyFeatures['inspectContent'])"
              ></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          检查人：
          <el-form-item
            prop="staff1"
            style="width:80px"
            :rules="fieldRules('staff1',propertyFeatures['staff1'])"
          >
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
          </el-form-item>单位及职务：
          <el-form-item
            prop="staffUnitAndPosition1"
            style="width:152px"
            :rules="fieldRules('staffUnitAndPosition1',propertyFeatures['staffUnitAndPosition1'])"
          >
            <el-input
              type="textarea"
              v-model="docData.staffUnitAndPosition1"
              v-bind:class="{ over_flow:docData.staffUnitAndPosition1 && docData.staffUnitAndPosition1.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 2}"
              placeholder="\"
              maxlength="35"
              :disabled="fieldDisabled(propertyFeatures['staffUnitAndPosition1'])"
            ></el-input>
          </el-form-item>执法证号：
          <el-form-item
            prop="certificateId1"
            style="width:130px"
            :rules="fieldRules('certificateId1',propertyFeatures['certificateId1'])"
          >
            <el-input
              v-model="docData.certificateId1"
              :maxLength="maxLength"
              placeholder="\"
              :disabled="fieldDisabled(propertyFeatures['certificateId1'])"
            ></el-input>
          </el-form-item>
        </p>
        <p class="p_begin">
          检查人：
          <el-form-item
            prop="staff2"
            style="width:80px"
            :rules="fieldRules('staff2',propertyFeatures['staff2'])"
          >
            <el-select
              v-model="docData.staff2"
              :maxLength="maxLength"
              @change="changeStaff1"
              :disabled="fieldDisabled(propertyFeatures['staff2'])"
            >
              <el-option
                v-for="(item,index) in staffList"
                :key="index"
                :value="item"
                :label="item"
                :disabled="docData.staff2==item"
              ></el-option>
            </el-select>
          </el-form-item>单位及职务：
          <el-form-item
            prop="staffUnitAndPosition2"
            style="width:152px"
            :rules="fieldRules('staffUnitAndPosition2',propertyFeatures['staffUnitAndPosition2'])"
          >
            <el-input
              type="textarea"
              v-model="docData.staffUnitAndPosition2"
              v-bind:class="{ over_flow:docData.staffUnitAndPosition2 && docData.staffUnitAndPosition2.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 2}"
              placeholder="\"
              maxlength="35"
              :disabled="fieldDisabled(propertyFeatures['staffUnitAndPosition2'])"
            ></el-input>
          </el-form-item>执法证号：
          <el-form-item
            prop="certificaeId2"
            style="width:130px"
            :rules="fieldRules('certificateId2',propertyFeatures['certificateId2'])"
          >
            <el-input
              v-model="docData.certificateId2"
              :maxLength="maxLength"
              placeholder="\"
              :disabled="fieldDisabled(propertyFeatures['certificateId2'])"
            ></el-input>
          </el-form-item>
        </p>
        <p class="p_begin">
          被检查单位负责人姓名：
          <span>
            <el-form-item
              prop="checked"
              style="width:173px"
              :rules="fieldRules('checked',propertyFeatures['checked'])"
            >
              <el-input
                v-model="docData.checked"
                maxlength="6"
                :disabled="fieldDisabled(propertyFeatures['checked'])"
              ></el-input>
            </el-form-item>
          </span>
          性别：
          <span>
            <el-form-item
              prop="checkedSex"
              style="width:70px"
              :rules="fieldRules('checkedSex',propertyFeatures['checkedSex'])"
            >
              <el-select
                v-model="docData.checkedSex"
                :maxLength="maxLength"
                placeholder
                :disabled="fieldDisabled(propertyFeatures['checkedSex'])"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </span>
          年龄：
          <span>
            <el-form-item
              prop="checckedAge"
              style="width:70px"
              :rules="fieldRules('checckedAge',propertyFeatures['checckedAge'])"
            >
              <el-input
                v-model="docData.checckedAge"
                :maxLength="maxLength"
                :disabled="fieldDisabled(propertyFeatures['checckedAge'])"
              ></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          身份证号：
          <span>
            <el-form-item
              style="width:212px"
              prop="checkedIdNo"
              :rules="fieldRules('checkedIdNo',propertyFeatures['checkedIdNo'])"
            >
              <el-input
                v-model="docData.checkedIdNo"
                :maxLength="maxLength"
                :disabled="fieldDisabled(propertyFeatures['checkedIdNo'])"
              ></el-input>
            </el-form-item>
          </span>
          单位及职务：
          <span>
            <el-form-item
              style="width:211px"
              prop="checkedUnitAndPosition"
              :rules="fieldRules('checkedUnitAndPosition',propertyFeatures['checkedUnitAndPosition'])"
            >
              <el-input
                v-model="docData.checkedUnitAndPosition"
                :maxLength="maxLength"
                :disabled="fieldDisabled(propertyFeatures['checkedUnitAndPosition'])"
              ></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          联系电话：
          <span>
            <el-form-item
              prop="checkedTel"
              style="width:132px"
              :rules="fieldRules('checkedTel',propertyFeatures['checkedTel'],validatePhone)"
            >
              <el-input
                v-model="docData.checkedTel"
                :maxLength="maxLength"
                :disabled="fieldDisabled(propertyFeatures['checkedTel'])"
              ></el-input>
            </el-form-item>
          </span>
        </p>
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item
              prop="inspectRecord"
              :rules="fieldRules('inspectRecord',propertyFeatures['inspectRecord'])"
            >
              <el-input
                class="text_indent20 overflow_lins_textarea"
                type="textarea"
                v-model="docData.inspectRecord"
                rows="3"
                maxlength="90"
                :disabled="fieldDisabled(propertyFeatures['inspectRecord'])"
              ></el-input>
              <span class="overflow_describe" style="text-indent:0 !important">检查情况及结果（发现的问题及处理情况）：</span>
              <span class="span_bg span_bg_top" >&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
            </el-form-item>
          </div>
        </div>
        <p v-if="lineStyleFlag">
          听证记录：
          <u>{{docData.inspectRecord}}</u>
        </p>

        <el-row :gutter="20">
          <el-col :span="14">
            被检查单位负责人签名：
            <span class="write_line" style="width: 120px;"></span>
          </el-col>
          <el-col :span="10">
            检查人签名：
            <span class="write_line" style="width: 120px;"></span>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 悬浮按钮 -->
    <casePageFloatBtns
      :pageDomId="'hearingRecordDoc_print'"
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
import { validatePhone, validateIDNumber } from "@/common/js/validator";
import {
  findCaseAllBindPropertyApi,
} from "@/api/caseHandle";
export default {
  components: {
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  data() {
    return {
      validatePhone: validatePhone,
      validateIDNumber: validateIDNumber,
      docData: {
        caseNumber: "",
        inspectStartTime: "",
        inspectEndTime: "",
        inspectPlace: "",
        inspectContent: "",
        staff1: "",
        staff2: "",
        staffUnitAndPosition1: "",
        staffUnitAndPosition2: "",
        certificateId1: "",
        certificateId2: "",
        checked: "",
        checkedSex: "",
        checkedAge: "",
        checkedIdNo: "",
        checkedUnitAndPosition: "",
        checkedTel: "",
        inspectRecord: ""
      },
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        // caseDoctypeId: this.$route.params.docId, //文书类型ID
        //表单数据
        docData: "",
        status: "",
        linkTypeId: this.$route.params.caseLinkTypeId
      },
      rules: {
        caseNumber: [{ required: true, message: "请输入案号", trigger: "blur" }]
      },
      options: [
        {
          value: "1",
          label: "男"
        },
        {
          value: "2",
          label: "女"
        }
      ],
      nameLength: 23,
      adressLength: 23,
      maxLength: 23,
      maxLengthOverLine: 122,
      lineStyleFlag: false,
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: "hearingRecordDoc_print"
      },
      staffList: [],
      staffList_: [],
      needDealData: true,
      propertyFeatures: ""
    };
  },
  methods: {
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId
      };
      this.com_getDocDataByCaseIdAndDocId(data);
    },
    getDataAfter() {
      this.staffList = this.docData.staff.split(",");
      this.docData.staff1 = this.docData.staff.split(",")[0];
      this.docData.certificateId1 = this.docData.certificateId.split(",")[0];
      let dailiData = {};
      console.log("this.docData", this.docData);
      if (this.docData.partyType == "1") {
        //当事人类型为个人
        dailiData = {
          name: this.docData.party,
          sex: this.docData.partySex,
          zhengjianNumber: this.docData.partyIdNo,
          age: this.docData.partyAge,
          company: this.docData.partyUnitPosition,
          position: this.docData.occupation,
          tel: this.docData.partyTel,
          adress: this.docData.partyAddress
        };
      } else if (this.docData.partyType == "2") {
        //当事人类型为企业
        dailiData = JSON.parse(this.docData.agentPartyEcertId)[0];
        console.log("代理人信息", dailiData);
      }
    },
    //保存文书信息
    addDocData(handleType) {
      this.com_addDocData(handleType, "docForm");
    },
    // 打印
    print() {
      console.log("打印!");
    },
    // 获取多行编辑内容
    getOverFloeEditInfo(edit) {
      this.docData.inspectRecord = edit;
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
    //修改勘验人员
    changeStaff1(val) {
      this.docData.staff1 = val.name;
      this.docData.staffId1 = val.id;
      this.staffList_ = JSON.parse(JSON.stringify(this.staffList));
      this.staffList_.splice(this.staffList.indexOf(val), 1);
      if (this.docData.staff1 === this.docData.staff2) {
        this.docData.staff2 = "";
        this.docData.staffId2 = "";
      }
    },
    changeStaff2(val) {
      this.docData.staff2 = val.name;
      this.docData.staffId2 = val.id;
    },
    //获取执法人员
    getLawOfficer() {
      let data = {
        caseBasicInfoId: this.caseId,
        typeId: this.$route.params.docId
      };
      findCaseAllBindPropertyApi(data).then(res => {
        console.log(res);
        let data2 = JSON.parse(res.data.propertyData);
        this.staffList = data2.staff.split(',');
      }, err => {
        console.log(err);
      })
    }
  },
  mounted() {
    this.getDocDataByCaseIdAndDocId();
  },
  created() {
    this.isOverStatus();
    this.getLawOfficer();
  }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">
/* @import "@/assets/css/caseHandle/caseDocModle.scss"; */

#hearingRecordDoc_print {
  .overflow_lins_textarea {
    & > textarea {
      text-indent: 5em;
    }
  }
}
</style>
