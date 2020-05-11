<template>
    <el-dialog
        :title="dialogtitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false">
         
            <div>
                <el-table :data="tableDate" resizable stripe style="width:98%">
                    <el-table-column prop="personName" label="记录类型" align="center"></el-table-column>
                    <el-table-column prop="sexName" label="发生时间" align="center"></el-table-column>
                    <el-table-column prop="idNo" label="记录时间" align="center"></el-table-column>
                    <el-table-column prop="oname" label="记录内容" align="center"></el-table-column>
                  
                </el-table>
            </div>
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