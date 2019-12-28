<template>
  <div class="box">
    <div class="header">
      <div class="header_left">
        <div class="triangle"></div>
        <div class="header_left_text">返回</div>
      </div>
    </div>
    <div class="content_box">
      <div class="content">
        <div class="content_title">立案审批表</div>
        <div class="border_blue"></div>
        <el-form ref="caseLinkDataForm">
        <el-input ref="id" type="hidden"></el-input></el-form>
        <el-form ref="docForm" :model="formData" :rules="rules" label-width="135px">
          <div class="content_form">
            <el-input
              ref="id"
              type="hidden"
              class="w-120"
              v-model="formData.id"
              size="small"
              placeholder="请输入"
            ></el-input>
            <div class="row">
              <div class="col">
                <el-form-item prop="caseNumber" label="案号：">
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
                <el-form-item prop="caseNumber" label="受案时间：">
                  <el-date-picker
                    v-model="formData.acceptTime"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm"
                  ></el-date-picker>
                  <!-- <el-input ref="caseNumber" clearable class="w-120" v-model="docData.acceptTime" size="small" placeholder="请输入"></el-input> -->
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="caseSource" label="案件来源：">
                  <el-input
                    ref="caseSource"
                    clearable
                    class="w-120"
                    v-model="formData.caseSource"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="rows">
              <div class="col">
                <el-form-item prop="partyType" label="当事人类型：">
                  <!-- <el-input ref="partyType" clearable class="w-120" v-model="docData.partyType" size="small" placeholder="请输入"></el-input> -->
                  <el-select
                    ref="partyType"
                    clearable
                    class="w-120"
                    v-model="formData.partyType"
                    size="small"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in partyTypeList"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <!-- 个人 -->
            <div v-if="formData.partyType=='个人'">
              <div class="row">
                <div class="col">
                  <el-form-item label="姓名：">
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
                  <el-form-item label="性别：">
                    <el-input
                      ref="partySex"
                      clearable
                      class="w-120"
                      v-model="formData.partySex"
                      size="small"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="col">
                  <el-form-item label="年龄：">
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
                  <el-form-item label="身份证号：">
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
                  <el-form-item label="联系电话：">
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
                  <el-form-item label="住址：">
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
                  <el-form-item label="立案依据：">
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
            </div>
            <!-- 企业 -->
            <div v-if="formData.partyType=='企业'">
              <div class="row">
                <div class="col">
                  <el-form-item label="名称：">
                    <el-input
                      ref="partyName"
                      clearable
                      class="w-120"
                      v-model="formData.partyName"
                      size="small"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <el-form-item label="法定代表人：">
                    <el-input
                      ref="partyManager"
                      clearable
                      class="w-120"
                      v-model="formData.partyManager"
                      size="small"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="col">
                  <el-form-item label="联系电话：">
                    <el-input
                      ref="partyUnitTel"
                      clearable
                      class="w-120"
                      v-model="formData.partyUnitTel"
                      size="small"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <el-form-item label="住址：">
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
                  <el-form-item label="统一社会信用代码：">
                    <el-input
                      ref="socialCreditCode"
                      clearable
                      class="w-120"
                      v-model="formData.socialCreditCode"
                      size="small"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <el-form-item label="立案依据：">
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
            </div>
          </div>
          <div class="border_blue"></div>
          <div class="content_form bottom_form">
            <el-form-item prop="caseName" label="案由：">
              <el-input v-model="formData.caseName" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item prop="caseBasicSituation" label="案件基本情况：">
              <el-input
                type="textarea"
                class="height122"
                v-model="formData.caseBasicSituation"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item prop="note" label="备注：">
              <el-input v-model="formData.note" size="small" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <!-- 悬浮按钮 -->
      <div class="float-btns">
        <el-button type="primary" @click="addFormData('0')">
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
        <el-button type="success">
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
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        partyType: "个人"
      },
      rules: {
        caseNumber: [
          { required: true, message: "案号必须填写", trigger: "blur" }
        ],
        caseName: [
          { required: true, message: "案由必须填写", trigger: "blur" }
        ],
        partyType: [
          { required: true, message: "当事人类型必须填写", trigger: "blur" }
        ],
        acceptTime: [
          { required: true, message: "受案时间必须填写", trigger: "blur" }
        ],
        caseBasicSituation: [
          { required: true, message: "案件基本情况必须填写", trigger: "blur" }
        ]
      },
      partyTypeList: ["个人", "企业"],
      //提交方式
      handleType: 0 ,//0  暂存     1 提交
      caseLinkDataForm: {
        id:"",
        caseBasicinfoId: "",
        caseLinktypeId: "123",
        //表单数据
        formData: "",
        status: ""
      },
    };
  },
  methods: {
    //加载表单信息
    getFormDataByCaseIdAndFormId() {
      let data = {
        casebasicInfoId: "12345666666666",
        caseLinktypeId: "123"
      };
      this.$store.dispatch("getFormDataByCaseIdAndFormId", data).then(
        res => {
          console.log("获取表单详情", res);
          //如果为空，则加载案件信息
          if (res.data == "") {
            this.getCaseBasicInfo();
          } else {
            console.log(res.data);
            this.caseLinkDataForm.id = res.data.id;
            this.formData = JSON.parse(res.data.formData);
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    // 获取带入信息
    getCaseBasicInfo() {
      let data = {
        id: "12345666666666"
      };
      this.$store.dispatch("getCaseBasicInfo", data).then(
        res => {
          this.formData = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    // 提交表单
    addFormData(handleType) {
      debugger;
      (this.caseLinkDataForm.formData = JSON.stringify(this.formData)),
        (this.caseLinkDataForm.caseBasicinfoId = this.formData.id),
        //0暂存 1提交
        this.caseLinkDataForm.status = handleType;
        this.$refs["docForm"].validate(valid => {
          if (valid) {
            this.$store.dispatch("addFormData", this.caseLinkDataForm).then(
              res => {
                console.log("保存表单", res);
                this.$message({
                  type: "success",
                  message: "保存成功"
                });
              },
              err => {
                console.log(err);
              }
            );
          } else {
            console.log("error submit!!");
            return false;
          }
        });
    }
  },

  created() {
    this.getFormDataByCaseIdAndFormId();
  }
};
</script>

<style lang="less" scoped>
@import "../../../../css/caseHandle/caseDocument.less";
@import "../../../../css/documentForm.less";
</style>
