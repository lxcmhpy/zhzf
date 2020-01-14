<template>
  <div class="main">
    <div class="a4-box" id="subOutputRank-print">
      <div class="pdf-box" ref='docForm'>
        <div class="pdf-title">
          现场笔录
        </div>
        <div class="case-number" style="display:none">{{caseDocDataForm.id}}</div>
        <div class="case-number">案号：{{docData.caseNumber}}</div>
        <div class="pdf-table">
          <table border="1" bordercolor="black" width="100%" cellspacing="0">
              <tr>
                <td>执法地点</td>
                <td colspan="3"><el-input v-model="docData.fillingPlace" placeholder="请输入内容"></el-input></td>
                <td>执法时间</td>
                <td colspan="3">
                    <span class="pdf-line width264">
                <el-date-picker v-model="docData.enforceStartTime" type="date" format="yyyy 年 M 月 d 日 HH 时 mm 分" placeholder="  年  月  日 时 分" clear-icon='el-icon-circle-close'></el-date-picker>
              </span>
              至
              <span class="pdf-line width264">
                <el-date-picker v-model="docData.enforceEndTime" type="date" format="M 月 d 日 HH 时 mm 分" placeholder=" 月 日 时 分" clear-icon='el-icon-circle-close'></el-date-picker>
              </span>
                </td>
              </tr>
              <tr>
                <td rowspan="2">执法人员</td>
                <td colspan="2"><el-input v-model="docData.staff1" placeholder="请输入内容"></el-input></td>
                <td rowspan="2">执法证号</td>
                <td colspan="2"><el-input v-model="docData.certificateId1" placeholder="请输入内容"></el-input></td>
                <td rowspan="2">记录人</td>
                <td rowspan="2"><el-input v-model="docData.recorder" placeholder="请输入内容"></el-input></td>
              </tr>
              <tr>
                <td colspan="2"><el-input v-model="docData.staff2" placeholder="请输入内容"></el-input></td>
                <td colspan="2"><el-input v-model="docData.certificateId2" placeholder="请输入内容"></el-input></td>
              </tr>
            <tr>
              <td rowspan="5">
                现场
                <br />人员
                <br />基本
                <br />情况
              </td>
              <td colspan="2">姓名</td>
              <td colspan="3">
                <el-input v-model="docData.party" placeholder="请输入内容"></el-input>
              </td>
              <td>性别</td>
              <td>
                <el-input v-model="docData.partySex" placeholder="请输入内容"></el-input>
              </td>
            </tr>
            <tr>
              <td colspan="2">身份证件号</td>
              <td colspan="3">
                <el-input v-model="docData.partyIdNo" placeholder="请输入内容"></el-input>
              </td>
              <td>与案件关系</td>
              <td>
                <el-input v-model="docData.relation" placeholder="请输入内容"></el-input>
              </td>
            </tr>
            <tr>
              <td colspan="2">单位及职务</td>
              <td colspan="3">
                <el-input v-model="docData.partyUnitPosition" placeholder="请输入内容"></el-input>
              </td>
              <td>联系电话</td>
              <td>
                <el-input v-model="docData.partyTel" placeholder="请输入内容"></el-input>
              </td>
            </tr>
            <tr>
              <td colspan="2">联系地址</td>
              <td colspan="5">
                <el-input v-model="docData.partyAddress" placeholder="请输入内容"></el-input>
              </td>
            </tr>
            <tr>
              <td colspan="2">车（船）号</td>
              <td colspan="3">
                <el-input v-model="docData.vehicleShipId" placeholder="请输入内容"></el-input>
              </td>
              <td>车（船）型</td>
              <td>
                <el-input v-model="docData.vehicleShipType" placeholder="请输入内容"></el-input>
              </td>
            </tr>
            <tr>
              <td rowspan="13">
                主
                <br />要
                <br />内
                <br />容
              </td>
              <td colspan="7">
                现场情况：（如实施行政强制措施的，包括当场告知当事人采取行政强制措施的理由、依据以及当事人依法享有的权利、救济途径，听取当事人陈述、申辩情况。）
                <br />
                <br />
                <p>
                  <span
                    v-if="docData.illegalFacts==''"
                    class="pdf-line width635"
                    @click="overFlowEdit"
                  >&nbsp;</span>
                  <u @click="overFlowEdit">{{docData.illegalFacts}}</u>
                </p>
                <br />
                <br />
              </td>
            </tr>
            <tr>
              <td colspan="7">
                <div class="text-left">
                  <form>
                    <input type="checkbox" />上述笔录我已看过
                    <input type="checkbox" />或已像我宣读过，情况属实无误。
                  </form>
                </div>
                <br />
                <div class="text-right">
                <p>
                    现场人员签名：<span class="pdf-line width210" align="right">
                        <el-input v-model="docData.partySign" placeholder="请输入内容"></el-input></span>
                </p>
                <p>
                    时间：<span class="pdf-line width210" align="right">
                    <el-date-picker v-model="docData.partySignTime" type="date" format="yyyy 年 M 月 d 日" placeholder="  年  月  日" clear-icon='el-icon-circle-close'>
                    </el-date-picker>
                    </span>
                  </p>
                  <p>
                    时间：
                    <span class="pdf-line width210" align="right">
                      <el-date-picker
                        v-model="docData.partySignTime"
                        type="date"
                        format="yyyy 年 M 月 d 日"
                        placeholder="  年  月  日"
                        clear-icon="el-icon-circle-close"
                      ></el-date-picker>
                    </span>
                  </p>
                </div>
              </td>
            </tr>
            <tr>
                <td colspan="7">
                    <p>
                        备注：<span class="pdf-line width528" align="right">
                            <el-input v-model="docData.note" placeholder="请输入内容"></el-input></span>
                    </p>
                </td>
            </tr>
            <tr>
                <td colspan="7">
                    <p>
                        执法人员签名：<span class="pdf-line width250" align="right">
                            <el-input v-model="docData.staffSign" placeholder="请输入内容"></el-input></span>
                        时间：<span class="pdf-line width150" align="right">
                            <el-date-picker v-model="docData.staffSignTime" type="date" format="yyyy 年 M 月 d 日" placeholder="  年  月  日" clear-icon='el-icon-circle-close'>
                            </el-date-picker>
                        </span>
                    </p>
                </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <casePageFloatBtns pageDomId="subOutputRank-print"></casePageFloatBtns>
    <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput>
  </div>
