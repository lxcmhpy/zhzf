<template>
  <div class="box">
    <el-form ref="caseLinkDataForm">
      <el-input ref="id" type="hidden"></el-input>
    </el-form>
    <el-form
      ref="penaltyExecutionForm"
      :model="formData"
      :rules="rules"
      label-width="105px"
      :disabled="canGoNextLink"
    >
      <!-- <div class="header-case">
        <div class="header_left">
          <div class="triangle"></div>
          <div class="header_left_text">返回</div>
        </div>
      </div>-->
      <div class="content_box">
        <div class="content">
          <div class="content_title">决定执行</div>
          <div class="border_blue"></div>

          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item
                  prop="caseNumber"
                  label="案号"
                  :rules="fieldRules('caseNumber',propertyFeatures['caseNumber'])"
                >
                  <el-input
                    ref="caseNumber"
                    clearable
                    class="w-120"
                    v-model="formData.caseNumber"
                    size="small"
                    :disabled="fieldDisabled(propertyFeatures['caseNumber'])"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item
                  prop="punishType"
                  label="处罚类型"
                  :rules="fieldRules('punishType',propertyFeatures['punishType'])"
                >
                  <el-input
                    ref="punishType"
                    clearable
                    class="w-120"
                    v-model="formData.punishType"
                    size="small"
                    placeholder="-"
                    :disabled="fieldDisabled(propertyFeatures['punishType'])"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item
                  prop="caseName"
                  label="案由"
                  :rules="fieldRules('caseName',propertyFeatures['caseName'])"
                >
                  <el-input
                    ref="caseName"
                    clearable
                    class="w-120"
                    v-model="formData.caseName"
                    size="small"
                    :disabled="fieldDisabled(propertyFeatures['caseName'])"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item
                  prop="punishTerm"
                  label="处罚期限"
                  :rules="fieldRules('punishTerm',propertyFeatures['punishTerm'])"
                >
                  <!-- <el-input ref="punishTerm" clearable class="w-120" v-model="formData.punishTerm" size="small" placeholder="请输入"></el-input> -->
                  <el-date-picker
                    class="w-120"
                    value-format="yyyy-MM-dd HH:mm"
                    v-model="formData.punishTerm"
                    type="date"
                    placeholder="选择日期"
                    :disabled="fieldDisabled(propertyFeatures['punishTerm'])"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item
                  prop="punishDecision"
                  label="处罚决定"
                  :rules="fieldRules('punishDecision',propertyFeatures['punishDecision'])"
                >
                  <el-input
                    ref="punishDecision"
                    clearable
                    class="w-120"
                    v-model="formData.punishDecision"
                    size="small"
                    placeholder="-"
                    :disabled="fieldDisabled(propertyFeatures['punishDecision'])"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item
                  label="处罚金额"
                  :rules="fieldRules('tempPunishAmount',propertyFeatures['tempPunishAmount'])"
                >
                  <el-input
                    clearable
                    class="w-120"
                    v-model.number="formData.tempPunishAmount"
                    size="small"
                    placeholder="-"
                    :disabled="fieldDisabled(propertyFeatures['tempPunishAmount'])"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="border_blue"></div>
          <div class="content_form bottom_form">
            <div class="row">
              <div class="col">
                <el-form-item label="执行方式">
                  <el-radio-group
                    v-model="formData.performWay"
                    @change="changePayWay"
                    :rules="fieldRules('performWay',propertyFeatures['performWay'])"
                  >
                    <el-radio :label="'线下缴费'">线下缴费</el-radio>
                    <el-radio :label="'电子缴纳'">电子缴纳</el-radio>
                  </el-radio-group>
                  <el-checkbox v-model="formData.correct" style="magin-left:20px"></el-checkbox>责令改正
                  <!-- <el-input ref="caseName" clearable class="w-120" v-model="formData.caseName" size="small" placeholder="请输入"></el-input> -->
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="paidAmount" label="已缴金额" :rules="fieldRules('paidAmount',propertyFeatures['paidAmount'])">
                  <el-input type="number" v-model.number="formData.paidAmount" @input="handleChangePaidAmount" size="small" placeholder="-" :disabled="fieldDisabled(propertyFeatures['paidAmount'])" :controls="false" style="width:100%"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="toPayAmount" label="待缴金额" :rules="fieldRules('toPayAmount',propertyFeatures['toPayAmount'])">
                  <el-input clearable class="w-120" size="small" @input="handleChangeToPayAmount" v-model="formData.toPayAmount" placeholder="-" :disabled="true"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="performance" label="执行情况">
                  <el-select v-model="formData.performance">
                    <!-- <el-option label="未完成" value="未完成"></el-option>
                    <el-option label="已完成" value="已完成"></el-option>
                    <el-option label="催告" value="催告"></el-option>-->
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <!-- <el-input ref="performance" clearable class="w-120" v-model="formData.performance" size="small" placeholder="请输入"></el-input> -->
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="checkbox">
                  <el-checkbox v-model="formData.stepPay" @change="changeStepPay"></el-checkbox>分期（延期）缴纳
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item
                  prop="note"
                  label="备注"
                  :rules="fieldRules('note',propertyFeatures['note'])"
                >
                  <el-input
                    ref="note"
                    clearable
                    class="w-120"
                    v-model="formData.note"
                    size="small"
                    placeholder="请输入"
                    :disabled="fieldDisabled(propertyFeatures['note'])"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="!isOnlinePay">
              <div class="col">
                <el-form-item prop="payEvidence" label="缴纳凭证">
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :http-request="uploadPaymentVoucher"
                    :show-file-list="false"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <ul>
                      <li
                        v-for="item in alreadyLoadPayEvidence"
                        :key="item.id"
                        @click.stop="evidenceDetail(item)"
                      >{{item.fileName}}</li>
                    </ul>
                  </el-upload>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isOnlinePay">
              <div class="col">
                <el-form-item label="缴纳金额" prop="payAmount">
                  <el-input
                    clearable
                    class="w-120"
                    v-model.number="formData.payAmount"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isOnlinePay">
              <div class="col">
                <el-form-item label="收款人">
                  <el-input
                    clearable
                    class="w-120"
                    v-model="formData.payee"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isOnlinePay">
              <div class="col">
                <el-form-item label="缴费时间">
                  <el-date-picker
                    v-model="formData.paymentTime"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content_box">
        <div class="content">
          <div class="table_form">
            <el-table
              :data="docTableDatas"
              stripe
              border
              style="width: 100%"
              :row-class-name="getRowClass"
            >
              <el-table-column type="expand" expand-change>
                <template slot-scope="props">
                  <ul class="moreDocList">
                    <li
                      v-for="(item,index) in props.row.path =='case_handle_payStageDoc_JX' ? allAskDocList : allApprovalDocList"
                      :key="index"
                    >
                      <div>{{item.note}}</div>
                      <div>
                        <span v-if="item.status == '1' || item.status == '2'">
                          <template v-if="item.docProcessStatus=='待审批'">待审批</template>
                          <template v-if="item.docProcessStatus=='审批中'">审批中</template>
                          <template
                            v-if="item.docProcessStatus==''|| item.docProcessStatus=='已完成'"
                          >已完成</template>
                        </span>
                        <!-- <span v-if="scope.row.status == '1' || scope.row.status == '2'">已完成</span> -->
                        <span v-if="item.status == '0'">未完成</span>
                        <span v-if="item.status === ''">-</span>
                        <!-- </template> -->
                      </div>
                      <div>
                        <span
                          v-if="item.status == '1' || item.status == '2'"
                          class="tableHandelcase"
                          @click="viewDocPdf(item)"
                        >查看</span>
                        <span v-if="item.status == '0'" class="tableHandelcase">
                          <span @click="viewDoc(item)">编辑</span>
                          <span @click="delDocDataByDocId(item)">清空</span>
                        </span>
                        <span
                          v-if="item.status === ''"
                          class="tableHandelcase"
                          @click="viewDoc(item)"
                        >添加</span>
                      </div>
                    </li>
                  </ul>
                </template>
              </el-table-column>

              <el-table-column type="index" label="序号" align="center"></el-table-column>
              <el-table-column prop="name" label="材料名称" align="center">
                <template slot-scope="scope">
                  <span style="color:red" v-if="scope.row.isRequired == 0">*</span>
                  {{scope.row.name}}
                  <!-- 分期（延期）缴纳罚款通知书 -->
                  <span
                    v-if="scope.row.docId== BASIC_DATA_JX.payStageDoc_JX_caseDocTypeId"
                  >（{{finishDocCount}}/{{allDocCount}}）</span>
                  <!-- 分期（延期）缴纳罚款审批表 -->
                  <span
                    v-if="scope.row.docId== BASIC_DATA_JX.stageDelayApprovalForm_JX_caseDocTypeId"
                  >（{{finishDelayApprovalDocCount}}/{{allDelayApprovalDocCount}}）</span>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == '1' || scope.row.status == '2'">
                    <template v-if="scope.row.docProcessStatus=='待审批'">待审批</template>
                    <template v-if="scope.row.docProcessStatus=='审批中'">审批中</template>
                    <template v-if="scope.row.docProcessStatus=='已驳回'">已驳回</template>
                    <template v-if="scope.row.docProcessStatus==''|| scope.row.docProcessStatus=='已完成'">已完成</template>
                  </span>
                  <span v-if="scope.row.status == '0'">未完成</span>
                  <span v-if="scope.row.status == ''"></span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <span class="tableHandelcase" v-if="scope.row.openRow">
                    <span @click="addMoreDoc(scope.row)">添加</span>
                  </span>
                  <span v-if="!scope.row.openRow">
                    <!-- 已完成 -->
                    <span
                      v-if="scope.row.status == '1' || scope.row.status == '2'"
                      class="tableHandelcase"
                      @click="viewDocPdf(scope.row)"
                    >查看</span>
                    <!-- 未完成 暂存 -->
                    <span v-if="scope.row.status == '0'" class="tableHandelcase">
                      <span @click="viewDoc(scope.row)">编辑</span>
                      <span @click="delDocDataByDocId(scope.row)">清空</span>
                    </span>
                    <!-- 无状态 -->
                    <span
                      v-if="scope.row.status === ''"
                      class="tableHandelcase"
                      @click="viewDoc(scope.row)"
                    >添加</span>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </el-form>
    <!-- 悬浮按钮 -->
    <div class="float-btns btn-height63" style="height:auto">
      <el-button
        type="primary"
        @click="continueHandle"
        :disabled="!canGoNextLink"
        v-if="!this.$route.params.isComplete && !IsLawEnforcementSupervision"
      >
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
        <br />下一
        <br />环节
      </el-button>
      <el-button
        type="primary"
        @click="submitCaseDoc(1)"
        :disabled="canGoNextLink"
        v-if="!this.$route.params.isComplete && !IsLawEnforcementSupervision"
      >
        <i class="iconfont law-save"></i>
        <br />保存
      </el-button>
      <el-button
        type="success"
        @click="submitCaseDoc(0)"
        :disabled="canGoNextLink"
        v-if="!this.$route.params.isComplete && !IsLawEnforcementSupervision"
      >
        <i class="iconfont law-save"></i>
        <br />暂存
      </el-button>
      <el-button type="primary" @click="backBtn" v-if="this.$route.params.isComplete || IsLawEnforcementSupervision">
        <i class="iconfont law-back"></i>
        <br />返回
      </el-button>
    </div>
    <checkDocFinish ref="checkDocFinishRef"></checkDocFinish>
    <addDialog ref="addDialogRef" @getNewData="goAddPdf"></addDialog>

    <resetDocDia
      ref="resetDocDiaRef"
      @getDocListByCaseIdAndFormIdEmit="getDocListByCaseIdAndFormId"
    ></resetDocDia>
    <payDetail ref="payDetailRef"></payDetail>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
