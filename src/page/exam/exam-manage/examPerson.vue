<template>
<div>
    <div>
    <el-dialog
        :title="dialogtitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false">
        <el-form :model="examPersonForm" ref="examPersonFormRef" label-position="right" label-width="100px;" :inline="true">
            <div>
                <el-row>
                    <el-form-item label="姓名" prop="personName" class-form="form-class">
                        <el-input v-model="examPersonForm.personName"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" prop="idNo" class-form="form-class">
                        <el-input v-model="examPersonForm.idNo"></el-input>
                    </el-form-item>
                    <el-form-item label="所属机构" prop="oname" class-form="form-class">
                        <el-input v-model="examPersonForm.oname"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="执法领域" prop="branchName" class-form="form-class">
                        <el-input v-model="examPersonForm.branchName"></el-input>
                    </el-form-item>
                    <el-form-item label="岗位" prop="stationName" class-form="form-class">
                        <el-input v-model="examPersonForm.stationName"></el-input>
                    </el-form-item>
                    <el-form-item label="执法证号" prop="ministerialNo" class-form="form-class">
                        <el-input v-model="examPersonForm.ministerialNo"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button title="搜素" class="commonBtn searchBtn" size="medium" icon="iconfont law-sousuo"   @click="getPageAllInfoByPerson"></el-button>
                        <el-button title="重置" class="commonBtn searchBtn" size="medium" icon="iconfont law-zhongzhi" @click="resetLog"></el-button>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item>
                        <el-button type="primary"  icon="el-icon-plus" size="medium" @click="getAddPersonInfo('','1')">新增人员</el-button>
                        <el-button style="background-color:#4aafa7;color:white" icon ="el-icon-delete-solid" size="medium" @click="deleteAddPerson">移除人员</el-button>
                    </el-form-item>
                </el-row>
            </div>
             </el-form>
            <div>
                <el-table :data="tableDate" resizable stripe style="width:98%">
                     <el-table-column  type="selection" label="" align="center"></el-table-column>
                    <el-table-column prop="personName" label="姓名" align="center"></el-table-column>
                    <el-table-column prop="sexName" label="性别" align="center"></el-table-column>
                    <el-table-column prop="idNo" label="身份证号" align="center"></el-table-column>
                    <el-table-column prop="oname" label="所属机构" align="center"></el-table-column>
                    <el-table-column prop="postName" label="职务" align="center"></el-table-column>
                    <el-table-column prop="stationName" label="岗位" align="center"></el-table-column>
                    <el-table-column prop="ministerialNo" label="执法证号" align="center"></el-table-column>
                    <el-table-column prop="branchName" label="执法领域" align="center"></el-table-column>
                </el-table>
            </div>
       
    </el-dialog>
    </div>
    <div>
        <addExamPerson ref="addExamPersonCompRef" @getExamPersonInfo="getPageAllInfo"></addExamPerson>
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
            examPersonForm:{
                personName:"",
                idNo:"",
                oname:"",
                branchName:"",
                branchId:"",
                stationName:"",
                stationId:"",
                ministerialNo:"",
                batchId:"",
            },
            visible:false,
            dialogtitle:"",
            errorName:"",
            tableDate:[{
                personName:'张三',
                sexName:'男',
                idNo:'62022222222909898',
                oname:'交通部',
                stationName:'岗位名称',
                ministerialNo:'执法证号',
                branchName:'11111111111111',
            }]
        }
    },
    components:{
        addExamPerson
    },
    methods:{
        showModal(type,data){
            let _this = this 
            _this.visible=true;
            _this.dialogtitle="参考人员";
             this.getPageAllInfo();
        },
        getAddPersonInfo(){//新增人员
            let data={
                
            }
            this.$refs.addExamPersonCompRef.showModal('1',data);
        },
        deleteAddPerson(){//移除人员

        },
        getPageAllInfo(){//查询参考考生列表
            let _this = this
            let data = {
                batchId:_this.examPersonForm.batchId,
                current: _this.currentPage,
                size: _this.pageSize
            };
            _this.getPageList("getExamParsonListByExam",data);
        },
        getPageAllInfoByPerson(){//查询参考考生列表
            let _this = this
            let data = {
                personName:_this.examPersonForm.personName,
                idNo:_this.examPersonForm.idNo,
                oname:_this.examPersonForm.oname,
                branchName:_this.examPersonForm.branchName,
                branchId:_this.examPersonForm.branchId,
                stationName:_this.examPersonForm.stationName,
                ministerialNo:_this.examPersonForm.ministerialNo,
                idCode:_this.examPersonForm.idCode,
                current: _this.currentPage,
                size: _this.pageSize
            };
            _this.getPageList("getExamParsonListByPerson",data);
        },
        resetLog(){
            let _this = this 
            _this.$refs['examPersonFormRef'].resetFields();
        },
        closeDialog(){
            let _this = this 
            _this.visible=false;
            _this.$refs['examPersonFormRef'].resetFields();
            _this.errorName=false;
        }
    },
   
}
</script>
<style lang="scss" scoped>

</style>