<template>
  <div class="print_box">
    <div class="print_info indent_style" id="inquestNote_print">
      <el-form ref="docForm" :inline-message="true" :inline="true" :model="docData" :rules="rules">
        <div class="doc_topic">勘验笔录</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <!-- <el-button @click="onSubmit('docForm')">formName</el-button> -->
        <p>案由：
          <el-form-item v-if="!lineStyleFlag" prop="caseName" style="width:570px" :rules="fieldRules('caseName',propertyFeatures['caseName'])">

            <el-input type='textarea' v-model="docData.caseName" v-bind:class="{ over_flow:docData.caseName && docData.caseName.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 2}" placeholder="\" maxLength="90" :disabled="fieldDisabled(propertyFeatures['caseName'])"></el-input>
          </el-form-item>
          <u v-if="lineStyleFlag">{{docData.caseName}}</u>
        </p>
        <p>
          勘验时间：<el-form-item prop="inquestStartTime" class="pdf_datapick dataTimeReplaceBox" style="width:250px" :rules="fieldRules('inquestStartTime',propertyFeatures['inquestStartTime'])">
            <el-date-picker v-model="docData.inquestStartTime" type="datetime" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" style="width:250px" :disabled="fieldDisabled(propertyFeatures['inquestStartTime'])">
            </el-date-picker>
            <el-input class="replaceTime" placeholder=" 年 月 日 时 分" v-model="replaceInquestStartTime"></el-input>
          </el-form-item>
          至
          <el-form-item prop="inquestEndTime" class="pdf_datapick dataTimeReplaceBox" style="width:212px" :rules="fieldRules('inquestEndTime',propertyFeatures['inquestEndTime'])">
            <el-date-picker v-model="docData.inquestEndTime" type="datetime" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :disabled="fieldDisabled(propertyFeatures['inquestEndTime'])">
            </el-date-picker>
            <el-input class="replaceTime" placeholder=" 日 时 分" v-model="replaceInquestEndTime"></el-input>
          </el-form-item>
        </p>
        <el-row>
          <el-col :span="14">
            <p>勘验场所：<el-form-item v-if="!lineStyleFlag" prop="inquestAddress" style="width:240px" :rules="fieldRules('inquestAddress',propertyFeatures['inquestAddress'])">
                <el-input type='textarea' v-model="docData.inquestAddress" v-bind:class="{ over_flow:docData.inquestAddress && docData.inquestAddress.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 2}" placeholder="\" maxLength="35" :disabled="fieldDisabled(propertyFeatures['inquestAddress'])"></el-input>
              </el-form-item>
              <u v-if="lineStyleFlag">{{docData.inquestAddress}}</u></p>
          </el-col>
          <el-col :span="10">
            <p>天气情况：<el-form-item prop="weather" style="width:140px" :rules="fieldRules('weather',propertyFeatures['weather'])">
                <el-select v-model="docData.weather" :maxLength='maxLength' placeholder="\" :disabled="fieldDisabled(propertyFeatures['weather'])">
                  <el-option v-for="item in options" :key="item.name" :label="item.label" :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </p>
          </el-col>
        </el-row>
        <p>
          勘验人：<el-form-item prop="staff1" style="width:80px" :rules="fieldRules('staff1',propertyFeatures['staff1'])">
            <el-select v-model="docData.staff1" :maxLength='maxLength' @change="changeStaff1" :disabled="fieldDisabled(propertyFeatures['staff1'])">
              <el-option v-for="(item,index) in staffList" :key="index" :value="item" :label="item" :disabled="docData.staff2==item"></el-option>
            </el-select>
          </el-form-item>
          单位及职务：<el-form-item prop="staffUnitAndPosition1" style="width:140px" :rules="fieldRules('staffUnitAndPosition1',propertyFeatures['staffUnitAndPosition1'])">
            <el-input type='textarea' v-model="docData.staffUnitAndPosition1" v-bind:class="{ over_flow:docData.staffUnitAndPosition1 && docData.staffUnitAndPosition1.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 2}" placeholder="\" maxLength="35" :disabled="fieldDisabled(propertyFeatures['staffUnitAndPosition1'])"></el-input>
          </el-form-item>
          执法证号：<el-form-item prop="certificateId1" style="width:150px" :rules="fieldRules('certificateId1',propertyFeatures['certificateId1'])">
            <el-input v-model="docData.certificateId1" :maxLength='maxLength' placeholder="\" :disabled="fieldDisabled(propertyFeatures['certificateId1'])"></el-input>
          </el-form-item>
        </p>
        <p>
          勘验人：<el-form-item prop="staff2" style="width:80px" :rules="fieldRules('staff2',propertyFeatures['staff2'])">
            <el-select v-model="docData.staff2" :maxLength='maxLength' @change="changeStaff2" :disabled="fieldDisabled(propertyFeatures['staff2'])">
              <el-option v-for="(item,index) in staffList" :key="index" :value="item" :label="item" :disabled="docData.staff1==item"></el-option>
            </el-select>
          </el-form-item>
          单位及职务：<el-form-item prop="staffUnitAndPosition2" style="width:140px" :rules="fieldRules('staffUnitAndPosition2',propertyFeatures['staffUnitAndPosition2'])">
            <el-input type='textarea' v-model="docData.staffUnitAndPosition2" v-bind:class="{ over_flow:docData.staffUnitAndPosition2 && docData.staffUnitAndPosition2.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 2}" placeholder="\" maxLength="35" :disabled="fieldDisabled(propertyFeatures['staffUnitAndPosition2'])"></el-input>
          </el-form-item>
          执法证号：<el-form-item prop="certificateId2" style="width:150px" :rules="fieldRules('certificateId2',propertyFeatures['certificateId2'])">
            <el-input v-model="docData.certificateId2" :maxLength='maxLength' placeholder="\" :disabled="fieldDisabled(propertyFeatures['certificateId2'])"></el-input>
          </el-form-item>
        </p>
        <p>
          当事人（当事人代理人）姓名：<el-form-item prop="partyPeople" style="width:80px" :rules="fieldRules('partyPeople',propertyFeatures['partyPeople'])">
            <el-input type='textarea' v-model="docData.partyPeople" v-bind:class="{ over_flow:docData.partyPeople && docData.partyPeople.length>4?true:false }" :autosize="{ minRows: 1, maxRows: 2}" placeholder="\" maxLength="10" :disabled="fieldDisabled(propertyFeatures['partyPeople'])"></el-input>
          </el-form-item>
          性别：<el-form-item prop="partyPeopleSex" style="width:70px" :rules="fieldRules('partyPeopleSex',propertyFeatures['partyPeopleSex'])">
            <el-select v-model="docData.partyPeopleSex" :maxLength="maxLength" placeholder="\" :disabled="fieldDisabled(propertyFeatures['partyPeopleSex'])">
              <el-option value="0" label="男"></el-option>
              <el-option value="1" label="女"></el-option>
            </el-select>
          </el-form-item>
          年龄：<el-form-item prop="partyPeopleAge" style="width:60px" :rules="fieldRules('partyPeopleAge',propertyFeatures['partyPeopleAge'])">
            <el-input v-model="docData.partyPeopleAge" :maxLength='maxLength' placeholder="\" :disabled="fieldDisabled(propertyFeatures['partyPeopleAge'])"></el-input>
          </el-form-item>
        </p>

        <p>
          身份证号：<el-form-item prop="partyPeopleIdNo" style="width:180px" :rules="fieldRules('partyPeopleIdNo',propertyFeatures['partyPeopleIdNo'],validateIDNumber)">
            <el-input v-model="docData.partyPeopleIdNo" :maxLength='maxLength' placeholder="\" :disabled="fieldDisabled(propertyFeatures['partyPeopleIdNo'])"></el-input>
          </el-form-item>
          单位及职务：<el-form-item prop="partyPeopleUnitAndPosition" style="width:180px" :rules="fieldRules('partyPeopleUnitAndPosition',propertyFeatures['partyPeopleUnitAndPosition'])">
            <el-input type='textarea' v-model="docData.partyPeopleUnitAndPosition" v-bind:class="{ over_flow:docData.partyPeopleUnitAndPosition && docData.partyPeopleUnitAndPosition.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 2}" placeholder="\" maxLength="35" :disabled="fieldDisabled(propertyFeatures['partyPeopleUnitAndPosition'])"></el-input>
          </el-form-item>
        </p>
        <p>
          住址：<el-form-item prop="partyPeopleAddress" style="width:200px" :rules="fieldRules('partyPeopleAddress',propertyFeatures['partyPeopleAddress'])">
            <el-input type="textarea" v-model="docData.partyPeopleAddress" maxLength='40' placeholder="\" v-bind:class="{ over_flow:docData.partyPeopleAddress && docData.partyPeopleAddress.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 2}" :disabled="fieldDisabled(propertyFeatures['partyPeopleAddress'])"></el-input>
          </el-form-item>
          联系电话：<el-form-item prop="partyPeopleTel" style="width:200px" :rules="fieldRules('partyPeopleTel',propertyFeatures['partyPeopleTel'],validatePhone)">
            <el-input v-model="docData.partyPeopleTel" :maxLength='maxLength' placeholder="\" :disabled="fieldDisabled(propertyFeatures['partyPeopleTel'])"></el-input>
          </el-form-item>
        </p>
        <p>
          被邀请人：<el-form-item prop="invited" style="width:180px" :rules="fieldRules('invited',propertyFeatures['invited'])">
            <el-input v-model="docData.invited" maxLength='10' placeholder="\" :disabled="fieldDisabled(propertyFeatures['invited'])"></el-input>
          </el-form-item>
          单位及职务：<el-form-item prop="invitedUnitAndPosition" style="width:180px" :rules="fieldRules('invitedUnitAndPosition',propertyFeatures['invitedUnitAndPosition'])">
            <el-input type="textarea" v-model="docData.invitedUnitAndPosition" v-bind:class="{ over_flow:docData.invitedUnitAndPosition && docData.invitedUnitAndPosition.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 2}" placeholder="\" maxLength="35" :disabled="fieldDisabled(propertyFeatures['invitedUnitAndPosition'])"></el-input>
          </el-form-item>
        </p>
        <p>
          记录人：<el-form-item prop="recorder" :rules="fieldRules('recorder',propertyFeatures['recorder'])">
            <el-autocomplete class="inline-input" v-model="docData.recorder" :fetch-suggestions="querySearch" placeholder="\" :disabled="fieldDisabled(propertyFeatures['recorder'])"></el-autocomplete>
          </el-form-item>
          单位及职务：<el-form-item prop="recorderUnitAndPosition" style="width:180px" :rules="fieldRules('recorderUnitAndPosition',propertyFeatures['recorderUnitAndPosition'])">
            <el-input type="textarea" v-model="docData.recorderUnitAndPosition" v-bind:class="{ over_flow:docData.recorderUnitAndPosition && docData.recorderUnitAndPosition.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 2}" placeholder="\" maxLength="35" :disabled="fieldDisabled(propertyFeatures['recorderUnitAndPosition'])"></el-input>
          </el-form-item>
        </p>

        <!-- 多行样式 -->
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item prop="inquestResult" :rules="fieldRules('inquestResult',propertyFeatures['inquestResult'])">
              <el-input class='text_indent10 overflow_lins_textarea' type='textarea' v-model="docData.inquestResult" rows="3" maxLength='90' placeholder="\" :disabled="fieldDisabled(propertyFeatures['inquestResult'])"></el-input>
              <span class="overflow_describe" style="text-indent:0">勘验情况及结果：</span>
              <span class="span_bg span_bg_top" @click="overFlowEdit">&nbsp;</span>
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
    <!-- <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput> -->
  </div>
