<template>
    <div class="cats-layout-page-content">
        <!-- <div class="searchAndpageBox toggleBox" > -->
        <div class="searchAndpageBox toggleBox" id="userBox">
            <div class="handlePart">
                <div class="search">
                    <el-form :inline="true">
                        <el-form-item label="机构名称">
                            <el-select filterable v-model="search.orgId" placeholder="全部" @change="onChange">
                                <el-option v-for="item in orgList" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="tablePart">
                <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%"
                    @row-click="showDataDetail">
                    <el-table-column label="序号" width="70px">
                        <template slot-scope="scope">
                            {{ scope.$index + 1 }}
                        </template>
                    </el-table-column>
                    <!--列表字段-->
                    <el-table-column prop="organName" label="机构名称"></el-table-column>
                    <el-table-column prop="ajBsjs" label="案卷报送基数"></el-table-column>
                    <el-table-column prop="ajCqjs" label="案卷抽取基数"></el-table-column>
                    <el-table-column prop="ryBsjs" label="人员报送基数"></el-table-column>
                    <el-table-column prop="ryCqjs" label="人员抽取基数"></el-table-column>
                    <el-table-column label="操作" width="160">
                        <template slot-scope="scope">
                            <div style="width:160px">
                                <el-button type="text" @click.stop @click="showDataDetail(scope.row)">查看</el-button>
                                <el-button type="text" @click.stop @click="
                                            handleEdit(scope.$index, scope.row)
                                        ">修改
                                </el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-dialog :title="title" custom-class="batchConfigDialog" :visible.sync="visible" top="0" width="40%"
                @close="closeDialog" :close-on-click-modal="false">
                <div class="search">
                    <el-form :inline="true" :model="addForm" :rules="rules" ref="addForm" label-width="140px">
                        <el-form-item label="机构名称" prop="organName">
                            <el-input v-model="addForm.organName" style="width: 100%;" :readonly="this.formReadOnly">
                            </el-input>
                        </el-form-item>
                        <br />
                        <el-form-item label="案卷基数" prop="ajBsjs">
                            <el-input placeholder="请输入案卷基数" style="width: 100%;" v-model="addForm.ajBsjs"
                                :readonly="formReadOnly"></el-input>
                        </el-form-item>
                        <el-form-item label="结案时间" prop="ajJaDate">
                            <el-date-picker v-model="addForm.ajJaDate" style="width: 100%;" type="date"
                                value-format="yyyy-MM-dd" format="yyyy-MM-dd" :readonly="formReadOnly">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="案卷抽取基数" prop="ajCqjs">
                            <el-input placeholder="请输入抽取基数" style="width: 100%;" v-model="addForm.ajCqjs"
                                :readonly="formReadOnly"></el-input>
                        </el-form-item>
                        <br />
                        <el-form-item label="处罚或强制" prop="ajCfBsjs">
                            <el-input v-model="addForm.ajCfBsjs" style="width: 100%;" :readonly="formReadOnly">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="抽取" prop="ajCfCqjs">
                            <el-input v-model="addForm.ajCfCqjs" style="width: 100%;" :readonly="formReadOnly">
                            </el-input>
                        </el-form-item>
                        <br />
                        <el-form-item label="行政许可" prop="ajQzBsjs">
                            <el-input v-model="addForm.ajQzBsjs" style="width: 100%;" :readonly="formReadOnly">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="抽取" prop="ajQzCqjs">
                            <el-input v-model="addForm.ajQzCqjs" style="width: 100%;" :readonly="formReadOnly">
                            </el-input>
                        </el-form-item>
                        <br />
                        <el-form-item label="执法人员基数" prop="ryBsjs">
                            <el-input v-model="addForm.ryBsjs" style="width: 100%;" :readonly="formReadOnly">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="各级执法机构领导班子成员比例不低于" prop="ryZjProtion">
                            <el-input v-model="addForm.ryZjProtion" style="width: 100%;" :readonly="formReadOnly">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="抽取考试人员基数" prop="ryCqjs">
                            <el-input v-model="addForm.ryCqjs" style="width: 100%;" :readonly="formReadOnly">
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer" v-show="!formReadOnly">
                        <el-button @click="closeDialog">取 消</el-button>
                        <el-button @click="saveOrUpdate('addForm')" type="primary" class="btn-custom">
                            <span>确 定</span>
                        </el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
        <!-- </div> -->
    </div>
