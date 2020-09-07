<template>
  <div class="uplode-equipment-photo" style="width:100%;float:left;margin-bottom:30px;">
    <div class="card-title">
      <font class="font" style="font-size:25px;">
        <span class="titleflag"></span>
        {{ topTitle.title }}
        <span class="upload-explain">{{ topTitle.tips }}</span>
      </font>
    </div>
    <div class="block upload-material">
      <ul class="el-upload-list el-upload-list--picture-card">
        <li
          v-for="(photo, index) in photoList"
          :key="index"
          tabindex="0"
          class="el-upload-list__item is-ready"
        >
          <img
            v-if="photo.photoUrl"
            :src="photo.photoUrl"
            @click="previewImg(photo)"
            class="view-img"
          />
          <el-upload
            v-else
            class="device-uploader"
            action
            accept=".jpg, .png"
            :http-request="saveImageFile"
            :show-file-list="false"
            :on-change="(file, fileList) => {changeDeviceImage(file, fileList, index)}"
          >
            <i class="el-icon-picture-outline avatar-uploader-icon"></i>
          </el-upload>
          <div v-if="photo.photoUrl" class="el-upload-list-action">
            <div class="edit-select-file">
              <el-upload
                action="#"
                accept=".jpg, .png"
                list-type="picture-card"
                :http-request="saveImageFile"
                :show-file-list="false"
                :on-change="(file, fileList) => {changeDeviceImage(file, fileList, index)}"
              >
                <span class="item-handle-btn edit-item">替换</span>
              </el-upload>
              <span class="item-handle-btn delete-item" @click="deleteItem(index)">删除</span>
            </div>
          </div>
          <p class="photo-tips">{{ photo.photoTips }}</p>
        </li>
      </ul>
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
    photoList: {
      type: Array,
      default: () => {
        return [
          {
            photoUrl: "",
            photoTips: "前45°照片",
            file: null,
            storageId: null,
          },
          {
            photoUrl: "",
            photoTips: "后45°照片",
            file: null,
            storageId: null,
          },
        ];
      },
      required: true,
    },
    topTitle: {
      type: Object,
      default: () => {
        return { title: "车辆照片", tips: "车辆前45°、后45°照片各一张" };
      },
      required: true,
    },
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      editAble: false,
      vehicleId: "",
      flag: "",
      baseUrl: iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST,
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.vehicleId = this.$route.params.id;
  },
  methods: {
    saveImageFile(param) {
      this.saveFile(param, this.topTitle.title);
    },
    async saveFile(param, type) {
      var fd = new FormData();
      fd.append("file", param.file);
      fd.append("category", "装备系统");
      fd.append("fileName", param.file.name);
      fd.append("status", type); //标记
      fd.append("caseId", this.vehicleId); //传记录id
      fd.append("docId", type + this.flag); //传记录id
      let res = await upload(fd);
      this.photoList[this.flag]["storageId"] = res.data[0].storageId;
    },
    // 选择装备图片
    changeDeviceImage(file, fileList, index) {
      debugger;
      this.flag = index;
      const fileIndex = fileList.findIndex((item) => item.uid === file.uid);
      const isGt2M = file.size / 1024 / 1024 > 2;
      if (isGt2M) {
        this.$message({
          message: "上传图片大小不能超过 2MB!",
          type: "warning",
        });
        fileList.splice(fileIndex, 1);
      } else {
        this.photoList[index]["photoUrl"] = URL.createObjectURL(file.raw);
      }
    },
    // 点击图片弹出预览
    previewImg(item) {
      this.dialogImageUrl = item.photoUrl;
      this.dialogVisible = true;
    },
    // 删除图片
    deleteItem(index) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: "el-icon-question",
        customClass: "custom-confirm",
      })
        .then(() => {
          this.deleteFile(this.photoList[index]["storageId"]).then(() => {
            this.photoList[index]["photoUrl"] = "";
            this.photoList[index]["storageId"] = "";
            this.photoList[index]["file"] = null;
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
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/personManage.scss";
.upload-explain {
  font-size: 16px;
  font-weight: 400;
  color: #7b7b7b;
}
.uplode-equipment-photo {
  .upload-material {
    .el-upload-list--picture-card {
      .el-upload-list__item {
        border: 1px solid #a3a3a3;
        background: #fff;
        overflow: inherit;
        float: left;
        outline: none;
      }
    }
    .avatar-uploader-icon {
      font-size: 42px;
      color: #8c939d;
      width: 410px;
      height: 240px;
      line-height: 240px;
      text-align: center;
      margin-left:0px;
    }
    .avatar {
      width: 410px;
      height: 240px;
    }
    .photo-tips {
      font-size: 15px;
      font-weight: 560;
      text-align: center;
      color: #20232b;
      line-height: 52px;
    }
    .view-img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>