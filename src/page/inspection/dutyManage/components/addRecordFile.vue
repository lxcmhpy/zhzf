<template>
  <el-dialog
    title="添加附件材料"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
    class="add-scheduling-dialog"
  >
    <el-form
      :model="addEnclosureTypeForm"
      label-position="right"
      label-width="110px"
      ref="addEnclosureTypeRef"
      :rules="rules"
    >
      <el-row>
        <!-- <el-form-item label="材料名称" prop="name">
          <el-input v-model="addEnclosureTypeForm.name" placeholder="请输入"></el-input>
        </el-form-item> -->
        <el-form-item label="上传附件" prop="path">
          <el-upload
            action="https://jsonplaceholder.typicode.cmo/posts/"
            :auto-upload="false"
            :file-list="fileList"
            :on-change="fileChange"
            :on-remove="removeFile"
          >
            <el-button slot="trigger" type="info" size="medium">选择文件</el-button>
          </el-upload>
        </el-form-item>
        <!-- <el-form-item v-else label="分类" prop="type">
          <el-select v-model="addEnclosureTypeForm.type" placeholder="请选择">
            <el-option :label="'图片'" value="1">图片</el-option>
            <el-option :label="'音频'" value="2">音频</el-option>
            <el-option :label="'视频'" value="3">视频</el-option>
            <el-option :label="'PDF'" value="4">PDF</el-option>
            <el-option :label="'其他'" value="5">其他</el-option>
          </el-select>
        </el-form-item> -->
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { vaildateCardNum } from "@/common/js/validator";
import { addCheScheduleApi, updateCheScheduleApi } from "@/api/supervision";
import { uploadCommon } from '@/api/upload';

export default {
  props: { },
  data() {
    return {
      visible: false,
      addEnclosureTypeForm: {
        name: ""
      },
      fileList: [],
      rules: {
        name: [
          { required: true, message: "请输入材料名称", trigger: "blur" },
        ],
      },
      addType: ""
    };
  },
  computed: {
    UserInfo() {
      return iLocalStroage.gets("userInfo");
    },
  },
  created() {},
  methods: {
    //提交
    submit() {
        this.$refs.addEnclosureTypeRef.validate((valid) => {
          if (valid) {
            var params = new FormData();
            this.fileList.forEach(f => {
              params.append("file", f.raw);
            })
            const loading = this.$loading({
              lock: true,
              text: "正在上传",
              spinner: "car-loading",
              customClass: "loading-box",
              background: "rgba(234,237,244, 0.8)",
            });
            uploadCommon(params).then(
              res => {
                let attachList = [];
                res.data.forEach(file => {
                  let attach = {};
                  attach.path = file.storagePath;
                  attach.storageId = file.storageId;
                  attach.name = file.fileName;
                  attachList.push(attach);
                })
                this.$emit("addAttach", attachList);
                loading.close();
              },
              err => { console.error(err);loading.close();; }
            );
            
            this.closeDialog();
          } else {
            return false;
          }
        });
    },
    showModal() {
      this.visible = true;
    },
    // 选择文件变化
    async fileChange(file, fileList) {
      const isGt5M = file.size / 1024 / 1024 > 5;
      if (isGt5M) {
        this.$message({
          message: "上传文件大小不能超过 5MB!",
          type: "warning"
        });
      }
      // fileList.splice(0, 1, file);
      // this.fileList.splice(0, 1, file);
      this.fileList = fileList;


    },
    // 删除文件
    removeFile(){
      this.fileList.splice(0, 1);
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.fileList = [];
      this.addEnclosureTypeForm.name = "";
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
