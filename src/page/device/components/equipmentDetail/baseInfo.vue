<!-- 新增车辆基本信息 -->
<template>
  <div class="base-info-wrap">
    <!-- 查看基本信息 -->
    <el-row v-if="!startEdit" :gutter="20">
      <el-col :span="12">
        <label class="item-label">使用单位</label>
        <div class="item-text">上海硬通网络科技有限公司</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">车牌号</label>
        <div class="item-text">请输入内容，字母大写</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">车牌颜色</label>
        <div class="item-text">蓝色</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">使用状况</label>
        <div class="item-text">正常</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">车辆类别</label>
        <div class="item-text">请选择</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">车辆类型</label>
        <div class="item-text">请输入行驶证上发动机号，字母请大些</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">厂牌型号</label>
        <div class="item-text">请输入行驶证上品牌型号，字母请大些</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">发动机号</label>
        <div class="item-text">请输入行驶证上发动机号，字母请大些</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">车架号码</label>
        <div class="item-text">请输入行驶证上车辆识别代号，字母请大些</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">排放标准</label>
        <div class="item-text">请选择</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">购置日期</label>
        <div class="item-text">2020-08-04</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">购置价格(元)</label>
        <div class="item-text">200000</div>
      </el-col>
      <el-col :span="24">
        <label class="item-label">报废期限</label>
        <div class="item-text">X年/XX公里/长期</div>
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
    <!-- 编辑基本信息表单 -->
    <el-form
       v-if="startEdit"
      :model="editBaseInfoForm"
      :rules="rules"
      label-position="right"
      label-width="120px"
      ref="editBaseInfoFormRef"
      class="edit-base-info-from"
    >
      <el-row :gutter="30">
        <el-col :span="12">
          <el-form-item label="使用单位" prop="useCompany">
            <el-select v-model="editBaseInfoForm.useCompany" placeholder="请选择">
              <el-option label="单位1" value="1"></el-option>
              <el-option label="单位2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车牌号" prop="carNum">
            <el-input v-model="editBaseInfoForm.carNum" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车牌颜色" prop="color">
            <el-select v-model="editBaseInfoForm.color" placeholder="请选择">
              <el-option label="白" value="1"></el-option>
              <el-option label="黄" value="2"></el-option>
              <el-option label="蓝" value="2"></el-option>
              <el-option label="绿" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="使用状况" prop="status">
            <el-select v-model="editBaseInfoForm.status" placeholder="请选择">
              <el-option label="正常" value="1"></el-option>
              <el-option label="不太正常" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车辆类别" prop="type">
            <el-select v-model="editBaseInfoForm.type" placeholder="请选择">
              <el-option label="小汽车" value="1"></el-option>
              <el-option label="大车" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车辆类型" prop="model">
            <el-input v-model="editBaseInfoForm.model" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="厂牌型号" prop="brandType">
            <el-select v-model="editBaseInfoForm.brandType" placeholder="请选择">
              <el-option label="型号1" value="1"></el-option>
              <el-option label="型号2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发动机号" prop="engineNum">
            <el-input v-model="editBaseInfoForm.engineNum" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车架号码" prop="frameNum">
            <el-input v-model="editBaseInfoForm.frameNum" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排放标准" prop="emissionStandard">
            <el-select v-model="editBaseInfoForm.emissionStandard" placeholder="请选择">
              <el-option label="小排量" value="1"></el-option>
              <el-option label="大排量" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="购置日期" prop="purchaseDay">
            <el-date-picker
              v-model="editBaseInfoForm.purchaseDay"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="请输入购置日期"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="购置价格(元)" prop="purchasePrice">
            <el-input v-model="editBaseInfoForm.purchasePrice" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="报废期限" prop="storageLocation">
            <el-input v-model="editBaseInfoForm.storageLocation" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 操作按钮 -->
    <div class="float-btns">
      <el-button v-if="!startEdit" class="edit_btn" type="primary" @click="editInfo">
        <i class="iconfont law-edit"></i>
        <br />修改
      </el-button>
      <el-button v-if="startEdit" class="edit_btn" type="primary" @click="saveInfo">
        <i class="iconfont law-save"></i>
        <br />保存
      </el-button>
    </div>
    <!-- 查看证件详情 -->
    <CertificateDetail ref="certificateDetailRef" />
  </div>
</template>
<script>
import CertificateDetail from "@/page/device/components/equipmentDetail/certificateDetail";

export default {
  components: { CertificateDetail },
  data() {
    return {
      editBaseInfoForm: {},
      rules: {},
      startEdit: false
    };
  },
  created() {},
  methods: {
    // 查看详情
    openCertificateDetail() {
      this.$refs.certificateDetailRef.showModal();
    },
    // 修改
    editInfo(){
      this.startEdit = true;
    },
    // 保存
    saveInfo(){
      this.startEdit = false;
    }
  },
};
</script>
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
    float: left;
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
}
</style>
