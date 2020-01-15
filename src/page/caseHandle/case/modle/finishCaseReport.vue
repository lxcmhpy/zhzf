<template>
  <div class="print_box">
    <div class="print_info">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="formData">
        <div class="doc_topic">结案报告</div>
        <div class="doc_number">案号：{{formData.caseNumber}}</div>
        <div class="doc_cause">案由：
            <!-- {{formData.caseName}} -->
            <el-form-item prop="caseName">
                <el-input type='textarea'  v-model="formData.caseName" v-bind:class="{ over_flow:formData.caseName.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>
        </div>
        <!-- <el-button @click="onSubmit('docForm')">formName</el-button> -->
        <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td rowspan="5">
              <p>当事人</p>
              <p>基本情</p>
              <p class="center_similar">况</p>
            </td>
            <td> 个人 </td>
            <td class="color_DBE4EF">
              <el-form-item prop="party">
                <el-input type='textarea' v-model="formData.party" v-bind:class="{ over_flow:formData.party.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td> 年龄 </td>
            <td class="color_DBE4EF">
              <el-form-item prop="partyAge" style="width:110px">
                <el-input type='textarea' v-model="formData.partyAge" v-bind:class="{ over_flow:formData.partyAge.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td> 性别 </td>
            <td class="color_DBE4EF">
              <el-form-item prop="partySex">
                <el-input type='textarea' v-model="formData.partySex" v-bind:class="{ over_flow:formData.partySex.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td> 所在单位 </td>
            <td class="color_DBE4EF">
              <el-form-item prop="partyUnitPosition">
                <el-input type='textarea' v-model="formData.partyUnitPosition" v-bind:class="{ over_flow:formData.partyUnitPosition.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td> 联系地址 </td>
            <td colspan="3" class="color_DBE4EF">
              <el-form-item prop="partyAddress">
                <el-input type='textarea' v-model="formData.partyAddress" v-bind:class="{ over_flow:formData.partyAddress.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td> 联系电话 </td>
            <td class="color_DBE4EF">
              <el-form-item prop="partyTel">
                <el-input type='textarea' v-model="formData.partyTel" v-bind:class="{ over_flow:formData.partyTel.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td> 邮编 </td>
            <td colspan="3" class="color_DBE4EF">
              <el-form-item prop="partyZipCode">
                <el-input type='textarea' v-model="formData.partyZipCode" v-bind:class="{ over_flow:formData.partyZipCode.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td> 单位 </td>
            <td class="color_DBE4EF">
              <el-form-item prop="partyName">
                <el-input type='textarea' v-model="formData.partyName" v-bind:class="{ over_flow:formData.partyName.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td> 地址 </td>
            <td colspan="3" class="color_DBE4EF">
              <el-form-item prop="partyUnitAddress">
                <el-input type='textarea' v-model="formData.partyUnitAddress" v-bind:class="{ over_flow:formData.partyUnitAddress.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td> 法定代表人</td>
            <td class="color_DBE4EF">
              <el-form-item prop="partyManager">
                <el-input type='textarea' v-model="formData.partyManager" v-bind:class="{ over_flow:formData.partyManager.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td> 职务 </td>
            <td colspan="3" class="color_DBE4EF">
              <el-form-item prop="partyManagerPositions">
                <el-input type='textarea' v-model="formData.partyManagerPositions" v-bind:class="{ over_flow:formData.partyManagerPositions.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <p class="center_similar">处</p>
              <p class="center_similar">理</p>
              <p class="center_similar">结</p>
              <p class="center_similar">果</p>
            </td>
            <td colspan="6" class="color_DBE4EF">
              <el-form-item prop="closeResult">
                <el-input type='textarea' v-model="formData.closeResult"  :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <p>执行</p>
              <p>情况</p>
            </td>
            <td colspan="6" class="color_DBE4EF">
              <el-form-item prop="closeSituation">
                <el-input type='textarea' v-model="formData.closeSituation"  :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <p>经办机</p>
              <p>构负责</p>
              <p>人意见</p>
            </td>
            <td colspan="6" class="color_DBE4EF">
              <el-form-item prop="leadOpinion">
                <el-input type='textarea' v-model="formData.leadOpinion" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>
              <div class="pdf_seal">
                <p>签名：</p>
                <p>
                  时间:<el-form-item prop="makeDate" class="pdf_datapick">
                    <el-date-picker v-model="formData.makeDate" format="yyyy年MM月dd日" placeholder="    年  月  日" clear-icon='el-icon-circle-close'>
                    </el-date-picker>
                  </el-form-item>
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <p>负责人</p>
              <p>审批</p>
              <p>意见</p>
            </td>
            <td colspan="6" class="color_DBE4EF">
              <el-form-item prop="approvalOpinion">
                <el-input type='textarea' v-model="formData.approvalOpinion"  :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>
              <div class="pdf_seal">
                <p>签名：</p>
                <p>
                  时间:<el-form-item prop="makeDate" class="pdf_datapick">
                    <el-date-picker v-model="formData.makeDate" format="yyyy年MM月dd日" placeholder="    年  月  日" clear-icon='el-icon-circle-close'>
                    </el-date-picker>
                  </el-form-item>
                </p>
              </div>
            </td>
          </tr>

        </table>
      </el-form>
    </div>
    <!-- 悬浮按钮 -->
    <div class="float-btns">
        <el-button type="success" @click="submitCaseDoc(0)" v-if="!approval">
          <svg t="1577415780823" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2584" width="16" height="16">
            <path d="M98 124.1V902c0 14.3 11.6 25.9 25.9 25.9h777.9c14.3 0 25.9-11.6 25.9-25.9V124.1c0-14.3-11.6-25.9-25.9-25.9H123.9c-14.3 0-25.9 11.6-25.9 25.9z m207.4 37.6h414.9v191.7H305.4V161.7z m558.8 702.7H162.6V161.7h104v230.6h492.7V161.7h105v702.7z" p-id="2585" fill="#FFFFFF"></path>
            <path d="M605.1 191.9h70v128h-70z" p-id="2586" fill="#FFFFFF"></path>
          </svg>
          <br>
          暂存</el-button>
        <el-button type="primary" @click="showApprovePeopleList" v-if="!approval">
          <svg t="1577414377979" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1726" width="16" height="16">
            <path d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z" p-id="1727" fill="#FFFFFF" />
          </svg>
          <br />提交审批
        </el-button>
        <el-button type="primary" @click="showApproval" v-if="approval">
          <svg t="1577414377979" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1726" width="16" height="16">
            <path d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z" p-id="1727" fill="#FFFFFF" />
          </svg>
          <br />审批
        </el-button>
      <!-- <el-button type="success" @click="print">
        <svg t="1577706357599" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2136" width="16" height="16">
          <path d="M153.6 0h716.8v102.4H153.6zM0 153.6v614.4h153.6v256h716.8v-256h153.6V153.6z m768 768H256v-307.2h512z m153.6-563.2h-153.6V256h153.6z" p-id="2137" fill="#FFFFFF"></path>
        </svg>
        <br>
        打印
      </el-button> -->
      <!-- <el-button type="success" @click="changeLineStyle">
        <svg t="1577706400265" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3033" width="16" height="16">
          <path d="M946.176 896a34.304 34.304 0 0 1 0 68.608H77.824a34.304 34.304 0 0 1 0-68.608h868.352z m0-622.08L401.92 818.176 189.44 839.68l21.504-211.968 473.088-473.088 71.168-71.168c31.744-31.744 87.552-31.744 119.296 0l71.168 71.168c15.872 15.872 24.576 37.376 24.576 59.904 0.512 22.016-8.192 43.52-24.064 59.392zM266.24 762.88l103.936-10.752 431.616-431.616-93.696-93.696L276.48 658.432 266.24 762.88zM815.104 127.488c-4.096 0-8.192 1.536-11.264 4.608l-46.592 46.592 93.696 93.696 46.592-46.592c6.144-6.144 6.144-16.384 0-22.528l-71.168-71.168c-3.072-3.072-7.168-4.608-11.264-4.608z" p-id="3034" fill="#FFFFFF"></path>
        </svg>
        <br>
        生成
      </el-button> -->
      <!-- <el-button type="success" @click="edit">
        <svg t="1577706400265" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3033" width="16" height="16">
          <path d="M946.176 896a34.304 34.304 0 0 1 0 68.608H77.824a34.304 34.304 0 0 1 0-68.608h868.352z m0-622.08L401.92 818.176 189.44 839.68l21.504-211.968 473.088-473.088 71.168-71.168c31.744-31.744 87.552-31.744 119.296 0l71.168 71.168c15.872 15.872 24.576 37.376 24.576 59.904 0.512 22.016-8.192 43.52-24.064 59.392zM266.24 762.88l103.936-10.752 431.616-431.616-93.696-93.696L276.48 658.432 266.24 762.88zM815.104 127.488c-4.096 0-8.192 1.536-11.264 4.608l-46.592 46.592 93.696 93.696 46.592-46.592c6.144-6.144 6.144-16.384 0-22.528l-71.168-71.168c-3.072-3.072-7.168-4.608-11.264-4.608z" p-id="3034" fill="#FFFFFF"></path>
        </svg>
        <br>
        编辑
      </el-button> -->
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

    </div>
    <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput>
       <!-- 提交审批 -->
    <showApprovePeople ref="showApprovePeopleRef"></showApprovePeople>
    <!-- 审批 -->
    <approvalDialog ref="approvalDialogRef" @getNewData="setFormData"></approvalDialog>
  </div>
