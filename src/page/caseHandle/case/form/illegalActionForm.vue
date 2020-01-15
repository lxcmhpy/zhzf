<template>
  <div class="print_box">
    <div class="print_info indent_style">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">违法行为通知书</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <p class="side_right_indent">
          当事人（个人姓名或单位名称）：
          <el-form-item prop="party">
              <el-input type='textarea' v-model="docData.party"  v-bind:class="{ over_flow:docData.party.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength'></el-input>
              <!-- <el-input v-model="docData.illegalLaw" :maxLength='maxLength' :maxLength='maxLength'></el-input> -->
          </el-form-item>
        </p>
        <p>
            &nbsp;&nbsp;经调查，本机关认为你（单位）<span>
              <el-form-item prop="caseCauseNameCopy">
                <el-input v-model="docData.caseCauseNameCopy" :maxLength='maxLength'></el-input>
              </el-form-item>
            </span>行为，违反了<span>
              <el-form-item prop="illegalBasis">
                <el-input v-model="docData.illegalBasis" :maxLength='maxLength'></el-input>
              </el-form-item>
            </span>的规定，依据<span>
              <el-form-item prop="punishLaw">
                <el-input v-model="docData.punishLaw" :maxLength='maxLength'></el-input>
              </el-form-item>
            </span>的规定，本机关拟作出<span>
              <el-form-item prop="punishDecision">
                <el-input v-model="docData.punishDecision" :maxLength='maxLength'></el-input>
              </el-form-item>
            </span>的处罚决定。
          </p>
          <p>
            &nbsp;&nbsp;<input type="checkbox">根据《中华人民共和国行政处罚法》第三十一条、第三十二条的规定，你（单位）如对该处罚意见有异议，可向本机关提出陈述申辩，本机关将依法予以核实。
          </p>
          <p>
            &nbsp;&nbsp;<input type="checkbox">根据《中华人民共和国行政处罚法》第四十二条的规定，你（单位）有权在收到本通知书之日起三日内向本机关要求举行听证；逾期不要求举行听证的，视为你（单位）放弃听证的权利。
          </p>
          <p>
            （注：在序号前□内打“√”的为当事人享有该权利。）
          </p>
          <br>
          <el-row>
            <el-col :span="12">
              <p>联系地址： <el-form-item v-if="!lineStyleFlag" prop="partyAddress" style="width:180px">
                  <el-input type='textarea' v-model="docData.partyAddress" v-bind:class="{ over_flow:docData.partyAddress.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input>
                </el-form-item>
                <u v-if="lineStyleFlag">{{docData.partyAddress}}</u>
              </p>
            </el-col>
            <el-col :span="12">
              <p>邮编：<el-form-item v-if="!lineStyleFlag" prop="partyZipCode " style="width:210px">
                  <el-input type='textarea' v-model="docData.partyZipCode " v-bind:class="{ over_flow:docData.partyZipCode .length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input>
                </el-form-item>
                <u v-if="lineStyleFlag">{{docData.partyZipCode }}</u>
              </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p>联系人： <el-form-item v-if="!lineStyleFlag" prop="party" style="width:200px">
                  <el-input type='textarea' v-model="docData.party" v-bind:class="{ over_flow:docData.party.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input>
                </el-form-item>
                <u v-if="lineStyleFlag">{{docData.party}}</u>
              </p>
            </el-col>
            <el-col :span="12">
              <p>联系电话：<el-form-item v-if="!lineStyleFlag" prop="partyTel" style="width:180px">
                  <el-input type='textarea' v-model="docData.partyTel" v-bind:class="{ over_flow:docData.partyTel.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input>
                </el-form-item>
                <u v-if="lineStyleFlag">{{docData.partyTel}}</u>
              </p>
            </el-col>
          </el-row>
          <div class="pdf_seal">
            <span>交通运输执法部门(印章)</span><br>
            <el-form-item prop="makeDate" class="pdf_datapick">
              <el-date-picker v-model="docData.makeDate" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日">
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
      <el-button type="success">
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
      docData: {
        caseNumber: "",
        party: "",
        caseCauseNameCopy: "",
        illegalBasis: "",
        punishLaw: "",
        punishDecision: "",
        partyAddress: "",
        partyZipCode: "",
        partyTel: "",
        checkBoxList: "",
        makeDate:""
      },
      rules: {
        party: [
          { required: true, message: "当事人姓名必须填写", trigger: "blur" }
        ]
      },
      caseDocDataForm: {
        id: "",   //修改的时候用
        caseBasicinfoId: '',   //案件ID
        caseDoctypeId: "2c9029ca5b71686d015b719fe0900026",    //文书类型ID
        //文书数据
        docData: "",
        status: "",   //提交状态
      },
      maxLength: 23,
      lineStyleFlag: false,
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
      this.docData.illegalFact = edit;
    },
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: "2c9029ca5b71686d015b719fe0900026"
      };
      console.log(data);
      this.com_getDocDataByCaseIdAndDocId(data);
    },
    //保存文书信息
    addDocData(handleType){
      this.com_addDocData(handleType,'docForm').then(
        res => {
          this.$message({
            type: "success",
            message: "保存成功",
          });
          this.$store.dispatch("deleteTabs", this.$route.name);//关闭当前页签
          this.$router.push({
            name: 'caseDoc',
            // name: row.url,
            params: {
              // id: row.id,
              // //案件ID
              // caseBasicinfoId: this.caseBasicinfoId,
            }
          });
        },
        err => {
          console.log(err);
        }
      );
    },
    
    // 盖章
    makeSeal() {
      signature.openURL('oeder');
    },
    // 打印
    print() {
      console.log('打印!');
    },
  },
  created() {
    this.getDocDataByCaseIdAndDocId();
  }
};
</script>
<style lang="less">
@import "../../../../css/caseHandle/caseDocModle.less";
</style>
