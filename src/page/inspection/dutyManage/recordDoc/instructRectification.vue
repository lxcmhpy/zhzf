<template>
  <div class="print_box instruct-notice">
    <div class="print_info" id="instructNoticePanel">
      <el-form
        :rules="rules"
        ref="docFormRef"
        :inline-message="true"
        :inline="true"
        :model="formData"
      >
        <div class="doc_topic">路政巡查监督责令整改通知书</div>
        <div
          class="doc_number"
        >
        <el-form-item prop="orgName"  style="width: 100px;">
          <el-input v-model="formData.orgName"></el-input>
        </el-form-item>
        函告[
        <el-form-item prop="yearNo"  style="width: 50px;">
          <el-input v-model="formData.yearNo"></el-input>
        </el-form-item>
        ]&nbsp;&nbsp;第
        <el-form-item prop="numberNo"  style="width: 150px;">
          <el-input v-model="formData.numberNo" placeholder="XXXX"></el-input>
        </el-form-item>
        号</div>
        <span class="top-split-line"></span>
        <p class="partyBox">
          <span class="width_file">
            <el-form-item prop="companyName">
              <el-input v-model="formData.companyName"></el-input>
            </el-form-item>：
          </span>
        </p>
        <p class="t-i-28">
          <span class="width_file">
            <el-form-item prop="orgName">
              <el-input v-model="formData.orgName"></el-input>
            </el-form-item>
          </span>
          于
          <el-form-item prop="inspectionTime">
            <el-date-picker
              v-model="formData.inspectionTime"
              type="date"
              format="yyyy年MM月dd日"
              placeholder="    年  月  日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </p>
        <p class="partyBox">
          对
          <span class="width_file">
            <el-form-item prop="afdd">
              <el-input v-model="formData.afdd"></el-input>
            </el-form-item>
          </span>
          进行路政巡查监督，发现存在以下问题：
        </p>
        <!-- 多行样式 -->
        <div class="overflow_lins_style p-l-32">
          <div class="overflow_lins">
            <el-form-item prop="contextInfo">
              <el-input
                class="overflow_lins_textarea"
                type="textarea"
                v-model="formData.contextInfo"
                rows="4"
                maxlength="130"
              ></el-input>
              <span class="span_bg span_bg_top">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
            </el-form-item>
          </div>
        </div>

        <p>
          你单位应对以上问题在
          <span contenteditable="true">
            <el-form-item prop="days" style="width:80px">
              <el-input-number v-model="formData.days" :min="1" :max="100" class="time-limit-input"></el-input-number>
            </el-form-item>
          </span>日内整改，并将整改情况于
          <el-form-item prop="endTime" style="width: 146px;">
            <el-date-picker
              v-model="formData.endTime"
              type="date"
              format="yyyy年MM月dd日"
              placeholder="    年  月  日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>前报本单位。
        </p>
        <br />
        <br />
        <br />
        <br />
        <el-row :gutter="20">
          <el-col :span="12">
            监督巡查单位：
            <p class="partyBox d-i-b w-180">
              <el-form-item prop="monitorUnit">
                <el-input v-model="formData.monitorUnit"></el-input>
              </el-form-item>
            </p>
          </el-col>
          <el-col :span="12">
            被监督巡查对象：
            <p class="partyBox d-i-b" style="width: 165px;">
              <el-form-item prop="supervised">
                <el-input v-model="formData.supervised"></el-input>
              </el-form-item>
            </p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">监督巡查人（签字）：
            <p class="partyBox d-i-b w-180">
              <el-form-item prop="monitorName">
                <el-input v-model="formData.monitorName"></el-input>
              </el-form-item>
            </p>
          </el-col>
          <el-col :span="12">被监督巡查对象责任人（签字）：
            <p class="partyBox d-i-b" style="width: 165px;">
              <el-form-item prop="supervisedName">
                <el-input v-model="formData.supervisedName"></el-input>
              </el-form-item>
            </p>
          </el-col>
        </el-row>
        <br />
        <br />
        <br />
        <br />
        <div class="pdf_seal">
          <br />
          <el-form-item prop="createTime" class="pdf_datapick">
            <el-date-picker
              class="big_error"
              v-model="formData.createTime"
              type="date"
              format="yyyy年MM月dd日"
              placeholder="    年  月  日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="notice clear">
          <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
        </div>
      </el-form>
    </div>
    <!-- <el-alert title="错误提示的文案" type="error"  show-icon>
    </el-alert>-->
  </div>
