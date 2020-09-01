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
      <div class="content_box">
        <div class="content">
          <div class="content_title">收缴赔补偿款</div>
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
            </div>
            <div class="row">
              <div class="col">
                <el-form-item
                  label="赔（补）偿总金额"
                  :rules="fieldRules('payTotal',propertyFeatures['payTotal'])"
                >
                  <el-input
                    clearable
                    class="w-120"
                    v-model.number="formData.payTotal"
                    size="small"
                    placeholder="-"
                    :disabled="fieldDisabled(propertyFeatures['payTotal'])"
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
                    :rules="fieldRules('performWay',propertyFeatures['performWay'])"
                  >
                    <el-radio :label="'线下缴费'">线下缴费</el-radio>
                    <el-radio :label="'电子缴纳'">电子缴纳</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item
                  prop="paidAmount"
                  label="已缴金额"
                  :rules="fieldRules('paidAmount',propertyFeatures['paidAmount'])"
                >
                  <el-input
                    clearable
                    class="w-120"
                    v-model.number="formData.paidAmount"
                    size="small"
                    placeholder="-"
                    @change=" checkAmountAndPerformance"
                    :disabled="fieldDisabled(propertyFeatures['paidAmount'])"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item
                  prop="toPayAmount"
                  label="待缴金额"
                  :rules="fieldRules('toPayAmount',propertyFeatures['toPayAmount'])"
                >
                  <el-input
                    clearable
                    class="w-120"
                    size="small"
                    v-model.number="formData.toPayAmount"
                    placeholder="-"
                    disabled
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="performance" label="执行情况">
                  <el-select v-model="formData.performance" disabled>
                    <el-option label="未完成" value="未完成"></el-option>
                    <el-option label="已完成" value="已完成"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="checkbox">
                  <el-checkbox v-model="formData.stepPay">分期（延期）缴纳</el-checkbox>
                  <el-checkbox v-model="formData.civilAction">提起民事诉讼</el-checkbox>
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
                    type="textarea"
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
            <div class="row">
              <div class="col">
                
                <el-form-item prop="payEvidence" label="缴纳凭证">
                  <ul>
                    <li v-for="item in alreadyLoadPayEvidence" :key="item.id">{{item.fileName}}</li>
                  </ul>
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :http-request="saveFile"
                    :before-upload="uploadFileValidat"
                    :show-file-list="false"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-form>
    <!-- 悬浮按钮 -->
    <div class="float-btns btn-height63">
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
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import { uploadEvdence, findFileByIdApi } from "@/api/upload";
import iLocalStroage from "@/common/js/localStroage.js";
export default {
  data() {
    var validatePaid = (rule, value, callback) => {
      console.log("ruke", value);
      if (value && typeof value != "number") {
        callback(new Error("必须为数字!"));
      }
      if (value && (value < 0 || value > Number(this.formData.payTotal))) {
        callback(new Error("不得小于0或大于处罚金额!"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        caseNumber: "",
        caseName: "",
        payTotal: "",
        performWay: "",
        performance: "",
        paidAmount: 0,
        toPayAmount: 0,
        stepPay: false,
        civilAction: false,
        note: "",
        payEvidence: "" //缴费凭证id
      },
      form: {
        id: "",
        caseId: "",
        evName: "",
        evType: "照片",
        status: 0,//默认为有效证据
        fileId: "",
        remark: "",
        file: null,
        docId: "",
        category: "",
        userId: ""
      },
      alreadyLoadPayEvidence: [], //已上传的缴费凭证
      //提交方式
      handleType: 0, //0  暂存     1 提交
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件id
        caseLinktypeId: this.BASIC_DATA_SYS.takeOverCompensation_caseDoctypeId, //表单类型IDer
        //表单数据
        formData: "",
        status: ""
      },
      rules: {
        caseNumber: [
          { required: true, message: "案号不能为空", trigger: "blur" }
        ],
        caseName: [
          { required: true, message: "案由不能为空", trigger: "blur" }
        ],
        payTotal: [
          { required: true, message: "处罚金额不能为空", trigger: "blur" }
        ],
        paidAmount: [{ validator: validatePaid, trigger: "blur" }],
        toPayAmount: [{ validator: validatePaid, trigger: "blur" }],
        performWay: [
          { required: true, message: "执行方式必须选择", trigger: "blur" }
        ],
        note: [{ required: true, message: "备注必须填写", trigger: "blur" }]
      },
      needDealData: true,
      propertyFeatures: ""
    };
  },
  computed: {
    ...mapGetters(["caseId",'IsLawEnforcementSupervision'])
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
      console.log("分期", this.formData.stepPay);
      this.com_submitCaseForm(handleType, "penaltyExecutionForm", false);
    },
    //下一环节
    continueHandle() {
      let caseData = {
        caseBasicinfoId: this.caseLinkDataForm.caseBasicinfoId,
        caseLinktypeId: this.caseLinkDataForm.caseLinktypeId
      };
      this.com_goToNextLinkTu(
        this.caseId,
        this.caseLinkDataForm.caseLinktypeId
      );
    },
    getDataAfter() {
      let data = this.formData;
      if (this.formData.payTotal) {
        this.formData.paidAmount = this.formData.paidAmount
          ? this.formData.paidAmount
          : 0;
      }
      this.formData.toPayAmount =
        Number(data.payTotal) - Number(data.paidAmount);
      this.formData.performance =
        this.formData.toPayAmount == 0 ? "已完成" : "未完成";
      this.formData.performWay = this.formData.performWay
        ? this.formData.performWay
        : "线下缴费";
      //显示已上传的缴费凭证
      if (this.formData.payEvidence) {
        let payEvidenceArr = this.formData.payEvidence.split(",");
        payEvidenceArr.forEach(item => {
          this.findPaymentVoucher(item, false);
        });
      }
    },
    //上传前验证
    uploadFileValidat(file) {
      let isLt2M = file.size / 1024 / 1024 < 10; //这里做文件大小限制
      if (!isLt2M) {
        this.$message.warning("上传文件大小不能超过 10MB!");
        return false;
      }
      for (let i = 0; i < this.alreadyLoadPayEvidence.length; i++) {
        if (file.name == this.alreadyLoadPayEvidence[i].fileName) {
          this.$message.warning("不能上传同一个文件");
          return false;
        }
      }
      return true;
    },
    //上传缴费凭证
    saveFile(param) {
      console.log(param);
      (this.form.file = param.file),
      (this.form.caseId = this.caseId),
      (this.form.docId = "000"),
      (this.form.category = "证据"),
      (this.form.userId = iLocalStroage.gets("userInfo").id),
      (this.form.evName = param.file.name);
      (this.form.evType = param.file.type);
      this.insertEvi();      
    },
    //插入到证据目录
    insertEvi(id){
      var fd = new FormData();
      fd.append("file", this.form.file);
      fd.append("caseId", this.form.caseId);
      fd.append("objectId", this.form.docId);
      fd.append("category", this.form.category);
      fd.append("userId", this.form.userId);
      fd.append("evName", this.form.evName);
      fd.append("evType", this.form.evType);
      fd.append("status", this.form.status);
      fd.append("remark", this.form.remark);
      fd.append("fileId", this.form.fileId);
      // fd.append("id", this.form.id);
      let _this = this
      uploadEvdence(fd).then(res => {
        console.log("1111111",res);
        if (res.code == 200){
          this.findPaymentVoucher(res.data.id,true);
        }else{
          _this.$message.error('出现异常，添加失败！');
        }
      });
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
    //是否已完成缴费
    checkAmountAndPerformance(val) {
      let num = this.formData.payTotal - this.formData.paidAmount;
      this.formData.toPayAmount = num;
      if (num > 0) {
        this.formData.performance = "未完成";
      } else if (num < 0) {
        this.$message.warning("已缴金额不能大于总金额");
      } else {
        this.formData.performance = "已完成";
      }
    },
    // 分期延期缴纳
    changeStepPay() {
      console.log("分期延期缴纳");
      this.docTableDatas = [];
      if (this.formData.stepPay == true) {
        this.docTableDatas.push(this.docTableDatasSave[0]);
      }
    },
    //返回到流程图
    backBtn() {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.go(-1);
    },
  },

  mounted() {},
  created() {
    //获取表单数据
    this.setFormData();
  }
};
</script>

<style lang="scss" src="@/assets/css/documentForm.scss" scoped>
/* @import "@/assets/css/documentForm.scss"; */
</style>
