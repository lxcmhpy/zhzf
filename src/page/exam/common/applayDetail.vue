<template>
<div>
    <div>
        <el-table
            style="margin-left:25px; width:97%;margin-bottom:35px;"
            :data="tableData"
            resizable
            stripe>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="verifyResult" label="审核结果"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column prop="modifyName" label="审核人"></el-table-column>
            <el-table-column prop="modifyTime" label="审核时间"></el-table-column>
        </el-table>
    </div>
</div>
</template>
<script>
import {mixinPerson} from '@/common/js/personComm';
export default {
    name: "addplayDetail",//审核详情
    mixins:[mixinPerson],
    data(){
        return {
            tableData:[],
        }
    },
    methods:{
        getPageApplayInfo(){
          //  _this.getPageList("ss",paramsData);
        }
    },
    created(){
        let _this = this 
        _this.getPageApplayInfo();
    }
}
</script>

<style lang="scss" src="@/assets/css/personManage.scss" scoped>
  /* @import "@/assets/css/personManage.scss"; */
</style>
