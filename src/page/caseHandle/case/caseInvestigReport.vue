<template>
  <div class="print_box">
    <el-form :rules="rules" ref="caseInvestiForm" :inline-message="true" :inline="true" :model="formData">
      <div class="printNumbers_box" >
          <div id="caseInvest-print" class="print_info" style="height:auto;padding:0px;">
            <div class="print_info" >
            <div class="doc_topic">案件调查报告</div>
            <div class="doc_number">案号：{{formData.caseNumber}}</div>
            <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
                <tr>
                <td rowspan="2">案由</td>
                <td colspan="5" rowspan="2" class="color_DBE4EF">
                    <el-form-item prop="closeResult">
                    <el-input type="textarea" v-model="formData.caseName" v-bind:class="{ over_flow:formData.caseName.length>14?true:false }" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
                    </el-form-item>
                </td>
                <td rowspan="2" width="100">案件调查人员</td>
                <td colspan="2" rowspan="2" class="color_DBE4EF">
                    <el-form-item>
                    <el-input type="textarea" v-model="formData.staff" v-bind:class="{ over_flow:formData.staff && formData.staff.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 4}" maxlength="32" placeholder="\"></el-input>
                    </el-form-item>
                </td>
                </tr>
                <tr></tr>
                <tr>
                <td rowspan="6">
                    <p class="center_similar">当</p>
                    <p class="center_similar">事</p>
                    <p class="center_similar">人</p>
                </td>
                <td rowspan="2">个人</td>
                <td>姓名</td>
                <td class="color_DBE4EF">
                    <el-form-item prop="party">
                    <el-input type="textarea" v-model="formData.party" disabled v-bind:class="{ over_flow:formData.party.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
                    </el-form-item>
                </td>
                <td>性别</td>
                <td class="color_DBE4EF">
                    <el-form-item>
                    <!-- <el-input
                        v-model="formData.partySex"
                        maxlength="2"
                        placeholder="\"
                        :disabled="isParty ? false : true"
                    ></el-input> -->
                    <el-select v-model="formData.partySex"  :disabled="isParty && !originalData.partySex ? false : true" placeholder="\">
                        <el-option value="0" label="男"></el-option>
                        <el-option value="1" label="女"></el-option>
                    </el-select>
                    </el-form-item>
                </td>
                <td>年龄</td>
                <td colspan="2" class="color_DBE4EF">
                    <el-form-item>
                    <el-input v-model="formData.partyAge" maxlength="3" placeholder="\" :disabled="isParty && !originalData.partyAge ? false : true"></el-input>
                    </el-form-item>
                </td>
                </tr>
                <tr>
                <td>住址</td>
                <td colspan="3" class="color_DBE4EF">
                    <el-form-item>
                    <el-input type="textarea" v-model="formData.partyAddress" v-bind:class="{ over_flow:formData.partyAddress && formData.partyAddress.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="adressLength" :disabled="isParty && !originalData.partyAddress ? false : true" placeholder="\"></el-input>
                    </el-form-item>
                </td>
                <td>职业</td>
                <td colspan="2" class="color_DBE4EF">
                    <el-form-item>
                    <el-input type="textarea" v-model="formData.occupation" v-bind:class="{ over_flow:formData.occupation && formData.occupation.length>4?true:false }" :autosize="{ minRows: 1, maxRows: 2}" maxlength="20" placeholder="\" :disabled="isParty && !originalData.occupation ? false : true"></el-input>
                    </el-form-item>
                </td>
                </tr>
                <tr>
                <td rowspan="4">单位</td>
                <td>名称</td>
                <td colspan="6" class="color_DBE4EF">
                    <el-form-item>
                    <el-input type="textarea" v-model="formData.partyName" v-bind:class="{ over_flow:formData.partyName.length>25?true:false }" :autosize="{ minRows: 1, maxRows: 2}" maxlength="30" placeholder="\" disabled></el-input>
                    </el-form-item>
                </td>
                </tr>
                <tr>
                <td>法定代表人</td>
                <td colspan="6" class="color_DBE4EF">
                    <el-form-item>
                    <el-input type="textarea" v-model="formData.partyManager" v-bind:class="{ over_flow:formData.partyManager && formData.partyManager.length>25?true:false }" :autosize="{ minRows: 1, maxRows: 2}" maxlength="30" placeholder="\" :disabled="!isParty && !originalData.partyManager ? false : true"></el-input>
                    </el-form-item>
                </td>
                </tr>
                <tr>
                <td>地址</td>
                <td colspan="6" class="color_DBE4EF">
                    <el-form-item>
                    <el-input type="textarea" v-model="formData.partyUnitAddress" v-bind:class="{ over_flow:formData.partyUnitAddress && formData.partyUnitAddress.length>25?true:false }" :autosize="{ minRows: 1, maxRows: 2}" maxlength="30" placeholder="\" :disabled="!isParty && !originalData.partyUnitAddress ? false : true"></el-input>
                    </el-form-item>
                </td>
                </tr>
                <tr>
                <td>联系电话</td>
                <td colspan="6" class="color_DBE4EF">
                    <el-form-item prop="partyUnitTel">
                    <el-input type="textarea" v-model="formData.partyUnitTel" v-bind:class="{ over_flow:formData.partyUnitTel && formData.partyUnitTel.length>25?true:false }" :autosize="{ minRows: 1, maxRows: 2}" maxlength="11" placeholder="\" :disabled="!isParty && !originalData.partyUnitTel ? false : true"></el-input>
                    </el-form-item>
                </td>
                </tr>
                <tr>
                <td rowspan="6">
                    <p>案件</p>
                    <p>调查</p>
                    <p>经过</p>
                    <p>及违</p>
                    <p>法事</p>
                    <p>实</p>
                </td>
                <td rowspan="6" colspan="8" class="color_DBE4EF">
                    <el-form-item prop="illegalFact">
                    <el-input type="textarea" v-model="formData.illegalFact" v-bind:class="{ over_flow:formData.illegalFact && formData.illegalFact.length>30?true:false }" :autosize="{ minRows: 1, maxRows: 10}" maxlength="300" placeholder="\"></el-input>
                    </el-form-item>
                </td>
                </tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>

                <tr>
                <td rowspan="5">
                    <p>证据</p>
                    <p>材料</p>
                </td>
                <td>序号</td>
                <td colspan="2">证据名称</td>
                <td colspan="2">规格</td>
                <td colspan="2">数量</td>
                </tr>
                <tr @click="showEvidence" v-for="(item,index) in formData.evidenceList" :key="index">
                <td>{{item.name ? index+1 : ''}}</td>
                <td colspan="2">{{item.name ? item.name : ''}}</td>
                <td colspan="2">{{item.des ? item.des : ''}}</td>
                <td colspan="2">{{item.num ? item.num : ''}}</td>
                </tr>
                <!-- <tr>
                <td></td>
                <td colspan="2">{{formData.evidenceList[1].name}}</td>
                <td colspan="2">{{formData.evidenceList[1].des}}</td>
                <td colspan="2">{{formData.evidenceList[1].num}}</td>
                </tr>
                <tr>
                <td></td>
                <td colspan="2">{{formData.evidenceList[2].name}}</td>
                <td colspan="2">{{formData.evidenceList[2].des}}</td>
                <td colspan="2">{{formData.evidenceList[2].num}}</td>
                </tr>
                <tr>
                <td></td>
                <td colspan="2">{{formData.evidenceList[3].name}}</td>
                <td colspan="2">{{formData.evidenceList[3].des}}</td>
                <td colspan="2">{{formData.evidenceList[3].num}}</td>
                </tr> -->
            </table>
            </div>

            <div class="print_info">
            <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
                <tr>
                <td rowspan="6" width="49">
                    <p>调查</p>
                    <p>结论</p>
                    <p>和处</p>
                    <p>理意</p>
                    <p>见</p>
                </td>
                <td rowspan="6" colspan="6" @click="showLawOfficeOpion">
                    <p class="approveDiv">{{formData.lawOfficeOpinions}}</p>
                    <div class="pdf_seal">
                    <!-- <p>执法人员签名：</p>
                    <p>
                        时间:
                        <el-form-item prop="makeDate" class="pdf_datapick">
                        <el-date-picker v-model="formData.makeDate" format="yyyy年MM月dd日" placeholder="    年  月  日" clear-icon="el-icon-circle-close"></el-date-picker>
                        </el-form-item>
                    </p> -->
                    <p>执法人员签名：{{formData.lawOfficeName}}</p>
                    <p>
                        {{formData.lawOfficeApprovalTime}}
                    </p>
                    </div>
                </td>
                </tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>

                <tr>
                <td rowspan="6">
                    <p>经办</p>
                    <p>机构</p>
                    <p>负责</p>
                    <p>人意</p>
                    <p>见</p>
                </td>
                <td rowspan="6" colspan="8">
                    <p class="approveDiv">{{formData.approveOpinions}}</p>
                    <div class="pdf_seal">
                    <p>签名：{{formData.approvePeo}}</p>
                    <p>
                        {{formData.approveTime}}
                        <!-- <el-form-item prop="makeDate" class="pdf_datapick">
                        <el-date-picker v-model="formData.makeDate" format="yyyy年MM月dd日" placeholder="    年  月  日" clear-icon='el-icon-circle-close'>
                        </el-date-picker>
                        </el-form-item>-->
                    </p>
                    </div>
                </td>
                </tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>

                <tr>
                <td rowspan="6">
                    <p>重大</p>
                    <p>案件</p>
                    <p>法制</p>
                    <p>工作</p>
                    <p>机构</p>
                    <p>审核</p>
                    <p>意见</p>
                </td>
                <td rowspan="6" colspan="8">
                    <p class="approveDiv">{{formData.secondApproveOpinions}}</p>
                    <div class="pdf_seal">
                    <p>签名：{{formData.secondApprovePeo}}</p>
                    <p>
                        {{formData.secondApproveTime}}
                        <!-- <el-form-item prop="makeDate" class="pdf_datapick">
                        <el-date-picker v-model="formData.makeDate" format="yyyy年MM月dd日" placeholder="    年  月  日" clear-icon='el-icon-circle-close'>
                        </el-date-picker>
                        </el-form-item>-->
                    </p>
                    </div>
                </td>
                </tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
            </table>
            </div>

            <div class="print_info">
            <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
                <tr>
                <td rowspan="6" width="49">
                    <p>交通</p>
                    <p>运输</p>
                    <p>执法</p>
                    <p>部门</p>
                    <p>负责</p>
                    <p>人审</p>
                    <p>批意</p>
                    <p>见</p>
                </td>
                <td rowspan="6" colspan="7">
                    <p class="approveDiv">{{formData.thirdApproveOpinions}}</p>
                    <div class="pdf_seal">
                    <p>签名：{{formData.thirdApprovePeo}}</p>
                    <p>
                        {{formData.thirdApproveTime}}
                        <!-- <el-form-item prop="makeDate" class="pdf_datapick">
                        <el-date-picker v-model="formData.makeDate" format="yyyy年MM月dd日" placeholder="    年  月  日" clear-icon='el-icon-circle-close'>
                        </el-date-picker>
                        </el-form-item>-->
                    </p>
                    </div>
                </td>
                </tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
            </table>
            </div>
        </div>
      </div>

    </el-form>

    <casePageFloatBtns :pageDomId="'caseInvest-print'" :formOrDocData="formOrDocData" @saveData="saveData" @showApproval="showApproval"></casePageFloatBtns>
    <!--  显示证据材料 -->
    <investigRpEvidence ref="investigRpEvidenceRef" @sendToReportEmit="receiverEviden"></investigRpEvidence>
    <!-- 提交审批 -->
    <showApprovePeople ref="showApprovePeopleRef"></showApprovePeople>
    <!-- 审批 -->
    <approvalDialog ref="approvalDialogRef" @getNewData="goToPfd"></approvalDialog>
    <caseSlideMenu :activeIndex="''"></caseSlideMenu>
    <!-- 执法人员意见弹窗 -->
    <showLawOfficerOpion ref="showLawOfficerOpionRef" @sendLawOfficeOpionEmit="getLawOfficeOpion"></showLawOfficerOpion>
  </div>
