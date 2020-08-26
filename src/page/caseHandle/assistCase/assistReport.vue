<template>
  <div class="print_box" id="assistReport">
    <el-form
      :rules="rules"
      ref="docForm"
      :inline-message="true"
      :inline="true"
      :model="reportData"
      label-width="80px"
    >
      <div class="print_info indent_style" id="assist_print">
        <div class="doc_topic">协助调查函</div>
        <div class="doc_number">
          案号：
          <span class="assist-span-bg">鄂武港航罚[2020]00001号</span>
        </div>
        <div class="datapick_style">
          <p class="line-h-16">
            <span class="assist-span-bg">目标机构名称</span>:
          </p>
        </div>
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item prop="caseDescription">
              <el-input
                class="text_indent6 overflow_lins_textarea"
                type="textarea"
                v-model="reportData.caseDescription"
                rows="2"
                maxlength="100"
                placeholder="\"
              ></el-input>
              <span class="overflow_describe begin-space" style="text-indent:0">为查清</span>
              <span class="span_bg span_bg_top">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span>一案有关事实情况，特请你单位协助调查以下问题：</span>
            </el-form-item>
          </div>
        </div>
        <div class="overflow_lins_style">
          <div class="overflow_lins" style="width:95%; margin-left:5%;">
            <el-form-item prop="assistProblem">
              <el-input
                class="overflow_lins_textarea"
                type="textarea"
                v-model="reportData.assistProblem"
                rows="4"
                maxlength="150"
                placeholder
              ></el-input>
              <span class="span_bg span_bg_top">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span>（请贵单位将调查结果及相关证据材料加盖单位公章后及时函告我单位）</span>
            </el-form-item>
          </div>
        </div>

        <div style="margin-top: 40px;">
            <p>
              联系人：
              <el-form-item prop="organContactor" style="width:200px">
                <!-- <el-input
                  type="textarea"
                  v-model="reportData.organContactor"
                  v-bind:class="{ over_flow: reportData.organContactor && reportData.organContactor.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  placeholder
                ></el-input> -->
                <span class="span_bg span_bg_top" style="line-height:18px;" @click="addContactor">{{ reportData.organContactor }}</span>
              </el-form-item>
            </p>
          </div>
          <div>
            <p>
              联系电话：
              <el-form-item prop="organTel" style="width:180px">
                <el-input
                  type="textarea"
                  v-model="reportData.organTel"
                  v-bind:class="{ over_flow: reportData.organTel && reportData.organTel.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  placeholder
                ></el-input>
              </el-form-item>
            </p>
          </div>
        <div class="pdf_seal" style="margin: 60px 0 120px;">
          <span>交通运输执法部门(印章)</span>
          <br />
          <el-form-item prop="makeDate" class="pdf_datapick">
            <el-date-picker
              v-model="reportData.makeDate"
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
      </div>
    </el-form>
    <!-- 选择联系人 -->
    <chooseLawPerson ref="chooseLawPersonRef" @setLawPer="setLawPerson"></chooseLawPerson>
    
    <div class="assist-right-btn">
      <el-button class="assist-step-btn" plain @click="nextStep(1)">上一步</el-button>
      <el-button class="assist-step-btn" type="primary" @click="nextStep(3)">下一步</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import chooseLawPerson from "@/page/caseHandle/unRecordCase/chooseLawPerson";
import iLocalStroage from "@/common/js/localStroage";
import { validateIDNumber, validatePhone } from "@/common/js/validator";
import { findCaseAllBindPropertyApi } from "@/api/caseHandle";

