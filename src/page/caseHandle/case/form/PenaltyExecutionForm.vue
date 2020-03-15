<template>
  <div class="box">
    <el-form ref="caseLinkDataForm">
      <el-input ref="id" type="hidden"></el-input>
    </el-form>
    <el-form ref="penaltyExecutionForm" :model="formData" :rules="rules" label-width="105px">
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
                <el-form-item prop="caseNumber" label="案号">
                  <el-input ref="caseNumber" clearable class="w-120" v-model="formData.caseNumber" size="small" disabled></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="punishType" label="处罚类型">
                  <el-input ref="punishType" clearable class="w-120" v-model="formData.punishType" size="small" disabled></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="caseName" label="案由">
                  <el-input ref="caseName" clearable class="w-120" v-model="formData.caseName" size="small" disabled></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="punishTerm" label="处罚期限">
                  <!-- <el-input ref="punishTerm" clearable class="w-120" v-model="formData.punishTerm" size="small" placeholder="请输入"></el-input> -->
                  <el-date-picker class="w-120" v-model="formData.punishTerm" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="punishDecision" label="处罚决定">
                  <el-input ref="punishDecision" clearable class="w-120" v-model="formData.punishDecision" size="small" placeholder="请输入" disabled></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="处罚金额">
                  <el-input clearable class="w-120" v-model.number="formData.tempPunishAmount" size="small" placeholder="-" disabled></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="border_blue"></div>
          <div class="content_form bottom_form">
            <div class="row">
              <div class="col">
                <el-form-item label="执行方式">
                  <el-radio-group v-model="formData.performWay" @change="changePayWay">
                    <el-radio :label="1">线下缴费</el-radio>
                    <el-radio :label="2">电子缴纳</el-radio>
                  </el-radio-group>
                  <el-checkbox v-model="formData.correct" style="magin-left:20px"></el-checkbox> 责令改正
                  <!-- <el-input ref="caseName" clearable class="w-120" v-model="formData.caseName" size="small" placeholder="请输入"></el-input> -->
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="paidAmount" label="已缴金额">
                  <el-input clearable class="w-120" v-model.number="formData.paidAmount" size="small" placeholder="-"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="toPayAmount" label="待缴金额">
                  <el-input clearable class="w-120" size="small" v-model.number="formData.toPayAmount" placeholder="-" disabled></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="performance" label="执行情况">
                  <el-select v-model="formData.performance">
                    <el-option label="未完成" value="未完成"></el-option>
                    <el-option label="已完成" value="已完成"></el-option>
                    <el-option label="催告" value="催告"></el-option>
                  </el-select>
                  <!-- <el-input ref="performance" clearable class="w-120" v-model="formData.performance" size="small" placeholder="请输入"></el-input> -->
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="checkbox">
                  <el-checkbox v-model="formData.stepPay"></el-checkbox> 分期（延期）缴纳
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="note" label="备注">
                  <el-input ref="note" clearable class="w-120" v-model="formData.note" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="payEvidence" label="缴纳凭证">
                  <!-- <el-input
                    type="file"
                    ref="payEvidence"
                    clearable
                    class="w-120"
                    v-model="formData.payEvidence"
                    size="small"
                    placeholder="请输入"
                  ></el-input> -->
                  <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :http-request="uploadPaymentVoucher" :show-file-list="false">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                    <ul>
                      <li v-for="item in alreadyLoadPayEvidence" :key="item.id">{{item.fileName}}</li>
                    </ul>
                  </el-upload>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isOnlinePay">
              <div class="col">
                <el-form-item label="缴纳金额">
                  <el-input clearable class="w-120" v-model="formData.payAmount" size="small" placeholder="请输入"></el-input>
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
          <div class="table_form">
            <el-table :data="docTableDatas" stripe border style="width: 100%" max-height="250" :row-class-name="getRowClass">
              <!-- 折叠 -->
              <el-table-column type="expand" expand-change v-if="allAskDocList.length>0">
                <template>
                  <ul class="moreDocList">
                    <li v-for="(item,index) in allAskDocList" :key="index">
                      <div>{{item.note}}</div>
                      <div>
                        <span v-if="item.status == '1'">已完成</span>
                        <span v-if="item.status == '0'">未完成</span>
                      </div>
                      <div>
                        <!-- 已完成 -->
                        <span v-if="item.status == '1'" class="tableHandelcase" @click="viewDocPdf(item)">查看</span>

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
                  <span style="color:red">*</span>
                  {{scope.row.name}}
                  <span v-if="scope.row.name=='分期（延期）缴纳罚款通知书'">
                    （{{finishDocCount}}/{{allDocCount}}）
                  </span>

                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == '1'">已完成</span>
                  <span v-if="scope.row.status == '0'">未完成</span>
                  <span v-if="scope.row.status == ''"></span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <span class="tableHandelcase" v-if="scope.row.openRow">
                    <!-- <i class="iconfont law-add" @click="viewDoc(scope.row)"></i> -->
                    <span @click="viewDoc(scope.row)">添加</span>
                  </span>
                  <span v-if="!scope.row.openRow">
                    <!-- 已完成 -->
                    <span v-if="scope.row.status == '1'" class="tableHandelcase" @click="viewDocPdf(scope.row)">查看</span>
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
        <!-- 悬浮按钮 -->
        <div class="float-btns btn-height63">
          <el-button type="primary" @click="continueHandle" v-if="!this.$route.params.isComplete">
            <svg t="1577414377979" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1726" width="16" height="16">
              <path d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z" p-id="1727" fill="#FFFFFF" />
            </svg>
            <br />下一
            <br />环节
          </el-button>
          <el-button type="primary" @click="submitCaseDoc(1)" v-if="!this.$route.params.isComplete">
            <i class="iconfont law-save"></i>
            <br />保存
          </el-button>
          <el-button type="success" @click="submitCaseDoc(0)" v-if="!this.$route.params.isComplete">
            <i class="iconfont law-save"></i>
            <br />暂存
          </el-button>
          <el-button type="primary" @click="backBtn" v-if="this.$route.params.isComplete">
            <i class="iconfont law-back"></i>
            <br />返回
          </el-button>
        </div>
      </div>
    </el-form>
    <checkDocFinish ref="checkDocFinishRef"></checkDocFinish>
    <addDialog ref="addDialogRef" @getNewData="goAddPdf"></addDialog>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import checkDocFinish from "./PenaltyExecutionFormDocFinish";
