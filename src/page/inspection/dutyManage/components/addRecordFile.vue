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
        <el-form-item label="材料名称" prop="materialName">
          <el-input v-model="addEnclosureTypeForm.materialName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item v-if="addType === 'file'" label="上传附件" prop="materialName">
          <el-upload
            action
            :auto-upload="false"
            :file-list="fileList"
            :on-change="fileChange"
            :on-remove="removeFile"
          >
            <el-button slot="trigger" type="info" size="medium">选择文件</el-button>
          </el-upload>
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
import { vaildateCardNum } from "@/common/js/validator";
import { addCheScheduleApi, updateCheScheduleApi } from "@/api/supervision";

export default {
  props: { },
  data() {
    return {
      visible: false,
      addEnclosureTypeForm: {
        materialName: "",
      },
      fileList: [],
      rules: {
        materialName: [
          { required: true, message: "请输入材料名称", trigger: "blur" },
        ],
      },
      addType: 'type'
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
          const loading = this.$loading({
            lock: true,
            text: "正在保存",
            spinner: "car-loading",
            customClass: "loading-box",
            background: "rgba(234,237,244, 0.8)",
          });

          loading.close();
          this.closeDialog();
        } else {
          return false;
        }
      });
    },
    showModal(type, data) {
      this.addType = type;
      this.visible = true;
    },
    // 选择文件变化
    fileChange(file, fileList) {
      const isGt5M = file.size / 1024 / 1024 > 5;
      if (isGt5M) {
        this.$message({
          message: "上传文件大小不能超过 5MB!",
          type: "warning"
        });
      }
      fileList.splice(0, 1, file);
      this.fileList.splice(0, 1, file);
    },
    // 删除文件
    removeFile(){
      this.fileList.splice(0, 1);
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.fileList.splice(0, this.fileList.length);
      this.addEnclosureTypeForm.materialName = "";
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
