<template>
  <div class="print_box">
    <div class="print_info" id="establish-print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">公路赔（补）偿通知书（存根）</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td rowspan="3" style="width:42px;">
              当事人基本情况
            </td>
            <td class="color_DBE4EF">
              <p>姓名：<el-form-item style="width:calc(100% - 56px)" prop="party" :rules="fieldRules('party',propertyFeatures['party'])">
                  <el-input type="textarea" v-model="docData.party" :disabled="fieldDisabled(propertyFeatures['party'])" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
                </el-form-item>
              </p>
            </td>
            <td class="color_DBE4EF">
              <p>地址： <el-form-item style="width:calc(100% - 56px)" prop="partyAddress" :rules="fieldRules('partyAddress',propertyFeatures['partyAddress'])">
                  <el-input type="textarea" v-model="docData.partyAddress" :disabled="fieldDisabled(propertyFeatures['partyAddress'])" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
                </el-form-item>
              </p>
            </td>
          </tr>
          <tr>
            <td class="color_DBE4EF">
              <p>单位名称： <el-form-item style="width:calc(100% - 88px)" prop="partyName" :rules="fieldRules('partyName',propertyFeatures['partyName'])">
                  <el-input type="textarea" v-model="docData.partyName" :disabled="fieldDisabled(propertyFeatures['partyName'])" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
                </el-form-item>
              </p>
            </td>
            <td class="color_DBE4EF">
              <p>法定代表人： <el-form-item style="width:calc(100% - 104px);" prop="partyManager" :rules="fieldRules('partyManager',propertyFeatures['partyManager'])">
                  <el-input type="textarea" v-model="docData.partyManager" :disabled="fieldDisabled(propertyFeatures['partyManager'])" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
                </el-form-item>
              </p>
            </td>
          </tr>
          <tr>
            <td class="color_DBE4EF">
              <p>车辆所在地： <el-form-item style="width:calc(100% - 104px);" prop="carLocation" :rules="fieldRules('carLocation',propertyFeatures['carLocation'])">
                  <el-input type="textarea" v-model="docData.carLocation" :disabled="fieldDisabled(propertyFeatures['carLocation'])" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
                </el-form-item>
              </p>
            </td>
            <td class="color_DBE4EF">
              <p>车型、车牌号：<el-form-item prop="vehicleType" style="width:calc(50% - 60px);" :rules="fieldRules('vehicleType',propertyFeatures['vehicleType'])">
                  <el-input type="textarea" v-model="docData.vehicleType" :disabled="fieldDisabled(propertyFeatures['vehicleType'])" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
                </el-form-item>
                <el-form-item prop="number" style="width:calc(50% - 60px);" :rules="fieldRules('number',propertyFeatures['number'])">
                  <el-input type="textarea" v-model="docData.number" :disabled="fieldDisabled(propertyFeatures['number'])" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
                </el-form-item>
              </p>

            </td>
          </tr>
          <tr>
            <td rowspan="2">
              事实认定
            </td>
            <td class="color_DBE4EF" style="width:250px">
              <p>时间：<el-form-item style="width:calc(100% - 56px)" prop="afsj" :rules="fieldRules('afsj',propertyFeatures['afsj'])">
                  <el-date-picker style="width:200px" v-model="docData.afsj" :disabled="fieldDisabled(propertyFeatures['afsj'])" type="datetime" format="yyyy年MM月dd日HH时mm分" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
                </el-form-item>
              </p>

            </td>
            <td class="color_DBE4EF">
              <p>地点：<el-form-item style="width:calc(100% - 56px)" prop="afdd" v-if="!approval" :rules="fieldRules('afdd',propertyFeatures['afdd'])">
                  <el-input type="textarea" v-model="docData.afdd" :disabled="fieldDisabled(propertyFeatures['afdd'])" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
                </el-form-item>
              </p>

            </td>
          </tr>
          <tr style="height:80px">
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="caseSituation" :rules="fieldRules('caseSituation',propertyFeatures['caseSituation'])">
                <el-input type="textarea" v-model="docData.caseSituation" :disabled="fieldDisabled(propertyFeatures['caseSituation'])" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="200" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>法律法规依据</td>
            <td colspan="2" class="color_DBE4EF">
              <p>违反了 <el-form-item prop="illegalBasis" :rules="fieldRules('illegalBasis',propertyFeatures['illegalBasis'])">
                  <el-input type="textarea" v-model="docData.illegalBasis" :disabled="fieldDisabled(propertyFeatures['illegalBasis'])" :autosize="{ minRows: 1, maxRows: 2}" maxlength="50" placeholder="\"></el-input>
                </el-form-item>第<el-form-item prop="illegalLaw" :rules="fieldRules('illegalLaw',propertyFeatures['illegalLaw'])">
                  <el-input type="textarea" v-model="docData.illegalLaw" :disabled="fieldDisabled(propertyFeatures['illegalLaw'])" :autosize="{ minRows: 1, maxRows: 2}" maxlength="50" placeholder="\"></el-input>
                </el-form-item>的规定
              </p>
            </td>
          </tr>
          <tr style="height:180px">
            <td>赔补偿决定</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="payDecison" :rules="fieldRules('payDecison',propertyFeatures['payDecison'])">
                <el-input type="textarea" v-model="docData.payDecison" :disabled="fieldDisabled(propertyFeatures['payDecison'])" :autosize="{ minRows: 5, maxRows: 9}" maxlength="500" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr style="height:200px">
            <td>事项</td>
            <td colspan="2" class="color_DBE4EF">
              <p>
                1.当事人收到本通知书之日起3日内可向本执法单位陈述申辩。逾期则视为当事人放弃其上述权利。
              </p>
              <p> 2.当事人收到本通知书之日起15日内到 <el-form-item prop="bankInfo" :rules="fieldRules('bankInfo',propertyFeatures['bankInfo'])">
                  <el-input type="textarea" v-model="docData.bankInfo" :disabled="fieldDisabled(propertyFeatures['bankInfo'])" :autosize="{ minRows: 1, maxRows:3}" maxlength="50" placeholder="\"></el-input>
                </el-form-item>缴纳路产损坏赔偿费。如有疑义，可向<el-form-item prop="payResideParty" :rules="fieldRules('payResideParty',propertyFeatures['payResideParty'])">
                  <el-input type="textarea" v-model="docData.payResideParty" :disabled="fieldDisabled(propertyFeatures['payResideParty'])" :autosize="{ minRows: 1, maxRows: 3}" maxlength="50" placeholder="\"></el-input>
                </el-form-item>申请复核 。
              </p>
              <p>
                3.超过15日不予赔偿的，本机关将申请人民法院强制执行或依法强制执行。
              </p>
            </td>
          </tr>
          <tr>
            <td colspan="3" class="color_DBE4EF ">
              执行人:
              <span style="float:right;margin-right:20px">
                <span v-if="docData.approveTime">{{docData.approveTime}}</span>
                <span v-else>年 月 日</span>
              </span>
              <span style="float:right;margin-right:50px">单位：</span>
            </td>
          </tr>
          <tr style="height:80px">
            <td>备注</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="note" :rules="fieldRules('bankInfo',propertyFeatures['note'])">
                <el-input type="textarea" v-model="docData.note" :disabled="fieldDisabled(propertyFeatures['note'])" :autosize="{ minRows: 3, maxRows: 3}" maxlength="30" placeholder="\"></el-input>
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
        caseNumber: "",
        checkBox: [],
        caseName: "",
        afsj: "",
        party: "",
        note:'',
        partyAddress:'',
        partyManager:'',
        carLocation:'',
        number:'',
        afdd:'',
        note:'',
        payResideParty:'',
        bankInfo:'',
        payDecison:'',
        illegalLaw:'',
        illegalBasis:'',
        caseSituation:'',
        vehicleType:'',
        number:'',
        partyName:'',
      },
      caseDocDataForm: {
        id: "",   //修改的时候用
        caseBasicinfoId: '',   //案件ID
        caseDoctypeId: this.$route.params.docId,     //文书类型ID
        //文书数据
        docData: "",
        status: "",   //提交状态
        note: "",//文书名字
        docDataId: "", //多份文书的id
        linkTypeId: this.$route.params.caseLinkTypeId //所属环节的id
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
      // huanjieAndDocId: this.BASIC_DATA_QH.establish_JX_huanjieAndDocId, //立案登记表的文书id
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
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId
      };
      console.log(data);
      this.com_getDocDataByCaseIdAndDocId(data);
    },
    // setData() {
    //   console.log('setData');
    //   this.$store.commit("setCaseLinktypeId", this.BASIC_DATA_QH.case_handle_paymentReceipt_QH_caseDocTypeId);
    //   this.caseLinkDataForm.caseBasicinfoId = this.caseId;
    //   this.com_getFormDataByCaseIdAndFormId(
    //     this.caseLinkDataForm.caseBasicinfoId,
    //     this.caseLinkDataForm.caseLinktypeId,
    //     false
    //   );
    //   console.log('获取数据', this.docData)
    // },
    // 提交表单

    //保存文书信息
    saveData(handleType) {
      this.com_addDocData(handleType, "docForm");
    },
    submitData(handleType) {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: this.$route.params.url
      });
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
        //是否是完成状态
    isOverStatus() {
      if (this.$route.params.docStatus == '1') {
        this.formOrDocData.showBtn = [false, false, false, false, false, false, false, false, false, true]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    },
  },
  created() {
    // this.setData();
    // this.getCaseInfo();
    // this.getLawOfficer();
    this.getDocDataByCaseIdAndDocId();
    this.isOverStatus();
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
