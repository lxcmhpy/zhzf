<!-------长软------->
<template>
   <div class="print_box">
    <div class="print_info" id="assistInvestigation_print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">协助调查函</div>
        <div class="doc_number">赣（{{docData.caseNumber.substring(3,7)}}）交协调〔{{docData.caseNumber.substring(8,13)}}〕号</div>
        <p class="side_right_indent">
          <el-form-item prop="party" :rules="fieldRules('party',propertyFeatures['party'])" style="width: 250px;">
            <el-input
              type="textarea"
              v-model="docData.party"
              v-bind:class="{ over_flow:docData.party && docData.party.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 2}"
              :maxLength="maxLength"
              style="width:250px;"
              :disabled="fieldDisabled(propertyFeatures['party'])"
            ></el-input>
          </el-form-item>：
        </p>
        <p>
          <span>
              为查清
            <el-form-item prop="caseName">
              <el-input v-model="docData.caseName"  :maxLength='maxLength' placeholder="\"></el-input>
            </el-form-item>
          </span>一案有关事实情况，特请你单位协助调查以下问题：
        </p>
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item prop="investQuestion" :rules="fieldRules('investQuestion',propertyFeatures['investQuestion'])">
              <el-input
                class="text_indent2 overflow_lins_textarea"
                type="textarea"
                v-model="docData.investQuestion"
                rows="3"
                maxlength="90"
                :disabled="fieldDisabled(propertyFeatures['investQuestion'])"
              ></el-input>
              <!-- <span class="overflow_describe">违法事实及依据：</span>-->
              <span class="span_bg span_bg_top">&nbsp;</span> 
              <span
                v-for="item in overFlowEditList"
                :key="item.id"
                class="span_bg"
              >&nbsp;</span>
            </el-form-item>
            （请贵单位将调查结果及相关证据材料加盖单位公章后及时函告我单位）
          </div>
        </div>
        <br/>
        <el-row>
          <el-col :span="12">
            <p>
              联系人：
              <el-form-item v-if="!lineStyleFlag" prop="organContactor" style="width:200px" :rules="fieldRules('organContactor',propertyFeatures['organContactor'])">
                <el-input
                  type="textarea"
                  v-model="docData.organContactor"
                  v-bind:class="{ over_flow:docData.organContactor && docData.organContactor.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxLength="maxLength"
                  placeholder="\"
                  :disabled="fieldDisabled(propertyFeatures['organContactor'])"
                ></el-input>
              </el-form-item>
              <u v-if="lineStyleFlag">{{docData.organContactor}}</u>
            </p>
          </el-col>
        </el-row>
        <el-row>          
          <el-col :span="12">
            <p>
              联系电话：
              <el-form-item v-if="!lineStyleFlag" prop="organTel" style="width:180px" :rules="fieldRules('organTel',propertyFeatures['organTel'],validatePhone)">
                <el-input
                  type="textarea"
                  v-model="docData.organTel"
                  v-bind:class="{ over_flow:docData.organTel && docData.organTel.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxLength="maxLength"
                  placeholder="\"
                  :disabled="fieldDisabled(propertyFeatures['organTel'])"
                ></el-input>
              </el-form-item>
              <u v-if="lineStyleFlag">{{docData.partyTel}}</u>
            </p>
          </el-col>
        </el-row>
        <div class="pdf_seal">
          <span>交通运输执法部门(印章)</span><br>
          <el-form-item prop="makeDate" class="pdf_datapick">
            <el-date-picker v-model="docData.makeDate" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!-- 悬浮按钮 -->
    <casePageFloatBtns :pageDomId="'assistInvestigation_print'" :formOrDocData="formOrDocData" @submitData="submitData" @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>

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
  computed: { ...mapGetters(['caseId']) },
  data() {
    return {
      docData: {
        party:'',
        caseNumber: '',
        caseName: '',
        investQuestion:'',
        organContactor:'',
        partyTel:'',
        makeDate: '',
      },
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "",   //修改的时候用
        caseBasicinfoId: '',   //案件ID
        caseDoctypeId: this.BASIC_DATA_SYS.assistInvestigation_caseDocTypeId,    //文书类型ID
        //文书数据
        docData: "",
        status: "",   //提交状态
      },
      lineStyleFlag: false,
      rules: {
        party: [
          { required: true, message: "当事人必须填写", trigger: 'blur' },
        ],
        caseName: [
          { required: true, message: '案由必须填写', trigger: 'blur' },
        ],
      },
      nameLength: 23,
      adressLength: 23,
      maxLength: 23,
      maxLengthOverLine: 122,
      overFlowEditList: [{}, {},{}],
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: 'assistInvestigation_print',
      },
      propertyFeatures:'',
    }
  },
 methods: {
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId
      };
      this.com_getDocDataByCaseIdAndDocId(data)

    },
    //保存文书信息
    addDocData(handleType) {
      this.com_addDocData(handleType, 'docForm');
    },
     // 打印
    print() {
      console.log('打印!');
    },
    // 多行编辑
    overFlowEdit() {
      // this.$refs.overflowInputRef.showModal(0, '', this.maxLengthOverLine);
    },
    // 获取多行编辑内容
    getOverFloeEditInfo(edit) {
      this.docData.investQuestion = edit;
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
      if (this.$route.params.docStatus == '1') {
        this.formOrDocData.showBtn = [false, false, false, false, false, false, false, false, false, true]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    },
    getDataAfter(){
      //获取机构详情
      let params = { id: iLocalStroage.gets("userInfo").organId };
      let _this = this
      this.$store.dispatch("getOrganDetail", params).then(
        res => {
//          console.log("机构", res);
          let organData = res.data;
          _this.docData.organContactor = organData.contactor;
          _this.docData.organTel = organData.telephone;
        },
        err => {
//          console.log(err);
        }
      );
    }
  },
  mounted() {
    this.getDocDataByCaseIdAndDocId();
  },
  created() {
    this.isOverStatus();
  }
}
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss">
/* @import "@/assets/css/caseHandle/caseDocModle.scss"; */
</style>
