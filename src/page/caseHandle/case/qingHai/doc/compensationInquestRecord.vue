<template>
  <div class="print_box">
    <div class="print_info" id="compensationInquestRecord_print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">公路赔（补）偿案件勘验检查笔录</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <table
          class="print_table prolong_table"
          border="1"
          bordercolor="black"
          width="100%"
          cellspacing="0"
        >
          <tr>
            <td  colspan="2" class="color_DBE4EF" style="border-right-width:0px">
              <p>
                案由:
              </p>
            </td>
            <td colspan="16" class="color_DBE4EF" style="border-left-width:0px">
                <el-form-item
                  prop="caseName"
                  :rules="fieldRules('caseName',propertyFeatures['caseName'])"
                >
                  <el-input
                    type="textarea"
                    v-model="docData.caseName"
                    :disabled="fieldDisabled(propertyFeatures['caseName'])"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    placeholder="\"
                  ></el-input>
                </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="18" class="color_DBE4EF">
              <p>
                勘验时间：
                <el-form-item
                  prop="inquestStartTime"
                  style="width:200px"
                  class="pdf_datapick dataTimeReplaceBox"
                  :rules="fieldRules('inquestStartTime',propertyFeatures['inquestStartTime'])"
                >
                  <el-date-picker
                    v-model="docData.inquestStartTime"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm"
                    :disabled="fieldDisabled(propertyFeatures['inquestStartTime'])"
                  ></el-date-picker>
                  <el-input
                    class="replaceTime"
                    placeholder="    年  月  日  时  分"
                    v-model="replaceInquestStartTime"
                  ></el-input>
                </el-form-item>
                至
                <el-form-item
                  prop="inquestEndTime"
                  style="width:200px"
                  class="pdf_datapick dataTimeReplaceBox"
                  :rules="fieldRules('inquestEndTime',propertyFeatures['inquestEndTime'])"
                >
                  <el-date-picker
                    v-model="docData.inquestEndTime"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm"
                    :disabled="fieldDisabled(propertyFeatures['inquestEndTime'])"
                  ></el-date-picker>
                  <el-input
                    class="replaceTime"
                    placeholder="    年  月  日  时  分"
                    v-model="replaceInquestEndTime"
                  ></el-input>
                </el-form-item>
              </p>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <p>天气情况：</p>
            </td>
            <td colspan="3">
                <el-form-item
                  prop="weather"
                  :rules="fieldRules('weather',propertyFeatures['weather'])"
                >
                  <el-select
                    v-model="docData.weather"
                    :maxLength="maxLength"
                    placeholder="请选择"
                    :disabled="fieldDisabled(propertyFeatures['weather'])"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.name"
                      :label="item.label"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
            </td>
            <td colspan="3">
              <p>勘验场所：</p>
            </td>
            <td colspan="9" class="color_DBE4EF">
                <el-form-item
                  prop="partyName"
                  :rules="fieldRules('partyName',propertyFeatures['partyName'])"
                >
                  <el-input
                    type="textarea"
                    v-model="docData.partyName"
                    :disabled="fieldDisabled(propertyFeatures['partyName'])"
                    :autosize="{ minRows: 1, maxRows: 2}"
                    placeholder="\"
                  ></el-input>
                </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <p>勘验人1</p>
            </td>
            <td colspan="3" class="color_DBE4EF">
                <el-form-item
                  prop="staff1"
                  :rules="fieldRules('staff1',propertyFeatures['staff1'])"
                >
                  <el-select
                    v-model="docData.staff1"
                    :maxLength="maxLength"
                    @change="changeStaff1"
                    :disabled="fieldDisabled(propertyFeatures['staff1'])"
                  >
                    <el-option
                      v-for="(item,index) in staffList"
                      :key="index"
                      :value="item"
                      :label="item"
                      :disabled="docData.staff2==item"
                    ></el-option>
                  </el-select>
                </el-form-item>
            </td>
            <td colspan="3">
              <p>单位及职务</p>
            </td>
            <td colspan="9" class="color_DBE4EF">
                <el-form-item
                  prop="staffUnitAndPosition1"
                  :rules="fieldRules('staffUnitAndPosition1',propertyFeatures['staffUnitAndPosition1'])"
                >
                  <el-input
                    type="textarea"
                    v-model="docData.staffUnitAndPosition1"
                    v-bind:class="{ over_flow:docData.staffUnitAndPosition1 && docData.staffUnitAndPosition1.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 2}"
                    placeholder="\"
                    :disabled="fieldDisabled(propertyFeatures['staffUnitAndPosition1'])"
                  ></el-input>
                </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <p>勘验人2</p>
            </td>
            <td colspan="3" class="color_DBE4EF">
                <el-form-item
                  prop="staff2"
                  :rules="fieldRules('staff2',propertyFeatures['staff2'])"
                >
                  <el-select
                    v-model="docData.staff2"
                    :maxLength="maxLength"
                    @change="changeStaff2"
                    :disabled="fieldDisabled(propertyFeatures['staff2'])"
                  >
                    <el-option
                      v-for="(item,index) in staffList"
                      :key="index"
                      :value="item"
                      :label="item"
                      :disabled="docData.staff1==item"
                    ></el-option>
                  </el-select>
                </el-form-item>
            </td>
            <td colspan="3">
              <p>单位及职务</p>
            </td>
            <td colspan="9" class="color_DBE4EF">
                <el-form-item
                  prop="staffUnitAndPosition2"
                  :rules="fieldRules('staffUnitAndPosition2',propertyFeatures['staffUnitAndPosition2'])"
                >
                  <el-input
                    type="textarea"
                    v-model="docData.staffUnitAndPosition2"
                    v-bind:class="{ over_flow:docData.staffUnitAndPosition2 && docData.staffUnitAndPosition2.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 2}"
                    placeholder="\"
                    maxlength="35"
                    :disabled="fieldDisabled(propertyFeatures['staffUnitAndPosition2'])"
                  ></el-input>
                </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <p>当事人</p>
            </td>
            <td colspan="3" class="color_DBE4EF">
                <el-form-item
                  prop="partyPeople"
                  :rules="fieldRules('partyPeople',propertyFeatures['partyPeople'])"
                >
                  <el-input
                    v-model="docData.partyPeople"
                    :disabled="fieldDisabled(propertyFeatures['partyPeople'])"
                    :maxlength="nameLength"
                    placeholder="\"
                  ></el-input>
                </el-form-item>
            </td>
            <td colspan="3">
              <p>单位及职务</p>
            </td>
            <td colspan="9" class="color_DBE4EF">
                <el-form-item
                  prop="partyPeopleUnitAndPosition"
                  :rules="fieldRules('partyPeopleUnitAndPosition',propertyFeatures['partyPeopleUnitAndPosition'])"
                >
                  <el-input
                    type="textarea"
                    v-model="docData.partyPeopleUnitAndPosition"
                    :disabled="fieldDisabled(propertyFeatures['partyPeopleUnitAndPosition'])"
                    :autosize="{ minRows: 1, maxRows: 2}"
                    :maxlength="nameLength"
                    placeholder="\"
                  ></el-input>
                </el-form-item>
            </td>
          </tr>
          <tr>
            <td>或</td>
            <td colspan="2">
              <p>当事人代表</p>
            </td>
            <td colspan="3" class="color_DBE4EF">
                <el-form-item
                  prop="pNamePeople"
                  :rules="fieldRules('pNamePeople',propertyFeatures['pNamePeople'])"
                >
                  <el-input
                    v-model="docData.pNamePeople"
                    :disabled="fieldDisabled(propertyFeatures['pNamePeople'])"
                    :maxlength="nameLength"
                    placeholder="\"
                  ></el-input>
                </el-form-item>
            </td>
            <td colspan="3">
              <p>单位及职务</p>
            </td>
            <td colspan="9" class="color_DBE4EF">
                <el-form-item
                  prop="pNamePeopleUnitAndPosition"
                  :rules="fieldRules('pNamePeopleUnitAndPosition',propertyFeatures['pNamePeopleUnitAndPosition'])"
                >
                  <el-input
                    type="textarea"
                    v-model="docData.pNamePeopleUnitAndPosition"
                    :disabled="fieldDisabled(propertyFeatures['pNamePeopleUnitAndPosition'])"
                    :autosize="{ minRows: 1, maxRows: 2}"
                    placeholder="\"
                  ></el-input>
                </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <p>被邀请人</p>
            </td>
            <td colspan="3" class="color_DBE4EF">
                <el-form-item
                  prop="invited"
                  :rules="fieldRules('invited',propertyFeatures['invited'])"
                >
                  <el-input
                    v-model="docData.invited"
                    placeholder="\"
                    :disabled="fieldDisabled(propertyFeatures['invited'])"
                  ></el-input>
                </el-form-item>
            </td>
            <td colspan="3">
              <p>单位及职务</p>
            </td>
            <td colspan="9" class="color_DBE4EF">
                <el-form-item
                  prop="invitedUnitAndPosition"
                  :rules="fieldRules('invitedUnitAndPosition',propertyFeatures['invitedUnitAndPosition'])"
                >
                  <el-input
                    type="textarea"
                    v-model="docData.invitedUnitAndPosition"
                    v-bind:class="{ over_flow:docData.invitedUnitAndPosition && docData.invitedUnitAndPosition.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 2}"
                    placeholder="\"
                    :disabled="fieldDisabled(propertyFeatures['invitedUnitAndPosition'])"
                  ></el-input>
                </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <p>记录人</p>
            </td>
            <td colspan="3" class="color_DBE4EF">
                <el-form-item
                  prop="recorder"
                  :rules="fieldRules('recorder',propertyFeatures['recorder'])"
                >
                  <el-autocomplete
                    class="inline-input"
                    v-model="docData.recorder"
                    :fetch-suggestions="querySearch"
                    placeholder="\"
                    :disabled="fieldDisabled(propertyFeatures['recorder'])"
                  ></el-autocomplete>
                </el-form-item>
            </td>
            <td colspan="3">
              <p>单位及职务</p>
            </td>
            <td colspan="9" class="color_DBE4EF">
                <el-form-item
                  prop="recorderUnitAndPosition"
                  :rules="fieldRules('recorderUnitAndPosition',propertyFeatures['recorderUnitAndPosition'])"
                >
                  <el-input
                    v-model="docData.recorderUnitAndPosition"
                    
                    placeholder="\"
                    :disabled="fieldDisabled(propertyFeatures['recorderUnitAndPosition'])"
                  ></el-input>
                </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="5" colspan="18" style="vertical-align:top;" class="color_DBE4EF">
                <p>勘验情况及结果：</p>
                <el-form-item
                  prop="inquestResult"
                  :rules="fieldRules('inquestResult',propertyFeatures['inquestResult'])"
                >
                  <el-input
                    type="textarea"
                    v-model="docData.inquestResult"
                    :disabled="fieldDisabled(propertyFeatures['inquestResult'])"
                    :autosize="{ minRows: 1, maxRows: 10}"
                    maxlength="300"
                    placeholder="\"
                  ></el-input>
                </el-form-item>
                <p>勘验结果如下：</p>
                <el-form-item
                  prop="result"
                  :rules="fieldRules('result',propertyFeatures['result'])"
                >
                  <el-input
                    v-model="docData.result"
                    type="textarea"
                    :disabled="fieldDisabled(propertyFeatures['result'])"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    maxlength="100"
                    placeholder="\"
                  ></el-input>
                </el-form-item>
            </td>
          </tr>
          <tr></tr><tr></tr><tr></tr><tr></tr>
          <tr>
            <td colspan="11" class="text_left" style="border-right-width:0px"><p>勘验人</p></td>
            <td colspan="7" class="text_left" style="border-left-width:0px"><p>记录人</p></td>
          </tr>
          <tr>
            <td colspan="11" class="text_left" style="border-right-width:0px"><p>被邀请人</p></td>
            <td colspan="7" class="text_left" style="border-left-width:0px"><p>当事人</p></td>
          </tr>
        </table>
        <div class="notice clear">
          <span>(报告一式两份，其中一份用于向上级备案，本页填写不下的可另附纸。)</span>
        </div>
      </el-form>
    </div>
    <casePageFloatBtns
      :formOrDocData="formOrDocData"
      @submitData="submitData"
      @saveData="saveData"
      @backHuanjie="submitData"
    ></casePageFloatBtns>
    <caseSlideMenu :activeIndex="''"></caseSlideMenu>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import { queryUserListByOrganIdApi } from "@/api/system";
