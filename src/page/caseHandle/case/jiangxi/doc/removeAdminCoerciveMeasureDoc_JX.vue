<!--长软-->
<template>
  <div
    class="print_box printNumbers_box"
    id="removeAdminCoercive-print"
    style="width:790px; margin:0 auto;"
  >
    <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
      <div class="print_info">
        <div class="doc_topic">解除行政强制措施决定书</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <p class="p_begin">
          当事人（个人姓名或单位名称）
          <span>
            <el-form-item prop="party" :rules="fieldRules('party',propertyFeatures['party'])">
              <el-input :disabled="fieldDisabled(propertyFeatures['party'])" v-model="docData.party" :maxLength="maxLength"></el-input>
            </el-form-item>
          </span>:
        </p>
        <p>
          因你（单位）
          <span>
            <el-form-item prop="caseCauseName" :rules="fieldRules('caseCauseName',propertyFeatures['caseCauseName'])">
              <el-input
                :disabled="fieldDisabled(propertyFeatures['caseCauseName'])"
                v-model="docData.caseCauseName"
                type="textarea"
                v-bind:class="{ over_flow:docData.caseCauseName.length>14?true:false }"
                :autosize="{ minRows: 1, maxRows: 3}"
                :maxLength="maxLength"
              ></el-input>
            </el-form-item>
          </span>，本机关依法于
          <span>
            <el-form-item prop="dateTime" class="pdf_datapick" :rules="fieldRules('dateTime',propertyFeatures['dateTime'])">
              <el-date-picker
                :disabled="fieldDisabled(propertyFeatures['dateTime'])"
                v-model="docData.dateTime"
                type="date"
                format="yyyy年MM月dd日"
                placeholder="    年  月  日"
                value-format="yyyy-MM-dd"
                @blur="startTime"
              ></el-date-picker>
            </el-form-item>
          </span>对你（单位）采取了
          <span>
            <el-form-item prop="enforceMeasure" :rules="fieldRules('enforceMeasure',propertyFeatures['enforceMeasure'])">
              <el-input
                :disabled="fieldDisabled(propertyFeatures['enforceMeasure'])"
                v-model="docData.enforceMeasure"
                type="textarea"
                v-bind:class="{ over_flow:docData.enforceMeasure.length>14?true:false }"
                :autosize="{ minRows: 1, maxRows: 3}"
              ></el-input>
            </el-form-item>
          </span>的行政强制措施，行政强制措施决定书编号：
          <span>
            <el-form-item prop="caseNumberCopy" :rules="fieldRules('caseNumberCopy',propertyFeatures['caseNumberCopy'])">
              <el-input :disabled="fieldDisabled(propertyFeatures['caseNumberCopy'])" v-model="docData.caseNumberCopy" :maxLength="maxLength"></el-input>
            </el-form-item>
          </span>。
        </p>
        <p>
          依照《中华人民共和国行政强制法》第二十八条第一款第
          <span>
            <el-form-item prop="clause" style="width:140px" :rules="fieldRules('clause',propertyFeatures['clause'])">
              <el-select v-model="docData.clause" :maxLength="maxLength" placeholder="/" :disabled="fieldDisabled(propertyFeatures['clause'])">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </span>项的规定， 本机关决定自
          <span>
            <el-form-item prop="removeDate" class="pdf_datapick" :rules="fieldRules('removeDate',propertyFeatures['removeDate'])">
              <el-date-picker
                v-model="docData.removeDate"
                type="date"
                format="yyyy年MM月dd日"
                placeholder="    年  月  日"
                value-format="yyyy-MM-dd"
                :disabled="fieldDisabled(propertyFeatures['removeDate'])"
                @blur="startTime"
              ></el-date-picker>
            </el-form-item>
          </span>起解除该行政强制措施。
        </p>

        <div class="pdf_seal">
          <span>交通运输执法部门(印章)</span>
          <br />
          <el-form-item prop="makeDate" class="pdf_datapick">
            <el-date-picker
              v-model="docData.makeDate"
              type="date"
              format="yyyy年MM月dd日"
              placeholder="    年  月  日"
              value-format="yyyy-MM-dd"
              @blur="startTime"
            ></el-date-picker>
          </el-form-item>
        </div>
      </div>
      <div class="print_info">
        <!-- <br><br><br><br><br> -->
        <p class="p_begin">
          退还财物清单如下：
          <br />
        </p>
        <div>
          <table class="evidencetable" border="1" bordercolor="black" width="100%" cellspacing="0">
            <tr>
              <td width="10%">序号</td>
              <td width="30%">退还财物名称</td>
              <td width="10%">规格</td>
              <td width="10%">数量</td>
              <td width="40%">备注</td>
            </tr>
            <tr v-if="docData.resList.length == 0"  @click="handleAdd">
            <td></td>
            <td ></td>
            <td></td>
            <td></td>
            <td ></td>
          </tr>
            <tr v-for="(item,index) in docData.resList" :key="index" @click="handleAdd">
              <td>{{item.resNo}}</td>
              <td>{{item.resName}}</td>
              <td>{{item.spec}}</td>
              <td>{{item.amount}}</td>
              <td>
                <div style>{{item.resNote}}</div>
              </td>
            </tr>
          </table>
        </div>
        <br />
        <p>经当事人（代理人）查验，退还的财物与查封、扣押时一致，查封、扣押期间没有使用、丢失和损坏现象。</p>

        <br />
        <br />
        <br />
        <div class="notice clear">
          <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
        </div>
      </div>
    </el-form>
    <!-- 添加弹出框 -->
    <el-dialog title="退还财物清单" append-to-body :visible.sync="addVisible" width="60%" v-loading="addLoading">
      <div>
        <div class="fullscreen">
          <el-form ref="addResFormRef">
            <el-table :data="tableDatas" stripe border style="width: 100%">
              <el-table-column prop="resNo" label="序号" align="center">
                 <template slot-scope="scope">
                  <span>{{++scope.$index}}</span>
                </template>
              </el-table-column>
              <el-table-column label="退还财物名称" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.resName"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="spec" label="规格" align="center">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.spec" placeholder="">
                    <el-option v-for="item in resOptions" :key="item.value" :label="item.label" :value="item.label">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="数量" align="center">
                <template slot-scope="scope">
                  <el-input-number size="mini" v-model="scope.row.amount" :min="1" label="描述文字"></el-input-number>
                </template>
              </el-table-column>

              <el-table-column label="备注" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.resNote"></el-input>
                </template>
              </el-table-column>
              <el-table-column width="52%">
                <template slot-scope="scope">
                  <el-button size="mini" icon="el-icon-circle-close" circle @click="deleteRes(scope.row)"  class="evdence-form" style="border-radius:50px"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button icon="el-icon-circle-plus-outline" circle type="info" @click="addTableData"
                  style="margin-left: 50%;margin-top: 10px;"></el-button>
          </el-form>
        </div>
        <div style="margin-left: 45%;margin-top: 10px">
          <el-button size="medium" type="primary" @click="addResSure('addResFormRef')">确 定</el-button>
          <el-button size="medium" @click="addVisible=false">取  消</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 悬浮按钮 -->
    <casePageFloatBtns
      :pageDomId="'removeAdminCoercive-print'"
      :formOrDocData="formOrDocData"
      @submitData="submitData"
      @saveData="saveData"
      @backHuanjie="submitData"
    ></casePageFloatBtns>

    <!-- <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput> -->
  </div>
