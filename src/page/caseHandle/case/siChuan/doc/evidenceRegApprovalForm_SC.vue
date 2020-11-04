<template>
  <div class="print_box">
    <div class="print_info" id="evidenceRegApprovalForm_SC_print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">证据登记保存审批表</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <table class="print_table prolong_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td rowspan="2">案
              <br />由</td>
            <td rowspan="2" colspan="9">
              <el-form-item
                prop="caseName"
                :rules="fieldRules('caseName',propertyFeatures['caseName'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.caseName"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['caseName'])"
                  placeholder="/"
                ></el-input>
              </el-form-item></td>
            <td rowspan="2" colspan="2">执法人员</td>
            <td colspan="2">
              <el-form-item
                prop="partyOne"
                :rules="fieldRules('partyOne',propertyFeatures['partyOne'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.partyOne"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyOne'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <el-form-item
                prop="partyTwo"
                :rules="fieldRules('partyTwo',propertyFeatures['partyTwo'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.partyTwo"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyTwo'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="6">
              当
              <br />事
              <br />人
            </td>
            <td rowspan="2">个人</td>
            <td colspan="2">姓名</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="party"
                :rules="fieldRules('party',propertyFeatures['party'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.party"
                  v-bind:class="{ over_flow:docData.party.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['party'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
            <td colspan="2">身份证件号</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="partyIdNo"
                :rules="fieldRules('partyIdNo',propertyFeatures['partyIdNo'],validateIDNumber,isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="docData.partyIdNo"
                  :maxLength="18"
                  placeholder="/"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyIdNo'])"
                ></el-input>
              </el-form-item>
            </td>
            <td colspan="2">年龄</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="partyAge"
                :rules="fieldRules('partyAge',propertyFeatures['partyAge'],'',isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="docData.partyAge"
                  :maxLength="18"
                  placeholder="/"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyAge'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2">住址</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="partyAddress"
                :rules="fieldRules('partyAddress',propertyFeatures['partyAddress'],'',isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="docData.partyAddress"
                  v-bind:class="{ over_flow:docData.partyAddress.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  maxlength="30"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyAddress'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
            <td colspan="2">联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="partyTel"
                :rules="fieldRules('partyTel',propertyFeatures['partyTel'],validatePhone,isParty)"
              >
                <el-input
                  v-model="docData.partyTel"
                  maxlength="11"
                  placeholder="/"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyTel'])"
                ></el-input>
              </el-form-item>
            </td>
            <td colspan="2">性别</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="partySex"
                :rules="fieldRules('partySex',propertyFeatures['partySex'],'',isParty)"
              >
                <el-select
                  placeholder="/"
                  v-model="docData.partySex"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partySex'])"
                >
                  <el-option :value="0" label="男"></el-option>
                  <el-option :value="1" label="女"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="4">单位</td>
            <td colspan="2">名称</td>
            <td colspan="10" class="color_DBE4EF">
              <el-form-item
                prop="partyName"
                :rules="fieldRules('partyName',propertyFeatures['partyName'],'',!isParty)"
              >
                <el-input
                  v-model="docData.partyName"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyName'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2">地址</td>
            <td colspan="10" class="color_DBE4EF">
              <el-form-item
                prop="partyUnitAddress"
                :rules="fieldRules('partyUnitAddress',propertyFeatures['partyUnitAddress'],'',!isParty)"
              >
                <el-input
                  v-model="docData.partyUnitAddress"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitAddress'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2">联系电话</td>
            <td colspan="4" class="color_DBE4EF">
              <el-form-item
                prop="partyUnitTel"
                :rules="fieldRules('partyUnitTel',propertyFeatures['partyUnitTel'],validatePhone,!isParty)"
              >
                <el-input
                  v-model="docData.partyUnitTel"
                  minlength="11"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitTel'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
            <td colspan="2">法定代表人</td>
            <td class="color_DBE4EF" colspan="4">
              <el-form-item
                prop="partyManager"
                :rules="fieldRules('partyManager',propertyFeatures['partyManager'],'',!isParty)"
              >
                <el-input
                  v-model="docData.partyManager"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyManager'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="4">统一社会信用代码</td>
            <td colspan="8" class="color_DBE4EF">
              <el-form-item
                prop="socialCreditCode"
                :rules="fieldRules('socialCreditCode',propertyFeatures['socialCreditCode'],'',!isParty)"
              >
                <el-input
                  v-model="docData.socialCreditCode"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['socialCreditCode'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="2">
              <p>案件调查经过及违法事实</p>
            </td>
            <td rowspan="2" colspan="13" class="color_DBE4EF">
              <el-form-item
                prop="basicSituation"
                :rules="fieldRules('basicSituation',propertyFeatures['basicSituation'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.basicSituation"
                  v-bind:class="{ over_flow:docData.basicSituation && docData.basicSituation.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 5}"
                  maxlength="200"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['basicSituation'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td rowspan="2">
              <p>实施证据登记保存理由</p>
            </td>
            <td rowspan="2" colspan="13" class="color_DBE4EF">
              <el-form-item
                prop="reason"
                :rules="fieldRules('reason',propertyFeatures['reason'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.reason"
                  v-bind:class="{ over_flow:docData.reason && docData.reason.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 5}"
                  maxlength="200"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['reason'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td :rowspan="docData.evdenceList.length==0?2:docData.evdenceList.length+1">
              <p>登记保存的证据</p>
            </td>
            <td colspan="2">序号</td>
            <td colspan="4">名称</td>
            <td colspan="4">规格</td>
            <td colspan="3">数量</td>
          </tr>
          <tr v-if="docData.evdenceList.length==0"  @click="handleAdd">
            <td colspan="2"></td>
            <td colspan="4"></td>
            <td colspan="4"></td>
            <td colspan="3"></td>
          </tr>
          <tr v-for="(item,index) in docData.evdenceList" :key="index"  @click="handleAdd">
            <td colspan="2" class="color_DBE4EF">{{item.evidenceNo}}</td>
            <td colspan="4" class="color_DBE4EF">{{item.evidenceName}}</td>
            <td colspan="4" class="color_DBE4EF">{{item.spec}}</td>
            <td colspan="3" class="color_DBE4EF">{{item.amount}}</td>
          </tr>
          <tr>
            <td rowspan="2">
              <p>调查人员意见</p>
            </td>
            <td rowspan="2" colspan="13" class="color_DBE4EF">
              <el-form-item
                prop="secondApproveOpinions"
                :rules="fieldRules('secondApproveOpinions',propertyFeatures['secondApproveOpinions'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.secondApproveOpinions"
                  :autosize="{ minRows: 1, maxRows: 5}"
                  maxlength="200"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['secondApproveOpinions'])"
                ></el-input>
              </el-form-item>
              <div class="pdf_seal">
                <p>签名：{{docData.secondApprovePeo}}</p>
                <p>
                  <span v-if="docData.secondApproveTime">{{docData.secondApproveTime}}</span>
                  <span v-else>年 月 日</span>
                </p>
              </div>
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td rowspan="2">
              <p>执法机关负责人意见</p>
            </td>
            <td rowspan="2" colspan="13" class="color_DBE4EF">
              {{docData.threeApproveOpinions}}
              <div class="pdf_seal">
                <p>签章：{{docData.threeApprovePeo}}</p>
                <p>
                  <span v-if="docData.threeApproveTime">{{docData.threeApproveTime}}</span>
                  <span v-else>年 月 日</span>
                  <!-- <el-form-item prop="makeDate" class="pdf_datapick">
                    <el-date-picker @blur="starttime" class="big_error" v-model="docData.makeDate" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-form-item> -->
                </p>
              </div>
            </td>
          </tr>
          <tr></tr>
        </table>
        <el-form-item  prop="evidenceLength" style="visibility:hidden">
          <el-input v-model="docData.evidenceLength"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="登记保存的证据" :visible.sync="addVisible" append-to-body width="60%" v-loading="addLoading">
      <div>
        <div class="fullscreen">
          <el-form ref="addEvidenceFormRef">
            <el-table :data="tableDatas" stripe border style="width: 100%">
              <el-table-column  prop="evidenceNo" label="序号" align="center">
              </el-table-column>

              <el-table-column label="名称" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.evidenceName"></el-input>
                </template>
              </el-table-column>

              <el-table-column prop="spec" label="规格" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.spec"></el-input>
                </template>
              </el-table-column>

              <el-table-column prop="amount" label="数量" align="center">
                <template slot-scope="scope">
                  <el-input-number size="mini" v-model="scope.row.amount" :min="1"  label="描述文字"></el-input-number>
                </template>
              </el-table-column>

              <!-- <el-table-column label="抽样地点" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.savePlace"></el-input>
                </template>
              </el-table-column> -->

              <el-table-column width="52%">
                <template slot-scope="scope">
                  <el-button class="evdence-form" size="mini" icon="el-icon-circle-close" circle @click="deleteEvidence(scope.row)" style="border-radius: 50px;"></el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-button icon="el-icon-circle-plus-outline"  circle type="info" @click="addTableData" style="margin-left: 50%;margin-top: 10px"></el-button>
          </el-form>
        </div>
        <div style="margin-left: 45%;margin-top: 10px">
            <el-button size="medium" type="primary" @click="addEvidenceSure('addEvidenceFormRef')">确 定</el-button>
            <el-button size="medium" @click="addVisible=false">取  消</el-button>
        </div>
      </div>
    </el-dialog>
    <casePageFloatBtns
      :pageDomId="'evidenceRegApprovalForm_SC_print'"
      :formOrDocData="formOrDocData"
      @saveData="saveData"
    ></casePageFloatBtns>
  </div>
</template>
<script>
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import { validatePhone, validateIDNumber } from "@/common/js/validator";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
export default {
  components: {
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  data() {
    //验证是否填写证据
    var validateEvidencLength = (rule, value, callback) => {
      if (this.docData.evdenceList.length == 0) {
        return callback(new Error("至少填写一个证据物品"));
      }
      callback();
    };
    return {
      validatePhone: validatePhone,
      validateIDNumber: validateIDNumber,
      isOverflow: false,
      addVisible:false,
      addLoading: false,
      docData: {
        evdenceList: [],
        caseNumber: "",
        party: "",
        partyIdNo: "",
        partyAge:"",
        partyAddress: "",
        partyTel: "",
        partySex:"",
        partyName: "",
        partyUnitAddress: "",
        partyUnitTel: "",
        partyManager: "",
        socialCreditCode: "",
        caseName: "",
        partyManager: "",
        basicSituation: "",
        reason: "",
        party:"",
        partyOne:"",
        partyTwo:"",
        detainGoods: "",
        days: "",
        startDate: "",
        endDate: "",
        approvePeo: "",
        approveTime: "",
        secondApproveOpinions: "",
        secondApprovePeo: "",
        secondApproveTime: "",
        threeApproveOpinions: "",
        threeApprovePeo: "",
        threeApproveTime: "",
      },
      evidenceLength:0,
      isParty: false,
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseDoctypeId: this.$route.params.docId, //文书类型ID
        docData: "",
        status: "", //提交状态
        linkTypeId: this.$route.params.caseLinkTypeId //所属环节的id
      },
      rules: {
        party: [
          { required: true, message: "当事人姓名不能为空", trigger: "blur" }
        ],
        caseName: [
          { required: true, message: "案由不能为空", trigger: "blur" }
        ],
        partyOne: [
          { required: true, message: "执法人员1不能为空", trigger: "blur" }
        ],
        partyTwo: [
          { required: true, message: "执法人员2不能为空", trigger: "blur" }
        ],
        partyIdNo: [
          { required: true, message: "当事人身份证件号不能为空", trigger: "blur" },
          { validator: validateIDNumber, trigger: "blur" }
        ],
        partyAge: [
          { required: true, message: "当事人年龄不能为空", trigger: "blur" }
        ],
        partySex: [
          { required: true, message: "当事人性别不能为空", trigger: "blur" }
        ],
        socialCreditCode: [
          { required: true, message: "单位统一社会信用代码不能为空", trigger: "blur" }
        ],
        partyAddress: [
          { required: true, message: "当事人联系地址不能为空", trigger: "blur" }
        ],
        partyTel: [
          {
            required: true,
            message: "当事人联系电话不能为空",
            trigger: "blur"
          },
          { validator: validatePhone, trigger: "blur" }
        ],
        partyName: [
          { required: true, message: "单位名称不能为空", trigger: "blur" }
        ],
        partyUnitAddress: [
          { required: true, message: "单位地址不能为空", trigger: "blur" }
        ],
        partyUnitTel: [
          { required: true, message: "单位联系电话不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        partyManager: [
          { required: true, message: "法人不能为空", trigger: "blur" }
        ],
        basicSituation: [
          { required: true, message: "基本情况不能为空", trigger: "blur" }
        ],
        reason: [
          { required: true, message: "保存理由不能为空", trigger: "blur" }
        ],
        detainGoods: [
          { required: true, message: "保存物品详情不能为空", trigger: "blur" }
        ],
        days: [
          { required: true, message: "保存时长不能为空", trigger: "blur" }
        ],
        // startDate: [
        //   { required: true, message: "开始日期不能为空", trigger: "change" }
        // ],
        // endDate: [
        //   { required: true, message: "结束日期不能为空", trigger: "change" }
        // ],
        evidenceLength: [
           { validator: validateEvidencLength,trigger: "blur" }
        ],
      },
      nameLength: 23,
      adressLength: 23,
      maxLength: 23,
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
        pageDomId: "evidenceRegApprovalForm_SC_print"
      },
      approvalOver: false, //审核完成
      propertyFeatures: "",
      needDealData:true,
      tableDatas:[]
    };
  },
  methods: {
    starttime(){
      if (Date.parse(this.docData.secondApproveTime) < Date.parse(this.docData.lasj)) {
        this.$message({
          message: '当前时间不得小于立案时间',
          type: 'warning'
        });
        this.docData.secondApproveTime = '';
      }
      if (Date.parse(this.docData.threeApproveTime) < Date.parse(this.docData.lasj)) {
        this.$message({
          message: '当前时间不得小于立案时间',
          type: 'warning'
        });
        this.docData.threeApproveTime = '';
      }
    },
    handleAdd(evidenceNo, row) {
        this.tableDatas = JSON.parse(JSON.stringify(this.docData.evdenceList));
        this.addVisible = true;
        if(this.tableDatas.length == 0){
        this.tableDatas.push({'evidenceNo': 1, 'amount' : 1});
        }
    },
    addTableData(){
      console.log(this.tableDatas)
      let length = this.tableDatas.length;
      if(length == 0){
        this.tableDatas.push({'amount' : 1});
      }else{
        this.tableDatas.push({'evidenceNo': Number(this.tableDatas[length - 1].evidenceNo) + 1, 'amount' : 1});
      }
    },
    //删除一行证据
    deleteEvidence(row) {
        for(let i=0; i<this.tableDatas.length; i++){
          if(this.tableDatas[i].evidenceNo > row.evidenceNo){
            this.tableDatas[i].evidenceNo = this.tableDatas[i].evidenceNo - 1;
          }
        }
        this.tableDatas.splice(row.evidenceNo-1, 1)
        console.log('newLing',this.tableDatas);
    },
    addEvidenceSure(formName){
      let canAdd = true;
      for(let i=0; i<this.tableDatas.length; i++){
          if(!this.tableDatas[i].evidenceName || !this.tableDatas[i].spec || !this.tableDatas[i].amount){
            this.$message({
              message: '数据至少有一项不为空！',
              type: 'warning'
            });
            canAdd = false;
            break;
          }
        }
        if(canAdd){
          this.docData.evdenceList = this.tableDatas;
          this.addVisible = false;
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
      console.log(this.docData)
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
    getDataAfter(){
      let detainGoodsArr = JSON.parse(this.docData.detainGoods);
      console.log('detainGoodsArr',detainGoodsArr);
      let detainGoodsNameArr = [];
      detainGoodsArr.forEach(item => {
        detainGoodsNameArr.push(item.evidenceName);
      });
      this.docData.detainGoods = detainGoodsNameArr.join(' ');
    }
  },
  mounted() {
    this.getDocDataByCaseIdAndDocId();
    this.isOverStatus(); 
  }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">
.prolong_table {
  table-layout: fixed;
  td, p, span, .el-checkbox {
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
  }
}
</style>
