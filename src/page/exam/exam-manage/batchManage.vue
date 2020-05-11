<template>
    <div class="com_searchAndpageBoxPadding">
        <div class="searchPage toggleBox">
            <div class="handlePart">
                <el-form :inline="true" :model="batchManageForm" label-width="120px;"  ref="batchManageFormRef">
                    <div>
                        <div class="item">
                            <el-row>
                                <el-form-item label="考试名称" prop="examName">
                                    <el-input v-model="batchManageForm.examName"></el-input>
                                </el-form-item>
                                <el-form-item label="考试类型" prop="examType" style="margin-left:20px;">
                                    <el-select v-model="batchManageForm.examType" placeholder="考试类型" remote  @focus="getDictInfo('人员信息-考试类型','examTypeInfo')">
                                        <el-option
                                            v-for="value in examTypeInfo" :key="value.id" :label="value.name" :value="value.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="开始时间" prop="examBegin" style="margin-left:20px;">
                                    <el-date-picker v-model="batchManageForm.examBegin" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择开始时间" clearable></el-date-picker>
                                </el-form-item>
                                <el-form-item label="结束时间" prop="examEnd" style="margin-left:20px;">
                                    <el-date-picker v-model="batchManageForm.examEnd" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择结束时间" clearable>
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item style="margin-left:20px;">
                                    <el-button title="搜索" class="commonBtn searchBtn" size="medium" icon="iconfont law-sousuo"   @click="getExamBatchList"></el-button>
                                    <el-button title="重置" class="commonBtn searchBtn" size="medium" icon="iconfont law-zhongzhi" @click="resetLog"></el-button>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item>
                                    <el-button type="primary"  icon="el-icon-plus" size="medium" @click="addExamBatchInfo">新增考试</el-button>
                                    <el-button style="background-color:#4aafa7;color:white" icon ="el-icon-delete-solid" size="medium" @click="deleteExamBatchInfo">删除考试</el-button>
                                </el-form-item>
                            </el-row>
                        </div>
                    </div>
                </el-form>
            </div>
            <div class="tablePart">
                <div>
                    <el-table :data="tableData" resizable stripe  style="width: 100%;height:100%;"  @selection-change="selectUser">
                        <el-table-column  type="selection" label="全部考试" align="center"></el-table-column>
                        <el-table-column prop="batchId" label="" >
                            <template slot-scope="scope">
                                <P v-if="false" >{{scope.row.batchId}}</P>
                                <p style="line-height:180%"><span style="font-size:18px;font-weight:bold">{{scope.row.examName}}</span>
                                 <span style="float:right">
                                     <i class="el-icon-time" size="small" ></i>
                                        <span style="font-color:grey">{{scope.row.examBegin}}</span>
                                </span>
                                 <span style="float:right">
                                     <i class="el-icon-time" size="small" ></i>
                                      <span style="font-color:grey">{{scope.row.examEnd}}</span>
                                     </span>
                                </p>
                                <p><span>考试类型：{{scope.row.examType}} </span> <span>考试人数：{{scope.row.examSum}} </span> 
                                 <span>发起机构：{{scope.row.examSum}} </span></p>
                                <p>
                                <el-button type="text"  @click="getViewPagelInfo(scope.row,'0')">查看试卷</el-button>
                                <el-button type="text"  @click="getInvigilateInfo(scope.row,'0')">监考管理</el-button>
                                <el-button type="text"  @click="getExamDetailInfo(scope.row,'0')">考试详情</el-button>
                                <el-button type="text"  @click="getExamPersonInfo(scope.row,'0')">参考人员</el-button>
                                <el-button type="text"  @click="getSendResultlInfo(scope.row,'0')">报送成绩</el-button>
                                <el-button type="text"  @click="roomDispathInfo(scope.row,'0')">考场分配</el-button>
                                <el-button type="text"  @click="getSendResultlInfo(scope.row,'0')">配置完成</el-button>
                                
                                </p>
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
        </div>
        <!-- 新增考试 -->
        <addExamBatchComp ref="addExamBatchCompRef" @getExamBatchListComp="getExamBatchList"></addExamBatchComp>
        <addPage ref="addPageCompRef" @getbatchManageComp="getExamBatchList"></addPage>
        <invigilateManage ref="invigilateManageCompRef" @getbatchManageComp="getExamBatchList"></invigilateManage>
        <sendResult ref="sendResultCompRef"  @getbatchManageComp="getExamBatchList"></sendResult>
        <examPerson ref="examPersonCompRef"  @getbatchManageComp="getExamBatchList"></examPerson>
        <examDetail ref="examDetailCompRef"  @getbatchManageComp="getExamBatchList"></examDetail>
        <roomDispath ref="roomDispathCompRef"  @getbatchManageComp="getExamBatchList"></roomDispath>
    </div>
