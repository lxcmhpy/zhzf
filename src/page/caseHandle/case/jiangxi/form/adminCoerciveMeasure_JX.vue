<template>
  <div class="box">
    <el-form ref="caseDocForm" :model="formData" :rules="rules" label-width="130px">
      <div class="content_box">
        <div class="content">
          <div class="content_title">行政强制措施</div>
          <div class="border_blue"></div>
          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item
                  prop="caseNumber"
                  label="案号"
                  :rules="fieldRules('caseNumber',propertyFeatures['caseNumber'])"
                >
                  <el-input
                    ref="caseNumber"
                    clearable
                    class="w-120"
                    v-model="formData.caseNumber"
                    size="small"
                    :disabled="fieldDisabled(propertyFeatures['caseNumber'])"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item
                  prop="caseCauseName"
                  label="案由"
                  :rules="fieldRules('caseCauseName',propertyFeatures['caseCauseName'])"
                >
                  <el-input
                    ref="caseCauseName"
                    clearable
                    class="w-120"
                    v-model="formData.caseCauseName"
                    size="small"
                    :disabled="fieldDisabled(propertyFeatures['caseCauseName'])"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isParty">
              <div class="col">
                <el-form-item
                  label="姓名"
                  prop="party"
                  :rules="fieldRules('party',propertyFeatures['party'],'',isParty)"
                >
                  <el-input
                    ref="party"
                    clearable
                    class="w-120"
                    v-model="formData.party"
                    size="small"
                    placeholder="请输入"
                    :disabled="!isParty || fieldDisabled(propertyFeatures['party'])"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item
                  label="性别"
                  prop="partySex"
                  :rules="fieldRules('partySex',propertyFeatures['partySex'],'',isParty)"
                >
                  <el-select
                    placeholder="请选择"
                    v-model="formData.partySex"
                    :disabled="!isParty || fieldDisabled(propertyFeatures['partySex'])"
                  >
                    <el-option value="0" label="男"></el-option>
                    <el-option value="1" label="女"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isParty">
              <div class="col">
                <el-form-item
                  label="身份证件号"
                  prop="partyIdNo"
                  :rules="fieldRules('partyIdNo',propertyFeatures['partyIdNo'],validateIDNumber,isParty)"
                >
                  <el-input
                    clearable
                    class="w-120"
                    v-model="formData.partyIdNo"
                    size="small"
                    placeholder="请输入"
                    :disabled="!isParty || fieldDisabled(propertyFeatures['partyIdNo'])"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item
                  label="年龄"
                  prop="partyAge"
                  :rules="fieldRules('partyAge',propertyFeatures['partyAge'],'',isParty)"
                >
                  <el-input
                    ref="partyAge"
                    :disabled="!isParty || fieldDisabled(propertyFeatures['partyAge'])"
                    clearable
                    class="w-120"
                    type="number"
                    v-model="formData.partyAge"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isParty">
              <div class="col">
                <el-form-item
                  label="联系电话"
                  prop="partyTel"
                  :rules="fieldRules('partyTel',propertyFeatures['partyTel'],validatePhone,isParty)"
                >
                  <el-input
                    ref="partyTel"
                    clearable
                    class="w-120"
                    v-model="formData.partyTel"
                    size="small"
                    placeholder="请输入"
                    :disabled="!isParty || fieldDisabled(propertyFeatures['partyTel'])"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item
                  label="所在单位"
                  prop="partyUnitPosition"
                  :rules="fieldRules('partyUnitPosition',propertyFeatures['partyUnitPosition'],'',isParty)"
                >
                  <el-input
                    ref="partyUnitPosition"
                    :disabled="!isParty || fieldDisabled(propertyFeatures['partyUnitPosition'])"
                    clearable
                    class="w-120"
                    v-model="formData.partyUnitPosition"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isParty">
              <div class="col">
                <el-form-item
                  label="联系地址"
                  prop="partyAddress"
                  :rules="fieldRules('partyAddress',propertyFeatures['partyAddress'],'',isParty)"
                >
                  <el-input
                    ref="partyAddress"
                    clearable
                    class="w-120"
                    v-model="formData.partyAddress"
                    size="small"
                    placeholder="请输入"
                    :disabled="!isParty || fieldDisabled(propertyFeatures['partyAddress'])"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item
                  label="邮编"
                  prop="partyZipCode"
                  :rules="fieldRules('partyZipCode',propertyFeatures['partyZipCode'],'',isParty)"
                >
                  <el-input
                    ref="partyZipCode"
                    :disabled="!isParty || fieldDisabled(propertyFeatures['partyZipCode'])"
                    clearable
                    class="w-120"
                    v-model="formData.partyZipCode"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="row" v-if="!isParty">
              <div class="col">
                <el-form-item
                  label="单位"
                  prop="partyName"
                  :rules="fieldRules('partyName',propertyFeatures['partyName'],'',!isParty)"
                >
                  <el-input
                    ref="partyName"
                    clearable
                    class="w-120"
                    v-model="formData.partyName"
                    size="small"
                    placeholder="请输入"
                    :disabled="isParty || fieldDisabled(propertyFeatures['partyName'])"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item
                  label="地址"
                  prop="partyUnitAddress"
                  :rules="fieldRules('partyUnitAddress',propertyFeatures['partyUnitAddress'],'',!isParty)"
                >
                  <el-input
                    ref="partyUnitAddress"
                    clearable
                    class="w-120"
                    v-model="formData.partyUnitAddress"
                    size="small"
                    placeholder="请输入"
                    :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitAddress'])"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="!isParty">
              <div class="col">
                <el-form-item
                  label="法定代表人"
                  prop="partyManager"
                  :rules="fieldRules('partyManager',propertyFeatures['partyManager'],'',!isParty)"
                >
                  <el-input
                    ref="partyManager"
                    clearable
                    class="w-120"
                    v-model="formData.partyManager"
                    size="small"
                    placeholder="请输入"
                    :disabled="isParty || fieldDisabled(propertyFeatures['partyManager'])"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item
                  label="联系电话"
                  prop="partyUnitTel"
                  :rules="fieldRules('partyUnitTel',propertyFeatures['partyUnitTel'],validatePhone,!isParty)"
                >
                  <el-input
                    ref="partyUnitTel"
                    clearable
                    class="w-120"
                    v-model="formData.partyUnitTel"
                    size="small"
                    placeholder="请输入"
                    :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitTel'])"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="!isParty">
              <div class="col">
                <el-form-item
                  label="统一社会信用代码"
                  class="line-height13"
                  prop="socialCreditCode"
                  :rules="fieldRules('socialCreditCode',propertyFeatures['socialCreditCode'],'',!isParty)"
                >
                  <el-input
                    ref="socialCreditCode"
                    clearable
                    class="w-120"
                    v-model="formData.socialCreditCode"
                    size="small"
                    placeholder="请输入"
                    :disabled="isParty || fieldDisabled(propertyFeatures['socialCreditCode'])"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item
                  label="案件基本情况"
                  class="line-height13"
                  prop="caseSituation"
                  :rules="fieldRules('caseSituation',propertyFeatures['caseSituation'])"
                >
                  <el-input
                    type="textarea"
                    class="height106"
                    ref="caseSituation"
                    clearable
                    v-model="formData.caseSituation"
                    size="small"
                    placeholder="请输入"
                    :disabled="fieldDisabled(propertyFeatures['caseSituation'])"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <el-row :gutter="20">
              <el-col :span="16">
                <div class="second_title">查封、扣押场所、设施、财务清单如下：</div>
              </el-col>
            </el-row>
            <div class="table_form" @click="handleAdd">
              <el-table :data="formData.resList" stripe border style="width: 100%">
                <el-table-column prop="resNo" label="序号" align="center" width="50"></el-table-column>
                <el-table-column prop="resName" label="查封、扣押、场所、设施、财务名称" align="center"></el-table-column>
                <el-table-column prop="spec" label="规格" align="center" width="50"></el-table-column>
                <el-table-column prop="amount" label="数量" align="center" width="50"></el-table-column>
                <el-table-column prop="resNote" label="备注" align="center"></el-table-column>
              </el-table>
              <el-form-item prop="resLength" style="visibility:hidden">
                <el-input v-model="formData.resLength"></el-input>
              </el-form-item>
            </div>
            <el-row :gutter="20">
              <el-col :span="16">
                <div class="second_title">文书列表</div>
              </el-col>
            </el-row>
            <div class="table_form">
              <el-table :data="docTableDatas" stripe border style="width: 100%">
                <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
                <el-table-column prop="name" label="材料名称" align="center"></el-table-column>
                <el-table-column prop="status" label="状态" align="center">
                  <template slot-scope="scope">
                    <!-- <span v-if="scope.row.status == '1' || scope.row.status == '2'">完成</span> -->
                    <span v-if="scope.row.status == '1' || scope.row.status == '2'">
                      <template v-if="scope.row.docProcessStatus=='待审批'">待审批</template>
                      <template v-if="scope.row.docProcessStatus=='审批中'">审批中</template>
                      <template v-if="scope.row.docProcessStatus=='已驳回'">已驳回</template>
                      <template v-if="scope.row.docProcessStatus==''|| scope.row.docProcessStatus=='已完成'">已完成</template>
                    </span>
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
            </div>
          </div>
        </div>
        <!-- 悬浮按钮 -->
        <div class="float-btns btn-height63">
          <el-button type="primary" @click="continueHandle" v-if="!this.$route.params.isComplete && !IsLawEnforcementSupervision">
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

          <el-button type="primary" @click="submitCaseDoc(1)" v-if="!this.$route.params.isComplete && !IsLawEnforcementSupervision">
            <i class="iconfont law-save"></i>
            <br />保存
          </el-button>
          <el-button type="primary" @click="backBtn" v-if="this.$route.params.isComplete || IsLawEnforcementSupervision">
            <i class="iconfont law-back"></i>
            <br />返回
          </el-button>
        </div>
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
              <el-table-column prop="resNo" label="序号" align="center">
                 <template slot-scope="scope">
                  <span>{{++scope.$index}}</span>
                </template>
              </el-table-column>
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
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
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
    <checkDocAllFinish
      ref="checkDocAllFinishRef"
      @getDocListByCaseIdAndFormIdEmit="getDocListByCaseIdAndFormId"
      @submitCoerciveMeasuer="submitCoerciveMeasuer"
    ></checkDocAllFinish>
    <saveFormDia ref="saveFormDiaRef"></saveFormDia>
    <resetDocDia
      ref="resetDocDiaRef"
      @getDocListByCaseIdAndFormIdEmit="getDocListByCaseIdAndFormId"
    ></resetDocDia>
    <!--快速入口 -->
    <caseSlideMenu :activeIndex="''"></caseSlideMenu>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import checkDocAllFinish from "@/page/caseHandle/components/checkDocAllFinish";
