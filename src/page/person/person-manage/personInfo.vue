<template>
    <div class="com_searchAndpageBoxPadding">
        <div class="searchPage toggleBox">
            <div class="handlePart">
                <el-form :inline="true" :model="personForm"  ref="personForm">
                        <el-form-item label="id" v-show="false" prop="personId">
                            <el-input v-model="personForm.personId"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名" prop="personName" placeholder="姓名">
                            <el-input v-model="personForm.personName"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号" prop="idNo" placeholder="身份证号">
                            <el-input v-model="personForm.idNo"></el-input>
                        </el-form-item>
                        <el-form-item label="执法证号" prop="certNo" placeholder="执法证号">
                            <el-input v-model="personForm.certNo"></el-input>
                        </el-form-item>
                        <el-form-item label="执法领域" prop="branchId">
                            <el-select v-model="personForm.branchId" placeholder="执法领域" remote  @focus="getDepatements('0a9499dd0612b0b2950acacedf47b97a','branchIdsInfo')">
                                <el-option
                                    v-for="value in branchIdsInfo" :key="value.id" :label="value.name" :value="value.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属机构" prop="oid">
                            <el-select v-model="personForm.oid" placeholder="选择所属机构" remote  @focus="getDepatements('0a9499dd0612b0b2950acacedf47b97a','oidsInfo')">
                                <el-option
                                    v-for="value in oidsInfo" :key="value.id" :label="value.name" :value="value.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="岗位" prop="stationId">
                            <el-select v-model="personForm.stationId" placeholder="选择岗位" remote  @focus="getDepatements('0a9499dd0612b0b2950acacedf47b97a','stationIdsInfo')">
                                <el-option
                                    v-for="value in branchIdsInfo" :key="value.id" :label="value.name" :value="value.id">
                                </el-option>    
                            </el-select>
                        </el-form-item>
                        <el-form-item label="岗位状态" prop="oid">
                            <el-select v-model="personForm.oid" placeholder="选择岗位状态" remote  @focus="getDepatements('0a9499dd0612b0b2950acacedf47b97a','oidsInfo')">
                                <el-option
                                    v-for="value in oidsInfo" :key="value.id" :label="value.name" :value="value.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button title="搜索" class="commonBtn searchBtn" size="medium" icon="iconfont law-sousuo"   @click="getPersonList"></el-button>
                            <el-button title="重置" class="commonBtn searchBtn" size="medium" icon="iconfont law-zhongzhi" @click="resetLog"></el-button>
                            <el-button size="medium" class="commonBtn toogleBtn" :title="isShow? '点击收缩':'点击展开'" :icon="isShow? 'iconfont law-top': 'iconfont law-down'" @click="showSomeSearch" ></el-button>
                        </el-form-item>
                        <el-collapse-transition>
                            <div v-show="isShow" :class="{'ransition-box':true}">
                                <el-form-item>
                                    <el-button type="info"   icon="el-icon-plus" size="medium" @click="getDetailInfo('','1')">新增人员</el-button>
                                    <el-button type="warning" icon ="el-icon-delete-solid" size="medium" @click="deletePerson">删除人员</el-button>
                                    <el-button plain size="medium" @click="applyDd">申请调动</el-button>
                                    <el-button plain size="medium">申请退休</el-button>
                                    <el-button plain size="medium" @click="applyDd">申请调离</el-button>
                                </el-form-item>
                            </div>
                    </el-collapse-transition>
                </el-form>
            </div>
            <div class="tablePart">
                <el-table :data="tableData" resizable stripe  style="width: 100%;height:100%;"  @selection-change="selectUser">
                    <el-table-column type="selection" align="center"></el-table-column>
                    <el-table-column prop="personName" label="姓名" align="center"></el-table-column>
                    <el-table-column prop="sex" label="性别" align="center"></el-table-column>
                    <el-table-column prop="idNo" label="身份证号" align="center"></el-table-column>
                    <el-table-column prop="birthDate" label="出生日期" align="center"></el-table-column>
                    <el-table-column prop="oid" label="所属机构" align="center"></el-table-column>
                    <el-table-column prop="post" label="职务" align="center"></el-table-column>
                    <el-table-column prop="stationIdName" label="岗位" align="center"></el-table-column>
                    <el-table-column prop="post" label="岗位状态" align="center"></el-table-column>
                    <el-table-column prop="certNo" label="执法证号" align="center"></el-table-column>
                    <el-table-column prop="branchId" label="执法领域" align="center"></el-table-column>
                    <el-table-column prop="opt" label="操作项" align="center">
                        <template slot-scope="scope">
                            <!--<el-button  @click="editPerson(scope.row)" type="text">修改</el-button>
                            <el-button type="text"  @click="deletePersonById(scope.row)">删除</el-button>-->
                            <el-button type="text"  @click="getDetailInfo(scope.row,'0')">详情</el-button>
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
        <!-- 新增执法人员添加页面
        <addPersonComp ref="addPersonCompRef" @getAllPersons="getPersonList"></addPersonComp> -->
    </div>