import { findLawOfficerApi } from "@/api/caseHandle";
import iLocalStroage from "@/common/js/localStroage";
import { findCaseAllBindPropertyApi } from "@/api/caseHandle";
import caseSlideMenu from "@/page/caseHandle/components/caseSlideMenu";
export default {
  data() {
    //验证开始时间
    var validateStartTime = (rule, value, callback) => {
      let parseInquestStartTime = this.docData.inquestStartTime;
      let parseinquestEndTime = this.docData.inquestEndTime;
      console.log('案发时间=='+this.docData.lasj)
      if (Date.parse(parseInquestStartTime) < Date.parse(this.docData.lasj)) {
        this.$message({
          showClose: true,
          message: "开始时间不得小于立案时间",
          type: "error",
          offset: 100,
          customClass: "validateErrorTip",
        });
        this.docData.inquestStartTime = ""
        return callback(new Error("开始时间不得小于立案时间"));
      }
      if (Date.parse(parseInquestStartTime) > Date.parse(parseinquestEndTime)) {
        this.$message({
          showClose: true,
          message: "开始时间不得大于结束时间",
          type: "error",
          offset: 100,
          customClass: "validateErrorTip",
        });
        return callback(new Error("开始时间不得大于结束时间"));
      }
      if (Date.parse(parseinquestEndTime) > Date.parse(new Date())) {
        this.$message({
          showClose: true,
          message: "结束时间不得大于当前时间",
          type: "error",
          offset: 100,
          customClass: "validateErrorTip",
        });
        this.docData.inquestEndTime = "";
        return callback(new Error("结束时间不得大于当前时间"));
      }
      if (Date.parse(parseInquestStartTime) > Date.parse(new Date())) {
        this.$message({
          showClose: true,
          message: "开始时间不得大于当前时间",
          type: "error",
          offset: 100,
          customClass: "validateErrorTip",
        });
        this.docData.inquestStartTime = "";
        return callback(new Error("开始时间不得大于当前时间"));
      }
      callback();
    };
    return {
      docData: {
        caseNumber: "",
        caseName: "",
        inquestStartTime: "",
        inquestEndTime: "",
        inquestAddress: "",
        weather: "",
        staff1: "",
        staffUnitAndPosition1: "",
        staff2: "",
        staffUnitAndPosition2: "",
        partyPeople: "",
        partyPeopleUnitAndPosition: "",
        pNamePeople: "",
        pNamePeopleUnitAndPosition: "",
        invited: "",
        invitedUnitAndPosition: "",
        recorder: "",
        recorderUnitAndPosition: "",
        inquestResult: "",
        result: "",
        partySign: "",
        inquestedSign: "",
        invitedSign: "",
        recorderSign: "",
        staff: "",
      },
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseDoctypeId: this.$route.params.docId, //文书类型ID
        //文书数据
        docData: "",
        status: "", //提交状态
        linkTypeId: this.$route.params.caseLinkTypeId, //所属环节的id
      },
      rules: {
        caseName: [
          { required: true, message: "案由不能为空", trigger: "blur" },
        ],
        partyPeople: [
          { required: true, message: "当事人姓名不能为空", trigger: "blur" },
        ],
        partyPeopleUnitAndPosition: [
          { required: true, message: "单位及职务不能为空", trigger: "blur" },
        ],
        inquestAddress: [
          { required: true, message: "勘验场所不能为空", trigger: "blur" },
        ],
        weather: [
          { required: true, message: "天气状态不能为空", trigger: "change" },
        ],
        staff1: [
          { required: true, message: "勘验人1不能为空", trigger: "change" },
        ],
        staffUnitAndPosition1: [
          {
            required: true,
            message: "勘验人单位及职务不能为空",
            trigger: "blur",
          },
        ],
        certificateId1: [
          { required: true, message: "执法证号不能为空", trigger: "blur" },
        ],
        staff2: [
          { required: true, message: "勘验人2不能为空", trigger: "change" },
        ],
        staffUnitAndPosition2: [
          {
            required: true,
            message: "勘验人单位及职务不能为空",
            trigger: "blur",
          },
        ],
        certificateId2: [
          { required: true, message: "执法证号不能为空", trigger: "blur" },
        ],
        invited: [
          { required: true, message: "被邀请人不能为空", trigger: "blur" },
        ],
        invitedUnitAndPosition: [
          {
            required: true,
            message: "被邀请人单位及职务不能为空",
            trigger: "blur",
          },
        ],
        recorder: [
          { required: true, message: "记录人不能为空", trigger: "change" },
        ],
        recorderUnitAndPosition: [
          {
            required: true,
            message: "记录人单位及职务不能为空",
            trigger: "blur",
          },
        ],
        inquestResult: [
          {
            required: true,
            message: "勘验情况及结果不能为空",
            trigger: "blur",
          },
        ],
        inquestStartTime: [
          { required: true, message: "开始时间不能为空", trigger: "change" },
          { validator: validateStartTime, trigger: "change" },
        ],
        inquestEndTime: [
          { required: true, message: "结束时间不能为空", trigger: "change" },
          { validator: validateStartTime, trigger: "change" },
        ],
      },
      handleType: "", // 0 暂存  1  提交
      dictId: "2dc1e0a3a8ce225c292259da39294847",
      options: [],
      lineStyleFlag: false,
      maxLength: 23,
      nameLength: 23,
      length: "",
      formOrDocData: {
        showBtn: [
          false,
          true,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        pageDomId: "compensationInquestRecord_print",
      },
      staffList: [],
      // userList:['papas'], //机构下的人员
      userData: [],
      needDealData: true,
      needSetDisabled: true,
      partyOriginalData: "",
      propertyFeatures: "", //字段属性配置
    };
  },
  inject: ["reload"],
  components: {
    casePageFloatBtns,
  },
  mixins: [mixinGetCaseApiList],
  computed: {
    ...mapGetters(["caseId"]),
    replaceInquestEndTime() {
      if (this.docData.inquestEndTime) {
        return new Date(this.docData.inquestEndTime).format("yyyy年MM月dd日HH时mm分");
      }
    },
    replaceInquestStartTime() {
      if (this.docData.inquestStartTime) {
        return new Date(this.docData.inquestStartTime).format("yyyy年MM月dd日HH时mm分");
      }
    },
  },
  methods: {
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId,
      };
      console.log(data);
      this.com_getDocDataByCaseIdAndDocId(data);
    },
    //保存文书信息
    saveData(handleType) {
      console.log(this.docData.partyPeopleSex);
      this.com_addDocData(handleType, "docForm");
    },
    submitData(handleType) {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: this.$route.params.url,
      });
    },
    //是否是完成状态
    isOverStatus() {
      if (this.$route.params.docStatus == "1") {
        this.formOrDocData.showBtn = [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
        ]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    },
    //获取天气字典值
    getDictKeyList() {
      this.$store.dispatch("getDictListDetail", this.dictId).then(
        (res) => {
          console.log("字典值列表", res);
          this.options = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getDataAfter() {
      this.staffList = this.docData.staff.split(",");
      this.docData.staff1 = this.docData.staff.split(",")[0];
      this.docData.certificateId1 = this.docData.certificateId.split(",")[0];
      let dailiData = {};
      console.log("this.docData", this.docData);
      if (this.docData.partyType == "1") {
        //当事人类型为个人
        dailiData = {
          name: this.docData.party,
          company: this.docData.partyUnitPosition || "",
          position: this.docData.occupation || "",
        };
      } else if (this.docData.partyType == "2") {
        //当事人类型为企业
        dailiData = JSON.parse(this.docData.agentPartyEcertId)[0];
      }
      let data = {
        lawOfficerName: this.docData.staff1,
        lawOfficerCards: this.docData.certificateId1,
      };
      this.queryLawOfficerInfo(data, 1);
      this.setDataForPelple(dailiData);
    },
    //修改勘验人员
    changeStaff1(val) {
      let staffIndex = this.docData.staff.split(",").indexOf(val);
      this.docData.certificateId1 = this.docData.certificateId.split(",")[
        staffIndex
      ];
      console.log(staffIndex);
      let data = {
        lawOfficerName: val,
        lawOfficerCards: this.docData.certificateId1,
      };
      this.queryLawOfficerInfo(data, 1);
    },
    changeStaff2(val) {
      let staffIndex = this.docData.staff.split(",").indexOf(val);
      this.docData.certificateId2 = this.docData.certificateId.split(",")[
        staffIndex
      ];
      console.log(staffIndex);
      let data = {
        lawOfficerName: val,
        lawOfficerCards: this.docData.certificateId2,
      };
      this.queryLawOfficerInfo(data, 2);
    },
    //记录人 查询本机构下的人员
    findUserByOrgan() {
      queryUserListByOrganIdApi(iLocalStroage.gets("userInfo").organId).then(
        (res) => {
          console.log(res);
          this.userData = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //记录人 可输入也可以选择
    querySearch(queryString, cb) {
      let userData = this.userData;
      var results = queryString
        ? userData.filter(this.createFilter(queryString))
        : userData;
      let a = [];
      results.forEach((item) => {
        a.push({ value: item.nickName });
      });
      cb(a);
    },
    createFilter(queryString) {
      return (userData) => {
        return (
          userData.nickName.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    setDataForPelple(dailiData) {
      this.docData.partyPeople = dailiData.name;
      this.docData.partyPeopleUnitAndPosition =
        dailiData.company + " " + dailiData.position;
      this.docData.partyPeopleTel = dailiData.tel;
      //设置禁用
      this.partyOriginalData = JSON.parse(JSON.stringify(this.docData));
    },
    setDisabledData() {
      let data = {
        caseBasicInfoId: this.caseId,
        typeId: this.$route.params.docId,
      };
      findCaseAllBindPropertyApi(data).then(
        (res) => {
          console.log("获取案件信息", res);
          let caseOriData = JSON.parse(res.data.propertyData);
          let agentPartyEcert = JSON.parse(caseOriData.agentPartyEcertId)[0];
          this.partyOriginalData = {
            partyPeople:
              caseOriData.partyType == "1"
                ? caseOriData.party
                : agentPartyEcert.name,
            partyPeopleUnitAndPosition:
              caseOriData.partyType == "1"
                ? caseOriData.partyUnitPosition + " " + caseOriData.occupation
                : agentPartyEcert.company + " " + agentPartyEcert.position,
          };
        },
        (error) => {
          console.log(error);
        }
      );
    },
    //获取执法人员
    getLawOfficer() {
      let data = {
        caseBasicInfoId: this.caseId,
        typeId: this.$route.params.docId,
      };
      findCaseAllBindPropertyApi(data).then(
        (res) => {
          console.log(res);
          let data2 = JSON.parse(res.data.propertyData);
          this.staffList = data2.staff.split(",");
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //根据执法人员姓名执法证号获取执法人员信息
    queryLawOfficerInfo(data, num) {
      findLawOfficerApi(data).then(
        (res) => {
          let staffInfo = res.data;
          console.log("staffInfo",staffInfo);
          if (num == 1) {
            this.docData.staffUnitAndPosition1 = staffInfo.organName;
          } else {
            this.docData.staffUnitAndPosition2 = staffInfo.organName;
          }
        },
        (err) => {
          console.log(err);
        }
      );
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
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">
#compensationInquestRecord_print {
  .text_left {
    text-align     : left;
    text-align-last: left;
  }
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
      right: 10px;
    }
  }
  .prolong_table {
    table-layout: fixed;
    td,
    p,
    .el-textarea__inner {
      white-space: normal;
      word-wrap: break-word;
      word-break: break-all;
    }
  }
}
</style>
