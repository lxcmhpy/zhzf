<template>
  <div class="print_box">
    <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
      <div class="print_info" style="height: 1200px" id="adminCoerciveMeasureApproval_print">
        <div class="doc_topic">重大行政处罚法制审核意见书</div>
        <div class="doc_number">
             <!-- 案号：{{docData.caseNumber}} -->
        </div>
        <table
          class="print_table prolong_table"
          border="1"
          bordercolor="black"
          width="100%"
          cellspacing="0"
        >
        <tr>
            <td>执法部门</td>
            <td colspan="2">
                <el-form-item
                prop="organName"
                :rules="fieldRules('organName',propertyFeatures['organName'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.organName"
                  v-bind:class="{ over_flow:docData.organName.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['organName'])"
                ></el-input>
              </el-form-item>
            </td>
        </tr>
        <tr>
            <td>案由</td>
            <td colspan="2">
                <el-form-item
                prop="party"
                :rules="fieldRules('caseName',propertyFeatures['caseName'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.caseName"
                  v-bind:class="{ over_flow:docData.caseName.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['caseName'])"
                ></el-input>
              </el-form-item>
            </td>
        </tr>
        <tr>
            <td>案号</td>
            <td colspan="2">
                <el-form-item
                prop="caseNumber"
                :rules="fieldRules('caseNumber',propertyFeatures['caseNumber'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.caseNumber"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['caseNumber'])"
                ></el-input>
              </el-form-item>
            </td>
        </tr>
        <tr>
            <td>案件承办人员</td>
            <td colspan="2">
                <el-form-item
                prop="staffs"
                :rules="fieldRules('staffs',propertyFeatures['staffs'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.staffs"
                  v-bind:class="{ over_flow:docData.staffs.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['staffs'])"
                ></el-input>
              </el-form-item>
            </td>
        </tr>
        <tr>
            <td >执法部门处理意见</td>
            <td colspan="2">
                <el-form-item
                prop="organOpinoin"
                :rules="fieldRules('organOpinoin',propertyFeatures['organOpinoin'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.organOpinoin"
                  v-bind:class="{ over_flow:docData.organOpinoin.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['organOpinoin'])"
                ></el-input>
              </el-form-item>
            </td>
        </tr>
        <tr>
            <td rowspan="11">审核内容</td>
            <td>是否属于重大行政处罚法制审核范围</td>
            <td>
                <el-form-item
                prop="belong1"
                :rules="fieldRules('belong1',propertyFeatures['belong1'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.belong1"
                  v-bind:class="{ over_flow:docData.belong1.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['belong1'])"
                ></el-input>
              </el-form-item>
            </td>
        </tr>
        <tr>
            <td>执法主体是否合法</td>
            <td>
                <el-form-item
                prop="belong2"
                :rules="fieldRules('belong2',propertyFeatures['belong2'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.belong2"
                  v-bind:class="{ over_flow:docData.belong2.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['belong2'])"
                ></el-input>
              </el-form-item>
            </td>
        </tr>
        <tr>
            <td>行政执法人员是否具有执法资格</td>
            <td>
                <el-form-item
                prop="belong3"
                :rules="fieldRules('belong3',propertyFeatures['belong3'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.belong3"
                  v-bind:class="{ over_flow:docData.belong3.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['belong3'])"
                ></el-input>
              </el-form-item>
            </td>
        </tr>
        <tr>
            <td>执法程序是否合法</td>
            <td>
                <el-form-item
                prop="belong4"
                :rules="fieldRules('belong4',propertyFeatures['belong4'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.belong4"
                  v-bind:class="{ over_flow:docData.belong4.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['belong4'])"
                ></el-input>
              </el-form-item>
            </td>
        </tr>
        <tr>
            <td>案件事实是否清楚</td>
            <td>
                <el-form-item
                prop="belong5"
                :rules="fieldRules('belong5',propertyFeatures['belong5'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.belong5"
                  v-bind:class="{ over_flow:docData.belong5.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['belong5'])"
                ></el-input>
              </el-form-item>
            </td>
        </tr>
        <tr>
            <td>证据是否合法充分</td>
            <td>
                <el-form-item
                prop="belong6"
                :rules="fieldRules('belong6',propertyFeatures['belong6'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.belong6"
                  v-bind:class="{ over_flow:docData.belong6.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['belong6'])"
                ></el-input>
              </el-form-item>
            </td>
        </tr>
        <tr>
            <td>适用法律是否正确</td>
            <td>
                <el-form-item
                prop="belong7"
                :rules="fieldRules('belong7',propertyFeatures['belong7'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.belong7"
                  v-bind:class="{ over_flow:docData.belong7.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['belong7'])"
                ></el-input>
              </el-form-item>
            </td>
        </tr>
        <tr>
            <td>裁量基准是否适当</td>
            <td>
                <el-form-item
                prop="belong8"
                :rules="fieldRules('belong8',propertyFeatures['belong8'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.belong8"
                  v-bind:class="{ over_flow:docData.belong8.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['belong8'])"
                ></el-input>
              </el-form-item>
            </td>
        </tr>
        <tr>
            <td>是否超越法定权限</td>
            <td>
                <el-form-item
                prop="belong9"
                :rules="fieldRules('belong9',propertyFeatures['belong9'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.belong9"
                  v-bind:class="{ over_flow:docData.belong9.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['belong9'])"
                ></el-input>
              </el-form-item>
            </td>
        </tr>
        <tr>
            <td>文书是否规范、完备</td>
            <td>
                <el-form-item
                prop="belong10"
                :rules="fieldRules('belong10',propertyFeatures['belong10'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.belong10"
                  v-bind:class="{ over_flow:docData.belong10.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['belong10'])"
                ></el-input>
              </el-form-item>
            </td>
        </tr>
        <tr>
            <td>违法行为是否涉嫌犯罪、需要移送司法机关</td>
            <td>
                <el-form-item
                prop="belong11"
                :rules="fieldRules('belong11',propertyFeatures['belong11'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.belong11"
                  v-bind:class="{ over_flow:docData.belong11.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['belong11'])"
                ></el-input>
              </el-form-item>
            </td>
        </tr>
        <tr>
            <td>审核结论</td>
            <td colspan="2">
                <el-form-item
                prop="checkOpinoin"
                :rules="fieldRules('checkOpinoin',propertyFeatures['checkOpinoin'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.checkOpinoin"
                  v-bind:class="{ over_flow:docData.checkOpinoin.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['checkOpinoin'])"
                ></el-input>
              </el-form-item>
            </td>
        </tr>
        <tr>
            <td rowspan="2">
              <p>审核人员签名</p>
            </td>
            <td rowspan="2" colspan="2" class="color_DBE4EF">
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
              <p>法制工作机构</p>
            </td>
            <td rowspan="2" colspan="2" class="color_DBE4EF">
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
import iLocalStroage from "@/common/js/localStroage";

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
        organName:'',
        caseNumber: "",
        caseName: "",
        staffs:'',
        organOpinoin:'',
        belong1:'',
        belong2:'',
        belong3:'',
        belong4:'',
        belong5:'',
        belong6:'',
        belong7:'',
        belong8:'',
        belong9:'',
        belong10:'',
        belong11:'',
        checkOpinoin:'',
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
        organName: [
          { required: true, message: "执法机构不能为空", trigger: "blur" },
        ],
        caseName: [
          { required: true, message: "案由不能为空", trigger: "blur" },
        ],
        staffs: [
          { required: true, message: "案由不能为空", trigger: "blur" },
        ],
        organOpinoin: [
          { required: true, message: "执法部门处理意见不能为空", trigger: "blur" },
        ],
        belong1: [
          { required: true, message: "是否属于重大行政处罚法制审核范围不能为空", trigger: "blur" },
        ],
        belong2: [
          { required: true, message: "执法主体是否合法不能为空", trigger: "blur" },
        ],
        belong3: [
          { required: true, message: "行政执法人员是否具有执法资格不能为空", trigger: "blur" },
        ],
        belong4: [
          { required: true, message: "执法程序是否合法不能为空", trigger: "blur" },
        ],
        belong5: [
          { required: true, message: "案件事实是否清楚不能为空", trigger: "blur" },
        ],
        belong11: [
          { required: true, message: "违法行为是否涉嫌犯罪、需要移送司法机关不能为空", trigger: "blur" },
        ],
        belong6: [
          { required: true, message: "证据是否合法充分不能为空", trigger: "blur" },
        ],
        belong7: [
          { required: true, message: "适用法律是否正确不能为空", trigger: "blur" },
        ],
        belong8: [
          { required: true, message: "裁量基准是否适当不能为空", trigger: "blur" },
        ],
        belong9: [
          { required: true, message: "是否超越法定权限不能为空", trigger: "blur" },
        ],
        belong10: [
          { required: true, message: "文书是否规范、完备不能为空", trigger: "blur" },
        ],
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
      this.docData.organName = iLocalStroage.gets("userInfo").organName;
    }
  },
  mounted() {
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
