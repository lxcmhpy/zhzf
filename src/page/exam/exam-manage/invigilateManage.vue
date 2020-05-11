<template>
<div>
    <div>
    <el-dialog
        :title="dialogtitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false">
        <el-form :model="invigilateForm" ref="invigilateFormRef" label-position="right" label-width="100px;" :inline="true">
            <div>
                <el-row>
                    <el-form-item label="姓名" prop="userName" class-form="form-class">
                        <el-input v-model="invigilateForm.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" prop="idCode" class-form="form-class">
                        <el-input v-model="invigilateForm.idCode"></el-input>
                    </el-form-item>
                    <el-form-item label="所属机构" prop="onacompanyme" class-form="form-class">
                        <el-input v-model="invigilateForm.company"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button title="搜素" class="commonBtn searchBtn" size="medium" icon="iconfont law-sousuo"   @click="getInvigilateAllInfo"></el-button>
                        <el-button title="重置" class="commonBtn searchBtn" size="medium" icon="iconfont law-zhongzhi" @click="resetLog"></el-button>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item>
                        <el-button type="primary"  icon="el-icon-plus" size="medium" @click="exportInfo('','1')">导出</el-button>
                    </el-form-item>
                </el-row>
            </div>
            <div>
                <el-table :data="tableDate" resizable stripe style="width:98%">
                    <el-table-column prop="roomId" label="考场" align="center"></el-table-column>
                    <el-table-column prop="loginName" label="监考账号" align="center"></el-table-column>
                    <el-table-column prop="password" label="监考密码" align="center"></el-table-column>
                    <el-table-column prop="userName" label="姓名" align="center"></el-table-column>
                    <el-table-column prop="idCode" label="身份证号" align="center"></el-table-column>
                    <el-table-column prop="company" label="所属单位" align="center"></el-table-column>
                    <el-table-column prop="telephone" label="联系方式" align="center"></el-table-column>
                </el-table>
            </div>
        </el-form>
    </el-dialog>
    </div>
    <div>
        <addExamPerson ref="addExamPersonCompRef" @getExamPersonInfo="getInvigilateAllInfo"></addExamPerson>
    </div>
</div>
</template>
<script>
import {mixinPerson} from "@/common/js/personComm";
import addExamPerson from './addExamPerson';
export default {
    mixins:[mixinPerson],
    data(){
        return {
            invigilateForm:{
                loginName:"",
                idCode:"",
                company:"",
                userName:'',
                oid:"",
            },
            visible:false,
            dialogtitle:"",
            errorName:"",
            tableDate:[{
                roomId:'交通部',
                loginName:'857857',
                password:'12345',
                userName:'张三',
                idCode:'62022222222909898',
                company:'交通部',
                telephone:'岗位名称',
                certNo:'执法证号',
                area:'11111111111111',
            }]
        }
    },
    components:{
        addExamPerson
    },
    methods:{
        showModal(type,row){
            let _this = this 
            _this.visible=true;
            _this.dialogtitle="监考管理";
            this.getInvigilateAllInfo();
        },
        exportInfo(){//移除人员

        },
        getInvigilateAllInfo(){//查询监考列表
            let _this = this
            let data = {
                userName:_this.invigilateForm.userName,
                company:_this.invigilateForm.company,
                idCode:_this.invigilateForm.idCode,
                current: _this.currentPage,
                size: _this.pageSize
            };
            _this.getPageList("getInvigilatorPageList",data);
        },
        resetLog(){
            let _this = this 
            _this.$$refs['invigilateFormRef'].resetFields();
        },
        closeDialog(){
            let _this = this 
            _this.visible=false;
            _this.$refs['invigilateFormRef'].resetFields();
            _this.errorName=false;
        }
    },
   
}
</script>
<style lang="scss" scoped>

</style>