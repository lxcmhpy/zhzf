<template>
  <!-- 查看协查详情 -->
  <div class="add_dialog dentail_box" style="height:auto;">
    <el-form :model="caseData" ref="caseData" label-width="90px" class="demo-ruleForm">
      <div class="top" style="height:480px;">
        <div class="add_dialog_content" style="padding-top:36px">
          <div class="border_blue"></div>
          <div class="content_bg elform_padding">
            <el-row>
              <el-col :span="12">
                <el-form-item label="案号" prop="caseNumber">{{caseData.caseNumber}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="处理状态" prop="status">{{caseData.state == 1?'已发送':'已完成'}}</el-form-item>
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
            <el-form-item label="违法事实">{{caseData.wfss}}</el-form-item>
            <el-form-item label="案发时间">{{caseData.afsj}}</el-form-item>
            <el-form-item label="案发地点">{{caseData.afdd}}</el-form-item>
            <el-form-item label="文书查看">
              <el-button type="primary" size="medium">协助调查函</el-button>
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
                      <span style="color:#20232B">{{caseData.person}}</span>
                    </span>
                    <div class="case-assist-status">
                      发起 至
                      <span class="status-bg-line">
                        <span class="line-right-arrow el-icon-arrow-right"></span>
                      </span>
                    </div>
                    <span class="tans_box">
                      <span class="i_box_org"></span>
                      <i class="el-icon-user-solid"></i>
                      <span style="color:#20232B">{{caseData.organMb}}</span>
                    </span>
                  </div>
                  <div>
                    <span class="times_text">说明：</span>
                    <span class="color_7B7B7B">{{caseData.notes}}</span>
                  </div>
                  <div>
                    <span class="times_text">附件（{{appendixList.length}}）</span>
                  </div>
                  <div class="document_list">
                    <ul>
                      <li v-for="(item,index) in appendixList" :key="index">
                        <el-link
                          type="primary"
                          :href="host+item.storageId"
                          :underline="false"
                          :target="['.jpg','.png','.jpeg'].includes(item.fileType) ? '_blank':'_self'"
                        >
                          <i class="el-icon-document-checked"></i>
                          {{item.fileName}}
                        </el-link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <el-form-item label="结果" prop="result" label-width="46px">
                      <el-input
                        type="textarea"
                        v-model="caseData.result"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        :maxlength="300"
                        placeholder
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="附件" label-width="46px">
                      <el-upload
                        class="upload-assist-file"
                        action
                        :limit="3"
                        :auto-upload="false"
                        :file-list="fileList"
                      >
                        <el-button size="small" type="primary">选取文件</el-button>
                        <span slot="tip" class="upload-tips">(最多上传3个附件)</span>
                      </el-upload>
                    </el-form-item>
                  </div>
                  <div style="text-align: center;">
                    <el-button type="primary">回复</el-button>
                  </div>
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import iLocalStroage from "@/common/js/localStroage";
import { getCaseBasicInfoApi } from "@/api/caseHandle";
import { getFile } from "@/api/upload";

export default {
  computed: { ...mapGetters(["caseId"]) },
  data() {
    return {
      caseData: {},
      appendixList: [],
      host: "",
      fileList: [],
    };
  },
  methods: {
    getCaseInfo() {
      let data = { id: this.caseId };
      getCaseBasicInfoApi(data).then(
        (res) => {
          console.log(res);
          this.caseData = res.data;
          console.log("案件信息", this.caseData);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    findFileList() {
      let data = {
        caseId: this.caseData.caseId,
        docId: this.BASIC_DATA_SYS.penaltyExecution_caseLinktypeId,
      };
      //      console.log(data);
      getFile(data).then(
        (res) => {
          console.log("附件列表", res);
          this.appendixList = res.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  mounted() {},
  created() {
    // this.findFileList();
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
