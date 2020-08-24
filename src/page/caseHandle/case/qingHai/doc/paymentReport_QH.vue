<template>
  <div class="print_box">
    <div class="print_info" id="establish-print">
      <el-form :rules="rules" ref="establishForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">公路赔（补）偿案件调查报告</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
            <tr>
            <td rowspan="3">案由</td>
            <td rowspan="3" class="color_DBE4EF">
              <el-form-item prop="caseName" :rules="fieldRules('caseName',propertyFeatures['caseName'])">
                <el-input type="textarea" v-model="docData.caseName" :disabled="fieldDisabled(propertyFeatures['caseName'])" :autosize="{ minRows: 3, maxRows: 6}" maxlength="90" placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td rowspan="3" style="width:40px">案件承办人</td>
            <td>姓 名</td>
            <td>证件号</td>
          </tr>
          <tr>
            <td  class="color_DBE4EF">
              <el-form-item prop="staff1" :rules="fieldRules('staff1',propertyFeatures['staff1'])">
                <el-select v-model="docData.staff1" prop="staff1" :maxLength='maxLength' @change="changeStaff1" :disabled="fieldDisabled(propertyFeatures['staff1'])">
                  <el-option v-for="(item,index) in staffList" :key="index" :value="item" :label="item" :disabled="docData.staff2==item"></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td  class="color_DBE4EF">
              <el-form-item prop="certificateId1" :rules="fieldRules('certificateId1',propertyFeatures['certificateId1'])">
                <el-input type="textarea" clearable class="w-120" v-model="docData.certificateId1" size="small" placeholder="请输入" :disabled="fieldDisabled(propertyFeatures['certificateId1'])"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td  class="color_DBE4EF">
              <el-form-item prop="staff2" :rules="fieldRules('staff2',propertyFeatures['staff2'])">
                <el-select v-model="docData.staff2" :maxLength='maxLength' @change="changeStaff2" placeholder="请选择" :disabled="fieldDisabled(propertyFeatures['staff2'])">
                  <el-option v-for="(item,index) in staffList" :key="index" :value="item" :label="item" :disabled="docData.staff1==item"></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td  class="color_DBE4EF">
              <el-form-item prop="certificateId2" :rules="fieldRules('certificateId2',propertyFeatures['certificateId2'])">
                <el-input type="textarea" v-model="docData.certificateId2" :maxLength='maxLength' placeholder="\" :autosize="{ minRows: 1, maxRows: 2}" :disabled="fieldDisabled(propertyFeatures['certificateId2'])"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="3" style="width:42px;">
              当事人基本情况
            </td>
            <td colspan="2" class="color_DBE4EF">
              <p>姓名：<el-form-item style="width:calc(100% - 56px)" prop="party" :rules="fieldRules('party',propertyFeatures['party'])">
                  <el-input type="textarea" v-model="docData.party" :disabled="fieldDisabled(propertyFeatures['party'])" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
                </el-form-item>
              </p>
            </td>
            <td colspan="2" class="color_DBE4EF">
              <p>地址： <el-form-item style="width:calc(100% - 56px)" prop="partyAddress" :rules="fieldRules('partyAddress',propertyFeatures['partyAddress'])">
                  <el-input type="textarea" v-model="docData.partyAddress" :disabled="fieldDisabled(propertyFeatures['partyAddress'])" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
                </el-form-item>
              </p>
            </td>
          </tr>
          <tr>
            <td colspan="2" class="color_DBE4EF">
              <p>单位名称： <el-form-item style="width:calc(100% - 88px)" prop="partyName" :rules="fieldRules('partyName',propertyFeatures['partyName'])">
                  <el-input type="textarea" v-model="docData.partyName" :disabled="fieldDisabled(propertyFeatures['partyName'])" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
                </el-form-item>
              </p>
            </td>
            <td colspan="2" class="color_DBE4EF">
              <p>法定代表人： <el-form-item style="width:calc(100% - 104px);" prop="partyManager" :rules="fieldRules('partyManager',propertyFeatures['partyManager'])">
                  <el-input type="textarea" v-model="docData.partyManager" :disabled="fieldDisabled(propertyFeatures['partyManager'])" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
                </el-form-item>
              </p>
            </td>
          </tr>
          <tr>
            <td colspan="2" class="color_DBE4EF">
              <p>车辆所在地： <el-form-item style="width:calc(100% - 104px);" prop="carLocation" :rules="fieldRules('carLocation',propertyFeatures['carLocation'])">
                  <el-input type="textarea" v-model="docData.carLocation" :disabled="fieldDisabled(propertyFeatures['carLocation'])" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
                </el-form-item>
              </p>
            </td>
            <td colspan="2" class="color_DBE4EF">
              <p>车型、车牌号：<el-form-item prop="vehicleType" style="width:calc(50% - 60px);" :rules="fieldRules('vehicleType',propertyFeatures['vehicleType'])">
                  <el-input type="textarea" v-model="docData.vehicleType" :disabled="fieldDisabled(propertyFeatures['vehicleType'])" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
                </el-form-item>
                <el-form-item prop="number" style="width:calc(50% - 60px);" :rules="fieldRules('number',propertyFeatures['number'])">
                  <el-input type="textarea" v-model="docData.number" :disabled="fieldDisabled(propertyFeatures['number'])" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
                </el-form-item>
              </p>

            </td>
          </tr>
          <tr style="height:180px">
            <td>案件调查经过及结论</td>
            <td colspan="4" class="color_DBE4EF">
              <el-form-item prop="process" :rules="fieldRules('process',propertyFeatures['process'])">
                <el-input type="textarea" v-model="docData.process" :disabled="fieldDisabled(propertyFeatures['process'])" :autosize="{ minRows: 5, maxRows: 7}" maxlength="500" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr style="height:180px">
            <td>所附证据材料</td>
            <td  colspan="4" class="color_DBE4EF">
              <el-form-item prop="evidence" :rules="fieldRules('evidence',propertyFeatures['evidence'])">
                <el-input type="textarea" v-model="docData.evidence" :autosize="{ minRows: 5, maxRows: 7}"  :disabled="fieldDisabled(propertyFeatures['evidence'])"  maxlength="500" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr style="height:180px">
            <td>领导意见</td>
            <td  colspan="4" class="color_DBE4EF">
              <el-form-item prop="agencyOpinions" :rules="fieldRules('agencyOpinions',propertyFeatures['agencyOpinions'])">
                <el-input type="textarea" v-model="docData.agencyOpinions" :autosize="{ minRows: 5, maxRows: 7}"   :disabled="fieldDisabled(propertyFeatures['agencyOpinions'])" maxlength="500" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr style="height:80px">
            <td>备注</td>
            <td  colspan="4" class="color_DBE4EF">
              <el-form-item prop="note">
                <el-input type="textarea" v-model="docData.note" :autosize="{ minRows: 3, maxRows: 3}"  :disabled="fieldDisabled(propertyFeatures['note'])"  maxlength="30" placeholder="\"></el-input>
              </el-form-item>
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
import { BASIC_DATA_QH } from '@/common/js/BASIC_DATA_QH.js';
import {
  findCaseAllBindPropertyApi,
} from "@/api/caseHandle";
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
        caseLinktypeId: this.BASIC_DATA_QH.case_handle_paymentReport_QH_caseDocTypeId, //表单类型ID
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
      needDealData: true,
      editCaseInfo: '', //修改案件基本信息需要传的数据
      propertyFeatures: '', //字段属性配置
      staffList: []
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
      this.staffList = this.docData.staff.split(',');
      this.docData.staff1 = this.docData.staff.split(',')[0];
      this.docData.certificateId1 = this.docData.certificateId.split(',')[0];
      if (this.staffList.length == 2) {
        this.docData.staff2 = this.docData.staff.split(',')[1];
        this.docData.certificateId2 = this.docData.certificateId.split(',')[1];
      }
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
    },
    //修改人员
    changeStaff1(val) {
      let staffIndex = this.docData.staff.split(',').indexOf(val);
      this.docData.certificateId1 = this.docData.certificateId.split(',')[staffIndex];
    },
    changeStaff2(val) {
      let staffIndex = this.docData.staff.split(',').indexOf(val);
      this.docData.certificateId2 = this.docData.certificateId.split(',')[staffIndex];
      console.log(staffIndex);
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
    },
  },
  created() {
    this.setData();
    this.getCaseInfo();
    this.getLawOfficer();
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
