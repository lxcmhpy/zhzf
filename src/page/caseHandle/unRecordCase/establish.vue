<template>
  <div class="print_box">
    <!-- sdmaskjdnsjdns -->
    <div class="print_info" id="establish-print">
      <el-form
        :rules="rules"
        ref="establishForm"
        :inline-message="true"
        :inline="true"
        :model="formData"
      >
        <div class="doc_topic">立案登记表</div>
        <div class="doc_number">案号：{{formData.caseNumber}}</div>

        <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td>
              <p>案件</p>
              <p>来源</p>
            </td>
            <td colspan="8" class="color_DBE4EF">
              <div class="text-left">
                  <el-checkbox-group v-model="formData.checkBox" :disabled="true">
                  <p>
                    <el-checkbox label="行政检查">1.在行政检查中发现的；</el-checkbox>
                  </p>
                  <p>
                    <el-checkbox label="投诉举报"> 2.个人、法人及其他组织举报经核实的；</el-checkbox>
                  </p>
                  <p>
                    <el-checkbox label="上级交办"> 3.上级机关
                      <el-form-item v-if="!lineStyleFlag" prop="reconsiderationOrgan" style="margin-top:-8px">
                      <el-input
                        v-model="caseSourceText3"
                        :maxLength="maxLength"
                        placeholder="\"
                        disabled
                      ></el-input>
                    </el-form-item>交办的；
                    </el-checkbox>
                  </p>
                  <p>
                    <el-checkbox label="下级报请"> 4.下级机关
                    <el-form-item v-if="!lineStyleFlag" prop="reconsiderationOrgan" style="margin-top:-8px">
                      <el-input
                        v-model="caseSourceText4"
                        :maxLength="maxLength"
                        placeholder="\"
                        disabled
                      ></el-input>
                    </el-form-item>报请查处的；</el-checkbox>
                  </p>
                  <p>
                    <el-checkbox label="部门移送"> 5.有关部门
                    <el-form-item v-if="!lineStyleFlag" prop="reconsiderationOrgan" style="margin-top:-8px">
                      <el-input
                        v-model="caseSourceText5"
                        :maxLength="maxLength"
                        placeholder="\"
                        disabled
                      ></el-input>
                    </el-form-item>移送的；</el-checkbox>
                  </p>
                  <p>
                    <el-checkbox label="其他途径">6.其他途径发现的：
                    <el-form-item v-if="!lineStyleFlag" prop="reconsiderationOrgan" style="margin-top:-8px">
                      <el-input
                        v-model="caseSourceText6"
                        :maxLength="maxLength"
                        placeholder="\"
                        disabled
                      ></el-input>
                    </el-form-item></el-checkbox>
                  </p>
                  </el-checkbox-group>
              </div>
            </td>
          </tr>
          <tr>
            <td rowspan="2">案由</td>
            <td rowspan="2" colspan="8" class="color_DBE4EF">
              <el-form-item prop="caseName">
                <el-input
                  type="textarea"
                  v-model="formData.caseName"
                  v-bind:class="{ over_flow:formData.caseName.length>14?true:false }"
                  :autosize="{ minRows: 2, maxRows: 3}"
                  maxlength="90"
                  placeholder="\"
                ></el-input>
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
              <el-form-item prop="acceptTime" class="pdf_datapick">
                <el-date-picker v-model="formData.acceptTime" type="datetime" format="yyyy年MM月dd日" value-format="yyyy-MM-dd HH:mm" disabled></el-date-picker>
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
              <el-form-item prop="party">
                <el-input
                  type="textarea"
                  v-model="formData.party"
                  v-bind:class="{ over_flow:formData.party.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  placeholder="\"
                  disabled
                ></el-input>
              </el-form-item>
            </td>
            <td>性别</td>
            <td class="color_DBE4EF">
              <el-form-item :prop="isParty ? 'partySex' :''">
                <!-- <el-input
                  type="textarea"
                  v-model="formData.partySex"
                  v-bind:class="{ over_flow:formData.partySex.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  maxlength="2"
                  placeholder="\"
                  :disabled="isParty ? false : true"
                ></el-input> -->
                <el-select v-model="formData.partySex" :disabled="isParty && !originalData.partySex ? false : true" placeholder="\">
                  <el-option value="0" label="男"></el-option>
                  <el-option value="1" label="女"></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td>年龄</td>
            <td class="color_DBE4EF">
              <el-form-item :prop="isParty ? 'partyAge' :''">
                <el-input
                  type="textarea"
                  v-model="formData.partyAge"
                  v-bind:class="{ over_flow:formData.partyAge.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  maxlength="3"
                  :disabled="isParty && !originalData.partyAge ? false : true"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>住址</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item :prop="isParty ? 'partyAddress' :''">
                <el-input
                  type="textarea"
                  v-model="formData.partyAddress"
                  v-bind:class="{ over_flow:formData.partyAddress.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  placeholder="\"
                  :disabled="isParty && !originalData.partyAddress ? false : true"
                ></el-input>
              </el-form-item>
            </td>
            <td>
              <p>身份证</p>
              <p>件号</p>
            </td>
            <td class="color_DBE4EF">
              <el-form-item :prop="isParty ? 'partyIdNo' :''">
                <el-input
                  type="textarea"
                  v-model="formData.partyIdNo"
                  v-bind:class="{ over_flow:formData.partyIdNo.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  placeholder="\"
                  :disabled="isParty && !originalData.partyIdNo ? false : true"
                ></el-input>
              </el-form-item>
            </td>
            <td>联系电话</td>
            <td class="color_DBE4EF">
              <el-form-item :prop="isParty ? 'partyTel' :''">
                <el-input
                  type="textarea"
                  v-model="formData.partyTel"
                  v-bind:class="{ over_flow:formData.partyTel.length>14?true:false }"
                  :autosize="{ minRows: 2, maxRows: 3}"
                  :maxlength="nameLength"
                  placeholder="\"
                  :disabled="isParty ? false : true"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="3">单位</td>
            <td>名称</td>
            <td colspan="4" class="color_DBE4EF">
              <el-form-item prop="partyName">
                <el-input
                  type="textarea"
                  v-model="formData.partyName"
                  v-bind:class="{ over_flow:formData.partyName.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  placeholder="\"
                  disabled
                ></el-input>
              </el-form-item>
            </td>
            <td>
              <p>法定</p>
              <p>代表人</p>
            </td>
            <td class="color_DBE4EF">
              <el-form-item prop="partyManager">
                <el-input
                  type="textarea"
                  v-model="formData.partyManager"
                  v-bind:class="{ over_flow:formData.partyManager.length>3?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  maxlength="10"
                  placeholder="\"
                  :disabled="!isParty && !originalData.partyManager ? false : true"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>地址</td>
            <td colspan="4" class="color_DBE4EF">
              <el-form-item prop="partyUnitAddress">
                <el-input
                  type="textarea"
                  v-model="formData.partyUnitAddress"
                  v-bind:class="{ over_flow:formData.partyUnitAddress.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 2}"
                  maxlength="45"
                  placeholder="\"
                  :disabled="!isParty && !originalData.partyUnitAddress ? false : true"
                ></el-input>
              </el-form-item>
            </td>
            <td style="width:50px">联系电话</td>
            <td class="color_DBE4EF">
              <el-form-item prop="partyUnitTel">
                <el-input
                  type="textarea"
                  v-model="formData.partyUnitTel"
                  v-bind:class="{ over_flow:formData.partyUnitTel.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  placeholder="\"
                  :disabled="!isParty && !originalData.partyUnitTel ? false : true"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2">统一社会信用代码</td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item prop="socialCreditCode">
                <el-input
                  type="textarea"
                  v-model="formData.socialCreditCode"
                  v-bind:class="{ over_flow:formData.socialCreditCode.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  placeholder="\"
                  :disabled="!isParty && !originalData.socialCreditCode ? false : true"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <p>案件基</p>
              <p>本情况</p>
            </td>
            <td colspan="8" class="color_DBE4EF">
              <el-form-item prop="caseSituation">
                <el-input type='textarea' v-model="formData.caseSituation" v-bind:class="{ over_flow:formData.caseSituation && formData.caseSituation.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 5}" maxlength="200" placeholder="\"></el-input>
                <!-- <el-input type="textarea" ></el-input> -->
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
              <el-form-item prop="illegalLaw">
                <!-- <el-input type='textarea' v-model="formData.caseReplay" v-bind:class="{ over_flow:formData.caseReplay.length>14?true:false }" :autosize="{ minRows: 2, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input> -->
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 4}"
                  v-model="formData.illegalLaw"
                  disabled
                ></el-input>
              </el-form-item>
            </td>
            <td>
              <p>经办机构</p>
              <p>负责人</p>
              <p>意见</p>
            </td>
            <td colspan="3" class="color_DBE4EF table_seal">
              {{formData.approveOpinions}}
              <div class="pdf_seal">
                <p>签名：{{formData.approvePeo}}</p>
                <p>
                  <span v-if="formData.approveTime">{{formData.approveTime}}</span>
                  <span v-else>年  月  日</span>
                  <!-- <el-form-item prop="makeDate" class="pdf_datapick">
                    <el-date-picker v-model="formData.makeDate" format="yyyy年MM月dd日" placeholder="    年  月  日" clear-icon='el-icon-circle-close'>
                    </el-date-picker>
                  </el-form-item>-->
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <p>负责</p>
              <p>人审</p>
              <p>批意</p>
              <p>见</p>
              <!-- <p class="center_similar"></p>
              <p class="center_similar"></p>
              <p class="center_similar"></p> -->
            </td>
            <td colspan="8" class="color_DBE4EF table_seal">
              {{formData.secondApproveOpinions}} 
              <div class="pdf_seal">
                <p>签名：{{formData.secondApprovePeo}}</p>
                <p>
                  <span v-if="formData.secondApproveTime">{{formData.secondApproveTime}}</span>
                  <span v-else>年  月  日</span>
                  <!-- <el-form-item prop="makeDate" class="pdf_datapick">
                    <el-date-picker v-model="formData.makeDate" format="yyyy年MM月dd日" placeholder="    年  月  日" clear-icon='el-icon-circle-close'>
                    </el-date-picker>
                  </el-form-item>-->
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
                <el-input
                  type="textarea"
                  v-model="formData.note"
                  :autosize="{ minRows: 1, maxRows: 1}"
                  maxlength="30"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
    </div>

    <casePageFloatBtns
      :pageDomId="'establish-print'"
      :formOrDocData="formOrDocData"
      @saveData="saveData"
      @showApprovePeopleList="showApprovePeopleList"
      @showApproval="showApproval"
    ></casePageFloatBtns>

    <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput>
    <showApprovePeople ref="showApprovePeopleRef"></showApprovePeople>
    <approvalDialog ref="approvalDialogRef" @getNewData="goToPfd"></approvalDialog>
  </div>
