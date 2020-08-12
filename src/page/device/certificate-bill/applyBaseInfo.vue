<!-- 发证申请 -->
<template>
  <div class="apply-info-wrap">
    <h3 class="page-title">{{billTypeName}}</h3>
    <!-- 查看基本信息 -->
    <el-row v-if="!startEdit" :gutter="20">
      <el-col :span="12">
        <label class="item-label">车牌号</label>
        <div class="item-text">
          <span class="item-text" style="margin-left:0;">京A66666</span>
          <el-button type="text" style="padding:0;margin-left: 10px;">&lt;查看详情&gt;</el-button>
        </div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">使用单位</label>
        <div class="item-text">单位</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">车辆类别</label>
        <div class="item-text">类别一</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">车辆类型</label>
        <div class="item-text">汽车</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">厂牌型号</label>
        <div class="item-text">宝马</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">发动机号</label>
        <div class="item-text">987654321</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">车架号码</label>
        <div class="item-text">请输入行驶证上车辆识别代号，字母请大些</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">使用证号</label>
        <div class="item-text">1234567</div>
      </el-col>
      <el-col :span="24">
        <label class="item-label">申请理由</label>
        <div
          class="item-text"
        >上半年，我国经济运行稳步复苏，发展韧性和活力进一步彰显，但当前全球疫情蔓延扩散，我国经济下行压力依然较大。在危机中育新机、于变局中开新局，中国制造业正迎难而上、积极谋求转型升级。在疫情防控常态化条件下，中国制造业发展要克服哪些困难，又将迎来怎样的机遇？今天起，本版推出“危中寻机谋转型”系列报道。</div>
      </el-col>
      <el-col :span="24">
        <label class="item-label">其他材料</label>
        <div class="item-text">
          <p class="title-tips">挂失、注销必须提交相应证明</p>
          <div class="upload-apply-material">
            <ul class="el-upload-list el-upload-list--picture-card">
              <li tabindex="0" class="el-upload-list__item is-ready" style="margin-right: 30px;">
                <img
                  src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596608190416&di=4bcb89e073759d7dad09b5c5fe962713&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201510%2F15%2F20151015110000_KdRi2.jpeg"
                  class="el-upload-list__item-thumbnail"
                />
              </li>
              <li tabindex="0" class="el-upload-list__item is-ready" style="margin-right: 30px;">
                <img
                  src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596608232265&di=41ae063579a9c47611f717f40ffb368a&imgtype=0&src=http%3A%2F%2Fimg1.gtimg.com%2Fauto%2Fpics%2Fhv1%2F9%2F18%2F2054%2F133565949.jpg"
                  class="el-upload-list__item-thumbnail"
                />
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">申请日期</label>
        <div class="item-text">2019年09月11日</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">申请单位</label>
        <div class="item-text">北京市交通运输局</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">联系电话</label>
        <div class="item-text">15247952234</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">申请联系人</label>
        <div class="item-text">李四</div>
      </el-col>
    </el-row>
    <!-- 编辑基本信息表单 -->
    <el-form
      v-if="startEdit"
      :model="addForm"
      :rules="rules"
      label-position="right"
      label-width="120px"
      ref="addFormRef"
      class="edit-apply-info-from"
    >
      <el-row :gutter="30">
        <el-col :span="12">
          <el-form-item label="车牌号" prop="vehicleNumber">
            <el-input v-model="addForm.vehicleNumber" :readonly="true">
              <el-button style="color: white;background-color: #4d89ff;" slot="append" @click="changeVehicle">选择</el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="使用单位" prop="useUnit">
            <el-input v-model="addForm.useUnit" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车辆类别" prop="vehicleCategory">
            <el-input v-model="addForm.vehicleCategory" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车辆类型" prop="movehicleTypeel">
            <el-input v-model="addForm.vehicleType" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="厂牌型号" prop="brandModel">
            <el-input v-model="addForm.brandModel" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发动机号" prop="engineNumber">
            <el-input v-model="addForm.engineNumber" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车架号码" prop="axleNumber">
            <el-input v-model="addForm.axleNumber" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="使用证号" prop="usePermitNumber">
            <el-input v-model="addForm.usePermitNumber" placeholder="请输入">
              <el-button style="color: white;background-color: #4d89ff;" slot="append">自动获取</el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="申请理由" prop="note">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入"
              v-model="addForm.note"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <div class="el-form-item">
            <label class="el-form-item__label" style="width: 120px;">其他材料</label>
            <div class="el-form-item__content" style="margin-left: 120px;">
              <p class="title-tips">挂失、注销必须提交相应证明</p>
              <div class="upload-apply-material">
                <el-upload
                  action
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :auto-upload="false"
                >
                  <i class="el-icon-picture-outline"></i>
                </el-upload>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请日期" prop="billDate">
            <el-date-picker
              v-model="addForm.billDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="请选择日期"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申报单位" prop="declarationUnit">
                <elSelectTree
                    ref="addFormDeclarationUnitTreeObj"
                    :options="organList"
                    :accordion="true"
                    :props="orgTreeProps"
                    :filterable="true"
                    :value="addForm.declarationUnit"
                    @getValue="addFormDeclarationUnitClick">
                </elSelectTree>
                <el-input style="display:none" v-model="addForm.declarationUnit"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请联系人" prop="contactPerson">
            <el-input v-model="addForm.contactPerson" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="contactNumber">
            <el-input v-model="addForm.contactNumber" placeholder="请输入"></el-input>
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
    <el-dialog title="预览" :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
    <!-- 选择车辆 -->
    <SelectVehicle ref="selectVehicleRef" @VehicleOk="VehicleOk"></SelectVehicle>
  </div>
