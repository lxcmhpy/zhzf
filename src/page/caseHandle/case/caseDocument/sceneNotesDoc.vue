<template>
  <div class="main">
    <div class="print_box">
      <div id="subOutputRank-print" class="print_info">
        <el-form
          :rules="rules"
          ref="docForm"
          :inline-message="true"
          :inline="true"
          :model="docData"
        >
          <div class="doc_topic">现场笔录</div>
          <div class="doc_number">案号：{{docData.caseNumber}}</div>
          <!-- <el-button @click="onSubmit('docForm')">formName</el-button> -->
          <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
            <tr>
              <td>执法地点</td>
              <td colspan="3" class="color_DBE4EF">
                <el-form-item prop="fillingPlace">
                  <el-input
                    type="textarea"
                    v-model="docData.fillingPlace"
                    v-bind:class="{ over_flow:docData.party.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    :maxlength="nameLength"
                    placeholder="\"
                  ></el-input>
                  <!-- <el-input v-model="docData.party"  @input="widthCheck($event.target, 23,$event)" maxlength="47" v-bind:class="{over_flow: isOverflow}" placeholder="\"></el-input> -->
                </el-form-item>
              </td>
              <td>执法时间</td>
              <td colspan="3">
                <el-form-item prop="enforceStartTime" class="pdf_datapick">
                  <el-date-picker
                    v-model="docData.enforceStartTime"
                    type="datetime"
                    format="yyyy年MM月dd日HH时mm分"
                    placeholder="    年  月  日  时  分"
                    style="width:235px"
                  ></el-date-picker>
                  <br />至
                  <el-time-picker
                    v-model="docData.enforceEndTime"
                    type="date"
                    format="HH时mm分"
                    placeholder="    时  分"
                    style="width:200px"
                  ></el-time-picker>
                </el-form-item>
                <!-- <el-form-item prop="enforceEndTime" class="pdf_datapick">

                </el-form-item>-->
              </td>
            </tr>
            <tr>
              <td rowspan="2">执法人员</td>
              <td colspan="2" class="color_DBE4EF">
                <el-form-item prop="staff1">
                  <!-- <el-input
                    type="textarea"
                    v-model="docData.staff1"
                    v-bind:class="{ over_flow:docData.staff1.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    :maxlength="adressLength"
                    placeholder="\"
                  ></el-input> -->
                  <el-select v-model="docData.staff1" prop="staff1" :maxLength='maxLength'>
                    <el-option v-for="(item,index) in staffList" :key="index" :value="item" :label="item"></el-option>
                  </el-select>
                </el-form-item>
              </td>
              <td rowspan="2">执法证号</td>
              <td colspan="2" class="color_DBE4EF">
                <el-form-item prop="certificateId1">
                  <!-- <el-input
                    type="textarea"
                    v-model="docData.certificateId1"
                    v-bind:class="{ over_flow:docData.certificateId2.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    :maxlength="adressLength"
                    placeholder="\"
                  ></el-input> -->
                  <el-input ref="certificateId1" clearable class="w-120" v-model="docData.certificateId1" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </td>
              <td rowspan="2">记录人</td>
              <td rowspan="2" class="color_DBE4EF">
                <el-form-item prop="recorder">
                  <el-input
                    type="textarea"
                    v-model="docData.recorder"
                    v-bind:class="{ over_flow:docData.recorder.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    :maxlength="adressLength"
                    placeholder="\"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td colspan="2" class="color_DBE4EF">
                <el-form-item prop="staff2">
                  <el-select v-model="docData.staff2" :maxLength='maxLength'  @change="changeStaff">
                    <el-option v-for="(item,index) in staffList" :key="index" :value="item" :label="item" :disabled="docData.staff1==item"></el-option>
                  </el-select>
                </el-form-item>
              </td>
              <td colspan="2" class="color_DBE4EF">
                <el-form-item prop="certificateId2">
                  <!-- <el-input
                    type="textarea"
                    v-model="docData.certificateId2"
                    v-bind:class="{ over_flow:docData.certificateId2.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    :maxlength="adressLength"
                    placeholder="\"
                  ></el-input> -->
                  <el-input v-model="docData.certificateId2" :maxLength='maxLength' placeholder="\"></el-input>

                </el-form-item>
              </td>
            </tr>
            <tr>
              <td rowspan="5">
                <p>现场</p>
                <p>人员</p>
                <p>基本</p>
                <p>情况</p>
              </td>
              <td>姓名</td>
              <td colspan="3" class="color_DBE4EF">
                <el-form-item prop="party">
                  <el-input v-model="docData.party" :maxLength="maxLength" placeholder="\"></el-input>
                </el-form-item>
              </td>
              <td>性别</td>
              <td colspan="2" class="color_DBE4EF">
                <el-form-item prop="partySex">
                  <!-- <el-input v-model="docData.partySex" :maxLength="maxLength" placeholder="\"></el-input> -->
                  <el-select v-model="docData.partySex" :maxLength="maxLength" placeholder="\">
                    <el-option value="0" label="男"></el-option>
                    <el-option value="1" label="女"></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>身份证件号</td>
              <td colspan="3" class="color_DBE4EF">
                <el-form-item prop="partyIdNo">
                  <el-input v-model="docData.partyIdNo" :maxLength="maxLength" placeholder="\"></el-input>
                </el-form-item>
              </td>
              <td>与案件关系</td>
              <td colspan="2" class="color_DBE4EF">
                <el-form-item prop="relation">
                  <!-- <el-input
                    v-model="docData.relation"
                    minlength="11"
                    :maxLength="maxLength"
                    placeholder="\"
                  ></el-input>-->
                  <el-select v-model="docData.relation" :maxLength="maxLength" placeholder="\" @change="changeRelationWithCase">
                    <el-option v-for="item in allRelationWithCase" :key="item.value" :label="item.label" :value="item.value"></el-option> 
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>单位及职务</td>
              <td colspan="3" class="color_DBE4EF">
                <el-form-item prop="partyUnitPosition">
                  <el-input
                    v-model="docData.partyUnitPosition"
                    :maxLength="maxLength"
                    placeholder="\"
                  ></el-input>
                </el-form-item>
              </td>
              <td>联系电话</td>
              <td colspan="2" class="color_DBE4EF">
                <el-form-item prop="partyTel">
                  <el-input
                    v-model="docData.partyTel"
                    minlength="11"
                    :maxLength="maxLength"
                    placeholder="\"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>联系地址</td>
              <td colspan="6" class="color_DBE4EF">
                <el-form-item prop="partyAddress">
                  <el-input
                    v-model="docData.partyAddress"
                    minlength="11"
                    :maxLength="maxLength"
                    placeholder="\"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>车船号</td>
              <td colspan="3" class="color_DBE4EF">
                <el-form-item prop="vehicleShipId">
                  <el-input v-model="docData.vehicleShipId" :maxLength="maxLength" placeholder="\"></el-input>
                </el-form-item>
              </td>
              <td>车船型</td>
              <td colspan="2" class="color_DBE4EF">
                <el-form-item prop="vehicleShipType">
                  <el-input
                    v-model="docData.vehicleShipType"
                    minlength="11"
                    :maxLength="maxLength"
                    placeholder="\"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td rowspan="11">主要内容</td>
              <td colspan="7">
                <!-- <span class="side_right" @click="overFlowEdit">
                  <el-form-item prop="illegalFacts">
                    <span class="over_topic">
                      现场情况：（如实施行政强制措施的，包括当场告知当事人采取
                      <br />行政强制措施的理由、依据以及当事人依法享有的权利、
                      <br />救济途径，听取当事人陈述、申辩情况。）
                      <br />
                    </span>

                  </el-form-item>
                </span>-->
                <!-- 多行样式 -->
                现场情况：（如实施行政强制措施的，包括当场告知当事人采取
                <br />行政强制措施的理由、依据以及当事人依法享有的权利、
                <br />救济途径，听取当事人陈述、申辩情况。）
                <div class="overflow_lins_style">
                  <div class="overflow_lins">
                    <el-form-item prop="illegalFacts">
                      <el-input
                        class="text_indent10 overflow_lins_textarea espacle"
                        type="textarea"
                        v-model="docData.illegalFacts"
                        rows="4"
                        maxlength="90"
                        placeholder="\"
                      ></el-input>
                      <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
                      <br />
                      <span class="span_bg span_bg_top" @click="overFlowEdit">&nbsp;</span>
                      <br />
                      <span class="span_bg span_bg_top" @click="overFlowEdit">&nbsp;</span>
                    </el-form-item>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td colspan="7">
                <input type="checkbox" />上述笔录我已看过。
                <input type="checkbox" />或已向我宣读过，情况属实无误。
              </td>
            </tr>
            <tr>
              <td colspan="7">
                备注：
                <el-form-item prop="note">
                  <el-input v-model="docData.note" placeholder="\" style="width:480px"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td colspan="7">
                <el-row :gutter="20">
                  <el-col :span="12">
                    执法人员签名：
                    <span class="write_line width150"></span>
                  </el-col>
                  <el-col :span="12">
                    时间：
                    <span class="write_line width150"></span>
                  </el-col>
                </el-row>
              </td>
            </tr>
          </table>
        </el-form>
      </div>
      <!-- 悬浮按钮 -->
      <!-- <div class="float-btns">
          <el-button type="success" @click="print">
            <svg t="1577706357599" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2136" width="16" height="16">
              <path d="M153.6 0h716.8v102.4H153.6zM0 153.6v614.4h153.6v256h716.8v-256h153.6V153.6z m768 768H256v-307.2h512z m153.6-563.2h-153.6V256h153.6z" p-id="2137" fill="#FFFFFF"></path>
            </svg>
            <br>
            打印
          </el-button>
          <el-button type="success">
            <svg t="1577706400265" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3033" width="16" height="16">
              <path d="M946.176 896a34.304 34.304 0 0 1 0 68.608H77.824a34.304 34.304 0 0 1 0-68.608h868.352z m0-622.08L401.92 818.176 189.44 839.68l21.504-211.968 473.088-473.088 71.168-71.168c31.744-31.744 87.552-31.744 119.296 0l71.168 71.168c15.872 15.872 24.576 37.376 24.576 59.904 0.512 22.016-8.192 43.52-24.064 59.392zM266.24 762.88l103.936-10.752 431.616-431.616-93.696-93.696L276.48 658.432 266.24 762.88zM815.104 127.488c-4.096 0-8.192 1.536-11.264 4.608l-46.592 46.592 93.696 93.696 46.592-46.592c6.144-6.144 6.144-16.384 0-22.528l-71.168-71.168c-3.072-3.072-7.168-4.608-11.264-4.608z" p-id="3034" fill="#FFFFFF"></path>
            </svg>
            <br>
            编辑
          </el-button>
          <el-button type="success" @click="makeSeal">
            <svg t="1577706320726" class="icon" viewBox="0 0 1052 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1274" width="16" height="16">
              <path d="M615.822222 597.674667c-20.48-18.744889-33.194667-48.981333-33.194666-77.539556 0-27.107556 11.52-51.683556 30.208-70.115555a1.905778 1.905778 0 0 1 0.483555-0.227556c6.314667-6.229333 13.454222-11.776 21.248-16.412444a162.872889 162.872889 0 0 0 54.812445-121.571556c0-91.079111-75.121778-164.892444-167.822223-164.892444-92.728889 0-167.879111 73.813333-167.879111 164.892444 0 48.184889 21.219556 91.477333 54.840889 121.571556 7.822222 4.636444 14.904889 10.183111 21.276445 16.412444a0.995556 0.995556 0 0 1 0.341333 0.170667c18.830222 18.488889 30.293333 43.064889 30.293333 70.172444 0 28.558222-12.714667 58.794667-33.166222 77.539556h-246.613333c-13.368889 0-24.206222 10.609778-24.206223 23.665777v152.092445h730.168889v-152.092445a23.893333 23.893333 0 0 0-24.177777-23.665777h-246.613334z m-407.210666 227.271111H834.56v52.138666H208.611556v-52.138666z" fill="#FFFFFF" p-id="1275"></path>
            </svg>
            <br>
            签章
          </el-button>
          <el-button type="primary" @click="addDocData(1)">
            <svg t="1577414377979" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1726" width="16" height="16">
              <path d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z" p-id="1727" fill="#FFFFFF"></path>
            </svg><br>
            提交
          </el-button>
      </div>-->
      <casePageFloatBtns
        :pageDomId="'subOutputRank-print'"
        :formOrDocData="formOrDocData"
        @submitData="submitData"
        @saveData="saveData"
        @backHuanjie="submitData"
      ></casePageFloatBtns>
      <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput>
    </div>
  </div>
