<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="25%">
        <el-form :inline="true" :model="addRoomForm" label-position="right"  label-width="100px" ref="addRoomFormRef" :rules="rules">
            <el-row>
                <el-form-item label="考场名称" prop="roomName" class="form-class">
                    <el-input v-model="addRoomForm.roomName" style="width: 320px;"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="容纳人数" prop="roomSum" class="form-class">
                    <el-input v-model="addRoomForm.roomSum" style="width: 320px;"></el-input>
                </el-form-item>
            </el-row>
            <div class="item" style="text-align:right">
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submit">保 存</el-button>
                    <el-button  @click="visible = false">离 开</el-button>
                </span>
            </div>
        </el-form>
    </el-dialog>
</template>
<script>
export default {
    data(){
        return{
            visible: false,
            addRoomForm: {
                roomSum:"",
                roomName:"",
            },
            rules: {
                roomName: [{ required: true, message: "考场名称不能为空", trigger: "blur" }],
                roomSum: [{ required: true, message: "容纳人数不能为空", trigger: "blur" }],
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
            if(_this.addRoomForm.roomName===""){
                _this.$message({
                    type:'warning',
                    message:'考场名称不能为空',
                });
                return;
            }
            if(_this.addRoomForm.roomSum===""){
                _this.$message({
                    type:'warning',
                    message:'容纳人数不能为空',
                });
                return;
            }
            if(_this.handelType==1){
                _this.$store.dispatch("addExamOutlineInfo", _this.addExamBatchForm).then(res => {
                    _this.$emit("getExamBatchListComp");
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
                _this.$store.dispatch("updateExamOutlineInfo", _this.addExamBatchForm).then(res => {
                    _this.$emit("getExamBatchListComp");
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
            _this.dialogTitle = "新增";
            _this.isDisabled=false;
        },
         //聚焦清除错误信息
        focusName() {
            this.errorName = false;
        },
        //关闭弹窗的时候清除数据
        closeDialog() {
            this.visible = false;
            this.$refs["addRoomForm"].resetFields();
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
