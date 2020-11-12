<template>
    <div class="inspect-record-description">
        <el-row :gutter="20" type="flex" class="record-description-row">
            <el-col :span="5" class="record-description-tree">
                <el-card shadow="never" style="height: 100%;">
                    <h3 class="form-tab-title">属性列表</h3>
                    <el-input
                        class="record-description-search"
                        placeholder="输入关键字进行过滤"
                        v-model="filterText">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-tree
                        class="template-tree"
                        :data="templateTreeData"
                        :props="defaultProps"
                        node-key="templateId"
                        current-node-key
                        highlight-current
                        default-expand-all
                        :filter-node-method="filterNode"
                        :render-content="renderNode"
                        @node-click="nodeClick"
                        ref="templateTreeRef">
                    </el-tree>
                </el-card>
            </el-col>
            <el-col :span="19" class="record-description-template">
                <el-card shadow="never" style="height: 100%;">
                    <div class="description-template-header">
                        <h3 class="form-tab-title">描述详情</h3>
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item>{{this.parentNodeData.name}}</el-breadcrumb-item>
                            <el-breadcrumb-item>详情</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>

                    <div  class="description-template-content">
                        <el-form 
                            class="record-description-template-from"
                            ref="templateFromRef" 
                            :model="templateFrom" 
                            label-width="80px">
                            <el-form-item label="模板名称:" prop="name">
                                <el-input v-model="templateFrom.name"></el-input>
                            </el-form-item>
                            <el-form-item prop="roadCondition">
                                <el-radio-group disabled v-model="templateFrom.roadCondition">
                                <el-radio :label="1">正常情况</el-radio>
                                <el-radio :label="2">异常情况</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="模板内容:" prop="content">
                                <el-input 
                                    id="tempContent"
                                    type="textarea"
                                    v-model="templateFrom.content"
                                    :autosize="{ minRows: 3, maxRows: 5}"
                                    ></el-input>
                            </el-form-item>
                            <el-form-item label="基本信息:">
                                <el-button v-for="(item, key) in baseInfo" @click="tmpButtonClick(item)" :key="key" type="success" size="small" plain>{{item.name}}</el-button>
                            </el-form-item>
                            <el-form-item label="检查内容:">
                                <el-button v-for="(item, key) in checkContent" @click="tmpButtonClick(item)" :key="key" type="success" size="small" plain>{{item.name}}</el-button>
                            </el-form-item>
                        </el-form>
                        
                        <div class="record-description-template-button">
                            <el-button type="primary" @click="onSubmit">保存</el-button>
                            <el-button type="danger" @click="onReset">重置</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getCheRecordTemplateTreeApi, saveCheRecordTemplateApi, deleteCheRecordTemplateByIdApi } from "@/api/supervision"

