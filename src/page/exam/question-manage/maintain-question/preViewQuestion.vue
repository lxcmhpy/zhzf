<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="25%">
        <el-form :inline="true" :model="preViewQuestionForm" label-position="right"  label-width="100px" ref="preViewQuestionFormRef" :rules="rules">
            <el-row>
                <el-form-item label="父级大纲" prop="questionName" class="form-class">
                    {{questionName}}
                </el-form-item>
            </el-row>
            <el-row>
                
            </el-row>
            <el-row>
                <el-form-item label="参考答案：" prop="questionName" class="form-class">
                    参考答案
                </el-form-item>
            </el-row>
        </el-form>
    </el-dialog>
</template>
<script>

export default {
    data(){
        return{
            isDisabled:true,
            visible: false,
            addMaintainOutlineForm: {
                parentId: "",
                parentName: "",
                outlineId:"",
                outlineName: "",
            },
            rules: {
                outlineName: [{ required: true, message: "大纲名称不能为空", trigger: "blur" }],
            },
            dialogTitle: "", //弹出框title
            errorName: false, //添加name时的验证
            handelType: 0, //添加 0  修改2  查看3
        }
    },
    methods:{
        //提交
        submit() {
            let _this = this
            if(_this.addMaintainOutlineForm.outlineName===""){
                _this.$message({
                    type:'warning',
                    message:'大纲名称不能为空',
                });
                return;
            }
            if(_this.handelType==1){
                _this.$store.dispatch("addExamOutlineInfo", _this.addMaintainOutlineForm).then(res => {
                    _this.$emit("getAllOutline");
                        _this.$message({
                            type: "success",
                            message:  "添加成功!",
                        });
                        _this.visible = false;
                    });
                    err => {
                        console.log(err);
                };
            }else if(_this.handelType==2){
                _this.$store.dispatch("updateExamOutlineInfo", _this.addMaintainOutlineForm).then(res => {
                    _this.$emit("getAllOutline");
                    _this.$message({
                        type: "success",
                        message:  "修改成功!",
                    });
                    _this.visible = false;
                });
                err => {
                    console.log(err);
                };
            }
        },
        showModal(type,row) {
            let _this=this
            _this.visible = true;
            _this.handelType = type;
            if(type==1){//新增
                _this.dialogTitle = "新增大纲";
                _this.isDisabled=false;
            }else if(type==2){//修改,查看
                if(type==2){
                    _this.dialogTitle = "修改";
                    _this.isDisabled=false;
                }else if(type==3){
                    _this.dialogTitle = "详情";
                    _this.isDisabled=true;
                }
				_this.addMaintainOutlineForm.outlineId=row.outlineId;
                _this.addMaintainOutlineForm.outlineName=row.outlineName;
                _this.addMaintainOutlineForm.parentId=row.parentId;
                _this.addMaintainOutlineForm.parentName=row.parentName;
            }
        },
         //聚焦清除错误信息
        focusName() {
            this.errorName = false;
        },
        //关闭弹窗的时候清除数据
        closeDialog() {
            this.visible = false;
            this.$refs["addMaintainOutlineFormRef"].resetFields();
            this.errorName = false;
        },
    }
}
</script>
<style lang="scss" scoped>
.el-input__inner{
    width:320px;
}
</style>
