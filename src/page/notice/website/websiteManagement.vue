<template>
  <!-- 网站设置-->
  <div class="com_searchAndpageBoxPadding website-management">
    <div class="searchAndpageBox searchAndpageBox2">
      <div v-if="isEdit">
        <el-form :model="form" :rules="rules" ref="form" label-width="110px">
          <input hidden v-model="form.id" />
          <el-row>
            <el-col :span="12">
              <el-form-item label="网站标题图片">
                <el-upload
                  class="avatar-uploader"
                  action="#"
                  :show-file-list="false"
                  :http-request="saveImageFile"
                >
                  <el-image v-if="form.titleImg" :src="host+form.titleImg" fit="fill"></el-image>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label-width="10px">
                <span v-if="!form.titleImg" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</span>
                <span v-else class="el-upload__tip">点击图片更换，只能上传jpg/png文件，且不超过500kb</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="标识链接">
                <template slot="label">
                  <el-col :span="10">
                    <img src="/static/images/img/notice/logo_pic_2.png" height="40" />
                  </el-col>
                  <el-col :span="14">
                    <span>标识链接</span>
                  </el-col>
                </template>
                <el-input v-model="form.titleLink"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="主办单位">
                <el-input v-model="form.directOrgan"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="承办单位">
                <el-input v-model="form.undertakeOrgan"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="备案序号">
                <el-input v-model="form.recordNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="链接地址">
                <el-input v-model="form.recordLink"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="政府网站标识码">
                <el-input v-model="form.websiteCode"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="公网安备案号">
                <el-input v-model="form.securityRecordation"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="链接地址">
                <el-input v-model="form.security"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:right">
          <el-button type="primary" @click="save()">保存</el-button>
        </div>
      </div>

      <div v-if="!isEdit">
        <el-form :model="form" :rules="rules" ref="form" label-width="110px">
          <input hidden v-model="form.id" />
          <el-row>
            <el-col :span="12">
              <el-form-item label="网站标题图片">
                <!-- <img src=""> -->
                <el-image :src="host+form.titleImg" fit="fill"></el-image>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item>
                <template slot="label">
                  <el-col :span="10">
                    <img src="/static/images/img/notice/logo_pic_2.png" height="40" />
                  </el-col>
                  <el-col :span="14">
                    <span>标识链接</span>
                  </el-col>
                </template>
                {{form.titleLink}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="主办单位">{{form.directOrgan}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="承办单位">{{form.undertakeOrgan}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="备案序号">{{form.recordNumber}}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="链接地址">{{form.recordLink}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="政府网站标识码">{{form.websiteCode}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="公网安备案号">{{form.securityRecordation}}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="链接地址">{{form.security}}</el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:right">
          <el-button type="primary" @click="onEdit()">修改</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage.js";
import { upload, deleteFileByIdApi } from "@/api/notice/upload";
import { saveOrUpdate, findWebsiteInfo } from "@/api/notice/website.js";
import Util from "@/api/notice/util";
export default {
  data() {
    return {
      form: {
        id: "",
        titleImg: "",
        titleLink: "",
        directOrgan: "",
        undertakeOrgan: "",
        recordNumber: "",
        recordLink: "",
        websiteCode: "",
        securityRecordation: "",
        security: "",
      },
      rules: {},
      isEdit: false,
      host: iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST,
      fileList: [],
      imgUrl: "",
    };
  },
  methods: {
    saveImageFile(param) {
      let _this = this;
      if (this.form.titleImg) {
        this.deleteFile().then((res) => {
          _this.saveFile(param);
        });
      } else {
        _this.saveFile(param);
      }
    },
    saveFile(param) {
      var fd = new FormData();
      fd.append("file", param.file);
      fd.append("category", "公示系统");
      fd.append("fileName", param.file.name);
      fd.append("status", "图片"); //传记录id
      fd.append("caseId", param.file.name + new Date().getTime()); //传记录id
      fd.append("docId", param.file.name + new Date().getTime()); //传记录id
      let _this = this;
      upload(fd).then(
        (res) => {
          _this.form.titleImg = res.data[0].storageId;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    //删除附件
    //删除附件
    async deleteFile() {
      let res = await deleteFileByIdApi(this.form.titleImg);
      this.form.titleImg = "";
    },
    // deleteFile(file, fileList) {
    //   let _this = this;
    //   deleteFileByIdApi(file.storageId).then(
    //     (res) => {
    //       _this.form.titleImg = "";
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    // },
    async save() {
      let res = await saveOrUpdate(this.form);
      this.$message({
        type: "success",
        message: "保存成功!",
      });
      this.isEdit = false;
    },
    onEdit() {
      this.isEdit = true;
    },
    async getData() {
      let res = await findWebsiteInfo();
      if (res.data) {
        this.form = res.data;
        debugger;
        // Util.com_getFileStream(this.form.titleImg).then((res) => {
        //   this.imgUrl = res;
        // });
      } else {
        this.isEdit = true;
      }
    },
  },
  created() {},
  mounted() {
    this.getData();
  },
};
</script>
<style lang="scss" scoped>
.website-management {
  .avatar-uploader {
    >>> .el-upload {
      width: 100%;
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100%;
        height: 80px;
        line-height: 80px;
        text-align: center;
        border: 1px dashed #cccccc;
        margin-left: 0px;
      }
    }
  }
}
</style>