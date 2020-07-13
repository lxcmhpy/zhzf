<!-------长软------->
<template>
  <div class="print_box">
    <div class="print_info">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">当场行政处罚决定书</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <!-- <el-button @click="onSubmit('docForm')">formName</el-button> -->
        <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td rowspan="6">
              当<br>
              事<br>
              人
            </td>
            <td rowspan="2">个人</td>
            <td>姓名</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="party">
                <el-input type='textarea' v-model="docData.party" disabled v-bind:class="{ over_flow:docData.party.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
                <!-- <el-input v-model="docData.party"  @input="widthCheck($event.target, 23,$event)" maxlength="47" v-bind:class="{over_flow: isOverflow}" placeholder="\"></el-input> -->
              </el-form-item>

            </td>
            <td>身份证件号</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyIdNo">
                <el-input v-model="docData.partyIdNo" disabled :maxLength='maxLength' placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>住址</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyAddress">
                <el-input type='textarea' v-model="docData.partyAddress" v-bind:class="{ over_flow:docData.partyAddress.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="adressLength" placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyTel">
                <el-input v-model="docData.partyTel" :maxLength='maxLength' placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="4"> 单位 </td>
            <td>名称</td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item prop="partyName">
                <el-input v-model="docData.partyName" disabled :maxLength='maxLength' placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>地址</td>
            <td colspan="4" class="color_DBE4EF">
              <el-form-item prop="partyUnitAddress">
                <el-input v-model="docData.partyUnitAddress" :maxLength='maxLength' placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyUnitTel">
                <el-input v-model="docData.partyUnitTel" minlength="11" :maxLength='maxLength' placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td> 法定代表人 </td>
            <td class="color_DBE4EF">
              <el-form-item prop="partyManager">
                <el-input v-model="docData.partyManager" :maxLength='maxLength' placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              统一社会信用代码
            </td>
            <td colspan="3" class="color_DBE4EF">
              <el-form-item prop="socialCreditCode">
                <el-input v-model="docData.socialCreditCode" :maxLength='maxLength' placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <!-- 多行样式 -->
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item prop="illegalFact" :rules="fieldRules('illegalFact',propertyFeatures['illegalFact'])">
              <el-input
                class="text_indent10 overflow_lins_textarea"
                type="textarea"
                v-model="docData.illegalFact"
                rows="3"
                maxlength="90"
                :disabled="fieldDisabled(propertyFeatures['illegalFact'])"
              ></el-input>
              <span class="overflow_describe">违法事实及依据：</span>
              <span class="span_bg span_bg_top">&nbsp;</span>
              <span
                v-for="item in overFlowEditList"
                :key="item.id"
                class="span_bg"
              >&nbsp;</span>
            </el-form-item>
          </div>
        </div>
        <p>你(单位)的行为违反了<span>
            <el-form-item prop="illegalLaw" class="width120"> 
              <el-input type='textarea' v-model="docData.illegalLaw" v-bind:class="{ over_flow:docData.party.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input>
            </el-form-item>
          </span>的规定，依据
          <span contenteditable="true">
            <el-form-item prop="punishLaw" class="width120">
              <el-input type='textarea' v-model="docData.punishLaw" v-bind:class="{ over_flow:docData.party.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input>
            </el-form-item>
          </span>的规定，决定给予
          <span>
            <el-form-item prop="tempPunishAmount" >
              <el-input type='textarea' v-model="docData.tempPunishAmount" v-bind:class="{ over_flow:docData.party.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input>
              <!-- <el-input v-model="docData.tempPunishAmount" :maxLength='maxLength' placeholder="\"></el-input> -->
            </el-form-item>
          </span>的行政处罚。
        </p>
        <p>
          罚款的履行方式和期限(见打√处)：
        </p>
        <p>
          <el-checkbox v-model="docData.checkBox1"></el-checkbox>当场缴纳
          <!-- <span>
            <el-form-item prop="otherWay">
              <el-input v-model="docData.otherWay" :maxLength='maxLength' placeholder="\"></el-input>
            </el-form-item>
          </span>。 -->
        </p>
        <p>
          <el-checkbox v-model="docData.checkBox2"></el-checkbox>自收到本决定书之日起十五日内缴至<span>
            <el-form-item prop="payBank" class="width235">
              <el-input v-model="docData.payBank" :maxLength='maxLength' placeholder="\"></el-input>
            </el-form-item>
          </span>，账号<span>
            <el-form-item prop="payBankAccount">
              <el-input v-model="docData.payBankAccount" :maxLength='maxLength' placeholder="\"></el-input>
            </el-form-item>
          </span>（通过<span>
            <el-form-item prop="payWay">
              <el-input v-model="docData.payWay" :maxLength='maxLength' placeholder="\"></el-input>
            </el-form-item>
          </span>支付码进行缴款），到期不缴纳罚款的，本机关可以每日按罚款数额的百分之三加处罚款，加处罚款的数额不超过罚款本数。
        </p>

        <p>
          如果不服本处罚决定，可以在六十日内依法向<span>
            <el-form-item prop="reconsiderationOrgan">
              <el-select v-model="docData.reconsiderationOrgan" :maxLength='maxLength' placeholder="\">
                  <el-option v-for="item in reconsiderationOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              <!-- <el-input v-model="docData.reconsiderationOrgan" :maxLength='maxLength' placeholder="\"></el-input> -->
            </el-form-item>
          </span>申请行政复议，或者在六个月内依法向<span>
            <el-form-item prop="litigationOrgan">
              <el-select v-model="docData.litigationOrgan" :maxLength='maxLength' placeholder="\">
                  <el-option v-for="item in enforcementOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              <!-- <el-input v-model="docData.litigationOrgan" :maxLength='maxLength' placeholder="\"></el-input> -->
            </el-form-item>
          </span>人民法院提起行政诉讼，但本决定不停止执行，法律另有规定的除外。逾期不申请行政复议、不提起行政诉讼又不履行的，本机关将依法申请人民法院强制执行。
        </p>
        <p>
          处罚前已口头告知当事人拟作出处罚的事实、理由和依据，并告知当事人依法享有的陈述权和申辩权。
        </p>
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
        <div class="pdf_seal">
          <span >交通运输执法部门(印章)</span><br>
          <el-form-item prop="makeDate" class="pdf_datapick">
            <el-date-picker v-model="docData.makeDate" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="notice clear">
          <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
        </div>
      </el-form>
    </div>
    
    <!-- 悬浮按钮 -->
    <casePageFloatBtns :pageDomId="'subOutputRank-print'" :formOrDocData="formOrDocData" @submitData="submitData" @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>

  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { getOrganDetailApi, getOrganIdApi } from "@/api/system";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";