</template>
<script>
import elSelectTree from '@/components/elSelectTree/elSelectTree';
import iLocalStroage from '@/common/js/localStroage';
import SelectVehicle from '@/page/device/components/selectVehicle';
import {
    tree,
    upload,
    deleteFileById
} from "@/api/device/device.js";
import { 
    findDeviceCertificateBillById,
    saveOrUpdateDeviceCertificateBill
} from "@/api/device/deviceCertificateBill.js";
export default {
    components: {elSelectTree,SelectVehicle},
    data() {
        return {
            addForm: {
                billDate:new Date().format('yyyy-MM-dd'),
            },
            rules: {
                declarationUnit: [
                    {required: true, message: "请输入申报单位", trigger: "blur"}
                ],
                vehicleNumber: [
                    {required: true, message: "请选择车牌号", trigger: "blur"}
                ],
                usePermitNumber: [
                    {required: true, message: "请输入使用证号", trigger: "blur"}
                ],
            },
            startEdit: true,
            dialogVisible: false,
            dialogImageUrl: "",
            orgTreeProps: {
                label: "label",
                value: "id"
            },
            userInfo:{},
            host:'',
        };
    },
    props: {
      billTypeName: String,
      billType: String,
      url: String,
      organList:Array,
    },
  created() {},
  methods: {
    changeVehicle(){
        this.$refs.selectVehicleRef.showModal(this.billType,this.organList);
    },
    VehicleOk(obj){
        this.$set(this.addForm,'vehicleNumber',obj.vehicleNumber)
        this.$set(this.addForm,'vehicleId',obj.id)
        this.$set(this.addForm,'brandModel',obj.brandModel)
        this.$set(this.addForm,'axleNumber',obj.axleNumber)
        this.$set(this.addForm,'engineNumber',obj.engineNumber)
        this.$set(this.addForm,'useUnit',obj.useUnit)
        this.$set(this.addForm,'vehicleType',obj.vehicleType)
        this.$set(this.addForm,'vehicleCategory',obj.vehicleCategory)
        this.$set(this.addForm,'billType',this.billType)
    },
    // 删除其他材料
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    // 预览其他材料
    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    },
    // 修改
    editInfo() {
        this.startEdit = true;
    },
    // 保存
    saveInfo() {
        let _this = this
        this.$refs['addFormRef'].validate(valid => {
            if (valid) {
                saveOrUpdateDeviceCertificateBill(_this.addForm).then(
                    res => {
                        _this.$message({
                            type: "success",
                            message:"保存成功!"
                        });
                        _this.startEdit = false;
                    },
                    err => {
                        console.log(err);
                    }
                );
            }
        });
    },
    addFormDeclarationUnitClick(val) {
        this.$refs.addFormDeclarationUnitTreeObj.$children[0].handleClose();
        this.$set(this.addForm,'declarationUnit',val)
    },
  },
  mounted(){
    this.userInfo = iLocalStroage.gets("userInfo");
    this.host = iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST;
    this.$set(this.addForm,'declarationUnit',this.userInfo.organId)
  }
};
</script>
<style lang="scss" scoped>
.apply-info-wrap {
  padding: 10px 0;
  line-height: 28px;
  margin: 40px 10%;
  font-size: 14px;
  .page-title {
    font-size: 20px;
    font-weight: 560;
    text-align: center;
    color: #20232c;
    margin-bottom: 20px;
  }
  >>> .el-col {
    margin-bottom: 20px;
  }
  .edit-apply-info-from {
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
  .title-tips {
    color: #b2b2b2;
  }
  .upload-apply-material {
    >>> .el-upload--picture-card,
    >>> .el-upload-list__item {
      width: 176px;
      height: 96px;
      line-height: 96px;
      margin-right: 30px;
    }
  }
}
</style>
