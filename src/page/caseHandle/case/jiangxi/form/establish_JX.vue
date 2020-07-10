<template>
  <div class="print_box">
    <!-- sdmaskjdnsjdns -->
    <el-button type="primary"  id="editCaseInfoBtn" @click="gotoEditCase">修改基本信息</el-button>
    <div class="print_info" id="establish-print">
      <el-form :rules="rules" ref="establishForm" :inline-message="true" :inline="true" :model="formData">
        <div class="doc_topic">JX立案登记表</div>
        <div class="doc_number">赣（{{formData.caseNumber.substring(2,6)}}）交立案〔{{formData.caseNumber.substring(7,12)}}〕号</div>
        <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td>
              <p>案件</p>
              <p>来源</p>
            </td>
            <td colspan="8" class="color_DBE4EF">
              <div class="text-left">
              <el-form-item prop="checkBox" :rules="fieldRules('checkBox',propertyFeatures['checkBox'])">
                <el-checkbox-group v-model="formData.checkBox" :disabled="fieldDisabled(propertyFeatures['checkBox'])">
                  <p>
                    <el-checkbox label="行政检查">1.在行政检查中发现的；</el-checkbox>
                  </p>
                  <p>
                    <el-checkbox label="投诉举报"> 2.个人、法人及其他组织举报经核实的；</el-checkbox>
                  </p>
                  <p>
                    <el-checkbox label="上级交办"> 3.上级机关
                      <el-form-item v-if="!lineStyleFlag" prop="reconsiderationOrgan" style="margin-top:-8px;border-bottom:1px solid black">
                        <el-input v-model="caseSourceText3" :maxLength="maxLength" placeholder="\" disabled></el-input>
                      </el-form-item>交办的；
                    </el-checkbox>
                  </p>
                  <p>
                    <el-checkbox label="下级报请"> 4.下级机关
                      <el-form-item v-if="!lineStyleFlag" prop="reconsiderationOrgan" style="margin-top:-8px;border-bottom:1px solid black">
                        <el-input v-model="caseSourceText4" :maxLength="maxLength" placeholder="\" disabled></el-input>
                      </el-form-item>报请查处的；</el-checkbox>
                  </p>
                  <p>
                    <el-checkbox label="部门移送"> 5.有关部门
                      <el-form-item v-if="!lineStyleFlag" prop="reconsiderationOrgan" style="margin-top:-8px;border-bottom:1px solid black">
                        <el-input v-model="caseSourceText5" :maxLength="maxLength" placeholder="\" disabled></el-input>
                      </el-form-item>移送的；</el-checkbox>
                  </p>
                  <p>
                    <el-checkbox label="其他途径">6.其他途径发现的：
                      <el-form-item v-if="!lineStyleFlag" prop="reconsiderationOrgan" style="margin-top:-8px;border-bottom:1px solid black">
                        <el-input v-model="caseSourceText6" :maxLength="maxLength" placeholder="\" disabled></el-input>
                      </el-form-item>
                    </el-checkbox>
                  </p>
                </el-checkbox-group>
                </el-form-item>
              </div>
            </td>
          </tr>
          <tr>
            <td rowspan="2">案由</td>
            <td rowspan="2" colspan="8" class="color_DBE4EF">
              <el-form-item prop="caseName" :rules="fieldRules('caseName',propertyFeatures['caseName'])">
                <el-input  type="textarea" v-model="formData.caseName"  :disabled="fieldDisabled(propertyFeatures['caseName'])" v-bind:class="{ over_flow:formData.caseName.length>14?true:false }" :autosize="{ minRows: 2, maxRows: 3}" maxlength="90" placeholder="\"></el-input>  
              </el-form-item>
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td>
              <p>受案</p>
              <p>时间</p>
            </td>
            <td colspan="8" class="color_DBE4EF">
              <el-form-item prop="acceptTime" :rules="fieldRules('acceptTime',propertyFeatures['acceptTime'])" class="pdf_datapick">
                <el-date-picker v-model="formData.acceptTime" :disabled="fieldDisabled(propertyFeatures['acceptTime'])" type="datetime" format="yyyy年MM月dd日" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="5">
              <P class="center_similar">当</P>
              <P class="center_similar">事</P>
              <P class="center_similar">人</P>
              <P class="center_similar">基</P>
              <P class="center_similar">本</P>
              <P class="center_similar">情</P>
              <P class="center_similar">况</P>
            </td>
            <td rowspan="2">个人</td>
            <td>姓名</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="party" :rules="fieldRules('party',propertyFeatures['party'],'',isParty)">
                <el-input type="textarea" v-model="formData.party" :disabled="!isParty || fieldDisabled(propertyFeatures['party'])" v-bind:class="{ over_flow:formData.party.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td>性别</td>
            <td class="color_DBE4EF">
              <el-form-item prop="partySex" v-if="!approval" :rules="fieldRules('partySex',propertyFeatures['partySex'],'',isParty)">
                <el-select v-model="formData.partySex" :disabled="!isParty || fieldDisabled(propertyFeatures['partySex'])" placeholder="\">
                  <el-option value="0" label="男"></el-option>
                  <el-option value="1" label="女"></el-option>
                </el-select>
              </el-form-item>
              <span v-else>{{formData.partySex == 0 ? '男' :'女'}}</span>
            </td>
            <td>年龄</td>
            <td class="color_DBE4EF">
              <el-form-item prop="partyAge" :rules="fieldRules('partyAge',propertyFeatures['partyAge'],'',isParty)">
                <el-input type="textarea" v-model="formData.partyAge" 
                :disabled="!isParty || fieldDisabled(propertyFeatures['partyAge'])"
                v-bind:class="{ over_flow:formData.partyAge.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" maxlength="3" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>住址</td>
            <td colspan="2" class="color_DBE4EF">
                
              <el-form-item prop="partyAddress" :rules="fieldRules('partyAddress',propertyFeatures['partyAddress'],'',isParty)">
                <el-input  type="textarea" v-model="formData.partyAddress" :disabled="!isParty || fieldDisabled(propertyFeatures['partyAddress'])" 
                v-bind:class="{ over_flow:formData.partyAddress.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"
                ></el-input>
               
              </el-form-item>
            </td>
            <td>
              <p>身份证</p>
              <p>件号</p>
            </td>
            <td class="color_DBE4EF">
              <el-form-item prop="partyIdNo" :rules="fieldRules('partyIdNo',propertyFeatures['partyIdNo'],validateIDNumber,isParty)">
                <el-input type="textarea" v-model="formData.partyIdNo" :disabled="!isParty || fieldDisabled(propertyFeatures['partyIdNo'])" v-bind:class="{ over_flow:formData.partyIdNo.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td>联系电话</td>
            <td class="color_DBE4EF">
              <el-form-item prop="partyTel" :rules="fieldRules('partyTel',propertyFeatures['partyTel'],validatePhone,isParty)">
                <el-input type="textarea" v-model="formData.partyTel" :disabled="!isParty || fieldDisabled(propertyFeatures['partyTel'])" v-bind:class="{ over_flow:formData.partyTel.length>6?true:false }" :autosize="{ minRows: 2, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="3">单位</td>
            <td>名称</td>
            <td colspan="4" class="color_DBE4EF">
              <el-form-item prop="partyName" :rules="fieldRules('partyName',propertyFeatures['partyName'],'',!isParty)">
                <el-input type="textarea" v-model="formData.partyName" :disabled="isParty || fieldDisabled(propertyFeatures['partyName'])" v-bind:class="{ over_flow:formData.partyName.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td>
              <p>法定</p>
              <p>代表人</p>
            </td>
            <td class="color_DBE4EF">
              <el-form-item prop="partyManager" :rules="fieldRules('partyManager',propertyFeatures['partyManager'],'',!isParty)">
                <el-input type="textarea" v-model="formData.partyManager" :disabled="isParty || fieldDisabled(propertyFeatures['partyManager'])" v-bind:class="{ over_flow:formData.partyManager.length>3?true:false }" :autosize="{ minRows: 1, maxRows: 2}" maxlength="10" placeholder="\" ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>地址</td>
            <td colspan="4" class="color_DBE4EF">
              <el-form-item prop="partyUnitAddress" :rules="fieldRules('partyUnitAddress',propertyFeatures['partyUnitAddress'],'',!isParty)">
                <el-input type="textarea" v-model="formData.partyUnitAddress" :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitAddress'])" v-bind:class="{ over_flow:formData.partyUnitAddress.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 2}" maxlength="45" placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td style="width:50px">联系电话</td>
            <td class="color_DBE4EF">
              <el-form-item prop="partyUnitTel" :rules="fieldRules('partyUnitTel',propertyFeatures['partyUnitTel'],validatePhone,!isParty)">
                <el-input type="textarea" v-model="formData.partyUnitTel" :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitTel'])" v-bind:class="{ over_flow:formData.partyUnitTel.length>6?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2">统一社会信用代码</td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item prop="socialCreditCode" :rules="fieldRules('socialCreditCode',propertyFeatures['socialCreditCode'],'',!isParty)">
                <el-input type="textarea" v-model="formData.socialCreditCode" :disabled="isParty || fieldDisabled(propertyFeatures['socialCreditCode'])" v-bind:class="{ over_flow:formData.socialCreditCode.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <p>案件基</p>
              <p>本情况</p>
            </td>
            <td colspan="8" class="color_DBE4EF">
              <el-form-item prop="caseSituation" :rules="fieldRules('caseSituation',propertyFeatures['caseSituation'])">
                <el-input type='textarea' v-model="formData.caseSituation" 
                :disabled="fieldDisabled(propertyFeatures['caseSituation'])"
                v-bind:class="{ over_flow:formData.caseSituation && formData.caseSituation.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 5}" maxlength="200" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <p class="center_similar">立</p>
              <p class="center_similar">案</p>
              <p class="center_similar">依</p>
              <p class="center_similar">据</p>
            </td>
            <td colspan="4" class="color_DBE4EF">
              <el-form-item prop="illegalLaw" :rules="fieldRules('illegalLaw',propertyFeatures['illegalLaw'])">
                <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" v-model="formData.illegalLaw"
                :disabled="fieldDisabled(propertyFeatures['illegalLaw'])"
                ></el-input>
              </el-form-item>
            </td>
            <td>
              <p>承办机构</p>
              <p>负责人</p>
              <p>意见</p>
            </td>
            <td colspan="3" class="color_DBE4EF table_seal" style="white-space: pre-wrap;word-break:break-all">
              <div style="word-break:break-all">{{formData.approveOpinions}}</div>
              <div class="pdf_seal">
                <!-- <p>签名：{{formData.approvePeo}}</p> -->
                <p>签名：</p>
                <p>
                  <span v-if="formData.approveTime">{{formData.approveTime}}</span>
                  <span v-else>年 月 日</span>
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <p>行政机</p>
              <p>关负责</p>
              <p>人审批</p>
              <p>意见</p>
             
            </td>
            <td colspan="8" class="color_DBE4EF table_seal"  style="white-space: pre-wrap;word-break:break-all">
              {{formData.secondApproveOpinions}}
              <div class="pdf_seal">
                <!-- <p>签名：{{formData.secondApprovePeo}}</p> -->
                <p>签名：</p>
                <p>
                  <span v-if="formData.secondApproveTime">{{formData.secondApproveTime}}</span>
                  <span v-else>年 月 日</span>
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <!-- <p class="center_similar">备</p>
              <p class="center_similar">注</p> -->
              <p>备注</p>
            </td>
            <td colspan="8" class="color_DBE4EF">
              <el-form-item prop="note">
                <el-input type="textarea" v-model="formData.note" :autosize="{ minRows: 1, maxRows: 2}" maxlength="30" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
    </div>

    <casePageFloatBtns :formOrDocData="formOrDocData" @saveData="saveData" ></casePageFloatBtns>
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
import {BASIC_DATA_SYS} from '@/common/js/BASIC_DATA.js';
export default {
  data() {
    // partyManager partyUnitAddress  partyUnitTel. socialCreditCode
    //当事人类型为公司时验证
    var validateIfCom = (rule, value, callback) => {
      if (!this.isParty && !value) {
        return callback(new Error("法定代表人、地址、联系电话、信用代码不能为空"));
      }
      callback();
    };

    return {
      validatePhone:validatePhone,
      validateIDNumber:validateIDNumber,
      caseNumber: "010-123456",
      // tableData: {},
      formData: {
        caseTypeKey:"",//案件字
        caseNumber: "",
        checkBox: [],
        caseName: "",
        acceptTime: "",
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
        caseSituation: "",
        illegalLaw: "",
        approveOpinions: "",
        approvePeo: "",
        approveTime: "",
        secondApproveOpinions: "",
        secondApprovePeo: "",
        secondApproveTime: "",
        note: "",
        partyType: "个人",
        caseBasicInfo: "",
      },
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件id
        caseLinktypeId: this.BASIC_DATA_JX.establish_JX_caseLinktypeId, //表单类型ID
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
        acceptTime: [
          { required: true, message: "受案时间不能为空", trigger: "blur" }
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
        caseSituation: [
          { required: true, message: "案件基本情况不能为空", trigger: "blur" }
        ],
        illegalLaw: [
          { required: true, message: "立案依据不能为空", trigger: "blur" }
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
        pageDomId:'establish-print'
      },
      huanjieAndDocId: this.BASIC_DATA_JX.establish_JX_huanjieAndDocId, //立案登记表的文书id
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
      needDealData:true,
      editCaseInfo:'', //修改案件基本信息需要传的数据
      propertyFeatures:'', //字段属性配置
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
    // 提交表单
    saveData(handleType) {
      //参数  提交类型 、formRef
      this.com_submitCaseForm(handleType, "establishForm", true);
    },
   
    //设置案件来源
    getDataAfter() {
      if (this.formData.checkBox == '上级交办') {
        this.caseSourceText3 = this.formData.caseSourceText;
      } else if (this.formData.checkBox == '下级报请') {
        this.caseSourceText4 = this.formData.caseSourceText;
      } else if (this.formData.checkBox == '部门移送') {
        this.caseSourceText5 = this.formData.caseSourceText;
      } else if (this.formData.checkBox == '其他途径') {
        this.caseSourceText6 = this.formData.caseSourceText;
      }
      if (typeof (this.formData.checkBox) == 'string') {
        this.formData.checkBox = [this.formData.checkBox];
      }
      if (this.formData.party) {
        this.isParty = true;
      } else {
        this.isParty = false;
      }
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
    //修改案件基本信息
    gotoEditCase(){
        this.$router.push({
          name: "case_handle_inforCollect",
          params:{editFlag:true}
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
#editCaseInfoBtn{
  margin: 20px;
}
#establish-print{
  .el-form-item__content .el-input__suffix{
    width: 20px;
    right: 0;
  }
}
</style>
