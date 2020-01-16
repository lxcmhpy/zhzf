<template>
  <div class="print_box ">

    <el-form :rules="rules" ref="caseInvestiForm" :inline-message="true" :inline="true" :model="formData">
      <div class="printNumbers_box">

        <div class="print_info" id="caseInvest-print">
          <div class="doc_topic">案件调查报告</div>
          <div class="doc_number">案号：{{formData.caseNumber}}</div>
          <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
            <tr>
              <td rowspan="2">案由</td>
              <td colspan="5" rowspan="2" class="color_DBE4EF">
                <el-form-item prop="closeResult">
                  <el-input v-model="formData.caseName"></el-input>
                </el-form-item>
              </td>
              <td rowspan="2">案件调查人员</td>
              <td rowspan="2" class="color_DBE4EF">
                <el-form-item>
                  <el-input type="textarea" v-model="formData.staff"></el-input>
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
                <el-form-item prop="closeResult">
                  <el-input v-model="formData.party" placeholder="\"></el-input>
                </el-form-item>
              </td>
              <td>性别</td>
              <td class="color_DBE4EF">
                <el-form-item prop="closeResult">
                  <el-input v-model="formData.partySex" placeholder="\"></el-input>
                </el-form-item>
              </td>
              <td>年龄</td>
              <td class="color_DBE4EF">
                <el-form-item prop="closeResult">
                  <el-input v-model="formData.partyAge" placeholder="\"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>住址</td>
              <td colspan="3" class="color_DBE4EF">
                <el-input type="textarea" v-model="formData.partyAddress" placeholder="\"></el-input>
              </td>
              <td>职业</td>
              <td class="color_DBE4EF">
                <el-input type="textarea" v-model="formData.occupation" placeholder="\"></el-input>
              </td>
            </tr>
            <tr>
              <td rowspan="4">单位</td>
              <td>名称</td>
              <td colspan="5" class="color_DBE4EF">
                <el-input type="textarea" v-model="formData.partyName" placeholder="\"></el-input>
              </td>
            </tr>
            <tr>
              <td>法定代表人</td>
              <td colspan="5" class="color_DBE4EF">
                <el-input type="textarea" v-model="formData.partyManager" placeholder="\"></el-input>
              </td>
            </tr>
            <tr>
              <td>地址</td>
              <td colspan="5" class="color_DBE4EF">
                <el-input type="textarea" v-model="formData.partyUnitAddress" placeholder="\"></el-input>
              </td>
            </tr>
            <tr>
              <td>联系电话</td>
              <td colspan="5" class="color_DBE4EF">
                <el-input type="textarea" v-model="formData.partyUnitTel" placeholder="\"></el-input>
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
              <td rowspan="6" colspan="7" class="color_DBE4EF">
                <el-input type="textarea" v-model="formData.illegalLaw" placeholder="\"></el-input>
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
            <tr>
              <td></td>
              <td colspan="2"></td>
              <td colspan="2"></td>
              <td colspan="2"></td>
            </tr>
            <tr>
              <td></td>
              <td colspan="2"></td>
              <td colspan="2"></td>
              <td colspan="2"></td>
            </tr>
            <tr>
              <td></td>
              <td colspan="2"></td>
              <td colspan="2"></td>
              <td colspan="2"></td>
            </tr>
            <tr>
              <td></td>
              <td colspan="2"></td>
              <td colspan="2"></td>
              <td colspan="2"></td>
            </tr>
          </table>
        </div>

        <div class="print_info">
          <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">

            <tr>
              <td rowspan="6">
                <p>调查</p>
                <p>结论</p>
                <p>和处</p>
                <p>理意</p>
                <p>见</p>
              </td>
              <td rowspan="6" colspan="7">
                <div class="pdf_seal">
                  <p>执法人员签名：</p>
                  <p>
                    时间:<el-form-item prop="makeDate" class="pdf_datapick">
                      <el-date-picker v-model="formData.makeDate" format="yyyy年MM月dd日" placeholder="    年  月  日" clear-icon='el-icon-circle-close'>
                      </el-date-picker>
                    </el-form-item>
                  </p>
                </div>
              </td>
            </tr>
            <tr>
            </tr>
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
              <td rowspan="6" colspan="7">
                {{formData.approveOpinions}}
                <div class="pdf_seal">
                  <p>签名：{{formData.approvePeo}}</p>
                  <p>
                    {{formData.approveTime}}
                    <!-- <el-form-item prop="makeDate" class="pdf_datapick">
                      <el-date-picker v-model="formData.makeDate" format="yyyy年MM月dd日" placeholder="    年  月  日" clear-icon='el-icon-circle-close'>
                      </el-date-picker>
                    </el-form-item> -->
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
              <td rowspan="6" colspan="7">
                {{formData.secondApproveOpinions}}
                <div class="pdf_seal">
                <p>签名：{{formData.secondApprovePeo}}</p>
                <p>
                  {{formData.secondApproveTime}}
                  <!-- <el-form-item prop="makeDate" class="pdf_datapick">
                    <el-date-picker v-model="formData.makeDate" format="yyyy年MM月dd日" placeholder="    年  月  日" clear-icon='el-icon-circle-close'>
                    </el-date-picker>
                  </el-form-item> -->
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
              <td rowspan="6">
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

                {{formData.thirdApproveOpinions}}
                <div class="pdf_seal">
                  <p>签名：{{formData.thirdApprovePeo}}</p>
                  <p>
                    {{formData.thirdApproveTime}}
                    <!-- <el-form-item prop="makeDate" class="pdf_datapick">
                      <el-date-picker v-model="formData.makeDate" format="yyyy年MM月dd日" placeholder="    年  月  日" clear-icon='el-icon-circle-close'>
                      </el-date-picker>
                    </el-form-item> -->
                  </p>
                </div>
              </td>
            </tr>
            <tr>
            </tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
          </table>
        </div>
      </div>
      <!-- 悬浮按钮 -->
      <!-- <div class="float-btns">
        <el-button type="primary" @click="submitCaseDoc(1)" v-if="!approval">
          <svg t="1577414377979" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1726" width="16" height="16">
            <path d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z" p-id="1727" fill="#FFFFFF" />
          </svg>
          <br />提交
        </el-button>
        <el-button type="primary" @click="showApprovePeopleList" v-if="!approval">
          <svg t="1577414377979" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1726" width="16" height="16">
            <path d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z" p-id="1727" fill="#FFFFFF" />
          </svg>
          <br />提交审批
        </el-button>
        <el-button type="success" v-if="!approval">
          <svg t="1577415780823" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2584" width="16" height="16">
            <path d="M98 124.1V902c0 14.3 11.6 25.9 25.9 25.9h777.9c14.3 0 25.9-11.6 25.9-25.9V124.1c0-14.3-11.6-25.9-25.9-25.9H123.9c-14.3 0-25.9 11.6-25.9 25.9z m207.4 37.6h414.9v191.7H305.4V161.7z m558.8 702.7H162.6V161.7h104v230.6h492.7V161.7h105v702.7z" p-id="2585" fill="#FFFFFF" />
            <path d="M605.1 191.9h70v128h-70z" p-id="2586" fill="#FFFFFF" />
          </svg>
          <br />暂存
        </el-button>
        <el-button type="primary" @click="showApproval" v-if="approval">
          <svg t="1577414377979" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1726" width="16" height="16">
            <path d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z" p-id="1727" fill="#FFFFFF" />
          </svg>
          <br />审批
        </el-button>
      </div> -->
    </el-form>
  
    <casePageFloatBtns
      :pageDomId="'caseInvest-print'"
      :formOrDocData="formOrDocData"
      @saveData="saveData"
      @showApprovePeopleList="showApprovePeopleList"
      @showApproval="showApproval"
    ></casePageFloatBtns>
    <!-- 提交审批 -->
    <showApprovePeople ref="showApprovePeopleRef"></showApprovePeople>
    <!-- 审批 -->
    <approvalDialog ref="approvalDialogRef" @getNewData="goToPfd"></approvalDialog>
  </div>