</template>
<script>
import addExamBatchComp from "./addExamBatch";
import addPage from './addPage';
import invigilateManage from './invigilateManage';
import examPerson from './examPerson';
import sendResult from './sendResult';
import examDetail from './examDetail';
import roomDispath from './roomDispath';
import {mixinPerson} from "@/common/js/personComm";
export default {
    mixins:[mixinPerson],
    data(){
        return{
            tableData:[{batchId:'批次1',examName:'诺克萨斯测试题',examBegin:'2019-10-10',examEnd:'2020-10-12',examType:'究极考试',examSum:'200',oName:'部级机构'},
            {batchId:'批次1',examName:'德玛西亚测试题',examBegin:'2019-10-10',examEnd:'2020-10-12',examType:'究极考试',examSum:'200',oName:'部级机构'}
            ],
            examTypeInfo: [{id:'11',name:'模拟考试'},{id:'12',name:'正式考试'}],//考试类型列表
            batchManageForm: {
                batchId:"",//批次id
                examName:"",//考试名称
                examType:"",//考试类型
                examTypeName:"", //考试类型名称
                examBegin:"",//开始时间
                examEnd:"",//结束时间
                oid:"",//发起机构id
                oName:"",//机构名称
            },
            selectUserIdList:[],//选中执法人员id
            selectList:[],//选中执法人员信息
            props: {
                label: "label",
                value: "id"
            },
        }
    },
    components:{
        addExamBatchComp,addPage,invigilateManage,sendResult,examPerson,examDetail,roomDispath
    },
    methods:{
        //点击下拉框的时查询考试类型
        getDictInfo(name,codeName){
            this.$store.dispatch("findAllDrawerByName",name).then(    //考试类型
                res=>{
                    if(res.code===200){
                        if(codeName==='branchIdsInfo'){
                            this.examTypeInfo=res.data;
                            this.examTypeInfo.unshift({id:'',name:'全部'});
                        }
                    }else{
                        console.info("没有查询到数据");
                    }
                }
            );
        },
        //新增人员信息
        addExamBatchInfo(){
            this.$refs.addExamBatchCompRef.showModal(1,"");
        },
         //考试详情
        getViewPagelInfo(row,param){
            let _this = this 
            _this.$refs.addPageCompRef.showModal(2,row);;
        },
        getInvigilateInfo(row,param){//监考管理
            let _this = this 
            _this.$refs.invigilateManageCompRef.showModal(3,"row");;
        },
        getSendResultlInfo(row,param){//报送成绩
            let _this = this 
           // _this.$refs['invigilateManageCompRef'].showModal(param,row);;
        },
        getExamDetailInfo(row,param){//考试详情
            let _this = this 
            _this.$refs.examDetailCompRef.showModal(param,row);;
        },
        getExamPersonInfo(row){ //参考人员
            let _this = this 
            _this.$refs.examPersonCompRef.showModal(4,row);
        },
        roomDispathInfo(row){//考场分配
             let _this = this 
            _this.$refs.roomDispathCompRef.showModal(4,row);
        },
        //根据查询条件查询人员基本信息
        getExamBatchList() {
            let _this = this
            let data = {
                examName:_this.batchManageForm.examName,
                examType:_this.batchManageForm.examType,
                examTypeName:_this.batchManageForm.examTypeName,
                examBegin:_this.batchManageForm.examBegin,
                examEnd:_this.batchManageForm.examEnd,
                current: _this.currentPage,
                size: _this.pageSize
            };
            _this.getPageList("getExamBathListInfo",data);
        },
        //删除考试
        deleteExamBatchInfo(){
            let _this = this 
            if(_this.selectUserIdList==undefined || _this.selectUserIdList.length==0){
                _this.$message({
                    type:'warning',
                    message:'请选择人员信息',
                });
            }else{
                _this.deleteByIds("deleteExamBantch");
                _this.getExamBatchList();//重新加载页面数据
            }
        },
        // 日志重置
        resetLog() {
            this.$refs["batchManageFormRef"].resetFields();
        },
        //更改每页显示的条数
        handleSizeChange(val) {
            this.pageSize = val;
            this.getExamBatchList();
        },
        //更换页码
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getExamBatchList();
        },
         //获取选中的user
        selectUser(val) {
            let _this = this
            _this.selectUserIdList = [];
            _this.selectList=[];
            val.forEach((item,index) => {
                _this.selectUserIdList.push(item.personId);
                _this.selectList.push(item.stationStatusName);
            });
        }
    },
    created() {
        this.getExamBatchList();
    }
}
</script>

<style  lang="scss" scoped>
@import "@/assets/css/searchPage.scss";
@import "@/assets/css/personManage.scss";
</style>
