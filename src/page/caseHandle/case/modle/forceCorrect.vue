<template>
  <div class="print_box" id="btnB">
    <div class="print_info" id="forceCorrect-print">
      <el-form
        :rules="rules"
        ref="docForm"
        :inline-message="true"
        :inline="true"
        :model="formData"
        :class="isPdf"
      >
        <div class="doc_topic">责令改正违法行为通知书</div>
        <div class="doc_number">案号：{{formData.caseNumber}}</div>
        <p class="partyBox">
          当事人（个人姓名或单位名称）
          <span class="width_file">
            <el-form-item prop="party">
              <el-input
                disabled
                type="textarea"
                v-model="formData.party"
                v-bind:class="{ over_flow:formData.party.length>12?true:false }"
                :autosize="{ minRows: 1, maxRows: 3}"
                :maxLength="maxLength"
                placeholder="\"
              ></el-input>
            </el-form-item>
          </span>
        </p>
        <!-- 多行样式 -->
        <p>经调查，你（单位）存在下列违法事实：</p>
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item prop="caseName">
              <el-input
                disabled
                class="overflow_lins_textarea"
                type="textarea"
                v-model="formData.caseName"
                rows="3"
                maxlength="90"
                placeholder="\"
              ></el-input>
              <span class="span_bg span_bg_top" @click="overFlowEdit">&nbsp;</span>
              <span
                v-for="item in overFlowEditList"
                :key="item.id"
                class="span_bg"
                @click="overFlowEdit"
              >&nbsp;</span>
            </el-form-item>
          </div>
        </div>

        <p>
          依据
          <span contenteditable="true">
            <el-form-item prop="punishLaw" style="width:300px">
              <el-input
                type="textarea"
                class="big_error"
                v-model="formData.punishLaw"
                v-bind:class="{ over_flow:formData.punishLaw.length>12?true:false }"
                :autosize="{ minRows: 1, maxRows: 3}"
                :maxLength="maxLength"
                placeholder="\"
              ></el-input>
            </el-form-item>
          </span>的规定，现责令你（单位）
        </p>
        <el-form-item prop="correctWay">
          <el-checkbox-group v-model="formData.correctWay" :max="1" @change="changeCorrectWay">
            <p>
              <el-checkbox label="1">立即予以改正。</el-checkbox>
            </p>
            <p>
              <el-checkbox label="2">
                <span>在</span>
                <span class="p_datapick">
                  <el-form-item v-if="!lineStyleFlag" prop="correctTime" style="margin-top:-6px">
                    <el-date-picker
                      
                      v-model="formData.correctTime"
                      type="date"
                      format="yyyy年MM月dd日"
                      placeholder="    年  月  日"
                    ></el-date-picker>
                  </el-form-item>
                </span>
                <span>前改正或者整改完毕。</span>
              </el-checkbox>
            </p>
          </el-checkbox-group>
        </el-form-item>
        <!-- <p>
          
        </p>
        <p>
          <el-checkbox v-model="formData.correctWay2"></el-checkbox>在<span class="p_datapick">
            <el-form-item v-if="!lineStyleFlag" prop="correctTime" class="pdf_datapick">
              <el-date-picker  class="big_error" v-model="formData.correctTime" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日">
              </el-date-picker>
            </el-form-item>
          </span>前改正或者整改完毕。
        </p>-->
        <p>
          如果不服本处罚决定，可以在六十日内依法向
          <span>
            <el-form-item prop="reconsiderationOrgan">
              <!-- <el-input v-model="formData.reconsiderationOrgan" :maxLength='maxLength' placeholder="\"></el-input> -->
              <el-select
                v-model="formData.reconsiderationOrgan"
                :maxLength="maxLength"
                placeholder="\"
              >
                <el-option
                  v-for="(item,index) in reconsiderationOptions"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </span>申请行政复议，或者在六个月内依法向
          <span>
            <el-form-item prop="litigationOrgan">
              <!-- <el-input v-model="formData.litigationOrgan" :maxLength='maxLength' placeholder="\"></el-input> -->
              <el-select v-model="formData.litigationOrgan" :maxLength="maxLength" placeholder="\">
                <el-option
                  v-for="(item,index) in enforcementOptions"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </span>人民法院提起行政诉讼。
        </p>
        <br />
        <br />
        <el-row :gutter="20">
          <el-col :span="12">
            当事人或其代理人签名：
            <span class="write_line width250"></span>
          </el-col>
          <el-col :span="12">
            执法人员签名：
            <span class="write_line width250"></span>
          </el-col>
        </el-row>
        <br />
        <br />
        <div class="pdf_seal">
          <span @click="makeSeal">交通运输执法部门(印章)</span>
          <br />
          <el-form-item prop="makeDate" class="pdf_datapick">
            <el-date-picker
              class="big_error"
              v-model="formData.makeDate"
              type="date"
              format="yyyy年MM月dd日"
              placeholder="    年  月  日"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="notice clear">
          <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
        </div>
      </el-form>
    </div>
    <casePageFloatBtns
      :pageDomId="'forceCorrect-print'"
      :formOrDocData="formOrDocData"
      @saveData="saveData"
    ></casePageFloatBtns>
    <!-- <el-alert title="错误提示的文案" type="error"  show-icon>
    </el-alert>-->
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import { getOrganDetailApi, getOrganIdApi } from "@/api/system";
import mySignture from "@/common/js/mySignture";
import iLocalStroage from "@/common/js/localStroage";
export default {
  components: {
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  data() {
    var validateBycorrectWay = (rule, value, callback) => {
      console.log('this.formData.correctWay[0]',this.formData.correctWay[0])
      if (this.formData.correctWay[0] == '2' && !value)  {
        return callback(new Error("请输入"));
      }
      callback();
    };
    return {
      overFlowEditList: [{}],
      isOverflow: false,
      isOverLine: false,
      formData: {
        party: "",
        partyIdNo: "",
        partyAddress: "",
        partyTel: "",
        partyName: "",
        partyUnitAddress: "",
        partyUnitTel: "",
        partyManager: "",
        punishLaw: "",
        illegalLaw: "",
        tempPunishAmount: "",
        socialCreditCode: "",
        illegalFactsEvidence: "",
        reconsiderationOrgan: "",
        test: "",
        correctWay: [],
        // correctWay1:"",
        // correctWay2:"",
        litigationOrgan: "",
        makeDate: ""
      },
      reconsiderationOptions: [], //行政复议机构
      enforcementOptions: [], //行政诉讼机构
      handleType: 0, //0  暂存     1 提交
      caseLinkDataForm: {
        id: "", //修改的时候用
        // caseBasicinfoId: '297708bcd8e80872febb61577329194f', //案件id--从流程进入删掉，先写死测试用
        caseBasicinfoId: "",
        caseLinktypeId: "2c9029ee6cac9281016caca9a0000004", //表单类型ID
        //表单数据
        formData: "",
        status: ""
      },
      name: "",
      rules: {
        party: [{ required: true, message: "请输入", trigger: "blur" }],
        // makeDate: [
        //   { required: true, message: '请输入', trigger: 'blur' },
        // ],
        reconsiderationOrgan: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        litigationOrgan: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        correctWay: [{ required: true, message: "请选择", trigger: "change" }],
        correctTime:[
          { validator: validateBycorrectWay, trigger: "blur" }
        ]
      },
      nameLength: 23,
      adressLength: 23,
      maxLengthOverLine: 122,
      maxLength: 23,
      lineStyleFlag: false,
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: "forceCorrect-print"
      },
      isPdf: "",
      huanjieAndDocId: "2c9029cc6a901fbe016a911e2dae000b" //责令改正违法行为通知书的文书id
    };
  },
  methods: {
    onSubmit(formName) {
      console.log("submit!");
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 多行编辑
    overFlowEdit() {
      this.$refs.overflowInputRef.showModal(0, "", this.maxLengthOverLine);
    },
    setData() {
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(
        this.caseLinkDataForm.caseBasicinfoId,
        this.caseLinkDataForm.caseLinktypeId,
        false
      );
    },
    // 提交表单
    submitDataIllegal(handleType) {},
    saveData(handleType) {
      //参数  提交类型 、
      this.com_submitCaseForm(handleType, "docForm", true);
    },
    // 盖章
    makeSeal() {
      signature.openURL("oeder");
    },
    // 打印
    print() {
      console.log("打印!");
    },
    //是否是完成状态
    isOverStatus() {
      if (this.$route.params.docStatus == "1") {
        this.formOrDocData.showBtn = [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true
        ]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    },
    //根据用户的组织机构ID获取复议机构和诉讼机构
    getOrganDetailOptions() {
      //获取机构详情
      let params = { id: iLocalStroage.gets("userInfo").organId };
       let _this = this
      this.$store.dispatch("getOrganDetail", params).then(
        res => {
          console.log("机构", res);
          let organData = res.data;
          //复议机构 
          if(organData.reconsiderationOrgan1){
             _this.reconsiderationOptions.push(organData.reconsiderationOrgan1)
          }
          if(organData.reconsiderationOrgan2){
             _this.reconsiderationOptions.push(organData.reconsiderationOrgan2)
          }
          //诉说机构
          if(organData.enforcementOrgan1){
             _this.enforcementOptions.push(organData.enforcementOrgan1)
          }
          if(organData.enforcementOrgan2){
             _this.enforcementOptions.push(organData.enforcementOrgan2)
          }
        },
        err => {
          console.log(err);
        }
      );
      
    },
    changeCorrectWay(val){
      console.log(val);
      this.formData.correctTime = '';
    }
  },

  mounted() {
    this.setData();
    this.getOrganDetailOptions();
  },
  created() {
    this.isOverStatus();
  }
};
</script>
<style lang="scss" >
@import "@/assets/css/caseHandle/caseDocModle.scss";
#forceCorrect-print {
  .partyBox {
    text-indent: 0;
  }
  label.el-checkbox {
    margin-left: 2em;
  }
  .el-checkbox__label {
    font-size: 16px;
    color: #000;
  }
  .is-error .el-checkbox-group{
    background: #f7c9cb;
  }
}
</style>
