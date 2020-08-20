<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="1000px"
  >
    <el-form :model="addNoticeForm" :rules="rules" ref="addNoticeForm" label-width="80px">
      <input hidden v-model="addNoticeForm.id" />
      <el-row>
        <el-col>
          <el-form-item label="标题" prop="title">
            <el-input v-model="addNoticeForm.title"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="来源" prop="source">
            <el-input v-model="addNoticeForm.source"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发布时间" prop="publishTime">
            <el-input v-model="addNoticeForm.publishTime"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="内容" prop="content">
          <quill-editor
            v-model="addNoticeForm.content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
          ></quill-editor>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="附件">
          <el-upload
            class="upload-demo"
            accept=".pdf"
            ref="caseUpload"
            :http-request="saveFile"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :file-list="fileList"
          >
            <el-button size="small" type="primary" v-show="true">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="addOrEditNotice('addNoticeForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import iLocalStroage from "@/common/js/localStroage.js";
// import { uploadFuncO } from '@/api/upload'
// import { addOrUpdateNoticeApi } from '@/api/pykh/appraisalExam.js'
export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      showUpload: false,
      fileList: [],
      addNoticeForm: {
        title: "",
        source: "",
        content: "",
        publishTime: "",
        type: "",
        id: "",
        storageIds: [],
      },
      rules: {
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur",
          },
        ],
        source: [
          {
            required: true,
            message: "请选择公告类型",
            trigger: "change",
          },
        ],
      },
      dialogTitle: "公告",
      visible: false,
      handelType: 0, //添加 0  修改2
      editorOption: {
        placeholder: "请输入...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
            ["blockquote", "code-block"], //引用，代码块

            [
              {
                header: 1,
              },
              {
                header: 2,
              },
            ], // 标题，键值对的形式；1、2表示字体大小
            [
              {
                list: "ordered",
              },
              {
                list: "bullet",
              },
            ], //列表
            [
              {
                script: "sub",
              },
              {
                script: "super",
              },
            ], // 上下标
            [
              {
                indent: "-1",
              },
              {
                indent: "+1",
              },
            ], // 缩进
            [
              {
                direction: "rtl",
              },
            ], // 文本方向

            [
              {
                size: ["small", false, "large", "huge"],
              },
            ], // 字体大小
            [
              {
                header: [1, 2, 3, 4, 5, 6, false],
              },
            ], //几级标题

            [
              {
                color: [],
              },
              {
                background: [],
              },
            ], // 字体颜色，字体背景颜色
            [
              {
                font: [],
              },
            ], //字体
            [
              {
                align: [],
              },
            ], //对齐方式

            ["clean"], //清除字体样式
            ["image", "video"], //上传图片、上传视频
          ],
        },
        theme: "snow",
      },
    };
  },
  // inject: ['reload'],
  methods: {
    // changehyType(val) {
    //   if (val === "普通") {
    //     this.showUpload = false;
    //     this.addNoticeForm.storageId = "";
    //     this.fileList = [];
    //   } else {
    //     this.showUpload = true;
    //     this.addNoticeForm.content = "";
    //   }
    // },
    saveFile(param) {
      console.log(param);
      var fd = new FormData();
      fd.append("file", param.file);
      fd.append("userId", iLocalStroage.gets("userInfo").id);
      fd.append("category", "公告");
      //   fd.append("storageId", this.addNoticeForm.storageId);
      let _this = this;
      uploadFuncO.uploadPykh(fd).then((res) => {
        if (res.code == 200) {
          _this.addNoticeForm.storageIds.push(res.data);
          _this.addNoticeForm.fileName = param.file.name;
        } else {
          _this.$message.error("出现异常，添加失败！");
          _this.$refs.caseUpload.clearFiles();
        }
      });
    },
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    showModal(type, data) {
      this.visible = true;
      this.fileList = [];
      if (type == 1) {
        this.dialogTitle = "新增";
        this.addNoticeForm.type = data.type;
      } else if (type == 2) {
        this.dialogTitle = "修改";
        this.addNoticeForm = data;
        /* (this.addNoticeForm.title = data.title),
          (this.addNoticeForm.noticeType = data.noticeType);
        this.addNoticeForm.content = data.content;
        this.addNoticeForm.id = data.id;
        this.addNoticeForm.storageId = data.storageId;
        if (data.storageId !== "") {
          let fileData = {};
          fileData.name = data.fileName;
          fileData.url = data.storageId;
          this.fileList.push(fileData);
        } */
      }
    },
    submit() {
      console.log(this.$refs.myQuillEditor.value);
    },
    //新增公告 修改公告
    addOrEditNotice(formName) {
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addOrUpdateNoticeApi(_this.addNoticeForm).then(
            (res) => {
              _this.catsMessage({
                type: "success",
                message: "保存成功!",
              });
              _this.visible = false;
              // 回调函数
              this.$emit("callBackFunc", true);
            },
            (err) => {
              console.log(err);
            }
          );
        }
      });
    },
    closeDialog() {
      this.visible = false;
    },
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
};
</script>
<style>
.edit_container,
.quill-editor {
  height: 200px;
  display: inline-block;
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
</style>
