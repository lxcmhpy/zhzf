<template>
  <div class="com_searchAndpageBoxPadding hasBigMarginRight">
    <div class="searchAndpageBox searchAndpageBox2">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="device-top-tab">
        <!-- 基本信息 -->
        <el-tab-pane label="基本信息">
          <div class="base-info-wrap">
            <el-row v-if="!startEdit" :gutter="20">
              <el-col :span="12">
                <label class="item-label">使用单位</label>
                <div class="item-text">{{form.useUnit}}</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">车牌号</label>
                <div class="item-text">{{form.vehicleNumber}}</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">车牌颜色</label>
                <div class="item-text">{{form.vehicleColor}}</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">使用状况</label>
                <div class="item-text">{{form.useCondition}}</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">车辆类别</label>
                <div class="item-text">{{form.vehicleCategory}}</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">车辆类型</label>
                <div class="item-text">{{form.vehicleType}}</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">厂牌型号</label>
                <div class="item-text">{{form.brandModel}}</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">发动机号</label>
                <div class="item-text">{{form.engineNumber}}</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">车架号码</label>
                <div class="item-text">{{form.axleNumber}}</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">排放标准</label>
                <div class="item-text">{{form.emissionStandard}}</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">购置日期</label>
                <div class="item-text">{{form.payTime}}</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">购置价格(元)</label>
                <div class="item-text">{{form.payPrice}}</div>
              </el-col>
              <el-col :span="24">
                <label class="item-label">报废期限</label>
                <div class="item-text">{{form.scarpType +'/'+ form.scarpDeadline}}</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">使用证号</label>
                <div class="item-text">
                  <span>DN 4578534953</span>
                  <el-button
                    type="text"
                    style="padding:0;margin-left: 10px;"
                    @click="openCertificateDetail"
                  >&lt;查看详情&gt;</el-button>
                </div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">使用证状态</label>
                <div class="item-text">根据证件状态变化颜色</div>
              </el-col>
              <el-col :span="24">
                <label class="item-label">使用期限</label>
                <div class="item-text">X年/XX公里/长期</div>
              </el-col>
            </el-row>
            <el-form
              v-if="startEdit"
              ref="form"
              :model="form"
              :rules="rules"
              size="small"
              label-width="120px"
            >
              <el-row :gutter="30">
                <el-col :span="12">
                  <el-form-item label="使用单位" prop="useUnit">
                    <elSelectTree
                      ref="addFormUseUnitTreeObj"
                      :options="organList"
                      :accordion="true"
                      :props="orgTreeProps"
                      style="width: 100%;"
                      placeholder="请选择"
                      :value="form.useUnit"
                    ></elSelectTree>
                    <!-- <el-input style="display:none" v-model="form.useUnit"></el-input> -->
                    <!-- <el-input v-model="form.useUnit" placeholder="请选择"></el-input> -->
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="车牌号" prop="vehicleNumber">
                    <el-input v-model="form.vehicleNumber" placeholder="请输入内容，字母请大写"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="车牌颜色" prop="vehicleColor">
                    <el-select v-model="form.vehicleColor" placeholder="请选择">
                      <el-option
                        v-for="(value,index) in colors"
                        :key="index"
                        :label="value"
                        :value="value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="使用状况" prop="useCondition">
                    <el-select v-model="form.useCondition" placeholder="请选择">
                      <el-option
                        v-for="(value,index) in conditions"
                        :key="index"
                        :label="value"
                        :value="value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="车辆类别" prop="vehicleCategory">
                    <el-select v-model="form.vehicleCategory" placeholder="请选择">
                      <el-option
                        v-for="(value,index) in categorys"
                        :key="index"
                        :label="value"
                        :value="value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="车辆类型" prop="vehicleType">
                    <el-input v-model="form.vehicleType" placeholder="请输入行驶证上车辆类型"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="厂牌型号" prop="brandModel">
                    <el-input v-model="form.brandModel" placeholder="请输入行驶证上品牌型号，字母请大写"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="发动机号" prop="engineNumber">
                    <el-input v-model="form.engineNumber" placeholder="请输入行驶证上发动机号，字母请大写"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="车架号码" prop="axleNumber">
                    <el-input v-model="form.axleNumber" placeholder="请输入行驶证上车辆识别代码，字母请大写"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="排放标准" prop="emissionStandard">
                    <el-select v-model="form.emissionStandard" placeholder="请选择">
                      <el-option
                        v-for="(value,index) in standards"
                        :key="index"
                        :label="value"
                        :value="value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="购置日期">
                    <el-date-picker
                      v-model="form.payTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      style="width: 100%"
                      placeholder="请选择日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="购置价格（元）">
                    <el-input v-model="form.payPrice" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-col :span="14">
                    <el-form-item label="报废期限">
                      <el-select v-model="form.scarpType" placeholder="里程（公里）">
                        <el-option
                          v-for="(value,index) in scarpTypes"
                          :key="index"
                          :label="value"
                          :value="value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label-width="0">
                      <el-input-number
                        v-model="form.scarpDeadline"
                        placeholder="请输入数字"
                        :controls="false"
                        style="width:99%"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-col>
              </el-row>
            </el-form>
            <!-- 操作按钮 -->
            <div class="float-btns">
              <el-button
                v-if="!startEdit"
                class="edit_btn"
                type="primary"
                @click="startEdit = true"
              >
                <i class="iconfont law-edit"></i>
                <br />修改
              </el-button>
              <el-button v-if="startEdit" class="edit_btn" type="primary" @click="submitForm">
                <i class="iconfont law-save"></i>
                <br />保存
              </el-button>
            </div>
          </div>
        </el-tab-pane>
        <!-- 车辆照片 -->
        <el-tab-pane label="车辆照片" v-if="form.id">
          <div class="tip bar">限制提示：单张照片2M以内，格式为jpg或png</div>
          <div>
            <div class="bar">
              <span class="title">车辆照片:</span>
              <span class="tip">车辆前45°、后45°照片各一张</span>
            </div>
            <el-row>
              <el-col :span="10">
                <el-upload
                  class="avatar-uploader"
                  action="#"
                  :show-file-list="false"
                  :on-preview="handlePictureCardPreview"
                  :http-request="saveImage1File"
                  :on-remove="(file, fileList)=>deleteFile(file, fileList,'图片')"
                >
                  <img v-if="inspection.url" :src="inspection.url" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon pictureAvatar"></i>
                  <div slot="tip" class="el-upload__tip">前45°照片</div>
                </el-upload>
              </el-col>
              <el-col :span="10">
                <el-upload
                  class="avatar-uploader"
                  action="#"
                  :show-file-list="false"
                  :on-preview="handlePictureCardPreview"
                  :http-request="saveImage1File"
                  :on-remove="(file, fileList)=>deleteFile(file, fileList,'图片')"
                >
                  <img v-if="inspection.url" :src="inspection.url" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon pictureAvatar"></i>
                  <div slot="tip" class="el-upload__tip">后45°照片</div>
                </el-upload>
              </el-col>
            </el-row>
          </div>
          <div>
            <div class="bar">
              <span class="title">行驶证照片:</span>
              <span class="tip">行驶证主页、副页照片各一张</span>
            </div>
            <el-row>
              <el-col :span="10">
                <el-upload
                  class="avatar-uploader"
                  action="#"
                  :show-file-list="false"
                  :on-preview="handlePictureCardPreview"
                  :http-request="saveImage1File"
                  :on-remove="(file, fileList)=>deleteFile(file, fileList,'图片')"
                >
                  <img v-if="inspection.url" :src="inspection.url" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon pictureAvatar"></i>
                  <div slot="tip" class="el-upload__tip">主页</div>
                </el-upload>
              </el-col>
              <el-col :span="10">
                <el-upload
                  class="avatar-uploader"
                  action="#"
                  :show-file-list="false"
                  :on-preview="handlePictureCardPreview"
                  :http-request="saveImage1File"
                  :on-remove="(file, fileList)=>deleteFile(file, fileList,'图片')"
                >
                  <img v-if="inspection.url" :src="inspection.url" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon pictureAvatar"></i>
                  <div slot="tip" class="el-upload__tip">副业</div>
                </el-upload>
              </el-col>
            </el-row>
          </div>
          <div>
            <div class="bar">
              <span class="title">其他:</span>
            </div>
            <el-row>
              <el-upload
                class="upload-demo"
                action="#"
                accept=".jpg, .png"
                :http-request="saveAttachFile"
                :on-preview="handlePDFPreview"
                multiple
                :on-remove="(file, fileList)=>deleteFile(file, fileList,'附件')"
                :limit="3"
                :file-list="attachList"
              >
                <el-button size="small">上传照片</el-button>
              </el-upload>
            </el-row>
          </div>
        </el-tab-pane>
        <!-- 年检信息 -->
        <el-tab-pane label="年检信息" v-if="form.id">
          <div style="margin-right:15px;text-align:right;">
            <el-button size="medium" type="primary" @click="njVisible = true ">添加</el-button>
          </div>
          <el-timeline class="timeline">
            <el-timeline-item timestamp="2018/4/12" placement="top">
              <el-card>
                <el-row>
                  <el-col :span="10">
                    <div class="item">
                      <span class="demonstration">年检年份</span>
                    </div>
                    <div class="item">
                      <span class="demonstration">检验有效期至</span>
                    </div>
                    <div class="item">
                      <span class="demonstration">检验机构</span>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="item">
                      <span class="demonstration">年检标志</span>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <el-button icon="el-icon-edit" size="mini">修改</el-button>
                    <el-button icon="el-icon-delete" size="mini">删除</el-button>
                  </el-col>
                </el-row>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-tab-pane>
      </el-tabs>

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
              <el-date-picker v-model="inspection.annual" type="year" style="width: 100%"></el-date-picker>
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
                :http-request="saveImage1File"
                :on-remove="(file, fileList)=>deleteFile(file, fileList,'图片')"
              >
                <img v-if="inspection.url" :src="inspection.url" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="njVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitNJData()">保存</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
