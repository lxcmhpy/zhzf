<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="50%">
        <el-form :inline="true" :model="addPageForm" label-position="right"  label-width="100px" ref="addPageFormRef" :rules="rules">
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
                <el-row>
                    <el-form-item label="试卷名称" prop="pageName" placeholder="">
                        <el-input v-model="addPageForm.pageName"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="试卷类型" prop="pageType" placeholder="">
                        <el-input type="radio" v-model="addPageForm.pageType"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="模板选择" prop="pageTemplete" placeholder="">
                        <el-input v-model="addPageForm.pageTemplete"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="大纲类型" prop="pageTemplete" placeholder="">
                        <el-input v-model="addPageForm.pageTemplete"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="试题难度" prop="pageTemplete" placeholder="">
                        <el-input v-model="addPageForm.pageTemplete"></el-input>
                    </el-form-item>
                </el-row>
            </div>
            <div class="item" style="text-align:right">
                <span slot="footer" class="dialog-footer">
                    <div v-if="handelType!=3">
                        <el-button type="primary" @click="submit">确 定</el-button>
                        <el-button  @click="visible = false">取 消</el-button>
                    </div>
                    
                </span>
            </div>
        </el-form>
    </el-dialog>
</template>
<script>

export default {
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    data(){
        return{
            filterText:"",
            isDisabled:true,
            visible: false,
            selectCurrentTreeName: "",
            addPageForm: {
                templeteName:"",
                pageTemplete:"",
                pageName:"",
                pageType:"",
            },
            rules: {
                pageName: [{ required: true, message: "试卷名称不能为空", trigger: "blur" }],
                pageType: [{ required: true, message: "试卷类型不能为空", trigger: "blur" }],
                pageTemplete: [{ required: true, message: "试卷模板不能为空", trigger: "blur" }],
            },
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
            dialogTitle: "", //弹出框title
            errorName: false, //添加name时的验证
            handelType: 0, //添加 0  修改2  查看3
        }
    },
    methods:{
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
        //更换页码
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getSelectOutline();
        },
        //提交
        submit() {
            let _this = this
            if(_this.handelType==1){
                _this.$store.dispatch("addExamOutlineInfo", _this.addTempleteForm).then(res => {
                    _this.$emit("getTempleteComp");
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
                _this.$store.dispatch("updateExamOutlineInfo", _this.addTempleteForm).then(res => {
                    _this.$emit("getTempleteComp");
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
            _this.handelType = type;
            if(type==1){//新增
                _this.dialogTitle = "模板选择";
                _this.isDisabled=false;
            }else if(type==2){//修改,查看
                _this.dialogTitle = "修改";
                _this.isDisabled=false;
            }
        },
         //聚焦清除错误信息
        focusName() {
            this.errorName = false;
        },
        //关闭弹窗的时候清除数据
        closeDialog() {
            this.visible = false;
            this.$refs["addTempleteFormRef"].resetFields();
            this.errorName = false;
        },
    },
     created() {
        this.getAllOutline("");
    }
}
</script>
<style lang="scss" scoped>
.el-input__inner{
    width:320px;
}
</style>
