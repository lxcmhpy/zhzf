<!-------长软------->
<template>
  <div class="print_box">
    <div class="print_info" id="hearingNoticeDoc_print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">听证通知书</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <p class="p_begin">
          当事人（个人姓名或单位名称）
          <span>
            <el-form-item prop="party">
              <el-input v-model="docData.party" :maxLength='maxLength' disabled></el-input>
            </el-form-item>
          </span>:
        </p>
        <p>
          根据你（单位）申请，关于
          <span>
            <el-form-item style="width:329px" prop="caseName">
              <el-input type="textarea" v-model="docData.caseName" :maxLength='maxLength'
                        v-bind:class="{ over_flow:docData.caseName.length>30?true:false }"
                        :autosize="{ minRows: 1, maxRows: 3}" disabled></el-input>
            </el-form-item>
          </span>一案，现定于
          <span>
            <el-form-item style="width:136px" prop="hearingTime" class="pdf_datapick listen_data">
              <el-date-picker v-model="docData.hearingTime" type="datetime" format="yyyy年MM月dd日 HH时"
                              placeholder="    年  月  日  时">
              </el-date-picker>
            </el-form-item>
          </span>在
          <span>
            <el-form-item prop="hearingPlace" style="width:379px">
              <el-input v-model="docData.hearingPlace" :maxLength='maxLength'></el-input>
            </el-form-item>
          </span>（
          <span class="single_check">
            <el-form-item prop="radio">
              <el-radio v-model="docData.radio" label="1">公开</el-radio>
              <el-radio v-model="docData.radio" label="2">不公开</el-radio>
            </el-form-item>

          </span>）举行听证会议，请准时出席。
        </p>
        <p class="p_begin">
          听证主持人姓名：
          <span>
            <el-form-item prop="presidingHearer">
              <el-input v-model="docData.presidingHearer" :maxLength='maxLength'></el-input>
            </el-form-item>
          </span>
          职务：
          <span>
            <el-form-item prop="presidingHearerPosition" class="width235">
              <el-input v-model="docData.presidingHearerPosition" :maxLength='maxLength'></el-input>
            </el-form-item>
          </span>
        </P>
        <p class="p_begin">
          听证员姓名：
          <span>
            <el-form-item prop="hearingOfficer" class="width220">
              <el-input v-model="docData.hearingOfficer" :maxLength='maxLength'></el-input>
            </el-form-item>
          </span>
          职务：
          <span>
            <el-form-item prop="hearingOfficerPosition" class="width235">
              <el-input v-model="docData.hearingOfficerPosition" :maxLength='maxLength'></el-input>
            </el-form-item>
          </span>
        </P>
        <p class="p_begin">
          记录员姓名：
          <span>
            <el-form-item prop="recorderSix" class="width220">
              <el-input v-model="docData.recorderSix" :maxLength='maxLength'></el-input>
            </el-form-item>
          </span>
          职务：
          <span>
            <el-form-item prop="recorderPositionSix" class="width235">
              <el-input v-model="docData.recorderPositionSix" :maxLength='maxLength'></el-input>
            </el-form-item>
          </span>
        </P>
        <p>
          根据《中华人民共和国行政处罚法》第四十二条规定，你（单位）可以申请听证主持人、听证员、记录员回避。
        </p>
        <p>
          注意事项如下：
        </p>
        <p>
          1.请事先准备相关证据，通知证人和委托代理人准时参加。
        </p>
        <p>
          2.委托代理人参加听证的，应当在听证会前向本机关提交授权委托书等有关证明。
        </p>
        <p>
          3.申请延期举行的，应当在举行听证会前向本行政机关提出，由本机关决定是否延期。
        </p>
        <p>
          4.不按时参加听证会且未事先说明理由的，视为放弃听证权利。
        </p>
        <p>
          特此通知。
        </p>
        <br>
        <p class="p_begin">
          联系地址：
          <span>
            <el-form-item prop="organAddress" style='width:220px'>
              <el-input v-model="docData.organAddress" :maxLength='maxLength'></el-input>
            </el-form-item>
          </span>
          邮编：
          <span>
            <el-form-item prop="organZipCode" style='width:250px'>
              <el-input v-model="docData.organZipCode" :maxLength='maxLength'></el-input>
            </el-form-item>
          </span>
        </P>
        <p class="p_begin">
          联系人：
          <span>
            <el-form-item prop="organContactor" style='width:235px'>
              <el-input v-model="docData.organContactor" :maxLength='maxLength'></el-input>
            </el-form-item>
          </span>
          联系电话：
          <span>
            <el-form-item prop="organTel" style='width:220px'>
              <el-input v-model="docData.organTel" :maxLength='maxLength'></el-input>
            </el-form-item>
          </span>
        </P>

        <div class="pdf_seal">
          <span @click='makeSeal'>交通运输执法部门(印章)</span><br>
          <el-form-item prop="signatureDate" class="pdf_datapick">
            <el-date-picker v-model="docData.signatureDate" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日">
            </el-date-picker>
          </el-form-item>
        </div>

        <br>
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
    <casePageFloatBtns :pageDomId="'hearingNoticeDoc_print'" :formOrDocData="formOrDocData" @submitData="submitData"
                       @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>

    <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput>
  </div>
