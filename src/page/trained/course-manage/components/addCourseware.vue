<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    :show-close="!inProgress"
    width="35%"
    class="add-course-dialog"
  >
    <el-form
      :model="addCourseForm"
      label-position="right"
      label-width="110px"
      ref="addCourseRef"
      :rules="rules"
    >
      <el-row>
        <el-form-item label="课件名称" prop="couName" class="form-class">
          <el-input v-model="addCourseForm.couName"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="课件类型" prop="couType">
          <el-select v-model="addCourseForm.couType" @change="changeType">
            <el-option key="1" label="文档" value="1"></el-option>
            <el-option key="2" label="视频" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row v-if="addCourseForm.couType">
        <el-form-item label-width="110px">
          <div class="upload-course-file">
            <div class="upload-progress">
              <el-progress v-if="uploadProgress > 0" :text-inside="true" :stroke-width="32" :percentage="uploadProgress" status="success"></el-progress>
              <div class="file-name-view" v-if="addCourseForm.name && !inProgress">{{ addCourseForm.name }}</div>
            </div>
            <div class="select-btn">
              <el-upload
                class="upload-cover"
                action
                :show-file-list="false"
                :accept="uploadAccept"
                :auto-upload="true"
                :file-list="coursewareFileList"
                :on-change="handleFileChange"
                :http-request="uploadFlie"
              >
                <el-button slot="trigger" size="small" class="upload-btn">上传</el-button>
              </el-upload>
            </div>
          </div>
          <div class="upload-import-text">1、文档类课件支持格式：doc、docx、ppt、pptx、pdf</div>
          <div class="upload-import-text">2、视频类课件支持格式：mp4、wmv、avi</div>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="课件观看时长" prop="couTimeHou">
          <el-time-picker
            v-model="addCourseForm.couTimeHou"
            default-value="00:00:00"
            format="HH:mm:ss"
            value-format="HH:mm:ss"
            @blur="setCouTime"></el-time-picker>
          <!-- <el-input v-model="addCourseForm.couTime" @input="trimCoutime()"></el-input> -->
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="学分" prop="couCredits" class="form-class">
          <el-input v-model="addCourseForm.couCredits" @input="trim()"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog" :disabled="inProgress">取 消</el-button>
      <el-button type="primary" @click="submit" :disabled="inProgress">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import request from "@/common/js/request";
import {setCancelSource} from  "@/common/js/cancelToken";
import { editCoursewareInfo } from "@/api/trained";

