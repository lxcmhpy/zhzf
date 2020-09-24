<template>
  <div class="print_box" id="btnB">
    <div class="print_info">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData" :class="isPdf">
        <div class="doc_topic">公告</div>
        <div class="overflow_lins_style" id="noteDesCon">
                  <div class="overflow_lins">
                    <el-form-item
                      prop="publishInfo"
                      :rules="fieldRules('publishInfo',propertyFeatures['publishInfo'])"
                    >
                      <el-input
                        class="overflow_lins_textarea espacle"
                        type="textarea"
                        v-model="docData.publishInfo"
                        rows="4"
                        maxlength="400"
                        placeholder="\"
                        :disabled="fieldDisabled(propertyFeatures['publishInfo'])"
                      ></el-input>
                      <p class="span_bg" style="    margin-top: 8px;">&nbsp;</p>
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
        <div class="pdf_seal" style="width:240px">
          <span @click="makeSeal">执法机关（盖章）</span>
          <br />
          <el-form-item prop="makeDate" class="pdf_datapick" :rules="fieldRules('makeDate',propertyFeatures['makeDate'])">
            <el-date-picker v-model="docData.makeDate" type="date" :disabled="fieldDisabled(propertyFeatures['makeDate'])" format="yyyy年MM月dd日" placeholder="    年  月  日" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!-- 悬浮按钮 -->
    <casePageFloatBtns :pageDomId="'subOutputRank-print'" :formOrDocData="formOrDocData" @submitData="submitData" @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
// 验证规则
import { validatePhone, validateIDNumber } from "@/common/js/validator";

export default {
  components: {
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId']) },
  data() {
    return {
      docData: {
        publishInfo: '',
        makeDate: '',
      },
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "",   //修改的时候用
        caseBasicinfoId: '',   //案件ID
        caseDoctypeId: this.$route.params.docId,    //文书类型ID
        //文书数据
        docData: "",
        status: "",   //提交状态
        note: "",//文书名字 
        docDataId: "", //多份文书的id
        linkTypeId: this.$route.params.caseLinkTypeId //所属环节的id
      },
      rules: {
      },
   
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: 'subOutputRank-print',
      },
      isPdf: '',
      propertyFeatures: '', //字段属性配置
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
      this.com_getDocDataByCaseIdAndDocId(data);

    },
    //保存文书信息
    addDocData(handleType) {
      this.com_addDocData(handleType, 'docForm');
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
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss">
/* @import "@/assets/css/caseHandle/caseDocModle.scss"; */
</style>
