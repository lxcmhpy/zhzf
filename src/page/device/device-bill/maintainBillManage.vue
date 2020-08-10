<template>
    <div class="com_searchAndpageBoxPadding">
        <div class="searchPageLayout" id="userBox">
            <div class="searchPage toggleBox">
                <div class="handlePart">
                    <el-form :inline="true" ref="deviceBillForm" :model="queryForm" label-width="120px">
                        <!--查询字段-->
                        <el-form-item label="单据状态" prop="status">
                            <el-select v-model="queryForm.status">
                                <el-option
                                    v-for="item in statusList"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="单据号" prop="billNo">
                            <el-input v-model="queryForm.billNo"></el-input>
                        </el-form-item>
                        <el-form-item label="单据日期" prop="billDate">
                            <el-date-picker v-model="queryForm.billDate" type="date" style="width:140px" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="报修单位" prop="useUnit">
                            <elSelectTree
                                ref="queryFormUseUnitTreeObj"
                                :options="organList"
                                :accordion="true"
                                :props="orgTreeProps"
                                style="width:200px" 
                                @getValue="queryFormUseUnitClick">
                            </elSelectTree>
                            <el-input style="display:none" v-model="queryForm.useUnit"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" size="medium" icon="el-icon-search" @click="queryData(1)">查询</el-button>
                            <el-button type="primary" size="medium" icon="el-icon-refresh-left" @click="reset">重置</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="medium" icon="el-icon-plus"  @click="addData">新增</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="tablePart">
                    <el-table
                            :data="tableData"
                            stripe
                            resizable
                            border
                            style="width: 100%;height:100%"
                            @row-click="showDataDetail"
                    >
                        <el-table-column label="序号" width="70px">
                            <template slot-scope="scope">
                                {{scope.$index+1}}
                            </template>
                        </el-table-column>
                        <!--列表字段-->
                        <el-table-column prop="status" label="状态" width="70px"></el-table-column>
                        <el-table-column prop="billNo" label="单据号" width="160"></el-table-column>
                        <el-table-column prop="billDate" label="单据日期" width="120px"></el-table-column>
                        <el-table-column prop="useUnit" label="报修单位"></el-table-column>
                        <el-table-column prop="userId" label="报修人" width="120px"></el-table-column>
                        <el-table-column prop="createName" label="处理人" width="120px"></el-table-column>
                        <el-table-column label="操作" width="160">
                            <template slot-scope="scope">
                                <div style="width:160px">
                                    <el-button type="text" @click.stop @click="showDataDetail(scope.row)">查看</el-button>
                                    <el-button v-if="scope.row.status=='维修中'" type="text" @click.stop @click="handleConfirm(scope.row)">维修完成</el-button>
                                   <!--  <el-button type="text" @click.stop @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                                    <el-button type="text" @click.stop @click="deleteRecord(scope.row)">删除</el-button> -->
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="paginationBox" v-if="tableData.length > 0">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            background
                            :page-sizes="[10, 20, 30, 40]"
                            layout="prev, pager, next,sizes,jumper"
                            :total="totalPage"
                    ></el-pagination>
                </div>
                <el-dialog :title="title"
                           custom-class="leftDialog"
                           :visible.sync="visible"
                           top="0"
                           width="40%"
                           @close="closeDialog"
                           :close-on-click-modal="false">
                    <el-form
                            :model="addForm"
                            ref="addForm"
                            :rules="rules"
                            label-width="150px"
                            class="addOrganClass" >
                        <div class="part">
                            <!--卡片字段-->
                            <el-row>
                            <el-form-item label="报修单位" prop="useUnit">
                                <elSelectTree
                                    ref="addFormUseUnitTreeObj"
                                    :options="organList"
                                    :value="addForm.useUnit"
                                    :accordion="true"
                                    :props="orgTreeProps"
                                    style="width: 100%;"
                                    @getValue="addFormUseUnitClick">
                                </elSelectTree>
                                <el-input style="display:none" v-model="addForm.useUnit"></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="报修人" prop="userId">
                                <el-select v-model="addForm.userId" style="width: 100%;" :disabled="this.formReadOnly">
                                    <el-option
                                        v-for="item in userList"
                                        :key="item.id"
                                        :label="item.label"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="单据日期" prop="billDate">
                                <el-date-picker v-model="addForm.billDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="width: 100%;" :readonly="true"></el-date-picker>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="处理人" prop="operator">
                                <el-input v-model="addForm.createName" style="width: 100%;" :readonly="true"></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="备注" prop="note">
                                <el-input
                                    type="textarea"
                                    v-model="addForm.note"
                                    :autosize="{ minRows: 2, maxRows: 3}"
                                    :readonly="this.formReadOnly"
                                ></el-input>
                            </el-form-item>
                            </el-row>
                        </div>
                    </el-form>
                    <div slot="footer" class="dialog-footer" v-show="!this.formReadOnly">
                        <el-button @click="closeDialog">取 消</el-button>
                        <el-button @click="saveOrUpdate('addForm')"  type="primary" class="btn-custom" >
                            <span>确 定</span>
                        </el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
