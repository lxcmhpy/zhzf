<template>
  <!-- 协查详情 -->
  <div class="dentail_box assist-detail" style="height:auto;">
    <el-form
      :model="caseData"
      :rules="rules"
      ref="caseDataRef"
      label-width="90px"
      class="demo-ruleForm"
    >
      <div class="top" style="height:480px;">
        <div class="add_dialog_content">
          <div class="border_blue"></div>
          <div class="content_bg elform_padding">
            <el-row>
              <el-col :span="24">
                <el-form-item label="案号" prop="caseNumber">
                  {{ selectCase.caseNumber }}
                  <el-button plain size="small" style="margin-left: 30px;" @click="nextStep(0)">重新选择</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label="案由"
                  prop="caseOfAction"
                >{{ `${selectCase.party || selectCase.partyName}${selectCase.caseCauseName}`}}</el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="assist-detail-form">
            <el-form-item label="目标机构" prop="targetOrgan">
              <el-input
                placeholder="请输入目标机构"
                v-model="caseData.targetOrgan"
                class="select-target-organ"
                :disabled="organType === '1'"
              >
                <el-select
                  class="select-organ-type"
                  v-model="organType"
                  slot="prepend"
                  placeholder="机构类型"
                  @change="organChange"
                >
                  <el-option label="执法机构" value="1"></el-option>
                  <el-option label="公安机关" value="2"></el-option>
                  <el-option label="司法机关" value="3"></el-option>
                  <el-option label="其他部门" value="4"></el-option>
                </el-select>
                <div
                  v-if="organType === '1'"
                  class="select-law-organ"
                  slot="append"
                  @click="clickTargetOrganInput"
                >{{ lawOrganName ? lawOrganName: '请选择目标机构'}}</div>
              </el-input>
            </el-form-item>
            <el-form-item label="附件">
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
            <el-form-item label="说明" prop="explain">
              <el-input
                type="textarea"
                v-model="caseData.explain"
                :autosize="{ minRows: 2, maxRows: 4}"
                :maxlength="300"
                placeholder
              ></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="btm"></div>
      <!-- <div class="btm" style="height:auto;">
        <div class="add_dialog_content">
          <div class="record_text">流转记录</div>
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
                    <span>移送至</span>
                    <span>
                      <svg
                        t="1584797983914"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="924"
                        width="20px"
                        height="20px"
                      >
                        <path
                          d="M960 576v-2q-0.06-1-0.15-2v-0.27c-0.06-0.56-0.13-1.13-0.21-1.7l-0.06-0.35c-0.09-0.54-0.18-1.07-0.29-1.61 0-0.11-0.05-0.22-0.07-0.34-0.12-0.53-0.24-1.07-0.37-1.6 0-0.09 0-0.18-0.08-0.28-0.14-0.55-0.3-1.09-0.46-1.64l-0.06-0.17c-0.18-0.58-0.37-1.15-0.58-1.72a39.6 39.6 0 0 0-6.69-11.65v-0.06c-0.39-0.47-0.78-0.93-1.19-1.38-0.22-0.24-0.45-0.47-0.67-0.7s-0.42-0.45-0.64-0.67L668.14 267.57a39.88 39.88 0 0 0-56.39 0l-0.18 0.18a39.88 39.88 0 0 0 0 56.39L823.43 536H104a40 40 0 0 0 0 80h817.87A40 40 0 0 0 960 577.89v-1.12-0.77z"
                          fill="#999999"
                          p-id="925"
                        />
                      </svg>
                    </span>
                    <span class="tans_box">
                      <span class="i_box_org"></span>
                      <i class="el-icon-user-solid"></i>
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
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>-->
    </el-form>
    <!-- 选择目标机构 -->
    <SelectTargetOrgan
      ref="SelectTargetOrganRef"
      dialogTitle="选择目标机构"
      :currentCheckedNode="caseData.targetOrgan"
      @setTargetorgan="setTargetorgan"
    />
    <div class="assist-right-btn">
      <el-button class="assist-step-btn" type="primary" @click="nextStep(2)">下一步</el-button>
    </div>
  </div>
</template>

<script>
import iLocalStroage from "@/common/js/localStroage";
import SelectTargetOrgan from "@/page/caseHandle/assistCase/selectTargetOrgan";

export default {
  components: { SelectTargetOrgan },
  computed: {
    selectCase() {
      const caseInfo = JSON.parse(sessionStorage.getItem("AssistData"));
      return caseInfo.case;
    },
    UserInfo() {
      return iLocalStroage.gets("userInfo");
    },
  },
  data() {
    return {
      caseData: {
        explain: "",
        targetOrgan: "",
      },
      fileList: [],
      organType: "",
      lawOrganName: "",
      rules: {
        targetOrgan: [
          { required: true, message: "请先选择机构类型再输入目标机构", trigger: "blur" },
        ],
        explain: [
          { required: true, message: "请输入协查说明", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    console.log(this.selectCase);
  },
  methods: {
    // 选择目标机构
    clickTargetOrganInput() {
      if (this.organType === "1") {
        this.$refs.SelectTargetOrganRef.showModal();
      }
    },
    organChange() {
      this.caseData.targetOrgan = "";
      this.lawOrganName = "";
    },
    // 下一步
    nextStep(step) {
      if (step === 2) {
        this.$refs.caseDataRef.validate((isVaild) => {
          if (isVaild) {
            this.nextSubmitForm();
          }
        });
      } else {
        this.$emit("nextStep", step);
      }
    },
    // 上传附件同时缓存数据
    nextSubmitForm() {
      sessionStorage.setItem(
        "AssistData",
        JSON.stringify({ case: this.selectCase, detail: this.caseData })
      );
      this.$emit("nextStep", step);
    },
    // 目标机构赋值
    setTargetorgan(data) {
      this.caseData.targetOrgan = data.id;
      this.lawOrganName = data.label;
      this.$refs.caseDataRef.clearValidate('targetOrgan');
    },
  },
};
</script>
<style lang="scss" src="@/assets/css/documentForm.scss"  scoped></style>
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
.dentail_box.assist-detail {
  .top {
    margin-bottom: 0;
    .add_dialog_content {
      width: 58%;
      padding-top: 36px;
    }
  }
  .assist-detail-form {
    .select-target-organ {
      >>> .el-input-group__prepend {
        width: 120px;
        padding: 0;
      }
      .select-organ-type {
        margin: 0;
        >>> .el-input {
          background: #fff;
        }
        >>> .el-input__inner {
          height: 30px;
        }
        >>> .el-select__caret {
          line-height: 30px;
        }
      }
      >>> .el-input-group__append {
        position: absolute;
        left: 120px;
        top: 0;
        bottom: 0;
        width: calc(100% - 160px);
        cursor: pointer;
        .select-law-organ {
          height: 100%;
          line-height: 30px;
        }
      }
    }
  }
  .upload-assist-file {
    display: inline-block;
  }
  .upload-tips {
    color: #606266;
    margin-left: 16px;
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
}
</style>
