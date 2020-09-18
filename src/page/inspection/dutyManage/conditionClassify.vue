<template>
    <div class="inspect-condition-classify">
        <el-row :gutter="20" type="flex" class="condition-classify-row">
            <el-col :span="5" class="record-condition-tree">
                <el-card shadow="never" style="height: 100%;">
                    <h3 class="form-tab-title">现场情况分类</h3>
                    <el-button class="condition-tree-addButton" type="primary" size="mini" icon="el-icon-plus" @click="appendTreeNode">
                        新增
                    </el-button>
                    <el-input
                        class="record-condition-search"
                        placeholder="输入关键字进行过滤"
                        v-model="filterText">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-tree
                        class="process-type"
                        :data="typeTreeData"
                        :props="defaultProps"
                        node-key="id"
                        current-node-key
                        highlight-current
                        default-expand-all
                        :expand-on-click-node="false"
                        :filter-node-method="filterNode"
                        :render-content="renderNode"
                        @node-click="nodeClick"
                        ref="typeTreeRef">
                    </el-tree>
                </el-card>
            </el-col>
            <el-col :span="19" class="record-condition-detail">
                <el-card shadow="never" style="height: 100%;">
                    <el-row class="record-condition-header">
                        <h3 class="form-tab-title">处理情况</h3>
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item v-for="name in breadcrumbList" :key="name">{{name}}</el-breadcrumb-item>
                        </el-breadcrumb>
                        <el-button class="record-condition-detail-delete" plain icon="el-icon-delete-solid" size="medium" @click="deleteProcessFun">删除</el-button>
                    </el-row>
                    <el-row class="record-condition-content">
                        <el-col :span="6" class="record-condition-classify">
                            <el-card shadow="never" style="height: 100%;">
                                <div >
                                    <h3 class="process-tab-title">处理情况</h3>
                                    <ul v-if="processList.length > 0" class="process-data">
                                        <li 
                                            :class="{active: curProcess && item.id == curProcess.id}"
                                            v-for="item in processList" 
                                            :key="item.id"
                                            @dblclick.stop="processDbClick(item)"
                                            @click.stop="processClick(item)">
                                            <input type="checkbox" v-model="item.checked" :checked="item.checked"  @click.stop="" @dblclick.stop=""> 
                                            &nbsp;{{item.name}}
                                            <i v-if="item.children.length > 0" class="el-icon-arrow-right"></i>
                                        </li>
                                    </ul>
                                    <span v-else class="process-data-none">暂无数据</span>
                                    <el-button class="process-add-button" @click="appendProcess(1)">新增</el-button>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :span="9" class="record-condition-classify">
                            <el-card shadow="never" style="height: 100%;">
                                <h3 class="process-tab-title">处理方式</h3>
                                <ul v-if="processModeList.length > 0" class="process-data">
                                    <li 
                                        :class="{active: curMode && item.id == curMode.id}"
                                        v-for="item in processModeList" 
                                        :key="item.id"
                                        @dblclick.stop="processDbClick(item)"
                                        @click.stop="processClick(item)">
                                        <input type="checkbox" v-model="item.checked" :checked="item.checked" @click.stop="" @dblclick.stop=""> 
                                        &nbsp;{{item.name}}
                                        <i v-if="item.children.length > 0" class="el-icon-arrow-right"></i>
                                    </li>
                                </ul>
                                <span v-else class="process-data-none">暂无数据</span>
                                <el-button class="process-add-button" @click="appendProcess(2)">新增</el-button>
                            </el-card>
                        </el-col>
                        <el-col :span="9" class="record-condition-classify">
                            <el-card shadow="never" style="height: 100%;">
                                <h3 class="process-tab-title">处理结果</h3>
                                <ul v-if="processResultList.length > 0" class="process-data">
                                    <li 
                                        :class="{active: curResult && item.id == curResult.id}"
                                        v-for="item in processResultList" 
                                        :key="item.id"
                                        @dblclick.stop="processDbClick(item)"
                                        @click.stop="processClick(item)">
                                        <input type="checkbox" v-model="item.checked" :checked="item.checked"  @click.stop="" @dblclick.stop=""> 
                                        &nbsp;  {{item.name}}
                                        <i v-if="item.children.length > 0" class="el-icon-arrow-right"></i>
                                    </li>
                                </ul>
                                <span v-else class="process-data-none">暂无数据</span>
                                <el-button class="process-add-button" @click="appendProcess(3)">新增</el-button>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    <AddProcessType ref="addProcessTypeRef" />
    <AddProcess ref="addProcessRef" />
    </div>
</template>

<script>
import AddProcessType from '@/page/inspection/dutyManage/components/addProcessType';
import AddProcess from '@/page/inspection/dutyManage/components/addProcess';
import { getCheProcessTypeTreeApi, deleteCheProcessTypeByIdApi, getProcessTypeTreeApi, deleteProcessApi } from "@/api/supervision"

