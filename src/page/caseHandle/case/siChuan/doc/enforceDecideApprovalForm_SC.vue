<template>
  <div class="print_box printNumbers_box" id="enforceDecideApprovalForm_SC_print" style="width:790px; margin:0 auto;">
    <el-form
      :rules="rules"
      ref="docForm"
      :inline-message="true"
      :inline="true"
      :model="docData"
      :disabled="disableWhenApproval"
    >
      <div class="print_info" style="height: auto">
        <div class="doc_topic">行政强制执行审批表</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <table class="print_table prolong_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td rowspan="2">案由</td>
            <td colspan="7" rowspan="2" class="color_DBE4EF">
              <el-form-item
                prop="caseName"
                :rules="fieldRules('caseName',propertyFeatures['caseName'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.caseName"
                  v-bind:class="{ over_flow:docData.caseName.length>14?true:false }"
                  placeholder="/"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  :disabled="fieldDisabled(propertyFeatures['caseName'])"
                ></el-input>
              </el-form-item>
            </td>
            <td rowspan="2">案件调查人员</td>
            <td colspan="2" class="color_DBE4EF" style="min-width:80px">
              <el-form-item prop="staff1" :rules="fieldRules('staff1',propertyFeatures['staff1'])">
                <el-input
                  type="textarea"
                  v-model="docData.staff1"
                  v-bind:class="{ over_flow:docData.staff1 && docData.staff1.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 4}"
                  maxlength="32"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['staff1'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2" class="color_DBE4EF" style="min-width:80px">
              <el-form-item prop="staff2" :rules="fieldRules('staff2',propertyFeatures['staff2'])">
                <el-input
                  type="textarea"
                  v-model="docData.staff2"
                  v-bind:class="{ over_flow:docData.staff2 && docData.staff2.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 4}"
                  maxlength="32"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['staff2'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="5" class="center">
              <p>当</p>
              <p>事</p>
              <p>人</p>
              <p>基</p>
              <p>本</p>
              <p>情</p>
              <p>况</p>
            </td>
            <td rowspan="2">个人</td>
            <td>姓名</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="party" :rules="fieldRules('party',propertyFeatures['party'],'',isParty)">
                <el-input type="textarea" v-model="docData.party" :disabled="!isParty || fieldDisabled(propertyFeatures['party'])" v-bind:class="{ over_flow:docData.party.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="/"></el-input>
              </el-form-item>
            </td>
            <td>性别</td>
            <td colspan="2"  class="color_DBE4EF">
              <el-form-item prop="partySex" v-if="!approval" :rules="fieldRules('partySex',propertyFeatures['partySex'],'',isParty)">
                <el-select v-model="docData.partySex" :disabled="!isParty || fieldDisabled(propertyFeatures['partySex'])" placeholder="/">
                  <el-option value="0" label="男"></el-option>
                  <el-option value="1" label="女"></el-option>
                </el-select>
              </el-form-item>
              <span v-else>{{docData.partySex == 0 ? '男' :'女'}}</span>
            </td>
            <td>年龄</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyAge" :rules="fieldRules('partyAge',propertyFeatures['partyAge'],'',isParty)">
                <el-input type="textarea" v-model="docData.partyAge" 
                :disabled="!isParty || fieldDisabled(propertyFeatures['partyAge'])"
                v-bind:class="{ over_flow:docData.partyAge.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" maxlength="3" placeholder="/"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>住址</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyAddress" :rules="fieldRules('partyAddress',propertyFeatures['partyAddress'],'',isParty)">
                <el-input  type="textarea" v-model="docData.partyAddress" :disabled="!isParty || fieldDisabled(propertyFeatures['partyAddress'])" 
                v-bind:class="{ over_flow:docData.partyAddress.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" maxlength="64" placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
            <td>身份证件号</td>
            <td colspan="2"  class="color_DBE4EF">
              <el-form-item prop="partyIdNo" :rules="fieldRules('partyIdNo',propertyFeatures['partyIdNo'],validateIDNumber,isParty)">
                <el-input type="textarea" v-model="docData.partyIdNo" :disabled="!isParty || fieldDisabled(propertyFeatures['partyIdNo'])" v-bind:class="{ over_flow:docData.partyIdNo.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" maxlength="18" placeholder="/"></el-input>
              </el-form-item>
            </td>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyTel" :rules="fieldRules('partyTel',propertyFeatures['partyTel'],validatePhone,isParty)">
                <el-input type="textarea" v-model="docData.partyTel" :disabled="!isParty || fieldDisabled(propertyFeatures['partyTel'])" v-bind:class="{ over_flow:docData.partyTel.length>6?true:false }" :autosize="{ minRows: 2, maxRows: 3}" maxlength="11" placeholder="/"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="3">单位</td>
            <td>名称</td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item prop="partyName" :rules="fieldRules('partyName',propertyFeatures['partyName'],'',!isParty)">
                <el-input type="textarea" v-model="docData.partyName" :disabled="isParty || fieldDisabled(propertyFeatures['partyName'])" v-bind:class="{ over_flow:docData.partyName.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="/"></el-input>
              </el-form-item>
            </td>
            <td>法定代表人</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyManager" :rules="fieldRules('partyManager',propertyFeatures['partyManager'],'',!isParty)">
                <el-input type="textarea" v-model="docData.partyManager" :disabled="isParty || fieldDisabled(propertyFeatures['partyManager'])" v-bind:class="{ over_flow:docData.partyManager.length>3?true:false }" :autosize="{ minRows: 1, maxRows: 2}" maxlength="10" placeholder="/" ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>地址</td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item prop="partyUnitAddress" :rules="fieldRules('partyUnitAddress',propertyFeatures['partyUnitAddress'],'',!isParty)">
                <el-input type="textarea" v-model="docData.partyUnitAddress" :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitAddress'])" v-bind:class="{ over_flow:docData.partyUnitAddress.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 2}" maxlength="64" placeholder="/"></el-input>
              </el-form-item>
            </td>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyUnitTel" :rules="fieldRules('partyUnitTel',propertyFeatures['partyUnitTel'],validatePhone,!isParty)">
                <el-input type="textarea" v-model="docData.partyUnitTel" :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitTel'])" v-bind:class="{ over_flow:docData.partyUnitTel.length>6?true:false }" :autosize="{ minRows: 1, maxRows: 3}" maxlength="11" placeholder="/"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2">统一社会信用代码</td>
            <td colspan="7" class="color_DBE4EF">
              <el-form-item prop="socialCreditCode" :rules="fieldRules('socialCreditCode',propertyFeatures['socialCreditCode'],'',!isParty)">
                <el-input type="textarea" v-model="docData.socialCreditCode" :disabled="isParty || fieldDisabled(propertyFeatures['socialCreditCode'])" v-bind:class="{ over_flow:docData.socialCreditCode.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" maxlength="20" placeholder="/"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="center">
              <p>案</p>
              <p>件</p>
              <p>基</p>
              <p>本</p>
              <p>情</p>
              <p>况</p>
              <p>及</p>
              <p>行</p>
              <p>政</p>
              <p>决</p>
              <p>定</p>
            </td>
            <td colspan="10" class="color_DBE4EF">
              <el-form-item
                prop="illegalFact"
                :rules="fieldRules('illegalFact',propertyFeatures['illegalFact'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.illegalFact"
                  v-bind:class="{ over_flow:docData.illegalFact && docData.illegalFact.length>30?true:false }"
                  :autosize="{ minRows: 1, maxRows: 10}"
                  maxlength="500"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['illegalFact'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="center">
              <p>当</p>
              <p>事</p>
              <p>人</p>
              <p>履</p>
              <p>行</p>
              <p>情</p>
              <p>况</p>
              <p>及</p>
              <p>催</p>
              <p>告</p>
              <p>情</p>
              <p>况</p>
            </td>
            <td colspan="10" class="color_DBE4EF">
              <el-form-item
                prop="enforceSituation"
                :rules="fieldRules('enforceSituation',propertyFeatures['enforceSituation'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.enforceSituation"
                  v-bind:class="{ over_flow:docData.enforceSituation && docData.enforceSituation.length>30?true:false }"
                  :autosize="{ minRows: 1, maxRows: 10}"
                  maxlength="500"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['enforceSituation'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="center" style="height:240px">
              <p>强</p>
              <p>制</p>
              <p>执</p>
              <p>行</p>
              <p>建</p>
              <p>议</p>
            </td>
            <td colspan="10" class="color_DBE4EF">
              <el-form-item prop="lawOfficeOpinions" style="height:55%;">
                <el-input style="float:left;margin-top:10px;" 
                  type="textarea" v-model="docData.lawOfficeOpinions"
                  v-bind:class="{ over_flow:docData.lawOfficeOpinions && docData.lawOfficeOpinions.length>30?true:false }"
                  :autosize="{ minRows: 1, maxRows: 10}" maxlength="500" placeholder="/"></el-input> 
              </el-form-item>
              <div class="pdf_seal alginLast" style="white-space:nowrap;height:30%;width:auto;margin-bottom:20px;margin-right:80px;">
                <p>执法人员签名:{{docData.lawOfficeName}}</p>
                <p>
                  <el-form-item prop="lawOfficeTime" :rules="fieldRules('lawOfficeTime',propertyFeatures['lawOfficeTime'])">
                  <el-date-picker v-model="docData.lawOfficeTime" format=" yyyy年MM月dd日" value-format="yyyy-MM-dd"
                    class="alginLast" placeholder="    年  月  日" type="date" @blur="starttime"></el-date-picker>
                  </el-form-item>
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td class="center">
              <p>执</p>
              <p>法</p>
              <p>机</p>
              <p>关</p>
              <p>负</p>
              <p>责</p>
              <p>人</p>
              <p>意</p>
              <p>见</p>
            </td>
            <td colspan="10" class="color_DBE4EF">
              <p class="approveDiv">{{docData.approveOpinions}}</p>
              <div class="pdf_seal alginLast" style="white-space:nowrap;width:auto;margin-top:160px;margin-right:80px;">
                <p>签名:{{docData.approvePeo}}</p>
                <p>
                  <el-date-picker v-model="docData.approveTime" format=" yyyy年MM月dd日" value-format="yyyy-MM-dd"
                    class="alginLast" placeholder="    年  月  日" type="date" @blur="starttime"></el-date-picker>
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td>备注</td>
            <td colspan="10" class="color_DBE4EF">
              <el-form-item
                prop="note"
                :rules="fieldRules('note',propertyFeatures['note'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.note"
                  v-bind:class="{ over_flow:docData.note.length>27?true:false }"
                  :autosize="{ minRows: 1, maxRows: 4}"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['note'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
      </div>
    </el-form>
    <casePageFloatBtns :formOrDocData="formOrDocData" @saveData="saveData"></casePageFloatBtns>
    <caseSlideMenu :activeIndex="''"></caseSlideMenu>
  </div>
</template>
<script>
import showApprovePeople from "@/page/caseHandle/components/showApprovePeople";
import approvalDialog from "@/page/caseHandle/components/approvalDialog";
import showLawOfficerOpion from "@/page/caseHandle/components/showLawOfficerOpion";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import caseSlideMenu from "@/page/caseHandle/components/caseSlideMenu";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import { validatePhone, validateIDNumber } from "@/common/js/validator";
import iLocalStroage from "@/common/js/localStroage";

export default {
  data() {
    return {
      validatePhone: validatePhone,
      validateIDNumber: validateIDNumber,
      docData: {
        caseNumber: "",
        caseName: "",
        staff: "",
        staff1: "",
        staff2: "",
        party: "",
        partySex:'',
        partyAge: "",
        partyAddress: "",
        partyIdNo: "",
        partyTel: "",
        partyName: "",
        partyManager: "",
        partyUnitAddress: "",
        partyUnitTel: "",
        socialCreditCode: "",
        illegalFact: "",
        approveOpinions: "",
        approvePeo: "",
        approveTime: "",
        enforceSituation: "",
        lawOfficeOpinions: "",
        lawOfficeName: "",
        lawOfficeTime: "",
        note: ""
      },
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseDoctypeId: this.$route.params.docId, //文书类型ID
        //文书数据
        docData: "",
        status: "", //提交状态
        linkTypeId: this.$route.params.caseLinkTypeId, //所属环节的id
      },
      handleType: 0,
      options: [
        { value: "1", label: " " },
        { value: "2", label: "份" },
        { value: "3", label: "套" },
        { value: "4", label: "个" },
        { value: "5", label: "件" },
        { value: "6", label: "张" },
      ],
      rules: {
        caseName: [
          { required: true, message: "案由不能为空", trigger: "blur" },
        ],
        staff1: [
          { required: true, message: "案件调查人员不能为空", trigger: "blur" },
        ],
        staff2: [
          { required: true, message: "案件调查人员不能为空", trigger: "blur" },
        ],
        party: [
          { required: true, message: "当事人姓名不能为空", trigger: "blur" }
        ],
        partyIdNo: [
          { required: true, message: "身份证号不能为空", trigger: "blur" },
          { validator: validateIDNumber, trigger: "blur" }
        ],
        partyTel: [
          { required: true, message: "联系电话不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        partyAddress: [
          { required: true, message: "住址不能为空", trigger: "blur" }
        ],
        partyAge: [
          { required: true, message: "年龄不能为空", trigger: "blur" }
        ],
        partySex: [
          { required: true, message: "请选择性别", trigger: "change" }
        ],
        partyName: [
          { required: true, message: '单位名称不能为空', trigger: 'blur' },
        ],
        partyManager: [
          { required: true, message: '法人不能为空', trigger: 'blur' },
        ],
        partyUnitAddress: [
          { required: true, message: '单位地址不能为空', trigger: 'blur' },
        ],
        partyUnitTel: [
          { required: true, message: '单位联系电话不能为空', trigger: 'blur' },
          { validator: validatePhone, trigger: "blur" }
        ],
        socialCreditCode: [
          { required: true, message: '社会信用代码不能为空', trigger: 'blur' },
        ],
        illegalFact: [
          { required: true, message: "案件基本情况不能为空", trigger: "blur" },
        ],
        enforceSituation: [
          { required: true, message: "履行和催告情况不能为空", trigger: "blur" },
        ],
        lawOfficeOpinions: [
          { required: true, message: "强制执行建议不能为空", trigger: "blur" },
        ],
         lawOfficeTime: [
          { required: true, message: "执法人员签名时间不能为空", trigger: "blur" },
        ],
      },
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
          false,
        ], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        pageDomId: "caseInvest-print",
      },
      approvalOver: false, //审核完成
      nameLength: 10,
      sexLength: 2,
      adressLength: 23,
      isParty: true,
      needDealData: true,
      disableWhenApproval: false,
      propertyFeatures: "", //字段属性配置
    };
  },
  computed: { ...mapGetters(["caseId"]) },
  mixins: [mixinGetCaseApiList],
  components: {
    showApprovePeople,
    approvalDialog,
    casePageFloatBtns,
    caseSlideMenu,
    showLawOfficerOpion,
  },
  methods: {
    starttime(){
      if (Date.parse(this.docData.lawOfficeTime) < Date.parse(this.docData.lasj.substr(0,10))) {
        this.$message({
          message: '当前时间不得小于立案时间',
          type: 'warning'
        });
        this.docData.lawOfficeTime = '';
      }
    },
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
    //对原始数据做一下处理
    getDataAfter() {
      if(!this.docData.staff1){
        this.docData.staff1 = this.docData.staff.split(',')[0];
        this.docData.staff2 = this.docData.staff.split(',')[1];
      }
    },
  },
  created() {
    this.getDocDataByCaseIdAndDocId()
    this.isOverStatus();
  },
};
</script>

<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss">
</style>
<style lang="scss">
#enforceDecideApprovalForm_SC_print{
  .prolong_table {
    table-layout: fixed;
    td, p, span, .el-checkbox {
      white-space: normal;
      word-wrap: break-word;
      word-break: break-all;
    }
  }
  .alginLast{
    text-align: right;
     .el-input__inner{
       text-align-last: right;  
     }
  }
  .center{
    text-align: center;
    text-align-last: center;  

  }
}
</style>
