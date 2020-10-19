<template>
    <div class="com_searchAndpageBoxPadding">
        <div class="searchPage toggleBox">
            <div class="handlePart">
                <el-form :inline="true" ref="queryForm" :model="queryForm" label-width="120px">
                    <!--查询字段-->
                    <el-form-item label="所属机构" prop="organId">
                        <elSelectTree
                            ref="queryFormOrganIdTreeObj"
                            :options="organList"
                            :accordion="true"
                            :props="orgTreeProps"
                            style="width:200px" 
                            :filterable="true"
                            :value="queryForm.organId"
                            @getValue="queryFormOrganIdClick">
                        </elSelectTree>
                        <el-input style="display:none" v-model="queryForm.organId"></el-input>
                    </el-form-item>
                    <el-form-item label="查询范围">
                        <el-select v-model="queryForm.selectValue">
                            <el-option
                            v-for="item in searchType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="站点类型" prop="deviceType">
                        <el-select v-model="queryForm.deviceType" :filterable="true" :clearable="true">
                            <el-option
                            v-for="item in typeData"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="站点名称" prop="name">
                        <el-input v-model="queryForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="站点状态" prop="status">
                        <el-select v-model="queryForm.status">
                            <el-option
                            v-for="item in status"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
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
                <el-button type="primary" size="medium" icon="el-icon-plus">导出</el-button>
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
                    <el-table-column prop="deviceType" label="站点类型" :formatter="formatDeviceType"></el-table-column>
                    <el-table-column prop="name" label="站点名称"></el-table-column>
                    <el-table-column prop="organName" label="所属机构"></el-table-column>
                    <el-table-column prop="address" label="位置信息"></el-table-column>
                    <el-table-column label="操作" width="160" align="center">
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
                custom-class="deviceMngDialog"
                :visible.sync="visible"
                top="0"
                width="40%"
                @close="closeDialog"
                :close-on-click-modal="false">
                <el-form
                    :model="addForm"
                    ref="addForm"
                    label-width="100px"
                    class="addOrganClass" >
                    <div class="part">
                    <p class="titleP">站点说明</p>
                    <el-row>
                        <el-form-item label="所属机构" prop="organId">
                            <elSelectTree
                                ref="addFormUseUnitTreeObj"
                                :options="organList"
                                :value="addForm.organId"
                                :accordion="true"
                                :props="orgTreeProps"
                                :filterable="true"
                                style="width: 100%;"
                                :disabled="this.formReadOnly">
                            </elSelectTree>
                            <el-input style="display:none" v-model="addForm.organId"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                        <el-form-item label="联系人" prop="contactor">
                            <el-input v-model="addForm.contactor" style="width: 100%;" readonly ></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span="12">
                        <el-form-item label="联系电话" prop="telephone">
                        <el-input v-model="addForm.telephone" style="width: 100%;" readonly></el-input>
                        </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item label="站点类型" prop="deviceType">
                        <el-select v-model="addForm.deviceType" placeholder="请选择站点类型" style="width: 100%;" :disabled="this.formReadOnly">
                            <el-option
                            v-for="item in typeData"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code"
                            ></el-option>
                        </el-select>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                        <el-form-item label="站点名称" prop="name">
                        <el-input v-model="addForm.name" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span="12">
                        <el-form-item label="站点简称" prop="shortName">
                        <el-input v-model="addForm.shortName" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                        </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item label="站点有效期" prop="deviceDate">
                        <el-date-picker
                            :readonly="this.formReadOnly"
                            v-model="deviceDate"
                            unlink-panels
                            type="daterange"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="站点状态">
                        <el-switch
                            v-model="addForm.status"
                            :active-value=0
                            :inactive-value=1
                            :disabled="this.formReadOnly"
                        ></el-switch>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="位置信息" class="eventLagLng">
                        <el-input v-model="addForm.address" placeholder="详细地址" style="width: 100%;" :readonly="this.formReadOnly">
                            <div
                                class="handleLatLng already"
                                slot="append"
                            ><i class="iconfont law-weizhi" />已获取坐标</div>
                        </el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item>
                        <el-input v-model="addForm.property1" placeholder="经度" style="width: 30%;" :readonly="this.formReadOnly"></el-input>
                        <el-input v-model="addForm.property2" placeholder="纬度" style="width: 30%;" :readonly="this.formReadOnly"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row v-show="this.hasAddress">
                        <el-form-item label="路桩路段" prop="highwayRoute">
                            <el-select ref="highwayRoute" v-model="addForm.highwayRoute" placeholder="路线" :disabled="this.formReadOnly">
                                <el-option v-for="item in routeList" :key="item" :label="item" :value="item"></el-option>
                            </el-select>
                            <el-select ref="direction" v-model="addForm.direction" placeholder="方向" :disabled="this.formReadOnly">
                                <el-option
                                v-for="item in locationList"
                                :key="item.name"
                                :label="item.label"
                                :value="item.name"
                                ></el-option>
                            </el-select>
                            <el-select ref="position" v-model="addForm.position" placeholder="位置" :disabled="this.formReadOnly">
                                <el-option
                                v-for="item in directionList"
                                :key="item.name"
                                :label="item.label"
                                :value="item.name"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="">
                            <span class="gongLiBox1">K</span>
                            <span class="itemFive">
                                <el-input v-model="addForm.pileNumber" placeholder="公里数" :readonly="this.formReadOnly"></el-input>
                            </span>
                            <span class="gongLiBox2">+</span>
                            <span class="itemFive">
                                <el-input
                                    v-model="addForm.distance"
                                    placeholder="米数"
                                    :readonly="this.formReadOnly"
                                    style="vertical-align: middle;"
                                >
                                    <template slot="append">m</template>
                                </el-input>
                            </span>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="备注">
                        <el-input v-model="addForm.note" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                        </el-form-item>
                    </el-row>
                    </div>
                    <div class="part">
                    <p class="titleP">其他材料</p>
                    <el-form-item label="站点照片">
                        <el-upload
                        action="#"
                        accept=".jpg, .png"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :file-list="imageList"
                        :disabled="formReadOnly"
                        >
                        <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="相关附件">
                        <el-upload
                        class="upload-demo"
                        action="#"
                        accept=".pdf,.PDF"
                        :on-preview="handlePDFPreview"
                        multiple
                        :limit="3"
                        :disabled="formReadOnly"
                        :file-list="attachList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    </div>
                </el-form>
                <div slot="footer" class="dialog-footer" v-show="!this.formReadOnly">
                    <el-button @click="closeDialog">取 消</el-button>
                    <el-button @click="addOrUpdate('addForm')"  type="primary" class="btn-custom" >
                    <span>确 定</span>
                    </el-button>
                </div>
            </el-dialog>
            <el-dialog :visible.sync="dialogImageVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <el-dialog
            :visible.sync="dialogPDFVisible"
            width="1000px"
            height="1000px"
            append-to-body
            >
                <object>
                    <embed class="print_info" style="padding:0px;width: 900px;margin:0 auto;height:1000px" name="plugin" id="plugin" :src="dialogPDFUrl" type="application/pdf" internalinstanceid="29">
                </object>
            </el-dialog>
        </div>
    </div>
