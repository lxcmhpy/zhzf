<template>
    <div class="cats-layout-page-content">
        <div class="searchAndpageBox toggleBox">
            <div style="margin-left: 0px;">
                <viewNotice ref="viewNoticeRef"></viewNotice>
                <div class="search">
                    <el-form :label-position="labelPosition" :model="search" ref="form" label-width="160px"
                        :inline="true">
                        <el-form-item label="姓名">
                            <el-input v-model="search.staffName" clearable placeholder="请输入"></el-input>
                        </el-form-item>
                        <!--            <el-form-item label="所属机构">-->
                        <!--              <el-input v-model="search.oId" clearable placeholder="请选择"></el-input>-->
                        <!--            </el-form-item>-->
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
                            <el-button type="primary" size="cats-common" icon="el-icon-plus" @click="add_openDialog">新增
                            </el-button>
                        </el-form-item>
                        <el-form-item v-if="baosongStatus">
                            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                                :http-request="uploadPerson" :show-file-list="false" accept=".xlsx">
                                <el-button type="primary" size="cats-common" icon="el-icon-plus">批量导入</el-button>
                            </el-upload>
                        </el-form-item>
                        <el-form-item v-if="baosongStatus">
                            <el-button type="primary" size="cats-common" @click="clickBaosong">报送</el-button>
                        </el-form-item>
                    </el-form>
                </div>

                <el-row v-if="tjData">
                    <div class="tips cats-f-left">
                        <i class="el-icon-warning"></i>
                        当前上传执法人员：
                        <span class="important">{{
                            tjData.staffTotal ? tjData.staffTotal : 0
                        }}</span>人，其中各级执法机构领导班子成员：
                        <span class="important">{{
                            tjData.leadStaff ? tjData.leadStaff : 0
                        }}</span>
                        人，占比：<span class="important">{{
                                tjData.staffTotal == 0 || !tjData.staffTotal
                                    ? 0
                                    : Math.round(
                                          (tjData.leadStaff /
                                              tjData.staffTotal) *
                                              10000
                                      ) / 100.0
                            }}%</span>
                    </div>
                    <el-button-group class="cats-f-right">
                        <template v-for="(item, index) in btnList">
                            <el-button size="small" @click="showIndex(index)"
                                :type="btnCheckIndex == index ? 'primary' : ''" :key="index">
                                <i :class="item.icon"></i>{{ item.name }}
                            </el-button>
                        </template>
                    </el-button-group>
                </el-row>
                <div class="tablePart" v-show="btnCheckIndex">
                    <div id="myChart" style="
                            width: 1000px;
                            height: 400px;
                            padding: 20px;
                            margin: 0 auto;
                        "></div>
                </div>
                <div v-show="!btnCheckIndex">
                    <div class="tablePart">
                        <!-- @row-click="handleNodeClick" -->
                        <el-table :data="dataList" stripe resizable border style="width: 100%; height: 100%;"
                            row-key="id">
                            <el-table-column prop="staffName" label="姓名" align="center"></el-table-column>
                            <el-table-column prop="idCard" label="身份证号" align="center"></el-table-column>
                            <!--            <el-table-column prop="enforcementCertificate" label="执法证号" align="center"></el-table-column>-->
                            <el-table-column prop="ministerialNo" label="现持部级执法证号" align="center"></el-table-column>
                            <el-table-column prop="provinceNo" label="现持省内执法证号" align="center"></el-table-column>
                            <el-table-column prop="maritimeNo" label="现持海事执法证号" align="center"></el-table-column>
                            <el-table-column label="状态" align="center">
                                <template slot-scope="scope">
                                    <el-tag type="warning" v-show="scope.row.bsStatus == 0">未报送</el-tag>
                                    <el-tag type="warning" v-show="
                                            scope.row.staffStatus == 0 &&
                                            scope.row.bsStatus == 1
                                        ">未抽取
                                    </el-tag>
                                    <el-tag type="success" v-show="scope.row.staffStatus == 1">已抽取</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="center" width="280">
                                <template slot-scope="scope">
                                    <div>

                                        <div v-if="baosongStatus" style="display:inline;">
                                            <el-button type="text" @click.stop @click="
                                                    update_openDialog(scope.row)
                                                " v-show="
                                                    scope.row.staffStatus == 0
                                                ">修改</el-button>
                                            <el-button type="text" @click.stop @click="deleteStaff(scope.row)" v-show="
                                                    scope.row.staffStatus == 0
                                                ">删除</el-button>
                                        </div>
                                        <div v-show="scope.row.staffStatus == 1" style="display:inline;">

                                            <el-upload style="display:inline;" ref="uploadImgRef"
                                                action="https://jsonplaceholder.typicode.com/posts/" class="upload-demo"
                                                accept=".jpg,.png" :show-file-list="false" :http-request="
                                                    (params) =>
                                                        saveFile(
                                                            params,
                                                            scope.row,
                                                            '.jpg,.jpeg,.png'
                                                        )
                                                " :file-list="fileList" multiple :limit="1">
                                                <el-button type="text">上传照片</el-button>
                                            </el-upload>
                                            <el-button type="text" @click.stop @click="view(scope.row)"
                                                v-if="scope.row.fjStatus == 1">查看照片</el-button>
                                        </div>
                                        <el-button type="text" @click="view_openDialog(scope.row)">详情</el-button>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="paginationBox">
                        <div v-if="total / dataList.length > 1">
                            <el-pagination class="cats-t-center" @size-change="handleSizeChange"
                                @current-change="handleCurrentChange" :current-page="current"
                                :page-sizes="[10, 20, 50, 80, 100]" :page-size="size"
                                layout="total, sizes, prev, pager, next, jumper" :total="total">
                            </el-pagination>
                        </div>
                        <div class="noMore" v-else>没有更多了</div>
                    </div>
                </div>
            </div>

            <el-dialog :visible.sync="visible" title="人员报送" width="600px">
                <el-form :label-position="labelPosition" :model="form" :rules="rules" ref="formRY" label-width="160px">
                    <el-form-item label="姓名" prop="staffName">
                        <el-input placeholder="请输入姓名" v-model.trim="form.staffName"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" prop="idCard">
                        <el-input placeholder="请输入身份证号" v-model.trim="form.idCard"></el-input>
                    </el-form-item>
                    <el-form-item label="现持部级执法证号" prop="ministerialNo">
                        <el-input placeholder="如持有多证，优先填入部级执法证号" v-model.trim="form.ministerialNo"></el-input>
                    </el-form-item>
                    <el-form-item label="现持省内执法证号">
                        <el-input placeholder="请输入现持省内执法证号" v-model.trim="form.provinceNo"></el-input>
                    </el-form-item>
                    <el-form-item label="现持海事执法证号" prop="maritimeNo">
                        <el-input placeholder="请输入现持海事执法证号" v-model.trim="form.maritimeNo"></el-input>
                    </el-form-item>
                    <el-form-item label="所在单位" prop="currentUnit">
                        <el-input placeholder="请输入所在单位" v-model.trim="form.currentUnit"></el-input>
                    </el-form-item>
                    <el-form-item label="省级行政区划" prop="provinceDivision">
                        <!-- <el-input placeholder="请输入省级行政区划" v-model.trim="form.provinceDivision" readonly></el-input> -->
                        <el-select v-model="form.provinceDivision" @change="changeIndex($event)" placeholder="请选择">
                            <el-option v-for="(item, index) in provinceDivisionList"  :key="index" :label="item.pykhDivisionVo.name"
                                :value="item.pykhDivisionVo.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="地市行政区划" prop="cityDivision">
                        <el-select v-model="form.cityDivision" placeholder="请选择">
                            <el-option v-for="(item, index) in cityDivisionList" :key="index" :label="item.name"
                                :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职务" prop="jobTitle">
                        <el-input placeholder="请输入职务" v-model.trim="form.jobTitle"></el-input>
                    </el-form-item>
                    <el-form-item label="是否为领导班子成员" prop="leaderShip">
                        <el-radio-group v-model.trim="form.leaderShip">
                            <el-radio label="是" value="0"></el-radio>
                            <el-radio label="否" value="1"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addOrUpdatePykhStaff" type="primary" class="btn-custom">
                        <span>确 定</span>
                    </el-button>
                </div>
            </el-dialog>
            <el-dialog :visible.sync="visible1" title="人员详情" width="480px">
                <el-form :label-position="labelPosition" v-if="viewForm" :model="viewForm" ref="viewForm"
                    label-width="160px">
                    <el-form-item label="姓名">
                        <!-- <el-input placeholder="请输入姓名" disabled v-model.trim="viewForm.staffName"></el-input> -->
                        {{viewForm.staffName}}
                    </el-form-item>
                    <el-form-item label="身份证号">
                        <!-- <el-input placeholder="请输入身份证号" disabled v-model.trim="viewForm.idCard"></el-input> -->

                        {{viewForm.idCard}}
                    </el-form-item>
                    <el-form-item label="现持部级执法证号">
                        <!-- <el-input placeholder="请输入现持部级执法证号" disabled v-model.trim="viewForm.ministerialNo"></el-input> -->
                        {{viewForm.ministerialNo}}
                    </el-form-item>
                    <el-form-item label="现持省内执法证号">
                        <!-- <el-input placeholder="请输入现持省内执法证号" disabled v-model.trim="viewForm.provinceNo"></el-input> -->
                        {{viewForm.provinceNo}}
                    </el-form-item>
                    <el-form-item label="现持海事执法证号">
                        <!-- <el-input placeholder="请输入现持海事执法证号" disabled v-model.trim="viewForm.maritimeNo"></el-input>
             -->
                        {{viewForm.maritimeNo}}
                    </el-form-item>
                    <el-form-item label="所在单位">
                        <!-- <el-input placeholder="请输入所在单位" disabled v-model.trim="viewForm.currentUnit"></el-input> -->
                        {{viewForm.currentUnit}}
                    </el-form-item>
                    <el-form-item label="省级行政区划">
                        <!-- <el-input placeholder="请输入省级行政区划" disabled v-model.trim="viewForm.provinceDivision" readonly></el-input> -->
                        {{viewForm.provinceDivision}}
                    </el-form-item>
                    <el-form-item label="地市行政区划">
                        <!-- <el-select v-model="viewForm.cityDivision" disabled placeholder="请选择">
              <el-option v-for="(item, index) in cityDivisionList" :key="index" :label="item.name" :value="item.name"></el-option>
            </el-select> -->
                        {{viewForm.cityDivision}}
                    </el-form-item>
                    <el-form-item label="职务">
                        <!-- <el-input placeholder="请输入职务" disabled v-model.trim="viewForm.jobTitle"></el-input> -->
                        {{viewForm.jobTitle}}
                    </el-form-item>
                    <el-form-item label="是否为领导班子成员">
                        <el-radio-group v-model.trim="viewForm.leaderShip" disabled>
                            <el-radio label="是" value="0"></el-radio>
                            <el-radio label="否" value="1"></el-radio>
                        </el-radio-group>
                        <!-- {{viewForm.leaderShip}} -->
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="visible1= false" type="primary" class="btn-custom">
                        <span>关闭</span>
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
        <el-dialog title="查看" :visible.sync="dialogVisible" width="460px" height="600px" v-if="dialogImageUrl"
            :before-close="beforeClose">
            <img width="413px" height="626px" :src="dialogImageUrl" alt="" />
        </el-dialog>
    </div>
