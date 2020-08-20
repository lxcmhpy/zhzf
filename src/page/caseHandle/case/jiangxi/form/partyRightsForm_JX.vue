<template>
  <div class="box">
    <el-form ref="caseLinkDataForm">
      <el-input ref="id" type="hidden"></el-input>
    </el-form>
    <el-form ref="docForm" :rules="rules" :model="formData" label-width="120px">
      <div class="content_box">
        <div class="content">
          <div class="content_title">当事人权利</div>
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
                  prop="caseCauseName"
                  label="案由"
                  :rules="fieldRules('caseCauseName',propertyFeatures['caseCauseName'])"
                >
                  <el-input
                    :disabled="fieldDisabled(propertyFeatures['caseCauseName'])"
                    clearable
                    class="w-120"
                    v-model="formData.caseCauseName"
                    size="small"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="当事人权利">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="是否进行听证" prop = "isHearing" label-width="131px;">
                        <el-checkbox-group
                          v-model="formData.isHearing"
                          @change="changeHearing"
                          :max="1"
                        >
                          <el-checkbox label="是"></el-checkbox>
                          <el-checkbox label="否"></el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="是否重大案件" prop="isImportant" label-width="131px;">
                        <el-checkbox-group
                          v-model="formData.isImportant"
                          @change="changeImportant"
                          :max="1"
                        >
                          <el-checkbox label="是"></el-checkbox>
                          <el-checkbox label="否"></el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isHearingFlag">
              <div class="col">
                <el-form-item
                  prop="hearingOrgan"
                  label="主持听证机关"
                >
                  <el-input
                    v-model="formData.hearingOrgan"
                    :maxLength="maxLength"
                    :disabled="fieldDisabled(propertyFeatures['hearingOrgan'])"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isHearingFlag">
              <div class="col">
                <el-form-item
                  prop="hearingPlace"
                  label="听证地点"
                >
                  <el-input
                    v-model="formData.hearingPlace"
                    :maxLength="maxLength"
                    :disabled="fieldDisabled(propertyFeatures['hearingPlace'])"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isHearingFlag">
              <div class="col">
                <div style="display:inline-block;width: 48%">
                  <el-form-item
                    prop="hearingStartTime"
                    label="听证时间"
                  >
                    <el-date-picker
                      v-model="formData.hearingStartTime"
                      type="datetime"
                      format="yyyy年MM月dd日HH时mm分"
                      value-format="yyyy-MM-dd HH:mm"
                      placeholder="    年  月  日  时  分"
                      :disabled="fieldDisabled(propertyFeatures['hearingStartTime'])"
                    ></el-date-picker>
                  </el-form-item>
                </div>
                <div style="display:inline-block;width: 5%;padding-top: 12px;text-align: center;">至</div>
                <div style="display:inline-block;width: 40%">
                  <el-form-item
                    prop="hearingEndTime"
                    label-width="0px"
                  >
                    <el-date-picker
                      v-model="formData.hearingEndTime"
                      type="datetime"
                      format="yyyy年MM月dd日HH时mm分"
                      value-format="yyyy-MM-dd HH:mm"
                      placeholder="    年  月  日  时  分"
                      :disabled="fieldDisabled(propertyFeatures['hearingEndTime'])"
                    ></el-date-picker>
                  </el-form-item>
                </div>
              </div>
            </div>
            <div class="row" v-if="isHearingFlag">
              <div class="col">
                <el-form-item label="听证主持人" prop="persidingHearer">
                  <el-input
                    ref="persidingHearer"
                    clearable
                    class="w-120"
                    v-model="formData.persidingHearer"
                    size="small"
                    placeholder="请输入"
                    :disabled="isParty || fieldDisabled(propertyFeatures['persidingHearer'])"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item
                  label="职务"
                  prop="presidingHearerPosition"
                >
                  <el-input
                    ref="presidingHearerPosition"
                    clearable
                    class="w-120"
                    v-model="formData.presidingHearerPosition"
                    size="small"
                    placeholder="请输入"
                    :disabled="isParty || fieldDisabled(propertyFeatures['presidingHearerPosition'])"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isHearingFlag">
              <div class="col">
                <el-form-item
                  label="听证员"
                  prop="hearingOfficer"
                >
                  <el-input
                    ref="hearingOfficer"
                    clearable
                    class="w-120"
                    v-model="formData.hearingOfficer"
                    size="small"
                    placeholder="请输入"
                    :disabled="isParty || fieldDisabled(propertyFeatures['hearingOfficer'])"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item
                  label="职务"
                  prop="hearingOfficerPosition"
                >
                  <el-input
                    ref="hearingOfficerPosition"
                    clearable
                    class="w-120"
                    v-model="formData.hearingOfficerPosition"
                    size="small"
                    placeholder="请输入"
                    :disabled="isParty || fieldDisabled(propertyFeatures['hearingOfficerPosition'])"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isHearingFlag">
              <div class="col">
                <el-form-item
                  label="记录员"
                  prop="hearingClerks"
                >
                  <el-input
                    ref="hearingClerks"
                    clearable
                    class="w-120"
                    v-model="formData.hearingClerks"
                    size="small"
                    placeholder="请输入"
                    :disabled="isParty || fieldDisabled(propertyFeatures['hearingClerks'])"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item
                  label="职务"
                  prop="hearingClerksPosition"
                >
                  <el-input
                    ref="hearingClerksPosition"
                    clearable
                    class="w-120"
                    v-model="formData.hearingClerksPosition"
                    size="small"
                    placeholder="请输入"
                    :disabled="isParty || fieldDisabled(propertyFeatures['hearingClerksPosition'])"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="border_blue"></div>
        </div>
      </div>
      <div class="content_box">
        <div class="content">
          <el-row :gutter="20">
            <el-col :span="16">
              <div class="second_title">文书列表</div>
            </el-col>
          </el-row>
          <div class="table_form">
            <el-table :data="docTableDatas" stripe border style="width: 100%">
              <el-table-column type="index" label="序号" align="center" width="100px"></el-table-column>
              <el-table-column prop="name" label="材料名称" align="center">
                <template slot-scope="scope">
                  <span v-show="scope.row.isRequired ===0">
                    <span style="color:red">*</span>
                    {{scope.row.name}}
                  </span>
                  <span v-show="scope.row.isRequired !==0">{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == '1' || scope.row.status == '2'">已完成</span>
                  <span v-if="scope.row.status == '0'">未完成</span>
                  <span v-if="scope.row.status === ''">-</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <span
                    v-if="scope.row.status == '1' || scope.row.status == '2'"
                    class="tableHandelcase"
                  >
                    <!-- 已完成 -->
                    <span @click="viewDocPdf(scope.row)">查看</span>
                  </span>
                  <span v-if="scope.row.status == '0'" class="tableHandelcase">
                    <!-- 未完成 -->
                    <span @click="viewDoc(scope.row)">编辑</span>
                    <span @click="delDocDataByDocId(scope.row)">清空</span>
                  </span>
                  <span v-if="scope.row.status === ''" class="tableHandelcase">
                    <!-- 无状态 -->
                    <span @click="viewDoc(scope.row)">添加</span>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="content_box">
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
              />
            </svg>
            <br />下一
            <br />环节
          </el-button>
          <el-button
            type="primary"
            @click="submitCaseDoc(1)"
            :disabled="canGoNextLink"
            v-if="!this.$route.params.isComplete && !IsLawEnforcementSupervision"
          >
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
    <checkDocFinish ref="checkDocFinishRef"></checkDocFinish>
    <resetDocDia
      ref="resetDocDiaRef"
      @getDocListByCaseIdAndFormIdEmit="getDocListByCaseIdAndFormId"
    ></resetDocDia>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import checkDocFinish from "@/page/caseHandle/components/checkDocFinish";
import resetDocDia from "@/page/caseHandle/components/resetDocDia";
import { findByCondition, deleteDocByIdApi } from "@/api/caseHandle";
import { BASIC_DATA_JX } from "@/common/js/BASIC_DATA_JX.js";
export default {
  components: {
    checkDocFinish,
    resetDocDia
  },
  data() {
    var validateIsHearing = (rule, value, callback) => {
      if (this.formData.isHearing[0] == "是" && !value) {
        return callback(new Error);
      }
      callback();
    };
    return {
      formData: {
        caseNumber: "",
        caseCauseName: "",
        hearingOrgan: "",
        hearingPlace: "",
        hearingStartTime: "",
        hearingEndTime: "",
        isImportant: [],
        isHearing: [],
        persidingHearer: "",
        presidingHearerPosition: "",
        hearingOfficer: "",
        hearingOfficerPosition: "",
        hearingClerks: "",
        hearingClerksPosition: ""
      },
      //提交方式
      handleType: 0, //0  暂存     1 提交
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件id
        caseLinktypeId: this.BASIC_DATA_JX.partyRights_JX_caseLinktypeId, //表单类型IDer
        //表单数据
        formData: "",
        status: ""
      },
      docTableDatas: [],
      docTableDatasCopy: [], //最初的文书列表
      maxLength: 50,
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总数
      needDealData: true,
      propertyFeatures: "", //字段属性配置
      isHearingFlag: false,
      rules: {
        caseNumber: [
          { required: true, message: "案号不能为空", trigger: "blur" }
        ],
        caseCauseName: [
          { required: true, message: "案由不能为空", trigger: "blur" }
        ],
        isHearing: [
          { required: true, message: "是否进行听证不能为空", trigger: "change" }
        ],
        isImportant: [
          { required: true, message: "是否重大案件不能为空", trigger: "change" }
        ],
        hearingOrgan: [
          { validator: validateIsHearing, message: "听证机关不能为空", trigger: "blur" }
        ],
        hearingPlace: [
          { validator: validateIsHearing, message: "听证地点不能为空", trigger: "blur" }
        ],
        hearingStartTime: [
          { validator: validateIsHearing, message: "听证开始时间不能为空", trigger: "blur" }
        ],
        hearingEndTime: [
          { validator: validateIsHearing, message: "听证结束时间不能为空", trigger: "blur" }
        ],
        persidingHearer: [
          { validator: validateIsHearing, message: "听证主持人不能为空", trigger: "blur" }
        ],
        presidingHearerPosition: [
          { validator: validateIsHearing, message: "听证主持人职务不能为空", trigger: "blur" }
        ],
        hearingOfficer: [
          { validator: validateIsHearing, message: "听证员不能为空", trigger: "blur" }
        ],
        hearingOfficerPosition: [
          { validator: validateIsHearing, message: "听证员职务不能为空", trigger: "blur" }
        ],
        hearingClerks: [
          { validator: validateIsHearing, message: "记录员不能为空", trigger: "blur" }
        ],
        hearingClerksPosition: [
          { validator: validateIsHearing, message: "记录员职务不能为空", trigger: "blur" }
        ],
      }
    };
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId",'IsLawEnforcementSupervision']) },
  inject: ["reload"],
  methods: {
    getDataAfter() {
      if (this.formData.isHearing[0] == ["是"]) {
        this.isHearingFlag = true;
      } else {
        this.isHearingFlag = false;
      }
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
    submitCaseDoc(handleType) {
      //参数  提交类型 、formRef、有无下一环节按
      this.com_submitCaseForm(handleType, "docForm", false);
    },
    //下一环节
    continueHandle() {
      let caseData = {
        caseBasicinfoId: this.caseLinkDataForm.caseBasicinfoId,
        caseLinktypeId: this.caseLinkDataForm.caseLinktypeId
      };

      let canGotoNext = true; //是否进入下一环节
      for (let i = 0; i < this.docTableDatas.length; i++) {
        if (
          this.docTableDatas[i].isRequired === 0 &&
          Number(this.docTableDatas[i].status) == 0
        ) {
          canGotoNext = false;
          break;
        }
      }
      if (canGotoNext) {
        this.com_goToNextLinkTu(
          this.caseId,
          this.caseLinkDataForm.caseLinktypeId
        );
      } else {
        this.$refs.checkDocFinishRef.showModal(this.docTableDatas, caseData);
      }
    },
    //查看文书
    viewDoc(row) {
      row.url=this.$route.name;
      row.caseBasicinfoId= this.caseBasicinfoId
      this.$store.commit("setCurrentFileData", row);//保存文书信息
      this.com_viewDoc(row, this.caseLinkDataForm.caseLinktypeId);
    },
    //清空文书
    delDocDataByDocId(data) {
      this.$refs.resetDocDiaRef.showModal(data);
    },
    //预览pdf
    viewDocPdf(row) {
      row.url=this.$route.name;
      row.caseBasicinfoId= this.caseBasicinfoId
      this.$store.commit("setCurrentFileData", row);//保存文书信息
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
    },
    //通过案件id和表单类型Id查询已绑定文书
    getDocListByCaseIdAndFormId() {
      let data = {
        linkTypeId: this.BASIC_DATA_JX.partyRights_JX_caseLinktypeId
      };
      this.com_getDocListByCaseIdAndFormId(data);
    },
    //更改 是否是重大案件
    changeImportant(val) {
      let docIds = [
        this.BASIC_DATA_JX.importantCaseTeamDissDoc_JX_caseDocTypeId
      ];
      //是重大笔录时
      if (val[0] == "是") {
        let importdoc = [];
        this.docTableDatasCopy.forEach(item => {
          docIds.forEach(item1 => {
            if (item.docId === item1) {
              importdoc.push(item);
              console.log("importdoc", importdoc);
            }
          });
        });
        importdoc.forEach(item => {
          this.docTableDatas.push(item);
        });
      } else {
        this.docTableDatas.forEach(item => {
          docIds.forEach(item1 => {
            if (item.docId === item1) {
              this.docTableDatas.splice(this.docTableDatas.indexOf(item), 1);
            }
          });
        });
        let docDataId = "";
        this.docTableDatasCopy.forEach(item => {
          docIds.forEach(item1 => {
            if (item.docId === item1) docDataId = item.docDataId;
            if (docDataId) {
              //文书状态为已完成时
              deleteDocByIdApi(docDataId).then(
                res => {},
                error => {
                  console.log(error);
                }
              );
            }
          });
        });
      }
    },
    //返回到流程图
    backBtn() {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.go(-1);
    },
    //更改 是否听证
    changeHearing(val) {
      if (this.formData.isHearing[0] == ["是"]) {
        this.isHearingFlag = true;
      } else {
        this.isHearingFlag = false;
      }
    }
  },
  mounted() {
    // this.setFormData();
  },
  created() {
    console.log("this.$route.params", this.$route.params);
    this.setFormData();
    //通过案件id和表单类型Id查询已绑定文书
    this.getDocListByCaseIdAndFormId();
  }
};
</script>

<style lang="scss" src="@/assets/css/documentForm.scss" scoped>
/*   @import "@/assets/css/documentForm.scss"; */
</style>
