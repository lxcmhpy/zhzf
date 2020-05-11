<template>
<div class="com_searchAndpageBoxPadding">
    <div class="fullBox departBox">
    <div class="departOrUserTree">
        <p>题库大纲</p>
        <div class="searchDepartBox">
            <el-input placeholder="输入大纲名称" v-model="filterText">
                <el-button slot="append" size="mini" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <div class="treeBox">
            <el-tree
                class="filter-tree"
                :data="outlineData"
                :props="defaultProps"
                node-key="id"
                :filter-node-method="filterNode"
                :default-expanded-keys="defaultExpandedKeys"
                @node-expand="nodeExpand"
                ref="tree"
                @node-click="handleNodeClick">
                <span class="custom-tree-node" slot-scope="{ node,data }">
                    <span>
                        <i :class="data.children && data.children.length>0 ? 'iconfont law-icon_shou_bag' : ''"></i>
                        <span :class="data.children ? '' : 'hasMarginLeft'">{{ node.label }}</span>
                    </span>
                </span>
            </el-tree>
        </div>
    </div>
    <div class="departTable">
        <div class="handelBtn" style="margin-bottom:0px;">
            <div>
                <el-form  :inline="true" :model="questionOutlineForm" label-width="120px;"  ref="questionOutlineFormRef">
                    <div class="item">
                        <el-row>
                            <el-form-item label="题型" prop="questionType">
                                <el-select v-model="questionOutlineForm.questionType" placeholder="选择题型" remote  @focus="getDictInfo('人员信息-执法领域','questionTypeList')">
                                        <el-option
                                            v-for="value in questionTypeList" :key="value.id" :label="value.name" :value="value.id">
                                        </el-option>
                                    </el-select>
                            </el-form-item>
                            <el-form-item label="难度" prop="questionLevel">
                                <el-select v-model="questionOutlineForm.questionLevel" placeholder="选择难度" remote  @focus="getDictInfo('人员信息-执法领域','level')">
                                        <el-option
                                            v-for="value in levelList" :key="value.id" :label="value.name" :value="value.id">
                                        </el-option>
                                    </el-select>
                            </el-form-item>
                            <el-form-item label="试题内容" prop="questionName" placeholder="试题内容">
                                <el-input v-model="questionOutlineForm.questionName"></el-input>
                            </el-form-item>
                            <el-form-item style="margin-left:5px;">
                                <el-button title="搜索" class="commonBtn searchBtn" size="medium" icon="iconfont law-sousuo"   @click="getQuestionList"></el-button>
                                <el-button title="重置" class="commonBtn searchBtn" size="medium" icon="iconfont law-zhongzhi" @click="resetLog"></el-button>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item>
                                <el-button type="primary"  icon="el-icon-plus" size="medium" @click="addQuestionInfo('','1')">新增考题</el-button>
                                <el-button style="background-color:#4aafa7;color:white" size="medium" @click="batchImport">批量导入</el-button>
                                <el-button style="background-color:#4aafa7;color:white" size="medium" @click="batchStart">批量启动</el-button>
                            </el-form-item>
                        </el-row>
                    </div>
                </el-form>
            </div>
        </div>
        <el-table
            :data="tableData"
            stripe style="width: 100%"   height="70%"
            @selection-change="selectDataInfo">
            <el-table-column prop="questionId" label="questionId" v-if="false"></el-table-column>
            <el-table-column label="序号" type="index" width="50"></el-table-column>
            <el-table-column prop="outlineName" label="大纲名称" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button @click.stop @click="updateQuestionInfo(scope.row.id)" type="text">修改</el-button>
                    <el-button type="text" @click.stop @click="deleteQuestionInfo(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--<div class="paginationBox">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                background
                :page-sizes="[10, 20, 30, 40]"
                layout="prev, pager, next,sizes,jumper"
                :total="totalPage">
            </el-pagination>
        </div>-->
    </div>

    <addMaintainQuestion ref="addMaintainQuestionRef" @getAllQuestion="getQuestionList"></addMaintainQuestion>
    </div>
