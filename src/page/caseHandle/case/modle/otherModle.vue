<template>
  <div class="print_box" id="askRecordBox">

    <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData" label-width="80px">

      <div class="print_info indent_style" id="question_print">

        <div class="doc_topic">询问笔录</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <span class="datapick_style">
          <p>
            时间：<el-form-item prop="askdataStart" class="pdf_datapick" >
              <!-- <el-date-picker style="height:100%" v-model="docData.askdata" format="yyyy年MM月dd日" placeholder="    年  月  日" clear-icon='el-icon-circle-close'>
              </el-date-picker> -->
              <!-- <el-date-picker v-model="docData.askdata" type="datetimerange" range-separator="至" format="yyyy年MM月dd日HH时MM分" start-placeholder="    年  月  日  时  分" end-placeholder="  时  分" :clearable="false">
              </el-date-picker> -->
              <el-date-picker
                v-model="docData.askdataStart"
                type="datetime"
                placeholder="年 月 日 时 分"
                format="yyyy年MM月dd日HH时mm分">
              </el-date-picker>
            </el-form-item>
            至
            <el-form-item prop="askdataEnd" class="pdf_datapick" style="width:100px">
              <el-time-picker
                placeholder="时 分"
                v-model="docData.askdataEnd"
                format="HH时mm分"
              >
              </el-time-picker>
            </el-form-item>

            第
            <el-form-item class="askRecordNumberBox" prop="askRecordNumber">
              <el-input v-model="docData.askRecordNumber" maxLength='2' placeholder="\"></el-input>
            </el-form-item>次询问

          </p>
          <p>地点：
            <el-form-item v-if="!lineStyleFlag" prop="inquiryAddress" class="inquiryAddressBox">
              <el-input v-model="docData.inquiryAddress" maxLength='40' placeholder="\"></el-input>
            </el-form-item>
            <u v-if="lineStyleFlag">{{docData.inquiryAddress}}</u>
          </p>
          <el-row>
            <el-col :span="12">
              <p>询问人：<el-form-item v-if="!lineStyleFlag" prop="inquiryStaff" class="width212">
                  <!-- <el-input type='textarea' v-model="docData.inquiryStaff" v-bind:class="{ over_flow:docData.inquiryStaff.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input> -->
                  <!-- <el-input type='textarea' v-model="docData.inquiryStaff" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input> -->
                  <el-select v-model="docData.inquiryStaff" :maxLength='maxLength'>
                    <el-option v-for="(item,index) in staffList" :key="index" :value="item" :label="item"></el-option> 
                  </el-select>
                </el-form-item>
                <u v-if="lineStyleFlag">{{docData.inquiryStaff}}</u></p>
            </el-col>
            <el-col :span="12">
              <p>记录人：<el-form-item v-if="!lineStyleFlag" prop="recordStaff" class="width213">
                  <!-- <el-input type='textarea' v-model="docData.recordStaff" v-bind:class="{ over_flow:docData.recordStaff.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input> -->
                  <!-- <el-input type='textarea' v-model="docData.recordStaff" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input> -->
                  <el-select v-model="docData.recordStaff" :maxLength='maxLength'>
                    <el-option v-for="(item,index) in staffList" :key="index" :value="item" :label="item"></el-option> 
                  </el-select>
                </el-form-item>
                <u v-if="lineStyleFlag">{{docData.recordStaff}}</u>
              </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p>被询问人： <el-form-item v-if="!lineStyleFlag" prop="inquiried" class="width188">
                  <!-- <el-input type='textarea' v-model="docData.inquiried" v-bind:class="{ over_flow:docData.inquiried.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input> -->
                  <el-input type='textarea' v-model="docData.inquiried" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input>
                </el-form-item>
                <u v-if="lineStyleFlag">{{docData.inquiried}}</u>
              </p>
            </el-col>
            <el-col :span="12">
              <p>与案件关系：
                <!-- <el-form-item v-if="!lineStyleFlag" prop="inquiriedRelation" class="width182">
  
                  <el-input type='textarea' v-model="docData.inquiriedRelation" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input>
                </el-form-item> -->
                <el-form-item prop="inquiriedRelation" class="width182">
                <el-select v-model="docData.inquiriedRelation" @change="changeRelationWithCase">
                  <el-option v-for="item in allRelationWithCase" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                </el-form-item>
                <!-- <u v-if="lineStyleFlag">{{docData.inquiriedRelation}}</u> -->

              </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p>
                性别：<el-form-item v-if="!lineStyleFlag" prop="inquiriedSex" class="width228">
                  <!-- <el-input type='textarea' v-model="docData.inquiriedSex" v-bind:class="{ over_flow:docData.inquiriedSex.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input> -->
                  <el-input type='textarea' v-model="docData.inquiriedSex" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input>
                </el-form-item>
                <u v-if="lineStyleFlag">{{docData.inquiriedSex}}</u>

              </p>
            </el-col>
            <el-col :span="12">
              <p>
                年龄：<el-form-item v-if="!lineStyleFlag" prop="inquiriedAge" class="width230">
                  <!-- <el-input type='textarea' v-model="docData.inquiriedAge" v-bind:class="{ over_flow:docData.inquiriedAge.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input> -->
                  <el-input type='textarea' v-model="docData.inquiriedAge" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input>
                </el-form-item>
                <u v-if="lineStyleFlag">{{docData.inquiriedAge}}</u>
              </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p>
                身份证件号：<el-form-item v-if="!lineStyleFlag" prop="inquiriedIdNo" class="width180">
                  <el-input type='textarea' v-model="docData.inquiriedIdNo" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input>
                </el-form-item>
                <u v-if="lineStyleFlag">{{docData.inquiriedIdNo}}</u>
              </p>
            </el-col>
            <el-col :span="12">
              <p>
                联系电话：<el-form-item v-if="!lineStyleFlag" prop="inquiriedTel" class="width198">
                  <el-input type='textarea' v-model="docData.inquiriedTel" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input>
                </el-form-item>
                <u v-if="lineStyleFlag">{{docData.inquiriedTel}}</u>
              </p>
            </el-col>
          </el-row>
          <p>工作单位及职务：<el-form-item v-if="!lineStyleFlag" prop="inquiriedUnitPosition" class="inquiriedUnitPositionBox">
              <el-input type='textarea' v-model="docData.inquiriedUnitPosition" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input>
            </el-form-item>
            <u v-if="lineStyleFlag">{{docData.inquiriedUnitPosition}}</u></p>
          <p>联系地址：<el-form-item v-if="!lineStyleFlag" prop="inquiriedAddress" class="inquiriedAddressBox">
              <el-input type='textarea' v-model="docData.inquiriedAddress" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input>
            </el-form-item>
            <u v-if="lineStyleFlag">{{docData.inquiriedAddress}}</u></p>
          <p >我们是
            <el-form-item v-if="!lineStyleFlag" prop="organName">
              <el-input type='textarea' v-model="docData.organName" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input>
            </el-form-item>
            <u v-if="lineStyleFlag">{{docData.organName}}</u>
            的执法人员
            <el-form-item v-if="!lineStyleFlag" prop="staff1" style="width:100px">
              <el-input type='textarea' v-model="docData.staff1" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input>
            </el-form-item>
            <u v-if="lineStyleFlag">{{docData.staff1}}</u>、
            <el-form-item v-if="!lineStyleFlag" prop="staff2" style="width:100px">
              <!-- <el-input type='textarea' v-model="docData.staff2" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input> -->
              <el-select v-model="docData.staff2" :maxLength='maxLength' @change="changeStaff2">
                <el-option v-for="(item,index) in staffList" :key="index" :value="item" :label="item" :disabled="docData.staff1==item"></el-option> 
              </el-select>
            </el-form-item>
            <u v-if="lineStyleFlag">{{docData.staff2}}</u>，
            这是我们的执法证件，执法证号分别是
            <el-form-item v-if="!lineStyleFlag" prop="certificateId1">
              <el-input type='textarea' v-model="docData.certificateId1" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input>
            </el-form-item>
            <u v-if="lineStyleFlag">{{docData.certificateId1}}</u>、
            <el-form-item v-if="!lineStyleFlag" prop="certificateId2">
              <el-input type='textarea' v-model="docData.certificateId2" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input>
            </el-form-item>
            <u v-if="lineStyleFlag" >{{docData.certificateId2}}</u>，请你确认。现依法向你询问，请如实回答所问问题。执法人员与你有直接利害关系的，你可以申请回避。
          </p>
          <span v-for="(item, index) in qaList" :key="item.id" @click="QAModleEdit">
            <p class="side_right_indent" @click="QAModleEdit">
              <span class="side_right" @click="overFlowEdit">
                <el-form-item prop="illegalFactsEvidence">
                  <span class="over_topic">问{{index+1}}：</span>
                  {{item.question}}
                </el-form-item>
              </span>
              <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
            </p>
            <p class="side_right_indent">
              <span class="side_right" @click="overFlowEdit">
                <el-form-item prop="illegalFactsEvidence">
                  <span class="over_topic">答{{index+1}}：</span>
                  {{item.answer}}
                </el-form-item>
              </span>
              <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
              <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
            </p>
          </span>

          <span class="span_bg">{{docData.QAModleInfo}}</span>
          <br>
          <el-row :gutter="20">
            <el-col :span="12">
              被询问人签名：
              <span class="write_line width250"></span>
            </el-col>
            <el-col :span="12">
              询问人签名：
              <span class="write_line width250"></span>
            </el-col>
          </el-row>
        </span>

      </div>
    </el-form>
    <!-- 悬浮按钮 -->
    <!-- <div class="float-btns">
      <el-button type="success">
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
      <el-button type="success">
        <svg t="1577706320726" class="icon" viewBox="0 0 1052 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1274" width="16" height="16">
          <path d="M615.822222 597.674667c-20.48-18.744889-33.194667-48.981333-33.194666-77.539556 0-27.107556 11.52-51.683556 30.208-70.115555a1.905778 1.905778 0 0 1 0.483555-0.227556c6.314667-6.229333 13.454222-11.776 21.248-16.412444a162.872889 162.872889 0 0 0 54.812445-121.571556c0-91.079111-75.121778-164.892444-167.822223-164.892444-92.728889 0-167.879111 73.813333-167.879111 164.892444 0 48.184889 21.219556 91.477333 54.840889 121.571556 7.822222 4.636444 14.904889 10.183111 21.276445 16.412444a0.995556 0.995556 0 0 1 0.341333 0.170667c18.830222 18.488889 30.293333 43.064889 30.293333 70.172444 0 28.558222-12.714667 58.794667-33.166222 77.539556h-246.613333c-13.368889 0-24.206222 10.609778-24.206223 23.665777v152.092445h730.168889v-152.092445a23.893333 23.893333 0 0 0-24.177777-23.665777h-246.613334z m-407.210666 227.271111H834.56v52.138666H208.611556v-52.138666z" fill="#FFFFFF" p-id="1275"></path>
        </svg>
        <br>
        签章
      </el-button>
      <el-button type="primary">
        <svg t="1577414377979" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1726" width="16" height="16">
          <path d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z" p-id="1727" fill="#FFFFFF"></path>
        </svg><br>
        提交
      </el-button>
    </div> -->
    <!-- <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput> -->
    <casePageFloatBtns
      :pageDomId="'question_print'"
      :formOrDocData="formOrDocData"
      @submitData="submitData"
      @saveData="saveData"
      @backHuanjie="submitData"
    ></casePageFloatBtns>
    <QAModle ref="QAModleInfoRef" @QAModleInfo="getQAModleInfo"></QAModle>
  </div>
