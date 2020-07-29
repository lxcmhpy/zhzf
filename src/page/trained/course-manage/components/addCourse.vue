<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
    class="add-course-dialog"
  >
    <el-form
      :model="addCourseForm"
      label-position="right"
      label-width="100px"
      ref="addCourseRef"
      :rules="rules"
    >
      <el-row type="flex" :gutter="20" class="upload-cover-row">
        <el-col :span="8" style="margin-left:24px;">
          <el-image class="course-cover-img" :src="descImages[0] ? descImages[0].url : ''">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </el-col>
        <el-col :span="12">
          <el-upload
            class="upload-cover"
            action
            :show-file-list="false"
            accept=".jpg, .png"
            :auto-upload="false"
            :file-list="descImages"
            :on-change="handleCoverChange"
          >
            <el-button size="small" class="upload-btn">封面上传</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="课程名称" prop="lessonName" class="form-class">
          <el-input v-model="addCourseForm.lessonName"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="课程类型" prop="lessonType">
          <el-select v-model="addCourseForm.lessonType">
            <el-option :key="'2'" label="专业课程" :value="'2'"></el-option>
            <el-option :key="'1'" label="日常课程" :value="'1'"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="课程简介" prop="lessonComment" class="form-class">
          <el-input
            type="textarea"
            :rows="3"
            maxlength="300"
            show-word-limit
            v-model="addCourseForm.lessonComment"
          ></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submit">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { addCourseInfo, uploadCourseFile } from "@/api/trained";

export default {
  data() {
    return {
      lessonTypeInfo: [],
      visible: false,
      descImages: [],
      addCourseForm: {
        lessonId: "",
        lessonName: "", // 课程名称
        lessonType: "", // 课程类型
        lessonComment: "" // 课程描述
      },
      rules: {
        lessonName: [
          { required: true, message: "课程名称不能为空", trigger: "blur" }
        ],
        lessonType: [
          { required: true, message: "课程类型不能为空", trigger: "change" }
        ]
      },
      dialogTitle: "", //弹出框title
      handelType: 0 //添加 0  修改2
    };
  },
  computed:{
    baseUrl(){
      return iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST;
    }
  },
  methods: {
    changeType(event) {
      this.addCourseForm.lessonType = event;
    },
    //提交
    submit() {
      this.$refs.addCourseRef.validate(valid => {
        if (valid) {
          this.uploadCoverImg();
        } else {
          return false;
        }
      });
    },
    // 上传课程封面到文件服务器
    uploadCoverImg() {
      if (this.descImages.length === 0) {
        this.$message({ message: "请选择课程封面", type: "warning" });
        return false;
      }
      const loading = this.$loading({
        lock: true,
        text: "正在保存",
        spinner: "car-loading",
        customClass: "loading-box",
        background: "rgba(234,237,244, 0.8)"
      });
      const coverImage = this.descImages[0];
      if (coverImage && coverImage.status === "ready") {
        const formData = new FormData();
        formData.append("file", coverImage.raw);
        this.$store.dispatch('uploadMaterial', formData).then(res => {
          if(res.code === 200){
            if(res.data && res.data.length){
              this.addCourseForm.lessonPic = res.data[0].storageId;
            }
            this.descImages.forEach(item => item.status = 'success');
            this.saveCourseInfo(loading);
          }
        }, err => {
          loading.close();
          this.$message({type: 'error', message: err.msg || ''});
        });
      } else {
        this.saveCourseInfo(loading);
      }
    },
    // 保存课程信息
    saveCourseInfo(loading) {
      let successMsg = this.handelType == "2" ? "修改成功!" : "添加成功";
      let editType = this.handelType == "2" ? "edit" : "";
      if(this.addCourseForm.lessonPic){
        this.addCourseForm.lessonPic = this.addCourseForm.lessonPic.replace(this.baseUrl, '');
      }
      addCourseInfo(this.addCourseForm, editType).then(
        res => {
          this.$emit("getCourseList");
          this.$message({ type: "success", message: successMsg });
          this.closeDialog();
          loading.close();
        },
        err => {
          loading.close();
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    // 选择课程封面
    handleCoverChange(file, fileList) {
      const isGt2M = file.size / 1024 / 1024 > 2;
      if (isGt2M) {
        this.$message({
          message: "封面图片大小不能超过 2MB!",
          type: "warning"
        });
        fileList.splice(0, 1);
        this.descImages.splice(0, 1);
      } else {
        fileList.splice(0, fileList.length);
        if(!file.url){
          if (window.createObjectURL != undefined) {
            file.url = window.createObjectURL(file.raw);
          } else if (window.URL != undefined) {
            file.url = window.URL.createObjectURL(file.raw);
          } else if (window.webkitURL != undefined) {
            file.url = window.webkitURL.createObjectURL(file.raw);
          }
        }
        this.descImages.splice(0, 1, file);
      }
    },
    //点击下拉框的时查询试卷类型
    getDictInfo(name, codeName) {
      if (this[codeName].length) return;
      this.$store.dispatch("findAllDrawerByName", name).then(
        //考试类型
        res => {
          if (res.code === 200) {
            this[codeName] = res.data;
          } else {
            console.info("没有查询到数据");
          }
        }
      );
    },
    showModal(type, row) {
      this.visible = true;
      this.handelType = type;
      if (type == "1") {
        //新增
        this.dialogTitle = "新增课程";
      } else if (type == "2") {
        //修改
        this.dialogTitle = "修改课程";
        for (const key in this.addCourseForm) {
          this.addCourseForm[key] = row[key];
        }
        if(row.lessonPic){
          this.descImages.push({ url: this.baseUrl + row.lessonPic, status: 'success' });
        }
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addCourseRef"].resetFields();
      for (const key in this.addCourseForm) {
        this.addCourseForm[key] = "";
      }
      this.descImages.splice(0, this.descImages.length);
    }
  }
};
</script>
<style lang="scss" scoped>
.add-course-dialog {
  .upload-cover-row {
    align-items: center;
    margin-bottom: 14px;
  }
  .course-cover-img {
    width: 100%;
    height: 110px;
    background: rgba(244, 244, 244, 1);
    text-align: center;
    line-height: 110px;
    font-size: 28px;
  }
  .upload-btn {
    padding: 9px 34px;
    background: linear-gradient(
      180deg,
      rgba(248, 248, 248, 1) 0%,
      rgba(238, 238, 238, 1) 100%
    );
    color: #20232b;
    border: 1px solid rgba(221, 221, 221, 1);
    &:hover {
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(229, 234, 246, 1) 100%
      );
    }
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
