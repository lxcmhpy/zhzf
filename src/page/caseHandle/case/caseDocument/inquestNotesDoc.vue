<template>
  <div class="print_box">
    <div class="print_info indent_style" id="inquestNote_print">
      <el-form ref="docForm" :inline-message="true" :inline="true" :model="docData" :rules="rules" >
        <div class="doc_topic">勘验笔录</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <!-- <el-button @click="onSubmit('docForm')">formName</el-button> -->
        <p>案由：
          <el-form-item v-if="!lineStyleFlag" prop="caseName" style="width:570px">
            <el-input type='textarea' v-model="docData.caseName" v-bind:class="{ over_flow:docData.caseName.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 2}" placeholder="\" maxLength="90" disabled></el-input>
          </el-form-item>
          <u v-if="lineStyleFlag">{{docData.caseName}}</u>
        </p>
        <p>
          勘验时间：<el-form-item prop="inquestStartTime" class="pdf_datapick dataTimeReplaceBox" style="width:250px">
            <el-date-picker v-model="docData.inquestStartTime" type="datetime" format="yyyy-MM-dd HH:mm"
                value-format="yyyy年MM月dd日HH时mm分" style="width:250px">
            </el-date-picker>
            <el-input class="replaceTime" placeholder=" 年 月 日 时 分" v-model="docData.inquestStartTime"></el-input>
          </el-form-item>
          至
          <el-form-item prop="inquestEndTime" class="pdf_datapick dataTimeReplaceBox" style="width:212px">
            <el-date-picker v-model="docData.inquestEndTime" type="datetime" format="yyyy-MM-dd HH:mm"
              value-format="yyyy年MM月dd日HH时mm分">
            </el-date-picker>
            <el-input class="replaceTime" placeholder=" 年 月 日 时 分" v-model="replaceInquestEndTime"></el-input>
          </el-form-item>
        </p>
        <el-row>
          <el-col :span="14">
            <p>勘验场所：<el-form-item v-if="!lineStyleFlag" prop="inquestAddress" style="width:240px">
                <el-input type='textarea' v-model="docData.inquestAddress" v-bind:class="{ over_flow:docData.inquestAddress.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 2}" placeholder="\" maxLength="35"></el-input>
              </el-form-item>
              <u v-if="lineStyleFlag">{{docData.inquestAddress}}</u></p>
          </el-col>
          <el-col :span="10">
            <p>天气状况：<el-form-item prop="weather" style="width:140px">
                <el-select v-model="docData.weather" :maxLength='maxLength' placeholder="\">
                  <el-option v-for="item in options" :key="item.name" :label="item.label" :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </p>
          </el-col>
        </el-row>
        <p>
          勘验人：<el-form-item prop="staff1" style="width:80px">
            <!-- <el-input v-model="docData.staff1" :maxLength='maxLength' placeholder="\"></el-input> -->
            <el-select v-model="docData.staff1" :maxLength='maxLength' @change="changeStaff1">
              <el-option v-for="(item,index) in staffList" :key="index" :value="item" :label="item" :disabled="docData.staff2==item"></el-option>
            </el-select>
          </el-form-item>
          单位及职务：<el-form-item prop="staffUnitAndPosition1" style="width:140px">
            <el-input type='textarea' v-model="docData.staffUnitAndPosition1" v-bind:class="{ over_flow:docData.staffUnitAndPosition1.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 2}" placeholder="\" maxLength="35"></el-input>
          </el-form-item>
          执法证号：<el-form-item prop="certificateId1" style="width:150px">
            <el-input  v-model="docData.certificateId1" :maxLength='maxLength' placeholder="\"></el-input>
          </el-form-item>
        </p>
        <p>
          勘验人：<el-form-item prop="staff2" style="width:80px">
            <el-select v-model="docData.staff2" :maxLength='maxLength' @change="changeStaff2">
              <el-option v-for="(item,index) in staffList" :key="index" :value="item" :label="item" :disabled="docData.staff1==item"></el-option>
            </el-select>
          </el-form-item>
          单位及职务：<el-form-item prop="staffUnitAndPosition2" style="width:140px">
            <el-input type='textarea' v-model="docData.staffUnitAndPosition2" v-bind:class="{ over_flow:docData.staffUnitAndPosition2.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 2}" placeholder="\" maxLength="35"></el-input>
          </el-form-item>
          执法证号：<el-form-item prop="certificateId2" style="width:150px">
            <el-input v-model="docData.certificateId2" :maxLength='maxLength' placeholder="\"></el-input>
          </el-form-item>
        </p>
        <p>
          当事人（当事人代理人）姓名：<el-form-item prop="partyPeople" style="width:80px">
            <el-input type='textarea' v-model="docData.partyPeople" v-bind:class="{ over_flow:docData.partyPeople.length>4?true:false }"
                    :autosize="{ minRows: 1, maxRows: 2}" placeholder="\" maxLength="10" :disabled="!partyOriginalData.partyPeople ? false : true"></el-input>
          </el-form-item>
          性别：<el-form-item prop="partyPeopleSex" style="width:70px">
            <!-- <el-input v-model="docData.partyPeopleSex" :maxLength='maxLength' placeholder="\"></el-input> -->
            <el-select v-model="docData.partyPeopleSex" :maxLength="maxLength" placeholder="\" :disabled="!partyOriginalData.partyPeopleSex ? false : true">
              <el-option :value="0" label="男"></el-option>
              <el-option :value="1" label="女"></el-option>
            </el-select>
          </el-form-item>
          年龄：<el-form-item prop="partyPeopleAge" style="width:60px">
            <el-input v-model="docData.partyPeopleAge" :maxLength='maxLength' placeholder="\" :disabled="!partyOriginalData.partyPeopleAge ? false : true"></el-input>
          </el-form-item>
        </p>
    
        <p>
          身份证号：<el-form-item prop="partyPeopleIdNo" style="width:180px">
            <el-input v-model="docData.partyPeopleIdNo" :maxLength='maxLength' placeholder="\" :disabled="!partyOriginalData.partyPeopleIdNo ? false : true"></el-input>
          </el-form-item>
          单位及职务：<el-form-item prop="partyPeopleUnitAndPosition" style="width180">
            <el-input type='textarea' v-model="docData.partyPeopleUnitAndPosition" v-bind:class="{ over_flow:docData.partyPeopleUnitAndPosition.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 2}" placeholder="\" maxLength="35" :disabled="!partyOriginalData.partyPeopleUnitAndPosition.trim() ? false : true"></el-input>
          </el-form-item>
        </p>
        <p>
          住址：<el-form-item prop="partyPeopleAddress" style="width:200px">
            <el-input  type="textarea" v-model="docData.partyPeopleAddress" maxLength='40' placeholder="\" v-bind:class="{ over_flow:docData.partyPeopleAddress.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 2}" :disabled="!partyOriginalData.partyPeopleAddress ? false : true"></el-input>
          </el-form-item>
          联系电话：<el-form-item prop="partyPeopleTel" style="width:200px">
            <el-input v-model="docData.partyPeopleTel" :maxLength='maxLength' placeholder="\" :disabled="!partyOriginalData.partyPeopleTel ? false : true"></el-input>
          </el-form-item>
        </p>
        <p>
          被邀请人：<el-form-item prop="invited" style="width:180px">
            <el-input v-model="docData.invited" maxLength='10' placeholder="\"></el-input>
          </el-form-item>
          单位及职务：<el-form-item prop="invitedUnitAndPosition" style="width:180px">
            <el-input type="textarea" v-model="docData.invitedUnitAndPosition" v-bind:class="{ over_flow:docData.invitedUnitAndPosition.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 2}" placeholder="\" maxLength="35"></el-input>
          </el-form-item>
        </p>
        <p>
          记录人：<el-form-item prop="recorder">
            <!-- <el-autocomplete v-model="docData.recorder" :maxLength='maxLength' placeholder="\" :fetch-suggestions="queryStaff"  @select="handleSelect"></el-autocomplete> -->
            <!-- <el-select v-model="docData.recorder" :maxLength='maxLength'>
              <el-option v-for="(item,index) in userList" :key="index" :value="item" :label="item"></el-option>
            </el-select> -->
            <el-autocomplete
              class="inline-input"
              v-model="docData.recorder"
              :fetch-suggestions="querySearch"
              placeholder="\"
            ></el-autocomplete>
          </el-form-item>
          单位及职务：<el-form-item prop="recorderUnitAndPosition">
            <el-input type="textarea" v-model="docData.recorderUnitAndPosition" v-bind:class="{ over_flow:docData.recorderUnitAndPosition.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 2}" placeholder="\" maxLength="35"></el-input>
          </el-form-item>
        </p>
       
        <!-- 多行样式 -->
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item prop="inquestResult">
              <el-input class='text_indent10 overflow_lins_textarea' type='textarea' v-model="docData.inquestResult" rows="3" maxLength='90' placeholder="\"></el-input>
              <span class="overflow_describe" style="text-indent:0">勘验情况及结果：</span>
              <span  class="span_bg span_bg_top" @click="overFlowEdit">&nbsp;</span>
              <span v-for="item in overFlowEditList" :key="item.id" class="span_bg" @click="overFlowEdit">&nbsp;</span>
            </el-form-item>
          </div>

        </div>
        <el-row :gutter="20">
          <el-col :span="13">
            当事人或其代理人签名：
            <span class="write_line" style="width:145px"></span>
          </el-col>
          <el-col :span="11">
            勘验人签名：
            <span class="write_line" style="width:170px"></span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            被邀请人签名：<span class="write_line" style="width:512px"></span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="13">
            记录人签名：<span class="write_line" style="width:190px"></span>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <casePageFloatBtns :formOrDocData="formOrDocData" @submitData="submitData" @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>
    <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput>
  </div>
