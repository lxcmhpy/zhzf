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
            <el-date-picker
              v-model="addNoticeForm.publishTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              style="width:100%"
            ></el-date-picker>
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
          <!-- :http-request="saveFile" accept=".pdf" -->
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :file-list="fileList"
            :on-change="handleChange"
          >
            <el-button size="small" type="primary">点击上传</el-button>
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
import { upload } from "@/api/upload";
import { saveOrUpdateNotice, findNoticeById } from "@/api/notice/notice.js";
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
      },
      storageId: [],
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
  methods: {
    handleChange(file, fileList) {
      debugger;
      this.fileList = fileList;
    },
    async saveFile(param) {
      var fd = new FormData();
      fd.append("file", param.raw);
      fd.append("fileName", param.name);
      fd.append("userId", iLocalStroage.gets("userInfo").id);
      fd.append("category", "公告");
      fd.append("caseId", param.name + new Date().getTime()); //传记录id
      fd.append("docId", param.name + new Date().getTime()); //传记录id
      let res = await upload(fd);
      debugger;
      this.storageId.push(res.data[0].storageId);
    },

    async uploadFiles() {
      for (var i = 0; i < this.fileList.length; i++) {
        var param = this.fileList[i];
        if (param.storageId) {
          this.storageId.push(param.storageId);
        } else {
          await this.saveFile(param);
        }
      }
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
        this.addNoticeForm = {
          title: "",
          source: "",
          content: "",
          publishTime: "",
          type: data.type,
          id: "",
        };
      } else if (type == 2) {
        this.dialogTitle = "修改";
        let _this = this;
        findNoticeById(data.id).then(
          (res) => {
            _this.addNoticeForm = res.data;
            _this.fileList = res.data.fileUploadVos;
            if (_this.fileList.length > 0) {
              _this.fileList.forEach((item) => {
                item.name = item.fileName;
              });
            }
          },
          (err) => {
            console.log(err);
          }
        );
      }
    },
    submit() {
      console.log(this.$refs.myQuillEditor.value);
    },
    //新增公告 修改公告
    async addOrEditNotice(formName) {
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.uploadFiles().then((res) => {
            debugger;
            _this.addNoticeForm.storageId = _this.storageId.join(":");
            saveOrUpdateNotice(_this.addNoticeForm).then(
              (res) => {
                _this.$message({
                  type: "success",
                  message: "保存成功!",
                });
                _this.closeDialog();
              },
              (err) => {
                console.log(err);
              }
            );
          });
        }
      });
    },
    closeDialog() {
      this.visible = false;
      this.$emit("success");
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
