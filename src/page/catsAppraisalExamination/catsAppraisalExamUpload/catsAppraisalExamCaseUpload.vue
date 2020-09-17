<template>
    <div class="cats-layout-page-content">
        <div class="searchAndpageBox toggleBox">
            <!-- <div class="handlePart" style="margin-left: 0px;"> -->
            <div  style="margin-left: 0px;">
                <viewNotice ref="viewNoticeRef"></viewNotice>
                <div class="search">
                    <el-form :inline="true">
                        <!-- <el-form-item label="考核名称">
                    <el-select v-model="search.batchId" placeholder="请选择" >
                      <el-option v-for="(item,index) in batchList" :key="index" :label="item.batchName" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item> -->
                        <el-form-item label="执法门类">
                            <el-select v-model="search.businessArea" placeholder="请选择">
                                <el-option v-for="(item, index) in businessAreaList" :key="index" :label="item"
                                    :value="item"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="案卷类型">
                            <el-select v-model="search.caseType" placeholder="请选择">
                                <el-option v-for="(item, index) in caseTypeList" :key="index" :label="item"
                                    :value="item"></el-option>
                            </el-select>
                            <!--              <el-input v-model="search.caseType" clearable placeholder="请选择"></el-input>-->
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="cats-common" icon="el-icon-refresh-left"
                                @click="resetSearch">重置
                            </el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="cats-common" icon="el-icon-search" @click="searchData(1)">查询
                            </el-button>
                        </el-form-item>
                        <el-form-item v-if="baosongStatus">
                            <el-button type="primary" size="cats-common" icon="el-icon-plus" @click="add">新增</el-button>
                        </el-form-item>
                        <el-form-item v-if="baosongStatus">
                            <!-- <el-link href="./static/excel/案卷信息.xlsx">
                        <el-button type="primary" size="cats-common" icon="el-icon-plus" >模板下载</el-button>
                      </el-link> -->
                        </el-form-item>
                        <el-form-item v-if="baosongStatus">
                            <el-upload class="upload-demo" action="" :http-request="uploadCase" :show-file-list="false"
                                accept=".xlsx">
                                <el-button type="primary" size="cats-common" icon="el-icon-plus">批量导入</el-button>
                            </el-upload>
                        </el-form-item>
                        <el-form-item v-if="baosongStatus">
                            <el-button type="primary" size="cats-common" @click="clickBaosong">报送</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <el-row>
                    <div class="tips cats-f-left">
                        <i class="el-icon-warning"></i>

                        当前上传案卷：<span class="important">{{
                            tjData.caseInfoTotal ? tjData.caseInfoTotal : 0
                        }}</span>
                        卷， 其中行政处罚案卷：<span class="important">{{
                            tjData.penaltiesNum ? tjData.penaltiesNum : 0
                        }}</span>
                        卷，行政强制案卷：
                        <span class="important">{{
                            tjData.forceNum ? tjData.forceNum : 0
                        }}</span>
                        卷
                    </div>
                    <el-button-group class="cats-f-right">
                        <template v-for="(item, index) in btnList">
                            <el-button size="small" :type="btnCheckIndex == index ? 'primary' : ''"
                                @click="showIndex(index)" :key="index">
                                <i :class="item.icon"></i>{{ item.name }}
                            </el-button>
                        </template>
                    </el-button-group>
                </el-row>
                <el-row class="cats-f-center" style="width: 1100px;" v-show="btnCheckIndex">
                    <el-col :span="10">
                        <div id="typeChart" style="
                                width: 400px;
                                height: 450px;
                                padding: 20px 30px;
                            "></div>
                    </el-col>
                    <el-col :span="14">
                        <div id="areaChart" style="height: 450px; width: 650px; padding: 20px;"></div>
                    </el-col>
                </el-row>
                <div v-show="!btnCheckIndex">
                    <div class="tablePart">
                        <!-- @row-click="handleNodeClick" -->
                        <el-table :data="dataList" stripe resizable border style="width: 100%; height: 100%;"
                            row-key="id">
                            <el-table-column prop="caseNo" label="案卷编号" align="center"></el-table-column>
                            <el-table-column prop="caseParty" label="当事人" align="center"></el-table-column>
                            <el-table-column prop="caseType" label="案卷类型" align="center"></el-table-column>
                            <el-table-column prop="caseAgency" label="办案/执法机构" align="center"></el-table-column>
                            <!-- <el-table-column prop="casesMajor" label="是否是重大案卷" align="center"></el-table-column> -->
                            <!-- <el-table-column prop="enforcementOfficials1" label="执法人员1" align="center"></el-table-column>
                  <el-table-column prop="enforcementOfficials2" label="执法人员2" align="center"></el-table-column> -->
                            <el-table-column prop="caseCause" label="案由" align="center">
                                <template slot-scope="scope">
                                    <div>{{ scope.row.caseCause }}</div>
                                    <!-- <el-tooltip class="item" effect="dark" :content="scope.row.caseCause" placement="top-start" >
                        <el-button>案由</el-button>
                      </el-tooltip> -->
                                </template>
                            </el-table-column>
                            <el-table-column label="状态" align="center">
                                <template slot-scope="scope">
                                    <el-tag type="warning" v-show="scope.row.bsStatus == 0">未报送</el-tag>
                                    <el-tag type="warning" v-show="
                                            scope.row.bsStatus == 1 &&
                                            scope.row.caseStatus == 0
                                        ">未抽取
                                    </el-tag>
                                    <el-tag type="success" v-show="scope.row.caseStatus == 1">已抽取</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="center" width="280px">
                                <template slot-scope="scope">
                                    <div>

                                        <div v-if="baosongStatus" style="display:inline;">
                                            <el-button type="text" @click.stop @click="update(scope.row)" v-show="
                                                    scope.row.caseStatus == 0
                                                ">修改</el-button>
                                            <el-button type="text" @click.stop @click="deleteCase(scope.row)" v-show="
                                                    scope.row.caseStatus == 0
                                                ">删除</el-button>
                                        </div>
                                        <div style="display:inline;">
                                            <el-upload v-show="baosongStatus&&scope.row.caseStatus == 0"
                                                ref="caseUpload" style="display:inline;" class="upload-demo"
                                                accept=".pdf,.PDF" :file-list="fileList" :show-file-list="false"
                                                :http-request="(params) => saveFile(params,scope.row,'.pdf,.PDF')" 
                                                action="https://jsonplaceholder.typicode.com/posts/" multiple
                                                :limit="1">
                                                <el-button type="text">上传案卷</el-button>
                                            </el-upload>
                                            <el-button type="text" @click.stop @click="view(scope.row)"
                                                v-if="scope.row.fjStatus == 1">查看案卷</el-button>
                                        </div>
                                        <el-button type="text" @click="view_openDialog(scope.row)">详情</el-button>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>

                    <div class="paginationBox">
                        <div v-if="total / dataList.length > 1">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                :current-page="current" :page-sizes="[20, 40, 60, 80, 100]" :page-size="size"
                                layout="total, sizes, prev, pager, next, jumper" :total="total">
                            </el-pagination>
                        </div>
                        <div class="noMore" v-else>没有更多了</div>
                    </div>
                </div>

                <el-dialog :visible.sync="visible" title="案卷报送" width="480px">
                    <el-form :label-position="labelPosition" :model="form" ref="form" :rules="rules"
                        label-width="115px">
                        <el-form-item label="案卷编号" prop="caseNo">
                            <el-input placeholder="请输入" v-model.trim="form.caseNo"></el-input>
                        </el-form-item>
                        <el-form-item label="案由">
                            <el-input placeholder="请输入" v-model.trim="form.caseCause"></el-input>
                        </el-form-item>
                        <el-form-item label="案卷类型" prop="caseType">
                            <el-select v-model="form.caseType" placeholder="请选择">
                                <el-option v-for="(item, index) in caseTypeList" :key="index" :label="item"
                                    :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="当事人">
                            <el-input placeholder="请输入" v-model.trim="form.caseParty"></el-input>
                        </el-form-item>
                        <el-form-item label="办案/执法机构" prop="caseAgency">
                            <el-input placeholder="请输入" v-model.trim="form.caseAgency"></el-input>
                        </el-form-item>
                        <el-form-item label="执法人员">
                            <el-input placeholder="请输入" v-model.trim="form.enforcementOfficials1"></el-input>
                        </el-form-item>
                        <el-form-item label="执法门类" prop="businessArea">
                            <el-select v-model="form.businessArea" placeholder="请选择执法门类">
                                <el-option v-for="(item, index) in businessAreaList" :key="index" :label="item"
                                    :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="省级行政区划" prop="provinceDivision">
                            <el-select v-model="form.provinceDivision" @change="changeIndex($event)" placeholder="请选择">
                                <el-option v-for="(item, index) in provinceDivisionList" :key="index" :label="item.pykhDivisionVo.name"
                                    :value="item.pykhDivisionVo.name"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="地市行政区划" prop="cityDivision">
                            <el-select v-model="form.cityDivision" placeholder="请选择">
                                <el-option v-for="(item, index) in cityDivisionList" :key="index" :label="item.name"
                                    :value="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="结案时间" prop="caseClosedTime">
                            <el-date-picker v-model="form.caseClosedTime" format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss" placeholder="请输入结案时间" clearable>
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="addOrUpdate" type="primary" class="btn-custom">
                            <span>确 定</span>
                        </el-button>
                    </div>
                </el-dialog>

                <el-dialog :visible.sync="visible1" title="详情" width="480px">
                    <el-form :label-position="labelPosition" v-if="form1" :model="form1" ref="form1"
                        label-width="160px">
                        <el-form-item label="案卷编号">
                            {{form1.caseNo}}
                        </el-form-item>
                        <el-form-item label="案由">
                            {{form1.caseCause}}
                        </el-form-item>
                        <el-form-item label="案卷类型">
                            {{form1.caseType}}
                        </el-form-item>
                        <el-form-item label="当事人">
                            {{form1.caseParty}}
                        </el-form-item>
                        <el-form-item label="办案/执法机构">
                            {{form1.caseAgency}}
                        </el-form-item>
                        <el-form-item label="执法人员">
                            {{form1.enforcementOfficials1}}
                        </el-form-item>
                        <el-form-item label="执法门类">
                            {{form1.businessArea}}
                        </el-form-item>
                        <el-form-item label="省级行政区划">
                            {{form1.provinceDivision}}
                        </el-form-item>
                        <el-form-item label="地市行政区划">
                            {{form1.cityDivision}}
                        </el-form-item>
                        <el-form-item label="结案时间">
                            {{form1.caseClosedTime}}
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="visible1 = false" type="primary" class="btn-custom">
                            <span>关 闭</span>
                        </el-button>
                    </div>
                </el-dialog>
                <el-dialog :visible.sync="failReasonsType" title="导入报错详情" width="480px">
                    <el-form ref="failReasons" label-width="160px">
                        <ul>
                            <li class="fontNormal" v-for="(item, index) in failReasons" :key="index">
                                <div class="c">
                                    <em class="numIcon">{{
                                        index + 1
                                    }}</em>
                                    <span class="tz">{{ item.failReasons }}</span>
                                </div>
                            </li>
                        </ul>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="failReasonsType= false" type="primary" class="btn-custom">
                            <span>关闭</span>
                        </el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        findPykhCaseByPage,
        importCase,
        saveOrUpdateCaseInfo,
        deleteCaseInfo,
        confirmSubmissionCase,
        getCountInfo,
        findPykhOrgan,
        getFileStreamByStorageId
    } from '@/api/pykh/catsAppraisalExamCaseUpload.js'
    import {
        uploadFuncO
    } from '@/api/upload'
    import viewNotice from '../noticeManage/viewNotice'
    import iLocalStroage from '@/common/js/localStroage'
    import {
        money
    } from '@/common/js/validator'
    import echarts from 'echarts'
    export default {
        components: {
            viewNotice
        },
        data() {
            return {
                fileList: [],
                btnCheckIndex: 0,
                btnList: [{
                        name: '列表',
                        icon: 'el-icon-s-fold'
                    },
                    {
                        name: '图表',
                        icon: 'el-icon-s-data'
                    }
                ],
                failReasonsType:false,
                failReasons:[],
                rules: {
                    caseNo: [{
                        required: true,
                        message: '请输入案卷编号',
                        trigger: 'blur'
                    }],
                    // amountInvolved: [{
                    //     validator: money,
                    //     trigger: "blur"
                    // }],
                    caseType: [{
                        required: true,
                        message: '请选择案卷类型',
                        trigger: 'change'
                    }],
                    caseAgency: [{
                        required: true,
                        message: '请输入立案机构',
                        trigger: 'blur'
                    }],
                    provinceDivision: [{
                        required: true,
                        message: '请选择省级行政区划',
                        trigger: 'blur'
                    }],
                    cityDivision: [{
                        required: true,
                        message: '请选择地市行政区划',
                        trigger: 'blur'
                    }],
                    caseClosedTime: [{
                        required: true,
                        message: '请输入结案时间',
                        trigger: 'change'
                    }],
                    businessArea: [{
                        required: true,
                        message: '请选择执法门类',
                        trigger: 'change'
                    }]
                },
                current: 1,
                size: 20,
                total: 0,
                dataList: [],
                visible: false,
                labelPosition: 'right',
                organId: '',
                form: {
                    provinceDivision: '',
                    cityDivision: '',
                    caseClosedTime: '',
                    caseNo: '',
                    caseCause: '',
                    caseType: '',
                    oId: '',
                    caseAgency: '',
                    caseParty: '',
                    enforcementOfficials1: '',
                    enforcementOfficials2: '',
                    handleType: '',
                    amountInvolved: '',
                    businessArea: ''
                    // casesMajor:''
                },
                search: {
                    batchId: '',
                    businessArea: '',
                    caseType: ''
                },
                baosongStatus: true,
                businessAreaList: [
                    '公路路政',
                    '道路运政',
                    '水路运政',
                    '航道行政',
                    '港口行政',
                    '地方海事行政',
                    '直属海事行政',
                    '工程质量监督管理'
                    
                ],
                caseTypeList: ['行政处罚', '行政强制'],
                handleTypeList: ['罚款'],
                tjData: {
                    ajCfBsjs: '',
                    ajQzBsjs: '',
                    anBsjs: ''
                },
                cityDivisionList: [],
                provinceDivisionList:[],
                form1: null,
                visible1: null
            }
        },
        methods: {
            showIndex(index) {
                this.btnCheckIndex = index
            },
            changeIndex(name){
              this.cityDivisionList=[];
              for(let i=0;i<this.provinceDivisionList.length;i++){
                if(this.provinceDivisionList[i].pykhDivisionVo.name == name){
                  this.cityDivisionList=this.provinceDivisionList[i].list;
                  this.form.cityDivision=this.cityDivisionList[0].name;
                  break;
                }
              }
            },
            saveFile(param, row, accept) {
                let acceptList = accept.split(',')
                let acceptBoo = true
                for (var i = 0; i < acceptList.length; i++) {
                    if (param.file.name.indexOf(acceptList[i]) > -1) {
                        acceptBoo = false
                    }
                }
                if (acceptBoo) {
                    this.$message.error('上传文件格式为 "' + accept + '" 文件,请重新上传')
                    this.fileList = []
                    this.$refs.caseUpload.clearFiles()
                    return
                }
                let size=param.file.size / 1024 / 1024;
                if(size > 80){
                    this.$message.error('上传文件大小不能超过80M,请重新上传')
                    this.fileList = []
                    this.$refs.caseUpload.clearFiles()
                    return
                }
                var fd = new FormData()
                fd.append('file', param.file)
                fd.append('userId', iLocalStroage.gets('userInfo').id)
                fd.append('category', '案卷报送')
                fd.append('caseId', row.caseId)
                fd.append('businessTypeId', '3')
                fd.append('businessId', row.caseId)
                fd.append('storageId', row.storageId ? row.storageId : '')
                let _this = this
                uploadFuncO.uploadPykh(fd).then(res => {
                    if (res.code == 200) {
                        row.storageId = res.data
                        row.fjStatus = '1'
                        _this.fileList = []
                        _this.$refs.caseUpload.clearFiles()
                    } else {
                        _this.fileList = []
                        _this.$refs.caseUpload.clearFiles()
                        _this.$message.error('出现异常，添加失败！')
                    }
                })
            },
            view(row) {
                console.log(row)
                let routerData = {
                    isRead: row.isRead === 'N' ? true : false,
                    id: row.id,
                    title: row.title,
                    storageId:row.storageId
                }
                // this.$refs.viewNoticeRef.showNewPDF(routerData);
                // return;
                // getFileStreamByStorageId(row.storageId).then(res => {
                //     const blob = new Blob([res], {
                //         type: 'application/pdf;charset-UTF-8'
                //     });
                //     let objectUrl = window.URL.createObjectURL(blob);
                //     routerData.storagePath = objectUrl;
                //     this.$refs.viewNoticeRef.showNewPDF(routerData);
                // })
                // return;
                this.$refs.viewNoticeRef.showPDF(row)

            },
            fetchData(data) {
                data.current = this.current
                data.size = this.size
                data.oId = this.organId
                findPykhCaseByPage(data).then(res => {
                    if (res.code == 200) {
                        this.dataList = res.data.records
                        this.total = res.data.total
                        this.current = res.data.current
                    }
                })
            },
            //更改每页显示的条数
            handleSizeChange(val) {
                this.current = 1
                this.size = val
                this.fetchData({})
            },
            //更换页码
            handleCurrentChange(val) {
                this.current = val
                this.fetchData({})
            },
            searchData(current) {
                this.current = current
                let data = this.search
                console.info('searchData:', data)
                this.fetchData(data)
            },
            resetSearch() {
                this.search = {
                    batchId: '',
                    businessArea: '',
                    caseType: ''
                }
            },
            add() {
                this.visible = true
                this.form = {
                    provinceDivision: '',
                    cityDivision: '',
                    caseClosedTime: '',
                    caseNo: '',
                    caseCause: '',
                    caseType: '',
                    oId: '',
                    caseAgency: '',
                    caseParty: '',
                    enforcementOfficials1: '',
                    enforcementOfficials2: '',
                    handleType: '',
                    amountInvolved: '',
                    businessArea: ''
                }
                this.cityDivisionList=[];
                // this.$refs.form.resetFields()
            },
            update(data) {
                this.form = JSON.parse(JSON.stringify(data))
                this.visible = true
            },
            view_openDialog(data) {
                this.form1 = JSON.parse(JSON.stringify(data))
                this.visible1 = true
            },
            deleteCase(data) {
                console.info('***********')
                let _this = this
                this.$confirm('确定删除吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    .then(() => {
                        deleteCaseInfo(data.caseId).then(
                            res => {
                                if (res.data === true) {
                                    _this.catsMessage({
                                        type: 'success',
                                        message: '删除成功!'
                                    })
                                    _this.fetchData({})
                                    _this.getCountInfo()
                                } else {
                                    _this.catsMessage({
                                        type: 'warning',
                                        message: '删除失败!'
                                    })
                                }
                            },
                            err => {
                                console.log(err)
                            }
                        )
                    })
                    .catch(() => {})
            },

            addOrUpdate() {
                let _this = this
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        _this.form.oId = this.organId
                        saveOrUpdateCaseInfo(_this.form).then(res => {
                            console.info('保存案卷结果：', res)
                            if (res.code == 200) {
                                _this.visible = false
                                _this.$set(_this, 'form', {
                                    provinceDivision: '',
                                    cityDivision: '',
                                    caseClosedTime: '',
                                    caseNo: '',
                                    caseCause: '',
                                    caseType: '',
                                    oId: '',
                                    caseAgency: '',
                                    caseParty: '',
                                    enforcementOfficials1: '',
                                    enforcementOfficials2: '',
                                    handleType: '',
                                    amountInvolved: '',
                                    businessArea: ''
                                    // casesMajor:''
                                })

                                _this.fetchData({})
                                _this.getCountInfo()
                            } else {
                                _this.catsMessage({
                                    type: 'error',
                                    message: res.data
                                })
                            }
                        })
                    } else {
                        _this.catsMessage({
                            type: 'error',
                            message: '您有必填字段未填写！'
                        });

                        _this.closeLoading()
                        return false
                    }
                })
            },

            uploadCase(param) {
                console.log(param)
                var fd = new FormData()
                fd.append('file', param.file)
                fd.append('oId', this.organId)
                let _this = this
                importCase(fd).then(
                    res => {
                        console.log(res)
                        if (res.code == 200) {
                            _this.fetchData({})
                            // this.catsMessage({type: "success",message: res.msg});
                            _this.$message.success(
                                '上传成功' +
                                res.data.successNum +
                                '条数据,' +
                                '上传失败' +
                                res.data.failNum +
                                '条数据'
                            )
                            if(res.data.messages.length !=0){
                              _this.failReasons=res.data.messages;
                              _this.failReasonsType=true;
                            }
                            _this.getCountInfo()
                        } else {
                            this.catsMessage({
                                type: 'error',
                                message: res.msg
                            })
                        }
                    },
                    error => {
                        console.log(error)
                    }
                )
            },
            findCaseBsStatus() {
                let data = {}
                data.oId = this.organId
                data.bsStatus = 1
                findPykhCaseByPage(data).then(res => {
                    if (res.code == 200) {
                        if (res.data.total > 0) {
                            this.baosongStatus = false
                        }
                    }
                })
            },
            clickBaosong() {
                confirmSubmissionCase(this.organId).then(res => {
                    if (res.code == 200) {
                        this.catsMessage({
                            type: 'success',
                            message: res.msg
                        })
                        this.findCaseBsStatus()
                        this.fetchData({})
                    } else {
                        this.catsMessage({
                            type: 'error',
                            message: res.msg
                        })
                    }
                })
            },
            getCountInfo() {
                getCountInfo().then(res => {
                    if (res.code == 200) {
                        // this.catsMessage({type: "success",message: res.msg});
                        this.tjData = res.data
                        this.showTypeChart()
                        this.showAreaChart()
                    } else {
                        this.catsMessage({
                            type: 'error',
                            message: res.msg
                        })
                    }
                })
            },
            showTypeChart() {
                let legendData = []
                let seriesData = []
                let total = parseFloat(this.tjData.caseInfoTotal)
                if(this.tjData.businessAreaMap){
                    Object.keys(this.tjData.businessAreaMap).forEach(k => {
                        let num = parseFloat(this.tjData.businessAreaMap[k])
                        let percent = total <= 0 ? '0%' : Math.round((num / total) * 10000) / 100.0 + '%'
                        let n = k
                        // + "\n" + percent;
                        legendData.push(n)
                        seriesData.push({
                            name: n,
                            value: this.tjData.businessAreaMap[k]
                        })
                    })
                }
                
                let myChart = echarts.init(document.getElementById('typeChart'))
                myChart.setOption({
                    title: {
                        text: '按执法门类',
                        left: 'left'
                    },
                    tooltip: {
                        trigger: 'item',
                        position: 'top'
                    },
                    legend: {
                        left: 5,
                        top: 30,
                        data: legendData

                        // selected: data.selected
                    },
                    series: [{
                        name: '门类',
                        type: 'pie',
                        color: [
                            '#4477E0',
                            '#5AD8A6',
                            '#5D7092',
                            '#F6BD16',
                            '#E8684A',
                            '#6DC8EC',
                            '#9270CA',
                            '#ff9f7f',
                            '#E690D1',
                            '#e7bcf3',
                            '#9d96f5',
                            '#8378EA',
                            '#96BFFF'
                        ],
                        radius: '55%',
                        center: ['40%', '50%'],
                        data: seriesData,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                })
            },
            showAreaChart() {
                let data1 = []
                let data2 = []
                if(this.tjData.cityDivisionMap){
                    Object.keys(this.tjData.cityDivisionMap).forEach(k => {
                        data1.push(k)
                        data2.push(this.tjData.cityDivisionMap[k])
                    })
                }
                let myChart = echarts.init(document.getElementById('areaChart'))
                myChart.setOption({
                    title: {
                        text: '案卷区域分布情况'
                    },
                    tooltip: {
                        trigger: 'item',
                        position: 'top'
                    },
                    xAxis: {
                        name: '案卷数量',
                        type: 'value',
                        splitLine: {
                            show: false
                        }
                    },
                    yAxis: {
                        name: '办案机构所在行政区划',
                        type: 'category',
                        data: data1
                    },
                    series: [{
                        data: data2,
                        type: 'bar',
                        // color: ['#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8', '#FFDB5C','#ff9f7f', '#fb7293', '#E062AE', '#E690D1', '#e7bcf3', '#9d96f5', '#8378EA', '#96BFFF'],
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(220, 220, 220, 0.3)'
                        },
                        itemStyle: {
                            color: '#4477E0'
                        }
                    }]
                })
            },
            findPykhOrgan() {
                findPykhOrgan().then(res => {
                    if (res.code == 200) {
                        this.provinceDivisionList = res.data;
                    } else {
                        this.catsMessage({
                            type: 'error',
                            message: res.msg
                        })
                    }
                })
            }
        },
        mounted() {
            let userInfo = iLocalStroage.gets('userInfo')
            this.organId = userInfo.organId
            let initdata = {}
            this.findCaseBsStatus()
            this.fetchData(initdata)
            this.getCountInfo()
            this.findPykhOrgan()
            this.btnCheckIndex = 0
        }
    }

</script>
<style scoped>
  .numIcon {
      margin-left: -14px;
      margin-right: 22px;
      display: inline-block;
      width: 34px;
      height: 20px;
      line-height: 20px;
      background-color: #2691f2;
      margin-top: 12px;
      color: white;
      text-align: center;
  }
  .tz {
        line-height: 46px;
        height: 46px;
    }
  .fontNormal{
       height: 29px;
  }
  .cats-f-left{
      width: auto;
  }
</style>
