<template>
  <div class="print_box">
    <div class="print_info">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">责令改正违法行为通知书</div>
        <div class="doc_number">案号：{{formData.caseNumber}}</div>
        <p class="side_right_indent">
          当事人（个人姓名或单位名称）：
          <el-form-item prop="party">
              <el-input type='textarea' v-model="formData.party"  v-bind:class="{ over_flow:formData.party.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength'></el-input>
              <!-- <el-input v-model="docData.illegalLaw" :maxLength='maxLength' :maxLength='maxLength'></el-input> -->
          </el-form-item>
        </p>
        <p class="side_right_indent">
          <!-- <span class="side_left">违法事实及依据：</span> -->
          <span class="side_right" @click="overFlowEdit">
            <el-form-item prop="illegalFact">
              <span class="over_topic">经调查，你（单位）存在下列违法事实：</span>{{formData.illegalFact}}
            </el-form-item>
          </span>
          <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
          <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
          <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
          <!-- <span class="span_bg">{{docData.illegalFactsEvidence}}</span> -->
        </p>
        <p>根据<span>
            <el-form-item prop="punishLaw">
              <el-input type='textarea' v-model="formData.punishLaw"  v-bind:class="{ over_flow:docData.party.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength'></el-input>
            </el-form-item>
          </span>的规定，现责令你（单位）
          <p>
            <input type="checkbox">立即予以改正。
          </p>
          <p>
            <input type="checkbox">在<el-form-item prop="makeDate" class="pdf_datapick">
              <el-date-picker v-model="formData.makeDate" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日">
              </el-date-picker>
            </el-form-item>前改正或者整改完毕。
          </p>
          <p>
            如果不服本处罚决定，可以在六十日内依法向<span>
              <el-form-item prop="reconsiderationOrgan">
                <el-input v-model="formData.reconsiderationOrgan" :maxLength='maxLength'></el-input>
              </el-form-item>
            </span>申请行政复议，或者在六个月内依法向<span>
              <el-form-item prop="litigationOrgan">
                <el-input v-model="formData.litigationOrgan" :maxLength='maxLength'></el-input>
              </el-form-item>
            </span>人民法院提起行政诉讼。
          </p>
          <br>
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
              <el-date-picker v-model="formData.correctTime" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="notice clear">
            <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
          </div>
      </el-form>
    </div>
    <!-- 悬浮按钮 -->
    <div class="float-btns">
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
      <el-button type="primary" @click="addDocData">
        <svg t="1577414377979" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1726" width="16" height="16">
          <path d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z" p-id="1727" fill="#FFFFFF"></path>
        </svg><br>
        提交
      </el-button>
    </div>
    <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput>
  </div>
</template>

<script>
import { mixinGetCaseApiList } from "@/js/mixins";
import { mapGetters } from "vuex";
import overflowInput from "../modle/overflowInput";
export default {
  data() {
    return {
      isOverflow: false,
      isOverLine: false,
      formData: {
        caseNumber:'',
        party: '',
        illegalFact:'',
        punishLaw: "",
        correctTime: "",
        reconsiderationOrgan: "",
        litigationOrgan: "",
        partySign:'',
        staffSign:'',
        makeDate: "",
        checkBox:''
      },
      rules: {
        party: [
          { required: true, message: "当事人姓名必须填写", trigger: blur }
        ]
      },
      //提交方式
      handleType: 0, //0  暂存     1 提交
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId:'', //案件id
        caseLinktypeId: '', //表单类型ID           
        //表单数据
        formData: "",
        status: ""
      },
    };
  },
  mixins:[mixinGetCaseApiList],
  computed:{...mapGetters(['caseId'])},
  components: {
    overflowInput,
  },
  methods: {
    // 多行编辑
    overFlowEdit() {
      let maxlength= 122;
      this.$refs.overflowInputRef.showModal(0, '',maxlength);
    },
    // 获取多行编辑内容
    getOverFloeEditInfo(edit) {
      this.docData.illegalFactsEvidence = edit;
    },
    //加载表单信息
    setFormData(){
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(this.caseLinkDataForm.caseBasicinfoId,this.caseLinkDataForm.caseLinktypeId,'form');
    },
    addFormData(handleType) {
      //参数  提交类型 、formRef  、 跳转的pdf路由name
      // this.com_submitCaseForm(handleType,'illegalActionForm','illegalActionPdf');
      this.com_submitCaseForm(handleType, 'illegalActionForm', false);
    }
  },
  created() {
    // this.setFormData();
  }
};
</script>
<style lang="less">
@import "../../../../css/caseHandle/caseDocModle.less";
</style>
