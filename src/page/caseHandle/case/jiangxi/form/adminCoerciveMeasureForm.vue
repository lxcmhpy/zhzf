<!-------长软------->
<template>
  <div class="print_box printNumbers_box" style="width:790px; margin:0 auto;">
    <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="formData">
      <div class="print_info">
        <div class="doc_topic">行政强制措施</div>
        <div class="doc_number">案号：{{formData.caseNumber}}</div>
        <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td>案号</td>
            <td colspan="7">{{formData.caseNumber}}</td>
          </tr>
          <tr>
            <td>案由</td>
            <td colspan="7">{{formData.caseName}}</td>
          </tr>
          <tr>
            <td rowspan="6">
              当
              <br />事
              <br />人
            </td>
            <td rowspan="2">个人</td>
            <td>姓名</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="party"
                :rules="fieldRules('party',propertyFeatures['party'],'',isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.party"
                  v-bind:class="{ over_flow:formData.party.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['party'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
            <td>身份证件号</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="partyIdNo"
                :rules="fieldRules('partyIdNo',propertyFeatures['partyIdNo'],validateIDNumber,isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.partyIdNo"
                  v-bind:class="{ over_flow:formData.partyIdNo.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 2}"
                  maxlength="18"
                  placeholder="\"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyIdNo'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>住址</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="partyAddress"
                :rules="fieldRules('partyAddress',propertyFeatures['partyAddress'],'',isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.partyAddress"
                  v-bind:class="{ over_flow:formData.partyAddress.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="adressLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyAddress'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="partyTel"
                :rules="fieldRules('partyTel',propertyFeatures['partyTel'],validatePhone,isParty)"
              >
                <el-input
                  v-model="formData.partyTel"
                  :maxLength="maxLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyTel'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="4">单位</td>
            <td>名称</td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item
                prop="partyName"
                :rules="fieldRules('partyName',propertyFeatures['partyName'],'',!isParty)"
              >
                <el-input
                  v-model="formData.partyName"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyName'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>地址</td>
            <td colspan="4" class="color_DBE4EF">
              <el-form-item
                prop="partyUnitAddress"
                :rules="fieldRules('partyUnitAddress',propertyFeatures['partyUnitAddress'],'',!isParty)"
              >
                <el-input
                  v-model="formData.partyUnitAddress"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitAddress'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="partyUnitTel"
                :rules="fieldRules('partyUnitTel',propertyFeatures['partyUnitTel'],validatePhone,!isParty)"
              >
                <el-input
                  v-model="formData.partyUnitTel"
                  minlength="11"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitTel'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
            <td>法定代表人</td>
            <td class="color_DBE4EF">
              <el-form-item
                prop="partyManager"
                :rules="fieldRules('partyManager',propertyFeatures['partyManager'],'',!isParty)"
              >
                <el-input
                  v-model="formData.partyManager"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyManager'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2">统一社会信用代码</td>
            <td colspan="3" class="color_DBE4EF">
              <el-form-item
                prop="socialCreditCode"
                :rules="fieldRules('socialCreditCode',propertyFeatures['socialCreditCode'],'',!isParty)"
              >
                <el-input
                  v-model="formData.socialCreditCode"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['socialCreditCode'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <br />
        <h2>查封、扣押场所、设施、财物清单如下:</h2>
        <br />
        <table class="evidencetable" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td width="10%">序号</td>
            <td width="30%">查封、扣押场所、设施、财物名称</td>
            <td width="15%">规格</td>
            <td width="15%">数量</td>
            <td width="30%">备注</td>
          </tr>
          <tr v-if="formData.resList.length==0" @click="handleAdd">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr v-for="(item,index) in formData.resList" :key="index" @click="handleAdd">
            <td>{{item.resNo}}</td>
            <td>{{item.resName}}</td>
            <td>{{item.spec}}</td>
            <td>{{item.amount}}</td>
            <td>
              <div style>{{item.resNote}}</div>
            </td>
          </tr>
        </table>
        <br />
        <br />
        <h2>文书列表</h2>
        <br />
        <el-table
          class="evidencetable"
          :data="docTableDatas"
          border="1"
          cellspacing="0"
          style="width: 100%"
        >
          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
          <el-table-column prop="name" label="材料名称" align="center"></el-table-column>
          <el-table-column prop="status" label="状态" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status == '1' || scope.row.status == '2'">完成</span>
              <span v-if="scope.row.status == '0'">暂存</span>
              <span
                v-if="scope.row.status != '1' && scope.row.status != '0'  && scope.row.status != '2'"
              >-</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <!-- 已完成 -->
              <span
                v-if="scope.row.status == '1' || scope.row.status == '2'"
                class="tableHandelcase"
                @click="viewDocPdf(scope.row)"
              >查看</span>
              <!-- 未完成 暂存 -->
              <span v-if="scope.row.status == '0'" class="tableHandelcase">
                <span @click="viewDoc(scope.row)">编辑</span>
                <span @click="delDocDataByDocId(scope.row)">清空</span>
              </span>
              <!-- 无状态 -->
              <span
                v-if="scope.row.status != '1' && scope.row.status != '0' && scope.row.status != '2'"
                class="tableHandelcase"
                @click="viewDoc(scope.row)"
              >添加</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 悬浮按钮 -->
        <div class="float-btns btn-height63">
          <el-button type="primary" @click="continueHandle" v-if="!this.$route.params.isComplete">
            <svg
              t="1577515608465"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2285"
              width="24"
              height="24"
            >
              <path
                d="M79.398558 436.464938c-25.231035 12.766337-56.032441 2.671394-68.800584-22.557835-12.775368-25.222004-2.682231-56.025216 22.548804-68.798778 244.424411-123.749296 539.711873-85.083624 744.047314 97.423694 33.059177-37.018403 66.118353-74.034999 99.179336-111.042564 26.072732-29.199292 74.302319-15.865804 81.689744 22.574091 20.740782 107.953934 41.486982 215.915094 62.229569 323.867222 5.884653 30.620785-18.981527 58.454577-50.071928 56.06134-109.610235-8.480185-219.211438-16.95134-328.812642-25.422494-39.021496-3.010963-57.692354-49.437946-31.610591-78.633625 33.060983-37.007565 66.116547-74.025968 99.175724-111.03534-172.88741-154.431492-422.746726-187.152906-629.574746-82.435711z"
                fill="#FFFFFF"
                p-id="2286"
              />
            </svg>
            <br />提交
          </el-button>

          <el-button type="primary" @click="submitCaseDoc(1)" v-if="!this.$route.params.isComplete">
            <i class="iconfont law-save"></i>
            <br />保存
          </el-button>
          <el-button type="primary" @click="backBtn" v-if="this.$route.params.isComplete">
            <i class="iconfont law-back"></i>
            <br />返回
          </el-button>
        </div>
        <el-form-item prop="resLength" style="visibility:hidden">
          <el-input v-model="formData.resLength"></el-input>
        </el-form-item>
        <br />
      </div>
    </el-form>

    <!-- 添加弹出框 -->
    <el-dialog
      title="查封、扣押场所、设施、财物清单"
      append-to-body
      :visible.sync="addVisible"
      width="60%"
      v-loading="addLoading"
    >
      <div>
        <div class="fullscreen">
          <el-form ref="addResFormRef">
            <el-table :data="tableDatas" stripe border style="width: 100%">
              <el-table-column prop="resNo" label="序号" align="center"></el-table-column>
              <el-table-column label="查封、扣押场所、设施、财物名称" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.resName"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="spec" label="规格" align="center">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.spec" placeholder>
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    ></el-option>
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
  </div>
</template>
<script>
import overflowInput from "@/page/caseHandle/case/modle/overflowInput.vue";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { getOrganDetailApi, getOrganIdApi } from "@/api/system";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import {
  validateIDNumber,
  validatePhone,
  validateZIP
} from "@/common/js/validator";
import { testApi } from "@/api/caseHandle";
export default {
  components: {
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  data() {
    //当事人类型为公司时验证
    var validateIfCom = (rule, value, callback) => {
      if (!this.isParty && !value) {
        return callback(new Error("法人、地址、联系电话、信用代码不能为空"));
      }
      callback();
    };
    var validateEvidencLength = (rule, value, callback) => {
      if (this.formData.resList.length == 0) {
        return callback(new Error("至少填写一个物品"));
      }
      callback();
    };
    return {
      validatePhone: validatePhone,
      validateIDNumber: validateIDNumber,
      formData: {
        caseNumber: "",
        caseName: "",
        party: "",
        partyIdNo: "",
        partyAddress: "",
        partyTel: "",
        partyName: "",
        partyUnitAddress: "",
        partyUnitTel: "",
        partyManager: "",
        socialCreditCode: "",
        resList: [],
        resLength: 0
      },
      handleType: 0, //0  暂存     1 提交
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件id
        caseLinktypeId: "c9493b367f429c2b55eea4bbb3627e36", //this.BASIC_DATA_SYS.adminCoerciveMeasureForm_caseLinktypeId, //表单类型IDer
        //表单数据
        formData: "",
        status: ""
      },
      isPdf: "",
      originalData: "",
      isParty: true,
      docTableDatas: [],
      rules: {
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
        partyName: [
          { required: true, message: "单位名称不能为空", trigger: "blur" }
        ],
        partyManager: [
          { required: true, message: "法人不能为空", trigger: "blur" }
        ],
        partyUnitAddress: [
          { required: true, message: "单位地址不能为空", trigger: "blur" }
        ],
        partyUnitTel: [
          { required: true, message: "单位联系电话不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        socialCreditCode: [
          { required: true, message: "社会信用代码不能为空", trigger: "blur" }
        ],
        resLength: [{ validator: validateEvidencLength, trigger: "blur" }]
      },
      nameLength: 23,
      adressLength: 23,
      maxLength: 23,
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false] //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
      },
      addVisible: false,
      addLoading: false,
      tableDatas: [],
      options: [
        {
          value: "1",
          label: " "
        },
        // {
        //   value: '1',
        //   label: '(空)'
        // },
        {
          value: "2",
          label: "份"
        },
        {
          value: "3",
          label: "套"
        },
        {
          value: "4",
          label: "个"
        },
        {
          value: "5",
          label: "件"
        }
      ],
      needDealData: true,
      propertyFeatures: "" //字段属性配置
    };
  },

  methods: {
    //加载表单信息
    setData() {
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(
        this.caseLinkDataForm.caseBasicinfoId,
        this.caseLinkDataForm.caseLinktypeId,
        false
      );
    },
    // 盖章
    makeSeal() {
      console.log("盖章!");
    },
    // 打印
    print() {
      console.log("打印!");
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
      console.log(this.formData.measureStartDate);
      this.com_submitCaseForm(handleType, "docForm", true);
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
      this.tableDatas = JSON.parse(JSON.stringify(this.formData.resList));
      this.addVisible = true;
      if (length == 0) {
        this.tableDatas.push({ resNo: 1, amount: 1 });
      }
    },
    //添加一行数据
    addTableData() {
      console.log(this.tableDatas);
      let length = this.tableDatas.length;
      if (length == 5) {
        this.$message({
          message: "最多输入五行！",
          type: "warning"
        });
        return;
      }
      if (length == 0) {
        this.tableDatas.push({ resNo: 1, amount: 1 });
      } else {
        this.tableDatas.push({
          resNo: Number(this.tableDatas[length - 1].resNo) + 1,
          amount: 1,
          resNote: this.tableDatas[0].resNote
        });
      }
    },
    //提交
    continueHandle() {
      if (this.isSaveLink) {
        let caseData = {
          caseBasicinfoId: this.caseLinkDataForm.caseBasicinfoId,
          caseLinktypeId: this.caseLinkDataForm.caseLinktypeId
        };
        let canGotoNext = true; //是否进入下一环节  isRequired(0必填 1非必填)
        let allFinish = true;
        console.log("canGotoNext", this.docTableDatas);
        for (let i = 0; i < this.docTableDatas.length; i++) {
          if (
            this.docTableDatas[i].isRequired === 0 &&
            Number(this.docTableDatas[i].status) == 0
          ) {
            canGotoNext = false;
            break;
          }
          if (
            this.docTableDatas[i].isRequired !== 0 &&
            this.docTableDatas[i].status === 0
          ) {
            allFinish = false;
            break;
          }
        }
        console.log("canGotoNext", canGotoNext);
        console.log("allFinish", allFinish);
        // if (canGotoNext) {
        //   if(allFinish){
        //     this.$refs.checkDocAllFinishRef.showModal(this.docTableDatas, caseData,1);
        //   }
        //   else{
        //     this.$refs.checkDocAllFinishRef.showModal(this.docTableDatas, caseData,2);
        //   }
        // } else {
        //   this.$refs.checkDocAllFinishRef.showModal(this.docTableDatas, caseData,3);
        // }
      }
      // else{
      //   this.$refs.saveFormDiaRef.showModal();
      // }
    },
    //删除一行证据
    deleteRes(row) {
      for (let i = 0; i < this.tableDatas.length; i++) {
        if (this.tableDatas[i].resNo > row.resNo) {
          this.tableDatas[i].resNo = this.tableDatas[i].resNo - 1;
        }
      }
      this.tableDatas.splice(row.resNo - 1, 1);
      console.log("newLing", this.tableDatas);
    },
    //确定添加
    addResSure(formName) {
      let canAdd = true;
      console.log("添加数据", this.tableDatas.length);
      if (this.tableDatas.length == 0) {
        this.$message({
          message: "数据至少有一行不为空！",
          type: "warning"
        });
        canAdd = false;
      } else {
        for (let i = 0; i < this.tableDatas.length; i++) {
          if (!this.tableDatas[i].resName || !this.tableDatas[i].spec) {
            this.$message({
              message: "财务名称或规格不能为空！",
              type: "warning"
            });
            canAdd = false;
            break;
          }
        }
      }
      if (canAdd) {
        this.formData.resList = this.tableDatas;
        this.addVisible = false;
      }
    },
    //通过案件id和表单类型Id查询已绑定文书
    getDocListByCaseIdAndFormId() {
      let data = {
        linkTypeId: "c9493b367f429c2b55eea4bbb3627e36" //this.BASIC_DATA_SYS.adminCoerciveMeasureForm_caseLinktypeId     //环节ID
      };
      this.com_getDocListByCaseIdAndFormId(data);
    },
    //保存表单数据
    submitCaseDoc(handleType) {
      this.com_submitCaseForm(handleType, "docForm", false);
    },
    //提交
    submitForm() {
      let params = {
        caseId: this.caseId,
        caseLinktypeId: this.BASIC_DATA_SYS.removeOrPrelong_caseLinktypeId
      };
      submitRelieveApi(params).then(
        res => {
          console.log("提交解除或延长表单", res);
          this.$store.dispatch("deleteTabs", this.$route.name);
          this.$router.push({
            name: "case_handle_flowChart"
          });
        },
        err => {
          console.log(err);
        }
      );
    },
    //清空文书
    delDocDataByDocId(data) {
      console.log("清空文书", data);
      this.$refs.resetDocDiaRef.showModal(data);
    },
    //查看文书
    viewDoc(row) {
      if (this.isSaveLink) {
        this.com_viewDoc(row, this.caseLinkDataForm.caseLinktypeId);
      }
      // else {
      //   this.$refs.saveFormDiaRef.showModal(this.saveOrSub);
      // }
    },
    //预览pdf
    viewDocPdf(row) {
      let routerData = {
        hasApprovalBtn: false,
        docId: row.docId,
        approvalOver: false,
        hasBack: true,
        status: row.status, //status状态 0 暂存 1保存未提交  2 保存并提交
        docDataId: row.docDataId
      };
      this.$store.dispatch("deleteTabs", this.$route.name);
      this.$router.push({ name: "case_handle_myPDF", params: routerData });
    }
  },
  mounted() {},
  created() {
    this.setData();
    //通过案件id和表单类型Id查询已绑定文书
    this.getDocListByCaseIdAndFormId();
  }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">
.print_box .print_info .evidencetable tr td {
  white-space: inherit;
  text-align-last: center;
}
</style>