<script>
    import { 
        queryDeviceBill,
        findDeviceBillById,
        saveOrUpdateDeviceBill,
        deleteDeviceBillById,
        updateStatus,
        listDevice
    } from "@/api/device/deviceBill.js";
    import {
        tree,
        getDataList,
    } from "@/api/device/device.js";
    import elSelectTree from '@/components/elSelectTree/elSelectTree';
    import iLocalStroage from '@/common/js/localStroage';
    export default {
        data() {
            return {
                visible:false,
                formReadOnly:false,
                orgTreeProps: {
                    label: "label",
                    value: "id"
                },
                queryForm: {
                    billType:'WX',
                    billDate:'',
                    billNo:'',
                    useUnit:'',
                    status:''
                },
                addForm:{
                },
                rules: {
                },
                userInfo:{},
                tableData: [], //表格数据
                currentPage: 1, //当前页
                pageSize: 10, //pagesize
                totalPage: 0, //总数
                title:"新增维修",
                userList:[],
                organList:[],
                statusList:[{id:'维修中',label:'维修中'},{id:'已完成',label:'已完成'}],
            };
        },
        components: {
            elSelectTree,
        },
        methods: {
            async getUserDataList(pid){
                let res = await getDataList(pid,'user')
                this.userList=res.data
            },
            async getSelfTree(){
                let res = await tree(this.userInfo.organId,'organ')
                this.organList=res.data
            },
            queryFormUseUnitClick(val) {
                this.$refs.queryFormUseUnitTreeObj.$children[0].handleClose();
                this.queryForm.useUnit  = val
            },
            addFormUseUnitClick(val) {
                if(val!=null){
                    this.$refs.addFormUseUnitTreeObj.$children[0].handleClose();
                    this.addForm.useUnit  = val
                    this.getUserDataList(val)
                    this.$set(this.addForm,'userId','')
                }
            },
            saveOrUpdate(formName){
                let _this = this
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        saveOrUpdateDeviceBill(_this.addForm).then(
                            res => {
                                _this.$message({
                                    type: "success",
                                    message:"保存成功!"
                                });
                                _this.visible = false;
                                _this.queryData(1);
                            },
                            err => {
                                console.log(err);
                            }
                        );
                    }
                });
            },
            reset() {
                this.$refs["deviceBillForm"].resetFields();
                if(this.$refs.queryFormUseUnitTreeObj){
                    this.$refs.queryFormUseUnitTreeObj.clearHandle()
                }
            },
            //表单筛选
            queryData(val) {
                this.queryForm.size=this.pageSize
                this.queryForm.current=this.currentPage
                let _this = this
                queryDeviceBill(this.queryForm).then(res => {
                    _this.totalPage = res.data.total;
                    _this.tableData = res.data.records;
                });
                err => {
                    console.log(err);
                };
            },
            //新增
            addData() {
                if(this.$refs.addFormUseUnitTreeObj){
                    this.$refs.addFormUseUnitTreeObj.clearHandle()
                }
                this.addForm = {
                    createId:this.userInfo.id,
                    createName:this.userInfo.nickName,
                    billType:'WX',
                    status:'维修中',
                    billDate:new Date().format('yyyy-MM-dd')
                }
                this.title="新增维修"
                this.formReadOnly = false
                this.visible = true
                this.userList=[]
            },
            //编辑
            handleEdit(index, row) {
                this.title="修改维修"
                this.findDeviceBillById(row)
                this.formReadOnly = false
            },
            async handleConfirm(row){
                let res = await updateStatus(row.id,'已完成')
                this.$message({type: "success",message: "维修完成!"})
                this.queryData(1)
            },
            //查看详情
            showDataDetail(row){
                this.title="维修"
                this.findDeviceBillById(row)
                this.formReadOnly = true
            },
            findDeviceBillById(row){
                let _this = this
                findDeviceBillById(row.id).then(
                    res => {
                        _this.addForm = res.data
                        _this.visible=true
                        if(_this.addForm.useUnit){
                            _this.getUserDataList(_this.addForm.useUnit)
                        }else{
                            _this.userList=[]
                        }
                    },
                    err => {
                        console.log(err);
                    }
                );
            },
            // 表格id删除
            deleteRecord(row) {
                let _this = this
                this.$confirm("确认删除该维修?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => {
                    deleteDeviceBillById(row.id).then(
                        res => {
                            if(res.data==true){
                                _this.$message({type: "success",message: "删除成功!"});
                                _this.queryData(1)
                            }else{
                                _this.$message({type: "error",message: "删除失败!"});
                            }
                        },
                        err => {
                            console.log(err);
                        }
                    );
                })
                .catch(() => {
                });
            },
            //关闭弹窗的时候清除数据
            closeDialog() {
                this.visible = false;
                this.$refs["addForm"].resetFields();
            },
            init(){
                this.queryData(1)
                this.getSelfTree()
            },
            //更改每页显示的条数
            handleSizeChange(val) {
                this.pageSize = val;
                this.queryData(1);
            },
            //更换页码
            handleCurrentChange(val) {
                this.currentPage = val;
                this.queryData(val);
            },
        },
        mounted() {
            this.userInfo = iLocalStroage.gets("userInfo");
            this.init()
        },
        created() {
        }
    };
</script>
<style lang="scss">
    @import "@/assets/css/systemManage.scss";
</style>
