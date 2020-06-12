<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="80%"
  >
    <el-form :model="addNoticeForm" :rules="rules" ref="addNoticeForm" label-width="80px">
      <input hidden v-model="addNoticeForm.id" />
      <input hidden v-model="addNoticeForm.storageId" />
      <input hidden v-model="addNoticeForm.fileName" />
      <div class="item">
        <el-form-item label="公告名称" prop="title">
          <el-input v-model="addNoticeForm.title"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="公告类型" prop="noticeType">
          <el-select v-model="addNoticeForm.noticeType"  @change="changehyType" >
            <el-option value="附件" label="附件"></el-option>
            <el-option value="普通" label="普通"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="item" :hidden="showUpload" >
        <el-form-item label="公告内容" prop="content">
          <quill-editor v-model="addNoticeForm.content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)" @change="onEditorChange($event)"></quill-editor>
        </el-form-item>
      </div>
      <div class="item" :hidden="!showUpload">
      <el-upload
        class="upload-demo"
        :http-request="saveFile"
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
        :on-exceed="handleExceed"
        :file-list="fileList"
        :limit="1"
        :before-upload="beforeAvatarUpload">
        <el-button size="small" type="primary"  v-show="true">上传</el-button>
    </el-upload>
    </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="addOrEditNotice('addNoticeForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import {
    quillEditor
  } from "vue-quill-editor"; //调用编辑器
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  import iLocalStroage from "@/common/js/localStroage.js";
  import {addOrUpdateNoticeApi,uploadNoticeFile} from "@/api/appraisalExam.js";
  export default {
    components: {
      quillEditor
    },
    data() {
      return {
        showUpload:false,
        fileList:[],
        addNoticeForm: {
          title: "",
          noticeType:"",
          content: "",
          id:"",
          fileName:""
        },
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          noticeType: [
            { required: true, message: '请选择公告类型', trigger: 'change' }
          ]
        },
        dialogTitle: "公告",
        visible: false,
        handelType: 0, //添加 0  修改2
        editorOption: {
          placeholder: "请输入...",
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
              ['blockquote', 'code-block'], //引用，代码块

              [{
                'header': 1
              }, {
                'header': 2
              }], // 标题，键值对的形式；1、2表示字体大小
              [{
                'list': 'ordered'
              }, {
                'list': 'bullet'
              }], //列表
              [{
                'script': 'sub'
              }, {
                'script': 'super'
              }], // 上下标
              [{
                'indent': '-1'
              }, {
                'indent': '+1'
              }], // 缩进
              [{
                'direction': 'rtl'
              }], // 文本方向

              [{
                'size': ['small', false, 'large', 'huge']
              }], // 字体大小
              [{
                'header': [1, 2, 3, 4, 5, 6, false]
              }], //几级标题

              [{
                'color': []
              }, {
                'background': []
              }], // 字体颜色，字体背景颜色
              [{
                'font': []
              }], //字体
              [{
                'align': []
              }], //对齐方式

              ['clean'], //清除字体样式
              ['image', 'video'] //上传图片、上传视频

            ]
          },
          theme: 'snow'
        }
    }
  },
  inject: ["reload"],
  methods: {
      changehyType(val) {
        if(val==="普通"){
          this.showUpload = false
          this.addNoticeForm.storageId = ""
          this.fileList=[]
        }else{
          this.showUpload = true
          this.addNoticeForm.content = ""
        }
      },
      handleExceed(files, fileList){
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeAvatarUpload(file) {
        const isPDF = file.type === "application/pdf";
        if (!isPDF) {
          this.$message.error('上传附件只能是PDF格式!');
        }
        return isPDF ;
      },
      saveFile(param) {
        console.log(param);
        var fd = new FormData();
        fd.append("file", param.file);
        fd.append("userId", iLocalStroage.gets("userInfo").id);
        fd.append("category", "公告");
        let _this = this
        uploadNoticeFile(fd).then(res => {
          console.log("1111111",res);
          if (res.code == 200){
            _this.addNoticeForm.storageId = res.data
            _this.addNoticeForm.fileName =param.file.name
          }else{
            _this.$message.error('出现异常，添加失败！');
          }
        });   
      },
      onEditorReady(editor) { // 准备编辑器
      },
      onEditorBlur() {}, // 失去焦点事件
      onEditorFocus() {}, // 获得焦点事件
      onEditorChange() {}, // 内容改变事件
      showModal(type, data) {
        if(data.noticeType==="普通"){
          this.showUpload = false
        }else{
          this.showUpload = true
        }
        this.visible = true;
        this.handelType = type;
        this.fileList=[]
        if (type == 0) {
          this.dialogTitle = "新增公告";
          this.addNoticeForm.title=""
          this.addNoticeForm.noticeType="普通"
          this.addNoticeForm.content=""
          this.addNoticeForm.id=""
          this.addNoticeForm.storageId=""
          this.showUpload = false
        } else if (type == 2) {
          this.dialogTitle = "修改公告";
          this.addNoticeForm.title=data.title,
          this.addNoticeForm.noticeType=data.noticeType;
          this.addNoticeForm.content=data.content;
          this.addNoticeForm.id=data.id;
          this.addNoticeForm.storageId=data.storageId;
          if(data.storageId !== ""){
            let fileData = {}
            fileData.name = data.fileName
            fileData.url = data.storageId
            this.fileList.push(fileData)
          }
        }
      },
      submit() {
        console.log(this.$refs.myQuillEditor.value)
      },
      //新增公告 修改公告
      addOrEditNotice(formName) {
        let _this = this
        this.$refs[formName].validate(valid => {
          if (valid) {
            addOrUpdateNoticeApi(_this.addNoticeForm).then(
                res => {
                  _this.$message({
                    type: "success",
                    message:"保存成功!"
                  });
                  _this.visible = false;
                  _this.reload();
                },
                err => {
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
    }
  }

</script>
<style>
  .edit_container,
  .quill-editor {
    height: 300px;
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