export default {
  components: { chooseLawPerson },
  data() {
    return {
      validatePhone: validatePhone,
      validateIDNumber: validateIDNumber,
      reportData: {
        caseNumber: "",
        caseDescription: "案件案由", // 案由
        assistProblem: "", // 需要协查的问题
        organContactor: "",
        organTel: "",
        makeDate: "",
      },
      editCaseInfo: true,
      num4: 1,
      lineStyleFlag: false,
      name: "",
      inputInfo: "",
      inputInfos: "",
      illegalFactsEvidence: "",
      value1: "",
      rules: {
        askRecordNumber: [
          { required: true, message: "询问次数不能为空", trigger: "blur" },
        ],
        inquiryAddress: [
          { required: true, message: "地点不能为空", trigger: "blur" },
        ],
        inquiryStaff: [
          { required: true, message: "询问人不能为空", trigger: "blur" },
        ],
        recordStaff: [
          { required: true, message: "记录人不能为空", trigger: "change" },
        ],
        inquiried: [
          { required: true, message: "被询问人不能为空", trigger: "blur" },
        ],
        inquiriedRelation: [
          { required: true, message: "与案件关系不能为空", trigger: "blur" },
        ],
      },
    };
  },
  inject: ["reload"],
  computed: { ...mapGetters([]) },
  methods: {
    // 编辑案件信息
    editCaseInfoFun() {
      this.editCaseInfo = true;
      this.$nextTick(() => {
        this.$refs.caseDescRef.focus();
      });
    },
    //获取执法人员
    getLawOfficer() {
      let data = {
        caseBasicInfoId: this.caseId,
        typeId: this.$route.params.docId,
      };
      findCaseAllBindPropertyApi(data).then(
        (res) => {
          console.log(res);
          let data2 = JSON.parse(res.data.propertyData);
          this.staffList = data2.staff.split(",");
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //选择执法人员
    addContactor() {
      this.$refs.chooseLawPersonRef.showModal(this.lawPersonListId, this.alreadyChooseLawPerson);
    },
    
    //设置执法人员
    setLawPerson(userlist) {
      this.alreadyChooseLawPerson = userlist;
      this.lawPersonListId = [];
      let nameList = [];

      this.alreadyChooseLawPerson.forEach(item => {
        this.lawPersonListId.push(item.id);
        nameList.push(item.lawOfficerName);
      });

      this.reportData.organContactor = nameList.join(',');

    },
    // 默认设置联系人为当前用户 需要用用户的id去拿他作为执法人员的id
    setLawPersonCurrentP() {
      this.$store
        .dispatch("findLawOfficerList", iLocalStroage.gets("userInfo").organId)
        .then(
          res => {
            let currentUserData = {};
            this.lawPersonListId = [];
            this.alreadyChooseLawPerson = [];

            res.data.forEach(item => {
              if (
                item.userId == iLocalStroage.gets("userInfo").id
              ) {
                currentUserData.id = item.id;
                currentUserData.lawOfficerName = item.lawOfficerName;
                currentUserData.selectLawOfficerCard = item.lawOfficerCards.split(",")[0]
                this.alreadyChooseLawPerson.push(currentUserData);
                this.lawPersonListId.push(currentUserData.id);

                this.reportData.organContactor = item.lawOfficerName;
              }
            });
          },
          err => {
            console.log(err);
          }
        );
    },

    // 下一步
    nextStep(step){
      this.$emit('nextStep', step);
    },
    // 获取当前日期
    getCurrentDay(){
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      this.reportData.makeDate = `${year}-${month}-${day}`;
    }
  },
  mounted() {
    this.getCurrentDay();
    this.setLawPersonCurrentP();
  },
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">
#assistReport {
  position: relative;
  #assist_print {
    border: 1px solid #333;
    margin-bottom: 60px;
  }
  .begin-space {
    display: inline-block;
    width: 80px;
    text-align: right;
  }
}
.assist-right-btn {
  width: 48px;
  height: 100px;
  position: fixed;
  right: 70px;
  bottom: 70px;
  z-index: 100;
}
.assist-right-btn .assist-step-btn {
  border-radius: 50px;
  width: 50px;
  height: 50px;
  padding: 0;
  text-align: center;
  margin: 0;
  margin-bottom: 20px;
}
</style>


