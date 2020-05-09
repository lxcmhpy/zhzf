<!-------长软------->
<template>
  <div class="print_box">
    <div class="print_info" id="hearingRecordDoc_print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">听证笔录</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <p class="p_begin">
          案件名称：
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
          执法人员：
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
        <!-- <p class="side_right_indent">
            <span class="side_right" @click="overFlowEdit">
              <el-form-item prop="hearingRecord">
                <span class="over_topic">听证记录：</span>
                {{docData.hearingRecord}}
              </el-form-item>
            </span>
            <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
            <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
            <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
          </p> -->

        <!-- 多行样式 -->
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item prop="hearingRecord" :rules="fieldRules('hearingRecord',propertyFeatures['hearingRecord'])">
              <el-input class='overflow_lins_textarea' style="text-indent:5em" type='textarea'
                        v-model="docData.hearingRecord" rows="3" maxLength='90' :disabled="fieldDisabled(propertyFeatures['hearingRecord'])"></el-input>
              <span class="overflow_describe" style="text-indent:0 !important">听证记录：</span>
              <span class="span_bg span_bg_top" @click="overFlowEdit">&nbsp;</span>
              <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
              <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
              <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
            </el-form-item>
          </div>

        </div>

        <p v-if="lineStyleFlag">
          听证记录：<u>{{docData.hearingRecord}}</u>
        </p>

        <el-row :gutter="20">
          <el-col :span="12">
            当事人或其代理人签名：
            <span class="write_line width250"></span>
          </el-col>
          <el-col :span="12">
            主持人及听证员签名：
            <span class="write_line" style="width: 134px;"></span>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            记录员签名：
            <span class="write_line width250"></span>
          </el-col>
          <el-col :span="12">
            其他听证参加人签名：
            <span class="write_line" style="width: 134px;"></span>
          </el-col>
        </el-row>
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
    <casePageFloatBtns :pageDomId="'hearingRecordDoc_print'" :formOrDocData="formOrDocData" @submitData="submitData"
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
  import iLocalStroage from "@/common/js/localStroage";
  import { validatePhone,validateIDNumber  } from "@/common/js/validator";
  export default {
    components: {
      overflowInput,
      casePageFloatBtns
    },
    mixins: [mixinGetCaseApiList],
    computed: {...mapGetters(['caseId'])},
    data() {
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
          linkTypeId: '2c9029ac6c26fd72016c27247b290003'
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
          ],
          hearingEndTime: [
            {required: true, message: '请输入听证结束时间', trigger: 'blur'},
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
          value: '1',
          label: '男'
        }, {
          value: '2',
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
        // let index=0
        // this.staffIdList.forEach(element => {
        //   console.log('idlist',element)
        //   console.log('index',index)
        //   console.log('iLocalStroage.gets("userInfo").id',)
        //   if(iLocalStroage.gets("userInfo").id==element){
        //     console.log(ok)
        //   }
        //   index++;
        // });

      },
      //保存文书信息
      addDocData(handleType) {
        this.com_addDocData(handleType, 'docForm');
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
        this.docData.hearingRecord = edit;
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
<style lang="scss">
  @import "@/assets/css/caseHandle/caseDocModle.scss";

  #hearingRecordDoc_print {
    .overflow_lins_textarea {
      & > textarea {
        text-indent: 5em;
      }
    }
  }
</style>