</template>
<script>
import overflowInput from "../pdf/overflowInput";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
// 验证规则
import { validatePhone, validateIDNumber } from "@/common/js/validator";
import { queryUserListByOrganIdApi } from "@/api/system";
import iLocalStroage from "@/common/js/localStroage";
import {
  findCaseAllBindPropertyApi,
} from "@/api/caseHandle";
export default {

  data() {
    //验证开始时间
    var validateStartTime = (rule, value, callback) => {
      let parseInquestStartTime = this.docData.inquestStartTime.replace('年','-').replace('月','-').replace('日',' ').replace('时',":").replace('分',"");
      let parseinquestEndTime = this.docData.inquestEndTime.replace('年','-').replace('月','-').replace('日',' ').replace('时',":").replace('分',"");
    //  console.log(Date.parse(this.docData.inquestStartTime),Date.parse(this.docData.inquestEndTime))
      if(Date.parse(parseInquestStartTime)>Date.parse(parseinquestEndTime)){
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
      // inquestResult:'',
      restaurants: [],
      overFlowEditList:[{},{}],
      docData: {
        caseNumber: "",
        caseName: "",
        inquestStartTime: "",
        inquestEndTime: "",
        inquestAddress: "",
        weather: "",
        staff1: "",
        staffUnitAndPosition1: "",
        certificateId1: "",
        staff2: "",
        staffUnitAndPosition2: "",
        certificateId2: "",
        partyPeople: "",
        partyPeopleSex: "",
        partyPeopleAge: "",
        partyPeopleIdNo: "",
        partyPeopleUnitAndPosition: "",
        partyPeopleAddress: "",
        partyPeopleTel: "",
        invited: "",
        invitedUnitAndPosition: "",
        recorder: "",
        recorderUnitAndPosition: "",
        inquestResult: "",
        partySign: "",
        inquestedSign: "",
        invitedSign: "",
        recorderSign: "",
        overWidthFlag: false,
        inquestResult: '',//多行编辑内容
        needDealData:true,
      },
      rules: {
        partyPeople:[{ required: true, message: "当事人姓名不能为空", trigger: "blur" }],
        partyPeopleTel:[{ validator:validatePhone , trigger: "blur" }],
        partyPeopleIdNo:[{ validator:validateIDNumber , trigger: "blur"}],
        inquestAddress:[{ required: true, message: "勘验场所不能为空", trigger: "blur" }],
        staff1:[{ required: true, message: "勘验人不能为空", trigger: "blur" }],
        staffUnitAndPosition1:[{ required: true, message: "勘验人单位及职务不能为空", trigger: "blur" }],
        certificateId1:[{ required: true, message: "执法证号不能为空", trigger: "blur" }],
        staff2:[{ required: true, message: "勘验人不能为空", trigger: "blur" }],
        staffUnitAndPosition2:[{ required: true, message: "勘验人单位及职务不能为空", trigger: "blur" }],
        certificateId2:[{ required: true, message: "执法证号不能为空", trigger: "blur" }],
        recorder:[{ required: true, message: "记录人不能为空", trigger: "blur" }],
        inquestResult:[{ required: true, message: "勘验情况及结果不能为空", trigger: "blur" }],
        inquestEndTime: [
          { validator:validateStartTime , trigger: "blur" }
        ],
        inquestStartTime: [
          { validator:validateStartTime , trigger: "blur" }
        ],
      },
      caseDocDataForm: {
        id: "",   //修改的时候用
        caseBasicinfoId: '',   //案件ID
        caseDoctypeId: this.$route.params.docId,    //文书类型ID
        //文书数据
        docData: "",
        status: "",   //提交状态
        linkTypeId:'2c90293b6c178b55016c17c93326000f' //所属环节的id
      },
      handleType: "",  // 0 暂存  1  提交
      dictId: "2dc1e0a3a8ce225c292259da39294847",
      options: [],
      lineStyleFlag: false,
      maxLength: '23',
      length: "",
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        pageDomId:'inquestNote_print'
      },
      staffList:[],
      // userList:['papas'], //机构下的人员
      userData:[],
      needDealData:true,
      needSetDisabled:true,
      partyOriginalData:"",
    }

  },
  inject: ["reload"],
  components: {
    overflowInput,
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { 
    ...mapGetters(['caseId']) ,
    replaceInquestEndTime(){
      if(this.docData.inquestEndTime){
        let inquestEndTimeArr=this.docData.inquestEndTime.split('月');
        return inquestEndTimeArr[1]
      }
    }
  },
  methods: {
    checkHeights() {
      console.log('this.inputInfos')
      if (this.docData.inquestResult.length > 10) {
        this.overWidthFlag = true;
      }
      else
        this.overWidthFlag = false;
    },
  
     // 多行编辑
    overFlowEdit() {
      this.$refs.overflowInputRef.showModal(0, '', this.maxLengthOverLine);
    },
    // 获取多行编辑内容
    getOverFloeEditInfo(edit) {
      console.log('回显', edit)
      this.docData.inquestResult = edit;
    },
    // 盖章
    makeSeal() {
      signature.openURL('oeder');
    },
  
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId
      };
      console.log(data);
      this.com_getDocDataByCaseIdAndDocId(data);
    },
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
    isOverStatus() {
      if (this.$route.params.docStatus == '1') {
        this.formOrDocData.showBtn = [false, false, false, false, false, false, false, false, false, true]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    },
    //获取天气字典值
    getDictKeyList() {
      this.$store.dispatch("getDictListDetail", this.dictId).then(
        res => {
          console.log("字典值列表", res);
          this.options = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    // 盖章
    makeSeal() {
      signature.openURL('oeder');
    },
    // 打印
    print() {
      console.log('打印!');
    },
    getDataAfter() {
      this.staffList=this.docData.staff.split(',');
      this.docData.staff1 = this.docData.staff.split(',')[0];
      this.docData.certificateId1 = this.docData.certificateId.split(',')[0];
      let dailiData = {};
      console.log('this.docData',this.docData);
      if(this.docData.partyType == '1'){ //当事人类型为个人
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
      }else if(this.docData.partyType == '2'){ //当事人类型为企业
          dailiData = JSON.parse(this.docData.agentPartyEcertId)[0];
          console.log('代理人信息',dailiData);
         
      }
      this.setDataForPelple(dailiData);
    },
    //设置禁用
    setDataDisable(){

    },
    //修改勘验人员
    changeStaff1(val){
      let staffIndex = this.docData.staff.split(',').indexOf(val);
      this.docData.certificateId1 = this.docData.certificateId.split(',')[staffIndex];
      console.log(staffIndex);
    },
    changeStaff2(val){
      let staffIndex = this.docData.staff.split(',').indexOf(val);
      this.docData.certificateId2 = this.docData.certificateId.split(',')[staffIndex];
      console.log(staffIndex);
    },
    //记录人 查询本机构下的人员
    findUserByOrgan(){
      queryUserListByOrganIdApi(iLocalStroage.gets('userInfo').organId).then(res=>{
        console.log(res);
        this.userData = res.data;
        
      },err=>{
        console.log(err);
      })
    },
    //记录人 可输入也可以选择
    querySearch(queryString, cb){
      let userData = this.userData;
      var results = queryString ? userData.filter(this.createFilter(queryString)) : userData;
      let a = [];
      results.forEach(item=>{
        a.push({value:item.username})
      })
      cb(a);
    },
    createFilter(queryString) {
        return (userData) => {
          // console.log('userData2',userData)
          return (userData.username.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
    setDataForPelple(dailiData){
       this.docData.partyPeople = dailiData.name;
        this.docData.partyPeopleSex = Number(dailiData.sex);
        this.docData.partyPeopleIdNo = dailiData.zhengjianNumber;
        this.docData.partyPeopleAge = dailiData.age,
        this.docData.partyPeopleUnitAndPosition = dailiData.company + " " + dailiData.position;
        this.docData.partyPeopleAddress = dailiData.adress;
        this.docData.partyPeopleTel = dailiData.tel;
        //设置禁用
        this.partyOriginalData =JSON.parse(JSON.stringify(this.docData));
        console.log('this.partyOriginalData',this.partyOriginalData);
    },
    setDisabledData(){
      let data = {
        caseBasicInfoId: this.caseId,
        typeId: this.$route.params.docId
      };
      console.log('data', data);
      findCaseAllBindPropertyApi(data).then(
        res => {
          console.log('获取案件信息', res);
          let caseOriData = JSON.parse(res.data.propertyData);
          let agentPartyEcert = JSON.parse(caseOriData.agentPartyEcertId)[0];
          this.partyOriginalData ={
            partyPeople:caseOriData.partyType == '1' ? caseOriData.party : agentPartyEcert.name,
            partyPeopleSex:caseOriData.partyType == '1' ? caseOriData.partySex : agentPartyEcert.sex,
            partyPeopleIdNo:caseOriData.partyType == '1' ? caseOriData.partyIdNo : agentPartyEcert.zhengjianNumber,
            partyPeopleAge:caseOriData.partyType == '1' ? caseOriData.partyAge : agentPartyEcert.age,
            partyPeopleUnitAndPosition:caseOriData.partyType == '1' ? caseOriData.partyUnitPosition + " " + caseOriData.occupation : agentPartyEcert.company + " " + agentPartyEcert.position,
            partyPeopleAddress:caseOriData.partyType == '1' ? caseOriData.partyAddress : agentPartyEcert.adress,
            partyPeopleTel:caseOriData.partyType == '1' ? caseOriData.partyTel : agentPartyEcert.tel,
          }   

        },
        error => {
          console.log(error)
        }
      );
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
  created() {
    this.getDocDataByCaseIdAndDocId(); 
    this.isOverStatus();

    //加载天气抽屉表
    this.getDictKeyList();
    //加载记录人
    this.findUserByOrgan();
    //获取执法人员
    this.getLawOfficer();
  },
}
</script>
<style lang="scss">
@import "@/assets/css/caseHandle/caseDocModle.scss";
#inquestNote_print{
  .dataTimeReplaceBox{
    position: relative;
    .el-form-item__content .el-date-editor--datetime{
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
