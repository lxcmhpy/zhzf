<template>
  <div class="box">
    <el-form ref="caseDocForm" :model="formData" :rules="rules" label-width="115px">
      <div class="content_box">
        <div class="content">
          <div class="content_title">移交移送</div>
          <div class="border_blue"></div>
          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item prop="caseNumber" label="案号" :rules="fieldRules('caseNumber',propertyFeatures['caseNumber'])">
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
                <el-form-item prop="caseCauseName" label="案由" :rules="fieldRules('caseCauseName',propertyFeatures['caseCauseName'])">
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
            <div class="row">
              <div class="col">
                <el-form-item label="被移送单位名称" prop="companyName" :rules="fieldRules('companyName',propertyFeatures['companyName'])">
                  <el-input ref="companyName" :disabled="fieldDisabled(propertyFeatures['companyName'])" clearable class="w-120" v-model="formData.companyName" size="small" placeholder="请输入" ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="联系电话" prop="companyTel" :rules="fieldRules('companyTel',propertyFeatures['companyTel'],validatePhone)">
                  <el-input
                    ref="companyTel"
                    clearable
                    class="w-120"
                    v-model="formData.companyTel"
                    size="small"
                    placeholder="请输入"
                    :disabled="fieldDisabled(propertyFeatures['companyTel'])"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isParty">
              <div class="col">
                <el-form-item label="姓名" prop="party" :rules="fieldRules('party',propertyFeatures['party'],'',isParty)">
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
                <el-form-item label="性别" prop="partySex" :rules="fieldRules('partySex',propertyFeatures['partySex'],'',isParty)">
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
                <el-form-item label="身份证件号" prop="partyIdNo" :rules="fieldRules('partyIdNo',propertyFeatures['partyIdNo'],validateIDNumber,isParty)">
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
                <el-form-item label="年龄" prop="partyAge" :rules="fieldRules('partyAge',propertyFeatures['partyAge'],'',isParty)">
                  <el-input ref="partyAge" :disabled="!isParty || fieldDisabled(propertyFeatures['partyAge'])" clearable class="w-120" type="number" v-model="formData.partyAge" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isParty">
              <div class="col">
                <el-form-item label="联系电话" prop="partyTel" :rules="fieldRules('partyTel',propertyFeatures['partyTel'],validatePhone,isParty)">
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
                <el-form-item label="所在单位" prop="partyUnitPosition" :rules="fieldRules('partyUnitPosition',propertyFeatures['partyUnitPosition'],'',isParty)">
                  <el-input ref="partyUnitPosition" :disabled="!isParty || fieldDisabled(propertyFeatures['partyUnitPosition'])" clearable class="w-120" v-model="formData.partyUnitPosition" size="small" placeholder="请输入" ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isParty">
              <div class="col">
                <el-form-item label="联系地址" prop="partyAddress" :rules="fieldRules('partyAddress',propertyFeatures['partyAddress'],'',isParty)">
                  <el-input
                    ref="partyAddress"
                    clearable
                    class="w-120"
                    v-model="formData.partyAddress"
                    size="small"
                    placeholder="请输入"
                    :disabled="isParty || fieldDisabled(propertyFeatures['partyAddress'])"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="邮编" prop="partyZipCode" :rules="fieldRules('partyZipCode',propertyFeatures['partyZipCode'],'',isParty)">
                  <el-input ref="partyZipCode" :disabled="isParty || fieldDisabled(propertyFeatures['partyZipCode'])" clearable class="w-120" v-model="formData.partyZipCode" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="row" v-if="!isParty">
              <div class="col">
                <el-form-item label="单位" prop="partyName" :rules="fieldRules('partyName',propertyFeatures['partyName'],'',!isParty)">
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
                <el-form-item label="地址" prop="partyUnitAddress" :rules="fieldRules('partyUnitAddress',propertyFeatures['partyUnitAddress'],'',!isParty)">
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
                <el-form-item label="法定代表人" prop="partyManager" :rules="fieldRules('partyManager',propertyFeatures['partyManager'],'',!isParty)">
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
                <el-form-item label="联系电话" prop="partyUnitTel" :rules="fieldRules('partyUnitTel',propertyFeatures['partyUnitTel'],validatePhone,!isParty)">
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
                <el-form-item label="统一社会信用代码" class="line-height13" prop="socialCreditCode" :rules="fieldRules('socialCreditCode',propertyFeatures['socialCreditCode'],'',!isParty)">
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
          </div>
        </div>
      </div>
      <div class="content_box">
        <div class="content">
          <el-row :gutter="20">
            <el-col :span="16">
              <div class="second_title">
                文书列表
              </div>
            </el-col>
          </el-row>
          <div class="table_form">
            <el-table
              :data="docTableDatas"
              stripe
              border
              style="width: 100%"
            >
              <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
              <el-table-column prop="name" label="材料名称" align="center">
                <template slot-scope="scope">
                  <span v-show="scope.row.isRequired ===0"><span style="color:red">*</span> {{scope.row.name}}</span>
                  <span v-show="scope.row.isRequired !==0">{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态" align="center">
                  <template slot-scope="scope">
                  <span v-if="scope.row.status == '1' || scope.row.status == '2'">
                    完成
                  </span>
                  <span v-if="scope.row.status == '0'">
                    暂存
                  </span>
                  <span v-if="scope.row.status != '1' && scope.row.status != '0'  && scope.row.status != '2'">
                    -
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" >
                <template slot-scope="scope" class="docListHandleClass">
<!--                  <div v-if="scope.row.openRow">-->
<!--                    <span @click="addMoreDoc(scope.row)" class="tableHandelcase">添加</span>-->
<!--                  </div>-->
                  <div v-if="!scope.row.openRow">
                    <!-- 已完成 -->
                    <span v-if="scope.row.status == '1' || scope.row.status == '2'" class="tableHandelcase" @click="viewDocPdf(scope.row)">查看</span>
                    <!-- 未完成 暂存 -->
                    <span v-if="scope.row.status == '0'" class="tableHandelcase">
                      <span @click="viewDoc(scope.row)">编辑</span>
                      <span @click="delDocDataByDocId(scope.row)">清空</span>
                    </span>
                    <!-- 无状态 -->
                    <span v-if="scope.row.status === ''" class="tableHandelcase" @click="viewDoc(scope.row)">添加</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 悬浮按钮 -->
        <div class="float-btns btn-height63">
          <el-button type="primary" @click="continueHandle" :disabled="!canGoNextLink" v-if="!this.$route.params.isComplete">
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

          <el-button type="primary" @click="submitCaseDoc(1)" :disabled="canGoNextLink" v-if="!this.$route.params.isComplete">
            <i class="iconfont law-save"></i>
            <br />保存
          </el-button>
          <el-button type="primary" @click="backBtn" v-if="this.$route.params.isComplete">
            <i class="iconfont law-back"></i>
            <br />返回
          </el-button>
        </div>
      </div>
    </el-form>
    <checkDocFinish ref="checkDocFinishRef"></checkDocFinish>
    <resetDocDia ref="resetDocDiaRef" @getDocListByCaseIdAndFormIdEmit="getDocListByCaseIdAndFormId"></resetDocDia>
    <caseSlideMenu :activeIndex="''"></caseSlideMenu>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import checkDocFinish from "@/page/caseHandle/components/checkDocFinish.vue";
import resetDocDia from '@/page/caseHandle/components/resetDocDia';
import iLocalStroage from "@/common/js/localStroage";
import caseSlideMenu from '@/page/caseHandle/components/caseSlideMenu'
import {BASIC_DATA_JX} from '@/common/js/BASIC_DATA_JX.js';
import {
  validateIDNumber,
  validatePhone,
  validateZIP
} from "@/common/js/validator";
export default {
  components: {
    checkDocFinish,
    resetDocDia,
    caseSlideMenu
  },
  data() {
    return {
      validatePhone:validatePhone,
      validateIDNumber:validateIDNumber,
      formData: {
        caseNumber: "",
        caseCauseName: "",
        companyName: "",
        companyTel: "",
        party: "",
        partySex: "",
        partyIdNo: "",
        partyAge: "",
        partyTel: "",
        partyUnitPosition:"",
        partyAddress: "",
        partyZipCode: "",
        partyName: "",
        partyUnitAddress: "",
        partyManager: "",
        partyUnitTel: "",
        socialCreditCode: "",
      },
      isSaveLink: '',
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseLinktypeId: this.BASIC_DATA_JX.transfei_JX_caseLinktypeId, ////表单类型ID
        formData: "", //表单数据
        status: ""
      },
      handleType: 0,
      docTableDatas: [],
      rules: {
        caseNumber: [
          { required: true, message: "案号不能为空", trigger: "blur" }
        ],
        caseName: [
          { required: true, message: "案由不能为空", trigger: "blur" }
        ],
        companyName: [
          { required: true, message: "被移送单位名称不能为空", trigger: "change" }
        ],
        companyTel: [
          { required: true, message: "移送单位联系电话不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        party: [
          { required: true, message: "姓名不能为空", trigger: "blur" }
        ],
        partySex: [
          { required: true, message: "性别不能为空", trigger: "change" }
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
          { required: true, message: "联系地址不能为空", trigger: "blur" }
        ],
        partyName: [
          { required: true, message: "单位不能为空", trigger: "blur" }
        ],
        partyUnitAddress: [
          { required: true, message: "地址不能为空", trigger: "blur" }
        ],
        partyManager: [
          { required: true, message: "法定代表人不能为空", trigger: "blur" }
        ],
        partyUnitTel: [
          { required: true, message: "联系电话不能为空", trigger: "blur" }
        ],
        socialCreditCode: [
          { required: true, message: "统一社会信用代码不能为空", trigger: "blur" }
        ],

      },
      // nextBtnDisab: true
      isParty: true, //当事人类型为个人
      originalData: "",
      propertyFeatures:'', //字段属性配置

    };
  },
  computed: {
    ...mapGetters(["caseId"])
  },
  mixins: [mixinGetCaseApiList],
  inject: ["reload"],
  methods: {
    //加载表单信息
    setFormData() {
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(this.caseLinkDataForm.caseBasicinfoId, this.caseLinkDataForm.caseLinktypeId, false);
    },
    //保存表单数据
    submitCaseDoc(handleType) {
      this.com_submitCaseForm(handleType, 'caseDocForm', false);
    },
    //提交
    continueHandle() {
      // if(this.isSaveLink){
        let caseData = {
          caseBasicinfoId: this.caseLinkDataForm.caseBasicinfoId,
          caseLinktypeId: this.caseLinkDataForm.caseLinktypeId,
        }
        let canGotoNext = true; //是否进入下一环节  isRequired(0必填 1非必填)
        let allFinish = true;
        console.log("canGotoNext",this.docTableDatas)
        for (let i = 0; i < this.docTableDatas.length; i++) {
          if (this.docTableDatas[i].isRequired === 0 && Number(this.docTableDatas[i].status) == 0 ) {
            canGotoNext = false
            break;
          }
          if (this.docTableDatas[i].isRequired !== 0 && this.docTableDatas[i].status === 0) {
            allFinish = false
            break;
          }
        }
        console.log("canGotoNext",canGotoNext)
        console.log("allFinish",allFinish)
        if (canGotoNext) {
          this.com_goToNextLinkTu(this.caseId, this.caseLinkDataForm.caseLinktypeId);

        } else {
          this.$refs.checkDocFinishRef.showModal(this.docTableDatas, caseData);
        }
      // }else{
      //   this.$refs.saveFormDiaRef.showModal();
      // }

    },
    // 进入文书
    enterDoc(row) {
      this.$store.dispatch("deleteTabs", this.$route.name);//关闭当前页签
      console.log('row', row)
      this.$router.push({
        name: row.path,
        params: {
          id: row.id,
          //案件ID
          caseBasicinfoId: this.caseBasicinfoId,
          docId: row.docId,
          url: this.$route.name,
        }
      });
    },
    //查看文书
    viewDoc(row) {
      this.com_viewDoc(row,this.caseLinkDataForm.caseLinktypeId);
    },
    //预览pdf
    viewDocPdf(row) {
      let routerData = {
        hasApprovalBtn: false,
        docId: row.docId,
        approvalOver: false,
        hasBack: true,
        status:row.status,  //status状态 0 暂存 1保存未提交  2 保存并提交
        docDataId:row.docDataId
      }
      this.$store.dispatch("deleteTabs", this.$route.name);
      this.$router.push({ name: 'case_handle_myPDF', params: routerData })
    },
    //清空文书
    delDocDataByDocId(data){
      console.log("清空文书",data);
      this.$refs.resetDocDiaRef.showModal(data);
    },
    //通过案件id和表单类型Id查询已绑定文书
    getDocListByCaseIdAndFormId() {
      let data = {
        linkTypeId: this.caseLinkDataForm.caseLinktypeId    //环节ID
      };
      this.com_getDocListByCaseIdAndFormId(data);
    },
    //返回到流程图
    backBtn() {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.go(-1);
    },
  },
  created() {
    this.setFormData();
    this.getDocListByCaseIdAndFormId();
  }
};
</script>

<style lang="scss" src="@/assets/css/documentForm.scss" scoped>
</style>
