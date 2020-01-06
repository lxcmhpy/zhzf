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
        <div class="content_title">行政处罚决定书</div>
        <el-form ref="caseLinkDataForm">
        <el-input ref="id" type="hidden"></el-input></el-form>
        <el-form ref="adminPunisheDecisionForm" :model="formData" :rules="rules" label-width="135px">
          <div class="border_blue"></div>
          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item prop="caseNumber" label="案号：">
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

            <div class="rows">
              <div class="col">
                <el-form-item prop="party" label="当事人姓名：">
                  <el-input ref="party" :disabled="true" v-model="formData.party"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="partyIdNo" label="身份证号码：">
                  <el-input ref="partyIdNo" :disabled="true" v-model="formData.partyIdNo"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="partyAddress" label="住址：">
                  <el-input ref="partyAddress" v-model="formData.partyAddress"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="partyTel" label="联系电话">
                  <el-input ref="partyTel" v-model="formData.partyTel"></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="rows">
              <div class="col">
                <el-form-item prop="partyName" label="企业名称：">
                  <el-input
                    ref="partyName"
                    clearable
                    :disabled="true"
                    v-model="formData.partyName"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="partyUnitAddress" label="地址：">
                  <el-input ref="partyUnitAddress" v-model="formData.partyUnitAddress"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="partyManager" label="法定代表人：">
                  <el-input
                    ref="partyManager"
                    clearable
                    v-model="formData.partyManager"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="partyUnitTel" label="联系电话：">
                  <el-input ref="partyUnitTel" v-model="formData.partyUnitTel"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="socialCreditCode" label="统一社会信用代码：">
                  <el-input
                    ref="socialCreditCode"
                    clearable
                    v-model="formData.socialCreditCode"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="border_blue"></div>
          <div class="content_form bottom_form">
            <el-form-item label="违法事实及依据：">
              <el-input
                type="textarea"
                class="height106"
                v-model="formData.caseCauseNameCopy"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="违法条款：">
              <el-input
                type="textarea"
                v-model="formData.illegalLaw"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="处罚依据：">
              <el-input
                type="textarea"
                v-model="formData.punishLaw"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="处罚金额：">
              <el-input
                type="textarea"
                v-model="formData.tempPunishAmount"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="处罚决定：">
              <el-input
                type="textarea"
                v-model="formData.punishDecision"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="其他执行方式：">
              <el-input
                type="textarea"
                v-model="formData.otherWay"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
          <div class="border_blue"></div>
          <div class="content-form">
            <div class="rows">
              <div class="col">
                <el-form-item prop="payBank" label="缴费银行：">
                  <el-input
                    ref="payBank"
                    clearable
                    v-model="formData.payBank"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="payBankAccount" label-width="23px">
                  <el-input ref="payBankAccount" v-model="formData.payBankAccount"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="border_blue"></div>
          <div class="content-form">
            <div class="row">
              <div class="col">
                <el-form-item  label="行政复议机构：" >
                  <el-checkbox-group v-model="formData.checkList1">
                    <el-row>
                      <el-col :span="5">
                        <el-checkbox label="复议机构名称1"></el-checkbox>
                      </el-col>
                      <el-col :span="10">
                        <el-input v-model="formData.name1"></el-input>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5">
                        <el-checkbox label="复议机构名称2"></el-checkbox>
                      </el-col>
                      <el-col :span="10">
                        <el-input v-model="formData.name2"></el-input>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5">
                        <el-checkbox label="复议机构名称3"></el-checkbox>
                      </el-col>
                      <el-col :span="10">
                        <el-input v-model="formData.name3"></el-input>
                      </el-col>
                    </el-row>                    
                   
                  </el-checkbox-group>
                </el-form-item>
              </div>
            </div>            
            <div class="row">
              <div class="col">
                <el-form-item  label="行政诉讼：" >
                  <el-checkbox-group v-model="formData.checkList2">
                    <el-row>
                      <el-col :span="5">
                        <el-checkbox label="诉讼机构名称1"></el-checkbox>
                      </el-col>
                      <el-col :span="10">
                        <el-input v-model="formData.name4"></el-input>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5">
                        <el-checkbox label="诉讼机构名称2"></el-checkbox>
                      </el-col>
                      <el-col :span="10">
                        <el-input v-model="formData.name5"></el-input>
                      </el-col>
                    </el-row>                   
                  </el-checkbox-group>
                </el-form-item>
              </div>
            </div>  
          </div>
          <!-- 悬浮按钮 -->
        <div class="float-btns">
        <el-button type="primary" @click="submitCaseDoc(1)">
          <svg t="1577414377979" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1726" width="16" height="16">
            <path d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z" p-id="1727" fill="#FFFFFF"></path>
          </svg><br>
          提交</el-button>
        <el-button type="success">
          <svg t="1577415780823" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2584" width="16" height="16">
            <path d="M98 124.1V902c0 14.3 11.6 25.9 25.9 25.9h777.9c14.3 0 25.9-11.6 25.9-25.9V124.1c0-14.3-11.6-25.9-25.9-25.9H123.9c-14.3 0-25.9 11.6-25.9 25.9z m207.4 37.6h414.9v191.7H305.4V161.7z m558.8 702.7H162.6V161.7h104v230.6h492.7V161.7h105v702.7z" p-id="2585" fill="#FFFFFF"></path>
            <path d="M605.1 191.9h70v128h-70z" p-id="2586" fill="#FFFFFF"></path>
          </svg>
          <br>
          暂存
        </el-button>
      </div>
        </el-form>
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
        checkList1:"",
        checkList2:"",
        name1:"",
        name2:"",
        name3:"",
        name4:"",
        name5:"",
      },
      //提交方式
      handleType: 0, //0  暂存     1 提交
      caseLinkDataForm: { 
        id: "", //修改的时候用
        caseBasicinfoId: this.$route.params.id, //案件id
        caseLinktypeId: "2c9029d56c8f7b66016c8f8043c90001", //表单类型IDer
        //表单数据
        formData: "",
        status: ""
      },
      rules: {
        party: [
          { required: true, message: "当事人姓名必须填写", trigger: "blur" }
        ]
      },
    };
  },
  mixins:[mixinGetCaseApiList],
  methods: {
    //加载表单信息
    setFormData(){
      this.com_getFormDataByCaseIdAndFormId(this.caseLinkDataForm.caseBasicinfoId,this.caseLinkDataForm.caseLinktypeId,'form');
    },
    submitCaseDoc(handleType) {
      //参数  提交类型 、formRef  
      this.com_submitCaseForm(handleType,'adminPunisheDecisionForm',false,'');
    }
  },
  created(){
    this.setFormData();
  }
};
</script>

<style lang="less" scoped>
@import "../../../../css/documentForm.less";
// @import "../../../../css/caseHandle/caseDocument.less";
</style>
