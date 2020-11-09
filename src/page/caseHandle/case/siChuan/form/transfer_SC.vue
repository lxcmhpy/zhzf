<template>
  <div class="print_box" id='btnB'>
    <div class="print_info" id='obtanEvidence_print'>
      <el-form :rules="rules" ref="establishForm" :inline-message="true" :inline="true" :model="formData" :class="isPdf">
        <div class="doc_topic">案件移送书</div>
        <div class="doc_number">案号：{{formData.caseNumber}}</div>
        <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td><p>移送</p><p>机关</p></td>
            <td colspan="7" style="text-align-last:left;" class="color_DBE4EF">
              <el-form-item prop="organName" :rules="fieldRules('organName',propertyFeatures['organName'],'',isParty)">
                <el-input type='textarea' v-model="formData.organName" v-bind:class="{ over_flow:formData.organName.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" maxlength="100" 
                  :disabled="fieldDisabled(propertyFeatures['organName'])" placeholder="/"></el-input>
              </el-form-item>
              <!-- <p>(加盖印章)</p> -->
            </td>
            <td><p>地</p><p>址</p></td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="transAddress" :rules="fieldRules('transAddress',propertyFeatures['transAddress'],'',isParty)">
                <el-input type='textarea' v-model="formData.transAddress" :autosize="{ minRows: 1, maxRows: 3}" maxlength="30" :disabled="!isParty || fieldDisabled(propertyFeatures['transAddress'])" placeholder="/"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td><p>案件</p><p>主办</p><p>人员</p></td>
            <td colspan="7" style="text-align-last:left;" class="color_DBE4EF">
              <el-form-item prop="checkedUser" :rules="fieldRules('checkedUser',propertyFeatures['checkedUser'],'',isParty)">
                <el-input type='textarea' v-model="formData.checkedUser" :autosize="{ minRows: 1, maxRows: 3}" maxlength="50" 
                  :disabled="!isParty || fieldDisabled(propertyFeatures['checkedUser'])" placeholder="/"></el-input>
              </el-form-item>
            </td>
            <td><p>联</p><p>系</p><p>电</p><p>话</p></td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyPeopleTel" :rules="fieldRules('partyPeopleTel',propertyFeatures['partyPeopleTel'],validatePhone,isParty)">
                <el-input v-model="formData.partyPeopleTel" maxLength='11' placeholder="/" :disabled="!isParty || fieldDisabled(propertyFeatures['partyPeopleTel'])"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td><p>受移</p><p>送机</p><p>构</p></td>
            <td colspan="10" style="text-align-last:left;" class="color_DBE4EF">
              <el-form-item prop="transUnit" :rules="fieldRules('transUnit',propertyFeatures['transUnit'],'',isParty)">
                <el-input type='textarea' v-model="formData.transUnit" :autosize="{ minRows: 1, maxRows: 3}" maxlength="100" 
                  :disabled="!isParty || fieldDisabled(propertyFeatures['transUnit'])" placeholder="/"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="5">
              当<br>
              事<br>
              人
            </td>
            <td rowspan="2">个人</td>
            <td>姓名</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="party" :rules="fieldRules('party',propertyFeatures['party'],'',isParty)">
                <el-input type='textarea' v-model="formData.party" v-bind:class="{ over_flow:formData.party.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" 
                  :disabled="!isParty || fieldDisabled(propertyFeatures['party'])" placeholder="/"></el-input>
              </el-form-item>
            </td>
            <td>身份证件号</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyIdNo" :rules="fieldRules('partyIdNo',propertyFeatures['partyIdNo'],validateIDNumber,isParty)">
                <el-input type='textarea' v-model="formData.partyIdNo" :maxLength='18' placeholder="/" :autosize="{ minRows: 1, maxRows: 3}" :disabled="!isParty || fieldDisabled(propertyFeatures['partyIdNo'])"></el-input>
              </el-form-item>
            </td>
            <td>年龄</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="partyAge"
                :rules="fieldRules('partyAge',propertyFeatures['partyAge'],'',isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.partyAge"
                  :maxLength="18"
                  placeholder="/"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyAge'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>住址</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyAddress" :rules="fieldRules('partyAddress',propertyFeatures['partyAddress'],'',isParty)">
                <el-input type='textarea' v-model="formData.partyAddress" v-bind:class="{ over_flow:formData.partyAddress.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" maxlength="30" :disabled="!isParty || fieldDisabled(propertyFeatures['partyAddress'])" placeholder="/"></el-input>
              </el-form-item>
            </td>
            <td>联系<br>电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyTel" :rules="fieldRules('partyTel',propertyFeatures['partyTel'],validatePhone,isParty)">
                <el-input v-model="formData.partyTel" maxLength='11' placeholder="/" :disabled="!isParty || fieldDisabled(propertyFeatures['partyTel'])"></el-input>
              </el-form-item>
            </td>
            <td>性别</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="partySex"
                :rules="fieldRules('partySex',propertyFeatures['partySex'],'',isParty)"
              >
                <el-select
                  placeholder="/"
                  v-model="formData.partySex"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partySex'])"
                >
                  <el-option value="0" label="男"></el-option>
                  <el-option value="1" label="女"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="3"> 单位 </td>
            <td>名称</td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item prop="partyName" :rules="fieldRules('partyName',propertyFeatures['partyName'],'',!isParty)">
                <el-input v-model="formData.partyName" :maxLength='maxLength' :disabled="isParty || fieldDisabled(propertyFeatures['partyName'])" placeholder="/"></el-input>
              </el-form-item>
            </td>
            <td>法定代表人</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyManager" :rules="fieldRules('partyManager',propertyFeatures['partyManager'],'',!isParty)">
                <el-input v-model="formData.partyManager" :maxLength='maxLength' :disabled="isParty || fieldDisabled(propertyFeatures['partyManager'])" placeholder="/"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>地址</td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item prop="partyUnitAddress" :rules="fieldRules('partyUnitAddress',propertyFeatures['partyUnitAddress'],'',!isParty)">
                <el-input v-model="formData.partyUnitAddress" :maxLength='maxLength' :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitAddress'])" placeholder="/"></el-input>
              </el-form-item>
            </td>
            <td>联系<br>电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyUnitTel" :rules="fieldRules('partyUnitTel',propertyFeatures['partyUnitTel'],validatePhone,!isParty)">
                <el-input v-model="formData.partyUnitTel" minlength="11" :maxLength='maxLength' :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitTel'])" placeholder="/"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              统一社会信用代码
            </td>
            <td colspan="6" class="color_DBE4EF">
              <el-form-item prop="socialCreditCode" :rules="fieldRules('socialCreditCode',propertyFeatures['socialCreditCode'],'',!isParty)">
                <el-input v-model="formData.socialCreditCode" :maxLength='maxLength' :disabled="isParty || fieldDisabled(propertyFeatures['socialCreditCode'])" placeholder="/"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>涉嫌<br>违法<br>行为<br>或涉<br>嫌犯<br>罪罪<br>名<br></td>
            <td colspan="10" style="text-align-last:left;" class="color_DBE4EF">
              <el-form-item prop="copyReason" :rules="fieldRules('copyReason',propertyFeatures['copyReason'],'',isParty)">
                <el-input type='textarea' v-model="formData.copyReason" :autosize="{ minRows: 1, maxRows: 3}" maxlength="200" 
                  :disabled="fieldDisabled(propertyFeatures['copyReason'])"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td><p>案件</p><p>调查</p><p>情况</p></td>
            <td colspan="10" style="text-align-last:left;" class="color_DBE4EF">
              <el-form-item
                prop="basicSituation"
                :rules="fieldRules('basicSituation',propertyFeatures['basicSituation'])"
              >
                <el-input
                  type="textarea"
                  v-model="formData.basicSituation"
                  v-bind:class="{ over_flow:formData.basicSituation && formData.basicSituation.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 5}"
                  maxlength="200"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['basicSituation'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
              <td :rowspan="formData.evdenceList.length==0?2:formData.evdenceList.length+1">
                <p>涉</p>
                <p>案</p>
                <p>物</p>
                <p>品</p>
                <p>清</p>
                <p>单</p>
              </td>
              <td>序号</td>
              <td colspan="3">名称</td>
              <td>数量</td>
              <td colspan="2">特征</td>
              <td colspan="3">存放地</td>
          </tr>
          <tr v-for="(item,index) in formData.evdenceList" :key="index"  @click="handleAdd">
            <td class="color_DBE4EF">{{item.evidenceNo}}</td>
            <td class="color_DBE4EF" colspan="3">{{item.evidenceName}}</td>
            <td class="color_DBE4EF">{{item.amount}}</td>
            <td class="color_DBE4EF" colspan="2">{{item.spec}}</td>
            <td class="color_DBE4EF" colspan="3"><div style="">{{item.savePlace}}</div></td>
          </tr> 
          <tr>
            <td :rowspan="formData.evidenceList.length==0?2:formData.evidenceList.length+1">
              <p>移</p>
              <p>送</p>
              <p>材</p>
              <p>料</p>
              <p>清</p>
              <p>单</p>
            </td>
            <td>序号</td>
            <td colspan="4">移送材料名称</td>
            <td colspan="4">规格</td>
            <td colspan="3">数量</td>
          </tr>
          <tr v-for="(item,index) in formData.evidenceList" :key="'ev'+index"  @click="handleAdd1">
            <td class="color_DBE4EF">{{item.evidenceNo}}</td>
            <td colspan="4" class="color_DBE4EF">{{item.evidenceName}}</td>
            <td colspan="4" class="color_DBE4EF">{{item.spec}}</td>
            <td colspan="3" class="color_DBE4EF">{{item.amount}}</td>
          </tr>
          <tr>
            <td><p>备</p><p>注</p></td>
            <td colspan="10" style="text-align-last:left;" class="color_DBE4EF">
              <el-form-item prop="note" :rules="fieldRules('note',propertyFeatures['note'],'',isParty)">
                <el-input type='textarea' v-model="formData.note" :autosize="{ minRows: 1, maxRows: 3}" maxlength="50" 
                  :disabled="fieldDisabled(propertyFeatures['note'])" placeholder="/"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
    </div>
    <!-- 悬浮按钮 -->
    <casePageFloatBtns :pageDomId="'obtanEvidence_print'" :formOrDocData="formOrDocData" @submitData="submitData" @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>

    <!-- 添加弹出框 -->
    <el-dialog title="涉案物品" :visible.sync="addVisible" append-to-body width="60%" v-loading="addLoading">
      <div>
        <div class="fullscreen">
          <el-form ref="addEvidenceFormRef">
            <el-table :data="tableDatas" stripe border style="width: 100%">
              <el-table-column  prop="evidenceNo" label="序号" align="center">
                <template slot-scope="scope">
                  <span>{{++scope.$index}}</span>
                </template>
              </el-table-column>
              <el-table-column label="涉案物品名称" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.evidenceName"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="数量" align="center">
                <template slot-scope="scope">
                  <el-input-number size="mini" v-model="scope.row.amount" :min="1"  label="描述文字"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column prop="spec" label="特征" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.spec"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="存放地" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.savePlace"></el-input>
                </template>
              </el-table-column>
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
    <!-- 添加弹出框 -->
    <el-dialog title="移送材料" :visible.sync="addVisible1" append-to-body width="60%" v-loading="addLoading1">
      <div>
        <div class="fullscreen">
          <el-form ref="addEvidenceFormRef">
            <el-table :data="tableDatas1" stripe border style="width: 100%">
              <el-table-column  prop="evidenceNo" label="序号" align="center">
                <template slot-scope="scope">
                  <span>{{++scope.$index}}</span>
                </template>
              </el-table-column>
              <el-table-column label="移送材料名称" align="center">
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
              <el-table-column width="52%">
                <template slot-scope="scope">
                  <el-button class="evdence-form" size="mini" icon="el-icon-circle-close" circle @click="deleteEvidence1(scope.row)" style="border-radius: 50px;"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button icon="el-icon-circle-plus-outline"  circle type="info" @click="addTableData1" style="margin-left: 50%;margin-top: 10px"></el-button>
          </el-form>
        </div>
        <div style="margin-left: 45%;margin-top: 10px">
            <el-button size="medium" type="primary" @click="addEvidenceSure1('addEvidenceFormRef')">确 定</el-button>
            <el-button size="medium" @click="addVisible1=false">取  消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import overflowInput from "@/page/caseHandle/case/modle/overflowInput.vue";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import { validatePhone, validateIDNumber } from "@/common/js/validator";
import { getOrganDetailApi } from "@/api/system";
import iLocalStroage from "@/common/js/localStroage";
import { queryFlowBycaseIdApi } from "@/api/caseHandle";
export default {
  components: {
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { 
    ...mapGetters(['caseId']),
    getEvidenceTimeEnd() {
      if (this.formData.getEvidenceTimeEnd) {
        return new Date(this.formData.getEvidenceTimeEnd).format('dd日HH时mm分')
      }
    },
    getEvidenceTime() {
      if (this.formData.getEvidenceTime) {
        return new Date(this.formData.getEvidenceTime).format('yyyy年MM月dd日HH时mm分')
      }
    }
  },
  data() {
    //验证是否填写证据
    var validateEvidencLength1 = (rule, value, callback) => {
      if (this.formData.evidenceList.length == 0) {
        return callback(new Error("至少填写一个移送材料"));
      }
      callback();
    };
    //验证开始时间
    var validateStartTime = (rule, value, callback) => {
      console.log('案发时间=='+this.formData.lasj)
      if (Date.parse(this.formData.getEvidenceTime) < Date.parse(this.formData.lasj)) {
        this.$message({
          showClose: true,
          message: "开始时间不得大于立案时间",
          type: "error",
          offset: 100,
          customClass: "validateErrorTip",
        });
        this.formData.getEvidenceTime = ""
        return callback(new Error("开始时间不得大于立案时间"));
      }
      if(Date.parse(this.formData.getEvidenceTime)>Date.parse(this.formData.getEvidenceTimeEnd)){
        this.$message({
              showClose: true,
              message: '开始时间不得大于结束时间',
              type: 'error',
              offset: 100,
              customClass: 'validateErrorTip'
        });
        return callback(new Error("开始时间不得大于结束时间"));
      }
      if(Date.parse(this.formData.getEvidenceTimeEnd)>Date.parse(new Date())){
        this.$message({
              showClose: true,
              message: '结束时间不得大于当前时间',
              type: 'error',
              offset: 100,
              customClass: 'validateErrorTip'
        });
        this.formData.getEvidenceTimeEnd = ""
        return callback(new Error("结束时间不得大于当前时间"));
      }
      if(Date.parse(this.formData.getEvidenceTime)>Date.parse(new Date())){
        this.$message({
              showClose: true,
              message: '开始时间不得大于当前时间',
              type: 'error',
              offset: 100,
              customClass: 'validateErrorTip'
        });
        this.formData.getEvidenceTime = ""
        return callback(new Error("开始时间不得大于当前时间"));
      }
      callback();
    };
    
    return {
      validatePhone:validatePhone,
      validateIDNumber:validateIDNumber,
      formData: {
        caseNumber: '',
        // partyType: '',
        party: '',
        basicSituation:"",
        copyReason:"",
        partyPeopleTel:"",
        checkedUser:"",
        organName:"",
        transAddress:"",
        partyIdNo: '',
        partyAddress: '',
        partyTel: '',
        partyName: '',
        partyUnitAddress: '',
        partyUnitTel: '',
        partyManager: '',
        socialCreditCode: '',

        getEvidenceTime: '',
        getEvidenceTimeEnd:'',
        evidencePlace: '',
        evidenceDepartment: '',
        evidenceDepartmentPhone: '',
        evdenceList: [],
        evidenceList: [],
        evidenceLength1:0,
        note:'',
        transUnit:''
      },
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件id
        caseLinktypeId: this.BASIC_DATA_SC.transfei_SC_caseLinktypeId, //表单类型ID
        //表单数据
        formData: "",
        status: "",      
      },
      rules: {
        evidenceList:[
          { required: true, message: "移送材料清单不能为空", trigger: "blur" }
        ],
        party: [
          { required: true, message: "当事人姓名不能为空", trigger: "blur" }
        ],
        copyReason: [
          { required: true, message: "涉嫌违法行为或罪名不能为空", trigger: "blur" }
        ],
        transUnit: [
          { required: true, message: "受移送机构不能为空", trigger: "blur" }
        ],
        organName: [
          { required: true, message: "移送机关不能为空", trigger: "blur" }
        ],
        basicSituation: [
          { required: true, message: "案件调查情况不能为空", trigger: "blur" }
        ],
        partyIdNo: [
          { required: true, message: "身份证号不能为空", trigger: "blur" },
          { validator: validateIDNumber, trigger: "blur" }
        ],
        checkedUser: [
          { required: true, message: "案件主办人员不能为空", trigger: "blur" }
        ],
        partyTel: [
          { required: true, message: "联系电话不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        partyAddress: [
          { required: true, message: "住址不能为空", trigger: "blur" }
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
        getEvidenceTime: [
          { required: true, message: '抽样取证时间不能为空', trigger: 'blur' },
          { validator:validateStartTime , trigger: "blur" }
        ],
        getEvidenceTimeEnd: [
          { required: true, message: '抽样取证结束时间不能为空', trigger: 'blur' },
          { validator:validateStartTime , trigger: "blur" }
        ],
        evidencePlace: [
          { required: true, message: '抽样取证地点不能为空', trigger: 'blur' }
        ],
        evidenceDepartment: [
          { required: true, message: '抽样取证机关不能为空', trigger: 'blur' }
        ],
        evidenceDepartmentPhone: [
          { required: true, message: '联系电话不能为空', trigger: 'blur' },
          { validator:validatePhone , trigger: "blur" }
        ],
        evidenceLength1: [
           { validator: validateEvidencLength1,trigger: "blur" }
        ],
      },
      tableDatas: [],
      tableDatas1: [],
      nameLength: 23,
      adressLength: 23,
      maxLengthOverLine: 122,
      maxLength: 23,
      value: '',
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: 'obtanEvidence_print',
      },
      isPdf: '',
      isShow: true,
      isParty: true, //当事人类型为个人
      needDealData:true,
      addVisible: false,
      addVisible1: false,
      addLoading: false,
      addLoading1: false,
      propertyFeatures:'', //字段属性配置

    }
  },
  methods: {
    //保存文书信息
    saveData(handleType) {
      this.com_submitCaseForm(handleType, "establishForm", true);
    },
    setData() {
      console.log('setData');
      this.$store.commit("setCaseLinktypeId",this.BASIC_DATA_JX.establish_JX_caseLinktypeId);
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(
        this.caseLinkDataForm.caseBasicinfoId,
        this.caseLinkDataForm.caseLinktypeId,
        false
      );
      console.log('获取数据',this.formData)
      if(this.formData.partyTel==''){
        console.log('电话flag',this.isPartyPhone)
        this.isPartyPhone= true;
      }
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
    getDataAfter() {
      let orgData = {
        id: iLocalStroage.gets("userInfo").organId
      };
      // getOrganDetailApi(orgData).then(
      //   res => {
      //     console.log(res)
      //     this.formData.evidenceDepartment = res.data.name;
      //     this.formData.evidenceDepartmentPhone = res.data.telephone;
      //   })
      if (!this.formData.evidenceList.length) {
        this.formData.evidenceList = [
          { evidenceNo: "", evidenceNo: "", spec: "", amount: "" },
          { evidenceNo: "", evidenceNo: "", spec: "", amount: "" },
          { evidenceNo: "", evidenceNo: "", spec: "", amount: "" },
          { evidenceNo: "", evidenceNo: "", spec: "", amount: "" },
        ];
      }
      if (!this.formData.evdenceList.length) {
        this.formData.evdenceList = [
          { evidenceNo: "", evidenceName: "", spec: "", amount: "" ,savePlace:""},
          { evidenceNo: "", evidenceName: "", spec: "", amount: "" ,savePlace:""},
          { evidenceNo: "", evidenceName: "", spec: "", amount: "" ,savePlace:""},
          { evidenceNo: "", evidenceName: "", spec: "", amount: "" ,savePlace:""},
        ];
      }
    },
    handleAdd(evidenceNo, row) {
      let tableArr = [];
      this.formData.evdenceList.forEach((item) => {
        if (item.evidenceNo != "") {
          tableArr.push(item);
        }
      });
      this.tableDatas = tableArr;
      this.addVisible = true;
      if (this.tableDatas.length == 0) {
        this.tableDatas.push({ evidenceNo: 1, amount: 1 });
      }
    },
    addTableData(){
      let length = this.tableDatas.length;
      if (length == 0) {
        this.tableDatas.push({ evidenceNo: 1, amount: 1 });
      } else {
        this.tableDatas.push({
          evidenceNo: Number(this.tableDatas[length - 1].evidenceNo) + 1,
          amount: 1,
        });
      }
    },
    //删除一行证据
    deleteEvidence(row) {
      for (let i = 0; i < this.tableDatas.length; i++) {
        if (this.tableDatas[i].evidenceNo > row.evidenceNo) {
          this.tableDatas[i].evidenceNo = this.tableDatas[i].evidenceNo - 1;
        }
      }
      this.tableDatas.splice(row.evidenceNo - 1, 1);
      this.formData.evdenceList.splice(row.evidenceNo - 1, 1);
      this.formData.evdenceList.push({
        evidenceNo: "",
        evidenceName: "",
        amount: "",
        spec: "",
        savePlace:""
      });
    },
    addEvidenceSure(formName){
      let canAdd = true;
      for(let i=0; i<this.tableDatas.length; i++){
          if(!this.tableDatas[i].evidenceName || !this.tableDatas[i].spec || !this.tableDatas[i].amount || !this.tableDatas[i].savePlace){
            this.$message({
              message: '数据至少有一项不为空！',
              type: 'warning'
            });
            canAdd = false;
            break;
          }
        }
        if(canAdd){
          this.tableDatas.forEach((item, index, arr) => {
            item.evidenceNo = index + 1;
            this.formData.evdenceList[index] = this.tableDatas[index];
          });
          this.addVisible = false;
        }
    },
    handleAdd1(evidenceNo, row) {
      let tableArr = [];
      this.formData.evidenceList.forEach((item) => {
        if (item.evidenceNo != "") {
          tableArr.push(item);
        }
      });
      this.tableDatas1 = tableArr;
      this.addVisible1 = true;
      if (this.tableDatas1.length == 0) {
        this.tableDatas1.push({ evidenceNo: 1, amount: 1 });
      }
    },
    addTableData1(){
      let length = this.tableDatas1.length;
      if (length == 0) {
        this.tableDatas1.push({ evidenceNo: 1, amount: 1 });
      } else {
        this.tableDatas1.push({
          evidenceNo: Number(this.tableDatas1[length - 1].evidenceNo) + 1,
          amount: 1,
        });
      }
    },
    //删除一行证据
    deleteEvidence1(row) {
      for (let i = 0; i < this.tableDatas1.length; i++) {
        if (this.tableDatas1[i].evidenceNo > row.evidenceNo) {
          this.tableDatas1[i].evidenceNo = this.tableDatas1[i].evidenceNo - 1;
        }
      }
      this.tableDatas1.splice(row.evidenceNo - 1, 1);
      this.formData.evidenceList.splice(row.evidenceNo - 1, 1);
      this.formData.evidenceList.push({
        evidenceNo: "",
        evidenceName: "",
        amount: "",
        spec: "",
      });
    },
    addEvidenceSure1(formName){
      let canAdd = true;
      for(let i=0; i<this.tableDatas1.length; i++){
        if(!this.tableDatas1[i].evidenceName || !this.tableDatas1[i].spec || !this.tableDatas1[i].amount){
          this.$message({
            message: '数据至少有一项不为空！',
            type: 'warning'
          });
          canAdd = false;
          break;
        }
      }
      if(canAdd){
        this.tableDatas1.forEach((item, index, arr) => {
          item.evidenceNo = index + 1;
          this.formData.evidenceList[index] = this.tableDatas1[index];
        });
        this.addVisible1 = false;
      }
    },

    async initData(){
      //查询是哪个流程
      let currentFlow = await queryFlowBycaseIdApi(this.caseId);
      if(currentFlow.data.flowUrl == 'commonGraphData_JX'){
        this.isShow = false;
      }else{
        this.isShow = true;
      }
      //获取表单数据
      this.isOverStatus();
    },
    //获取案件基本信息
    getCaseInfo(){
      let data = {
        id: this.caseId
      };
      this.$store.dispatch("getCaseBasicInfo", data) 
      .then(
        res => {
          console.log('获取案件信息', res);
          this.editCaseInfo ={
            id:res.data.id,
            tempNo:res.data.tempNo
          }
        })
      .catch(err=>{console.log(err)})
    },
  },
  mounted() {},
  created() {
    this.setData();
    this.initData();
    this.getCaseInfo();
  },
}
</script>

<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">
.textindent0 {
  text-indent: 0 !important;
}
.print_box #obtanEvidence_print .el-form-item__content .el-input .el-input__inner{
  width: 100%;
}
.print_box .print_info .evidencetable tr td{
  white-space: inherit;
  text-align-last: center;
}
.print_box #obtanEvidence_print tr td{
  text-align-last:center;
}
.dataTimeReplaceBox {
    position: relative;
    .el-form-item__content .el-date-editor--datetime {
      opacity: 0;
      position: absolute;
      z-index: 2;
    }
    .replaceTime {
      position: absolute;
      top: 0;
      left: 10px;
    }
}
.evdence-form {
  .el-icon-circle-close {
    color: #7b7b7b !important;
  }
}
</style>
