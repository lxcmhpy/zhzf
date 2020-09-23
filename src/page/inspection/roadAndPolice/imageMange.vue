<template>
  <div class="com_searchAndpageBoxPadding hasBigMarginRight">
    <div class="searchAndpageBox" style="min-height:calc(100% - 44px)">
      <div class="handlePart">
        <div class="search">
          <el-form :inline="true" :model="evidenceForm" ref="evidenceForm" label-width="80px">
            <el-form-item>
              <el-button type="primary" size="medium" @click="goBack">返回</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="add" size="medium" @click="handleAdd">添加记录</el-button>
            </el-form-item>
            <!-- <el-form-item label="证据名称" prop="fileName">
              <el-input v-model="evidenceForm.fileName"></el-input>
            </el-form-item> -->
            <el-form-item label="证据类型" prop="docId">
              <el-select v-model="evidenceForm.docId" clearable>
                <el-option v-for="(item,index) in evTypeOptions" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="getEviList(1)">查询</el-button>
              <!-- <el-button type="primary" size="medium" @click="resetSearch">重置</el-button> -->
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <el-table :data="tableData" stripe height="100%">
          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
          <!-- <el-table-column prop="fileName" label="证据名称" align="center"></el-table-column> -->
          <el-table-column prop="docId" label="类型" align="center" :formatter="format"></el-table-column>
          <el-table-column prop="storageId" label="详情" align="center">
            <template slot-scope="scope">
              <img :src="host+scope.row.storageId" width="40" height="40" @click.stop="imgDetail(scope.row)" />
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" align="center">
            <template slot-scope="scope">
              <label>
                <el-switch v-model="scope.row.status" :active-value="'1'" :inactive-value="'0'" active-color="#13ce66" inactive-color="#ff4949" @change="updateEviBySwitch(scope.row)"></el-switch>
              </label>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="保存日期" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="paginationF">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="total"></el-pagination>
      </div>
    </div>
    <!-- 添加弹出框 -->
    <el-dialog title="添加证据材料" :visible.sync="addVisible" width="40%" v-loading="addLoading" :before-close="handleClose">
      <div>
        <div style="height:auto">
          <el-form ref="form" :model="form" :rules="addrules">
            <div style="font-size:16px;font-weight:500;">证据类型</div>
            <el-form-item prop="radio" label-width="0">
              <el-radio-group v-model="form.radio">
                <el-radio v-for="(item,index) in evTypeOptions" :key="index" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-upload class="upload-demo" :http-request="saveFile" :file-list="fileList" action="https://jsonplaceholder.typicode.cmo/posts/" multiple>
            <el-button size="small" type="primary">选择文件</el-button>
            <div class="el-upload__tip" slot="tip">只能上传图片文件，且不大于10M
            </div>
          </el-upload>
        </div>

        <div style="margin-left: 42%;clear:both">
          <el-button size="medium" @click="addVisible=false">取 消</el-button>
          <el-button size="medium" type="primary" @click="submitForm('form')">确认上传</el-button>

        </div>
      </div>
    </el-dialog>
    <!-- 证据目录 -->
    <!-- <evidenceCatalogue ref="evidenceCatalogueRef"></evidenceCatalogue> -->

    <evidenceDetail ref="evidenceDetailRef"></evidenceDetail>

    <evidenceImageDetail ref="evidenceImageDetailRef"></evidenceImageDetail>
  </div>
</template>
<script>
import caseSlideMenu from "@/page/caseHandle/components/caseSlideMenu";
import { mapGetters } from "vuex";
import evidenceCatalogue from "@/page/caseHandle/case/form/evidenceCatalogue.vue";
import { uploadCommon, findCommonFileApi } from "@/api/upload";

