<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="25%">
        <el-form :inline="true" :model="addPersonForm" label-position="right"  label-width="100px" ref="addPersonForm">
            <el-row style="height:36px;">
                <el-form-item label="年审年份:" prop="annuallyTime">
                    <el-select v-model="addPersonForm.attached" style="width: 260px;" placeholder="2019">
                        <el-option label="2018" value="0"></el-option>
                        <el-option label="2017" value="1"></el-option>
                        <el-option label="2016" value="2"></el-option>
                        <el-option label="2015" value="3"></el-option>
                    </el-select>
                </el-form-item>
            </el-row>
            <el-row style="height:36px;">
                <el-form-item label="年审成绩" prop="annuallyNum">
                    <el-select v-model="addPersonForm.attached" style="width: 260px;" >
                        <el-option label="不合格" value="0"></el-option>
                        <el-option label="基本合格" value="1"></el-option>
                        <el-option label="合格" value="2"></el-option>
                        <el-option label="优秀" value="3"></el-option>
                    </el-select>
                </el-form-item>
               
            </el-row>
            <el-row style="height:40px;">
                <el-form-item label="说明:" prop="remark">
                    <el-input v-model="addPersonForm.remark" style="width:260px;"></el-input>
                </el-form-item>
            </el-row>
            <div class="item" style="text-align:center;margin-top:10px;">
                <span slot="footer" class="dialog-footer">
                    <!-- <el-button type="danger"  @click="visible = false" icon="el-icon-close">取 消</el-button> -->
                    <el-button type="success" @click="submitPerson('addPersonForm')" icon="el-icon-check">保存</el-button>
                </span>
            </div>
        </el-form>
    </el-dialog>
</template>
<script>

export default {
    data(){
        return{
             searchType:[{value:0,label:'本机构'},{value:1,label:'本机构及子机构'}],
            imageUrl: '',
            visible: false,
            addPersonForm: {
             type:"", 
             remark:"",  // 备注说明
             annuallyTime:"", //年审时间
             annuallyNum:"",  //年审成绩
            },
            dialogTitle: "", //弹出框title
            errorName: false, //添加name时的验证
            handelType: 0, //添加 0  修改2
        }
    },
    methods:{
       
        //提交
        submitPerson() {

        },
        showModal(type) {
            this.visible = true;
            this.handelType = type;
            if(type==0){

            }else if(type==1){

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
<style lang="scss" src="@/assets/css/personManage.scss">
/* @import "@/assets/css/personManage.scss"; */

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
