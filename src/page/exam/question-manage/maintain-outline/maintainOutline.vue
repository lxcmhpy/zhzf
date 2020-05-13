<template>
<div class="com_searchAndpageBoxPadding">
    <div class="fullBox departBox">
        <div class="departOrUserTree">
            <p>大纲列表</p>
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
            <p>{{selectCurrentTreeName}}</p>
            <div class="handelBtn">
                <div>子大纲列表</div>
                <div>
                    <el-button @click="addOutline" icon="el-icon-plus" type="primary">新增大纲</el-button>
                </div>
            </div>
            <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                height="70%"
            >
            <el-table-column label="序号" type="index" width="50"></el-table-column>
            <el-table-column prop="outlineId" label="大纲id" v-if="false" align="center"></el-table-column>
            <el-table-column prop="outlineName" label="大纲名称" align="center"></el-table-column>
            <el-table-column prop="createName" label="创建人" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button @click.stop @click="updateOutline(scope.row)" type="text">修改</el-button>
                    <el-button type="text" @click.stop @click="deleteOutline(scope.row.outlineId)">删除</el-button>
                </template>
            </el-table-column>
            </el-table>
            <div class="paginationBox">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    background
                    :page-sizes="[10, 20, 30, 40]"
                    layout="prev, pager, next,sizes,jumper"
                    :total="totalPage">
                </el-pagination>
            </div>
        </div>

        <addOutline ref="addOrganRef" @getAllOrgan2="getAllOutline"></addOutline>
        <!--<updateOrgan ref="updateOrganRef" @getAllOrgan2="getAllOutline"></updateOrgan>-->
    </div>
</div>
</template>
<script>
import addOutline from "./addMaintainOutline";
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
                label: "outlineName"
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
        };
    },
    components: {
        addOutline,errorPage
    },
    inject: ["reload"],
    methods: {
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        //点击树事件
        handleNodeClick(data) {
            this.selectCurrentTreeName = data.outlineName;
            this.tableData = [];
            this.currentOutlineId = data.outlineId;
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
                _this.defaultExpandedKeys.push(res.data[0].outlineId);
                _this.selectCurrentTreeName = _this.selectCurrentTreeName ? _this.selectCurrentTreeName : res.data[0].outlineName;
                if (res.data[0].children && res.data[0].children.length > 0) {
                    res.data[0].children.forEach(item => {
                        _this.defaultExpandedKeys.push(item.outlineId);
                    });
                }
                _this.outlineData = res.data;
                if (outlineId == "0" || outlineId=="1") {
                    _this.currentOutlineId = res.data[0].outlineId;
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
        //获取选中的机构下的机构
        getSelectOutline(currentOutlineId) {
            let _this = this
            this.$store.dispatch("examOutlineTreeByParentIdInfo", currentOutlineId).then(
                res => {
                    _this.tableData = res.data;
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
        //新增大纲
        addOutline() {
            let parentNode = {
                parentName:this.selectCurrentTreeName,
                parentId: this.currentOutlineId,
            };
            this.$refs.addOrganRef.showModal(1, parentNode);
        },
        //修改机构
        updateOutline(row) {
            let data={
                outlineId:row.outlineId,
                outlineName:row.outlineName,
                parentName:this.selectCurrentTreeName,
            }
            this.$refs.addOrganRef.showModal(2, row);
        },
        //修改根节点机构
        editSelectNode() {
            let data = {
            id: id,
            parentNode: {
                parentNodeId: this.currentOutlineId,
                parentNodeName: this.selectCurrentTreeName
            }
            };
            this.$refs.addOrganRef.showModal(2, data);
        },
        //删除机构
        deleteOutline(outlineId) {
            let _this = this
            this.$confirm("确认删除该大纲?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
                _this.$store.dispatch("deleteExamOutlineByIdInfo", outlineId).then(
                    res => {
                        _this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                         _this.getAllOutline(_this.currentOutlineId);
                    },
                    err => {
                        console.log(err);
                    });
            })
            .catch(() => {});
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
        //this.getSystemType();
    }
};
</script>

<style lang="scss">
@import "@/assets/css/systemManage.scss";
</style>
