<template>
  <div class="print_box">
    <div class="print_info" id="reportRecordDoc_print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">举报记录</div>
        <div class="doc_number"></div>

        <p class="p_begin">
          举报时间：
          <span class="listen_data">
            <el-form-item
              prop="reportTime"
              class="pdf_datapick"
              :rules="fieldRules('reportTime',propertyFeatures['reportTime'])"
            >
              <el-date-picker
                v-model="docData.reportTime"
                type="datetime"
                format="yyyy年MM月dd日HH时mm分"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="    年  月  日  时  分"
                :disabled="fieldDisabled(propertyFeatures['reportTime'])"
              ></el-date-picker>
            </el-form-item>
          </span>
          举报类别:
          <span>
            <el-form-item
              style="width:250px"
               prop="reportType"
              :rules="fieldRules('reportType',propertyFeatures['reportType'])"
            >
                 <el-select v-model="docData.reportType" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['reportType'])">
                    <el-option v-for="(item,index) in allReportType" :key="index" :value="item" :label="item"></el-option>
                  </el-select>
             
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          举报人：
          <span>
            <el-form-item
              prop="reportPeople"
              style="width:140px"
              :rules="fieldRules('reportPeople',propertyFeatures['reportPeople'])"
            >
              <el-input
                v-model="docData.reportPeople"
                :disabled="fieldDisabled(propertyFeatures['reportPeople'])"
              ></el-input>
            </el-form-item>
          </span>
          性别：
          <span>
            <el-form-item
              prop="reportPeopleSex"
              style="width:140px"
              :rules="fieldRules('reportPeopleSex',propertyFeatures['reportPeopleSex'])"
            >
            <el-select v-model="docData.reportPeopleSex" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['reportPeopleSex'])">
                   <el-option :value="0" label="男"></el-option>
                    <el-option :value="1" label="女"></el-option>
            </el-select>
           
            </el-form-item>
          </span>
          年龄：
          <span>
            <el-form-item
              prop="reportPeopleAge"
              style="width:157px"
              :rules="fieldRules('reportPeopleAge',propertyFeatures['reportPeopleAge'])"
            >
              <el-input
                v-model="docData.reportPeopleAge"
                :maxLength="maxLength"
                :disabled="fieldDisabled(propertyFeatures['reportPeopleAge'])"
              ></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          住所或工作单位：
          <span>
            <el-form-item
              prop="reportPeopleAdress"
              style="width:492px"
              :rules="fieldRules('reportPeopleAdress',propertyFeatures['reportPeopleAdress'])"
            >
              <el-input
                v-model="docData.reportPeopleAdress"
                :maxLength="maxLength"
                :disabled="fieldDisabled(propertyFeatures['reportPeopleAdress'])"
              ></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          联系电话：
          <span>
            <el-form-item
              prop="reportPeopleTel"
              style="width:540px"
              :rules="fieldRules('reportPeopleTel',propertyFeatures['reportPeopleTel'],validatePhone)"
            >
              <el-input
                v-model="docData.reportPeopleTel"
                :maxLength="maxLength"
                :disabled="fieldDisabled(propertyFeatures['reportPeopleTel'])"
              ></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          身份证号：
          <!-- <span> -->
          <el-form-item
            prop="reportPeopleIDNuber"
            style="width:540px"
            :rules="fieldRules('reportPeopleIDNuber',propertyFeatures['reportPeopleIDNuber'],validateIDNumber)"
          >
            <el-input
              v-model="docData.reportPeopleIDNuber"
              :maxLength="maxLength"
              :disabled="fieldDisabled(propertyFeatures['reportPeopleIDNuber'])"
            ></el-input>
          </el-form-item>
          <!-- </span> -->
        </p>
        <!-- 多行样式 -->
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item
              prop="reportContent"
              :rules="fieldRules('reportContent',propertyFeatures['reportContent'])"
            >
              <el-input
                class="overflow_lins_textarea"
                type="textarea"
                v-model="docData.reportContent"
                rows="10"
                maxlength="300"
                :disabled="fieldDisabled(propertyFeatures['reportContent'])"
              ></el-input>
              <span class="overflow_describe" style="text-indent:0 !important">举报内容：</span>
              <span class="span_bg span_bg_top">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>

            </el-form-item>
          </div>
        </div>

        <!-- <p v-if="lineStyleFlag">
          听证记录：
          <u>{{docData.hearingRecord}}</u>
        </p> -->

        <el-row :gutter="20">
          <el-col :span="12">
            举报人签名及时间：
            <span class="write_line width250"></span>
          </el-col>
          <el-col :span="12">
            记录人签名及时间：
            <span class="write_line" style="width: 250px;"></span>
          </el-col>
        </el-row>
         <p class="p_begin">
          备注：
          <!-- <span> -->
          <el-form-item
            prop="reportNote"
            style="width:540px"
            :rules="fieldRules('reportNote',propertyFeatures['reportNote'])"
          >
            <el-input
              v-model="docData.reportNote"
              :maxLength="maxLength"
              :disabled="fieldDisabled(propertyFeatures['reportNote'])"
            ></el-input>
          </el-form-item>
          <!-- </span> -->
        </p>
      </el-form>
    </div>

    <!-- 悬浮按钮 -->
    <casePageFloatBtns
      :pageDomId="'reportRecordDoc_print'"
      :formOrDocData="formOrDocData"
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
import iLocalStroage from "@/common/js/localStroage";
import { validatePhone, validateIDNumber } from "@/common/js/validator";
export default {
  components: {
    overflowInput,
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  data() {
    return {
      validatePhone: validatePhone,
      validateIDNumber: validateIDNumber,
      docData: {
        reportTime: "",
        reportType: "",
        reportPeople: "",
        reportPeopleSex: "",
        reportPeopleAge: "",
        reportPeopleAdress: "",
        reportContent: "",
        reportNote: "",
        reportPeopleTel:"", 
        reportPeopleIDNuber:"",
        reporterSign: "",
        reporterSignTime: "",
        recorderSign: "",
        recorderSignTime: ""
      },
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseDoctypeId: this.BASIC_DATA_SYS.reportRecordDoc_caseDoctypeId, //文书类型ID
        //表单数据
        docData: "",
        status: ""
        //   linkTypeId: this.BASIC_DATA_SYS.partyRights_caseLinktypeId
      },
      rules: {
        reportTime: [
          { required: true, message: "请输入举报时间", trigger: "blur" }
        ],
        reportType: [
          { required: true, message: "请选择举报类型", trigger: "change" }
        ],
        reportPeopleTel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        reportPeopleIDNuber: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
          { validator: validateIDNumber, trigger: "blur" }
        ],
        reportContent: [
          { required: true, message: "请输入举报内容", trigger: "blur" }
        ],

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
      allReportType:['来信','来电','来访'],
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
      propertyFeatures: ""
    };
  },
  methods: {
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.caseDocDataForm.caseDoctypeId
      };
      this.com_getDocDataByCaseIdAndDocId(data);
    },
    
    //保存文书信息
    addDocData(handleType) {
      this.com_addDocData(handleType, "docForm");
    },
    // 多行编辑
    overFlowEdit() {
      this.$refs.overflowInputRef.showModal(0, "", this.maxLengthOverLine);
    },
    // 获取多行编辑内容
    getOverFloeEditInfo(edit) {
      this.docData.hearingRecord = edit;
    },
    //提交
    // submitData(handleType) {
    //   this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
    //   this.$router.push({
    //     name: this.$route.params.url
    //   });
    // },
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
    }
  },
  mounted() {
    this.getDocDataByCaseIdAndDocId();
  },
  created() {
    this.isOverStatus();
  }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">
#reportRecordDoc_print {
  .overflow_lins_textarea {
    & > textarea {
      text-indent: 5em;
    }
  }
}
</style>
