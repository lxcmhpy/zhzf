<!-------长软------->
<template>
   <div class="print_box">
    <div class="print_info" id="enforceDecideDoc-print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">行政强制执行决定书</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
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
              <el-form-item prop="party" :rules="fieldRules('party',propertyFeatures['party'],'',isParty)">
                <!-- <el-input type="textarea" v-model="docData.party"  :maxlength="nameLength" placeholder="\"></el-input> -->
                <el-input
                  type="textarea"
                  v-model="docData.party"
                  v-bind:class="{ over_flow:docData.party.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['party'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>

            </td>
            <td>身份证件号</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyIdNo" :rules="fieldRules('partyIdNo',propertyFeatures['partyIdNo'],validateIDNumber,isParty)">
                <!-- <el-input v-model="docData.partyIdNo" :maxLength='maxLength' placeholder="\"></el-input> -->

                <el-input
                  type="textarea"
                  v-model="docData.partyIdNo"
                  v-bind:class="{ over_flow:docData.partyIdNo.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 2}"
                  maxlength="18"
                  placeholder="\"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyIdNo'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>住址</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyAddress" :rules="fieldRules('partyAddress',propertyFeatures['partyAddress'],'',isParty)">
                <!-- <el-input v-model="docData.partyAddress"  :maxlength="adressLength" placeholder="\"></el-input> -->

                <el-input
                  type="textarea"
                  v-model="docData.partyAddress"
                  v-bind:class="{ over_flow:docData.partyAddress.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="adressLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyAddress'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyTel" :rules="fieldRules('partyTel',propertyFeatures['partyTel'],validatePhone,isParty)">
                <!-- <el-input v-model="docData.partyTel" :maxLength='maxLength' placeholder="\"></el-input> -->

                <el-input
                  v-model="docData.partyTel"
                  :maxLength="maxLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyTel'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="4"> 单位 </td>
            <td>名称</td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item prop="partyName" :rules="fieldRules('partyName',propertyFeatures['partyName'],'',!isParty)">
                <!-- <el-input v-model="docData.partyName" :maxLength='maxLength' placeholder="\"></el-input> -->

                 <el-input
                  v-model="docData.partyName"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyName'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>地址</td>
            <td colspan="4" class="color_DBE4EF">
              <el-form-item prop="partyUnitAddress" :rules="fieldRules('partyUnitAddress',propertyFeatures['partyUnitAddress'],'',!isParty)">
                <!-- <el-input v-model="docData.partyUnitAddress" :maxLength='maxLength' placeholder="\"></el-input> -->

                 <el-input
                  v-model="docData.partyUnitAddress"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitAddress'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyUnitTel" :rules="fieldRules('partyUnitTel',propertyFeatures['partyUnitTel'],validatePhone,!isParty)">
                <!-- <el-input v-model="docData.partyUnitTel" minlength="11" :maxLength='maxLength' placeholder="\"></el-input> -->

                <el-input
                  v-model="docData.partyUnitTel"
                  minlength="11"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitTel'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
            <td> 法定代表人 </td>
            <td class="color_DBE4EF">
              <el-form-item prop="partyManager" :rules="fieldRules('partyManager',propertyFeatures['partyManager'],'',!isParty)">
                <!-- <el-input v-model="docData.partyManager" :maxLength='maxLength' placeholder="\"></el-input> -->

                <el-input
                  v-model="docData.partyManager"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyManager'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              统一社会信用代码
            </td>
            <td colspan="3" class="color_DBE4EF">
              <el-form-item prop="socialCreditCode" :rules="fieldRules('socialCreditCode',propertyFeatures['socialCreditCode'],'',!isParty)">
                <!-- <el-input v-model="docData.socialCreditCode" :maxLength='maxLength' placeholder="\"></el-input> -->

                <el-input
                  v-model="docData.socialCreditCode"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['socialCreditCode'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>

        <p>因你（单位）逾期未履行本机关于
          <span>
            <el-form-item prop="serviceTime" class="pdf_datapick" :rules="fieldRules('serviceTime',propertyFeatures['serviceTime'])">
              <el-date-picker v-model="docData.serviceTime" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd" :disabled="fieldDisabled(propertyFeatures['serviceTime'])">
              </el-date-picker>
            </el-form-item>
          </span>作出的
          <span>
            <el-form-item prop="punishContent"  class="width120" :rules="fieldRules('punishContent',propertyFeatures['punishContent'])">
              <el-input  v-model="docData.punishContent" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['punishContent'])"></el-input>
            </el-form-item>
          </span>决定，决定书案号为
          <span>
            <el-form-item prop="caseNumberCopy" :rules="fieldRules('caseNumberCopy',propertyFeatures['caseNumberCopy'])">
              <el-input  v-model="docData.caseNumberCopy" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['caseNumberCopy'])"></el-input>
            </el-form-item>
          </span>。经本机关催告后，你（单位）在催告期间有转移或隐匿财物迹象的，仍未履行且无正当理由。依据
          <span>
            <el-form-item prop="punishmentBasis"  class="width120" :rules="fieldRules('punishmentBasis',propertyFeatures['punishmentBasis'])">
              <el-input type="textarea" v-model="docData.punishmentBasis"
              v-bind:class="{ over_flow:docData.punishmentBasis.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 3}"
              :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['punishmentBasis'])"></el-input>
            </el-form-item>
          </span>的规定，本机关将立即于
          <span>
            <el-form-item prop="forceTime" class="pdf_datapick" :rules="fieldRules('forceTime',propertyFeatures['forceTime'])">
              <el-date-picker v-model="docData.forceTime" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd" :disabled="fieldDisabled(propertyFeatures['forceTime'])">
              </el-date-picker>
            </el-form-item>
          </span>强制执行：
          <span>
            <el-form-item prop="measureAction"  class="width120" :rules="fieldRules('measureAction',propertyFeatures['measureAction'])">
              <el-input type="textarea" v-model="docData.measureAction"  :maxLength='maxLength'
              v-bind:class="{ over_flow:docData.measureAction.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 3}"
              :disabled="fieldDisabled(propertyFeatures['measureAction'])"
              ></el-input>
            </el-form-item>
          </span>（强制执行方式）。
        </p>
        <p>
          如不服本决定，可以在收到本决定书之日起六十日内向<span>
            <el-form-item prop="reconsiderationOrgan" :rules="fieldRules('reconsiderationOrgan',propertyFeatures['reconsiderationOrgan'])">
              <el-select v-model="docData.reconsiderationOrgan" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['reconsiderationOrgan'])">
                  <el-option v-for="item in reconsiderationOptions" :key="item.value" :label="item.label" :value="item.label">
                  </el-option>
                </el-select>
              <!-- <el-input v-model="docData.reconsiderationOrgan" :maxLength='maxLength' placeholder="\"></el-input> -->
            </el-form-item>
          </span>申请行政复议或者在六个月内依法向<span>
            <el-form-item prop="enforcementOrgan" :rules="fieldRules('enforcementOrgan',propertyFeatures['enforcementOrgan'])">
              <el-select v-model="docData.enforcementOrgan" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['enforcementOrgan'])">
                  <el-option v-for="item in enforcementOptions" :key="item.value" :label="item.label" :value="item.label">
                  </el-option>
                </el-select>
              <!-- <el-input v-model="docData.enforcementOrgan" :maxLength='maxLength' placeholder="\"></el-input> -->
            </el-form-item>
          </span>人民法院提起行政诉讼。
        </p>

        <div class="pdf_seal">
          <span>交通运输执法部门(印章)</span><br>
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
    <!-- <div class="float-btns">
      <el-button type="success" @click="print">
        <svg t="1577706357599" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2136" width="16" height="16">
          <path d="M153.6 0h716.8v102.4H153.6zM0 153.6v614.4h153.6v256h716.8v-256h153.6V153.6z m768 768H256v-307.2h512z m153.6-563.2h-153.6V256h153.6z" p-id="2137" fill="#FFFFFF"></path>
        </svg>
        <br>
        打印
      </el-button>
      <el-button type="success">
        <svg t="1577706400265" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3033" width="16" height="16">
          <path d="M946.176 896a34.304 34.304 0 0 1 0 68.608H77.824a34.304 34.304 0 0 1 0-68.608h868.352z m0-622.08L401.92 818.176 189.44 839.68l21.504-211.968 473.088-473.088 71.168-71.168c31.744-31.744 87.552-31.744 119.296 0l71.168 71.168c15.872 15.872 24.576 37.376 24.576 59.904 0.512 22.016-8.192 43.52-24.064 59.392zM266.24 762.88l103.936-10.752 431.616-431.616-93.696-93.696L276.48 658.432 266.24 762.88zM815.104 127.488c-4.096 0-8.192 1.536-11.264 4.608l-46.592 46.592 93.696 93.696 46.592-46.592c6.144-6.144 6.144-16.384 0-22.528l-71.168-71.168c-3.072-3.072-7.168-4.608-11.264-4.608z" p-id="3034" fill="#FFFFFF"></path>
        </svg>
        <br>
        编辑
      </el-button>
      <el-button type="success" @click="makeSeal">
        <svg t="1577706320726" class="icon" viewBox="0 0 1052 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1274" width="16" height="16">
          <path d="M615.822222 597.674667c-20.48-18.744889-33.194667-48.981333-33.194666-77.539556 0-27.107556 11.52-51.683556 30.208-70.115555a1.905778 1.905778 0 0 1 0.483555-0.227556c6.314667-6.229333 13.454222-11.776 21.248-16.412444a162.872889 162.872889 0 0 0 54.812445-121.571556c0-91.079111-75.121778-164.892444-167.822223-164.892444-92.728889 0-167.879111 73.813333-167.879111 164.892444 0 48.184889 21.219556 91.477333 54.840889 121.571556 7.822222 4.636444 14.904889 10.183111 21.276445 16.412444a0.995556 0.995556 0 0 1 0.341333 0.170667c18.830222 18.488889 30.293333 43.064889 30.293333 70.172444 0 28.558222-12.714667 58.794667-33.166222 77.539556h-246.613333c-13.368889 0-24.206222 10.609778-24.206223 23.665777v152.092445h730.168889v-152.092445a23.893333 23.893333 0 0 0-24.177777-23.665777h-246.613334z m-407.210666 227.271111H834.56v52.138666H208.611556v-52.138666z" fill="#FFFFFF" p-id="1275"></path>
        </svg>
        <br>
        签章
      </el-button>
      <el-button type="primary" @click="addDocData(1)">
        <svg t="1577414377979" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1726" width="16" height="16">
          <path d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z" p-id="1727" fill="#FFFFFF"></path>
        </svg><br>
        提交
      </el-button>
    </div> -->
    <!-- 悬浮按钮 -->
    <casePageFloatBtns :pageDomId="'enforceDecideDoc-print'" :formOrDocData="formOrDocData" @submitData="submitData" @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>

    <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput>
  </div>