</template>
<script>
  import overflowInput from "./overflowInput";
  import {mixinGetCaseApiList} from "@/common/js/mixins";
  import {mapGetters} from "vuex";
  import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
  // import signture from "../../../../js/signture";
  import mySignture from "@/common/js/mySignture";
  import {
    validatePhone,
  } from "@/common/js/validator";
  import iLocalStroage from "@/common/js/localStroage";
  import {getOrganDetailApi, getOrganIdApi} from "@/api/system";

  export default {
    components: {
      overflowInput,
      casePageFloatBtns
    },
    mixins: [mixinGetCaseApiList],
    computed: {...mapGetters(['caseId'])},
    data() {
      return {
        docData: {
          caseNumber: '',
          party: '',
          partyName: '',
          caseName: '',
          hearingTime: '',
          hearingPlace: '',
          presidingHearer: '',
          presidingHearerPosition: '',
          hearingOfficer: '',
          hearingOfficerPosition: '',
          recorderSix: '',
          recorderPositionSix: '',
          organAddress: '',
          organZipCode: '',
          organContactor: '',
          organTel: '',
          signatureDate: '',
          radio: ''
        },
        radio: '1',
        handleType: 0, //0  暂存     1 提交
        caseDocDataForm: {
          id: "", //修改的时候用
          caseBasicinfoId: '', //
          caseDoctypeId: this.$route.params.docId, //表单类型IDer
          //表单数据
          docData: "",
          status: "",
          linkTypeId: '2c9029ac6c26fd72016c27247b290003'
        },
        needDealData: true,
        rules: {
          caseNumber: [
            {required: true, message: '请输入案号', trigger: 'blur'},
          ],
          party: [
            {required: true, message: '请输入当事人（个人姓名或单位名称）', trigger: 'blur'},
          ],
          caseName: [
            {required: true, message: '请输入案由', trigger: 'blur'},
          ],
          hearingTime: [
            {required: true, message: '请输入听证时间', trigger: 'blur'},
          ],
          hearingPlace: [
            {required: true, message: '请输入听证地点', trigger: 'blur'},
          ],
          presidingHearer: [
            {required: true, message: '请输入听证主持人姓名', trigger: 'blur'},
          ],
          presidingHearerPosition: [
            {required: true, message: '请输入听证主持人职务', trigger: 'blur'},
          ],
          hearingOfficer: [
            {required: true, message: '请输入听证员姓名', trigger: 'blur'},
          ],
          hearingOfficerPosition: [
            {required: true, message: '请输入听证员职务', trigger: 'blur'},
          ],
          recorderSix: [
            {required: true, message: '请输入记录员姓名', trigger: 'blur'},
          ],
          recorderPositionSix: [
            {required: true, message: '请输入记录员职务', trigger: 'blur'},
          ],
          organAddress: [
            {required: true, message: '请输入联系地址', trigger: 'blur'},
          ],
          organContactor: [
            {required: true, message: '请输入联系人', trigger: 'blur'},
          ],
          organTel: [
            {validator: validatePhone, required: true, message: '请输入联系电话', trigger: 'blur'},
          ],
          radio: [
            {required: true, message: '请选择公开方式', trigger: 'blur'},
          ],
        },
        nameLength: 23,
        adressLength: 23,
        maxLength: 23,
        maxLengthOverLine: 122,
        formOrDocData: {
          showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
          pageDomId: 'hearingNoticeDoc_print',
        },
        isChange: false
      };
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
      getDataAfter() {
        let orgData = {
          id: iLocalStroage.gets("userInfo").organId
        };
        getOrganDetailApi(orgData).then(
          res => {
            console.log("机构信息", res.data)
            this.docData.organAddress = res.data.address;
            this.docData.organTel = res.data.telephone;
            this.docData.organZipCode = res.data.zipCode;
            this.docData.organContactor = res.data.contactor;
          })
      },
      //保存文书信息
      addDocData(handleType) {
        // this.com_addDocData(handleType, 'docForm');
      },
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
      }
    },
    mounted() {
      this.getDocDataByCaseIdAndDocId();
      this.getDataAfter();
    },
    created() {
      this.isOverStatus();
    },
    watch: {
//      'docData.partyName'(val) {
//        if (!this.isChange) {
//          this.docData.party = this.docData.party === '' ? this.docData.partyName : this.docData.party
//          this.isChange = true
//        }
//      }
    }
  };
</script>
<style lang="scss">
  @import "@/assets/css/caseHandle/caseDocModle.scss";
</style>