export default {
  data() {
    const validateCouTimeHou = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入课程观看时长'));
      } else {
        if(value === '00:00:00'){
          callback(new Error('课程观看时长不能为0'));
        }
        callback();
      }
    };
    return {
      visible: false,
      addCourseForm: {
        lessonId: '',
        couName: "", // 课程名称
        couType: "", // 课程类型
        couTimeHou: "00:00:00", // 观看时长
        couTime: '',
        couCredits: "", // 学分
        path: '',
        name: '',
        id: '',
        couId: ''
      },
      rules: {
        couName: [
          { required: true, message: "课程名称不能为空", trigger: "blur" }
        ],
        couType: [
          { required: true, message: "课程类型不能为空", trigger: "change" }
        ],
        couTimeHou: [
          { required: true, validator: validateCouTimeHou, trigger: "blur" }
        ],
        couCredits: [
          { required: true, message: "学分不能为空", trigger: "blur" }
        ]
      },
      dialogTitle: "", //弹出框title
      handelType: 0, //添加 0  修改2
      coursewareType: '',
      uploadAccept: '',
      coursewareFileList: [],
      uploadProgress: 0,
      inProgress: false
    };
  },
  created(){},
  methods: {
    changeType(event) {
      this.addCourseForm.couType = event;
      this.uploadAccept = '';
      if(event === '1'){
        this.uploadAccept = '.pdf';
      } else if(event === '2'){
        this.uploadAccept = '.mp4, .wmv, .avi';
      }
      this.addCourseForm.couTimeHou = '00:00:00';
      this.addCourseForm.couTime = '';
    },
    trim() {
      this.addCourseForm.couCredits = this.addCourseForm.couCredits.replace(/[^\d]/g, '');
    },
    trimCoutime(){
      this.addCourseForm.couTime = this.addCourseForm.couTime.replace(/[^\d]/g, '');
    },
    checkCoutype(){
      this.$message({ type: 'info', message: '请先选择课件类型' });
    },
    // 课程观看时长格式转换
    setCouTime(){
      const timeArray = this.addCourseForm.couTimeHou.split(':');
      const hou = timeArray[0] - 0;
      let min = timeArray[1] - 0;
      const sec = timeArray[2] - 0;
      if(sec > 0){
        min += 1;
      }
      this.addCourseForm.couTime = hou * 60 + min;
    },
    // 选择文件变化
    handleFileChange(file, fileList){
      this.coursewareFileList.splice(0, 1, file);
      fileList.splice(0, 1);
      if(this.addCourseForm.couType === '2'){
        let windowURL = window.URL || window.webkitURL;
        // 获取视频或者音频时长
        const fileurl = windowURL.createObjectURL(file.raw);
        // audio获取视频的时长
        const audioElement = new Audio(fileurl);
        let duration;
        audioElement.addEventListener("loadedmetadata", (event) => {
          duration = audioElement.duration;
          this.coutimeFormate(duration, true);
        });
      }
    },
    // 时长转换为时分秒
    coutimeFormate(couTime, setVal){
      const time = couTime - 0;
      // 获取分、秒
      let hou = parseInt((time % (60 * 60 * 24)) / 3600);
      let min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60);
      let sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60);

      let timeObj = {
        hou: this.timeFormat(hou),
        min: this.timeFormat(min),
        sec: this.timeFormat(sec)
      };
      this.addCourseForm.couTimeHou = `${timeObj.hou}:${timeObj.min}:${timeObj.sec}`;
      if(setVal){
        this.setCouTime();
      }
    },
    timeFormat(param) {
      return param < 10 ? "0" + param : param;
    },
    uploadFlie(){
      this.inProgress = true;
      const formData = new FormData();
      formData.append("file", this.coursewareFileList[0].raw);
      formData.append("lessonId", this.addCourseForm.lessonId);
      request({
        url:  "/system/sys/file/uploadCommon",
        method:  "POST",
        data: formData,
        contentType: 'multipart/form-data;',
        showloading: false,
        cancelToken:  setCancelSource(),
        onUploadProgress: (progressEvent) => {
          let progressNum = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
          this.uploadProgress = progressNum;
        }
      }).then(res => {
        this.inProgress = false;
        this.uploadProgress = 0;
        if(res.code === 200){
          this.addCourseForm.path = res.data[0].storageId;
          this.addCourseForm.name = this.coursewareFileList[0].name;
          this.addCourseForm.id = res.data[0].id;
          this.$message({ type: 'success', message: '课件上传成功' });
        }
        if(typeof res.data === 'string'){
          this.$message({ type: 'success', message: res.data });
        }
      }, err => {
        this.inProgress = false;
        this.uploadProgress = 0;
        this.$message({ type: 'error', message: '文件上传失败!' });
      });
    },
    //提交
    submit() {
      if(!this.addCourseForm.id){
        this.$message({ type: 'info', message: '请上传课件文件' });
        return false;
      }
      this.$refs.addCourseRef.validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "正在保存",
            spinner: "car-loading",
            customClass: "loading-box",
            background: "rgba(234,237,244, 0.8)"
          });
          let successMsg = "添加成功!";
          if (this.handelType == "1") {
            successMsg = "添加成功!";
          } else if (this.handelType == "2") {
            successMsg = "修改成功!";
          }
          let editType = this.handelType === "2" ? "edit" : "";
          const params = JSON.parse(JSON.stringify(this.addCourseForm));
          delete params.couTimeHou; 
          editCoursewareInfo(params, editType).then(
            res => {
              this.$emit("getCoursewareComp");
              this.$message({ type: "success", message: successMsg });
              this.closeDialog();
              loading.close();
            },
            err => {
              loading.close();
              this.$message({ type: "error", message: err.msg || "" });
            }
          );
        } else {
          return false;
        }
      });
    },
    showModal(type, data) {
      this.visible = true;
      this.handelType = type;
      this.addCourseForm.lessonId = data.lessonId;
      if (type == "1") {
        //新增
        this.dialogTitle = "新增课件";
      } else if (type == "2") {
        //修改
        this.dialogTitle = "修改课件";
        for (const key in this.addCourseForm) {
          this.addCourseForm[key] = data[key];
        }
        this.inProgress = false;
        if(this.addCourseForm.couTime){
          this.coutimeFormate(this.addCourseForm.couTime * 60);
        }
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addCourseRef"].resetFields();
      this.uploadAccept = '';
      this.currentType = '';
      this.coursewareFileList.splice(0, this.coursewareFileList.length);
      for (const key in this.addCourseForm) {
        this.addCourseForm[key] = "";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.add-course-dialog {
  .upload-btn {
    padding: 10px 24px;
    background: linear-gradient(
      180deg,
      rgba(248, 248, 248, 1) 0%,
      rgba(238, 238, 238, 1) 100%
    );
    color: #20232b;
    border: none;
    border-left: 1px solid rgba(221, 221, 221, 1);
    &:hover {
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(229, 234, 246, 1) 100%
      );
    }
  }
  .upload-course-file {
    position: relative;
    width: 100%;
    height: 32px;
    line-height: 32px;
    border: 1px solid rgba(221, 221, 221, 1);
    display: flex;
    align-items: center;
    .upload-progress {
      flex: 1;
      >>> .el-progress-bar__outer,
      >>> .el-progress-bar__inner {
        border-radius: 0;
      }
      >>> .el-progress-bar__outer {
        background: rgba(195, 226, 225, 1);
      }
      >>> .el-progress-bar__inner {
        background: rgba(74, 175, 167, 1);
      }
      .file-name-view{
        padding: 0 14px;
        overflow     : hidden;
        text-overflow: ellipsis;
        white-space  : nowrap;
      }
    }
  }
  .upload-import-text {
    color: #999;
    line-height: 28px;
  }
}
>>> .el-select,
>>> .el-date-editor {
  display: block;
}
>>> .el-date-editor.el-input,
>>> .el-date-editor.el-input__inner {
  display: block;
  width: 100%;
}
</style>