export default {
    components: {
        AddProcessType,
        AddProcess
    },
    data() {
    return {
        defaultProps: {
            children: 'children',
            label: 'label'
        },
        typeTreeData: [],
        filterText: '',
        processList: [],//处理情况
        processModeList: [],//处理方式
        processResultList: [],//处理结果
        curProcess: undefined,//当前处理情况
        curMode: undefined,//当前处理方式
        curResult: undefined,//当前处理结果
        curTypeNode: undefined,//当前情况分类
        breadcrumbList: [],//右侧面包屑
    }
},
    computed: {
    
    },
    created() {
        this.getCheProcessTypeTree();
    },
    methods: {
        //过滤节点
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        //渲染节点
        renderNode(h, { node, data, store }) {
            return (
                <span class="process-type-node">
                    <span>
                        <span>
                            <i class="el-icon-menu"> {data.name} </i>
                        </span>
                    </span>
                    <span>
                        <el-button style="font-size: 12px;" type="text" on-click={ () => this.editTreeNode(data, node.parent) }>修改</el-button>
                        <el-button style="font-size: 12px;" type="text" on-click={ () => this.removeTreeNode(data) }>删除</el-button>
                    </span>
                </span>);
        },
        getCheProcessTypeTree() {
            getCheProcessTypeTreeApi().then(
                res => {
                    this.typeTreeData = res.data;
                },
                err => {console.error(err)}
            );
        },
        //添加节点
        appendTreeNode(parentNodeData) {
            event.stopPropagation();
            this.$refs.addProcessTypeRef.showModal('add', parentNodeData);
        },
        //修改节点
        editTreeNode(nodeData, parent) {
            debugger;
            event.stopPropagation();
            nodeData.pName = parent.data.name;
            this.$refs.addProcessTypeRef.showModal('edit', JSON.parse(JSON.stringify(nodeData)));
        },
        //节点点击
        nodeClick(data,node) {
            this.curTypeNode = data;
            console.log(data,'nodedata');
            console.log(node,'node');
            this.curProcess = undefined;
            this.curMode = undefined;
            this.curResult = undefined;
            this.getProcessData(data.id);

            this.breadcrumbList = [];
            this.getBreadcrumbList(node);
        },
        getBreadcrumbList(node) {
            if(node.data.name){
                this.breadcrumbList.unshift(node.data.name);
            }
            if(node.parent){
                this.getBreadcrumbList(node.parent)
            }else{
                console.log(this.breadcrumbList,"this.breadcrumbList")
                return;
            }
        },
        getProcessData(processTypeId) {
            getProcessTypeTreeApi(processTypeId).then(
                res => {
                    if(res.code == 200) {
                        this.processList = res.data || [];
                        this.curProcess = this.curProcess ? this.curProcess : this.processList[0];
                        if(this.processList.length > 0) {
                            this.processModeList = this.curProcess ? this.processList.find(p => p.id == this.curProcess.id).children : this.processList[0].children;
                            this.curMode = this.curMode ? this.curMode : this.processModeList[0];
                            if(this.processModeList.length > 0) {
                                console.log(this.curMode);
                                console.log(this.processModeList,'test');
                                this.processResultList = this.curMode ? this.processModeList.find(p => p.id == this.curMode.id).children : this.processModeList[0].children;
                                this.curResult = this.curResult ? this.curResult : this.processResultList[0];
                            }else {
                                this.processResultList = [];
                            }
                        }else{
                            this.processModeList = [];
                            this.processResultList = [];
                        }
                    }else{
                        console.error(res)
                    }
                },
                err => console.error(err)
            );
        },
        removeTreeNode(nodeData) {
            event.stopPropagation();
            this.$confirm("确定要删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                iconClass: "custom-question",
                customClass: "custom-confirm",
                }).then(() => {
                    deleteCheProcessTypeByIdApi(nodeData.id).then(
                        res => {
                            if(res.code == 200){
                                this.$message({
                                    type: "success",
                                    message: res.msg
                                });
                                this.getCheProcessTypeTree();
                            }else if(res.code == 500){
                                this.$message({
                                    type: "warning",
                                    message: res.msg
                                });
                            }
                        },
                        err => {console.log(err)}
                    );
                })
        },
        //处理情况点击
        processClick(process) {
            switch(process.type){
                case "1":
                    this.curMode = undefined;
                    this.curResult = undefined;
                    this.curProcess = process;
                    this.processModeList = process.children;
                    this.processResultList = this.processModeList.length > 0 && this.processModeList[0].children;

                    // const clickProcessIndex = this.processList.findIndex(p => p.id === process.id);
                    // const clickProcess = this.processList[clickProcessIndex];
                    // clickProcess.checked = !clickProcess.checked;
                    // this.$set(this.processList,clickProcessIndex,clickProcess);
                    break;
                case "2":
                    this.curResult = undefined;
                    this.curMode = process;
                    this.processResultList = process.children;

                    // const clickModeIndex = this.processModeList.findIndex(p => p.id === process.id);
                    // const clickMode = this.processModeList[clickModeIndex];
                    // clickMode.checked = !clickMode.checked;
                    // this.$set(this.processModeList,clickModeIndex,clickMode);
                    break;
                case "3":
                    this.curResult = process;

                    // const clickResultIndex = this.processResultList.findIndex(p => p.id === process.id);
                    // const clickResult = this.processResultList[clickResultIndex];
                    // clickResult.checked = !clickResult.checked;
                    // this.$set(this.processResultList,clickResultIndex,clickResult);
                    break;
            }
        },
        //处理情况双击
        processDbClick(process) {
            const parentProcess = process.type === "1" ? undefined : process.type === "2" ? this.curProcess : this.curMode;
            console.log(parentProcess,'editparentProcess')
            this.$refs.addProcessRef.showModal('edit', parentProcess, this.curTypeNode, process);
        },
        appendProcess(processType) {
            let parentProcess = undefined;
            let message = "";
            switch (processType){
                case 1:
                    if(!this.curTypeNode) {
                        message = "请选择处理情况分类！"
                    }
                    break;
                case 2:
                    if(this.curProcess){
                        parentProcess = this.curProcess;
                    }else {
                        message = "请选择处理情况！";
                    }
                    break;
                case 3:
                    if(this.curMode){
                        parentProcess = this.curMode;
                    }else {
                        message = "请选择处理方式！";
                    }
                    break;
            }
            if(message != ""){
                this.$message({  type: "warning", message });
            }else {
                this.$refs.addProcessRef.showModal('add', parentProcess, this.curTypeNode);
            }
        },
        //删除情况
        deleteProcessFun() {
            const processIds = this.processList.filter(p => p.checked).map(p => p.id);
            const processModeIds = this.processModeList.filter(p => p.checked).map(p => p.id);
            const processResultsIds = this.processResultList.filter(p => p.checked).map(p => p.id);
            let ids = processIds.concat(processModeIds).concat(processResultsIds);

            console.log(ids,'deleteIds');
            this.$confirm("确定要删除所选节点及其子节点吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                iconClass: "custom-question",
                customClass: "custom-confirm",
                }).then(() => {

                    deleteProcessApi(ids).then(
                        res => {
                            if(res.code == 200) {
                                this.$message({  type: "success", message: "删除成功"});
                                this.resetData();
                                this.getProcessData(this.curTypeNode.id);
                            }else{
                                this.$message({  type: "warning", message: res });
                            }
                        },
                        err => console.error(err)
                    );
                });
        },
        resetData(){
            this.curProcess = undefined;
            this.curMode = undefined;
            this.curResult = undefined;
            this.processList = [];
            this.processModeList = [];
            this.processResultList = [];
        }
    },
    watch: {
        filterText(val) {
            this.$refs.typeTreeRef.filter(val);
        }
    },
};
</script>