</template>
<script>
import { getOrganDetailApi, getOrganIdApi } from "@/api/system";
import iLocalStroage from "@/common/js/localStroage";
import { getCheParameterInfoApi, getOrganInfoApi } from "@/api/supervision";

export default {
  props: {
    caseDocData: {}
  },
  components: {},
  computed: {
    UserInfo() {
      return iLocalStroage.gets("userInfo");
    },
  },
  data() {
    var validateBycorrectWay = (rule, value, callback) => {
      if (this.formData.correctWay[0] == "2" && !value) {
        return callback(new Error("责令改正日期不能为空"));
      }
      callback();
    };
    return {
      formData: {
        // tempNo: "整改001",
        numberNo: "",
        companyName: "",
        orgName: "",
        inspectionTime: "",
        afdd: "",
        contextInfo: "问题内容",
        days: 15,
        endTime: "",
        monitorUnit: "",
        supervised: "",
        createTime: "",
      },
      rules: {
        companyName: [
          { required: true, message: "管理单位不能为空", trigger: "blur" },
        ],
        orgName: [
          { required: true, message: "路政巡查监督不能为空", trigger: "blur" },
        ],
        inspectionTime: [
          { required: true, message: "巡查时间不能为空", trigger: "blur" },
        ],
        afdd: [{ required: true, message: "路段不能为空", trigger: "blur" }],
        contextInfo: [
          { required: true, message: "存在问题不能为空", trigger: "blur" },
        ],
        days: [
          { required: true, message: "整改天数不能为空", trigger: "blur" },
        ],
        endTime: [
          { required: true, message: "整改上报日期不能为空", trigger: "blur" },
        ],
        monitorUnit: [
          { required: true, message: "监督巡查单位不能为空", trigger: "blur" },
        ],
        supervised: [
          {
            required: true,
            message: "被监督巡查对象不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 表单校验,校验通过返回数据
    validateForm() {
      return new Promise((resolve, reject) => {
        this.$refs.docFormRef.validate((valid, noPass) => {
          if (valid) {
            this.formData.orgNameTop = this.formData.orgName;
            const reportData = JSON.stringify(this.formData);
            resolve({ code: 200, data: reportData });
          } else {
            let a = Object.values(noPass)[0];
            this.$message({
              showClose: true,
              message: a[0].message,
              type: "error",
              offset: 100,
              customClass: "validateErrorTip",
            });
            resolve({ code: 500 });
          }
        });
      });
    },
    // 获取当前日期
    getCurrentDay() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      this.formData.createTime = `${year}-${month}-${day}`;
      this.formData.monitorUnit = this.UserInfo.orgName;
      this.formData.yearNo = `${year}`;
    },
    getCheParameterInfo() {
      const params = { codeInfo: 'record_case_doc_code' };
      getCheParameterInfoApi(params).then(
        res => this.formData.numberNo = res.data
      );
    },
    getOrganInfo() {
      getOrganInfoApi().then(
        res => {
          const data = {};
          data.orgName = res.data.orgName;
          this.formData = Object.assign(data,this.formData);
        }
      )
    }
  },

  mounted() {},
  created() {
    const caseDocData = JSON.parse(this.caseDocData);
    if(!caseDocData.yearNo) {
      this.getCurrentDay();
    }
    if(!caseDocData.numberNo) {
      this.getCheParameterInfo();
    }
    if(!caseDocData.porgNameTop && !caseDocData.orgNameTop) {
      this.getOrganInfo();
    }
    if(Object.keys(caseDocData).length > 0){
      this.formData = Object.assign(caseDocData);
    }
  },
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss" scoped>
.instruct-notice {
  #instructNoticePanel {
    margin-top: 10px;
    .top-split-line{
        display: block;
        border: 1px solid #dcdfe6;
        margin: 20px 0;
      }
    
    .doc_number {
      line-height: 40px;
    }
    .partyBox {
      text-indent: 0;
    }
    .t-i-28 {
      text-indent: 28px;
    }
    .p-l-32 {
      padding-left: 32px;
    }
    .d-i-b {
      display: inline-block;
    }
    .w-180 {
      width: 180px;
    }
    .time-limit-input {
      width: 80px;
      line-height: 32px;
      >>> .el-input-number__decrease,
      >>> .el-input-number__increase {
        display: none;
      }
    }
    .is-error .el-radio-group {
      background: #f7c9cb;
    }
    .overflow_lins_style .overflow_lins span.overflow_lins_textarea {
      text-indent: 0;
    }
  }
}
</style>
