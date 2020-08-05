<template>
    <div class="com_searchAndpageBoxPadding">
        <div class="searchPageLayout" id="userBox">
            <div class="searchPage toggleBox">
                <div class="handlePart">
                    <el-form :inline="true" ref="deviceInventoryForm" :model="queryForm" label-width="120px">
                        <!--查询字段-->
                        <el-form-item label="装备名称" prop="name">
                            <el-input v-model="queryForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="状态" prop="status">
                            <el-select v-model="queryForm.status">
                                <el-option
                                    v-for="item in statusList"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="装备类型" prop="deviceType">
                            <elSelectTree
                                ref="queryFormDeviceTypeTreeObj"
                                :options="deviceTypeList"
                                :accordion="true"
                                :props="orgTreeProps"
                                @getValue="queryFormDeviceTypeClick">
                            </elSelectTree>
                            <el-input style="display:none" v-model="queryForm.deviceType"></el-input>
                        </el-form-item>
                        <el-form-item label="使用单位" prop="useUnit">
                            <elSelectTree
                                ref="queryFormUseUnitTreeObj"
                                :options="organList"
                                :accordion="true"
                                :props="orgTreeProps"
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
                            <el-button type="primary" size="medium" icon="el-icon-plus"  @click="copyData">复制</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="tablePart">
                    <el-table
                            :data="tableData"
                            ref="dataTable"
                            stripe
                            resizable
                            border
                            style="width: 100%;height:100%"
                    >
                        <el-table-column
                            type="selection"
                            width="55px">
                        </el-table-column>
                        <el-table-column label="序号" width="70px">
                            <template slot-scope="scope">
                                {{scope.$index+1}}
                            </template>
                        </el-table-column>
                        <!--列表字段-->
                        <el-table-column prop="status" label="状态" width="70px" :formatter="formatStatus"></el-table-column>
                        <el-table-column prop="code" label="装备编码" width="120px"></el-table-column>
                        <el-table-column prop="name" label="装备名称"></el-table-column>
                        <el-table-column prop="deviceType" label="装备类型"></el-table-column>
                        <el-table-column prop="brand" label="品牌类型" width="120px"></el-table-column>
                        <el-table-column prop="useUnit" label="使用单位"></el-table-column>
                        <el-table-column prop="userId" label="使用人" width="120px"></el-table-column>
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
                            <el-form-item label="装备编码" prop="code">
                                <el-input v-model="addForm.code" style="width: 100%;" :readonly="true"></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="装备类型" prop="deviceType">
                                <elSelectTree
                                    style="width: 100%;"
                                    ref="addFormDeviceTypeTreeObj"
                                    :options="deviceTypeList"
                                    :accordion="true"
                                    :props="orgTreeProps"
                                    :value="addForm.deviceType"
                                    @getValue="addFormDeviceTypeClick">
                                </elSelectTree>
                                <el-input v-model="addForm.deviceType" style="display:none"></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="装备名称" prop="name">
                                <el-input v-model="addForm.name" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="品牌类型" prop="brand">
                                <el-input v-model="addForm.brand" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="计量单位" prop="measuringUnit">
                                <el-input v-model="addForm.measuringUnit" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="SN号" prop="sn">
                                <el-input v-model="addForm.sn" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="来源" prop="source">
                                <el-select v-model="addForm.source" style="width: 100%;" :disabled="this.formReadOnly">
                                    <el-option
                                        v-for="item in sourceList"
                                        :key="item.id"
                                        :label="item.label"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="购置单位" prop="purchaseUnit">
                                <elSelectTree
                                    ref="addFormPurchaseUnitTreeObj"
                                    :options="allOrganList"
                                    :accordion="true"
                                    :props="orgTreeProps"
                                    style="width: 100%;"
                                    :value="addForm.purchaseUnit"
                                    @getValue="addFormPurchaseUnitClick">
                                </elSelectTree>
                                <el-input style="display:none" v-model="addForm.purchaseUnit"></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="购置日期" prop="purchaseDate">
                                <el-date-picker v-model="addForm.purchaseDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="width: 100%;" :readonly="this.formReadOnly"></el-date-picker>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="购置价格" prop="purchasePrice">
                                <el-input v-model="addForm.purchasePrice" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="存放位置" prop="storageLocation">
                                <el-input v-model="addForm.storageLocation" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="使用期限(月)" prop="serviceLife">
                                <el-input v-model="addForm.serviceLife" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="使用单位" prop="useUnit">
                                <elSelectTree
                                    ref="addFormUseUnitTreeObj"
                                    :options="organList"
                                    :accordion="true"
                                    :props="orgTreeProps"
                                    style="width: 100%;"
                                    :disabled="this.formReadOnly"
                                    :value="addForm.useUnit"
                                    @getValue="addFormUseUnitClick">
                                </elSelectTree>
                                <el-input style="display:none" v-model="addForm.useUnit"></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="使用人" prop="userId">
                                <el-select v-model="addForm.userId" 
                                    style="width: 100%;" 
                                    :disabled="this.formReadOnly">
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
                            <el-form-item label="备注" prop="note">
                                <el-input
                                    type="textarea"
                                    v-model="addForm.note"
                                    :autosize="{ minRows: 2, maxRows: 3}"
                                    :readonly="this.formReadOnly"
                                ></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="供应商" prop="supplier">
                                <el-input v-model="addForm.supplier" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                            </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item label="维保到期日期" prop="expireDate">
                                <el-date-picker v-model="addForm.expireDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="width: 100%;" :readonly="this.formReadOnly"></el-date-picker>
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
                            <el-row>
                            <el-form-item label="维保说明" prop="description">
                                <el-input
                                    type="textarea"
                                    v-model="addForm.description"
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
    import { queryDeviceInventory,findDeviceInventoryById,saveOrUpdateDeviceInventory,deleteDeviceInventoryById,copyData} from "@/api/device/deviceInventory.js";
    import {
        tree,
        getDataList,
        getDrawerList,
    } from "@/api/device/device.js";
    import { queryDeviceTypeTree} from "@/api/device/deviceType.js";
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
                title:"新增库存管理",
                userList:[],
                statusList:[],
                sourceList:[],
                allOrganList:[],
                organList:[],
                deviceTypeList:[]
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
            async getDrawerDataList(){
                let data = []
                data.push({pid:'执法装备-装备状态',fieldName:'statusList'})
                data.push({pid:'执法装备-装备来源',fieldName:'sourceList'})
                let res = await getDrawerList(data)
                this.statusList=res.data.statusList
                this.sourceList=res.data.sourceList
            },
            async getDeviceTypeTree(){
                let res = await queryDeviceTypeTree()
                this.deviceTypeList=res.data
                res.data.forEach(p=>p.disabled=true)
            },
            async getAllTree(){
                let res = await tree('1','organ')
                this.allOrganList=res.data
            },
            async getSelfTree(){
                let res = await tree(this.userInfo.organId,'organ')
                this.organList=res.data
            },
            addFormPurchaseUnitClick(val) {
                this.$refs.addFormPurchaseUnitTreeObj.$children[0].handleClose();
                this.addForm.purchaseUnit  = val
            },
            queryFormUseUnitClick(val) {
                this.$refs.queryFormUseUnitTreeObj.$children[0].handleClose();
                this.queryForm.useUnit  = val
            },
            queryFormDeviceTypeClick(val) {
                if(null != val && val.length==2){
                    this.$refs.queryFormDeviceTypeTreeObj.valueId=''
                    this.$refs.queryFormDeviceTypeTreeObj.valueTitle=''
                    this.$message({type:'error',message:'请选择末级设备类型'})
                }else{
                    this.$refs.queryFormDeviceTypeTreeObj.$children[0].handleClose();
                    this.queryForm.deviceType  = val
                }
            },
            addFormDeviceTypeClick(val) {
                if(val!=null){
                    if(val.length==2){
                        this.$refs.addFormDeviceTypeTreeObj.valueId=''
                        this.$refs.addFormDeviceTypeTreeObj.valueTitle=''
                        this.$message({type:'error',message:'请选择末级设备类型'})
                    }else{
                        this.$refs.addFormDeviceTypeTreeObj.$children[0].handleClose();
                        this.addForm.deviceType  = val
                    }
                }
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
                        saveOrUpdateDeviceInventory(_this.addForm).then(
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
                this.$refs["deviceInventoryForm"].resetFields();
                if(this.$refs.queryFormDeviceTypeTreeObj){
                    this.$refs.queryFormDeviceTypeTreeObj.clearHandle()
                }
                if(this.$refs.queryFormUseUnitTreeObj){
                    this.$refs.queryFormUseUnitTreeObj.clearHandle()
                }
            },
            //表单筛选
            queryData(val) {
                this.queryForm.size=this.pageSize
                this.queryForm.current=this.currentPage
                let _this = this
                queryDeviceInventory(this.queryForm).then(res => {
                    _this.totalPage = res.data.total;
                    _this.tableData = res.data.records;
                });
                err => {
                    console.log(err);
                };
            },
            //新增
            addData() {
                if(this.$refs.addFormDeviceTypeTreeObj){
                    this.$refs.addFormDeviceTypeTreeObj.clearHandle()
                }
                if(this.$refs.addFormPurchaseUnitTreeObj){
                    this.$refs.addFormPurchaseUnitTreeObj.clearHandle()
                }
                if(this.$refs.addFormUseUnitTreeObj){
                    this.$refs.addFormUseUnitTreeObj.clearHandle()
                }
                this.addForm = {useUnit:this.userInfo.organId};
                this.title="新增库存管理"
                this.formReadOnly = false
                this.visible = true
                this.userList=[]
            },
            copyClick(){
                this.copyData()
            },
            copyData(){
                let data = {}
                let idList = []
                if(this.$refs.dataTable.selection.length>0){
                    this.$refs.dataTable.selection.forEach(p=>idList.push(p.id))
                }else{
                    this.$message({
                        type: "error",
                        message:"请选择需要复制的记录"
                    });
                    return;
                }
                data.idList= idList
                data.count= 10
                let _this = this
                copyData(data).then(
                    res => {
                        _this.$message({
                            type: "success",
                            message:"复制成功!"
                        });
                        _this.queryData(1);
                    },
                    err => {
                        console.log(err);
                    }
                );
            },
            //编辑
            handleEdit(index, row) {
                this.title="修改库存管理"
                this.findDeviceInventoryById(row)
                this.formReadOnly = false
            },
            //查看详情
            showDataDetail(row){
                this.title="库存管理"
                this.findDeviceInventoryById(row)
                this.formReadOnly = true
            },
            findDeviceInventoryById(row){
                let _this = this
                findDeviceInventoryById(row.id).then(
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
                this.$confirm("确认删除该库存管理?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => {
                    deleteDeviceInventoryById(row.id).then(
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
                this.getAllTree()
                this.getSelfTree()
                this.getDeviceTypeTree()
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
            formatStatus(row) {
                let data = this.statusList.filter(p=>p.id==row.status)
                if(data && data.length>0){
                    return data[0].label
                }
                return ''
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
