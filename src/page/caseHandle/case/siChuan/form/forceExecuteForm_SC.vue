<template>
  <div class="box">
    <el-form ref="caseLinkDataForm">
      <el-input ref="id" type="hidden"></el-input>
    </el-form>
    <el-form
      ref="forceExecuteForm"
      :model="formData"
      :rules="rules"
      label-width="105px"
      :disabled="canGoNextLink"
    >
      <div class="content_box">
        <div class="content">
          <div class="content_title">强制执行</div>
          <div class="border_blue"></div>

          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item
                  prop="caseNumber"
                  label="案号"
                  :rules="
                    fieldRules('caseNumber', propertyFeatures['caseNumber'])
                  "
                >
                  <el-input
                    ref="caseNumber"
                    :disabled="fieldDisabled(propertyFeatures['caseNumber'])"
                    clearable
                    class="w-120"
                    v-model="formData.caseNumber"
                    size="small"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item
                  prop="caseName"
                  label="案由"
                  :rules="fieldRules('caseName', propertyFeatures['caseName'])"
                >
                  <el-input
                    :disabled="fieldDisabled(propertyFeatures['caseName'])"
                    clearable
                    class="w-120"
                    v-model="formData.caseName"
                    size="small"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item
                  prop="punishDecision"
                  label="处罚决定"
                  :rules="
                    fieldRules(
                      'punishDecision',
                      propertyFeatures['punishDecision']
                    )
                  "
                >
                  <el-input
                    :disabled="
                      fieldDisabled(propertyFeatures['punishDecision'])
                    "
                    type="textarea"
                    ref="punishDecision"
                    clearable
                    class="w-120"
                    v-model="formData.punishDecision"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <el-form-item
                  prop="punishTerm"
                  label="处罚期限"
                  :rules="
                    fieldRules('punishTerm', propertyFeatures['punishTerm'])
                  "
                >
                  <el-date-picker
                    :disabled="fieldDisabled(propertyFeatures['punishTerm'])"
                    ref="punishTerm"
                    format="yyyy-MM-dd"
                    clearable
                    class="w-120"
                    v-model="formData.punishTerm"
                    size="small"
                    placeholder="请输入"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <el-form-item label="强制类型">
                  <el-select
                    v-model="formData.forceType"
                    clearable
                    @change="updateMethod"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item
                  prop="tempPunishAmount"
                  label="处罚金额"
                  :rules="
                    fieldRules(
                      'tempPunishAmount',
                      propertyFeatures['tempPunishAmount']
                    )
                  "
                >
                  <el-input
                    :disabled="
                      fieldDisabled(propertyFeatures['tempPunishAmount'])
                    "
                    ref="tempPunishAmount"
                    clearable
                    class="w-120"
                    v-model.number="formData.tempPunishAmount"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <el-form-item
                  prop="paidAmount"
                  label="已缴金额"
                  :rules="
                    fieldRules('paidAmount', propertyFeatures['paidAmount'])
                  "
                >
                  <el-input
                    clearable
                    class="w-120"
                    v-model.number="formData.paidAmount"
                    size="small"
                    placeholder="-"
                    :disabled="fieldDisabled(propertyFeatures['paidAmount'])"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item
                  prop="waitAmount"
                  label="待缴纳金额"
                  :rules="
                    fieldRules('waitAmount', propertyFeatures['waitAmount'])
                  "
                >
                  <el-input
                    :disabled="fieldDisabled(propertyFeatures['waitAmount'])"
                    ref="waitAmount"
                    clearable
                    class="w-120"
                    v-model.number="formData.waitAmount"
                    size="small"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="执行情况">
                  <el-select v-model="formData.executeState" clearable>
                    <el-option
                      v-for="item in optionState"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="chooseXZQZ">
                  <el-checkbox
                    v-model="formData.chooseXZQZ"
                    @change="changeChooseXZQZ"
                  ></el-checkbox>
                  中止（终结、恢复）行政强制执行
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="chooseALX">
                  <el-checkbox
                    v-model="formData.chooseALX"
                    @change="changeChooseXZQZ"
                  ></el-checkbox>
                  代履行
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="chooseFYQZ">
                  <el-checkbox
                    v-model="formData.chooseFYQZ"
                    @change="changeChooseXZQZ"
                  ></el-checkbox>
                  申请法院强制执行
                </el-form-item>
              </div>
            </div>
            <div class="border_blue"></div>
          </div>
        </div>
      </div>
      <div class="content_box">
        <div class="content">
          <el-row :gutter="20">
            <el-col :span="16">
              <div class="second_title">执法文书</div>
            </el-col>
          </el-row>
          <div class="table_form">
            <el-table
              :data="docTableDatas"
              stripe
              border
              style="width: 100%"
              :row-class-name="getRowClass"
            >
              <el-table-column type="expand" expand-change>
                <template>
                  <ul class="moreDocList">
                    <li v-for="(item, index) in enforceDocList" :key="index">
                      <div>{{ item.note }}</div>
                      <div>
                        <span v-if="item.status == '1' || item.status == '2'"
                          >已完成</span
                        >
                        <span v-if="item.status == '0'">未完成</span>
                      </div>
                      <div>
                        <!-- 已完成 -->
                        <span
                          v-if="item.status == '1' || item.status == '2'"
                          class="tableHandelcase"
                          @click="viewDocPdf(item)"
                          >查看</span
                        >

                        <span v-if="item.status == '0'" class="tableHandelcase">
                          <!-- 未完成 -->
                          <span @click="viewDoc(item)">编辑</span>
                          <span @click="delDocDataByDocId(item)">清空</span>
                        </span>
                        <!-- 无状态 -->
                        <span
                          v-if="item.status === ''"
                          class="tableHandelcase"
                          @click="addMoreDoc(item)"
                          >添加</span
                        >
                      </div>
                    </li>
                  </ul>
                </template>
              </el-table-column>

              <el-table-column
                type="index"
                label="序号"
                align="center"
              ></el-table-column>
              <el-table-column prop="name" label="材料名称" align="center">
                <template slot-scope="scope">
                  <span style="color: red" v-if="scope.row.isRequired == 0"
                    >*</span
                  >
                  {{ scope.row.name }}
                  <span
                    v-if="
                      scope.row.docId == BASIC_DATA_SYS.enforceDoc_caseDocTypeId
                    "
                    >（{{ finishEnforceDocListCount }}/{{
                      allEnforceDocListCount
                    }}）</span
                  >
                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                  <!-- <span
                    v-if="scope.row.status == '1' || scope.row.status == '2'"
                    >已完成</span
                  >
                  <span v-if="scope.row.status == '0'">未完成</span>
                  <span v-if="scope.row.status == ''"></span> -->
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
                  <span class="tableHandelcase" v-if="scope.row.openRow">
                    <!-- <i class="iconfont law-add" @click="viewDoc(scope.row)"></i> -->
                    <span @click="addMoreDoc(scope.row)">添加</span>
                  </span>
                  <span v-if="!scope.row.openRow">
                    <!-- 已完成 -->
                    <span
                      v-if="scope.row.status == '1' || scope.row.status == '2'"
                      class="tableHandelcase"
                      @click="viewDocPdf(scope.row)"
                      >查看</span
                    >
                    <!-- 未完成 暂存 -->
                    <span
                      v-if="scope.row.status == '0'"
                      class="tableHandelcase"
                    >
                      <span @click="viewDoc(scope.row)">编辑</span>
                      <span @click="delDocDataByDocId(scope.row)">清空</span>
                    </span>
                    <!-- 无状态 -->
                    <span
                      v-if="scope.row.status === ''"
                      class="tableHandelcase"
                      @click="viewDoc(scope.row)"
                      >添加</span
                    >
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="content_box">
        <div class="content">
          <el-row :gutter="20">
            <el-col :span="16">
              <div class="second_title">相关材料上传</div>
            </el-col>
            <el-col :span="8">
              <div class="second_title_btns">
                <el-button type="primary" size="small" @click="showUploadEvi"
                  >上传附件</el-button
                >
              </div>
            </el-col>
          </el-row>
          <div class="table_form">
            <el-table
              :data="evidenceTableDatas"
              stripe
              border
              style="width: 100%"
              height="100%"
              @cell-click="handleEviNameChange"
            >
              <el-table-column type="index" label="序号" align="center">
              </el-table-column>
              <el-table-column prop="evName" label="材料名称" align="center">
              </el-table-column>
              <el-table-column prop="createTime" label="时间" align="center">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <i
                    type="primary"
                    class="el-icon-view cell-icon"
                    @click="showEvidence(scope)"
                  ></i>
                </template>
              </el-table-column>
            </el-table>
            <div class="paginationBox">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                background
                :page-sizes="[10, 20, 30, 40]"
                layout="prev, pager, next,sizes,jumper"
                :total="total"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
      
    </el-form>
    <!-- 悬浮按钮 -->
      <div class="float-btns">
        <el-button
          type="primary"
          @click="continueHandle"
          :disabled="!canGoNextLink"
          v-if="!this.$route.params.isComplete && !IsLawEnforcementSupervision"
        >
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
            ></path>
          </svg>
          <br />
          下一<br />环节
        </el-button>

        <el-button
          type="primary"
          @click="submitCaseDoc(1)"
          :disabled="canGoNextLink"
          v-if="!this.$route.params.isComplete && !IsLawEnforcementSupervision"
        >
          <i class="iconfont law-save"></i>
          <br />
          保存
        </el-button>
        <el-button
          type="primary"
          @click="backBtn"
          v-if="this.$route.params.isComplete || IsLawEnforcementSupervision"
        >
          <i class="iconfont law-back"></i>
          <br />返回
        </el-button>
      </div>
    <checkDocFinish ref="checkDocFinishRef"></checkDocFinish>
    <chooseHandleTypeDia
      ref="chooseHandleTypeDiaRef"
      @getNewData="goAddPdf"
    ></chooseHandleTypeDia>
    <resetDocDia
      ref="resetDocDiaRef"
      @getDocListByCaseIdAndFormIdEmit="getDocListByCaseIdAndFormId"
    ></resetDocDia>
    <editEvidenceName ref="editEvidenceNameRef" @findEvidenceEmit="findEvidence"></editEvidenceName>
    <showEvidenDia ref="showEvidenDiaRef"></showEvidenDia>
    <partyRightsEvidence ref="partyRightsEvidenceRef" @findEvidenceEmit="findEvidence"></partyRightsEvidence>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