<style lang="scss" scoped>
.inspect-condition-classify {
    position: relative;
    padding: 20px;
    height: calc(100% - 40px); 
    
    .condition-classify-row {
        height: 100%; 

        .form-tab-title {
            font-size: 18px;
            font-weight: bold;
            color: #20232b;
            padding-left: 10px;
            margin-bottom: 18px;
            border-left: 4px solid #4573d0;
        }
        .record-condition-tree {
            position: relative;

            .record-description-search {
    
                >>> .el-button {
                    margin: -10px -27px;
                }
            }

            .process-type {
    
                >>> .process-type-node {
                    flex: 1 1 0%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 14px;
                    padding-right: 8px;
                }
            }

            .condition-tree-addButton{
                position: absolute;
                right: 20px;
                top: 20px;
            }
        }

        

        .record-condition-detail {
            height: 100%;
            >>> .el-card__body{
                height: calc(100% - 40px);
            }

            .record-condition-header {
                height: 70px;
            }

            .record-condition-content {
                height: calc(100% - 70px);
            }

            &-delete {
                position: absolute;
                right: 10px;
                bottom: 15px;
            }
        }

        .record-condition-classify {
            height: 100%;
            position: relative;

            >>> .el-card__body{
                padding: 0;
            }
            .process-tab-title {
                line-height: 40px;
                background: #f5f7fa;
                border-bottom: 1px solid #ebeef5;
                height: 40px;
                margin: 0;
                box-sizing: border-box;
                font-size: 15px;
                text-align: center;
    
            }

            .process-data {
                li {
                    font-size: 14px;
                    padding: 8px 20px;
                    position: relative;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: #606266;
                    height: 34px;
                    line-height: 1.5;
                    box-sizing: border-box;
                    cursor: pointer;
                    outline: none;

                    i {
                        right: 10px;
                        padding: 8px;
                        position: absolute;
                    }
                }
                li:hover {
                    background: #f5f7fa
                }
                .active {
                    color: #409eff;
                }

            }

            .process-data-none {
                position: absolute;
                line-height: 60px;
                width: 100%;
                color: #909399;
                text-align: center;
            }

            .process-add-button {
                position: absolute;
                bottom: 0;
                margin: 5px;
                width: calc(100% - 10px);
                border-radius: 10px;
                color: white;
                background: rgba(73, 141, 243, 0.877);
                border: none;
            }
        }

    }
}
</style>