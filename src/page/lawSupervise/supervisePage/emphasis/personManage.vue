<template>
    <div class="com_searchAndpageBoxPadding">
        <div class="searchPage">
            <div class="handlePart">
                <el-form :inline="true" ref="queryForm" :model="queryForm" label-width="120px">
                    <!--查询字段-->
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="queryForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="年份" prop="year">
                        <el-date-picker v-model="queryForm.year" type="year" value-format="yyyy" format="yyyy"></el-date-picker>
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
                    <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                    <el-table-column prop="preType" label="证件类型" align="center" :formatter="formatPreType"></el-table-column>
                    <el-table-column prop="personPassportNo" label="证件号" align="center"></el-table-column>
                    <el-table-column prop="joinCause" label="列入原因" align="center"></el-table-column>
                    <el-table-column prop="unlawfulNumber" label="违法次数" align="center"></el-table-column>
                    <el-table-column label="操作" width="160" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click.stop @click="showDataDetail(scope.row)">查看</el-button>
                            <el-button type="text" @click.stop @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                            <el-button type="text" @click.stop @click="deleteRecord(scope.row)">删除</el-button>
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
                                    <el-form-item label="姓名" prop="name">
                                            <el-input v-model="addForm.name" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="证件类型" prop="personPassportNo">
                                        <el-input ref="personPassportNo" v-model="addForm.personPassportNo"
                                                    class="input-with-select hasMargintop" :readonly="this.formReadOnly">
                                            <el-select slot="prepend" v-model="addForm.preType" :disabled="this.formReadOnly">
                                                <el-option
                                                    v-for="item in preTypeList"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.id"
                                                ></el-option>
                                            </el-select>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="性别" prop="sex">
                                        <el-select v-model="addForm.sex" style="width: 100%;" :disabled="this.formReadOnly">
                                            <el-option
                                                v-for="item in sexList"
                                                :key="item.id"
                                                :label="item.label"
                                                :value="item.id"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="年龄" prop="age">
                                            <el-input v-model="addForm.age" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="联系电话" prop="phoneNumber">
                                            <el-input v-model="addForm.phoneNumber" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="从业资格证号" prop="quaNumber">
                                            <el-input v-model="addForm.quaNumber" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="年份" prop="year">
                                            <el-date-picker v-model="addForm.year" type="year" value-format="yyyy" format="yyyy" style="width: 100%;" :readonly="this.formReadOnly"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="违法次数" prop="unlawfulNumber">
                                            <el-input v-model="addForm.unlawfulNumber" style="width: 100%;" :readonly="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="列入原因" prop="joinCause">
                                            <el-input v-model="addForm.joinCause" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="备注" prop="note">
                                            <el-input
                                                    type="textarea"
                                                    v-model="addForm.note"
                                                    :autosize="{ minRows: 2, maxRows: 3}"
                                                    :readonly="this.formReadOnly"
                                            ></el-input>
                                    </el-form-item>
                                </el-col>
                        </el-row>
                    </el-form>
                    <div class="tableHandle" style="margin-bottom: 10px;" v-if="!this.formReadOnly">
                        <el-button type="primary" size="medium" icon="el-icon-plus"  @click="addSub">添加违法记录</el-button>
                    </div>
                    <div class="tablePart">
                        <el-table
                                :data="subList"
                                ref="subTable"
                                stripe
                        >
                            <!--列表字段-->
                            <el-table-column prop="unlawfulTime" label="违法日期" align="center">
                                <template slot-scope="scope">
                                    <el-date-picker 
                                        v-model="scope.row.unlawfulTime"
                                        type="date" 
                                        value-format="yyyy-MM-dd"
                                        format="yyyy-MM-dd"
                                        style="width: 100%;"
                                        :readonly="formReadOnly"
                                    ></el-date-picker>
                                </template>
                            </el-table-column>
                            <el-table-column prop="unlawfulAddress" label="违法地点" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.unlawfulAddress" :readonly="formReadOnly"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="unlawfulWay" label="违法行为" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.unlawfulWay"  :readonly="formReadOnly"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="recordOrgan" label="记录机构" align="center">
                                <template slot-scope="scope">
                                    <elSelectTree
                                        ref="addRecordOrganTreeObj"
                                        :options="organList"
                                        :value="scope.row.recordOrgan"
                                        :accordion="true"
                                        :props="orgTreeProps"
                                        :filterable="true"
                                        style="width: 100%;"
                                        :disabled="formReadOnly"
                                        @getValue="(val)=>addRecordOrganClick(val,scope.row)">
                                    </elSelectTree>
                                    <el-input style="display:none" v-model="scope.row.recordOrgan"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="160" align="center" v-if="!formReadOnly">
                                <template slot-scope="scope">
                                    <el-button  type="text" @click.stop @click="deleteSub(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div slot="footer" class="dialog-footer" v-show="!this.formReadOnly">
                        <el-button @click="closeDialog">取 消</el-button>
                        <el-button @click="saveOrUpdate('addForm')"  type="primary" class="btn-custom" >
                            <span>确 定</span>
                        </el-button>
                    </div>
                </el-dialog>
        </div>
    </div>