</div>
</template>
<script>
import addMaintainQuestion from "./addMaintainQuestion";
import errorPage from "./../../common/erroPage";
export default {
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    data() {
        return {
            filterText: "",
            selectCurrentTreeName: "",
            outlineData: [],
            defaultProps: {
                children: "children",
                label: "label"
            },
            tableData: [], //表格数据
            departLevel: 0, //级别
            defaultExpandedKeys: [], //默认展开的key
            currentPage: 1, //当前页
            pageSize: 10, //pagesize
            totalPage: 0, //总页数
            currentOutlineId: "", //当前organ的id
            showAddDialog: false,
            systemType:"",//系统类型：部级还是省级
            questionOutlineForm:{
                questionLevel:"",
                questionName:"",
                questionType:"",
            },
            levelList:[],//试题难度列表
            questionTypeList:[],//试题类型列表
            selectData:[],
        };
    },
    components: {
        addMaintainQuestion,errorPage
    },
    inject: ["reload"],
    methods: {
        selectDataInfo(){
            
        },
        //获取下拉列表
        getDictInfo(){

        },
        //获取列表的时候，大纲的id
        getQuestionList(outlineId){

        },
        //批量导入
        batchImport(){

        },
        //批量开启
        batchStart(){

        },
        // 重置
        resetLog() {
            this.$refs["questionOutlineFormRef"].resetFields();
        },
         //新增试题
        addQuestionInfo() {
            let parentNode = {
                parentNodeId: this.currentOutlineId,
                parentNodeName: this.selectCurrentTreeName
            };
            this.$refs.addMaintainQuestionRef.showModal(parentNode,1);
        },
        //修改试题
        updateQuestionInfo(id) {
            let data = {
            id: id,
            parentNode: {
                parentNodeId: this.currentOutlineId,
                parentNodeName: this.selectCurrentTreeName
            }
            };
           // this.$refs.updateOrganRef.showModal(2, data);
        },
        //删除试题
        deleteQuestionInfo(id) {
            let _this = this
            this.$confirm("确认删除该试题?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
                _this.$store.dispatch("deleteOrgan", id).then(
                res => {
                    _this.getAllOutline(this.c);
                    _this.$message({
                    type: "success",
                    message: "删除成功!"
                    });
                },
                err => {
                    console.log(err);
                });
            })
            .catch(() => {});
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        //点击树事件
        handleNodeClick(data) {
            console.log(data);
            this.selectCurrentTreeName = data.label;
            this.tableData = [];
            this.currentOutlineId = data.id;
            this.getSelectOutline(this.currentOutlineId);
        },
        nodeExpand(data, node, jq) {
            console.log(data);
            console.log(node);
            console.log(jq);
        },

        //获取大纲
        getAllOutline(outlineId) {
            let _this = this
            this.$store.dispatch("examOutlineTreeAllInfo").then(
            res => {
                _this.defaultExpandedKeys.push(res.data[0].id);
                _this.selectCurrentTreeName = _this.selectCurrentTreeName ? _this.selectCurrentTreeName : res.data[0].label;
                if (res.data[0].children && res.data[0].children.length > 0) {
                    res.data[0].children.forEach(item => {
                        _this.defaultExpandedKeys.push(item.id);
                    });
                }
                _this.organData = res.data;
                if (outlineId == "root") {
                _this.currentOutlineId = res.data[0].id;
                } else {
                _this.currentOutlineId = outlineId;
                }
                _this.getSelectOutline();
            },
            err => {
                console.log(err);
            }
            );
        },
        //获取选中的大纲下的试题
        getSelectOutline() {
            let data = {
            id: this.currentOutlineId,
            current: this.currentPage,
            size: this.pageSize
            };
            console.log(data);
            let _this = this
            this.$store.dispatch("examOutlineTreeByParentIdInfo", data).then(
                res => {
                    console.log(res);
                    _this.tableData = res.data.records;
                    _this.totalPage = res.data.total;
                },
                err => {
                    console.log(err);
                }
            );
        },
        //更改每页显示的条数
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = 1;
            this.getSelectOutline();
        },
        //更换页码
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getSelectOutline();
        },
        //查询系统类型
        getSystemType() {
            this.$store.dispatch("getSystemParamInfo").then(
                res => {
                    _this.systemType = res.data.records;
                },
                err => {
                    console.log(err);
                }
            );
        },
    },
    created() {
        this.getAllOutline("");
        this.getSystemType();
    }
};
</script>

<style lang="scss">
@import "@/assets/css/systemManage.scss";
</style>
