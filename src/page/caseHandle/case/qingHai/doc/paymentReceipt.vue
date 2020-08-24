<template>
  <div class="print_box">
    <div class="print_info" id="establish-print">
      <el-form :rules="rules" ref="establishForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">收费凭据表</div>
        <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td rowspan="2">案由</td>
            <td rowspan="2" colspan="8" class="color_DBE4EF">
              <el-form-item prop="caseName" :rules="fieldRules('caseName',propertyFeatures['caseName'])">
                <el-input type="textarea" v-model="docData.caseName" :disabled="fieldDisabled(propertyFeatures['caseName'])" :autosize="{ minRows: 2, maxRows: 3}" maxlength="90" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td>
              <p>案发时间</p>
            </td>
            <td colspan="8" class="color_DBE4EF">
              <el-form-item prop="afsj" :rules="fieldRules('afsj',propertyFeatures['afsj'])" class="pdf_datapick">
                <el-date-picker v-model="docData.afsj" :disabled="fieldDisabled(propertyFeatures['afsj'])" type="datetime" format="yyyy年MM月dd日" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>案发地点</td>
            <td colspan="8" class="color_DBE4EF">
              <el-form-item prop="payTime" :rules="fieldRules('afdd',propertyFeatures['afdd'])">
                <el-input type="textarea" v-model="docData.afdd" :disabled="fieldDisabled(propertyFeatures['afdd'])" :autosize="{ minRows: 2, maxRows: 2}" maxlength="90" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>缴费单位</td>
            <td colspan="8" class="color_DBE4EF">
              <el-form-item prop="payParty" :rules="fieldRules('payParty',propertyFeatures['payParty'])">
                <el-input type="textarea" v-model="docData.payParty" :disabled="fieldDisabled(propertyFeatures['payParty'])" :autosize="{ minRows: 2, maxRows: 2}" maxlength="90" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>收费时间</td>
            <td colspan="8" class="color_DBE4EF">
              <el-form-item prop="payTime" :rules="fieldRules('payTime',propertyFeatures['payTime'])">
                <el-date-picker v-model="docData.payTime" :disabled="fieldDisabled(propertyFeatures['payTime'])" type="datetime" format="yyyy年MM月dd日" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr style="height: 400px;">
            <td>
              <p class="center_similar">收</p>
              <p class="center_similar">费</p>
              <p class="center_similar">票</p>
              <p class="center_similar">据</p>
              <p class="center_similar">复</p>
              <p class="center_similar">印</p>
              <p class="center_similar">件</p>
            </td>
            <td colspan="8" class="color_DBE4EF table_seal" style="white-space: pre-wrap;word-break:break-all">
              <!-- <div class="pdf_seal">
                <p>粘贴人</p>
              </div> -->
            </td>
          </tr>
          <tr>
            <td>
              <p class="center_similar">备</p>
              <p class="center_similar">注</p>
              <!-- <p>备注</p> -->
            </td>
            <td colspan="8" class="color_DBE4EF table_seal">
              <el-form-item prop="note">
                <el-input type="textarea" v-model="docData.note" :autosize="{ minRows: 1, maxRows: 2}" maxlength="30" placeholder="\"></el-input>
              </el-form-item>
              <div class="pdf_seal">
                <p>粘贴人:</p>
              </div>
            </td>
          </tr>
        </table>
      </el-form>
    </div>

    <casePageFloatBtns :formOrDocData="formOrDocData" @saveData="saveData"></casePageFloatBtns>
    <caseSlideMenu :activeIndex="''"></caseSlideMenu>
  </div>
</template>
<script>
import showApprovePeople from "@/page/caseHandle/components/showApprovePeople";
import approvalDialog from "@/page/caseHandle/components/approvalDialog";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import caseSlideMenu from '@/page/caseHandle/components/caseSlideMenu'

import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import { validateIDNumber, validatePhone, validateZIP } from '@/common/js/validator'
// import { BASIC_DATA_SYS } from '@/common/js/BASIC_DATA.js';
import { BASIC_DATA_QH } from '@/common/js/BASIC_DATA_QH.js';
export default {
  data() {
    return {
      // tableData: {},
      docData: {
        caseTypeKey: "",//案件字
        caseNumber: "",
        checkBox: [],
        caseName: "",
        afsj: "",
        party: "",
        partySex: '',
        partyAge: "",
      },
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件id
        caseLinktypeId: this.BASIC_DATA_QH.case_handle_paymentReceipt_QH_caseDocTypeId, //表单类型ID
        //表单数据
        docData: "",
        status: "",
      },
      rules: {
        checkBox: [
          { required: true, message: "案件来源不能为空", trigger: "change" }
        ],
        caseName: [
          { required: true, message: "案由不能为空", trigger: "blur" }
        ],
        afdd: [
          { required: true, message: "案发地点不能为空", trigger: "blur" }
        ],
        payParty: [
          { required: true, message: "缴费单位不能为空", trigger: "blur" }
        ],
        afsj: [
          { required: true, message: "案发时间不能为空", trigger: "blur" }
        ],
        payTime: [
          { required: true, message: "请选择收费时间", trigger: "change" }
        ],
      },
      nameLength: 23,
      adressLength: 23,
      maxLength: 12,
      lineStyleFlag: false,
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
          false
        ], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        pageDomId: 'establish-print'
      },
      huanjieAndDocId: this.BASIC_DATA_QH.establish_JX_huanjieAndDocId, //立案登记表的文书id
      approvalOver: false,//审核完成
      isParty: true, //当事人类型为个人
      caseSourceText3: "",
      caseSourceText4: "",
      caseSourceText5: "",
      caseSourceText6: "",
      caseSourceCheckBox: [],
      originalData: "",
      // 是否带入电话
      isPartyPhone: false,
      needDealData: true,
      editCaseInfo: '', //修改案件基本信息需要传的数据
      propertyFeatures: '', //字段属性配置
    };
  },
  components: {
    showApprovePeople,
    approvalDialog,
    // overflowInput,
    // overflowInput1,
    casePageFloatBtns,
    caseSlideMenu
  },
  computed: { ...mapGetters(["caseId"]) },
  mixins: [mixinGetCaseApiList],
  methods: {
    setData() {
      console.log('setData');
      this.$store.commit("setCaseLinktypeId", this.BASIC_DATA_QH.case_handle_paymentReceipt_QH_caseDocTypeId);
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(
        this.caseLinkDataForm.caseBasicinfoId,
        this.caseLinkDataForm.caseLinktypeId,
        false
      );
      console.log('获取数据', this.docData)
    },
    // 提交表单
    saveData(handleType) {
      //参数  提交类型 、formRef
      this.com_submitCaseForm(handleType, "establishForm", true);
    },

    //设置案件来源
    getDataAfter() {

    },
    //获取案件基本信息
    getCaseInfo() {
      let data = {
        id: this.caseId
      };
      this.$store.dispatch("getCaseBasicInfo", data)
        .then(
          res => {
            console.log('获取案件信息', res);
            this.editCaseInfo = {
              id: res.data.id,
              tempNo: res.data.tempNo
            }
          })
        .catch(err => { console.log(err) })
    },
    //修改案件基本信息
    gotoEditCase() {
      this.$router.push({
        name: "case_handle_inforCollect",
        params: { editFlag: true }
      })
    }
  },
  created() {
    this.setData();
    this.getCaseInfo();
  }
};
</script>
 <style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
 <style lang="scss">
#editCaseInfoBtn {
  margin: 20px;
}
#establish-print {
  .el-form-item__content .el-input__suffix {
    width: 20px;
    right: 0;
  }
}
</style>
