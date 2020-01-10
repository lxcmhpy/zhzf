<template>
  <div class="box">
    <el-form ref="caseLinkDataForm">
      <el-input ref="id" type="hidden"></el-input>
    </el-form>
    <el-form ref="penaltyExecutionForm" :model="formData" label-width="105px">
      <!-- <div class="header-case">
        <div class="header_left">
          <div class="triangle"></div>
          <div class="header_left_text">返回</div>
        </div>
      </div> -->
      <div class="content_box">
        <div class="content">
          <div class="content_title">决定执行</div>
          <div class="border_blue"></div>

          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item prop="caseNumber" label="案号">
                  <el-input ref="caseNumber" clearable class="w-120" v-model="formData.caseNumber" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="punishType" label="处罚类型">
                  <el-input ref="punishType" clearable class="w-120" v-model="formData.punishType" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="caseName" label="案由">
                  <el-input ref="caseName" clearable class="w-120" v-model="formData.caseName" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="punishTerm" label="处罚期限">
                  <el-input ref="punishTerm" clearable class="w-120" v-model="formData.punishTerm" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="punishDecision" label="处罚决定">
                  <el-input ref="punishDecision" clearable class="w-120" v-model="formData.punishDecision" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="处罚金额">
                  <el-input ref="tempPunishAmount" clearable class="w-120" v-model="formData.tempPunishAmount" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="border_blue"></div>
          <div class="content_form bottom_form">
            <div class="row">
              <div class="col">
                <el-form-item prop="performWay" label="执行方式"  v-model="formData.performWay">
                  <el-radio-group>
                    <el-radio label="1">线下缴费</el-radio>
                    <el-radio label="2">电子缴纳</el-radio>
                  </el-radio-group>
                  <el-checkbox v-model="formData.correct"></el-checkbox>责令改正
                  <!-- <el-input ref="caseName" clearable class="w-120" v-model="formData.caseName" size="small" placeholder="请输入"></el-input> -->
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="paidAmount" label="已缴金额">
                  <el-input ref="paidAmount" clearable class="w-120" v-model="formData.paidAmount" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="toPayAmount" label="待缴金额">
                  <el-input ref="toPayAmount" clearable class="w-120" v-model="formData.toPayAmount" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="performance" label="执行情况">
                  <el-select v-model="formData.performance">
                    <el-option></el-option>
                  </el-select>
                  <!-- <el-input ref="performance" clearable class="w-120" v-model="formData.performance" size="small" placeholder="请输入"></el-input> -->
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="checkbox">
                  <el-checkbox v-model="formData.stepPay"></el-checkbox>分期（延期）缴纳
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="note" label="备注">
                  <el-input ref="note" clearable class="w-120" v-model="formData.note" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="payEvidence" label="缴纳凭证">
                  <el-input type="file" ref="payEvidence" clearable class="w-120" v-model="formData.payEvidence" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content_box">
        <div class="content">
          <div class="table_form">
            <el-table :data="docTableDatas" stripe border style="width: 100%" max-height="250">
              <el-table-column prop="name" label="序号" align="center"></el-table-column>
              <el-table-column prop="isApproval" label="材料名称" align="center"></el-table-column>
              <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == '1'">
                    已完成
                  </span>
                  <span v-if="scope.row.status == '0'">
                    未完成
                  </span>
                  <span v-if="scope.row.status == ''">
                    -
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == '1'">
                    <!-- 已完成 -->
                    <i type="primary" class="el-icon-view cell-icon" @click="viewDoc(scope.row)"></i>
                    <i type="primary" class="el-icon-printer cell-icon"></i>
                  </span>
                  <span v-if="scope.row.status == '0'">
                    <!-- 未完成 -->
                    <i type="primary" class="el-icon-edit cell-icon" @click="viewDoc(scope.row)"></i>
                    <i type="primary" class="el-icon-delete-solid cell-icon" @click="delDocDataByDocId(scope.row)"></i>
                  </span>
                  <span v-if="scope.row.status === ''">
                    <!-- 无状态 -->
                    <i type="primary" class="el-icon-circle-plus cell-icon" @click="viewDoc(scope.row)"></i>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 悬浮按钮 -->
        <div class="float-btns btn-height63">
          <el-button type="primary" @click="continueHandle">
            <svg t="1577414377979" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1726" width="16" height="16">
              <path d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z" p-id="1727" fill="#FFFFFF"></path>
            </svg><br>
            下一<br>环节</el-button>
          <el-button type="primary" @click="submitCaseDoc(1)">
            <svg t="1577414377979" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1726" width="16" height="16">
              <path d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z" p-id="1727" fill="#FFFFFF" />
            </svg>
            <br />保存
          </el-button>
          <el-button type="success">
            <svg t="1577415780823" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2584" width="16" height="16">
              <path d="M98 124.1V902c0 14.3 11.6 25.9 25.9 25.9h777.9c14.3 0 25.9-11.6 25.9-25.9V124.1c0-14.3-11.6-25.9-25.9-25.9H123.9c-14.3 0-25.9 11.6-25.9 25.9z m207.4 37.6h414.9v191.7H305.4V161.7z m558.8 702.7H162.6V161.7h104v230.6h492.7V161.7h105v702.7z" p-id="2585" fill="#FFFFFF" />
              <path d="M605.1 191.9h70v128h-70z" p-id="2586" fill="#FFFFFF" />
            </svg>
            <br />暂存
          </el-button>
        </div>
      </div>
    </el-form>
    <checkDocFinish ref="checkDocFinishRef"></checkDocFinish>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/js/mixins";