import {
  getFileStreamByStorageIdApi,
} from "@/api/caseHandle";
import iLocalStroage from "@/common/js/localStroage.js";
import evidenceDetail from "@/page/caseHandle/case/form/evidenceDetail";
import evidenceImageDetail from "@/page/caseHandle/case/form/evidenceImageDetail";
// import {saveOrUpdateEvdencenApi2, } from "@/api/caseHandle";
// import { getEviByCaseIdApi } from "@api/caseHandle";
export default {
  data() {
    const isSelect = (rule, value, callback) => {
      if (value == undefined) {
        return callback(new Error("请选择"));
      } else {
        callback();
      }
    };
    return {
      fileList: [],
      host: "",
      evfile: "",
      evTypeOptions: [{ label: '车辆照片证据', value: '000001' }, { label: '驾驶人/企业', value: '000002' }, { label: '初检称重', value: '000003' }, { label: '卸载复检', value: '000004' }, { label: '处罚决定', value: '000005' }, { label: '其他', value: '000006' }],
      statusOptions: [],
      value: "",
      //activeName: '1',
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总数
      tableData: [],
      srcImgList: [],
      userNameList: [],
      evidenceForm: {
        fileName: "",
        docId: "",
        status: "",
      },
      form: {
        radio: '',
        id: "",
        caseId: "",
        fileName: "",
        evType: "",
        status: "",
        fileId: "",
        remark: "",
        file: null,
        docId: "",
        category: "证据",
        userId: "",
        recordPlace: "",
        userName: "",
        note: "",
      },
      uForm: {},
      addVisible: false,
      editVisible: false,
      addLoading: false,
      editLoading: false,

      addrules: {
        evType: [
          {
            required: true,
            message: "证据类型不能为空",
            trigger: "change",
            // validator: isSelect
          },
          // {
          //   required: true,
          //   message: "证据类型不能为空",
          //   trigger: "change",
          //   validator: isSelect
          // }
        ],
        status: [{ required: true, message: "状态不能为空", trigger: "blur" }],
      },
      videoImgSrc: "",
      myVideoSrc: "",
      imgListUpload: []
    };
  },
  computed: {
    ...mapGetters(["caseId", "caseApproval", "inspectionOverWeightId"]),
  },
  components: {
    caseSlideMenu,
    evidenceCatalogue,
    evidenceDetail,
    evidenceImageDetail,
  },
  methods: {
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.imgListUpload.forEach(element => {
            this.uploadImg(element)
          });
          this.fileList = []
          this.imgListUpload = []
          this.addVisible = false;
          this.getEviList(1)
        }
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.$nextTick(() => {
            this.fileList = [];
            this.$refs['form'].resetFields();
          });
        })
        .catch((_) => { });
    },
    handleAdd(index, row) {
      this.form = {};
      this.fileList = []
      this.imgListUpload = []
      this.addVisible = true;
    },
    //表单筛选
    getEviList(index) {
      let data = {
        caseId: this.inspectionOverWeightId.id,
        docId: this.evidenceForm.docId,
        current: index || this.currentPage,
        size: this.pageSize,
      };
      console.log("证据目录参数", data);
      let _this = this;
      findCommonFileApi(data).then((res) => {
        console.log("res", res);
        _this.tableData = res.data.records;
        _this.total = res.data.total
      });
    },
    saveFile(param) {
      this.imgListUpload.push(param)
      // console.log(param);
      // // this.formUpload = {
      // (this.form.file = param.file),
      //   (this.form.caseId = this.caseId),
      //   (this.form.docId = "000"),
      //   (this.form.category = "证据"),
      //   (this.form.userId = iLocalStroage.gets("userInfo").id),
      //   (this.form.fileName = param.file.name);
      // // }

      // //给证据类型赋值
      // let fileType = this.$util.getFileType(param.file.name);
      // console.log("给证据类型赋值", fileType);
      // this.$set(this.form, "evType");
      // if (fileType == "image") {
      //   //图片
      //   console.log("是图片呀");
      //   this.form.evType = "照片";
      // } else if (fileType == "video" || fileType == "radio") {
      //   this.form.evType = "音视频";
      // } else {
      //   this.form.evType = "其他附件";
      // }
      // //生成缩略图
      // let videoURL = null;
      // let windowURL = window.URL || window.webkitURL;
      // if (param.file && fileType == "video") {
      //   videoURL = windowURL.createObjectURL(param.file);
      //   this.myVideoSrc = videoURL;
      //   let _this = this;
      //   setTimeout(function () {
      //     _this.makeVideoImg();
      //   }, 500);
      // }
    },
    //上传
    uploadImg(param) {
      var fd = new FormData();
      fd.append("file", param.file);
      fd.append("category", '路警联合;图片');
      fd.append("fileName", param.file.name);
      fd.append('status', 1)//传图片状态
      fd.append('caseId', this.inspectionOverWeightId.id)//传记录id
      fd.append('docId', this.form.radio)//传类型代码

      let _this = this;
      uploadCommon(fd).then((res) => {
        console.log("1111111", res);
        if (res.code == 200) {
          _this.$message({
            message: "添加成功！",
            type: "success",
          });
          _this.addVisible = false;
          _this.currentPage = 1;
          _this.getEviList();
        } else {
          _this.$message.error("出现异常，添加失败！");
        }
      });
    },
    //通过switch开关修改状态
    updateEviBySwitch(row) {
      let _this = this;

      console.log(row)
      debugger
      uploadCommon(fd).then((res) => {
        console.log("1111111", res);
        if (res.code == 200) {
          _this.$message({
            message: "添加成功！",
            type: "success",
          });
          _this.addVisible = false;
          _this.currentPage = 1;
          _this.getEviList();
        } else {
          _this.$message.error("出现异常，添加失败！");
        }
      });
    },
    // 重置
    resetSearch() {
      this.$refs["evidenceForm"].resetFields();
      this.getEviList();
    },

    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getEviList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getEviList();
    },
    randomString(e) {
      e = e || 32;
      const t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
        a = t.length;
      let res = "";
      for (let i = 0; i < e; i++) {
        res += t.charAt(Math.floor(Math.random() * a));
      }
      return res;
    },
    formatDateStr(val) {
      if (val == null) {
        return null;
      }
      let date = new Date(val);
      let Y = date.getFullYear() + "-";
      let M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1) + "-"
          : date.getMonth() + 1 + "-";
      let D =
        date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
      // let h =
      //   date.getHours() < 10
      //     ? "0" + date.getHours() + ":"
      //     : date.getHours() + ":";
      // let m =
      //   date.getMinutes() < 10
      //     ? "0" + date.getMinutes() + ":"
      //     : date.getMinutes() + ":";
      // let s =
      //   date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // return Y + M + D + h + m + s;
      return Y + M + D;
    },
    //鼠标hover证据目录后 显示证据目录
    showEvidenceCatalogue() {
      this.$refs.evidenceCatalogueRef.showModal();
    },
    fileChange(file) {
      console.log(file);
      this.evfile = file.raw;
    },
    //显示证据详情
    evidenceDetail(row) {
      console.log("证据详情", row);
      this.$refs.evidenceDetailRef.showModal(row);
    },
    imgDetail(row) {
      this.$refs.evidenceImageDetailRef.showModal(row);
    },
    //生成视频缩略图
    makeVideoImg() {
      const video = document.getElementById("myVideo");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const imgHeight = video.videoHeight;
      const imgWidth = video.videoWidth;
      ctx.drawImage(video, 0, 0, imgWidth * 0.2, imgHeight * 0.2);
      let imgSrc = canvas.toDataURL("image/png");
      console.log("缩略图", imgSrc);
      let blob = this.dataURLtoBlob(imgSrc, "image/png");
      let file = new File([blob], "video_image.png", {
        type: "image/png",
        lastModified: Date.now(),
      }); //blob转file
      this.videoImgSrc = imgSrc;
      this.form.thumbnail = file;
    },
    dataURLtoBlob(dataURI, type) {
      var binary = atob(dataURI.split(",")[1]);
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], { type: type });
    },
    getFileStream(data, storageId) {
      //设置地址
      // this.$store.commit("setDocPdfStorageId", storageId);
      getFileStreamByStorageIdApi(storageId)
        .then((res) => {
          console.log(res);
          this.getObjectURL(data, res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 将返回的流数据转换为url
    getObjectURL(data, file) {
      let url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        try {
          url = window.webkitURL.createObjectURL(file);
        } catch (error) { }
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        try {
          url = window.URL.createObjectURL(file);
        } catch (error) { }
      }
      console.log(url);
      // this.pdfUrl = url;
      // return url;
      this.downFile(data, url);
    },
    //下载
    downFile(data, url) {
      var eleLink = document.createElement("a");
      eleLink.download = data.fileName;
      eleLink.style.display = "none";
      eleLink.href = url;
      // 触发点击
      document.body.appendChild(eleLink);
      eleLink.click();
      // 然后移除
      document.body.removeChild(eleLink);
    },
    goBack() {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: 'inspection_overWeightForm',
      });
    },
    format(row, column) {
      switch (row.docId) {
        case '000001':
          return '车辆照片证据';
          break;
        case '000002':
          return '驾驶人/企业';
          break;
        case '000003':
          return '初检称重';
          break;
        case '000004':
          return '卸载复检';
          break;
        case '000005':
          return '处罚决定';
          break;
        case '000006':
          return '其他';
          break;
      }
    },
  },
  mounted() {
    this.host = iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST;
  },
  created() {
    this.getEviList();
  },
};
</script>
<style lang="scss" src="@/assets/css/systemManage.scss"></style>
<style lang="scss">
/*  @import "@/assets/css/systemManage.scss"; */

.paginationF {
  position: absolute;
  bottom: 10px;
  right: 20px;
  margin: auto;
  text-align: center;
}

.tablePartF {
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 4%;
}

.el-upload-dragger {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 360px;
  height: 330px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.fullscreen {
  .hasBigMarginRight {
    margin-right: 65px;
  }
}
</style>
