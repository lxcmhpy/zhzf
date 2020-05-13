<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="35%">
        <el-form class="apply-dd-form" :model="addApplyDdForm" :rules="rules" label-position="right"  label-width="100px" ref="addApplyDdFormRef">
            <el-row>
                <el-form-item label="id" prop="personId" v-show="false">
                    <el-input v-model="addApplyDdForm.personId"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="调入机构:" prop="inOrgan">
                    <elSelectTree
                        v-if="visible"
                        ref="elSelectTreeObj"
                        :options="tableDataTree"
                        :accordion="true"
                        :props="props"
                        @getValue="hindleChanged">
                    </elSelectTree>
                    <el-input style="display:none"  ref="inOrgan" v-model="addApplyDdForm.inOrgan"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="调动原因:" prop="reason">
                    <el-input v-model="addApplyDdForm.reason"></el-input>
                </el-form-item>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="submit('addApplyDdForm')">保 存</el-button>
        </div>
    </el-dialog>
</template>
<script>
import elSelectTree from '@/components/elSelectTree/elSelectTree';
export default {
    data(){
        return{
            tableDataTree:[],//所属机构下拉列表值***
            props: {
                label: "label",
                value: "id"
            },
            oidInfo:[],//机构信息
            addApplyDdForm: {
                personId:"",//人员id
                inOrgan: "",//申请调动机构id
                reason: "",//调离原因
            },
            visible: false,
            dialogTitle: "", //弹出框title
            errorName: false, //添加name时的验证
            rules: {
                inOrgan: [{ required: true, message: "调入机构必须填写", trigger: "change" }],
                reason: [{ required: true, message: "调动原因必须填写", trigger: "blur" }]
            }
        }
    },
    components:{
        elSelectTree
    },
    created(){
        this.searchTable();
    },
    methods:{
        searchTable() {//查询所属机构
            let _this = this
            _this.$store.dispatch("getOriginNoLimit").then(
                res => {
                _this.tableDataTree = res.data;
            },
            err => {
                console.log(err);
            });
        },
        hindleChanged(val) {
            this.$refs.elSelectTreeObj.$children[0].handleClose();
            this.addApplyDdForm.inOrgan = val
        },
        //提交
        submit() {
            let _this = this;
            _this.$refs.addApplyDdFormRef.validate((valid) => {
                if (valid) {
                    _this.$store.dispatch("applyDd", _this.addApplyDdForm).then(
                        res => {
                            if(res.code === 200){
                                _this.$message({
                                    type: "success",
                                    message: "调动成功!"
                                });
                                _this.closeDialog();
                                _this.$emit('getAddApplyDdComp');
                                //重新加载页面数据
                            }else{
                                _this.$message({ type: "error", message: "调动失败!"});
                            }
                        }, err => {_this.$message.error(err.msg);}
                    );
                } else {
                    return false;
                }
            });
        },
        showModal(data) {
            let _this = this;
            _this.dialogTitle="选择机构";
            _this.visible=true;
			_this.addApplyDdForm.personId=data;
        },
         //聚焦清除错误信息
        focusName() {
            this.errorName = false;
        },
        //关闭弹窗的时候清除数据
        closeDialog() {
            this.$refs["addApplyDdFormRef"].resetFields();
            this.visible=false;
        }
    }
}
</script>
<style lang="scss" scoped>
>>>.el-date-editor.el-input, >>>.el-select{
    width: 100%;
}
</style>
