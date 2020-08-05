<!-- 配发（领用）单 -->
<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="42%"
  >
    <el-form
      :model="allotmentForm"
      :rules="rules"
      label-position="right"
      label-width="120px"
      ref="allotmentFormRef"
      class="allotment-form"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="使用单位" prop="useCompany">
            <el-select v-model="allotmentForm.useCompany" placeholder="请选择">
              <el-option label="单位1" value="1"></el-option>
              <el-option label="单位2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="使用人" prop="user">
            <el-select v-model="allotmentForm.user" placeholder="请选择">
              <el-option label="张三" value="1"></el-option>
              <el-option label="李四" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="配发后存放位置" prop="serviceLife">
            <el-input v-model="allotmentForm.serviceLife" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单据日期" prop="sn">
            <el-input v-model="allotmentForm.sn" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="处理人" prop="purchaseUnit">
            <el-input v-model="allotmentForm.purchaseUnit" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="allotmentForm.remark" placeholder="请输入"></el-input>
      </el-form-item>
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
    </el-form>
    <div class="equipment-table">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        v-loading="tableLoading"
        element-loading-spinner="car-loading"
        element-loading-text="加载中..."
        @selection-change="selectRow"
      >
        <el-table-column type="selection" width="40" align="center"></el-table-column>
        <el-table-column prop="outlineName" align="left">
          <template slot="header">
            <span class="header-total">全部试题（{{ totalPage }}）</span>
            <div class="header-handle-btn">
              <el-button type="primary" icon="el-icon-plus" size="medium" @click="addEquipment">新增装备</el-button>
              <el-button type="info" icon="el-icon-delete-solid" size="medium">删除装备</el-button>
            </div>
          </template>
          <template slot-scope="scope">
            <h3 class="equipment-name">{{ scope.row.name }}</h3>
            <el-row :gutter="15" class="table-row">
              <el-col :span="8">
                <div class="equipment-info">装备编码：{{ scope.row.no }}</div>
              </el-col>
              <el-col :span="8">
                <div class="equipment-info">装备类型：{{ scope.row.type }}</div>
              </el-col>
              <el-col :span="8">
                <div class="equipment-info">使用单位：{{ scope.row.useCompany }}</div>
              </el-col>
              <el-col :span="8">
                <div class="equipment-info">品牌型号：{{ scope.row.model }}</div>
              </el-col>
              <el-col :span="8">
                <div class="equipment-info">存放位置：{{ scope.row.storageLocation }}</div>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <!-- <div class="paginationBox">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        background
        :page-sizes="[10, 20, 50, 100]"
        layout="prev, pager, next,sizes,jumper"
        :total="totalPage"
      ></el-pagination>
    </div>-->
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submit">保 存</el-button>
    </div>
    <!-- 选择装备 -->
    <SelectEquipment ref="selectEquipmentRef"/>
  </el-dialog>
</template>
<script>
import SelectEquipment from '@/page/device/components/allotmentReceive/selectEquipment';

export default {
    components: { SelectEquipment },
  data() {
    return {
      visible: false,
      dialogTitle: "配发（领用）单",
      allotmentForm: {
        num: "",
        type: "",
      },
      imageUrl: "",
      rules: {},
      tableData: [
        {
          name: "笔记本电脑",
          no: "202007110010",
          type: "基础办案类",
          useCompany: "北京市交通运输部",
          model: "戴尔ThinkPad X1 Carbon 2020(04CD)",
          storageLocation: "您可以获得特定的支持",
        },
      ],
      sleectEquipment: [],
      totalPage: 0,
      tableLoading: false,
    };
  },
  created() {},
  methods: {
    // 打开弹窗
    showModal() {
      this.visible = true;
    },
    // 表格复选框选择装备
    selectRow(val) {
      this.sleectEquipment = val;
    },
    // 选择装备图片
    changeDeviceImage(file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 新增装备
    addEquipment(){
        this.$refs.selectEquipmentRef.showModal();
    },
    //提交
    submit() {
      this.btnDisabled = true;
      this.$refs.allotmentFormRef.validate((valid) => {
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
      this.$refs["allotmentFormRef"].resetFields();
      this.visible = false;
      for (const key in this.allotmentForm) {
        this.allotmentForm[key] = "";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.allotment-form {
  >>> .el-select,
  >>> .el-date-editor {
    display: block;
  }
  >>> .el-date-editor.el-input,
  >>> .el-date-editor.el-input__inner {
    width: 100%;
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
}
.equipment-table {
  .header-total {
    line-height: 30px;
    padding-top: 14px;
  }
  .header-handle-btn {
    display: inline-block;
    float: right;
  }
  >>>.el-table-column--selection{
    vertical-align: top;
    }
  .table-row {
    >>> .el-col {
      margin-bottom: 10px;
    }
    .equipment-info {
      color: #7b7b7b;
      line-height: 20px;
    }
  }
  .equipment-name {
    font-size: 16px;
    font-weight: 560;
    color: #20232b;
    margin: 10px 0;
  }
}
</style>
