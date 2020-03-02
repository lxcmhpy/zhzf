<template>
  <div class="box">
    <el-form ref="caseInvestiForm" :rules="rules" :model="formData" label-width="115px">
      <div class="content_box">
        <div class="content">
          <div class="content_title">案件调查报告(需要改为pdf版)</div>
          <div class="border_blue"></div>

          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item prop="caseNumber" label="案号">
                  <el-input
                    ref="caseNumber"
                    clearable
                    class="w-120"
                    v-model="formData.caseNumber"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="acceptTime" label="受案时间">
                  <el-date-picker
                    v-model="formData.acceptTime"
                    type="date"
                    placeholder="选择日期"
                    size="small"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="partyType" label="当事人类型">
                  <el-input
                    ref="partyType"
                    clearable
                    class="w-120"
                    v-model="formData.partyType"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="姓名">
                  <el-input
                    ref="party"
                    clearable
                    class="w-120"
                    v-model="formData.party"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="性别">
                   <el-select v-model="formData.partySex" placeholder="请选择" class="select10">
                  <el-option value="0" label="男"></el-option>
                  <el-option value="1" label="女"></el-option>
                </el-select>
                  <!-- <el-input
                    ref="partySex"
                    clearable
                    class="w-120"
                    v-model="formData.partySex"
                    size="small"
                    placeholder="请选择"
                  ></el-input> -->
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="年龄">
                  <el-input
                    ref="partyAge"
                    clearable
                    class="w-120"
                    v-model="formData.partyAge"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="身份证号">
                  <el-input
                    ref="partyIdNo"
                    clearable
                    class="w-120"
                    v-model="formData.partyIdNo"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="联系电话">
                  <el-input
                    ref="partyTel"
                    clearable
                    class="w-120"
                    v-model="formData.partyTel"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="住址">
                  <el-input
                    ref="partyAddress"
                    clearable
                    class="w-120"
                    v-model="formData.partyAddress"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="调查经过">
                  <el-input
                    ref="investigProcess"
                    clearable
                    class="w-120"
                    v-model="formData.investigProcess"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="违法事实">
                  <el-input
                    type="textarea"
                    class="height122"
                    v-model="formData.caseCauseDescrib"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
          </div>

          <div class="border_blue"></div>

          <el-row :gutter="20">
            <el-col :span="16">
              <div class="second_title">证据材料</div>
            </el-col>
            <el-col :span="8">
              <div class="second_title_btns">
                <el-button type="primary" size="small">选择已上传证据</el-button>
                <el-button type="success" size="small">本地上传</el-button>
              </div>
            </el-col>
          </el-row>

          <div class="table_form">
            <el-table :data="tableDatas" stripe border style="width: 100%" height="100%">
              <el-table-column prop="index" label="序号" align="center"></el-table-column>
              <el-table-column prop="name" label="证据名称" align="center"></el-table-column>
              <el-table-column prop="status" label="规格" align="center"></el-table-column>
              <el-table-column prop="status" label="数量" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <!-- {{scope.row.option}} -->
                  <i type="primary" class="el-icon-top cell-icon" @click="addDoc(scope)"></i>
                  <i type="primary" class="el-icon-bottom cell-icon"></i>
                  <i type="primary" class="el-icon-delete cell-icon"></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="border_blue"></div>
          <div class="content_form bottom_form">
            <div class="row">
              <div class="col">
                <el-form-item label="调查结论">
                  <el-input
                    v-model="formData.investigResult"
                    type="textarea"
                    class="height88"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="拟处罚类型">
                  <el-checkbox-group v-model="formData.punishType">
                    <el-row>
                      <el-col :span="4">
                        <el-checkbox label="罚款"></el-checkbox>
                      </el-col>
                      <el-col :span="9">
                        <el-input
                          v-model="formData.punishMoney"
                          placeholder="请输入罚款金额（小写金额）"
                          @change="capital()"
                        ></el-input>
                      </el-col>
                      <el-col :span="1">
                        <!-- 有问题-不显示 -->
                        <div class="grid-content">--</div>
                      </el-col>
                      <el-col :span="10">
                        <el-input v-model="punishMoneyCapital"></el-input>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="4">
                        <el-checkbox label="责令改正"></el-checkbox>
                      </el-col>
                      <el-col :span="20">
                        <el-input v-model="formData.punishCorrect" placeholder="请输入责令改正要求"></el-input>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="4">
                        <el-checkbox label="警告"></el-checkbox>
                      </el-col>
                      <el-col :span="20">
                        <el-input v-model="formData.punishWarn" placeholder="请输入警告内容"></el-input>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="4">
                        <el-checkbox label="没收违法所得"></el-checkbox>
                      </el-col>
                      <el-col :span="9">
                        <el-input
                          v-model="formData.confiscateThing"
                          placeholder="请输入罚款金额（小写金额）"
                          @change="capitalbtm()"
                        ></el-input>
                      </el-col>
                      <el-col :span="1">
                        <!-- 有问题-不显示 -->
                        <div class="grid-content">--</div>
                      </el-col>
                      <el-col :span="10">
                        <el-input v-model="confiscateThingCapital"></el-input>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="4">
                        <el-checkbox label="没收非法财产"></el-checkbox>
                      </el-col>
                      <el-col :span="20">
                        <el-input v-model="formData.confiscateMoney" placeholder="请输入非法财产内容"></el-input>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="10">
                        <el-checkbox label="责令停产停业、暂扣或吊销许可整合执照"></el-checkbox>
                      </el-col>
                      <el-col :span="14">
                        <el-input v-model="formData.punishSuspend"></el-input>
                      </el-col>
                    </el-row>
                  </el-checkbox-group>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="拟重大案件">
                  <el-radio-group v-model="formData.isMajorCase">
                    <el-radio label="1">拟定重大案件</el-radio>
                    <el-radio label="2">非重大案件</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="处理意见">
                  <el-button
                    class="el-button-remind"
                    icon="el-icon-edit"
                    @click="generateOpinions"
                    size="small"
                  >生成意见</el-button>
                  <!-- 双向绑定有问题 -->
                  <el-input
                    type="textarea"
                    v-model="formData.dealOpinions"
                    class="height162"
                    size="small"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <span>经办机构负责人:</span>
              <span>意见：{{formData.approveOpinions}}</span>
              <span>签名：{{formData.approvePeo}}</span>
              <span>时间:{{formData.approveTime}}</span>
            </div>
            <div class="row">
              <span>法制审查:</span>
              <span>意见：{{formData.secondApproveOpinions}}</span>
              <span>签名：{{formData.secondApprovePeo}}</span>
              <span>时间:{{formData.secondApproveTime}}</span>
            </div>
            <div class="row">
              <span>部门负责人:</span>
              <span>意见：{{formData.thirdApproveOpinions}}</span>
              <span>签名：{{formData.thirdApprovePeo}}</span>
              <span>时间:{{formData.thirdApproveTime}}</span>
            </div>
          </div>
        </div>
        <!-- 悬浮按钮 -->
        <div class="float-btns">
          <!-- <el-button type="primary" @click="continueHandle">
            <svg t="1577515608465" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2285" width="24" height="24">
              <path d="M79.398558 436.464938c-25.231035 12.766337-56.032441 2.671394-68.800584-22.557835-12.775368-25.222004-2.682231-56.025216 22.548804-68.798778 244.424411-123.749296 539.711873-85.083624 744.047314 97.423694 33.059177-37.018403 66.118353-74.034999 99.179336-111.042564 26.072732-29.199292 74.302319-15.865804 81.689744 22.574091 20.740782 107.953934 41.486982 215.915094 62.229569 323.867222 5.884653 30.620785-18.981527 58.454577-50.071928 56.06134-109.610235-8.480185-219.211438-16.95134-328.812642-25.422494-39.021496-3.010963-57.692354-49.437946-31.610591-78.633625 33.060983-37.007565 66.116547-74.025968 99.175724-111.03534-172.88741-154.431492-422.746726-187.152906-629.574746-82.435711z" fill="#FFFFFF" p-id="2286"></path>
            </svg>
            <br>
            下一<br>环节
          </el-button>-->

          <el-button type="primary" @click="submitCaseDoc(1)" v-if="!approval">
            <svg
              t="1577414377979"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1726"
              width="16"
              height="16"
            >
              <path
                d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z"
                p-id="1727"
                fill="#FFFFFF"
              />
            </svg>
            <br />提交
          </el-button>
          <el-button type="primary" @click="showApprovePeopleList" v-if="!approval">
            <svg
              t="1577414377979"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1726"
              width="16"
              height="16"
            >
              <path
                d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z"
                p-id="1727"
                fill="#FFFFFF"
              />
            </svg>
            <br />提交审批
          </el-button>
          <el-button type="success" v-if="!approval">
            <svg
              t="1577415780823"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2584"
              width="16"
              height="16"
            >
              <path
                d="M98 124.1V902c0 14.3 11.6 25.9 25.9 25.9h777.9c14.3 0 25.9-11.6 25.9-25.9V124.1c0-14.3-11.6-25.9-25.9-25.9H123.9c-14.3 0-25.9 11.6-25.9 25.9z m207.4 37.6h414.9v191.7H305.4V161.7z m558.8 702.7H162.6V161.7h104v230.6h492.7V161.7h105v702.7z"
                p-id="2585"
                fill="#FFFFFF"
              />
              <path d="M605.1 191.9h70v128h-70z" p-id="2586" fill="#FFFFFF" />
            </svg>
            <br />暂存
          </el-button>
          <el-button type="primary" @click="showApproval" v-if="approval">
            <svg
              t="1577414377979"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1726"
              width="16"
              height="16"
            >
              <path
                d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z"
                p-id="1727"
                fill="#FFFFFF"
              />
            </svg>
            <br />审批
          </el-button>
        </div>
      </div>
    </el-form>
    <!-- 提交审批 -->
    <showApprovePeople ref="showApprovePeopleRef"></showApprovePeople>
    <!-- 审批 -->
    <approvalDialog ref="approvalDialogRef" @getNewData="setFormData"></approvalDialog>

  </div>