</template>
<script>
import showApprovePeople from "../components/showApprovePeople";
import approvalDialog from "../components/approvalDialog";
import showLawOfficerOpion from "../components/showLawOfficerOpion";
import investigRpEvidence from "../components/investigRpEvidence";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import caseSlideMenu from '@/page/caseHandle/components/caseSlideMenu'
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import { validatePhone, validateIDNumber } from "@/common/js/validator";
import iLocalStroage from "@/common/js/localStroage";

export default {
  data() {
    return {
      formData: {
        caseNumber: "",
        caseName: "",
        staff: "",
        party: "",
        partySex: "",
        partyAge: "",
        partyAddress: "",
        occupation: "",
        partyName: "",
        partyManager: "",
        partyUnitAddress: "",
        partyUnitTel: "",
        illegalFact: "",
        makeDate: "",
        approveOpinions: "",
        approvePeo: "",
        approveTime: "",
        secondApproveOpinions: "",
        secondApprovePeo: "",
        secondApproveTime: "",
        thirdApproveOpinions: "",
        thirdApprovePeo: "",
        thirdApproveTime: "",
        evidenceList: [], //证据材料
        lawOfficeOpinions:'',
        lawOfficeName:'',
        lawOfficeApprovalTime:'',
        // investigProcess: "",
        // caseCauseDescrib: "",
        // isMajorCase: "1",
        // punishType: ["警告"],
        // investigResult: "",
        // dealOpinions: "1212121"
      },
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseLinktypeId: "2c9029ee6cac9281016caca7f38e0002",
        //文书数据
        formData: "",
        status: ""
      },
      handleType: 0,
      rules: {
        partyUnitTel: [{ validator: validatePhone, trigger: "blur" }],
        illegalFact: [
          { required: true, message: "请输入", trigger: "blur" }
        ]
      },
      // 大写
      punishMoneyCapital: "",
      confiscateThingCapital: "",
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
        pageDomId: "caseInvest-print"
      },
      huanjieAndDocId: "2c9029ca5b711f61015b71391c9e2420", //案件调查报告的文书id
      approvalOver: false, //审核完成
      nameLength: 10,
      sexLength: 2,
      adressLength: 23,
      isParty: true,
      originalData: "",
      needDealData:true,
    };
  },
  computed: { ...mapGetters(["caseId"]) },
  mixins: [mixinGetCaseApiList],
  components: {
    showApprovePeople,
    approvalDialog,
    casePageFloatBtns,
    investigRpEvidence,
    caseSlideMenu,
    showLawOfficerOpion,
  },
  methods: {
    //加载表单信息
    setFormData() {
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(
        this.caseLinkDataForm.caseBasicinfoId,
        this.caseLinkDataForm.caseLinktypeId,
        false
      );
    },
    //保存表单数据
    saveData(handleType) {
      //参数  提交类型 、formRef
      this.com_submitCaseForm(handleType, "caseInvestiForm", true);
    },
    //审批弹窗
    showApproval() {
      //判断是一级审批还是二级审批还是三级(经办机构负责人审批、法制审查、部门负责人审批)
      console.log(this.formData);
      let approvePeo = this.formData.approvePeo ? this.formData.approvePeo : "";
      let secondApprovePeo = this.formData.secondApprovePeo
        ? this.formData.secondApprovePeo
        : "";

      let caseData = {
        caseId: this.caseId,
        caseLinktypeId: "2c9029ee6cac9281016caca7f38e0002",
        firstApproval: approvePeo,
        secondApproval: secondApprovePeo,
        approvalNumber: 3 //3次审批
      };
      this.$refs.approvalDialogRef.showModal(caseData);
    },
    // 暂存
    save() { },
    // 添加
    addDoc() { },
    // 大写
    capital() {
      this.punishMoneyCapital = "";
      this.punishMoneyCapital = this.changeMoneyToChinese(
        this.docData.punishMoney
      );
    },
    // 大写
    capitalbtm() {
      this.confiscateThingCapital == "";
      this.confiscateThingCapital = this.changeMoneyToChinese(
        this.docData.confiscateThing
      );
    },
    changeMoneyToChinese(money) {
      var cnNums = new Array(
        "零",
        "壹",
        "贰",
        "叁",
        "肆",
        "伍",
        "陆",
        "柒",
        "捌",
        "玖"
      ); //汉字的数字
      var cnIntRadice = new Array("", "拾", "佰", "仟"); //基本单位
      var cnIntUnits = new Array("", "万", "亿", "兆"); //对应整数部分扩展单位
      var cnDecUnits = new Array("角", "分", "毫", "厘"); //对应小数部分单位
      //var cnInteger = "整"; //整数金额时后面跟的字符
      var cnIntLast = "元"; //整型完以后的单位
      var maxNum = 999999999999999.9999; //最大处理的数字

      var IntegerNum; //金额整数部分
      var DecimalNum; //金额小数部分
      var ChineseStr = ""; //输出的中文金额字符串
      var parts; //分离金额后用的数组，预定义
      if (money == "") {
        return "";
      }
      money = parseFloat(money);
      if (money >= maxNum) {
        $.alert("超出最大处理数字");
        return "";
      }
      if (money == 0) {
        //ChineseStr = cnNums[0]+cnIntLast+cnInteger;
        ChineseStr = cnNums[0] + cnIntLast;
        //document.getElementById("show").value=ChineseStr;
        return ChineseStr;
      }
      money = money.toString(); //转换为字符串
      if (money.indexOf(".") == -1) {
        IntegerNum = money;
        DecimalNum = "";
      } else {
        parts = money.split(".");
        IntegerNum = parts[0];
        DecimalNum = parts[1].substr(0, 4);
      }
      if (parseInt(IntegerNum, 10) > 0) {
        //获取整型部分转换
        let zeroCount = 0;
        let IntLen = IntegerNum.length;
        for (let i = 0; i < IntLen; i++) {
          let n = IntegerNum.substr(i, 1);
          let p = IntLen - i - 1;
          let q = p / 4;
          let m = p % 4;
          if (n == "0") {
            zeroCount++;
          } else {
            if (zeroCount > 0) {
              ChineseStr += cnNums[0];
            }
            zeroCount = 0; //归零
            ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
          }
          if (m == 0 && zeroCount < 4) {
            ChineseStr += cnIntUnits[q];
          }
        }
        ChineseStr += cnIntLast;
        //整型部分处理完毕
      }
      if (DecimalNum != "") {
        //小数部分
        let decLen = DecimalNum.length;
        for (let i = 0; i < decLen; i++) {
          let n = DecimalNum.substr(i, 1);
          if (n != "0") {
            ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
          }
        }
      }
      if (ChineseStr == "") {
        //ChineseStr += cnNums[0]+cnIntLast+cnInteger;
        ChineseStr += cnNums[0] + cnIntLast;
      } /* else if( DecimalNum == '' ){
                ChineseStr += cnInteger;
                ChineseStr += cnInteger;
            } */
      return ChineseStr;
    },
    // 生成意见
    generateOpinions() {
      this.docData.dealOpinions = `经过调查核实：当事人this.formData.party+违法行为，违反了+违法条例+有证据材料（列举：上面证据材料内容）
证明该案中违法事实清楚，依据+处罚条款+拟给予当事人+当事人姓名+拟处罚类型1（名称+后续说明）+
拟处罚类型2+……+拟处罚类型N+的行政处罚
                                          当否，请批示。 `;
      console.log("dealOpinions", this.formData.dealOpinions);
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
    showEvidence() {
      this.$refs.investigRpEvidenceRef.showModal(this.formData.evidenceList);
    },
    //执法人员审核意见带入
    showLawOfficeOpion(){
      this.$refs.showLawOfficerOpionRef.showModal();
    },
    getLawOfficeOpion(lawOfficeOpionData){
      console.log(lawOfficeOpionData);
      this.formData.lawOfficeOpinions = lawOfficeOpionData.lawOfficeOpinions;
      this.formData. lawOfficeName = iLocalStroage.gets('userInfo').username;
      this.formData.lawOfficeApprovalTime = lawOfficeOpionData.lawOfficeApprovalTime;
    },
    //证据列表弹窗传来的证据
    receiverEviden(data) {
      console.log('data', data);
      // data.forEach((item,index)=>{
      //   this.formData.evidenceList[index] = item;
      // })
      this.formData.evidenceList = data;
      // console.log(this.formData.evidenceList);
    },
    //对原始数据做一下处理
    getDataAfter() {
      console.log(this.formData);
      if (!this.formData.evidenceList.length) {
        this.formData.evidenceList = [{ name: '', num: '', des: '' }, { name: '', num: '', des: '' }, { name: '', num: '', des: '' }, { name: '', num: '', des: '' }]
      }
    }
  },
  created() {
    this.setFormData();
    this.isApproval();
  }
};
</script>

<style lang="scss">
// @import "@/assets/css/documentForm.scss";
@import "@/assets/css/caseHandle/caseDocModle.scss";
</style>
