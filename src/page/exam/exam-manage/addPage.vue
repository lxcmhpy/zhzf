<template>
    <el-dialog
        :title="dialogtitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false">
        <div class="item">
            <el-form :model="addPageForm" ref="addPageFormRef" label-position="right" label-width="100px;" :inline="true">
            <div>
                <el-row>
                    <el-form-item label="试卷名称" prop="pageName" class-form="form-class">
                        <el-input v-model="addPageForm.pageName"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button title="搜素" class="commonBtn searchBtn" size="medium" icon="iconfont law-sousuo"   @click="getPageAllInfo"></el-button>
                        <el-button title="重置" class="commonBtn searchBtn" size="medium" icon="iconfont law-zhongzhi" @click="resetLog"></el-button>
                    </el-form-item>
                </el-row>
            </div>
            <div>
                <el-table :data="tableDate" resizable stripe style="width:98%">
                    <el-table-column prop="pageId" label="试卷Id" v-if="false" align="center"></el-table-column>
                    <el-table-column prop="pageName" label="试卷名称" align="center"></el-table-column>
                    <el-table-column prop="pageType" label="试卷类型" align="center"></el-table-column>
                    <el-table-column prop="score" label="试卷总分" align="center"></el-table-column>
                    <el-table-column prop="createId" label="出题人" align="center"></el-table-column>
                    <el-table-column prop="oid" label="出题机构" align="center"></el-table-column>
                    <el-table-column prop="verifyStatus" label="审核状态" align="center"></el-table-column>
                    <el-table-column prop="opt" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="viewPage(scope.row)">预览</el-button>
                            <el-button type="text" @click="selectPage(scope.row)">选择试卷</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-form>
    </div>  
</el-dialog>
</template>
<script>
import {mixinPerson} from "@/common/js/personComm";
export default {
    mixins:[mixinPerson],
    data(){
        return {
            addPageForm:{
                pageName:"",
            },
            visible:false,
            dialogtitle:"",
            errorName:"",
            tableDate:[{
                pageName:'试卷名称',
                pageType:'试卷类型',
                score:'试卷总分',
                createId:'交通部',
                oid:'交通部',
                verifyStatus:'审核通过',
            }]
        }
    },
    methods:{
        getExamBatchList(){

        },
        showModal(type,row){
            let _this = this 
            _this.visible=true;
            _this.dialogtitle="试卷选择";
            this.getPageAllInfo();
        },
        viewPage(row){//预览
            let _this = this;
                     _this.$store.commit("setPersonInfo",'','');
                     _this.$router.replace({
                     name: 'viewApplayDetail',
                   params:{
                 }
            });
        },
        selectPage(row){//选择试卷

        },
        getPageAllInfo(){//查询试卷列表
         let _this = this
            let data = {
                pageName:_this.addPageForm.pageName,
                current: _this.currentPage,
                size: _this.pageSize
            };
            _this.getPageList("getPageManageList",data);

        },
        resetLog(){
            let _this = this 
            _this.$$refs['addPageFormRef'].resetFields();
        },
        closeDialog(){
            let _this = this 
            _this.visible=false;
            _this.$refs['addPageFormRef'].resetFields();
            _this.errorName=false;
        }
    },
    
}
</script>
<style lang="scss" scoped>

</style>