</template>
<script>
// import overflowInput from "../pdf/overflowInput";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import { findLawOfficerApi } from "@/api/caseHandle";
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
      let parseInquestStartTime = this.docData.inquestStartTime
      let parseinquestEndTime = this.docData.inquestEndTime
      if (Date.parse(parseInquestStartTime) > Date.parse(parseinquestEndTime)) {
        this.$message({
          showClose: true,
          message: '开始时间不得大于结束时间',
          type: 'error',
          offset: 100,
          customClass: 'validateErrorTip'
        });
        return callback(new Error("开始时间不得大于结束时间"));
      }
      if (Date.parse(parseinquestEndTime) > Date.parse(new Date())) {
        this.$message({
          showClose: true,
          message: '结束时间不得大于当前时间',
          type: 'error',
          offset: 100,
          customClass: 'validateErrorTip'
        });
        this.docData.inquestEndTime = ""
        return callback(new Error("结束时间不得大于当前时间"));
      }
      if (Date.parse(parseInquestStartTime) > Date.parse(new Date())) {
        this.$message({
          showClose: true,
          message: '开始时间不得大于当前时间',
          type: 'error',
          offset: 100,
          customClass: 'validateErrorTip'
        });
        this.docData.inquestStartTime = ""
        return callback(new Error("开始时间不得大于当前时间"));
      }
      callback();
    };
    return {
      // inquestResult:'',
      validatePhone: validatePhone,
      validateIDNumber: validateIDNumber,
      restaurants: [],
      overFlowEditList: [{}, {}],
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
        staff: '',
        certificateId: '',
      },
      rules: {
        caseName: [{ required: true, message: "案由不能为空", trigger: "blur" }],
        partyPeople: [{ required: true, message: "当事人姓名不能为空", trigger: "blur" }],
        partyPeopleTel: [{ required: true, message: "联系电话不能为空", trigger: "blur" }, { validator: validatePhone, trigger: "blur" }],
        partyPeopleIdNo: [{ required: true, message: "身份证号不能为空", trigger: "blur" }, { validator: validateIDNumber, trigger: "blur" }],
        partyPeopleAge: [{ required: true, message: "年龄不能为空", trigger: "blur" }],
        partyPeopleUnitAndPosition: [{ required: true, message: "单位及职务不能为空", trigger: "blur" }],
        partyPeopleAddress: [{ required: true, message: "住址不能为空", trigger: "blur" }],
        inquestAddress: [{ required: true, message: "勘验场所不能为空", trigger: "blur" }],
        weather: [{ required: true, message: "天气状态不能为空", trigger: "change" }],
        staff1: [{ required: true, message: "勘验人不能为空", trigger: "blur" }],
        staffUnitAndPosition1: [{ required: true, message: "勘验人单位及职务不能为空", trigger: "blur" }],
        certificateId1: [{ required: true, message: "执法证号不能为空", trigger: "blur" }],
        staff2: [{ required: true, message: "勘验人不能为空", trigger: "blur" }],
        staffUnitAndPosition2: [{ required: true, message: "勘验人单位及职务不能为空", trigger: "blur" }],
        certificateId2: [{ required: true, message: "执法证号不能为空", trigger: "blur" }],
        invited: [{ required: true, message: "被邀请人不能为空", trigger: "blur" }],
        invitedUnitAndPosition: [{ required: true, message: "被邀请人单位及职务不能为空", trigger: "blur" }],
        recorder: [{ required: true, message: "记录人不能为空", trigger: "blur" }],
        recorderUnitAndPosition: [{ required: true, message: "记录人单位及职务不能为空", trigger: "blur" }],
        inquestResult: [{ required: true, message: "勘验情况及结果不能为空", trigger: "blur" }],
        inquestStartTime: [
          { required: true, message: "开始时间不能为空", trigger: "blur" },
          { validator: validateStartTime, trigger: "blur" }
        ],
        inquestEndTime: [
          { required: true, message: "结束时间不能为空", trigger: "blur" },
          { validator: validateStartTime, trigger: "blur" }
        ],


      },
      caseDocDataForm: {
        id: "",   //修改的时候用
        caseBasicinfoId: '',   //案件ID
        caseDoctypeId: this.$route.params.docId,    //文书类型ID
        //文书数据
        docData: "",
        status: "",   //提交状态
        linkTypeId: this.$route.params.caseLinkTypeId //所属环节的id
      },
      handleType: "",  // 0 暂存  1  提交
      dictId: "2dc1e0a3a8ce225c292259da39294847",
      options: [],
      lineStyleFlag: false,
      maxLength: '23',
      length: "",
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        pageDomId: 'inquestNote_print'
      },
      staffList: [],
      // userList:['papas'], //机构下的人员
      userData: [],
      needDealData: true,
      needSetDisabled: true,
      partyOriginalData: "",
      propertyFeatures: '', //字段属性配置
    }

  },
  inject: ["reload"],
  components: {
    // overflowInput,
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: {
    ...mapGetters(['caseId']),
    replaceInquestEndTime() {
      if (this.docData.inquestEndTime) {
        // let inquestEndTimeArr=this.docData.inquestEndTime.split('月');
        // return inquestEndTimeArr[1]
        return new Date(this.docData.inquestEndTime).format('dd日HH时mm分')
      }
    },
    replaceInquestStartTime() {
      if (this.docData.inquestStartTime) {
        return new Date(this.docData.inquestStartTime).format('yyyy年MM月dd日HH时mm分')
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
      // this.$refs.overflowInputRef.showModal(0, '', this.maxLengthOverLine);
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
      // this.printContent()
      console.log(this.docData.partyPeopleSex)
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
      this.staffList = this.docData.staff.split(',');
      this.docData.staff1 = this.docData.staff.split(',')[0];
      this.docData.certificateId1 = this.docData.certificateId.split(',')[0];
      let dailiData = {};
      console.log('this.docData', this.docData);
      if (this.docData.partyType == '1') { //当事人类型为个人
        dailiData = {
          name: this.docData.party,
          sex: this.docData.partySex,
          zhengjianNumber: this.docData.partyIdNo,
          age: this.docData.partyAge,
          company: this.docData.partyUnitPosition,
          position: this.docData.occupation,
          tel: this.docData.partyTel,
          adress: this.docData.partyAddress,
        }
      } else if (this.docData.partyType == '2') { //当事人类型为企业
        dailiData = JSON.parse(this.docData.agentPartyEcertId)[0];
        console.log('代理人信息', dailiData);

      }
      let data = {
        lawOfficerName:this.docData.staff1,
        lawOfficerCards:this.docData.certificateId1
      }
      this.queryLawOfficerInfo(data,1)
      this.setDataForPelple(dailiData);
    },
    //设置禁用
    setDataDisable() {

    },
    //修改勘验人员
    changeStaff1(val) {
      let staffIndex = this.docData.staff.split(',').indexOf(val);
      this.docData.certificateId1 = this.docData.certificateId.split(',')[staffIndex];
      console.log(staffIndex);  
      let data = {
        lawOfficerName:val,
        lawOfficerCards:this.docData.certificateId1
      }
      console.log("执法人员姓名和执法证号",data);
      this.queryLawOfficerInfo(data,1)
    },
    changeStaff2(val) {
      let staffIndex = this.docData.staff.split(',').indexOf(val);
      this.docData.certificateId2 = this.docData.certificateId.split(',')[staffIndex];
      console.log(staffIndex);
      let data = {
        lawOfficerName:val,
        lawOfficerCards:this.docData.certificateId2
      }
      console.log("执法人员姓名和执法证号",data);
      this.queryLawOfficerInfo(data,2)
    },
    //记录人 查询本机构下的人员
    findUserByOrgan() {
      queryUserListByOrganIdApi(iLocalStroage.gets('userInfo').organId).then(res => {
        console.log(res);
        this.userData = res.data;

      }, err => {
        console.log(err);
      })
    },
    //记录人 可输入也可以选择
    querySearch(queryString, cb) {
      let userData = this.userData;
      var results = queryString ? userData.filter(this.createFilter(queryString)) : userData;
      let a = [];
      results.forEach(item => {
        a.push({ value: item.nickName })
      })
      cb(a);
    },
    createFilter(queryString) {
      return (userData) => {
        // console.log('userData2',userData)
        return (userData.nickName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    setDataForPelple(dailiData) {
      this.docData.partyPeople = dailiData.name;
      // this.docData.partyPeopleSex = Number(dailiData.sex);
      this.docData.partyPeopleSex = dailiData.sex;
      if (this.docData.partyPeopleSex == '') {
        this.docData.partyPeopleSex = "0"
      }
      this.docData.partyPeopleIdNo = dailiData.zhengjianNumber;
      this.docData.partyPeopleAge = dailiData.age,
        this.docData.partyPeopleUnitAndPosition = dailiData.company + " " + dailiData.position;
      this.docData.partyPeopleAddress = dailiData.adress;
      this.docData.partyPeopleTel = dailiData.tel;
      //设置禁用
      this.partyOriginalData = JSON.parse(JSON.stringify(this.docData));
      console.log('this.partyOriginalData', this.partyOriginalData);
    },
    setDisabledData() {
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
          this.partyOriginalData = {
            partyPeople: caseOriData.partyType == '1' ? caseOriData.party : agentPartyEcert.name,
            partyPeopleSex: caseOriData.partyType == '1' ? caseOriData.partySex : agentPartyEcert.sex,
            partyPeopleIdNo: caseOriData.partyType == '1' ? caseOriData.partyIdNo : agentPartyEcert.zhengjianNumber,
            partyPeopleAge: caseOriData.partyType == '1' ? caseOriData.partyAge : agentPartyEcert.age,
            partyPeopleUnitAndPosition: caseOriData.partyType == '1' ? caseOriData.partyUnitPosition + " " + caseOriData.occupation : agentPartyEcert.company + " " + agentPartyEcert.position,
            partyPeopleAddress: caseOriData.partyType == '1' ? caseOriData.partyAddress : agentPartyEcert.adress,
            partyPeopleTel: caseOriData.partyType == '1' ? caseOriData.partyTel : agentPartyEcert.tel,
          }

        },
        error => {
          console.log(error)
        }
      );
    },
    //获取执法人员
    getLawOfficer() {
      let data = {
        caseBasicInfoId: this.caseId,
        typeId: this.$route.params.docId
      };
      findCaseAllBindPropertyApi(data).then(res => {
        console.log(res);
        let data2 = JSON.parse(res.data.propertyData);
        this.staffList = data2.staff.split(',');
      }, err => {
        console.log(err);
      })
    },
    //根据执法人员姓名执法证号获取执法人员信息
    queryLawOfficerInfo(data,num){
      findLawOfficerApi(data).then(res => {
        let staffInfo = res.data;
        if(num == 1){
          this.docData.staffUnitAndPosition1 = staffInfo.organName
        }else{
          this.docData.staffUnitAndPosition2 = staffInfo.organName
        }
      }, err => {
        console.log(err);
      })
    },
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
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">
/* @import "@/assets/css/caseHandle/caseDocModle.scss"; */
#inquestNote_print {
  .dataTimeReplaceBox {
    position: relative;
    .el-form-item__content .el-date-editor--datetime {
      opacity: 0;
      position: absolute;
      z-index: 2;
    }
    .replaceTime {
      position: absolute;
      top: 0;
      left: 10px;
    }
  }
}
</style>
