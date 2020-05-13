<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="25%">
        <el-form :inline="true" label-position="right"  label-width="100px">
            <el-row>
                {{textContent}}
            </el-row>
            <div class="item" style="text-align:right">
                <span slot="footer" class="dialog-footer">
                    <el-button  @click="visible = false">确认</el-button>
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
            textContent:"",
            dialogTitle: "", //弹出框title
            errorName: false, //添加name时的验证
            handelType: 0, //添加 0  修改2  查看3
        }
    },
    methods:{
        //提交
        showModal(type,textContent) {
            let _this=this
            _this.visible = true;
            _this.handelType = type;
            _this.dialogTitle = "提示";
            _this.textContent=textContent;
        },
         //聚焦清除错误信息
        focusName() {
            this.errorName = false;
        },
        //关闭弹窗的时候清除数据
        closeDialog() {
            this.visible = false;
            this.textContent="";
            this.errorName = false;
        },
    }
}
</script>
<style lang="scss" scoped>

</style>
