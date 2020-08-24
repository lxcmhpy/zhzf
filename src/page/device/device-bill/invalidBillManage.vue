<template>
    <div class="com_searchAndpageBoxPadding">
        <div class="searchPage">
            <div class="handlePart">
                <el-form :inline="true" ref="deviceBillForm" :model="queryForm" label-width="70px">
                    <!--查询字段-->
                    <el-form-item label="单据号" prop="billNo">
                        <el-input v-model="queryForm.billNo"></el-input>
                    </el-form-item>
                    <el-form-item label="单据日期" prop="billDate">
                        <el-date-picker v-model="queryForm.billDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="使用单位" prop="useUnit">
                        <elSelectTree
                            ref="queryFormUseUnitTreeObj"
                            :options="organList"
                            :accordion="true"
                            :props="orgTreeProps"
                            :filterable="true"
                            style="width:200px" 
                            @getValue="queryFormUseUnitClick">
                        </elSelectTree>
                        <el-input style="display:none" v-model="queryForm.useUnit"></el-input>
                    </el-form-item>

                    <el-form-item style="margin-top:1px; margin-left: 15px;">
                        <el-button 
                            title="搜索"
                            class="commonBtn searchBtn"
                            size="medium"
                            icon="iconfont law-sousuo" 
                            @click="queryData(1)"/>
                        <el-button 
                            title="重置"
                            class="commonBtn searchBtn"
                            size="medium"
                            icon="iconfont law-zhongzhi"
                            @click="reset"/>
                    </el-form-item>
                </el-form>
            </div>
            <div class="tableHandle" style="margin-bottom: 10px;">
                <el-button type="primary" size="medium" icon="el-icon-plus"  @click="addData">新增</el-button>
            </div> 
            <div class="tablePart">
                <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%;height:100%"
                        @row-click="showDataDetail"
                >
                    <el-table-column label="序号" width="70px" align="center">
                        <template slot-scope="scope">
                            {{scope.$index+1}}
                        </template>
                    </el-table-column>
                    <!--列表字段-->
                    <el-table-column prop="billNo" label="单号" width="160" align="center"></el-table-column>
                    <el-table-column prop="billDate" label="单据日期" width="120px" align="center"></el-table-column>
                    <el-table-column prop="useUnit" label="使用单位" align="center"></el-table-column>
                    <el-table-column prop="createName" label="处理人" width="200px" align="center"></el-table-column>
                    <el-table-column label="操作" width="120" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click.stop @click="showDataDetail(scope.row)">查看</el-button>
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
                        :visible.sync="visible"
                        top="5vh"
                        width="75%"
                        @close="closeDialog"
                        :close-on-click-modal="false">
                <el-form
                        :model="addForm"
                        ref="addForm"
                        :rules="rules"
                        label-width="120px"
                        class="allotment-form" >
                        <!--卡片字段-->
                    <el-row :gutter="20">
                        <el-col :span="12">
                        <el-form-item label="使用单位" prop="useUnit">
                            <elSelectTree
                                ref="addFormUseUnitTreeObj"
                                :options="organList"
                                :value="addForm.useUnit"
                                :accordion="true"
                                :props="orgTreeProps"
                                :filterable="true"
                                style="width: 100%;"
                                @getValue="addFormUseUnitClick">
                            </elSelectTree>
                            <el-input style="display:none" v-model="addForm.useUnit"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span="12">
                        <el-form-item label="单据日期" prop="billDate">
                            <el-date-picker v-model="addForm.billDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="width: 100%;" :readonly="true"></el-date-picker>
                        </el-form-item>
                        </el-col>
                        <el-col :span="12">
                        <el-form-item label="处理人" prop="operator">
                            <el-input v-model="addForm.createName" style="width: 100%;" :readonly="true"></el-input>
                        </el-form-item>
                        </el-col>
                    </el-row>
                        <el-form-item label="备注" prop="note">
                            <el-input
                                type="textarea"
                                v-model="addForm.note"
                                :autosize="{ minRows: 2, maxRows: 3}"
                                :readonly="this.formReadOnly"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="图片">
                            <div class="upload-device-image">
                            <el-upload
                                action="#"
                                accept=".jpg, .png"
                                class="device-uploader"
                                :http-request="saveImageFile"
                                :file-list="imageList"
                                :on-remove="deleteFile"
                                :disabled="this.formReadOnly"
                                :show-file-list="false"
                            >
                                <img v-if="addForm.storageId" :src="host+addForm.storageId" class="device-img" />
                                <i v-else class="el-icon-picture-outline avatar-uploader-icon"></i>
                            </el-upload>
                            </div>
                        </el-form-item>
                </el-form>
                <div class="tableHandle" style="margin-bottom: 10px;" v-if="!this.formReadOnly">
                    <el-button type="primary" size="medium" icon="el-icon-plus"  @click="addDevice('addForm')">新增装备</el-button>
                    <el-button type="info" size="medium" icon="el-icon-delete-solid"  @click="deleteDevice">删除装备</el-button>
                </div> 
                <div class="tablePart">
                    <el-table
                        :data="itemList"
                        ref="deviceTable"
                        stripe
                        resizable
                        border

                    >
                        <el-table-column type="selection" width="40" align="center"></el-table-column>
                        <el-table-column label="序号" width="70px">
                            <template slot-scope="scope">
                                {{scope.$index+1}}
                            </template>
                        </el-table-column>
                        <!--列表字段-->
                        <el-table-column prop="code" label="装备编码" width="120px"></el-table-column>
                        <el-table-column prop="name" label="装备名称"></el-table-column>
                        <el-table-column prop="deviceType" label="装备类型"></el-table-column>
                        <el-table-column prop="brand" label="品牌型号" width="120px"></el-table-column>
                        <el-table-column prop="useUnit" label="使用单位"></el-table-column>
                        <el-table-column prop="storageLocation" label="存放位置" width="120px"></el-table-column>
                    </el-table>
                </div>
                <div slot="footer" class="dialog-footer" v-show="!this.formReadOnly">
                    <el-button @click="closeDialog">取 消</el-button>
                    <el-button @click="saveOrUpdate('addForm')"  type="primary" class="btn-custom" >
                        <span>确 定</span>
                    </el-button>
                </div>
            </el-dialog>
            <!-- 选择装备 -->
            <SelectEquipment ref="selectEquipmentRef" @addItemList="addItemList" />
        </div>
    </div>