</template>
<script>
// import overflowInput from "./overflowInput";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";

export default {
  components: {
    // overflowInput,
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  data() {
    return {
      docData: {
        caseNumber: "",
        party: "",
        caseCauseName: "",
        dateTime: "",
        enforceMeasure: "",
        caseNumberCopy: "",
        clause: "",
        removeDate: "",
        makeDate: "",
        resList: []
      },
      tableData: [],
      needDealData: true,
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件id--从流程进入删掉，先写死测试用
        caseDoctypeId: this.$route.params.docId, //表单类型IDer
        //表单数据
        docData: "",
        status: "",
        linkTypeId: this.$route.params.caseLinkTypeId
      },
      resOptions: [
        {
          value: '1',
          label: ' '
        },
        {
          value: '2',
          label: '份'
        },
        {
          value: '3',
          label: '套'
        },
        {
          value: '4',
          label: '个'
        },
        {
          value: '5',
          label: '件'
        }
      ],
      options: [
        {
          value: "1",
          label: "一"
        },
        {
          value: "2",
          label: "二"
        },
        {
          value: "3",
          label: "三"
        },
        {
          value: "4",
          label: "四"
        },
        {
          value: "5",
          label: "五"
        }
      ],
      rules: {
        party: [
          { required: true, message: "当事人不能为空", trigger: "blur" }
        ],
        caseCauseName: [
          { required: true, message: "案由不能为空", trigger: "blur" }
        ],
        dateTime: [
          { required: true, message: "强制时间不能为空", trigger: "blur" }
        ],
        caseNumberCopy: [
          { required: true, message: "案号 不能为空", trigger: "blur" }
        ],
        enforceMeasure: [
          { required: true, message: "强制措施不能为空", trigger: "blur" }
        ],
        clause: [
          { required: true, message: "请解除依据不能为空", trigger: "blur" }
        ],
        removeDate: [
          { required: true, message: "解除日期不能为空", trigger: "blur" }
        ]
      },
      nameLength: 23,
      adressLength: 23,
      maxLength: 23,
      maxLengthOverLine: 122,
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: "removeAdminCoercive-print"
      },
      addVisible: false,
      addLoading: false,
      tableDatas: [],
      propertyFeatures:'', //字段属性配置
    };
  },

  methods: {
    starttime(){
      console.log('案发时间=='+this.docData.lasj)
      if (Date.parse(this.docData.makeDate) < Date.parse(this.docData.lasj.substr(0,10))) {
        this.$message({
          message: '当前时间不得小于立案时间',
          type: 'warning'
        });
        this.docData.makeDate = '';
      }
      if (Date.parse(this.docData.dateTime) < Date.parse(this.docData.lasj.substr(0,10))) {
        this.$message({
          message: '当前时间不得小于立案时间',
          type: 'warning'
        });
        this.docData.dateTime = '';
      }
      if (Date.parse(this.docData.removeDate) < Date.parse(this.docData.lasj.substr(0,10))) {
        this.$message({
          message: '当前时间不得小于立案时间',
          type: 'warning'
        });
        this.docData.removeDate = '';
      }
    },
    //对原始数据做一下处理
    getDataAfter() {
      if (!this.docData.resList) {
        this.docData.resList = [
          { resNo: "", resName: "", spec: "", amount: "", resNote: "" }
        ];
      }
      this.tableData = JSON.parse(this.docData.resList);
    },
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId, //流程里的案件id
        // caseId: '', //先写死
        docId: this.$route.params.docId
      };
      this.com_getDocDataByCaseIdAndDocId(data);
    },
     // 多行编辑
    overFlowEdit() {
      this.$refs.overflowInputRef.showModal(0, "", this.maxLengthOverLine);
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
    handleAdd(resNo, row) {
        this.tableDatas = JSON.parse(JSON.stringify(this.docData.resList));
        this.addVisible = true;
        if (this.tableDatas.length == 0) {
          this.tableDatas.push({'resNo': 1, 'amount': 1});
        }
    },
    //添加一行数据
    addTableData() {
      let length = this.tableDatas.length;
      if (length == 5) {
        this.$message({
          message: '最多输入五行！',
          type: 'warning'
        });
        return;
      }
      if (length == 0) {
        this.tableDatas.push({'resNo': 1, 'amount': 1});
      } else {
        this.tableDatas.push({
          'resNo': Number(this.tableDatas[length - 1].resNo) + 1,
          'amount': 1
        });
      }
      console.log("12345611111",this.docData.resList)
    },
    //删除一行证据
    deleteRes(row) {
      for (let i = 0; i < this.tableDatas.length; i++) {
        if (this.tableDatas[i].resNo > row.resNo) {
          this.tableDatas[i].resNo = this.tableDatas[i].resNo - 1;
        }
      }
      this.tableDatas.splice(row.resNo - 1, 1)
    },
    //确定添加
    addResSure(formName) {
      let canAdd = true;
      console.log("添加数据", this.tableDatas.length)
      if (this.tableDatas.length == 0) {
        this.$message({
          message: '数据至少有一行不为空！',
          type: 'warning'
        });
        canAdd = false;
      } else {
        for (let i = 0; i < this.tableDatas.length; i++) {
          if (!this.tableDatas[i].resName || !this.tableDatas[i].spec) {
            this.$message({
              message: '财务名称或规格不能为空！',
              type: 'warning'
            });
            canAdd = false;
            break;
          }
        }
      }
      if (canAdd) {
        this.docData.resList = this.tableDatas;
        this.addVisible = false;
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },
  mounted() {},
  created() {
    this.isOverStatus();
    this.getDocDataByCaseIdAndDocId();
  }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">
/* @import "@/assets/css/caseHandle/caseDocModle.scss"; */
.print_box .print_info .evidencetable tr td {
  white-space: inherit;
  text-align-last: center;
}
</style>