</template>
<script>
import showApprovePeople from "../components/showApprovePeople";
import approvalDialog from "../components/approvalDialog";

import { mixinGetCaseApiList } from "@/common/js/mixins";
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
        caseNumber: [
          { required: true, message: "案号必须填写", trigger: "blur" }
        ],
        caseName: [
          { required: true, message: " 案由必须填写", trigger: "blur" }
        ],
        acceptTime: [
          { required: true, message: "受案时间必须填写", trigger: "blur" }
        ],
        partyType: [
          { required: true, message: "当事人类型必须填写", trigger: "blur" }
        ]
      },
      // 大写
      punishMoneyCapital: "",
      confiscateThingCapital: "",
      approval: this.$route.params.isApproval ? true : false //   是否是审批人员进入
    };
  },
  computed: { ...mapGetters(["caseId"]) },
  mixins: [mixinGetCaseApiList],
  components: {
    showApprovePeople,
    approvalDialog
  },
  methods: {
    //加载表单信息
    setFormData() {
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(
        this.caseLinkDataForm.caseBasicinfoId,
        this.caseLinkDataForm.caseLinktypeId,
        "form"
      );
    },
    //保存表单数据
    submitCaseDoc(handleType) {
      this.com_submitCaseForm(handleType, "caseInvestiForm", true);
    },
    //下一环节
    // continueHandle() {
    //   this.com_goToNextLinkTu(this.caseLinkDataForm.caseLinktypeId);
    // },
    showApprovePeopleList() {
      let data = {
        caseId: this.caseId,
        caseLinktypeId: "2c9029ee6cac9281016caca7f38e0002"
      };
      this.$refs.showApprovePeopleRef.showModal(data);
    },
    //审批弹窗
    showApproval(){
      //判断是一级审批还是二级审批还是三级(经办机构负责人审批、法制审查、部门负责人审批)
      console.log(this.formData);
      // let caInvestApprovalPeo = '';
      // if(this.formData.caInvestApprovalPeoFirst){
      //   caInvestApprovalPeo = ''
      // }
      let approvePeo = this.formData.approvePeo ? this.formData.approvePeo : '';
      let secondApprovePeo = this.formData.secondApprovePeo ? this.formData.secondApprovePeo : '';

      let caseData={
        caseId:this.caseId,
        caseLinktypeId:"2c9029ee6cac9281016caca7f38e0002",
        firstApproval:approvePeo,
        secondApproval:secondApprovePeo,
        approvalNumber:3 //3次审批
      }
      this.$refs.approvalDialogRef.showModal(caseData);
    },
    // 暂存
    save() {},
    // 添加
    addDoc() {},
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
    }
  },
  created() {
    this.setFormData();
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/documentForm.scss";
</style>