</template>
<style src="@/assets/scss/searchPage.scss" lang="scss" scoped></style>
<script>
    import {
        findPykhBatchConfigByOrganId,
        saveOrUpdatePykhBatchConfig,
        findPykhBatchConfigById
    } from "@/api/pykh/pykhBatchConfig.js";
    import { judgmentOrganId } from '@/api/pykh/appraisalExam.js'
    import {
        findAllDepartment
    } from "@/api/pykh/catsAppraisalExamPersonUpload.js";
    import {
        numType1,
        numCompareList
    } from "@/common/js/validator";
    import iLocalStroage from "@/common/js/localStroage";
    export default {
        data() {
            return {
                visible: false,
                formReadOnly: false,
                resultType:false,
                search: {},
                addForm: {},
                rules: {
                    ajBsjs: [{
                            required: true,
                            message: "请输入案卷基数",
                            trigger: "blur"
                        },
                        {
                            validator: (rule, value, callback) =>
                                numCompareList(
                                    [
                                        parseInt(this.addForm.ajCfBsjs) +
                                        parseInt(this.addForm.ajQzBsjs)
                                    ],
                                    ["="],
                                    rule,
                                    value,
                                    callback
                                ),
                            trigger: "blur"
                        }
                    ],
                    ajCfBsjs: [{
                            required: true,
                            message: "请输入行政处罚案卷基数",
                            trigger: "blur"
                        },
                        {
                            validator: (rule, value, callback) =>
                                numCompareList(
                                    [this.addForm.ajBsjs],
                                    ["="],
                                    rule,
                                    parseInt(value) +
                                    parseInt(
                                        this.addForm.ajQzBsjs ?
                                        this.addForm.ajQzBsjs :
                                        0
                                    ),
                                    callback
                                ),
                            trigger: "blur"
                        }
                    ],
                    ajQzBsjs: [{
                            required: true,
                            message: "请输入行政强制案卷基数",
                            trigger: "blur"
                        },
                        {
                            validator: (rule, value, callback) =>
                                numCompareList(
                                    [this.addForm.ajBsjs],
                                    ["="],
                                    rule,
                                    parseInt(value) +
                                    parseInt(
                                        this.addForm.ajCfBsjs ?
                                        this.addForm.ajCfBsjs :
                                        0
                                    ),
                                    callback
                                ),
                            trigger: "blur"
                        }
                    ],
                    ajCqjs: [{
                            required: true,
                            message: "请输入案卷抽取基数",
                            trigger: "blur"
                        },
                        {
                            validator: (rule, value, callback) =>
                                numCompareList(
                                    [
                                        parseInt(
                                            this.addForm.ajBsjs ?
                                            this.addForm.ajBsjs :
                                            0
                                        ),
                                        parseInt(
                                            this.addForm.ajCfCqjs ?
                                            this.addForm.ajCfCqjs :
                                            0
                                        ) +
                                        parseInt(
                                            this.addForm.ajQzCqjs ?
                                            this.addForm.ajQzCqjs :
                                            0
                                        )
                                    ],
                                    [">=", "="],
                                    rule,
                                    value,
                                    callback
                                ),
                            trigger: "blur"
                        }
                    ],
                    ajCfCqjs: [{
                            required: true,
                            message: "请输入行政处罚案卷抽取基数",
                            trigger: "blur"
                        },
                        {
                            validator: (rule, value, callback) =>
                                numCompareList(
                                    [
                                        parseInt(
                                            this.addForm.ajCqjs ?
                                            this.addForm.ajCqjs :
                                            0
                                        ) -
                                        parseInt(
                                            this.addForm.ajQzCqjs ?
                                            this.addForm.ajQzCqjs :
                                            0
                                        ),
                                        parseInt(
                                            this.addForm.ajCfBsjs ?
                                            this.addForm.ajCfBsjs :
                                            0
                                        )
                                    ],
                                    ["=", ">="],
                                    rule,
                                    value,
                                    callback
                                ),
                            trigger: "blur"
                        }
                    ],

                    ajQzCqjs: [{
                            required: true,
                            message: "请输入行政强制案卷抽取基数",
                            trigger: "blur"
                        },
                        {
                            validator: (rule, value, callback) =>
                                numCompareList(
                                    [
                                        parseInt(
                                            this.addForm.ajCqjs ?
                                            this.addForm.ajCqjs :
                                            0
                                        ) -
                                        parseInt(
                                            this.addForm.ajCfCqjs ?
                                            this.addForm.ajCfCqjs :
                                            0
                                        ),
                                        parseInt(
                                            this.addForm.ajQzBsjs ?
                                            this.addForm.ajQzBsjs :
                                            0
                                        )
                                    ],
                                    ["=", ">="],
                                    rule,
                                    value,
                                    callback
                                ),
                            trigger: "blur"
                        }
                    ],
                    ryBsjs: [{
                            required: true,
                            message: "请输入执法人员基数",
                            trigger: "blur"
                        },
                        {
                            validator: numType1,
                            trigger: "blur"
                        }
                    ],
                    ryCqjs: [{
                            required: true,
                            message: "请输入执法人员抽取基数",
                            trigger: "blur"
                        },
                        {
                            validator: (rule, value, callback) =>
                                numCompareList(
                                    [
                                        parseInt(
                                            this.addForm.ryBsjs ?
                                            this.addForm.ryBsjs :
                                            0
                                        )
                                    ],
                                    [">="],
                                    rule,
                                    value,
                                    callback
                                ),
                            trigger: "blur"
                        }
                    ],
                    ryZjProtion: [{
                            required: true,
                            message: "请输入领导班子成员比例",
                            trigger: "blur"
                        },
                        {
                            validator: numType1,
                            trigger: "blur"
                        }
                    ]
                },
                tableData: [], //表格数据
                title: "特殊设置",
                orgList: [],
                organId: ""
            };
        },
        components: {},
        methods: {
            saveOrUpdate(formName) {
                let _this = this;
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        saveOrUpdatePykhBatchConfig(_this.addForm).then(
                            res => {
                                _this.catsMessage({
                                    type: "success",
                                    message: "保存成功!"
                                });
                                _this.visible = false;
                                _this.queryData();
                            },
                            err => {
                                console.log(err);
                            }
                        );
                    }
                });
            },
            reset() {
                this.$refs["pykhBatchConfigForm"].resetFields();
            },
            //表单筛选
            async queryData() {
                let obj = await findPykhBatchConfigByOrganId(this.search.organId);
                this.tableData = obj.data;
            },
            //编辑
            handleEdit(index, row) {
                this.title = "修改特殊设置";
                this.findPykhBatchConfigById(row);
                this.formReadOnly = false;
            },
            //查看详情
            showDataDetail(row) {
                this.title = "特殊设置";
                this.findPykhBatchConfigById(row);
                this.formReadOnly = true;
            },
            async findPykhBatchConfigById(row) {
                let obj = await findPykhBatchConfigById(row.id);
                this.addForm = obj.data;
                this.visible = true;
            },
            //关闭弹窗的时候清除数据
            closeDialog() {
                this.visible = false;
                this.$refs["addForm"].resetFields();
            },
            async findAllOrg() {
                let obj = await findAllDepartment(this.organId);
                this.orgList = obj.data;
            },
            onChange(val) {
                this.search.organId = val;
                this.queryData();
            },
            async judgmentOrganIdFun(){
                let result = await judgmentOrganId();
                this.resultType=result.data;
                if(this.resultType){
                    this.findAllOrg();
                    if (this.$route.params.orgId !== undefined) {
                        this.search.orgId = this.$route.params.orgId;
                        this.queryData();
                    }
                }else{
                    this.queryData();
                }
            }
        },
        mounted() {
            let userInfo = iLocalStroage.gets("userInfo");
            this.organId = userInfo.organId;
            this.search.organId = this.organId;
            this.judgmentOrganIdFun();
            
        },
        created() {}
    };

</script>
<style lang="scss">
    @import "@/assets/scss/systemManage.scss";

</style>
