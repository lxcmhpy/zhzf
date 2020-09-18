<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="35%"
        class="add-processType-dialog"
    >
        <el-form
            :model="processTypeForm"
            label-position="right"
            label-width="110px"
            ref="addProcessTypeRef"
            :rules="rules"
        >
            <el-row>
                <el-form-item label="类型名称" prop="name">
                    <el-input v-model="processTypeForm.name"></el-input>
                </el-form-item>
            </el-row>
            <el-row v-if="processTypeForm.pName">
                <el-form-item label="上级分类">
                    <el-input disabled v-model="processTypeForm.pName"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="分类等级" prop="levels">
                    <el-input disabled v-model="processTypeForm.levels"></el-input>
                </el-form-item>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="submit">保 存</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { saveCheProcessTypeApi } from "@/api/supervision";

export default {
    data() {
        return {
        visible: false,
        processTypeForm: {
            name: ""
        },
        rules: {
            name: [
            { required: true, message: "分类名称不能为空", trigger: "blur" },
            ]
        },
        dialogTitle: "新增情况分类", //弹出框title
        handelType: "add", //添加 add  修改 edit
        };
    },
    computed: {
    },
    created() {
    },
    methods: {
        //提交
        submit() {
        this.$refs.addProcessTypeRef.validate((valid) => {
            if (valid) {
            const loading = this.$loading({
                lock: true,
                text: "正在保存",
                spinner: "car-loading",
                customClass: "loading-box",
                background: "rgba(234,237,244, 0.8)",
            });
            const params = JSON.parse(JSON.stringify(this.processTypeForm));
            saveCheProcessTypeApi(params).then(
                res=> {
                    if(res.code == 200){
                        this.$message({
                            type: "success",
                            message: res.msg
                        });
                        this.$parent.getCheProcessTypeTree();
                    }else if(res.code == 500){
                        this.$message({
                            type: "warning",
                            message: res.msg
                        });
                    }
                },
                err => {console.log(err)}
            );
            loading.close();
            this.closeDialog();
            } else {
            return false;
            }
        });
        },
        
        showModal(type, data) {
            this.visible = true;
            //添加
            if(type === "add") {
                const fromData = { pName: data.name, levels: parseInt(data.levels) + 1, parentId: data.id};
                this.processTypeForm = fromData;
                this.dialogTitle = "新增情况分类"
            }else{//修改
                const fromData = data;
                this.dialogTitle = "修改情况分类"
                this.processTypeForm = fromData;
            }
        
        },
        //关闭弹窗的时候清除数据
        closeDialog() {
            this.visible = false;
            this.$refs["addProcessTypeRef"].resetFields();
            for (const key in this.processTypeForm) {
                this.processTypeForm[key] = "";
            }
        },
    },
    };
</script>
<style lang="scss" scoped>
>>> .el-select,
>>> .el-date-editor {
display: block;
}
>>> .el-date-editor.el-input,
>>> .el-date-editor.el-input__inner {
display: block;
width: 100%;
}
>>> .el-range-editor.el-input__inner {
display: inline-block;
padding: 0 15px;
height: 32px;
line-height: 32px;
.el-range-input {
    height: 28px;
}
}
</style>
