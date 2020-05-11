<template>
<div>
    <div>
        <el-table
            style="margin-left:25px; width:97%;margin-bottom:35px;"
            :data="tableData"
            resizable
            stripe>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="outlineTypeName" label="大纲类型"></el-table-column>
            <el-table-column prop="outlineName" label="大纲名称"></el-table-column>
            <el-table-column prop="simple" label="简单"></el-table-column>
            <el-table-column prop="custom" label="一般"></el-table-column>
            <el-table-column prop="diffi" label="困难"></el-table-column>
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
        getPageDetailInfo(){
            let _this = this;
           // _this.getPageList("vv",this.tableData);
        }
    },
    created(){
        let _this = this 
        _this.getPageDetailInfo();
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/personManage.scss";
</style>
