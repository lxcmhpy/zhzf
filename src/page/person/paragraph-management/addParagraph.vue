<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="25%">
        <el-form :inline="true" :model="addPersonForm" label-position="right"  label-width="100px" ref="addPersonForm">
            <el-row style="height:1px;">
                <el-form-item label="id" prop="personId" v-show="false">
                    <el-input v-model="addPersonForm.personId"></el-input>
                </el-form-item>
            </el-row>
            <el-row style="height:36px;">
                <el-form-item label="执法机构:" prop="attached">
                    <el-select v-model="addPersonForm.attached" style="width: 260px;" placeholder="机构名称">
                        <el-option label="宁夏回族自治区交通运输厅" value="0"></el-option>
                        <el-option label="XX交通局" value="1"></el-option>
                        <el-option label="XX交通局" value="2"></el-option>
                        <el-option label="XX交通局" value="3"></el-option>
                    </el-select>
                </el-form-item>
               
            </el-row>
            
            
            <el-form-item label="执法门类:" prop="attached">
                <el-row >
                        <span style="display:block">
                            <input type="checkbox"  value="0">综合执法
                        </span>
                        <span style="display:block">
                        <input type="checkbox"  value="1">工程质量监督
                        </span>
                        <span style="display:block">
                        <input type="checkbox"  value="2">公路路政
                        </span>
                        <span style="display:block">
                        <input type="checkbox"  value="3">水路交通行政执法
                        </span>
                        <span style="display:block">
                        <input type="checkbox"  value="4">高速公路路政
                        </span>
                    </el-row>
              </el-form-item>
           <el-row style="height:36px;">
                <el-form-item label="号段起:" prop="branchId">
                    <el-input v-model="addPersonForm.branchId" style="width:260px;"></el-input>
                </el-form-item>
            </el-row>
            <el-row style="height:40px;">
                <el-form-item label="号段止:" prop="provinceNo">
                    <el-input v-model="addPersonForm.provinceNo" style="width:260px;"></el-input>
                </el-form-item>
            </el-row>
             <el-row style="height:40px;">
                <el-form-item label="备注:" prop="ministerialNo">
                    <el-input v-model="addPersonForm.ministerialNo" style="width:260px;"></el-input>
                </el-form-item>
            </el-row>
          
            <div class="item" style="text-align:center;margin-top:10px;">
                <span slot="footer" class="dialog-footer">
                    <!-- <el-button type="danger"  @click="visible = false" icon="el-icon-close">取 消</el-button> -->
                    <el-button type="success" @click="submitPerson('addPersonForm')" icon="el-icon-check">提 交</el-button>
                </span>
            </div>
        </el-form>
    </el-dialog>
</template>
<script>

export default {
    data(){
        return{
            imageUrl: '',
            visible: false,
            addPersonForm: {
             
            },
        }
    },
    methods:{
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        //提交
        submitPerson() {

        },
        
        showModal(type,row) {
            this.visible = true;
            this.handelType = type;
            if(type==0){//新增
                this.dialogTitle = "新增执法号段";
            }else if(type==1){//修改
                this.dialogTitle = "修改执法号段";
            }

         },
         //聚焦清除错误信息
        focusName() {
            this.errorName = false;
        },
        //关闭弹窗的时候清除数据
        closeDialog() {
            this.visible = false;
            this.$refs["addPersonForm"].resetFields();
            this.errorName = false;
        },
    }
}
</script>
<style lang="scss">
@import "@/assets/css/personManage.scss";

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 260px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 260px;
    height: 150px;
    display: block;
  }
</style>
