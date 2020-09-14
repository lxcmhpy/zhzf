<!-- 年检信息 -->
<template>
  <div class="year-inspection-detail">
    <el-timeline :reverse="reverse" class="record-line">
      <p v-if="records.length<1" class="no-data">暂无数据</p>
      <el-timeline-item
        v-else
        v-for="(record, index) in records"
        :key="index"
        :hide-timestamp="true"
        color="#4573d0"
      >
        <span slot="dot" class="index-dot">{{ index + 1 }}</span>
        <div class="device-info-wrap" style="padding-top:0;">
          <el-row :gutter="20">
            <el-col :span="9">
              <div>
                <label class="item-label">年检年份:</label>
                <div class="item-text">{{ record.annual }}</div>
              </div>
              <div>
                <label class="item-label">检验有效期至:</label>
                <div class="item-text">{{ record.inspectionIndate }}</div>
              </div>
              <div>
                <label class="item-label">检验机构:</label>
                <div class="item-text">{{ record.inspectionDept }}</div>
              </div>
            </el-col>
            <el-col :span="7">
              <label class="item-label">年检标志:</label>
              <el-image style="width: 102px; height: 102px" :src="record.url" fit="fill"></el-image>
            </el-col>
            <el-col :span="7">
              <el-button type="primary" size="medium" @click="onEdit(record.id)">修改</el-button>
              <el-button type="info" size="medium" @click="onDelete(record.id)">删除</el-button>
            </el-col>
          </el-row>
        </div>
      </el-timeline-item>
    </el-timeline>
    <!-- 操作按钮 -->
    <div class="float-btns">
      <el-button class="edit_btn" type="primary" @click="onAdd ">
        <i class="el-icon-plus"></i>
        <br />添加
      </el-button>
    </div>
    <el-dialog
      title="年检信息"
      :visible.sync="njVisible"
      @close="njVisible = false"
      :close-on-click-modal="false"
      width="35%"
    >
      <div>
        <el-form ref="inspection" :model="inspection" :rules="njRules" label-width="110px">
          <el-form-item label="年检年份" prop="annual">
            <el-date-picker
              v-model="inspection.annual"
              type="year"
              value-format="yyyy"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="年检有效期至" prop="inspectionIndate">
            <el-date-picker
              v-model="inspection.inspectionIndate"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="检验机构" prop="inspectionIndate">
            <el-input v-model="inspection.inspectionDept"></el-input>
          </el-form-item>
          <el-form-item label="年检标志">
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :on-preview="handlePictureCardPreview"
              :http-request="saveImageFile"
              :on-remove="(file, fileList)=>deleteFile(file, fileList,'图片')"
            >
              <img v-if="inspection.storageId" :src="url" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="njVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitData()">保存</el-button>
      </span>
    </el-dialog>

    <el-dialog title="查看" :visible.sync="dialogImageVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>
<script>
import {
  saveAnnual,
  findAnnualById,
  deleteAnnualById,
  findAnnualByVehicleId,
} from "@/api/device/deviceVehicle.js";
import iLocalStroage from "@/common/js/localStroage";
import { upload, deleteFileById } from "@/api/device/device.js";
export default {
  components: {},
  data() {
    return {
      reverse: false,
      records: [],
      inspectImg: "@/../static/images/img/trained/year_inspect.jpg",
      njVisible: false,
      inspection: {
        annual: "",
        inspectionIndate: "",
        inspectionDept: "",
        storageId: "",
        deviceId: "",
      },
      njRules: {
        annual: [
          { required: true, message: "请输入年检年份", trigger: "blur" },
        ],
        inspectionIndate: [
          { required: true, message: "请输入年检有效期", trigger: "blur" },
        ],
        inspectionDept: [
          { required: true, message: "请输入检验机构", trigger: "blur" },
        ],
      },
      dialogImageUrl: "",
      dialogImageVisible: false,
    };
  },
  created() {},
  methods: {
    submitData() {
      let _this = this;
      this.$refs["inspection"].validate((valid) => {
        if (valid) {
          _this.inspection.deviceId = _this.$route.params.id;
          saveAnnual(_this.inspection).then(
            (res) => {
              _this.$message({
                type: "success",
                message: "保存成功!",
              });
              _this.njVisible = false;
              _this.getData();
            },
            (err) => {
              console.log(err);
            }
          );
        }
      });
    },
    onAdd() {
      this.njVisible = true;
      this.inspection = {
        annual: "",
        inspectionIndate: "",
        inspectionDept: "",
        storageId: "",
        deviceId: "",
      };
    },
    async onEdit(id) {
      let res = await findAnnualById(id);
      this.inspection = res.data;
      this.inspection.annual = this.inspection.annual + "";
      this.njVisible = true;
    },
    async onDelete(id) {
      let res = await deleteAnnualById(id);
      this.$message({
        type: "success",
        message: "删除成功!",
      });
      this.getData();
    },
    saveImageFile(param) {
      this.saveFile(param, "年检图片");
    },
    saveFile(param, type) {
      var fd = new FormData();
      fd.append("file", param.file);
      fd.append("category", "装备系统");
      fd.append("fileName", param.file.name);
      fd.append("status", type); //传记录id
      fd.append("caseId", param.file.name + new Date().getTime()); //传记录id
      fd.append("docId", param.file.name + new Date().getTime()); //传记录id
      let _this = this;
      upload(fd).then(
        (res) => {
          _this.inspection.storageId = res.data[0].storageId;
          _this.$util
            .com_getDeviceFileStream(res.data[0].storageId)
            .then((res) => {
              _this.inspection.url = res;
            });
        },
        (error) => {
          console.log(error);
        }
      );
    },
    //删除附件
    deleteFile(file, fileList) {
      let _this = this;
      deleteFileById(file.storageId).then(
        (res) => {
          _this.inspection.storageId = "";
        },
        (err) => {
          console.log(err);
        }
      );
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogImageVisible = true;
    },
    //获取数据
    async getData() {
      let res = await findAnnualByVehicleId(this.$route.params.id);

      if (res.data) {
        let _this = this;
        this.records = [];
        await res.data.forEach((item) => {
          _this.$util.com_getDeviceFileStream(item.storageId).then((res) => {
            item.url = res;
            _this.records.push(item);
          });
        });
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style lang="scss" scoped>
.year-inspection-detail {
  padding: 30px 50px;
  .device-info-wrap {
    padding: 10px 0;
    line-height: 36px;
    .item-label {
      width: 110px;
      padding-right: 8px;
      display: inline-block;
      text-align: right;
      color: #7b7b7b;
      float: left;
    }
    .item-text {
      margin-left: 120px;
      color: #20232c;
      font-weight: 560;
    }
    .item-img {
      display: block;
      width: 176px;
      height: 96px;
      margin-top: 10px;
      text-align: center;
      line-height: 96px;
    }
  }
  .record-line {
    margin: 10px;
    >>> .el-timeline-item__dot {
      left: -5px;
    }
    .index-dot {
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      border-radius: 20px;
      background: #4573d0;
      color: #ffffff;
    }
    .no-data {
      font-size: 18px;
      color: #7b7b7b;
      text-align: center;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
</style>
