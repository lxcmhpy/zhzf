<template>
  <div class="print_box">
    <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
      <div class="print_info" style="height: 1200px" id="adminCoerciveMeasureApproval_print">
        <div class="doc_topic">行政强制措施审批表</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <table
          class="print_table prolong_table"
          border="1"
          bordercolor="black"
          width="100%"
          cellspacing="0"
        >
          <tr>
            <td rowspan="6">
              当
              <br />事
              <br />人
            </td>
            <td rowspan="2">个人</td>
            <td colspan="2">姓名</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="party"
                :rules="fieldRules('party',propertyFeatures['party'],'',isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="docData.party"
                  v-bind:class="{ over_flow:docData.party.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['party'])"
                  placeholder="/"
                ></el-input>
                <!-- <el-input v-model="docData.party"  @input="widthCheck($event.target, 23,$event)" maxlength="47" v-bind:class="{over_flow: isOverflow}" placeholder="/"></el-input> -->
              </el-form-item>
            </td>
            <td colspan="2">身份证件号</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="partyIdNo"
                :rules="fieldRules('partyIdNo',propertyFeatures['partyIdNo'],validateIDNumber,isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="docData.partyIdNo"
                  :maxLength="18"
                  placeholder="/"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyIdNo'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2">住址</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="partyAddress"
                :rules="fieldRules('partyAddress',propertyFeatures['partyAddress'],'',isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="docData.partyAddress"
                  v-bind:class="{ over_flow:docData.partyAddress.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  maxlength="30"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyAddress'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
            <td colspan="2">联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="partyTel"
                :rules="fieldRules('partyTel',propertyFeatures['partyTel'],validatePhone,isParty)"
              >
                <el-input
                  v-model="docData.partyTel"
                  maxlength="11"
                  placeholder="/"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyTel'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="4">单位</td>
            <td colspan="2">名称</td>
            <td colspan="6" class="color_DBE4EF">
              <el-form-item
                prop="partyName"
                :rules="fieldRules('partyName',propertyFeatures['partyName'],'',!isParty)"
              >
                <el-input
                  v-model="docData.partyName"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyName'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2">地址</td>
            <td colspan="6" class="color_DBE4EF">
              <el-form-item
                prop="partyUnitAddress"
                :rules="fieldRules('partyUnitAddress',propertyFeatures['partyUnitAddress'],'',!isParty)"
              >
                <el-input
                  v-model="docData.partyUnitAddress"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitAddress'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2">联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="partyUnitTel"
                :rules="fieldRules('partyUnitTel',propertyFeatures['partyUnitTel'],validatePhone,!isParty)"
              >
                <el-input
                  v-model="docData.partyUnitTel"
                  minlength="11"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitTel'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
            <td colspan="2">法定代表人</td>
            <td class="color_DBE4EF" colspan="2">
              <el-form-item
                prop="partyManager"
                :rules="fieldRules('partyManager',propertyFeatures['partyManager'],'',!isParty)"
              >
                <el-input
                  v-model="docData.partyManager"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyManager'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="3">统一社会信用代码</td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item
                prop="socialCreditCode"
                :rules="fieldRules('socialCreditCode',propertyFeatures['socialCreditCode'],'',!isParty)"
              >
                <el-input
                  v-model="docData.socialCreditCode"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['socialCreditCode'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="2">
              <p>案件</p>
              <p>基本</p>
              <p>情况</p>
            </td>
            <td rowspan="2" colspan="9" class="color_DBE4EF">
              <el-form-item
                prop="caseSituation"
                :rules="fieldRules('caseSituation',propertyFeatures['caseSituation'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.caseSituation"
                  v-bind:class="{ over_flow:docData.caseSituation && docData.caseSituation.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 5}"
                  maxlength="200"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['caseSituation'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td rowspan="2">
              <p>承办人意见</p>
            </td>
            <td rowspan="2" colspan="9" class="color_DBE4EF">
              <p>
                &nbsp;&nbsp;根据
                <span>
                  <el-form-item
                    prop="illegalLaw"
                    :rules="fieldRules('illegalLaw',propertyFeatures['illegalLaw'])"
                    style="width: 70%;"
                  >
                    <el-select
                      v-model="docData.illegalLaw"
                      :maxLength="maxLength"
                      :disabled="fieldDisabled(propertyFeatures['illegalLaw'])"
                    >
                      <el-option
                        v-for="item in laWOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </span>规定，拟采取以下强制措施：
              </p>
              <div class="text-left">
                <el-form-item
                  prop="checkBox"
                  :rules="fieldRules('checkBox',propertyFeatures['checkBox'])"
                >
                  <el-checkbox-group
                    v-model="docData.checkBox"
                    :max="1"
                    :disabled="fieldDisabled(propertyFeatures['checkBox'])"
                  >
                    <p>
                      <el-checkbox label="1">扣押财物</el-checkbox>
                    </p>
                    <p>
                      <el-checkbox label="2">查封场所、设施或者财物</el-checkbox>
                    </p>
                    <p>
                      <el-checkbox label="3">其他行政强制措施：</el-checkbox>
                    </p>
                  </el-checkbox-group>
                </el-form-item>
              </div>
              <p>
                自
                <span>
                  <el-form-item
                    prop="measureStartDate"
                    :rules="fieldRules('measureStartDate',propertyFeatures['measureStartDate'])"
                    style="width: 150px"
                    class="pdf_datapick"
                  >
                    <el-date-picker
                      v-model="docData.measureStartDate"
                      @blur="starttime"
                      type="date"
                      format="yyyy年MM月dd日"
                      value-format="yyyy-MM-dd"
                      placeholder="  年  月  日"
                      :disabled="fieldDisabled(propertyFeatures['measureStartDate'])"
                    ></el-date-picker>
                  </el-form-item>
                </span>
                <span>至</span>
                <span>
                  <el-form-item
                    prop="measureEndDate"
                    :rules="fieldRules('measureEndDate',propertyFeatures['measureEndDate'])"
                    style="width: 150px"
                    class="pdf_datapick"
                  >
                    <el-date-picker
                      v-model="docData.measureEndDate"
                      @blur="endtime"
                      type="date"
                      format="yyyy年MM月dd日"
                      value-format="yyyy-MM-dd"
                      placeholder="  年  月  日"
                      :disabled="fieldDisabled(propertyFeatures['measureEndDate'])"
                    ></el-date-picker>
                  </el-form-item>
                </span>
                共
                <el-input style="width:10%" type="number" v-model="docData.days"></el-input>日
              </p>
              {{docData.approveOpinions}}
              <div class="pdf_seal">
                <p>签名：{{docData.approvePeo}}</p>
                <p>
                  <span v-if="docData.approveTime">{{docData.approveTime}}</span>
                  <span v-else>年 月 日</span>
                </p>
              </div>
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td rowspan="2">
              <p>承办机构意见</p>
            </td>
            <td rowspan="2" colspan="9" class="color_DBE4EF">
              {{docData.secondApproveOpinions}}
              <div class="pdf_seal">
                <p>签名：{{docData.secondApprovePeo}}</p>
                <p>
                  <span v-if="docData.secondApproveTime">{{docData.secondApproveTime}}</span>
                  <span v-else>年 月 日</span>
                </p>
              </div>
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td rowspan="2">
              <p>法制审核机构意见</p>
            </td>
            <td rowspan="2" colspan="9" class="color_DBE4EF">
              {{docData.fourApproveOpinions}}
              <div class="pdf_seal">
                <p>签名：{{docData.fourApprovePeo}}</p>
                <p>
                  <span v-if="docData.fourApproveTime">{{docData.fourApproveTime}}</span>
                  <span v-else>年 月 日</span>
                </p>
              </div>
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td rowspan="2">
              <p>行政机关负责人意见</p>
            </td>
            <td rowspan="2" colspan="9" class="color_DBE4EF">
              {{docData.threeApproveOpinions}}
              <div class="pdf_seal">
                <p>签名：{{docData.threeApprovePeo}}</p>
                <p>
                  <span v-if="docData.threeApproveTime">{{docData.threeApproveTime}}</span>
                  <span v-else>年 月 日</span>
                </p>
              </div>
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td>
              <p>备注</p>
            </td>
            <td colspan="9" class="color_DBE4EF">
              <span>
                <el-form-item prop="notes">
                  <el-input
                    type="textarea"
                    v-model="docData.notes"
                    v-bind:class="{ over_flow:docData.notes.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    :maxlength="200"
                    placeholder="/"
                  ></el-input>
                </el-form-item>
              </span>
            </td>
          </tr>
        </table>
      </div>
    </el-form>
    <casePageFloatBtns
      :pageDomId="'adminCoerciveMeasureApproval_print'"
      :formOrDocData="formOrDocData"
      @saveData="saveData"
    ></casePageFloatBtns>
  </div>
</template>
<script>
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import { validatePhone, validateIDNumber } from "@/common/js/validator";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
export default {
  components: {
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  data() {
    //起止期限日期验证
    var validateIfDate = (rule, value, callback) => {
      var diff =
        new Date(value).getTime() -
        new Date(this.docData.measureStartDate).getTime();
      var days = diff / 24 / 60 / 60 / 1000;
      console.log("差几天", days);
      if (days > 30) {
        return callback("措施起止期限不得超过30日");
      }
      if (days <= 0) {
        return callback("措施起止期限不得为同一天");
      }
      callback();
    };
    return {
      validatePhone: validatePhone,
      validateIDNumber: validateIDNumber,
      isOverflow: false,
      docData: {
        caseNumber: "",
        caseName: "",
        party: "",
        partyIdNo: "",
        partyAddress: "",
        partyTel: "",
        partyName: "",
        partyUnitAddress: "",
        partyUnitTel: "",
        partyManager: "",
        socialCreditCode: "",
        caseSituation: "",
        illegalLaw: "",
        measureStartDate: "",
        measureEndDate: "",
        notes: "",
        checkBox: [],
        approveOpinions: "",
        approvePeo: "",
        approveTime: "",
        secondApproveOpinions: "",
        secondApprovePeo: "",
        secondApproveTime: "",
        threeApproveOpinions: "",
        threeApprovePeo: "",
        threeApproveTime: "",
        fourApproveOpinions: "",
        fourApprovePeo: "",
        fourApproveTime: "",
        days:"",
      },
      isParty: false,
      handleType: 0, //0  暂存   1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseDoctypeId: this.$route.params.docId, //文书类型ID
        docData: "",
        status: "", //提交状态
        linkTypeId: this.$route.params.caseLinkTypeId //所属环节的id
      },
      laWOptions: [
        {
          value: "1",
          label: "《中华人民共和国强制法》第二十四条"
        }
      ],
      rules: {
        party: [
          { required: true, message: "当事人姓名不能为空", trigger: "blur" }
        ],
        partyIdNo: [
          {
            required: true,
            message: "当事人身份证件号不能为空",
            trigger: "blur"
          }
        ],
        partyAddress: [
          { required: true, message: "当事人联系地址不能为空", trigger: "blur" }
        ],
        partyTel: [
          {
            required: true,
            message: "当事人联系电话不能为空",
            trigger: "blur"
          },
          { validator: validatePhone, trigger: "blur" }
        ],
        partyName: [
          { required: true, message: "单位名称不能为空", trigger: "blur" }
        ],
        partyUnitAddress: [
          { required: true, message: "单位地址不能为空", trigger: "blur" }
        ],
        partyUnitTel: [
          { required: true, message: "单位联系电话不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        partyManager: [
          { required: true, message: "法人不能为空", trigger: "blur" }
        ],
        socialCreditCode: [
          {
            required: true,
            message: "单位统一社会信用代码不能为空",
            trigger: "blur"
          }
        ],
        caseSituation: [
          { required: true, message: "基本情况不能为空", trigger: "blur" }
        ],
        illegalLaw: [
          { required: true, message: "法律条款不能为空", trigger: "blur" }
        ],
        measureStartDate: [
          {
            required: true,
            message: "强制措施开始时间不能为空",
            trigger: "blur"
          }
        ],
        measureEndDate: [
          {
            required: true,
            message: "强制措施结束时间不能为空",
            trigger: "blur"
          },
          { validator: validateIfDate, trigger: "blur" }
        ]
      },
      nameLength: 23,
      adressLength: 23,
      maxLength: 23,
      lineStyleFlag: false,
      approval: this.$route.params.isApproval ? true : false, //   是否是审批人员进入
      formOrDocData: {
        showBtn: [
          false,
          true,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        ], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        pageDomId: "adminCoerciveMeasureApproval_print"
      },
      needDealData:true,
      approvalOver: false, //审核完成
      propertyFeatures: ""
    };
  },
  methods: {
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId
      };
      console.log(data);
      this.com_getDocDataByCaseIdAndDocId(data);
    },
    //保存文书信息
    saveData(handleType) {
      // this.printContent()
      this.com_addDocData(handleType, "docForm");
    },
    //是否是完成状态
    isOverStatus() {
      if (this.$route.params.docStatus == "1") {
        this.formOrDocData.showBtn = [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true
        ]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    },
    getDataAfter(){
      if(this.docData.measureStartDate=='' && this.docData.measureEndDate  ==''){
          this.docData.days  = "";
      }else{
          this.docData.days = new Date(this.docData.measureEndDate) - new Date(this.docData.measureStartDate);
          this.docData.days = Math.abs(this.docData.days)
          // 除以一天的毫秒数（默认时间戳是到毫秒的，就算取到秒级的时间戳后面也带了3个0）
          this.docData.days = this.docData.days / (24 * 3600 * 1000);
          // 取整
          this.docData.days = Math.floor(this.docData.days) ;
      }
    },
    starttime(){
      console.log('案发时间=='+this.docData.lasj)
      if (Date.parse(this.docData.measureStartDate) < Date.parse(this.docData.lasj)) {
        this.$message({
          message: '开始时间不得小于立案时间',
          type: 'warning'
        });
        this.docData.measureStartDate = '';
        return;
      }
      if (this.docData.measureStartDate){
        if(this.docData.measureStartDate > this.docData.measureEndDate && this.docData.measureEndDate){
          this.$message({
            message: '开始时间不能大于结束时间',
            type: 'warning'
          });
          this.docData.measureStartDate = '';
          this.docData.days = '';
        }else{
          this.docData.days = new Date(this.docData.measureEndDate) - new Date(this.docData.measureStartDate);
          this.docData.days = Math.abs(this.docData.days)
          // 除以一天的毫秒数（默认时间戳是到毫秒的，就算取到秒级的时间戳后面也带了3个0）
          this.docData.days = this.docData.days / (24 * 3600 * 1000);
          // 取整
          this.docData.days = Math.floor(this.docData.days) ;
          this.$set(this.docData, 'days',  this.docData.days);
        }
      }
    },
    endtime(){
      if (this.docData.measureStartDate){
        if(this.docData.measureStartDate > this.docData.measureEndDate){
          this.$message({
            message: '结束时间不能小于开始时间',
            type: 'warning'
          });
          this.docData.measureEndDate = '';
          this.docData.days = '';
        }else{
          console.log('时间',this.docData.measureStartDate,this.docData.measureEndDate)
          this.docData.days = new Date(this.docData.measureEndDate) - new Date(this.docData.measureStartDate);
          this.docData.days = Math.abs(this.docData.days)
          console.log('this.docData.measureEndDate',this.docData.measureEndDate)
          // 除以一天的毫秒数（默认时间戳是到毫秒的，就算取到秒级的时间戳后面也带了3个0）
          this.docData.days = this.docData.days / (24 * 3600 * 1000);
          // 取整
          this.docData.days = Math.floor(this.docData.days) ;

          this.$set(this.docData, 'days',  this.docData.days);
          // 有问题，第一次点击不回显
          console.log("timestamp", this.docData.days)

        }
      }
    },
  },
  mounted() {
    this.starttime();
  },
  created(){
    this.getDocDataByCaseIdAndDocId();
    this.isOverStatus();
  }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">
.prolong_table {
  table-layout: fixed;
  td,
  p,
  span,
  .el-checkbox {
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
  }
}
</style>
