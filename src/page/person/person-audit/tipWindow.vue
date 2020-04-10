<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="25%">
        <el-form :inline="true" :model="addPersonForm" label-position="right"  label-width="100px" ref="addPersonForm">
            <div :model="addPersonForm.type"> 是否确定审批通过？</div>
            <div class="item" style="text-align:center;margin-top:10px;">
                <span slot="footer" class="dialog-footer">
                    <el-button type="danger"  @click="visible = false" icon="el-icon-close">取 消</el-button>
                    <el-button type="success" @click="submitPerson('addPersonForm')" icon="el-icon-check">确 定</el-button>
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
             type:""
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
            if(type==0){//新增
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