</template>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
<script>
    import { 
        queryDeviceListPage,
        findDeviceById,
        queryDeviceTypeAll
    } from "@/api/lawSupervise.js";
    import {
        findRouteManageByOrganIdApi,
    } from "@/api/system";
    import elSelectTree from '@/components/elSelectTree/elSelectTree';
    import iLocalStroage from '@/common/js/localStroage';
    export default {
        data() {
            return {
                visible:false,
                formReadOnly:true,
                queryForm: {
                    organId:"",
                    name: "",
                    deviceType: "",
                    status: 0,
                    selectValue: 1
                },
                addForm: {
                },
                userInfo:{},
                tableData: [], //表格数据
                currentPage: 1, //当前页
                pageSize: 10, //pagesize
                totalPage: 0, //总数
                title:"站点统计",
                organList:[],
                orgTreeProps: {
                    label: "label",
                    value: "id"
                },
                typeData:[],
                defaultProps: {
                    children: "children",
                    label: "label"
                },
                searchType: [{value: 1, label: '本机构'}, {value: 0, label: '本机构及子机构'}],
                imageList: [],
                attachList: [],
                status: [
                    {label: '全部', value: -1},
                    {label: '在用', value: 0},
                    {label: '禁用', value: 1}
                ],
                deviceDate:['',''],
                dialogImageUrl: '',
                dialogImageVisible: false,
                dialogPDFUrl: '',
                dialogPDFVisible: false,
                hasAddress:false,
                routeList:[],
                directionList:[],
                locationList:[]
            };
        },
        components: {
            elSelectTree,
        },
        methods: {
            reset() {
                this.$refs["queryForm"].resetFields();
                if(this.$refs.queryFormOrganIdTreeObj){
                    this.$refs.queryFormOrganIdTreeObj.clearHandle()
                }
                this.queryForm.organId=this.userInfo.organId
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogImageVisible = true;
            },
            handlePDFPreview(file){
                this.dialogPDFUrl = file.url;
                this.dialogPDFVisible = true;id
            },
            //表单筛选
            queryData(val) {
                this.currentPage=val
                this.queryForm.size=this.pageSize
                this.queryForm.current=this.currentPage
                let _this = this
                queryDeviceListPage(this.queryForm).then(res => {
                    _this.totalPage = res.data.total;
                    _this.tableData = res.data.records;
                });
            },
            //查看详情
            showDataDetail(row){
                this.title='站点详情'
                this.findDeviceById(row)
                this.formReadOnly = true
                this.imageList=[]
                this.attachList=[]
            },
            findDeviceById(row){
                let _this = this
                findDeviceById(row.id,row.deviceType).then(
                    res => {
                        _this.addForm = res.data
                        let position = res.data.propertyValue ? res.data.propertyValue.split(','):['',''];
                        let lng = parseFloat(position[0]);
                        let lat = parseFloat(position[1]);
                        _this.addForm.property1=lng
                        _this.addForm.property2=lat
                        let deviceDate = ['','']
                        if(res.data.startDate){
                            deviceDate[0]=res.data.startDate+' 00:00:00'
                            deviceDate[1]=res.data.endDate+' 00:00:00'
                        }
                        _this.deviceDate=deviceDate
                        if(res.data.fileList){
                            res.data.fileList.forEach(item=>{
                                if(item.status=='图片'){
                                    _this.$util.com_getZfjgFileStream(item.storageId).then(res=>{
                                        item.url = res
                                        _this.imageList.push(item)
                                    });
                                }else{
                                    _this.$util.com_getZfjgFileStream(item.storageId).then(res=>{
                                        item.url = res
                                        _this.attachList.push(item)
                                    });
                                }
                            })
                        }
                        _this.visible=true
                        if(_this.addForm.deviceType=='02' || _this.addForm.deviceType=='03'){
                            _this.hasAddress = false
                        }else{
                            _this.hasAddress = true
                        }
                    },
                    err => {
                        console.log(err);
                    }
                );
            },
            //关闭弹窗的时候清除数据
            closeDialog() {
                this.visible = false;
                this.$refs["addForm"].resetFields();
            },
            init(){
                this.queryDeviceTypeAll()
                this.queryData(1)
                this.getOrganList()
                this.findRouteManageByOrganId()
                this.initDrawer()
            },
            async getOrganList(){
                let res = await this.$store.dispatch('getAllOrgan')
                this.organList = res.data
                this.queryForm.organId=this.userInfo.organId
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
            queryFormOrganIdClick(val) {
                this.$refs.queryFormOrganIdTreeObj.$children[0].handleClose();
                this.queryForm.organId = val
            },
            formatDeviceType (row) {
                let data = this.typeData.filter(p=>p.code==row.deviceType)
                if(data && data.length>0){
                return data[0].name
                }
                return ''
            },
            queryDeviceTypeAll(){
                let _this = this
                queryDeviceTypeAll({}).then(
                res => {
                    console.log(res);
                    _this.typeData = res.data;
                },
                err => {
                    console.log(err);
                }
                );
            },
            //查找路线
            findRouteManageByOrganId() {
                let data = { organId: iLocalStroage.gets("userInfo").organId };
                findRouteManageByOrganIdApi(data).then(
                    (res) => {
                    console.log("路线", res);
                    this.routeList = res.data;
                    },
                    (err) => {
                    console.log(err);
                    }
                );
            },
            initDrawer() {
                let data = [];
                //案发地点-方向
                data.push({
                    pid: "004cec030c349c3fcd119f3c2eee948f",
                    fieldName: "directionList",
                });
                //案发地点-位置
                data.push({
                    pid: "a648aef61fdc2e8d578272c4f16d0c4f",
                    fieldName: "locationList",
                });
                let _this = this;
                this.$store.dispatch("getDrawerList", data).then(
                    (res) => {
                    _this.directionList = res.data.directionList;
                    _this.locationList = res.data.locationList;
                    },
                    (err) => {
                    console.log(err);
                    }
                );
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
<style lang="scss" scoped>
    .eventLagLng {
    .el-input {
    .el-input-group__append {
        cursor: pointer;
        width: 130px;
        height: 30px;
        padding: 0;
        border: 0;
        .handleLatLng {
        background: #409EFF;
        width: 100%;
        height: 100%;
        color: #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
            margin-right: 3px;
        }
        }
        .handleLatLng.already {
        background: #F2F6FC;
        color: #606266;
        border: 1px solid #DCDFE6;
        margin-left: -1px;
        }
    }
    }
}
</style>
