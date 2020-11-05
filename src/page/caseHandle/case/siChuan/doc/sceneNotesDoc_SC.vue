<template>
  <div class="main">
    <div class="print_box">
      <div id="sceneNotesDoc_SC-print" class="print_info">
        <el-form
          :rules="rules"
          ref="docForm"
          :inline-message="true"
          :inline="true"
          :model="docData"
        >
          <div class="doc_topic">行政强制措施现场笔录</div>
          <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
            <tr>
              <td>执法地点</td>
              <td colspan="3" class="color_DBE4EF">
                <el-form-item prop="afdd" :rules="fieldRules('afdd',propertyFeatures['afdd'])">
                  <el-input
                    type="textarea"
                    v-model="docData.afdd"
                    v-bind:class="{ over_flow:docData.afdd.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    :maxlength="nameLength"
                    error
                    placeholder="/"
                    :disabled="fieldDisabled(propertyFeatures['afdd'])"
                  ></el-input>
                  <!-- <el-input v-model="docData.party"  @input="widthCheck($event.target, 23,$event)" maxlength="47" v-bind:class="{over_flow: isOverflow}" placeholder="/"></el-input> -->
                </el-form-item>
              </td>
              <td>执法时间</td>
              <td colspan="3" id="scenetimeBox">
                <el-form-item
                  prop="enforceStartTime"
                  class="pdf_datapick dataTimeReplaceBox"
                  :rules="fieldRules('enforceStartTime',propertyFeatures['enforceStartTime'])"
                >
                  <el-date-picker
                    v-model="docData.enforceStartTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm"
                    format="yyyy年MM月dd日HH时mm分"
                    style="width:235px"
                    :default-time="defaultStartTime"
                    :disabled="fieldDisabled(propertyFeatures['enforceStartTime'])"
                  ></el-date-picker>
                  <el-input
                    class="replaceTime"
                    placeholder=" 年 月 日 时 分"
                    v-model="docData.enforceStartTime"
                  ></el-input>
                </el-form-item>
                <br />
                <span style="display:inline-block;width:20px;margin-top:10px;">至</span>
                <el-form-item
                  prop="enforceEndTime"
                  class="pdf_datapick"
                  style="width:100px"
                  :rules="fieldRules('enforceEndTime',propertyFeatures['enforceEndTime'])"
                >
                  <el-time-picker
                    placeholder="时 分"
                    v-model="docData.enforceEndTime"
                    format="HH时mm分"
                    value-format="HH:mm"
                    :disabled="fieldDisabled(propertyFeatures['enforceEndTime'])"
                  ></el-time-picker>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td rowspan="2">执法人员</td>
              <td colspan="2" class="color_DBE4EF">
                <el-form-item
                  prop="staff1"
                  :rules="fieldRules('staff1',propertyFeatures['staff1'])"
                >
                  <el-select
                    v-model="docData.staff1"
                    prop="staff1"
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
              <td rowspan="2">执法证号</td>
              <td colspan="2" class="color_DBE4EF">
                <el-form-item
                  prop="certificateId1"
                  :rules="fieldRules('certificateId1',propertyFeatures['certificateId1'])"
                >
                  <el-input
                    type="textarea"
                    clearable
                    class="w-120"
                    v-model="docData.certificateId1"
                    size="small"
                    placeholder="请输入"
                    :disabled="fieldDisabled(propertyFeatures['certificateId1'])"
                  ></el-input>
                </el-form-item>
              </td>
              <td rowspan="2">记录人</td>
              <td rowspan="2" class="color_DBE4EF">
                <el-form-item
                  prop="recorder"
                  :rules="fieldRules('recorder',propertyFeatures['recorder'])"
                >
                  <el-input
                    type="textarea"
                    v-model="docData.recorder"
                    v-bind:class="{ over_flow:docData.recorder.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    :maxlength="adressLength"
                    placeholder="/"
                    :disabled="fieldDisabled(propertyFeatures['recorder'])"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td colspan="2" class="color_DBE4EF">
                <el-form-item
                  prop="staff2"
                  :rules="fieldRules('staff2',propertyFeatures['staff2'])"
                >
                  <el-select
                    v-model="docData.staff2"
                    :maxLength="maxLength"
                    @change="changeStaff2"
                    placeholder="请选择"
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
              <td colspan="2" class="color_DBE4EF">
                <el-form-item
                  prop="certificateId2"
                  :rules="fieldRules('certificateId2',propertyFeatures['certificateId2'])"
                >
                  <el-input
                    type="textarea"
                    v-model="docData.certificateId2"
                    :maxLength="maxLength"
                    placeholder="/"
                    v-bind:class="{ over_flow:docData.certificateId2.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 2}"
                    :disabled="fieldDisabled(propertyFeatures['certificateId2'])"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td rowspan="5">
                <p>现场</p>
                <p>人员</p>
                <p>基本</p>
                <p>情况</p>
              </td>
              <td>姓名</td>
              <td colspan="3" class="color_DBE4EF">
                <el-form-item
                  prop="scenePeopelName"
                  :rules="fieldRules('scenePeopelName',propertyFeatures['scenePeopelName'])"
                >
                  <el-input
                    v-model="docData.scenePeopelName"
                    :maxLength="maxLength"
                    placeholder="/"
                    @input="changeScenePeopelName"
                    :disabled="fieldDisabled(propertyFeatures['scenePeopelName'])"
                  ></el-input>
                </el-form-item>
              </td>
              <td>性别</td>
              <td colspan="2" class="color_DBE4EF">
                <el-form-item
                  prop="scenePeopelSex"
                  :rules="fieldRules('scenePeopelSex',propertyFeatures['scenePeopelSex'])"
                >
                  <el-select
                    v-model="docData.scenePeopelSex"
                    :maxLength="maxLength"
                    placeholder="/"
                    :disabled="fieldDisabled(propertyFeatures['scenePeopelSex'])"
                  >
                    <el-option :value="0" label="男"></el-option>
                    <el-option :value="1" label="女"></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>身份证件号</td>
              <td colspan="3" class="color_DBE4EF">
                <el-form-item
                  prop="scenePeopelIdNo"
                  :rules="fieldRules('scenePeopelIdNo',propertyFeatures['scenePeopelIdNo'],validateIDNumber)"
                >
                  <el-input
                    type="textarea"
                    v-model="docData.scenePeopelIdNo"
                    :maxLength="maxLength"
                    placeholder="/"
                    v-bind:class="{ over_flow:docData.scenePeopelIdNo.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 2}"
                    :disabled="fieldDisabled(propertyFeatures['scenePeopelIdNo'])"
                  ></el-input>
                </el-form-item>
              </td>
              <td>与案件关系</td>
              <td colspan="2" class="color_DBE4EF">
                <el-form-item
                  prop="scenePeopeRelation"
                  :rules="fieldRules('scenePeopeRelation',propertyFeatures['scenePeopeRelation'])"
                >
                  <el-select
                    v-model="docData.scenePeopeRelation"
                    :maxLength="maxLength"
                    placeholder="/"
                    @change="changeRelationWithCase"
                    :disabled="fieldDisabled(propertyFeatures['scenePeopeRelation'])"
                  >
                    <el-option
                      v-for="item in allRelationWithCase"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>单位职务</td>
              <td colspan="3" class="color_DBE4EF">
                <el-form-item
                  prop="scenePeopeUnitPosition"
                  :rules="fieldRules('scenePeopeUnitPosition',propertyFeatures['scenePeopeUnitPosition'])"
                >
                  <el-input
                    type="textarea"
                    v-model="docData.scenePeopeUnitPosition"
                    v-bind:class="{ over_flow:docData.scenePeopeUnitPosition.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    :maxlength="nameLength"
                    placeholder="/"
                    :disabled="fieldDisabled(propertyFeatures['scenePeopeUnitPosition'])"
                  ></el-input>
                </el-form-item>
              </td>
              <td>联系电话</td>
              <td colspan="2" class="color_DBE4EF">
                <el-form-item
                  prop="scenePeopeTel"
                  :rules="fieldRules('scenePeopeTel',propertyFeatures['scenePeopeTel'],validatePhone)"
                >
                  <el-input
                    v-model="docData.scenePeopeTel"
                    minlength="11"
                    :maxLength="maxLength"
                    placeholder="/"
                    :disabled="fieldDisabled(propertyFeatures['scenePeopeTel'])"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>联系地址</td>
              <td colspan="6" class="color_DBE4EF">
                <el-form-item
                  prop="scenePeopeAddress"
                  :rules="fieldRules('scenePeopeAddress',propertyFeatures['scenePeopeAddress'])"
                >
                  <el-input
                    v-model="docData.scenePeopeAddress"
                    minlength="11"
                    :maxLength="maxLength"
                    placeholder="/"
                    :disabled="fieldDisabled(propertyFeatures['scenePeopeAddress'])"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>车(船)号</td>
              <td colspan="3" class="color_DBE4EF">
                <el-form-item prop="vehicleShipId" :rules="fieldRules('vehicleShipId',propertyFeatures['vehicleShipId'])">
                  <el-input v-model="docData.vehicleShipId" :maxLength="maxLength" placeholder="/" :disabled="fieldDisabled(propertyFeatures['vehicleShipId'])"></el-input>
                </el-form-item>
              </td>
              <td>车(船)型</td>
              <td colspan="2" class="color_DBE4EF">
                <el-form-item prop="vehicleShipType" :rules="fieldRules('vehicleShipType',propertyFeatures['vehicleShipType'])">
                  <el-select v-model="docData.vehicleShipType" :disabled="fieldDisabled(propertyFeatures['vehicleShipType'])">
                    <el-option v-for="item in allVehicleShipType" :key="item.value" :label="item.label" :value="item.label"></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>主要内容</td>
              <td colspan="7" class="illegalFactsTip">
                <div class="overflow_lins_style" id="noteDesCon">
                  <div class="overflow_lins">
                    <el-form-item
                      prop="illegalFacts"
                      :rules="fieldRules('illegalFacts',propertyFeatures['illegalFacts'])"
                    >
                      <el-input
                        class="text_indent8 overflow_lins_textarea"
                        type="textarea"
                        v-model="docData.illegalFacts"
                        rows="4"
                        maxlength="400"
                        placeholder="/"
                        :disabled="fieldDisabled(propertyFeatures['illegalFacts'])"
                      ></el-input>
                      <span class="overflow_describe_JX" style="padding-bottom:-6px;"></span>
                      <span class="span_bg span_bg_top">&nbsp;</span>
                      <p class="span_bg">&nbsp;</p>
                      <p class="span_bg">&nbsp;</p>
                      <p class="span_bg">&nbsp;</p>
                      <p class="span_bg">&nbsp;</p>
                      <p class="span_bg">&nbsp;</p>
                      <p class="span_bg">&nbsp;</p>
                      <p class="span_bg">&nbsp;</p>
                      <p class="span_bg">&nbsp;</p>
                      <p class="span_bg">&nbsp;</p>
                      <p class="span_bg">&nbsp;</p>
                      <p class="span_bg">&nbsp;</p>
                    </el-form-item>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td rowspan="4">行政强制措施采取情况</td>
              <td class="">当事人到场情况</td>
              <td colspan="6" class="">
                <el-form-item
                  prop="attendance"
                  :rules="fieldRules('attendance',propertyFeatures['attendance'])"
                >
                  <el-input
                    v-model="docData.attendance"
                    :maxLength="maxLength"
                    placeholder="/"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td class="">强制措施告知情况</td>
              <td colspan="6" class="">
                <el-form-item
                  prop="information"
                  :rules="fieldRules('information',propertyFeatures['information'])"
                >
                  <el-input
                    v-model="docData.information"
                    :maxLength="maxLength"
                    placeholder="/"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td class="">当事人陈述申辩情况</td>
              <td colspan="6" class="">
                <el-form-item
                  prop="defense"
                  :rules="fieldRules('defense',propertyFeatures['defense'])"
                >
                  <el-input
                    v-model="docData.defense"
                    :maxLength="maxLength"
                    placeholder="/"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td class="">备注</td>
              <td colspan="6" class=""><el-form-item
                  prop="notes"
                  :rules="fieldRules('notes',propertyFeatures['notes'])"
                >
                  <el-input
                    v-model="docData.notes"
                    :maxLength="maxLength"
                    placeholder="/"
                  ></el-input>
                </el-form-item></td>
            </tr>

            <tr>
              <td colspan="8" >
                <el-form-item
                  prop="readState"
                  :rules="fieldRules('readState',propertyFeatures['readState'])"
                >
                  <el-checkbox-group
                    v-model="docData.readState"
                    :max="1"
                    :disabled="fieldDisabled(propertyFeatures['readState'])"
                  >
                    <el-checkbox label="0">上述笔录我已看过</el-checkbox>
                    <el-checkbox label="1">或已向我宣读过，情况属实无误。</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-row justify="end">
                  <el-col :span="12" :offset="12">
                    现场人员签名：
                    <span class="write_line width150"></span>
                  </el-col>
                </el-row>
                <el-row justify="end">
                  <el-col :span="12" :offset="12">
                    时间：
                    <span class="write_line width150"></span>
                  </el-col>
                </el-row>
              </td>
            </tr>
            <tr>
              <td colspan="8">
                <el-row :gutter="20">
                  <el-col :span="12">
                    执法人员签名：
                    <span class="write_line width150"></span>
                  </el-col>
                  <el-col :span="12">
                    时间：
                    <span class="write_line width150"></span>
                  </el-col>
                </el-row>
              </td>
            </tr>
          </table>
          <span>备注：本文书一式两份，一份存根，一份交当事人或其代理人。</span>
        </el-form>
      </div>
      <casePageFloatBtns
        :formOrDocData="formOrDocData"
        @submitData="submitData"
        @saveData="saveData"
        @backHuanjie="submitData"
      ></casePageFloatBtns>  
    </div>
  </div>
