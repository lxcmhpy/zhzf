<!-- 新增装备 -->
<template>
  <el-dialog
    class="fullscreen"
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="48%"
    append-to-body
  >
    <el-form
      :model="addDeviceForm"
      :rules="rules"
      label-position="right"
      label-width="120px"
      ref="addDeviceFormRef"
      class="add-device-from"
    >
      <h3 class="form-tab-title">基本信息</h3>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="装备编号" prop="num">
            <el-input v-model="addDeviceForm.num" maxlength="2" placeholder="请输入"></el-input>
            <el-popover
              class="device-form-item-tips"
              placement="top-end"
              width="325"
              trigger="click"
              popper-class="form-tips-popper"
              content="编号必须唯一，如不输入编号，系统将自动生成编号"
            >
              <img class="device-form-item-tips-img" slot="reference" :src="tipsUrl" />
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="装备类型" prop="type">
            <el-select v-model="addDeviceForm.type" placeholder="请选择">
              <el-option label="类型1" value="1"></el-option>
              <el-option label="类型2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="装备名称" prop="name">
            <el-input v-model="addDeviceForm.name" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="装备型号" prop="model">
            <el-input v-model="addDeviceForm.model" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="计量单位" prop="unit">
            <el-input v-model="addDeviceForm.unit" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="SN号" prop="sn">
            <el-input v-model="addDeviceForm.sn" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="来源" prop="source">
            <el-select v-model="addDeviceForm.source" placeholder="请选择">
              <el-option label="来源1" value="1"></el-option>
              <el-option label="来源2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="购置单位" prop="purchaseUnit">
            <el-input v-model="addDeviceForm.purchaseUnit" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="购置日期" prop="purchaseDay">
            <el-date-picker
              v-model="addDeviceForm.purchaseDay"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="请输入购置日期"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="购置价格(元)" prop="purchasePrice">
            <el-input v-model="addDeviceForm.purchasePrice" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="存放位置" prop="storageLocation">
            <el-input v-model="addDeviceForm.storageLocation" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="使用期限(月)" prop="serviceLife">
            <el-input v-model="addDeviceForm.serviceLife" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="使用单位" prop="useCompany">
            <el-select v-model="addDeviceForm.useCompany" placeholder="请选择">
              <el-option label="单位1" value="1"></el-option>
              <el-option label="单位2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="使用人" prop="user">
            <el-select v-model="addDeviceForm.user" placeholder="请选择">
              <el-option label="张三" value="1"></el-option>
              <el-option label="李四" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="图片">
        <div class="upload-device-image">
          <el-upload
            class="device-uploader"
            action
            :show-file-list="false"
            :on-change="changeDeviceImage"
          >
            <img v-if="imageUrl" :src="imageUrl" class="device-img" />
            <i v-else class="el-icon-picture-outline avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="addDeviceForm.remark" placeholder="请输入"></el-input>
      </el-form-item>
      <h3 class="form-tab-title" style="margin-top: 20px;">维保信息</h3>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="供应商" prop="supplier">
            <el-input v-model="addDeviceForm.supplier" maxlength="2" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="维保到期" prop="dueTime">
            <el-date-picker
              v-model="addDeviceForm.dueTime"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="请输入维保到期日期"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系人" prop="contactUser">
            <el-input v-model="addDeviceForm.contactUser" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="contactNumber">
            <el-input v-model="addDeviceForm.contactNumber" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="维保说明" prop="maintenanceIns">
        <el-input v-model="addDeviceForm.maintenanceIns" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submit">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      dialogTitle: "新增装备",
      addDeviceForm: {
        num: "",
        type: "",
      },
      imageUrl: "",
      rules: {},
      tipsUrl: "@/../static/images/img/personInfo/form_item_tips.svg",
    };
  },
  created() {},
  methods: {
    // 打开弹窗
    showModal() {
      this.visible = true;
    },
    // 选择装备图片
    changeDeviceImage(file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    //提交
    submit() {
      this.btnDisabled = true;
      this.$refs.addDeviceFormRef.validate((valid) => {
        if (valid) {
          this.saveAddForm();
        } else {
          return false;
        }
      });
    },
    saveAddForm() {
      const loading = this.$loading({
        lock: true,
        text: "正在保存",
        spinner: "car-loading",
        customClass: "loading-box",
        background: "rgba(234,237,244, 0.8)",
      });
      loading.close();
    },
    // 关闭弹窗的时候清除数据
    closeDialog() {
      this.$refs["addDeviceFormRef"].resetFields();
      this.visible = false;
      for (const key in this.addDeviceForm) {
        this.addDeviceForm[key] = "";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.add-device-from {
  >>> .el-select,
  >>> .el-date-editor {
    display: block;
  }
  >>> .el-date-editor.el-input,
  >>> .el-date-editor.el-input__inner {
    width: 100%;
  }
  .form-tab-title {
    font-size: 18px;
    font-weight: bold;
    color: #20232b;
    padding-left: 10px;
    margin-bottom: 18px;
    border-left: 4px solid #4573d0;
  }
  .upload-device-image {
    width: 176px;
    height: 96px;
    margin-top: 12px;
    border: 1px dashed #a3a3a3;
    .device-uploader {
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 96px;
      font-size: 28px;
      >>> .el-upload {
        width: 100%;
        .device-img {
          display: block;
          width: 176px;
          height: 96px;
        }
      }
    }
  }
  .device-form-item-tips {
    display: inline-block;
    position: absolute;
    width: 30px;
    height: 30px;
    top: 4px;
    right: -40px;
    cursor: pointer;
  }
}
</style>
<style lang="scss">
.form-tips-popper.el-popover {
  background: #303133;
  color: #fff;
  .popper__arrow::after {
    border-top-color: #303133;
  }
}
</style>
