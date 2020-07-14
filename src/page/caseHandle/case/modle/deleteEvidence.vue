<template>
  <div class="print_box" id="btnB">
    <div class="print_info">
      <el-form
        :rules="rules"
        ref="docForm"
        :inline-message="true"
        :inline="true"
        :model="docData"
        :class="isPdf"
      >
        <div class="doc_topic">解除证据登记保存决定书</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <p>
          当事人（个人姓名或单位名称）
          <span class="width_file">
            <el-form-item prop="party">
              <el-input
                type="textarea"
                v-model="docData.party"
                v-bind:class="{ over_flow:docData.party.length>12?true:false }"
                :autosize="{ minRows: 1, maxRows: 3}"
                :maxLength="maxLength"
                placeholder="\"
              ></el-input>
            </el-form-item>
          </span>
        </p>
        <p>
          本机关依法于
          <span class="p_datapick">
            <el-form-item prop="makeDate" class="pdf_datapick">
              <el-date-picker
                v-model="docData.saveDate"
                type="date"
                format="yyyy年MM月dd日"
                placeholder="    年  月  日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </span>对你（单位）采取了证据登记保存，《证据登记保存清单》案号为：
          <span contenteditable="true">
            <el-form-item prop="caseNumberCopy">
              <el-input
                type="textarea"
                v-model="docData.caseNumberCopy"
                v-bind:class="{ over_flow:docData.caseNumberCopy.length>12?true:false }"
                :autosize="{ minRows: 1, maxRows: 3}"
                :maxLength="maxLength"
                placeholder="\"
              ></el-input>
            </el-form-item>
          </span>。依照《中华人民共和国行政处罚法》第三十七条第二款的规定，本机关决定自
          <span class="p_datapick">
            <el-form-item prop="makeDate" class="pdf_datapick">
              <el-date-picker
                v-model="docData.relieveDate"
                type="date"
                format="yyyy年MM月dd日"
                placeholder="    年  月  日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </span>起解除该证据登记保存。
        </p>

        <div class="pdf_seal">
          <span @click="makeSeal">交通运输执法部门(印章)</span>
          <br />
          <el-form-item prop="makeDate" class="pdf_datapick">
            <el-date-picker
              v-model="docData.makeDate"
              type="date"
              format="yyyy年MM月dd日"
              placeholder="    年  月  日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="notice clear">
          <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
        </div>
      </el-form>
    </div>
    <!-- 悬浮按钮 -->
    <casePageFloatBtns
      :pageDomId="'subOutputRank-print'"
      :formOrDocData="formOrDocData"
      @submitData="submitData"
      @saveData="saveData"
      @backHuanjie="submitData"
    ></casePageFloatBtns>
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
      overFlowEditList: [{}, {}],
      isOverflow: false,
      isOverLine: false,
      docData: {
        caseNumber: '',
        party: '',
        saveDate: '',
        caseNumberCopy: '',
        relieveDate: '',
      },
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
          id: "", //修改的时候用
          caseBasicinfoId: "", //案件ID
          caseDoctypeId: this.$route.params.docId, //文书类型ID
          //文书数据
          docData: "",
          status: "", //提交状态
          linkTypeId: this.$route.params.caseLinkTypeId //所属环节的id
        },
      name: '',
      rules: {
        party: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        saveDate: [
          { required: true, message: '证据保存日期不能为空', trigger: 'change' },
        ],
        relieveDate: [
          { required: true, message: '解除证据登记日期不能为空', trigger: 'change' },
        ],
        caseNumberCopy: [
          { required: true, message: '证据登记编号不能为空', trigger: 'blur' },
        ]

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