</template>
<script>
import QAModle from "./QAModle";
import { mixinGetCaseApiList } from "@/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import iLocalStroage from "@/js/localStroage";

export default {
  components: {
    QAModle,
    casePageFloatBtns

  },
  data() {
    return {
      value2: '',
      isOverflow: false,
      isOverLine: false,
      maxLength: '14',
      docData: {
        caseNumber: '',
        askRecordNumber:'',
        party: '',
        partyIdNo: '',
        partyAddress: "",
        partyTel: "",
        partyName: "",
        partyUnitAddress: "",
        partyUnitTel: "",
        partyManager: "",
        punishLaw: "",
        socialCreditCode: "",
        illegalFactsEvidence: "",
        reconsiderationOrgan: "",
        test: "",
        QAModleInfo: "",
        inquiryIndex: "",
        inquiryAddress: "",
        inquiriedSex: "",
        inquiried: "",
        inquiryStaff: "",
        recordStaff: "",
        inquiriedRelation: "",
        inquiriedAge: "",
        inquiriedTel: "",
        inquiriedIdNo: "",
        inquiriedUnitPosition: "",
        inquiried: "",
        organName: "",
        inquiriedAddress: "",
        staff1: "",
        staff2: "",
        certificateId1: "",
        certificateId2: "",
        askTime: 1,
        qaList: [{},{}],//弹出框问答数组，如请求时未返回即数组未定义，可能回显失败，刷新即可查看效果
        askdataStart:"",
        askdataEnd:"",
      },
      qaList: [{question:'',answer:''},{question:'',answer:''}],
      caseDocDataForm: {
        id: "",   //修改的时候用
        caseBasicinfoId: '',   //案件ID
        caseDoctypeId: this.$route.params.docId,    //文书类型ID
        //文书数据
        docData: "",
        status: "",   //提交状态
      },
      num4: 1,
      lineStyleFlag: false,
      name: '',
      inputInfo: '',
      inputInfos: '',
      illegalFactsEvidence: '',
      value1: '',
      rules: {
        askdataStart: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        askdataEnd: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        askRecordNumber: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        inquiryAddress: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        inquiryStaff: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        recordStaff: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        inquiried: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        staff1: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        staff2: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        certificateId1: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        certificateId2: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        
        
        
        // party: [
        //   { required: true, message: '请输入', trigger: 'blur' },
        // ],
        // partyIdNo: [
        //   { required: true, message: '请输入', trigger: 'blur' },
        // ],
        // partyAddress: [
        //   { required: true, message: '请输入', trigger: 'blur' },
        // ],
        // partyTel: [
        //   { required: true, message: '请输入', trigger: 'blur' },
        // ],
        // partyName: [
        //   { required: true, message: '请输入', trigger: 'blur' },
        // ],
        // partyUnitAddress: [
        //   { required: true, message: '请输入', trigger: 'blur' },
        // ],
        // partyUnitTel: [
        //   { required: true, message: '请输入', trigger: 'blur' },
        // ],
        // partyManager: [
        //   { required: true, message: '请输入', trigger: 'blur' },
        // ],
        // punishLaw: [
        //   { required: true, message: '请输入', trigger: 'blur' },
        // ],
        // socialCreditCode: [
        //   { required: true, message: '请输入', trigger: 'blur' },
        // ],
        // illegalFactsEvidence: [
        //   { required: true, message: '请输入', trigger: 'blur' },
        // ],
        // reconsiderationOrgan: [
        //   { required: true, message: '请输入', trigger: 'blur' },
        // ],

      },
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false,false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        pageDomId:'question_print',
      },
      allRelationWithCase: [
        //与案件关系下拉框
        { value: "0", label: "当事人" },
        { value: "1", label: "驾驶人" },
        { value: "2", label: "实际所有者" },
        { value: "3", label: "证人" },
        { value: "4", label: "承运人" },
        { value: "5", label: "代理人" }
      ],
      staffList:[],

    }
  },
  inject: ["reload"],
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId']) },
  methods: {
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId
      };
      this.com_getDocDataByCaseIdAndDocId(data)

      this.docData.qaList.push({
        question: '',
        answer: '',
        key: ''
      });

    },
    addDocData(handleType) {
      this.com_addDocData(handleType);
      // this.$store.dispatch("deleteTabs", this.$route.name);//关闭当前页签
      // this.$router.push({
      //   name: this.$route.params.url,
      // });
    },

    // 问答编辑
    QAModleEdit() {
      this.$refs.QAModleInfoRef.showModal(this.qaList);
    },
    // 获取问答内容
    getQAModleInfo(edit) {
      console.log('回显', edit)
      this.qaList = JSON.parse(edit);
      if(this.qaList.length<2){
        this.qaList.push({question:'',answer:''})
      }

      // this.docData.QAModleInfo = edit;
    },
    overFlowEdit() { },
  
    //保存文书信息
    saveData(handleType) {
      this.com_addDocData(handleType, "docForm");
    },
    submitData(handleType) {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: this.$route.params.url
      });
    },
    //是否是完成状态
    isOverStatus(){
      if(this.$route.params.docStatus == '1'){
        this.formOrDocData.showBtn =[false,false,false,false,false,false,false,false,false,true]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    },
    //更改与案件关系
    changeRelationWithCase(val){
      if(val == '0'){//为当事人
        this.docData.inquiried = this.docData.party;
        this.docData.inquiriedSex = this.docData.partySex;
        this.docData.inquiriedAge = this.docData.partyAge;
        this.docData.inquiriedIdNo = this.docData.partyIdNo;
        this.docData.inquiriedTel = this.docData.partyTel;
        this.docData.inquiriedUnitPosition = this.docData.partyUnitPosition;
      }else{
        this.docData.inquiried = '';
        this.docData.inquiriedSex = '';
        this.docData.inquiriedAge = '';
        this.docData.inquiriedIdNo = '';
        this.docData.inquiriedTel = '';
        this.docData.inquiriedUnitPosition = '';
      }
    },
    //更改执法人员2
    changeStaff2(){
      let staffIndex = this.staffList.indexOf(val);
      this.docData.certificateId2 = this.docData.certificateId.split(',')[staffIndex];
      console.log(staffIndex);
    },
    setStaffAndCertificateId(){ 
      this.staffList=this.docData.staff.split(',');
      this.docData.staff1 =  this.staffList[0];
      this.docData.staff2 =  this.staffList[1];
      this.docData.certificateId1 = this.docData.certificateId.split(",")[0];
      this.docData.certificateId2 = this.docData.certificateId.split(",")[1];
      //询问人默认填写文书的人
      this.docData.inquiryStaff =iLocalStroage.gets('userInfo').username;
      this.docData.organName = iLocalStroage.gets('userInfo').organName;
      //与案件关系默认为当事人
      this.docData.inquiriedRelation = "0";
      this.docData.inquiried = this.docData.party;
      this.docData.inquiriedSex = this.docData.partySex;
      this.docData.inquiriedAge = this.docData.partyAge;
      this.docData.inquiriedIdNo = this.docData.partyIdNo;
      this.docData.inquiriedTel = this.docData.partyTel;
      this.docData.inquiriedUnitPosition = this.docData.partyUnitPosition;
      //默认第一次询问
      this.docData.askRecordNumber = 1;
    }
  },
  mounted() {
    this.getDocDataByCaseIdAndDocId();
     this.isOverStatus();
  },
}
</script>
<style lang="less" >
@import "../../../../css/caseHandle/caseDocModle.less";
#askRecordBox{
 .askRecordNumberBox{
   width: 100px;
 }
 .inquiryAddressBox{
   width: calc(100% - 60px);
  // width: 500px;
 }
 .inquiriedUnitPositionBox{
   width: calc(100% - 130px);
 }
 .inquiriedAddressBox{
   width: calc(100% - 80px);
 }
 
}
</style>

