<!-------长软------->
<template>
  <div class="print_box">
    <div class="print_info" id="hearingRecordDoc_print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">听证笔录</div>
        <div class="doc_number"></div>
        <p class="p_begin">
          案由：
          <span>
            <el-form-item prop="caseName" class="width537" :rules="fieldRules('caseName',propertyFeatures['caseName'])">
              <el-input v-model="docData.caseName" :maxLength='maxLength' type='textarea'
                        :autosize="{ minRows: 1, maxRows: 3}"
                        v-bind:class="{ over_flow:docData.caseName.length>31?true:false }" :disabled="fieldDisabled(propertyFeatures['caseName'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          主持听证机关：
          <span>
            <el-form-item prop="hearingOrgan" class="width505" :rules="fieldRules('hearingOrgan',propertyFeatures['hearingOrgan'])">
              <el-input v-model="docData.hearingOrgan" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['hearingOrgan'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          听证地点：
          <span>
            <el-form-item prop="hearingPlace" class="width537" :rules="fieldRules('hearingPlace',propertyFeatures['hearingPlace'])">
              <el-input v-model="docData.hearingPlace" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['hearingPlace'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          听证时间：
          <span class="listen_data">
            <el-form-item prop="hearingStartTime" class="pdf_datapick" :rules="fieldRules('hearingStartTime',propertyFeatures['hearingStartTime'])">
              <el-date-picker v-model="docData.hearingStartTime" type="datetime" format="yyyy年MM月dd日HH时mm分" value-format="yyyy-MM-dd HH:mm"
                              placeholder="    年  月  日  时  分" :disabled="fieldDisabled(propertyFeatures['hearingStartTime'])">
              </el-date-picker>
            </el-form-item>
          </span>至
          <span class="listen_data">
            <el-form-item prop="hearingEndTime" class="pdf_datapick" :rules="fieldRules('hearingEndTime',propertyFeatures['hearingEndTime'])">
              <el-date-picker v-model="docData.hearingEndTime" type="datetime" format="yyyy年MM月dd日HH时mm分" value-format="yyyy-MM-dd HH:mm"
                              placeholder="    年  月  日  时  分" :disabled="fieldDisabled(propertyFeatures['hearingEndTime'])">
              </el-date-picker>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          主持人：
          <span>
            <el-form-item prop="persidingHearer" style="width:235px" :rules="fieldRules('persidingHearer',propertyFeatures['persidingHearer'])">
              <el-input v-model="docData.persidingHearer" maxLength='13' :disabled="fieldDisabled(propertyFeatures['persidingHearer'])"></el-input>
            </el-form-item>
          </span>
          听证员：
          <span>
            <el-form-item prop="hearingOfficer" style="width:236px" :rules="fieldRules('hearingOfficer',propertyFeatures['hearingOfficer'])">
              <el-input v-model="docData.hearingOfficer" maxLength='13' :disabled="fieldDisabled(propertyFeatures['hearingOfficer'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          记录员：
          <span>
            <el-form-item prop="hearingClerks" style="width:553px" :rules="fieldRules('hearingClerks',propertyFeatures['hearingClerks'])">
              <el-input v-model="docData.hearingClerks" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['hearingClerks'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          执法人员：
          <span>
            <el-form-item prop="staff" style="width:254px" :rules="fieldRules('staff',propertyFeatures['staff'])">
               <el-select v-model="docData.staff1" placeholder="" @change="changeStaff1" :disabled="fieldDisabled(propertyFeatures['staff'])">
                 <el-option v-for="item in staffList" :key="item.id" :label="item.name" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </span>
          执法证号：
          <span>
            <el-form-item prop="staffId" :rules="fieldRules('staffId',propertyFeatures['staffId'])">
               <el-input v-model="docData.staffId1" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['staffId'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>
            <el-form-item prop="staff2" style="width:254px" :rules="fieldRules('staff2',propertyFeatures['staff2'])">
               <el-select v-model="docData.staff2" placeholder="" @change="changeStaff2" :disabled="fieldDisabled(propertyFeatures['staff2'])">
                <el-option v-for="item in staffList_" :key="item.id" :label="item.name" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </span>
          执法证号：
          <span>
            <el-form-item prop="staffId2" :rules="fieldRules('staffId2',propertyFeatures['staffId2'])">
               <el-input v-model="docData.staffId2" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['staffId2'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          当事人：
          <span>
            <el-form-item prop="party" style="width:106px" :rules="fieldRules('party',propertyFeatures['party'])">
              <el-input v-model="docData.party" maxLength='6' :disabled="fieldDisabled(propertyFeatures['party'])"></el-input>
            </el-form-item>
          </span>
          法定代表人：
          <span>
            <el-form-item prop="partyManager" style="width:106px" :rules="fieldRules('partyManager',propertyFeatures['partyManager'])">
              <el-input v-model="docData.partyManager" maxLength='6' :disabled="fieldDisabled(propertyFeatures['partyManager'])"></el-input>
            </el-form-item>
          </span>
          联系电话：
          <span>
            <el-form-item prop="partyTel" style="width:132px" :rules="fieldRules('partyTel',propertyFeatures['partyTel'],validatePhone)">
              <el-input v-model="docData.partyTel" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['partyTel'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          委托代理人：<span>
            <el-form-item prop="proxy" class="width96" :rules="fieldRules('proxy',propertyFeatures['proxy'])">
              <el-input v-model="docData.proxy" maxLength='6' :disabled="fieldDisabled(propertyFeatures['proxy'])"></el-input>
            </el-form-item>
          </span>
          性别：<span>
            <el-form-item prop="proxySex" class="width38" :rules="fieldRules('proxySex',propertyFeatures['proxySex'])">
              <el-select v-model="docData.proxySex" :maxLength='maxLength' placeholder="" :disabled="fieldDisabled(propertyFeatures['proxySex'])">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </span>
          年龄：<span>
            <el-form-item prop="proxyAge" class="width38" :rules="fieldRules('proxyAge',propertyFeatures['proxyAge'])">
              <el-input v-model="docData.proxyAge" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['proxyAge'])"></el-input>
            </el-form-item>
          </span>
          工作单位及职务：
          <span>
            <el-form-item prop="proxyUnitPosition" class="width100" :rules="fieldRules('proxyUnitPosition',propertyFeatures['proxyUnitPosition'])">
              <el-input v-model="docData.proxyUnitPosition" maxLength='6' :disabled="fieldDisabled(propertyFeatures['proxyUnitPosition'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          第三人：<span>
            <el-form-item prop="thirdParty" style="width:127px" :rules="fieldRules('thirdParty',propertyFeatures['thirdParty'])">
              <el-input v-model="docData.thirdParty" maxLength='6' :disabled="fieldDisabled(propertyFeatures['thirdParty'])"></el-input>
            </el-form-item>
          </span>
          性别：<span>
            <el-form-item prop="thirdPartySex" class="width38" :rules="fieldRules('thirdPartySex',propertyFeatures['thirdPartySex'])">
              <el-select v-model="docData.thirdPartySex" :maxLength='maxLength' placeholder="" :disabled="fieldDisabled(propertyFeatures['thirdPartySex'])">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </span>
          年龄：<span>
            <el-form-item prop="thirdPartyAge" class="width38" :rules="fieldRules('thirdPartyAge',propertyFeatures['thirdPartyAge'])">
              <el-input v-model="docData.thirdPartyAge" maxLength='6' :disabled="fieldDisabled(propertyFeatures['thirdPartyAge'])"></el-input>
            </el-form-item>
          </span>
          工作单位及职务：
          <span>
            <el-form-item prop="thirdPartyUnitPosition" class="width100" :rules="fieldRules('thirdPartyUnitPosition',propertyFeatures['thirdPartyUnitPosition'])">
              <el-input v-model="docData.thirdPartyUnitPosition" maxLength='6' :disabled="fieldDisabled(propertyFeatures['thirdPartyUnitPosition'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          其他参与人员：<span>
            <el-form-item prop="otherPariticipants" style="width:80px" :rules="fieldRules('otherPariticipants',propertyFeatures['otherPariticipants'])">
              <el-input v-model="docData.otherPariticipants" :autosize="{ minRows: 1, maxRows: 3}"
                        maxLength='6' :disabled="fieldDisabled(propertyFeatures['otherPariticipants'])"></el-input>
            </el-form-item>
          </span>
          性别：<span>
            <el-form-item prop="otherPariticipantsSex" class="width38" :rules="fieldRules('otherPariticipantsSex',propertyFeatures['otherPariticipantsSex'])">
              <el-select v-model="docData.otherPariticipantsSex" maxLength='6' placeholder="" :disabled="fieldDisabled(propertyFeatures['otherPariticipantsSex'])">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </span>
          年龄：<span>
            <el-form-item prop="otherPariticipantsAge" class="width38" :rules="fieldRules('otherPariticipantsAge',propertyFeatures['otherPariticipantsAge'])">
              <el-input v-model="docData.otherPariticipantsAge" maxLength='6' :disabled="fieldDisabled(propertyFeatures['otherPariticipantsAge'])"></el-input>
            </el-form-item>
          </span>
          工作单位及职务：
          <span>
            <el-form-item prop="otherPariticipantsPosition" class="width100" :rules="fieldRules('otherPariticipantsPosition',propertyFeatures['otherPariticipantsPosition'])">
              <el-input v-model="docData.otherPariticipantsPosition" maxLength='6' :disabled="fieldDisabled(propertyFeatures['otherPariticipantsPosition'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <!-- 多行样式 -->
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item prop="hearingRecord" :rules="fieldRules('hearingRecord',propertyFeatures['hearingRecord'])">
              <el-input class='overflow_lins_textarea' style="text-indent:5em" type='textarea'
                        v-model="docData.hearingRecord" rows="3" maxLength='90' :disabled="fieldDisabled(propertyFeatures['hearingRecord'])"></el-input>
              <span class="overflow_describe" style="text-indent:0 !important">听证记录：</span>
              <span class="span_bg span_bg_top">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
            </el-form-item>
          </div>
        </div>
        <p v-if="lineStyleFlag">
          听证记录：<u>{{docData.hearingRecord}}</u>
        </p>
        <el-row :gutter="20">
          <el-col :span="12">
            当事人或其代理人签名：
          </el-col>
          <el-col :span="12">
            主持人及听证员签名：
            <span class="write_line width120"></span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <span class="write_line width220"></span>
          </el-col>
          <el-col :span="12">
            记录员签名：
            <span class="write_line width185"></span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            其他听证参加人签名：
            <span class="write_line width220"></span>
          </el-col>
          <el-col :span="12">
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 悬浮按钮 -->
    <casePageFloatBtns :pageDomId="'hearingRecordDoc_print'" :formOrDocData="formOrDocData" @submitData="submitData"
                       @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>
  </div>
</template>
<script>
  import {mixinGetCaseApiList} from "@/common/js/mixins";
  import {mapGetters} from "vuex";
  import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
  import iLocalStroage from "@/common/js/localStroage";
  import { validatePhone,validateIDNumber  } from "@/common/js/validator";
  export default {
    components: {
      casePageFloatBtns
    },
    mixins: [mixinGetCaseApiList],
    computed: {...mapGetters(['caseId'])},
    data() {
      //验证开始时间
    var validateStartTime = (rule, value, callback) => {
      console.log(Date.parse(value),Date.parse(this.docData.hearingEndTime))
      if(Date.parse(this.docData.hearingStartTime)>Date.parse(this.docData.hearingEndTime)){
        this.$message({
              showClose: true,
              message: '开始时间不得大于结束时间',
              type: 'error',
              offset: 100,
              customClass: 'validateErrorTip'
        });
        return callback(new Error("开始时间不得大于结束时间"));
      }
      callback();
    };
      return {
        validatePhone:validatePhone,
        validateIDNumber :validateIDNumber,
        docData: {
          caseNumber: "",
          caseName: "",
          hearingOrgan: "",
          hearingPlace: "",
          hearingStartTime: "",
          hearingEndTime: "",
          persidingHearer: "",
          hearingOfficer: "",
          hearingClerks: "",
          staff: "",
          staffId: "",
          staff2: "",
          staffId2: "",
          party: "",
          partyManager: "",
          partyTel: "",
          proxy: "",
          proxySex: "",
          proxyAge: "",
          proxyUnitPosition: "",
          thirdParty: "",
          thirdPartySex: "",
          thirdPartyAge: "",
          thirdPartyUnitPosition: "",
          otherPariticipants: "",
          otherPariticipantsSex: "",
          otherPariticipantsAge: "",
          otherPariticipantsPosition: "",
          partySign: "",
          persidingHearerSign: "",
          hearingClerksSign: "",
          hearingOtherSign: "",
          hearingRecord: "" //听证记录
        },
        handleType: 0, //0  暂存     1 提交
        caseDocDataForm: {
          id: "",   //修改的时候用
          caseBasicinfoId: '',   //案件ID
          caseDoctypeId: this.$route.params.docId,    //文书类型ID
          //表单数据
          docData: "",
          status: "",
          linkTypeId: this.$route.params.caseLinkTypeId
        },
        rules: {
          caseNumber: [
            {required: true, message: '请输入案号', trigger: 'blur'},
          ],
          caseName: [
            {required: true, message: '请输入案由', trigger: 'blur'},
          ],
          hearingOrgan: [
            {required: true, message: '请输入主持听证机关', trigger: 'blur'},
          ],
          hearingPlace: [
            {required: true, message: '请输入听证地点', trigger: 'blur'},
          ],
          hearingStartTime: [
            {required: true, message: '请输入听证开始时间', trigger: 'blur'},
            { validator:validateStartTime , trigger: "blur" }
          ],
          hearingEndTime: [
            {required: true, message: '请输入听证结束时间', trigger: 'blur'},
            { validator:validateStartTime , trigger: "blur" }
          ],
          persidingHearer: [
            {required: true, message: '请输入主持人姓名', trigger: 'blur'},
          ],
          hearingOfficer: [
            {required: true, message: '请输入听证员', trigger: 'blur'},
          ],
          hearingClerks: [
            {required: true, message: '请输入记录员', trigger: 'blur'},
          ],
          staff: [
            {required: true, message: '请输入执法人员1', trigger: 'blur'},
          ],
          staffId: [
            {required: true, message: '请输入执法人员1证件号', trigger: 'blur'},
          ],
          staff2: [
            {required: true, message: '请输入执法人员2', trigger: 'blur'},
          ],
          staffId2: [
            {required: true, message: '请输入执法人员2证件号', trigger: 'blur'},
          ],
          party: [
            {required: true, message: '请输入当事人', trigger: 'blur'},
          ],
          partyManager: [
            {required: true, message: '请输入法定代表人', trigger: 'blur'},
          ],
          partyTel: [
            {required: true, message: '请输入法定代表人联系电话', trigger: 'blur'},
          ],
          proxy: [
            {required: true, message: '请输入委托代理人', trigger: 'blur'},
          ],
          proxySex: [
            {required: true, message: '请输入委托代理人性别', trigger: 'blur'},
          ],
          proxyAge: [
            {required: true, message: '请输入委托代理人年龄', trigger: 'blur'},
          ],
          thirdParty: [
            {required: true, message: '请输入第三人', trigger: 'blur'},
          ],
          thirdPartySex: [
            {required: true, message: '请输入第三人性别', trigger: 'blur'},
          ],
          thirdPartyAge: [
            {required: true, message: '请输入第三人年龄', trigger: 'blur'},
          ],
          thirdPartyUnitPosition: [
            {required: true, message: '请输入第三人工作单位及职务', trigger: 'blur'},
          ],
          otherPariticipants: [
            {required: true, message: '请输入其他参与人员', trigger: 'blur'},
          ],
          otherPariticipantsSex: [
            {required: true, message: '请输入其他参与人员性别', trigger: 'blur'},
          ],
          otherPariticipantsAge: [
            {required: true, message: '请输入其他参与人员年龄', trigger: 'blur'},
          ],
          otherPariticipantsPosition: [
            {required: true, message: '请输入其他参与人员工作单位及职务', trigger: 'blur'},
          ],
          hearingRecord: [
            {required: true, message: '请输入听证记录', trigger: 'blur'},
          ],
        },
        options: [{
          value: '0',
          label: '男'
        }, {
          value: '1',
          label: '女'
        }],
        nameLength: 23,
        adressLength: 23,
        maxLength: 23,
        maxLengthOverLine: 122,
        lineStyleFlag: false,
        formOrDocData: {
          showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
          pageDomId: 'hearingRecordDoc_print',
        },
        staffList: [],
        staffList_: [],
        needDealData: true,
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
        console.log('staff', this.docData.staff)
        let staffList = this.docData.staff.split(',');
        let staffIdList = this.docData.staffId.split(',');
        for (let i = 0; i < staffList.length; i++) {
          this.staffList[i] = {
            name: staffList[i],
            id: staffIdList[i]
          }
        }
        this.docData.staff1 = this.staffList[0].name;
        this.docData.staffId1 = this.staffList[0].id;
        this.staffList_ = JSON.parse(JSON.stringify(this.staffList))
        this.staffList_.splice(0, 1)
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
      //修改勘验人员
      changeStaff1(val) {
        this.docData.staff1 = val.name;
        this.docData.staffId1 = val.id;
        this.staffList_ = JSON.parse(JSON.stringify(this.staffList))
        this.staffList_.splice(this.staffList.indexOf(val), 1)
        if (this.docData.staff1 === this.docData.staff2) {
          this.docData.staff2 = '';
          this.docData.staffId2 = '';
        }
      },
      changeStaff2(val) {
        this.docData.staff2 = val.name;
        this.docData.staffId2 = val.id;
      },
    },
    mounted() {
      this.getDocDataByCaseIdAndDocId();
    },
    created() {
      this.isOverStatus();
    }
  };
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">
/* @import "@/assets/css/caseHandle/caseDocModle.scss"; */

  #hearingRecordDoc_print {
    .overflow_lins_textarea {
      & > textarea {
        text-indent: 5em;
      }
    }
  }
</style>
