<template>
  <div class="print_box" id='btnB'>
    <div class="print_info" id='obtanEvidence_print'>
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData" :class="isPdf">
        <div class="doc_topic">抽样取证凭证</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td rowspan="6">
              当<br>
              事<br>
              人
            </td>
            <td rowspan="2">个人</td>
            <td>姓名</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="party">
                <el-input type='textarea' v-model="docData.party" v-bind:class="{ over_flow:docData.party.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" :disabled="isParty ? false : true" placeholder="\"></el-input>
                <!-- <el-input v-model="docData.party"  @input="widthCheck($event.target, 23,$event)" maxlength="47" v-bind:class="{over_flow: isOverflow}" placeholder="\"></el-input> -->
              </el-form-item>
            </td>
            <td>身份证件号</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyIdNo">
                <el-input type='textarea' v-model="docData.partyIdNo" :maxLength='18' placeholder="\" :autosize="{ minRows: 1, maxRows: 3}" :disabled="isParty ? false : true"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>住址</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyAddress">
                <el-input type='textarea' v-model="docData.partyAddress" v-bind:class="{ over_flow:docData.partyAddress.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="adressLength" :disabled="isParty ? false : true" placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyTel">
                <el-input v-model="docData.partyTel" :maxLength='maxLength' placeholder="\" :disabled="isParty ? false : true"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="4"> 单位 </td>
            <td>名称</td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item prop="partyName">
                <el-input v-model="docData.partyName" :maxLength='maxLength' :disabled="isParty ? true : false" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>地址</td>
            <td colspan="4" class="color_DBE4EF">
              <el-form-item prop="partyUnitAddress">
                <el-input v-model="docData.partyUnitAddress" :maxLength='maxLength' :disabled="isParty ? true : false" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyUnitTel">
                <el-input v-model="docData.partyUnitTel" minlength="11" :maxLength='maxLength' :disabled="isParty ? true : false" placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td> 法定代表人 </td>
            <td class="color_DBE4EF">
              <el-form-item prop="partyManager">
                <el-input v-model="docData.partyManager" :maxLength='maxLength' :disabled="isParty ? true : false" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              统一社会信用代码
            </td>
            <td colspan="3" class="color_DBE4EF">
              <el-form-item prop="socialCreditCode">
                <el-input v-model="docData.socialCreditCode" :maxLength='maxLength' :disabled="isParty ? true : false" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <p class="textindent0 data_picker">
          抽样取证时间：
          <el-date-picker style="width:430px"  v-model="docData.getEvidence" type="datetimerange" range-separator="至" start-placeholder=" 年  月  日  时  分" end-placeholder=" 年  月  日  时  分" format="yyyy年MM月dd日HH时mm分">
          </el-date-picker>
        </p>
        <div class="pager_input quzheng">抽样取证地点：
          <el-form-item>
            <el-input class='text_indent10 overflow_lins_textarea' v-model="docData.evidencePlace" rows="3" maxLength='90' placeholder="\"></el-input>
          </el-form-item>
        </div>
        <el-row :gutter="10" class="pager_input">
          <el-col :span="12">抽样取证机关：
            <el-form-item>
              <el-input class='text_indent10 overflow_lins_textarea' v-model="docData.evidenceDepartment" rows="3" maxLength='90' placeholder="\"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            联系电话：
            <el-form-item>
              <el-input class='text_indent10 overflow_lins_textarea' v-model="docData.evidenceDepartmentPhone" rows="3" maxLength='90' placeholder="\"></el-input>
            </el-form-item>

          </el-col>
        </el-row>
        <p>
          依据《中华人民共和国行政处罚法》第三十七条第二款规定，对你（单位）的下列物品进行抽样取证。
        </p>
        <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td>序号</td>
            <td>被抽样物品名称</td>
            <td>规格及批号</td>
            <td>数量</td>
            <td>被抽样物品地点</td>
          </tr>
          <tr v-for="item in evdenceList" :key="item.id">
            <td class="color_DBE4EF">
              <!-- {{item.index}} -->
              <el-form-item>
                <el-input class='text_indent10 overflow_lins_textarea' v-model="item.index" rows="3" maxLength='90' placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td class="color_DBE4EF">
              <!-- {{item.sampleName}} -->
              <el-form-item>
                <el-input class='text_indent10 overflow_lins_textarea' v-model="item.sampleName" rows="3" maxLength='90' placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td class="color_DBE4EF">
              <!-- {{item.batchNumber}} -->
              <el-form-item>
                <el-input class='text_indent10 overflow_lins_textarea' v-model="item.batchNumber" rows="3" maxLength='90' placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td class="color_DBE4EF">
              <!-- {{item.sampleNumber}} -->
              <el-form-item>
                <el-input class='text_indent10 overflow_lins_textarea' v-model="item.sampleNumber" rows="3" maxLength='90' placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td class="color_DBE4EF">
              <!-- {{item.samplePlace}} -->
              <el-form-item>
                <el-input class='text_indent10 overflow_lins_textarea' v-model="item.samplePlace" rows="3" maxLength='90' placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <!-- <span>+</span> -->
        </table>
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
          <span>交通运输执法部门(印章)</span><br>
          <el-form-item prop="makeDate" class="pdf_datapick">
            <el-date-picker class="big_error" v-model="docData.makeDate" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="pager_input quzheng">备注：
          <el-form-item>
            <el-input class='text_indent10 overflow_lins_textarea' v-model="docData.note" rows="3" maxLength='90' placeholder="\"></el-input>
          </el-form-item>
        </div>
        <div class="notice clear">
          <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
        </div>
      </el-form>
    </div>
    <!-- 悬浮按钮 -->
    <casePageFloatBtns :pageDomId="'obtanEvidence_print'" :formOrDocData="formOrDocData" @submitData="submitData" @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>
    <!-- <el-alert title="错误提示的文案" type="error"  show-icon>
    </el-alert> -->
  </div>