import addDialog from './PenaltyExecutionFormDialog'
import {
  uploadEvApi,
  findFileByIdApi,
} from "@/api/upload";
import { findIsOrderApi } from "@/api/caseHandle";
export default {
  components: {
    checkDocFinish,
    addDialog
  },
  data() {
    var validatePaid = (rule, value, callback) => {
      if (value && typeof (value) != 'number') {
        callback(new Error('必须为数字!'));
      }
      if (value && (value < 0 || value > Number(this.formData.tempPunishAmount))) {
        callback(new Error('不得小于0或大于处罚金额!'));
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
        paidAmount: "",
        toPayAmount: "",
        stepPay: "",
        note: "",
        payEvidence: "", //缴费凭证id
        payee: "",
        paymentTime: "",
      },
      alreadyLoadPayEvidence: [], //已上传的缴费凭证
      //提交方式
      handleType: 0, //0  暂存     1 提交
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件id
        caseLinktypeId: "2c9029e16c753a19016c755fe1340001", //表单类型IDer
        //表单数据
        formData: "",
        status: ""
      },
      docTableDatas: [],
      rules: {
        paidAmount: [
          { validator: validatePaid, trigger: 'blur' }
        ],
        toPayAmount: [
          { validator: validatePaid, trigger: 'blur' }
        ]
      },
      isOnlinePay: false, //是否为电子缴纳
      needDealData: true,
      docTableDatasCopy: [],
      allAskDocList: [],  //分期延期
      unfinishFlag: '',
      isfinishFlag: true,
      finishDocCount: 0,//完成文书数
      allDocCount: 0,
    };
  },
  computed: {
    ...mapGetters(["caseId"]),
  },
  mixins: [mixinGetCaseApiList],
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
    submitCaseDoc(handleType) {
      console.log("分期", this.formData.stepPay)
      // console.log(this.formData)
      this.com_submitCaseForm(handleType, "penaltyExecutionForm", false);
    },
    // 判断文书是否完成
    isComplete() {
      this.unfinishFlag = '';
      console.log('分期延期:', this.formData.stepPay, '，催告：', this.formData.performance)
      if (this.formData.stepPay) {
        // 分期延期缴纳通知书必做
        console.log(this.allAskDocList)
        let flag = true
        this.allAskDocList.forEach(element => {
          if (element.name == '分期（延期）缴纳罚款通知书【2016】') {
            this.unfinishFlag = '分期（延期）缴纳罚款通知书';
            console.log('lement.status,element.status', element.status)
            if (element.status != 1) {
              this.unfinishFlag = '分期（延期）缴纳罚款通知书';
              console.log('执行')
              let caseData = {}
              this.$refs.checkDocFinishRef.showModal(this.docTableDatas, caseData, this.unfinishFlag);
              flag = false;
              return false;
            }
          }
          else
            return flag;
        });
        return flag;
      }
    },
    isComplete2() {
      this.unfinishFlag = '';
      console.log('分期延期:', this.formData.stepPay, '，催告：', this.formData.performance)
      if (this.formData.performance == '催告') {
        // 催告书必做
        let flag2 = true;
        console.log(this.docTableDatas)
        this.docTableDatas.forEach(element => {
          if (element.name == '催告书') {
            if (element.status != 1) {
              this.unfinishFlag = ' 催告书';
              console.log('this.unfinishFlag', this.unfinishFlag)
              let caseData = {}
              this.$refs.checkDocFinishRef.showModal(this.docTableDatas, caseData, this.unfinishFlag);

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
      console.log('this.unfinishFlag', this.unfinishFlag)
      console.log('分期文书', this.isComplete())
      console.log('催告书', this.isComplete2())
      console.log('this.unfinishFlag', this.unfinishFlag)
      let caseData = {
        caseBasicinfoId: this.caseLinkDataForm.caseBasicinfoId,
        caseLinktypeId: this.caseLinkDataForm.caseLinktypeId
      };
      if ((this.isComplete() != false) && (this.isComplete2() != false)) {

        this.com_goToNextLinkTu(this.caseId, this.caseLinkDataForm.caseLinktypeId);
      }
      else {
        // this.$message({ message: '请完成对应文书', type: 'error' });
        console.log(this.unfinishFlag)
        let unfinishFlag = this.unfinishFlag || ""
        this.$refs.checkDocFinishRef.showModal(this.docTableDatas, caseData, unfinishFlag);

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
      if (row.name.indexOf('分期（延期）缴纳罚款通知书') == false && row.note == '') {
        console.log("弹窗")
        this.$refs.addDialogRef.showModal(row, this.isSaveLink);
      }
      else {
        this.com_viewDoc(row);
      }

    },
    //删除
    delDocDataByDocId(data) {
      this.$store.dispatch("delDocDataByDocId", data).then(
        res => {
          console.log('删除', res)

          // this.docTableDatas = res.data;
          // console.log('文书列表', this.docTableDatas)
        },
        err => {
          console.log(err);
        }
      );
    },
    //通过案件id和表单类型Id查询已绑定文书
    getDocListByCaseIdAndFormId() {
      let data = {
        linkTypeId: "2c9029e16c753a19016c755fe1340001" //环节ID
      };
      this.com_getDocListByCaseIdAndFormId(data);
    },
    //预览pdf
    viewDocPdf(row) {
      let routerData = {
        hasApprovalBtn: false,
        docId: row.docId,
        approvalOver: false,
        hasBack: true
      };
      this.$store.dispatch("deleteTabs", this.$route.name);
      this.$router.push({ name: "myPDF", params: routerData });
    },
    //执行方式
    changePayWay(val) {
      console.log(val);
      if (val == 2) {
        //电子缴纳
        this.isOnlinePay = true;
      } else {
        this.isOnlinePay = false;
      }
    },
    getDataAfter() {
      if (this.formData.tempPunishAmount) {
        this.formData.paidAmount = this.formData.paidAmount ? this.formData.paidAmount : 0;
      }
      this.formData.performWay = this.formData.performWay ? this.formData.performWay : 1;
      this.isOnlinePay = this.formData.performWay == 1 ? false : true;
      //显示已上传的缴费凭证
      // this.alreadyLoadPayEvidence = this.formData.payEvidence  ? this.formData.payEvidence.split(',') : [];
      if (this.formData.payEvidence) {
        let payEvidenceArr = this.formData.payEvidence.split(',');
        payEvidenceArr.forEach(item => {
          this.findPaymentVoucher(item, false);
        })
      }

      //分期延期缴纳单选按钮默认不选，  选中后列表中展示分期延期缴纳罚款通知书 执行情况为催告时  列表中展示催告书
    },
    //上传缴费凭证
    uploadPaymentVoucher(param) {
      console.log(param);
      var fd = new FormData()
      fd.append("file", param.file);
      fd.append('caseId', this.caseId)
      fd.append('docId', '2c9029e16c753a19016c755fe1340001');
      uploadEvApi(fd).then(
        res => {
          console.log(res);
          // this.formData.payEvidence = res.data;
          this.findPaymentVoucher(res.data, true);
          // this.formData.payEvidence.push(res.data);
        },
        error => {
          console.log(error)
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
              let payEvidenceArr = this.formData.payEvidence.split(',');
              payEvidenceArr.push(id);
              this.formData.payEvidence = payEvidenceArr.join(',');
            } else {
              this.formData.payEvidence = id;
            }
          }
          console.log('this.formData.payEvidence', this.formData.payEvidence);
        },
        error => {
          console.log(error)
        }
      );
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
      console.log("row!!!!!!!!!!!!", row);
      if (row.row.openRow) {
        console.log("显示");
        return "";
      } else {
        return "myhide-expand";
      }
    },
    setMoreDocTableTitle() {
      console.log("djhafiufh执行方法")
      this.docTableDatas = [];
      this.allAskDocList = [];
      this.docTableDatas.push({ name: '分期（延期）缴纳罚款通知书', status: '询问', openRow: true, url: "payStage", docId: "2c9028ac6955b0c2016955bf8d7c0001", note: '' });

      this.docTableDatasCopy.forEach(item => {
        console.log('名字啊啊啊', item.name)
        if (item.name != '分期（延期）缴纳罚款通知书【2016】') {
          this.docTableDatas.push(item);
        } else {
          if (item.note != '') {
            this.allAskDocList.push(item);

          }
        }
      })
      this.allAskDocList.forEach(element => {
        if (element.name == '分期（延期）缴纳罚款通知书【2016】' && element.status=='1') {
          this.finishDocCount += 1;
        }
      });
      this.allDocCount = this.allAskDocList.length
      console.log('this.docTableDatas', this.docTableDatas)
      console.log('this.allAskDocList', this.allAskDocList)
    },
    //通过案件ID和文书ID查询附件
    findFileList() {
      let data = {
        caseId: this.caseId,
        docId: "2c9029e16c753a19016c755fe1340001"
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
    //通过案件id获取询问笔录被询问人及其与案件关系
    findIsOrder() {
      let data = {
        caseBasicInfoId: this.caseId
      }
      findIsOrderApi(data).then(res => {
        console.log('责令更正啊啊啊', res);
        this.formData.correct = res.data
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
      }, err => {
        console.log(err)
      })
    },
  },


  mounted() {
    // this.getCaseBasicInfo();
    this.findIsOrder()
  },
  created() {
    //获取表单数据
    this.setFormData();
    //通过案件id和表单类型Id查询已绑定文书
    this.getDocListByCaseIdAndFormId();
    // this.findFileList();
  },
  watch: {
    //代缴金额为0时,执行情况为已完成
    'formData.paidAmount'(val) {
      console.log(val);
      this.formData.toPayAmount = Number(this.formData.tempPunishAmount) - Number(this.formData.paidAmount);
    },
    'formData.toPayAmount'(val) {
      console.log(val);
      if (!val) {
        this.formData.performance = '已完成';
      } else {
        this.formData.performance = '未完成';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/documentForm.scss";
</style>
