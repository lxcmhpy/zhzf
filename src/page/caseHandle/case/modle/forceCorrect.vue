<template>
  <div class="print_box" id='btnB'>
    <div class="print_info">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData" :class="isPdf">
        <div class="doc_topic">责令改正违法行为通知书</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <p>当事人（个人姓名或单位名称）<span class="width_file">
            <el-form-item prop="illegalLaw">
              <el-input type='textarea' :rules="[
      { required: true, trigger: 'blur' }]" v-model="docData.party" v-bind:class="{ over_flow:docData.illegalLaw.length>12?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input>
            </el-form-item>
          </span>
        </p>
        <!-- 多行样式 -->
        <p>
          经调查，你（单位）存在下列违法事实：
        </p>
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item prop="illegalFactsEvidence">
              <el-input class='overflow_lins_textarea' type='textarea' v-model="docData.caseName" rows="3" maxLength='90' placeholder="\"></el-input>
              <span class="span_bg span_bg_top" @click="overFlowEdit">&nbsp;</span>
              <span v-for="item in overFlowEditList" :key="item.id" class="span_bg" @click="overFlowEdit">&nbsp;</span>
            </el-form-item>
          </div>

        </div>

        <p>依据
          <span contenteditable="true">
            <el-form-item prop="punishLaw">
              <el-input type='textarea' class="big_error" v-model="docData.punishLaw" v-bind:class="{ over_flow:docData.punishLaw.length>12?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input>
            </el-form-item>
          </span>的规定，现责令你（单位）
        </p>
        <p>
          <el-checkbox></el-checkbox>立即予以改正。
        </p>
        <p>
          <el-checkbox></el-checkbox>在<span class="p_datapick">
            <el-form-item prop="correctTime" class="pdf_datapick">
              <el-date-picker class="big_error" v-model="docData.correctTime" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日">
              </el-date-picker>
            </el-form-item>
          </span>前改正或者整改完毕。
        </p>
        <p>
          如果不服本处罚决定，可以在六十日内依法向<span>
            <el-form-item prop="reconsiderationOrgan">
              <el-input v-model="docData.reconsiderationOrgan" :maxLength='maxLength' placeholder="\"></el-input>
            </el-form-item>
          </span>申请行政复议，或者在六个月内依法向<span>
            <el-form-item prop="litigationOrgan">
              <el-input v-model="docData.litigationOrgan" :maxLength='maxLength' placeholder="\"></el-input>
            </el-form-item>
          </span>人民法院提起行政诉讼。
        </p>

        <el-row :gutter="20">
          <el-col :span="12">
            当事人或其代理人签名：
            <span class="write_line width250"></span>
          </el-col>
          <el-col :span="12">
            执法人员签名：
            <span class="write_line width250"></span>
          </el-col>
        </el-row>
        <div class="pdf_seal">
          <span @click='makeSeal'>交通运输执法部门(印章)</span><br>
          <el-form-item prop="makeDate" class="pdf_datapick">
            <el-date-picker class="big_error" v-model="docData.makeDate" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="notice clear">
          <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
        </div>
      </el-form>
    </div>
    <casePageFloatBtns :pageDomId="'subOutputRank-print'" :formOrDocData="formOrDocData" @submitData="submitData" @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>
    <!-- <el-alert title="错误提示的文案" type="error"  show-icon>
    </el-alert> -->
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";

import mySignture from "@/common/js/mySignture";
export default {
  components: {
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId']) },
  data() {
    return {
      overFlowEditList: [{}],
      isOverflow: false,
      isOverLine: false,
      docData: {
        party: '',
        partyIdNo: '',
        partyAddress: "",
        partyTel: "",
        partyName: "",
        partyUnitAddress: "",
        partyUnitTel: "",
        partyManager: "",
        punishLaw: "",
        illegalLaw: "",
        tempPunishAmount: "",
        socialCreditCode: "",
        illegalFactsEvidence: "",
        reconsiderationOrgan: "",
        test: "",
      },
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: '297708bcd8e80872febb61577329194f', //案件id--从流程进入删掉，先写死测试用
        caseLinktypeId: "2c9029d56c8f7b66016c8f8043c90001", //表单类型IDer
        //表单数据
        docData: "",
        status: ""
      },
      name: '',
      rules: {
        party: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        makeDate: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],

      },
      nameLength: 23,
      adressLength: 23,
      maxLengthOverLine: 122,
      maxLength: 23,
      // lineStyleFlag: false,
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: 'subOutputRank-print',
      },
      isPdf: '',
    }
  },
  methods: {
    onSubmit(formName) {
      console.log('submit!');
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      let data = {
        // caseId: this.caseId, //流程里的案件id
        caseId: '297708bcd8e80872febb61577329194f', //先写死
        docId: '5cad5b54eb97a15250672a4c397cee56'
      };
      this.com_getDocDataByCaseIdAndDocId(data);

    },
    //保存文书信息
    addDocData(handleType) {
      this.com_addDocData(handleType, 'docForm');
    },
    // 多行编辑
    overFlowEdit() {
      this.$refs.overflowInputRef.showModal(0, '', this.maxLengthOverLine);
    },
    // 获取多行编辑内容
    getOverFloeEditInfo(edit) {
      console.log('回显', edit)
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
      // 预览样式
      this.isPdf = 'color_FFFFFF';
      setTimeout(() => {
        this.com_addDocData(handleType, "docForm");
      }, 3000);

    },
    //是否是完成状态
    isOverStatus() {
      if (this.$route.params.docStatus == '1') {
        this.formOrDocData.showBtn = [false, false, false, false, false, false, false, false, false, true]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    },
    makeSeal() {

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
<style lang="scss" >
@import "@/assets/css/caseHandle/caseDocModle.scss";
</style>
