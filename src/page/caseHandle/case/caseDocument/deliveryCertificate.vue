<template>
  <div class="print_box" id='btnB'>
    <div class="print_info">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData" :class="isPdf">
        <div class="doc_topic">送达回证</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <p>案由：
          <el-form-item  prop="caseName" style="width:500px">
            <el-input type='textarea' v-model="docData.caseName" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\" disabled></el-input>
          </el-form-item>
        </p>
        <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td>
              送达单位
            </td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item >
                <el-input type='textarea' v-model="docData.sendUnit" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>

            </td>
          </tr>
          <tr>
            <td>
              受送达人
            </td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item >
                <el-input type='textarea' v-model="docData.recivePerson" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>

            </td>
          </tr>
          <tr>
            <td>
              代收人
            </td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item >
                <el-input type='textarea' v-model="docData.recivePersonInstead" v-bind:class="{ over_flow:docData.party.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>

            </td>
          </tr>
          <tr>
            <td>
              <p>送达文书</p>
              <p>名称、文号</p>
            </td>
            <td>
              <p>收件人签名</p>
              <p>（盖章）</p>
            </td>
            <td>
              <p>送达</p>
              <p>地点</p>
            </td>
            <td>
              送达日期
            </td>
            <td style="width:85px">
              <p> 送达</p>
              <p> 方式</p>
            </td>
            <td>
              送达人
            </td>
          </tr>
          <tr v-for="item in deliveryCertificatelist" :key="item.id">
            <td class="color_DBE4EF">
              <el-form-item >
                <el-input type='textarea' v-model="item.sendName" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td class="color_DBE4EF">
              <el-form-item >
              </el-form-item>
            </td>
            <td class="color_DBE4EF">
              <el-form-item >
                <el-input type='textarea' v-model="item.sendPlace"  :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td class="color_DBE4EF">
              <div class="pdf_data">
                <el-form-item  class="pdf_datapick">
                  <el-date-picker class="big_error" v-model="item.sendData" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日">
                  </el-date-picker>
                </el-form-item>
              </div>
            </td>
            <td class="color_DBE4EF">
              <el-form-item >
                <el-select v-model="item.sendWay" placeholder="请选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
            <td class="color_DBE4EF">
              <el-form-item >
              </el-form-item>
            </td>

          </tr>
          <tr>
            <td colspan="6">
              <div class="pdf_seal">
                <span @click='makeSeal'>交通运输执法部门(印章)</span><br>
                <el-form-item prop="makeDate" class="pdf_datapick">
                  <el-date-picker class="big_error" v-model="docData.makeDate" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日">
                  </el-date-picker>
                </el-form-item>
              </div>
            </td>

          </tr>
          <tr>
            <td colspan="6" class="color_DBE4EF remark">
              <el-form-item label='备注'>
                <el-input type='textarea' v-model="docData.party" v-bind:class="{ over_flow:docData.party.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
                <!-- <el-input v-model="docData.party"  @input="widthCheck($event.target, 23,$event)" maxlength="47" v-bind:class="{over_flow: isOverflow}" placeholder="\"></el-input> -->
              </el-form-item>
            </td>
          </tr>
        </table>

      </el-form>
    </div>

    <casePageFloatBtns :pageDomId="'subOutputRank-print'" :formOrDocData="formOrDocData" @submitData="submitData" @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>

    <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput>
    <!-- <el-alert title="错误提示的文案" type="error"  show-icon>
    </el-alert> -->
  </div>
</template>
<script>
// import overflowInput from "./overflowInput";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
// import signture from "../../../../js/signture";
import mySignture from "@/common/js/mySignture";
// import {signture2} from "@/common/js/signture";
// 验证规则
import { validatePhone, validateIDNumber } from "@/common/js/validator";

export default {
  components: {
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId']) },
  data() {
    var validatePhone = (rule, value, callback) => {
      var reg = /^1(3|4|5|6|7|8)\d{9}$/;
      if (!reg.test(value) && value) {
        // this.$alert('手机号格式错误')
        // this.$message('手机号格式错误')
        this.$notify.error({
          title: '错误',
          message: '手机号格式错误'
        });
        // callback(new Error('手机号格式错误'));
      }
      callback();
    };
    return {
      overFlowEditList: [{}, {}],
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
        partyTel: [{ validator: validatePhone, trigger: "blur" }],
        partyIdNo: [{ validator: validateIDNumber, trigger: "blur" }],
        punishLaw: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        illegalLaw: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        tempPunishAmount: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        partyAddress: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        partyIdNo: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        socialCreditCode: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        partyManager: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        partyUnitTel: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        partyUnitAddress: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        partyName: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        partyTel: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        illegalFactsEvidence: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        reconsiderationOrgan: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        bank: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        account: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        reconsiderationOrgan: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        litigationOrgan: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        makeDate: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],

      },
      deliveryCertificatelist: [{}, {}, {}, {}, {}],
      nameLength: 23,
      adressLength: 23,
      maxLengthOverLine: 122,
      maxLength: 23,
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: 'subOutputRank-print',
      },
      isPdf: '',
      options: [{
        value: '选项1',
        label: '直接送达'
      }, {
        value: '选项2',
        label: '间接送达'
      }, {
        value: '选项3',
        label: '邮寄送达'
      }],
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