</template>
<script>
import showApprovePeople from "../components/showApprovePeople";
import approvalDialog from "../components/approvalDialog";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";

import { mixinGetCaseApiList } from "@/js/mixins";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      formData: {
        caseNumber: "",
        caseName: "",
        party: "",
        partyAddress: "",
        partyTel: "",
        partyIdNo: "",
        partyAge: "",
        party: "",
        partySex: "",
        investigProcess: "",
        caseCauseDescrib: "",
        isMajorCase: "1",
        punishType: ["警告"],
        investigResult: "",
        dealOpinions: "1212121"
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
      tableDatas: [
        {
          index: "1",
          name: "四川",
          status: "-",
          option: "1"
        },
        {
          index: "2",
          name: "四川",
          status: "完成",
          option: "2"
        },
        {
          index: "3",
          name: "四川",
          status: "暂存",
          option: "3"
        }
      ],
      rules: {
        // caseNumber: [
        //   { required: true, message: "案号必须填写", trigger: "blur" }
        // ],
        // caseName: [
        //   { required: true, message: " 案由必须填写", trigger: "blur" }
        // ],
        // acceptTime: [
        //   { required: true, message: "受案时间必须填写", trigger: "blur" }
        // ],
        // partyType: [
        //   { required: true, message: "当事人类型必须填写", trigger: "blur" }
        // ]
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
      approvalOver: false //审核完成
    };
  },
  computed: { ...mapGetters(["caseId"]) },
  mixins: [mixinGetCaseApiList],
  components: {
    showApprovePeople,
    approvalDialog,
    casePageFloatBtns
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
    //下一环节
    // continueHandle() {
    //   this.com_goToNextLinkTu(this.caseLinkDataForm.caseLinktypeId);
    // },
    // showApprovePeopleList() {
    //   let data = {
    //     caseId: this.caseId,
    //     caseLinktypeId: "2c9029ee6cac9281016caca7f38e0002"
    //   };
    //   this.$refs.showApprovePeopleRef.showModal(data);
    // },
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
    }
  },
  created() {
    this.setFormData();
    this.isApproval();
  }
};
</script>

<style lang="less">
// @import "../../../css/documentForm.less";
@import "../../../css/caseHandle/caseDocModle.less";
</style>
