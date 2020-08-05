<template>
  <div style="width:100%;float:left;margin-top:30px;margin-bottom:30px;">
    <div class="card-title">
      <font class="font" style="font-size:25px;">
        <span class="titleflag"></span>其他
        <!-- <el-button
          v-if="params.type !== 'view'"
          style="margin: 2px 18px 0;"
          size="medium"
          type="primary"
          @click="editAble = true"
        >修改</el-button>
        <el-button
          v-show="editAble"
          style="margin: 2px 0;"
          size="medium"
          type="success"
          @click="submitUpload"
        >保存</el-button> -->
      </font>
    </div>
    <div ref="degreeXX" class="block upload-material">
      <ul
        v-if="uploadFileList && uploadFileList.length"
        class="el-upload-list el-upload-list--picture-card"
      >
        <li
          v-for="(item, $index) in uploadFileList"
          :key="item.uid"
          tabindex="0"
          class="el-upload-list__item is-ready"
        >
          <img
            v-if="item.status === 'ready'"
            :src="item.url"
            alt
            class="el-upload-list__item-thumbnail"
            @click="previewImg(item)"
          />
          <img
            v-if="item.isSave || item.status === 'success'"
            :src="baseUrl + item.url"
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
                :auto-upload="false"
                :show-file-list="false"
                :on-change="handleEditChange"
              >
                <span class="item-handle-btn edit-item" @click="editItemImg($index)">替换</span>
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
        :auto-upload="false"
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
export default {
  props: {
    params: {
      type: Object,
      default: () => {
        return { type: "add" };
      },
      required: true,
    },
  },
  data() {
    return {
      imageUrl: "",
      uploadFileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      editImgIndex: null,
      uploadPics: [],
      editAble: true
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
      this.uploadFileList = fileList;
    },
    // 上传到服务器
    submitUpload() {
      if (this.uploadFileList) {
        const formData = new FormData();
        const changeIndex = [];
        this.uploadFileList.forEach((item, index) => {
          if (item.status === "ready") {
            formData.append("file", item.raw);
            changeIndex.push(index);
          }
        });
        this.saveMaterialNo(formData, changeIndex);
      }
    },
    // 点击图片弹出预览
    previewImg(item) {
      if (item.isSave || item.status === "success") {
        this.dialogImageUrl = this.baseUrl + item.url;
      } else {
        this.dialogImageUrl = item.url;
      }
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
          this.uploadFileList.splice(index, 1);
          if (row.isSave || row.status === "success") {
            this.uploadPics.splice(index, 1);
          }
        })
        .catch(() => {});
    },
    // 修改图片
    editItemImg(index) {
      this.editImgIndex = index;
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
        this.uploadFileList.splice(this.editImgIndex, 1, file);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/personManage.scss";
</style>