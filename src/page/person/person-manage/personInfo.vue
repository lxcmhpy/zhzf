<template>
    <div class="com_searchAndpageBoxPadding">
        <div class="searchAndpageBox" id="logBox">
            <div class="handlePart">
                <div class="search">
                    <el-form :inline="true" :model="personForm"  ref="personForm">
                    <!-- <el-row> <el-col :span="13"> -->
                        <el-row style="height:40px;">
                            <el-form-item label="id" v-show="false" prop="personId">
                                <el-input v-model="personForm.personId"></el-input>
                            </el-form-item>
                            <el-form-item label="人员姓名" prop="personName">
                                <el-input v-model="personForm.personName"></el-input>
                            </el-form-item>
                            <el-form-item label="执法证号" prop="zfzh">
                                <el-input v-model="personForm.zfzh"></el-input>
                            </el-form-item>
                            <el-form-item label="身份证号" prop="idNo">
                                <el-input v-model="personForm.idNo"></el-input>
                            </el-form-item>
                            <el-form-item label="执法门类" prop="idNo">
                                <el-input v-model="personForm.idNo"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" icon="el-icon-plus" size="medium" @click="addPersonPersonComPage">新增</el-button>
                                <el-button type="warning" size="medium" @click="editPerson(scope.row)">修改</el-button>
                                <el-button type="primary" size="medium" >调离</el-button>
                                <el-button type="primary" size="medium" >照片</el-button>
                                <el-button type="primary" size="medium" >导出</el-button>
                                <el-button type="primary" size="medium" @click="resetLog">重置</el-button>
                            </el-form-item>
                        </el-row>
                        <el-row style="height:40px;">
                            <el-form-item label="所属机构" prop="ssjg">
                                <el-select v-model="personForm.ssjg" placeholder="选择机构" remote  @focus="getDepatements('0a9499dd0612b0b2950acacedf47b97a')">
                                     <el-option
                                         v-for="(value) in departments" :key="value.id" :label="value.name" :value="value.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="证件状态" prop="idNo">
                                <el-input v-model="personForm.idNo"></el-input>
                            </el-form-item>
                            <el-form-item label="人员类型" prop="idNo">
                                <el-input v-model="personForm.idNo"></el-input>
                            </el-form-item>
                            <el-form-item label="职务名称" prop="idNo">
                                <el-input v-model="personForm.idNo"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="info" icon="el-icon-search" size="medium" @click="getPersonList">查询</el-button>
                                <el-button type="primary" size="medium" @click="deletePerson">批量删除</el-button>
                                <el-button type="primary" size="medium" @click="applyAudit">申请审批</el-button>
                                <el-button type="primary" size="medium" @click="applyDd">申请调动</el-button>
                                <!-- <el-button type="primary" size="medium" >申请退休</el-button>
                                <el-button type="primary" size="medium" >批量换证</el-button> -->
                            </el-form-item>
                        </el-row>
                    </el-form>
                </div>
            </div>
            <div class="tablePart" style="margin-top:-35px">
                <el-table :data="tableData"
                     stripe
                     style="width: 100%;height:100%;"
                     @selection-change="selectUser"
                >
                    <el-table-column type="selection" align="center"></el-table-column>
                    <el-table-column prop="personName" label="姓名" align="center"></el-table-column>
                    <el-table-column prop="sex" label="性别" align="center"></el-table-column>
                    <el-table-column prop="prof" label="职务" align="center"></el-table-column>
                    <el-table-column prop="zfzh" label="执法证号" align="center"></el-table-column>
                    <el-table-column prop="idNo" label="身份证号" align="center"></el-table-column>
                    <el-table-column prop="zfml" label="执法门类" align="center"></el-table-column>
                    <el-table-column prop="zjzt" label="证件状态" align="center"></el-table-column>
                    <el-table-column prop="ssjg" label="所属机构" align="center"></el-table-column>
                    <el-table-column prop="opt" label="操作项" align="center">
                         <template slot-scope="scope">
                            <el-button  @click="editPerson(scope.row)" type="text">修改</el-button>
                            <el-button type="text"  @click="deletePersonById(scope.row)">删除</el-button>
                            <el-button type="text"  @click="getDetailInfo(scope.row)">人员详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
           </div>
           <div class="paginationBox">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    background
                    :page-sizes="[10, 20, 30, 40, 50]"
                    layout="prev, pager, next,sizes,jumper"
                    :total="totalPage"
                ></el-pagination>
            </div>
        </div>
        <!-- 新增执法人员添加页面 -->
        <addPersonComp ref="addPersonCompRef" @getAllPersons="getPersonList"></addPersonComp>


    </div>