</template>

<script>
import overflowInput from "@/page/caseHandle/case/modle/overflowInput.vue";
import { mixinGetCaseApiList } from "@/common/js/mixins";

import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
export default {
  components: {
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId']) },
  data() {
    return {

      docData: {
        caseNumber: '',
        // partyType: '',
        party: '',
        partyIdNo: '',
        partyAddress: '',
        partyTel: '',
        partyName: '',
        partyUnitAddress: '',
        partyUnitTel: '',
        partyManager: '',
        socialCreditCode: '',

        getEvidence: '',
        evidencePlace: '',
        evidenceDepartment: '',
        evidenceDepartmentPhone: '',
        evdenceList: [{
          index: '',
          sampleName: '',
          batchNumber: '',
          sampleNumber: '',
          samplePlace: ''
        }],
      },
      // 下表格数据
      evdenceList: [
        {
          index: '',
          sampleName: '',
          batchNumber: '',
          sampleNumber: '',
          samplePlace: ''
        },
        {
          index1: '',
          sampleName1: '',
          batchNumber1: '',
          sampleNumber1: '',
          samplePlace1: ''
        },
        {
          index2: '',
          sampleName2: '',
          batchNumber2: '',
          sampleNumber2: '',
          samplePlace2: ''
        },
        {
          index3: '',
          sampleName3: '',
          batchNumber3: '',
          sampleNumber3: '',
          samplePlace3: ''
        },
        {
          index4: '',
          sampleName4: '',
          batchNumber4: '',
          sampleNumber4: '',
          samplePlace4: ''
        },
      ],
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseDoctypeId: this.$route.params.docId, //文书类型ID
        //文书数据
        docData: "",
        status: "" //提交状态
      },
      rules: {
        caseNumber: [
          { required: true, message: '案号必须填写', trigger: 'blur' }
        ],
        caseName: [
          { required: true, message: '案由必须填写', trigger: 'blur' }
        ],
        partyType: [
          { required: true, message: '当事人类型必须填写', trigger: 'blur' }
        ],
        closeResult: [
          { required: true, message: '处理结果必须填写', trigger: 'blur' }
        ],
        closeSituation: [
          { required: true, message: '执行情况必须填写', trigger: 'blur' }
        ],
      },
      tableDatas: [],
      nameLength: 23,
      adressLength: 23,
      maxLengthOverLine: 122,
      maxLength: 23,
      value: '',
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: 'obtanEvidence_print',
      },
      isPdf: '',
      isParty: true, //当事人类型为个人
      needDealData:true,
    }
  },
  methods: {
    // 获取带入信息
    getCaseBasicInfo() {
      let data = {
        id: "2c902ae66ae2acc4016ae376f6f1007f"
      };
      let _this = this
      this.$store.dispatch("getCaseBasicInfo", data).then(
        res => {
          _this.docData = res.data;
          _this.docData.datasTotal = 0;

        },
        err => {
          console.log(err);
        }
      );
    },

    // 提交表单
    addIllegalAction() {
      console.log(this.CaseDocDataForm);
      console.log('11')
      let _this = this
      this.$refs["docForm"].validate(valid => {
        if (valid) {
          _this.$store.dispatch("addDocData", _this.CaseDocDataForm).then(
            res => {
              console.log("保存文书", res);
              // this.$emit("getAllOrgan2", this.addDepartmentForm.oid);
              _this.$message({
                type: "success",
                message: "保存成功"

              });
            },
            err => {
              console.log(err);
            }
          );
        } else {
          console.log('error submit!!');
          return false;
        }

      });

    },
    // 暂存
    save() {

    },
    // 日期变化
    dataChange() {
      if (this.docData.dataEnd && this.docData.dataStart) {
        if (this.docData.dataEnd >= this.docData.dataStart) {

        }
        else {
          this.$message.error('开始日期不能晚于结束日期');
          this.docData.dataEnd = this.docData.dataStart = undefined;
        }

      }
    },
    // 动态添加表格内容
    addTable() {
      console.log(this.tableDatas)
      let length = this.tableDatas.length;
      this.tableDatas.push({ 'index': Number(this.tableDatas[length - 1].index) + 1 });
    },
    submitData(handleType) {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: this.$route.params.url
      });
    },
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId
      };
      this.com_getDocDataByCaseIdAndDocId(data)
      console.log('docData', this.docData.evdenceList)

    },
    addDocData(handleType) {
      this.com_addDocData(handleType);
      // this.$store.dispatch("deleteTabs", this.$route.name);//关闭当前页签
      // this.$router.push({
      //   name: this.$route.params.url,
      // });
    },

    // 获取问答内容
    getQAModleInfo(edit) {
      console.log('回显', edit)
      this.qaList = JSON.parse(edit);
      if (this.qaList.length < 2) {
        this.qaList.push({})
      }
      // this.docData.QAModleInfo = edit;
    },
    overFlowEdit() { },

    //保存文书信息
    saveData(handleType) {
      this.docData.evdenceList = this.evdenceList;

      this.com_addDocData(handleType, "docForm");
    },
    submitData(handleType) {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: this.$route.params.url
      });
    },
    //是否是完成状态
    isOverStatus() {
      if (this.$route.params.docStatus == '1') {
        this.formOrDocData.showBtn = [false, false, false, false, false, false, false, false, false, true]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    },
    getDataAfter() {
      console.log('this.docData', this.docData)
    }
  },
  mounted() {
    this.getCaseBasicInfo();
    this.getDocDataByCaseIdAndDocId();
    this.isOverStatus();
  },
}
</script>

<style lang="scss">
// @import "@/assets/css/documentForm.scss";
@import "@/assets/css/caseHandle/caseDocModle.scss";
.textindent0 {
  text-indent: 0 !important;
}
</style>
