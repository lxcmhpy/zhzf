<!-- 新增车辆基本信息 -->
<template>
  <div class="base-info-wrap">
    <!-- 查看基本信息 -->
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
    <!-- 编辑基本信息表单 -->
    <el-form
      v-if="startEdit"
      :model="form"
      :rules="rules"
      label-position="right"
      label-width="120px"
      ref="form"
      class="edit-base-info-from"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="使用单位" prop="useUnit">
            <elSelectTree
              ref="addFormUseUnitTreeObj"
              :options="organList"
              :accordion="true"
              :props="orgTreeProps"
              style="width: 100%;"
              placeholder="请选择"
              @getValue="queryFormUseUnitClick"
            ></elSelectTree>
            <el-input style="display:none" v-model="form.useUnit"></el-input>
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
              <el-option v-for="(value,index) in colors" :key="index" :label="value" :value="value"></el-option>
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
      <el-button v-if="!startEdit" class="edit_btn" type="primary" @click="startEdit = true">
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
import {
  saveOrUpdateDeviceVehicle,
  findDeviceVehicleById,
} from "@/api/device/deviceVehicle.js";
import { tree } from "@/api/device/device.js";
import iLocalStroage from "@/common/js/localStroage";
import CertificateDetail from "@/page/device/components/equipmentDetail/certificateDetail";
import elSelectTree from "@/components/elSelectTree/elSelectTree";

export default {
  components: { elSelectTree, CertificateDetail },
  data() {
    return {
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
      startEdit: false,
      organList: [],
      orgTreeProps: {
        label: "label",
        value: "id",
      },
    };
  },
  created() {},
  methods: {
    // 查看详情
    openCertificateDetail() {
      this.$refs.certificateDetailRef.showModal();
    },
    // 保存
    saveInfo() {
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
    //获取数据
    async getData(id) {
      this.isEdit = true;
      let res = await findDeviceVehicleById(id);
      this.form = res.data;
    },
    async getSelfTree() {
      debugger;
      let res = await tree(iLocalStroage.gets("userInfo").organId, "organ");
      console.log("organ=====" + res.data);
      this.organList = res.data;
    },
    queryFormUseUnitClick(val) {
      this.$refs.addFormUseUnitTreeObj.$children[0].handleClose();
      this.form.useUnit = val;
    },
  },
  mounted() {
    this.getSelfTree();
    if (this.$route.params.id !== "add") {
      this.getData(this.$route.params.id);
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
