<!-------长软------->
<template>
  <div class="print_box">
    <div class="print_info" id="enforceInsteadDoc-print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">代履行决定书</div>
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
              <el-form-item prop="party">
                <!-- <el-input type="textarea" v-model="docData.party"  :maxlength="nameLength" placeholder="\"></el-input> -->
                <el-input
                  type="textarea"
                  v-model="docData.party"
                  v-bind:class="{ over_flow:docData.party.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  disabled
                  placeholder="\"
                ></el-input>
              </el-form-item>

            </td>
            <td>身份证件号</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyIdNo">
                <!-- <el-input v-model="docData.partyIdNo" :maxLength='maxLength' placeholder="\"></el-input> -->

                <el-input v-model="docData.partyIdNo"
                  type="textarea"
                  v-bind:class="{ over_flow:docData.partyIdNo.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 2}"
                  maxlength="18"
                  placeholder="\"
                  :disabled="isParty &&!originalData.partyIdNo? false : true"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>住址</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyAddress">
                <!-- <el-input v-model="docData.partyAddress"  :maxlength="adressLength" placeholder="\"></el-input> -->

                <el-input
                  type="textarea"
                  v-model="docData.partyAddress"
                  v-bind:class="{ over_flow:docData.partyAddress.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="adressLength"
                  :disabled="isParty  && !originalData.partyAddress ? false : true"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyTel">
                <!-- <el-input v-model="docData.partyTel" :maxLength='maxLength' placeholder="\"></el-input> -->

                <el-input
                  v-model="docData.partyTel"
                  :maxLength="maxLength"
                  :disabled="isParty && !originalData.partyTel ? false : true"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="4"> 单位 </td>
            <td>名称</td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item prop="partyName">
                <!-- <el-input v-model="docData.partyName" :maxLength='maxLength' placeholder="\"></el-input> -->

                 <el-input
                  v-model="docData.partyName"
                  :maxLength="maxLength"
                  disabled
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>地址</td>
            <td colspan="4" class="color_DBE4EF">
              <el-form-item prop="partyUnitAddress">
                <!-- <el-input v-model="docData.partyUnitAddress" :maxLength='maxLength' placeholder="\"></el-input> -->

                 <el-input
                  v-model="docData.partyUnitAddress"
                  :maxLength="maxLength"
                  :disabled="!isParty && !originalData.partyUnitAddress ? false : true"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyUnitTel">
                <!-- <el-input v-model="docData.partyUnitTel" minlength="11" :maxLength='maxLength' placeholder="\"></el-input> -->

                <el-input
                  v-model="docData.partyUnitTel"
                  minlength="11"
                  :maxLength="maxLength"
                  :disabled="!isParty && !originalData.partyUnitTel ? false : true"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
            <td> 法定代表人 </td>
            <td class="color_DBE4EF">
              <el-form-item prop="partyManager">
                <!-- <el-input v-model="docData.partyManager" :maxLength='maxLength' placeholder="\"></el-input> -->

                <el-input
                  v-model="docData.partyManager"
                  :maxLength="maxLength"
                  :disabled="!isParty && !originalData.partyManager ? false : true"
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
              <el-form-item prop="socialCreditCode">
                <!-- <el-input v-model="docData.socialCreditCode" :maxLength='maxLength' placeholder="\"></el-input> -->

                <el-input
                  v-model="docData.socialCreditCode"
                  :maxLength="maxLength"
                  :disabled="!isParty && !originalData.socialCreditCode ? false : true"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>

        <p>因你（单位）
          <span>
            <el-form-item prop="illegalFact">
              <el-input v-model="docData.illegalFact" :maxLength='maxLength' v-bind:class="{ over_flow:docData.illegalFact && docData.illegalFact.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 3}" style="width:450px;"></el-input>
            </el-form-item>
          </span>，
        </p>
        <p>
          <input type="checkbox" name="measure" value="1" v-model="checknames" @change="click">1.本机关于
          <span>
            <el-form-item :prop="disabledOne?'':'serviceTime'" class="pdf_datapick">
              <el-date-picker v-model="docData.serviceTime" v-bind:disabled="disabledOne" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日">
              </el-date-picker>
            </el-form-item>
          </span>作出了
          <span>
            <el-form-item prop="punishDecision"  class="width120">
              <el-input v-model="docData.punishDecision" 
              type="textarea"
              v-bind:class="{ over_flow:docData.punishDecision.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 3}" v-bind:disabled="disabledOne" :maxLength='maxLength'></el-input>
            </el-form-item>
          </span>决定，决定书案号为
          <span>
            <el-form-item prop="caseNumberCopy">
              <el-input v-model="docData.caseNumberCopy" v-bind:disabled="disabledOne" :maxLength='maxLength'></el-input>
            </el-form-item>
          </span>。经本机关催告后仍不履行，因其后果已经或者将危害交通安全、造成环境污染或者破坏自然资源。依据《中华人民共和国行政强制法》第五十条以及
          <span>
            <el-form-item :prop="disabledOne?'':'punishBasisOne'">
              <el-input v-model="docData.punishBasisOne"
              type="textarea"
              v-bind:class="{ over_flow:docData.punishBasisOne.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 3}"
              v-bind:disabled="disabledOne" :maxLength='maxLength'></el-input>
            </el-form-item>
          </span>的规定，
        </p>
        <p>
          <input type="checkbox" name="measure" value="2" v-model="checknames" @change="click">2.需要立即清除道路、河道、航道或者公共场所的遗洒物、障碍物或者污染物，因你（单位）不能清除，依据《中华人民共和国行政强制法》第五十二条以及
          <span>
            <el-form-item :prop="disabledTwo?'':'punishBasisTwo'"  class="width120">
              <el-input v-model="docData.punishBasisTwo"
              type="textarea"
              v-bind:class="{ over_flow:docData.punishBasisTwo.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 3}"
              v-bind:disabled="disabledTwo" :maxLength='maxLength'></el-input>
            </el-form-item>
          </span>的规定，
        </p>
        <p>
          本机关依法作出代履行决定如下：
        </p>
        <p>
          1.代履行人 ：<input type="checkbox" name="people" value="1" v-model="peoples" @change="clickPeople">本机关
                      <input type="checkbox" name="people" value="2" v-model="peoples" @change="clickPeople">第三人：
          <span>
            <el-form-item :prop="disabledThree?'':'impleAgent'">
              <el-input v-model="docData.impleAgent"  v-bind:disabled="disabledThree" :maxLength='maxLength'></el-input>
            </el-form-item>
          </span>
        </p>
        <p>
          2.代履行标的：
          <span>
            <el-form-item prop="impleIndex">
              <el-input v-model="docData.impleIndex" 
              type="textarea"
              v-bind:class="{ over_flow:docData.impleIndex.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 3}"
              :maxLength='maxLength'></el-input>
            </el-form-item>
          </span>
        </p>
        <p>
          3.代履行时间和方式：
          <span>
            <el-form-item prop="impleTimeAndWay">
              <el-input v-model="docData.impleTimeAndWay" 
              type="textarea"
              v-bind:class="{ over_flow:docData.impleTimeAndWay.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 3}"
              :maxLength='maxLength'></el-input>
            </el-form-item>
          </span>
        </p>
        <p>
          4.代履行费用（预算）：
          <span>
            <el-form-item prop="impleFee">
              <el-input v-model="docData.impleFee" 
              type="textarea"
              v-bind:class="{ over_flow:docData.impleFee.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 3}"
              :maxLength='maxLength'></el-input>
            </el-form-item>
          </span>请你（单位）在收到本决定书后
          <span>
            <el-form-item prop="noticeTime">
              <el-input v-model="docData.noticeTime" 
              type="textarea"
              v-bind:class="{ over_flow:docData.noticeTime.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 3}"
              :maxLength='maxLength'></el-input>
            </el-form-item>
          </span>日内预付代履行预算费用（开户行:
          <span>
            <el-form-item prop="bank">
              <el-input v-model="docData.bank" 
              type="textarea"
              v-bind:class="{ over_flow:docData.bank.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 3}"
              :maxLength='maxLength'></el-input>
            </el-form-item>
          </span>账号：
          <span>
            <el-form-item prop="bankAccount">
              <el-input v-model="docData.bankAccount" 
              type="textarea"
              v-bind:class="{ over_flow:docData.bankAccount.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 3}"
              :maxLength='maxLength'></el-input>
            </el-form-item>
          </span>）。代履行费用据实决算后，多退少补。
        </p>
        <p>
          如不服本决定，可以在收到本决定书之日起六十日内向
          <span>
            <el-form-item prop="reconsiderOrgan">
              <el-select v-model="docData.reconsiderOrgan" :maxLength='maxLength'>
                  <el-option v-for="item in reconsiderationOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
              </el-select>
              <!-- <el-input v-model="docData.reconsiderOrgan" :maxLength='maxLength' placeholder="\"></el-input> -->
            </el-form-item>
          </span>申请行政复议或者在六个月内依法向
          <span>
            <el-form-item prop="enforceOrgan">
              <el-select v-model="docData.enforceOrgan" :maxLength='maxLength'>
                  <el-option v-for="item in enforcementOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
              </el-select>
              <!-- <el-input v-model="docData.enforceOrgan" :maxLength='maxLength' placeholder="\"></el-input> -->
            </el-form-item>
          </span>人民法院提起行政诉讼。
        </p>

        <div class="pdf_seal">
          <span @click='makeSeal'>交通运输执法部门(印章)</span><br>
          <el-form-item prop="makeDate" class="pdf_datapick">
            <el-date-picker v-model="docData.makeDate" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日">
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
    <casePageFloatBtns :pageDomId="'enforceInsteadDoc-print'" :formOrDocData="formOrDocData" @submitData="submitData" @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>

    <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput>
  </div>
