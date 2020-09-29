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
            <el-row v-if="handelType == 'add'">
                <el-form-item label="分类等级" prop="levelsType">
                    <el-select :disabled="handelType == 'edit'" v-model="processTypeForm.levelsType" @change="levelsTypeChange" placeholder="请选择">
                        <el-option label="同级" value="1" >同级</el-option>
                        <el-option label="下级" v-if="curTreeNodeNode && curTreeNodeNode.data.levels != 3"  value="2" >下级</el-option>
                    </el-select>
                </el-form-item>
            </el-row>
            <el-row v-if="handelType == 'add'">
                <el-form-item label="" prop="levels">
                    <el-select :disabled="handelType == 'add'" v-model="processTypeForm.levels" @change="levelsChange" placeholder="请选择">
                        <el-option
                            v-for="item in levelsList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                            ></el-option>
                    </el-select>
                </el-form-item>
            </el-row>
            <el-row v-if="processTypeForm && processTypeForm.levels && processTypeForm.levels != '1'">
                <el-form-item label="上级分类" prop="parentId">
                    <el-select :disabled="handelType == 'add' || handelType == 'edit'" v-model="processTypeForm.parentId" placeholder="请选择">
                        <el-option
                            v-for="item in parentTypeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                            ></el-option>
                    </el-select>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="类型名称" prop="name">
                    <el-input v-model="processTypeForm.name"></el-input>
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
import { saveCheProcessTypeApi, getProcessTypeByLevelsApi } from "@/api/supervision";

export default {
    props: {
        curTreeNodeNode: Object
    },
    data() {
        return {
        visible: false,
        processTypeForm: {
            name: null,
            levels: "",
            parentId: ""
        },
        rules: {
            name: [
            { required: true, message: "分类名称不能为空", trigger: "blur" },
            ],
            levels: [
            { required: true, message: "分类等级不能为空", trigger: "blur" },
            ],
            parentId: [
            { required: true, message: "上级分类不能为空", trigger: "blur" },
            ],
        },
        dialogTitle: "新增情况分类", //弹出框title
        handelType: "add", //添加 add  修改 edit
        levelsList: [{name: "一级分类", value: "1"}, {name: "二级分类", value: "2"}, {name: "三级分类", value: "3"}],
        parentTypeList: [],
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
        levelsTypeChange(){
            if(this.processTypeForm.levelsType == "1"){
                this.processTypeForm.levels = this.curTreeNodeNode.data.levels + "";
                this.processTypeForm.parentId = this.curTreeNodeNode.parent.data.id;
                this.getProcessTypeByLevels(parseInt(this.processTypeForm.levels)-1);
            }else if (this.processTypeForm.levelsType == "2"){
                this.processTypeForm.levels = parseInt(this.curTreeNodeNode.data.levels) + 1 + "";
                this.processTypeForm.parentId = this.curTreeNodeNode.data.id;
                this.getProcessTypeByLevels(parseInt(this.processTypeForm.levels)-1);
            }
        },
        levelsChange() {
            const levels = this.processTypeForm.levels;
            this.processTypeForm.parentId = "";
            if(levels && levels != "1"){
                //获取所有上级处理类型
                this.getProcessTypeByLevels(parseInt(levels) - 1);
            }
        },
        getProcessTypeByLevels(levels) {
            getProcessTypeByLevelsApi(levels).then(
                res => {
                    if(res.code == 200){
                        this.parentTypeList = res.data;
                    }else{
                        console.error(res);
                    }
                },
                err => console.error(err)
            );
        },
        showModal(type, data) {
            this.visible = true;
            this.handelType = type;
            //添加
            if(type === "add") {
                // const fromData = { pName: data.name, levels: parseInt(data.levels) + 1, parentId: data.id};
                this.dialogTitle = "新增情况分类";
                this.processTypeForm.levelsType = "1";
                this.processTypeForm.levels = this.curTreeNodeNode.data.levels + "";
                this.processTypeForm.parentId = this.curTreeNodeNode.parent.data.id;
                this.getProcessTypeByLevels(parseInt(this.processTypeForm.levels)-1);
            }else{//修改
                const levels = parseInt(data.levels);
                levels != 1 && this.getProcessTypeByLevels(levels - 1);
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
