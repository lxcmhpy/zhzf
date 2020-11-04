<template>
  <div style="width:100%;float:left;margin-top:30px;margin-bottom:30px;">
    <div class="card-title">
      <font class="font" style="font-size:25px;">
        <span class="titleflag"></span>其他
      </font>
    </div>
    <div ref="degreeXX" class="block upload-material">
      <ul
        v-if="uploadFileList && uploadFileList.length"
        class="el-upload-list el-upload-list--picture-card"
      >
        <li
          v-for="(item, $index) in uploadFileList"
          :key="$index"
          tabindex="0"
          class="el-upload-list__item is-ready"
        >
          <img
            :src="item.photoUrl"
            alt
            class="el-upload-list__item-thumbnail"
            @click="previewImg(item)"
          />
          <div v-if="params.type !== 'view' && editAble" class="el-upload-list-action">
            <span class="item-name">{{ item.name }}</span>
            <div class="edit-select-file">
              <el-upload
                action="#"
                accept=".jpg, .png"
                list-type="picture-card"
                :http-request="saveImageFile"
                :show-file-list="false"
                :on-change="handleEditChange"
              >
                <span class="item-handle-btn edit-item" @click="editItemImg(item,$index)">替换</span>
              </el-upload>
              <span class="item-handle-btn delete-item" @click="deleteItem(item, $index)">删除</span>
            </div>
          </div>
        </li>
      </ul>
      <el-upload
        v-if="params.type !== 'view' && editAble"
        class="upload-person-material"
        action="#"
        multiple
        accept=".jpg, .png"
        list-type="picture-card"
        :http-request="saveImageFile"
        :show-file-list="false"
        :on-change="handleChange"
        :file-list="uploadFileList"
      >
        <el-button slot="trigger" size="medium">上传照片</el-button>
      </el-upload>
      <el-dialog title="查看" :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { upload, deleteFileById } from "@/api/device/device.js";
import iLocalStroage from "@/common/js/localStroage";
export default {
  props: {
    params: {
      type: Object,
      default: () => {
        return { type: "add" };
      },
      required: true,
    },
    uploadFileList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      imageUrl: "",
      //   uploadFileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      editImgIndex: null,
      docId: null,
      uploadPics: [],
      editAble: true,
      
    };
  },
  computed: {
    showSubmitBtn() {
      return this.uploadFileList.findIndex((item) => item.status === "ready");
    },
  },
  created() {},
  methods: {
    handleChange(file, fileList) {
      const fileIndex = fileList.findIndex((item) => item.uid === file.uid);
      const isGt2M = file.size / 1024 / 1024 > 2;
      if (isGt2M) {
        this.$message({
          message: "上传文件大小不能超过 2MB!",
          type: "warning",
        });
        fileList.splice(fileIndex, 1);
      }
      fileList[fileIndex]["photoUrl"] = URL.createObjectURL(file.raw);
      this.uploadFileList = fileList;
    },
    // 上传到服务器
    saveImageFile(param) {
      var fd = new FormData();
      let type = "其他";
      fd.append("file", param.file);
      fd.append("category", "装备系统");
      fd.append("fileName", param.file.name);
      fd.append("status", type); //标记
      fd.append("caseId", this.$route.params.id); //传记录id
      debugger;
      let docId = this.docId ? this.docId : type + new Date().getTime();
      fd.append("docId", docId); //传记录id
      let _this = this;
      upload(fd).then(
        (res) => {
          let file = _this.uploadFileList.find(
            (item) => item.uid === param.file.uid
          );
          file.storageId = res.data[0].storageId;
          file.docId = res.data[0].docId;
          _this.docId = null;
        },
        (error) => {
          console.log(error);
        }
      );
    },

    // 点击图片弹出预览
    previewImg(item) {
      this.dialogImageUrl = item.photoUrl;
      this.dialogVisible = true;
    },
    // 删除图片
    deleteItem(row, index) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: "el-icon-question",
        customClass: "custom-confirm",
      })
        .then(() => {
          this.deleteFile(row.storageId).then(() => {
            this.uploadFileList.splice(index, 1);
          });
        })
        .catch(() => {});
    },
    //删除附件
    async deleteFile(url) {
      let _this = this;
      let res = await deleteFileById(url);
      this.$message({
        type: "success",
        message: "操作成功!",
      });
    },
    // 修改图片
    editItemImg(item, index) {
      this.editImgIndex = index;
      this.docId = item.docId;
    },

    // 修改图片重新选择图片
    handleEditChange(file, fileList) {
      const currentFile = this.uploadFileList.filter(
        (item) => item.uid === file.uid
      );
      const isGt2M = file.size / 1024 / 1024 > 2;
      if (isGt2M) {
        this.$message({
          message: "上传文件大小不能超过 2MB!",
          type: "warning",
        });
        fileList.splice(fileIndex, 1);
      } else {
        fileList.splice(0, fileList.length);
        file.photoUrl = URL.createObjectURL(file.raw);
        this.uploadFileList.splice(this.editImgIndex, 1, file);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/personManage.scss";
</style>