export default {
  components: {
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId']) },
  data() {
    return {
      isOverflow: false,
      isOverLine: false,
      overFlowEditList:[{},{}],
      docData: {
        party: '',
        partyIdNo: '',
        partyAddress: "",
        partyTel: "",
        partyName: "",
        partyUnitAddress: "",
        partyUnitTel: "",
        partyManager: "",
        socialCreditCode: "",
        caseCauseNameCopy:"",
        illegalLaw: "",
        punishLaw: "",
        tempPunishAmount: "",
        payBank:"",
        payBankAccount:"",
        payWay:'',
        // illegalFactsEvidence: "",
        reconsiderationOrgan: "",
        litigationOrgan: "",
        checkBox1:'',
        checkBox2:'',
      },
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseDoctypeId: this.$route.params.docId, //文书类型ID
        docData: "",
        status: "", //提交状态
        linkTypeId: this.$route.params.caseLinkTypeId //所属环节的id
      },
      name: '',
      rules: {
        caseCauseNameCopy: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        illegalLaw: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        punishLaw: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        tempPunishAmount: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        reconsiderationOrgan: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        litigationOrgan: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],

      },
      nameLength: 23,
      adressLength: 23,
      maxLengthOverLine: 122,
      maxLength: 23,
      lineStyleFlag: false,
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: 'subOutputRank-print',
      },
      reconsiderationOptions : [],
      enforcementOptions : [],
      propertyFeatures:'',
    }
  },
  methods: {
    // widthCheck(str, len, event) {
    //   console.log('event,', event)
    //   console.log('str,', str, '  len:', len)
    //   if (event.length > len) {
    //     this.isOverflow = true
    //   } else
    //     this.isOverflow = false
    //   if (event.length > 40) {
    //     this.isOverLine = true
    //     console.log('overline', this.isOverLine)
    //   }
    // },
    onSubmit(formName) {
      console.log('submit!');
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      let data = {
        // caseId: this.caseId, //流程里的案件id
        caseId: this.caseId, //先写死
        docId:  this.$route.params.docId
      };
      this.com_getDocDataByCaseIdAndDocId(data);

    },
    //保存文书信息
    addDocData(handleType) {

      this.com_addDocData(handleType, 'docForm');
    },
    // 打印
    print() {
      console.log('打印!');
    },
    //提交
    submitData(handleType) {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: this.$route.params.url
      });
    },
    //保存文书信息
    saveData(handleType) {
      this.com_addDocData(handleType, "docForm");
    },
    //是否是完成状态
    isOverStatus() {
      if (this.$route.params.docStatus == '1') {
        this.formOrDocData.showBtn = [false, false, false, false, false, false, false, false, false, true]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    },
    //根据用户的组织机构ID获取复议机构和诉讼机构
    getOrganDetailOptions() {
      let orgId = JSON.parse(window.localStorage.userInfo).id;
      console.log('orgId='+orgId);
      let data = {
        id: orgId
      };
      let _this = this
      getOrganIdApi(data).then(
        res => {
          let orgData = {
            id: res.data.organId
          };

          getOrganDetailApi(orgData).then(
            orgRes => {
                _this.reconsiderationOptions = [
                  {
                    value: 'reconsiderationOrgan1',
                    label: orgRes.data.reconsiderationOrgan1
                  },
                  {
                    value: 'reconsiderationOrgan2',
                    label: orgRes.data.reconsiderationOrgan2
                  }
                ];
                _this.enforcementOptions = [
                  {
                    value: 'enforcementOrgan1',
                    label: orgRes.data.enforcementOrgan1
                  },
                  {
                    value: 'enforcementOrgan2',
                    label: orgRes.data.enforcementOrgan2
                  }
                ];

            });

      });

    },

  },
  mounted() {
    this.getDocDataByCaseIdAndDocId();
    this.getOrganDetailOptions();
  },
  created() {
    this.isOverStatus();
  }
}
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss">
/* @import "@/assets/css/caseHandle/caseDocModle.scss"; */
</style>