</template>
<script>
import overflowInput from "./overflowInput";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { getOrganDetailApi, getOrganIdApi } from "@/api/system";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import { validatePhone,validateIDNumber  } from "@/common/js/validator";

export default {
  components: {
    overflowInput,
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId']) },
  data() {
    return {
      validatePhone:validatePhone,
      validateIDNumber :validateIDNumber,
      docData: {
        caseNumber: '',
        party: '',
        partyIdNo: '',
        partyAddress: '',
        partyTel: '',
        partyName: '',
        partyUnitAddress: '',
        partyUnitTel: '',
        partyManager: '',
        socialCreditCode: '',
        serviceTime: '',
        punishContent: '',
        caseNumberCopy: '',
        punishmentBasis: '',
        forceTime: '',
        measureAction: '',
        reconsiderationOrgan: '',
        enforcementOrgan: '',
        makeDate: '',
      },
      handleType: 0, //0  暂存     1 提交
       caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseDoctypeId: this.$route.params.docId, //文书类型ID
        //文书数据
        docData: "",
        status: "" ,//提交状态
        linkTypeId:this.$route.params.caseLinkTypeId
      },
      name: '',
      inputInfo: '',
      inputInfos: '',
      illegalFactsEvidence: '',
      value1: '',
      rules: {
        party: [
          { required: true, message: '当事人姓名不能为空', trigger: 'blur' },
        ],
        partyAddress: [
          { required: true, message: '当事人地址不能为空', trigger: 'blur' },
        ],
        partyIdNo: [
          { required: true, message: '身份证号码不能为空', trigger: 'blur' },
          { validator:validateIDNumber , trigger: "blur"}
        ],
        partyTel: [
          { required: true, message: '当事人联系电话不能为空', trigger: 'blur' },
          { validator:validatePhone , trigger: "blur" }
        ],
        partyName: [
          { required: true, message: '单位名称不能为空', trigger: 'blur' },
        ],
        partyUnitAddress: [
          { required: true, message: '单位地址不能为空', trigger: 'blur' },
        ],
        partyUnitTel: [
          { required: true, message: '单位联系电话不能为空', trigger: 'blur' },
          { validator:validatePhone , trigger: "blur" }
        ],
        partyManager: [
          { required: true, message: '法人不能为空', trigger: 'blur' },
        ],
        socialCreditCode: [
          { required: true, message: '社会信用代码不能为空', trigger: 'blur' },
        ],
        serviceTime: [
          { required: true, message: '决定时间必须填写', trigger: 'blur' },
        ],
        caseNumberCopy: [
          { required: true, message: '决定书案号不能为空', trigger: 'blur' },
        ],
        punishmentBasis: [
          { required: true, message: '处罚依据必须输入', trigger: 'blur' },
        ],
        forceTime: [
          { required: true, message: '强制执行时间必须填写', trigger: 'blur' },
        ],
        measureAction: [
          { required: true, message: '强制执行方式必须填写', trigger: 'blur' },
        ],
        reconsiderationOrgan: [
          { required: true, message: '行政复议机构必须填写', trigger: 'blur' },
        ],
        enforcementOrgan: [
          { required: true, message: '行政诉讼机构必须填写', trigger: 'blur' },
        ],

      },
      nameLength: 23,
      adressLength: 23,
      maxLength: 23,
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: 'enforceDecideDoc-print',
      },
      isParty: true, //当事人类型为个人
      originalData:"",
      reconsiderationOptions : [],
      enforcementOptions : [],
      propertyFeatures:''
    }
  },
   methods: {

    //根据案件ID和文书Id获取数据
     getDocDataByCaseIdAndDocId() {
       this.caseDocDataForm.caseBasicinfoId = this.caseId;
       let data = {
         caseId: this.caseId,
         docId: this.$route.params.docId
       };
       this.com_getDocDataByCaseIdAndDocId(data)
     },
    //保存文书信息
    // addDocData(handleType) {
    //
    //   this.com_addDocData(handleType, 'docForm');
    // },
      // 打印
    print() {
      console.log('打印!');
    },
    // 多行编辑
    overFlowEdit() {
      this.$refs.overflowInputRef.showModal(0, '', this.maxLengthOverLine);
    },
    // 获取多行编辑内容
    getOverFloeEditInfo(edit) {
      this.docData.illegalFactsEvidence = edit;
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

      getOrganIdApi(data).then(
        res => {
          let orgData = {
            id: res.data.organId
          };
          let _this = this
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
