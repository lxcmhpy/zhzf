<template>
  <div class="box PenaltyExecutionForm">
    <el-form ref="caseLinkDataForm">
      <el-input ref="id" type="hidden"></el-input>
    </el-form>
    <el-form ref="penaltyExecutionForm" :model="formData" :rules="rules" label-width="105px" :disabled="canGoNextLink">
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
                <el-form-item prop="caseNumber" label="案号" :rules="fieldRules('caseNumber',propertyFeatures['caseNumber'])">
                  <el-input ref="caseNumber" clearable class="w-120" v-model="formData.caseNumber" size="small" :disabled="fieldDisabled(propertyFeatures['caseNumber'])"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="punishType" label="处罚类型" :rules="fieldRules('punishType',propertyFeatures['punishType'])">
                  <el-input ref="punishType" clearable class="w-120" v-model="formData.punishType" size="small" placeholder="-" :disabled="fieldDisabled(propertyFeatures['punishType'])"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="caseName" label="案由" :rules="fieldRules('caseName',propertyFeatures['caseName'])">
                  <el-input ref="caseName" clearable class="w-120" v-model="formData.caseName" size="small" :disabled="fieldDisabled(propertyFeatures['caseName'])"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="punishTerm" label="处罚期限" :rules="fieldRules('punishTerm',propertyFeatures['punishTerm'])">
                  <!-- <el-input ref="punishTerm" clearable class="w-120" v-model="formData.punishTerm" size="small" placeholder="请输入"></el-input> -->
                  <el-date-picker class="w-120" value-format="yyyy-MM-dd HH:mm" v-model="formData.punishTerm" type="date" placeholder="选择日期" :disabled="fieldDisabled(propertyFeatures['punishTerm'])"></el-date-picker>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="punishDecision" label="处罚决定" :rules="fieldRules('punishDecision',propertyFeatures['punishDecision'])">
                  <el-input ref="punishDecision" clearable class="w-120" v-model="formData.punishDecision" size="small" placeholder="-" :disabled="fieldDisabled(propertyFeatures['punishDecision'])"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="处罚金额" :rules="fieldRules('tempPunishAmount',propertyFeatures['tempPunishAmount'])">
                  <el-input type="text" suffix="lalala" clearable class="w-120" v-model="formData.tempPunishAmount" size="small" placeholder="-" :disabled="fieldDisabled(propertyFeatures['tempPunishAmount'])"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="border_blue"></div>
          <div class="content_form bottom_form">
            <div class="row">
              <div class="col">
                <el-form-item label="执行方式">
                  <el-radio-group v-model="formData.performWay" @change="changePayWay" :rules="fieldRules('performWay',propertyFeatures['performWay'])">
                    <el-radio :label="'线下缴费'">线下缴费</el-radio>
                    <el-radio :label="'电子缴纳'">电子缴纳</el-radio>
                  </el-radio-group>
                  <!-- <el-checkbox v-model="formData.correct" style="magin-left:20px"></el-checkbox> 责令改正 -->
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
                  <!-- <el-input clearable class="w-120" size="small" v-model.number="formData.toPayAmount" placeholder="-" :disabled="fieldDisabled(propertyFeatures['toPayAmount'])"  @change="isFinish"></el-input> -->
                  <el-input clearable class="w-120" size="small" @input="handleChangeToPayAmount" v-model="formData.toPayAmount" placeholder="-" :disabled="true"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="performance" label="执行情况">
                  <el-select v-model="formData.performance"  clearable>
                    <el-option label="未完成" value="未完成"></el-option>
                    <el-option label="已完成" value="已完成"></el-option>
                    <el-option label="催告" value="催告"></el-option>
                  </el-select>
                  <!-- <el-input ref="performance" clearable class="w-120" v-model="formData.performance" size="small" placeholder="请输入"></el-input> -->
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="checkbox">
                  <el-checkbox v-model="formData.stepPay" @change='changeStepPay'></el-checkbox> 分期（延期）缴纳
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="chooseExecutAnnounceDoc">
                  <el-checkbox v-model="formData.chooseExecutAnnounceDoc" @change='changeChooseExecutAnnounceDoc'></el-checkbox> 执行公告
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="chooseExecutAnnounceDoc">
                  <el-checkbox v-model="formData.chooseRemindLetterDoc" @change='changeChooseRemindLetterDoc'></el-checkbox> 催告
                </el-form-item>
              </div>
            </div>
            <!-- <div class="row">
              <div class="col">
                <el-form-item prop="note" label="备注" :rules="fieldRules('note',propertyFeatures['note'])">
                  <el-input ref="note" clearable class="w-120" v-model="formData.note" size="small" placeholder="请输入" :disabled="fieldDisabled(propertyFeatures['note'])"></el-input>
                </el-form-item>
              </div>
            </div> -->
            <!-- <div class="row">
              <div class="col">
                <el-form-item prop="payEvidence" label="缴纳凭证">
                  <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :http-request="uploadPaymentVoucher" :show-file-list="false">
                    <el-button size="small" type="primary">点击上传</el-button>
                  
                    <ul>
                      <li v-for="item in alreadyLoadPayEvidence" :key="item.id" @click.stop="evidenceDetail(item)">{{item.fileName}}</li>
                    </ul>
                  </el-upload>
                </el-form-item>
              </div>
            </div> -->
            <div class="row" v-if="isOnlinePay">
              <div class="col">
                <el-form-item label="缴纳金额">
                  <el-input clearable class="w-120" v-model.number="formData.payAmount" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isOnlinePay">
              <div class="col">
                <el-form-item label="收款人">
                  <el-input clearable class="w-120" v-model="formData.payee" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isOnlinePay">
              <div class="col">
                <el-form-item label="缴费时间">
                  <el-date-picker v-model="formData.paymentTime" type="datetime" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content_box">
        <div class="content">
          <el-row :gutter="20">
            <el-col :span="16">
              <div class="second_title">
                执法文书
              </div>
            </el-col>
          </el-row>
          <div class="table_form">
            <el-table :data="docTableDatas" stripe border style="width: 100%" max-height="250" :row-class-name="getRowClass">
              <!-- 折叠 -->
              <el-table-column type="expand" expand-change>
                <template slot-scope="props">
                  <ul class="moreDocList">
                    <li v-for="(item,index) in props.row.path =='case_handle_payStage' ? allAskDocList :allCGDocList " :key="index">
                      <div>{{item.note}}</div>
                      <div>
                        <span v-if="item.status == '1' || item.status == '2'">已完成</span>
                        <span v-if="item.status == '0'">未完成</span>
                      </div>
                      <div>
                        <!-- 已完成 -->
                        <span v-if="item.status == '1' || item.status == '2'" class="tableHandelcase" @click="viewDocPdf(item)">查看</span>

                        <span v-if="item.status == '0'" class="tableHandelcase">
                          <!-- 未完成 -->
                          <span @click="viewDoc(item)">编辑</span>
                          <span @click="delDocDataByDocId(item)">清空</span>
                        </span>
                        <!-- 无状态 -->
                        <span v-if="item.status === ''" class="tableHandelcase" @click="viewDoc(item)">添加</span>
                      </div>
                    </li>
                  </ul>
                </template>
              </el-table-column>

              <el-table-column type="index" label="序号" align="center"></el-table-column>
              <el-table-column prop="name" label="材料名称" align="center">
                <template slot-scope="scope">
                  <!-- <span style="color:red">*</span> -->
                  <span style="color:red" v-if="scope.row.isRequired == 0">*</span>
                  {{scope.row.name}}
                  <span v-if="scope.row.name=='分期（延期）缴纳罚款通知书'">
                    （{{finishDocCount}}/{{allDocCount}}）
                  </span>
                  <span
                    v-if="scope.row.path== 'case_handle_remindLetterDoc_SC'"
                  >（{{finishCGDocCount}}/{{allCGDocCount}}）</span>

                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == '1' || scope.row.status == '2'">已完成</span>
                  <span v-if="scope.row.status == '0'">未完成</span>
                  <span v-if="scope.row.status == ''"></span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <span class="tableHandelcase" v-if="scope.row.openRow">
                    <!-- <i class="iconfont law-add" @click="viewDoc(scope.row)"></i> -->
                    <span @click="addMoreDoc(scope.row)">添加</span>
                  </span>
                  <span v-if="!scope.row.openRow">
                    <!-- 已完成 -->
                    <span v-if="scope.row.status == '1' || scope.row.status == '2'" class="tableHandelcase" @click="viewDocPdf(scope.row)">查看</span>
                    <!-- 未完成 暂存 -->
                    <span v-if="scope.row.status == '0'" class="tableHandelcase">
                      <span @click="viewDoc(scope.row)">编辑</span>
                      <span @click="delDocDataByDocId(scope.row)">清空</span>
                    </span>
                    <!-- 无状态 -->
                    <span v-if="scope.row.status === ''" class="tableHandelcase" @click="viewDoc(scope.row)">添加</span>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

      </div>
      <div class="content_box">
        <div class="content">
          <el-row :gutter="20">
            <el-col :span="16">
              <div class="second_title">
                相关材料上传
              </div>
            </el-col>
            <el-col :span="8">
              <div class="second_title_btns">
                <el-button type="primary" size="small" @click="showUploadEvi">上传附件</el-button>
              </div>
            </el-col>
          </el-row>
          <div class="table_form">
            <el-table :data="evidenceTableDatas" stripe border style="width: 100%" height="100%"
                      @cell-click="handleEviNameChange">
              <el-table-column type="index" label="序号" align="center">
              </el-table-column>
              <el-table-column prop="evName" label="材料名称" align="center">
              </el-table-column>
              <el-table-column prop="createTime" label="时间" align="center">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <i type="primary" class="el-icon-view cell-icon" @click="showEvidence(scope)"></i>
                </template>
              </el-table-column>
            </el-table>
            <div class="paginationBox">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                background
                :page-sizes="[10, 20, 30, 40]"
                layout="prev, pager, next,sizes,jumper"
                :total="total"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </el-form>
     <!-- 悬浮按钮 -->
        <div class="float-btns btn-height63">
          <el-button type="primary" @click="continueHandle" :disabled="!canGoNextLink" v-if="!this.$route.params.isComplete && !IsLawEnforcementSupervision">
            <svg t="1577414377979" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1726" width="16" height="16">
              <path d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z" p-id="1727" fill="#FFFFFF" />
            </svg>
            <br />下一
            <br />环节
          </el-button>
          <el-button type="primary" @click="submitCaseDoc(1)" :disabled="canGoNextLink" v-if="!this.$route.params.isComplete && !IsLawEnforcementSupervision">
            <i class="iconfont law-save"></i>
            <br />保存
          </el-button>
          <el-button type="success" @click="submitCaseDoc(0)" :disabled="canGoNextLink" v-if="!this.$route.params.isComplete && !IsLawEnforcementSupervision">
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
    <resetDocDia ref="resetDocDiaRef" @getDocListByCaseIdAndFormIdEmit="getDocListByCaseIdAndFormId"></resetDocDia>
    <editEvidenceName ref="editEvidenceNameRef" @findEvidenceEmit="findEvidence"></editEvidenceName>
    <showEvidenDia ref="showEvidenDiaRef"></showEvidenDia>
    <partyRightsEvidence ref="partyRightsEvidenceRef" @findEvidenceEmit="findEvidence"></partyRightsEvidence>

    <!-- <payDetail ref="payDetailRef"></payDetail> -->
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
// import checkDocFinish from "./PenaltyExecutionFormDocFinish";
import checkDocFinish from "@/page/caseHandle/components/checkDocFinish2.vue";
import addDialog from '@/page/caseHandle/case/form/PenaltyExecutionFormDialog';
import resetDocDia from '@/page/caseHandle/components/resetDocDia';
// import payDetail from "./payDetail";
import iLocalStroage from "@/common/js/localStroage";
import until from "@/common/js/util"
import {
  uploadEvApi,
  findFileByIdApi,
} from "@/api/upload";
import { findByCondition} from "@/api/caseHandle";
import editEvidenceName from '@/page/caseHandle/components/editEvidenceName'
import showEvidenDia from '@/page/caseHandle/components/showEvidenDia'
import partyRightsEvidence from '@/page/caseHandle/components/partyRightsEvidence'