</template>
<script>
import overflowInput from "./overflowInput";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { getOrganDetailApi, getOrganIdApi } from "@/api/system";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
// import signture from "../../../../js/signture";
import mySignture from "@/common/js/mySignture";

export default {
  components: {
    overflowInput,
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId']) },
  data() {
    return {
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

        illegalFact: '',
        serviceTime: '',
        punishDecision: '',
        caseNumberCopy: '',

        punishBasisOne: '',
        punishBasisTwo: '',
        impleAgent: '',
        impleIndex: '',
        impleTimeAndWay: '',
        impleFee: '',
        noticeTime: '',
        bank: '',
        bankAccount: '',
        reconsiderOrgan: '',
        enforceOrgan: '',
        makeDate: '',
      },
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseDoctypeId: this.$route.params.docId, //文书类型ID
        //文书数据
        docData: "",
        status: "" //提交状态
      },
      name: '',
      inputInfo: '',
      inputInfos: '',
      illegalFactsEvidence: '',
      value1: '',
      isParty: true, //当事人类型为个人
      originalData:"",
      rules: {
        serviceTime: [
          { required: true, message: '请输入决定时间', trigger: 'blur' },
        ],
        punishBasisOne: [
          { required: true, message: '请输入处罚依据', trigger: 'blur' },
        ],
        punishBasisTwo: [
          { required: true, message: '请输入处罚依据', trigger: 'blur' },
        ],
        impleIndex: [
          { required: true, message: '请输入代履行标的', trigger: 'blur' },
        ],
        impleTimeAndWay: [
          { required: true, message: '请输入代履行方式和时间', trigger: 'blur' },
        ],
        impleFee: [
          { required: true, message: '请输入代履行费用', trigger: 'blur' },
        ],
        noticeTime: [
          { required: true, message: '请输入履行期限', trigger: 'blur' },
        ],
        bank: [
          { required: true, message: '请输入开户行', trigger: 'blur' },
        ],
        bankAccount: [
          { required: true, message: '请输入银行账号', trigger: 'blur' },
        ],
        reconsiderOrgan: [
          { required: true, message: '请输入行政复议机构', trigger: 'blur' },
        ],
        enforceOrgan: [
          { required: true, message: '请输入行政诉讼机构', trigger: 'blur' },
        ],
        impleAgent: [
          { required: true, message: '请输入代履行人', trigger: 'blur' },
        ],
      },
      nameLength: 23,
      adressLength: 23,
      maxLength: 23,
      maxLengthOverLine: 122,
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: 'enforceInsteadDoc-print',
      },
      checknames: [],
      disabledOne: true,
      disabledTwo: true,
      peoples: [],
      disabledThree: true,
      reconsiderationOptions : [],
      enforcementOptions : [],
    }
  },
   methods: {
    // onSubmit(formName) {
    //   console.log('submit!');
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert('submit!');
    //     } else {
    //       console.log('error submit!!');
    //       return false;
    //     }
    //   });
    // },
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

    //   this.com_addDocData(handleType, 'docForm');
    // },
    // 盖章
    makeSeal() {
      console.log('盖章!');
      mySignture.openURL('oeder');
    },
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
    click(){
      if(this.checknames.length > 1){
        this.checknames.shift();
      }
      if(this.checknames == '1'){
        this.disabledOne = false;
        this.disabledTwo = true;
      }else if(this.checknames == '2'){
        this.disabledOne = true;
        this.disabledTwo = false;
      }else{
        this.disabledOne = true;
        this.disabledTwo = true;
      }
    },
    clickPeople(){
      if(this.peoples.length > 1){
        this.peoples.shift();
      }
      if(this.peoples == '1'){
        this.disabledThree = true;
      }else if(this.peoples == '2'){
        this.disabledThree = false;
      }else{
        this.disabledThree = true;
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
<style lang="scss">
@import "@/assets/css/caseHandle/caseDocModle.scss";
</style>
