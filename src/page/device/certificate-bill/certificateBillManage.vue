<template>
    <div class="com_searchAndpageBoxPadding">
        <div class="searchPageLayout" id="userBox">
            <div class="searchPage toggleBox">
                <div class="handlePart">
                    <el-form :inline="true" ref="deviceCertificateBillForm" :model="queryForm" label-width="120px">
                        <!--查询字段-->
                        <el-form-item label="单据类型" prop="billType">
                            <el-select v-model="queryForm.billType">
                                <el-option
                                    v-for="item in billTypeList"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="单据号" prop="billNo">
                            <el-input v-model="queryForm.billNo"></el-input>
                        </el-form-item>
                        <el-form-item label="车牌号" prop="vehicleNumber">
                            <el-input v-model="queryForm.vehicleNumber"></el-input>
                        </el-form-item>
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
                        <el-form-item label="申请日期" prop="billDate">
                            <el-date-picker v-model="queryForm.billDate" type="date" style="width:140px" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
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
                        <el-table-column prop="billType" label="单据类型" :formatter="formatBillType"></el-table-column>
                        <el-table-column prop="billNo" label="单据号"></el-table-column>
                        <el-table-column prop="vehicleNumber" label="车牌号"></el-table-column>
                        <el-table-column prop="useUnit" label="使用单位"></el-table-column>
                        <el-table-column prop="usePermitNumber" label="使用证号"></el-table-column>
                        <el-table-column prop="billDate" label="申请日期"></el-table-column>
                            <el-table-column prop="status" label="单据状态" :formatter="formatStatus"></el-table-column>
                        <el-table-column label="操作" width="160">
                            <template slot-scope="scope">
                                <div style="width:160px">
                                    <el-button type="text" @click.stop @click="showDataDetail(scope.row)">查看</el-button>
                                    <el-button type="text" @click.stop @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                                    <el-button type="text" @click.stop @click="deleteRecord(scope.row)">删除</el-button>
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
                            <el-form-item label="车牌号" prop="vehicleNumber">
                                <el-input v-model="addForm.vehicleNumber" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="使用单位" prop="useUnit">
                                <el-input v-model="addForm.useUnit" style="width: 100%;" :readonly="true"></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="车辆类别" prop="vehicleCategory">
                                <el-input v-model="addForm.vehicleCategory" style="width: 100%;" :readonly="true"></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="车辆类型" prop="vehicleType">
                                <el-input v-model="addForm.vehicleType" style="width: 100%;" :readonly="true"></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="厂牌型号" prop="brandModel">
                                <el-input v-model="addForm.brandModel" style="width: 100%;" :readonly="true"></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="发动机号" prop="engineNumber">
                                <el-input v-model="addForm.engineNumber" style="width: 100%;" :readonly="true"></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="车架号" prop="axleNumber">
                                <el-input v-model="addForm.axleNumber" style="width: 100%;" :readonly="true"></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="使用证号" prop="usePermitNumber">
                                <el-input v-model="addForm.usePermitNumber" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="开始日期" prop="beginDate">
                                <el-date-picker v-model="addForm.beginDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="width: 100%;" :readonly="true"></el-date-picker>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="结束日期" prop="endDate">
                                <el-date-picker v-model="addForm.endDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="width: 100%;" :readonly="true"></el-date-picker>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="发证机关" prop="issueOrgan">
                                <el-input v-model="addForm.issueOrgan" style="width: 100%;" :readonly="true"></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="发证时间" prop="lssueTime">
                                <el-date-picker v-model="addForm.lssueTime" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="width: 100%;" :readonly="true"></el-date-picker>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="签发人" prop="signer">
                                <el-input v-model="addForm.signer" style="width: 100%;" :readonly="true"></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="签发时间" prop="signDate">
                                <el-date-picker v-model="addForm.signDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="width: 100%;" :readonly="true"></el-date-picker>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="经办人" prop="manager">
                                <el-input v-model="addForm.manager" style="width: 100%;" :readonly="true"></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="经办时间" prop="handlingDate">
                                <el-date-picker v-model="addForm.handlingDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="width: 100%;" :readonly="true"></el-date-picker>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="申请理由" prop="note">
                                <el-input
                                        type="textarea"
                                        v-model="addForm.note"
                                        :autosize="{ minRows: 2, maxRows: 3}"
                                        :readonly="this.formReadOnly"
                                ></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="申请日期" prop="billDate">
                                <el-date-picker v-model="addForm.billDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="width: 100%;" :readonly="true"></el-date-picker>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="申报单位" prop="declarationUnit">
                                <elSelectTree
                                    ref="addFormDeclarationUnitTreeObj"
                                    :options="organList"
                                    :value="addForm.declarationUnit"
                                    :accordion="true"
                                    :props="orgTreeProps"
                                    style="width: 100%;"
                                    @getValue="addFormDeclarationUnitClick">
                                </elSelectTree>
                                <el-input style="display:none" v-model="addForm.declarationUnit"></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="联系人" prop="contactPerson">
                                <el-input v-model="addForm.contactPerson" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="联系电话" prop="contactNumber">
                                <el-input v-model="addForm.contactNumber" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
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
    import { queryDeviceCertificateBill,findDeviceCertificateBillById,saveOrUpdateDeviceCertificateBill,deleteDeviceCertificateBillById} from "@/api/device/deviceCertificateBill.js";
    import {
        tree,
        getDrawerList,
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
                    billType:'',
                    billNo:'',
                    vehicleNumber:'',
                    status:'',
                    billDate:'',
                },
                addForm:{
                },
                rules: {
                    vehicleNumber:[
                        {required: true, message: "请输入车牌号", trigger: "blur"}
                    ],
                    usePermitNumber:[
                        {required: true, message: "请输入使用证号", trigger: "blur"}
                    ],
                    declarationUnit:[
                        {required: true, message: "请输入申报单位", trigger: "blur"}
                    ],
                },
                userInfo:{},
                tableData: [], //表格数据
                currentPage: 1, //当前页
                pageSize: 10, //pagesize
                totalPage: 0, //总数
                title:'',
                statusList:[],
                organList:[],
                billTypeList:[
                    {id:'FZ',label:'发证申请'},
                    {id:'NS',label:'年审申请'},
                    {id:'GS',label:'挂失申请'},
                    {id:'ZX',label:'注销申请'},
                ]
            };
        },
        components: {
            elSelectTree,
        },
        methods: {
            async getDrawerDataList(){
                let data = []
                data.push({pid:'证件管理单-申请状态',fieldName:'statusList'})
                let res = await getDrawerList(data)
                this.statusList=res.data.statusList
            },
            async getSelfTree(){
                let res = await tree(this.userInfo.organId,'organ')
                this.organList=res.data
            },
            addFormDeclarationUnitClick(val) {
                this.$refs.addFormDeclarationUnitTreeObj.$children[0].handleClose();
                this.addForm.declarationUnit  = val
            },
            formatStatus(row){
                let data = this.statusList.filter(p=>p.id==row.status)
                if(data && data.length>0){
                    return data[0].label
                }
                return ''
            },
            formatBillType(row){
                let data = this.billTypeList.filter(p=>p.id==row.billType)
                if(data && data.length>0){
                    return data[0].label
                }
                return ''
            },
            saveOrUpdate(formName){
                let _this = this
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        saveOrUpdateDeviceCertificateBill(_this.addForm).then(
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
                this.$refs["deviceCertificateBillForm"].resetFields();
            },
            //表单筛选
            queryData(val) {
                this.queryForm.size=this.pageSize
                this.queryForm.current=this.currentPage
                let _this = this
                queryDeviceCertificateBill(this.queryForm).then(res => {
                    _this.totalPage = res.data.total;
                    _this.tableData = res.data.records;
                });
                err => {
                    console.log(err);
                };
            },
            //新增
            addData() {
                if(this.$refs.addFormDeclarationUnitTreeObj){
                    this.$refs.addFormDeclarationUnitTreeObj.clearHandle()
                }
                let billType = 'FZ'
                this.addForm = {
                    billDate:new Date().format('yyyy-MM-dd'),
                    billType:billType
                };
                this.title="新增"+this.formatBillType({billType:billType})
                this.formReadOnly = false
                this.visible = true
            },
            //编辑
            handleEdit(index, row) {
                this.title="修改"+this.formatBillType(row)
                this.findDeviceCertificateBillById(row)
                this.formReadOnly = false
            },
            //查看详情
            showDataDetail(row){
                this.title=this.formatBillType(row)
                this.findDeviceCertificateBillById(row)
                this.formReadOnly = true
            },
            findDeviceCertificateBillById(row){
                let _this = this
                findDeviceCertificateBillById(row.id).then(
                    res => {
                        _this.addForm = res.data
                        _this.visible=true
                    },
                    err => {
                        console.log(err);
                    }
                );
            },
            // 表格id删除
            deleteRecord(row) {
                let _this = this
                this.$confirm("确认删除该"+this.formatBillType(row)+"?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => {
                    deleteDeviceCertificateBillById(row.id).then(
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
                this.getDrawerDataList()
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
