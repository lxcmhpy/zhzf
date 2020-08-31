<template>
  <div class="print_box">
    <div class="print_info" id="establish-print">
      <el-form :rules="rules" ref="finishForm" :inline-message="true" :inline="true" :model="formData">
        <div class="doc_topic">公路赔（补）偿案件结案报告</div>
        <div class="doc_number">案号：{{formData.caseNumber}}</div>
        <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td rowspan="3">案由</td>
            <td rowspan="3" colspan="4" class="color_DBE4EF">
              <el-form-item prop="caseName" :rules="fieldRules('caseName',propertyFeatures['caseName'])">
                <el-input type="textarea" v-model="formData.caseName" :disabled="fieldDisabled(propertyFeatures['caseName'])" :autosize="{ minRows: 2, maxRows: 6}" maxlength="90" placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td rowspan="3" style="width:40px">案件承办人</td>
            <td>姓名</td>
            <td>证件号</td>
          </tr>
          <tr>
            <td class="color_DBE4EF">
              <el-form-item prop="staff1" :rules="fieldRules('staff1',propertyFeatures['staff1'])">
                <el-select v-model="formData.staff1" prop="staff1" :maxLength='maxLength' @change="changeStaff1" :disabled="fieldDisabled(propertyFeatures['staff1'])">
                  <el-option v-for="(item,index) in staffList" :key="index" :value="item" :label="item" :disabled="formData.staff2==item"></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td class="color_DBE4EF">
              <el-form-item prop="certificateId1" :rules="fieldRules('certificateId1',propertyFeatures['certificateId1'])">
                <el-input type="textarea" clearable class="w-120" v-model="formData.certificateId1" size="small" placeholder="请输入" :disabled="fieldDisabled(propertyFeatures['certificateId1'])"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="color_DBE4EF">
              <el-form-item prop="staff2" :rules="fieldRules('staff2',propertyFeatures['staff2'])">
                <el-select v-model="formData.staff2" :maxLength='maxLength' @change="changeStaff2" placeholder="请选择" :disabled="fieldDisabled(propertyFeatures['staff2'])">
                  <el-option v-for="(item,index) in staffList" :key="index" :value="item" :label="item" :disabled="formData.staff1==item"></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td class="color_DBE4EF">
              <el-form-item prop="certificateId2" :rules="fieldRules('certificateId2',propertyFeatures['certificateId2'])">
                <el-input type="textarea" v-model="formData.certificateId2" :maxLength='maxLength' placeholder="\" :autosize="{ minRows: 1, maxRows: 2}" :disabled="fieldDisabled(propertyFeatures['certificateId2'])"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr style="height:300px">
            <td colspan="9" class="color_DBE4EF">
              赔（补）偿决定：
              <el-form-item prop="decision" :rules="fieldRules('decision',propertyFeatures['decision'])">
                <el-input type="textarea" v-model="formData.decision" :rows="15" :disabled="fieldDisabled(propertyFeatures['decision'])" maxlength="300" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr style="height:236px">
            <td colspan="9" class="color_DBE4EF table_seal">
              执行情况：<br />
              <el-form-item prop="process" :rules="fieldRules('process',propertyFeatures['process'])">
                <el-input type="textarea" v-model="formData.process" :rows="7" :disabled="fieldDisabled(propertyFeatures['process'])" maxlength="300" placeholder="\"></el-input>
              </el-form-item>
              <div class="pdf_seal">
                <p>签名：{{formData.approvePeo}}</p>
                <p>
                  <span v-if="formData.approveTime">{{formData.approveTime}}</span>
                  <span v-else>年 月 日</span>
                </p>
              </div>
            </td>
          </tr>
          <tr style="height:150px">
            <td colspan="9" class="color_DBE4EF">
              备注：
              <el-form-item prop="note" :rules="fieldRules('note',propertyFeatures['note'])" style="width: calc(100% - 50px);">
                <el-input type="textarea" v-model="formData.note" :rows="4" maxlength="100" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <p>本报告一式两份，其中一份用于向上级备案，</p>
        <p>本页填写不下的可加附纸，并在备注中说明。
        </p>
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
      formData: {
        caseTypeKey: "",//案件字
        caseNumber: "",
        caseName: "",
        staff: '',
        certificateId: "",
        staff1: '',
        certificateId1: "",
        staff2: '',
        certificateId2: "",
        decision: "",
        process: "",
        approveTime: '',
        note: "",
      },
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件id
        caseLinktypeId: this.BASIC_DATA_QH.finishCaseReport_QH_caseLinktypeId, //表单类型ID
        //表单数据
        formData: "",
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
      huanjieAndDocId: this.BASIC_DATA_QH.finishCaseReport_QH_huanjieAndDocId, //立案登记表的文书id
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
    addDocData(handleType) {
      this.com_addDocData(handleType);
      // this.$store.dispatch("deleteTabs", this.$route.name);//关闭当前页签
      // this.$router.push({
      //   name: this.$route.params.url,
      // });
    },
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
    //是否是完成状态
    isOverStatus() {
      if (this.$route.params.docStatus == '1') {
        this.formOrDocData.showBtn = [false, false, false, false, false, false, false, false, false, true]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    },

    //更改执法人员2
    changeStaff2() {
      let staffIndex = this.staffList.indexOf(val);
      this.formData.certificateId2 = this.formData.certificateId.split(',')[staffIndex];
      console.log(staffIndex);
    },
    getDataAfter() {
      this.staffList = this.formData.staff.split(',');
      this.formData.staff1 = this.staffList[0];
      this.formData.staff2 = this.staffList[1];
      this.formData.certificateId1 = this.formData.certificateId.split(",")[0];
      this.formData.certificateId2 = this.formData.certificateId.split(",")[1];

    },
    //根据类型
    setDataForPelple() {
      let selectPeo = JSON.parse(this.$route.params.addMoreData).askData.peopleAndRelationType;
      //  console.log('addMoreData',selectPeo);

      let selectPeo2 = selectPeo.split('-'); //[name,relation]
      console.log('selectPeo2', selectPeo2);
      let dailiDataList = JSON.parse(this.formData.agentPartyEcertId);
      let dailiData = "";
      dailiDataList.forEach(item => {
        console.log('其他人', item);
        if (item.relationWithCase == selectPeo2[1] && item.name == selectPeo2[0]) {
          console.log('不是当事人')
          dailiData = item;
          console.log('dailiData22222', dailiData);
          this.formData.inquiriedRelation = item.relationWithCase;

          return;
        }
        // this.setDataForPelpleDetail(dailiData);

      })
      //当事人
      if (!dailiData) {
        console.log('是当事人')
        dailiData = {
          name: this.formData.party,
          sex: this.formData.partySex,
          zhengjianNumber: this.formData.partyIdNo,
          age: this.formData.partyAge,
          company: this.formData.partyUnitPosition,
          position: this.formData.occupation,
          tel: this.formData.partyTel,
          adress: this.formData.partyAddress,
        }

        // this.formData.inquiriedRelation = "当事人";
      }
      //与案件关系选择以上都不是时
      if (selectPeo2[0] == '以上均不是') {
        console.log('以上均不是')
        dailiData = {
          name: '',
          sex: '',
          zhengjianNumber: '',
          age: '',
          company: '',
          position: '',
          tel: '',
          adress: '',
        }
        // this.formData.inquiriedRelation = "";
      }
      this.setDataForPelpleDetail(dailiData);

    },
    setDataForPelpleDetail(dailiData) {
      console.log('dailiData', dailiData);
      this.formData.inquiried = dailiData.name;
      this.formData.inquiriedSex = Number(dailiData.sex);
      this.formData.inquiriedIdNo = dailiData.zhengjianNumber;
      this.formData.inquiriedAge = dailiData.age,
        this.formData.inquiriedUnitPosition = dailiData.company + " " + dailiData.position;
      this.formData.inquiriedAddress = dailiData.adress;
      this.formData.inquiriedTel = dailiData.tel;
      console.log(' this.formData.inquiriedSex', this.formData.inquiriedSex);
    },
    //修改人员
    changeStaff1(val) {
      let staffIndex = this.formData.staff.split(',').indexOf(val);
      this.formData.certificateId1 = this.formData.certificateId.split(',')[staffIndex];
    },
    changeStaff2(val) {
      let staffIndex = this.formData.staff.split(',').indexOf(val);
      this.formData.certificateId2 = this.formData.certificateId.split(',')[staffIndex];
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
    setData() {
      console.log('setData');
      this.$store.commit("setCaseLinktypeId", this.BASIC_DATA_JX.establish_JX_caseLinktypeId);
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(
        this.caseLinkDataForm.caseBasicinfoId,
        this.caseLinkDataForm.caseLinktypeId,
        false
      );
      console.log('获取数据', this.formData)
      if (this.formData.partyTel == '') {
        console.log('电话flag', this.isPartyPhone)
        this.isPartyPhone = true;
      }
    },
    // 提交表单
    saveData(handleType) {
      //参数  提交类型 、formRef
      this.com_submitCaseForm(handleType, "finishForm", true);
    },

    //设置执法人员
    getDataAfter() {
      this.staffList = this.formData.staff ? this.formData.staff.split(',') : [];
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
  mounted() {
    // this.isOverStatus();
    // this.getLawOfficer();
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