export default {
  components: {
    checkDocFinish,
    addDialog,
    resetDocDia,
    editEvidenceName,
    showEvidenDia,
    partyRightsEvidence
    // payDetail
  },
  data() {
    var validatePaid = (rule, value, callback) => {
      if (value && typeof (value) != 'number') {
        console.log(value);
        console.log(typeof(value))
        callback(new Error('必须为数字!'));
      }
      if (value && (value < 0 || value > Number(this.formData.tempPunishAmount))) {
        callback(new Error('不得小于0或大于处罚金额!'));
      } else {
        callback();
      }
    };
    return {
      totalMoney: "",
      formData: {
        caseNumber: "",
        punishType: "",
        caseName: "",
        punishTerm: "",
        punishDecision: "",
        tempPunishAmount: "",
        performWay: "",
        // correct: "",
        performance: "",
        paidAmount: 0,
        toPayAmount: 0,
        stepPay: "",
        // note: "",
        payEvidence: "", //缴费凭证id
        payee: "",
        paymentTime: "",
        chooseExecutAnnounceDoc:false,
        chooseExecutAnnounceDoc:false,
      },
      alreadyLoadPayEvidence: [], //已上传的缴费凭证
      //提交方式
      handleType: 0, //0  暂存     1 提交
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件id
        caseLinktypeId: this.BASIC_DATA_SC.penaltyExecution_SC_caseLinktypeId, //表单类型IDer
        //表单数据
        formData: "",
        status: ""
      },
      docTableDatas: [],
      docTableDatasSave: [],
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
        paidAmount: [
          { validator: validatePaid, trigger: 'blur' }
        ],
        toPayAmount: [
          { validator: validatePaid, trigger: 'blur' }
        ],
        performWay: [
          { required: true, message: "执行方式必须选择", trigger: "blur" }
        ],
        // note: [
        //   { required: true, message: "备注必须填写", trigger: "blur" }
        // ],
      },
      isOnlinePay: false, //是否为电子缴纳
      needDealData: true,
      docTableDatasCopy: [],
      allAskDocList: [],  //分期延期
      unfinishFlag: [],
      isfinishFlag: true,
      finishDocCount: 0,//完成文书数
      allDocCount: 0,
      propertyFeatures:'',
      unfinshDocArr : [],
      finishDocCount:0,
      allDocCount:0,
      allCGDocList:[],
      finishCGDocCount:0,
      allCGDocCount:0,
      evidenceTableDatas: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总数
    };
  },
  computed: {
    ...mapGetters(["caseId",'IsLawEnforcementSupervision']),
  },
  mixins: [mixinGetCaseApiList],
  methods: {
    //人民币大写转数字
		 RMBToNumber(chnStr){
       let chnNumChar = {
			零:0,
			壹:1,
			贰:2,
			叁:3,
			肆:4,
			伍:5,
			陆:6,
			柒:7,
			捌:8,
			玖:9
		};
       	let  chnNameValue = {
			拾:{value:10, secUnit:false},
			佰:{value:100, secUnit:false},
			仟:{value:1000, secUnit:false},
			万:{value:10000, secUnit:true},
			亿:{value:100000000, secUnit:true}
		}
			let rtn = 0;
			let section = 0;
			let number = 0;
			let secUnit = false;
			let str = chnStr.split('');

			for(let i = 0; i < str.length; i++){
        let num = chnNumChar[str[i]];
				if(typeof num !== 'undefined'){
					number = num;
					if(i === str.length - 1){
						section += number;
					}
				}else{
					let unit = chnNameValue[str[i]].value;
					secUnit = chnNameValue[str[i]].secUnit;
					if(secUnit){
						section = (section + number) * unit;
						rtn += section;
						section = 0;
					}else{
						section += (number * unit);
					}
					number = 0;
				}
			}
			return rtn + section;
		},
    /**
     *
     * 根据已缴金额计算待缴金额
     */
    handleChangePaidAmount(val) {
      let tempPunishAmount = ''
      console.log("this.totalMoney",this.totalMoney);
      console.log("this.formData.tempPunishAmount",this.formData.tempPunishAmount);
      if( Number(this.totalMoney) =="NAN"){
        if(typeof this.totalMoney !== 'number' && typeof this.formData.tempPunishAmount !=='number'){
        this.totalMoney=this.RMBToNumber(this.totalMoney.replace("元",""));
        this.formData.tempPunishAmount=this.RMBToNumber(this.formData.tempPunishAmount.replace("元",""));
        }
      }
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
        this.formData.tempPunishAmount = until.upMoney(this.totalMoney) + "(" + this.totalMoney + "元)"
      }
    },

    //加载表单信息
    setFormData() {
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(
        this.caseLinkDataForm.caseBasicinfoId,
        this.caseLinkDataForm.caseLinktypeId,
        false
      )
    },

    //保存表单数据
    submitCaseDoc(handleType) {
      console.log("分期", this.formData.stepPay)
      // console.log(this.formData)
      this.com_submitCaseForm(handleType, "penaltyExecutionForm", false);
    },
    // 判断文书是否完成
    isComplete() {
      // this.unfinishFlag = [];
      // console.log('分期延期:', this.formData.stepPay, '，催告：', this.formData.performance)
      if (this.formData.stepPay) {
        // 分期延期缴纳通知书必做
        // console.log(this.allAskDocList)
        let flag = true
        if (this.allAskDocList.length == 0) {
          // this.unfinishFlag = ['分期（延期）缴纳罚款通知书'];
          flag = false;
          return false;
        }
        else {
          this.allAskDocList.forEach(element => {
            if (element.name == '分期（延期）缴纳罚款通知书【2016】') {
              console.log('element.name', element.status)
              // this.unfinishFlag = ['分期（延期）缴纳罚款通知书'];
              // console.log('lement.status,element.status', element.status)
              if (element.status == 0) {
                // this.unfinishFlag = ['分期（延期）缴纳罚款通知书'];
                // console.log('执行')
                let caseData = {}
                // this.$refs.checkDocFinishRef.showModal(this.docTableDatas, caseData, this.unfinishFlag);
                this.$refs.checkDocFinishRef.showModal(this.unfinishFlag);
                flag = false;
                return false;
              }
            }
            else
              return flag;
          });
        }

        return flag;
      }
    },
    isComplete2() {
      this.unfinishFlag = [];
      console.log('分期延期:', this.formData.stepPay, '，催告：', this.formData.performance)
      if (this.formData.performance == '催告') {

        // 催告书必做
        let flag2 = true;
        console.log(this.docTableDatas)
        this.docTableDatas.forEach(element => {
          if (element.name == '催告书') {
            if (element.status == 0) {
              // this.unfinishFlag = ['催告书'];
              this.unfinishFlag.push(['催告书'])
              // console.log('this.unfinishFlag', this.unfinishFlag)
              // let caseData = {}
              // this.$refs.checkDocFinishRef.showModal(this.docTableDatas, caseData, this.unfinishFlag);
              this.$refs.checkDocFinishRef.showModal(this.unfinishFlag);

              flag2 = false;
              return flag2;
            }
            else
              return flag2;
          }
          else
            return flag2;
        });
        return flag2;
      }
    },
    //下一环节
    continueHandle() {
      console.log(this.docTableDatas)
      let caseData = {
        caseBasicinfoId: this.caseLinkDataForm.caseBasicinfoId,
        caseLinktypeId: this.caseLinkDataForm.caseLinktypeId
      };
      let canGotoNext = true; //是否进入下一环节  isRequired(0必填 1非必填)
      for (let i = 0; i < this.docTableDatas.length; i++) {
        if(this.docTableDatas[i].openRow){  //可展开的多文书
           let currentMoreDoc = this.docTableDatasCopy.filter(item=>item.docId == this.docTableDatas[i].docId);
            console.log('morcurrentMoreDoceDoc',currentMoreDoc);
            if(this.docTableDatas[i].isRequired === 0){
              for(let item of currentMoreDoc){
                if(Number(item.status) == 0){
                  canGotoNext = false; break;
                }
              }
            }

        }else{
          if (this.docTableDatas[i].isRequired === 0 && (Number(this.docTableDatas[i].status) == 0)) {
            canGotoNext = false;
            break;
          }
        }

      }
      if (canGotoNext) {
        console.log('下一环节')
        this.com_goToNextLinkTu(
          this.caseId,
          this.caseLinkDataForm.caseLinktypeId
        );
      } else if(!canGotoNext){
        this.getUnfinishDoc();
        this.$refs.checkDocFinishRef.showModal(this.unfinshDocArr);
      }
    },

    //获取本环节必填但是未完成的文书
    getUnfinishDoc(){
      this.unfinshDocArr = [];
      //判断是否为多文书
      for(let item of this.docTableDatas){
        if(item.openRow){
          // if(item.isRequired === 0){
            //分期（延期）缴纳罚款通知书
            if(item.docId == '2c9028ac6955b0c2016955bf8d7c0001'){
              if(this.allAskDocList.length > 0){
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
          // }
        }else{
          if(item.isRequired === 0 && Number(item.status) == 0) this.unfinshDocArr.push(item);
        }
        console.log('this.unfinshDocArr',this.unfinshDocArr)
      }
    },
    // 进入文书
    enterDoc(row) {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      // console.log("row", row);
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
      row.url=this.$route.name;
      row.caseBasicinfoId= this.caseBasicinfoId
      this.$store.commit("setCurrentFileData", row);//保存文书信息
      iLocalStroage.removeItem("currentDocDataId");
      this.com_viewDoc(row,this.caseLinkDataForm.caseLinktypeId);

    },
    addMoreDoc(row) {
       console.log("添加",row);
        iLocalStroage.removeItem("currentDocDataId");
        if(row.path=='case_handle_remindLetterDoc_SC'){
          // this.com_viewDoc(row,this.caseLinkDataForm.caseLinktypeId);
          let addMoreData ={
            handelType:'isAddMore',
            addNum: ++this.allCGDocCount //第几份催告书
          }
          this.com_viewDoc(row,this.caseLinkDataForm.caseLinktypeId,addMoreData); 
        }else{
          // this.$refs.chooseHandleTypeDiaRef.showModal(row, this.caseLinkDataForm.caseLinktypeId,this.isSaveLink);
          this.$refs.addDialogRef.showModal(
            row,
            this.caseLinkDataForm.caseLinktypeId,
            this.isSaveLink
          );
        }
    },
    //清空文书
    delDocDataByDocId(data) {
      console.log("清空文书", data);
      this.$refs.resetDocDiaRef.showModal(data);
    },
    //通过案件id和表单类型Id查询已绑定文书
    getDocListByCaseIdAndFormId() {
      let data = {
        linkTypeId: this.BASIC_DATA_SC.penaltyExecution_SC_caseLinktypeId //环节ID
      };
      this.com_getDocListByCaseIdAndFormId(data);
    },
    //预览pdf
    viewDocPdf(row) {
      row.url=this.$route.name;
      row.caseBasicinfoId= this.caseBasicinfoId
      this.$store.commit("setCurrentFileData", row);//保存文书信息
      let routerData = {
        hasApprovalBtn: false,
        docId: row.docId,
        approvalOver: false,
        hasBack: true,
        docDataId: row.docDataId,
        status:row.status,  //status状态 0 暂存 1保存未提交  2 保存并提交
      };
      console.log('routerData,routerData', routerData)
      this.$store.dispatch("deleteTabs", this.$route.name);
      this.$router.push({ name: "case_handle_myPDF", params: routerData });
    },
    //执行方式
    changePayWay(val) {
      console.log(val);
      if (val == '电子缴纳') {
        //电子缴纳
        this.isOnlinePay = true;
      } else {
        this.isOnlinePay = false;
      }
    },
    getDataAfter() {
      console.log('this.formData.tempPunishAmount', this.formData.tempPunishAmount)
      if (this.formData.tempPunishAmount) {
        this.formData.paidAmount = this.formData.paidAmount ? this.formData.paidAmount : 0; 
      }
      this.formData.performWay = this.formData.performWay ? this.formData.performWay : "线下缴费";
      this.isOnlinePay = this.formData.performWay == "线下缴费" ? false : true;
      //显示已上传的缴费凭证
      // this.alreadyLoadPayEvidence = this.formData.payEvidence  ? this.formData.payEvidence.split(',') : [];
      if (this.formData.payEvidence) {
        let payEvidenceArr = this.formData.payEvidence.split(',');
        payEvidenceArr.forEach(item => {
          this.findPaymentVoucher(item, false);
        })
      }
      this.changeStepPay()
      // this.changePerformance()
      //分期延期缴纳单选按钮默认不选，  选中后列表中展示分期延期缴纳罚款通知书 执行情况为催告时  列表中展示催告书
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
      // this.setMoreDocTableTitle()
    },
    getRowClass: function (row, index) {
      if (row.row.openRow) {
        return "";
      } else {
        return "myhide-expand";
      }
    },
    setMoreDocTableTitle() {
      this.docTableDatas = [];
      this.allAskDocList = [];
      this.finishDocCount = 0;
      //查找是否为必填
      let payStageDoc_Require = this.docTableDatasCopy.find(item=>item.path == "case_handle_payStage").isRequired;
      if (this.formData.stepPay) {
        let index1  = this.docTableDatas.findIndex(item=>item.path == "case_handle_payStage");
        if(index1 ==-1){
          this.docTableDatas.push({
            name: "分期（延期）缴纳罚款通知书",
            status: "询问",
            openRow: true,
            path: "case_handle_payStage",
            docId: "2c9028ac6955b0c2016955bf8d7c0001",
            note: "",
            isRequired:payStageDoc_Require
          });
          this.docTableDatasCopy.forEach(item => {
            if (item.docId == '2c9028ac6955b0c2016955bf8d7c0001') {
              if (item.note != "") {
                //防止把可展开的push进来
                this.allAskDocList.push(item);
              }
            } 
          });
          this.allAskDocList.forEach(element => {
            if (element.docId == '2c9028ac6955b0c2016955bf8d7c0001' && (element.status == "1" || element.status == "2")) {
              this.finishDocCount += 1;
            }
          });

          this.allDocCount = this.allAskDocList.length;
        }
        
        
        
      }else{
        let index1  = this.docTableDatas.findIndex(item=>item.path == "case_handle_payStage");
        if(index1 !=-1) this.docTableDatas.splice(index1,1)
      }
     

      this.allCGDocList = [];
      this.finishCGDocCount = 0;
      let CGDoc_Require = this.docTableDatasCopy.find(item=>item.path == "case_handle_remindLetterDoc_SC").isRequired;
      if (this.formData.chooseRemindLetterDoc) {
        let index1  = this.docTableDatas.findIndex(item=>item.path == "case_handle_remindLetterDoc_SC");
        if(index1 ==-1){
          this.docTableDatas.push({
            name: "催告书",
            status: "询问",
            openRow: true,
            path: "case_handle_remindLetterDoc_SC",
            docId: "b994df8df251cf62ca48166e233d45c9",
            note: "",
            isRequired:CGDoc_Require
          });
          this.docTableDatasCopy.forEach(item => {
            if (item.path == 'case_handle_remindLetterDoc_SC') {
              if (item.note != "") {
                //防止把可展开的push进来
                this.allCGDocList.push(item);
              }
            } 
          });
          this.allCGDocList.forEach(element => {
            if (element.status == "1" || element.status == "2") {
              this.finishCGDocCount += 1;
            }
          });
          this.allCGDocCount = this.allCGDocList.length;
        }
      }else{
        let index1  = this.docTableDatas.findIndex(item=>item.path == "case_handle_remindLetterDoc_SC");
        if(index1 !=-1) this.docTableDatas.splice(index1,1)
      }

      if (this.formData.chooseExecutAnnounceDoc) {
        let index1  = this.docTableDatas.findIndex(item=>item.path == "case_handle_hearingRecordePdf");
         if(index1 ==-1)  this.docTableDatas.push(this.docTableDatasCopy.find(item=> item.path == "case_handle_executAnnounce"))
      }else{
        let index1  = this.docTableDatas.findIndex(item=>item.path == "case_handle_hearingRecordePdf");
        if(index1 !=-1) this.docTableDatas.splice(index1,1)
      }


        

      console.log("this.docTableDatas", this.docTableDatas);
      console.log("this.allAskDocList", this.allAskDocList);
    },
    //通过案件ID和文书ID查询附件
    findFileList() {
      let data = {
        caseId: this.caseId,
        docId: this.BASIC_DATA_SYS.penaltyExecution_caseLinktypeId
      }
      console.log(data);
      getFile(data).then(
        res => {
          console.log("附件列表", res);
          // this.fileListArr = res.data;

        },
        error => {
          console.log(error);
        }
      )
    },
    
    // 分期延期缴纳
    changeStepPay(val) {
      this.setMoreDocTableTitle();
    },
    changeChooseExecutAnnounceDoc(val){
      this.setMoreDocTableTitle();
    },
    changeChooseRemindLetterDoc(val){
      this.setMoreDocTableTitle();
    },
    //查询证据材料列表
      findEvidence() {
        let data = {
          objectId: this.BASIC_DATA_SC.penaltyExecution_SC_caseLinktypeId,
          caseId: this.caseId,
        };
        let _this = this
        findByCondition(data).then(
          res => {
//              console.log('证据',res);
            _this.evidenceTableDatas = res.data.records;
            _this.currentPage = res.data.current;
            _this.total = res.data.total;
          },
          error => {
            console.log(error);
          }
        );
      },
      //更改证据每页显示的条数
      handleSizeChange(val) {
//      console.log("每页显示的条数", val);
        this.pageSize = val;
        this.findEvidence();
      },
      //更换证据页码
      handleCurrentChange(val) {
//      console.log("当前页", val);
        this.currentPage = val;
        this.findEvidence();
      },
      //修改证据名称
      handleEviNameChange(row, column) {
//      console.log(row,column);
        if (column.property == "evName") {
          this.$refs.editEvidenceNameRef.showModal(row);
        }
      },
      showEvidence(data) {
        this.$refs.showEvidenDiaRef.showModal(data.row);
      },
      //上传证据弹窗
      showUploadEvi() {
        this.$refs.partyRightsEvidenceRef.showModal(this.BASIC_DATA_SC.penaltyExecution_SC_caseLinktypeId);
      },
  },


  mounted() {
    this.handleIsTempPunishAmount()
  },
  created() {
    //获取表单数据
    this.setFormData();
    //通过案件id和表单类型Id查询已绑定文书
    this.getDocListByCaseIdAndFormId();
    // this.findFileList();
    // 查询证据材料列表
      this.findEvidence();
  },
  watch: {
    'formData.tempPunishAmount'(val){
      this.totalMoney = this.formData.tempPunishAmount;
      this.handleChangePaidAmount(Number(this.formData.paidAmount));
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
<style scoped>
.btn-height63 {
  bottom: 160px;
}
</style>