export default {
    components: {
    },
    data() {
    return {
        filterText: '',
        templateTreeData: [],
        parentNodeData: {},
        defaultProps: {
            children: 'children',
            label: 'label'
        },
        templateFrom: {
            templateId: "",
            name: "",
            content: "",
            roadCondition: 1
        },
        roadConditionEnum:{
            normal: 1,
            abnormal: 2
        },
        baseInfo: {
            checkStartTime: { name: '开始时间', value: '{checkStartTime}' },
            checkEndTime: { name: '结束时间', value: '{checkEndTime}' },
            checkCategory: { name: '检查门类', value: '{checkCategory}' },
            checkType: { name: '检查类型', value: '{checkType}' },
            address: { name: '填报地点', value: '{address}' },
            personInfos: { name: '执法人员', value: '{personInfos}' },
        },
        checkContent: {
            checkSroadNumtartTime: { name: '路线编号', value: '{checkSroadNumtartTime}' },
            roadName: { name: '路线名称', value: '{roadName}' },
            drivingDirection: { name: '行驶方向', value: '{drivingDirection}' },
            start: { name: '开始桩号', value: 'K{startKilometer}- {startMeter}m' },
            end: { name: '结束桩号', value: 'K{endKilometer}- {endMeter}m' }
        }
    }
},
    computed: {
    
    },
    created() {
        this.getCheRecordTemplateTree();
    },
    methods: {
        //获取模板树
        getCheRecordTemplateTree(){
            getCheRecordTemplateTreeApi().then(
                res => {
                    this.templateTreeData = res.data;
                    let curNode = {};
                    this.$nextTick(()=>{
                        if(this.templateTreeData[0].children.length > 0){
                            curNode = this.templateTreeData[0].children[0];
                            this.parentNodeData = this.templateTreeData[0];
                        }else{
                            curNode = this.templateTreeData[1].children[0];
                            this.parentNodeData = this.templateTreeData[1];
                        }
                        if(curNode){
                            curNode.roadCondition = parseInt(curNode.roadCondition);
                            this.templateFrom = JSON.parse(JSON.stringify(curNode));
                            this.$refs.templateTreeRef.setCurrentKey(curNode.templateId);
                        }
                    });
                },
                err => {console.error(err)}
            )
        },
        //过滤节点
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        //渲染节点
        renderNode(h, { node, data, store }) {
        return (
            <span class="template-tree-node">
                <span>
                    <span>
                        {data.level == 0 && <i class="el-icon-menu"> {data.name} </i> }
                        {data.level != 0 && <i class="el-icon-document"> {data.name} </i> }
                    </span>
                </span>
                <span>
                    { data.level == 0 && <el-button style="font-size: 12px;" type="text" on-click={ () => this.appendNode(data) }>添加</el-button>}
                    { data.level != 0 && <el-button style="font-size: 12px;" type="text" on-click={ () => this.removeNode(data) }>删除</el-button> }
                </span>
            </span>);
        },
        //添加节点
        appendNode(parentNodeData) {
            event.stopPropagation();
            this.$refs.templateTreeRef.setCurrentKey();
            this.parentNodeData = parentNodeData;
            this.templateFrom = {};
            this.templateFrom.roadCondition = parseInt(parentNodeData.roadCondition);
            console.log(this.templateFrom,'this.templateFrom')
        },
        removeNode(nodeData) {
            event.stopPropagation();
            this.$confirm("确定要删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                iconClass: "custom-question",
                customClass: "custom-confirm",
                }).then(() => {
                    deleteCheRecordTemplateByIdApi(nodeData.templateId).then(
                    res => {
                        if(res.code == 200){ 
                        this.$message({
                            type: "success",
                            message: "删除成功！"
                        });
                        this.getCheRecordTemplateTree();
                        }else{
                        this.$message({
                            type: "warning",
                            message: res
                        });
                        }
                    },
                    err => {}
                    );
                })
        },
        //节点点击
        nodeClick(data) {
            console.log(data,'node');
            if(data.level != 0){
                data.roadCondition = parseInt(data.roadCondition);
                this.templateFrom = JSON.parse(JSON.stringify(data));
                this.parentNodeData = this.templateTreeData.find(t => t.roadCondition == data.roadCondition);
            }
        },
        //保存
        onSubmit() {
            console.log(this.templateFrom,'submit');
            saveCheRecordTemplateApi(this.templateFrom).then(
                res => {    
                    if(res.code == 200){  
                        this.$message({
                            type: "success",
                            message: "保存成功!",
                        });
                        this.getCheRecordTemplateTree();
                    }else{
                        this.$message({
                            type: "warning",
                            message: "保存失败!",
                        });
                        console.log(res);
                    }
                },
                err => {console.log(err)}
            );
        },
        //重置
        onReset() {
            this.$refs.templateFromRef.resetFields();
            this.templateFrom.roadCondition = parseInt(this.parentNodeData.roadCondition);
        },
        tmpButtonClick(item) {
            this.templateFrom.content += item.value;
            $("#tempContent").focus();
        }
    },
    watch: {
        filterText(val) {
            this.$refs.templateTreeRef.filter(val);
        }
    },
};
</script>

<style lang="scss" scoped>
.inspect-record-description {
    position: relative;
    padding: 20px;
    height: calc(100% - 40px); 
    
    .record-description-row {
        height: 100%; 

        .form-tab-title {
            font-size: 18px;
            font-weight: bold;
            color: #20232b;
            padding-left: 10px;
            margin-bottom: 18px;
            border-left: 4px solid #4573d0;
        }

        .record-description-tree {

            >>> .el-card__body{
                height: 100%;
            }

            .record-description-search {
    
                >>> .el-button {
                    margin: -10px -27px;
                }
            }
            
            .template-tree {

                height: calc(100% - 70px);
                overflow-y: auto;
    
                >>> .template-tree-node {
                    flex: 1 1 0%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 14px;
                    padding-right: 8px;
                }
            }
        }

        .record-description-template {

            >>> .el-card__body {
                height: calc(100% - 40px);
            }

            >>> .el-breadcrumb{
                margin: 20px 30px;
            }

            &-from {
                width: 750px;
                margin: 20px;

                >>> .el-textarea__inner {
                    resize: vertical !important;
                }

            }

            &-button {
                text-align: center;
                width: 750px;
            }

            .description-template-header {
                height: 60px;
            }

            .description-template-content {
                overflow: auto;
                height: calc(100% - 60px);

                .record-description-template-button {
                    padding: 20px;
                }
            }

        }

    }
}
</style>