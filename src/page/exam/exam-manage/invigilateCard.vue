<template>
  <el-dialog
    class="invigilate-card"
    title="准考证"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="600px"
  >
    <div class="print-card">
      <el-button type="text" @click="printCard">打印准考证</el-button>
    </div>
    <div class="card-cnt">
      <div class="card-text">
        <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
          <tbody>
            <tr style="vertical-align: inherit;">
              <td
                colspan="6"
                style="font-size:24px;height:34px;text-align: center; line-height:34px;font-weight:900;color:#000;"
              >{{addExamBatchForm.examName}}</td>
            </tr>
            <tr style="vertical-align: inherit;">
              <td
                colspan="6"
                style="font-size:24px;height:40px;text-align:center; line-height:40px;font-weight:600;color:#E84241;"
              >准考证</td>
            </tr>
            <tr style="vertical-align: inherit; font-size:18px;color: #000;">
              <td style="width: 92px; padding: 14px 0;">考生姓名：</td>
              <td style="width: 120px; padding: 14px 0;">{{addExamBatchForm.personName}}</td>
              <td style="width: 40px; padding: 14px 0;"></td>
              <td style="width: 120px;"></td>
              <td rowspan="5" style="width: 60px;"></td>
              <td rowspan="5" style="width: 160px;vertical-align: top;">
                <img
                  v-if="addExamBatchForm.photoUrl"
                  :src="addExamBatchForm.photoUrl"
                  width="100%"
                  height="224px"
                />
                <img v-else :src="personImg" width="100%" height="224px" />
              </td>
            </tr>
            <tr style="vertical-align: inherit; font-size:18px;color: #000;">
              <td style="width: 55px; padding: 14px 0;">性别：{{addExamBatchForm.sex==0?'男':'女'}}</td>
              <td style="width: 92px; padding: 14px 0; text-align:right;">身份证号：</td>
              <td colspan="3">{{addExamBatchForm.idNo}}</td>
            </tr>
            <tr style="vertical-align: inherit; font-size:18px;color: #000;">
              <td style="width: 92px; padding: 14px 0;">工作单位：</td>
              <td colspan="3">{{addExamBatchForm.oname}}</td>
            </tr>
            <tr style="vertical-align: inherit; font-size:18px;color: #000;">
              <td style="width: 92px; padding: 14px 0;">考试地点：</td>
              <td colspan="3">{{addExamBatchForm.examVenues}}</td>
            </tr>
            <tr style="vertical-align: inherit; font-size:18px;color: #000;">
              <td
                style="width: 92px; padding: 14px 0;"
              >考&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;场：</td>
              <td colspan="3">{{addExamBatchForm.roomName}}</td>
            </tr>
            <tr style="vertical-align: inherit; font-size:18px;color: #000;">
              <td style="width: 92px; padding: 14px 0;">考试时间：</td>
              <td colspan="3">{{addExamBatchForm.examTime}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { downLoadFile } from "@/api/joinExam";

export default {
  data() {
    return {
      examTypeInfo: [],
      examBatchSortInfo: [],
      isDisabled: true,
      visible: false,
      addExamBatchForm: {
        personName: "",
        sex: "",
        idNo: "",
        oname: "",
        roomName: "",
        examBatchReadyStartTime: "",
        examBatchReadyEndTime: "",
        remark: "",
        examVenues: "", //考试地点
        examName: "", //考试名称
        examBegin: "", //考试开始时间
        examEnd: "", //考试结束时间
        examTime: "",
        photoUrl: "",
        examperId: ""
      },
      personImg: "@/../static/images/img/personInfo/upload_bg.png",
      cardPdf: ""
    };
  },
  computed: {},
  methods: {
    showModal(type, row, examMsg) {
      this.visible = true;
      this.addExamBatchForm.personName = row.personName;
      this.addExamBatchForm.sex = row.sex;
      this.addExamBatchForm.idNo = row.idNo;
      this.addExamBatchForm.oname = row.oname;
      this.addExamBatchForm.roomName = row.roomName;
      this.addExamBatchForm.examName = examMsg.examName;
      this.addExamBatchForm.examVenues = examMsg.examVenues;
      this.addExamBatchForm.examTime =
        examMsg.examBegin.substring(0, 4) +
        "年" +
        examMsg.examBegin.substring(6, 7) +
        "月" +
        examMsg.examBegin.substring(8, 10) +
        "日" +
        "         " +
        examMsg.examBegin.substring(11, 16) +
        "-" +
        examMsg.examEnd.substring(11, 16);
      this.addExamBatchForm.examBegin = examMsg.examBegin.substring(0, 10);
      this.addExamBatchForm.examEnd = examMsg.examEnd;
      this.addExamBatchForm.examperId = row.examperId;
      if(row.photoUrl){
        this.$util.com_getFileStream(row.photoUrl).then( res => {
          this.addExamBatchForm.photoUrl = res;
        });
      }
    },
    // 打印本页
    printCard() {
      const loading = this.$loading({
        lock: true,
        text: "正在导出",
        spinner: "car-loading",
        customClass: "loading-box",
        background: "rgba(234,237,244, 0.8)"
      });
      this.$store
        .dispatch("exportPersonCard", {
          examperId: this.addExamBatchForm.examperId
        })
        .then(
          res => {
            loading.close();
            var blob = new Blob([res.data], {
              type: 'application/pdf;chartset=UTF-8'
            })
            let fileURL= URL.createObjectURL(blob)
            window.open(fileURL);
          },
          err => {
            loading.close();
            this.$message({ type: "error", message: err.msg || "" });
          }
        );
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.invigilate-card {
  >>> .el-dialog__body {
    padding-top: 0;
  }
  .print-card {
    text-align: right;
  }
}
</style>