<style src="@/assets/css/systemManage.scss" lang="scss" scoped></style>
<script>
import {
  saveAnnual,
  findAnnualById,
  findplate,
  saveOrUpdateDeviceVehicle,
  findDeviceVehicleById,
} from "@/api/device/deviceVehicle.js";
import { tree } from "@/api/device/device.js";
import iLocalStroage from "@/common/js/localStroage";
import { upload, getFileByCaseId, deleteFileByIdApi } from "@/api/upload";
export default {
  data() {
    return {
      activeName: "",
      //   formDisable: false,
      form: {
        id: "",
        useUnit: "",
        vehicleNumber: "",
        vehicleColor: "",
        useCondition: "",
        vehicleCategory: "",
        vehicleType: "",
        brandModel: "",
        engineNumber: "",
        axleNumber: "",
        emissionStandard: "",
        payTime: "",
        payPrice: "",
        scarpType: "里程（公里）",
        scarpDeadline: "",
      },
      rules: {
        useUnit: [
          { required: true, message: "请选择使用单位", trigger: "change" },
        ],
        vehicleNumber: [
          { required: true, message: "请输入车牌号", trigger: "blur" },
        ],
        vehicleColor: [
          { required: true, message: "请选择车牌颜色", trigger: "change" },
        ],
        useCondition: [
          { required: true, message: "请选择使用状况", trigger: "change" },
        ],
        vehicleCategory: [
          { required: true, message: "请选择车辆类别", trigger: "change" },
        ],
        vehicleType: [
          { required: true, message: "请输入车辆类型", trigger: "blur" },
        ],
        brandModel: [
          { required: true, message: "请输入厂牌型号", trigger: "blur" },
        ],
        engineNumber: [
          { required: true, message: "请输入发动机号", trigger: "blur" },
        ],
        axleNumber: [
          { required: true, message: "请输入车架号码", trigger: "blur" },
        ],
        emissionStandard: [
          { required: true, message: "请选择排放标准", trigger: "change" },
        ],
      },
      colors: ["蓝色", "黄色", "绿色", "黄绿", "黑色"],
      conditions: ["正常", "维修", "报废"],
      categorys: ["轿车", "越野车", "轻型货车"],
      standards: ["国六", "国五", "国四", "国三", "国二", "国一"],
      scarpTypes: ["里程（公里）", "年限（年）", "长期"],
      imageList: [],
      attachList: [],
      njVisible: false,
      inspection: {
        annual: "",
        inspectionIndate: "",
        inspectionDept: "",
        storageId: "",
        deviceId: "",
        url: "",
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
      startEdit: false,
      organList: [],
      orgTreeProps: {
        label: "label",
        value: "id",
      },
      //   selectNode: {},
      //   treeData: [],
      //   title: "",
      //   userInfo: {},
      //   defaultCheckedKeys: [],
    };
  },
  components: {},
  methods: {
    submitForm() {
      let _this = this;
      this.$refs["form"].validate((valid) => {
        if (valid) {
          saveOrUpdateDeviceVehicle(_this.form).then(
            (res) => {
              _this.$message({
                type: "success",
                message: "保存成功!",
              });
              _this.form = res.data;
              _this.startEdit = false;
            },
            (err) => {
              console.log(err);
            }
          );
        }
      });
    },
    submitNJData() {
      let _this = this;
      this.$refs["inspection"].validate((valid) => {
        if (valid) {
          _this.inspection.deviceId = _this.form.id;
          saveAnnual(_this.inspection).then(
            (res) => {
              _this.$message({
                type: "success",
                message: "保存成功!",
              });
              //   _this.form = res.data;
            },
            (err) => {
              console.log(err);
            }
          );
        }
      });
    },
    //删除附件
    deleteFile(file, fileList, type) {
      let _this = this;
      deleteFileByIdApi(file.storageId).then(
        (res) => {
          if (type == "图片") {
            _this.imageList.splice(
              _this.imageList.findIndex(
                (item) => item.storageId === file.storageId
              )
            );
          } else {
            _this.attachList.splice(
              _this.attachList.findIndex(
                (item) => item.storageId === file.storageId
              )
            );
          }
          //fileList.splice(fileList.findIndex(item => item.storageId === file.storageId), 1)
        },
        (err) => {
          console.log(err);
        }
      );
    },
    saveAttachFile(param) {
      this.saveFile(param, "附件");
    },
    saveImageFile(param) {
      this.saveFile(param, "图片");
    },
    saveImage1File(param) {
      debugger;
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
          if (type == "图片") {
            _this.imageList.push({
              url:
                iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST +
                "/" +
                res.data[0].storageId,
              storageId: res.data[0].storageId,
              name: res.data[0].fileName,
            });
          } else if (type == "年检图片") {
            _this.inspection.storageId = res.data[0].storageId;
            _this.inspection.url =
              iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST +
              res.data[0].storageId;
          } else {
            _this.attachList.push({
              url:
                iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST +
                "/" +
                res.data[0].storageId,
              storageId: res.data[0].storageId,
              name: res.data[0].fileName,
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogImageVisible = true;
    },
    handlePDFPreview(file) {
      this.dialogPDFUrl = file.url;
      this.dialogPDFVisible = true;
      id;
    },
    handleClick() {},
    //获取数据
    async getData(id) {
      this.isEdit = true;
      let res = await findDeviceVehicleById(id);
      this.form = res.data;
    },
    async getSelfTree() {
      let res = await tree(iLocalStroage.gets("userInfo").organId, "organ");
      this.organList = res.data;
    },
  },
  mounted() {
    if (this.$route.params.id !== "add") {
      this.getData(this.$route.params.id);
    }
  },
  created() {},
};
</script>
<style>
.demonstration {
  display: block;
  color: #606266;
  font-size: 14px;
  /* margin-bottom: 20px; */
}
.timeline .item {
  margin: 10px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
.pictureAvatar {
  width: 380px;
  height: 190px;
  line-height: 190px;
}
.bar {
  padding: 10px;
}
.title {
  font-weight: 400;
  font-size: 18px;
}
.tip {
  font-size: 14px;
  color: #606266;
}
.el-upload__tip {
  text-align: center;
  font-size: 14px;
  color: #3a3b3d;
  font-weight: bold;
  margin: 15px;
}
</style>       

<style lang="scss" scoped>
.base-info-wrap {
  padding: 10px 0;
  line-height: 28px;
  margin: 40px 10%;
  font-size: 14px;
  >>> .el-col {
    margin-bottom: 20px;
  }
  .edit-base-info-from {
    >>> .el-col {
      margin-bottom: 0px;
    }
    >>> .el-select,
    >>> .el-date-editor {
      display: block;
    }
    >>> .el-date-editor.el-input,
    >>> .el-date-editor.el-input__inner {
      width: 100%;
    }
  }
  .item-label {
    width: 100px;
    padding-right: 8px;
    display: inline-block;
    text-align: right;
    color: #7b7b7b;
  }
  .item-text {
    margin-left: 110px;
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
  .float-btns {
    width: 48px;
    height: 100px;
    position: fixed;
    right: 70px;
    bottom: 70px;
    z-index: 100;
    &.float-btns .el-button {
      border-radius: 1px;
      width: 48px;
      height: 48px;
      padding: 0;
      text-align: center;
    }
    .iconfont {
      display: inline-block;
      margin-bottom: 4px;
      margin-left: 4px;
    }
  }
}
</style>