// import checkDocFinish from "./PenaltyExecutionFormDocFinish";
import checkDocFinish from "@/page/caseHandle/components/checkDocFinish2.vue";
import addDialog from "@/page/caseHandle/case/form/PenaltyExecutionFormDialog";
import resetDocDia from "@/page/caseHandle/components/resetDocDia";
import payDetail from "@/page/caseHandle/case/form/payDetail";
import { uploadEvApi, findFileByIdApi } from "@/api/upload";
import { findIsOrderApi, queryFlowBycaseIdApi } from "@/api/caseHandle";
import iLocalStroage from "@/common/js/localStroage";
import until from "@/common/js/util"
export default {
  components: {
    checkDocFinish,
    addDialog,
    resetDocDia,
    payDetail
  },
  data() {
    var validatePaid = (rule, value, callback) => {
      console.log("类型", typeof value);
      if (value && typeof value != "number") {
        callback(new Error("必须为数字!"));
      }
      if (
        value &&
        (value < 0 || value > Number(this.formData.tempPunishAmount))
      ) {
        callback(new Error("不得小于0或大于处罚金额!"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        caseNumber: "",
        punishType: "",
        caseName: "",
        punishTerm: "",
        punishDecision: "",
        tempPunishAmount: "",
        performWay: "",
        correct: "",
        performance: "",
        paidAmount: 0,
        toPayAmount: 0,
        stepPay: "",
        note: "",
        payEvidence: "", //缴费凭证id
        payAmount: 0,
        payee: "",
        paymentTime: ""
      },
      alreadyLoadPayEvidence: [], //已上传的缴费凭证
      //提交方式
      handleType: 0, //0  暂存     1 提交
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件id
        caseLinktypeId: this.BASIC_DATA_JX.punishExecute_JX_caseLinktypeId, //表单类型IDer
        //表单数据
        formData: "",
        status: ""
      },
      docTableDatas: [],
      docTableDatasShow: [],
      docTableDatasOther: [],
      options: [],
      rules: {
        caseNumber: [
          { required: true, message: "案号不能为空", trigger: "blur" }
        ],
        caseName: [
          { required: true, message: "案由不能为空", trigger: "blur" }
        ],
        punishType: [
          { required: true, message: "处罚类型不能为空", trigger: "blur" }
        ],
        punishTerm: [
          { required: true, message: "处罚期限不能为空", trigger: "blur" }
        ],
        punishDecision: [
          { required: true, message: "处罚决定不能为空", trigger: "blur" }
        ],
        tempPunishAmount: [
          { required: true, message: "处罚金额不能为空", trigger: "blur" }
        ],
        paidAmount: [{ validator: validatePaid, trigger: "blur" }],
        payAmount: [{ validator: validatePaid, trigger: "blur" }],
        toPayAmount: [{ validator: validatePaid, trigger: "blur" }],
        performWay: [
          { required: true, message: "执行方式必须选择", trigger: "blur" }
        ],
        note: [{ required: true, message: "备注必须填写", trigger: "blur" }]
      },
      isOnlinePay: true, //是否为电子缴纳
      needDealData: true,
      docTableDatasCopy: [],
      allAskDocList: [], //分期延期
      allApprovalDocList: [], //分期延期审批表
      unfinishFlag: [],
      isfinishFlag: true,
      finishDocCount: 0, //完成文书数
      allDocCount: 0,
      propertyFeatures: "",
      finishDelayApprovalDocCount: 0,
      allDelayApprovalDocCount: 0,
      unfinshDocArr : [], //未完成文书列表
      totalMoney:""
    };
  },
  computed: {
    ...mapGetters(["caseId",'IsLawEnforcementSupervision'])
  },
  mixins: [mixinGetCaseApiList],
  methods: {
    /**
     *
     * 根据已缴金额计算待缴金额
     */
    handleChangePaidAmount(val) {
      let tempPunishAmount = ''
      if(this.fieldDisabled(this.propertyFeatures['tempPunishAmount'])) {
        tempPunishAmount = Number(this.totalMoney)
      } else {
        tempPunishAmount = Number(this.formData.tempPunishAmount)
      }
      let num = tempPunishAmount - Number(this.formData.paidAmount);
      this.handleChangeToPayAmount(num);
      this.formData.toPayAmount = until.upMoney(num) + "(" + num + "元)"
      
    },

    /**
     *
     * 代缴金额为0时,执行情况为已完成
     */
    handleChangeToPayAmount(val) {
      if (!val) {
        this.formData.performance = '已完成';
      } else {
        // this.formData.performance = '未完成';
        if (this.formData.performance != '催告') {
          this.formData.performance = '未完成';
        }
      }
    },

    /**
     *
     * 当处罚金额不能输入时，转为大写加小写，金额数值赋值给 totalMoney
     */
    handleIsTempPunishAmount() {
      if(this.fieldDisabled(this.propertyFeatures['tempPunishAmount'])) {
        this.totalMoney = this.formData.tempPunishAmount
        this.formData.tempPunishAmount = until.upMoney(totalMoney) + "(" + totalMoney + "元)"
      }
    },
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
    submitCaseDoc(handleType) {
      console.log("分期", this.formData.stepPay);
      this.com_submitCaseForm(handleType, "penaltyExecutionForm", false);
    },
    

    //下一环节
    continueHandle() {
      console.log(this.docTableDatas)
      let caseData = {
        caseBasicinfoId: this.caseLinkDataForm.caseBasicinfoId,
        caseLinktypeId: this.caseLinkDataForm.caseLinktypeId
      };
      let canGotoNext = true; //是否进入下一环节  isRequired(0必填 1非必填)
      let approvalPass = true;  //文书审批都通过了
      for (let i = 0; i < this.docTableDatas.length; i++) {
        if(this.docTableDatas[i].openRow){  //可展开的多文书
          // let currentMoreDoc = this.docTableDatasCopy.find(item=>item.docId == this.docTableDatas[i].docId);
          // let currentMoreDocRequire= moreDoc.isRequired;
          let currentMoreDoc = this.docTableDatasCopy.filter(item=>item.docId == this.docTableDatas[i].docId);
          console.log('morcurrentMoreDoceDoc',currentMoreDoc);
          if(this.docTableDatas[i].isRequired === 0){
            for(let item of currentMoreDoc){
              if(Number(item.status) == 0){
                canGotoNext = false; break;
              }
            }
          }else{
            for(let item of currentMoreDoc){
              if(item.docProcessStatus == '审批中'){
                approvalPass = false; break;
              }
            }
          }
        }else{  //单文书
          if (this.docTableDatas[i].isRequired === 0 && (Number(this.docTableDatas[i].status) == 0)) {
            canGotoNext = false;
            break;
          }else if(this.docTableDatas[i].docProcessStatus == '审批中'){
            //有审批中的环节
            approvalPass = false;
            break;
          }
        }
      }
      if (canGotoNext && approvalPass) {
        console.log('下一环节')
        this.com_goToNextLinkTu(
          this.caseId,
          this.caseLinkDataForm.caseLinktypeId
        );
      } else if(!canGotoNext){
        this.getUnfinishDoc();
        this.$refs.checkDocFinishRef.showModal(this.unfinshDocArr);
      }else if(!approvalPass){
        this.$message('有文书正在审批中！')
      }










      // this.unfinishFlag = [];
      // let unfinishFlag = [];
      // if (this.isComplete() == false) {
      //   unfinishFlag.push("分期（延期）缴纳罚款通知书");
      // }
      // if (this.isComplete2() == false) {
      //   unfinishFlag.push("催告书");
      // }
      // let caseData = {
      //   caseBasicinfoId: this.caseLinkDataForm.caseBasicinfoId,
      //   caseLinktypeId: this.caseLinkDataForm.caseLinktypeId
      // };
      // if (this.isComplete() != false && this.isComplete2() != false) {
      //   this.com_goToNextLinkTu(
      //     this.caseId,
      //     this.caseLinkDataForm.caseLinktypeId
      //   );
      // } else {
      //   this.$refs.checkDocFinishRef.showModal(
      //     this.docTableDatas,
      //     caseData,
      //     unfinishFlag
      //   );
      // }
    },
    // 进入文书
    enterDoc(row) {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: row.url,
        params: {
          id: row.id,
          //案件ID
          caseBasicinfoId: this.caseBasicinfoId,
          docId: row.docId,
          url: this.$route.name
        }
      });
    },
    //查看文书
    viewDoc(row) {
      // if (row.name.indexOf("分期（延期）缴纳罚款") == false && row.note == "") {
      //   console.log("弹窗");
      //   this.$refs.addDialogRef.showModal(row, this.isSaveLink);
      // } else {
      //   this.com_viewDoc(row, this.caseLinkDataForm.caseLinktypeId);
      // }
      iLocalStroage.removeItem("currentDocDataId");
      this.com_viewDoc(row, this.caseLinkDataForm.caseLinktypeId);
    },
    //添加多份文书
    addMoreDoc(row) {
      iLocalStroage.removeItem("currentDocDataId");
      this.$refs.addDialogRef.showModal(
        row,
        this.caseLinkDataForm.caseLinktypeId,
        this.isSaveLink
      );
    },
    //清空文书
    delDocDataByDocId(data) {
      console.log("清空文书", data);
      this.$refs.resetDocDiaRef.showModal(data);
    },
    //通过案件id和表单类型Id查询已绑定文书
    getDocListByCaseIdAndFormId() {
      let data = {
        linkTypeId: this.caseLinkDataForm.caseLinktypeId //环节ID
      };
      this.com_getDocListByCaseIdAndFormId(data);
    },
    //预览pdf
    viewDocPdf(row) {
      let routerData = {
        hasApprovalBtn: false,
        docId: row.docId,
        approvalOver: false,
        hasBack: true,
        docDataId: row.docDataId,
        status: row.status //status状态 0 暂存 1保存未提交  2 保存并提交
      };
      console.log("routerData,routerData", routerData);
      this.$store.dispatch("deleteTabs", this.$route.name);
      if (row.docProcessStatus == "待审批") {
        this.$store.commit("setApprovalState", "approvalBefore");
        this.$store.commit(
          "setCaseLinktypeId",
          this.BASIC_DATA_JX.caseDoc_JX_caseLinktypeId
        );
        this.$store.commit("setDocDataId", row.docDataId);
        this.$store.commit("setDocId", row.docId);
      } else if (row.docProcessStatus == "审批中") {
        this.$store.commit("setApprovalState", "submitApproval");
      } else {
        this.$store.commit("setApprovalState", "");
      }
      this.$router.push({ name: "case_handle_myPDF", params: routerData });
    },
    //执行方式
    changePayWay(val) {
      if (val == "电子缴纳") {
        //电子缴纳
        this.formData.payAmount = 0;
        this.isOnlinePay = false;
      } else {
        this.isOnlinePay = true;
      }
    },
    getDataAfter() {
      if (this.formData.tempPunishAmount) {
        this.formData.paidAmount = this.formData.paidAmount
          ? this.formData.paidAmount
          : 0;
        this.formData.payAmount = this.formData.payAmount
          ? this.formData.payAmount
          : 0;
      }
      this.formData.performWay = this.formData.performWay
        ? this.formData.performWay
        : "线下缴费";
      this.isOnlinePay = this.formData.performWay == "线下缴费" ? true : false;
      //显示已上传的缴费凭证
      if (this.formData.payEvidence) {
        let payEvidenceArr = this.formData.payEvidence.split(",");
        payEvidenceArr.forEach(item => {
          this.findPaymentVoucher(item, false);
        });
      }
    },
    //上传缴费凭证
    uploadPaymentVoucher(param) {
      console.log(param);
      var fd = new FormData();
      fd.append("file", param.file);
      fd.append("caseId", this.caseId);
      fd.append("docId", this.caseLinkDataForm.caseLinktypeId);
      uploadEvApi(fd).then(
        res => {
          console.log(res);
          // this.formData.payEvidence = res.data;
          this.findPaymentVoucher(res.data, true);
          // this.formData.payEvidence.push(res.data);
        },
        error => {
          console.log(error);
        }
      );
    },
    //通过缴费凭证id 查询缴费凭证file
    findPaymentVoucher(id, isAdd) {
      findFileByIdApi(id).then(
        res => {
          console.log(res);
          this.alreadyLoadPayEvidence.push(res.data);
          if (isAdd) {
            if (this.formData.payEvidence) {
              let payEvidenceArr = this.formData.payEvidence.split(",");
              payEvidenceArr.push(id);
              this.formData.payEvidence = payEvidenceArr.join(",");
            } else {
              this.formData.payEvidence = id;
            }
          }
          console.log("this.formData.payEvidence", this.formData.payEvidence);
        },
        error => {
          console.log(error);
        }
      );
    },
    //显示已上传的缴纳凭证
    evidenceDetail(file) {
      console.log("123", file);
      this.$refs.payDetailRef.showModal(file);
    },
    //返回到流程图
    backBtn() {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.go(-1);
    },
    // 添加文书
    goAddPdf() {
      //提交pdf 显示pdf页
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.approvalOver = true;
      this.com_getFormDataByCaseIdAndFormId(
        this.caseLinkDataForm.caseBasicinfoId,
        this.caseLinkDataForm.caseLinktypeId,
        true
      );
    },
    getRowClass: function(row, index) {
      console.log("row数据", row, index);
      if (row.row.openRow) {
        return "";
      } else {
        return "myhide-expand";
      }
    },
    setMoreDocTableTitle() {
      this.docTableDatas = [];
      this.allAskDocList = [];
      this.allApprovalDocList = [];
      this.finishDocCount = 0;
      this.finishDelayApprovalDocCount = 0;
      //查找是否为必填
      let stageDelayApprovalFormRequire = this.docTableDatasCopy.find(item=>item.docId == this.BASIC_DATA_JX.stageDelayApprovalForm_JX_caseDocTypeId).isRequired;
      let payStageDoc_JXRequire = this.docTableDatasCopy.find(item=>item.docId == this.BASIC_DATA_JX.payStageDoc_JX_caseDocTypeId).isRequired;
      if (this.formData.stepPay) {
        //选分期延期
        this.docTableDatas.push({
          name: "分期（延期）缴纳罚款审批表",
          status: "询问",
          openRow: true,
          path: "case_handle_stageDelayApprovalForm",
          docId: this.BASIC_DATA_JX.stageDelayApprovalForm_JX_caseDocTypeId,
          note: "",
          isRequired:stageDelayApprovalFormRequire
        });
        this.docTableDatas.push({
          name: "分期（延期）缴纳罚款通知书",
          status: "询问",
          openRow: true,
          path: "case_handle_payStageDoc_JX",
          docId: this.BASIC_DATA_JX.payStageDoc_JX_caseDocTypeId,
          note: "",
          isRequired:payStageDoc_JXRequire
        });
        this.docTableDatasCopy.forEach(item => {
          if (item.docId == this.BASIC_DATA_JX.stageDelayApprovalForm_JX_caseDocTypeId) {
            if (item.note != "") {
              //防止把可展开的push进来
              this.allApprovalDocList.push(item);
            }
          } else if (item.docId == this.BASIC_DATA_JX.payStageDoc_JX_caseDocTypeId) {
            if (item.note != "") {
              this.allAskDocList.push(item);
            }
          } else {
            this.docTableDatas.push(item);
          }
        });
        this.allAskDocList.forEach(element => {
          if (element.docId == this.BASIC_DATA_JX.payStageDoc_JX_caseDocTypeId && (element.status == "1" || element.status == "2")) {
            this.finishDocCount += 1;
          }
        });
        this.allApprovalDocList.forEach(element => {
          if (element.docId == this.BASIC_DATA_JX.stageDelayApprovalForm_JX_caseDocTypeId && (element.status == "1" || element.status == "2")) {
            this.finishDelayApprovalDocCount += 1;
          }
        });
        this.allDocCount = this.allAskDocList.length;
        this.allDelayApprovalDocCount = this.allApprovalDocList.length;
      }else{
        this.docTableDatas = this.docTableDatasCopy.filter(item => {
          return (
            item.docId != this.BASIC_DATA_JX.payStageDoc_JX_caseDocTypeId &&
            item.docId !=
              this.BASIC_DATA_JX.stageDelayApprovalForm_JX_caseDocTypeId
          );
        });
      }

      console.log("this.docTableDatas", this.docTableDatas);
      console.log("this.allAskDocList", this.allAskDocList);
      console.log("this.allApprovalDocList", this.allApprovalDocList);
    },

    //通过案件ID和文书ID查询附件
    findFileList() {
      let data = {
        caseId: this.caseId,
        docId: this.caseLinkDataForm.caseLinktypeId
      };
      getFile(data).then(
        res => {
          console.log("附件列表", res);
          // this.fileListArr = res.data;
        },
        error => {
          console.log(error);
        }
      );
    },
    //通过案件id获取询问笔录被询问人及其与案件关系
    findIsOrder() {
      let data = {
        caseBasicInfoId: this.caseId
      };
      findIsOrderApi(data).then(
        res => {
          this.formData.correct = res.data;
          // this.peopleTypeList = res.data;
          // this.peopleTypeList.forEach(item => {
          //   item.relation = this.switchRelate(item.relation);
          //   item.all = item.name+ '-' +item.relation
          // });
          // this.peopleTypeList.push({name:'',relation:'none',all:'以上均不是'})
          // console.log('peopleTypeList',this.peopleTypeList);
          // //设置默认值
          // this.formData.peopleType = this.peopleTypeList[0].relation;
          // this.formData.peopleAndRelationType = this.peopleTypeList[0].all;
          // this.findAskNum(this.peopleTypeList[0].name);
        },
        err => {
          console.log(err);
        }
      );
    },
    // 分期延期缴纳
    changeStepPay() {
      this.setMoreDocTableTitle();
    },
    async initData() {
      //查询是哪个流程
      let currentFlow = await queryFlowBycaseIdApi(this.caseId);
      if (currentFlow.data.flowUrl == "commonGraphData_JX") {
        this.caseLinkDataForm.caseLinktypeId = this.BASIC_DATA_JX.punishExecute_JX_caseLinktypeId;
        this.options = [
          {
            lable: "未完成",
            value: "未完成"
          },
          {
            lable: "已完成",
            value: "已完成"
          }
        ];
      } else {
        this.caseLinkDataForm.caseLinktypeId = this.BASIC_DATA_SYS.penaltyExecution_caseLinktypeId;
        this.options = [
          {
            lable: "未完成",
            value: "未完成"
          },
          {
            lable: "已完成",
            value: "已完成"
          },
          {
            lable: "催告",
            value: "催告"
          }
        ];
      }
      //获取表单数据
      this.setFormData();
      //通过案件id和表单类型Id查询已绑定文书
      this.getDocListByCaseIdAndFormId();
    },
    //获取本环节必填但是未完成的文书
    getUnfinishDoc(){
      this.unfinshDocArr = [];
      //判断是否为多文书
      for(let item of this.docTableDatas){
        if(item.openRow){
          if(item.isRequired === 0){
            if(item.docId == this.BASIC_DATA_JX.payStageDoc_JX_caseDocTypeId){
              if(this.allAskDocList.length>0){
                for(let stageDoc of this.allAskDocList){
                  if(Number(stageDoc.status) == 0){
                    this.unfinshDocArr.push(item);
                    break;
                  }
                }
              }else{
                this.unfinshDocArr.push(item);
              }
            }
            if(item.docId == this.BASIC_DATA_JX.stageDelayApprovalForm_JX_caseDocTypeId){
              if(this.allApprovalDocList.length>0){
                for(let stageDoc of this.allApprovalDocList){
                  if(Number(stageDoc.status) == 0){
                    this.unfinshDocArr.push(item);
                    break;
                  }
                }
              }else{
                this.unfinshDocArr.push(item);
              }
            }
          }
        }else{
          if(item.isRequired === 0 && Number(item.status) == 0) this.unfinshDocArr.push(item);
        }
        console.log('this.unfinshDocArr',this.unfinshDocArr)
      }
    }
  },
  

  mounted() {
    // this.getCaseBasicInfo();
    this.findIsOrder();
  },
  created() {
    this.initData();
  },
  watch: {
    //代缴金额为0时,执行情况为已完成
    // "formData.paidAmount"(val) {
    //   if ((this.formData.toPayAmount = "NAN")) {
    //     this.formData.toPayAmount = "";
    //   }
    // },
    // "formData.payAmount"(val) {
    //   if ((this.formData.toPayAmount = "NAN")) {
    //     this.formData.toPayAmount = "";
    //   }
    // },
    // "formData.toPayAmount"(val) {
    //   this.formData.toPayAmount =
    //     Number(this.formData.tempPunishAmount) -
    //     Number(this.formData.paidAmount) -
    //     Number(this.formData.payAmount);
    //   if (this.formData.toPayAmount < 0) {
    //     this.$message({ message: "代缴金额不得小于0!", type: "error" });
    //   }
    //   if (!val) {
    //     this.formData.performance = "已完成";
    //   } else {
    //     // this.formData.performance = '未完成';
    //     if (this.formData.performance != "催告") {
    //       this.formData.performance = "未完成";
    //     }
    //   }
    // },
    'formData.stepPay'(val){
      this.setMoreDocTableTitle();
    },
    'formData.tempPunishAmount'(val){
      this.totalMoney = this.formData.tempPunishAmount;
      this.handleChangePaidAmount();
    }
  }
};
</script>

<style lang="scss" src="@/assets/css/documentForm.scss" scoped>
/* @import "@/assets/css/documentForm.scss"; */
</style>
<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"]{
    -moz-appearance: textfield;
  }
</style>