import { mapGetters } from "vuex";
import checkDocFinish from '../../components/checkDocFinish'

export default {
  components: {
    checkDocFinish
  },
  data() {
    return {
      formData: {},
      //提交方式
      handleType: 0, //0  暂存     1 提交
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: '', //案件id
        caseLinktypeId: "2c9029e16c753a19016c755fe1340001", //表单类型IDer
        //表单数据
        formData: "",
        status: ""
      },
      docTableDatas: [],
      rules: {
        caseNumber: [
          { required: true, message: "案号必须填写", trigger: "blur" }
        ],
        caseName: [
          { required: true, message: "案由必须填写", trigger: "blur" }
        ],
        partyType: [
          { required: true, message: "当事人类型必须填写", trigger: "blur" }
        ],
        closeResult: [
          { required: true, message: "处理结果必须填写", trigger: "blur" }
        ],
        closeSituation: [
          { required: true, message: "执行情况必须填写", trigger: "blur" }
        ]
      }
    };
  },
  computed: { ...mapGetters(['caseId']) },
  mixins: [mixinGetCaseApiList],
  methods: {
    //加载表单信息
    setFormData() {
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(this.caseLinkDataForm.caseBasicinfoId, this.caseLinkDataForm.caseLinktypeId, 'form');
    },
    //保存表单数据
    submitCaseDoc(handleType) {
      this.com_submitCaseForm(handleType, 'penaltyExecutionForm', true);
    },
    //下一环节
    continueHandle() {
      let caseData={
        caseBasicinfoId:this.caseLinkDataForm.caseBasicinfoId,
        caseLinktypeId:this.caseLinkDataForm.caseLinktypeId,
      }
      this.$refs.checkDocFinishRef.showModal(this.docTableDatas,caseData);
      // this.com_goToNextLinkTu(this.caseLinkDataForm.caseLinktypeId);
    },
    // 进入文书
    enterDoc(row) {
      this.$store.dispatch("deleteTabs", this.$route.name);//关闭当前页签
      console.log('row', row)
      this.$router.push({
        name: row.url,
        params: {
          id: row.id,
          //案件ID
          caseBasicinfoId: this.caseBasicinfoId,
          docId: row.docId,
          url: this.$route.name,
        }
      });
    },
    //查看文书
    viewDoc(row) {
      this.com_viewDoc(row);
    },
    //通过案件id和表单类型Id查询已绑定文书
    getDocListByCaseIdAndFormId() {
      let data = {
        linkTypeId: "2c9029e16c753a19016c755fe1340001"     //环节ID
      };
      this.com_getDocListByCaseIdAndFormId(data);
      
    },
  },

  mounted() {
    // this.getCaseBasicInfo();
  },
  created() {
    //获取表单数据
    this.setFormData();
    //通过案件id和表单类型Id查询已绑定文书
    this.getDocListByCaseIdAndFormId();
  }
};
</script>

<style lang="less" scoped>
@import "../../../../css/documentForm.less";
</style>