</template>
<script>
import overflowInput from "../pdf/overflowInput";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
// 验证规则
import { validatePhone, validateIDNumber } from "@/common/js/validator";

export default {
  components: {
    overflowInput
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  components: {
    casePageFloatBtns
  },
  data() {
    var validatePhone = (rule, value, callback) => {
      var reg = /^1(3|4|5|6|7|8)\d{9}$/;
      if (!reg.test(value) && value) {
        // this.$alert('手机号格式错误')
        // this.$message('手机号格式错误')
        this.$notify.error({
          title: "错误",
          message: "手机号格式错误"
        });
        // callback(new Error('手机号格式错误'));
      }
      callback();
    };
    return {
      // overFlowEditList:[{},{}],
      isOverflow: false,
      isOverLine: false,
      docData: {
        caseNumber: "",
        fillingPlace: "",
        enforceStartTime: "",
        enforceEndTime: "",
        recorder: "",
        party: "",
        partySex: "",
        partyIdNo: "",
        relation: "",
        partyUnitPosition: "",
        partyTel: "",
        partyAddress: "",
        vehicleShipId: "",
        vehicleShipType: "",
        illegalFacts: "",
        checkBox: "",
        partySign: "",
        partySignTime: "",
        note: "",
        staffSign: "",
        staff1: "",
        staff2: "",
        certificateId1: "",
        certificateId2: ""
      },
      rules: {
        fillingPlace: [{ required: true, message: "请输入", trigger: "blur" }],
        enforceStartTime: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        enforceEndTime: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        staff1: [
          { required: true, message: "请输入", trigger: "change" }
        ],
        certificateId11: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        staff2: [
          { required: true, message: "请输入", trigger: "change" }
        ],
        certificateId12: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        partyTel: [{ validator: validatePhone, trigger: "blur" }],
        partyIdNo: [{ validator: validateIDNumber, trigger: "blur" }],
        party: [{ required: true, message: "请输入", trigger: "blur" }],
        punishLaw: [{ required: true, message: "请输入", trigger: "blur" }],
        socialCreditCode: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        illegalFactsEvidence: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        reconsiderationOrgan: [
          { required: true, message: "请输入", trigger: "blur" }
        ]
      },
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseDoctypeId: this.$route.params.docId, //文书类型ID
        //文书数据
        docData: "",
        status: "" //提交状态
      },
      handleType: "", // 0 暂存  1  提交
      dictId: "2dc1e0a3a8ce225c292259da39294847",
      options: [],
      nameLength: 23,
      adressLength: 23,
      maxLength: 23,
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
        pageDomId: "subOutputRank-print",
      },
      staffList:[],
      allRelationWithCase: [
        //与案件关系下拉框
        { value: "0", label: "当事人" },
        { value: "1", label: "驾驶人" },
        { value: "2", label: "实际所有者" },
        { value: "3", label: "证人" },
        { value: "4", label: "承运人" },
        { value: "5", label: "代理人" }
      ],

    };
  },
  computed: { ...mapGetters(["caseId"]) },
  mixins: [mixinGetCaseApiList],
  inject: ["reload"],
  components: {
    overflowInput,
    casePageFloatBtns
  },
  methods: {
    // widthCheck(str, len, event) {
    //   console.log('event,', event)
    //   console.log('str,', str, '  len:', len)
    //   if (event.length > len) {
    //     this.isOverflow = true
    //   } else
    //     this.isOverflow = false
    //   if (event.length > 40) {
    //     this.isOverLine = true
    //     console.log('overline', this.isOverLine)
    //   }
    // },
    // onSubmit(formName) {
    //   console.log('submit!');
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert('submit!');
    //     } else {
    //       console.log('error submit!!');
    //       return false;
    //     }
    //   });
    // },
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
    // 多行编辑
    overFlowEdit() {
      this.$refs.overflowInputRef.showModal(0, "");
    },
    // 获取多行编辑内容
    getOverFloeEditInfo(edit) {
      this.docData.illegalFactsEvidence = edit;
    },
    setStaffAndCertificateId() {
      // console.log('this.docData',this.docData)
      // let staffStr = this.docData.staff;
      // let staffArr = staffStr.split(",");
      // let staffcertificateIdArr = this.docData.certificateId.split(",");
      // this.docData.staff1 = staffArr[0];
      // this.docData.staff2 = staffArr[1];
      // this.docData.certificateId1 = staffcertificateIdArr[0];
      // this.docData.certificateId2 = staffcertificateIdArr[1];
      // this.docData.recorder = staffArr[0];
      this.staffList=this.docData.staff.split(',');
      this.docData.staff1 = this.docData.staff.split(',')[0];
      this.docData.certificateId1 = this.docData.certificateId.split(',')[0];
      this.docData.relation = "0";
    },
    //修改人员
    changeStaff(val){
      let staffIndex = this.docData.staff.split(',').indexOf(val);
      this.docData.certificateId2 = this.docData.certificateId.split(',')[staffIndex];
      console.log(staffIndex);
    },
    changeRelationWithCase(val){
      // if(val){
      //   this.docData.party = '';
      // }else{
      //   this.docData.xianChangPeople = this.docData.party;
      //   this.xianChangPeopleSex = this.docData.partySex
      // }
    }
  },
  mounted() {
    this.getDocDataByCaseIdAndDocId();
    this.isOverStatus();
  }
};
</script>
<style lang="scss">
@import "@/assets/css/caseHandle/caseDocModle.scss";
.espacle {
  textarea {
    min-height: 114px !important;
    line-height: 38px !important;
    margin-top: -11px !important;
    text-indent: 0px !important;
  }
}
// #subOutputRank-print .el-date-editor--datetime{
//   width: 200px;
// }
</style>