</template>
<script>
import overflowInput from "../pdf/overflowInput";
import { mixinGetCaseApiList } from "@/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from '@/components/casePageFloatBtns/casePageFloatBtns'
export default {
  data() {
    return {
      docData:{
        caseNumber: '',
        enforceStartTime:'',
        enforceEndTime:'',
        staff1:'',
        certificateId1:'',
        recorder:'',
        staff2:'',
        certificateId2:'',
        arty:"",
        partyTel:"",
        partyIdNo:"",
        relation:'',
        partyAddress:"",
        partySex:"",
        vehicleShipId:'',
        vehicleShipType:'',
        checkBox:'',   //复选框
        partySign:'',
        partySignTime:'',
        note:'',
        staffSign:'',
        staffSignTime:'',
        overWidthFlag: false,
        illegalFacts: '',//多行编辑内容
      },
       caseDocDataForm: {
        id: "",   //修改的时候用
        caseBasicinfoId: '',   //案件ID
        caseDoctypeId: this.$route.params.docId,    //文书类型ID
        //文书数据
        docData: "",
        status: "",   //提交状态
      },
      handleType: "",  // 0 暂存  1  提交
    }
  },
  computed: { ...mapGetters(['caseId']) },
  mixins: [mixinGetCaseApiList],
  inject: ["reload"],
  components: {
    overflowInput
  },
  methods: {
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      this.caseDocDataForm.caseDoctypeId = this.$route.params.docId;

      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId
      };
      this.com_getDocDataByCaseIdAndDocId(data)
    },
    checkHeights() {
      console.log("this.inputInfos");
      if (this.inputInfos.length > 10) {
        this.overWidthFlag = true;
      } else this.overWidthFlag = false;
    },
    // 多行编辑
    overFlowEdit() {
      this.$refs.overflowInputRef.showModal(0, "");
    },
    // 获取多行编辑内容
    getOverFloeEditInfo(edit) {
      this.docData.illegalFacts = edit;
    },

  },
  mounted() {
    this.getDocDataByCaseIdAndDocId();
  },
  components: {
    casePageFloatBtns
  }
};
</script>
<style lang="less">
@import "../../../../css/pdf.less";
</style>