</template>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
<script>
    import { 
        queryDeviceBill,
        findDeviceBillById,
        saveOrUpdateDeviceBill,
        deleteDeviceBillById
    } from "@/api/device/deviceBill.js";
    import {
        tree,
        getDataList,
        upload,
        deleteFileById
    } from "@/api/device/device.js";
    import elSelectTree from '@/components/elSelectTree/elSelectTree';
    import iLocalStroage from '@/common/js/localStroage';
    import SelectEquipment from '@/page/device/components/selectEquipment';
    export default {
        data() {
            return {
                visible:false,
                deviceVisable:false,
                formReadOnly:false,
                orgTreeProps: {
                    label: "label",
                    value: "id"
                },
                queryForm: {
                    billType:'BF',
                    billDate:'',
                    billNo:'',
                    useUnit:''
                },
                addForm:{
                },
                rules: {
                    useUnit: [
                        {required: true, message: "请输入使用单位", trigger: "blur"}
                    ],
                },
                userInfo:{},
                tableData: [], //表格数据
                currentPage: 1, //当前页
                pageSize: 10, //pagesize
                totalPage: 0, //总数
                title:"新增报废",
                organList:[],
                deviceList:[],
                itemList:[],
                host: '',
                imageList:[]
            };
        },
        components: {
            elSelectTree,
            SelectEquipment
        },
        methods: {
            saveImageFile (param) {
                var fd = new FormData()
                fd.append("file", param.file);
                fd.append("category", '装备报废图片');
                fd.append("fileName", param.file.name);
                if(this.addForm.storageId){
                    fd.append("storageId", this.addForm.storageId);
                    fd.append('caseId', this.addForm.id)//传记录id
                }else{
                    fd.append('caseId', param.file.name+new Date().getTime())//传记录id
                }
                let _this = this
                upload(fd).then(
                    res => {
                        _this.addForm.storageId = res.data[0].storageId
                        _this.imageList.push({
                            url:_this.host+'/'+res.data[0].storageId,
                            storageId:res.data[0].storageId,
                            name:res.data[0].fileName
                        });
                    },
                    error => {
                        console.log(error)
                    }
                );
            },
            //删除附件
            deleteFile(file, fileList){
                let _this = this
                deleteFileById(file.storageId).then(res=>{
                    _this.imageList.splice(_this.imageList.findIndex(item => item.storageId === file.storageId), 1)
                },err=>{
                    console.log(err)
                })
            },
            addDevice(formName){
                let _this = this
                this.$refs.addForm.validateField('useUnit',valid => {
                    if (valid=="") {
                        _this.$refs.selectEquipmentRef.showModal(this.queryForm.billType,this.addForm.useUnit);
                    }
                 });
            },
            addItemList(rows){
                rows.forEach(p=>this.itemList.push(p))
            },
            deleteDevice(){
                if(this.$refs.deviceTable.selection.length>0){
                    this.$refs.deviceTable.selection.forEach(p => {
                        this.itemList.splice(p,1)
                    });
                }else{
                    this.$message({
                        type: "error",
                        message:"请选择需要删除的装备"
                    });
                    return;
                }
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
                this.$refs.addFormUseUnitTreeObj.$children[0].handleClose();
                this.$set(this.addForm,'useUnit',val)
            },
            saveOrUpdate(formName){
                let _this = this
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        if(_this.itemList.length==0){
                            _this.$message({
                                type: "error",
                                message:"请选择装备!"
                            });
                            return;
                        }
                        _this.addForm.itemList = _this.itemList
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
                    billType:'BF',
                    billDate:new Date().format('yyyy-MM-dd'),
                    useUnit:this.userInfo.organId
                }
		this.itemList=[]
                this.imageList=[]
                this.title="新增报废"
                this.formReadOnly = false
                this.visible = true
            },
            //编辑
            handleEdit(index, row) {
                this.title="修改报废"
                this.findDeviceBillById(row)
                this.formReadOnly = false
            },
            //查看详情
            showDataDetail(row){
                this.title="报废"
                this.findDeviceBillById(row)
                this.formReadOnly = true
            },
            findDeviceBillById(row){
                let _this = this
                findDeviceBillById(row.id).then(
                    res => {
                        _this.addForm = res.data
                        _this.itemList = res.data.itemList
                        _this.addForm.itemList = []
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
                this.$confirm("确认删除该报废?", "提示", {
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
            this.host = iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST;
        },
        created() {
        }
    };
</script>
<style lang="scss">
    @import "@/assets/css/systemManage.scss";
</style>
<style lang="scss" scoped>
.allotment-form {
  >>> .el-select,
  >>> .el-date-editor {
    display: block;
  }
  >>> .el-date-editor.el-input,
  >>> .el-date-editor.el-input__inner {
    width: 100%;
  }
  .upload-device-image {
    width: 176px;
    height: 96px;
    margin-top: 12px;
    border: 1px dashed #a3a3a3;
    .device-uploader {
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 96px;
      font-size: 28px;
      >>> .el-upload {
        width: 100%;
        .device-img {
          display: block;
          width: 176px;
          height: 96px;
        }
      }
    }
  }
}
</style>
