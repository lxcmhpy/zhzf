<template>
  <div class="add_dialog dentail_box" style="height:auto;">
    <el-form :model="caseData" ref="caseData" label-width="90px" class="demo-ruleForm">
      <div class="top" style="height:480px;">
        <div class="add_dialog_content" style="padding-top:36px">
          <div class="border_blue"></div>
          <div class="content_bg elform_padding">
            <el-row>
              <el-col :span="12">
                <el-form-item label="案号" prop="caseNumber">
                  {{caseData.caseNumber}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="处理状态" prop="status">
                  {{caseData.state == 1?'已发送':'已完成'}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="当事人" prop="party">
                  {{caseData.party}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="涉案车/船号">
                  {{caseData.vehicleShipId}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="违法事实">
              {{caseData.wfss}}
            </el-form-item>
            <el-form-item label="案发时间">
              {{caseData.afsj}}
            </el-form-item>
            <el-form-item label="案发地点">
              {{caseData.afdd}}
            </el-form-item>
            <el-form-item label="抄告原因">
              {{caseData.copyReason}}
            </el-form-item>
          </div>
        </div>

      </div>
      <div class="btm" style="height:auto;">
        <div class="add_dialog_content">
          <div class='record_text'>流转记录</div>
          <div class="block">
            <el-timeline class="times_content">
              <el-timeline-item :timestamp="caseData.createTime" placement="top" icon="el-icon-time">
                <div class="times_info">
                  <div class="times_info_content">
                    <span class="tans_box">
                      <span class="i_box_apply">
                      </span><i class="el-icon-user-solid"></i>
                      <span style="color:#20232B">{{caseData.person}}</span>
                    </span>
                    <span>移送至</span>
                    <span>
                      <svg t="1584797983914" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="924" width="20px" height="20px">
                        <path d="M960 576v-2q-0.06-1-0.15-2v-0.27c-0.06-0.56-0.13-1.13-0.21-1.7l-0.06-0.35c-0.09-0.54-0.18-1.07-0.29-1.61 0-0.11-0.05-0.22-0.07-0.34-0.12-0.53-0.24-1.07-0.37-1.6 0-0.09 0-0.18-0.08-0.28-0.14-0.55-0.3-1.09-0.46-1.64l-0.06-0.17c-0.18-0.58-0.37-1.15-0.58-1.72a39.6 39.6 0 0 0-6.69-11.65v-0.06c-0.39-0.47-0.78-0.93-1.19-1.38-0.22-0.24-0.45-0.47-0.67-0.7s-0.42-0.45-0.64-0.67L668.14 267.57a39.88 39.88 0 0 0-56.39 0l-0.18 0.18a39.88 39.88 0 0 0 0 56.39L823.43 536H104a40 40 0 0 0 0 80h817.87A40 40 0 0 0 960 577.89v-1.12-0.77z" fill="#999999" p-id="925"></path>
                      </svg>
                    </span>
                    <span class="tans_box">
                      <span class="i_box_org">

                      </span><i class="el-icon-user-solid"></i>
                      <span style="color:#20232B">{{caseData.organMb}}</span>
                    </span>
                  </div>
                  <div>
                    <span class="times_text">备注：</span>
                    <span class="color_7B7B7B">{{caseData.notes}}</span>
                  </div>
                  <div>
                    <span class="times_text">附件（{{appendixList.length}}）</span>
                  </div>
                  <div class="document_list">
                    <ul>
                      <li v-for="(item,index) in appendixList" :key="index">
                        <i class="el-icon-document-checked"></i>
                        {{item}}
                      </li>
                    </ul>
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
export default {
  computed: { ...mapGetters(['caseId']) },
  data() {
    return {
      caseData: {},
      appendixList: [],
    }
    
  },
  methods: {
    getCaseInfo(){
      let data ={id:this.caseId}
      getCaseBasicInfoApi(data).then(res=>{
        console.log(res);
         this.caseData = res.data;
         console.log("案件信息",this.caseData)
      },err=>{
        console.log(err);
      })
    },
  },
  mounted() {
    this.caseData = this.$route.params.caseInfo,
    this.caseData.person = iLocalStroage.gets("userInfo").organName + '-' + this.caseData.person;  
    this.caseData = this.$route.params.caseInfo
    if (this.caseData.appendix != '') {
      this.appendixList = this.caseData.appendix.split(",")
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/documentForm.scss";
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