</template>
<script>
    import {
        findPykhStaffByPage,
        importPerson,
        addOrUpdatePykhStaff,
        findAllDepartment,
        confirmSubmissionStaff,
        deletePykhStaff,
        getCountInfo
    } from '@/api/pykh/catsAppraisalExamPersonUpload.js'
    import {
        findPykhOrgan
    } from '@/api/pykh/catsAppraisalExamCaseUpload.js'
    import {
        getFileStreamByStorageId
    } from "@/api/pykh/catsAppraisalExamCaseUpload.js";
    import {
        uploadFuncO
    } from '@/api/upload'
    import iLocalStroage from '@/common/js/localStroage'
    import viewNotice from '../noticeManage/viewNotice'
    import {
        validateIDNumber,
        isInteger_8_10,
        isInteger_10
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
                countInfo: null,
                current: 1,
                size: 10,
                total: 0,
                search: {
                    staffName: '',
                    oId: ''
                },
                organList: [],
                organId: '',
                dataList: [],
                visible: false,
                labelPosition: 'right',
                form: {
                    oId: '',
                    enforcementCertificate: '',
                    idCard: '',
                    maritimeNo: '',
                    ministerialNo: '',
                    provinceNo: '',
                    staffName: '',
                    currentUnit: '',
                    provinceDivision: '',
                    cityDivision: '',
                    jobTitle: '',
                    leaderShip: ''
                },
                viewForm: null,
                visible1: false,
                baosongStatus: true,
                dialogImageUrl: '',
                dialogVisible: false,
                uploadHeaders: {
                    Authorization: ''
                },
                rules: {
                    staffName: [{
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }],
                    idCard: [{
                            required: true,
                            message: '身份证号不能为空',
                            trigger: 'blur'
                        },
                        {
                            validator: validateIDNumber,
                            trigger: 'blur'
                        }
                    ],
                    ministerialNo: [{
                        validator: isInteger_8_10,
                        trigger: 'blur'
                    }],
                    maritimeNo: [{
                        validator: isInteger_10,
                        trigger: 'blur'
                    }],
                    leaderShip: [{
                        required: true,
                        message: '请输入是否为本单位领导班子成员',
                        trigger: 'change'
                    }],
                    jobTitle: [{
                        required: true,
                        message: '请输入职务',
                        trigger: 'blur'
                    }],
                    cityDivision: [{
                        required: true,
                        message: '请选择地市行政区划',
                        trigger: 'blur'
                    }],
                    provinceDivision: [{
                        required: true,
                        message: '请选择省级行政区划',
                        trigger: 'blur'
                    }],
                    currentUnit: [{
                        required: true,
                        message: '请输入所在单位',
                        trigger: 'blur'
                    }]
                },
                tjData: null,
                cityDivisionList: [],
                provinceDivisionList:[],
            }
        },

        methods: {
            beforeClose() {
                this.dialogImageUrl = ''
                this.dialogVisible = true
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
                // debugger
                let acceptList = accept.toLowerCase().split(',')
                let acceptBoo = true
                for (var i = 0; i < acceptList.length; i++) {
                    if (param.file.name.indexOf(acceptList[i]) > -1) {
                        acceptBoo = false
                    }
                }
                if (acceptBoo) {
                    this.$message.error('上传文件格式为 "' + accept + '" 文件,请重新上传')
                    this.fileList = []
                    this.$refs.uploadImgRef.clearFiles()
                    return
                }
                var fd = new FormData()
                fd.append('file', param.file)
                fd.append('userId', iLocalStroage.gets('userInfo').id)
                fd.append('category', '人员报送')
                fd.append('docId', row.staffId)
                fd.append('businessTypeId', '1')
                fd.append('businessId', row.staffId)
                fd.append('storageId', row.storageId ? row.storageId : '')
                let _this = this
                uploadFuncO.uploadPykh(fd).then(
                    res => {
                        if (res.code == 200) {
                            row.storageId = res.data
                            row.fjStatus = '1'
                            _this.catsMessage({
                                type: 'success',
                                message: '上传成功!'
                            })
                            _this.fileList = []
                            _this.$refs.uploadImgRef.clearFiles()
                        } else {
                            _this.fileList = []
                            _this.$refs.uploadImgRef.clearFiles()
                            _this.$message.error('出现异常，添加失败！')
                        }
                    },
                    error => {
                        _this.fileList = []
                        _this.$refs.uploadImgRef.clearFiles()
                    }
                )
            },
            view(row) {
                getFileStreamByStorageId(row.storageId).then(res => {
                    const blob = new Blob([res], {
                        type: 'application/octet-stream'
                    });
                    let objectUrl = window.URL.createObjectURL(blob);
                    this.dialogImageUrl = objectUrl;
                })
                this.dialogVisible = true
            },
            fetchData(data) {
                data.current = this.current
                data.size = this.size
                data.oId = this.organId
                let _this = this
                findPykhStaffByPage(data).then(res => {
                    console.info('根据条件分页查询人员列表:', res)
                    if (res.code == 200) {
                        _this.dataList = res.data.records
                        _this.total = res.data.total
                        _this.current = res.data.current
                    }
                })
            },
            download_excel() {},
            handleSizeChange(val) {
                this.current = 1
                this.size = val
                this.fetchData({})
            },
            handleCurrentChange(val) {
                this.current = val
                this.fetchData({})
            },
            resetSearch() {
                this.search = {
                    staffName: '',
                    oId: ''
                }
            },
            searchData(current) {
                this.current = current
                let data = {}
                data.staffName = this.search.staffName
                data.oId = this.search.oId
                this.fetchData(data)
            },
            uploadPerson(param) {
                var fd = new FormData()
                fd.append('file', param.file)
                fd.append('oId', this.organId)
                let _this = this
                importPerson(fd).then(
                    res => {
                        console.log(res)
                        if (res.code == 200) {
                            // this.catsMessage({type: "success",message: res.msg});
                            _this.catsMessage({
                                type: 'success',
                                message: '上传成功' +
                                    res.data.successNum +
                                    '条数据,' +
                                    '上传失败' +
                                    res.data.failNum +
                                    '条数据'
                            })
                            if(res.data.messages.length !=0){
                              _this.failReasons=res.data.messages;
                              _this.failReasonsType=true;
                            }
                            _this.fetchData({})
                            _this.getCountInfo()
                        } else {
                            this.$message.error(res.msg);
                        }
                    },
                    error => {
                        console.log(error)
                    }
                )
            },
            add_openDialog() {
                this.visible = true
                this.form = {
                    batchId: '',
                    oId: this.organId,
                    enforcementCertificate: '',
                    idCard: '',
                    maritimeNo: '',
                    ministerialNo: '',
                    provinceNo: '',
                    staffName: '',
                    provinceDivision: ''
                }
            },
            update_openDialog(data) {
                this.form = JSON.parse(JSON.stringify(data))
                this.visible = true
            },
            view_openDialog(data) {
                this.viewForm = JSON.parse(JSON.stringify(data))
                this.visible1 = true
            },
            addOrUpdatePykhStaff() {
                let _this = this
                this.$refs['formRY'].validate(valid => {
                    if (valid) {
                        addOrUpdatePykhStaff(_this.form).then(res => {
                            console.info('保存报送人员结果：', res)
                            if (res.code == 200) {
                                _this.$refs.formRY.resetFields()
                                _this.visible = false
                                _this.fetchData({})
                                _this.getCountInfo()
                            }else{
                                this.$message.error(res.msg);
                            }
                        })
                    } else {
                        _this.catsMessage({
                            type: 'error',
                            message: '信息填写错误！'
                        })
                        _this.closeLoading()
                        return false
                    }
                })
            },
            deleteStaff(data) {
                var that = this
                let staffId = data.staffId
                deletePykhStaff(staffId).then(res => {
                    if (res.code === 200) {
                        that.catsMessage({
                            type: 'success',
                            message: res.msg
                        })
                        that.fetchData({})
                        that.getCountInfo()
                    } else {
                        this.$message.error(res.msg);
                    }
                })
            },
            findPersonBsStatus() {
                let data = {}
                data.oId = this.organId
                data.bsStatus = 1
                findPykhStaffByPage(data).then(res => {
                    if (res.code == 200) {
                        if (res.data.total > 0) {
                            this.baosongStatus = false
                        }
                    }
                })
            },
            clickBaosong() {
                let _this = this
                confirmSubmissionStaff(this.organId).then(res => {
                    if (res.code === 200) {
                        _this.findPersonBsStatus()
                        _this.fetchData({})
                    } else {
                        this.$message.error(res.msg);
                    }
                })
            },
            async findPykhStaffCountInfo() {
                this.countInfo = await findPykhStaffCountInfo()
            },
            getCountInfo() {
                getCountInfo().then(res => {
                    if (res.code === 200) {
                        this.tjData = res.data
                        this.showEcharts()
                    } else {
                        this.$message.error(res.msg);
                    }
                })
            },
            showIndex(index) {
                this.btnCheckIndex = index
            },
            showEcharts() {
                let data1 = []
                let data2 = []
                if(!this.tjData.cityDivisionMap){
                  return;
                }
                Object.keys(this.tjData.cityDivisionMap).forEach(k => {
                    data1.push(k)
                    data2.push(this.tjData.cityDivisionMap[k])
                })
                let myChart = echarts.init(document.getElementById('myChart'))
                myChart.setOption({
                    title: {
                        text: '人员按所在地区分布情况'
                    },
                    tooltip: {
                        trigger: 'item',
                        position: 'top'
                    },
                    xAxis: {
                        name: '市级行政区划',
                        nameLocation: 'center',
                        nameGap: 30,
                        type: 'category',
                        data: data1
                    },
                    yAxis: {
                        name: '执法人员数量',

                        type: 'value',
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    series: [{
                        data: data2,
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(220, 220, 220, 0.5)'
                        },
                        itemStyle: {
                            color: '#4477E0'
                        }
                    }]
                })
            },
            findPykhOrgan() {
                let _this = this
                findPykhOrgan().then(res => {
                    if (res.code == 200) {
                        _this.provinceDivisionList=res.data;
                    } else {
                        this.$message.error(res.msg);
                    }
                })
            }
        },
        mounted() {
            let userInfo = iLocalStroage.gets('userInfo')
            this.organId = userInfo.organId

            this.findPersonBsStatus()
            this.fetchData({})
            this.findPykhOrgan()
            // this.showEcharts();
            // this.findPykhStaffCountInfo();
            this.getCountInfo()
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