</template>
<script>
import addPersonComp from "./addPerson";
export default {
    data(){
        return{
            branchIdsInfo: [],
            oidsInfo: [],
            stationIdsInfo:[],
            currentPage: 1, //当前页
            pageSize: 10,   //pagesize
            totalPage: 0,   //总页数
            tableData: [],
            isShow: false,
            personForm: {
                branchIdName:"",
                personTypeName:"",
                sex:"",
                sexName:"",
                personsId:"",//id
                idNo: "",     //身份证号
                personName:"",//执法人名
                birthDate:"",//出生日期
                nation:"",//民族
                degree:"",//学历
                politicalStatus:"",//政治面貌
                admissionDate:"",//入党日期
                school:"",//毕业学校
                major:"",//专业
                graduationNo:"",//
                oidName:"",//所属机构
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
                certStatusName:"",//证件状态
                personStatus:"",//人员状态
                attachedUrl:"",//附件路径
                attached:"",//附件
                photoUrl:"",//照片路径
                personType:"",//人员类型
                nationName:"",
                stationId:"",//岗位id
                stationIdName:"",//岗位名称
            },
            selectUserIdList:[],//选中执法人员id
        }
    },
    //components:{//新增组件
    //    addPersonComp,
    //},
    methods:{
         //展开
        showSomeSearch() {
            this.isShow = !this.isShow;
        },
        //点击添加tab标签，查看人员详情信息
        getDetailInfo(row,param){
            this.$store.commit("setPersonInfo", row,param);
            this.$router.replace({
                name: 'personDetailPage',
                params:{
                    personInfo:row,
                    pageStatus:param,
                }
            });
        },
        //点击下拉框的时候后头获取下拉框数据
        getDepatements(pid,codeName){
            if(codeName==='branchIdsInfo'){
                if(this.branchIdsInfo.length===0){
                    this.$store.dispatch("getDictInfoByCode",pid).then(    //根据pid查询字典数据
                        res=>{
                            if(res.code===200){
                                this.branchIdsInfo=res.data;
                            }else{
                                console.info("没有查询到数据");
                            }
                        },
                        err => {
                            console.log(err);
                        }
                    ).catch(()=>{});
                }
            }
            if(codeName==='stationIdsInfo'){
                if(this.certStatussInfo.length===0){
                    this.$store.dispatch("getDictInfoByCode",pid).then(    //根据pid查询字典数据
                        res=>{
                            if(res.code===200){
                                this.stationIdsInfo=res.data;
                            }else{
                                console.info("没有查询到数据");
                            }
                        },
                        err => {
                            console.log(err);
                        }
                    ).catch(()=>{});
                }
            }
            if(codeName==='oidsInfo'){
                if(this.oidsInfo.length===0){
                    this.$store.dispatch("getDictInfoByCode",pid).then(    //根据pid查询字典数据
                        res=>{
                            if(res.code===200){
                                this.oidsInfo=res.data;
                            }else{
                                console.info("没有查询到数据");
                            }
                        },
                        err => {
                            console.log(err);
                        }
                    ).catch(()=>{});
                }
            }
        },
        //修改人员信息
        editPerson(row) {
            this.$refs.addPersonCompRef.showModal(2, row);
        },
        //根据id删除单个人员信息
        deletePersonById(row){
            let _this = this
            this.$confirm("确定要删除该人员吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                _this.$store.dispatch("deletePersonInfoById", row.personId).then(
                    res => {
                        _this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                        //重新加载页面数据
                        _this.getPersonList();
                    },
                    err => {
                    console.log(err);
                    }
                );
            }).catch(() => {});
        },
        //删除所选择的用户信息
        deletePerson(){
            let _this = this
            this.$confirm("确定要删除所选的人员吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                _this.$store.dispatch("deletePersonInfo", _this.selectUserIdList).then(
                    res => {
                        _this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                        //重新加载页面数据
                        _this.getPersonList();
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
                personName:this.personForm.personName,
                idNo: this.personForm.idNo,
                certNo: this.personForm.certNo,
                idNo: this.personForm.idNo,
                branchId:this.personForm.branchId,
                oid:this.personForm.oid,
                certStatus:this.personForm.certStatus,
                personType:this.personForm.personType,
                post:this.personForm.post,
                current: this.currentPage,
                size: this.pageSize
            };
            let _this = this
            this.$store.dispatch("getAllPerson", data).then(res => {
                _this.tableData = res.data.records;
                _this.totalPage = res.data.total;
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
            let _this = this
            val.forEach((item,index) => {
                _this.selectUserIdList.push(item.personId);
            });
        }
    },
    created() {
        this.getPersonList();
    }
}
</script>

<style  lang="scss" scoped>
@import "@/assets/css/searchPage.scss";
@import "@/assets/css/personManage.scss";
</style>
