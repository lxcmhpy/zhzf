<template>
    <el-dialog
        :title="dialogtitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false">
        <el-form :model="addExamPersonForm" ref="addExamPersonFormRef" label-position="right" label-width="100px;" :inline="true">
            <div>
                <el-row>
                    <el-form-item label="姓名" prop="personName" class-form="form-class">
                        <el-input v-model="addExamPersonForm.personName"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" prop="idNo" class-form="form-class">
                        <el-input v-model="addExamPersonForm.idNo"></el-input>
                    </el-form-item>
                    <el-form-item label="所属机构" prop="oname" class-form="form-class">
                        <el-input v-model="addExamPersonForm.oname"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="执法领域" prop="branchName" class-form="form-class">
                        <el-input v-model="addExamPersonForm.branchName"></el-input>
                    </el-form-item>
                    <el-form-item label="岗位" prop="stationName" class-form="form-class">
                        <el-input v-model="addExamPersonForm.stationName"></el-input>
                    </el-form-item>
                    <el-form-item label="执法证号" prop="ministerialNo" class-form="form-class">
                        <el-input v-model="addExamPersonForm.ministerialNo"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button title="搜素" class="commonBtn searchBtn" size="medium" icon="iconfont law-sousuo"   @click="getPersonAllInfo"></el-button>
                        <el-button title="重置" class="commonBtn searchBtn" size="medium" icon="iconfont law-zhongzhi" @click="resetLog"></el-button>
                    </el-form-item>
                </el-row>
            </div>
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
                    <el-table-column prop="area" label="执法领域" align="center"></el-table-column>
                </el-table>
            </div>
            <div class="item" style="text-align:right">
                <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="submit">确 定</el-button>
                        <el-button  @click="visible = false">取 消</el-button>
                    
                </span>
            </div>
        </el-form>
    </el-dialog>
</template>
<script>
import {mixinPerson} from "@/common/js/personComm";
export default {
    mixins:[mixinPerson],
    data(){
        return {
            addExamPersonForm:{
                personName:"",
                idNo:"",
                oname:"",
                oid:"",
                branchName:"",
                stationName:"",
                ministerialNo:"",
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
                area:'11111111111111',
            }]
        }
    },
    methods:{
        submit(){

        },
        showModal(type,data){
            let _this = this 
            _this.visible=true;
            _this.dialogtitle="试卷选择";
            this.getPersonAllInfo();
        },
        getPersonAllInfo(){//查询试卷列表
            let data={}
           // this.getPageList("",data);
        },
        resetLog(){
            let _this = this 
            _this.$refs['addExamPersonFormRef'].resetFields();
        },
        closeDialog(){
            let _this = this 
            _this.visible=false;
            _this.$refs['addExamPersonFormRef'].resetFields();
            _this.errorName=false;
        }
    },
   
}
</script>
<style lang="scss" scoped>

</style>