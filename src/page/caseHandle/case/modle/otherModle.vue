<template>
  <div class="print_box" id="askRecordBox">

    <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData" label-width="80px">

      <div class="print_info indent_style" id="question_print">

        <div class="doc_topic">询问笔录</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <span class="datapick_style">
          <p>
            时间：<el-form-item prop="askdataStart" class="pdf_datapick" id="askModelDataTimeBox">
              <el-date-picker
                v-model="docData.askdataStart"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy年MM月dd日HH时mm分">
              </el-date-picker>
              <el-input class="replaceTime" placeholder=" 年 月 日 时 分" v-model="docData.askdataStart"></el-input>
            </el-form-item>
            至
            <el-form-item prop="askdataEnd" class="pdf_datapick" style="width:100px">
              <el-time-picker
                placeholder="时 分"
                v-model="docData.askdataEnd"
                format="HH时mm分"
                value-format="HH:mm"
              >
              </el-time-picker>
            </el-form-item>

            <span style="margin-left:50px">第</span>
            <el-form-item class="askRecordNumberBox" prop="askRecordNumber">
              <el-input v-model="docData.askRecordNumber" maxLength='2' placeholder="\"></el-input>
            </el-form-item>次询问

          </p>
          <p>地点：
            <el-form-item v-if="!lineStyleFlag" prop="inquiryAddress" class="inquiryAddressBox" style="width:570px">
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
              <p>记录人：<el-form-item v-if="!lineStyleFlag" prop="recordStaff" style="width:246px">
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
                <el-form-item prop="inquiriedRelation" style="width:209px">
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
                  <!-- <el-input type='textarea' v-model="docData.inquiriedSex" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input> -->
                  <el-select v-model="docData.inquiriedSex" :maxLength="maxLength" placeholder="\">
                    <el-option :value="0" label="男"></el-option>
                    <el-option :value="1" label="女"></el-option>
                  </el-select>
                </el-form-item>
                <u v-if="lineStyleFlag">{{docData.inquiriedSex}}</u>

              </p>
            </el-col>
            <el-col :span="12">
              <p>
                年龄：<el-form-item v-if="!lineStyleFlag" prop="inquiriedAge" style="width:262px">
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
                联系电话：<el-form-item v-if="!lineStyleFlag" prop="inquiriedTel" style="width:230px">
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
          <span v-for="(item, index) in docData.qaList" :key="item.id" @click="QAModleEdit">
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
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import iLocalStroage from "@/common/js/localStroage";
import {
  findCaseAllBindPropertyApi,
} from "@/api/caseHandle";
export default {
  components: {
    QAModle,
    casePageFloatBtns

  },
  data() {
    //验证开始时间
    var validateStartTime = (rule, value, callback) => {
      let parseInquestStartTime = this.docData.askdataStart.replace('年','-').replace('月','-').replace('日',' ').replace('时',":").replace('分',"");
      let a = parseInquestStartTime.split(' ');
      let parseinquestEndTime = a[0] + ' ' + this.docData.askdataEnd;

      if((Date.parse(parseInquestStartTime)>Date.parse(parseinquestEndTime)) && this.docData.askdataEnd){
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
        organName: "",
        inquiriedAddress: "",
        staff1: "",
        staff2: "",
        certificateId1: "",
        certificateId2: "",
        askTime: 1,
        qaList: [],//弹出框问答数组，如请求时未返回即数组未定义，可能回显失败，刷新即可查看效果
        askdataStart:"",
        askdataEnd:""
      },
      qaList: [{question:'',answer:''},{question:'',answer:''}],
      caseDocDataForm: {
        id: "",   //修改的时候用
        caseBasicinfoId: '',   //案件ID
        caseDoctypeId: this.$route.params.docId,    //文书类型ID
        //文书数据
        docData: "",
        status: "",   //提交状态
        note:"",//文书名字
        docDataId:"", //多份文书的id
        linkTypeId:'2c90293b6c178b55016c17c93326000f' //所属环节的id
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
          { required: true, message: '开始时间不能为空', trigger: 'blur' },
          { validator: validateStartTime, trigger: "blur" }
        ],
        askdataEnd: [
          { required: true, message: '结束时间不能为空', trigger: 'blur' },
          { validator: validateStartTime, trigger: "blur" }
        ],
        askRecordNumber: [
          { required: true, message: '询问次数不能为空', trigger: 'blur' },
        ],
        inquiryAddress: [
          { required: true, message: '地点不能为空', trigger: 'blur' },
        ],
        inquiryStaff: [
          { required: true, message: '询问人不能为空', trigger: 'blur' },
        ],
        recordStaff: [
          { required: true, message: '记录人不能为空', trigger: 'change' },
        ],
        inquiried: [
          { required: true, message: '被询问人不能为空', trigger: 'blur' },
        ],
        staff1: [
          { required: true, message: '执法人员不能为空', trigger: 'blur' },
        ],
        staff2: [
          { required: true, message: '执法人员不能为空', trigger: 'blur' },
        ],
        certificateId1: [
          { required: true, message: '执法证号不能为空', trigger: 'blur' },
        ],
        certificateId2: [
          { required: true, message: '执法证号不能为空', trigger: 'blur' },
        ],
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
      needDealData:true,
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
      //有多份询问笔录时，如果点击添加获取案件信息，如果点击的时查看，则根据id获取文书详情
      let addMoreData = JSON.parse(this.$route.params.addMoreData);

      if(addMoreData.handelType == 'isAddMore' && !iLocalStroage.get("currentDocDataId")){
        //设置询问笔录名称
        console.log('添加')
        this.caseDocDataForm.note = "询问笔录（"+addMoreData.askData.peopleType+")(第"+addMoreData.askData.askNum +"次)";
        this.com_getCaseBasicInfo(data.caseId,data.docId);
      }else{
        console.log('修改')
        let currentDocDataId = iLocalStroage.get("currentDocDataId");
        if(currentDocDataId){
          this.getDocDetailById(currentDocDataId)
        }else{
          this.getDocDetailById(this.$route.params.docDataId)
        }
      }
      // this.getDocDetailById(this.$route.params.docDataId)

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
    // 获取问答内容决定执行
    getQAModleInfo(edit) {
      console.log('回显', edit)
      this.docData.qaList = JSON.parse(edit);

      if(this.docData.qaList.length<2){
        this.docData.qaList.push({question:'',answer:''})
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
        this.docData.inquiriedSex = Number(this.docData.partySex);
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
    getDataAfter(){
      this.staffList=this.docData.staff.split(',');
      this.docData.staff1 =  this.staffList[0];
      this.docData.staff2 =  this.staffList[1];
      this.docData.certificateId1 = this.docData.certificateId.split(",")[0];
      this.docData.certificateId2 = this.docData.certificateId.split(",")[1];
      //询问人默认填写文书的人
      this.docData.inquiryStaff =iLocalStroage.gets('userInfo').username;
      this.docData.organName = iLocalStroage.gets('userInfo').organName;
      //与案件关系默认为当事人
      // this.docData.inquiriedRelation = "0";
      // this.docData.inquiried = this.docData.party;
      // this.docData.inquiriedSex = Number(this.docData.partySex);
      // this.docData.inquiriedAge = this.docData.partyAge;
      // this.docData.inquiriedIdNo = this.docData.partyIdNo;
      // this.docData.inquiriedTel = this.docData.partyTel;
      // this.docData.inquiriedUnitPosition = this.docData.partyUnitPosition;
      // let addMoreData = JSON.parse(this.$route.params.addMoreData);
      // console.log('addMoreData',addMoreData);
      this.setDataForPelple();
      //默认第一次询问
      this.docData.askRecordNumber = JSON.parse(this.$route.params.addMoreData).askData.askNum ? JSON.parse(this.$route.params.addMoreData).askData.askNum : 1;
      console.log('this.docData.askRecordNumber',this.docData.askRecordNumber);
    },
    //根据类型
    setDataForPelple(){
       let selectPeo = JSON.parse(this.$route.params.addMoreData).askData.peopleAndRelationType;
      //  console.log('addMoreData',selectPeo);

       let selectPeo2 = selectPeo.split('-'); //[name,relation]
       console.log('addMoreData',selectPeo2);
       let dailiDataList = JSON.parse(this.docData.agentPartyEcertId);
        let dailiData = "";
       dailiDataList.forEach(item=>{
        //  console.log(item);
          if(this.switchRelate(item.relationWithCase) == selectPeo2[1] && item.name == selectPeo2[0]){
            console.log('不是当事人')
           dailiData = item;
          console.log('dailiData22222',dailiData);
          this.docData.inquiriedRelation = item.relationWithCase;

           return;
          }
          // this.setDataForPelpleDetail(dailiData);

       })
       //当事人
       if(!dailiData){
         dailiData ={
          name:this.docData.party,
          sex: this.docData.partySex,
          zhengjianNumber: this.docData.partyIdNo,
          age:this.docData.partyAge,
          company: this.docData.partyUnitPosition,
          position: this.docData.occupation,
          tel: this.docData.partyTel,
          adress: this.docData.partyAddress,
        }

        this.docData.inquiriedRelation = "0";
       }
      //与案件关系选择以上都不是时
      if(selectPeo2[0] == '以上均不是'){
        dailiData ={
          name:'',
          sex: '',
          zhengjianNumber: '',
          age:'',
          company: '',
          position: '',
          tel: '',
          adress: '',
        }
        this.docData.inquiriedRelation = "";
      }
      this.setDataForPelpleDetail(dailiData);

    },
    setDataForPelpleDetail(dailiData){
      console.log('dailiData',dailiData);
        this.docData.inquiried = dailiData.name;
        this.docData.inquiriedSex = Number(dailiData.sex);
        this.docData.inquiriedIdNo = dailiData.zhengjianNumber;
        this.docData.inquiriedAge = dailiData.age,
        this.docData.inquiriedUnitPosition = dailiData.company + " " + dailiData.position;
        this.docData.inquiriedAddress = dailiData.adress;
        this.docData.inquiriedTel = dailiData.tel;
        console.log(' this.docData.inquiriedSex', this.docData.inquiriedSex);
    },
    switchRelate(relation){
      let realRelation = '';
      switch (relation) {
        case "0":
          realRelation = '当事人'
          break;
        case "1":
          realRelation = '驾驶人'
          break;
        case "2":
          realRelation = '实际所有者'
          break;
        case "3":
          realRelation = '证人'
          break;
        case "4":
          realRelation = '承运人'
          break;
        case "5":
          realRelation = '代理人'
          break;
        default:
          break;
      }
      return realRelation;
    },
    //获取执法人员
    getLawOfficer(){
      let data = {
        caseBasicInfoId: this.caseId,
        typeId: this.$route.params.docId
      };
        findCaseAllBindPropertyApi(data).then(res=>{
          console.log(res);
          let data2 = JSON.parse(res.data.propertyData);
          this.staffList = data2.staff.split(',');
        },err=>{
          console.length(err);
        })
    }
  },
  mounted() {
    this.getDocDataByCaseIdAndDocId();
     this.isOverStatus();
     this.getLawOfficer();
  },
}
</script>
<style lang="scss" >
@import "@/assets/css/caseHandle/caseDocModle.scss";
#askRecordBox{
 .askRecordNumberBox{
   width: 100px;
 }
 .inquiryAddressBox{
  //  width: calc(100% - 60px);
  // width: 500px;
 }
 .inquiriedUnitPositionBox{
   width: calc(100% - 130px);
 }
 .inquiriedAddressBox{
   width: calc(100% - 80px);
 }
.print_info p .span_bg{
  height: 23px;
 }
.datapick_style .el-form-item__content .el-input__suffix{
   display:none;
 }
 #askModelDataTimeBox{
   width:220px;
   position: relative;
   .el-form-item__content .el-date-editor--datetime{
     width:220px;
     opacity:0;
     position: absolute;
    z-index: 2;
   }
   .replaceTime{
     position:absolute;
     top:0;
     left:10px;
   }
 }

}
</style>