import caseSlideMenu from "@/page/caseHandle/components/caseSlideMenu";
import {
  submitRelieveApi,
  getDocDataByCaseIdAndDocIdApi
} from "@/api/caseHandle";
import {
  validateIDNumber,
  validatePhone,
  validateZIP
} from "@/common/js/validator";
import resetDocDia from "@/page/caseHandle/components/resetDocDia";
import saveFormDia from "@/page/caseHandle/components/saveFormDia";
import {
  getDictListDetailByNameApi
} from "@/api/system";
export default {
  components: {
    checkDocAllFinish,
    caseSlideMenu,
    resetDocDia,
    saveFormDia
  },
  data() {
    //当事人类型为公司时验证
    var validateIfCom = (rule, value, callback) => {
      if (!this.isParty && !value) {
        return callback(new Error("请输入"));
      }
      callback();
    };
    return {
      validatePhone: validatePhone,
      validateIDNumber: validateIDNumber,
      formData: {
        caseNumber: "",
        caseCauseName:"",
        caseName: "",
        party: "",
        partyIdNo: "",
        partyAddress: "",
        partyTel: "",
        partyName: "",
        partyUnitAddress: "",
        partyUnitPosition: "",
        partyUnitTel: "",
        partyManager: "",
        socialCreditCode: "",
        partyZipCode:'',
        resList: [],
        resLength: 0,
        partySex:'',
        partyAddress:'',
        caseSituation: ''
      },
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseLinktypeId: this.BASIC_DATA_JX.adminCoerciveMeasure_JX_caseLinktypeId, //表单类型ID
        //表单数据
        formData: "",
        status: ""
      },
      saveOrSub: true,
      handleType: 0,
      docTableDatas: [],
      addVisible: false,
      addLoading: false,
      tableDatas: [],
      options: [
        // {
        //   value: "1",
        //   label: " "
        // },
        // {
        //   value: "2",
        //   label: "份"
        // },
        // {
        //   value: "3",
        //   label: "套"
        // },
        // {
        //   value: "4",
        //   label: "个"
        // },
        // {
        //   value: "5",
        //   label: "件"
        // }
      ],
      rules: {
        caseNumber: [
          { required: true, message: "案号不能为空", trigger: "blur" }
        ],
        caseCauseName: [
          { required: true, message: "案由不能为空", trigger: "blur" }
        ],
        party: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        partyIdNo: [
          { required: true, message: "身份证号不能为空", trigger: "blur" },
          { validator: validateIDNumber, trigger: "blur" }
        ],
        partyAddress: [
          { required: true, message: "联系地址不能为空", trigger: "blur" }
        ],
        partyUnitPosition: [
          { required: true, message: "所在单位不能为空", trigger: "blur" }
        ],
        partyTel: [
          { required: true, message: "联系电话不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        partyName: [
          { required: true, message: "单位名称不能为空", trigger: "blur" }
        ],
        partyManager: [
          { required: true, message: "法定代表人不能为空", trigger: "blur" }
        ],
        partyUnitAddress: [
          { required: true, message: "地址不能为空", trigger: "blur" }
        ],
        partyUnitTel: [
          { required: true, message: "联系电话不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        socialCreditCode: [
          { required: true, message: "统一社会信用代码", trigger: "blur" }
        ],
        caseSituation: [
          { required: true, message: "案件基本情况不能为空", trigger: "blur" }
        ],
      },
      isParty: true, //当事人类型为个人
      originalData: "",
      propertyFeatures: "" //字段属性配置
    };
  },
  computed: {
    ...mapGetters(["caseId",'IsLawEnforcementSupervision'])
  },
  mixins: [mixinGetCaseApiList],
  inject: ["reload"],
  methods: {
    //加载表单信息
    setFormData() {
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(
        this.caseLinkDataForm.caseBasicinfoId,
        this.caseLinkDataForm.caseLinktypeId,
        false
      );
    },
    //保存表单数据
    submitCaseDoc(handleType) {
      this.com_submitCaseForm(handleType, "caseDocForm", false);
    },
    //提交
    continueHandle() {
      console.log(this.docTableDatas)
      let caseData = {
        caseBasicinfoId: this.caseLinkDataForm.caseBasicinfoId,
        caseLinktypeId: this.caseLinkDataForm.caseLinktypeId
      };
      let canGotoNext = true; //是否进入下一环节  isRequired(0必填 1非必填)
      let approvalPass = true;  //文书审批都通过了
      for (let i = 0; i < this.docTableDatas.length; i++) {
        if (
          this.docTableDatas[i].isRequired === 0 && (Number(this.docTableDatas[i].status) == 0)
        ) {
          canGotoNext = false;
          break;
        }else if(this.docTableDatas[i].docProcessStatus == '审批中'){
            //有审批中的环节
            approvalPass = false;
            break;
        }
      }
      if (canGotoNext && approvalPass) {
        this.com_goToNextLinkTu(
          this.caseId,
          this.caseLinkDataForm.caseLinktypeId
        );
        // this.$router.push({name:'case_handle_flowChart'})  
      } else if(!canGotoNext){
        this.$refs.checkDocFinishRef.showModal(this.docTableDatas, caseData);
      }else if(!approvalPass){
        this.$message('有文书正在审批中！')
      }
    },
    //提交
    submitCoerciveMeasuer() {
      let params = {
        caseId: this.caseId,
        caseLinktypeId: this.BASIC_DATA_JX
          .adminCoerciveMeasure_JX_caseLinktypeId
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
    // 进入文书
    enterDoc(row) {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      console.log("row", row);
      this.$router.push({
        name: row.path,
        params: {
          id: row.id,
          //案件ID
          caseBasicinfoId: this.caseBasicinfoId,
          docId: row.docId,
          url: this.$route.name
        }
      });
    },
    //查看文书
    viewDoc(row) {
      this.com_viewDoc(row,this.caseLinkDataForm.caseLinktypeId);
    },
    //预览pdf
    viewDocPdf(row) {
      this.com_viewDocPdf(row,this.BASIC_DATA_JX.adminCoerciveMeasure_JX_caseLinktypeId)
    },
    //清空文书
    delDocDataByDocId(data) {
      console.log("清空文书", data);
      this.$refs.resetDocDiaRef.showModal(data);
    },
    //通过案件id和表单类型Id查询已绑定文书
    getDocListByCaseIdAndFormId() {
      let data = {
        linkTypeId: this.BASIC_DATA_JX.adminCoerciveMeasure_JX_caseLinktypeId //环节ID
      };
      this.com_getDocListByCaseIdAndFormId(data);
    },
    //返回到流程图
    backBtn() {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.go(-1);
    },
    handleAdd(resNo, row) {
      this.tableDatas = JSON.parse(JSON.stringify(this.formData.resList));
      this.addVisible = true;
      if (this.tableDatas.length == 0) {
        this.tableDatas.push({ resNo: 1, amount: 1 });
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
    },
    //确定添加
    addResSure(formName) {
      let canAdd = true;
      if (this.tableDatas.length > 0){
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
        if(canAdd){
          this.formData.resList = this.tableDatas;
          this.addVisible = false;
        }
      }
        
      
    },
    //添加一行数据
    addTableData() {
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
          resNote: ""
        });
      }
    },
    //获取规格单位
    getUnit(){
      getDictListDetailByNameApi('扣押物品规格').then(res=>{
        console.log('规格',res);
        this.options = res.data;
        //添加一个空的数据
        this.options.unshift({name:' ',note:' ',id:'123'})
      }).catch(err=>{throw new Error(err)})
    }
    
  },
  created() {
    this.setFormData();
    //通过案件id和表单类型Id查询已绑定文书
    this.getDocListByCaseIdAndFormId();
    this.getUnit()
  }
};
</script>

<style lang="scss" src="@/assets/css/documentForm.scss" scoped></style>
