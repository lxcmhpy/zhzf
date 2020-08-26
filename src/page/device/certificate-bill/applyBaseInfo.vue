<!-- 发证申请 -->
<template>
  <div class="apply-info-wrap">
    <h3 class="page-title">{{billTypeName}}</h3>
    <!-- 查看基本信息 -->
    <el-row v-if="!isEdit" :gutter="20">
      <el-col :span="12">
        <label class="item-label">车牌号</label>
        <div class="item-text">
          <span class="item-text" style="margin-left:0;">{{this.addForm.vehicleNumber}}</span>
            <el-button type="text" @click="viewVehicle" style="padding:0;margin-left: 10px;">&lt;查看详情&gt;</el-button>
        </div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">使用单位</label>
        <div class="item-text">{{this.addForm.useUnitName}}</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">车辆类别</label>
        <div class="item-text">{{this.addForm.vehicleCategory}}</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">车辆类型</label>
        <div class="item-text">{{this.addForm.vehicleType}}</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">厂牌型号</label>
        <div class="item-text">{{this.addForm.brandModel}}</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">发动机号</label>
        <div class="item-text">{{this.addForm.engineNumber}}</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">车架号码</label>
        <div class="item-text">{{this.addForm.axleNumber}}</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">使用证号</label>
        <div class="item-text">{{this.addForm.usePermitNumber}}</div>
      </el-col>
      <el-col :span="24">
        <label class="item-label">申请理由</label>
        <div
          class="item-text"
        >{{this.addForm.note}}</div>
      </el-col>
      <el-col :span="24">
        <label class="item-label">其他材料</label>
        <div class="item-text">
          <p class="title-tips">挂失、注销必须提交相应证明</p>
          <div class="upload-apply-material">
            <ul class="el-upload-list el-upload-list--picture-card">
                <li v-for="(item) in imageList" :key="item.storageId" class="el-upload-list__item is-ready" style="margin-right: 30px;">
                  <img
                    :src="item.url"
                    class="el-upload-list__item-thumbnail"
                    @click="handlePicturePreview(item.url)"
                    />
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">申请日期</label>
        <div class="item-text">{{this.addForm.billDate}}</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">申报单位</label>
        <div class="item-text">{{this.addForm.declarationUnitName}}</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">联系电话</label>
        <div class="item-text">{{this.addForm.contactNumber}}</div>
      </el-col>
      <el-col :span="12">
        <label class="item-label">申请联系人</label>
        <div class="item-text">{{this.addForm.contactPerson}}</div>
      </el-col>
    </el-row>
    <!-- 编辑基本信息表单 -->
    <el-form
      v-if="isEdit"
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
              <el-button style="color: #4573D0;" slot="append" @click="changeVehicle">选择</el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="使用单位" prop="useUnitName">
            <el-input v-model="addForm.useUnitName" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车辆类别" prop="vehicleCategory">
            <el-input v-model="addForm.vehicleCategory" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车辆类型" prop="vehicleType">
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
              <el-button 
                style="color: #4573D0;" 
                slot="append" 
                @click="getPerCode"
                v-show="addForm.vehicleNumber"
            >自动获取</el-button>
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
                  action="#"
                  accept=".jpg, .png"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :http-request="saveImageFile"
                  :file-list="imageList"
                  :on-remove="(file, fileList)=>deleteFile(file, fileList,'图片')"
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
        <div>
            <el-button v-if="!isEdit && addForm.status==1" class="edit_btn" type="primary" @click="editInfo">
                <i class="iconfont law-edit"></i>
                <br />修改
            </el-button>
        </div>
      <div>
        <el-button v-if="!isEdit && addForm.status==1" class="edit_btn" type="primary" style="margin-left:0;margin-top:10px;" @click="commitBill">
            <i class="iconfont law-save"></i>
            <br />提交
        </el-button>
      </div>
      <el-button v-if="isEdit" class="edit_btn" type="primary" @click="saveInfo">
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
    saveOrUpdateDeviceCertificateBill,
    getNo,
    checkNo,
    commitBill
} from "@/api/device/deviceCertificateBill.js";
export default {
    components: {elSelectTree,SelectVehicle},
    data() {
        return {
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
            dialogVisible: false,
            dialogImageUrl: "",
            orgTreeProps: {
                label: "label",
                value: "id"
            },
            userInfo:{},
            host:'',
            organList:[],
        };
    },
    props: {
      billTypeName: String,
      billType: String,
      addForm:Object,
      imageList:Array,
      isEdit:Boolean,
    },
  created() {
      this.getSelfTree()
  },
  methods: {
      viewVehicle(){
          let routerData = { id: this.addForm.vehicleId }
          this.$router.push({ name: "equipmentDetail", params: routerData });
      },
      handlePicturePreview(obj){
        this.dialogImageUrl = obj;
        this.dialogVisible = true;
      },
    async commitBill(){
        let res = await commitBill(this.addForm.id)
        if(res.code===200){
            this.$message({
                type: "success",
                message:"提交成功!"
            });
            this.$emit('afterCommit')
        }
    },
    async getSelfTree(){
        this.userInfo = iLocalStroage.gets("userInfo");
        let res = await tree(this.userInfo.organId,'organ')
        this.organList=res.data
    },
    async getPerCode(){
        let res = await getNo(this.addForm.useUnit)
        this.$set(this.addForm,'usePermitNumber',res.data)
    },
    //删除附件
    deleteFile(file, fileList,type){
        let _this = this
        deleteFileByIdApi(file.storageId).then(res=>{
            _this.imageList.splice(_this.imageList.findIndex(item => item.storageId === file.storageId), 1)
        },err=>{
            console.log(err)
        })
    },
    saveImageFile(param){
        this.saveFile(param,'图片')
    },
    saveFile (param,type) {
        var fd = new FormData()
        fd.append("file", param.file);
        fd.append("category", '执法装备证件单');
        fd.append("fileName", param.file.name);
        fd.append('status', type)//传记录id
        fd.append('caseId', param.file.name+new Date().getTime())//传记录id
        fd.append('docId', param.file.name+new Date().getTime())//传记录id
        let _this = this
        upload(fd).then(
            res => {
                _this.imageList.push({
                    url:iLocalStroage.gets('CURRENT_BASE_URL').PDF_HOST+'/'+res.data[0].storageId,
                    storageId:res.data[0].storageId,
                    name:res.data[0].fileName
                });
            },
            error => {
                console.log(error)
            }
        );
    },
    changeVehicle(){
        this.$refs.selectVehicleRef.showModal(this.billType,this.organList);
    },
    VehicleOk(obj){
        this.$set(this.addForm,'vehicleNumber',obj.vehicleNumber)
        this.$set(this.addForm,'vehicleId',obj.id)
        this.$set(this.addForm,'brandModel',obj.brandModel)
        this.$set(this.addForm,'axleNumber',obj.axleNumber)
        this.$set(this.addForm,'engineNumber',obj.engineNumber)
        this.$set(this.addForm,'useUnitName',obj.useUnitName)
        this.$set(this.addForm,'useUnit',obj.useUnit)
        this.$set(this.addForm,'vehicleType',obj.vehicleType)
        this.$set(this.addForm,'vehicleCategory',obj.vehicleCategory)
        this.$set(this.addForm,'billType',this.billType)
    },
    // 预览其他材料
    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    },
    // 修改
    editInfo() {
        this.$emit('setEdit', true)
    },
    // 保存
    saveInfo() {
        let _this = this
        let storageIds = []
        if(_this.imageList){
            _this.imageList.forEach(item=>{
                storageIds.push(item.storageId)
            })
            _this.addForm.storageIds = storageIds
        }
        _this.addForm.fileList = []
        this.$refs['addFormRef'].validate(valid => {
            if (valid) {
                checkNo(_this.addForm.usePermitNumber,_this.addForm.useUnit,_this.addForm.id).then(
                    res=>{
                        if(res.code==200){
                            saveOrUpdateDeviceCertificateBill(_this.addForm).then(
                                res => {
                                    _this.$message({
                                        type: "success",
                                        message:"保存成功!"
                                    });
                                    _this.addForm.status=1
                                    _this.addForm.id=res.data
                                    _this.$emit('setEdit', false)
                                },
                                err => {
                                    console.log(err);
                                }
                            );
                        }else{
                            _this.$message({
                                type: "error",
                                message:res.msg
                            });
                        }
                    },
                    err =>{
                        _this.$message({
                                type: "error",
                                message:err.msg
                            });
                    }
                );
            }
        });
    },
    addFormDeclarationUnitClick(val) {
        this.$refs.addFormDeclarationUnitTreeObj.$children[0].handleClose();
        this.$set(this.addForm,'declarationUnit',val)
        this.$set(this.addForm,'declarationUnitName',this.$refs.addFormDeclarationUnitTreeObj.valueTitle)
    },
  },
  mounted(){
    this.host = iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST;
  },
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
