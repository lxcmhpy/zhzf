<template>
    <div class="com_searchAndpageBoxPadding">
        <div class="searchAndpageBox" id="logBox">
            <div class="handlePart">
                <el-form :inline="true" :model="personForm"  ref="personForm">
                    <el-row style="height:40px;">
                        <el-form-item label="id" v-show="false" prop="personId">
                            <el-input v-model="personForm.personId"></el-input>
                        </el-form-item>
                        <el-form-item label="人员姓名" prop="personName">
                            <el-input v-model="personForm.personName"></el-input>
                        </el-form-item>
                        <el-form-item label="执法证号" prop="certNo">
                            <el-input v-model="personForm.certNo"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号" prop="idNo">
                            <el-input v-model="personForm.idNo"></el-input>
                        </el-form-item>
                        <el-form-item label="执法门类" prop="branchId">
                            <el-input v-model="personForm.branchId"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-plus"   size="medium" @click="addPersonPersonComPage">新增</el-button>
                            <el-button type="warning" icon="el-icon-edit"   size="medium" @click="editPerson(scope.row)">修改</el-button>
                            <el-button type="info"    icon="el-icon-search" size="medium" @click="getPersonList">查询</el-button>
                            <el-button size="medium"  class="commonBtn toogleBtn" 
                                :title="isShow? '点击收缩':'点击展开'" 
                                :icon="isShow? 'iconfont law-top': 'iconfont law-down'" 
                                @click="showSomeSearch" >
                            </el-button>
                        </el-form-item>
                    </el-row>
                     <transition name="MyFade">
                        <el-collapse-transition>
                            <div v-show="isShow">
                                <el-row style="height:40px;">
                                    <el-form-item label="所属机构" prop="oid">
                                        <el-select v-model="personForm.oid" placeholder="选择机构" 
                                            remote  style="width:202px;"
                                            @focus="getDepatements('0a9499dd0612b0b2950acacedf47b97a')">
                                            <el-option
                                                v-for="(value) in departments" :key="value.id" :label="value.name" :value="value.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="证件状态" prop="certStatus">
                                        <el-input v-model="personForm.certStatus"></el-input>
                                    </el-form-item>
                                    <el-form-item label="人员类型" prop="personType">
                                        <el-input v-model="personForm.personType"></el-input>
                                    </el-form-item>
                                    <el-form-item label="职务名称" prop="idNo">
                                        <el-input v-model="personForm.post"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" size="medium" icon="el-icon-top-right">导出</el-button>
                                        <el-button type="success" size="medium" icon="el-icon-upload2">调离</el-button>
                                        <el-button type="danger" size="medium" icon="el-icon-delete-solid" @click="resetLog">重置</el-button>
                                    </el-form-item>
                                </el-row>
                                <el-row style="height:40px;">
                                    <el-form-item>
                                        <el-button type="primary" size="medium" @click="deletePerson">批量删除</el-button>
                                        <el-button type="primary" size="medium" @click="applyAudit">申请审批</el-button> 
                                        <el-button type="primary" size="medium" @click="applyDd">申请调动</el-button>
                                        <el-button type="primary" size="medium">申请退休</el-button>
                                        <el-button type="primary" size="medium">批量换证</el-button>
                                        <el-button type="primary" size="medium">批量换证</el-button>
                                        <el-button type="primary" size="medium" >导出所选人照片</el-button>
                                    </el-form-item>
                                </el-row>
                            </div>
                        </el-collapse-transition>
                    </transition>
                </el-form>
            </div>
            <div class="tablePart" :style="marginTopValue">
                <el-table :data="tableData"
                    stripe resizable border
                    style="width: 100%;height:100%;"
                    @selection-change="selectUser"
                >
                    <el-table-column type="selection" align="center"></el-table-column>
                    <el-table-column prop="personName" label="姓名" align="center"></el-table-column>
                    <el-table-column prop="sex" label="性别" align="center"></el-table-column>
                    <el-table-column prop="post" label="职务" align="center"></el-table-column>
                    <el-table-column prop="certNo" label="执法证号" align="center"></el-table-column>
                    <el-table-column prop="idNo" label="身份证号" align="center"></el-table-column>
                    <el-table-column prop="birthDate" label="出生日期" align="center"></el-table-column>
                    <el-table-column prop="oid" label="所属机构" align="center"></el-table-column>
                    <el-table-column prop="branchId" label="执法门类" align="center"></el-table-column>
                    <el-table-column prop="certStatus" label="证件状态" align="center"></el-table-column>
                    <el-table-column prop="opt" label="操作项" align="center">
                        <template slot-scope="scope">
                            <el-button  @click="editPerson(scope.row)" type="text">修改</el-button>
                            <el-button type="text"  @click="deletePersonById(scope.row)">删除</el-button>
                            <el-button type="text"  @click="getDetailInfo(scope.row)">详情</el-button>
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
                birthDate:"",//出生日期
                nation:"",//民族
                degree:"",//学历
                politicalStatus:"",//政治面貌
                admissionDate:"",//入党日期
                school:"",//毕业学校
                major:"",//z专业
                graduationNo:"",//
                oid:"",//所属机构
                post:"",//职务
                disChannel:"",//分配渠道
                staffing:"",//人员编制
                workDate:"",//参加工作时间
                photo:"",//照片
                branchId:"",//执法门类
                enfoceDate:"",//从事执法日期
                certNo:"",//执法证号
                qualificationNo:"",//资格证书编号
                provinceNo:"",//现持省内执法证号 现持省内执法证号
                ministerialNo:"",//现持部级执法证号 现持部级执法证号
                maritimeNo:"",//现持海事执法证号 现持海事执法证号
                note:"",//备注
                certStatus:"",//证件状态
                personStatus:"",//人员状态
                attachedUrl:"",//附件路径 
                attached:"",//附件
                photoUrl:"",//照片路径
                personType:"",//人员类型
            },
            selectUserIdList:[],//选中执法人员id
            isShow: false,
            marginTopValue:{'margin-top': '-70px'},//默认值
            marginTopValue1:{'margin-top': '-70px'},//默认的值
            marginTopValue2:{'margin-top': '0px'},//默认的值
        }
    },
    components:{//新增组件
        addPersonComp,
    },
    methods:{
        //展开
        showSomeSearch() {
            this.isShow = !this.isShow;
            if(this.isShow){
                this.marginTopValue=this.marginTopValue2;
            }else{
                this.marginTopValue=this.marginTopValue1;
            }
        },
        //点击添加tab标签，查看人员详情信息
        getDetailInfo(row){
            this.$store.commit("setPersonInfo", row);
            this.$router.replace({
                name: 'personDetailPage',
                params:{
                    personInfo:row,
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
<style  lang="less" >
@import "../../../css/searchPage";
@import "../../../css/personManage.less";
</style>
