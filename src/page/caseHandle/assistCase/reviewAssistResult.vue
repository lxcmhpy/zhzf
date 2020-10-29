<template>
  <!-- 查看协查详情 -->
  <div class="add_dialog dentail_box" style="height:auto;">
    <el-form
      :model="caseData"
      :rules="rules"
      ref="caseDataRef"
      label-width="90px"
      class="demo-ruleForm"
    >
      <div class="top" style="height:480px;">
        <div class="add_dialog_content" style="padding-top:36px">
          <div class="border_blue"></div>
          <div class="content_bg elform_padding">
            <el-row>
              <el-col :span="12">
                <el-form-item label="案号" prop="caseNumber">{{caseData.caseNumber}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="处理状态" prop="status">{{caseData.status === '1' ? '已完成' : '待回复'}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="当事人" prop="party">{{caseData.party}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="涉案车/船号">{{caseData.vehicleShipId}}</el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="违法事实">{{caseData.caseCauseName}}</el-form-item>
            <el-form-item label="案发时间">{{caseData.afsj}}</el-form-item>
            <el-form-item label="案发地点">{{caseData.afdd}}</el-form-item>
            <el-form-item label="文书查看">
              <el-button type="primary" size="medium" @click="reviewReport">协助调查函</el-button>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="btm" style="height:auto;">
        <div class="add_dialog_content">
          <div class="record_text">协查记录</div>
          <div class="block">
            <el-timeline class="times_content">
              <el-timeline-item
                :timestamp="caseData.createTime"
                placement="top"
                icon="el-icon-time"
              >
                <div class="times_info">
                  <div class="times_info_content">
                    <span class="tans_box">
                      <span class="i_box_apply"></span>
                      <i class="el-icon-user-solid"></i>
                      <span
                        style="color:#20232B"
                      >{{`${caseData.launchOrgan}--${caseData.applicant}`}}</span>
                    </span>
                    <div class="case-assist-status">
                      发起
                      <span style="margin-left: 30px;">至</span>
                      <span class="status-bg-line">
                        <span class="line-right-arrow el-icon-arrow-right"></span>
                      </span>
                    </div>
                    <span class="tans_box">
                      <span class="i_box_org"></span>
                      <i class="el-icon-user-solid"></i>
                      <span style="color:#20232B">{{ caseData.targetOrgan }}</span>
                    </span>
                  </div>
                  <div>
                    <span class="times_text">说明：</span>
                    <span class="color_7B7B7B">{{caseData.explain}}</span>
                  </div>
                  <div>
                    <span class="times_text">附件（{{launchList.length}}）</span>
                  </div>
                  <div class="document_list">
                    <ul>
                      <li v-for="(item,index) in launchList" :key="index">
                        <el-link
                          type="primary"
                          :href="item.storageStreamPath"
                          :underline="false"
                          :target="['.jpg','.png','.jpeg'].includes(item.fileType) ? '_blank':'_self'"
                        >
                          <i class="el-icon-document-checked"></i>
                          {{item.fileName}}
                        </el-link>
                      </li>
                    </ul>
                  </div>
                  <div
                    v-if="pageType === 'received' && caseData.status ==='0'"
                    style="clear:both;"
                  >
                    <div>
                      <el-form-item label="结果" prop="reply" label-width="52px">
                        <el-input
                          type="textarea"
                          v-model="caseData.reply"
                          :autosize="{ minRows: 2, maxRows: 4}"
                          :maxlength="300"
                          placeholder
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div>
                      <el-form-item label="附件" label-width="52px">
                        <el-upload
                          class="upload-assist-file"
                          action
                          :limit="3"
                          :auto-upload="false"
                          :multiple="true"
                          :file-list="fileList"
                          :on-change="handleChange"
                          :on-exceed="exceedFun"
                        >
                          <el-button size="small" type="primary">选取文件</el-button>
                          <span slot="tip" class="upload-tips">(最多上传3个附件)</span>
                        </el-upload>
                      </el-form-item>
                    </div>
                    <div style="text-align: center;">
                      <el-button type="primary" @click="uploadFile">回复</el-button>
                    </div>
                  </div>
                </div>
              </el-timeline-item>
              <el-timeline-item
                v-if="caseData.status === '1'"
                :timestamp="caseData.replyTime"
                placement="top"
                icon="el-icon-time"
              >
                <div class="times_info">
                  <div class="times_info_content">
                    <span class="tans_box">
                      <span class="i_box_org"></span>
                      <i class="el-icon-user-solid"></i>
                      <span style="color:#20232B">{{ caseData.targetOrgan }}</span>
                    </span>
                    <div class="case-assist-status">
                      回复
                      <span style="margin-left: 30px;">至</span>
                      <span class="status-bg-line">
                        <span class="line-right-arrow el-icon-arrow-right"></span>
                      </span>
                    </div>
                    <span class="tans_box">
                      <span class="i_box_apply"></span>
                      <i class="el-icon-user-solid"></i>
                      <span
                        style="color:#20232B"
                      >{{`${caseData.targetOrgan}--${caseData.applicant}`}}</span>
                    </span>
                  </div>
                  <div>
                    <span class="times_text">说明：</span>
                    <span class="color_7B7B7B">{{caseData.reply}}</span>
                  </div>
                  <div>
                    <span class="times_text">附件（{{replyFileList.length}}）</span>
                  </div>
                  <div class="document_list">
                    <ul>
                      <li v-for="(item,index) in replyFileList" :key="index">
                        <el-link
                          type="primary"
                          :href="item.storageStreamPath"
                          :underline="false"
                          :target="['.jpg','.png','.jpeg'].includes(item.fileType) ? '_blank':'_self'"
                        >
                          <i class="el-icon-document-checked"></i>
                          {{item.fileName}}
                        </el-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </el-timeline-item>
              <el-timeline-item placement="top" style="display: none;"></el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>
    </el-form>
    <!-- 查看协查函 -->
    <ReviewAssistReport ref="ReviewAssistReportRef" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import iLocalStroage from "@/common/js/localStroage";
import { uploadCommon } from "@/api/upload";
import {
  getAssistCaseDetail,
  saveAssistCase,
  getAssistFile,
} from "@/api/caseHandle";
import { getFile } from "@/api/upload";
import ReviewAssistReport from "@/page/caseHandle/assistCase/reviewAssistReport.vue";

export default {
  components: { ReviewAssistReport },
  computed: {
    caseId() {
      return this.$route.params.id;
    },
    pageType() {
      return this.$route.params.type;
    },
    UserInfo() {
      return iLocalStroage.gets("userInfo");
    },
  },
  data() {
    return {
      caseData: { reply: "" },
      appendixList: [],
      fileList: [],
      launchList: [],
      replyFileList: [],
      rules: {
        reply: [
          { required: true, message: "回复结果不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getCaseInfo();
    this.setLawPersonCurrentP();
  },
  methods: {
    getCaseInfo() {
      getAssistCaseDetail(this.caseId).then(
        (res) => {
          this.caseData = res.data;
          this.findFileList("launchList");
          if (res.data.status === "1") {
            this.findFileList("replyFileList");
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    // 获取上传附件
    findFileList(type) {
      let data = {
        caseId: this.caseData.caseId,
        category: type === "launchList" ? "协查案件-发起" : "协查案件-回复",
      };
      getAssistFile(data).then(
        (res) => {
          let fileListData = res.data;
          fileListData.forEach(item => {
            this.$util.com_getDeviceFileStream(item.storageId).then(res=>{
              item['storageStreamPath'] = res;
            });
          })
          this[type] = fileListData;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    // 查看协查函
    reviewReport() {
      this.$refs.ReviewAssistReportRef.showModal(this.caseData.caseId);
    },
    // 选择附件
    handleChange(file, fileList){
      this.fileList = fileList;
    },
    // 选择附件超过3个
    exceedFun(files, fileList){
      this.$message.error(
        `最多上传3个附件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },

    // 上传附件
    uploadFile() {
      if (this.fileList && this.fileList.length) {
        var fd = new FormData();
        this.fileList.forEach((item) => {
          fd.append("file", item.raw);
        });
        fd.append("userId", this.UserInfo.id);
        fd.append("category", "协查案件-回复");
        fd.append("caseId", this.caseData.caseId);
        const loading = this.$loading({
          lock: true,
          text: "正在上传",
          spinner: "car-loading",
          customClass: "loading-box",
          background: "rgba(234,237,244, 0.8)",
        });
        uploadCommon(fd).then(
          (res) => {
            loading.close();
            this.$message({ type: "success", message: "附件上传成功" });
            this.replayApply();
          },
          (error) => {
            loading.close();
            this.$message({ type: "error", message: "附件上传失败" });
          }
        );
      } else {
        this.replayApply();
      }
    },
    // 回复协查申请
    replayApply() {
      const replayData = JSON.parse(JSON.stringify(this.caseData));
      delete replayData.afdd;
      delete replayData.afsj;
      replayData.status = "1";
      this.$refs.caseDataRef.validate((valid) => {
        if (valid) {
          saveAssistCase(replayData).then(
            (res) => {
              if (res.code === 200) {
                this.$message({ type: "success", message: "回复成功" });
                this.getCaseInfo();
              }
            },
            (err) => {
              console.log(err);
            }
          );
        }
      });
    }, // 默认设置联系人为当前用户 需要用用户的id去拿他作为执法人员的id
    setLawPersonCurrentP() {
      this.$store.dispatch("findLawOfficerList", this.UserInfo.organId).then(
        (res) => {
          res.data.forEach((item) => {
            if (item.userId == this.UserInfo.id) {
              this.caseData.replyPerson = item.lawOfficerName;
            }
          });
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>
<style lang="scss" src="@/assets/css/documentForm.scss"  scoped>
/* @import "@/assets/css/documentForm.scss"; */
</style>
<style scoped>
.times_content /deep/ .el-timeline-item__node--normal {
  left: -8px;
  width: 25px;
  height: 25px;
}
.times_content /deep/ .el-timeline-item__icon {
  color: #fff;
  font-size: 31px;
  font-weight: 400;
}
.times_content /deep/ .el-timeline-item__node {
  background-color: #4573d0;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.dentail_box /deep/ .el-timeline-item__tail {
  top: -10px;
}
.dentail_box /deep/ .el-timeline-item__timestamp {
  color: #7b7b7b;
  line-height: 22px;
  font-size: 14px;
  font-weight: 500;
}
</style>
<style lang="scss" scoped>
.upload-assist-file {
  display: inline-block;
}
.upload-tips {
  color: #606266;
  margin-left: 16px;
}
.case-assist-status {
  display: inline-block;
  position: relative;
  overflow: hidden;
  margin: 0 24px;
  padding: 0 40px;
  .status-bg-line {
    position: absolute;
    display: inline-block;
    left: 0;
    bottom: 0;
    width: 100%;
    line-height: initial;
    border-bottom: 2px solid #ebeef5;
    .line-right-arrow {
      font-size: 16px;
      color: #ebeef5;
      font-weight: bold;
      position: absolute;
      right: -5px;
      top: -7px;
    }
  }
}
</style>