</template>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
<script>
    import { queryEmphasisPerson,findEmphasisPersonById,saveOrUpdateEmphasisPerson,deleteEmphasisPersonById} from "@/api/lawSupervise.js";
    import elSelectTree from '@/components/elSelectTree/elSelectTree';
    import iLocalStroage from '@/common/js/localStroage';
    export default {
        data() {
            // 检验身份证
            var checkIdNoPassSort = (rule, value, callback) => {
                if(this.addForm.preType==="4c4f635d7b892c2b9ef43d828207d970") {
                    // validateIDNumber
                    var reg = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/;
                    if (!reg.test(value) && value) {
                        callback(new Error('身份证格式错误'));
                    } else {
                        this.changePartyIdType(this.addForm.personPassportNo)
                    }
                    callback();
                }else{
                    callback();
                }
            };
            return {
                visible:false,
                formReadOnly:false,
                queryForm: {
                    name:'',
                    year:'',
                },
                addForm:{
                },
                rules: {
                    name:[
                        {required: true, message: "请输入姓名", trigger: "blur"}
                    ],
                    preType:[
                        {required: true, message: "请输入证件类型", trigger: "blur"}
                    ],
                    personPassportNo:[
                        {validator: checkIdNoPassSort, trigger: "blur"}
                    ],
                    year:[
                        {required: true, message: "请输入年份", trigger: "blur"}
                    ],
                    joinCause:[
                        {required: true, message: "请输入列入原因", trigger: "blur"}
                    ],
                },
                userInfo:{},
                tableData: [], //表格数据
                currentPage: 1, //当前页
                pageSize: 10, //pagesize
                totalPage: 0, //总数
                title:"新增重点人员",
                preTypeList:[],
                subList:[],
                organList:[],
                orgTreeProps: {
                    label: "label",
                    value: "id"
                },
                sexList:[
                    {id:"0",label:"男"},
                    {id:"1",label:"女"}
                ]
            };
        },
        components: {
            elSelectTree,
        },
        methods: {
            //自动计算年龄
            changePartyIdType(idCard) {
                let iden = idCard;
                let val = idCard.length;
                let sex = null;
                let myDate = new Date();
                let month = myDate.getMonth() + 1;
                let day = myDate.getDate();
                let age = 0;
                if (val === 18) {
                    age = myDate.getFullYear() - iden.substring(6, 10) - 1;
                    sex = iden.substring(16, 17);
                    if (iden.substring(10, 12) < month || iden.substring(10, 12) == month && iden.substring(12, 14) <= day) age++;

                }
                if (val === 15) {
                    age = myDate.getFullYear() - iden.substring(6, 8) - 1901;
                    sex = iden.substring(13, 14);
                    if (iden.substring(8, 10) < month || iden.substring(8, 10) == month && iden.substring(10, 12) <= day) age++;
                }

                if (sex % 2 === 0) {
                    sex = '1';
                } else {
                    sex = '0';
                };
                this.$set(this.addForm,'age',age)
                this.$set(this.addForm,'sex',sex)
            },
            addRecordOrganClick(val,row){
                this.$refs.addRecordOrganTreeObj.$children[0].handleClose();
                row.recordOrgan=val
            },
            addSub(){
                this.subList.push({})
                this.$set(this.addForm,'unlawfulNumber',this.subList.length)
            },
            deleteSub(index){
                this.subList.splice(index,1)
                this.$set(this.addForm,'unlawfulNumber',this.subList.length)
            },
            async getDrawerDataList(){
                let data = []
                data.push({pid:'09a17db149f76b306c4803abb2faccb5',fieldName:'preTypeList'})
                let res = await this.$store.dispatch("getDrawerList", data)
                this.preTypeList=res.data.preTypeList
            },
            formatPreType(row){
                let data = this.preTypeList.filter(p=>p.id==row.preType)
                if(data && data.length>0){
                    return data[0].name
                }
                return ''
            },
            saveOrUpdate(formName){
                let _this = this
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        _this.addForm.subList=_this.subList
                        saveOrUpdateEmphasisPerson(_this.addForm).then(
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
                this.$refs["queryForm"].resetFields();
                this.queryData(1);
            },
            //表单筛选
            queryData(val) {
                this.currentPage=val
                this.queryForm.size=this.pageSize
                this.queryForm.current=this.currentPage
                let _this = this
                queryEmphasisPerson(this.queryForm).then(res => {
                    _this.totalPage = res.data.total;
                    _this.tableData = res.data.records;
                });
            },
            //新增
            addData() {
                this.addForm = {
                };
                this.subList=[]
                this.title="新增重点人员"
                this.formReadOnly = false
                this.visible = true
            },
            //编辑
            handleEdit(index, row) {
                this.title="修改重点人员"
                this.findEmphasisPersonById(row)
                this.formReadOnly = false
                this.visible = true
            },
            //查看详情
            showDataDetail(row){
                this.title="重点人员"
                this.findEmphasisPersonById(row)
                this.formReadOnly = true
                this.visible = true
            },
            findEmphasisPersonById(row){
                let _this = this
                findEmphasisPersonById(row.id).then(
                    res => {
                        _this.addForm = res.data
                        _this.subList= res.data.subList
                    },
                    err => {
                        console.log(err);
                    }
                );
            },
            // 表格id删除
            deleteRecord(row) {
                let _this = this
                this.$confirm("确认删除该重点人员?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => {
                    deleteEmphasisPersonById(row.id).then(
                        res => {
                            _this.$message({type: "success",message: "删除成功!"});
                            _this.queryData(1)
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
                this.getOrganList()
                this.getDrawerDataList()
            },
            async getOrganList(){
                let res = await this.$store.dispatch('getAllOrgan')
                this.organList = res.data
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
.allotment-form {
    >>> .el-select {
        width: 90px;

        .el-select__caret {
          line-height: 100%;
        }
      }
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
