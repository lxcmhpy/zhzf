<template>
    <div class="com_searchAndpageBoxPadding">
        <div class="searchPage toggleBox">
            <div class="handlePart">
                <el-form :inline="true" :model="templeteForm" label-width="120px;"  ref="templeteFormRef">
                    <div>
                        <div class="item">
                            <el-row>
                                <el-form-item label="模板名称" prop="templeteName" placeholder="模板名称">
                                    <el-input v-model="templeteName"></el-input>
                                </el-form-item>
                                <el-form-item style="margin-left:20px;">
                                    <el-button title="搜索" class="commonBtn searchBtn" size="medium" icon="iconfont law-sousuo"   @click="getTempleteList"></el-button>
                                    <el-button title="重置" class="commonBtn searchBtn" size="medium" icon="iconfont law-zhongzhi" @click="resetLog"></el-button>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item>
                                    <el-button type="primary"  icon="el-icon-plus" size="medium" @click="addTempleteInfo('','1')">新增模板</el-button>
                                </el-form-item>
                            </el-row>
                        </div>
                    </div>
                </el-form>
            </div>
            <div class="tablePart">
                <el-table :data="tableData" resizable stripe  style="width: 100%;height:100%;">
                    <el-table-column type="index" label="序号" align="center"></el-table-column>
                    <el-table-column prop="templeteId" label="" align="center" v-if="false"></el-table-column>
                    <el-table-column prop="templeteName" label="模板名称" align="center"></el-table-column>
                    <el-table-column prop="createId" label="创建人" align="center"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
                    <el-table-column prop="isUse" label="是否启用" align="center">
                        <template  slot-scope="scope">
                            <el-switch
                                v-model="scope.row.isUse=='0'?true:false"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @change="change(scope.row,scope.$index)"
                                >
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="opt" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text"  @click="updateTempleteInfo(scope.row,'2')">修改</el-button>
                            <el-button type="text"  @click="deleteTempleteInfo(scope.row.templeteId)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!--<div class="paginationBox">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    background
                    :page-sizes="[10, 20, 30, 40, 50]"
                    layout="prev, pager, next,sizes,jumper"
                    :total="totalPage"
                ></el-pagination>
            </div>-->
        </div>
        <!-- 申请调动的时候弹出框 -->
        <addTempleteComp ref="addTempleteCompRef" @getTempleteComp="getTempleteList"></addTempleteComp>
    </div>
</template>
<script>
import addTempleteComp from "./addTemplete";
import {mixinPerson} from "@/common/js/personComm";
export default {
    mixins:[mixinPerson],
    data(){
        return{
            templeteName:"",//模板名称
            templeteForm:{
                templeteName:"",
                createName:"",
                createId:"",
                createTime:"",
                isUse:"",

                code:"",
                paragraphNum:"",
                paragraphSum:"",
                paragraphType:"",
            },
            value:false, //是否启用
            tableData:[{"templeteName":"测试模板","createId":"张三","createTime":"2020-2-21","isUse":"0","data":[{"paragraphNum":"20","paragraphType":"单选题","paragraphSum":"30"},{"paragraphNum":"20","paragraphType":"单选题","paragraphSum":"30"},{"paragraphNum":"20","paragraphType":"单选题","paragraphSum":"30"}]},
            {"templeteName":"测试模板2","createId":"李四","createTime":"2020-2-21","isUse":"1","data":[{"paragraphNum":"20","paragraphType":"单选题","paragraphSum":"30"},{"paragraphNum":"20","paragraphType":"单选题","paragraphSum":"30"},{"paragraphNum":"20","paragraphType":"单选题","paragraphSum":"30"}]},
            {"templeteName":"测试模板3","createId":"王五","createTime":"2020-2-21","isUse":"0","data":[{"paragraphNum":"20","paragraphType":"单选题","paragraphSum":"30"},{"paragraphNum":"20","paragraphType":"单选题","paragraphSum":"30"},{"paragraphNum":"20","paragraphType":"单选题","paragraphSum":"30"}]},
            ],
        }
    },
    components:{
        addTempleteComp,
    },
    methods:{
        //修改启用状态
        change(row,index){
            if(row.isUse == '0'){
                this.tableData[index].isUse = '1';
            }else if(row.isUse == '1'){
                 this.tableData[index].isUse = '0';
            }
            
        },
        //点击添加tab标签，查看人员详情信息
        getTempleteInfo(row,param){
            let _this = this 
            if(param==='0'){//详情
                _this.$store.dispatch("getPersonDetailInfo", row.personId).then(
                    res => {
                        if(res.code === 200){
                            _this.openPersonTag("setPersonInfo", res.data,param);
                        }
                    }
                );
            }else{
                _this.openPersonTag("setPersonInfo", '',param);
            }
        },
        addTempleteInfo(){
            this.$refs.addTempleteCompRef.showModal('',1);
        },
        //修改人员信息
        updateTempleteInfo(row) {
            this.$refs.addTempleteCompRef.showModal(row, 2);
        },
        //根据查询条件
        getTempleteList() {
            let _this = this
            let data = {
                templeteName:_this.templeteName,
                current: _this.currentPage,
                size: _this.pageSize
            };
            //_this.getPageList("pageTempletePageList",data);
        },
        //删除所选择的用户信息
        deleteTempleteInfo(templeteId){
            let _this = this 
                _this.deleteByIds("deletePageTempleteById",templeteId);
                _this.getTempleteList();//重新加载页面数据
        },
        // 日志重置
        resetLog() {
            this.$refs["templeteFormRef"].resetFields();
        },
        //更改每页显示的条数
        handleSizeChange(val) {
            this.pageSize = val;
            this.getTempleteList();
        },
        //更换页码
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getTempleteList();
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
        this.getTempleteList();
    }
}
</script>

<style  lang="scss" src="@import "@/assets/css/searchPage.scss"" scoped>
/* @import "@/assets/css/searchPage.scss"; */
</style>
<style lang="scss" src="@/assets/css/personManage.scss" scoped>
  /* @import "@/assets/css/personManage.scss"; */
</style>
