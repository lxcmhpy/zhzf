<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="35%"
        class="process-dialog"
    >
        <el-form
            :model="processForm"
            label-position="right"
            label-width="110px"
            ref="processRef"
            :rules="rules"
        >
            <el-row>
                <el-form-item label="所属情况分类" prop="processTypeNode">
                    <el-input disabled v-model="processForm.processTypeNode"></el-input>
                </el-form-item>
            </el-row>
            <el-row v-if="processForm.pName">
                <el-form-item label="父级">
                    <el-input disabled v-model="processForm.pName"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="类型" prop="typeName">
                    <el-input disabled v-model="processForm.typeName"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="名称" prop="name">
                    <el-input 
                        class="process-name-input"
                        type="textarea"
                        :autosize="{ minRows: 1, maxRows: 6}"
                        v-model="processForm.name">
                    </el-input>
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
import { saveProessApi, deleteProcessApi } from "@/api/supervision";

export default {
    data() {
        return {
        visible: false,
        processForm: {
            name: ""
        },
        rules: {
            name: [
            { required: true, message: "分类名称不能为空", trigger: "blur" },
            ]
        },
        dialogTitle: "新增情况分类", //弹出框title
        handelType: "add", //添加 add  修改 edit
        curProcessTypeData: {}
        };
    },
    computed: {
    },
    created() {
    },
    methods: {
        //提交
        submit() {
        this.$refs.processRef.validate((valid) => {
            if (valid) {
            const loading = this.$loading({
                lock: true,
                text: "正在保存",
                spinner: "car-loading",
                customClass: "loading-box",
                background: "rgba(234,237,244, 0.8)",
            });
            const params = JSON.parse(JSON.stringify(this.processForm));
            saveProessApi(params).then(
                res=> {
                    if(res.code == 200){
                        this.$message({
                            type: "success",
                            message: res.msg
                        });
                        debugger;
                        this.$parent.getProcessData(this.curProcessTypeData.id);
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
        
        showModal(type, parentProcess, processTypeNode, process) {
            this.visible = true;
            const typeName = !parentProcess ? "处理情况" : parentProcess.type == "1" ? "处理方式" : "处理结果";
            const processType = !parentProcess ? "1" : parentProcess.type == "1" ? "2" : "3";
            this.curProcessTypeData = processTypeNode;
            //添加
            let fromData = { processTypeNode: processTypeNode.name, processTypeId: processTypeNode.id, type: processType, typeName };
            fromData.pName = parentProcess && parentProcess.name;
            fromData.parentId = parentProcess && parentProcess.id;
            if(type === "add") {
                this.processForm = fromData;
                this.dialogTitle = "新增"
            }else{//修改
                Object.assign(fromData, process) ;
                this.dialogTitle = "修改"
                this.processForm = fromData;
            }
        
        },
        //关闭弹窗的时候清除数据
        closeDialog() {
            this.visible = false;
            this.$refs["processRef"].resetFields();
            for (const key in this.processForm) {
                this.processForm[key] = "";
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
.process-dialog {

    .process-name-input {

        >>> .el-textarea__inner{

            resize: vertical !important;
        }
    }
}
</style>
