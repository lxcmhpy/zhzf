<template>
  <div class="print_box" id='btnB'>
    <div class="print_info" id="deliveryOutputRank-print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData" :class="isPdf">
        <div class="doc_topic">送达回证</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <p>案由：
          <el-form-item prop="caseName" style="width:500px">
            <el-input type='textarea' v-model="docData.caseCauseName" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\" disabled></el-input>
          </el-form-item>
        </p>
        <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td>
              送达单位
            </td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item prop="servedOrg">
                <el-input type='textarea' v-model="docData.servedOrg" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>

            </td>
          </tr>
          <tr>
            <td>
              受送达人
            </td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item prop="recivePerson">
                <el-input type='textarea' v-model="docData.recivePerson" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>

            </td>
          </tr>
          <tr>
            <td>
              代收人
            </td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item prop="recivePersonInstead">
                <el-input type='textarea' v-model="docData.recivePersonInstead" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
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
              <el-form-item>
                <el-input type='textarea' v-model="item.docName" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td class="color_DBE4EF">
              <el-form-item>
              </el-form-item>
            </td>
            <td class="color_DBE4EF">
              <el-form-item>
                <el-input type='textarea' v-model="item.address" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td class="color_DBE4EF">
              <div class="pdf_data">
                <el-form-item class="pdf_datapick">
                  <el-date-picker class="big_error" v-model="item.servedDate" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日">
                  </el-date-picker>
                </el-form-item>
              </div>
            </td>
            <td class="color_DBE4EF">
              <el-form-item>
                <el-select v-model="item.servedType" placeholder="请选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
            <td class="color_DBE4EF">
              <el-form-item>
                <el-input type='textarea' v-model="item.receiver" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
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
                <el-input type='textarea' v-model="docData.docNote" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
                <!-- <el-input v-model="docData.party"  @input="widthCheck($event.target, 23,$event)" maxlength="47" v-bind:class="{over_flow: isOverflow}" placeholder="\"></el-input> -->
              </el-form-item>
            </td>
          </tr>
        </table>

      </el-form>
    </div>

    <casePageFloatBtns :pageDomId="'deliveryOutputRank-print'" :formOrDocData="formOrDocData" @submitData="submitData" @saveData="saveData('docForm')" @backHuanjie="submitData"></casePageFloatBtns>

    <!-- <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput> -->
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
    return {
      overFlowEditList: [{}, {}],
      isOverflow: false,
      isOverLine: false,
      docData: {
        caseName: "",
        caseNumber: "",
        servedOrg: "",
        recivePerson: "",
        recivePersonInstead: "",
        docName: "",
        address: "",
        servedDate: "",
        servedType: "",
        receiver: '',
        docNote: '',
      },
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: '', //案件id--从流程进入删掉，先写死测试用
        caseDoctypeId: '2c9029cf6931aa5c01693381ac690018', //表单类型IDer
        //表单数据
        docData: "",
        status: ""
      },
      name: '',
      rules: {
        party: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        servedOrg: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        recivePersonInstead: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        recivePerson: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        makeDate: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],

      },
      deliveryCertificatelist: [{}, {}, {}],
      nameLength: 23,
      adressLength: 23,
      maxLengthOverLine: 122,
      maxLength: 23,
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: 'deliveryOutputRank-print',
      },
      isPdf: '',
      options: [{
        value: '直接送达',
        label: '直接送达'
      }, {
        value: '间接送达',
        label: '间接送达'
      }, {
        value: '邮寄送达',
        label: '邮寄送达'
      }],
      changeableTable: [
        { docName: '', address: '', servedDate: '', receiveType: '' },
        { docName: '', address: '', servedDate: '', receiveType: '' },
      ],
    }
  },
  methods: {
    // 获取带入信息
  //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      debugger
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: '2c9029cf6931aa5c01693381ac690018'
      };
      console.log(data);
      this.com_getDocDataByCaseIdAndDocId(data);
    },
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
    // getDocDataByCaseIdAndDocId() {
    //   let data = {
    //     caseId: this.caseId, //流程里的案件id
    //     // caseId: '297708bcd8e80872febb61577329194f', //先写死
    //     docId: '5cad5b54eb97a15250672a4c397cee56'
    //   };
    //   this.com_getDocDataByCaseIdAndDocId(data);

    // },
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
    //插入证据
    saveData(docForm) {
      debugger
      this.$refs[docForm].validate(valid => {
        if (valid) {
          let datetime = this.changeableTable[0].servedDate;
          let data = {
            id: this.randomString(32),
            caseId: this.caseId, //流程里的案件id
            servedDate: datetime == "" ? "2020-02-02 10:00:00" : this.formatDateStr(datetime),
            address: this.deliveryCertificatelist[0].address,
            docName: this.deliveryCertificatelist[0].docName,
            servedType: this.deliveryCertificatelist[0].servedType,
            receiveType: this.deliveryCertificatelist[0].receiveType,
            servedOrg: this.docData.servedOrg,
            receiver: this.docData.receiver,
            docNote: this.docData.docNote
          };
          console.log('添加', data)
          let _this = this
          debugger
          this.$store.dispatch("saveOrUpdateDeliverReceipt", data).then(res => {
            if (res.code == 200) {
              console.log('添加成功！')
              _this.$message({
                message: '添加成功！',
                type: 'success'
              });
              _this.$store.dispatch("deleteTabs", _this.$route.name); //关闭当前页签
              _this.$store.dispatch("printContent"); //关闭当前页签
              _this.$router.push('deliverReceiptForm')
            } else {
              _this.$message.error('出现异常，添加失败！');
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    randomString(e) {
      e = e || 32;
      const t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
        a = t.length;
      let res = "";
      for (let i = 0; i < e; i++) {
        res += t.charAt(Math.floor(Math.random() * a));
      }
      return res;
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
    // this.getCaseBasicInfo();
  },
  created() {
    this.isOverStatus();
  }
}
</script>
<style lang="scss" >
@import "@/assets/css/caseHandle/caseDocModle.scss";
</style>
<style scoped>
.color_DBE4EF
  /deep/
  .el-form-item__content
  /deep/
  .el-input--prefix
  /deep/
  .el-input__inner {
  padding-left: 0px;
  width: 75%;
}
</style>
