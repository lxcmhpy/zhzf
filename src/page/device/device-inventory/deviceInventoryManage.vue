<template>
    <div class="com_searchAndpageBoxPadding">
        <div class="searchPage">
            <div class="handlePart">
                <el-form :inline="true" ref="deviceInventoryForm" :model="queryForm" label-width="70px">
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
                <el-button plain size="medium" icon="el-icon-plus"  @click="copyClick">复制</el-button>
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
                    <el-table-column prop="status" label="状态" width="70px"></el-table-column>
                    <el-table-column prop="code" label="装备编码" width="120px"></el-table-column>
                    <el-table-column prop="name" label="装备名称"></el-table-column>
                    <el-table-column prop="deviceType" label="装备类型"></el-table-column>
                    <el-table-column prop="brand" label="品牌型号" width="120px"></el-table-column>
                    <el-table-column prop="useUnit" label="使用单位"></el-table-column>
                    <el-table-column prop="userId" label="使用人" width="120px"></el-table-column>
                    <el-table-column label="操作" width="160">
                        <template slot-scope="scope">
                            <div style="width:160px">
                                <el-button type="text" @click.stop @click="showDataDetail(scope.row)">查看</el-button>
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
            <el-dialog
                class="fullscreen"
                :title="title"
                top="5vh"
                :visible.sync="visible"
                @close="closeDialog"
                :close-on-click-modal="false"
                width="48%"
                append-to-body>           
                <el-form
                        :model="addForm"
                        ref="addForm"
                        :rules="rules"
                        label-position="right"
                        label-width="120px"
                        class="add-device-from">
                    <h3 class="form-tab-title">基本信息</h3>
                        <!--卡片字段-->
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="装备编码" prop="code">
                                    <el-input v-model="addForm.code" style="width: 100%;" :readonly="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
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
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="装备名称" prop="name">
                                    <el-input v-model="addForm.name" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">    
                                <el-form-item label="品牌类型" prop="brand">
                                    <el-input v-model="addForm.brand" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="计量单位" prop="measuringUnit">
                                    <el-input v-model="addForm.measuringUnit" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="SN号" prop="sn">
                                    <el-input v-model="addForm.sn" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
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
                            </el-col>
                            <el-col :span="12">
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
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="购置日期" prop="purchaseDate">
                                    <el-date-picker v-model="addForm.purchaseDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="width: 100%;" :readonly="this.formReadOnly"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="购置价格" prop="purchasePrice">
                                    <el-input v-model="addForm.purchasePrice" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="存放位置" prop="storageLocation">
                                    <el-input v-model="addForm.storageLocation" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="使用期限(月)" prop="serviceLife">
                                    <el-input v-model="addForm.serviceLife" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
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
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="使用人" prop="userId">
                                    <el-select v-model="addForm.userId" 
                                        style="width: 100%;" 
                                        clearable
                                        :disabled="this.formReadOnly">
                                        <el-option
                                            v-for="item in userList"
                                            :key="item.id"
                                            :label="item.label"
                                            :value="item.id"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="图片">
                            <div class="upload-device-image">
                            <el-upload
                                action="#"
                                accept=".jpg, .png"
                                class="device-uploader"
                                :http-request="saveImageFile"
                                :file-list="imageList"
                                :on-remove="deleteFile"
                                :show-file-list="false"
                            >
                                <img v-if="addForm.storageId" :src="host+addForm.storageId" class="device-img" />
                                <i v-else class="el-icon-picture-outline avatar-uploader-icon"></i>
                            </el-upload>
                            </div>
                        </el-form-item>  
                        <el-form-item label="备注" prop="note">
                            <el-input
                                type="textarea"
                                v-model="addForm.note"
                                :autosize="{ minRows: 1, maxRows: 3}"
                                :readonly="this.formReadOnly"
                            ></el-input>
                        </el-form-item>
                        <h3 class="form-tab-title" style="margin-top: 20px;">维保信息</h3>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="供应商" prop="supplier">
                                    <el-input v-model="addForm.supplier" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="维保到期日期" prop="expireDate">
                                    <el-date-picker v-model="addForm.expireDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="width: 100%;" :readonly="this.formReadOnly"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="联系人" prop="contactPerson">
                                    <el-input v-model="addForm.contactPerson" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="联系电话" prop="contactNumber">
                                    <el-input v-model="addForm.contactNumber" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="维保说明" prop="description">
                            <el-input
                                type="textarea"
                                v-model="addForm.description"
                                :autosize="{ minRows: 1, maxRows: 3}"
                                :readonly="this.formReadOnly"
                            ></el-input>
                        </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" v-show="!this.formReadOnly">
                    <el-button @click="closeDialog">取 消</el-button>
                    <el-button @click="saveOrUpdate('addForm')"  type="primary" class="btn-custom" >
                        <span>确 定</span>
                    </el-button>
                </div>
            </el-dialog>
            <el-dialog
                title="复制"
                :visible.sync="copyVisible"
                @close="copyVisible = false"
                :close-on-click-modal="false"
                width="35%">
                <el-form
                    :model="copyForm"
                    :rules="copyRules"
                    label-position="right"
                    label-width="90px"
                    ref="copyForm"
                >
                    <el-form-item label="复制数量" prop="copyNum">
                        <el-input v-model="copyForm.copyNum" maxlength="2" placeholder="请输入复制数量（最大99个）"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="copyVisible = false">取 消</el-button>
                    <el-button type="primary" @click="copySubmit">保 存</el-button>
                </div>
            </el-dialog>
            <el-dialog
                title="设备详情"
                :visible.sync="detailVisible"
                top="5vh"
                @close="detailVisible=false"
                :close-on-click-modal="false"
                width="48%">
                <div class="device-detail-dialog">
                <el-tabs class="device-top-tab" v-model="activeName">
                    <el-tab-pane label="基本信息" name="base">
                    <div class="device-info-wrap">
                        <el-row :gutter="20">
                        <el-col :span="12">
                            <label class="item-label">装备编号</label>
                            <div class="item-text">{{addForm.code}}</div>
                        </el-col>
                        <el-col :span="12">
                            <label class="item-label">装备类型</label>
                            <div class="item-text">{{addForm.deviceType}}</div>
                        </el-col>
                        <el-col :span="12">
                            <label class="item-label">装备名称</label>
                            <div class="item-text">{{addForm.name}}</div>
                        </el-col>
                        <el-col :span="12">
                            <label class="item-label">品牌类型</label>
                            <div class="item-text">{{addForm.brand}}</div>
                        </el-col>
                        <el-col :span="12">
                            <label class="item-label">计量单位</label>
                            <div class="item-text">{{addForm.measuringUnit}}</div>
                        </el-col>
                        <el-col :span="12">
                            <label class="item-label">SN号</label>
                            <div class="item-text">{{addForm.sn}}</div>
                        </el-col>
                        <el-col :span="12">
                            <label class="item-label">来源</label>
                            <div class="item-text">{{addForm.source}}</div>
                        </el-col>
                        <el-col :span="12">
                            <label class="item-label">购置单位</label>
                            <div class="item-text">{{addForm.purchaseUnit}}</div>
                        </el-col>
                        <el-col :span="12">
                            <label class="item-label">购置日期</label>
                            <div class="item-text">{{addForm.purchaseDate}}</div>
                        </el-col>
                        <el-col :span="12">
                            <label class="item-label">购置价格(元)</label>
                            <div class="item-text">{{addForm.purchasePrice}}</div>
                        </el-col>
                        <el-col :span="12">
                            <label class="item-label">存放位置</label>
                            <div class="item-text">{{addForm.storageLocation}}</div>
                        </el-col>
                        <el-col :span="12">
                            <label class="item-label">使用期限(月)</label>
                            <div class="item-text">{{addForm.serviceLife}}</div>
                        </el-col>
                        <el-col :span="12">
                            <label class="item-label">使用单位</label>
                            <div class="item-text">{{addForm.useUnit}}</div>
                        </el-col>
                        <el-col :span="12">
                            <label class="item-label">使用人</label>
                            <div class="item-text">{{addForm.userId}}</div>
                        </el-col>
                        <el-col :span="24">
                            <label class="item-label">图片</label>
                            <el-image v-if="addForm.storageId" class="item-img" :src="host+addForm.storageId" />
                            <i v-else class="el-icon-picture-outline avatar-uploader-icon"></i>
                        </el-col>
                        <el-col :span="24">
                            <label class="item-label">备注</label>
                            <div class="item-text">{{addForm.note}}</div>
                        </el-col>
                        </el-row>
                    </div>
                    </el-tab-pane>
                    <el-tab-pane label="维保信息" name="maintenance">
                    <div class="device-info-wrap">
                        <el-row :gutter="20">
                        <el-col :span="12">
                            <label class="item-label">供应商</label>
                            <div class="item-text">{{addForm.supplier}}</div>
                        </el-col>
                        <el-col :span="12">
                            <label class="item-label">维保到期</label>
                            <div class="item-text">{{addForm.expireDate}}</div>
                        </el-col>
                        <el-col :span="12">
                            <label class="item-label">联系人</label>
                            <div class="item-text">{{addForm.contactPerson}}</div>
                        </el-col>
                        <el-col :span="12">
                            <label class="item-label">联系电话</label>
                            <div class="item-text">{{addForm.contactNumber}}</div>
                        </el-col>
                        <el-col :span="24">
                            <label class="item-label">维保说明</label>
                            <div class="item-text">{{addForm.description}}</div>
                        </el-col>
                        </el-row>
                    </div>
                    </el-tab-pane>
                    <el-tab-pane label="操作记录" name="handleRecord">
                    <el-timeline :reverse="reverse" class="record-line">
                        <el-timeline-item
                            v-for="(record, index) in logList"
                            :key="index"
                            :hide-timestamp="true"
                            color="#4573d0"
                        >
                        <span slot="dot" class="index-dot">{{ index + 1 }}</span>
                        <div class="device-info-wrap" style="padding-top:0;">
                            <el-row :gutter="20">
                            <el-col :span="12">
                                <label class="item-label">处理日期:</label>
                                <div class="item-text">{{ record.operationDate }}</div>
                            </el-col>
                            <el-col :span="12">
                                <label class="item-label">处理单号:</label>
                                <div class="item-text">{{ record.billNo }}</div>
                            </el-col>
                            <el-col :span="12">
                                <label class="item-label">处理方式:</label>
                                <div class="item-text">{{ record.operationType }}</div>
                            </el-col>
                            <el-col :span="12">
                                <label class="item-label">处理人:</label>
                                <div class="item-text">{{ record.operator }}</div>
                            </el-col>
                            </el-row>
                        </div>
                        </el-timeline-item>
                    </el-timeline>
                    </el-tab-pane>
                </el-tabs>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="handleEdit">修 改</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
