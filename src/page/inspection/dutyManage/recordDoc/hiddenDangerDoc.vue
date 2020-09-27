<template>
  <div class="print_box danger-notice">
    <div class="print_info" id="dangerNoticePanel">
      <el-form
        :rules="rules"
        ref="docFormRef"
        :inline-message="true"
        :inline="true"
        :model="formData"
      >
        <div class="doc_topic">公路安全隐患告知函</div>
        <div
          class="doc_number"
        >{{ formData.porgName }}大队{{ formData.orgName }}中队函告[{{ formData.yearNo }}]&nbsp;&nbsp;第{{ formData.numberNo }}号</div>
        <span class="top-split-line"></span>
        <p class="partyBox">
          <span class="width_file">
            <el-form-item prop="informUnit">
              <el-input v-model="formData.informUnit" placeholder="（须全称）"></el-input>
            </el-form-item>：
          </span>
        </p>
        <p class="t-i-28">
          <span>
            <el-form-item prop="porgName" style="width: 260px;">
              <el-input v-model="formData.porgName" placeholder="XXXXXXXXXX"></el-input>
            </el-form-item>
          </span>
          大队
          <span>
            <el-form-item prop="orgName" style="width: 200px;">
              <el-input v-model="formData.orgName" placeholder="XXXXXXXX"></el-input>
            </el-form-item>
          </span>
          中队于
          <el-form-item prop="inspectionTime">
            <el-date-picker
              class="date-time-input"
              v-model="formData.inspectionTime"
              type="datetime"
              format="yyyy年MM月dd日HH时mm分"
              placeholder="    年  月  日  时  分"
              value-format="yyyy-MM-dd HH:mm"
            ></el-date-picker>
          </el-form-item>在路政巡查时，发现以下情况：
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
        <p class="t-i-28">
          鉴于情况严重，影响
          <span>
            <el-form-item prop="influenceInfo" style="width: 280px">
              <el-input v-model="formData.influenceInfo" placeholder="xxxxxxxxxxxxxxxxxxxxxxx"></el-input>
            </el-form-item>
          </span>安全，请贵单位核实后尽快处置。
        </p>
        <br />
        <p class="t-i-28">特此函告</p>
        <br />
        <br />
        <div style="float: right; line-height: 40px;">
          <el-form-item prop="createTime" class="pdf_datapick">
            <el-date-picker
              class="big_error"
              v-model="formData.createTime"
              type="date"
              format="yyyy年MM月dd日"
              placeholder="    年  月  日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>（印章）
        </div>
        <br />
        <br />
        <el-row :gutter="20" style="clear: both;">
          <el-col :span="12">
            签收人：
            <p class="partyBox d-i-b w-180">
              <el-form-item prop="accName">
                <el-input v-model="formData.accName"></el-input>
              </el-form-item>
            </p>
          </el-col>
          <el-col :span="12">
            送达人：
            <p class="partyBox d-i-b" style="width: 165px;">
              <el-form-item prop="toName">
                <el-input v-model="formData.toName"></el-input>
              </el-form-item>
            </p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            送达时间：
            <p class="partyBox d-i-b w-180">
              <el-form-item prop="toTime">
                <el-date-picker
                  class="big_error"
                  v-model="formData.toTime"
                  type="date"
                  format="yyyy年MM月dd日"
                  placeholder="    年  月  日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </p>
          </el-col>
          <el-col :span="12">
            签收时间：
            <p class="partyBox d-i-b w-180">
              <el-form-item prop="accTime">
                <el-date-picker
                  class="big_error"
                  v-model="formData.accTime"
                  type="date"
                  format="yyyy年MM月dd日"
                  placeholder="    年  月  日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </p>
          </el-col>
        </el-row>
        <br />
        <br />
        <br />
        <br />
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

export default {
  components: {},
  computed: {
    UserInfo() {
      return iLocalStroage.gets("userInfo");
    },
  },
  data() {
    return {
      formData: {
        yearNo: "",
        numberNo: "0000",
        informUnit: "告知单位名称",
        inspectionTime: "",
        afdd: "路段名称",
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
      })
    },
    // 获取当前日期
    getCurrentDay() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      this.formData.createTime = `${year}-${month}-${day}`;
      this.formData.yearNo = `${year}`;
      this.formData.accName = this.UserInfo.nickName;
    },
  },

  mounted() {},
  created() {
    this.getCurrentDay();
  },
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss" scoped>
.danger-notice {
  #dangerNoticePanel {
    margin-top: 10px;
      .top-split-line{
        display: block;
        border: 1px solid #dcdfe6;
        margin: 20px 0;
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
    .date-time-input {
        width: 216px;
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
