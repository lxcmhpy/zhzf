<template>
  <div class="print_box">
    <div class="print_info" id="establish-print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
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
            <td rowspan="3" style="width:40px">案件调查人员</td>
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
                <el-input type="textarea" v-model="docData.certificateId2"  placeholder="\" :autosize="{ minRows: 1, maxRows: 2}" :disabled="fieldDisabled(propertyFeatures['certificateId2'])"></el-input>
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
              <el-form-item prop="note" :rules="fieldRules('note',propertyFeatures['note'])">
                <el-input type="textarea" v-model="docData.note" :autosize="{ minRows: 3, maxRows: 3}"  :disabled="fieldDisabled(propertyFeatures['note'])"  maxlength="30" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <div class="notice clear">
          <span>(报告一式两份，其中一份用于向上级备案，本页填写不下的可另附纸。)</span>
        </div>
      </el-form>
    </div>
    <casePageFloatBtns
      :pageDomId="'question_print'"
      :formOrDocData="formOrDocData"
      @submitData="submitData"
      @saveData="saveData"
      @backHuanjie="submitData"
    ></casePageFloatBtns>
    <!-- <casePageFloatBtns :formOrDocData="formOrDocData" @saveData="saveData"></casePageFloatBtns> -->
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
        defaultCertificateId:'',
        certificateId1:'',
        certificateId2:'',
        staff2:'',
        staff1:'',
        defaultStaff:'',
        agencyOpinions:'',
        evidence:'',
        process:'',
        number:'',
        carLocation:'',
        partyManager:'',
        partyName:'',
        partyAddress:'',
        party:'',
        note:'',
      },
     caseDocDataForm: {
        id: "",   //修改的时候用
        caseBasicinfoId: '',   //案件ID
        caseDoctypeId: '2955023b99943d7c21e54c5d84d82667',     //文书类型ID
        //文书数据
        docData: "",
        status: "",   //提交状态
        note:"",//文书名字 
        docDataId:"", //多份文书的id
        linkTypeId:this.$route.params.caseLinkTypeId //所属环节的id
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
      console.log(this.caseId)
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId
      };
      console.log(data);
      this.com_getDocDataByCaseIdAndDocId(data);
    },
    addDocData(handleType) {
      this.com_addDocData(handleType);
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
      this.docData.certificateId2 = this.docData.defaultCertificateId.split(',')[staffIndex];
      console.log(staffIndex);
    },
    getDataAfter() {
      this.staffList = this.docData.defaultStaff.split(',');
      this.docData.staff1 = this.staffList[0];
      this.docData.staff2 = this.staffList[1];
      this.docData.certificateId1 = this.docData.defaultCertificateId.split(",")[0];
      this.docData.certificateId2 = this.docData.defaultCertificateId.split(",")[1];

    },
    //根据类型
    setDataForPelple() {
      let selectPeo = JSON.parse(this.$route.params.addMoreData).askData.peopleAndRelationType;
      //  console.log('addMoreData',selectPeo);

      let selectPeo2 = selectPeo.split('-'); //[name,relation]
      console.log('selectPeo2', selectPeo2);
      let dailiDataList = JSON.parse(this.docData.agentPartyEcertId);
      let dailiData = "";
      dailiDataList.forEach(item => {
        console.log('其他人', item);
        if (item.relationWithCase == selectPeo2[1] && item.name == selectPeo2[0]) {
          console.log('不是当事人')
          dailiData = item;
          console.log('dailiData22222', dailiData);
          this.docData.inquiriedRelation = item.relationWithCase;

          return;
        }

      })

    },
    //修改人员
    changeStaff1(val) {
      let staffIndex = this.docData.defaultStaff.split(',').indexOf(val);
      this.docData.certificateId1 = this.docData.defaultCertificateId.split(',')[staffIndex];
    },
    changeStaff2(val) {
      let staffIndex = this.docData.defaultStaff.split(',').indexOf(val);
      this.docData.certificateId2 = this.docData.defaultCertificateId.split(',')[staffIndex];
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
        this.staffList = data2.defaultStaff.split(',');
        
      }, err => {
        console.log(err);
      })
    },
  },
  created() {
    this.isOverStatus();
    this.getDocDataByCaseIdAndDocId();
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
