<template>
  <div class="print_box printNumbers_box" id="prolongAdminCoerciveMeasureApproval_SC_print" style="width:790px; margin:0 auto;">
    <el-form
      :rules="rules"
      ref="docForm"
      :inline-message="true"
      :inline="true"
      :model="docData"
      :disabled="disableWhenApproval"
    >
      <div class="print_info" style="height: auto">
        <div class="doc_topic">延长行政强制措施审批表</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <table class="print_table prolong_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td rowspan="2">案由</td>
            <td colspan="7" rowspan="2" class="color_DBE4EF">
              <el-form-item
                prop="caseName"
                :rules="fieldRules('caseName',propertyFeatures['caseName'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.caseName"
                  v-bind:class="{ over_flow:docData.caseName.length>14?true:false }"
                  placeholder="/"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  :disabled="fieldDisabled(propertyFeatures['caseName'])"
                ></el-input>
              </el-form-item>
            </td>
            <td rowspan="2">案件调查人员</td>
            <td colspan="2" class="color_DBE4EF" style="min-width:80px">
              <el-form-item prop="staff1" :rules="fieldRules('staff1',propertyFeatures['staff1'])">
                <el-input
                  type="textarea"
                  v-model="docData.staff1"
                  v-bind:class="{ over_flow:docData.staff1 && docData.staff1.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 4}"
                  maxlength="32"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['staff1'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2" class="color_DBE4EF" style="min-width:80px">
              <el-form-item prop="staff2" :rules="fieldRules('staff2',propertyFeatures['staff2'])">
                <el-input
                  type="textarea"
                  v-model="docData.staff2"
                  v-bind:class="{ over_flow:docData.staff2 && docData.staff2.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 4}"
                  maxlength="32"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['staff2'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="5" class="center">
              <p>当</p>
              <p>事</p>
              <p>人</p>
              <p>基</p>
              <p>本</p>
              <p>情</p>
              <p>况</p>
            </td>
            <td rowspan="2">个人</td>
            <td>姓名</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="party" :rules="fieldRules('party',propertyFeatures['party'],'',isParty)">
                <el-input type="textarea" v-model="docData.party" :disabled="!isParty || fieldDisabled(propertyFeatures['party'])" v-bind:class="{ over_flow:docData.party.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="/"></el-input>
              </el-form-item>
            </td>
            <td>性别</td>
            <td colspan="2"  class="color_DBE4EF">
              <el-form-item prop="partySex" v-if="!approval" :rules="fieldRules('partySex',propertyFeatures['partySex'],'',isParty)">
                <el-select v-model="docData.partySex" :disabled="!isParty || fieldDisabled(propertyFeatures['partySex'])" placeholder="/">
                  <el-option value="0" label="男"></el-option>
                  <el-option value="1" label="女"></el-option>
                </el-select>
              </el-form-item>
              <span v-else>{{docData.partySex == 0 ? '男' :'女'}}</span>
            </td>
            <td>年龄</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyAge" :rules="fieldRules('partyAge',propertyFeatures['partyAge'],'',isParty)">
                <el-input type="textarea" v-model="docData.partyAge" 
                :disabled="!isParty || fieldDisabled(propertyFeatures['partyAge'])"
                v-bind:class="{ over_flow:docData.partyAge.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" maxlength="3" placeholder="/"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>住址</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyAddress" :rules="fieldRules('partyAddress',propertyFeatures['partyAddress'],'',isParty)">
                <el-input  type="textarea" v-model="docData.partyAddress" :disabled="!isParty || fieldDisabled(propertyFeatures['partyAddress'])" 
                v-bind:class="{ over_flow:docData.partyAddress.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
            <td>身份证件号</td>
            <td colspan="2"  class="color_DBE4EF">
              <el-form-item prop="partyIdNo" :rules="fieldRules('partyIdNo',propertyFeatures['partyIdNo'],validateIDNumber,isParty)">
                <el-input type="textarea" v-model="docData.partyIdNo" :disabled="!isParty || fieldDisabled(propertyFeatures['partyIdNo'])" v-bind:class="{ over_flow:docData.partyIdNo.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="/"></el-input>
              </el-form-item>
            </td>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyTel" :rules="fieldRules('partyTel',propertyFeatures['partyTel'],validatePhone,isParty)">
                <el-input type="textarea" v-model="docData.partyTel" :disabled="!isParty || fieldDisabled(propertyFeatures['partyTel'])" v-bind:class="{ over_flow:docData.partyTel.length>6?true:false }" :autosize="{ minRows: 2, maxRows: 3}" :maxlength="nameLength" placeholder="/"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="3">单位</td>
            <td>名称</td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item prop="partyName" :rules="fieldRules('partyName',propertyFeatures['partyName'],'',!isParty)">
                <el-input type="textarea" v-model="docData.partyName" :disabled="isParty || fieldDisabled(propertyFeatures['partyName'])" v-bind:class="{ over_flow:docData.partyName.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="/"></el-input>
              </el-form-item>
            </td>
            <td>法定代表人</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyManager" :rules="fieldRules('partyManager',propertyFeatures['partyManager'],'',!isParty)">
                <el-input type="textarea" v-model="docData.partyManager" :disabled="isParty || fieldDisabled(propertyFeatures['partyManager'])" v-bind:class="{ over_flow:docData.partyManager.length>3?true:false }" :autosize="{ minRows: 1, maxRows: 2}" maxlength="10" placeholder="/" ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>地址</td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item prop="partyUnitAddress" :rules="fieldRules('partyUnitAddress',propertyFeatures['partyUnitAddress'],'',!isParty)">
                <el-input type="textarea" v-model="docData.partyUnitAddress" :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitAddress'])" v-bind:class="{ over_flow:docData.partyUnitAddress.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 2}" maxlength="45" placeholder="/"></el-input>
              </el-form-item>
            </td>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyUnitTel" :rules="fieldRules('partyUnitTel',propertyFeatures['partyUnitTel'],validatePhone,!isParty)">
                <el-input type="textarea" v-model="docData.partyUnitTel" :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitTel'])" v-bind:class="{ over_flow:docData.partyUnitTel.length>6?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="/"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2">统一社会信用代码</td>
            <td colspan="7" class="color_DBE4EF">
              <el-form-item prop="socialCreditCode" :rules="fieldRules('socialCreditCode',propertyFeatures['socialCreditCode'],'',!isParty)">
                <el-input type="textarea" v-model="docData.socialCreditCode" :disabled="isParty || fieldDisabled(propertyFeatures['socialCreditCode'])" v-bind:class="{ over_flow:docData.socialCreditCode.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="/"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="center">
              <p>案</p>
              <p>件</p>
              <p>调</p>
              <p>查</p>
              <p>经</p>
              <p>过</p>
              <p>及</p>
              <p>违</p>
              <p>法</p>
              <p>事</p>
              <p>实</p>
            </td>
            <td colspan="10" class="color_DBE4EF">
              <el-form-item
                prop="illegalFact"
                :rules="fieldRules('illegalFact',propertyFeatures['illegalFact'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.illegalFact"
                  v-bind:class="{ over_flow:docData.illegalFact && docData.illegalFact.length>30?true:false }"
                  :autosize="{ minRows: 1, maxRows: 10}"
                  maxlength="300"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['illegalFact'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td :rowspan="docData.evidenceList.length+1" class="center">
              <p>证</p>
              <p>据</p>
              <p>材</p>
              <p>料</p>
            </td>
            <td>序号</td>
            <td colspan="5" class="center">证据名称</td>
            <td colspan="2">规格</td>
            <td colspan="2">数量</td>
            <!-- <td colspan="3" class="center">备注</td> -->
          </tr>
          <tr @click="handleAdd" v-for="(item,index) in docData.evidenceList" :key="index">
            <td>{{item.resNo}}</td>
            <td colspan="5" class="center">{{item.name}}</td>
            <td colspan="2">{{item.des}}</td>
            <td colspan="2">{{item.num}}</td>
            <!-- <td colspan="3" class="center">{{item.note}}</td> -->
          </tr>
          <tr>
            <td class="center">
              <p>案</p>
              <p>件</p>
              <p>进</p>
              <p>展</p>
              <p>情</p>
              <p>况</p>
              <p>及</p>
              <p>解</p>
              <p>除</p>
              <p>强</p>
              <p>制</p>
              <p>措</p>
              <p>施</p>
              <p>的</p>
              <p>建</p>
              <p>议</p>
            </td>
            <td colspan="10" class="color_DBE4EF">
              <el-form-item prop="lawOfficeOpinions" style="height:72%;">
                <el-input style="float:left;margin-top:10px;" 
                  type="textarea" v-model="docData.lawOfficeOpinions"
                  v-bind:class="{ over_flow:docData.lawOfficeOpinions && docData.lawOfficeOpinions.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 10}" maxlength="340" placeholder="/"></el-input> 
              </el-form-item>
              <div class="pdf_seal alginLast" style="white-space:nowrap;height:20%;width:auto;margin-bottom:10px;margin-right:80px;">
                <p>执法人员签名:{{docData.lawOfficeName}}</p>
                <p>
                  <el-date-picker v-model="docData.lawOfficeTime" format=" yyyy年MM月dd日" value-format="yyyy-MM-dd"
                    class="alginLast" placeholder="    年  月  日" type="date" @blur="starttime"></el-date-picker>
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td class="center">
              <p>执</p>
              <p>法</p>
              <p>机</p>
              <p>关</p>
              <p>负</p>
              <p>责</p>
              <p>人</p>
              <p>意</p>
              <p>见</p>
            </td>
            <td colspan="10" class="color_DBE4EF">
              <p class="approveDiv">{{docData.approveOpinions}}</p>
              <div class="pdf_seal alginLast" style="white-space:nowrap;width:auto;margin-top:160px;margin-right:80px;">
                <p>签名:{{docData.approvePeo}}</p>
                <p>
                  <el-date-picker v-model="docData.approveTime" format=" yyyy年MM月dd日" value-format="yyyy-MM-dd"
                    class="alginLast" placeholder="    年  月  日" type="date" @blur="starttime"></el-date-picker>
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td>备注</td>
            <td colspan="10" class="color_DBE4EF">
              <el-form-item
                prop="note"
                :rules="fieldRules('note',propertyFeatures['note'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.note"
                  v-bind:class="{ over_flow:docData.note.length>27?true:false }"
                  :autosize="{ minRows: 1, maxRows: 4}"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['note'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
      </div>
    </el-form>
    <!-- 添加弹出框 -->
    <el-dialog
      title="证据材料名称清单"
      append-to-body
      :visible.sync="addVisible"
      width="60%"
      v-loading="addLoading"
    >
      <div>
        <div class="fullscreen">
          <el-form ref="addResFormRef">
            <el-table :data="tableDatas" stripe border style="width: 100%">
              <el-table-column prop="resNo" label="序号" align="center">
                <template slot-scope="scope">
                  <span>{{++scope.$index}}</span>
                </template>
              </el-table-column>
              <el-table-column label="证据材料名称" align="center">
                <template slot-scope="scope">
                  <el-input maxlength="15" v-model="scope.row.name"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="des" label="规格" align="center">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.des" placeholder>
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="num" label="数量" align="center">
                <template slot-scope="scope">
                  <el-input-number size="mini" v-model="scope.row.num" :min="1" label="描述文字"></el-input-number>
                </template>
              </el-table-column>

              <!-- <el-table-column label="备注" align="center">
                <template slot-scope="scope">
                  <el-input maxlength="10" v-model="scope.row.note"></el-input>
                </template>
              </el-table-column> -->
              <el-table-column width="52%">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    icon="el-icon-circle-close"
                    circle
                    @click="deleteRes(scope.row)"
                    class="evdence-form"
                    style="border-radius:50px"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button
              icon="el-icon-circle-plus-outline"
              circle
              type="info"
              @click="addTableData"
              style="margin-left: 50%;margin-top: 10px;"
            ></el-button>
          </el-form>
        </div>
        <div style="margin-left: 45%;margin-top: 10px">
          <el-button size="medium" type="primary" @click="addResSure('addResFormRef')">确 定</el-button>
          <el-button size="medium" @click="addVisible=false">取 消</el-button>
        </div>
      </div>
    </el-dialog>
    <casePageFloatBtns :formOrDocData="formOrDocData" @saveData="saveData"></casePageFloatBtns>
    <!--  显示证据材料 -->
    <investigRpEvidence ref="investigRpEvidenceRef" @sendToReportEmit="receiverEviden"></investigRpEvidence>
    <caseSlideMenu :activeIndex="''"></caseSlideMenu>
  </div>
</template>
<script>
import showApprovePeople from "@/page/caseHandle/components/showApprovePeople";
import approvalDialog from "@/page/caseHandle/components/approvalDialog";
import showLawOfficerOpion from "@/page/caseHandle/components/showLawOfficerOpion";
import investigRpEvidence from "@/page/caseHandle/components/investigRpEvidence";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import caseSlideMenu from "@/page/caseHandle/components/caseSlideMenu";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import { validatePhone, validateIDNumber } from "@/common/js/validator";
import iLocalStroage from "@/common/js/localStroage";

export default {
  data() {
    return {
      validatePhone: validatePhone,
      validateIDNumber: validateIDNumber,
      docData: {
        caseNumber: "",
        caseName: "",
        staff: "",
        staff1: "",
        staff2: "",
        party: "",
        partySex:'',
        partyAge: "",
        partyAddress: "",
        partyIdNo: "",
        partyTel: "",
        partyName: "",
        partyManager: "",
        partyUnitAddress: "",
        partyUnitTel: "",
        socialCreditCode: "",
        illegalFact: "",
        approveOpinions: "",
        approvePeo: "",
        approveTime: "",
        evidenceList: [], //证据材料
        lawOfficeOpinions: "",
        lawOfficeName: "",
        lawOfficeTime: "",
        note: ""
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
      handleType: 0,
      options: [
        { value: "1", label: " " },
        { value: "2", label: "份" },
        { value: "3", label: "套" },
        { value: "4", label: "个" },
        { value: "5", label: "件" },
        { value: "6", label: "张" },
      ],
      addVisible: false,
      addLoading: false,
      tableDatas: [],
      rules: {
        caseName: [
          { required: true, message: "案由不能为空", trigger: "blur" },
        ],
        staff1: [
          { required: true, message: "案件调查人员不能为空", trigger: "blur" },
        ],
        staff2: [
          { required: true, message: "案件调查人员不能为空", trigger: "blur" },
        ],
        party: [
          { required: true, message: "当事人姓名不能为空", trigger: "blur" }
        ],
        partyIdNo: [
          { required: true, message: "身份证号不能为空", trigger: "blur" },
          { validator: validateIDNumber, trigger: "blur" }
        ],
        partyTel: [
          { required: true, message: "联系电话不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        partyAddress: [
          { required: true, message: "住址不能为空", trigger: "blur" }
        ],
        partyAge: [
          { required: true, message: "年龄不能为空", trigger: "blur" }
        ],
        partySex: [
          { required: true, message: "请选择性别", trigger: "change" }
        ],
        partyName: [
          { required: true, message: '单位名称不能为空', trigger: 'blur' },
        ],
        partyManager: [
          { required: true, message: '法人不能为空', trigger: 'blur' },
        ],
        partyUnitAddress: [
          { required: true, message: '单位地址不能为空', trigger: 'blur' },
        ],
        partyUnitTel: [
          { required: true, message: '单位联系电话不能为空', trigger: 'blur' },
          { validator: validatePhone, trigger: "blur" }
        ],
        socialCreditCode: [
          { required: true, message: '社会信用代码不能为空', trigger: 'blur' },
        ],
        illegalFact: [
          { required: true, message: "案件调查经过不能为空", trigger: "blur" },
        ],
        lawOfficeOpinions: [
          { required: true, message: "调查人员处理意见不能为空", trigger: "blur" },
        ],
      },
      approval: this.$route.params.isApproval ? true : false, //   是否是审批人员进入
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
        pageDomId: "caseInvest-print",
      },
      approvalOver: false, //审核完成
      nameLength: 10,
      sexLength: 2,
      adressLength: 23,
      isParty: true,
      originalData: "",
      needDealData: true,
      disableWhenApproval: false,
      propertyFeatures: "", //字段属性配置
    };
  },
  computed: { ...mapGetters(["caseId"]) },
  mixins: [mixinGetCaseApiList],
  components: {
    showApprovePeople,
    approvalDialog,
    casePageFloatBtns,
    investigRpEvidence,
    caseSlideMenu,
    showLawOfficerOpion,
  },
  methods: {
    starttime(){
      if (Date.parse(this.docData.lawOfficeTime) < Date.parse(this.docData.lasj)) {
        this.$message({
          message: '当前时间不得小于立案时间',
          type: 'warning'
        });
        this.docData.lawOfficeTime = '';
      }
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
          true
        ]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    },
    showEvidence() {
      if (!this.disableWhenApproval)
        this.$refs.investigRpEvidenceRef.showModal(this.docData.evidenceList);
    },
    //证据列表弹窗传来的证据
    receiverEviden(data) {
      this.docData.evidenceList = data;
    },
    handleAdd(resNo, row) {
      let tableArr = [];
      this.docData.evidenceList.forEach((item) => {
        if (item.resNo != "") {
          tableArr.push(item);
        }
      });
      this.tableDatas = tableArr;
      this.addVisible = true;
      if (this.tableDatas.length == 0) {
        this.tableDatas.push({ resNo: 1, num: 1 });
      }
    },
    //删除一行证据
    deleteRes(row) {
      for (let i = 0; i < this.tableDatas.length; i++) {
        if (this.tableDatas[i].resNo > row.resNo) {
          this.tableDatas[i].resNo = this.tableDatas[i].resNo - 1;
        }
      }
      this.tableDatas.splice(row.resNo - 1, 1);
      this.docData.evidenceList.splice(row.resNo - 1, 1);
      this.docData.evidenceList.push({
        resNo: "",
        name: "",
        num: "",
        des: "",
        // note: "",
      });
    },
    //确定添加
    addResSure(formName) {
      let canAdd = true;
      if (this.tableDatas.length > 0) {
        for (let i = 0; i < this.tableDatas.length; i++) {
          if (!this.tableDatas[i].name || !this.tableDatas[i].des || !this.tableDatas[i].num) {
            this.$message({
              message: "名称、规格、数量不能为空！",
              type: "warning",
            });
            canAdd = false;
            break;
          }
        }
        if (canAdd) {
          this.tableDatas.forEach((item, index, arr) => {
            item.resNo = index + 1;
            this.docData.evidenceList[index] = this.tableDatas[index];
          });
          this.addVisible = false;
        }
      }
    },
    //添加一行数据
    addTableData() {
      let length = this.tableDatas.length;
      // if (length == 6) {
      //   this.$message({
      //     message: "最多输入六行！",
      //     type: "warning",
      //   });
      //   return;
      // }
      if (length == 0) {
        this.tableDatas.push({ resNo: 1, num: 1 });
      } else {
        this.tableDatas.push({
          resNo: Number(this.tableDatas[length - 1].resNo) + 1,
          num: 1,
          // note: "",
        });
      }
    },
    //对原始数据做一下处理
    getDataAfter() {
      if(!this.docData.staff1){
        this.docData.staff1 = this.docData.staff.split(',')[0];
        this.docData.staff2 = this.docData.staff.split(',')[1];
      }
      if (!this.docData.evidenceList.length) {
        this.docData.evidenceList = [
          { resNo: "", name: "", num: "", des: "" },
        ];
      }
    },
  },
  created() {
    this.getDocDataByCaseIdAndDocId()
    this.isOverStatus();
  },
};
</script>

<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss">
</style>
<style lang="scss">
#prolongAdminCoerciveMeasureApproval_SC_print{
  .prolong_table {
    table-layout: fixed;
    td, p, span, .el-checkbox {
      white-space: normal;
      word-wrap: break-word;
      word-break: break-all;
    }
  }
  .alginLast{
    text-align: right;
     .el-input__inner{
       text-align-last: right;  
     }
  }
  .center{
    text-align: center;
    text-align-last: center;
  }
}
</style>
