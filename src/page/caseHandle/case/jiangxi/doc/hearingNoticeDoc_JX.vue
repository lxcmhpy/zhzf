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
            <el-form-item prop="party" :rules="fieldRules('party',propertyFeatures['party'])">
              <el-input v-model="docData.party" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['party'])"></el-input>
            </el-form-item>
          </span>:
        </p>
        <p>
          根据你（单位）申请，关于
          <span>
            <el-form-item style="width:329px" prop="caseName" :rules="fieldRules('caseName',propertyFeatures['caseName'])">
              <el-input type="textarea" v-model="docData.caseName" :maxLength='maxLength'
                        v-bind:class="{ over_flow:docData.caseName.length>30?true:false }"
                        :autosize="{ minRows: 1, maxRows: 3}" :disabled="fieldDisabled(propertyFeatures['caseName'])"></el-input>
            </el-form-item>
          </span>一案，现定于
          <span>
            <el-form-item style="width:176px" prop="hearingTime" class="pdf_datapick listen_data" :rules="fieldRules('hearingTime',propertyFeatures['hearingTime'])">
              <el-date-picker v-model="docData.hearingTime" type="datetime" format="yyyy年MM月dd日HH时" value-format="yyyy-MM-dd HH"
                              placeholder="    年  月  日  时" :disabled="fieldDisabled(propertyFeatures['hearingTime'])">
              </el-date-picker>
            </el-form-item>
          </span>在
          <span>
            <el-form-item prop="hearingPlace" style="width:379px" :rules="fieldRules('hearingPlace',propertyFeatures['hearingPlace'])">
              <el-input v-model="docData.hearingPlace" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['hearingPlace'])"></el-input>
            </el-form-item>
          </span>（
          <span class="single_check">
            <el-form-item prop="radio" :rules="fieldRules('radio',propertyFeatures['radio'])">
              <el-radio-group v-model="docData.radio">
                  <el-radio  label="1">公开</el-radio>
                  <el-radio  label="2">不公开</el-radio>
              </el-radio-group>
            </el-form-item>
          </span>）举行听证会议，请准时出席。
        </p>
        <p class="p_begin">
          听证主持人姓名：
          <span>
            <el-form-item prop="presidingHearer" :rules="fieldRules('presidingHearer',propertyFeatures['presidingHearer'])">
              <el-input v-model="docData.presidingHearer" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['presidingHearer'])"></el-input>
            </el-form-item>
          </span>
          职务：
          <span>
            <el-form-item prop="presidingHearerPosition" class="width235" :rules="fieldRules('presidingHearerPosition',propertyFeatures['presidingHearerPosition'])">
              <el-input v-model="docData.presidingHearerPosition" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['presidingHearerPosition'])"></el-input>
            </el-form-item>
          </span>
        </P>
        <p class="p_begin">
          听证员姓名：
          <span>
            <el-form-item prop="hearingOfficer" class="width220" :rules="fieldRules('hearingOfficer',propertyFeatures['hearingOfficer'])">
              <el-input v-model="docData.hearingOfficer" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['hearingOfficer'])"></el-input>
            </el-form-item>
          </span>
          职务：
          <span>
            <el-form-item prop="hearingOfficerPosition" class="width235" :rules="fieldRules('hearingOfficerPosition',propertyFeatures['hearingOfficerPosition'])">
              <el-input v-model="docData.hearingOfficerPosition" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['hearingOfficerPosition'])"></el-input>
            </el-form-item>
          </span>
        </P>
        <p class="p_begin">
          记录员姓名：
          <span>
            <el-form-item prop="recorderSix" class="width220" :rules="fieldRules('recorderSix',propertyFeatures['recorderSix'])">
              <el-input v-model="docData.recorderSix" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['recorderSix'])"></el-input>
            </el-form-item>
          </span>
          职务：
          <span>
            <el-form-item prop="recorderPositionSix" class="width235" :rules="fieldRules('recorderPositionSix',propertyFeatures['recorderPositionSix'])">
              <el-input v-model="docData.recorderPositionSix" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['recorderPositionSix'])"></el-input>
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
            <el-form-item prop="organAddress" style='width:220px' :rules="fieldRules('organAddress',propertyFeatures['organAddress'])">
              <el-input v-model="docData.organAddress" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['organAddress'])"></el-input>
            </el-form-item>
          </span>
          邮编：
          <span>
            <el-form-item prop="organZipCode" style='width:250px' :rules="fieldRules('organZipCode',propertyFeatures['organZipCode'])">
              <el-input v-model="docData.organZipCode" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['organZipCode'])"></el-input>
            </el-form-item>
          </span>
        </P>
        <p class="p_begin">
          联系人：
          <span>
            <el-form-item prop="organContactor" style='width:235px' :rules="fieldRules('organContactor',propertyFeatures['organContactor'])">
              <el-input v-model="docData.organContactor" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['organContactor'])"></el-input>
            </el-form-item>
          </span>
          联系电话：
          <span>
            <el-form-item prop="organTel" style='width:220px' :rules="fieldRules('organTel',propertyFeatures['organTel'],validatePhone)">
              <el-input v-model="docData.organTel" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['organTel'])"></el-input>
            </el-form-item>
          </span>
        </P>

        <div class="pdf_seal">
          <span >交通运输执法部门(印章)</span><br>
          <el-form-item prop="signatureDate" class="pdf_datapick">
            <el-date-picker v-model="docData.signatureDate" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日" value-format="yyyy-MM-dd">
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
    <casePageFloatBtns :pageDomId="'hearingNoticeDoc_print'" :formOrDocData="formOrDocData" @submitData="submitData"
                       @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>
  </div>
</template>
<script>
  import {mixinGetCaseApiList} from "@/common/js/mixins";
  import {mapGetters} from "vuex";
  import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
  import {
    validatePhone,
  } from "@/common/js/validator";
  import iLocalStroage from "@/common/js/localStroage";
  import {getOrganDetailApi, getOrganIdApi} from "@/api/system";

  export default {
    components: {
      casePageFloatBtns
    },
    mixins: [mixinGetCaseApiList],
    computed: {...mapGetters(['caseId'])},
    data() {
      return {
        validatePhone:validatePhone,
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
          linkTypeId: this.$route.params.caseLinkTypeId
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
          organZipCode: [
            {required: true, message: '请输入机构邮编', trigger: 'blur'},
          ],
          radio: [
            {required: true, message: '请选择公开方式', trigger: 'change'},
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
        isChange: false,
        propertyFeatures:''
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
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss">
  /* @import "@/assets/css/caseHandle/caseDocModle.scss"; */
</style>
