<template>
  <div class="box">

    <div class="content_box" id="adminPunish_print">
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
        <casePageFloatBtns
      :pageDomId="'adminPunish_print'"
      :formOrDocData="formOrDocData"
      @saveData="saveData"
    ></casePageFloatBtns>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";

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
        caseBasicinfoId: '', //案件id
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
      formOrDocData: {
        showBtn: [
          false,
          true,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        ], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        pageDomId: "adminPunish_print",
        isHuanjie:true,
      },
      huanjieAndDocId: "2c9029ca5b71686d015b71c8a0c10042", //行政处罚决定书的文书id
    };
  },
  mixins:[mixinGetCaseApiList],
  computed:{...mapGetters(['caseId'])},
  components: {
    casePageFloatBtns
  },
  methods: {
    //加载表单信息
    setFormData(){
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(this.caseLinkDataForm.caseBasicinfoId,this.caseLinkDataForm.caseLinktypeId,false);
    },
    saveData(handleType) {
      //参数  提交类型 、
      this.com_submitCaseForm(handleType, "docForm", true);
    },
  },
  created(){
    this.setFormData();
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/documentForm.scss";
// @import "@/assets/css/caseHandle/caseDocument.scss";
</style>