</template>
<script>

import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import { findCaseAllBindPropertyApi } from "@/api/caseHandle";

// 验证规则
import { validatePhone, validateIDNumber } from "@/common/js/validator";

export default {
  components: {
    // overflowInput
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  components: {
    casePageFloatBtns,
  },
  data() {
    //验证开始时间
    var validateStartTime = (rule, value, callback) => {
      let parseInquestStartTime = this.docData.enforceStartTime
        .replace("年", "-")
        .replace("月", "-")
        .replace("日", " ")
        .replace("时", ":")
        .replace("分", "");
      let a = parseInquestStartTime.split(" ");
      let parseinquestEndTime = a[0] + " " + this.docData.enforceEndTime;
      console.log('案发时间=='+this.docData.lasj)
      if (Date.parse(parseInquestStartTime) < Date.parse(this.docData.lasj)) {
        this.$message({
          showClose: true,
          message: "开始时间不得小于立案时间",
          type: "error",
          offset: 100,
          customClass: "validateErrorTip",
        });
        this.docData.enforceStartTime = "";
        return callback(new Error("开始时间不得小于立案时间"));
      }
      if (Date.parse(parseInquestStartTime) > Date.parse(new Date())) {
        this.$message({
          showClose: true,
          message: "开始时间不得大于当前时间",
          type: "error",
          offset: 100,
          customClass: "validateErrorTip",
        });
        this.docData.enforceStartTime = "";
        return callback(new Error("开始时间不得大于当前时间"));
      }
      if (Date.parse(parseinquestEndTime) > Date.parse(new Date())) {
        this.$message({
          showClose: true,
          message: "结束时间不得大于当前时间",
          type: "error",
          offset: 100,
          customClass: "validateErrorTip",
        });
        this.docData.enforceEndTime = "";
        return callback(new Error("结束时间不得大于当前时间"));
      }
      if (
        Date.parse(parseInquestStartTime) > Date.parse(parseinquestEndTime) &&
        this.docData.enforceEndTime
      ) {
        this.$message({
          showClose: true,
          message: "开始时间不得大于结束时间",
          type: "error",
          offset: 100,
          customClass: "validateErrorTip",
        });
        return callback(new Error("开始时间不得大于结束时间"));
      }
      callback();
    };
    return {
      validatePhone: validatePhone,
      validateIDNumber: validateIDNumber,
      isOverflow: false,
      isOverLine: false,
      docData: {
        caseNumber: "",
        afdd: "",
        enforceStartTime: "",
        enforceEndTime: "",
        recorder: "",
        scenePeopelName: "",
        scenePeopelSex: "",
        scenePeopelIdNo: "",
        scenePeopeRelation: "",
        scenePeopeUnitPosition: "",
        scenePeopeTel: "",
        scenePeopeAddress: "",
        vehicleShipId: "",
        vehicleShipType: "",
        illegalFacts: "",
        checkBox: "",
        partySign: "",
        partySignTime: "",
        note: "",
        staffSign: "",
        staff1: "",
        staff2: "",
        certificateId1: "",
        certificateId2: "",
        readState: [],
        partyUnitPosition: "",
        partyIdNo: "",
        partySex: "",
        partyTel: "",
        partyAddress: "",
        notes:"",
        attendance: "",
        information: "",
        defense:"",
      },
      rules: {
        afdd: [
          { required: true, message: "执法地点不能为空", trigger: "blur" },
        ],
        enforceStartTime: [
          { required: true, message: "执法开始时间不能为空", trigger: "blur" },
          { validator: validateStartTime, trigger: "blur" },
        ],
        enforceEndTime: [
          { required: true, message: "执法结束时间不能为空", trigger: "blur" },
          { validator: validateStartTime, trigger: "blur" },
        ],
        staff1: [
          { required: true, message: "执法人员不能为空", trigger: "change" },
        ],
        certificateId11: [
          { required: true, message: "执法证号不能为空", trigger: "blur" },
        ],
        staff2: [
          { required: true, message: "执法人员不能为空", trigger: "change" },
        ],
        certificateId12: [
          { required: true, message: "执法证号不能为空", trigger: "blur" },
        ],
        scenePeopelName: [
          { required: true, message: "现场人员姓名不能为空", trigger: "blur" },
        ],
        scenePeopelSex: [
          { required: true, message: "现场人员性别不能为空", trigger: "blur" },
        ],
        scenePeopeTel: [
          {
            required: true,
            message: "现场人员联系电话不能为空",
            trigger: "blur",
          },
          { validator: validatePhone, trigger: "blur" },
        ],
        scenePeopelIdNo: [
          {
            required: true,
            message: "现场人员身份证据号不能为空",
            trigger: "blur",
          },
          { validator: validateIDNumber, trigger: "blur" },
        ],
        scenePeopeRelation: [
          {
            required: true,
            message: "现场人员与案件关系不能为空",
            trigger: "blur",
          },
        ],
        scenePeopeUnitPosition: [
          {
            required: true,
            message: "现场人员单位及职务不能为空",
            trigger: "blur",
          },
        ],
        scenePeopeAddress: [
          {
            required: true,
            message: "现场人员联系地址不能为空",
            trigger: "blur",
          },
        ],
        vehicleShipId: [
          { required: true, message: "车（船）号不能为空", trigger: "blur" },
        ],
        vehicleShipType: [
          { required: true, message: "车（船）型不能为空", trigger: "blur" },
        ],
        party: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        recorder: [
          { required: true, message: "记录人不能为空", trigger: "blur" },
        ],
        illegalFacts: [
          { required: true, message: "现场情况不能为空", trigger: "blur" },
        ],
        readState: [
          {
            required: true,
            message: "请选择是否看过上述笔录",
            trigger: "change",
          },
        ],
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
      handleType: "", // 0 暂存  1  提交
      dictId: "2dc1e0a3a8ce225c292259da39294847",
      options: [],
      nameLength: 23,
      adressLength: 23,
      maxLength: 23,
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
        pageDomId: "sceneNotesDoc_SC-print",
      },
      staffList: [],
      allRelationWithCase: [
        //与案件关系下拉框
        { value: "0", label: "当事人" },
        { value: "1", label: "驾驶人" },
        { value: "2", label: "实际所有者" },
        { value: "3", label: "证人" },
        { value: "4", label: "承运人" },
        { value: "5", label: "代理人" },
      ],

      allVehicleShipType: [
        { value: "1", label: "中小客车" },
        { value: "2", label: "大客车" },
        { value: "3", label: "小型货车" },
        { value: "4", label: "中型货车" },
        { value: "5", label: "大型货车" },
        { value: "6", label: "特大型货车" },
        { value: "7", label: "集装箱车" },
        { value: "8", label: "摩托车" },
        { value: "9", label: "拖拉机" },
      ],
      originalDocData: "", //原始数据
      daiRuscenePeopelSex: false, //是否为带入的数据
      daiRuscenePeopelIdNo: false,
      daiRuscenePeopeRelation: false,
      daiRuscenePeopeUnitPosition: false,
      daiRuscenePeopeTel: false,
      daiRuscenePeopeAddress: false,
      pickerOptionsStart: {
        disabledDate(time) {
          // return (time.getTime() + 24 * 3600 * 1000) >= Date.now()
        },
      },
      needDealData: true,
      propertyFeatures: "", //字段属性配置
    };
  },
  computed: {
    ...mapGetters(["caseId"]),
    defaultStartTime() {
      let a = new Date();
      return a.getHours() + ":" + a.getMinutes() + ":" + "00";
    },
    enforceEndTimeRange() {
      console.log();
      let b = "10:00:00";
      if (this.enforceStartTime) {
        // alert(111);
        b = this.enforceStartTime.split(" ")[1];
      }

      return b + " - 23:59:59";
    },
  },
  mixins: [mixinGetCaseApiList],
  inject: ["reload"],
  components: {
    // overflowInput,
    casePageFloatBtns,
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
      // this.printContent()
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
    // 多行编辑
    overFlowEdit() {
      // this.$refs.overflowInputRef.showModal(0, "");
    },
    // 获取多行编辑内容
    getOverFloeEditInfo(edit) {
      this.docData.illegalFactsEvidence = edit;
    },
    getDataAfter() {
      this.staffList = this.docData.staff.split(",");
      this.docData.staff1 = this.docData.staff.split(",")[0];
      this.docData.certificateId1 = this.docData.certificateId.split(",")[0];
      if (this.staffList.length == 2) {
        this.docData.staff2 = this.docData.staff.split(",")[1];
        this.docData.certificateId2 = this.docData.certificateId.split(",")[1];
      }
      this.docData.readState =
        this.docData.readState == "" ? [] : this.docData.readState;
      let dailiData = {};
      if (this.docData.partyType == "1") {
        //当事人类型为个人
        dailiData = {
          name: this.docData.party,
          sex: this.docData.partySex,
          zhengjianNumber: this.docData.partyIdNo,
          relationWithCase: "当事人",
          company: this.docData.partyUnitPosition,
          position: this.docData.partyUnitPosition,
          tel: this.docData.partyTel,
          adress: this.docData.partyAddress,
        };
        this.originalDocData = JSON.parse(JSON.stringify(dailiData));
      } else if (this.docData.partyType == "2") {
        //当事人类型为企业
        dailiData = JSON.parse(this.docData.agentPartyEcertId)[0];
        console.log("代理人信息", dailiData);
        this.originalDocData = JSON.parse(JSON.stringify(dailiData));
      }
      //标识 1 有自动带入信息：当姓名的内容修改时，清空自动带入的其他指标内容；2 若无自动带入信息，则修改姓名时，其他指标不清空
      this.daiRuscenePeopelSex = dailiData.sex !== "" ? true : false;
      this.daiRuscenePeopelIdNo = dailiData.zhengjianNumber ? true : false;
      this.daiRuscenePeopeRelation = dailiData.relationWithCase ? true : false;
      this.daiRuscenePeopeUnitPosition =
        dailiData.company || dailiData.position ? true : false;
      this.daiRuscenePeopeTel = dailiData.tel ? true : false;
      this.daiRuscenePeopeAddress = dailiData.adress ? true : false;
      this.setDataForScenePelple(true, dailiData);
    },
    //修改人员
    changeStaff1(val) {
      let staffIndex = this.docData.staff.split(",").indexOf(val);
      this.docData.certificateId1 = this.docData.certificateId.split(",")[
        staffIndex
      ];
    },
    changeStaff2(val) {
      let staffIndex = this.docData.staff.split(",").indexOf(val);
      this.docData.certificateId2 = this.docData.certificateId.split(",")[
        staffIndex
      ];
      console.log(staffIndex);
    },
    changeRelationWithCase(val) {
      console.log(val, this.originalDocData);
      let dailiData = this.originalDocData;
      if (val == "当事人") {
        this.docData.scenePeopelName = dailiData.name;
        this.docData.scenePeopelSex = Number(dailiData.sex);
        this.docData.scenePeopelIdNo = dailiData.zhengjianNumber;
        this.docData.scenePeopeRelation = dailiData.relationWithCase;
        this.docData.scenePeopeUnitPosition = dailiData.company;
        this.docData.scenePeopeAddress = dailiData.adress;
        this.docData.scenePeopeTel = dailiData.tel;
      } else {
        //不为当事人时指标不清空
        this.docData.scenePeopelName = "";
        this.docData.scenePeopelSex = "";
        this.docData.scenePeopelIdNo = "";
        this.docData.scenePeopeRelation = "";
        this.docData.scenePeopeUnitPosition = "";
        this.docData.scenePeopeAddress = "";
        this.docData.scenePeopeTel = "";
      }
    },
    //当姓名的内容修改时，清空自动带入的其他指标内容
    changeScenePeopelName(val) {
      console.log(val);
      if (val == this.originalDocData.name) {
        this.setDataForScenePelple(true, this.originalDocData);
      } else {
        this.setDataForScenePelple(false);
      }
    },
    //现场人员信息赋值
    setDataForScenePelple(flag, dailiData = {}) {
      if (flag) {
        this.docData.scenePeopelName = dailiData.name;
        this.docData.scenePeopelSex = Number(dailiData.sex);
        this.docData.scenePeopelIdNo = dailiData.zhengjianNumber;
        this.docData.scenePeopeRelation = dailiData.relationWithCase;
        this.docData.scenePeopeUnitPosition = dailiData.company;
        this.docData.scenePeopeAddress = dailiData.adress;
        this.docData.scenePeopeTel = dailiData.tel;
      } else {
        //1 有自动带入信息：当姓名的内容修改时，清空自动带入的其他指标内容；2 若无自动带入信息，则修改姓名时，其他指标不清空
        this.docData.scenePeopelSex = this.daiRuscenePeopelSex
          ? ""
          : this.docData.scenePeopelSex;
        this.docData.scenePeopelIdNo = this.daiRuscenePeopelIdNo
          ? ""
          : this.docData.scenePeopelIdNo;
        this.docData.scenePeopeRelation = this.daiRuscenePeopeRelation
          ? ""
          : this.docData.scenePeopeRelation;
        this.docData.scenePeopeUnitPosition = this.daiRuscenePeopeUnitPosition
          ? ""
          : this.docData.scenePeopeUnitPosition;
        this.docData.scenePeopeAddress = this.daiRuscenePeopeAddress
          ? ""
          : this.docData.scenePeopeAddress;
        this.docData.scenePeopeTel = this.daiRuscenePeopeTel
          ? ""
          : this.docData.scenePeopeTel;
      }
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
  },
  mounted() {
    this.getDocDataByCaseIdAndDocId();
    this.isOverStatus();
    this.getLawOfficer();
  },
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">
/*  @import "@/assets/css/caseHandle/caseDocModle.scss"; */

.espacle {
  textarea {
    min-height: 114px !important;
    line-height: 25px !important;
    // margin-top:-4px !important;
    text-indent: 0px !important;
  }
}

// #sceneNotesDoc_SC-print .el-date-editor--datetime{
//   width: 200px;
// }
#sceneNotesDoc_SC-print {
  .overflow_lins_style .span_bg {
    display: block;
  }
  .overflow_lins_style .overflow_lins .overflow_lins_textarea {
    width: calc(100% - 10px);
    top: 0;
  }
  .illegalFactsTip {
    text-align-last: auto;
  }
  #scenetimeBox .is-required .el-input__inner::-webkit-input-placeholder {
    color: #000;
  }
  .overflow_lins_style .overflow_lins span.overflow_lins_textarea {
    white-space: normal;
    line-height: 23px;
    text-indent: 0;
  }
  .dataTimeReplaceBox {
    position: relative;
    height: 35px;
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
  #noteDesCon {
    .overflow_lins_textarea {
      padding-top: 4px;
      textarea {
        line-height: 24px !important;
      }
    }
    span.overflow_lins_textarea {
      line-height: 24px;
    }
    .span_bg {
      box-sizing: border-box;
      margin: 4px 0;
      height: 20px;
    }
  }
}
</style>