</template>
<script>
import addPersonComp from "./addPerson";
import personInfo from "./../../../components/personComponents/personInfo"
export default {
    data(){
        return{
            currentPage: 1, //当前页
            pageSize: 10,   //pagesize
            totalPage: 0,   //总页数
            tableData: [],
            departments:[],//存放机构
            personForm: {
                personsId:"",//id
                idNo: "",     //身份证号
                personName:"",//执法人名
                prof:"",//职务
                sex:"",//性别
                zfml:"",//执法门类
                zfzh:"",//执法证号
                zjzt:"",//证件状态
                ssjg:"",//所属机构
            },
            selectUserIdList:[],//选中执法人员id
        }
    },
    components:{//新增组件
        addPersonComp,
        personInfo,
    },
    methods:{
        //点击添加tab标签，查看人员详情信息
        getDetailInfo(row){
            console.info(row);
            this.$router.replace({
                name: 'personDetailPage',
                params: {
                caseInfo: "",
                isApproval:true
                }
            });
        },
        //点击下拉框的时候后头获取下拉框数据
        getDepatements(pid){
            if(this.departments.length==0){
                // this.$store.dispatch("getDictInfoAll",nameStr).then( //查询字典所有的接口
                this.$store.dispatch("getDictInfoByCode",pid).then(    //根据pid查询字典数据
                    res=>{
                        if(res.code===200){
                            this.departments=res.data;
                        }else{
                            console.info("没有查询到数据");
                        }
                    },
                    err => {
                        console.log(err);
                    }
                ).catch(()=>{});
            }
        },
        //修改人员信息
        editPerson(row) {
            this.$refs.addPersonCompRef.showModal(2, row);
        },
        //根据id删除单个人员信息
        deletePersonById(row){
            this.$confirm("确定要删除该人员吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.$store.dispatch("deletePersonInfoById", row.personId).then(
                    res => {
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                        //重新加载页面数据
                        this.getPersonList();
                    },
                    err => {
                    console.log(err);
                    }
                );
            }).catch(() => {});
        },
        //删除所选择的用户信息
        deletePerson(){
            this.$confirm("确定要删除所选的人员吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.$store.dispatch("deletePersonInfo", this.selectUserIdList).then(
                    res => {
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                        //重新加载页面数据
                        this.getPersonList();
                    },
                    err => {
                    console.log(err);
                    }
                );
                })
                .catch(() => {});
        },
        addPersonPersonComPage(){
            this.$refs.addPersonCompRef.showModal(1,"");
        },
        //根据查询条件查询人员基本信息
        getPersonList() {
            let data = {
                personId:this.personForm.personId,
                idNo: this.personForm.idNo,
                personName: this.personForm.personName,
                sex: this.personForm.sex,
                prof:this.personForm.prof,
                zfzh:this.personForm.zfzh,
                zfml:this.personForm.zfml,
                ssjg:this.personForm.ssjg,
                zjzt:this.personForm.zjzt,
                current: this.currentPage,
                size: this.pageSize
            };
            this.$store.dispatch("getAllPerson", data).then(res => {
                this.tableData = res.data.records;
                this.totalPage = res.data.total;
            });
            err => {
                console.log(err);
            };
        },
        //申请调离
        dlPerson(){

        },
        //申请审批
        applyAudit(){

        },
        //申请调动
        applyDd(){

        },
        // 日志重置
        resetLog() {
            this.$refs["personForm"].resetFields();
        },
        //更改每页显示的条数
        handleSizeChange(val) {
            this.pageSize = val;
            this.getPersonList();
        },
        //更换页码
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getPersonList();
        },
         //获取选中的user
        selectUser(val) {
            this.selectUserIdList = [];
            val.forEach((item,index) => {
                this.selectUserIdList.push(item.personId);
            });
        }
    },
    created() {
        this.getPersonList();
    }
}
</script>
<style lang="less">
@import "../../../css/personManage.less";
</style>