<script>
    import { 
        queryDeviceInventory,
        findDeviceInventoryById,
        findByIdAndLog,
        saveOrUpdateDeviceInventory,
        deleteDeviceInventoryById,
        copyData
    } from "@/api/device/deviceInventory.js";
    import {
        tree,
        getDataList,
        getDrawerList,
        upload,
        deleteFileById
    } from "@/api/device/device.js";
    import { queryDeviceTypeTree} from "@/api/device/deviceType.js";
    import elSelectTree from '@/components/elSelectTree/elSelectTree';
    import iLocalStroage from '@/common/js/localStroage';
    export default {
        data() {
            return {
                detailVisible:false,
                copyVisible:false,
                visible:false,
                formReadOnly:false,
                reverse: false,
                activeName: "base",
                orgTreeProps: {
                    label: "label",
                    value: "id"
                },
                queryForm: {
                },
                addForm:{
                },
                copyForm:{
                },
                copyRules: {
                    copyNum: [{ required: true, message: '请输入复制数量', trigger: 'blur' }],
                },
                rules: {
                    name: [
                        {required: true, message: "请输入装备名称", trigger: "blur"}
                    ],
                    deviceType: [
                        {required: true, message: "请输入装备类型", trigger: "blur"}
                    ],
                    useUnit: [
                        {required: true, message: "请输入使用单位", trigger: "blur"}
                    ],
                },
                userInfo:{},
                tableData: [], //表格数据
                currentPage: 1, //当前页
                pageSize: 10, //pagesize
                totalPage: 0, //总数
                title:"新增装备",
                userList:[],
                statusList:[],
                sourceList:[],
                allOrganList:[],
                organList:[],
                deviceTypeList:[],
                logList:[],
                host: '',
                imageList:[]
            };
        },
        components: {
            elSelectTree,
        },
        methods: {
            saveImageFile (param) {
                var fd = new FormData()
                fd.append("file", param.file);
                fd.append("category", '执法装备');
                fd.append("fileName", param.file.name);
                fd.append('caseId', param.file.name+new Date().getTime())//传记录id
                fd.append('docId', param.file.name+new Date().getTime())//传记录id
                if(this.addForm.storageId){
                    fd.append("storageId", this.addForm.storageId);
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
            copyClick(){
                if(this.$refs.dataTable.selection.length>0){
                    this.copyVisible = true
                }else{
                    this.$message({
                        type: "error",
                        message:"请选择需要复制的记录"
                    });
                    return;
                }
            },
            copySubmit(){
                this.$refs.copyForm.validate((valid) => {
                    if (valid) {
                        this.copyData(this.copyForm.copyNum);
                    } else {
                        return false;
                    }
                });
            },
            copyData(copyNum){
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
                data.count= copyNum
                let _this = this
                copyData(data).then(
                    res => {
                        _this.$message({
                            type: "success",
                            message:"复制成功!"
                        });
                        _this.copyVisible=false
                        _this.queryData(1);
                    },
                    err => {
                        console.log(err);
                    }
                );
            },
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
                        _this.addForm.logList=[]
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
                this.currentPage=val
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
                this.title="新增装备"
                this.formReadOnly = false
                this.visible = true
                this.userList=[]
            },
            //编辑
            handleEdit() {
                this.title="修改装备"
                this.findDeviceInventoryById(this.addForm.id)
                this.detailVisible = false
                this.visible = true
            },
            //查看详情
            showDataDetail(row){
                this.findByIdAndLog(row)
                this.detailVisible = true
                this.activeName="base"
            },
            findDeviceInventoryById(id){
                let _this = this
                findDeviceInventoryById(id).then(
                    res => {
                        _this.addForm = res.data
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
            findByIdAndLog(row){
                let _this = this
                findByIdAndLog(row.id).then(
                    res => {
                        _this.addForm = res.data
                        _this.logList = res.data.logList
                        _this.addForm.logList = []
                    },
                    err => {
                        console.log(err);
                    }
                );
            },
            // 表格id删除
            deleteRecord(row) {
                let _this = this
                this.$confirm("确认删除该装备?", "提示", {
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
.add-device-from {
  >>> .el-select,
  >>> .el-date-editor {
    display: block;
  }
  >>> .el-date-editor.el-input,
  >>> .el-date-editor.el-input__inner {
    width: 100%;
  }
  .form-tab-title {
    font-size: 18px;
    font-weight: bold;
    color: #20232b;
    padding-left: 10px;
    margin-bottom: 18px;
    border-left: 4px solid #4573d0;
  }
  .upload-device-image{
      width: 176px;
      height: 96px;
      margin-top: 12px;
      border: 1px dashed #a3a3a3;
      .device-uploader{
          width: 100%;
        height: 100%;
        text-align: center;
        line-height: 96px;
        font-size: 28px;
        >>>.el-upload{
            width: 100%;
            .device-img{
                display: block;
                width: 176px;
                height: 96px;
            }
        }
      }
  }
}
.device-detail-dialog {
  .device-top-tab {
    >>> .el-tabs__item {
      font-size: 16px;
      font-weight: bold;
    }
  }
  .device-info-wrap {
    padding: 10px 0;
    line-height: 28px;
    >>> .el-col {
      margin-bottom: 15px;
    }
    .item-label {
      width: 90px;
      padding-right: 8px;
      display: inline-block;
      text-align: right;
      color: #7b7b7b;
      float: left;
    }
    .item-text {
      margin-left: 100px;
      color: #20232c;
      font-weight: 560;
    }
    .item-img {
      display: block;
      width: 176px;
      height: 96px;
      margin-top: 10px;
      text-align: center;
      line-height: 96px;
    }
  }
  .record-line {
    margin: 10px;
    >>> .el-timeline-item__dot {
      left: -5px;
    }
    .index-dot {
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      border-radius: 20px;
      background: #4573d0;
      color: #ffffff;
    }
  }
}
</style>