</template>
<script>
import showApprovePeople from "../components/showApprovePeople";
import approvalDialog from "../components/approvalDialog";
import overflowInput from "../case/modle/overflowInput";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";

import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import {validateIDNumber,validatePhone,validateZIP} from '@/common/js/validator'

export default {
  data() {
    // partyManager partyUnitAddress  partyUnitTel. socialCreditCode
    //当事人类型为公司时验证
    var validateIfCom = (rule, value, callback) => {
      if (!this.isParty && !value) {
        return callback(new Error("请输入"));
      }
      callback();
    };
    
    return {
      caseNumber: "010-123456",
      // tableData: {},
      formData: {
        caseNumber:"",
        checkBox:[],
        caseName:"",
        acceptTime:"",
        party:"",
        partySex:"",
        partyAge:"",
        partyAddress:"",
        partyIdNo:"",
        partyTel:"",
        partyName:"",
        partyManager:"",
        partyUnitAddress:"",
        partyUnitTel:"",
        socialCreditCode:"",
        caseSituation:"",
        illegalLaw:"",
        approveOpinions:"",
        approvePeo:"",
        approveTime:"",
        secondApproveOpinions:"",
        secondApprovePeo:"",
        secondApproveTime:"",
        note:"",
        partyType: "个人",
        caseBasicInfo:"",
      },
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件id
        caseLinktypeId: "2c90293b6c178b55016c17c255a4000d", //表单类型ID
        //表单数据
        formData: "",
        status: ""
      },
      rules: {
        caseName: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        partyIdNo:[
          { required: true, message: "请输入", trigger: "blur" },
          { validator: validateIDNumber, trigger: "blur" }
        ],
        partyTel:[
          { required: true, message: "请输入", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        partyAddress:[
          { required: true, message: "请输入", trigger: "blur" }
        ],
        partyAge:[
          { required: true, message: "请输入", trigger: "blur" }
        ],
        partySex:[
          
          { required: true, message: "请输入", trigger: "blur" }
        ],
        partyManager: [
          { validator: validateIfCom, trigger: "blur" }
        ],
        partyUnitAddress: [
          { validator: validateIfCom, trigger: "blur" }
        ],
        partyUnitTel: [
          { validator: validateIfCom, trigger: "blur" },
           { validator: validatePhone, trigger: "blur" }
        ],
        socialCreditCode: [
          { validator: validateIfCom, trigger: "blur" }
        ],
        illegalLaw: [
          { required: true, message: "请输入", trigger: "blur" }
        ]
        
        


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
        pageDomId: "establish-print"
      },
      huanjieAndDocId: "2c9029ae654210eb0165421564970001", //立案登记表的文书id
      approvalOver: false,//审核完成
      isParty: true, //当事人类型为个人
      caseSourceText3:"",
      caseSourceText4:"",
      caseSourceText5:"",
      caseSourceText6:"",
      caseSourceCheckBox:[],
      originalData:"",
    };
  },
  components: {
    showApprovePeople,
    approvalDialog,
    overflowInput,
    casePageFloatBtns
  },
  computed: { ...mapGetters(["caseId"]) },
  mixins: [mixinGetCaseApiList],
  methods: {
    //返回编辑
    // goEdit() {
    //   this.$router.push({
    //     name: "filingApproval",
    //     params: {
    //       id: this.caseId
    //     }
    //   });
    // },
    setData() {
      console.log('setData');
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(
        this.caseLinkDataForm.caseBasicinfoId,
        this.caseLinkDataForm.caseLinktypeId,
        false
      );
    },
    // 提交表单
    saveData(handleType) {
      //参数  提交类型 、formRef
      
      this.com_submitCaseForm(handleType, "establishForm", true);
    },
    showApprovePeopleList() {
      let data = {
        caseId: this.caseId,
        caseLinktypeId: "2c90293b6c178b55016c17c255a4000d"
      };
      this.$refs.showApprovePeopleRef.showModal(data);
    },
    //审批弹窗
    showApproval() {
      let approvePeo = this.formData.approvePeo ? this.formData.approvePeo : "";
      let caseData = {
        caseId: this.caseId,
        caseLinktypeId: "2c90293b6c178b55016c17c255a4000d",
        firstApproval: approvePeo,
        approvalNumber: 2 //2次审批
      };
      this.$refs.approvalDialogRef.showModal(caseData);
    },
    // 多行编辑
    overFlowEdit() {
      this.$refs.overflowInputRef.showModal(0, "");
    },
    // 获取多行编辑内容
    getOverFloeEditInfo(edit) {
      this.formData.illegalFactsEvidence = edit;
    },

    goToPfd() {
      //提交pdf 显示pdf页
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.approvalOver = true;
      this.com_getFormDataByCaseIdAndFormId(
        this.caseLinkDataForm.caseBasicinfoId,
        this.caseLinkDataForm.caseLinktypeId,
        true
      );
    },
    isApproval() {
      //只有审核按钮
      if (this.$route.params.isApproval) {
        this.formOrDocData.showBtn = [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          false,
          false
        ]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    },
    //案件来源
    setEstabishCaseSourceAndText(){
      if(this.formData.checkBox == '上级交办'){
        this.caseSourceText3 = this.formData.caseSourceText;
      }else if(this.formData.checkBox == '下级报请'){
        this.caseSourceText4 = this.formData.caseSourceText;
      }else if(this.formData.checkBox == '部门移送'){
        this.caseSourceText5 = this.formData.caseSourceText;
      }else if(this.formData.checkBox == '其他途径'){
        this.caseSourceText6 = this.formData.caseSourceText;
      }
      if(typeof(this.formData.checkBox)== 'string'){
        this.formData.checkBox=[this.formData.checkBox];
      }
    }
  },
  created() {
    this.setData();
    this.isApproval();
  }
};
</script>
 <style lang="scss">
// @import "@/assets/css/pdf.scss";
@import "@/assets/css/caseHandle/caseDocModle.scss";
</style>