// import checkDocFinish from "../../components/checkDocFinish";
import checkDocFinish from "@/page/caseHandle/components/checkDocFinish2.vue";
import chooseHandleTypeDia from "@/page/caseHandle/components/chooseHandleTypeDia";
import resetDocDia from "@/page/caseHandle/components/resetDocDia";
import iLocalStroage from "@/common/js/localStroage";
import { queryFlowBycaseIdApi,findByCondition } from "@/api/caseHandle";
import editEvidenceName from '@/page/caseHandle/components/editEvidenceName'
import showEvidenDia from '@/page/caseHandle/components/showEvidenDia'
import partyRightsEvidence from '@/page/caseHandle/components/partyRightsEvidence'
export default {
  components: {
    checkDocFinish,
    chooseHandleTypeDia,
    resetDocDia,
    editEvidenceName,
    showEvidenDia,
    partyRightsEvidence
  },
  data() {
    var validatePaid = (rule, value, callback) => {
      // value = value.replace("\"","");
      //去除字符串两边的引号
      // value = value.substring(1, value.length-1);
      value = parseInt(value);
      if (value && typeof value != "number") {
        callback(new Error("必须为数字!"));
      }
      if (
        value &&
        (value < 0 || value > Number(this.formData.tempPunishAmount))
      ) {
        callback(new Error("不得小于0或大于处罚金额!"));
      } else {
        callback();
      }
    };
    return {
      options: [
        {
          value: "强制执行",
          label: "强制执行",
        },
        {
          value: "代履行",
          label: "代履行",
        },
      ],
      optionState: [
        {
          value: "未完成",
          label: "未完成",
        },
        {
          value: "已完成",
          label: "已完成",
        },
      ],
      formData: {
        caseNumber: "",
        caseName: "",
        punishDecision: "",
        punishTerm: "",
        forceType: "",
        tempPunishAmount: "",
        paidAmount: "",
        waitAmount: "",
        executeState: "",
        chooseXZQZ: false,
        chooseALX: false,
        chooseFYQZ: false,
      },
      //提交方式
      handleType: 0, //0  暂存     1 提交
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件id
        caseLinktypeId: this.BASIC_DATA_SC.forceExecute_SC_caseLinktypeId, //表单类型IDer
        //表单数据
        formData: "",
        status: "",
      },
      originalData: "",
      docTableDatas: [],
      rules: {
        caseNumber: [
          { required: true, message: "案号不能为空", trigger: "blur" },
        ],
        caseName: [
          { required: true, message: "案由不能为空", trigger: "blur" },
        ],
        // punishType: [
        //   { required: true, message: "处罚类型不能为空", trigger: "blur" }
        // ],
        punishTerm: [
          { required: true, message: "处罚期限不能为空", trigger: "blur" },
        ],
        punishDecision: [
          { required: true, message: "处罚决定不能为空", trigger: "blur" },
        ],
        tempPunishAmount: [
          { required: true, message: "处罚金额不能为空", trigger: "blur" },
        ],
        paidAmount: [{ validator: validatePaid, trigger: "blur" }],
        waitAmount: [{ validator: validatePaid, trigger: "blur" }],
      },
      isOnlinePay: false, //是否为电子缴纳
      needDealData: true,
      docTableDatasCopy: [],

      propertyFeatures: "",
      enforceDocList: [],
      finishEnforceDocListCount: 0,
      allEnforceDocListCount: 0,
      unfinshDocArr: [],
      evidenceTableDatas: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总数
    };
  },
  computed: {
    ...mapGetters(["caseId", "IsLawEnforcementSupervision"]),
  },
  mixins: [mixinGetCaseApiList],
  methods: {
    updateMethod() {
      // if(this.formData.forceType=='强制执行'){
      //   console.log('444');
      //   if(this.docTableDatas[i].name=='行政强制执行决定书【2016】'){
      //     this.docTableDatas[i].isRequired = '0';
      //   }
      // }else{
      //   console.log('333');
      //   if(this.docTableDatas[i].name=='代履行决定书【2016】'){
      //     this.docTableDatas[i].isRequired = '0';
      //   }
      // }
    },

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
      //        console.log(this.formData)
      this.com_submitCaseForm(handleType, "forceExecuteForm", false);
    },

    //下一环节
    continueHandle() { 
      console.log(this.docTableDatas);
      let caseData = {
        caseBasicinfoId: this.caseLinkDataForm.caseBasicinfoId,
        caseLinktypeId: this.caseLinkDataForm.caseLinktypeId,
      };
      let canGotoNext = true; //是否进入下一环节  isRequired(0必填 1非必填)
      let approvalPass = true;  //文书审批都通过了
    
      // for (let i = 0; i < this.docTableDatas.length; i++) {
      //   if (this.docTableDatas[i].openRow) {
      //     //可展开的多文书
      //     let currentMoreDoc = this.docTableDatasCopy.filter(
      //       (item) => item.docId == this.docTableDatas[i].docId
      //     );
      //     console.log("morcurrentMoreDoceDoc", currentMoreDoc);
      //     if (this.docTableDatas[i].isRequired === 0) {
      //       for (let item of currentMoreDoc) {
      //         if (Number(item.status) == 0) {
      //           canGotoNext = false;
      //           break;
      //         }
      //       }
      //     }
      //   } else {
      //     if (
      //       this.docTableDatas[i].isRequired === 0 &&
      //       Number(this.docTableDatas[i].status) == 0
      //     ) {
      //       canGotoNext = false;
      //       break;
      //     }
      //   }
      // }
      // if (canGotoNext) {
      //   console.log("下一环节");
      //   this.com_goToNextLinkTu(
      //     this.caseId,
      //     this.caseLinkDataForm.caseLinktypeId
      //   );
      // } else if (!canGotoNext) {
      //   this.getUnfinishDoc();
      //   this.$refs.checkDocFinishRef.showModal(this.unfinshDocArr);
      // }
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
      } else if(!canGotoNext){
        this.$refs.checkDocFinishRef.showModal(this.docTableDatas, caseData);
      }else if(!approvalPass){
        this.$message('有文书正在审批中！')
      }
    },

    // 进入文书
    enterDoc(row) {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      //        console.log("row", row);
      this.$router.push({
        name: row.path,
        params: {
          id: row.id,
          //案件ID
          caseBasicinfoId: this.caseBasicinfoId,
          docId: row.docId,
          url: this.$route.name,
        },
      });
    },

    //查看文书
    viewDoc(row) {
      // row.url = this.$route.name;
      // row.caseBasicinfoId = this.caseBasicinfoId;
      // this.$store.commit("setCurrentFileData", row); //保存文书信息
      // iLocalStroage.removeItem("currentDocDataId");
      // this.com_viewDoc(row, this.caseLinkDataForm.caseLinktypeId);
      this.com_viewDoc(row,this.caseLinkDataForm.caseLinktypeId);
    },
    addMoreDoc(row) {
      console.log("添加", row);
      iLocalStroage.removeItem("currentDocDataId");
      this.$refs.chooseHandleTypeDiaRef.showModal(
        row,
        this.caseLinkDataForm.caseLinktypeId,
        this.isSaveLink
      );
    },
    //清空文书
    delDocDataByDocId(data) {
      //        console.log("清空文书",data);
      this.$refs.resetDocDiaRef.showModal(data);
    },
    //通过案件id和表单类型Id查询已绑定文书
    getDocListByCaseIdAndFormId() {
      let data = {
        linkTypeId: this.caseLinkDataForm.caseLinktypeId, //环节ID
      };
      this.com_getDocListByCaseIdAndFormId(data);
    },

    //预览pdf
    viewDocPdf(row) {
      this.com_viewDocPdf(row,this.BASIC_DATA_SC.adminCoerciveMeasure_SC_caseLinktypeId)
      // row.url = this.$route.name;
      // row.caseBasicinfoId = this.caseBasicinfoId;
      // this.$store.commit("setCurrentFileData", row); //保存文书信息
      // let routerData = {
      //   hasApprovalBtn: false,
      //   docId: row.docId,
      //   approvalOver: false,
      //   hasBack: true,
      //   docDataId: row.docDataId,
      //   status: row.status, //status状态 0 暂存 1保存未提交  2 保存并提交
      // };
      // console.log("routerData,routerData", routerData);
      // this.$store.dispatch("deleteTabs", this.$route.name);
      // this.$router.push({ name: "case_handle_myPDF", params: routerData });
    },

    getDataAfter() {
      this.formData.forceType = this.formData.forceType
        ? this.formData.forceType
        : "强制执行";
      this.formData.executeState = this.formData.executeState
        ? this.formData.executeState
        : "未完成";
        //通过案件id和表单类型Id查询已绑定文书
      this.getDocListByCaseIdAndFormId();
    },

    //返回到流程图
    backBtn() {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.go(-1);
    },

    // 添加文书
    goAddPdf() {
      //提交pdf 显示pdf页
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.approvalOver = true;
      this.com_getFormDataByCaseIdAndFormId(
        this.caseLinkDataForm.caseBasicinfoId,
        this.caseLinkDataForm.caseLinktypeId,
        true
      );
      // this.setMoreDocTableTitle()
    },

    getRowClass: function (row, index) {
      if (row.row.openRow) {
        return "";
      } else {
        return "myhide-expand";
      }
    },

    setMoreDocTableTitle() {
      console.log("setMoreDocTableTitle");
      this.docTableDatas = [];
      this.enforceDocList = [];
      this.finishEnforceDocListCount = 0;
      //查找是否为必填
      //中止（终结、恢复）行政强制执行通知书
      let enforceDoc_Require = this.docTableDatasCopy.find(
        (item) => item.docId == this.BASIC_DATA_SYS.enforceDoc_caseDocTypeId
      ).isRequired;

      if (this.formData.chooseXZQZ) {
        let index1  = this.docTableDatas.findIndex(item=>item.path == "case_handle_enforceDoc");
        if(index1 ==-1){
            this.docTableDatas.push({
                name: "中止（终结、恢复）行政强制执行通知书",
                status: "询问",
                openRow: true,
                path: "case_handle_enforceDoc",
                docId: this.BASIC_DATA_SYS.enforceDoc_caseDocTypeId,
                note: "",
                isRequired: enforceDoc_Require,
            });
            this.docTableDatasCopy.forEach((item) => {
                if (item.docId == this.BASIC_DATA_SYS.enforceDoc_caseDocTypeId) {
                if (item.note != "") {
                    this.enforceDocList.push(item);
                }
                } else {
                this.docTableDatas.push(item);
                }
            });

            this.enforceDocList.forEach((element) => {
                if (element.status == "1" || element.status == "2") {
                this.finishEnforceDocListCount += 1;
                }
            });
            this.allEnforceDocListCount = this.enforceDocList.length;
        }
      }else{
        let index1  = this.docTableDatas.findIndex(item=>item.path == "case_handle_enforceDoc");
        if(index1 !=-1) this.docTableDatas.splice(index1,1)
      }

      if (this.formData.chooseALX) {
        let index1  = this.docTableDatas.findIndex(item=>item.path == "case_handle_enforceInsteadDoc");
         if(index1 ==-1)  this.docTableDatas.push(this.docTableDatasCopy.find(item=> item.path == "case_handle_enforceInsteadDoc"))
      }else{
        let index1  = this.docTableDatas.findIndex(item=>item.path == "case_handle_enforceInsteadDoc");
        if(index1 !=-1) this.docTableDatas.splice(index1,1)
      }

       if (this.formData.chooseFYQZ) {
        let index1  = this.docTableDatas.findIndex(item=>item.path == "case_handle_courtEnforceApplicationDoc_SC");
         if(index1 ==-1)  this.docTableDatas.push(this.docTableDatasCopy.find(item=> item.path == "case_handle_courtEnforceApplicationDoc_SC"))
      }else{
        let index1  = this.docTableDatas.findIndex(item=>item.path == "case_handle_courtEnforceApplicationDoc_SC");
        if(index1 !=-1) this.docTableDatas.splice(index1,1)
      }
    
        let index1  = this.docTableDatas.findIndex(item=>item.path == "case_handle_enforceDecideApprovalForm_SC");
         if(index1 ==-1)  this.docTableDatas.push(this.docTableDatasCopy.find(item=> item.path == "case_handle_enforceDecideApprovalForm_SC"))
        let index2  = this.docTableDatas.findIndex(item=>item.path == "case_handle_enforceDecideDoc");
         if(index2 ==-1)  this.docTableDatas.push(this.docTableDatasCopy.find(item=> item.path == "case_handle_enforceDecideDoc"))


      console.log("this.docTableDatas", this.docTableDatas);
      console.log("this.enforceDocList", this.enforceDocList);
    },
    //获取本环节必填但是未完成的文书
    // getUnfinishDoc() {
    //   this.unfinshDocArr = [];
    //   //判断是否为多文书
    //   for (let item of this.docTableDatas) {
    //     if (item.openRow) {
    //       if (item.isRequired === 0) {
    //         if (item.docId == this.BASIC_DATA_SYS.enforceDoc_caseDocTypeId) {
    //           if (this.enforceDocList.length > 0) {
    //             for (let stageDoc of this.enforceDocList) {
    //               if (Number(stageDoc.status) == 0) {
    //                 this.unfinshDocArr.push(item);
    //                 break;
    //               }
    //             }
    //           } else {
    //             this.unfinshDocArr.push(item);
    //           }
    //         }
    //       }
    //     } else {
    //       if (item.isRequired === 0 && Number(item.status) == 0)
    //         this.unfinshDocArr.push(item);
    //     }
    //     console.log("this.unfinshDocArr", this.unfinshDocArr);
    //   }
    // },
    async initData() {
      //查询是哪个流程
      // let currentFlow = await queryFlowBycaseIdApi(this.caseId);
      // console.log('currentFlow',currentFlow);
      // if(currentFlow.data.flowUrl == 'commonGraphData_JX'){
      //   this.caseLinkDataForm.caseLinktypeId = this.BASIC_DATA_JX.forceExecute_JX_caseLinktypeId
      // }else{
      //   this.caseLinkDataForm.caseLinktypeId = this.BASIC_DATA_SYS.forceExecute_caseLinktypeId
      // }
      //获取表单数据
      this.setFormData();
      
    },
    changeChooseXZQZ() {
      this.setMoreDocTableTitle();
    },
    //查询证据材料列表
      findEvidence() {
        let data = {
          objectId: this.BASIC_DATA_SC.forceExecute_SC_caseLinktypeId,
          caseId: this.caseId,
        };
        let _this = this
        findByCondition(data).then(
          res => {
//              console.log('证据',res);
            _this.evidenceTableDatas = res.data.records;
            _this.currentPage = res.data.current;
            _this.total = res.data.total;
          },
          error => {
            console.log(error);
          }
        );
      },
      //更改证据每页显示的条数
      handleSizeChange(val) {
//      console.log("每页显示的条数", val);
        this.pageSize = val;
        this.findEvidence();
      },
      //更换证据页码
      handleCurrentChange(val) {
//      console.log("当前页", val);
        this.currentPage = val;
        this.findEvidence();
      },
      //修改证据名称
      handleEviNameChange(row, column) {
//      console.log(row,column);
        if (column.property == "evName") {
          this.$refs.editEvidenceNameRef.showModal(row);
        }
      },
      showEvidence(data) {
        this.$refs.showEvidenDiaRef.showModal(data.row);
      },
      //上传证据弹窗
      showUploadEvi() {
        this.$refs.partyRightsEvidenceRef.showModal(this.BASIC_DATA_SC.forceExecute_SC_caseLinktypeId);
      },
  },

  mounted() {
    // this.getCaseBasicInfo();
  },
  created() {
    this.initData();
    // 查询证据材料列表
      this.findEvidence();
  },
  watch: {
    //代缴金额为0时,执行情况为已完成
    "formData.paidAmount"(val) {
      console.log(val);
      this.formData.waitAmount =
        Number(this.formData.tempPunishAmount) -
        Number(this.formData.paidAmount);
    },
  },
};
</script>

<style lang="scss" src="@/assets/css/documentForm.scss" scoped></style>