</template>
<script>
import showApprovePeople from "../../components/showApprovePeople";
import approvalDialog from "../../components/approvalDialog";
import overflowInput from "./overflowInput";
import { mixinGetCaseApiList } from "@/js/mixins";
import { mapGetters } from "vuex";
export default {
  components: {
    overflowInput,
    showApprovePeople,
    approvalDialog
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId']) },
  data() {
    return {
      isOverflow: false,
      // isOverLine: false,
      formData: {
        caseName: '',
        party: '',
        partyIdNo: '',
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
        note: "",
        party: "",
        partySex: "",
        partyAge: "",
        partyManager: "",
        socialCreditCode: "",
        caseBasicInfo: "",
        caseReplay: "",
        partyUnitPosition: "",
        partyZipCode: "",
        partyManagerPositions: "",
        closeResult: "",
        approvalOpinion: "",
        leadOpinion: "",
        closeSituation: "",
      },
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: '297708bcd8e80872febb61577329194f', //案件id--从流程进入删掉，先写死测试用
        caseLinktypeId: "2c9029d56c8f7b66016c8f8043c90001", //表单类型IDer
        //表单数据
        formData: {},
        status: ""
      },
      name: '',
      illegalFactsEvidence: '',
      value1: '',
      rules: {
        test: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        party: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        partyIdNo: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        partyAddress: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        partyTel: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        partyName: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        partyUnitAddress: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        partyUnitTel: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        partyManager: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        punishLaw: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        socialCreditCode: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        illegalFactsEvidence: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        reconsiderationOrgan: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],

      },
      nameLength: 23,
      adressLength: 23,
      maxLength: 23,
      lineStyleFlag: false,
       approval: this.$route.params.isApproval ? true : false //   是否是审批人员进入
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
     //加载表单信息
    setFormData(){
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(this.caseLinkDataForm.caseBasicinfoId,this.caseLinkDataForm.caseLinktypeId,'form');
    },
    submitCaseDoc(handleType) {
      //参数  提交类型 、formRef  、 跳转的pdf路由name
      this.com_submitCaseForm(handleType,'finishReportForm',true);
    },
    showApprovePeopleList() {
      let data = {
        caseId: this.caseId,
        caseLinktypeId: "2c9029ee6cac9281016cacaadf990006"
      };
      this.$refs.showApprovePeopleRef.showModal(data);
    },
    //审批弹窗
    showApproval(){
      //二级审批(经办机构负责人审批、部门负责人审批)
      console.log(this.formData);
      let approvePeo = this.formData.approvePeo ? this.formData.approvePeo : '';
      let caseData={
        caseId:this.caseId,
        caseLinktypeId:"2c9029ee6cac9281016cacaadf990006",
        firstApproval:approvePeo,
        approvalNumber:2 //2次审批
      }
      this.$refs.approvalDialogRef.showModal(caseData);
    },
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
        caseId: '297708bcd8e80872febb61577329194f', //先写死
        docId: '5cad5b54eb97a15250672a4c397cee56'
      };
      this.com_getDocDataByCaseIdAndDocId(data);

    },
    //保存文书信息
    addDocData(handleType) {

      this.com_addDocData(handleType, 'docForm');
    },
    // 盖章
    makeSeal() {
      console.log('盖章!');
    },
    // 打印
    print() {
      console.log('打印!');
    },
    // 多行编辑
    overFlowEdit() {
      this.$refs.overflowInputRef.showModal(0, '');
    },
    // 获取多行编辑内容
    getOverFloeEditInfo(edit) {
      this.formData.illegalFactsEvidence = edit;
    },
    // 下划线版本
    changeLineStyle() {
      this.lineStyleFlag = true;
    },
    // 下划线版本
    edit() {
      this.lineStyleFlag = false;
    },
  },
  created() {
    this.getDocDataByCaseIdAndDocId()
  }
}
</script>
<style lang="less" >
@import "../../../../css/caseHandle/caseDocModle.less";
</style>