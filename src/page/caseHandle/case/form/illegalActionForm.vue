<template>
  <div class="box">
    <div class="content_box">
      <div class="content">
        <div class="content_title">违法行为通知书</div>
        <el-form ref="caseLinkDataForm">
        <el-input ref="id" type="hidden"></el-input></el-form>
        <el-form
          :inline="true"
          ref="illegalActionForm"
          :model="formData"
          label-width="135px"
          :rules="rules"
        >
          <div class="border_blue"></div>
          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item label="案号：" prop="caseNumber">
                  <el-input
                  :disabled="true"
                    ref="caseNumber"
                    clearable
                    class="w-120"
                    v-model="formData.caseNumber"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="party" label="当事人姓名：">
                  <el-input
                    ref="party"
                    :disabled="true"
                    clearable
                    class="w-120"
                    v-model="formData.party"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="违法行为：">
                  <el-input
                    ref="caseCauseNameCopy"
                    :disabled="true"
                    clearable
                    class="w-120"
                    v-model="formData.caseCauseNameCopy"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="违法依据：">
                  <el-input
                    ref="illegalBasis"
                    clearable
                    class="w-120"
                    v-model="formData.illegalBasis"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="处罚依据：">
                  <el-input
                    ref="punishLaw"
                    clearable
                    class="w-120"
                    v-model="formData.punishLaw"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="拟处罚决定：">
                  <el-input
                    ref="punishDecision"
                    :disabled="true"
                    clearable
                    class="w-120"
                    v-model="formData.punishDecision"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="border_blue"></div>
          <div class="content_form bottom_form">
            <div class="row">
              <div class="col">
                <el-form-item  label="当事人权利：" >
                  <el-checkbox-group v-model="formData.checkBoxList">
                    <el-row>
                      <el-col :span="5">
                        <el-checkbox label="陈述申辩权利" v-model="formData.checkBox1" :checked="true"></el-checkbox>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5">
                        <el-checkbox label="举行听证权利" v-model="formData.checkBox12" :checked="true"></el-checkbox>
                      </el-col>
                    </el-row>                   
                  </el-checkbox-group>
                </el-form-item>
              </div>
            </div> 
          </div>
          <div class="border_blue"></div>
          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item label="联系地址：">
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
              <div class="col">
                <el-form-item label="邮编：">
                  <el-input
                    ref="partyZipCode"
                    clearable
                    class="w-120"
                    v-model="formData.partyZipCode"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="联系人：">
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
                <el-form-item label="联系电话 ：">
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
        </el-form>
      </div>
      <div class="float-btns">
        <el-button type="primary" @click="addFormData(1)">
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
        <el-button type="success" @click="addFormData(0)">
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
import { mixinGetCaseApiList } from "@/js/mixins";

export default {
  data() {
    return {
      formData: {
        caseNumber: "",
        party: "",
        caseCauseNameCopy: "",
        illegalBasis: "",
        punishLaw: "",
        punishDecision: "",
        partyAddress: "",
        partyZipCode: "",
        contactPerson:"",
        partyTel: "",
        checkBoxList:""
      },
      rules: {
        party: [
          { required: true, message: "当事人姓名必须填写", trigger: "blur" }
        ]
      },
      //提交方式
      handleType: 0, //0  暂存     1 提交
      caseLinkDataForm: { 
        id: "", //修改的时候用
        caseBasicinfoId: this.$route.params.id, //案件id
        caseLinktypeId: "2c9029ee6cac92s81016caca8ea500003", //表单类型IDer
        //表单数据
        formData: "",
        status: ""
      },
    };
  },
  mixins:[mixinGetCaseApiList],
  methods: {
    //加载表单信息
    setFormData(){
      this.com_getFormDataByCaseIdAndFormId(this.caseLinkDataForm.caseBasicinfoId,this.caseLinkDataForm.caseLinktypeId,'form');
    },
    addFormData(handleType) {
      //参数  提交类型 、formRef  、 跳转的pdf路由name
      this.com_submitCaseForm(handleType,'illegalActionForm','illegalActionPdf');
    }
  },
  created() {
    this.setFormData();
  }
};
</script>
<style lang="less" scoped>
// @import "../../../../css/caseHandle/caseDocument.less";
@import "../../../../css/documentForm.less";
</style>
